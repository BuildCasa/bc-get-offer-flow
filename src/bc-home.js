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
import { createAduCalculatorViewModel } from './modules/LegacyAduCalculatorViewModel'
import {
  createFlowStateMachine,
  createFlowState,
} from './modules/LegacyFlowState'
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
  createAduCalculatorViewModel(globalStore)
}

function initFlowState(globalStore) {
  createFlowStateMachine(globalStore)
  createFlowState(globalStore)
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
