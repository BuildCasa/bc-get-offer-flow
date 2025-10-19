import { m as l, c as A, a as _, b as c } from "./shared-dpXQ-LAr.js";
import { a as L, b as d, d as F, e as M } from "./shared-vuDP1x0y.js";
import { c as m, d as f } from "./shared-nA7yK6XY.js";
const t = {
  STATES: {
    DEFAULT: "default",
    GET_STARTED: {
      SELL_FILLOUT_FORM_1: "getStartedSellFilloutForm1",
      // Default Fillout Form
      SELL_FILLOUT_FORM_2: "getStartedSellFilloutForm2",
      // Alternate Fillout Form
      COMPLETE: {
        DEFAULT: "getStartedComplete",
        MODAL: "modalGetStartedComplete"
      }
    },
    BUYER_PROFILE: {
      FORM: "modalBuyerProfileForm"
    },
    BOOK_INTRO: {
      FORM: "modalBookIntroForm"
    },
    GET_VALUATION_REPORT: {
      FORM: "modalGetValuationReportForm"
    }
  },
  EVENTS: {
    GET_STARTED: {
      START: "GET_STARTED_START"
    },
    BUYER_PROFILE: {
      START: "BUYER_PROFILE_START"
    },
    BOOK_INTRO: {
      START: "BOOK_INTRO_START"
    },
    GET_VALUATION_REPORT: {
      START: "GET_VALUATION_REPORT_START"
    },
    EXIT: "EXIT"
  }
};
function I(E, T) {
  const n = {
    [t.EVENTS.EXIT]: {
      target: t.STATES.DEFAULT,
      effects: {
        onTransition: [
          (e) => {
            T == null || T.track("Modal Closed", e);
          }
        ]
      }
    }
  }, r = {
    [t.EVENTS.EXIT]: {
      target: t.STATES.GET_STARTED.COMPLETE.DEFAULT,
      effects: {
        onTransition: [
          (e) => {
            T == null || T.track("Modal Closed", e);
          }
        ]
      }
    }
  };
  return {
    constants: t,
    defaultState: t.STATES.DEFAULT,
    states: {
      [t.STATES.DEFAULT]: {
        transitions: {
          [t.EVENTS.GET_STARTED.START]: () => {
            var R;
            let e = t.STATES.GET_STARTED.SELL_FILLOUT_FORM_1;
            const s = (R = E.experimentationViewModel) == null ? void 0 : R.getActiveExperimentVariation(
              "sell-launch-fillout-forms-2025-10"
            );
            return s && s === "sell-fillout-form-2" && (e = t.STATES.GET_STARTED.SELL_FILLOUT_FORM_2), {
              target: e,
              effects: {
                onTransition: [
                  (O) => {
                    T.track(
                      "Get Started Clicked",
                      O
                    );
                  }
                ]
              }
            };
          },
          [t.EVENTS.BOOK_INTRO.START]: {
            target: t.STATES.BOOK_INTRO.FORM,
            effects: {
              onTransition: [
                (e) => {
                  T.track(
                    "Book Intro Call Clicked",
                    e
                  );
                }
              ]
            }
          },
          [t.EVENTS.GET_VALUATION_REPORT.START]: {
            target: t.STATES.GET_VALUATION_REPORT.FORM,
            effects: {
              onTransition: [
                (e) => {
                  T.track(
                    "Get Valuation Report Clicked",
                    e
                  );
                }
              ]
            }
          }
        }
      },
      [t.STATES.GET_STARTED.SELL_FILLOUT_FORM_1]: {
        transitions: {
          ...n
        }
      },
      [t.STATES.GET_STARTED.SELL_FILLOUT_FORM_2]: {
        transitions: {
          ...n
        }
      },
      [t.STATES.GET_STARTED.COMPLETE.DEFAULT]: {
        transitions: {
          [t.EVENTS.GET_STARTED.START]: {
            target: t.STATES.GET_STARTED.COMPLETE.MODAL,
            effects: {
              onTransition: [
                (e) => {
                  T.track("Get Started Clicked", e);
                }
              ]
            }
          },
          [t.EVENTS.BOOK_INTRO.START]: {
            target: t.STATES.BOOK_INTRO.FORM,
            effects: {
              onTransition: [
                (e) => {
                  T.track(
                    "Book Intro Call Clicked",
                    e
                  );
                }
              ]
            }
          },
          [t.EVENTS.GET_VALUATION_REPORT.START]: {
            target: t.STATES.GET_VALUATION_REPORT.FORM,
            effects: {
              onTransition: [
                (e) => {
                  T.track(
                    "Get Valuation Report Clicked",
                    e
                  );
                }
              ]
            }
          }
        }
      },
      [t.STATES.GET_STARTED.COMPLETE.MODAL]: {
        transitions: {
          ...r,
          [t.EVENTS.BUYER_PROFILE.START]: {
            target: t.STATES.BUYER_PROFILE.FORM,
            effects: {
              onTransition: [
                (e) => {
                  T.track(
                    "Fill Out Buyer Profile Clicked",
                    e
                  );
                }
              ]
            }
          },
          [t.EVENTS.BOOK_INTRO.START]: {
            target: t.STATES.BOOK_INTRO.FORM,
            effects: {
              onTransition: [
                (e) => {
                  T.track(
                    "Book Intro Call Clicked",
                    e
                  );
                }
              ]
            }
          }
        }
      },
      [t.STATES.BUYER_PROFILE.FORM]: {
        transitions: {
          ...r
        }
      },
      [t.STATES.BOOK_INTRO.FORM]: {
        transitions: {
          ...n
        }
      },
      [t.STATES.GET_VALUATION_REPORT.FORM]: {
        transitions: {
          ...n
        }
      }
    }
  };
}
function V(E) {
  return {
    modal: {
      get isOpen() {
        return [
          t.STATES.GET_STARTED.SELL_FILLOUT_FORM_1,
          t.STATES.GET_STARTED.SELL_FILLOUT_FORM_2,
          t.STATES.GET_STARTED.COMPLETE.MODAL,
          t.STATES.BUYER_PROFILE.FORM,
          t.STATES.GET_VALUATION_REPORT.FORM,
          t.STATES.BOOK_INTRO.FORM
        ].includes(E.flowState.value);
      }
    }
  };
}
const w = {
  content: {
    phoneNumberText: "(469) 564-1214",
    phoneNumberLink: "tel:+14695641214",
    pricingModel: "Flat Fee",
    calcCommissionRate: 0.03,
    calcSplitCommissionRate: 0.01,
    calcDefaultListPrice: 5e5,
    calcMaxListPrice: 5e6,
    calcMinListPrice: 1e5,
    calcInputStep: 5e4
  }
}, u = {
  DEFAULT: w
};
window.Alpine = l;
const a = _(l), o = {}, S = c(window.FS, o);
U();
l.start();
function U() {
  const E = new URL(window.location.href), T = E.searchParams.get("get_started"), n = T && T === "complete", r = n ? t.STATES.GET_STARTED.COMPLETE.MODAL : t.STATES.DEFAULT, i = E.searchParams.get("user_email"), e = E.searchParams.get("user_phone");
  n && (i || e) && (window.dataLayer = window.dataLayer || [], window.dataLayer.push({
    event: "ec_form_submit",
    user_data: {
      email: i || "",
      phone_number: e || ""
    }
  })), o.flowState = a.createStore(
    "flowState",
    A(
      I(o, S),
      S,
      r
    )
  ), o.flowUIHelpers = a.createStore(
    "flowUIHelpers",
    V(o)
  ), o.personalizationViewModel = a.createStore(
    "personalizationViewModel",
    m(u)
  ), o.experimentationViewModel = a.createStore(
    "experimentationViewModel",
    f()
  ), o.adTrackingViewModel = a.createStore(
    "adTrackingViewModel",
    L()
  ), o.interestAreaViewModel = a.createStore(
    "interestAreaViewModel",
    d(o.flowState, S)
  ), o.thConvertedContactViewModel = a.createStore(
    "thConvertedContactViewModel",
    F({
      email: i || "",
      phone: e || ""
    })
  ), o.thCalculatorViewModel = a.createStore(
    "thCalculatorViewModel",
    M(o.personalizationViewModel)
  );
}
