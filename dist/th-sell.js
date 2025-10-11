import { m as s, c as O, a as c, b as _ } from "./shared-dpXQ-LAr.js";
import { a as d, b as L, d as F, e as M } from "./shared-vuDP1x0y.js";
import { c as m, d as f } from "./shared-nA7yK6XY.js";
const e = {
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
function u(a, T) {
  const n = {
    [e.EVENTS.EXIT]: {
      target: e.STATES.DEFAULT,
      effects: {
        onTransition: [
          (t) => {
            T == null || T.track("Modal Closed", t);
          }
        ]
      }
    }
  }, r = {
    [e.EVENTS.EXIT]: {
      target: e.STATES.GET_STARTED.COMPLETE.DEFAULT,
      effects: {
        onTransition: [
          (t) => {
            T == null || T.track("Modal Closed", t);
          }
        ]
      }
    }
  };
  return {
    constants: e,
    defaultState: e.STATES.DEFAULT,
    states: {
      [e.STATES.DEFAULT]: {
        transitions: {
          [e.EVENTS.GET_STARTED.START]: () => {
            var A;
            let t = e.STATES.GET_STARTED.SELL_FILLOUT_FORM_1;
            const S = (A = a.experimentationViewModel) == null ? void 0 : A.getActiveExperimentVariation(
              "sell-launch-fillout-forms-2025-10"
            );
            return S && S === "sell-fillout-form-2" && (t = e.STATES.GET_STARTED.SELL_FILLOUT_FORM_2), {
              target: t,
              effects: {
                onTransition: [
                  (R) => {
                    T.track(
                      "Get Started Clicked",
                      R
                    );
                  }
                ]
              }
            };
          },
          [e.EVENTS.BOOK_INTRO.START]: {
            target: e.STATES.BOOK_INTRO.FORM,
            effects: {
              onTransition: [
                (t) => {
                  T.track(
                    "Book Intro Call Clicked",
                    t
                  );
                }
              ]
            }
          },
          [e.EVENTS.GET_VALUATION_REPORT.START]: {
            target: e.STATES.GET_VALUATION_REPORT.FORM,
            effects: {
              onTransition: [
                (t) => {
                  T.track(
                    "Get Valuation Report Clicked",
                    t
                  );
                }
              ]
            }
          }
        }
      },
      [e.STATES.GET_STARTED.SELL_FILLOUT_FORM_1]: {
        transitions: {
          ...n
        }
      },
      [e.STATES.GET_STARTED.SELL_FILLOUT_FORM_2]: {
        transitions: {
          ...n
        }
      },
      [e.STATES.GET_STARTED.COMPLETE.DEFAULT]: {
        transitions: {
          [e.EVENTS.GET_STARTED.START]: {
            target: e.STATES.GET_STARTED.COMPLETE.MODAL,
            effects: {
              onTransition: [
                (t) => {
                  T.track("Get Started Clicked", t);
                }
              ]
            }
          },
          [e.EVENTS.BOOK_INTRO.START]: {
            target: e.STATES.BOOK_INTRO.FORM,
            effects: {
              onTransition: [
                (t) => {
                  T.track(
                    "Book Intro Call Clicked",
                    t
                  );
                }
              ]
            }
          },
          [e.EVENTS.GET_VALUATION_REPORT.START]: {
            target: e.STATES.GET_VALUATION_REPORT.FORM,
            effects: {
              onTransition: [
                (t) => {
                  T.track(
                    "Get Valuation Report Clicked",
                    t
                  );
                }
              ]
            }
          }
        }
      },
      [e.STATES.GET_STARTED.COMPLETE.MODAL]: {
        transitions: {
          ...r,
          [e.EVENTS.BUYER_PROFILE.START]: {
            target: e.STATES.BUYER_PROFILE.FORM,
            effects: {
              onTransition: [
                (t) => {
                  T.track(
                    "Fill Out Buyer Profile Clicked",
                    t
                  );
                }
              ]
            }
          },
          [e.EVENTS.BOOK_INTRO.START]: {
            target: e.STATES.BOOK_INTRO.FORM,
            effects: {
              onTransition: [
                (t) => {
                  T.track(
                    "Book Intro Call Clicked",
                    t
                  );
                }
              ]
            }
          }
        }
      },
      [e.STATES.BUYER_PROFILE.FORM]: {
        transitions: {
          ...r
        }
      },
      [e.STATES.BOOK_INTRO.FORM]: {
        transitions: {
          ...n
        }
      },
      [e.STATES.GET_VALUATION_REPORT.FORM]: {
        transitions: {
          ...n
        }
      }
    }
  };
}
function I(a) {
  return {
    modal: {
      get isOpen() {
        return [
          e.STATES.GET_STARTED.SELL_FILLOUT_FORM_1,
          e.STATES.GET_STARTED.SELL_FILLOUT_FORM_2,
          e.STATES.GET_STARTED.COMPLETE.MODAL,
          e.STATES.BUYER_PROFILE.FORM,
          e.STATES.GET_VALUATION_REPORT.FORM,
          e.STATES.BOOK_INTRO.FORM
        ].includes(a.flowState.value);
      }
    }
  };
}
const p = {
  content: {
    phoneNumberText: "(469) 564-1214",
    phoneNumberLink: "tel:+14695641214",
    pricingModel: "Flat Fee",
    calcCommissionRate: 0.03,
    calcSplitCommissionRate: 0.01,
    calcDefaultListPrice: 15e5,
    calcMaxListPrice: 75e5,
    calcMinListPrice: 25e4,
    calcInputStep: 5e4
  }
}, V = {
  DEFAULT: p
};
window.Alpine = s;
const E = c(s), o = {}, l = _(window.FS, o);
w();
U();
s.start();
function w() {
  const a = new URL(window.location.href), T = a.searchParams.get("get_started"), n = T && T === "complete", r = n ? e.STATES.GET_STARTED.COMPLETE.MODAL : e.STATES.DEFAULT, i = a.searchParams.get("user_email"), t = a.searchParams.get("user_phone");
  n && (i || t) && (window.dataLayer = window.dataLayer || [], window.dataLayer.push({
    event: "ec_form_submit",
    user_data: {
      email: i || "",
      phone_number: t || ""
    }
  })), o.flowState = E.createStore(
    "flowState",
    O(
      u(o, l),
      l,
      r
    )
  ), o.flowUIHelpers = E.createStore(
    "flowUIHelpers",
    I(o)
  ), o.personalizationViewModel = E.createStore(
    "personalizationViewModel",
    m(V)
  ), o.experimentationViewModel = E.createStore(
    "experimentationViewModel",
    f()
  ), o.adTrackingViewModel = E.createStore(
    "adTrackingViewModel",
    d()
  ), o.interestAreaViewModel = E.createStore(
    "interestAreaViewModel",
    L(o.flowState, l)
  ), o.thConvertedContactViewModel = E.createStore(
    "thConvertedContactViewModel",
    F({
      email: i || "",
      phone: t || ""
    })
  ), o.thCalculatorViewModel = E.createStore(
    "thCalculatorViewModel",
    M(o.personalizationViewModel)
  );
}
function U() {
  o.flowState.value === e.STATES.DEFAULT && (o.experimentationViewModel.setActiveExperimentVariation(
    "sell-launch-fillout-forms-2025-10",
    "sell-fillout-form-1"
  ), l.track("2025-10 Sell Launch Fillout Forms Experiment Set"));
}
