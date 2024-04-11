// TODO: Create JSDoc interfaces for an abstract StoreFactory, and AlpineStoreFactory.

/*
 * ----------------------------------------------------------------
 * Functions
 * ----------------------------------------------------------------
 */

/**
 * Factory function for creating an AlpineStoreFactory instance.
 * @param {import("alpinejs").Alpine} Alpine - Current Alpine.js instance.
 * @returns {AlpineStoreFactory} New AlpineStoreFactory instance.
 */
function createAlpineStoreFactory(Alpine) {
  return {
    /**
     * Create, register, and return a reference to a global Alpine.Store.
     * @param {string} key - Descriptive key for the Alpine.Store registry.
     * @param {object} data - Initial data for the store.
     * @returns {unknown} Reference to the registered store.
     */
    createStore(key, data) {
      Alpine.store(key, data)
      return Alpine.store(key)
    },
  }
}

/*
 * ----------------------------------------------------------------
 * Exports
 * ----------------------------------------------------------------
 */
export { createAlpineStoreFactory }
