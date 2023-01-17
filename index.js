/**
 * ----------------------------------------------------------------
 * BuildCasa Get Offer Flow
 * ----------------------------------------------------------------
 * This is the custom JavaScript that helps power the BuildCasa.com Get Offer flow
 * It provides the state management and business logic for the BuildCasa Webflow site
 * The state is connected with the HTML and presentation logic via AlpineJS stores and directives
 * The site pages, HTML, and CSS are all designed, built, and hosted via the BuildCasa Webflow account
 */

// Global variable to hold references to the Alpine stores created for state management
const $store = {}

/**
 * ----------------------------------------------------------------
 * AlpineJS (Third Party Script)
 * ----------------------------------------------------------------
 * A small frontend framework that is used to create the interactive behaviors of the Get Offer flow
 * Uses a simple set of directives to integrate logic with HTML elements via Webflow element attributes
 * For more info on AlpineJS, visit the docs: https://alpinejs.dev/start-here
 */
const script = document.createElement("script")
script.src = "https://unpkg.com/alpinejs@3.10.5/dist/cdn.min.js"
script.defer = true
document.head.appendChild(script)

// When Alpine has been loaded, initiate the custom state and business logic that powers the flow
document.addEventListener("alpine:init", () => {
  initViewModels()
  initFlowState()
  initUIHelpers()
})

function initViewModels() {
  $store.addressViewModel = createAddressViewModel()
  $store.contactViewModel = createContactViewModel()
  $store.estimateViewModel = createEstimateViewModel()
}

function initFlowState() {
  $store.flowStateMachine = createFlowStateMachine()
  $store.flowState = createFlowState()
}

function initUIHelpers() {
  $store.modalHelpers = createModalHelpers()
}

/**
 * ----------------------------------------------------------------
 * createAddressViewModel
 * ----------------------------------------------------------------
 * Creates and returns reference to an Alpine store for the addressViewModel
 * Represents data provided by users via the Address form and/or URL params
 * Passed to Hubspot and used to generate estimate offer through the flow
 * Can be accessed in HTML via directive attribute values w/ `$store.addressViewModel`
 *
 * - inputValue: String, bound (2-way, via `x-model`) to Address input field in the UI
 * - matches: Array, matching addresses returned by the typeahead API, and displayed in UI typeahead via `x-for`
 * - keyboardNavIndex: Number, tracks which of the matches is currently selected via keyboard (up/down arrows) navigation
 * - selectedMatch: Object, w/ the address data provided by integrated typeahead/address API(s)
 * - parcelDetails: Object, w/ the APN, jurisdiction, and address data provided by integrated typeahead/address API(s)
 * - submitButtonText: Object, w/ `normal` and `processing` strings bound (via `x-text`) to the Address form submit button
 * - errorMessage: String, bound (via `x-text`) and displayed with the form when it is in an addressFormError state w/ message content
 * - isSelected: Getter, returns boolean value based on if there is a valid selected address (can be bound)
 * - hasParcelDetails: Getter, returns boolean value based on if there is a valid set of parcel details for the selected address (can be bound)
 * - init: Function, run automatically by Alpine as soon as the store is created, to initialize the values (including advanced logic)
 * - handleInput: Function, bound (via `x-on:input` / `@input`) to run when the user changes the value in the input field
 * - handleKeydown: Function, bound (via `x-on:keydown` / `@keydown`) to run when the user presses any keys while focused within the typeahead component
 * - handleMatchSelection: Function, bound (via `x-on:click` / `@click`) or called programmatically to select an address match
 * - handleSubmit: Function, bound (via `x-on:submit` / `@submit`) to run when submit events are fired on the form elements
 * - submitAddress: Function, called programmatically to process the address submission and trigger state transitions
 */
