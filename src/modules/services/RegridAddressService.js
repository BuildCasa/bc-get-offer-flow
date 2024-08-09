/*
 * ----------------------------------------------------------------
 * Constants
 * ----------------------------------------------------------------
 */
const REGRID_TYPEAHEAD_API_URL = 'https://app.regrid.com/api/v1/typeahead.json'
const REGRID_PARCEL_API_URL = 'https://app.regrid.com/api/v1/parcel/'
const REGRID_API_TOKEN =
  'eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJyZWdyaWQuY29tIiwiaWF0IjoxNzIyNDQyMTU0LCJnIjo1NDA4OSwidCI6MSwiY2FwIjoicGE6dHkiLCJ0aSI6ODJ9.7c30coXkbffieawauRttlK0mC_uBhrzWdNPLtRCzXA8'

/*
 * ----------------------------------------------------------------
 * Functions
 * ----------------------------------------------------------------
 */

/**
 * Returns matching addresses from the Regrid Typeahead API for an address query.
 * Filters and sorts the matches by supported markets and Regrid match scores. Returns only the top 10.
 * @param {string} query - Address query string (from typeahead input).
 * @returns {Object[]} Array of matching addresses.
 */
async function fetchAddressMatches(query) {
  // Prepare request to the Regrid Typeahead API
  const url = REGRID_TYPEAHEAD_API_URL
  const token = REGRID_API_TOKEN

  const request = new Request(`${url}/?token=${token}&query=${query}`, {
    method: 'GET',
  })

  // Fetch and filter matches
  const response = await fetch(request)
  if (!response.ok) {
    throw new Error('Network response was not OK')
  }
  const responseData = await response.json()
  return filterSortAndSliceAddressMatches(responseData)
}

/**
 * Filters matches to only include those with a `ll_uuid`, `address`, and 'short' form address (Regrid can return dupes).
 * Sorts matches by whether or not they are in a supported market, then by Regrid match score. Returns only the top 10.
 * @param {Object[]} regridTypeaheadResponseData - Array of unfiltered addresses from the Regrid Typeahead API.
 * @returns {Object[]} Array of filtered and sorted matching addresses.
 */
function filterSortAndSliceAddressMatches(regridTypeaheadResponseData) {
  // Filter and sort matches
  const filteredAndSortedMatches = regridTypeaheadResponseData
    .filter((match) => {
      return (
        match.ll_uuid && match.address && match.address.match(/^[0-9].*[^0-9]$/)
      )
    })
    .sort((a, b) => {
      const marketComparison = compareMatchesInMarket(a, b)
      if (marketComparison != 0) {
        return marketComparison
      } else {
        return compareMatchesScores(a, b)
      }
    })

  // Slice matches to only include first 10
  const slicedMatches = filteredAndSortedMatches.slice(0, 10)

  return slicedMatches
}

/**
 * Compares two Regrid addresses. Determines if either is in a supported market, and should be sorted first.
 * @param {Object} a - First Regrid Typeahead API address.
 * @param {Object} b - Second Regrid Typeahead API address.
 * @returns {number} -1, 1, or 0 to be used in an array sort.
 */
function compareMatchesInMarket(a, b) {
  if (isInMarketMatch(a) && !isInMarketMatch(b)) {
    return -1
  } else if (!isInMarketMatch(a) && isInMarketMatch(b)) {
    return 1
  } else {
    return 0
  }
}

/**
 * Returns whether or not a Regrid address is in a supported market.
 * Currently, only markets in California are supported.
 * @param {Object} match - Regrid Typeahead API address.
 * @returns {boolean} Whether or not the address is in a supported market.
 */
function isInMarketMatch(match) {
  return match.context.endsWith('CA')
}

/**
 * Compares two Regrid addresses. Determines which has a higher Regrid match score, and should be sorted first.
 * @param {Object} a - First Regrid Typeahead API address.
 * @param {Object} b - Second Regrid Typeahead API address.
 * @returns {number} -1, 1, or 0 to be used in an array sort.
 */
function compareMatchesScores(a, b) {
  if (a.score > b.score) {
    return -1
  } else if (a.score < b.score) {
    return 1
  } else {
    return 0
  }
}

/**
 * Looks up a Regrid Typeahead address, and returns parcel details needed to generate an estimate.
 * Fetches full details from Regrid Parcel API, filters and formats results to fields we use.
 * @param {string} id - Regrid `ll_uuid` of the selected address match.
 * @returns {Object} Object with parcel details needed for estimate generation.
 */
async function fetchParcelDetails(id) {
  const parcelLookupUrl = REGRID_PARCEL_API_URL
  const parcelLookupToken = REGRID_API_TOKEN
  const parcelLookupRequest = new Request(
    `${parcelLookupUrl}${id}.json?token=${parcelLookupToken}&return_custom=false`,
    {
      method: 'GET',
    },
  )

  const response = await fetch(parcelLookupRequest)
  if (!response.ok) {
    throw new Error('Network response was not OK')
  }
  const responseData = await response.json()
  return filterParcelDetails(responseData)
}

/**
 * Processes a Regrid Parcel API response, and returns only parcel details needed to generate an estimate.
 * @param {Object} id - Unprocessed Regrid Parcel API response data for an address.
 * @returns {Object} Object with parcel details needed for estimate generation.
 */
function filterParcelDetails(regridParcelResponseData) {
  const regridResultFields =
    regridParcelResponseData.results[0].properties.fields

  return {
    apn: regridResultFields.parcelnumb,
    jurisdiction: regridResultFields.county,
    zip: regridResultFields.szip,
  }
}

/*
 * ----------------------------------------------------------------
 * Exports
 * ----------------------------------------------------------------
 */
export { fetchAddressMatches, fetchParcelDetails }
