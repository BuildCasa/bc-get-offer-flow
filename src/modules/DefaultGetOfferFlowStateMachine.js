/*
 * ----------------------------------------------------------------
 * Imports
 * ----------------------------------------------------------------
 */
import { fetchParcelDetails } from './services/RegridAddressService.js'
import { fetchEstimateResults } from './services/MakeBCBackendService.js'
import { createLead } from './services/MakeBCBackendService'

import { validateEmailAddress } from './utils/EmailUtils'
import { validatePhoneNumber } from './utils/PhoneUtils'
import { loadScript } from './utils/ExternalScriptsUtils'

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
      effects: {
        onTransition: [
          () => {
            trackingService?.track('Contact Submitted')
          },
        ],
      },
    },
  }

  const contactProcessingStateEffects = {
    onEntry: [processContactSubmission],
  }

  async function processContactSubmission() {
    // If the user has an active jurisdiction and an estimate, and the offering / lead type is "Windfall",
    // set appropriate variation for the Jul 2023 "Estimate or eligibility" experiment
    if (
      globalStore.estimateViewModel.hasActiveJurisdiction &&
      globalStore.estimateViewModel.hasEstimate &&
      globalStore.contactViewModel.options &&
      globalStore.contactViewModel.options.lead &&
      globalStore.contactViewModel.options.lead.type &&
      globalStore.contactViewModel.options.lead.type === 'Windfall'
    ) {
      const experiment = 'windfall-estimate-or-eligibility-2023-07'
      const variation =
        Math.random() < 0.5 ? 'amount-excluded' : 'amount-included'
      globalStore.experimentationViewModel.setActiveExperimentVariation(
        experiment,
        variation,
      )
    }

    try {
      // Process the submitted contact info, and transition the state accordingly

      // Create contact object for the create lead payload
      let contact = {
        firstName: globalStore.contactViewModel.firstName.trim(),
        lastName: globalStore.contactViewModel.lastName.trim(),
        email: globalStore.contactViewModel.email.trim(),
        phone: globalStore.contactViewModel.phone.trim(),
        desiredTimeline: globalStore.contactViewModel.desiredTimeline.trim(),
      }

      // Validate email address and phone number
      if (!validateEmailAddress(contact.email)) {
        throw new Error('Please enter a valid email address, and try again.', {
          cause: 'INVALID_EMAIL',
        })
      }
      if (!validatePhoneNumber(contact.phone)) {
        throw new Error(
          'Please enter a valid phone number, including area code, and try again.',
          { cause: 'INVALID_PHONE' },
        )
      }

      // Add address info to the contact object
      // If parcel details are available, use them
      // Otherwise, use the address info from the selected address
      if (globalStore.addressViewModel.hasParcelDetails) {
        contact = {
          ...contact,
          ...globalStore.addressViewModel.parcelDetails,
        }
      } else if (globalStore.addressViewModel.isSelected) {
        contact = {
          ...contact,
          address: [
            globalStore.addressViewModel.selectedMatch.address,
            globalStore.addressViewModel.selectedMatch.context,
          ].join(', '),
        }
      }

      // Put together the create lead payload
      const createLeadPayload = {
        ...globalStore.contactViewModel.options,
        contact: contact,
        activeExperimentVariations:
          globalStore.experimentationViewModel.activeExperimentVariations,
      }

      // Start sequencing through the lot analysis steps, and the create lead request in parallel
      await Promise.all([
        sequenceLotAnalysisSteps(globalStore.contactViewModel),
        createLead(createLeadPayload),
      ])

      globalStore.contactViewModel.isSubmitted = true

      // Transition state according to desired logic for successful contact submissions
      globalStore.flowState.transition('SUCCESS')
    } catch (error) {
      console.log('Error submitting contact:', error)
      // If error is thrown due to invalid email or phone number, show the specific error message
      // Otherwise, show a generic error message
      if (
        error &&
        error.cause &&
        (error.cause === 'INVALID_EMAIL' || error.cause === 'INVALID_PHONE')
      ) {
        globalStore.contactViewModel.errorMessage = error.message
      } else {
        globalStore.contactViewModel.errorMessage =
          'There was an error processing your info. Please try again, or contact us for help.'
      }

      // Transition state according to desired logic for contact submission errors
      globalStore.flowState.transition('ERROR')
    }
  }

  /**
   * Given a contactViewModel, updates the lotAnalysisStep property to each of the steps in the sequence
   * Waits for 1.5s between switches, to simulate the lot analysis process
   */
  async function sequenceLotAnalysisSteps(contactViewModel) {
    const analysisSteps = [
      'Checking flood zones...',
      'Checking fire hazard zones...',
      'Checking zoning district...',
      'Checking lot shape & size...',
    ]

    // Iterate through the analysis steps
    for (const step of analysisSteps) {
      // Update the current state of the contactViewModel with the current step
      contactViewModel.lotAnalysisStep = step

      // Wait for 1.5s w/ the current step, before moving to the next
      await new Promise((resolve) => {
        setTimeout(resolve, 1500)
      })
    }
  }

  const estimateResultsStateEffects = {
    onEntry: [loadRelevantExternalScripts],
  }

  async function loadRelevantExternalScripts() {
    // If the user has an active jurisdiction and an estimate,
    // dynamically load the tsparticles-confetti script
    if (
      globalStore.estimateViewModel.hasActiveJurisdiction &&
      globalStore.estimateViewModel.hasEstimate
    ) {
      await loadScript(
        'https://cdn.jsdelivr.net/npm/tsparticles-confetti@2.11.0/tsparticles.confetti.bundle.min.js',
        { async: true },
      )

      const confettiColors =
        globalStore.contactViewModel.options &&
        globalStore.contactViewModel.options.lead &&
        globalStore.contactViewModel.options.lead.type &&
        globalStore.contactViewModel.options.lead.type === 'webuyCAlots'
          ? ['ffffff', '#1c429c', '#f0bd1b']
          : ['#ffffff', '#4cbd98', '#346af8']

      setTimeout(() => {
        window.confetti('tsparticles', {
          angle: 270,
          count: 90,
          position: {
            x: 50,
            y: -5,
          },
          spread: 180,
          startVelocity: 10,
          ticks: 200,
          colors: confettiColors,
          zIndex: 9999,
          disableForReducedMotion: true,
        })
      }, 500)
    }

    // As long as the user is not in an inactive jurisdiction,
    // dynamically load the Calendly script
    if (
      !globalStore.estimateViewModel.hasResults ||
      globalStore.estimateViewModel.hasActiveJurisdiction
    ) {
      loadScript('https://assets.calendly.com/assets/external/widget.js', {
        async: true,
      })
    }
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
            effects: {
              onTransition: [
                () => {
                  trackingService.track('Contact Submission Succeeded')
                },
              ],
            },
          },
          ERROR: {
            target: 'contactFormError',
            effects: {
              onTransition: [
                () => {
                  trackingService.track('Contact Submission Failed', {
                    error_str: globalStore.contactViewModel.errorMessage,
                  })
                },
              ],
            },
          },
          ...exitTransition,
        },
        effects: contactProcessingStateEffects,
      },
      contactFormError: {
        transitions: {
          ...submitContactTransition,
          ...exitTransition,
        },
        effects: {
          onExit: [
            () => {
              // Clear out any existing error message
              globalStore.contactViewModel.errorMessage = ''
            },
          ],
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
        effects: estimateResultsStateEffects,
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