function createAddressViewModel() {
  Alpine.store("addressViewModel", {
    inputValue: "",
    matches: [],
    keyboardNavIndex: -1,
    selectedMatch: {},
    parcelDetails: {},
    submitButtonText: {
      normal: "",
      processing: "",
    },
    errorMessage: "",
    get isSelected() {
      return (
        Object.keys(this.selectedMatch).length != 0 &&
        !!this.selectedMatch.ll_uuid
      )
    },
    get hasParcelDetails() {
      return (
        Object.keys(this.parcelDetails).length != 0 &&
        !!this.parcelDetails.jurisdiction &&
        !!this.parcelDetails.apn
      )
    },
    init() {
      // FUTURE DEV: Add logic to pre-fill data based on other sources (link params, etc.) here

      // Pre-fill submit button text values based on Webflow settings
      // Preserves Webflow DX for editing button values through the UI (`button` and `waiting` settings)
      // But allows dynamically controlling displayed text in site, based on current UI state, via Alpine
      const addressFormSubmitButton = document.getElementById(
        "address-form-submit-button"
      )
      this.submitButtonText = {
        normal: addressFormSubmitButton.value,
        processing: addressFormSubmitButton.dataset.wait,
      }
    },
    async handleInput() {
      // FUTURE DEV: Currently, calls to this handler are being debounced with an x-bind directive on the input element
      // Might be more clear to move debounce logic to this script in the future (if we can figure out the 'this' craziness)

      // Clear any previously selected and/or submitted address, parcel details, and estimate results
      if (this.isSelected) {
        this.selectedMatch = {}
      }
      if (this.hasParcelDetails) {
        this.parcelDetails = {}
      }
      if ($store.estimateViewModel.hasResults) {
        $store.estimateViewModel.init()
      }
      if ($store.contactViewModel.isSubmitted) {
        $store.contactViewModel.isSubmitted = false
      }

      // Fetch and update address matches (or handle errors)
      try {
        this.matches = await fetchAddressMatches(this.inputValue)
      } catch (error) {
        this.errorMessage =
          "There was an error finding your address. Please try again, or contact us for help."

        $store.flowState.value = $store.flowStateMachine.transition(
          $store.flowState.value,
          "ERROR"
        )
      }
    },
    handleKeydown(event) {
      // Don't intercept keydown events for any keys other than ArrowUp, ArrowDown, or Enter
      if (
        event.key != "Enter" &&
        event.key != "ArrowUp" &&
        event.key != "ArrowDown"
      ) {
        return
      }

      // Don't intercept keydown events if the address matches are not being displayed
      if (this.isSelected || this.matches.length === 0) {
        return
      }

      // If ArrowUp, ArrowDown, or Enter are pressed while address matches are being displayed, block default behavior
      event.preventDefault()
      event.stopPropagation()

      // And apply special logic to navigate and select an address from the available matches
      if (event.key === "Enter" && this.keyboardNavIndex != -1) {
        // If Enter key is pressed, select the match at the current position
        this.handleMatchSelection(this.matches[this.keyboardNavIndex])
      } else if (event.key === "ArrowUp") {
        // If ArrowUp key is pressed and no matches have been navigated to via keyboard yet, navigate to the bottom of the list
        // Else, navigate up one match from the current position
        this.keyboardNavIndex =
          this.keyboardNavIndex <= -1
            ? this.matches.length - 1
            : this.keyboardNavIndex - 1
      } else if (event.key === "ArrowDown") {
        // If ArrowDown key is pressed and current position is at the bottom of the list, navigate to the starting position
        // Else, navigate down one match from the current position
        this.keyboardNavIndex =
          this.keyboardNavIndex >= this.matches.length - 1
            ? -1
            : this.keyboardNavIndex + 1
      }
    },
    handleMatchSelection(match) {
      // Set selected address
      this.selectedMatch = match

      // Update input value
      this.inputValue = match.address + ", " + match.context

      // Re-initialize matches / keyboard nav
      this.matches = []
      this.keyboardNavIndex = -1

      // Track address selection event
      trackEvent("Address Selected", {
        address_str: match.address,
        context_str: match.context,
        regrid_ll_uuid_str: match.ll_uuid,
      })
    },
    handleSubmit(event) {
      // Block default form submission behavior
      event.preventDefault()
      event.stopPropagation()

      // Submit address
      this.submitAddress()
    },
    async submitAddress() {
      // Debounce submission if form is already processing
      if (
        $store.flowState.value == "addressFormProcessing" ||
        $store.flowState.value == "modalAddressFormProcessing"
      ) {
        return
      }

      // Remove active focus (to avoid inadvertant submits given the modal UX)
      document.activeElement?.blur()

      // Clear out any existing error message
      this.errorMessage = ""

      // Transition to the address processing state
      $store.flowState.value = $store.flowStateMachine.transition(
        $store.flowState.value,
        "SUBMIT_ADDRESS"
      )

      // Process the submitted address, and transition the state accordingly
      try {
        // If the contact has already been submitted, skip the contact form and transition directly to the estimate results
        // Otherwise, transition to the contact form
        if (
          this.hasParcelDetails &&
          $store.estimateViewModel.hasResults &&
          $store.contactViewModel.isSubmitted
        ) {
          $store.flowState.value = $store.flowStateMachine.transition(
            $store.flowState.value,
            "SKIP_CONTACT"
          )
        } else {
          // If the parcel details haven't already been acquired for the address, fetch them from the Regrid API
          if (!$store.addressViewModel.hasParcelDetails) {
            $store.addressViewModel.parcelDetails = await fetchParcelDetails(
              $store.addressViewModel.selectedMatch.ll_uuid
            )
          }

          // If the estimate results haven't already been acquired for the address, fetch them from our estimate endpoint
          if (!$store.estimateViewModel.hasResults) {
            const fetchEstimatePayload = {
              parcel: {
                apn: $store.addressViewModel.parcelDetails.apn,
                jurisdiction:
                  $store.addressViewModel.parcelDetails.jurisdiction,
              },
              address: {
                address: $store.addressViewModel.parcelDetails.address,
                city: $store.addressViewModel.parcelDetails.city,
                state: $store.addressViewModel.parcelDetails.state,
                zip: $store.addressViewModel.parcelDetails.zip,
              },
            }

            const estimateResults = await fetchEstimateResults(
              fetchEstimatePayload
            )

            $store.estimateViewModel.jurisdiction = estimateResults.jurisdiction
            $store.estimateViewModel.estimate = estimateResults.estimate
          }

          $store.flowState.value = $store.flowStateMachine.transition(
            $store.flowState.value,
            "SUCCESS"
          )
        }
      } catch (error) {
        this.errorMessage =
          "There was an error processing your address. Please try again, or contact us for help."

        $store.flowState.value = $store.flowStateMachine.transition(
          $store.flowState.value,
          "ERROR"
        )
      }
    },
  })

  // Return reference to the new addressViewModel store
  return Alpine.store("addressViewModel")
}

