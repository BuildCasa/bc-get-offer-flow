import { m as R, c as r, a as o, b as F } from "./shared-dpXQ-LAr.js";
const T = {
  STATES: {
    DEFAULT: "default",
    GET_STARTED_MODAL: "getStartedModal",
    GET_OFFER: {
      FILLOUT: "getOfferFillout"
    },
    BUY_PROPERTY: {
      IFRAME: "buyPropertyIFrame"
    },
    SPLIT_PROPERTY: {
      FILLOUT: "splitPropertyFillout"
    },
    INVEST: {
      FILLOUT: "investFillout"
    },
    FINANCE: {
      TYPEFORM: "financeTypeform"
    },
    SOMETHING_ELSE: {
      FILLOUT: "somethingElseFillout"
    }
  },
  EVENTS: {
    START: "START",
    GET_OFFER: {
      START: "GET_OFFER_START"
    },
    BUY_PROPERTY: {
      START: "BUY_PROPERTY_START"
    },
    SPLIT_PROPERTY: {
      START: "SPLIT_PROPERTY_START"
    },
    INVEST: {
      START: "INVEST_START"
    },
    FINANCE: {
      START: "FINANCE_START"
    },
    SOMETHING_ELSE: {
      START: "SOMETHING_ELSE_START"
    },
    EXIT: "EXIT"
  }
};
function n(t) {
  const S = {
    [T.EVENTS.EXIT]: {
      target: T.STATES.DEFAULT
    }
  };
  return {
    constants: T,
    defaultState: T.STATES.DEFAULT,
    states: {
      [T.STATES.DEFAULT]: {
        transitions: {
          [T.EVENTS.START]: {
            target: T.STATES.GET_STARTED_MODAL
          },
          [T.EVENTS.GET_OFFER.START]: {
            target: T.STATES.GET_OFFER.FILLOUT
          },
          [T.EVENTS.BUY_PROPERTY.START]: {
            target: T.STATES.BUY_PROPERTY.IFRAME
          },
          [T.EVENTS.SPLIT_PROPERTY.START]: {
            target: T.STATES.SPLIT_PROPERTY.FILLOUT
          },
          [T.EVENTS.INVEST.START]: {
            target: T.STATES.INVEST.FILLOUT
          },
          [T.EVENTS.FINANCE.START]: {
            target: T.STATES.FINANCE.TYPEFORM
          }
        }
      },
      [T.STATES.GET_STARTED_MODAL]: {
        transitions: {
          ...S,
          [T.EVENTS.BUY_PROPERTY.START]: {
            target: T.STATES.BUY_PROPERTY.IFRAME
          },
          [T.EVENTS.SPLIT_PROPERTY.START]: {
            target: T.STATES.SPLIT_PROPERTY.FILLOUT
          },
          [T.EVENTS.INVEST.START]: {
            target: T.STATES.INVEST.FILLOUT
          },
          [T.EVENTS.FINANCE.START]: {
            target: T.STATES.FINANCE.TYPEFORM
          },
          [T.EVENTS.SOMETHING_ELSE.START]: {
            target: T.STATES.SOMETHING_ELSE.FILLOUT
          }
        },
        effects: {
          onEntry: [
            (E) => {
              t.track("Get Started Modal Opened", E);
            }
          ]
        }
      },
      [T.STATES.GET_OFFER.FILLOUT]: {
        transitions: {
          ...S
        },
        effects: {
          onEntry: [
            (E) => {
              t.track("Get Offer Flow Started", E);
            }
          ]
        }
      },
      [T.STATES.BUY_PROPERTY.IFRAME]: {
        transitions: {
          ...S
        },
        effects: {
          onEntry: [
            (E) => {
              t.track(
                "Buy Property Flow Started",
                E
              );
            }
          ]
        }
      },
      [T.STATES.SPLIT_PROPERTY.FILLOUT]: {
        transitions: {
          ...S
        },
        effects: {
          onEntry: [
            (E) => {
              t.track(
                "Split Property Flow Started",
                E
              );
            }
          ]
        }
      },
      [T.STATES.INVEST.FILLOUT]: {
        transitions: {
          ...S
        },
        effects: {
          onEntry: [
            (E) => {
              t.track("Invest Flow Started", E);
            }
          ]
        }
      },
      [T.STATES.FINANCE.TYPEFORM]: {
        transitions: {
          ...S
        },
        effects: {
          onEntry: [
            (E) => {
              t.track("Finance Flow Started", E);
            }
          ]
        }
      },
      [T.STATES.SOMETHING_ELSE.FILLOUT]: {
        transitions: {
          ...S
        },
        effects: {
          onEntry: [
            (E) => {
              t.track(
                "Something Else Flow Started",
                E
              );
            }
          ]
        }
      }
    }
  };
}
function I(t) {
  return {
    modal: {
      get isOpen() {
        return [
          T.STATES.GET_STARTED_MODAL,
          T.STATES.GET_OFFER.FILLOUT,
          T.STATES.BUY_PROPERTY.IFRAME,
          T.STATES.SPLIT_PROPERTY.FILLOUT,
          T.STATES.INVEST.FILLOUT,
          T.STATES.FINANCE.TYPEFORM,
          T.STATES.SOMETHING_ELSE.FILLOUT
        ].includes(t.flowState.value);
      }
    }
  };
}
window.Alpine = R;
const A = o(R), e = {}, a = F(window.FS, e);
O();
R.start();
function O() {
  e.flowState = A.createStore(
    "flowState",
    r(n(a), a)
  ), e.flowUIHelpers = A.createStore(
    "flowUIHelpers",
    I(e)
  );
}
