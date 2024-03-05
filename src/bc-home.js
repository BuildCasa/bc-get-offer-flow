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
import { createModalHelpers } from './modules/LegacyModalHelpers'

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
  createModalHelpers(globalStore)
}
