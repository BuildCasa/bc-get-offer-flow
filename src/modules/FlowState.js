// TODO: Create JSDoc interface for FlowStateMachine.

/*
 * ----------------------------------------------------------------
 * Functions
 * ----------------------------------------------------------------
 */

/**
 * Factory function for creating a FlowState instance.
 * @param {FlowStateMachine} stateMachine - The state machine that defines the flow states, events, and transitions.
 * @param {object} trackingService - The tracking service object.
 * @param {string} [initialValue] - Optional: The initial value for the state (otherwise uses the stateMachine defaultState).
 * @returns {FlowState} New FlowState instance.
 */
function createFlowState(stateMachine, trackingService, initialValue) {
  let value = initialValue
  if (!value || !stateMachine?.states[value]) {
    value = stateMachine?.defaultState
  }

  return {
    value: value,

    /**
     * Transition to a new state, based on the current state and a valid transition event.
     * @param {string} event - Event to trigger the desired state transition.
     * @returns {void}
     */
    transition(event) {
      const currentStateDefinition = stateMachine.states[this.value]
      const destinationTransition = currentStateDefinition?.transitions[event]

      if (!currentStateDefinition || !destinationTransition) {
        trackingService.track('Invalid State Transition Triggered', {
          current_state_str: this.value,
          event_str: event,
        })
        return
      }

      this.value = destinationTransition.target
    },
  }
}

/*
 * ----------------------------------------------------------------
 * Exports
 * ----------------------------------------------------------------
 */
export { createFlowState }
