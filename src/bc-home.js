/*
 * ================================================================
 * BuildCasa Get Offer Flow
 * ================================================================
 * This is the custom JavaScript that helps power the BuildCasa.com Get Offer flow
 * It provides the state management and business logic for the BuildCasa Webflow site
 * The state is connected with the HTML and presentation logic via AlpineJS stores and directives
 * The site pages, HTML, and CSS are all designed, built, and hosted via the BuildCasa Webflow account
 */

/*
 * ----------------------------------------------------------------
 * Imports
 * ----------------------------------------------------------------
 */
import Alpine from 'alpinejs'
import { createAddressViewModel } from './modules/LegacyAddressViewModel'
import { createContactViewModel } from './modules/LegacyContactViewModel'
import { createEstimateViewModel } from './modules/LegacyEstimateViewModel'
import { createPersonalizationViewModel } from './modules/LegacyPersonalizationViewModel'
import { createExperimentationViewModel } from './modules/LegacyExperimentationViewModel'
import { trackEvent } from './modules/LegacyTracking'

/*
 * ----------------------------------------------------------------
 * Initialization Procedure
 * ----------------------------------------------------------------
 */

window.Alpine = Alpine

// Create global variable to hold references to the Alpine stores used for state management
const $store = {}

// Initialize the Alpine stores with custom state and business logic that powers the Get Offer flow
initViewModels($store)
initFlowState($store)
initUIHelpers($store)

// Start Alpine.js to enable the interactive behaviors of the Get Offer flow
Alpine.start()

/*
 * ----------------------------------------------------------------
 * Initialization Functions
 * ----------------------------------------------------------------
 */

function initViewModels(globalStore) {
  createAddressViewModel(globalStore)
  createContactViewModel(globalStore)
  createEstimateViewModel(globalStore)
  createPersonalizationViewModel(globalStore)
  createExperimentationViewModel(globalStore)
  globalStore.aduCalculatorViewModel = createAduCalculatorViewModel()
}

function initFlowState(globalStore) {
  globalStore.flowStateMachine = createFlowStateMachine()
  globalStore.flowState = createFlowState()
}

function initUIHelpers(globalStore) {
  globalStore.modalHelpers = createModalHelpers()
}

/*
 * ================================================================
 * Temp: Legacy 'Modules'
 * ================================================================
 * These scripts will be split out into their own modules / files
 * Then refactored for better flexibility and maintainability
 */