/**
 * ----------------------------------------------------------------
 * createContactViewModel
 * ----------------------------------------------------------------
 * Creates and returns reference to an Alpine store for the contactViewModel
 * Represents data provided by users via the Contact form and/or URL params
 * Passed to Hubspot to populate and/or update Contact data in our CRM
 * Can be accessed in HTML via directive attribute values w/ `$store.contactViewModel`
 *
 * - firstName: String, bound (2-way, via `x-model`) to First Name input field in the UI
 * - lastName: String, bound (2-way, via `x-model`) to Last Name input field in the UI
 * - email: String, bound (2-way, via `x-model`) to Email input field in the UI
 * - phone: String, bound (2-way, via `x-model`) to Phone Number input field in the UI
 * - submitButtonText: Object, w/ `normal` and `processing` strings bound (via `x-text`) to the Contact form submit button
 * - errorMessage: String, bound (via `x-text`) and displayed with the form when it is in an contactFormError state w/ message content
 * - isSubmitted: Boolean, based on if the contact info has been successfully submitted to the create lead endpoint (can be bound)
 * - init: Function, run automatically by Alpine as soon as the store is created, to initialize the values (including advanced logic)
 * - handleSubmit: Function, bound (via `x-on:submit` / `@submit`) to run when submit events are fired on the form
 * - submitContact: Function, called programmatically to process the contact submission and trigger state transitions
 */
