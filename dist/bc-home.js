import { m as o, c as r, a as i, b as c, d as l, e as s, f as w, g as n, h as d, i as S, j as M } from "./bc-shared-fY1UEAb4.js";
window.Alpine = o;
const t = d(o), e = {}, a = M(window.FS, e);
V();
o.start();
function V() {
  e.flowState = t.createStore(
    "flowState",
    r(
      S(e, a),
      a
    )
  ), e.flowUIHelpers = t.createStore(
    "flowUIHelpers",
    i(e, a)
  ), e.addressViewModel = t.createStore(
    "addressViewModel",
    c(e, a)
  ), e.contactViewModel = t.createStore(
    "contactViewModel",
    l(e.flowState)
  ), e.estimateViewModel = t.createStore(
    "estimateViewModel",
    s(e.flowState)
  ), e.personalizationViewModel = t.createStore(
    "personalizationViewModel",
    w()
  ), e.experimentationViewModel = t.createStore(
    "experimentationViewModel",
    n()
  );
}
