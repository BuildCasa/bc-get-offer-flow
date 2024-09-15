import { m as i, c as m, a as u, b as f } from "./shared-RMpFEyWF.js";
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
        return t.flowState.value == "modalGetStartedForm" || t.flowState.value == "modalGetStartedComplete" || t.flowState.value == "modalBookIntroForm" || t.flowState.value == "modalGetDemoForm";
      },
      handleModalFlowStart(r = "GET_STARTED", l = null) {
        t.flowState.transition(r);
        const s = {
          GET_STARTED: "Get Started Clicked",
          GET_DEMO: "Get Demo Clicked"
        }[r];
        let c = {};
        l && (c = {
          cta_str: l
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
window.Alpine = i;
const o = u(i), a = {}, n = f(window.FS, a);
h();
i.start();
function h() {
  const e = new URL(window.location.href).searchParams.get("get_started"), r = e && e === "complete" ? "modalGetStartedComplete" : "default";
  a.flowState = o.createStore(
    "flowState",
    m(
      S(n),
      n,
      r
    )
  ), a.flowUIHelpers = o.createStore(
    "flowUIHelpers",
    w(a, n)
  ), a.thCalculatorViewModel = o.createStore(
    "thCalculatorViewModel",
    T()
  );
}
