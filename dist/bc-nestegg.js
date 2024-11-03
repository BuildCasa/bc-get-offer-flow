import { m as o, c as r, a as i, b as c, d as l } from "./shared-JXB_n1Zn.js";
import { c as s, a as w, b as d, d as n, e as S, f as M } from "./shared-rrmPjL7J.js";
window.Alpine = o;
const t = c(o), e = {}, a = l(window.FS, e);
V();
o.start();
function V() {
  e.flowState = t.createStore(
    "flowState",
    r(
      M(e, a),
      a
    )
  ), e.flowUIHelpers = t.createStore(
    "flowUIHelpers",
    s(e, a)
  ), e.addressViewModel = t.createStore(
    "addressViewModel",
    w(e, a)
  ), e.contactViewModel = t.createStore(
    "contactViewModel",
    d(e.flowState)
  ), e.estimateViewModel = t.createStore(
    "estimateViewModel",
    n(e.flowState)
  ), e.personalizationViewModel = t.createStore(
    "personalizationViewModel",
    S()
  ), e.experimentationViewModel = t.createStore(
    "experimentationViewModel",
    i()
  );
}
