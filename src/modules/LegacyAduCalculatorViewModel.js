/*
 * ----------------------------------------------------------------
 * Imports
 * ----------------------------------------------------------------
 */
import Alpine from 'alpinejs'

function createAduCalculatorViewModel(globalStore) {
  Alpine.store('aduCalculatorViewModel', {
    homeValue: null,
    homeSize: null,
    aduCost: null,
    aduSize: null,
    result: null,
    init: function () {
      this.homeValue = this.formatInput('1000000')
      this.homeSize = this.formatInput('2000')
      this.aduCost = this.formatInput('250000')
      this.aduSize = this.formatInput('800')
      this.result = this.calculateResult()
    },
    handleInput: function (e) {
      e.target.value = this.formatInput(e.target.value)
      this.result = this.calculateResult()
    },
    handleSubmit: function (e) {
      e.preventDefault()
    },
    formatInput: function (inputValue) {
      const locale = 'en-US'
      let value = inputValue

      value = value.replace(/\D/g, '')

      value = new Intl.NumberFormat(locale, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(value)

      value = value !== '0' ? value : ''

      return value
    },
    calculateResult: function () {
      const homeValue = this.convertFieldValueToNumber(this.homeValue)
      const homeSize = this.convertFieldValueToNumber(this.homeSize)
      const aduCost = this.convertFieldValueToNumber(this.aduCost)
      const aduSize = this.convertFieldValueToNumber(this.aduSize)

      if (!homeValue || !homeSize || !aduSize) return '--'

      let result = (homeValue / homeSize) * aduSize - aduCost - 50000

      result = result < 10000 ? 10000 : Math.ceil(result / 10000) * 10000

      result = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(result)

      return result
    },
    convertFieldValueToNumber: function (fieldValue) {
      return Number(fieldValue.replace(/[^0-9.-]+/g, ''))
    },
  })

  // Add a reference to the new aduCalculatorViewModel Alpine store to the global store
  globalStore.aduCalculatorViewModel = Alpine.store('aduCalculatorViewModel')
}

/*
 * ----------------------------------------------------------------
 * Exports
 * ----------------------------------------------------------------
 */
export { createAduCalculatorViewModel }
