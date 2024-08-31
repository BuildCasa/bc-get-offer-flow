// TODO: Create JSDoc interfaces for an abstract StoreFactory.

/*
 * ----------------------------------------------------------------
 * Functions
 * ----------------------------------------------------------------
 */

/**
 * Factory function for creating an Alpine StoreFactory instance.
 * @param {import("alpinejs").Alpine} Alpine - Current Alpine.js instance.
 * @returns {StoreFactory} New Alpine StoreFactory instance.
 */
function createStoreFactory(Alpine) {
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
export { createStoreFactory }
