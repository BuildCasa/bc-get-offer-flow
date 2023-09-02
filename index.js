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
loadScript("https://unpkg.com/alpinejs@3.10.5/dist/cdn.min.js", {defer: true})

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
  $store.personalizationViewModel = createPersonalizationViewModel()
  $store.experimentationViewModel = createExperimentationViewModel()
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
      if ($store.experimentationViewModel.getActiveExperimentVariation("windfall-estimate-or-eligibility-2023-07")) {
        $store.experimentationViewModel.clearActiveExperiment("windfall-estimate-or-eligibility-2023-07")
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
      trackEvent("Address Selected")
    },
    handleSubmit(event, options = {}) {
      // Block default form submission behavior
      event.preventDefault()
      event.stopPropagation()

      // Submit address
      this.submitAddress(options)
    },
    async submitAddress(options = {}) {
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

      // Track address submission event
      trackEvent("Address Submitted")

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
              ...options,
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

          trackEvent("Address Submission Succeeded")
        }
      } catch (error) {
        $store.flowState.value = $store.flowStateMachine.transition(
          $store.flowState.value,
          "SUCCESS"
        )

        trackEvent("Address Submission Errors (Non-Blocking)")
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
 * - desiredTimeline: String, bound (2-way, via `x-model`) to Desired Timeline input field in the UI
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
    desiredTimeline: "",
    submitButtonText: {
      normal: "",
      processing: "",
    },
    errorMessage: "",
    get hasContactDetails() {
      return (
        !!this.firstName.trim() &&
        !!this.lastName.trim() &&
        !!this.email.trim() &&
        !!this.phone.trim()
      )
    },
    isSubmitted: false,
    lotAnalysisStep: "",
    init() {
      this.firstName = ""
      this.lastName = ""
      this.email = ""
      this.phone = ""
      this.desiredTimeline = ""
      this.errorMessage = ""
      this.isSubmitted = false,
      this.lotAnalysisStep = "Checking..."

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
    handleSubmit(event, options = {}) {
      // Block default form submission behavior
      event.preventDefault()
      event.stopPropagation()

      // Submit contact info to create lead
      this.submitContact(options)
    },
    async submitContact(options = {}) {
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

      // If the user has an active jurisdiction and an estimate, and the offering / lead type is "Windfall",
      // set appropriate variation for the Jul 2023 "Estimate or eligibility" experiment
      if ($store.estimateViewModel.hasActiveJurisdiction && $store.estimateViewModel.hasEstimate &&
          options && options.lead && options.lead.type && options.lead.type === 'Windfall') {  
        const experiment = "windfall-estimate-or-eligibility-2023-07"
        const variation = Math.random() < 0.5 ? "amount-excluded" : "amount-included"
        $store.experimentationViewModel.setActiveExperimentVariation(experiment, variation)
      }

      // Track contact submission event
      trackEvent("Contact Submitted")

      try {
        // Process the submitted contact info, and transition the state accordingly
        
        // Create contact object for the create lead payload
        let contact = {
          firstName: this.firstName.trim(),
          lastName: this.lastName.trim(),
          email: this.email.trim(),
          phone: this.phone.trim(),
          desiredTimeline: this.desiredTimeline.trim(),
        }

        // Validate email address and phone number
        if (!validateEmailAddress(contact.email)) {
          throw new Error("Please enter a valid email address, and try again.", { cause: "INVALID_EMAIL" })
        }
        if (!validatePhoneNumber(contact.phone)) {
          throw new Error("Please enter a valid phone number, including area code, and try again.", { cause: "INVALID_PHONE" })
        }

        // Add address info to the contact object
        // If parcel details are available, use them
        // Otherwise, use the address info from the selected address
        if ($store.addressViewModel.hasParcelDetails) {
          contact = {
            ...contact,
            ...$store.addressViewModel.parcelDetails,
          }
        } else if ($store.addressViewModel.isSelected) {
          contact = {
            ...contact,
            address: [$store.addressViewModel.selectedMatch.address, $store.addressViewModel.selectedMatch.context].join(', '),
          }
        }
        
        // Put together the create lead payload
        const createLeadPayload = {
          ...options,
          contact: contact,
          activeExperimentVariations: $store.experimentationViewModel.activeExperimentVariations,
        }

        // Start sequencing through the lot analysis steps, and the create lead request in parallel
        await Promise.all([
          sequenceLotAnalysisSteps(this),
          createLead(createLeadPayload)
        ]);

        // As long as the user is not in an inactive jurisdiction,
        // dynamically load the Calendly script
        if (!$store.estimateViewModel.hasResults || $store.estimateViewModel.hasActiveJurisdiction) {
          loadScript("https://assets.calendly.com/assets/external/widget.js", {async: true})
        }

        // If the user has an active jurisdiction and an estimate,
        // dynamically load the Calendly and tsparticles-confetti scripts
        if ($store.estimateViewModel.hasActiveJurisdiction && $store.estimateViewModel.hasEstimate) { 
          await loadScript("https://cdn.jsdelivr.net/npm/tsparticles-confetti@2.11.0/tsparticles.confetti.bundle.min.js", {async: true})
        }

        this.isSubmitted = true

        // Transition to the estimate results state
        $store.flowState.value = $store.flowStateMachine.transition(
          $store.flowState.value,
          "SUCCESS"
        )

        // If the user has an active jurisdiction and an estimate,
        // pop the confetti animation after a short delay
        if ($store.estimateViewModel.hasActiveJurisdiction && $store.estimateViewModel.hasEstimate && confetti) { 
          setTimeout(() => {
            confetti("tsparticles", {
              angle: 270,
              count: 90,
              position: {
                x: 50,
                y: -5,
              },
              spread: 180,
              startVelocity: 10,
              ticks: 200,
              colors: ["#ffffff", "#4cbd98", "#346af8"],
              zIndex: 9999,
              disableForReducedMotion: true,
            });
          }, 500);
        }

        trackEvent("Contact Submission Succeeded")
      } catch (error) {
        // If error is thrown due to invalid email or phone number, show the specific error message
        // Otherwise, show a generic error message
        if (error && error.cause && (error.cause === "INVALID_EMAIL" || error.cause === "INVALID_PHONE")) {
          this.errorMessage = error.message
        } else {
          this.errorMessage =
          "There was an error processing your info. Please try again, or contact us for help."
        }

        $store.flowState.value = $store.flowStateMachine.transition(
          $store.flowState.value,
          "ERROR"
        )

        trackEvent("Contact Submission Failed", {
          error_str: this.errorMessage,
        })
      }
    },
  })

  // Return reference to the new contactViewModel store
  return Alpine.store("contactViewModel")
}

