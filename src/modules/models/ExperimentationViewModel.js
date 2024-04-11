// TODO: Create JSDoc interface for an ExperimentationViewModel.

/*
 * ----------------------------------------------------------------
 * Functions
 * ----------------------------------------------------------------
 */

/**
 * Factory function for creating an ExperimentationViewModel instance.
 * @returns {ExperimentationViewModel} New ExperimentationViewModel instance.
 */
function createExperimentationViewModel() {
  return {
    // Instance properties
    activeExperimentVariations: {},

    /**
     * Initializes the ExperimentationViewModel instance properties.
     * Run automatically by Alpine, but can also be called manually to reset the view model state.
     * Need to call this manually on store creation if we stop using Alpine as our UI library.
     * @returns {void}
     */
    init() {
      this.activeExperimentVariations = {}
    },

    /**
     * Sets the active variation for a given experiment.
     * @param {string} experiment - The name of the experiment.
     * @param {string} variation - The name of the variation.
     * @returns {void}
     */
    setActiveExperimentVariation(experiment, variation) {
      this.activeExperimentVariations[experiment] = variation
    },

    /**
     * Gets the active variation for a given experiment.
     * @param {string} experiment - The name of the experiment.
     * @returns {string} The name of the active variation.
     */
    getActiveExperimentVariation(experiment) {
      return this.activeExperimentVariations[experiment]
    },

    /**
     * Clears the active variation for a given experiment.
     * @param {string} experiment - The name of the experiment.
     * @returns {void}
     */
    clearActiveExperiment(experiment) {
      if (this.activeExperimentVariations[experiment]) {
        delete this.activeExperimentVariations[experiment]
      }
    },
  }
}

/*
 * ----------------------------------------------------------------
 * Exports
 * ----------------------------------------------------------------
 */
export { createExperimentationViewModel }
