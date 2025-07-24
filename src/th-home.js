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

import { createInterestAreaViewModel } from './modules/models/THInterestAreaViewModel'
import { createTHConvertedContactViewModel } from './modules/models/THConvertedContactViewModel'
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
  // Get the session URL to extract the query parameters associated with converted users
  const sessionURL = new URL(window.location.href)

  // Determine the initial flow state based on the 'get_started' URL parameter
  // If the user has completed the Get Started flow, set the initial state to the complete state
  // Otherwise, set it to the default state
  const getStartedURLParam = sessionURL.searchParams.get('get_started')
  const getStartedParamComplete =
    getStartedURLParam && getStartedURLParam === 'complete'
  const getStartedFlowState = getStartedParamComplete
    ? flowConstants.STATES.GET_STARTED.COMPLETE.MODAL
    : flowConstants.STATES.DEFAULT

  // Check for converted user contact information in the 'user_email' and 'user_phone' URL parameters
  const userEmail = sessionURL.searchParams.get('user_email')
  const userPhone = sessionURL.searchParams.get('user_phone')

  // If the user has completed the Get Started flow, and there is an email or phone number,
  // Push that information to the Google Tag Manager data layer
  if (getStartedParamComplete && (userEmail || userPhone)) {
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push({
      event: 'ec_form_submit',
      user_data: {
        email: userEmail || '',
        phone_number: userPhone || '',
      },
    })
  }

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
  $store.interestAreaViewModel = $storeFactory.createStore(
    'interestAreaViewModel',
    createInterestAreaViewModel($store.flowState, $trackingService),
  )
  $store.thConvertedContactViewModel = $storeFactory.createStore(
    'thConvertedContactViewModel',
    createTHConvertedContactViewModel({
      email: userEmail || '',
      phone: userPhone || '',
    }),
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
  // Initialize an experiment to test the new (Feb 2025) address typeahead flow vs old typeform flow
  // If the user has already completed the Get Started flow, then they should not see the experiment
  const includeAddressTypeaheadExperiment =
    $store.flowState.value === flowConstants.STATES.DEFAULT

  // If including in the Address Typeahead experiment
  if (includeAddressTypeaheadExperiment) {
    // Create an experiment id slug, and determine the experiment variant
    const experiment = 'interest-area-typeahead-2025-06'

    // Determine the variation for the experiment, with the following probabilities:
    // 25% - interest-area-typeahead-fillout-form-a1
    // 25% - interest-area-typeahead-fillout-form-a2-actions
    // 50% - existing-button-cta-fillout-form
    const randomValue = Math.random()

    let variation = 'existing-button-cta-fillout-form' // Default variation
    if (randomValue < 0.25) {
      variation = 'interest-area-typeahead-fillout-form-a1'
    } else if (randomValue < 0.5) {
      variation = 'interest-area-typeahead-fillout-form-a2-actions'
    }

    // Set the active experiment and variation in the experimentation view model
    $store.experimentationViewModel.setActiveExperimentVariation(
      experiment,
      variation,
    )

    // Track the experiment set event
    $trackingService.track(
      '2025-06 Interest Area Typeahead Flow Experiment Set',
    )
  }
}