/**
 * ----------------------------------------------------------------
 * createEstimateViewModel
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
    get hasActiveJurisdiction() {
      return this.jurisdiction.status == "active"
    },
    get hasEstimate() {
      return !!this.estimate.low && !!this.estimate.high
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

      // Track Schedule Consultation button click
      trackEvent("Schedule Consultation Clicked")
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

      // Track Request Community button click
      trackEvent("Community Requested")
    },
  })

  // Return reference to the new estimateViewModel store
  return Alpine.store("estimateViewModel")
}

/**
 * ----------------------------------------------------------------
 * createPersonalizationViewModel
 * ----------------------------------------------------------------
 * Creates and returns reference to an Alpine store for the personalizationViewModel
 * Contains data used to personalize the user experience
 * Initially, it fetches and stores geolocation data from the user's IP address
 * And, 
 * Can be accessed in HTML via directive attribute values w/ `$store.personalizationViewModel`
 *
 * - userGeo: Object, w/ the geolocation data provided by integrated IP lookup API
 * - market: Getter, returns the supported market based on the userGeo city, if one is found
 * - bcPhoneNumber: Getter, returns the correct BuildCasa phone number based on the userGeo
 * - bcPhoneNumberHref: Getter, returns the correct BuildCasa phone number based on the userGeo in href format (for `tel:` links)
 * - init: Function, run automatically by Alpine as soon as the store is created, to initialize the values (including advanced logic)
 */
