import { m as r, c as d, a as f, b as S } from "./shared-RMpFEyWF.js";
import { c as w } from "./shared-ZNbSfg_G.js";
function u() {
  return {
    defaultState: "default",
    states: {
      default: {
        transitions: {
          GET_STARTED: {
            target: "modalGetStartedForm"
          }
        }
      },
      modalGetStartedForm: {
        transitions: {
          EXIT: {
            target: "default"
          }
        }
      }
    }
  };
}
function m(a, n) {
  return {
    modal: {
      get isOpen() {
        return a.flowState.value == "modalGetStartedForm";
      },
      handleModalFlowStart(t = "GET_STARTED", i = null) {
        a.flowState.transition(t);
        const s = {
          GET_STARTED: "Get Started Clicked"
        }[t];
        let l = {};
        i && (l = {
          cta_str: i
        }), s && n.track(s, l);
      },
      handleModalClose(t) {
        t.preventDefault(), t.stopPropagation(), a.flowState.transition("EXIT"), n.track("Modal Closed");
      }
    }
  };
}
window.Alpine = r;
const o = f(r), e = {}, c = S(window.FS, e);
p();
r.start();
function p() {
  e.flowState = o.createStore(
    "flowState",
    d(
      u(),
      c
    )
  ), e.flowUIHelpers = o.createStore(
    "flowUIHelpers",
    m(e, c)
  ), e.personalizationViewModel = o.createStore(
    "personalizationViewModel",
    w()
  );
}
