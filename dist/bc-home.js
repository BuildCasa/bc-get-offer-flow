import { m as o, c as r, a as i, b as c } from "./shared-GJeaBnAl.js";
import { c as l, a as s, b as w, d as n, e as d, f as S, g as M } from "./shared-kP2QBY6D.js";
window.Alpine = o;
const t = i(o), e = {}, a = c(window.FS, e);
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
    l(e, a)
  ), e.addressViewModel = t.createStore(
    "addressViewModel",
    s(e, a)
  ), e.contactViewModel = t.createStore(
    "contactViewModel",
    w(e.flowState)
  ), e.estimateViewModel = t.createStore(
    "estimateViewModel",
    n(e.flowState)
  ), e.personalizationViewModel = t.createStore(
    "personalizationViewModel",
    d()
  ), e.experimentationViewModel = t.createStore(
    "experimentationViewModel",
    S()
  );
}