function createPersonalizationViewModel() {
  Alpine.store("personalizationViewModel", {
    userGeo: {},
    marketsData: {},
    get market() {
      return getMarketForCity(this.userGeo.city, this.marketsData)
    },
    get bcPhoneNumber() {
      return getBcPhoneNumberForCity(this.userGeo.city, this.marketsData)
    },
    get bcPhoneNumberHref() {
      return `tel:+1${this.bcPhoneNumber.replace(/\D/g, "")}`
    },
    async init() {
      this.marketsData = {
        "Sacramento": {
          bcPhoneNumber: "(916) 619-1442",
          cities: [
            "Alta",
            "Auburn",
            "Carnelian Bay",
            "Cedar Flat",
            "Colfax",
            "Dollar Point",
            "Dutch Flat",
            "Foresthill",
            "Granite Bay",
            "Kings Beach",
            "Kingvale",
            "Lincoln",
            "Loomis",
            "Meadow Vista",
            "Newcastle",
            "North Auburn",
            "Penryn",
            "Rocklin",
            "Roseville",
            "Sheridan",
            "Sunnyside-Tahoe City",
            "Tahoe Vista",
            "Tahoma",
            "Truckee",
            "Antelope",
            "Arden-Arcade",
            "Carmichael",
            "Citrus Heights",
            "Clay",
            "Courtland",
            "Elk Grove",
            "Elverta",
            "Fair Oaks",
            "Florin",
            "Folsom",
            "Foothill Farms",
            "Franklin",
            "Freeport",
            "Fruitridge Pocket",
            "Galt",
            "Gold River",
            "Herald",
            "Hood",
            "Isleton",
            "La Riviera",
            "Lemon Hill",
            "Mather",
            "McClellan Park",
            "North Highlands",
            "Orangevale",
            "Parkway",
            "Rancho Cordova",
            "Rancho Murieta",
            "Rio Linda",
            "Rosemont",
            "Sacramento",
            "Vineyard",
            "Walnut Grove",
            "Wilton",
            "Clarksburg",
            "Davis",
            "Dunnigan",
            "El Macero",
            "Esparto",
            "Guinda",
            "Knights Landing",
            "Madison",
            "Monument Hills",
            "Rumsey",
            "Tancred",
            "West Sacramento",
            "Winters",
            "Woodland",
            "Yolo",
          ],
        },
        "Bay Area" : {
          bcPhoneNumber: "(415) 941-5861",
          cities: [
            "Alameda",
            "Albany",
            "Ashland",
            "Berkeley",
            "Castro Valley",
            "Cherryland",
            "Dublin",
            "Emeryville",
            "Fairview",
            "Fremont",
            "Hayward",
            "Livermore",
            "Newark",
            "Oakland",
            "Piedmont",
            "Pleasanton",
            "San Leandro",
            "San Lorenzo",
            "Sunol",
            "Union City",
            "Acalanes Ridge",
            "Alamo",
            "Alhambra Valley",
            "Antioch",
            "Bay Point",
            "Bayview",
            "Bethel Island",
            "Blackhawk",
            "Brentwood",
            "Byron",
            "Camino Tassajara",
            "Castle Hill",
            "Clayton",
            "Clyde",
            "Concord",
            "Contra Costa Centre",
            "Crockett",
            "Danville",
            "Diablo",
            "Discovery Bay",
            "East Richmond Heights",
            "El Cerrito",
            "El Sobrante",
            "Hercules",
            "Kensington",
            "Knightsen",
            "Lafayette",
            "Martinez",
            "Montalvin Manor",
            "Moraga",
            "Mountain View",
            "Norris Canyon",
            "North Gate",
            "North Richmond",
            "Oakley",
            "Orinda",
            "Pacheco",
            "Pinole",
            "Pittsburg",
            "Pleasant Hill",
            "Port Costa",
            "Reliez Valley",
            "Richmond",
            "Rodeo",
            "Rollingwood",
            "San Miguel",
            "San Pablo",
            "San Ramon",
            "Saranap",
            "Shell Ridge",
            "Tara Hills",
            "Vine Hill",
            "Walnut Creek",
            "Alto",
            "Belvedere",
            "Black Point-Green Point",
            "Bolinas",
            "Corte Madera",
            "Dillon Beach",
            "Fairfax",
            "Inverness",
            "Kentfield",
            "Lagunitas-Forest Knolls",
            "Larkspur",
            "Lucas Valley-Marinwood",
            "Marin City",
            "Mill Valley",
            "Muir Beach",
            "Nicasio",
            "Novato",
            "Point Reyes Station",
            "Ross",
            "San Anselmo",
            "San Geronimo",
            "San Rafael",
            "Santa Venetia",
            "Sausalito",
            "Sleepy Hollow",
            "Stinson Beach",
            "Strawberry",
            "Tamalpais-Homestead Valley",
            "Tiburon",
            "Tomales",
            "Woodacre",
            "Atwater",
            "Ballico",
            "Bear Creek",
            "Cressey",
            "Delhi",
            "Dos Palos",
            "Dos Palos Y",
            "El Nido",
            "Franklin",
            "Gustine",
            "Hilmar-Irwin",
            "Le Grand",
            "Livingston",
            "Los Banos",
            "McSwain",
            "Merced",
            "Planada",
            "Santa Nella",
            "Snelling",
            "South Dos Palos",
            "Stevinson",
            "Tuttle",
            "Volta",
            "Winton",
            "Aromas",
            "Boronda",
            "Bradley",
            "Carmel Valley Village",
            "Carmel-by-the-Sea",
            "Castroville",
            "Chualar",
            "Del Monte Forest",
            "Del Rey Oaks",
            "Elkhorn",
            "Gonzales",
            "Greenfield",
            "King City",
            "Las Lomas",
            "Lockwood",
            "Marina",
            "Monterey",
            "Moss Landing",
            "Pacific Grove",
            "Pajaro",
            "Pine Canyon",
            "Prunedale",
            "Salinas",
            "San Ardo",
            "San Lucas",
            "Sand City",
            "Seaside",
            "Soledad",
            "Spreckels",
            "American Canyon",
            "Angwin",
            "Calistoga",
            "Deer Park",
            "Napa",
            "Silverado Resort",
            "St. Helena",
            "Vallejo",
            "Yountville",
            "August",
            "Country Club",
            "Dogtown",
            "Escalon",
            "Farmington",
            "French Camp",
            "Garden Acres",
            "Kennedy",
            "Lathrop",
            "Linden",
            "Lockeford",
            "Lodi",
            "Manteca",
            "Mountain House",
            "Peters",
            "Ripon",
            "Stockton",
            "Taft Mosswood",
            "Tracy",
            "Woodbridge",
            "Baywood Park",
            "Belmont",
            "Brisbane",
            "Broadmoor",
            "Burlingame",
            "Colma",
            "Daly City",
            "El Granada",
            "Highlands",
            "Hillsborough",
            "Millbrae",
            "Montara",
            "Moss Beach",
            "Pacifica",
            "San Bruno",
            "San Mateo",
            "South San Francisco",
            "Alum Rock",
            "Burbank",
            "Cambrian Park",
            "Campbell",
            "Cupertino",
            "East Foothills",
            "Fremont",
            "Fruitdale",
            "Gilroy",
            "Lexington Hills",
            "Los Altos",
            "Los Altos Hills",
            "Los Gatos",
            "Loyola",
            "Milpitas",
            "Monte Sereno",
            "Morgan Hill",
            "Mountain View",
            "Palo Alto",
            "Portola Valley",
            "San Jose",
            "San Martin",
            "Santa Clara",
            "Saratoga",
            "Stanford",
            "Sunnyvale",
            "Allendale",
            "Benicia",
            "Dixon",
            "Elmira",
            "Fairfield",
            "Green Valley",
            "Hartley",
            "Rio Vista",
            "Suisun City",
            "Vacaville",
            "Vallejo",
            "Bloomfield",
            "Bodega",
            "Bodega Bay",
            "Boyes Hot Springs",
            "Carmet",
            "Cazadero",
            "Cloverdale",
            "Cotati",
            "El Verano",
            "Eldridge",
            "Fetters Hot Springs-Agua Caliente",
            "Forestville",
            "Fulton",
            "Geyserville",
            "Glen Ellen",
            "Graton",
            "Guerneville",
            "Healdsburg",
            "Jenner",
            "Kenwood",
            "Larkfield-Wikiup",
            "Monte Rio",
            "Occidental",
            "Penngrove",
            "Petaluma",
            "Rohnert Park",
            "Salmon Creek",
            "Santa Rosa",
            "Sea Ranch",
            "Sebastopol",
            "Sereno del Mar",
            "Sonoma",
            "Temelec",
            "Timber Cove",
            "Valley Ford",
            "Windsor",
          ],
        },
        "SoCal": {
          bcPhoneNumber: "(213) 322-1360",
          cities: [
            "Auberry",
            "Big Creek",
            "Biola",
            "Bowles",
            "Calwa",
            "Cantua Creek",
            "Caruthers",
            "Centerville",
            "Clovis",
            "Coalinga",
            "Del Rey",
            "Easton",
            "Firebaugh",
            "Fort Washington",
            "Fowler",
            "Fresno",
            "Friant",
            "Huron",
            "Kerman",
            "Kingsburg",
            "Lanare",
            "Laton",
            "Malaga",
            "Mayfair",
            "Mendota",
            "Millerton",
            "Minkler",
            "Monmouth",
            "Old Fig Garden",
            "Orange Cove",
            "Parlier",
            "Raisin City",
            "Reedley",
            "Riverdale",
            "San Joaquin",
            "Sanger",
            "Selma",
            "Shaver Lake",
            "Squaw Valley",
            "Sunnyside",
            "Tarpey Village",
            "Three Rocks",
            "Tranquillity",
            "West Park",
            "Westside",
            "Alta Sierra",
            "Arvin",
            "Bakersfield",
            "Bakersfield Country Club",
            "Bear Valley Springs",
            "Benton Park",
            "Bodfish",
            "Boron",
            "Buttonwillow",
            "California City",
            "Casa Loma",
            "Cherokee Strip",
            "China Lake Acres",
            "Choctaw Valley",
            "Cottonwood",
            "Delano",
            "Derby Acres",
            "Di Giorgio",
            "Dustin Acres",
            "East Bakersfield",
            "East Niles",
            "Edison",
            "Edmundson Acres",
            "El Adobe",
            "Fairfax",
            "Ford City",
            "Frazier Park",
            "Fuller Acres",
            "Glennville",
            "Golden Hills",
            "Goodmanville",
            "Greenacres",
            "Greenfield",
            "Hillcrest",
            "Inyokern",
            "Johannesburg",
            "Keene",
            "Kernville",
            "La Cresta",
            "Lake Isabella",
            "Lake of the Woods",
            "Lakeside",
            "Lamont",
            "Lebec",
            "Lost Hills",
            "Maricopa",
            "McFarland",
            "McKittrick",
            "Mettler",
            "Mexican Colony",
            "Mojave",
            "Mountain Meadows",
            "Mountain Mesa",
            "North Edwards",
            "Oildale",
            "Old River",
            "Old Stine",
            "Olde Stockdale",
            "Onyx",
            "Pine Mountain Club",
            "Potomac Park",
            "Pumpkin Center",
            "Randsburg",
            "Rexland Acres",
            "Ridgecrest",
            "Ridgecrest Heights",
            "Rivergrove",
            "Rosamond",
            "Rosedale",
            "Shafter",
            "Smith Corner",
            "South Taft",
            "Squirrel Mountain Valley",
            "Stallion Springs",
            "Stebbins",
            "Taft",
            "Taft Heights",
            "Tarina",
            "Tehachapi",
            "Tupman",
            "Valley Acres",
            "Wasco",
            "Weedpatch",
            "Weldon",
            "Wofford Heights",
            "Woody",
            "Acton",
            "Agoura Hills",
            "Agua Dulce",
            "Alhambra",
            "Alondra Park",
            "Altadena",
            "Arcadia",
            "Artesia",
            "Avalon",
            "Avocado Heights",
            "Azusa",
            "Baldwin Park",
            "Bell",
            "Bell Gardens",
            "Bellflower",
            "Beverly Hills",
            "Bradbury",
            "Burbank",
            "Calabasas",
            "Carson",
            "Castaic",
            "Cerritos",
            "Charter Oak",
            "Citrus",
            "Claremont",
            "Commerce",
            "Compton",
            "Covina",
            "Cudahy",
            "Culver City",
            "Del Aire",
            "Desert View Highlands",
            "Diamond Bar",
            "Downey",
            "Duarte",
            "East Los Angeles",
            "East Pasadena",
            "East Rancho Dominguez",
            "East San Gabriel",
            "East Whittier",
            "El Monte",
            "El Segundo",
            "Elizabeth Lake",
            "Florence-Graham",
            "Gardena",
            "Glendale",
            "Glendora",
            "Green Valley",
            "Hacienda Heights",
            "Hasley Canyon",
            "Hawaiian Gardens",
            "Hawthorne",
            "Hermosa Beach",
            "Hidden Hills",
            "Huntington Park",
            "Industry",
            "Inglewood",
            "Irwindale",
            "La Cañada Flintridge",
            "La Crescenta-Montrose",
            "La Habra Heights",
            "La Mirada",
            "La Puente",
            "La Verne",
            "Ladera Heights",
            "Lake Hughes",
            "Lake Los Angeles",
            "Lakewood",
            "Lancaster",
            "Lawndale",
            "Lennox",
            "Leona Valley",
            "Littlerock",
            "Lomita",
            "Long Beach",
            "Los Angeles",
            "Lynwood",
            "Malibu",
            "Manhattan Beach",
            "Marina del Rey",
            "Mayflower Village",
            "Maywood",
            "Monrovia",
            "Montclair",
            "Montebello",
            "Monterey Park",
            "North El Monte",
            "Norwalk",
            "Palmdale",
            "Palos Verdes Estates",
            "Paramount",
            "Pasadena",
            "Pepperdine University",
            "Pico Rivera",
            "Pomona",
            "Quartz Hill",
            "Rancho Palos Verdes",
            "Redondo Beach",
            "Rolling Hills",
            "Rolling Hills Estates",
            "Rose Hills",
            "Rosemead",
            "Rowland Heights",
            "San Dimas",
            "San Fernando",
            "San Gabriel",
            "San Marino",
            "San Pasqual",
            "Santa Clarita",
            "Santa Fe Springs",
            "Santa Monica",
            "Sierra Madre",
            "Signal Hill",
            "South El Monte",
            "South Gate",
            "South Monrovia Island",
            "South Pasadena",
            "South San Gabriel",
            "South San Jose Hills",
            "South Whittier",
            "Stevenson Ranch",
            "Sun Village",
            "Temple City",
            "Topanga",
            "Torrance",
            "Val Verde",
            "Valinda",
            "Vernon",
            "View Park-Windsor Hills",
            "Vincent",
            "Walnut",
            "Walnut Park",
            "West Athens",
            "West Carson",
            "West Covina",
            "West Hollywood",
            "West Puente Valley",
            "West Rancho Dominguez",
            "West Whittier-Los Nietos",
            "Westlake Village",
            "Westmont",
            "Whittier",
            "Willowbrook",
            "Aliso Viejo",
            "Anaheim",
            "Brea",
            "Buena Park",
            "Chino Hills",
            "Costa Mesa",
            "Coto de Caza",
            "Cypress",
            "Dana Point",
            "Fountain Valley",
            "Fullerton",
            "Garden Grove",
            "Huntington Beach",
            "Irvine",
            "La Habra",
            "La Mirada",
            "La Palma",
            "Ladera Ranch",
            "Laguna Beach",
            "Laguna Hills",
            "Laguna Niguel",
            "Laguna Woods",
            "Lake Forest",
            "Las Flores",
            "Long Beach",
            "Los Alamitos",
            "Midway City",
            "Mission Viejo",
            "Modjeska",
            "Newport Beach",
            "North Tustin",
            "Orange",
            "Placentia",
            "Rancho Mission Viejo",
            "Rancho Santa Margarita",
            "Rossmoor",
            "San Clemente",
            "San Juan Capistrano",
            "Santa Ana",
            "Seal Beach",
            "Silverado",
            "Stanton",
            "Trabuco Canyon",
            "Tustin",
            "Villa Park",
            "Westminster",
            "Williams Canyon",
            "Yorba Linda",
            "Aguanga",
            "Anza",
            "Banning",
            "Beaumont",
            "Bermuda Dunes",
            "Blythe",
            "Cabazon",
            "Calimesa",
            "Canyon Lake",
            "Cathedral City",
            "Cherry Valley",
            "Coachella",
            "Colton",
            "Corona",
            "Coronita",
            "Desert Center",
            "Desert Edge",
            "Desert Hot Springs",
            "Desert Palms",
            "East Hemet",
            "Eastvale",
            "El Cerrito",
            "El Sobrante",
            "Fontana",
            "French Valley",
            "Garnet",
            "Good Hope",
            "Green Acres",
            "Hemet",
            "Highgrove",
            "Home Gardens",
            "Homeland",
            "Idyllwild-Pine Cove",
            "Indian Wells",
            "Indio",
            "Indio Hills",
            "Jurupa Valley",
            "La Quinta",
            "Lake Elsinore",
            "Lake Mathews",
            "Lake Riverside",
            "Lakeland Village",
            "Lakeview",
            "March ARB",
            "Mead Valley",
            "Meadowbrook",
            "Mecca",
            "Menifee",
            "Mesa Verde",
            "Moreno Valley",
            "Mountain Center",
            "Murrieta",
            "Norco",
            "North Shore",
            "Nuevo",
            "Oasis",
            "Ontario",
            "Palm Desert",
            "Palm Springs",
            "Perris",
            "Rancho Mirage",
            "Redlands",
            "Ripley",
            "Riverside",
            "Romoland",
            "Sage",
            "San Jacinto",
            "Sky Valley",
            "Temecula",
            "Temescal Valley",
            "Thermal",
            "Thousand Palms",
            "Valle Vista",
            "Vista Santa Rosa",
            "Warm Springs",
            "Whitewater",
            "Wildomar",
            "Winchester",
            "Woodcrest",
            "Yucaipa",
            "Adelanto",
            "Apple Valley",
            "Baker",
            "Barstow",
            "Big Bear City",
            "Big Bear Lake",
            "Big River",
            "Bloomington",
            "Bluewater",
            "Chino",
            "Chino Hills",
            "Colton",
            "Crestline",
            "Fontana",
            "Grand Terrace",
            "Hesperia",
            "Highland",
            "Homestead Valley",
            "Joshua Tree",
            "Lake Arrowhead",
            "Lenwood",
            "Loma Linda",
            "Lucerne Valley",
            "Lytle Creek",
            "Mentone",
            "Montclair",
            "Morongo Valley",
            "Mountain View Acres",
            "Muscoy",
            "Needles",
            "Oak Glen",
            "Oak Hills",
            "Ontario",
            "Phelan",
            "Piñon Hills",
            "Pomona",
            "Rancho Cucamonga",
            "Redlands",
            "Rialto",
            "Running Springs",
            "San Antonio Heights",
            "San Bernardino",
            "Searles Valley",
            "Silver Lakes",
            "Spring Valley Lake",
            "Twentynine Palms",
            "Upland",
            "Victorville",
            "Wrightwood",
            "Yermo",
            "Yucaipa",
            "Yucca Valley",
            "Alpine",
            "Bonita",
            "Bonsall",
            "Borrego Springs",
            "Bostonia",
            "Boulevard",
            "Campo",
            "Carlsbad",
            "Casa de Oro-Mount Helix",
            "Chula Vista",
            "Coronado",
            "Crest",
            "Del Dios",
            "Del Mar",
            "Descanso",
            "El Cajon",
            "Elfin Forest",
            "Encinitas",
            "Escondido",
            "Eucalyptus Hills",
            "Fairbanks Ranch",
            "Fallbrook",
            "Granite Hills",
            "Harbison Canyon",
            "Harmony Grove",
            "Hidden Meadows",
            "Imperial Beach",
            "Jacumba",
            "Jamul",
            "Julian",
            "La Mesa",
            "La Presa",
            "Lake San Marcos",
            "Lakeside",
            "Lemon Grove",
            "Mount Laguna",
            "National City",
            "Oceanside",
            "Pala",
            "Pine Valley",
            "Potrero",
            "Poway",
            "Rainbow",
            "Ramona",
            "Rancho San Diego",
            "Rancho Santa Fe",
            "San Diego",
            "San Diego Country Estates",
            "San Marcos",
            "Santee",
            "Solana Beach",
            "Spring Valley",
            "Valley Center",
            "Vista",
            "Winter Gardens",
            "Bell Canyon",
            "Camarillo",
            "Casa Conejo",
            "Channel Islands Beach",
            "El Rio",
            "Fillmore",
            "Lake Sherwood",
            "Meiners Oaks",
            "Mira Monte",
            "Moorpark",
            "Oak Park",
            "Oak View",
            "Ojai",
            "Oxnard",
            "Piru",
            "Port Hueneme",
            "San Buenaventura (Ventura)",
            "Santa Paula",
            "Santa Rosa Valley",
            "Santa Susana",
            "Saticoy",
            "Simi Valley",
            "Somis",
            "Thousand Oaks",
          ],
        }
      }
      
      const response = await fetch("https://get.geojs.io/v1/ip/geo.json")
      this.userGeo = await response.json()
    },
  })

  // Return reference to the new personalizationViewModel store
  return Alpine.store("personalizationViewModel")
}

