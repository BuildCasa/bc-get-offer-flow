/*
 * ----------------------------------------------------------------
 * Imports
 * ----------------------------------------------------------------
 */
import { thCreateLead } from '../services/MakeBCBackendService.js'
import { validateEmailAddress } from '../utils/EmailUtils.js'

/*
 * ----------------------------------------------------------------
 * Constants
 * ----------------------------------------------------------------
 */
const flowConstants = {
  STATES: {
    DEFAULT: 'default',
    GET_STARTED: {
      PROPERTY_QUESTION: 'modalGetStartedPropertyQuestion',
      ADDRESS_SEARCH: 'modalGetStartedAddressSearch',
      TYPEFORM: 'getStartedForm',
      COMPLETE: {
        DEFAULT: 'getStartedComplete',
        MODAL: 'modalGetStartedComplete',
      },
    },
    BOOK_INTRO: {
      FORM: 'modalBookIntroForm',
    },
    GET_GUIDES: {
      FORM: 'modalGuidesContactForm',
      PROCESSING: 'modalGuidesContactFormProcessing',
      ERROR: 'modalGuidesContactFormError',
      SUCCESS: 'modalGuidesContactFormSuccess',
    },
    INTERRUPTOR_POPUP: {
      FORM: 'modalInterruptorPopupForm',
      PROCESSING: 'modalInterruptorPopupFormProcessing',
      ERROR: 'modalInterruptorPopupFormError',
      SUCCESS: 'modalInterruptorPopupFormSuccess',
    },
  },
  EVENTS: {
    GET_STARTED: {
      START: 'GET_STARTED_START',
      HAS_PROPERTY: {
        YES: 'HAS_PROPERTY_YES',
        NO: 'HAS_PROPERTY_NO',
      },
    },
    BOOK_INTRO: {
      START: 'BOOK_INTRO_START',
    },
    GET_GUIDES: {
      START: 'GET_GUIDES_START',
    },
    INTERRUPTOR_POPUP: {
      START: 'INTERRUPTOR_POPUP_START',
    },
    SUBMIT_CONTACT: {
      SUBMIT: 'CONTACT_SUBMIT',
      SUCCESS: 'CONTACT_SUBMIT_SUCCESS',
      ERROR: 'CONTACT_SUBMIT_ERROR',
    },
    EXIT: 'EXIT',
  },
}

/*
 * ----------------------------------------------------------------
 * Functions
 * ----------------------------------------------------------------
 */

