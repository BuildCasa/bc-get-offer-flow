/*
 * ----------------------------------------------------------------
 * Constants
 * ----------------------------------------------------------------
 */
const GEO_JS_API_URL = 'https://get.geojs.io/v1/ip/geo.json'

/*
 * ----------------------------------------------------------------
 * Functions
 * ----------------------------------------------------------------
 */
/**
 * Submits request to the GeoJS API to get user geolocation data.
 * @returns {Promise<Object>} Promise that resolves to an object with user geolocation data.
 */
async function fetchUserGeo() {
  const response = await fetch(GEO_JS_API_URL)
  return await response.json()
}

/*
 * ----------------------------------------------------------------
 * Exports
 * ----------------------------------------------------------------
 */
export { fetchUserGeo }
