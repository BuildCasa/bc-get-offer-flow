import { m as n, c, a as s, b as m, d } from "./shared-JXB_n1Zn.js";
import { c as h, a as w, b as S, d as f, e as V, f as p } from "./shared-rrmPjL7J.js";
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
const o = m(n), e = {}, l = d(window.FS, e);
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
    h(e, l)
  ), e.addressViewModel = o.createStore(
    "addressViewModel",
    w(e, l)
  ), e.contactViewModel = o.createStore(
    "contactViewModel",
    S(e.flowState)
  ), e.estimateViewModel = o.createStore(
    "estimateViewModel",
    f(e.flowState)
  ), e.personalizationViewModel = o.createStore(
    "personalizationViewModel",
    V()
  ), e.experimentationViewModel = o.createStore(
    "experimentationViewModel",
    s()
  ), e.aduCalculatorViewModel = o.createStore(
    "aduCalculatorViewModel",
    M()
  );
}
