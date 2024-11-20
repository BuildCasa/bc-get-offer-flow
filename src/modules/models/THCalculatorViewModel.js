/*
 * ----------------------------------------------------------------
 * Functions
 * ----------------------------------------------------------------
 */
function createTHCalculatorViewModel(personalizationViewModel) {
  return {
    purchasePrice: null,
    commissionRate: 0.025,

    init: function () {
      this.purchasePrice = personalizationViewModel.getContent(
        'calcDefaultPurchasePrice',
      )
    },

    /**
     * Computed property that returns the value of the calcDefaultPurchasePrice key in the personalizationViewModel
     *
     * Add Alpine attribute to calc slider input element to update input value when this changes:
     * x-init=$watch('$store.thCalculatorViewModel.defaultPurchasePrice', (newVal, oldVal) => $store.thCalculatorViewModel.purchasePrice = newVal)
     *
     * @type {number}
     */
    get defaultPurchasePrice() {
      return personalizationViewModel.getContent('calcDefaultPurchasePrice')
    },

    /**
     * Computed property that returns the value of the calcMaxPurchasePrice key in the personalizationViewModel
     *
     * Add Alpine attribute to calc slider input element to set max value of input element:
     * x-bind:max=$store.thCalculatorViewModel.maxPurchasePrice
     *
     * @type {number}
     */
    get maxPurchasePrice() {
      return personalizationViewModel.getContent('calcMaxPurchasePrice')
    },

    /**
     * Computed property that returns the value of the calcMinPurchasePrice key in the personalizationViewModel
     *
     * Add Alpine attribute to calc slider input element to set min value of input element:
     * x-bind:min=$store.thCalculatorViewModel.minPurchasePrice
     *
     * @type {number}
     */
    get minPurchasePrice() {
      return personalizationViewModel.getContent('calcMinPurchasePrice')
    },

    /**
     * Computed property that returns the value of the calcInputStep key in the personalizationViewModel
     *
     * Add Alpine attribute to calc slider input element to set step value of input element:
     * x-bind:step=$store.thCalculatorViewModel.inputStep
     *
     * @type {number}
     */
    get inputStep() {
      return personalizationViewModel.getContent('calcInputStep')
    },

    /**
     * Computed property that returns the value of the calcFlatFee key in the personalizationViewModel
     *
     * @type {number}
     */
    get flatFee() {
      return personalizationViewModel.getContent('calcFlatFee')
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
