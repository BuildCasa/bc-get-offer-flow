/*
 * ----------------------------------------------------------------
 * Imports
 * ----------------------------------------------------------------
 */
import Alpine from 'alpinejs'
import { trackEvent } from './LegacyTracking'

/**
 * Creates and returns reference to an Alpine store for the estimateViewModel
 * Represents data returned by the Buildcasa estimate generation system
 * Determines which offer results state and next steps to display to users
 * Can be accessed in HTML via directive attribute values w/ `globalStore.estimateViewModel`
 *
 * - jurisdiction:
 *   - status: String, the active/inactive status of the jurisdiction for the provided address, to determine which results state to display (via `x-show`)
 * - estimate:
 *   - low: Number, low value for the estimate range, bound in the UI via `x-text`
 *   - high: Number, high value for the estimate range, bound in the UI via `x-text`
 * - hasResults: Getter,
 * - lowEstimateString: Getter,
 * - highEstimateString: Getter,
 * - init: Function, run automatically by Alpine as soon as the store is created, to initialize the values (including advanced logic)
 * - handleScheduleConsultationClick: Function, to handle Schedule Consultation button click via `x-on:click` / `@click`
 */
function createEstimateViewModel(globalStore) {
  Alpine.store('estimateViewModel', {
    jurisdiction: {
      status: '',
    },
    estimate: {
      low: null,
      high: null,
    },
    get hasResults() {
      return !!this.jurisdiction.status
    },
    get hasActiveJurisdiction() {
      return this.jurisdiction.status == 'active'
    },
    get hasEstimate() {
      return !!this.estimate.low && !!this.estimate.high
    },
    get lowEstimateString() {
      const currencyFormat = new Intl.NumberFormat(undefined, {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0,
      })

      return currencyFormat.format(Math.round(this.estimate.low))
    },
    get highEstimateString() {
      const currencyFormat = new Intl.NumberFormat(undefined, {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0,
      })

      return currencyFormat.format(Math.round(this.estimate.high))
    },
    init() {
      this.jurisdiction = {
        status: '',
      }
      this.estimate = {
        low: null,
        high: null,
      }
    },
    handleScheduleConsultationClick(event) {
      // Block default click handling behavior / event propagation
      event.preventDefault()
      event.stopPropagation()

      // Transition to Schedule Consultation state
      globalStore.flowState.value = globalStore.flowStateMachine.transition(
        globalStore.flowState.value,
        'SCHEDULE',
      )

      // Track Schedule Consultation button click
      trackEvent('Schedule Consultation Clicked', globalStore)
    },
    handleRequestCommunityClick(event) {
      // Block default click handling behavior / event propagation
      event.preventDefault()
      event.stopPropagation()

      // Transition to Schedule Consultation state
      globalStore.flowState.value = globalStore.flowStateMachine.transition(
        globalStore.flowState.value,
        'REQUEST_COMMUNITY',
      )

      // Track Request Community button click
      trackEvent('Community Requested', globalStore)
    },
  })

  // Add a reference to the new estimateViewModel Alpine store to the global store
  globalStore.estimateViewModel = Alpine.store('estimateViewModel')
}

/*
 * ----------------------------------------------------------------
 * Exports
 * ----------------------------------------------------------------
 */
export { createEstimateViewModel }
