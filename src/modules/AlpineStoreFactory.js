/*
 * ----------------------------------------------------------------
 * Classes
 * ----------------------------------------------------------------
 */

/** Class definition for an Alpine.js store factory. */
class AlpineStoreFactory {
  _Alpine

  /**
   * Create an AlpineStoreFactory instance.
   * @param {import("alpinejs").Alpine} Alpine - Current Alpine.js instance.
   */
  constructor(Alpine) {
    this._Alpine = Alpine
  }

  /**
   * Create, register, and return a reference to a global Alpine.Store.
   * @param {string} key - Descriptive key for the Alpine.Store registry.
   * @param {object} data - Initial data for the store.
   * @returns {unknown} Reference to the registered store.
   */
  createStore(key, data) {
    this._Alpine.store(key, data)
    return this._Alpine.store(key)
  }
}

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
  return new AlpineStoreFactory(Alpine)
}

/*
 * ----------------------------------------------------------------
 * Exports
 * ----------------------------------------------------------------
 */
export { createAlpineStoreFactory }
