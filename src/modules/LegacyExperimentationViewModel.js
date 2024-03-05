/*
 * ----------------------------------------------------------------
 * Imports
 * ----------------------------------------------------------------
 */
import Alpine from 'alpinejs'

/**
 * Creates and returns reference to an Alpine store for the experimentationViewModel
 * Contains data used to drive split tests within the user experience
 * Can be accessed in HTML via directive attribute values w/ `$store.experimentationViewModel`
 *
 * - activeExperimentVariations: Object, containing each active experiment as a key, and the active variation as the value
 * - setActiveExperimentVariation: Function, to set the active variation for a given experiment
 * - getActiveExperimentVariation: Function, to get the active variation for a given experiment
 * - init: Function, run automatically by Alpine as soon as the store is created, to initialize the values (including advanced logic)
 */
function createExperimentationViewModel(globalStore) {
  Alpine.store('experimentationViewModel', {
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
  })

  // Add a reference to the new experimentationViewModel Alpine store to the global store
  globalStore.experimentationViewModel = Alpine.store(
    'experimentationViewModel',
  )
}

/*
 * ----------------------------------------------------------------
 * Exports
 * ----------------------------------------------------------------
 */
export { createExperimentationViewModel }