function createAduCalculatorViewModel() {
  Alpine.store('aduCalculatorViewModel', {
    homeValue: null,
    homeSize: null,
    aduCost: null,
    aduSize: null,
    result: null,
    init: function () {
      this.homeValue = this.formatInput('1000000')
      this.homeSize = this.formatInput('2000')
      this.aduCost = this.formatInput('250000')
      this.aduSize = this.formatInput('800')
      this.result = this.calculateResult()
    },
    handleInput: function (e) {
      e.target.value = this.formatInput(e.target.value)
      this.result = this.calculateResult()
    },
    handleSubmit: function (e) {
      e.preventDefault()
    },
    formatInput: function (inputValue) {
      const locale = 'en-US'
      let value = inputValue

      value = value.replace(/\D/g, '')

      value = new Intl.NumberFormat(locale, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(value)

      value = value !== '0' ? value : ''

      return value
    },
    calculateResult: function () {
      const homeValue = this.convertFieldValueToNumber(this.homeValue)
      const homeSize = this.convertFieldValueToNumber(this.homeSize)
      const aduCost = this.convertFieldValueToNumber(this.aduCost)
      const aduSize = this.convertFieldValueToNumber(this.aduSize)

      if (!homeValue || !homeSize || !aduSize) return '--'

      let result = (homeValue / homeSize) * aduSize - aduCost - 50000

      result = result < 10000 ? 10000 : Math.ceil(result / 10000) * 10000

      result = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(result)

      return result
    },
    convertFieldValueToNumber: function (fieldValue) {
      return Number(fieldValue.replace(/[^0-9.-]+/g, ''))
    },
  })

  // Return reference to the new aduCalculatorViewModel store
  return Alpine.store('aduCalculatorViewModel')
}

/**
 * ----------------------------------------------------------------
 * createFlowStateMachine
 * ----------------------------------------------------------------
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
function createFlowStateMachine() {
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
        trackEvent('Invalid State Transition Triggered', $store, {
          current_state_str: currentState,
          event_str: event,
        })
        return currentState
      }

      const destinationState = destinationTransition.target
      return destinationState
    },
  })

  // Return reference to the new flowStateMachine store
  return Alpine.store('flowStateMachine')
}

/**
 * ----------------------------------------------------------------
 * createFlowState
 * ----------------------------------------------------------------
 * Creates and returns reference to an Alpine store for the main flowState
 * Used to drive the main UI state as users progress through the Get Offer flow
 * Can be accessed in HTML via directive attribute values w/ `$store.flowState`
 *
 * - value: String, for the current UI state that should be displayed, generally bound via `x-show`
 * - init: Function, run automatically by Alpine as soon as the store is created, to initialize the values (including advanced logic)
 */
function createFlowState() {
  Alpine.store('flowState', {
    value: '',
    init() {
      // FUTURE DEV: Update w/ logic to set initial UI state based on other sources (link params, etc.) here

      this.value = $store.flowStateMachine.defaultState
    },
  })

  // Return reference to the new flowState store
  return Alpine.store('flowState')
}

/**
 * ----------------------------------------------------------------
 * createModalHelpers
 * ----------------------------------------------------------------
 * Creates and returns reference to an Alpine store for modalHelpers
 * Which help control the UX for the modal-based implementation of the Get Offer flow
 * Centralizes some more complex expressions to make Webflow dev safer and more convenient
 * Can be accessed in HTML via directive attribute values w/ `$store.modalHelpers`
 *
 * - iOpen: Getter, that returns true if modal should be displayed based on current flowState, generally bound via `x-show`
 * - handleModalClose: Function, that triggers the flowStateMachine EXIT transition if called, bound UI events via `x-on:click` or `@click`
 */
function createModalHelpers() {
  Alpine.store('modalHelpers', {
    get isOpen() {
      return (
        $store.flowState.value == 'modalAddressForm' ||
        $store.flowState.value == 'modalAddressFormProcessing' ||
        $store.flowState.value == 'modalAddressFormError' ||
        $store.flowState.value == 'contactForm' ||
        $store.flowState.value == 'contactFormProcessing' ||
        $store.flowState.value == 'contactFormError' ||
        $store.flowState.value == 'estimateResults' ||
        $store.flowState.value == 'scheduleConsultation' ||
        $store.flowState.value == 'requestedCommunity'
      )
    },
    handleModalFlowStart(cta = null) {
      $store.flowState.value = $store.flowStateMachine.transition(
        $store.flowState.value,
        'START_MODAL_FLOW',
      )

      let eventProperties = {}
      if (cta) {
        eventProperties = {
          cta_str: cta,
        }
      }

      trackEvent('Modal Get Offer Flow Opened', $store, eventProperties)
    },
    handleModalClose() {
      // TODO: Move this logic into the flowStateMachine
      let proceedWithExit = true

      // If the user is on the contact form, and has entered any data,
      // confirm they want to exit before closing the modal
      if (
        $store.flowState.value == 'contactForm' &&
        $store.contactViewModel.hasAnyContactDetails
      ) {
        proceedWithExit = confirm(
          "Are you sure you want to stop before you've seen how much your extra lot space could be worth?",
        )
      }

      // If the user is on the contact form processing state,
      // prevent them from exiting until the processing is complete
      if ($store.flowState.value == 'contactFormProcessing') {
        proceedWithExit = false
      }

      if (proceedWithExit) {
        $store.flowState.value = $store.flowStateMachine.transition(
          $store.flowState.value,
          'EXIT',
        )

        trackEvent('Get Offer Modal Closed', $store)
      }
    },
  })

  // Return reference to the new modalHelpers store
  return Alpine.store('modalHelpers')
}