/**
 * ----------------------------------------------------------------
 * createExperimentationViewModel
 * ----------------------------------------------------------------
 * Creates and returns reference to an Alpine store for the experimentationViewModel
 * Contains data used to drive split tests within the user experience
 * Can be accessed in HTML via directive attribute values w/ `$store.experimentationViewModel`
 *
 * - activeExperimentVariations: Object, containing each active experiment as a key, and the active variation as the value
 * - setActiveExperimentVariation: Function, to set the active variation for a given experiment
 * - getActiveExperimentVariation: Function, to get the active variation for a given experiment
 * - init: Function, run automatically by Alpine as soon as the store is created, to initialize the values (including advanced logic)
 */
function createExperimentationViewModel() {
  Alpine.store("experimentationViewModel", {
    activeExperimentVariations: {},
    setActiveExperimentVariation(experiment, variation) {
      this.activeExperimentVariations[experiment] = variation
    },
    getActiveExperimentVariation(experiment) {
      return this.activeExperimentVariations[experiment]
    },
    clearActiveExperiment(experiment) {
      if (this.activeExperimentVariations[experiment]) {
        delete this.activeExperimentVariations[experiment]
      }
    },
    getFullStoryActiveExperimentVariationsEventPropertyValue() {
      // Convert the activeExperimentVariations object into a single array of strings,
      // concatenating the experiment name and variation name with a colon
      // e.g. ["experiment1:variation1", "experiment2:variation2"]
      return Object.entries(this.activeExperimentVariations).map(([experiment, variation]) => `${experiment}:${variation}`)
    },
    init() {
      this.activeExperimentVariations = {}
    },
  })

  // Return reference to the new experimentationViewModel store
  return Alpine.store("experimentationViewModel")
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
    },
  }
  const modalSubmitAddressTransition = {
    SUBMIT_ADDRESS: {
      target: "modalAddressFormProcessing",
    },
  }
  const submitContactTransition = {
    SUBMIT_CONTACT: {
      target: "contactFormProcessing",
    },
  }
  const exitTransition = {
    EXIT: {
      target: "default",
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
          },
        },
      },
      addressFormProcessing: {
        transitions: {
          SUCCESS: {
            target: "contactForm",
          },
          SKIP_CONTACT: {
            target: "estimateResults",
          },
          ERROR: {
            target: "addressFormError",
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
          },
          SKIP_CONTACT: {
            target: "estimateResults",
          },
          ERROR: {
            target: "modalAddressFormError",
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
          },
          ERROR: {
            target: "contactFormError",
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
          },
          REQUEST_COMMUNITY: {
            target: "requestedCommunity",
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
        trackEvent("Invalid State Transition Triggered", {
          current_state_str: currentState,
          event_str: event,
        })
        return currentState
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

      trackEvent("Modal Get Offer Flow Opened")
    },
    handleModalClose() {
      $store.flowState.value = $store.flowStateMachine.transition(
        $store.flowState.value,
        "EXIT"
      )

      trackEvent("Get Offer Modal Closed")
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
 * Currently, only markets in California are supported
 */
function isInMarketMatch(match) {
  return match.context.endsWith("CA")
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
    apn: regridResultFields.parcelnumb,
    jurisdiction: regridResultFields.county,
    address: regridResultFields.address,
    city: regridResultFields.scity,
    state: regridResultFields.state2,
    zip: regridResultFields.szip,
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
 * validateEmailAddress
 * ----------------------------------------------------------------
 * Given a string input, returns true if it is a valid email address
 */
function validateEmailAddress(input) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  return emailRegex.test(input)
}

/**
 * ----------------------------------------------------------------
 * validatePhoneNumber
 * ----------------------------------------------------------------
 * Given a string input, returns true if it is a valid phone number
 */
function validatePhoneNumber(input) {
  const phoneRegex = /^\+?\d{0,3}?\s?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$|^\d{10}$/
  return phoneRegex.test(input)
}

/**
 * ----------------------------------------------------------------
 * sequenceLotAnalysisSteps
 * ----------------------------------------------------------------
 * Given a contactViewModel, updates the lotAnalysisStep property to each of the steps in the sequence
 * Waits for 1.5s between switches, to simulate the lot analysis process
 */
async function sequenceLotAnalysisSteps(contactViewModel) {
  const analysisSteps = [
    "Checking flood zones...",
    "Checking fire hazard zones...",
    "Checking zoning district...",
    "Checking lot shape & size...",
  ]

  return new Promise(async (resolve) => {
    // For each analysis step, wait 1 second, then update the analysis step
    for (const step of analysisSteps) {
      contactViewModel.lotAnalysisStep = step
      await new Promise((resolve) => setTimeout(resolve, 1500))
    }
    
    resolve()
  })
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
 * getBcPhoneNumberForCity
 * ----------------------------------------------------------------
 * Given a city and marketsData definition object, returns the appropriate BuildCasa phone number to display
 * Ideally, localized to the market, but defaults to a generic number if no market match
 */
function getBcPhoneNumberForCity(city, marketsData) {
  const defaultPhoneNumber = "(415) 941-5861"

  if (!city || typeof city !== "string") return defaultPhoneNumber

  const market = getMarketForCity(city, marketsData)
  const marketSpecificPhoneNumber = getBcPhoneNumberForMarket(market, marketsData)

  return marketSpecificPhoneNumber ?? defaultPhoneNumber
}

/**
 * ----------------------------------------------------------------
 * getMarketForCity
 * ----------------------------------------------------------------
 * Given a city and marketsData definition object, returns a matching BuildCasa 'market', if found
 */
function getMarketForCity(city, marketsData) {
  if (!city || typeof city !== "string") return null

  for (const marketKey of Object.keys(marketsData)) {
    if (marketsData[marketKey].cities.filter((c) => c.toLowerCase().trim() === city.toLowerCase().trim()).length > 0) {
      return marketKey
    }
  }

  return null
}

/**
 * ----------------------------------------------------------------
 * getBcPhoneNumberForMarket
 * ----------------------------------------------------------------
 * Given a 'market' and marketsData definition object, returns a location-specific BuildCasa phone number to display, if found
 */
function getBcPhoneNumberForMarket(market, marketsData) {
  if (!market || typeof market !== "string") return null
  
  for (const marketKey of Object.keys(marketsData)) {
    if (marketKey.toLowerCase().trim() === market.toLowerCase().trim()) {
      return marketsData[marketKey].bcPhoneNumber ?? null
    }
  }

  return null
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
      FS.event(eventName, {...getDefaultTrackingProperties(), eventProperties})
    }
  } catch (error) {
    // FUTURE DEV: Update w/ error tracking / reporting through integrated system
  }
}

/**
 * ----------------------------------------------------------------
 * getDefaultTrackingProperties
 * ----------------------------------------------------------------
 * Returns an object with the properties to be included in event tracking by default
 * Includes address, estimate, and contact details, as well as active experiment variations
 */
function getDefaultTrackingProperties() {
  let eventProperties = {}

  // Include address-related properties
  // If parcel details are available, use them to populate address properties
  // Else, if selected match is available, use it to populate address properties
  if ($store.addressViewModel.hasParcelDetails) {
    const parcelDetailsProperties = {
      address_str: $store.addressViewModel.parcelDetails.address,
      address_city_str: $store.addressViewModel.parcelDetails.city,
      address_state_str: $store.addressViewModel.parcelDetails.state,
      address_zip_str: $store.addressViewModel.parcelDetails.zip,
      parcel_apn_str: $store.addressViewModel.parcelDetails.apn,
      parcel_jurisdiction_str: $store.addressViewModel.parcelDetails.jurisdiction,
    }
     eventProperties = {
      ...eventProperties,
      ...parcelDetailsProperties,
    }
  } else if ($store.addressViewModel.selectedMatch) {
    const selectedMatchProperties = {
      address_str: $store.addressViewModel.selectedMatch.address,
      address_context_str: $store.addressViewModel.selectedMatch.context,
      regrid_ll_uuid_str: $store.addressViewModel.selectedMatch.ll_uuid,
    }
    eventProperties = {
      ...eventProperties,
      ...selectedMatchProperties,
    }
  }

  // Include estimate-related properties
  // If estimate results are available, use them to populate estimate properties
  if ($store.estimateViewModel.hasEstimateResults) {
    const estimateProperties = {
      jurisdiction_status_str: $store.estimateViewModel.jurisdiction.status,
      estimate_low_real: $store.estimateViewModel.estimate.low,
      estimate_high_real: $store.estimateViewModel.estimate.high,
    }
     eventProperties = {
      ...eventProperties,
      ...estimateProperties,
    }
  }

  // Include contact-related properties
  // If contact details are available, use them to populate contact properties
  if ($store.contactViewModel.hasContactDetails) {
    const contactProperties = {
      contact_first_name_str: $store.contactViewModel.firstName,
      contact_last_name_str: $store.contactViewModel.lastName,
      contact_email_str: $store.contactViewModel.email,
      contact_phone_str: $store.contactViewModel.phone,
      contact_desired_timeline_str: $store.contactViewModel.desiredTimeline,
    }
    eventProperties = {
      ...eventProperties,
      ...contactProperties,
    }
  }

  // Include active experiment variations
  eventProperties.active_experiment_variations_strs = $store.experimentationViewModel.getFullStoryActiveExperimentVariationsEventPropertyValue()

  return eventProperties
}

/**
 * ----------------------------------------------------------------
 * loadScript
 * ----------------------------------------------------------------
 * Given a script source URL, loads the script into the DOM
 * Returns a Promise that resolves when the script has loaded
 */
async function loadScript(src, options = {}) {
  return new Promise(function(resolve, reject) {
    const script = document.createElement("script")
    script.src = src

    if (options.defer) {
      script.defer = true
    } else if (options.async) {
      script.async = true
    }

    script.addEventListener("load", function() {
      resolve()
    })
    script.addEventListener("error", function(e) {
      reject(e)
    })
    document.body.appendChild(script)
  })
}
