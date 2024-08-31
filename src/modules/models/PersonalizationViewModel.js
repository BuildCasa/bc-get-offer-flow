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
const BC_MARKET_PHONE_NUMBERS = {
  DEFAULT: '(415) 941-5861',
  Sacramento: '(916) 619-1442',
  'Bay Area': '(415) 941-5861',
  SoCal: '(213) 322-1360',
}

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
      this.marketsData = marketCities

      this.userGeo = await fetchUserGeo()
    },
  }
}

/**
 * Given a city and marketsData definition object, returns the appropriate BuildCasa phone number to display
 * Ideally, localized to the market, but defaults to a generic number if no market match
 */
function getBcPhoneNumberForCity(city, marketsData) {
  const defaultPhoneNumber = BC_MARKET_PHONE_NUMBERS.DEFAULT

  if (!city || typeof city !== 'string') return defaultPhoneNumber

  const market = getMarketForCity(city, marketsData)
  const marketSpecificPhoneNumber = getBcPhoneNumberForMarket(market)

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
function getBcPhoneNumberForMarket(market) {
  if (!market || typeof market !== 'string') return null

  for (const marketKey of Object.keys(BC_MARKET_PHONE_NUMBERS)) {
    if (marketKey.toLowerCase().trim() === market.toLowerCase().trim()) {
      return BC_MARKET_PHONE_NUMBERS[marketKey] ?? null
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