function createContactViewModel() {
  Alpine.store("contactViewModel", {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    submitButtonText: {
      normal: "",
      processing: "",
    },
    errorMessage: "",
    isSubmitted: false,
    init() {
      this.firstName = ""
      this.lastName = ""
      this.email = ""
      this.phone = ""
      this.errorMessage = ""
      this.isSubmitted = false

      // FUTURE DEV: Add logic to pre-fill data based on other sources (link params, etc.) here

      // Pre-fill submit button text values based on Webflow settings
      // Preserves Webflow DX for editing button values through the UI (`button` and `waiting` settings)
      // But allows dynamically controlling displayed text in site, based on current UI state, via Alpine
      const contactFormSubmitButton = document.getElementById(
        "contact-form-submit-button"
      )
      this.submitButtonText = {
        normal: contactFormSubmitButton.value,
        processing: contactFormSubmitButton.dataset.wait,
      }
    },
    handleSubmit(event) {
      // Block default form submission behavior
      event.preventDefault()
      event.stopPropagation()

      // Submit contact info to create lead
      this.submitContact()
    },
    async submitContact() {
      // Debounce submission if form is already processing
      if ($store.flowState.value == "contactFormProcessing") {
        return
      }

      // Remove active focus (to avoid inadvertant submits given the modal UX)
      document.activeElement?.blur()

      // Clear out any existing error message
      this.errorMessage = ""

      // Transition to the contact processing state
      $store.flowState.value = $store.flowStateMachine.transition(
        $store.flowState.value,
        "SUBMIT_CONTACT"
      )

      // Save the time at which the contact form was submitted
      // Used to later ensure a minimum time has elapsed before transitioning to the estimate results
      const startTime = Date.now()

      try {
        // Process the submitted contact info, and transition the state accordingly
        const createLeadPayload = {
          contact: {
            firstName: this.firstName.trim(),
            lastName: this.lastName.trim(),
            email: this.email.trim(),
            phone: this.phone.trim(),
            ...$store.addressViewModel.parcelDetails,
          },
        }

        await createLead(createLeadPayload)

        this.isSubmitted = true

        // Wait for a minimum amount of time to have elapsed since the contact form was submitted
        const elapsedTime = Date.now() - startTime
        const delay = Math.max(0, 4000 - elapsedTime)
        await new Promise((resolve) => setTimeout(resolve, delay))

        $store.flowState.value = $store.flowStateMachine.transition(
          $store.flowState.value,
          "SUCCESS"
        )
      } catch (error) {
        this.errorMessage =
          "There was an error processing your info. Please try again, or contact us for help."

        $store.flowState.value = $store.flowStateMachine.transition(
          $store.flowState.value,
          "ERROR"
        )
      }
    },
  })

  // Return reference to the new contactViewModel store
  return Alpine.store("contactViewModel")
}

/**
 * ----------------------------------------------------------------
 * createContactEstimateViewModel
 * ----------------------------------------------------------------
 * Creates and returns reference to an Alpine store for the estimateViewModel
 * Represents data returned by the Buildcasa estimate generation system
 * Determines which offer results state and next steps to display to users
 * Can be accessed in HTML via directive attribute values w/ `$store.estimateViewModel`
 *
 * - jurisdiction:
 *   - status: String, the active/inactive status of the jurisdiction for the provided address, to determine which results state to display (via `x-show`)
 * - estimate:
 *   - low: Number, low value for the estimate range, bound in the UI via `x-text`
 *   - high: Number, high value for the estimate range, bound in the UI via `x-text`
 * - hasResults: Getter,
 * - lowEstimateString: Getter,
 * - highEstimateString: Getter,
 * - init: Function, run automatically by Alpine as soon as the store is created, to initialize the values (including advanced logic)
 * - handleScheduleConsultationClick: Function, to handle Schedule Consultation button click via `x-on:click` / `@click`
 */
