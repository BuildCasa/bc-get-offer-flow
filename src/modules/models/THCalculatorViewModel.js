/*
 * ----------------------------------------------------------------
 * Functions
 * ----------------------------------------------------------------
 */
function createTHCalculatorViewModel() {
  return {
    purchasePrice: null,

    init: function () {
      this.purchasePrice = 1000000
    },

    get formattedPurchasePrice() {
      return getFormattedCurrencyValue(this.purchasePrice)
    },

    get cashBack() {
      return Math.round(this.purchasePrice * 0.03 - 8000)
    },

    get formattedCashBack() {
      return getFormattedCurrencyValue(this.cashBack)
    },
  }
}

function getFormattedCurrencyValue(value) {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  })
  return formatter.format(value)
}

/*
 * ----------------------------------------------------------------
 * Exports
 * ----------------------------------------------------------------
 */
export { createTHCalculatorViewModel }
