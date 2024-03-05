/*
 * ----------------------------------------------------------------
 * Imports
 * ----------------------------------------------------------------
 */
import Alpine from 'alpinejs'
import { loadScript } from './ExternalScripts'
import { trackEvent } from './LegacyTracking'

/**
 * Creates and returns reference to an Alpine store for the contactViewModel
 * Represents data provided by users via the Contact form and/or URL params
 * Passed to Hubspot to populate and/or update Contact data in our CRM
 * Can be accessed in HTML via directive attribute values w/ `globalStore.contactViewModel`
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
function createContactViewModel(globalStore) {
  Alpine.store('contactViewModel', {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    desiredTimeline: '',
    submitButtonText: {
      normal: '',
      processing: '',
    },
    errorMessage: '',
    get hasAnyContactDetails() {
      return (
        !!this.firstName.trim() ||
        !!this.lastName.trim() ||
        !!this.email.trim() ||
        !!this.phone.trim()
      )
    },
    isSubmitted: false,
    lotAnalysisStep: '',
    init() {
      this.firstName = ''
      this.lastName = ''
      this.email = ''
      this.phone = ''
      this.desiredTimeline = ''
      this.errorMessage = ''
      ;(this.isSubmitted = false), (this.lotAnalysisStep = 'Checking...')

      // FUTURE DEV: Add logic to pre-fill data based on other sources (link params, etc.) here

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
    },
    formatPhoneInput(input) {
      return formatPhoneInput(input)
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
      if (globalStore.flowState.value == 'contactFormProcessing') {
        return
      }

      // Remove active focus (to avoid inadvertant submits given the modal UX)
      document.activeElement?.blur()

      // Clear out any existing error message
      this.errorMessage = ''

      // Transition to the contact processing state
      globalStore.flowState.value = globalStore.flowStateMachine.transition(
        globalStore.flowState.value,
        'SUBMIT_CONTACT',
      )

      // If the user has an active jurisdiction and an estimate, and the offering / lead type is "Windfall",
      // set appropriate variation for the Jul 2023 "Estimate or eligibility" experiment
      if (
        globalStore.estimateViewModel.hasActiveJurisdiction &&
        globalStore.estimateViewModel.hasEstimate &&
        options &&
        options.lead &&
        options.lead.type &&
        options.lead.type === 'Windfall'
      ) {
        const experiment = 'windfall-estimate-or-eligibility-2023-07'
        const variation =
          Math.random() < 0.5 ? 'amount-excluded' : 'amount-included'
        globalStore.experimentationViewModel.setActiveExperimentVariation(
          experiment,
          variation,
        )
      }

      // Track contact submission event
      trackEvent('Contact Submitted', globalStore)

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
          throw new Error(
            'Please enter a valid email address, and try again.',
            { cause: 'INVALID_EMAIL' },
          )
        }
        if (!validatePhoneNumber(contact.phone)) {
          throw new Error(
            'Please enter a valid phone number, including area code, and try again.',
            { cause: 'INVALID_PHONE' },
          )
        }

        // Add address info to the contact object
        // If parcel details are available, use them
        // Otherwise, use the address info from the selected address
        if (globalStore.addressViewModel.hasParcelDetails) {
          contact = {
            ...contact,
            ...globalStore.addressViewModel.parcelDetails,
          }
        } else if (globalStore.addressViewModel.isSelected) {
          contact = {
            ...contact,
            address: [
              globalStore.addressViewModel.selectedMatch.address,
              globalStore.addressViewModel.selectedMatch.context,
            ].join(', '),
          }
        }

        // Put together the create lead payload
        const createLeadPayload = {
          ...options,
          contact: contact,
          activeExperimentVariations:
            globalStore.experimentationViewModel.activeExperimentVariations,
        }

        // Start sequencing through the lot analysis steps, and the create lead request in parallel
        await Promise.all([
          sequenceLotAnalysisSteps(this),
          createLead(createLeadPayload),
        ])

        // As long as the user is not in an inactive jurisdiction,
        // dynamically load the Calendly script
        if (
          !globalStore.estimateViewModel.hasResults ||
          globalStore.estimateViewModel.hasActiveJurisdiction
        ) {
          loadScript('https://assets.calendly.com/assets/external/widget.js', {
            async: true,
          })
        }

        // If the user has an active jurisdiction and an estimate,
        // dynamically load the Calendly and tsparticles-confetti scripts
        if (
          globalStore.estimateViewModel.hasActiveJurisdiction &&
          globalStore.estimateViewModel.hasEstimate
        ) {
          await loadScript(
            'https://cdn.jsdelivr.net/npm/tsparticles-confetti@2.11.0/tsparticles.confetti.bundle.min.js',
            { async: true },
          )
        }

        this.isSubmitted = true

        // Transition to the estimate results state
        globalStore.flowState.value = globalStore.flowStateMachine.transition(
          globalStore.flowState.value,
          'SUCCESS',
        )

        // If the user has an active jurisdiction and an estimate,
        // pop the confetti animation after a short delay
        if (
          globalStore.estimateViewModel.hasActiveJurisdiction &&
          globalStore.estimateViewModel.hasEstimate &&
          window.confetti
        ) {
          const confettiColors =
            options &&
            options.lead &&
            options.lead.type &&
            options.lead.type === 'webuyCAlots'
              ? ['ffffff', '#1c429c', '#f0bd1b']
              : ['#ffffff', '#4cbd98', '#346af8']

          setTimeout(() => {
            window.confetti('tsparticles', {
              angle: 270,
              count: 90,
              position: {
                x: 50,
                y: -5,
              },
              spread: 180,
              startVelocity: 10,
              ticks: 200,
              colors: confettiColors,
              zIndex: 9999,
              disableForReducedMotion: true,
            })
          }, 500)
        }

        trackEvent('Contact Submission Succeeded', globalStore)
      } catch (error) {
        // If error is thrown due to invalid email or phone number, show the specific error message
        // Otherwise, show a generic error message
        if (
          error &&
          error.cause &&
          (error.cause === 'INVALID_EMAIL' || error.cause === 'INVALID_PHONE')
        ) {
          this.errorMessage = error.message
        } else {
          this.errorMessage =
            'There was an error processing your info. Please try again, or contact us for help.'
        }

        globalStore.flowState.value = globalStore.flowStateMachine.transition(
          globalStore.flowState.value,
          'ERROR',
        )

        trackEvent('Contact Submission Failed', globalStore, {
          error_str: this.errorMessage,
        })
      }
    },
  })

  // Add a reference to the new addressViewModel Alpine store to the global store
  globalStore.contactViewModel = Alpine.store('contactViewModel')
}

/**
 * ----------------------------------------------------------------
 * formatPhoneInput
 * ----------------------------------------------------------------
 * Given a string input, parses and formats it as a US phone number, and returns the formatted string
 */
