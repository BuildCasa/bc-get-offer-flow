/*
 * ----------------------------------------------------------------
 * Imports
 * ----------------------------------------------------------------
 */
import { flowConstants } from '../flows/THGetStartedFlow'

// TODO: Create JSDoc interface for a THGuidesContactViewModel.

/*
 * ----------------------------------------------------------------
 * Functions
 * ----------------------------------------------------------------
 */

/**
 * Factory function for creating a THGuidesContactViewModel instance.
 * @param {unknown} flowState - Reference to the relevant FlowState object to be associated with this instance.
 * @returns {THGuidesContactViewModel} New THGuidesContactViewModel instance.
 */
function createTHGuidesContactViewModel(flowState) {
  return {
    // Instance properties
    firstName: '',
    lastName: '',
    email: '',
    options: {},
    isSubmitted: false,
    errorMessage: '',

    /**
     * Initializes the ContactViewModel instance properties.
     * Run automatically by Alpine, but can also be called manually to reset the view model state.
     * Need to call this manually on store creation if we stop using Alpine as our UI library.
     * @returns {void}
     */
    init() {
      this.firstName = ''
      this.lastName = ''
      this.email = ''
      this.options = {}
      this.isSubmitted = false
      this.errorMessage = ''

      // FUTURE DEV: Add logic to pre-fill data based on other sources (link params, etc.) here
    },

    /**
     * Whether or not any contact details have been added.
     * @type {boolean}
     */
    get hasAnyContactDetails() {
      return (
        !!this.firstName.trim() || !!this.lastName.trim() || !!this.email.trim()
      )
    },

    /**
     * Handles the submission event for the contact form.
     * @param {SubmitEvent} event - Form submission event object.
     * @param {object} options - Additional options for the submission.
     * @returns {void}
     */
    handleSubmit(event, options = {}) {
      // Block default form submission behavior
      event.preventDefault()
      event.stopPropagation()

      // Set options for contact submission
      this.options = options

      // Transition state according to desired logic for contact submissions
      flowState.transition(flowConstants.EVENTS.SUBMIT_CONTACT.SUBMIT)
    },
  }
}

/*
 * ----------------------------------------------------------------
 * Exports
 * ----------------------------------------------------------------
 */
export { createTHGuidesContactViewModel }
