/*
 * ----------------------------------------------------------------
 * Functions
 * ----------------------------------------------------------------
 */

/**
 * Given a string, parses and formats it as a US phone number, and returns the formatted string
 */
function formatPhoneNumber(input) {
  // Remove non-numeric characters
  const numericValue = input.replace(/\D/g, '')

  // Check if it starts with the valid US country code (1)
  const startsWithUSCountryCode = numericValue.startsWith('1')

  // If it starts with the US country code, create a new numeric value without it
  const numericValueWithoutCountryCode = startsWithUSCountryCode
    ? numericValue.slice(1)
    : numericValue

  // If the number is too long, truncate it to 10 digits
  const numericValueWithoutCountryCodeTruncated =
    numericValueWithoutCountryCode.slice(0, 10)

  // Format the remaining numberic digits
  const phoneNumberSegments = numericValueWithoutCountryCodeTruncated.match(
    /^(\d{0,3})(\d{0,3})(\d{0,4})$/,
  )

  // Create formatted segments, with appropriate separators
  const formattedCountryCodeSegment = !startsWithUSCountryCode ? '' : '1'
  const formattedAreaCodeSegment = !phoneNumberSegments[1]
    ? ''
    : (!startsWithUSCountryCode ? '' : ' ') + ('(' + phoneNumberSegments[1])
  const formattedOfficCodeSegment = !phoneNumberSegments[2]
    ? ''
    : ') ' + phoneNumberSegments[2]
  const formattedLineNumberSegment = !phoneNumberSegments[3]
    ? ''
    : '-' + phoneNumberSegments[3]

  // Combine the formatted segments into a full phone number, and return it
  const formattedFullPhoneNumber =
    formattedCountryCodeSegment +
    formattedAreaCodeSegment +
    formattedOfficCodeSegment +
    formattedLineNumberSegment
  return formattedFullPhoneNumber
}

/**
 * Given a string input, returns true if it is a valid phone number
 * Supports US phone numbers, with or without country code, and with or without separators
 *
 */
function validatePhoneNumber(input) {
  const phoneRegex =
    /^\+?1?\s?(\()?\d{3}(\))?[-.\s]?\d{3}[-.\s]?\d{4}$|^\d{10}$/
  return phoneRegex.test(input)
}

/*
 * ----------------------------------------------------------------
 * Exports
 * ----------------------------------------------------------------
 */
export { formatPhoneNumber, validatePhoneNumber }
