/*
 * ----------------------------------------------------------------
 * Imports
 * ----------------------------------------------------------------
 */
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
function createPersonalizationViewModel(personalizationData) {
  return {
    personalizationData: {},
    userGeo: {},
    getContent(key) {
      // If no key is provided, early return an empty string
      if (!key) return ''

      // If the key exists in the market content configuration or the default content configuration, return that value
      // Otherwise, return an empty string
      return (
        this.marketContentConfig[key] ?? this.defaultContentConfig[key] ?? ''
      )
    },
    get market() {
      const city = this.userGeo.city

      // If there is no city in the userGeo data, early return null
      if (!city || typeof city !== 'string') return null

      // Iterate over the markets (excluding DEFAULT) configured in the personalization data
      for (const marketKey of Object.keys(this.personalizationData).filter(
        (key) => key !== 'DEFAULT',
      )) {
        // If the user's city is in the list of cities for the current market, return that market key
        if (
          this.personalizationData[marketKey].cities.filter(
            (c) => c.toLowerCase().trim() === city.toLowerCase().trim(),
          ).length > 0
        ) {
          console.log('Market:', marketKey)
          return marketKey
        }
      }

      // If no market is found for the user's city, return null
      return null
    },
    get marketContentConfig() {
      // Fallback to an empty object for the market content configuration
      let marketContentConfig = {}

      // If there is a market for the user's city, and a content configuration for that market in the personalization data,
      // use that market-specific content configuration
      if (
        this.market &&
        this.personalizationData[this.market] &&
        this.personalizationData[this.market].content
      ) {
        marketContentConfig = this.personalizationData[this.market].content
      }

      return marketContentConfig
    },
    get defaultContentConfig() {
      // Fallback to an empty object for the default content configuration
      let defaultContentConfig = {}

      // If there is a default content configuration in the personalization data, use that default content configuration
      if (
        this.personalizationData.DEFAULT &&
        this.personalizationData.DEFAULT.content
      ) {
        defaultContentConfig = this.personalizationData.DEFAULT.content
      }

      return defaultContentConfig
    },
    async init() {
      this.personalizationData = personalizationData
      this.userGeo = await fetchUserGeo()

      console.log('City:', this.userGeo.city)
    },
  }
}

/*
 * ----------------------------------------------------------------
 * Exports
 * ----------------------------------------------------------------
 */
export { createPersonalizationViewModel }
