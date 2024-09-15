/*
 * ----------------------------------------------------------------
 * Functions
 * ----------------------------------------------------------------
 */

function createFlowStateMachine(trackingService) {
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
          globalStore.flowState.value == 'modalGetDemoForm'
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
      handleModalClose() {
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
