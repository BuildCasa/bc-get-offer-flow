/*
 * ----------------------------------------------------------------
 * Constants
 * ----------------------------------------------------------------
 */
const BC_FETCH_ESTIMATE_API_URL =
  'https://hook.us1.make.com/t9mrl5xiqcub1netw5sk7l1vjgoz3gt9'
const BC_CREATE_LEAD_API_URL =
  'https://hook.us1.make.com/7pyo51sq4xxjbpz14t03uomufndj45ut'
const TH_CREATE_LEAD_API_URL =
  'https://hook.us1.make.com/7v5cthrabpbte91f7cijshu2n3jttp43'

/*
 * ----------------------------------------------------------------
 * Functions
 * ----------------------------------------------------------------
 */

/**
 * Submits request to our Make.com BuildCasa - Get Estimate endpoint with the provided address and parcel details.
 * Endpoint is integrated with our offer database to look up jurisdiction status and estimate values.
 * @param {Object} payload - Object with parcel details needed for estimate generation.
 * @returns {Promise<Object>} Promise that resolves to an object with jurisdiction status and estimate values.
 */
async function bcFetchEstimateResults(payload) {
  return await sendMakeRequest(BC_FETCH_ESTIMATE_API_URL, payload, true)
}

/**
 * Submits request to our Make.com BuildCasa - Create Lead endpoint with the provided contact info.
 * Endpoint is integrated with our Hubspot account to create/update Contacts in that system.
 * @param {Object} payload - Object with contact info fields needed to create lead.
 * @returns {Promise<void>} Promise that resolves with succesful submission.
 */
async function bcCreateLead(payload) {
  await sendMakeRequest(BC_CREATE_LEAD_API_URL, payload, false)
}

/**
 * Submits request to our Make.com TurboHome - Create Lead endpoint with the provided contact info.
 * Endpoint is integrated with our Hubspot account to create/update Contacts in that system.
 * @param {Object} payload - Object with contact info fields needed to create lead.
 * @returns {Promise<void>} Promise that resolves with succesful submission.
 */
async function thCreateLead(payload) {
  await sendMakeRequest(TH_CREATE_LEAD_API_URL, payload, false)
}

/**
 * Submits request to any of our Make.com webhook endpoints with a JSON payload.
 * @param {string} url - The URL of the Make.com webhook endpoint.
 * @param {Object} payload - Object with contact info fields needed to create lead.
 * @param {boolean} returnResponse - Whether to return the response object (based on Make.com scenario behavior).
 * @returns {Promise<void | Object>} Promise that resolves with succesful submission or response object.
 */
async function sendMakeRequest(url, payload, returnResponse = false) {
  const request = new Request(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  const response = await fetch(request)

  if (!response.ok) {
    throw new Error('Network response was not OK')
  }

  if (returnResponse) {
    return await response.json()
  }
}

/*
 * ----------------------------------------------------------------
 * Exports
 * ----------------------------------------------------------------
 */
export { bcFetchEstimateResults, bcCreateLead, thCreateLead }
