import { m as n, c, a as s, b as m } from "./shared-2KfH2FLj.js";
import { c as d, a as h, b as w, d as S, e as f, f as V, g as p } from "./shared-II8sz7VP.js";
function M() {
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
      const t = this.convertFieldValueToNumber(this.homeValue), r = this.convertFieldValueToNumber(this.homeSize), a = this.convertFieldValueToNumber(this.aduCost), u = this.convertFieldValueToNumber(this.aduSize);
      if (!t || !r || !u)
        return "--";
      let i = t / r * u - a - 5e4;
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
window.Alpine = n;
const o = s(n), e = {}, l = m(window.FS, e);
F();
n.start();
function F() {
  e.flowState = o.createStore(
    "flowState",
    c(
      p(e, l),
      l
    )
  ), e.flowUIHelpers = o.createStore(
    "flowUIHelpers",
    d(e, l)
  ), e.addressViewModel = o.createStore(
    "addressViewModel",
    h(e, l)
  ), e.contactViewModel = o.createStore(
    "contactViewModel",
    w(e.flowState)
  ), e.estimateViewModel = o.createStore(
    "estimateViewModel",
    S(e.flowState)
  ), e.personalizationViewModel = o.createStore(
    "personalizationViewModel",
    f()
  ), e.experimentationViewModel = o.createStore(
    "experimentationViewModel",
    V()
  ), e.aduCalculatorViewModel = o.createStore(
    "aduCalculatorViewModel",
    M()
  );
}
