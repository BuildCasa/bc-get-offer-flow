/*
 * ----------------------------------------------------------------
 * Imports
 * ----------------------------------------------------------------
 */
import Alpine from 'alpinejs'
import { trackEvent } from './LegacyTracking'

/**
 * Creates and returns reference to an Alpine store for the flowStateMachine
 * A finite state machine that defines which `states` are possible for the Get Offer UI Flow
 * And for every `state`, which `transitions` are possible _from_ that state — defined with:
 * - EVENT: Key for the `transition`
 * - target: String, matching the key for the `state` that should be set when the `transition` `EVENT` is triggered
 *
 * This state machine also defines a `transition` method which is used to call and process the transition events,
 * Returns the resulting `state` — to update the value for the `flowState` Alpine store that drives the main UI state
 * e.g. `$store.flowState.value = $store.flowStateMachine.transition($store.flowState.value, "EVENT")
 */
function createFlowStateMachine(globalStore) {
  // Create transition definition objects for *shared* transition events / paths
  const submitAddressTransition = {
    SUBMIT_ADDRESS: {
      target: 'addressFormProcessing',
    },
  }
  const modalSubmitAddressTransition = {
    SUBMIT_ADDRESS: {
      target: 'modalAddressFormProcessing',
    },
  }
  const submitContactTransition = {
    SUBMIT_CONTACT: {
      target: 'contactFormProcessing',
    },
  }
  const exitTransition = {
    EXIT: {
      target: 'default',
    },
  }

  // Create state machine Alpine store
  Alpine.store('flowStateMachine', {
    defaultState: 'default',
    states: {
      default: {
        transitions: {
          ...submitAddressTransition,
          START_MODAL_FLOW: {
            target: 'modalAddressForm',
          },
        },
      },
      addressFormProcessing: {
        transitions: {
          SUCCESS: {
            target: 'contactForm',
          },
          SKIP_CONTACT: {
            target: 'estimateResults',
          },
          ERROR: {
            target: 'addressFormError',
          },
        },
      },
      addressFormError: {
        transitions: {
          ...submitAddressTransition,
        },
      },
      modalAddressForm: {
        transitions: {
          ...modalSubmitAddressTransition,
          ...exitTransition,
        },
      },
      modalAddressFormProcessing: {
        transitions: {
          SUCCESS: {
            target: 'contactForm',
          },
          SKIP_CONTACT: {
            target: 'estimateResults',
          },
          ERROR: {
            target: 'modalAddressFormError',
          },
          ...exitTransition,
        },
      },
      modalAddressFormError: {
        transitions: {
          ...modalSubmitAddressTransition,
          ...exitTransition,
        },
      },
      contactForm: {
        transitions: {
          ...submitContactTransition,
          ...exitTransition,
        },
      },
      contactFormProcessing: {
        transitions: {
          SUCCESS: {
            target: 'estimateResults',
          },
          ERROR: {
            target: 'contactFormError',
          },
          ...exitTransition,
        },
      },
      contactFormError: {
        transitions: {
          ...submitContactTransition,
          ...exitTransition,
        },
      },
      estimateResults: {
        transitions: {
          SCHEDULE: {
            target: 'scheduleConsultation',
          },
          REQUEST_COMMUNITY: {
            target: 'requestedCommunity',
          },
          ...exitTransition,
        },
      },
      scheduleConsultation: {
        transitions: {
          ...exitTransition,
        },
      },
      requestedCommunity: {
        transitions: {
          ...exitTransition,
        },
      },
    },
    // Method to trigger state transitions, given the current state, and a valid transition event
    // For a successful transition, returns the resulting state
    transition(currentState, event) {
      const currentStateDefinition = this.states[currentState]
      const destinationTransition = currentStateDefinition.transitions[event]

      if (!destinationTransition) {
        trackEvent('Invalid State Transition Triggered', globalStore, {
          current_state_str: currentState,
          event_str: event,
        })
        return currentState
      }

      const destinationState = destinationTransition.target
      return destinationState
    },
  })

  // Add a reference to the new flowStateMachine Alpine store to the global store
  globalStore.flowStateMachine = Alpine.store('flowStateMachine')
}

/**
 * Creates and returns reference to an Alpine store for the main flowState
 * Used to drive the main UI state as users progress through the Get Offer flow
 * Can be accessed in HTML via directive attribute values w/ `$store.flowState`
 *
 * - value: String, for the current UI state that should be displayed, generally bound via `x-show`
 * - init: Function, run automatically by Alpine as soon as the store is created, to initialize the values (including advanced logic)
 */
function createFlowState(globalStore) {
  Alpine.store('flowState', {
    value: '',
    init() {
      // FUTURE DEV: Update w/ logic to set initial UI state based on other sources (link params, etc.) here

      this.value = globalStore.flowStateMachine.defaultState
    },
  })

  // Add a reference to the new flowState Alpine store to the global store
  globalStore.flowState = Alpine.store('flowState')
}

/*
 * ----------------------------------------------------------------
 * Exports
 * ----------------------------------------------------------------
 */
export { createFlowStateMachine, createFlowState }
