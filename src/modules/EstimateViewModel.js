// TODO: Create JSDoc interface for an EstimateViewModel.

/*
 * ----------------------------------------------------------------
 * Functions
 * ----------------------------------------------------------------
 */

/**
 * Factory function for creating an EstimateViewModel instance.
 * @param {Object} flowState - Reference to the relevant FlowState object to be associated with this instance.
 * @returns {EstimateViewModel} New EstimateViewModel instance.
 */
function createEstimateViewModel(flowState) {
  return {
    // Instance properties
    jurisdiction: {
      status: '',
    },
    estimate: {
      low: null,
      high: null,
    },

    /**
     * Initializes the estimate view model properties.
     * Run automatically by Alpine, but can also be called manually to reset the view model state.
     * Need to call this manually on store creation if we stop using Alpine as our UI library.
     * @returns {void}
     */
    init() {
      this.jurisdiction = {
        status: '',
      }
      this.estimate = {
        low: null,
        high: null,
      }
    },

    /**
     * Whether or not estimate results have already been retrieved.
     * @type {boolean}
     */
    get hasResults() {
      return !!this.jurisdiction.status
    },

    /**
     * Whether or not the current address / parcel jurisdiction is actively supported.
     * @type {boolean}
     */
    get hasActiveJurisdiction() {
      return this.jurisdiction.status == 'active'
    },

    /**
     * Whether or not there is currently a valid estimate with high and low values.
     * @type {boolean}
     */
    get hasEstimate() {
      return !!this.estimate.low && !!this.estimate.high
    },

    /**
     * Low estimate value, converted to a USD currency formatted string.
     * @type {string}
     */
    get lowEstimateString() {
      const currencyFormat = new Intl.NumberFormat(undefined, {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0,
      })

      return currencyFormat.format(Math.round(this.estimate.low))
    },

    /**
     * High estimate value, converted to a USD currency formatted string.
     * @type {string}
     */
    get highEstimateString() {
      const currencyFormat = new Intl.NumberFormat(undefined, {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0,
      })

      return currencyFormat.format(Math.round(this.estimate.high))
    },

    /**
     * Handles click events for the Schedule Consultation button.
     * Transitions the flow state based on the desired behavior for this action.
     * @param {MouseEvent} event - Mouse event (click) object.
     * @returns {void}
     */
    handleScheduleConsultationClick(event) {
      // Block default click handling behavior / event propagation
      event.preventDefault()
      event.stopPropagation()

      // Transition state according to desired logic for schedule consultation clicks
      flowState.transition('SCHEDULE')
    },

    /**
     * Handles click events for the Request Community button.
     * Transitions the flow state based on the desired behavior for this action.
     * @param {MouseEvent} event - Mouse event (click) object.
     * @returns {void}
     */
    handleRequestCommunityClick(event) {
      // Block default click handling behavior / event propagation
      event.preventDefault()
      event.stopPropagation()

      // Transition state according to desired logic for request community clicks
      flowState.transition('REQUEST_COMMUNITY')
    },
  }
}

/*
 * ----------------------------------------------------------------
 * Exports
 * ----------------------------------------------------------------
 */
export { createEstimateViewModel }
