/*
 * ----------------------------------------------------------------
 * Imports
 * ----------------------------------------------------------------
 */
import { Loader } from '@googlemaps/js-api-loader'

/*
 * ----------------------------------------------------------------
 * Constants
 * ----------------------------------------------------------------
 */
const GOOGLE_MAPS_API_KEY = 'AIzaSyCOAucx7oi5vgR0w5CUfLj6G67YZINBSMc'

/*
 * ----------------------------------------------------------------
 * Initialization Procedure
 * ----------------------------------------------------------------
 */

// Create the Google Maps API loader
const googleMapsAPILoader = new Loader({
  apiKey: GOOGLE_MAPS_API_KEY,
  version: 'weekly',
})

let AutocompleteSuggestion = null
let AutocompleteSessionToken = null

// Load the Google Maps Places library and assign variables for the Autocomplete classes

/*
 * ----------------------------------------------------------------
 * Functions
 * ----------------------------------------------------------------
 */

async function loadPlacesLibrary() {
  try {
    const placesLibrary = await googleMapsAPILoader.importLibrary('places')
    AutocompleteSuggestion = placesLibrary.AutocompleteSuggestion
    AutocompleteSessionToken = placesLibrary.AutocompleteSessionToken
  } catch (error) {
    console.error('Error loading Google Maps Places library:', error)
  }
}

function getAutocompleteSessionToken() {
  if (!AutocompleteSessionToken) return

  return new AutocompleteSessionToken()
}

async function fetchAddressSuggestions(query, token) {
  if (!AutocompleteSuggestion) return

  try {
    const { suggestions } =
      await AutocompleteSuggestion.fetchAutocompleteSuggestions({
        input: query,
        language: 'en-US',
        region: 'us',
        sessionToken: token,
        includedRegionCodes: ['us'],
        includedPrimaryTypes: ['geocode'],
      })

    return suggestions.map((suggestion) => suggestion.placePrediction)
  } catch (error) {
    console.error(
      'Error fetching Google Places Autocomplete suggestions:',
      error,
    )
    throw new Error(
      'There was an error finding your address. Please try again, or contact us for help.',
    )
  }
}

function isValidTHAddress(suggestion) {
  return (
    suggestion.addressComponents &&
    suggestion.addressComponents.some(
      (component) => component.types[0] === 'street_number',
    ) &&
    suggestion.addressComponents.some(
      (component) => component.types[0] === 'route',
    ) &&
    suggestion.addressComponents.some(
      (component) => component.types[0] === 'locality',
    ) &&
    suggestion.addressComponents.some(
      (component) => component.types[0] === 'administrative_area_level_1',
    )
  )
}

function getTHAddressSlug(suggestion) {
  let response = ''

  if (isValidTHAddress(suggestion)) {
    const addressComponents = suggestion.addressComponents.reduce(
      (acc, cur) => {
        return {
          ...acc,
          [cur.types[0]]: {
            shortText: cur.shortText,
            longText: cur.longText,
          },
        }
      },
      {},
    )

    const slugComponents = [
      addressComponents['street_number'].shortText,
      addressComponents['route'].shortText,
      addressComponents['locality'].longText,
      addressComponents['administrative_area_level_1'].shortText,
    ]

    response = slugComponents
      .join('-')
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '') // Remove invalid chars
      .replace(/\s+/g, '-') // Collapse whitespace and replace by -
      .replace(/-+/g, '-') // Collapse dashes
  }

  return response
}

/*
 * ----------------------------------------------------------------
 * Exports
 * ----------------------------------------------------------------
 */
export {
  loadPlacesLibrary,
  getAutocompleteSessionToken,
  fetchAddressSuggestions,
  isValidTHAddress,
  getTHAddressSlug,
}