function createFlowStateMachine(globalStore, trackingService) {
  // Transition definition objects for *shared* transition events / paths
  const defaultExitTransition = {
    [flowConstants.EVENTS.EXIT]: {
      target: flowConstants.STATES.DEFAULT,
      effects: {
        onTransition: [
          (eventProperties) => {
            trackingService?.track('Modal Closed', eventProperties)
          },
        ],
      },
    },
  }

  const getStartedCompleteExitTransition = {
    [flowConstants.EVENTS.EXIT]: {
      target: flowConstants.STATES.GET_STARTED.COMPLETE.DEFAULT,
      effects: {
        onTransition: [
          (eventProperties) => {
            trackingService?.track('Modal Closed', eventProperties)
          },
        ],
      },
    },
  }

  const submitGuidesContactTransition = {
    [flowConstants.EVENTS.SUBMIT_CONTACT.SUBMIT]: {
      target: flowConstants.STATES.GET_GUIDES.PROCESSING,
      effects: {
        onTransition: [
          (eventProperties) => {
            trackingService?.track('Guides Contact Submitted', eventProperties)
          },
        ],
      },
    },
  }

  const submitInterruptorPopupContactTransition = {
    [flowConstants.EVENTS.SUBMIT_CONTACT.SUBMIT]: {
      target: flowConstants.STATES.INTERRUPTOR_POPUP.PROCESSING,
      effects: {
        onTransition: [
          (eventProperties) => {
            trackingService?.track(
              'Interruptor Popup Contact Submitted',
              eventProperties,
            )
          },
        ],
      },
    },
  }

  // Effects definition objects for *shared* state or transition effects
  const contactProcessingStateEffects = {
    onEntry: [async () => processContactSubmission(globalStore)],
  }

  // Create state machine store
  const stateMachineDefinition = {
    constants: flowConstants,
    defaultState: flowConstants.STATES.DEFAULT,
    states: {
      [flowConstants.STATES.DEFAULT]: {
        transitions: {
          [flowConstants.EVENTS.GET_STARTED.START]: {
            target: flowConstants.STATES.GET_STARTED.PROPERTY_QUESTION,
            effects: {
              onTransition: [
                (eventProperties) => {
                  trackingService.track('Get Started Clicked', eventProperties)
                },
              ],
            },
          },
          [flowConstants.EVENTS.GET_GUIDES.START]: {
            target: flowConstants.STATES.GET_GUIDES.FORM,
            effects: {
              onTransition: [
                (eventProperties) => {
                  trackingService.track('Get Guide Clicked', eventProperties)
                },
              ],
            },
          },
          [flowConstants.EVENTS.INTERRUPTOR_POPUP.START]: {
            target: flowConstants.STATES.INTERRUPTOR_POPUP.FORM,
            effects: {
              onTransition: [
                (eventProperties) => {
                  trackingService.track(
                    'Interruptor Popup Shown',
                    eventProperties,
                  )
                },
              ],
            },
          },
        },
      },
      [flowConstants.STATES.GET_STARTED.PROPERTY_QUESTION]: {
        transitions: {
          ...defaultExitTransition,
          [flowConstants.EVENTS.GET_STARTED.HAS_PROPERTY.YES]: {
            target: flowConstants.STATES.GET_STARTED.ADDRESS_SEARCH,
            effects: {
              onTransition: [
                (eventProperties) => {
                  trackingService.track(
                    'Has Specific Property',
                    eventProperties,
                  )
                },
              ],
            },
          },
          [flowConstants.EVENTS.GET_STARTED.HAS_PROPERTY.NO]: {
            target: flowConstants.STATES.GET_STARTED.TYPEFORM,
            effects: {
              onTransition: [
                (eventProperties) => {
                  trackingService.track('No Specific Property', eventProperties)
                },
              ],
            },
          },
        },
      },
      [flowConstants.STATES.GET_STARTED.ADDRESS_SEARCH]: {
        transitions: {
          ...defaultExitTransition,
        },
      },
      [flowConstants.STATES.GET_STARTED.TYPEFORM]: {
        transitions: {
          ...defaultExitTransition,
        },
      },
      [flowConstants.STATES.GET_STARTED.COMPLETE.DEFAULT]: {
        transitions: {
          [flowConstants.EVENTS.GET_STARTED.START]: {
            target: flowConstants.STATES.GET_STARTED.COMPLETE.MODAL,
            effects: {
              onTransition: [
                (eventProperties) => {
                  trackingService.track('Get Started Clicked', eventProperties)
                },
              ],
            },
          },
          [flowConstants.EVENTS.GET_GUIDES.START]: {
            target: flowConstants.STATES.GET_GUIDES.FORM,
            effects: {
              onTransition: [
                (eventProperties) => {
                  trackingService.track('Get Guide Clicked', eventProperties)
                },
              ],
            },
          },
        },
      },
      [flowConstants.STATES.GET_STARTED.COMPLETE.MODAL]: {
        transitions: {
          ...getStartedCompleteExitTransition,
          [flowConstants.EVENTS.BOOK_INTRO.START]: {
            target: flowConstants.STATES.BOOK_INTRO.FORM,
            effects: {
              onTransition: [
                (eventProperties) => {
                  trackingService.track(
                    'Book Intro Call Clicked',
                    eventProperties,
                  )
                },
              ],
            },
          },
        },
      },
      [flowConstants.STATES.BOOK_INTRO.FORM]: {
        transitions: {
          ...getStartedCompleteExitTransition,
        },
      },
      [flowConstants.STATES.GET_GUIDES.FORM]: {
        transitions: {
          ...defaultExitTransition,
          ...submitGuidesContactTransition,
        },
      },
      [flowConstants.STATES.GET_GUIDES.PROCESSING]: {
        transitions: {
          ...defaultExitTransition,
          [flowConstants.EVENTS.SUBMIT_CONTACT.SUCCESS]: {
            target: flowConstants.STATES.GET_GUIDES.SUCCESS,
            effects: {
              onTransition: [
                (eventProperties) => {
                  trackingService.track(
                    'Guides Contact Submission Succeeded',
                    eventProperties,
                  )
                },
              ],
            },
          },
          [flowConstants.EVENTS.SUBMIT_CONTACT.ERROR]: {
            target: flowConstants.STATES.GET_GUIDES.ERROR,
            effects: {
              onTransition: [
                (eventProperties) => {
                  trackingService.track('Guides Contact Submission Failed', {
                    ...eventProperties,
                    error_str:
                      globalStore.thGuidesContactViewModel.errorMessage,
                  })
                },
              ],
            },
          },
        },
        effects: contactProcessingStateEffects,
      },
      [flowConstants.STATES.GET_GUIDES.ERROR]: {
        transitions: {
          ...defaultExitTransition,
          ...submitGuidesContactTransition,
        },
        effects: {
          onExit: [
            () => {
              // Clear out any existing error message
              globalStore.thGuidesContactViewModel.errorMessage = ''
            },
          ],
        },
      },
      [flowConstants.STATES.GET_GUIDES.SUCCESS]: {
        transitions: {
          ...defaultExitTransition,
        },
        effects: {
          onEntry: [
            () => {
              globalStore.thGuidesDownloadViewModel.downloadButtonElement.click()
            },
          ],
        },
      },
      [flowConstants.STATES.INTERRUPTOR_POPUP.FORM]: {
        transitions: {
          ...defaultExitTransition,
          ...submitInterruptorPopupContactTransition,
        },
      },
      [flowConstants.STATES.INTERRUPTOR_POPUP.PROCESSING]: {
        transitions: {
          ...defaultExitTransition,
          [flowConstants.EVENTS.SUBMIT_CONTACT.SUCCESS]: {
            target: flowConstants.STATES.INTERRUPTOR_POPUP.SUCCESS,
            effects: {
              onTransition: [
                (eventProperties) => {
                  trackingService.track(
                    'Interruptor Popup Submission Succeeded',
                    eventProperties,
                  )
                },
              ],
            },
          },
          [flowConstants.EVENTS.SUBMIT_CONTACT.ERROR]: {
            target: flowConstants.STATES.INTERRUPTOR_POPUP.ERROR,
            effects: {
              onTransition: [
                (eventProperties) => {
                  trackingService.track('Interruptor Popup Submission Failed', {
                    ...eventProperties,
                    error_str:
                      globalStore.thGuidesContactViewModel.errorMessage,
                  })
                },
              ],
            },
          },
        },
        effects: contactProcessingStateEffects,
      },
      [flowConstants.STATES.INTERRUPTOR_POPUP.ERROR]: {
        transitions: {
          ...defaultExitTransition,
          ...submitInterruptorPopupContactTransition,
        },
        effects: {
          onExit: [
            () => {
              // Clear out any existing error message
              globalStore.thGuidesContactViewModel.errorMessage = ''
            },
          ],
        },
      },
      [flowConstants.STATES.INTERRUPTOR_POPUP.SUCCESS]: {
        transitions: {
          ...defaultExitTransition,
        },
      },
    },
  }

  return stateMachineDefinition
}

