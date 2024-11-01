/*
 * ----------------------------------------------------------------
 * Imports
 * ----------------------------------------------------------------
 */
import { thCreateLead } from '../services/MakeBCBackendService.js'

import { validateEmailAddress } from '../utils/EmailUtils.js'

/*
 * ----------------------------------------------------------------
 * Functions
 * ----------------------------------------------------------------
 */

function createFlowStateMachine(globalStore, trackingService) {
  const submitGuidesContactTransition = {
    SUBMIT_CONTACT: {
      target: 'modalGuidesContactFormProcessing',
      effects: {
        onTransition: [
          () => {
            trackingService?.track('Guides Contact Submitted')
          },
        ],
      },
    },
  }

  const submitInterruptorPopupContactTransition = {
    SUBMIT_CONTACT: {
      target: 'modalInterruptorPopupFormProcessing',
      effects: {
        onTransition: [
          () => {
            trackingService?.track('Interruptor Popup Contact Submitted')
          },
        ],
      },
    },
  }

  const contactProcessingStateEffects = {
    onEntry: [processContactSubmission],
  }

  async function processContactSubmission() {
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
      globalStore.flowState.transition('SUCCESS')
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
      globalStore.flowState.transition('ERROR')
    }
  }

  // Create state machine store
  const stateMachineDefinition = {
    defaultState: 'default',
    states: {
      default: {
        transitions: {
          GET_STARTED: {
            target: 'modalGetStartedForm',
          },
          GET_DEMO: {
            target: 'modalGetDemoForm',
          },
          GET_GUIDES: {
            target: 'modalGuidesContactForm',
          },
          SHOW_INTERRUPTOR_POPUP: {
            target: 'modalInterruptorPopupForm',
          },
        },
      },
      getStartedComplete: {
        transitions: {
          GET_STARTED: {
            target: 'modalGetStartedComplete',
          },
          GET_DEMO: {
            target: 'modalGetDemoForm',
          },
          GET_GUIDES: {
            target: 'modalGuidesContactForm',
          },
        },
      },
      modalGetStartedForm: {
        transitions: {
          EXIT: {
            target: 'default',
          },
        },
      },
      modalGetStartedComplete: {
        transitions: {
          BOOK_INTRO: {
            target: 'modalBookIntroForm',
            effects: {
              onTransition: [
                () => {
                  trackingService.track('Book Intro Call Clicked')
                },
              ],
            },
          },
          EXIT: {
            target: 'getStartedComplete',
          },
        },
      },
      modalBookIntroForm: {
        transitions: {
          EXIT: {
            target: 'getStartedComplete',
          },
        },
      },
      modalGetDemoForm: {
        transitions: {
          EXIT: {
            target: 'default',
          },
        },
      },
      modalGuidesContactForm: {
        transitions: {
          ...submitGuidesContactTransition,
          EXIT: {
            target: 'default',
          },
        },
      },
      modalGuidesContactFormProcessing: {
        transitions: {
          SUCCESS: {
            target: 'modalGuidesContactFormSuccess',
            effects: {
              onTransition: [
                () => {
                  trackingService.track('Guides Contact Submission Succeeded')
                },
              ],
            },
          },
          ERROR: {
            target: 'modalGuidesContactFormError',
            effects: {
              onTransition: [
                () => {
                  trackingService.track('Guides Contact Submission Failed', {
                    error_str:
                      globalStore.thGuidesContactViewModel.errorMessage,
                  })
                },
              ],
            },
          },
          EXIT: {
            target: 'default',
          },
        },
        effects: contactProcessingStateEffects,
      },
      modalGuidesContactFormError: {
        transitions: {
          ...submitGuidesContactTransition,
          EXIT: {
            target: 'default',
          },
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
      modalGuidesContactFormSuccess: {
        transitions: {
          EXIT: {
            target: 'default',
          },
        },
        effects: {
          onEntry: [
            () => {
              globalStore.thGuidesDownloadViewModel.downloadButtonElement.click()
            },
          ],
        },
      },
      modalInterruptorPopupForm: {
        transitions: {
          ...submitInterruptorPopupContactTransition,
          EXIT: {
            target: 'default',
          },
        },
      },
      modalInterruptorPopupFormProcessing: {
        transitions: {
          SUCCESS: {
            target: 'modalInterruptorPopupFormSuccess',
            effects: {
              onTransition: [
                () => {
                  trackingService.track(
                    'Interruptor Popup Submission Succeeded',
                  )
                },
              ],
            },
          },
          ERROR: {
            target: 'modalInterruptorPopupFormError',
            effects: {
              onTransition: [
                () => {
                  trackingService.track('Interruptor Popup Submission Failed', {
                    error_str:
                      globalStore.thGuidesContactViewModel.errorMessage,
                  })
                },
              ],
            },
          },
          EXIT: {
            target: 'default',
          },
        },
        effects: contactProcessingStateEffects,
      },
      modalInterruptorPopupFormError: {
        transitions: {
          ...submitInterruptorPopupContactTransition,
          EXIT: {
            target: 'default',
          },
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
      modalInterruptorPopupFormSuccess: {
        transitions: {
          EXIT: {
            target: 'default',
          },
        },
      },
    },
  }

  return stateMachineDefinition
}

function createFlowUIHelpers(globalStore, trackingService) {
  return {
    modal: {
      get isOpen() {
        return (
          globalStore.flowState.value == 'modalGetStartedForm' ||
          globalStore.flowState.value == 'modalGetStartedComplete' ||
          globalStore.flowState.value == 'modalBookIntroForm' ||
          globalStore.flowState.value == 'modalGetDemoForm' ||
          globalStore.flowState.value == 'modalGuidesContactForm' ||
          globalStore.flowState.value == 'modalGuidesContactFormProcessing' ||
          globalStore.flowState.value == 'modalGuidesContactFormError' ||
          globalStore.flowState.value == 'modalGuidesContactFormSuccess' ||
          globalStore.flowState.value == 'modalInterruptorPopupForm' ||
          globalStore.flowState.value ==
            'modalInterruptorPopupFormProcessing' ||
          globalStore.flowState.value == 'modalInterruptorPopupFormError' ||
          globalStore.flowState.value == 'modalInterruptorPopupFormSuccess'
        )
      },
      handleModalFlowStart(transition = 'GET_STARTED', cta = null) {
        globalStore.flowState.transition(transition)

        const transitionEvents = {
          GET_STARTED: 'Get Started Clicked',
          GET_DEMO: 'Get Demo Clicked',
        }

        const transitionEvent = transitionEvents[transition]

        let eventProperties = {}
        if (cta) {
          eventProperties = {
            cta_str: cta,
          }
        }

        if (transitionEvent) {
          trackingService.track(transitionEvent, eventProperties)
        }
      },
      handleModalClose(event) {
        // Block default click event behavior
        event.preventDefault()
        event.stopPropagation()

        globalStore.flowState.transition('EXIT')

        trackingService.track('Modal Closed')
      },
    },
  }
}

/*
 * ----------------------------------------------------------------
 * Exports
 * ----------------------------------------------------------------
 */
export { createFlowStateMachine, createFlowUIHelpers }