function createEstimateViewModel() {
  Alpine.store("estimateViewModel", {
    jurisdiction: {
      status: "",
    },
    estimate: {
      low: null,
      high: null,
    },
    get hasResults() {
      return !!this.jurisdiction.status
    },
    get lowEstimateString() {
      const currencyFormat = new Intl.NumberFormat(undefined, {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
      })

      return currencyFormat.format(Math.round(this.estimate.low))
    },
    get highEstimateString() {
      const currencyFormat = new Intl.NumberFormat(undefined, {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
      })

      return currencyFormat.format(Math.round(this.estimate.high))
    },
    init() {
      this.jurisdiction = {
        status: "",
      }
      this.estimate = {
        low: null,
        high: null,
      }
    },
    handleScheduleConsultationClick(event) {
      // Block default click handling behavior / event propagation
      event.preventDefault()
      event.stopPropagation()

      // Transition to Schedule Consultation state
      $store.flowState.value = $store.flowStateMachine.transition(
        $store.flowState.value,
        "SCHEDULE"
      )
    },
    handleRequestCommunityClick(event) {
      // Block default click handling behavior / event propagation
      event.preventDefault()
      event.stopPropagation()

      // Transition to Schedule Consultation state
      $store.flowState.value = $store.flowStateMachine.transition(
        $store.flowState.value,
        "REQUEST_COMMUNITY"
      )
    },
  })

  // Return reference to the new estimateViewModel store
  return Alpine.store("estimateViewModel")
}

/**
 * ----------------------------------------------------------------
 * createFlowStateMachine
 * ----------------------------------------------------------------
 * Creates and returns reference to an Alpine store for the flowStateMachine
 * A finite state machine that defines which `states` are possible for the Get Offer UI Flow
 * And for every `state`, which `transitions` are possible _from_ that state — defined with:
 * - EVENT: Key for the `transition`
 * - target: String, matching the key for the `state` that should be set when the `transition` `EVENT` is triggered
 *
 * This state machine also defines a `transition` method which is used to call and process the transition events,
 * Returns the resulting `state` — to update the value for the `flowState` Alpine store that drives the main UI state
 * e.g. `$store.flowState.value = $store.flowStateMachine.transition($store.flowState.value, "EVENT")
 */
