/*
 * ----------------------------------------------------------------
 * Imports
 * ----------------------------------------------------------------
 */
import { fetchParcelDetails } from './RegridAddressService.js'
import { fetchEstimateResults } from './MakeBuildCasaBackendService.js'

/*
 * ----------------------------------------------------------------
 * Functions
 * ----------------------------------------------------------------
 */

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

  const sharedAddressProcessingTransitions = {
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
      effects: {
        onTransition: [
          () => {
            trackingService.track(
              'Address Submission Completed with Contact Form Skipped',
            )
          },
        ],
      },
    },
  }

  const addressProcessingStateEffects = {
    onEntry: [processAddressSubmission],
  }

  async function processAddressSubmission() {
    // Process the submitted address, and transition the state accordingly
    try {
      // If the contact has already been submitted, skip the contact form and transition directly to the estimate results
      // Otherwise, transition to the contact form
      if (
        globalStore.addressViewModel.hasParcelDetails &&
        globalStore.estimateViewModel.hasResults &&
        globalStore.contactViewModel.isSubmitted
      ) {
        globalStore.flowState.transition('SKIP_CONTACT')
      } else {
        // If the parcel details haven't already been acquired for the address, fetch them from the Regrid API
        if (!globalStore.addressViewModel.hasParcelDetails) {
          // Combine appropriate fields from Regrid Typeahead and Parcel APIs into a single object
          globalStore.addressViewModel.parcelDetails = {
            ...(await fetchParcelDetails(
              globalStore.addressViewModel.selectedMatch.ll_uuid,
            )),
            address: globalStore.addressViewModel.selectedMatch.address,
            city: globalStore.addressViewModel.selectedMatch.context.split(
              ', ',
            )[0],
            state:
              globalStore.addressViewModel.selectedMatch.context.split(', ')[1],
          }
        }

        // If the estimate results haven't already been acquired for the address, fetch them from our estimate endpoint
        if (!globalStore.estimateViewModel.hasResults) {
          const fetchEstimatePayload = {
            ...globalStore.addressViewModel.options,
            parcel: {
              apn: globalStore.addressViewModel.parcelDetails.apn,
              jurisdiction:
                globalStore.addressViewModel.parcelDetails.jurisdiction,
            },
            address: {
              address: globalStore.addressViewModel.parcelDetails.address,
              city: globalStore.addressViewModel.parcelDetails.city,
              state: globalStore.addressViewModel.parcelDetails.state,
              zip: globalStore.addressViewModel.parcelDetails.zip,
            },
          }

          const estimateResults =
            await fetchEstimateResults(fetchEstimatePayload)

          globalStore.estimateViewModel.jurisdiction =
            estimateResults.jurisdiction
          globalStore.estimateViewModel.estimate = estimateResults.estimate
        }

        // Transition state according to desired logic for successful address processing
        globalStore.flowState.transition('SUCCESS')
      }
    } catch (error) {
      // Transition state according to desired logic for non-blocking errors
      globalStore.flowState.transition('NON_BLOCKING_ERROR')
    }
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
          ...sharedAddressProcessingTransitions,
          ERROR: {
            target: 'addressFormError',
            effects: {
              onTransition: [
                () => {
                  trackingService.track('Address Form Error (Blocking)')
                },
              ],
            },
          },
        },
        effects: addressProcessingStateEffects,
      },
      addressFormError: {
        transitions: {
          ...submitAddressTransition,
        },
        effects: {
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
          ...sharedAddressProcessingTransitions,
          ERROR: {
            target: 'modalAddressFormError',
            effects: {
              onTransition: [
                () => {
                  trackingService.track('Address Form Error (Blocking)')
                },
              ],
            },
          },
          ...exitTransition,
        },
        effects: addressProcessingStateEffects,
      },
      modalAddressFormError: {
        transitions: {
          ...modalSubmitAddressTransition,
          ...exitTransition,
        },
        effects: {
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
            effects: {
              onTransition: [
                () => {
                  trackingService.track('Schedule Consultation Clicked')
                },
              ],
            },
          },
          REQUEST_COMMUNITY: {
            target: 'requestedCommunity',
            effects: {
              onTransition: [
                () => {
                  trackingService.track('Community Requested')
                },
              ],
            },
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
