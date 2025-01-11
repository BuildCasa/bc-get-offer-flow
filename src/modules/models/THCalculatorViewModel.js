/*
 * ----------------------------------------------------------------
 * Constants
 * ----------------------------------------------------------------
 */
const COMMISSION_RATE = 0.025
const FALLBACK_DEFAULT_LIST_PRICE = 1000000
const FALLBACK_MAX_LIST_PRICE = 5000000
const FALLBACK_MIN_LIST_PRICE = 600000
const FALLBACK_INPUT_STEP = 50000

/*
 * ----------------------------------------------------------------
 * Functions
 * ----------------------------------------------------------------
 */
function createTHCalculatorViewModel(personalizationViewModel = {}) {
  return {
    listPrice: null,
    commissionRate: COMMISSION_RATE,

    init: function () {
      this.listPrice =
        personalizationViewModel.getContent('calcDefaultListPrice') ||
        FALLBACK_DEFAULT_LIST_PRICE
    },

    /**
     * Computed property that returns the value of the calcDefaultlistPrice key in the personalizationViewModel
     *
     * Add Alpine attribute to calc slider input element to update input value when this changes:
     * x-init=$watch('$store.thCalculatorViewModel.defaultlistPrice', (newVal, oldVal) => $store.thCalculatorViewModel.listPrice = newVal)
     *
     * @type {number}
     */
    get defaultListPrice() {
      return (
        personalizationViewModel.getContent('calcDefaultListPrice') ||
        FALLBACK_DEFAULT_LIST_PRICE
      )
    },

    /**
     * Computed property that returns the value of the calcMaxlistPrice key in the personalizationViewModel
     *
     * Add Alpine attribute to calc slider input element to set max value of input element:
     * x-bind:max=$store.thCalculatorViewModel.maxlistPrice
     *
     * @type {number}
     */
    get maxListPrice() {
      return (
        personalizationViewModel.getContent('calcMaxListPrice') ||
        FALLBACK_MAX_LIST_PRICE
      )
    },

    /**
     * Computed property that returns the value of the calcMinlistPrice key in the personalizationViewModel
     *
     * Add Alpine attribute to calc slider input element to set min value of input element:
     * x-bind:min=$store.thCalculatorViewModel.minlistPrice
     *
     * @type {number}
     */
    get minListPrice() {
      return (
        personalizationViewModel.getContent('calcMinListPrice') ||
        FALLBACK_MIN_LIST_PRICE
      )
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
      return (
        personalizationViewModel.getContent('calcInputStep') ||
        FALLBACK_INPUT_STEP
      )
    },

    get formattedListPrice() {
      return getFormattedCurrencyValue(this.listPrice)
    },

    get turboHomeFee() {
      if (this.listPrice <= 1000000) return 5000
      if (this.listPrice <= 2000000) return 10000
      return 15000
    },

    get cashBack() {
      return Math.round(
        this.listPrice * this.commissionRate - this.turboHomeFee,
      )
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
