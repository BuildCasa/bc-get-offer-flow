function createDefaultGetOfferFlowStateMachine(globalStore, trackingService) {
  // Create transition definition objects for *shared* transition events / paths
  const submitAddressTransition = {
    SUBMIT_ADDRESS: {
      target: 'addressFormProcessing',
      effects: {
        onTransition: [
          () => {
            trackingService?.track('Address Submitted')
          },
        ],
      },
    },
  }
  const modalSubmitAddressTransition = {
    SUBMIT_ADDRESS: {
      target: 'modalAddressFormProcessing',
      effects: {
        onTransition: [
          () => {
            trackingService?.track('Address Submitted')
          },
        ],
      },
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
            // effects: {
            //   onTransition: [() => {}],
            // },
          },
        },
        // effects: {
        //   onEntry: [() => {}],
        //   onExit: [() => {}],
        // },
      },
      addressFormProcessing: {
        transitions: {
          SUCCESS: {
            target: 'contactForm',
            effects: {
              onTransition: [
                () => {
                  trackingService.track('Address Submission Succeeded')
                },
              ],
            },
          },
          NON_BLOCKING_ERROR: {
            target: 'contactForm',
            effects: {
              onTransition: [
                () => {
                  trackingService.track(
                    'Address Submission Completed with Non-Blocking Error',
                  )
                },
              ],
            },
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
        effects: {
          onEntry: [() => {}],
          onExit: [
            () => {
              // Clear out any existing error message
              globalStore.addressViewModel.errorMessage = ''
            },
          ],
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
            effects: {
              onTransition: [
                () => {
                  trackingService.track('Address Submission Succeeded')
                },
              ],
            },
          },
          NON_BLOCKING_ERROR: {
            target: 'contactForm',
            effects: {
              onTransition: [
                () => {
                  trackingService.track(
                    'Address Submission Completed with Non-Blocking Error',
                  )
                },
              ],
            },
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
        effects: {
          onEntry: [() => {}],
          onExit: [
            () => {
              // Clear out any existing error message
              globalStore.addressViewModel.errorMessage = ''
            },
          ],
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
