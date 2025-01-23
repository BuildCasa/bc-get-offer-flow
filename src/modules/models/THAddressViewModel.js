// TODO: Create JSDoc interface for an AddressViewModel.

/*
 * ----------------------------------------------------------------
 * Imports
 * ----------------------------------------------------------------
 */
import {
  loadPlacesLibrary,
  getAutocompleteSessionToken,
  fetchAddressSuggestions,
  isValidTHAddress,
  getTHAddressSlug,
} from '../services/GoogleMapsAddressService.js'

/*
 * ----------------------------------------------------------------
 * Constants
 * ----------------------------------------------------------------
 */
const BASE_COMPS_REPORT_URL_PATH =
  'https://buyer.turbohome.com/onboard?address='

/*
 * ----------------------------------------------------------------
 * Functions
 * ----------------------------------------------------------------
 */

/**
 * Factory function for creating a THAddressViewModel instance.
 * @param {unknown} globalStore - Reference to the global store.
 * @param {object} trackingService - Reference to the desired TrackingService to use for event tracking.
 * @returns {AddressViewModel} New AddressViewModel instance.
 */
function createAddressViewModel() {
  return {
    // Instance properties
    inputValue: '',
    sessionToken: '',
    suggestions: [],
    keyboardNavIndex: -1,
    selectedSuggestion: {},
    selectedPlaceData: {},
    isSubmitted: false,
    errorMessage: '',

    /**
     * Initializes the AddressViewModel instance properties.
     * Run automatically by Alpine, but can also be called manually to reset the view model state.
     * Need to call this manually on store creation if we stop using Alpine as our UI library.
     * @returns {void}
     */
    async init() {
      this.inputValue = ''
      this.suggestions = []
      this.keyboardNavIndex = -1
      this.selectedSuggestion = {}
      this.selectedPlaceData = {}
      this.isSubmitted = false
      this.errorMessage = ''

      await loadPlacesLibrary()

      this.refreshSessionToken()
    },

    refreshSessionToken() {
      this.sessionToken = getAutocompleteSessionToken()
    },

    /**
     * Whether or not an address match has been selected with the typeahead.
     * @type {boolean}
     */
    get isSelected() {
      return Object.keys(this.selectedSuggestion).length != 0
    },

    get isSelectedValid() {
      return isValidTHAddress(this.selectedSuggestion)
    },

    /**
     * Handles input events from the address typeahead input field.
     * Fetches and updates address suggestions based on the current input value.
     * @returns {Promise.<void>} Promise that resolves when input handling is complete.
     */
    async handleInput() {
      if (this.isSubmitted) {
        this.isSubmitted = false
      }

      if (this.errorMessage) {
        this.errorMessage = ''
      }

      if (this.isSelected) {
        this.selectedSuggestion = {}
      }

      if (!this.inputValue) {
        this.suggestions = []
        return
      }

      // Fetch and update address matches (or handle errors)
      try {
        this.suggestions = await fetchAddressSuggestions(
          this.inputValue,
          this.sessionToken,
        )
      } catch (error) {
        this.errorMessage = error.message
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
      if (this.isSelected || this.suggestions.length === 0) {
        return
      }

      // If ArrowUp, ArrowDown, or Enter are pressed while address matches are being displayed, block default behavior
      event.preventDefault()
      event.stopPropagation()

      // And apply special logic to navigate and select an address from the available matches
      if (event.key === 'Enter' && this.keyboardNavIndex != -1) {
        // If Enter key is pressed, select the match at the current position
        this.selectSuggestion(this.suggestions[this.keyboardNavIndex])
      } else if (event.key === 'ArrowUp') {
        // If ArrowUp key is pressed and no matches have been navigated to via keyboard yet, navigate to the bottom of the list
        // Else, navigate up one match from the current position
        this.keyboardNavIndex =
          this.keyboardNavIndex <= -1
            ? this.suggestions.length - 1
            : this.keyboardNavIndex - 1
      } else if (event.key === 'ArrowDown') {
        // If ArrowDown key is pressed and current position is at the bottom of the list, navigate to the starting position
        // Else, navigate down one match from the current position
        this.keyboardNavIndex =
          this.keyboardNavIndex >= this.suggestions.length - 1
            ? -1
            : this.keyboardNavIndex + 1
      }
    },

    async selectSuggestion(suggestion) {
      let place = suggestion.toPlace()

      await place.fetchFields({
        fields: ['displayName', 'formattedAddress', 'addressComponents'],
      })

      // Set selected address
      this.selectedSuggestion = place

      // Update input value
      this.inputValue = place.formattedAddress

      // If selected suggestion is not a valid property address for TurboHome, display an error message
      if (!this.isSelectedValid) {
        this.errorMessage =
          'Please select a valid property address to continue, or contact us for help.'
      }

      // Re-initialize matches / keyboard nav
      this.refreshSessionToken()
      this.suggestions = []
      this.keyboardNavIndex = -1

      // If selected suggestion is valid, redirect to the report page
      if (this.isSelectedValid) {
        this.redirectToReport()
      }
    },

    handleSubmit(event) {
      // Block default form submission behavior
      event.preventDefault()
      event.stopPropagation()

      // Redirect the user to the report page in the app property
      this.redirectToReport()
    },

    redirectToReport() {
      // Set submitted state
      this.isSubmitted = true

      // Get the address slug for the selected suggestion
      const addressSlug = getTHAddressSlug(this.selectedSuggestion)

      // If the address is not valid, return and do not redirect
      if (!this.isSelected || !this.isSelectedValid || !addressSlug) {
        return
      }

      // Otherwise, generate the full report URL and redirect the user session to it
      const reportURL = new URL(BASE_COMPS_REPORT_URL_PATH + addressSlug)
      window.location.assign(reportURL)
    },
  }
}

/*
 * ----------------------------------------------------------------
 * Exports
 * ----------------------------------------------------------------
 */
export { createAddressViewModel }
