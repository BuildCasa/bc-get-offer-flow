import { m as o, c as d, a as m, b as f } from "./shared-RMpFEyWF.js";
function S() {
  const t = {
    EXIT: {
      target: "default"
    }
  };
  return {
    defaultState: "default",
    states: {
      default: {
        transitions: {
          GET_STARTED: {
            target: "modalGetStartedForm"
          },
          GET_DEMO: {
            target: "modalGetDemoForm"
          }
        }
      },
      modalGetStartedForm: {
        transitions: {
          ...t
        }
      },
      modalGetDemoForm: {
        transitions: {
          ...t
        }
      }
    }
  };
}
function h(t, r) {
  return {
    modal: {
      get isOpen() {
        return t.flowState.value == "modalGetStartedForm" || t.flowState.value == "modalGetDemoForm";
      },
      handleModalFlowStart(n = "GET_STARTED", i = null) {
        t.flowState.transition(n);
        const c = {
          GET_STARTED: "Get Started Clicked",
          GET_DEMO: "Get Demo Clicked"
        }[n];
        let s = {};
        i && (s = {
          cta_str: i
        }), c && r.track(c, s);
      },
      handleModalClose() {
        t.flowState.transition("EXIT"), r.track("Modal Closed");
      }
    }
  };
}
function w() {
  return {
    purchasePrice: null,
    init: function() {
      this.purchasePrice = 1e6;
    },
    get formattedPurchasePrice() {
      return l(this.purchasePrice);
    },
    get cashBack() {
      return Math.round(this.purchasePrice * 0.03 - 5e3);
    },
    get formattedCashBack() {
      return l(this.cashBack);
    }
  };
}
function l(t) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  }).format(t);
}
window.Alpine = o;
const a = m(o), e = {}, u = f(window.FS, e);
F();
o.start();
function F() {
  e.flowState = a.createStore(
    "flowState",
    d(S(), u)
  ), e.flowUIHelpers = a.createStore(
    "flowUIHelpers",
    h(e, u)
  ), e.thCalculatorViewModel = a.createStore(
    "thCalculatorViewModel",
    w()
  );
}
