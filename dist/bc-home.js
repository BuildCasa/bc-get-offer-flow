import { m as R, c as P, a as o, b as n } from "./shared-lDivQ9uY.js";
const T = {
  STATES: {
    DEFAULT: "default",
    GET_STARTED_MODAL: "getStartedModal",
    BUY_PROPERTY: {
      IFRAME: "buyPropertyIFrame"
    },
    SPLIT_PROPERTY: {
      TYPEFORM: "splitPropertyTypeform"
    },
    INVEST: {
      TYPEFORM: "investTypeform"
    },
    SOMETHING_ELSE: {
      TYPEFORM: "somethingElseTypeform"
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
    SOMETHING_ELSE: {
      START: "SOMETHING_ELSE_START"
    },
    EXIT: "EXIT"
  }
};
function A(E) {
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
            target: T.STATES.SPLIT_PROPERTY.TYPEFORM
          },
          [T.EVENTS.INVEST.START]: {
            target: T.STATES.INVEST.TYPEFORM
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
            target: T.STATES.SPLIT_PROPERTY.TYPEFORM
          },
          [T.EVENTS.INVEST.START]: {
            target: T.STATES.INVEST.TYPEFORM
          },
          [T.EVENTS.SOMETHING_ELSE.START]: {
            target: T.STATES.SOMETHING_ELSE.TYPEFORM
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
      [T.STATES.SPLIT_PROPERTY.TYPEFORM]: {
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
      [T.STATES.INVEST.TYPEFORM]: {
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
      [T.STATES.SOMETHING_ELSE.TYPEFORM]: {
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
        return E.flowState.value == T.STATES.GET_STARTED_MODAL || E.flowState.value == T.STATES.BUY_PROPERTY.IFRAME || E.flowState.value == T.STATES.SPLIT_PROPERTY.TYPEFORM || E.flowState.value == T.STATES.INVEST.TYPEFORM || E.flowState.value == T.STATES.SOMETHING_ELSE.TYPEFORM;
      }
    }
  };
}
window.Alpine = R;
const a = o(R), e = {}, r = n(window.FS, e);
O();
R.start();
function O() {
  e.flowState = a.createStore(
    "flowState",
    P(A(r), r)
  ), e.flowUIHelpers = a.createStore(
    "flowUIHelpers",
    s(e)
  );
}