function createFlowStateMachine() {
  // Create transition definition objects for *shared* transition events / paths
  const submitAddressTransition = {
    SUBMIT_ADDRESS: {
      target: "addressFormProcessing",
      trackingEvent: {
        name: "Address Submitted",
        properties: {
          address_str: $store.addressViewModel.selectedMatch.address,
          regrid_ll_uuid_str: $store.addressViewModel.selectedMatch.ll_uuid,
        },
      },
    },
  }
  const modalSubmitAddressTransition = {
    SUBMIT_ADDRESS: {
      target: "modalAddressFormProcessing",
      trackingEvent: {
        name: "Address Submitted",
        properties: {
          address_str: $store.addressViewModel.selectedMatch.address,
          regrid_ll_uuid_str: $store.addressViewModel.selectedMatch.ll_uuid,
        },
      },
    },
  }
  const addressProcessingTransition = {
    SUCCESS: {
      target: "contactForm",
      trackingEvent: {
        name: "Address Submission Succeeded",
      },
    },
    SKIP_CONTACT: {
      target: "estimateResults",
    },
    ERROR: {
      target: "modalAddressFormError",
      trackingEvent: {
        name: "Address Submission Failed",
        properties: {
          error_str: $store.addressViewModel.error,
        },
      },
    },
  }
  const submitContactTransition = {
    SUBMIT_CONTACT: {
      target: "contactFormProcessing",
      trackingEvent: {
        name: "Contact Submitted",
      },
    },
  }
  const exitTransition = {
    EXIT: {
      target: "default",
      trackingEvent: {
        name: "Get Offer Modal Closed",
      },
    },
  }

  // Create state machine Alpine store
  Alpine.store("flowStateMachine", {
    defaultState: "default",
    states: {
      default: {
        transitions: {
          ...submitAddressTransition,
          START_MODAL_FLOW: {
            target: "modalAddressForm",
            trackingEvent: {
              name: "Modal Get Offer Flow Opened",
            },
          },
        },
      },
      addressFormProcessing: {
        transitions: {
          SUCCESS: {
            target: "contactForm",
            trackingEvent: {
              name: "Address Submission Succeeded",
            },
          },
          SKIP_CONTACT: {
            target: "estimateResults",
          },
          ERROR: {
            target: "addressFormError",
            trackingEvent: {
              name: "Address Submission Failed",
              properties: {
                error_str: $store.addressViewModel.error,
              },
            },
          },
        },
      },
      addressFormError: {
        transitions: {
          ...submitAddressTransition,
        },
      },
      modalAddressForm: {
        transitions: {
          ...modalSubmitAddressTransition,
          ...exitTransition,
        },
      },
      modalAddressFormProcessing: {
        transitions: {
          SUCCESS: {
            target: "contactForm",
            trackingEvent: {
              name: "Address Submission Succeeded",
            },
          },
          SKIP_CONTACT: {
            target: "estimateResults",
          },
          ERROR: {
            target: "modalAddressFormError",
            trackingEvent: {
              name: "Address Submission Failed",
              properties: {
                error_str: $store.addressViewModel.error,
              },
            },
          },
          ...exitTransition,
        },
      },
      modalAddressFormError: {
        transitions: {
          ...modalSubmitAddressTransition,
          ...exitTransition,
        },
      },
      contactForm: {
        transitions: {
          ...submitContactTransition,
          ...exitTransition,
        },
      },
      contactFormProcessing: {
        transitions: {
          SUCCESS: {
            target: "estimateResults",
            trackingEvent: {
              name: "Contact Submission Succeeded",
              properties: {
                jurisdiction_status_str:
                  $store.estimateViewModel.jurisdiction.status,
                low_estimate_str: $store.estimateViewModel.lowEstimateString,
                high_estimate_str: $store.estimateViewModel.highEstimateString,
              },
            },
          },
          ERROR: {
            target: "contactFormError",
            trackingEvent: {
              name: "Contact Submission Failed",
              properties: {
                error_str: $store.contactViewModel.error,
              },
            },
          },
          ...exitTransition,
        },
      },
      contactFormError: {
        transitions: {
          ...submitContactTransition,
          ...exitTransition,
        },
      },
      estimateResults: {
        transitions: {
          SCHEDULE: {
            target: "scheduleConsultation",
            trackingEvent: {
              name: "Schedule Consultation Clicked",
            },
          },
          REQUEST_COMMUNITY: {
            target: "requestedCommunity",
            trackingEvent: {
              name: "Community Requested",
              properties: {
                jurisdiction_str:
                  $store.addressViewModel.parcelDetails.jurisdiction,
              },
            },
          },
          ...exitTransition,
        },
      },
      scheduleConsultation: {
        transitions: {
          ...exitTransition,
        },
      },
      requestedCommunity: {
        transitions: {
          ...exitTransition,
        },
      },
    },
    // Method to trigger state transitions, given the current state, and a valid transition event
    // For a successful transition, returns the resulting state
    transition(currentState, event) {
      const currentStateDefinition = this.states[currentState]
      const destinationTransition = currentStateDefinition.transitions[event]

      if (!destinationTransition) {
        // FUTURE DEV: Update w/ error tracking / reporting through integrated system
        return currentState
      }

      const { trackingEvent } = destinationTransition
      if (trackingEvent) {
        const { name, properties } = trackingEvent
        trackEvent(name, properties)
      }

      const destinationState = destinationTransition.target
      return destinationState
    },
  })

  // Return reference to the new flowStateMachine store
  return Alpine.store("flowStateMachine")
}

/**
 * ----------------------------------------------------------------
 * createFlowState
 * ----------------------------------------------------------------
 * Creates and returns reference to an Alpine store for the main flowState
 * Used to drive the main UI state as users progress through the Get Offer flow
 * Can be accessed in HTML via directive attribute values w/ `$store.flowState`
 *
 * - value: String, for the current UI state that should be displayed, generally bound via `x-show`
 * - init: Function, run automatically by Alpine as soon as the store is created, to initialize the values (including advanced logic)
 */
function createFlowState() {
  Alpine.store("flowState", {
    value: "",
    init() {
      // FUTURE DEV: Update w/ logic to set initial UI state based on other sources (link params, etc.) here

      this.value = $store.flowStateMachine.defaultState
    },
  })

  // Return reference to the new flowState store
  return Alpine.store("flowState")
}

