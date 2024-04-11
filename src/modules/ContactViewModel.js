/*
 * ----------------------------------------------------------------
 * Imports
 * ----------------------------------------------------------------
 */
import { formatPhoneNumber } from './utils/PhoneUtils'

// TODO: Create JSDoc interface for a ContactViewModel.

/*
 * ----------------------------------------------------------------
 * Functions
 * ----------------------------------------------------------------
 */

/**
 * Factory function for creating a ContactViewModel instance.
 * @param {unknown} flowState - Reference to the relevant FlowState object to be associated with this instance.
 * @returns {ContactViewModel} New ContactViewModel instance.
 */
function createContactViewModel(flowState) {
  return {
    // Instance properties
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    desiredTimeline: '',
    options: {},
    submitButtonText: {
      normal: 'Get Estimate',
      processing: 'Getting Estimate...',
    },
    isSubmitted: false,
    lotAnalysisStep: 'Checking...',
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
      this.phone = ''
      this.desiredTimeline = ''
      this.options = {}
      this.isSubmitted = false
      this.lotAnalysisStep = 'Checking...'
      this.errorMessage = ''

      // Pre-fill submit button text values based on Webflow settings
      // Preserves Webflow DX for editing button values through the UI (`button` and `waiting` settings)
      // But allows dynamically controlling displayed text in site, based on current UI state, via Alpine
      const contactFormSubmitButton = document.getElementById(
        'contact-form-submit-button',
      )
      this.submitButtonText = {
        normal: contactFormSubmitButton.value,
        processing: contactFormSubmitButton.dataset.wait,
      }

      // FUTURE DEV: Add logic to pre-fill data based on other sources (link params, etc.) here
    },

    /**
     * Whether or not any contact details have been added.
     * @type {boolean}
     */
    get hasAnyContactDetails() {
      return (
        !!this.firstName.trim() ||
        !!this.lastName.trim() ||
        !!this.email.trim() ||
        !!this.phone.trim()
      )
    },

    formatPhoneInput(input) {
      return formatPhoneNumber(input)
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

      // Set options for address submission
      this.options = options

      // Transition state according to desired logic for address submissions
      flowState.transition('SUBMIT_CONTACT')
    },
  }
}

/*
 * ----------------------------------------------------------------
 * Exports
 * ----------------------------------------------------------------
 */
export { createContactViewModel }
