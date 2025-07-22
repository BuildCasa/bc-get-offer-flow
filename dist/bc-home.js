import { m as A, c as o, a as r, b as n } from "./shared-dpXQ-LAr.js";
const T = {
  STATES: {
    DEFAULT: "default",
    GET_STARTED_MODAL: "getStartedModal",
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
function I(E) {
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
            (t) => {
              E.track("Get Started Modal Opened", t);
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
            (t) => {
              E.track(
                "Buy Property Flow Started",
                t
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
            (t) => {
              E.track(
                "Split Property Flow Started",
                t
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
            (t) => {
              E.track("Invest Flow Started", t);
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
            (t) => {
              E.track("Finance Flow Started", t);
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
            (t) => {
              E.track(
                "Something Else Flow Started",
                t
              );
            }
          ]
        }
      }
    }
  };
}
function s(E) {
  return {
    modal: {
      get isOpen() {
        return [
          T.STATES.GET_STARTED_MODAL,
          T.STATES.BUY_PROPERTY.IFRAME,
          T.STATES.SPLIT_PROPERTY.FILLOUT,
          T.STATES.INVEST.FILLOUT,
          T.STATES.FINANCE.TYPEFORM,
          T.STATES.SOMETHING_ELSE.FILLOUT
        ].includes(E.flowState.value);
      }
    }
  };
}
window.Alpine = A;
const a = r(A), e = {}, R = n(window.FS, e);
P();
A.start();
function P() {
  e.flowState = a.createStore(
    "flowState",
    o(I(R), R)
  ), e.flowUIHelpers = a.createStore(
    "flowUIHelpers",
    s(e)
  );
}
