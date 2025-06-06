/*
 * ================================================================
 * TurboHome - Home (.com) - Custom Script
 * ================================================================
 * This is the custom JavaScript that helps power the TurboHome.com interactive site elements
 * It provides the state management and business logic for the TurboHome Webflow site
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
  flowConstants,
  createFlowStateMachine,
  createFlowUIHelpers,
} from './modules/flows/THFlows'

import { createAddressViewModel } from './modules/models/THAddressViewModel'
import { createTHGuidesDownloadViewModel } from './modules/models/THGuidesDownloadViewModel'
import { createTHGuidesContactViewModel } from './modules/models/THGuidesContactViewModel'
import { createTHCalculatorViewModel } from './modules/models/THCalculatorViewModel'

import personalizationData from './data/th-personalization-data.json'
import { createPersonalizationViewModel } from './modules/models/PersonalizationViewModel'

import { createExperimentationViewModel } from './modules/models/ExperimentationViewModel'
import { createAdTrackingViewModel } from './modules/models/AdTrackingViewModel'

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

// Initialize experiments and determine each experiment variant
initExperiments()

// Start Alpine.js to enable the site interactivity
Alpine.start()

/*
 * ----------------------------------------------------------------
 * Initialization Functions
 * ----------------------------------------------------------------
 */
function initStores() {
  // Get the session URL and extract the flow_state query parameter
  const sessionURL = new URL(window.location.href)
  const getStartedURLParam = sessionURL.searchParams.get('get_started')
  const getStartedFlowState =
    getStartedURLParam && getStartedURLParam === 'complete'
      ? flowConstants.STATES.GET_STARTED.COMPLETE.MODAL
      : flowConstants.STATES.DEFAULT

  // Create flow state and UI helpers stores
  $store.flowState = $storeFactory.createStore(
    'flowState',
    createFlowState(
      createFlowStateMachine($store, $trackingService),
      $trackingService,
      getStartedFlowState,
    ),
  )
  $store.flowUIHelpers = $storeFactory.createStore(
    'flowUIHelpers',
    createFlowUIHelpers($store, $trackingService),
  )

  // Create view model stores
  $store.personalizationViewModel = $storeFactory.createStore(
    'personalizationViewModel',
    createPersonalizationViewModel(personalizationData),
  )
  $store.experimentationViewModel = $storeFactory.createStore(
    'experimentationViewModel',
    createExperimentationViewModel(),
  )
  $store.adTrackingViewModel = $storeFactory.createStore(
    'adTrackingViewModel',
    createAdTrackingViewModel(),
  )

  $store.addressViewModel = $storeFactory.createStore(
    'addressViewModel',
    createAddressViewModel($trackingService),
  )

  $store.thGuidesContactViewModel = $storeFactory.createStore(
    'thGuidesContactViewModel',
    createTHGuidesContactViewModel($store.flowState),
  )
  $store.thGuidesDownloadViewModel = $storeFactory.createStore(
    'thGuidesDownloadViewModel',
    createTHGuidesDownloadViewModel($store, $trackingService),
  )
  $store.thCalculatorViewModel = $storeFactory.createStore(
    'thCalculatorViewModel',
    createTHCalculatorViewModel($store.personalizationViewModel),
  )
}

function initExperiments() {
  // TEMPORARY: Disable the Address Typeahead experiment for now
  // Will only display the old typeform flow (logic in THFlows.js)
  const includeAddressTypeaheadExperiment = false

  // // Initialize an experiment to test the new (Feb 2025) address typeahead flow vs old typeform flow
  // // If the user has already completed the Get Started flow, then they should not see the experiment
  // const includeAddressTypeaheadExperiment = $store.flowState.value === flowConstants.STATES.DEFAULT

  // If including in the Address Typeahead experiment
  if (includeAddressTypeaheadExperiment) {
    // Create an experiment id slug, and determine the experiment variant
    const experiment = 'address-typeahead-2025-02'
    const possibleVariations = [
      'address-typeahead-new-flow',
      'typeform-only-old-flow',
    ]
    const variation =
      possibleVariations[Math.floor(Math.random() * possibleVariations.length)] // Randomly select a variation with equal probability

    // Set the active experiment and variation in the experimentation view model
    $store.experimentationViewModel.setActiveExperimentVariation(
      experiment,
      variation,
    )

    // Track the experiment set event
    $trackingService.track('2025 Address Typeahead Flow Experiment Set')
  }
}
