/*
 * ----------------------------------------------------------------
 * Constants
 * ----------------------------------------------------------------
 */
const FETCH_ESTIMATE_API_URL =
  'https://hook.us1.make.com/t9mrl5xiqcub1netw5sk7l1vjgoz3gt9'
const CREATE_LEAD_API_URL =
  'https://hook.us1.make.com/7pyo51sq4xxjbpz14t03uomufndj45ut'

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
  const request = new Request(FETCH_ESTIMATE_API_URL, {
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
  return await response.json()
}

/**
 * Submits request to our Make.com Create Lead endpoint with the provided contact info.
 * Endpoint is integrated with our Hubspot account to create/update Contacts in that system.
 * @param {Object} payload - Object with contact info fields needed to create lead.
 * @returns {Promise<Object>} Promise that resolves with succesful submission.
 */
async function createLead(payload) {
  const request = new Request(CREATE_LEAD_API_URL, {
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
}

/*
 * ----------------------------------------------------------------
 * Exports
 * ----------------------------------------------------------------
 */
export { fetchEstimateResults, createLead }
