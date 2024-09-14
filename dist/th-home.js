import { m as n, c as m, a as u, b as S } from "./shared-RMpFEyWF.js";
function f() {
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
      getStartedComplete: {
        transitions: {
          GET_STARTED: {
            target: "modalGetStartedComplete"
          },
          GET_DEMO: {
            target: "modalGetDemoForm"
          }
        }
      },
      modalGetStartedForm: {
        transitions: {
          EXIT: {
            target: "default"
          }
        }
      },
      modalGetStartedComplete: {
        transitions: {
          EXIT: {
            target: "getStartedComplete"
          }
        }
      },
      modalGetDemoForm: {
        transitions: {
          EXIT: {
            target: "default"
          }
        }
      }
    }
  };
}
function w(t, e) {
  return {
    modal: {
      get isOpen() {
        return t.flowState.value == "modalGetStartedForm" || t.flowState.value == "modalGetStartedComplete" || t.flowState.value == "modalGetDemoForm";
      },
      handleModalFlowStart(r = "GET_STARTED", l = null) {
        t.flowState.transition(r);
        const s = {
          GET_STARTED: "Get Started Clicked",
          GET_DEMO: "Get Demo Clicked"
        }[r];
        let i = {};
        l && (i = {
          cta_str: l
        }), s && e.track(s, i);
      },
      handleModalClose() {
        t.flowState.transition("EXIT"), e.track("Modal Closed");
      }
    }
  };
}
function h() {
  return {
    purchasePrice: null,
    init: function() {
      this.purchasePrice = 1e6;
    },
    get formattedPurchasePrice() {
      return c(this.purchasePrice);
    },
    get cashBack() {
      return Math.round(this.purchasePrice * 0.03 - 5e3);
    },
    get formattedCashBack() {
      return c(this.cashBack);
    }
  };
}
function c(t) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  }).format(t);
}
window.Alpine = n;
const o = u(n), a = {}, d = S(window.FS, a);
E();
n.start();
function E() {
  const e = new URL(window.location.href).searchParams.get("get_started"), r = e && e === "complete" ? "modalGetStartedComplete" : "default";
  a.flowState = o.createStore(
    "flowState",
    m(
      f(),
      d,
      r
    )
  ), a.flowUIHelpers = o.createStore(
    "flowUIHelpers",
    w(a, d)
  ), console.log("Flow State:", a.flowState.value), a.thCalculatorViewModel = o.createStore(
    "thCalculatorViewModel",
    h()
  );
}
