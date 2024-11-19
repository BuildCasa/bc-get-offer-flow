/*
 * ----------------------------------------------------------------
 * Functions
 * ----------------------------------------------------------------
 */
function createTHCalculatorViewModel(personalizationViewModel) {
  return {
    purchasePrice: null,
    maxPurchasePrice: null,
    minPurchasePrice: null,
    inputStep: null,
    commissionRate: 0.025,
    flatFee: null,

    init: function () {
      this.purchasePrice = personalizationViewModel.getContent(
        'calcDefaultPurchasePrice',
      )
      this.maxPurchasePrice = personalizationViewModel.getContent(
        'calcMaxPurchasePrice',
      )
      this.minPurchasePrice = personalizationViewModel.getContent(
        'calcMinPurchasePrice',
      )
      this.inputStep = personalizationViewModel.getContent('calcInputStep')
      this.flatFee = personalizationViewModel.getContent('calcFlatFee')
    },

    get formattedPurchasePrice() {
      return getFormattedCurrencyValue(this.purchasePrice)
    },

    get cashBack() {
      return Math.round(this.purchasePrice * this.commissionRate - this.flatFee)
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