/**
 * ----------------------------------------------------------------
 * createModalHelpers
 * ----------------------------------------------------------------
 * Creates and returns reference to an Alpine store for modalHelpers
 * Which help control the UX for the modal-based implementation of the Get Offer flow
 * Centralizes some more complex expressions to make Webflow dev safer and more convenient
 * Can be accessed in HTML via directive attribute values w/ `$store.modalHelpers`
 *
 * - iOpen: Getter, that returns true if modal should be displayed based on current flowState, generally bound via `x-show`
 * - handleModalClose: Function, that triggers the flowStateMachine EXIT transition if called, bound UI events via `x-on:click` or `@click`
 */
function createModalHelpers() {
  Alpine.store("modalHelpers", {
    get isOpen() {
      return (
        $store.flowState.value == "modalAddressForm" ||
        $store.flowState.value == "modalAddressFormProcessing" ||
        $store.flowState.value == "modalAddressFormError" ||
        $store.flowState.value == "contactForm" ||
        $store.flowState.value == "contactFormProcessing" ||
        $store.flowState.value == "contactFormError" ||
        $store.flowState.value == "estimateResults" ||
        $store.flowState.value == "scheduleConsultation" ||
        $store.flowState.value == "requestedCommunity"
      )
    },
    handleModalFlowStart() {
      $store.flowState.value = $store.flowStateMachine.transition(
        $store.flowState.value,
        "START_MODAL_FLOW"
      )
    },
    handleModalClose() {
      $store.flowState.value = $store.flowStateMachine.transition(
        $store.flowState.value,
        "EXIT"
      )
    },
  })

  // Return reference to the new modalHelpers store
  return Alpine.store("modalHelpers")
}

/**
 * ----------------------------------------------------------------
 * fetchAddressMatches
 * ----------------------------------------------------------------
 * Given query (provided by user through address typeahead input), returns matching addresses
 * Fetches matches from Regrid Typeahead API, filters results, and returns them
 */
async function fetchAddressMatches(query) {
  // Prepare request to the Regrid Typeahead API
  const url = "https://app.regrid.com/api/v1/typeahead.json"
  const token =
    "1SnpL7AQekjA4mH2vqUmkGm9AAfQxi_6mxwdm4qDzo_C-xSTx9z3pd9rTsRWDWV4"

  const request = new Request(`${url}/?token=${token}&query=${query}`, {
    method: "GET",
  })

  // Fetch and filter matches
  const response = await fetch(request)
  if (!response.ok) {
    throw new Error("Network response was not OK")
  }
  const responseData = await response.json()
  return filterSortAndSliceAddressMatches(responseData)
}

/**
 * ----------------------------------------------------------------
 * filterSortAndSliceAddressMatches
 * ----------------------------------------------------------------
 * Given Regrid Typeahead API response data,
 * Filters matches to only include those with a `ll_uuid`, `address`, and 'short' form address (Regrid can return dupes)
 * Sorts matches by whether or not they are in a supported market, then by score
 * And returns only the first 10 matches
 */
function filterSortAndSliceAddressMatches(regridTypeaheadResponseData) {
  // Filter and sort matches
  const filteredAndSortedMatches = regridTypeaheadResponseData
    .filter((match) => {
      return (
        match.ll_uuid && match.address && match.address.match(/^[0-9].*[^0-9]$/)
      )
    })
    .sort((a, b) => {
      const marketComparison = compareMatchesInMarket(a, b)
      if (marketComparison != 0) {
        return marketComparison
      } else {
        return compareMatchesScores(a, b)
      }
    })

  // Slice matches to only include first 10
  const slicedMatches = filteredAndSortedMatches.slice(0, 10)

  return slicedMatches
}

/**
 * ----------------------------------------------------------------
 * compareMatchesInMarket
 * ----------------------------------------------------------------
 * Given two Regrid Typeahead API matches, compares them to determine which is in a supported market
 * Returns -1, 1, or 0 to be used in an array sort
 */
function compareMatchesInMarket(a, b) {
  if (isInMarketMatch(a) && !isInMarketMatch(b)) {
    return -1
  } else if (!isInMarketMatch(a) && isInMarketMatch(b)) {
    return 1
  } else {
    return 0
  }
}

