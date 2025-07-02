// TODO: Create JSDoc interface for an InterestAreaViewModel.

/*
 * ----------------------------------------------------------------
 * Imports
 * ----------------------------------------------------------------
 */
import {
  loadPlacesLibrary,
  getAutocompleteSessionToken,
  fetchInterestAreaSuggestions,
  isPlaceTHInterestAreaValid,
} from '../services/GoogleMapsAddressService.js'
import { flowConstants } from '../flows/THFlows'

/*
 * ----------------------------------------------------------------
 * Constants
 * ----------------------------------------------------------------
 */

/*
 * ----------------------------------------------------------------
 * Functions
 * ----------------------------------------------------------------
 */

/**
 * Factory function for creating a THInterestAreaViewModel instance.
 * @param {unknown} flowState - Reference to the relevant FlowState object to be associated with this instance.
 * @param {object} trackingService - Reference to the desired TrackingService to use for event tracking.
 * @returns {InterestAreaViewModel} New InterestAreaViewModel instance.
 */
function createInterestAreaViewModel(flowState, trackingService) {
  return {
    // Instance properties
    inputValue: '',
    sessionToken: '',
    suggestions: [],
    keyboardNavIndex: -1,
    selectedPlace: {},
    isSubmitted: false,
    errorMessage: '',

    /**
     * Initializes the InterestAreaViewModel instance properties.
     * Run automatically by Alpine, but can also be called manually to reset the view model state.
     * Need to call this manually on store creation if we stop using Alpine as our UI library.
     * @returns {void}
     */
    async init() {
      this.inputValue = ''
      this.suggestions = []
      this.keyboardNavIndex = -1
      this.selectedPlace = {}
      this.isSubmitted = false
      this.errorMessage = ''

      await loadPlacesLibrary()

      this.refreshSessionToken()
    },

    refreshSessionToken() {
      this.sessionToken = getAutocompleteSessionToken()
    },

    /**
     * Whether or not an location match has been selected with the typeahead.
     * @type {boolean}
     */
    get isSelected() {
      return Object.keys(this.selectedPlace).length != 0
    },

    get isSelectedValid() {
      return isPlaceTHInterestAreaValid(this.selectedPlace)
    },

    /**
     * Handles input events from the location typeahead input field.
     * Fetches and updates location suggestions based on the current input value.
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
        this.selectedPlace = {}
      }

      if (!this.inputValue) {
        this.suggestions = []
        return
      }

      // Fetch and update location matches (or handle errors)
      // Returns an array of place suggestions with `placePrediction` and `text` properties
      try {
        this.suggestions = await fetchInterestAreaSuggestions(
          this.inputValue,
          this.sessionToken,
        )
      } catch (error) {
        this.errorMessage = error.message
      }
    },

    /**
     * Handles keyboard events for the location typeahead input field.
     * Navigates up or down the list of matches if ArrowUp or ArrowDown are pressed.
     * Selects the location at the current keyboardNavIndex if Enter is pressed.
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

      // Don't intercept keydown events if the location matches are not being displayed
      if (this.isSelected || this.suggestions.length === 0) {
        return
      }

      // If ArrowUp, ArrowDown, or Enter are pressed while location matches are being displayed, block default behavior
      event.preventDefault()
      event.stopPropagation()

      // And apply special logic to navigate and select an location from the available matches
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
      let place = suggestion.placePrediction.toPlace()

      await place.fetchFields({
        fields: ['displayName', 'formattedAddress', 'addressComponents'],
      })

      // Set selected location
      this.selectedPlace = place

      // Update input value
      this.inputValue = place.formattedAddress

      // If selected suggestion is not a valid property location for TurboHome, display an error message
      if (!this.isSelectedValid) {
        this.errorMessage =
          'Please select a valid US city, state, or postal code to continue, or contact us for help.'
      }

      // Track location selection event
      trackingService.track('Interest Area Selected')

      // Re-initialize matches / keyboard nav
      this.refreshSessionToken()
      this.suggestions = []
      this.keyboardNavIndex = -1

      // If selected suggestion is valid, redirect to the report page
      if (this.isSelectedValid) {
        flowState.transition(flowConstants.EVENTS.INTEREST_AREA_SEARCH.SELECT)
      }
    },

    handleSubmit(event) {
      // Block default form submission behavior
      event.preventDefault()
      event.stopPropagation()
    },
  }
}

/*
 * ----------------------------------------------------------------
 * Exports
 * ----------------------------------------------------------------
 */
export { createInterestAreaViewModel }
