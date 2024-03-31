import { m as n, c as l, a as r, b as s, d as c, e as m, f as d, g as h, h as f } from "./bc-shared-1bUUMsGq.js";
function V(e) {
  n.store("aduCalculatorViewModel", {
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
      const u = "en-US";
      let i = t;
      return i = i.replace(/\D/g, ""), i = new Intl.NumberFormat(u, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(i), i = i !== "0" ? i : "", i;
    },
    calculateResult: function() {
      const t = this.convertFieldValueToNumber(this.homeValue), u = this.convertFieldValueToNumber(this.homeSize), i = this.convertFieldValueToNumber(this.aduCost), o = this.convertFieldValueToNumber(this.aduSize);
      if (!t || !u || !o)
        return "--";
      let a = t / u * o - i - 5e4;
      return a = a < 1e4 ? 1e4 : Math.ceil(a / 1e4) * 1e4, a = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(a), a;
    },
    convertFieldValueToNumber: function(t) {
      return Number(t.replace(/[^0-9.-]+/g, ""));
    }
  }), e.aduCalculatorViewModel = n.store("aduCalculatorViewModel");
}
window.Alpine = n;
const w = {};
p(w);
n.start();
function p(e) {
  F(e), M(e), I(e);
}
function F(e) {
  l(e), r(e), s(e), c(e), m(e), V(e);
}
function M(e) {
  d(e), h(e);
}
function I(e) {
  f(e);
}