/**
 * ----------------------------------------------------------------
 * isInMarketMatch
 * ----------------------------------------------------------------
 * Given a Regrid Typeahead API match, returns true if it is in a supported market
 */
function isInMarketMatch(match) {
  return match.context == "Sacramento, CA"
}

/**
 * ----------------------------------------------------------------
 * compareMatchesScores
 * ----------------------------------------------------------------
 * Given two Regrid Typeahead API matches, compares them to determine which has a higher score
 * Returns -1, 1, or 0 to be used in an array sort
 */
function compareMatchesScores(a, b) {
  if (a.score > b.score) {
    return -1
  } else if (a.score < b.score) {
    return 1
  } else {
    return 0
  }
}

/**
 * ----------------------------------------------------------------
 * fetchParcelDetails
 * ----------------------------------------------------------------
 * Given id (`ll_uuid` provided for every match via Redrid typeahead API), returns parcel details needed for estimate generation
 * Fetches full details from Regrid Parcel API, filters and formays results to only fields we need, and returns the object
 */
async function fetchParcelDetails(id) {
  const parcelLookupUrl = "https://app.regrid.com/api/v1/parcel/"
  const parcelLookupToken =
    "1SnpL7AQekjA4mH2vqUmkGm9AAfQxi_6mxwdm4qDzo_C-xSTx9z3pd9rTsRWDWV4"
  const parcelLookupRequest = new Request(
    `${parcelLookupUrl}${id}.json?token=${parcelLookupToken}&return_custom=false`,
    {
      method: "GET",
    }
  )

  const response = await fetch(parcelLookupRequest)
  if (!response.ok) {
    throw new Error("Network response was not OK")
  }
  const responseData = await response.json()
  return filterParcelDetails(responseData)
}

/**
 * ----------------------------------------------------------------
 * filterParcelDetails
 * ----------------------------------------------------------------
 * Maps and returns an object with only the fields needed for our flow, provided by the Regrid Parcel API request
 */
function filterParcelDetails(regridParcelResponseData) {
  const regridResultFields =
    regridParcelResponseData.results[0].properties.fields

  return {
    apn: regridResultFields.parcelnumb_no_formatting,
    jurisdiction: regridResultFields.county,
    address: regridResultFields.address,
    city: regridResultFields.mail_city,
    state: regridResultFields.mail_state2,
    zip: regridResultFields.mail_zip,
  }
}

/**
 * ----------------------------------------------------------------
 * fetchEstimateResults
 * ----------------------------------------------------------------
 * Given a payload with the parcel `apn` and `jurisdiction`, submits request to our Make.com Get Estimate endpoint
 * Endpoint is integrated with our Airtable offer database to look up and return estimate values, and jurisdiction status
 */
async function fetchEstimateResults(payload) {
  const request = new Request(
    "https://hook.us1.make.com/t9mrl5xiqcub1netw5sk7l1vjgoz3gt9",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  )

  const response = await fetch(request)
  if (!response.ok) {
    throw new Error("Network response was not OK")
  }
  return await response.json()
}

/**
 * ----------------------------------------------------------------
 * createLead
 * ----------------------------------------------------------------
 * Given a payload with contact info and address fields, submits request to our Make.com Create Lead endpoint
 * Endpoint is integrated with our Hubspot account to create/update Contacts in that system
 */
async function createLead(payload) {
  const request = new Request(
    "https://hook.us1.make.com/7pyo51sq4xxjbpz14t03uomufndj45ut",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  )

  const response = await fetch(request)
  if (!response.ok) {
    throw new Error("Network response was not OK")
  }
}

/**
 * ----------------------------------------------------------------
 * trackEvent
 * ----------------------------------------------------------------
 * Given an event name and properties, submits an event to any of our event tracking services
 * Currently only supports FullStory
 */
function trackEvent(eventName, eventProperties = {}) {
  // If FS is available (FullStory tracking is active), send event to FullStory
  try {
    if (FS) {
      FS.event(eventName, eventProperties)
    }
  } catch (error) {
    // FUTURE DEV: Update w/ error tracking / reporting through integrated system
  }
}
