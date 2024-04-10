/*
 * ----------------------------------------------------------------
 * Functions
 * ----------------------------------------------------------------
 */

/**
 * Submits request to our Make.com Get Estimate endpoint with the provided address and parcel details.
 * Endpoint is integrated with our offer database to look up jurisdiction status and estimate values.
 * @param {Object} payload - Object with parcel details needed for estimate generation.
 * @returns {Promise<Object>} Promise that resolves to an object with jurisdiction status and estimate values.
 */
async function fetchEstimateResults(payload) {
  const request = new Request(
    'https://hook.us1.make.com/t9mrl5xiqcub1netw5sk7l1vjgoz3gt9',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    },
  )

  const response = await fetch(request)
  if (!response.ok) {
    throw new Error('Network response was not OK')
  }
  return await response.json()
}

/*
 * ----------------------------------------------------------------
 * Exports
 * ----------------------------------------------------------------
 */
export { fetchEstimateResults }
