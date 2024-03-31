/*
 * ================================================================
 * BuildCasa - webuyCAlots - Custom Script
 * ================================================================
 * This is the custom JavaScript that helps power the webuycalots.com interactive site elements
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

// Add Alpine to the global scope for browser console access during development and debugging
window.Alpine = Alpine

// Create global variable to hold references to the Alpine stores created for state management
const $store = {}

// Initialize the Alpine stores with custom state and business logic that powers the Get Offer flow
initAlpineStores($store)

// Start Alpine.js to enable the interactive behaviors of the Get Offer flow
Alpine.start()

/*
 * ----------------------------------------------------------------
 * Initialization Functions
 * ----------------------------------------------------------------
 */

function initAlpineStores(globalStore) {
  initViewModels(globalStore)
  initFlowState(globalStore)
  initUIHelpers(globalStore)
}

function initViewModels(globalStore) {
  createAddressViewModel(globalStore)
  createContactViewModel(globalStore)
  createEstimateViewModel(globalStore)
  createPersonalizationViewModel(globalStore)
  createExperimentationViewModel(globalStore)
}

function initFlowState(globalStore) {
  createFlowStateMachine(globalStore)
  createFlowState(globalStore)
}

function initUIHelpers(globalStore) {
  createModalHelpers(globalStore)
}
