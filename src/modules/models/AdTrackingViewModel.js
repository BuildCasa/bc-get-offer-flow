/*
 * ----------------------------------------------------------------
 * Constants
 * ----------------------------------------------------------------
 */

/*
 * ----------------------------------------------------------------
 * Functions
 * ----------------------------------------------------------------
 */
function createAdTrackingViewModel() {
  return {
    gclid: null,

    /**
     * Initializes the AdTrackingViewModel instance properties.
     * Run automatically by Alpine, but can also be called manually to reset the view model state.
     * Need to call this manually on store creation if we stop using Alpine as our UI library.
     * @returns {void}
     */
    init: function () {
      this.addGclid()
    },

    /**
     * Sets the Google Click ID (GCLID) for the session.
     * Adds GCLID to local storage if present in the URL and not expired.
     * Sets the GCLID value to the view model if present in local storage and not expired.
     * Adapted from script in Google Help Article: https://support.google.com/google-ads/answer/7012522
     * @returns {void}
     */
    addGclid() {
      const gclidParam = getParam('gclid')
      let gclidRecord = null

      const gclsrcParam = getParam('gclsrc')
      const isGclsrcValid = !gclsrcParam || gclsrcParam.indexOf('aw') !== -1

      if (gclidParam && isGclsrcValid) {
        gclidRecord = getExpiryRecord(gclidParam)
        localStorage.setItem('gclid', JSON.stringify(gclidRecord))
      }

      const gclid = gclidRecord || JSON.parse(localStorage.getItem('gclid'))
      const isGclidValid = gclid && new Date().getTime() < gclid.expiryDate

      if (isGclidValid) {
        this.gclid = gclid.value
      }
    },
  }
}

function getParam(p) {
  const match = RegExp('[?&]' + p + '=([^&]*)').exec(window.location.search)
  return match && decodeURIComponent(match[1].replace(/\+/g, ' '))
}

function getExpiryRecord(value) {
  const expiryPeriod = 90 * 24 * 60 * 60 * 1000 // 90 day expiry in milliseconds

  const expiryDate = new Date().getTime() + expiryPeriod
  return {
    value: value,
    expiryDate: expiryDate,
  }
}

/*
 * ----------------------------------------------------------------
 * Exports
 * ----------------------------------------------------------------
 */
export { createAdTrackingViewModel }
