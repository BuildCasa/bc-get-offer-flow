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

    /**
     * Transition to a new state, based on the current state and a valid transition event.
     * @param {string} event - Event to trigger the desired state transition.
     * @returns {void}
     */
    transition(event) {
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
        trackingService.track('Invalid State Transition Triggered', {
          current_state_str: currentState,
          event_str: event,
        })
        return
      }

      // Run any exit effects for the current state before transitioning to the new state
      const currentStateExitEffects = currentStateDef.effects?.onExit
      runEffects(currentStateExitEffects)

      // Run any transition effects for the current state before transitioning to the new state
      const transitionEffects = transitionDef.effects?.onTransition
      runEffects(transitionEffects)

      // Transition to the target state
      this.value = transitionTarget

      // Run any entry effects for the new (target) state
      const targetStateEntryEffects = targetStateDef.effects?.onEntry
      runEffects(targetStateEntryEffects)
    },
  }
}

function runEffects(effects) {
  if (effects && effects.length) {
    effects.forEach((effect) => {
      effect()
    })
  }
}

/*
 * ----------------------------------------------------------------
 * Exports
 * ----------------------------------------------------------------
 */
export { createFlowState }
