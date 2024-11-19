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
  createFlowStateMachine,
  createFlowUIHelpers,
} from './modules/flows/THGetStartedFlow'

import personalizationData from './data/th-personalization-data.json'
import { createPersonalizationViewModel } from './modules/models/PersonalizationViewModel'

import { createExperimentationViewModel } from './modules/models/ExperimentationViewModel'

import { createTHGuidesDownloadViewModel } from './modules/models/THGuidesDownloadViewModel'
import { createTHGuidesContactViewModel } from './modules/models/THGuidesContactViewModel'
import { createTHCalculatorViewModel } from './modules/models/THCalculatorViewModel'

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
      ? 'modalGetStartedComplete'
      : 'default'

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

  // Create experimentation view model store
  $store.experimentationViewModel = $storeFactory.createStore(
    'experimentationViewModel',
    createExperimentationViewModel(),
  )

  // Create personalization view model store
  $store.personalizationViewModel = $storeFactory.createStore(
    'personalizationViewModel',
    createPersonalizationViewModel(personalizationData),
  )

  // Create view model stores
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
    createTHCalculatorViewModel(),
  )
}

function initExperiments() {
  // Determine whether or not to include in the Interruptor Popups experiment
  // If the user has already completed the Get Started flow, then they should not see the Interruptor Popups
  const includeInterruptorPopupExperiment = $store.flowState.value === 'default'

  // If including in the Interruptor Popups experiment
  if (includeInterruptorPopupExperiment) {
    // Set the experiment id slug, and determine the experiment variant
    const experiment = 'interruptor-popups-2024-11'
    const possibleVariations = ['none', 'guides', 'discount-plus-1500']
    const variation =
      possibleVariations[Math.floor(Math.random() * possibleVariations.length)] // Randomly select a variation with equal probability

    $store.experimentationViewModel.setActiveExperimentVariation(
      experiment,
      variation,
    )

    // Track the experiment set event
    $trackingService.track('Interruptor Popup Experiment Set')

    // If the variation is not 'none', schedule the interruptor popup to appear after a 15 second delay
    if (variation !== 'none') {
      setTimeout(() => {
        // Send Show Interruptor Popup flow transition event
        // State machine logic will ensure that it is only transitioned to from a valid state
        $store.flowState.transition('SHOW_INTERRUPTOR_POPUP')
      }, 15000)

      // Track the scheduled popup event
      $trackingService.track('Interruptor Popup Scheduled')
    }
  }
}
