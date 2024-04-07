// TODO: Create JSDoc interface for an AddressViewModel.

/*
 * ----------------------------------------------------------------
 * Functions
 * ----------------------------------------------------------------
 */

/**
 * Factory function for creating an AddressViewModel instance.
 * @param {unknown} globalStore - Reference to the global store.
 * @param {object} trackingService - Reference to the desired TrackingService to use for event tracking.
 * @returns {AddressViewModel} New AddressViewModel instance.
 */
function createAddressViewModel(globalStore, trackingService) {
  return {
    inputValue: '',
    matches: [],
    keyboardNavIndex: -1,
    selectedMatch: {},
    parcelDetails: {},
    submitButtonText: {
      normal: 'Get Offer',
      processing: 'Getting Offer...',
    },
    errorMessage: '',

    /**
     * Initializes the address view model properties.
     * Run automatically by Alpine, but can also be called manually to reset the view model state.
     * Need to call this manually on store creation if we stop using Alpine as our UI library.
     * @returns {void}
     */
    init() {
      this.inputValue = ''
      this.matches = []
      this.keyboardNavIndex = -1
      this.selectedMatch = {}
      this.parcelDetails = {}
      this.errorMessage = ''

      // Pre-fill submit button text values based on Webflow settings
      // Preserves Webflow DX for editing button values through the UI (`button` and `waiting` settings)
      // But allows dynamically controlling displayed text in site, based on current UI state, via Alpine
      const addressFormSubmitButton = document.getElementById(
        'address-form-submit-button',
      )
      this.submitButtonText = {
        normal: addressFormSubmitButton.value,
        processing: addressFormSubmitButton.dataset.wait,
      }

      // FUTURE DEV: Add logic to pre-fill data based on other sources (link params, etc.) here
    },

    /**
     * Whether or not an address match has been selected with the typeahead.
     * @type {boolean}
     */
    get isSelected() {
      return (
        Object.keys(this.selectedMatch).length != 0 &&
        !!this.selectedMatch.ll_uuid
      )
    },

    /**
     * Whether or not the parcel details (jurisdiction and apn) have been set for the address.
     * @type {boolean}
     */
    get hasParcelDetails() {
      return (
        Object.keys(this.parcelDetails).length != 0 &&
        !!this.parcelDetails.jurisdiction &&
        !!this.parcelDetails.apn
      )
    },

    /**
     * Handles input events from the address typeahead input field.
     * Fetches and updates address matches based on the current input value.
     * @returns {Promise.<void>} Promise that resolves when input handling is complete.
     */
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
      if (globalStore.estimateViewModel.hasResults) {
        globalStore.estimateViewModel.init()
      }
      if (globalStore.contactViewModel.isSubmitted) {
        globalStore.contactViewModel.isSubmitted = false
      }
      if (
        globalStore.experimentationViewModel.getActiveExperimentVariation(
          'windfall-estimate-or-eligibility-2023-07',
        )
      ) {
        globalStore.experimentationViewModel.clearActiveExperiment(
          'windfall-estimate-or-eligibility-2023-07',
        )
      }

      // Fetch and update address matches (or handle errors)
      try {
        this.matches = await fetchAddressMatches(this.inputValue)
      } catch (error) {
        this.errorMessage =
          'There was an error finding your address. Please try again, or contact us for help.'

        globalStore.flowState.transition('ERROR')
      }
    },

    /**
     * Handles keyboard events for the address typeahead input field.
     * Navigates up or down the list of matches if ArrowUp or ArrowDown are pressed.
     * Selects the address at the current keyboardNavIndex if Enter is pressed.
     * @param {KeyboardEvent} event - Keyboard event object.
     * @returns {void}
     */
    handleKeydown(event) {
      // Don't intercept keydown events for any keys other than ArrowUp, ArrowDown, or Enter
      if (
        event.key != 'Enter' &&
        event.key != 'ArrowUp' &&
        event.key != 'ArrowDown'
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
      if (event.key === 'Enter' && this.keyboardNavIndex != -1) {
        // If Enter key is pressed, select the match at the current position
        this.handleMatchSelection(this.matches[this.keyboardNavIndex])
      } else if (event.key === 'ArrowUp') {
        // If ArrowUp key is pressed and no matches have been navigated to via keyboard yet, navigate to the bottom of the list
        // Else, navigate up one match from the current position
        this.keyboardNavIndex =
          this.keyboardNavIndex <= -1
            ? this.matches.length - 1
            : this.keyboardNavIndex - 1
      } else if (event.key === 'ArrowDown') {
        // If ArrowDown key is pressed and current position is at the bottom of the list, navigate to the starting position
        // Else, navigate down one match from the current position
        this.keyboardNavIndex =
          this.keyboardNavIndex >= this.matches.length - 1
            ? -1
            : this.keyboardNavIndex + 1
      }
    },

    /**
     * Handles the selection of an address match from the list of available matches.
     * Updates the selected address and typeahead input value.
     * Clears the matches list and keyboard navigation index.
     * @param {unknown} match
     */
    handleMatchSelection(match) {
      // Set selected address
      this.selectedMatch = match

      // Update input value
      this.inputValue = match.address + ', ' + match.context

      // Re-initialize matches / keyboard nav
      this.matches = []
      this.keyboardNavIndex = -1

      // Track address selection event
      trackingService.track('Address Selected')
    },

    /**
     * Handles the submission event for the address typeahead form.
     * @param {SubmitEvent} event - Form submission event object.
     * @param {object} options - Additional options for the submission.
     * @returns {void}
     */
    handleSubmit(event, options = {}) {
      // Block default form submission behavior
      event.preventDefault()
      event.stopPropagation()

      // Submit address
      this.submitAddress(options)
    },

    /**
     * Submits the selected address for processing.
     * Transitions the flow state based on the results of the submission.
     * @param {object} options - Additional options for the submission.
     * @returns {Promise.<void>} Promise that resolves when the address submission is complete.
     */
    async submitAddress(options = {}) {
      // Debounce submission if form is already processing
      if (
        globalStore.flowState.value == 'addressFormProcessing' ||
        globalStore.flowState.value == 'modalAddressFormProcessing'
      ) {
        return
      }

      // Remove active focus (to avoid inadvertant submits given the modal UX)
      document.activeElement?.blur()

      // Clear out any existing error message
      this.errorMessage = ''

      // Transition to the address processing state
      globalStore.flowState.transition('SUBMIT_ADDRESS')

      // Track address submission event
      trackingService.track('Address Submitted')

      // Process the submitted address, and transition the state accordingly
      try {
        // If the contact has already been submitted, skip the contact form and transition directly to the estimate results
        // Otherwise, transition to the contact form
        if (
          this.hasParcelDetails &&
          globalStore.estimateViewModel.hasResults &&
          globalStore.contactViewModel.isSubmitted
        ) {
          globalStore.flowState.transition('SKIP_CONTACT')
        } else {
          // If the parcel details haven't already been acquired for the address, fetch them from the Regrid API
          if (!globalStore.addressViewModel.hasParcelDetails) {
            // Combine appropriate fields from Regrid Typeahead and Parcel APIs into a single object
            globalStore.addressViewModel.parcelDetails = {
              ...(await fetchParcelDetails(
                globalStore.addressViewModel.selectedMatch.ll_uuid,
              )),
              address: globalStore.addressViewModel.selectedMatch.address,
              city: globalStore.addressViewModel.selectedMatch.context.split(
                ', ',
              )[0],
              state:
                globalStore.addressViewModel.selectedMatch.context.split(
                  ', ',
                )[1],
            }
          }

          // If the estimate results haven't already been acquired for the address, fetch them from our estimate endpoint
          if (!globalStore.estimateViewModel.hasResults) {
            const fetchEstimatePayload = {
              ...options,
              parcel: {
                apn: globalStore.addressViewModel.parcelDetails.apn,
                jurisdiction:
                  globalStore.addressViewModel.parcelDetails.jurisdiction,
              },
              address: {
                address: globalStore.addressViewModel.parcelDetails.address,
                city: globalStore.addressViewModel.parcelDetails.city,
                state: globalStore.addressViewModel.parcelDetails.state,
                zip: globalStore.addressViewModel.parcelDetails.zip,
              },
            }

            const estimateResults =
              await fetchEstimateResults(fetchEstimatePayload)

            globalStore.estimateViewModel.jurisdiction =
              estimateResults.jurisdiction
            globalStore.estimateViewModel.estimate = estimateResults.estimate
          }

          globalStore.flowState.transition('SUCCESS')

          trackingService.track('Address Submission Succeeded')
        }
      } catch (error) {
        globalStore.flowState.transition('SUCCESS')

        trackingService.track('Address Submission Errors (Non-Blocking)')
      }
    },
  }
}