function createFlowUIHelpers(globalStore) {
  return {
    modal: {
      get isOpen() {
        const modalStates = [
          flowConstants.STATES.GET_STARTED.PROPERTY_QUESTION,
          flowConstants.STATES.GET_STARTED.ADDRESS_SEARCH,
          flowConstants.STATES.GET_STARTED.TYPEFORM,
          flowConstants.STATES.GET_STARTED.COMPLETE.MODAL,
          flowConstants.STATES.BOOK_INTRO.FORM,
          flowConstants.STATES.GET_GUIDES.FORM,
          flowConstants.STATES.GET_GUIDES.PROCESSING,
          flowConstants.STATES.GET_GUIDES.ERROR,
          flowConstants.STATES.GET_GUIDES.SUCCESS,
          flowConstants.STATES.INTERRUPTOR_POPUP.FORM,
          flowConstants.STATES.INTERRUPTOR_POPUP.PROCESSING,
          flowConstants.STATES.INTERRUPTOR_POPUP.ERROR,
          flowConstants.STATES.INTERRUPTOR_POPUP.SUCCESS,
        ]

        return modalStates.includes(globalStore.flowState.value)
      },
    },
  }
}

async function processContactSubmission(globalStore) {
  try {
    // Process the submitted contact info, and transition the state accordingly

    // Create contact object for the create lead payload
    let contact = {
      firstName: globalStore.thGuidesContactViewModel.firstName.trim(),
      lastName: globalStore.thGuidesContactViewModel.lastName.trim(),
      email: globalStore.thGuidesContactViewModel.email.trim(),
    }

    // Validate email address
    if (!validateEmailAddress(contact.email)) {
      throw new Error('Please enter a valid email address, and try again.', {
        cause: 'INVALID_EMAIL',
      })
    }

    // Put together the create lead payload
    const createLeadPayload = {
      ...globalStore.thGuidesContactViewModel.options,
      contact: contact,
    }

    // Start sequencing through the lot analysis steps, and the create lead request in parallel
    await Promise.all([thCreateLead(createLeadPayload)])

    globalStore.thGuidesContactViewModel.isSubmitted = true

    // Transition state according to desired logic for successful contact submissions
    globalStore.flowState.transition(
      flowConstants.EVENTS.SUBMIT_CONTACT.SUCCESS,
    )
  } catch (error) {
    console.log('Error submitting contact:', error)
    // If error is thrown due to invalid email or phone number, show the specific error message
    // Otherwise, show a generic error message
    if (error && error.cause && error.cause === 'INVALID_EMAIL') {
      globalStore.thGuidesContactViewModel.errorMessage = error.message
    } else {
      globalStore.thGuidesContactViewModel.errorMessage =
        'There was an error processing your info. Please try again, or contact us for help.'
    }

    // Transition state according to desired logic for contact submission errors
    globalStore.flowState.transition(flowConstants.EVENTS.SUBMIT_CONTACT.ERROR)
  }
}

/*
 * ----------------------------------------------------------------
 * Exports
 * ----------------------------------------------------------------
 */
export { flowConstants, createFlowStateMachine, createFlowUIHelpers }
