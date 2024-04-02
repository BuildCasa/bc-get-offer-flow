import { m as l, c as u, a as s, b as c, d as m, e as d, f as h, g as S, h as w, i as V } from "./bc-shared-JSbguHMz.js";
function f() {
  return {
    homeValue: null,
    homeSize: null,
    aduCost: null,
    aduSize: null,
    result: null,
    init: function() {
      this.homeValue = this.formatInput("1000000"), this.homeSize = this.formatInput("2000"), this.aduCost = this.formatInput("250000"), this.aduSize = this.formatInput("800"), this.result = this.calculateResult();
    },
    handleInput: function(t) {
      t.target.value = this.formatInput(t.target.value), this.result = this.calculateResult();
    },
    handleSubmit: function(t) {
      t.preventDefault();
    },
    formatInput: function(t) {
      const r = "en-US";
      let a = t;
      return a = a.replace(/\D/g, ""), a = new Intl.NumberFormat(r, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(a), a = a !== "0" ? a : "", a;
    },
    calculateResult: function() {
      const t = this.convertFieldValueToNumber(this.homeValue), r = this.convertFieldValueToNumber(this.homeSize), a = this.convertFieldValueToNumber(this.aduCost), n = this.convertFieldValueToNumber(this.aduSize);
      if (!t || !r || !n)
        return "--";
      let i = t / r * n - a - 5e4;
      return i = i < 1e4 ? 1e4 : Math.ceil(i / 1e4) * 1e4, i = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(i), i;
    },
    convertFieldValueToNumber: function(t) {
      return Number(t.replace(/[^0-9.-]+/g, ""));
    }
  };
}
window.Alpine = l;
const o = V(l), e = {};
M();
l.start();
function M() {
  e.addressViewModel = o.createStore(
    "addressViewModel",
    u(e)
  ), e.contactViewModel = o.createStore(
    "contactViewModel",
    s(e)
  ), e.estimateViewModel = o.createStore(
    "estimateViewModel",
    c(e)
  ), e.personalizationViewModel = o.createStore(
    "personalizationViewModel",
    m()
  ), e.experimentationViewModel = o.createStore(
    "experimentationViewModel",
    d()
  ), e.aduCalculatorViewModel = o.createStore(
    "aduCalculatorViewModel",
    f()
  ), e.flowStateMachine = o.createStore(
    "flowStateMachine",
    h(e)
  ), e.flowState = o.createStore(
    "flowState",
    S(e)
  ), e.modalHelpers = o.createStore(
    "modalHelpers",
    w(e)
  );
}