/**
 * Given query (provided by user through address typeahead input), returns matching addresses
 * Fetches matches from Regrid Typeahead API, filters results, and returns them
 */
async function fetchAddressMatches(query) {
  // Prepare request to the Regrid Typeahead API
  const url = 'https://app.regrid.com/api/v1/typeahead.json'
  const token =
    '1SnpL7AQekjA4mH2vqUmkGm9AAfQxi_6mxwdm4qDzo_C-xSTx9z3pd9rTsRWDWV4'

  const request = new Request(`${url}/?token=${token}&query=${query}`, {
    method: 'GET',
  })

  // Fetch and filter matches
  const response = await fetch(request)
  if (!response.ok) {
    throw new Error('Network response was not OK')
  }
  const responseData = await response.json()
  return filterSortAndSliceAddressMatches(responseData)
}

/**
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
 * Given a Regrid Typeahead API match, returns true if it is in a supported market
 * Currently, only markets in California are supported
 */
function isInMarketMatch(match) {
  return match.context.endsWith('CA')
}

/**
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
 * Given id (`ll_uuid` provided for every match via Redrid typeahead API), returns parcel details needed for estimate generation
 * Fetches full details from Regrid Parcel API, filters and formays results to only fields we need, and returns the object
 */
async function fetchParcelDetails(id) {
  const parcelLookupUrl = 'https://app.regrid.com/api/v1/parcel/'
  const parcelLookupToken =
    '1SnpL7AQekjA4mH2vqUmkGm9AAfQxi_6mxwdm4qDzo_C-xSTx9z3pd9rTsRWDWV4'
  const parcelLookupRequest = new Request(
    `${parcelLookupUrl}${id}.json?token=${parcelLookupToken}&return_custom=false`,
    {
      method: 'GET',
    },
  )

  const response = await fetch(parcelLookupRequest)
  if (!response.ok) {
    throw new Error('Network response was not OK')
  }
  const responseData = await response.json()
  return filterParcelDetails(responseData)
}

/**
 * Maps and returns an object with only the fields needed for our flow, provided by the Regrid Parcel API request
 */
function filterParcelDetails(regridParcelResponseData) {
  const regridResultFields =
    regridParcelResponseData.results[0].properties.fields

  return {
    apn: regridResultFields.parcelnumb,
    jurisdiction: regridResultFields.county,
    // address: regridResultFields.address,
    // city: regridResultFields.scity,
    // state: regridResultFields.state2,
    zip: regridResultFields.szip,
  }
}

/**
 * Given a payload with the parcel `apn` and `jurisdiction`, submits request to our Make.com Get Estimate endpoint
 * Endpoint is integrated with our Airtable offer database to look up and return estimate values, and jurisdiction status
 */
async function fetchEstimateResults(payload) {
  const request = new Request(
    'https://hook.us1.make.com/t9mrl5xiqcub1netw5sk7l1vjgoz3gt9',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    },
  )

  const response = await fetch(request)
  if (!response.ok) {
    throw new Error('Network response was not OK')
  }
  return await response.json()
}

/*
 * ----------------------------------------------------------------
 * Exports
 * ----------------------------------------------------------------
 */
export { createAddressViewModel }
