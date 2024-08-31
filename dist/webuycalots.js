import { m as o, c as r, a as i, b as c, d as l, e as s, f as d, g as n, h as w, i as S, j as M } from "./bc-shared-DVL7ara3.js";
window.Alpine = o;
const t = w(o), e = {}, a = M(window.FS, e);
V();
o.start();
function V() {
  e.flowState = t.createStore(
    "flowState",
    r(
      S(e, a),
      a
    )
  ), e.addressViewModel = t.createStore(
    "addressViewModel",
    i(e, a)
  ), e.contactViewModel = t.createStore(
    "contactViewModel",
    c(e.flowState)
  ), e.estimateViewModel = t.createStore(
    "estimateViewModel",
    l(e.flowState)
  ), e.personalizationViewModel = t.createStore(
    "personalizationViewModel",
    s()
  ), e.experimentationViewModel = t.createStore(
    "experimentationViewModel",
    d()
  ), e.modalHelpers = t.createStore(
    "modalHelpers",
    n(e, a)
  );
}
