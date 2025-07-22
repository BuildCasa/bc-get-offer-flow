/*
 * ----------------------------------------------------------------
 * Imports
 * ----------------------------------------------------------------
 */
// TODO: Create JSDoc interface for a THConvertedContactViewModel.

/*
 * ----------------------------------------------------------------
 * Functions
 * ----------------------------------------------------------------
 */

/**
 * Factory function for creating a THConvertedContactViewModel instance.
 * @returns {THConvertedContactViewModel} New THConvertedContactViewModel instance.
 */
function createTHConvertedContactViewModel(contactInfo) {
  return {
    // Instance properties
    email: '',
    phone: '',

    /**
     * Initializes the THConvertedContactViewModel instance properties.
     * Run automatically by Alpine, but can also be called manually to reset the view model state.
     * Need to call this manually on store creation if we stop using Alpine as our UI library.
     * @returns {void}
     */
    init() {
      this.email = contactInfo?.email || ''
      this.phone = contactInfo?.phone || ''
    },
  }
}

/*
 * ----------------------------------------------------------------
 * Exports
 * ----------------------------------------------------------------
 */
export { createTHConvertedContactViewModel }
