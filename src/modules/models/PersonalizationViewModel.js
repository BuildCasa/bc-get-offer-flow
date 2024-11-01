/*
 * ----------------------------------------------------------------
 * Imports
 * ----------------------------------------------------------------
 */
import marketCities from '../../data/market-cities.json'
import { fetchUserGeo } from '../services/GeoJSGeolocationService'

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
function createPersonalizationViewModel() {
  return {
    userGeo: {},
    marketsData: {},
    get market() {
      return getMarketForCity(this.userGeo.city, this.marketsData)
    },
    async init() {
      this.marketsData = marketCities

      this.userGeo = await fetchUserGeo()
    },
  }
}

/**
 * Given a city and marketsData definition object, returns a matching BuildCasa 'market', if found
 */
function getMarketForCity(city, marketsData) {
  if (!city || typeof city !== 'string') return null

  for (const marketKey of Object.keys(marketsData)) {
    if (
      marketsData[marketKey].cities.filter(
        (c) => c.toLowerCase().trim() === city.toLowerCase().trim(),
      ).length > 0
    ) {
      return marketKey
    }
  }

  return null
}

/*
 * ----------------------------------------------------------------
 * Exports
 * ----------------------------------------------------------------
 */
export { createPersonalizationViewModel }
