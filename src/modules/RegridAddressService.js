/*
 * ----------------------------------------------------------------
 * Functions
 * ----------------------------------------------------------------
 */

/**
 * Given query (provided by user through address typeahead input), returns matching addresses
 * Fetches matches from Regrid Typeahead API, filters results, and returns them
 */
async function fetchAddressMatches(query) {
  // Prepare request to the Regrid Typeahead API
  const url = 'https://app.regrid.com/api/v1/typeahead.json'
  const token =
    '1SnpL7AQekjA4mH2vqUmkGm9AAfQxi_6mxwdm4qDzo_C-xSTx9z3pd9rTsRWDWV4'

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
 * Given Regrid Typeahead API response data,
 * Filters matches to only include those with a `ll_uuid`, `address`, and 'short' form address (Regrid can return dupes)
 * Sorts matches by whether or not they are in a supported market, then by score
 * And returns only the first 10 matches
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
 * Given two Regrid Typeahead API matches, compares them to determine which is in a supported market
 * Returns -1, 1, or 0 to be used in an array sort
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
 * Given a Regrid Typeahead API match, returns true if it is in a supported market
 * Currently, only markets in California are supported
 */
function isInMarketMatch(match) {
  return match.context.endsWith('CA')
}

/**
 * Given two Regrid Typeahead API matches, compares them to determine which has a higher score
 * Returns -1, 1, or 0 to be used in an array sort
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
 * Given id (`ll_uuid` provided for every match via Redrid typeahead API), returns parcel details needed for estimate generation
 * Fetches full details from Regrid Parcel API, filters and formays results to only fields we need, and returns the object
 */
async function fetchParcelDetails(id) {
  const parcelLookupUrl = 'https://app.regrid.com/api/v1/parcel/'
  const parcelLookupToken =
    '1SnpL7AQekjA4mH2vqUmkGm9AAfQxi_6mxwdm4qDzo_C-xSTx9z3pd9rTsRWDWV4'
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
 * Maps and returns an object with only the fields needed for our flow, provided by the Regrid Parcel API request
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
