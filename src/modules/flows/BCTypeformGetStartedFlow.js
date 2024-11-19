/*
 * ----------------------------------------------------------------
 * Imports
 * ----------------------------------------------------------------
 */

/*
 * ----------------------------------------------------------------
 * Functions
 * ----------------------------------------------------------------
 */

function createFlowStateMachine() {
  // Create state machine store
  const stateMachineDefinition = {
    defaultState: 'default',
    states: {
      default: {
        transitions: {
          GET_STARTED: {
            target: 'modalGetStartedForm',
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
    },
  }

  return stateMachineDefinition
}

function createFlowUIHelpers(globalStore, trackingService) {
  return {
    modal: {
      get isOpen() {
        return globalStore.flowState.value == 'modalGetStartedForm'
      },
      handleModalFlowStart(transition = 'GET_STARTED', cta = null) {
        globalStore.flowState.transition(transition)

        const transitionEvents = {
          GET_STARTED: 'Get Started Clicked',
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
