/*
 * ----------------------------------------------------------------
 * Functions
 * ----------------------------------------------------------------
 */
function createExperimentationViewModel() {
  return {
    activeExperimentVariations: {},
    setActiveExperimentVariation(experiment, variation) {
      this.activeExperimentVariations[experiment] = variation
    },
    getActiveExperimentVariation(experiment) {
      return this.activeExperimentVariations[experiment]
    },
    clearActiveExperiment(experiment) {
      if (this.activeExperimentVariations[experiment]) {
        delete this.activeExperimentVariations[experiment]
      }
    },
    getFullStoryActiveExperimentVariationsEventPropertyValue() {
      // Convert the activeExperimentVariations object into a single array of strings,
      // concatenating the experiment name and variation name with a colon
      // e.g. ["experiment1:variation1", "experiment2:variation2"]
      return Object.entries(this.activeExperimentVariations).map(
        ([experiment, variation]) => `${experiment}:${variation}`,
      )
    },
    init() {
      this.activeExperimentVariations = {}
    },
  }
}

/*
 * ----------------------------------------------------------------
 * Exports
 * ----------------------------------------------------------------
 */
export { createExperimentationViewModel }
