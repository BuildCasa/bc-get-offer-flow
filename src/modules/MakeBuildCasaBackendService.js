/*
 * ----------------------------------------------------------------
 * Functions
 * ----------------------------------------------------------------
 */

/**
 * Given a payload with the parcel `apn` and `jurisdiction`, submits request to our Make.com Get Estimate endpoint
 * Endpoint is integrated with our Airtable offer database to look up and return estimate values, and jurisdiction status
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