function formatPhoneInput(input) {
  // Remove non-numeric characters
  const numericValue = input.replace(/\D/g, '')

  // Check if it starts with the valid US country code (1)
  const startsWithUSCountryCode = numericValue.startsWith('1')

  // If it starts with the US country code, create a new numeric value without it
  const numericValueWithoutCountryCode = startsWithUSCountryCode
    ? numericValue.slice(1)
    : numericValue

  // If the number is too long, truncate it to 10 digits
  const numericValueWithoutCountryCodeTruncated =
    numericValueWithoutCountryCode.slice(0, 10)

  // Format the remaining numberic digits
  const phoneNumberSegments = numericValueWithoutCountryCodeTruncated.match(
    /^(\d{0,3})(\d{0,3})(\d{0,4})$/,
  )

  // Create formatted segments, with appropriate separators
  const formattedCountryCodeSegment = !startsWithUSCountryCode ? '' : '1'
  const formattedAreaCodeSegment = !phoneNumberSegments[1]
    ? ''
    : (!startsWithUSCountryCode ? '' : ' ') + ('(' + phoneNumberSegments[1])
  const formattedOfficCodeSegment = !phoneNumberSegments[2]
    ? ''
    : ') ' + phoneNumberSegments[2]
  const formattedLineNumberSegment = !phoneNumberSegments[3]
    ? ''
    : '-' + phoneNumberSegments[3]

  // Combine the formatted segments into a full phone number, and return it
  const formattedFullPhoneNumber =
    formattedCountryCodeSegment +
    formattedAreaCodeSegment +
    formattedOfficCodeSegment +
    formattedLineNumberSegment
  return formattedFullPhoneNumber
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
 * Supports US phone numbers, with or without country code, and with or without separators
 *
 */
function validatePhoneNumber(input) {
  const phoneRegex =
    /^\+?1?\s?(\()?\d{3}(\))?[-.\s]?\d{3}[-.\s]?\d{4}$|^\d{10}$/
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
    'Checking flood zones...',
    'Checking fire hazard zones...',
    'Checking zoning district...',
    'Checking lot shape & size...',
  ]

  // Iterate through the analysis steps
  for (const step of analysisSteps) {
    // Update the current state of the contactViewModel with the current step
    contactViewModel.lotAnalysisStep = step

    // Wait for 1.5s w/ the current step, before moving to the next
    await new Promise((resolve) => {
      setTimeout(resolve, 1500)
    })
  }
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
    'https://hook.us1.make.com/7pyo51sq4xxjbpz14t03uomufndj45ut',
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
}

/*
 * ----------------------------------------------------------------
 * Exports
 * ----------------------------------------------------------------
 */
export { createContactViewModel }
