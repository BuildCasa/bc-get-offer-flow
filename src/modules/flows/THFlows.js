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
      DEFAULT_FILLOUT_FORM: 'getStartedDefaultFilloutForm', // Default Fillout Form
      INTEREST_AREA_SEARCH: 'modalGetStartedInterestAreaSearch',
      INTEREST_AREA_FILLOUT_FORM_A1: 'modalGetStartedInterestAreaFilloutFormA1',
      INTEREST_AREA_FILLOUT_FORM_A2_ACTIONS:
        'modalGetStartedInterestAreaFilloutFormA2Actions',
      COMPLETE: {
        DEFAULT: 'getStartedComplete',
        MODAL: 'modalGetStartedComplete',
      },
    },
    BOOK_INTRO: {
      FORM: 'modalBookIntroForm',
    },
    GET_VALUATION_REPORT: {
      FORM: 'modalGetValuationReportForm',
    },
    GET_GUIDES: {
      FORM: 'modalGuidesContactForm',
      PROCESSING: 'modalGuidesContactFormProcessing',
      ERROR: 'modalGuidesContactFormError',
      SUCCESS: 'modalGuidesContactFormSuccess',
    },
  },
  EVENTS: {
    GET_STARTED: {
      START: 'GET_STARTED_START',
    },
    INTEREST_AREA_SEARCH: {
      SELECT: 'INTEREST_AREA_SEARCH_SELECT',
    },
    BOOK_INTRO: {
      START: 'BOOK_INTRO_START',
    },
    GET_VALUATION_REPORT: {
      START: 'GET_VALUATION_REPORT_START',
    },
    GET_GUIDES: {
      START: 'GET_GUIDES_START',
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
          [flowConstants.EVENTS.GET_STARTED.START]: () => {
            // Default transition target to the default fillout form state
            let transitionTarget =
              flowConstants.STATES.GET_STARTED.DEFAULT_FILLOUT_FORM

            // If the 2025-06 Interest Area Typeahead experiment is active, and the session is in a non-default variation,
            // Set the transition to target the Interest Area Search state
            const interestAreaTypeaheadExperimentVariation =
              globalStore.experimentationViewModel?.getActiveExperimentVariation(
                'interest-area-typeahead-2025-06',
              )

            if (
              interestAreaTypeaheadExperimentVariation &&
              (interestAreaTypeaheadExperimentVariation ===
                'interest-area-typeahead-fillout-form-a1' ||
                interestAreaTypeaheadExperimentVariation ===
                  'interest-area-typeahead-fillout-form-a2-actions')
            ) {
              transitionTarget =
                flowConstants.STATES.GET_STARTED.INTEREST_AREA_SEARCH
            }

            return {
              target: transitionTarget,
              effects: {
                onTransition: [
                  (eventProperties) => {
                    trackingService.track(
                      'Get Started Clicked',
                      eventProperties,
                    )
                  },
                ],
              },
            }
          },
          [flowConstants.EVENTS.INTEREST_AREA_SEARCH.SELECT]: {
            target: () => {
              // Default transition target to the Interest Area Fillout Form A1 version
              let transitionTarget =
                flowConstants.STATES.GET_STARTED.INTEREST_AREA_FILLOUT_FORM_A1

              // If the 2025-06 Interest Area Typeahead experiment is active, and the session is in the A2 Actions variation,
              // Set the transition to target the Interest Area Fillout Form A2 Actions state
              const interestAreaTypeaheadExperimentVariation =
                globalStore.experimentationViewModel?.getActiveExperimentVariation(
                  'interest-area-typeahead-2025-06',
                )
              if (
                interestAreaTypeaheadExperimentVariation &&
                interestAreaTypeaheadExperimentVariation ===
                  'interest-area-typeahead-fillout-form-a2-actions'
              ) {
                transitionTarget =
                  flowConstants.STATES.GET_STARTED
                    .INTEREST_AREA_FILLOUT_FORM_A2_ACTIONS
              }

              return {
                target: transitionTarget,
                effects: {
                  onTransition: [
                    (eventProperties) => {
                      trackingService.track(
                        'Interest Area Selected',
                        eventProperties,
                      )
                    },
                  ],
                },
              }
            },
          },
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
          [flowConstants.EVENTS.GET_VALUATION_REPORT.START]: {
            target: flowConstants.STATES.GET_VALUATION_REPORT.FORM,
            effects: {
              onTransition: [
                (eventProperties) => {
                  trackingService.track(
                    'Get Valuation Report Clicked',
                    eventProperties,
                  )
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
      [flowConstants.STATES.GET_STARTED.DEFAULT_FILLOUT_FORM]: {
        transitions: {
          ...defaultExitTransition,
        },
      },
      [flowConstants.STATES.GET_STARTED.INTEREST_AREA_SEARCH]: {
        transitions: {
          ...defaultExitTransition,
        },
      },
      [flowConstants.STATES.GET_STARTED.INTEREST_AREA_FILLOUT_FORM_A1]: {
        transitions: {
          ...defaultExitTransition,
        },
      },
      [flowConstants.STATES.GET_STARTED.INTEREST_AREA_FILLOUT_FORM_A2_ACTIONS]:
        {
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
          [flowConstants.EVENTS.GET_VALUATION_REPORT.START]: {
            target: flowConstants.STATES.GET_VALUATION_REPORT.FORM,
            effects: {
              onTransition: [
                (eventProperties) => {
                  trackingService.track(
                    'Get Valuation Report Clicked',
                    eventProperties,
                  )
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
          ...defaultExitTransition,
        },
      },
      [flowConstants.STATES.GET_VALUATION_REPORT.FORM]: {
        transitions: {
          ...defaultExitTransition,
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
    },
  }

  return stateMachineDefinition
}

function createFlowUIHelpers(globalStore) {
  return {
    modal: {
      get isOpen() {
        const modalStates = [
          flowConstants.STATES.GET_STARTED.DEFAULT_FILLOUT_FORM,
          flowConstants.STATES.GET_STARTED.INTEREST_AREA_SEARCH,
          flowConstants.STATES.GET_STARTED.INTEREST_AREA_FILLOUT_FORM_A1,
          flowConstants.STATES.GET_STARTED
            .INTEREST_AREA_FILLOUT_FORM_A2_ACTIONS,
          flowConstants.STATES.GET_STARTED.COMPLETE.MODAL,
          flowConstants.STATES.GET_VALUATION_REPORT.FORM,
          flowConstants.STATES.BOOK_INTRO.FORM,
          flowConstants.STATES.GET_GUIDES.FORM,
          flowConstants.STATES.GET_GUIDES.PROCESSING,
          flowConstants.STATES.GET_GUIDES.ERROR,
          flowConstants.STATES.GET_GUIDES.SUCCESS,
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
