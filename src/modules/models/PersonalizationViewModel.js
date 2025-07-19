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
    loading: true,
    personalizationData: {},
    userGeo: {},
    getContent(key) {
      // If loading, early return an empty string
      if (this.loading) return ''

      // If no key is provided, early return an empty string
      if (!key) return ''

      // If the key exists in the market content configuration or the default content configuration, return that value
      // Otherwise, return an empty string
      return (
        this.marketContentConfig[key] ?? this.defaultContentConfig[key] ?? ''
      )
    },
    get market() {
      // If loading, early return null
      if (this.loading) return null

      const { region: state, city } = this.userGeo

      // If there is no region or city in the userGeo data, early return null
      if (
        !state ||
        typeof state !== 'string' ||
        !city ||
        typeof city !== 'string'
      ) {
        return null
      }

      // Iterate over the markets (excluding DEFAULT) configured in the personalization data
      for (const marketKey of Object.keys(this.personalizationData).filter(
        (key) => key !== 'DEFAULT',
      )) {
        const marketData = this.personalizationData[marketKey]

        // If the user's state matches the state for the current market
        if (
          marketData.state.toLowerCase().trim() === state.toLowerCase().trim()
        ) {
          // If the market definition does not include cities, return the market key
          if (!marketData.cities) {
            return marketKey
          }

          // If the market definition includes cities, and the user's city matches one of the cities in the market definition, return the market key
          // If the user's city is in the list of cities for the current market, return the market key
          if (
            marketData.cities.filter(
              (c) => c.toLowerCase().trim() === city.toLowerCase().trim(),
            ).length > 0
          ) {
            return marketKey
          }
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
      this.loading = true
      this.personalizationData = personalizationData

      try {
        // Fetch user geolocation data
        this.userGeo = await fetchUserGeo()
      } catch (error) {
        console.error('Error fetching user geolocation:', error)
        this.userGeo = {}
      }

      this.loading = false
    },
  }
}

/*
 * ----------------------------------------------------------------
 * Exports
 * ----------------------------------------------------------------
 */
export { createPersonalizationViewModel }
