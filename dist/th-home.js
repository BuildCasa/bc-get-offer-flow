import { m as l, c as m, a as u, b as f } from "./shared-RMpFEyWF.js";
function S(t) {
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
          BOOK_INTRO: {
            target: "modalBookIntroForm",
            effects: {
              onTransition: [
                () => {
                  t.track("Book Intro Call Clicked");
                }
              ]
            }
          },
          EXIT: {
            target: "getStartedComplete"
          }
        }
      },
      modalBookIntroForm: {
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
      handleModalFlowStart(o = "GET_STARTED", i = null) {
        t.flowState.transition(o);
        const s = {
          GET_STARTED: "Get Started Clicked",
          GET_DEMO: "Get Demo Clicked"
        }[o];
        let c = {};
        i && (c = {
          cta_str: i
        }), s && e.track(s, c);
      },
      handleModalClose() {
        t.flowState.transition("EXIT"), e.track("Modal Closed");
      }
    }
  };
}
function T() {
  return {
    purchasePrice: null,
    init: function() {
      this.purchasePrice = 1e6;
    },
    get formattedPurchasePrice() {
      return d(this.purchasePrice);
    },
    get cashBack() {
      return Math.round(this.purchasePrice * 0.03 - 5e3);
    },
    get formattedCashBack() {
      return d(this.cashBack);
    }
  };
}
function d(t) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  }).format(t);
}
window.Alpine = l;
const r = u(l), a = {}, n = f(window.FS, a);
h();
l.start();
function h() {
  const e = new URL(window.location.href).searchParams.get("get_started"), o = e && e === "complete" ? "modalGetStartedComplete" : "default";
  a.flowState = r.createStore(
    "flowState",
    m(
      S(n),
      n,
      o
    )
  ), a.flowUIHelpers = r.createStore(
    "flowUIHelpers",
    w(a, n)
  ), console.log("Flow State:", a.flowState.value), a.thCalculatorViewModel = r.createStore(
    "thCalculatorViewModel",
    T()
  );
}
