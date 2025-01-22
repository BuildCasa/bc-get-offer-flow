/*
 * ----------------------------------------------------------------
 * Imports
 * ----------------------------------------------------------------
 */
import { flowConstants } from '../flows/THGetStartedFlow'

// TODO: Create JSDoc interface for a THGuidesDownloadViewModel.

/*
 * ----------------------------------------------------------------
 * Functions
 * ----------------------------------------------------------------
 */

/**
 * Factory function for creating a THGuidesDownloadViewModel instance.
 * @param {unknown} globalStore - Reference to the global store.
 * @returns {THGuidesDownloadViewModel} New THGuidesDownloadViewModel instance.
 */
function createTHGuidesDownloadViewModel(globalStore) {
  return {
    // Instance properties
    GUIDES: {
      HOMEBUYING: 'homebuying',
      OFFERS: 'offers',
      CLOSING: 'closing',
    },
    guide: '',
    downloadButtonElement: null,

    /**
     * Initializes the THGuidesDownloadViewModel instance properties.
     * Run automatically by Alpine, but can also be called manually to reset the view model state.
     * Need to call this manually on store creation if we stop using Alpine as our UI library.
     * @returns {void}
     */
    init() {
      this.guide = ''
      this.downloadButtonElement = null
    },

    /**
     * Handles the click event for a Guide Download button.
     * @param {MouseEvent} event - Mouse event object.
     * @returns {void}
     */
    handleDownloadClick(event, guide) {
      // Set Guide Download guide and download button properties
      this.guide = guide
      this.downloadButtonElement = event.target

      const contactIsSubmitted =
        globalStore.thGuidesContactViewModel.isSubmitted

      // If the Guides Contact form has not already been submitted,
      // prevent the Guide Download, and transition to the Guides Contact form
      if (!contactIsSubmitted) {
        // Prevent the default link behavior (guide download)
        event.preventDefault()

        // Transition state according to desired logic for Guide Download requests
        // This will trigger the Guides Contact form to be displayed
        globalStore.flowState.transition(
          flowConstants.EVENTS.GET_GUIDES.START,
          {
            guide_str: this.guide,
            contact_submitted_str: contactIsSubmitted,
          },
        )
      }
    },
  }
}

/*
 * ----------------------------------------------------------------
 * Exports
 * ----------------------------------------------------------------
 */
export { createTHGuidesDownloadViewModel }
