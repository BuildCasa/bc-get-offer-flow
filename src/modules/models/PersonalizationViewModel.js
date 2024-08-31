/*
 * ----------------------------------------------------------------
 * Imports
 * ----------------------------------------------------------------
 */
import bcMarketsData from '../../data/BCMarketsData.json'
import { fetchUserGeo } from '../services/GeoJSGeolocationService'

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
    get bcPhoneNumber() {
      return getBcPhoneNumberForCity(this.userGeo.city, this.marketsData)
    },
    get bcPhoneNumberHref() {
      return `tel:+1${this.bcPhoneNumber.replace(/\D/g, '')}`
    },
    async init() {
      this.marketsData = bcMarketsData

      this.userGeo = await fetchUserGeo()
    },
  }
}

/**
 * Given a city and marketsData definition object, returns the appropriate BuildCasa phone number to display
 * Ideally, localized to the market, but defaults to a generic number if no market match
 */
function getBcPhoneNumberForCity(city, marketsData) {
  const defaultPhoneNumber = '(415) 941-5861'

  if (!city || typeof city !== 'string') return defaultPhoneNumber

  const market = getMarketForCity(city, marketsData)
  const marketSpecificPhoneNumber = getBcPhoneNumberForMarket(
    market,
    marketsData,
  )

  return marketSpecificPhoneNumber ?? defaultPhoneNumber
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

/**
 * Given a 'market' and marketsData definition object, returns a location-specific BuildCasa phone number to display, if found
 */
function getBcPhoneNumberForMarket(market, marketsData) {
  if (!market || typeof market !== 'string') return null

  for (const marketKey of Object.keys(marketsData)) {
    if (marketKey.toLowerCase().trim() === market.toLowerCase().trim()) {
      return marketsData[marketKey].bcPhoneNumber ?? null
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
