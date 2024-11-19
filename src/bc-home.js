/*
 * ================================================================
 * BuildCasa - Home (.com) - Custom Script
 * ================================================================
 * This is the custom JavaScript that helps power the BuildCasa.com interactive site elements
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
import { createStoreFactory } from './modules/services/AlpineStoreService'

import { createTrackingService } from './modules/services/FullStoryTrackingService'

import { createFlowState } from './modules/flows/FlowState'
import {
  createFlowStateMachine,
  createFlowUIHelpers,
} from './modules/flows/BCTypeformGetStartedFlow'

import { createAddressViewModel } from './modules/models/AddressViewModel'
import { createContactViewModel } from './modules/models/ContactViewModel'
import { createEstimateViewModel } from './modules/models/EstimateViewModel'
import { createPersonalizationViewModel } from './modules/models/PersonalizationViewModel'
import { createExperimentationViewModel } from './modules/models/ExperimentationViewModel'

/*
 * ----------------------------------------------------------------
 * Initialization Procedure
 * ----------------------------------------------------------------
 */

// Add Alpine to the global scope for browser console access during development and debugging
window.Alpine = Alpine

// Create Alpine store factory to simplify the creation of Alpine stores for state management
const $storeFactory = createStoreFactory(Alpine)

// Create global variable to hold references to the stores
const $store = {}

// Create global variable to hold reference to the TrackingService for event tracking and analytics
const $trackingService = createTrackingService(window.FS, $store)

// Initialize the stores with custom state and business logic that powers the site interactivity
initStores()

// Start Alpine.js to enable the site interactivity
Alpine.start()

/*
 * ----------------------------------------------------------------
 * Initialization Functions
 * ----------------------------------------------------------------
 */
function initStores() {
  // Create flow state and UI helpers stores
  $store.flowState = $storeFactory.createStore(
    'flowState',
    createFlowState(
      createFlowStateMachine($store, $trackingService),
      $trackingService,
    ),
  )
  $store.flowUIHelpers = $storeFactory.createStore(
    'flowUIHelpers',
    createFlowUIHelpers($store, $trackingService),
  )

  // Create viewModel stores
  $store.addressViewModel = $storeFactory.createStore(
    'addressViewModel',
    createAddressViewModel($store, $trackingService),
  )
  $store.contactViewModel = $storeFactory.createStore(
    'contactViewModel',
    createContactViewModel($store.flowState),
  )
  $store.estimateViewModel = $storeFactory.createStore(
    'estimateViewModel',
    createEstimateViewModel($store.flowState),
  )
  $store.personalizationViewModel = $storeFactory.createStore(
    'personalizationViewModel',
    createPersonalizationViewModel(),
  )
  $store.experimentationViewModel = $storeFactory.createStore(
    'experimentationViewModel',
    createExperimentationViewModel(),
  )
}
