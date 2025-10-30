/*
 * ----------------------------------------------------------------
 * Imports
 * ----------------------------------------------------------------
 */

/*
 * ----------------------------------------------------------------
 * Constants
 * ----------------------------------------------------------------
 */
const flowConstants = {
  STATES: {
    DEFAULT: 'default',
    GET_STARTED: {
      SELL_FILLOUT_FORM_1: 'getStartedSellFilloutForm1', // Default Fillout Form
      SELL_FILLOUT_FORM_2: 'getStartedSellFilloutForm2', // Alternate Fillout Form
      COMPLETE: {
        DEFAULT: 'getStartedComplete',
        MODAL: 'modalGetStartedComplete',
      },
    },
    BUYER_PROFILE: {
      FORM: 'modalBuyerProfileForm',
    },
    BOOK_INTRO: {
      FORM: 'modalBookIntroForm',
    },
    GET_VALUATION_REPORT: {
      FORM: 'modalGetValuationReportForm',
    },
  },
  EVENTS: {
    GET_STARTED: {
      START: 'GET_STARTED_START',
    },
    BUYER_PROFILE: {
      START: 'BUYER_PROFILE_START',
    },
    BOOK_INTRO: {
      START: 'BOOK_INTRO_START',
    },
    GET_VALUATION_REPORT: {
      START: 'GET_VALUATION_REPORT_START',
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
              flowConstants.STATES.GET_STARTED.SELL_FILLOUT_FORM_1

            // If the 2025-10 Sell Launch Fillout Forms Experiment experiment is active, and the session is in a non-default variation,
            // Set the transition to target the Interest Area Search state
            const interestAreaTypeaheadExperimentVariation =
              globalStore.experimentationViewModel?.getActiveExperimentVariation(
                'sell-launch-fillout-forms-2025-10',
              )

            if (
              interestAreaTypeaheadExperimentVariation &&
              interestAreaTypeaheadExperimentVariation === 'sell-fillout-form-2'
            ) {
              transitionTarget =
                flowConstants.STATES.GET_STARTED.SELL_FILLOUT_FORM_2
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
        },
      },
      [flowConstants.STATES.GET_STARTED.SELL_FILLOUT_FORM_1]: {
        transitions: {
          ...defaultExitTransition,
        },
      },
      [flowConstants.STATES.GET_STARTED.SELL_FILLOUT_FORM_2]: {
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
        },
      },
      [flowConstants.STATES.GET_STARTED.COMPLETE.MODAL]: {
        transitions: {
          ...getStartedCompleteExitTransition,
          [flowConstants.EVENTS.BUYER_PROFILE.START]: {
            target: flowConstants.STATES.BUYER_PROFILE.FORM,
            effects: {
              onTransition: [
                (eventProperties) => {
                  trackingService.track(
                    'Fill Out Buyer Profile Clicked',
                    eventProperties,
                  )
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
        },
      },
      [flowConstants.STATES.BUYER_PROFILE.FORM]: {
        transitions: {
          ...getStartedCompleteExitTransition,
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
    },
  }

  return stateMachineDefinition
}

function createFlowUIHelpers(globalStore) {
  return {
    modal: {
      get isOpen() {
        const modalStates = [
          flowConstants.STATES.GET_STARTED.SELL_FILLOUT_FORM_1,
          flowConstants.STATES.GET_STARTED.SELL_FILLOUT_FORM_2,
          flowConstants.STATES.GET_STARTED.COMPLETE.MODAL,
          flowConstants.STATES.BUYER_PROFILE.FORM,
          flowConstants.STATES.GET_VALUATION_REPORT.FORM,
          flowConstants.STATES.BOOK_INTRO.FORM,
        ]

        return modalStates.includes(globalStore.flowState.value)
      },
    },
  }
}

/*
 * ----------------------------------------------------------------
 * Exports
 * ----------------------------------------------------------------
 */
export { flowConstants, createFlowStateMachine, createFlowUIHelpers }
