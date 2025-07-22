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
    GET_STARTED_MODAL: 'getStartedModal',
    BUY_PROPERTY: {
      IFRAME: 'buyPropertyIFrame',
    },
    SPLIT_PROPERTY: {
      FILLOUT: 'splitPropertyFillout',
    },
    INVEST: {
      FILLOUT: 'investFillout',
    },
    FINANCE: {
      TYPEFORM: 'financeTypeform',
    },
    SOMETHING_ELSE: {
      FILLOUT: 'somethingElseFillout',
    },
  },
  EVENTS: {
    START: 'START',
    BUY_PROPERTY: {
      START: 'BUY_PROPERTY_START',
    },
    SPLIT_PROPERTY: {
      START: 'SPLIT_PROPERTY_START',
    },
    INVEST: {
      START: 'INVEST_START',
    },
    FINANCE: {
      START: 'FINANCE_START',
    },
    SOMETHING_ELSE: {
      START: 'SOMETHING_ELSE_START',
    },
    EXIT: 'EXIT',
  },
}

/*
 * ----------------------------------------------------------------
 * Functions
 * ----------------------------------------------------------------
 */

function createFlowStateMachine(trackingService) {
  // Create transition definition objects for *shared* transition events / paths
  const sharedExitTransition = {
    [flowConstants.EVENTS.EXIT]: {
      target: flowConstants.STATES.DEFAULT,
    },
  }

  // Create state machine store
  const stateMachineDefinition = {
    constants: flowConstants,
    defaultState: flowConstants.STATES.DEFAULT,
    states: {
      [flowConstants.STATES.DEFAULT]: {
        transitions: {
          [flowConstants.EVENTS.START]: {
            target: flowConstants.STATES.GET_STARTED_MODAL,
          },
          [flowConstants.EVENTS.BUY_PROPERTY.START]: {
            target: flowConstants.STATES.BUY_PROPERTY.IFRAME,
          },
          [flowConstants.EVENTS.SPLIT_PROPERTY.START]: {
            target: flowConstants.STATES.SPLIT_PROPERTY.FILLOUT,
          },
          [flowConstants.EVENTS.INVEST.START]: {
            target: flowConstants.STATES.INVEST.FILLOUT,
          },
          [flowConstants.EVENTS.FINANCE.START]: {
            target: flowConstants.STATES.FINANCE.TYPEFORM,
          },
        },
      },
      [flowConstants.STATES.GET_STARTED_MODAL]: {
        transitions: {
          ...sharedExitTransition,
          [flowConstants.EVENTS.BUY_PROPERTY.START]: {
            target: flowConstants.STATES.BUY_PROPERTY.IFRAME,
          },
          [flowConstants.EVENTS.SPLIT_PROPERTY.START]: {
            target: flowConstants.STATES.SPLIT_PROPERTY.FILLOUT,
          },
          [flowConstants.EVENTS.INVEST.START]: {
            target: flowConstants.STATES.INVEST.FILLOUT,
          },
          [flowConstants.EVENTS.FINANCE.START]: {
            target: flowConstants.STATES.FINANCE.TYPEFORM,
          },
          [flowConstants.EVENTS.SOMETHING_ELSE.START]: {
            target: flowConstants.STATES.SOMETHING_ELSE.FILLOUT,
          },
        },
        effects: {
          onEntry: [
            (eventProperties) => {
              trackingService.track('Get Started Modal Opened', eventProperties)
            },
          ],
        },
      },
      [flowConstants.STATES.BUY_PROPERTY.IFRAME]: {
        transitions: {
          ...sharedExitTransition,
        },
        effects: {
          onEntry: [
            (eventProperties) => {
              trackingService.track(
                'Buy Property Flow Started',
                eventProperties,
              )
            },
          ],
        },
      },
      [flowConstants.STATES.SPLIT_PROPERTY.FILLOUT]: {
        transitions: {
          ...sharedExitTransition,
        },
        effects: {
          onEntry: [
            (eventProperties) => {
              trackingService.track(
                'Split Property Flow Started',
                eventProperties,
              )
            },
          ],
        },
      },
      [flowConstants.STATES.INVEST.FILLOUT]: {
        transitions: {
          ...sharedExitTransition,
        },
        effects: {
          onEntry: [
            (eventProperties) => {
              trackingService.track('Invest Flow Started', eventProperties)
            },
          ],
        },
      },
      [flowConstants.STATES.FINANCE.TYPEFORM]: {
        transitions: {
          ...sharedExitTransition,
        },
        effects: {
          onEntry: [
            (eventProperties) => {
              trackingService.track('Finance Flow Started', eventProperties)
            },
          ],
        },
      },
      [flowConstants.STATES.SOMETHING_ELSE.FILLOUT]: {
        transitions: {
          ...sharedExitTransition,
        },
        effects: {
          onEntry: [
            (eventProperties) => {
              trackingService.track(
                'Something Else Flow Started',
                eventProperties,
              )
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
          flowConstants.STATES.GET_STARTED_MODAL,
          flowConstants.STATES.BUY_PROPERTY.IFRAME,
          flowConstants.STATES.SPLIT_PROPERTY.FILLOUT,
          flowConstants.STATES.INVEST.FILLOUT,
          flowConstants.STATES.FINANCE.TYPEFORM,
          flowConstants.STATES.SOMETHING_ELSE.FILLOUT,
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
export { createFlowStateMachine, createFlowUIHelpers }
