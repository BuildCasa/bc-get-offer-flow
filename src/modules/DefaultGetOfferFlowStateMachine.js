function createDefaultGetOfferFlowStateMachine() {
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

  // Create state machine store
  const stateMachineDefinition = {
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
  }

  return stateMachineDefinition
}

/*
 * ----------------------------------------------------------------
 * Exports
 * ----------------------------------------------------------------
 */
export { createDefaultGetOfferFlowStateMachine }
