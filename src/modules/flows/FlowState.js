// TODO: Create JSDoc interfaces for FlowStateMachine, and FlowState.

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
    STATES: stateMachine?.constants?.STATES || {},
    EVENTS: stateMachine?.constants?.EVENTS || {},

    /**
     * Transition to a new state, based on the current state and a valid transition event.
     * @param {string} event - Event to trigger the desired state transition.
     * @param {object} [eventProperties] - Optional: Additional context to pass to transition effects, tracking service, etc.
     * @returns {void}
     */
    transition(event, eventProperties = {}) {
      // Get references to the current state, transition, and target state definitions from the state machine
      const currentState = this.value
      const currentStateDef = stateMachine?.states?.[currentState]
      const transitionDef = currentStateDef?.transitions?.[event]
      const transitionTarget = transitionDef?.target
      const targetStateDef = stateMachine?.states?.[transitionTarget]

      // If any of the necessary definitions (current state, transition, or target state) do not exist,
      // the transition is invalid and no state change nor effects should take place
      if (
        !currentStateDef ||
        !transitionDef ||
        !transitionTarget ||
        !targetStateDef
      ) {
        trackingService.track('Invalid State Transition', {
          ...eventProperties,
          current_state_str: currentState,
          event_str: event,
        })
        return
      }

      // Run any exit effects for the current state before transitioning to the new state
      const currentStateExitEffects = currentStateDef.effects?.onExit
      runEffects(currentStateExitEffects, eventProperties)

      // Run any transition effects for the current state before transitioning to the new state
      const transitionEffects = transitionDef.effects?.onTransition
      runEffects(transitionEffects, eventProperties)

      // Transition to the target state
      this.value = transitionTarget

      // Run any entry effects for the new (target) state
      const targetStateEntryEffects = targetStateDef.effects?.onEntry
      runEffects(targetStateEntryEffects, eventProperties)
    },
  }
}

/**
 * Helper function to run a series of effects (functions) provided by the state machine definitions.
 * @param {Function[]} effects - List of effects to run.
 * @returns {void}
 */
function runEffects(effects, eventProperties = {}) {
  if (effects && effects.length) {
    effects.forEach((effect) => {
      effect(eventProperties)
    })
  }
}

/*
 * ----------------------------------------------------------------
 * Exports
 * ----------------------------------------------------------------
 */
export { createFlowState }
