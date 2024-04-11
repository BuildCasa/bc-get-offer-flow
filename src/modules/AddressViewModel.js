/*
 * ----------------------------------------------------------------
 * Imports
 * ----------------------------------------------------------------
 */
import { fetchAddressMatches } from './RegridAddressService.js'

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
    // Instance properties
    inputValue: '',
    matches: [],
    keyboardNavIndex: -1,
    selectedMatch: {},
    parcelDetails: {},
    options: {},
    submitButtonText: {
      normal: 'Get Offer',
      processing: 'Getting Offer...',
    },
    errorMessage: '',

    /**
     * Initializes the AddressViewModel instance properties.
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
      this.options = {}
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

        // Transition state according to desired logic for address errors
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

      // Set options for address submission
      this.options = options

      // Transition state according to desired logic for address submissions
      globalStore.flowState.transition('SUBMIT_ADDRESS')
    },
  }
}

/*
 * ----------------------------------------------------------------
 * Exports
 * ----------------------------------------------------------------
 */
export { createAddressViewModel }
