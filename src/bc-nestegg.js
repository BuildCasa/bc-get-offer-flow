/*
 * ================================================================
 * BuildCasa - NestEgg - Custom Script
 * ================================================================
 * This is the custom JavaScript that helps power the BuildCasa.com/nestegg interactive site elements
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
import { createAlpineStoreFactory } from './modules/AlpineStoreFactory'
import { createFullStoryTrackingService } from './modules/FullStoryTrackingService'
import { createAddressViewModel } from './modules/AddressViewModel'
import { createContactViewModel } from './modules/ContactViewModel'
import { createEstimateViewModel } from './modules/EstimateViewModel'
import { createPersonalizationViewModel } from './modules/PersonalizationViewModel'
import { createExperimentationViewModel } from './modules/ExperimentationViewModel'
import { createFlowState } from './modules/FlowState'
import { createDefaultGetOfferFlowStateMachine } from './modules/DefaultGetOfferFlowStateMachine'
import { createModalHelpers } from './modules/ModalHelpers'

/*
 * ----------------------------------------------------------------
 * Initialization Procedure
 * ----------------------------------------------------------------
 */

// Add Alpine to the global scope for browser console access during development and debugging
window.Alpine = Alpine

// Create Alpine store factory to simplify the creation of Alpine stores for state management
const $storeFactory = createAlpineStoreFactory(Alpine)

// Create global variable to hold references to the stores
const $store = {}

// Create global variable to hold reference to the TrackingService for event tracking and analytics
const $trackingService = createFullStoryTrackingService(window.FS, $store)

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
  // Create viewModel stores
  $store.addressViewModel = $storeFactory.createStore(
    'addressViewModel',
    createAddressViewModel($store, $trackingService),
  )
  $store.contactViewModel = $storeFactory.createStore(
    'contactViewModel',
    createContactViewModel($store, $trackingService),
  )
  $store.estimateViewModel = $storeFactory.createStore(
    'estimateViewModel',
    createEstimateViewModel($store, $trackingService),
  )
  $store.personalizationViewModel = $storeFactory.createStore(
    'personalizationViewModel',
    createPersonalizationViewModel(),
  )
  $store.experimentationViewModel = $storeFactory.createStore(
    'experimentationViewModel',
    createExperimentationViewModel(),
  )

  // Create flow state store
  $store.flowState = $storeFactory.createStore(
    'flowState',
    createFlowState(
      createDefaultGetOfferFlowStateMachine($store, $trackingService),
      $trackingService,
    ),
  )

  // Create UI helper stores
  $store.modalHelpers = $storeFactory.createStore(
    'modalHelpers',
    createModalHelpers($store, $trackingService),
  )
}
