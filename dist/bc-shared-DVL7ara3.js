var be = !1, Pe = !1, T = [];
function kn(e) {
  Tn(e);
}
function Tn(e) {
  T.includes(e) || T.push(e), On();
}
function pt(e) {
  let t = T.indexOf(e);
  t !== -1 && T.splice(t, 1);
}
function On() {
  !Pe && !be && (be = !0, queueMicrotask(Ln));
}
function Ln() {
  be = !1, Pe = !0;
  for (let e = 0; e < T.length; e++)
    T[e]();
  T.length = 0, Pe = !1;
}
var j, Y, le, mt, Ve = !0;
function Fn(e) {
  Ve = !1, e(), Ve = !0;
}
function Dn(e) {
  j = e.reactive, le = e.release, Y = (t) => e.effect(t, { scheduler: (n) => {
    Ve ? kn(n) : n();
  } }), mt = e.raw;
}
function st(e) {
  Y = e;
}
function Bn(e) {
  let t = () => {
  };
  return [(r) => {
    let i = Y(r);
    return e._x_effects || (e._x_effects = /* @__PURE__ */ new Set(), e._x_runEffects = () => {
      e._x_effects.forEach((a) => a());
    }), e._x_effects.add(i), t = () => {
      i !== void 0 && (e._x_effects.delete(i), le(i));
    }, i;
  }, () => {
    t();
  }];
}
var _t = [], yt = [], gt = [];
function Nn(e) {
  gt.push(e);
}
function wt(e, t) {
  typeof t == "function" ? (e._x_cleanups || (e._x_cleanups = []), e._x_cleanups.push(t)) : (t = e, yt.push(t));
}
function In(e) {
  _t.push(e);
}
function Hn(e, t, n) {
  e._x_attributeCleanups || (e._x_attributeCleanups = {}), e._x_attributeCleanups[t] || (e._x_attributeCleanups[t] = []), e._x_attributeCleanups[t].push(n);
}
function vt(e, t) {
  e._x_attributeCleanups && Object.entries(e._x_attributeCleanups).forEach(([n, r]) => {
    (t === void 0 || t.includes(n)) && (r.forEach((i) => i()), delete e._x_attributeCleanups[n]);
  });
}
var Ge = new MutationObserver(ze), $e = !1;
function Mt() {
  Ge.observe(document, { subtree: !0, childList: !0, attributes: !0, attributeOldValue: !0 }), $e = !0;
}
function jn() {
  Wn(), Ge.disconnect(), $e = !1;
}
var z = [], Ce = !1;
function Wn() {
  z = z.concat(Ge.takeRecords()), z.length && !Ce && (Ce = !0, queueMicrotask(() => {
    Gn(), Ce = !1;
  }));
}
function Gn() {
  ze(z), z.length = 0;
}
function v(e) {
  if (!$e)
    return e();
  jn();
  let t = e();
  return Mt(), t;
}
var Ke = !1, ae = [];
function $n() {
  Ke = !0;
}
function Kn() {
  Ke = !1, ze(ae), ae = [];
}
function ze(e) {
  if (Ke) {
    ae = ae.concat(e);
    return;
  }
  let t = [], n = [], r = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map();
  for (let a = 0; a < e.length; a++)
    if (!e[a].target._x_ignoreMutationObserver && (e[a].type === "childList" && (e[a].addedNodes.forEach((s) => s.nodeType === 1 && t.push(s)), e[a].removedNodes.forEach((s) => s.nodeType === 1 && n.push(s))), e[a].type === "attributes")) {
      let s = e[a].target, o = e[a].attributeName, l = e[a].oldValue, c = () => {
        r.has(s) || r.set(s, []), r.get(s).push({ name: o, value: s.getAttribute(o) });
      }, d = () => {
        i.has(s) || i.set(s, []), i.get(s).push(o);
      };
      s.hasAttribute(o) && l === null ? c() : s.hasAttribute(o) ? (d(), c()) : d();
    }
  i.forEach((a, s) => {
    vt(s, a);
  }), r.forEach((a, s) => {
    _t.forEach((o) => o(s, a));
  });
  for (let a of n)
    if (!t.includes(a) && (yt.forEach((s) => s(a)), a._x_cleanups))
      for (; a._x_cleanups.length; )
        a._x_cleanups.pop()();
  t.forEach((a) => {
    a._x_ignoreSelf = !0, a._x_ignore = !0;
  });
  for (let a of t)
    n.includes(a) || a.isConnected && (delete a._x_ignoreSelf, delete a._x_ignore, gt.forEach((s) => s(a)), a._x_ignore = !0, a._x_ignoreSelf = !0);
  t.forEach((a) => {
    delete a._x_ignoreSelf, delete a._x_ignore;
  }), t = null, n = null, r = null, i = null;
}
function Ct(e) {
  return Z(N(e));
}
function Q(e, t, n) {
  return e._x_dataStack = [t, ...N(n || e)], () => {
    e._x_dataStack = e._x_dataStack.filter((r) => r !== t);
  };
}
function ot(e, t) {
  let n = e._x_dataStack[0];
  Object.entries(t).forEach(([r, i]) => {
    n[r] = i;
  });
}
function N(e) {
  return e._x_dataStack ? e._x_dataStack : typeof ShadowRoot == "function" && e instanceof ShadowRoot ? N(e.host) : e.parentNode ? N(e.parentNode) : [];
}
function Z(e) {
  let t = new Proxy({}, {
    ownKeys: () => Array.from(new Set(e.flatMap((n) => Object.keys(n)))),
    has: (n, r) => e.some((i) => i.hasOwnProperty(r)),
    get: (n, r) => (e.find((i) => {
      if (i.hasOwnProperty(r)) {
        let a = Object.getOwnPropertyDescriptor(i, r);
        if (a.get && a.get._x_alreadyBound || a.set && a.set._x_alreadyBound)
          return !0;
        if ((a.get || a.set) && a.enumerable) {
          let s = a.get, o = a.set, l = a;
          s = s && s.bind(t), o = o && o.bind(t), s && (s._x_alreadyBound = !0), o && (o._x_alreadyBound = !0), Object.defineProperty(i, r, {
            ...l,
            get: s,
            set: o
          });
        }
        return !0;
      }
      return !1;
    }) || {})[r],
    set: (n, r, i) => {
      let a = e.find((s) => s.hasOwnProperty(r));
      return a ? a[r] = i : e[e.length - 1][r] = i, !0;
    }
  });
  return t;
}
function xt(e) {
  let t = (r) => typeof r == "object" && !Array.isArray(r) && r !== null, n = (r, i = "") => {
    Object.entries(Object.getOwnPropertyDescriptors(r)).forEach(([a, { value: s, enumerable: o }]) => {
      if (o === !1 || s === void 0)
        return;
      let l = i === "" ? a : `${i}.${a}`;
      typeof s == "object" && s !== null && s._x_interceptor ? r[a] = s.initialize(e, l, a) : t(s) && s !== r && !(s instanceof Element) && n(s, l);
    });
  };
  return n(e);
}
function Et(e, t = () => {
}) {
  let n = {
    initialValue: void 0,
    _x_interceptor: !0,
    initialize(r, i, a) {
      return e(this.initialValue, () => zn(r, i), (s) => Re(r, i, s), i, a);
    }
  };
  return t(n), (r) => {
    if (typeof r == "object" && r !== null && r._x_interceptor) {
      let i = n.initialize.bind(n);
      n.initialize = (a, s, o) => {
        let l = r.initialize(a, s, o);
        return n.initialValue = l, i(a, s, o);
      };
    } else
      n.initialValue = r;
    return n;
  };
}
function zn(e, t) {
  return t.split(".").reduce((n, r) => n[r], e);
}
function Re(e, t, n) {
  if (typeof t == "string" && (t = t.split(".")), t.length === 1)
    e[t[0]] = n;
  else {
    if (t.length === 0)
      throw error;
    return e[t[0]] || (e[t[0]] = {}), Re(e[t[0]], t.slice(1), n);
  }
}
var St = {};
function S(e, t) {
  St[e] = t;
}
function ke(e, t) {
  return Object.entries(St).forEach(([n, r]) => {
    Object.defineProperty(e, `$${n}`, {
      get() {
        let [i, a] = kt(t);
        return i = { interceptor: Et, ...i }, wt(t, a), r(t, i);
      },
      enumerable: !1
    });
  }), e;
}
function qn(e, t, n, ...r) {
  try {
    return n(...r);
  } catch (i) {
    J(i, e, t);
  }
}
function J(e, t, n = void 0) {
  Object.assign(e, { el: t, expression: n }), console.warn(`Alpine Expression Error: ${e.message}

${n ? 'Expression: "' + n + `"

` : ""}`, t), setTimeout(() => {
    throw e;
  }, 0);
}
var ie = !0;
function Un(e) {
  let t = ie;
  ie = !1, e(), ie = t;
}
function B(e, t, n = {}) {
  let r;
  return C(e, t)((i) => r = i, n), r;
}
function C(...e) {
  return At(...e);
}
var At = bt;
function Jn(e) {
  At = e;
}
function bt(e, t) {
  let n = {};
  ke(n, e);
  let r = [n, ...N(e)];
  if (typeof t == "function")
    return Yn(r, t);
  let i = Zn(r, t, e);
  return qn.bind(null, e, t, i);
}
function Yn(e, t) {
  return (n = () => {
  }, { scope: r = {}, params: i = [] } = {}) => {
    let a = t.apply(Z([r, ...e]), i);
    se(n, a);
  };
}
var xe = {};
function Qn(e, t) {
  if (xe[e])
    return xe[e];
  let n = Object.getPrototypeOf(async function() {
  }).constructor, r = /^[\n\s]*if.*\(.*\)/.test(e) || /^(let|const)\s/.test(e) ? `(() => { ${e} })()` : e, a = (() => {
    try {
      return new n(["__self", "scope"], `with (scope) { __self.result = ${r} }; __self.finished = true; return __self.result;`);
    } catch (s) {
      return J(s, t, e), Promise.resolve();
    }
  })();
  return xe[e] = a, a;
}
function Zn(e, t, n) {
  let r = Qn(t, n);
  return (i = () => {
  }, { scope: a = {}, params: s = [] } = {}) => {
    r.result = void 0, r.finished = !1;
    let o = Z([a, ...e]);
    if (typeof r == "function") {
      let l = r(r, o).catch((c) => J(c, n, t));
      r.finished ? (se(i, r.result, o, s, n), r.result = void 0) : l.then((c) => {
        se(i, c, o, s, n);
      }).catch((c) => J(c, n, t)).finally(() => r.result = void 0);
    }
  };
}
function se(e, t, n, r, i) {
  if (ie && typeof t == "function") {
    let a = t.apply(n, r);
    a instanceof Promise ? a.then((s) => se(e, s, n, r)).catch((s) => J(s, i, t)) : e(a);
  } else
    e(t);
}
var qe = "x-";
function W(e = "") {
  return qe + e;
}
function Xn(e) {
  qe = e;
}
var Pt = {};
function w(e, t) {
  Pt[e] = t;
}
function Ue(e, t, n) {
  if (t = Array.from(t), e._x_virtualDirectives) {
    let a = Object.entries(e._x_virtualDirectives).map(([o, l]) => ({ name: o, value: l })), s = Vt(a);
    a = a.map((o) => s.find((l) => l.name === o.name) ? {
      name: `x-bind:${o.name}`,
      value: `"${o.value}"`
    } : o), t = t.concat(a);
  }
  let r = {};
  return t.map(Lt((a, s) => r[a] = s)).filter(Dt).map(nr(r, n)).sort(rr).map((a) => tr(e, a));
}
function Vt(e) {
  return Array.from(e).map(Lt()).filter((t) => !Dt(t));
}
var Te = !1, K = /* @__PURE__ */ new Map(), Rt = Symbol();
function er(e) {
  Te = !0;
  let t = Symbol();
  Rt = t, K.set(t, []);
  let n = () => {
    for (; K.get(t).length; )
      K.get(t).shift()();
    K.delete(t);
  }, r = () => {
    Te = !1, n();
  };
  e(n), r();
}
function kt(e) {
  let t = [], n = (o) => t.push(o), [r, i] = Bn(e);
  return t.push(i), [{
    Alpine: X,
    effect: r,
    cleanup: n,
    evaluateLater: C.bind(C, e),
    evaluate: B.bind(B, e)
  }, () => t.forEach((o) => o())];
}
function tr(e, t) {
  let n = () => {
  }, r = Pt[t.type] || n, [i, a] = kt(e);
  Hn(e, t.original, a);
  let s = () => {
    e._x_ignore || e._x_ignoreSelf || (r.inline && r.inline(e, t, i), r = r.bind(r, e, t, i), Te ? K.get(Rt).push(r) : r());
  };
  return s.runCleanups = a, s;
}
var Tt = (e, t) => ({ name: n, value: r }) => (n.startsWith(e) && (n = n.replace(e, t)), { name: n, value: r }), Ot = (e) => e;
function Lt(e = () => {
}) {
  return ({ name: t, value: n }) => {
    let { name: r, value: i } = Ft.reduce((a, s) => s(a), { name: t, value: n });
    return r !== t && e(r, t), { name: r, value: i };
  };
}
var Ft = [];
function Je(e) {
  Ft.push(e);
}
function Dt({ name: e }) {
  return Bt().test(e);
}
var Bt = () => new RegExp(`^${qe}([^:^.]+)\\b`);
function nr(e, t) {
  return ({ name: n, value: r }) => {
    let i = n.match(Bt()), a = n.match(/:([a-zA-Z0-9\-:]+)/), s = n.match(/\.[^.\]]+(?=[^\]]*$)/g) || [], o = t || e[n] || n;
    return {
      type: i ? i[1] : null,
      value: a ? a[1] : null,
      modifiers: s.map((l) => l.replace(".", "")),
      expression: r,
      original: o
    };
  };
}
var Oe = "DEFAULT", te = [
  "ignore",
  "ref",
  "data",
  "id",
  "radio",
  "tabs",
  "switch",
  "disclosure",
  "menu",
  "listbox",
  "list",
  "item",
  "combobox",
  "bind",
  "init",
  "for",
  "mask",
  "model",
  "modelable",
  "transition",
  "show",
  "if",
  Oe,
  "teleport"
];
function rr(e, t) {
  let n = te.indexOf(e.type) === -1 ? Oe : e.type, r = te.indexOf(t.type) === -1 ? Oe : t.type;
  return te.indexOf(n) - te.indexOf(r);
}
function q(e, t, n = {}) {
  e.dispatchEvent(new CustomEvent(t, {
    detail: n,
    bubbles: !0,
    composed: !0,
    cancelable: !0
  }));
}
var Le = [], Ye = !1;
function Nt(e = () => {
}) {
  return queueMicrotask(() => {
    Ye || setTimeout(() => {
      Fe();
    });
  }), new Promise((t) => {
    Le.push(() => {
      e(), t();
    });
  });
}
function Fe() {
  for (Ye = !1; Le.length; )
    Le.shift()();
}
function ir() {
  Ye = !0;
}
function F(e, t) {
  if (typeof ShadowRoot == "function" && e instanceof ShadowRoot) {
    Array.from(e.children).forEach((i) => F(i, t));
    return;
  }
  let n = !1;
  if (t(e, () => n = !0), n)
    return;
  let r = e.firstElementChild;
  for (; r; )
    F(r, t), r = r.nextElementSibling;
}
function I(e, ...t) {
  console.warn(`Alpine Warning: ${e}`, ...t);
}
function ar() {
  document.body || I("Unable to initialize. Trying to load Alpine before `<body>` is available. Did you forget to add `defer` in Alpine's `<script>` tag?"), q(document, "alpine:init"), q(document, "alpine:initializing"), Mt(), Nn((t) => V(t, F)), wt((t) => or(t)), In((t, n) => {
    Ue(t, n).forEach((r) => r());
  });
  let e = (t) => !ce(t.parentElement, !0);
  Array.from(document.querySelectorAll(jt())).filter(e).forEach((t) => {
    V(t);
  }), q(document, "alpine:initialized");
}
var Qe = [], It = [];
function Ht() {
  return Qe.map((e) => e());
}
function jt() {
  return Qe.concat(It).map((e) => e());
}
function Wt(e) {
  Qe.push(e);
}
function Gt(e) {
  It.push(e);
}
function ce(e, t = !1) {
  return ue(e, (n) => {
    if ((t ? jt() : Ht()).some((i) => n.matches(i)))
      return !0;
  });
}
function ue(e, t) {
  if (e) {
    if (t(e))
      return e;
    if (e._x_teleportBack && (e = e._x_teleportBack), !!e.parentElement)
      return ue(e.parentElement, t);
  }
}
function sr(e) {
  return Ht().some((t) => e.matches(t));
}
function V(e, t = F) {
  er(() => {
    t(e, (n, r) => {
      Ue(n, n.attributes).forEach((i) => i()), n._x_ignore && r();
    });
  });
}
function or(e) {
  F(e, (t) => vt(t));
}
function Ze(e, t) {
  return Array.isArray(t) ? lt(e, t.join(" ")) : typeof t == "object" && t !== null ? lr(e, t) : typeof t == "function" ? Ze(e, t()) : lt(e, t);
}
function lt(e, t) {
  let n = (i) => i.split(" ").filter((a) => !e.classList.contains(a)).filter(Boolean), r = (i) => (e.classList.add(...i), () => {
    e.classList.remove(...i);
  });
  return t = t === !0 ? t = "" : t || "", r(n(t));
}
function lr(e, t) {
  let n = (o) => o.split(" ").filter(Boolean), r = Object.entries(t).flatMap(([o, l]) => l ? n(o) : !1).filter(Boolean), i = Object.entries(t).flatMap(([o, l]) => l ? !1 : n(o)).filter(Boolean), a = [], s = [];
  return i.forEach((o) => {
    e.classList.contains(o) && (e.classList.remove(o), s.push(o));
  }), r.forEach((o) => {
    e.classList.contains(o) || (e.classList.add(o), a.push(o));
  }), () => {
    s.forEach((o) => e.classList.add(o)), a.forEach((o) => e.classList.remove(o));
  };
}
function de(e, t) {
  return typeof t == "object" && t !== null ? cr(e, t) : ur(e, t);
}
function cr(e, t) {
  let n = {};
  return Object.entries(t).forEach(([r, i]) => {
    n[r] = e.style[r], r.startsWith("--") || (r = dr(r)), e.style.setProperty(r, i);
  }), setTimeout(() => {
    e.style.length === 0 && e.removeAttribute("style");
  }), () => {
    de(e, n);
  };
}
function ur(e, t) {
  let n = e.getAttribute("style", t);
  return e.setAttribute("style", t), () => {
    e.setAttribute("style", n || "");
  };
}
function dr(e) {
  return e.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}
function De(e, t = () => {
}) {
  let n = !1;
  return function() {
    n ? t.apply(this, arguments) : (n = !0, e.apply(this, arguments));
  };
}
w("transition", (e, { value: t, modifiers: n, expression: r }, { evaluate: i }) => {
  typeof r == "function" && (r = i(r)), r ? fr(e, r, t) : hr(e, n, t);
});
function fr(e, t, n) {
  $t(e, Ze, ""), {
    enter: (i) => {
      e._x_transition.enter.during = i;
    },
    "enter-start": (i) => {
      e._x_transition.enter.start = i;
    },
    "enter-end": (i) => {
      e._x_transition.enter.end = i;
    },
    leave: (i) => {
      e._x_transition.leave.during = i;
    },
    "leave-start": (i) => {
      e._x_transition.leave.start = i;
    },
    "leave-end": (i) => {
      e._x_transition.leave.end = i;
    }
  }[n](t);
}
function hr(e, t, n) {
  $t(e, de);
  let r = !t.includes("in") && !t.includes("out") && !n, i = r || t.includes("in") || ["enter"].includes(n), a = r || t.includes("out") || ["leave"].includes(n);
  t.includes("in") && !r && (t = t.filter((p, _) => _ < t.indexOf("out"))), t.includes("out") && !r && (t = t.filter((p, _) => _ > t.indexOf("out")));
  let s = !t.includes("opacity") && !t.includes("scale"), o = s || t.includes("opacity"), l = s || t.includes("scale"), c = o ? 0 : 1, d = l ? G(t, "scale", 95) / 100 : 1, f = G(t, "delay", 0), m = G(t, "origin", "center"), g = "opacity, transform", A = G(t, "duration", 150) / 1e3, h = G(t, "duration", 75) / 1e3, u = "cubic-bezier(0.4, 0.0, 0.2, 1)";
  i && (e._x_transition.enter.during = {
    transformOrigin: m,
    transitionDelay: f,
    transitionProperty: g,
    transitionDuration: `${A}s`,
    transitionTimingFunction: u
  }, e._x_transition.enter.start = {
    opacity: c,
    transform: `scale(${d})`
  }, e._x_transition.enter.end = {
    opacity: 1,
    transform: "scale(1)"
  }), a && (e._x_transition.leave.during = {
    transformOrigin: m,
    transitionDelay: f,
    transitionProperty: g,
    transitionDuration: `${h}s`,
    transitionTimingFunction: u
  }, e._x_transition.leave.start = {
    opacity: 1,
    transform: "scale(1)"
  }, e._x_transition.leave.end = {
    opacity: c,
    transform: `scale(${d})`
  });
}
function $t(e, t, n = {}) {
  e._x_transition || (e._x_transition = {
    enter: { during: n, start: n, end: n },
    leave: { during: n, start: n, end: n },
    in(r = () => {
    }, i = () => {
    }) {
      Be(e, t, {
        during: this.enter.during,
        start: this.enter.start,
        end: this.enter.end
      }, r, i);
    },
    out(r = () => {
    }, i = () => {
    }) {
      Be(e, t, {
        during: this.leave.during,
        start: this.leave.start,
        end: this.leave.end
      }, r, i);
    }
  });
}
window.Element.prototype._x_toggleAndCascadeWithTransitions = function(e, t, n, r) {
  const i = document.visibilityState === "visible" ? requestAnimationFrame : setTimeout;
  let a = () => i(n);
  if (t) {
    e._x_transition && (e._x_transition.enter || e._x_transition.leave) ? e._x_transition.enter && (Object.entries(e._x_transition.enter.during).length || Object.entries(e._x_transition.enter.start).length || Object.entries(e._x_transition.enter.end).length) ? e._x_transition.in(n) : a() : e._x_transition ? e._x_transition.in(n) : a();
    return;
  }
  e._x_hidePromise = e._x_transition ? new Promise((s, o) => {
    e._x_transition.out(() => {
    }, () => s(r)), e._x_transitioning.beforeCancel(() => o({ isFromCancelledTransition: !0 }));
  }) : Promise.resolve(r), queueMicrotask(() => {
    let s = Kt(e);
    s ? (s._x_hideChildren || (s._x_hideChildren = []), s._x_hideChildren.push(e)) : i(() => {
      let o = (l) => {
        let c = Promise.all([
          l._x_hidePromise,
          ...(l._x_hideChildren || []).map(o)
        ]).then(([d]) => d());
        return delete l._x_hidePromise, delete l._x_hideChildren, c;
      };
      o(e).catch((l) => {
        if (!l.isFromCancelledTransition)
          throw l;
      });
    });
  });
};
function Kt(e) {
  let t = e.parentNode;
  if (t)
    return t._x_hidePromise ? t : Kt(t);
}
function Be(e, t, { during: n, start: r, end: i } = {}, a = () => {
}, s = () => {
}) {
  if (e._x_transitioning && e._x_transitioning.cancel(), Object.keys(n).length === 0 && Object.keys(r).length === 0 && Object.keys(i).length === 0) {
    a(), s();
    return;
  }
  let o, l, c;
  pr(e, {
    start() {
      o = t(e, r);
    },
    during() {
      l = t(e, n);
    },
    before: a,
    end() {
      o(), c = t(e, i);
    },
    after: s,
    cleanup() {
      l(), c();
    }
  });
}
function pr(e, t) {
  let n, r, i, a = De(() => {
    v(() => {
      n = !0, r || t.before(), i || (t.end(), Fe()), t.after(), e.isConnected && t.cleanup(), delete e._x_transitioning;
    });
  });
  e._x_transitioning = {
    beforeCancels: [],
    beforeCancel(s) {
      this.beforeCancels.push(s);
    },
    cancel: De(function() {
      for (; this.beforeCancels.length; )
        this.beforeCancels.shift()();
      a();
    }),
    finish: a
  }, v(() => {
    t.start(), t.during();
  }), ir(), requestAnimationFrame(() => {
    if (n)
      return;
    let s = Number(getComputedStyle(e).transitionDuration.replace(/,.*/, "").replace("s", "")) * 1e3, o = Number(getComputedStyle(e).transitionDelay.replace(/,.*/, "").replace("s", "")) * 1e3;
    s === 0 && (s = Number(getComputedStyle(e).animationDuration.replace("s", "")) * 1e3), v(() => {
      t.before();
    }), r = !0, requestAnimationFrame(() => {
      n || (v(() => {
        t.end();
      }), Fe(), setTimeout(e._x_transitioning.finish, s + o), i = !0);
    });
  });
}
function G(e, t, n) {
  if (e.indexOf(t) === -1)
    return n;
  const r = e[e.indexOf(t) + 1];
  if (!r || t === "scale" && isNaN(r))
    return n;
  if (t === "duration") {
    let i = r.match(/([0-9]+)ms/);
    if (i)
      return i[1];
  }
  return t === "origin" && ["top", "right", "left", "center", "bottom"].includes(e[e.indexOf(t) + 2]) ? [r, e[e.indexOf(t) + 2]].join(" ") : r;
}
var Ne = !1;
function fe(e, t = () => {
}) {
  return (...n) => Ne ? t(...n) : e(...n);
}
function mr(e, t) {
  t._x_dataStack || (t._x_dataStack = e._x_dataStack), Ne = !0, yr(() => {
    _r(t);
  }), Ne = !1;
}
function _r(e) {
  let t = !1;
  V(e, (r, i) => {
    F(r, (a, s) => {
      if (t && sr(a))
        return s();
      t = !0, i(a, s);
    });
  });
}
function yr(e) {
  let t = Y;
  st((n, r) => {
    let i = t(n);
    return le(i), () => {
    };
  }), e(), st(t);
}
function zt(e, t, n, r = []) {
  switch (e._x_bindings || (e._x_bindings = j({})), e._x_bindings[t] = n, t = r.includes("camel") ? Er(t) : t, t) {
    case "value":
      gr(e, n);
      break;
    case "style":
      vr(e, n);
      break;
    case "class":
      wr(e, n);
      break;
    default:
      Mr(e, t, n);
      break;
  }
}
function gr(e, t) {
  if (e.type === "radio")
    e.attributes.value === void 0 && (e.value = t), window.fromModel && (e.checked = ct(e.value, t));
  else if (e.type === "checkbox")
    Number.isInteger(t) ? e.value = t : !Number.isInteger(t) && !Array.isArray(t) && typeof t != "boolean" && ![null, void 0].includes(t) ? e.value = String(t) : Array.isArray(t) ? e.checked = t.some((n) => ct(n, e.value)) : e.checked = !!t;
  else if (e.tagName === "SELECT")
    xr(e, t);
  else {
    if (e.value === t)
      return;
    e.value = t;
  }
}
function wr(e, t) {
  e._x_undoAddedClasses && e._x_undoAddedClasses(), e._x_undoAddedClasses = Ze(e, t);
}
function vr(e, t) {
  e._x_undoAddedStyles && e._x_undoAddedStyles(), e._x_undoAddedStyles = de(e, t);
}
function Mr(e, t, n) {
  [null, void 0, !1].includes(n) && Sr(t) ? e.removeAttribute(t) : (qt(t) && (n = t), Cr(e, t, n));
}
function Cr(e, t, n) {
  e.getAttribute(t) != n && e.setAttribute(t, n);
}
function xr(e, t) {
  const n = [].concat(t).map((r) => r + "");
  Array.from(e.options).forEach((r) => {
    r.selected = n.includes(r.value);
  });
}
function Er(e) {
  return e.toLowerCase().replace(/-(\w)/g, (t, n) => n.toUpperCase());
}
function ct(e, t) {
  return e == t;
}
function qt(e) {
  return [
    "disabled",
    "checked",
    "required",
    "readonly",
    "hidden",
    "open",
    "selected",
    "autofocus",
    "itemscope",
    "multiple",
    "novalidate",
    "allowfullscreen",
    "allowpaymentrequest",
    "formnovalidate",
    "autoplay",
    "controls",
    "loop",
    "muted",
    "playsinline",
    "default",
    "ismap",
    "reversed",
    "async",
    "defer",
    "nomodule"
  ].includes(e);
}
function Sr(e) {
  return !["aria-pressed", "aria-checked", "aria-expanded", "aria-selected"].includes(e);
}
function Ar(e, t, n) {
  if (e._x_bindings && e._x_bindings[t] !== void 0)
    return e._x_bindings[t];
  let r = e.getAttribute(t);
  return r === null ? typeof n == "function" ? n() : n : r === "" ? !0 : qt(t) ? !![t, "true"].includes(r) : r;
}
function Ut(e, t) {
  var n;
  return function() {
    var r = this, i = arguments, a = function() {
      n = null, e.apply(r, i);
    };
    clearTimeout(n), n = setTimeout(a, t);
  };
}
function Jt(e, t) {
  let n;
  return function() {
    let r = this, i = arguments;
    n || (e.apply(r, i), n = !0, setTimeout(() => n = !1, t));
  };
}
function br(e) {
  e(X);
}
var k = {}, ut = !1;
function Pr(e, t) {
  if (ut || (k = j(k), ut = !0), t === void 0)
    return k[e];
  k[e] = t, typeof t == "object" && t !== null && t.hasOwnProperty("init") && typeof t.init == "function" && k[e].init(), xt(k[e]);
}
function Vr() {
  return k;
}
var Yt = {};
function Rr(e, t) {
  let n = typeof t != "function" ? () => t : t;
  e instanceof Element ? Qt(e, n()) : Yt[e] = n;
}
function kr(e) {
  return Object.entries(Yt).forEach(([t, n]) => {
    Object.defineProperty(e, t, {
      get() {
        return (...r) => n(...r);
      }
    });
  }), e;
}
function Qt(e, t, n) {
  let r = [];
  for (; r.length; )
    r.pop()();
  let i = Object.entries(t).map(([s, o]) => ({ name: s, value: o })), a = Vt(i);
  i = i.map((s) => a.find((o) => o.name === s.name) ? {
    name: `x-bind:${s.name}`,
    value: `"${s.value}"`
  } : s), Ue(e, i, n).map((s) => {
    r.push(s.runCleanups), s();
  });
}
var Zt = {};
function Tr(e, t) {
  Zt[e] = t;
}
function Or(e, t) {
  return Object.entries(Zt).forEach(([n, r]) => {
    Object.defineProperty(e, n, {
      get() {
        return (...i) => r.bind(t)(...i);
      },
      enumerable: !1
    });
  }), e;
}
var Lr = {
  get reactive() {
    return j;
  },
  get release() {
    return le;
  },
  get effect() {
    return Y;
  },
  get raw() {
    return mt;
  },
  version: "3.10.5",
  flushAndStopDeferringMutations: Kn,
  dontAutoEvaluateFunctions: Un,
  disableEffectScheduling: Fn,
  setReactivityEngine: Dn,
  closestDataStack: N,
  skipDuringClone: fe,
  addRootSelector: Wt,
  addInitSelector: Gt,
  addScopeToNode: Q,
  deferMutations: $n,
  mapAttributes: Je,
  evaluateLater: C,
  setEvaluator: Jn,
  mergeProxies: Z,
  findClosest: ue,
  closestRoot: ce,
  interceptor: Et,
  transition: Be,
  setStyles: de,
  mutateDom: v,
  directive: w,
  throttle: Jt,
  debounce: Ut,
  evaluate: B,
  initTree: V,
  nextTick: Nt,
  prefixed: W,
  prefix: Xn,
  plugin: br,
  magic: S,
  store: Pr,
  start: ar,
  clone: mr,
  bound: Ar,
  $data: Ct,
  data: Tr,
  bind: Rr
}, X = Lr;
function Fr(e, t) {
  const n = /* @__PURE__ */ Object.create(null), r = e.split(",");
  for (let i = 0; i < r.length; i++)
    n[r[i]] = !0;
  return t ? (i) => !!n[i.toLowerCase()] : (i) => !!n[i];
}
var Dr = Object.freeze({}), Xt = Object.assign, Br = Object.prototype.hasOwnProperty, he = (e, t) => Br.call(e, t), O = Array.isArray, U = (e) => en(e) === "[object Map]", Nr = (e) => typeof e == "string", Xe = (e) => typeof e == "symbol", pe = (e) => e !== null && typeof e == "object", Ir = Object.prototype.toString, en = (e) => Ir.call(e), tn = (e) => en(e).slice(8, -1), et = (e) => Nr(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, Hr = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (n) => t[n] || (t[n] = e(n));
}, jr = Hr((e) => e.charAt(0).toUpperCase() + e.slice(1)), nn = (e, t) => e !== t && (e === e || t === t), Ie = /* @__PURE__ */ new WeakMap(), $ = [], b, L = Symbol("iterate"), He = Symbol("Map key iterate");
function Wr(e) {
  return e && e._isEffect === !0;
}
function Gr(e, t = Dr) {
  Wr(e) && (e = e.raw);
  const n = zr(e, t);
  return t.lazy || n(), n;
}
function $r(e) {
  e.active && (rn(e), e.options.onStop && e.options.onStop(), e.active = !1);
}
var Kr = 0;
function zr(e, t) {
  const n = function() {
    if (!n.active)
      return e();
    if (!$.includes(n)) {
      rn(n);
      try {
        return Ur(), $.push(n), b = n, e();
      } finally {
        $.pop(), an(), b = $[$.length - 1];
      }
    }
  };
  return n.id = Kr++, n.allowRecurse = !!t.allowRecurse, n._isEffect = !0, n.active = !0, n.raw = e, n.deps = [], n.options = t, n;
}
function rn(e) {
  const { deps: t } = e;
  if (t.length) {
    for (let n = 0; n < t.length; n++)
      t[n].delete(e);
    t.length = 0;
  }
}
var H = !0, tt = [];
function qr() {
  tt.push(H), H = !1;
}
function Ur() {
  tt.push(H), H = !0;
}
function an() {
  const e = tt.pop();
  H = e === void 0 ? !0 : e;
}
function E(e, t, n) {
  if (!H || b === void 0)
    return;
  let r = Ie.get(e);
  r || Ie.set(e, r = /* @__PURE__ */ new Map());
  let i = r.get(n);
  i || r.set(n, i = /* @__PURE__ */ new Set()), i.has(b) || (i.add(b), b.deps.push(i), b.options.onTrack && b.options.onTrack({
    effect: b,
    target: e,
    type: t,
    key: n
  }));
}
function R(e, t, n, r, i, a) {
  const s = Ie.get(e);
  if (!s)
    return;
  const o = /* @__PURE__ */ new Set(), l = (d) => {
    d && d.forEach((f) => {
      (f !== b || f.allowRecurse) && o.add(f);
    });
  };
  if (t === "clear")
    s.forEach(l);
  else if (n === "length" && O(e))
    s.forEach((d, f) => {
      (f === "length" || f >= r) && l(d);
    });
  else
    switch (n !== void 0 && l(s.get(n)), t) {
      case "add":
        O(e) ? et(n) && l(s.get("length")) : (l(s.get(L)), U(e) && l(s.get(He)));
        break;
      case "delete":
        O(e) || (l(s.get(L)), U(e) && l(s.get(He)));
        break;
      case "set":
        U(e) && l(s.get(L));
        break;
    }
  const c = (d) => {
    d.options.onTrigger && d.options.onTrigger({
      effect: d,
      target: e,
      key: n,
      type: t,
      newValue: r,
      oldValue: i,
      oldTarget: a
    }), d.options.scheduler ? d.options.scheduler(d) : d();
  };
  o.forEach(c);
}
var Jr = /* @__PURE__ */ Fr("__proto__,__v_isRef,__isVue"), sn = new Set(Object.getOwnPropertyNames(Symbol).map((e) => Symbol[e]).filter(Xe)), Yr = /* @__PURE__ */ me(), Qr = /* @__PURE__ */ me(!1, !0), Zr = /* @__PURE__ */ me(!0), Xr = /* @__PURE__ */ me(!0, !0), oe = {};
["includes", "indexOf", "lastIndexOf"].forEach((e) => {
  const t = Array.prototype[e];
  oe[e] = function(...n) {
    const r = y(this);
    for (let a = 0, s = this.length; a < s; a++)
      E(r, "get", a + "");
    const i = t.apply(r, n);
    return i === -1 || i === !1 ? t.apply(r, n.map(y)) : i;
  };
});
["push", "pop", "shift", "unshift", "splice"].forEach((e) => {
  const t = Array.prototype[e];
  oe[e] = function(...n) {
    qr();
    const r = t.apply(this, n);
    return an(), r;
  };
});
function me(e = !1, t = !1) {
  return function(r, i, a) {
    if (i === "__v_isReactive")
      return !e;
    if (i === "__v_isReadonly")
      return e;
    if (i === "__v_raw" && a === (e ? t ? ci : Mn : t ? li : vn).get(r))
      return r;
    const s = O(r);
    if (!e && s && he(oe, i))
      return Reflect.get(oe, i, a);
    const o = Reflect.get(r, i, a);
    return (Xe(i) ? sn.has(i) : Jr(i)) || (e || E(r, "get", i), t) ? o : je(o) ? !s || !et(i) ? o.value : o : pe(o) ? e ? Cn(o) : at(o) : o;
  };
}
var ei = /* @__PURE__ */ on(), ti = /* @__PURE__ */ on(!0);
function on(e = !1) {
  return function(n, r, i, a) {
    let s = n[r];
    if (!e && (i = y(i), s = y(s), !O(n) && je(s) && !je(i)))
      return s.value = i, !0;
    const o = O(n) && et(r) ? Number(r) < n.length : he(n, r), l = Reflect.set(n, r, i, a);
    return n === y(a) && (o ? nn(i, s) && R(n, "set", r, i, s) : R(n, "add", r, i)), l;
  };
}
function ni(e, t) {
  const n = he(e, t), r = e[t], i = Reflect.deleteProperty(e, t);
  return i && n && R(e, "delete", t, void 0, r), i;
}
function ri(e, t) {
  const n = Reflect.has(e, t);
  return (!Xe(t) || !sn.has(t)) && E(e, "has", t), n;
}
function ii(e) {
  return E(e, "iterate", O(e) ? "length" : L), Reflect.ownKeys(e);
}
var ln = {
  get: Yr,
  set: ei,
  deleteProperty: ni,
  has: ri,
  ownKeys: ii
}, cn = {
  get: Zr,
  set(e, t) {
    return console.warn(`Set operation on key "${String(t)}" failed: target is readonly.`, e), !0;
  },
  deleteProperty(e, t) {
    return console.warn(`Delete operation on key "${String(t)}" failed: target is readonly.`, e), !0;
  }
};
Xt({}, ln, {
  get: Qr,
  set: ti
});
Xt({}, cn, {
  get: Xr
});
var nt = (e) => pe(e) ? at(e) : e, rt = (e) => pe(e) ? Cn(e) : e, it = (e) => e, _e = (e) => Reflect.getPrototypeOf(e);
function ye(e, t, n = !1, r = !1) {
  e = e.__v_raw;
  const i = y(e), a = y(t);
  t !== a && !n && E(i, "get", t), !n && E(i, "get", a);
  const { has: s } = _e(i), o = r ? it : n ? rt : nt;
  if (s.call(i, t))
    return o(e.get(t));
  if (s.call(i, a))
    return o(e.get(a));
  e !== i && e.get(t);
}
function ge(e, t = !1) {
  const n = this.__v_raw, r = y(n), i = y(e);
  return e !== i && !t && E(r, "has", e), !t && E(r, "has", i), e === i ? n.has(e) : n.has(e) || n.has(i);
}
function we(e, t = !1) {
  return e = e.__v_raw, !t && E(y(e), "iterate", L), Reflect.get(e, "size", e);
}
function un(e) {
  e = y(e);
  const t = y(this);
  return _e(t).has.call(t, e) || (t.add(e), R(t, "add", e, e)), this;
}
function dn(e, t) {
  t = y(t);
  const n = y(this), { has: r, get: i } = _e(n);
  let a = r.call(n, e);
  a ? wn(n, r, e) : (e = y(e), a = r.call(n, e));
  const s = i.call(n, e);
  return n.set(e, t), a ? nn(t, s) && R(n, "set", e, t, s) : R(n, "add", e, t), this;
}
function fn(e) {
  const t = y(this), { has: n, get: r } = _e(t);
  let i = n.call(t, e);
  i ? wn(t, n, e) : (e = y(e), i = n.call(t, e));
  const a = r ? r.call(t, e) : void 0, s = t.delete(e);
  return i && R(t, "delete", e, void 0, a), s;
}
function hn() {
  const e = y(this), t = e.size !== 0, n = U(e) ? new Map(e) : new Set(e), r = e.clear();
  return t && R(e, "clear", void 0, void 0, n), r;
}
function ve(e, t) {
  return function(r, i) {
    const a = this, s = a.__v_raw, o = y(s), l = t ? it : e ? rt : nt;
    return !e && E(o, "iterate", L), s.forEach((c, d) => r.call(i, l(c), l(d), a));
  };
}
function ne(e, t, n) {
  return function(...r) {
    const i = this.__v_raw, a = y(i), s = U(a), o = e === "entries" || e === Symbol.iterator && s, l = e === "keys" && s, c = i[e](...r), d = n ? it : t ? rt : nt;
    return !t && E(a, "iterate", l ? He : L), {
      next() {
        const { value: f, done: m } = c.next();
        return m ? { value: f, done: m } : {
          value: o ? [d(f[0]), d(f[1])] : d(f),
          done: m
        };
      },
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function P(e) {
  return function(...t) {
    {
      const n = t[0] ? `on key "${t[0]}" ` : "";
      console.warn(`${jr(e)} operation ${n}failed: target is readonly.`, y(this));
    }
    return e === "delete" ? !1 : this;
  };
}
var pn = {
  get(e) {
    return ye(this, e);
  },
  get size() {
    return we(this);
  },
  has: ge,
  add: un,
  set: dn,
  delete: fn,
  clear: hn,
  forEach: ve(!1, !1)
}, mn = {
  get(e) {
    return ye(this, e, !1, !0);
  },
  get size() {
    return we(this);
  },
  has: ge,
  add: un,
  set: dn,
  delete: fn,
  clear: hn,
  forEach: ve(!1, !0)
}, _n = {
  get(e) {
    return ye(this, e, !0);
  },
  get size() {
    return we(this, !0);
  },
  has(e) {
    return ge.call(this, e, !0);
  },
  add: P("add"),
  set: P("set"),
  delete: P("delete"),
  clear: P("clear"),
  forEach: ve(!0, !1)
}, yn = {
  get(e) {
    return ye(this, e, !0, !0);
  },
  get size() {
    return we(this, !0);
  },
  has(e) {
    return ge.call(this, e, !0);
  },
  add: P("add"),
  set: P("set"),
  delete: P("delete"),
  clear: P("clear"),
  forEach: ve(!0, !0)
}, ai = ["keys", "values", "entries", Symbol.iterator];
ai.forEach((e) => {
  pn[e] = ne(e, !1, !1), _n[e] = ne(e, !0, !1), mn[e] = ne(e, !1, !0), yn[e] = ne(e, !0, !0);
});
function gn(e, t) {
  const n = t ? e ? yn : mn : e ? _n : pn;
  return (r, i, a) => i === "__v_isReactive" ? !e : i === "__v_isReadonly" ? e : i === "__v_raw" ? r : Reflect.get(he(n, i) && i in r ? n : r, i, a);
}
var si = {
  get: gn(!1, !1)
}, oi = {
  get: gn(!0, !1)
};
function wn(e, t, n) {
  const r = y(n);
  if (r !== n && t.call(e, r)) {
    const i = tn(e);
    console.warn(`Reactive ${i} contains both the raw and reactive versions of the same object${i === "Map" ? " as keys" : ""}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`);
  }
}
var vn = /* @__PURE__ */ new WeakMap(), li = /* @__PURE__ */ new WeakMap(), Mn = /* @__PURE__ */ new WeakMap(), ci = /* @__PURE__ */ new WeakMap();
function ui(e) {
  switch (e) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function di(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : ui(tn(e));
}
function at(e) {
  return e && e.__v_isReadonly ? e : xn(e, !1, ln, si, vn);
}
function Cn(e) {
  return xn(e, !0, cn, oi, Mn);
}
function xn(e, t, n, r, i) {
  if (!pe(e))
    return console.warn(`value cannot be made reactive: ${String(e)}`), e;
  if (e.__v_raw && !(t && e.__v_isReactive))
    return e;
  const a = i.get(e);
  if (a)
    return a;
  const s = di(e);
  if (s === 0)
    return e;
  const o = new Proxy(e, s === 2 ? r : n);
  return i.set(e, o), o;
}
function y(e) {
  return e && y(e.__v_raw) || e;
}
function je(e) {
  return !!(e && e.__v_isRef === !0);
}
S("nextTick", () => Nt);
S("dispatch", (e) => q.bind(q, e));
S("watch", (e, { evaluateLater: t, effect: n }) => (r, i) => {
  let a = t(r), s = !0, o, l = n(() => a((c) => {
    JSON.stringify(c), s ? o = c : queueMicrotask(() => {
      i(c, o), o = c;
    }), s = !1;
  }));
  e._x_effects.delete(l);
});
S("store", Vr);
S("data", (e) => Ct(e));
S("root", (e) => ce(e));
S("refs", (e) => (e._x_refs_proxy || (e._x_refs_proxy = Z(fi(e))), e._x_refs_proxy));
function fi(e) {
  let t = [], n = e;
  for (; n; )
    n._x_refs && t.push(n._x_refs), n = n.parentNode;
  return t;
}
var Ee = {};
function En(e) {
  return Ee[e] || (Ee[e] = 0), ++Ee[e];
}
function hi(e, t) {
  return ue(e, (n) => {
    if (n._x_ids && n._x_ids[t])
      return !0;
  });
}
function pi(e, t) {
  e._x_ids || (e._x_ids = {}), e._x_ids[t] || (e._x_ids[t] = En(t));
}
S("id", (e) => (t, n = null) => {
  let r = hi(e, t), i = r ? r._x_ids[t] : En(t);
  return n ? `${t}-${i}-${n}` : `${t}-${i}`;
});
S("el", (e) => e);
Sn("Focus", "focus", "focus");
Sn("Persist", "persist", "persist");
function Sn(e, t, n) {
  S(t, (r) => I(`You can't use [$${directiveName}] without first installing the "${e}" plugin here: https://alpinejs.dev/plugins/${n}`, r));
}
w("modelable", (e, { expression: t }, { effect: n, evaluateLater: r }) => {
  let i = r(t), a = () => {
    let c;
    return i((d) => c = d), c;
  }, s = r(`${t} = __placeholder`), o = (c) => s(() => {
  }, { scope: { __placeholder: c } }), l = a();
  o(l), queueMicrotask(() => {
    if (!e._x_model)
      return;
    e._x_removeModelListeners.default();
    let c = e._x_model.get, d = e._x_model.set;
    n(() => o(c())), n(() => d(a()));
  });
});
w("teleport", (e, { expression: t }, { cleanup: n }) => {
  e.tagName.toLowerCase() !== "template" && I("x-teleport can only be used on a <template> tag", e);
  let r = document.querySelector(t);
  r || I(`Cannot find x-teleport element for selector: "${t}"`);
  let i = e.content.cloneNode(!0).firstElementChild;
  e._x_teleport = i, i._x_teleportBack = e, e._x_forwardEvents && e._x_forwardEvents.forEach((a) => {
    i.addEventListener(a, (s) => {
      s.stopPropagation(), e.dispatchEvent(new s.constructor(s.type, s));
    });
  }), Q(i, {}, e), v(() => {
    r.appendChild(i), V(i), i._x_ignore = !0;
  }), n(() => i.remove());
});
var An = () => {
};
An.inline = (e, { modifiers: t }, { cleanup: n }) => {
  t.includes("self") ? e._x_ignoreSelf = !0 : e._x_ignore = !0, n(() => {
    t.includes("self") ? delete e._x_ignoreSelf : delete e._x_ignore;
  });
};
w("ignore", An);
w("effect", (e, { expression: t }, { effect: n }) => n(C(e, t)));
function bn(e, t, n, r) {
  let i = e, a = (l) => r(l), s = {}, o = (l, c) => (d) => c(l, d);
  if (n.includes("dot") && (t = mi(t)), n.includes("camel") && (t = _i(t)), n.includes("passive") && (s.passive = !0), n.includes("capture") && (s.capture = !0), n.includes("window") && (i = window), n.includes("document") && (i = document), n.includes("prevent") && (a = o(a, (l, c) => {
    c.preventDefault(), l(c);
  })), n.includes("stop") && (a = o(a, (l, c) => {
    c.stopPropagation(), l(c);
  })), n.includes("self") && (a = o(a, (l, c) => {
    c.target === e && l(c);
  })), (n.includes("away") || n.includes("outside")) && (i = document, a = o(a, (l, c) => {
    e.contains(c.target) || c.target.isConnected !== !1 && (e.offsetWidth < 1 && e.offsetHeight < 1 || e._x_isShown !== !1 && l(c));
  })), n.includes("once") && (a = o(a, (l, c) => {
    l(c), i.removeEventListener(t, a, s);
  })), a = o(a, (l, c) => {
    gi(t) && wi(c, n) || l(c);
  }), n.includes("debounce")) {
    let l = n[n.indexOf("debounce") + 1] || "invalid-wait", c = We(l.split("ms")[0]) ? Number(l.split("ms")[0]) : 250;
    a = Ut(a, c);
  }
  if (n.includes("throttle")) {
    let l = n[n.indexOf("throttle") + 1] || "invalid-wait", c = We(l.split("ms")[0]) ? Number(l.split("ms")[0]) : 250;
    a = Jt(a, c);
  }
  return i.addEventListener(t, a, s), () => {
    i.removeEventListener(t, a, s);
  };
}
function mi(e) {
  return e.replace(/-/g, ".");
}
function _i(e) {
  return e.toLowerCase().replace(/-(\w)/g, (t, n) => n.toUpperCase());
}
function We(e) {
  return !Array.isArray(e) && !isNaN(e);
}
function yi(e) {
  return e.replace(/([a-z])([A-Z])/g, "$1-$2").replace(/[_\s]/, "-").toLowerCase();
}
function gi(e) {
  return ["keydown", "keyup"].includes(e);
}
function wi(e, t) {
  let n = t.filter((a) => !["window", "document", "prevent", "stop", "once"].includes(a));
  if (n.includes("debounce")) {
    let a = n.indexOf("debounce");
    n.splice(a, We((n[a + 1] || "invalid-wait").split("ms")[0]) ? 2 : 1);
  }
  if (n.length === 0 || n.length === 1 && dt(e.key).includes(n[0]))
    return !1;
  const i = ["ctrl", "shift", "alt", "meta", "cmd", "super"].filter((a) => n.includes(a));
  return n = n.filter((a) => !i.includes(a)), !(i.length > 0 && i.filter((s) => ((s === "cmd" || s === "super") && (s = "meta"), e[`${s}Key`])).length === i.length && dt(e.key).includes(n[0]));
}
function dt(e) {
  if (!e)
    return [];
  e = yi(e);
  let t = {
    ctrl: "control",
    slash: "/",
    space: "-",
    spacebar: "-",
    cmd: "meta",
    esc: "escape",
    up: "arrow-up",
    down: "arrow-down",
    left: "arrow-left",
    right: "arrow-right",
    period: ".",
    equal: "="
  };
  return t[e] = e, Object.keys(t).map((n) => {
    if (t[n] === e)
      return n;
  }).filter((n) => n);
}
w("model", (e, { modifiers: t, expression: n }, { effect: r, cleanup: i }) => {
  let a = C(e, n), s = `${n} = rightSideOfExpression($event, ${n})`, o = C(e, s);
  var l = e.tagName.toLowerCase() === "select" || ["checkbox", "radio"].includes(e.type) || t.includes("lazy") ? "change" : "input";
  let c = vi(e, t, n), d = bn(e, l, t, (m) => {
    o(() => {
    }, { scope: {
      $event: m,
      rightSideOfExpression: c
    } });
  });
  e._x_removeModelListeners || (e._x_removeModelListeners = {}), e._x_removeModelListeners.default = d, i(() => e._x_removeModelListeners.default());
  let f = C(e, `${n} = __placeholder`);
  e._x_model = {
    get() {
      let m;
      return a((g) => m = g), m;
    },
    set(m) {
      f(() => {
      }, { scope: { __placeholder: m } });
    }
  }, e._x_forceModelUpdate = () => {
    a((m) => {
      m === void 0 && n.match(/\./) && (m = ""), window.fromModel = !0, v(() => zt(e, "value", m)), delete window.fromModel;
    });
  }, r(() => {
    t.includes("unintrusive") && document.activeElement.isSameNode(e) || e._x_forceModelUpdate();
  });
});
function vi(e, t, n) {
  return e.type === "radio" && v(() => {
    e.hasAttribute("name") || e.setAttribute("name", n);
  }), (r, i) => v(() => {
    if (r instanceof CustomEvent && r.detail !== void 0)
      return r.detail || r.target.value;
    if (e.type === "checkbox")
      if (Array.isArray(i)) {
        let a = t.includes("number") ? Se(r.target.value) : r.target.value;
        return r.target.checked ? i.concat([a]) : i.filter((s) => !Mi(s, a));
      } else
        return r.target.checked;
    else {
      if (e.tagName.toLowerCase() === "select" && e.multiple)
        return t.includes("number") ? Array.from(r.target.selectedOptions).map((a) => {
          let s = a.value || a.text;
          return Se(s);
        }) : Array.from(r.target.selectedOptions).map((a) => a.value || a.text);
      {
        let a = r.target.value;
        return t.includes("number") ? Se(a) : t.includes("trim") ? a.trim() : a;
      }
    }
  });
}
function Se(e) {
  let t = e ? parseFloat(e) : null;
  return Ci(t) ? t : e;
}
function Mi(e, t) {
  return e == t;
}
function Ci(e) {
  return !Array.isArray(e) && !isNaN(e);
}
w("cloak", (e) => queueMicrotask(() => v(() => e.removeAttribute(W("cloak")))));
Gt(() => `[${W("init")}]`);
w("init", fe((e, { expression: t }, { evaluate: n }) => typeof t == "string" ? !!t.trim() && n(t, {}, !1) : n(t, {}, !1)));
w("text", (e, { expression: t }, { effect: n, evaluateLater: r }) => {
  let i = r(t);
  n(() => {
    i((a) => {
      v(() => {
        e.textContent = a;
      });
    });
  });
});
w("html", (e, { expression: t }, { effect: n, evaluateLater: r }) => {
  let i = r(t);
  n(() => {
    i((a) => {
      v(() => {
        e.innerHTML = a, e._x_ignoreSelf = !0, V(e), delete e._x_ignoreSelf;
      });
    });
  });
});
Je(Tt(":", Ot(W("bind:"))));
w("bind", (e, { value: t, modifiers: n, expression: r, original: i }, { effect: a }) => {
  if (!t) {
    let o = {};
    kr(o), C(e, r)((c) => {
      Qt(e, c, i);
    }, { scope: o });
    return;
  }
  if (t === "key")
    return xi(e, r);
  let s = C(e, r);
  a(() => s((o) => {
    o === void 0 && typeof r == "string" && r.match(/\./) && (o = ""), v(() => zt(e, t, o, n));
  }));
});
function xi(e, t) {
  e._x_keyExpression = t;
}
Wt(() => `[${W("data")}]`);
w("data", fe((e, { expression: t }, { cleanup: n }) => {
  t = t === "" ? "{}" : t;
  let r = {};
  ke(r, e);
  let i = {};
  Or(i, r);
  let a = B(e, t, { scope: i });
  a === void 0 && (a = {}), ke(a, e);
  let s = j(a);
  xt(s);
  let o = Q(e, s);
  s.init && B(e, s.init), n(() => {
    s.destroy && B(e, s.destroy), o();
  });
}));
w("show", (e, { modifiers: t, expression: n }, { effect: r }) => {
  let i = C(e, n);
  e._x_doHide || (e._x_doHide = () => {
    v(() => {
      e.style.setProperty("display", "none", t.includes("important") ? "important" : void 0);
    });
  }), e._x_doShow || (e._x_doShow = () => {
    v(() => {
      e.style.length === 1 && e.style.display === "none" ? e.removeAttribute("style") : e.style.removeProperty("display");
    });
  });
  let a = () => {
    e._x_doHide(), e._x_isShown = !1;
  }, s = () => {
    e._x_doShow(), e._x_isShown = !0;
  }, o = () => setTimeout(s), l = De((f) => f ? s() : a(), (f) => {
    typeof e._x_toggleAndCascadeWithTransitions == "function" ? e._x_toggleAndCascadeWithTransitions(e, f, s, a) : f ? o() : a();
  }), c, d = !0;
  r(() => i((f) => {
    !d && f === c || (t.includes("immediate") && (f ? o() : a()), l(f), c = f, d = !1);
  }));
});
w("for", (e, { expression: t }, { effect: n, cleanup: r }) => {
  let i = Si(t), a = C(e, i.items), s = C(e, e._x_keyExpression || "index");
  e._x_prevKeys = [], e._x_lookup = {}, n(() => Ei(e, i, a, s)), r(() => {
    Object.values(e._x_lookup).forEach((o) => o.remove()), delete e._x_prevKeys, delete e._x_lookup;
  });
});
function Ei(e, t, n, r) {
  let i = (s) => typeof s == "object" && !Array.isArray(s), a = e;
  n((s) => {
    Ai(s) && s >= 0 && (s = Array.from(Array(s).keys(), (u) => u + 1)), s === void 0 && (s = []);
    let o = e._x_lookup, l = e._x_prevKeys, c = [], d = [];
    if (i(s))
      s = Object.entries(s).map(([u, p]) => {
        let _ = ft(t, p, u, s);
        r((M) => d.push(M), { scope: { index: u, ..._ } }), c.push(_);
      });
    else
      for (let u = 0; u < s.length; u++) {
        let p = ft(t, s[u], u, s);
        r((_) => d.push(_), { scope: { index: u, ...p } }), c.push(p);
      }
    let f = [], m = [], g = [], A = [];
    for (let u = 0; u < l.length; u++) {
      let p = l[u];
      d.indexOf(p) === -1 && g.push(p);
    }
    l = l.filter((u) => !g.includes(u));
    let h = "template";
    for (let u = 0; u < d.length; u++) {
      let p = d[u], _ = l.indexOf(p);
      if (_ === -1)
        l.splice(u, 0, p), f.push([h, u]);
      else if (_ !== u) {
        let M = l.splice(u, 1)[0], x = l.splice(_ - 1, 1)[0];
        l.splice(u, 0, x), l.splice(_, 0, M), m.push([M, x]);
      } else
        A.push(p);
      h = p;
    }
    for (let u = 0; u < g.length; u++) {
      let p = g[u];
      o[p]._x_effects && o[p]._x_effects.forEach(pt), o[p].remove(), o[p] = null, delete o[p];
    }
    for (let u = 0; u < m.length; u++) {
      let [p, _] = m[u], M = o[p], x = o[_], D = document.createElement("div");
      v(() => {
        x.after(D), M.after(x), x._x_currentIfEl && x.after(x._x_currentIfEl), D.before(M), M._x_currentIfEl && M.after(M._x_currentIfEl), D.remove();
      }), ot(x, c[d.indexOf(_)]);
    }
    for (let u = 0; u < f.length; u++) {
      let [p, _] = f[u], M = p === "template" ? a : o[p];
      M._x_currentIfEl && (M = M._x_currentIfEl);
      let x = c[_], D = d[_], ee = document.importNode(a.content, !0).firstElementChild;
      Q(ee, j(x), a), v(() => {
        M.after(ee), V(ee);
      }), typeof D == "object" && I("x-for key cannot be an object, it must be a string or an integer", a), o[D] = ee;
    }
    for (let u = 0; u < A.length; u++)
      ot(o[A[u]], c[d.indexOf(A[u])]);
    a._x_prevKeys = d;
  });
}
function Si(e) {
  let t = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/, n = /^\s*\(|\)\s*$/g, r = /([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/, i = e.match(r);
  if (!i)
    return;
  let a = {};
  a.items = i[2].trim();
  let s = i[1].replace(n, "").trim(), o = s.match(t);
  return o ? (a.item = s.replace(t, "").trim(), a.index = o[1].trim(), o[2] && (a.collection = o[2].trim())) : a.item = s, a;
}
function ft(e, t, n, r) {
  let i = {};
  return /^\[.*\]$/.test(e.item) && Array.isArray(t) ? e.item.replace("[", "").replace("]", "").split(",").map((s) => s.trim()).forEach((s, o) => {
    i[s] = t[o];
  }) : /^\{.*\}$/.test(e.item) && !Array.isArray(t) && typeof t == "object" ? e.item.replace("{", "").replace("}", "").split(",").map((s) => s.trim()).forEach((s) => {
    i[s] = t[s];
  }) : i[e.item] = t, e.index && (i[e.index] = n), e.collection && (i[e.collection] = r), i;
}
function Ai(e) {
  return !Array.isArray(e) && !isNaN(e);
}
function Pn() {
}
Pn.inline = (e, { expression: t }, { cleanup: n }) => {
  let r = ce(e);
  r._x_refs || (r._x_refs = {}), r._x_refs[t] = e, n(() => delete r._x_refs[t]);
};
w("ref", Pn);
w("if", (e, { expression: t }, { effect: n, cleanup: r }) => {
  let i = C(e, t), a = () => {
    if (e._x_currentIfEl)
      return e._x_currentIfEl;
    let o = e.content.cloneNode(!0).firstElementChild;
    return Q(o, {}, e), v(() => {
      e.after(o), V(o);
    }), e._x_currentIfEl = o, e._x_undoIf = () => {
      F(o, (l) => {
        l._x_effects && l._x_effects.forEach(pt);
      }), o.remove(), delete e._x_currentIfEl;
    }, o;
  }, s = () => {
    e._x_undoIf && (e._x_undoIf(), delete e._x_undoIf);
  };
  n(() => i((o) => {
    o ? a() : s();
  })), r(() => e._x_undoIf && e._x_undoIf());
});
w("id", (e, { expression: t }, { evaluate: n }) => {
  n(t).forEach((i) => pi(e, i));
});
Je(Tt("@", Ot(W("on:"))));
w("on", fe((e, { value: t, modifiers: n, expression: r }, { cleanup: i }) => {
  let a = r ? C(e, r) : () => {
  };
  e.tagName.toLowerCase() === "template" && (e._x_forwardEvents || (e._x_forwardEvents = []), e._x_forwardEvents.includes(t) || e._x_forwardEvents.push(t));
  let s = bn(e, t, n, (o) => {
    a(() => {
    }, { scope: { $event: o }, params: [o] });
  });
  i(() => s());
}));
Me("Collapse", "collapse", "collapse");
Me("Intersect", "intersect", "intersect");
Me("Focus", "trap", "focus");
Me("Mask", "mask", "mask");
function Me(e, t, n) {
  w(t, (r) => I(`You can't use [x-${t}] without first installing the "${e}" plugin here: https://alpinejs.dev/plugins/${n}`, r));
}
X.setEvaluator(bt);
X.setReactivityEngine({ reactive: at, effect: Gr, release: $r, raw: y });
var bi = X, Gi = bi;
function $i(e) {
  return {
    /**
     * Create, register, and return a reference to a global Alpine.Store.
     * @param {string} key - Descriptive key for the Alpine.Store registry.
     * @param {object} data - Initial data for the store.
     * @returns {unknown} Reference to the registered store.
     */
    createStore(t, n) {
      return e.store(t, n), e.store(t);
    }
  };
}
function Ki(e, t) {
  return {
    /**
     * Tracks an event with FullStory.
     * @param {string} eventName - The name of the event to track.
     * @param {object} eventProperties - The properties to include in the tracked event.
     * @returns {void}
     */
    track(n, r = {}) {
      try {
        e && e.event(n, {
          ...this._defaultTrackingProperties,
          ...r
        });
      } catch (i) {
        console.log(i);
      }
    },
    /**
     * Getter for an object with the default properties to be included in tracked events.
     * Includes address, estimate, and contact details, as well as active experiment variations.
     * @returns {object} An object with the default event properties.
     */
    get _defaultTrackingProperties() {
      let n = {};
      if (t.addressViewModel.hasParcelDetails) {
        const r = {
          address_str: t.addressViewModel.parcelDetails.address,
          address_city_str: t.addressViewModel.parcelDetails.city,
          address_state_str: t.addressViewModel.parcelDetails.state,
          address_zip_str: t.addressViewModel.parcelDetails.zip,
          parcel_apn_str: t.addressViewModel.parcelDetails.apn,
          parcel_jurisdiction_str: t.addressViewModel.parcelDetails.jurisdiction
        };
        n = {
          ...n,
          ...r
        };
      } else if (t.addressViewModel.selectedMatch) {
        const r = {
          address_str: t.addressViewModel.selectedMatch.address,
          address_context_str: t.addressViewModel.selectedMatch.context,
          regrid_ll_uuid_str: t.addressViewModel.selectedMatch.ll_uuid
        };
        n = {
          ...n,
          ...r
        };
      }
      if (t.estimateViewModel.hasEstimateResults) {
        const r = {
          jurisdiction_status_str: t.estimateViewModel.jurisdiction.status,
          estimate_low_real: t.estimateViewModel.estimate.low,
          estimate_high_real: t.estimateViewModel.estimate.high
        };
        n = {
          ...n,
          ...r
        };
      }
      if (t.contactViewModel.hasAnyContactDetails) {
        const r = {
          contact_first_name_str: t.contactViewModel.firstName,
          contact_last_name_str: t.contactViewModel.lastName,
          contact_email_str: t.contactViewModel.email,
          contact_phone_str: t.contactViewModel.phone,
          contact_desired_timeline_str: t.contactViewModel.desiredTimeline
        };
        n = {
          ...n,
          ...r
        };
      }
      return n.active_experiment_variations_strs = Object.entries(
        t.experimentationViewModel.activeExperimentVariations
      ).map(([r, i]) => `${r}:${i}`), n;
    }
  };
}
function zi(e, t, n) {
  let r = n;
  return (!r || !(e != null && e.states[r])) && (r = e == null ? void 0 : e.defaultState), {
    value: r,
    /**
     * Transition to a new state, based on the current state and a valid transition event.
     * @param {string} event - Event to trigger the desired state transition.
     * @returns {void}
     */
    transition(i) {
      var g, A, h, u, p, _;
      const a = this.value, s = (g = e == null ? void 0 : e.states) == null ? void 0 : g[a], o = (A = s == null ? void 0 : s.transitions) == null ? void 0 : A[i], l = o == null ? void 0 : o.target, c = (h = e == null ? void 0 : e.states) == null ? void 0 : h[l];
      if (!s || !o || !l || !c) {
        t.track("Invalid State Transition", {
          current_state_str: a,
          event_str: i
        });
        return;
      }
      const d = (u = s.effects) == null ? void 0 : u.onExit;
      Ae(d);
      const f = (p = o.effects) == null ? void 0 : p.onTransition;
      Ae(f), this.value = l;
      const m = (_ = c.effects) == null ? void 0 : _.onEntry;
      Ae(m);
    }
  };
}
function Ae(e) {
  e && e.length && e.forEach((t) => {
    t();
  });
}
const Pi = "https://app.regrid.com/api/v1/typeahead.json", Vi = "https://app.regrid.com/api/v1/parcel/", Vn = "eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJyZWdyaWQuY29tIiwiaWF0IjoxNzIyNDQyMTU0LCJnIjo1NDA4OSwidCI6MSwiY2FwIjoicGE6dHkiLCJ0aSI6ODJ9.7c30coXkbffieawauRttlK0mC_uBhrzWdNPLtRCzXA8";
async function Ri(e) {
  const t = Pi, n = Vn, r = new Request(`${t}/?token=${n}&query=${e}`, {
    method: "GET"
  }), i = await fetch(r);
  if (!i.ok)
    throw new Error("Network response was not OK");
  const a = await i.json();
  return ki(a);
}
function ki(e) {
  return e.filter((r) => r.ll_uuid && r.address && r.address.match(/^[0-9].*[^0-9]$/)).sort((r, i) => {
    const a = Ti(r, i);
    return a != 0 ? a : Oi(r, i);
  }).slice(0, 10);
}
function Ti(e, t) {
  return re(e) && !re(t) ? -1 : !re(e) && re(t) ? 1 : 0;
}
function re(e) {
  return e.context.endsWith("CA");
}
function Oi(e, t) {
  return e.score > t.score ? -1 : e.score < t.score ? 1 : 0;
}
async function Li(e) {
  const t = Vi, n = Vn, r = new Request(
    `${t}${e}.json?token=${n}&return_custom=false`,
    {
      method: "GET"
    }
  ), i = await fetch(r);
  if (!i.ok)
    throw new Error("Network response was not OK");
  const a = await i.json();
  return Fi(a);
}
function Fi(e) {
  const t = e.results[0].properties.fields;
  return {
    apn: t.parcelnumb,
    jurisdiction: t.county,
    zip: t.szip
  };
}
async function Di(e) {
  const t = new Request(
    "https://hook.us1.make.com/t9mrl5xiqcub1netw5sk7l1vjgoz3gt9",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(e)
    }
  ), n = await fetch(t);
  if (!n.ok)
    throw new Error("Network response was not OK");
  return await n.json();
}
async function Bi(e) {
  const t = new Request(
    "https://hook.us1.make.com/7pyo51sq4xxjbpz14t03uomufndj45ut",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(e)
    }
  );
  if (!(await fetch(t)).ok)
    throw new Error("Network response was not OK");
}
function Ni(e) {
  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(e);
}
function Ii(e) {
  const t = e.replace(/\D/g, ""), n = t.startsWith("1"), a = (n ? t.slice(1) : t).slice(0, 10).match(
    /^(\d{0,3})(\d{0,3})(\d{0,4})$/
  ), s = n ? "1" : "", o = a[1] ? (n ? " " : "") + ("(" + a[1]) : "", l = a[2] ? ") " + a[2] : "", c = a[3] ? "-" + a[3] : "";
  return s + o + l + c;
}
function Hi(e) {
  return /^\+?1?\s?(\()?\d{3}(\))?[-.\s]?\d{3}[-.\s]?\d{4}$|^\d{10}$/.test(e);
}
async function ht(e, t = {}) {
  return new Promise(function(n, r) {
    const i = document.createElement("script");
    i.src = e, t.defer ? i.defer = !0 : t.async && (i.async = !0), i.addEventListener("load", function() {
      n();
    }), i.addEventListener("error", function(a) {
      r(a);
    }), document.body.appendChild(i);
  });
}
function qi(e, t) {
  const n = {
    SUBMIT_ADDRESS: {
      target: "addressFormProcessing",
      effects: {
        onTransition: [
          () => {
            t == null || t.track("Address Submitted");
          }
        ]
      }
    }
  }, r = {
    SUBMIT_ADDRESS: {
      target: "modalAddressFormProcessing",
      effects: {
        onTransition: [
          () => {
            t == null || t.track("Address Submitted");
          }
        ]
      }
    }
  }, i = {
    SUCCESS: {
      target: "contactForm",
      effects: {
        onTransition: [
          () => {
            t.track("Address Submission Succeeded");
          }
        ]
      }
    },
    NON_BLOCKING_ERROR: {
      target: "contactForm",
      effects: {
        onTransition: [
          () => {
            t.track(
              "Address Submission Completed with Non-Blocking Error"
            );
          }
        ]
      }
    },
    SKIP_CONTACT: {
      target: "estimateResults",
      effects: {
        onTransition: [
          () => {
            t.track(
              "Address Submission Completed with Contact Form Skipped"
            );
          }
        ]
      }
    }
  }, a = {
    onEntry: [s]
  };
  async function s() {
    try {
      if (e.addressViewModel.hasParcelDetails && e.estimateViewModel.hasResults && e.contactViewModel.isSubmitted)
        e.flowState.transition("SKIP_CONTACT");
      else {
        if (e.addressViewModel.hasParcelDetails || (e.addressViewModel.parcelDetails = {
          ...await Li(
            e.addressViewModel.selectedMatch.ll_uuid
          ),
          address: e.addressViewModel.selectedMatch.address,
          city: e.addressViewModel.selectedMatch.context.split(
            ", "
          )[0],
          state: e.addressViewModel.selectedMatch.context.split(", ")[1]
        }), !e.estimateViewModel.hasResults) {
          const h = {
            ...e.addressViewModel.options,
            parcel: {
              apn: e.addressViewModel.parcelDetails.apn,
              jurisdiction: e.addressViewModel.parcelDetails.jurisdiction
            },
            address: {
              address: e.addressViewModel.parcelDetails.address,
              city: e.addressViewModel.parcelDetails.city,
              state: e.addressViewModel.parcelDetails.state,
              zip: e.addressViewModel.parcelDetails.zip
            }
          }, u = await Di(h);
          e.estimateViewModel.jurisdiction = u.jurisdiction, e.estimateViewModel.estimate = u.estimate;
        }
        e.flowState.transition("SUCCESS");
      }
    } catch {
      e.flowState.transition("NON_BLOCKING_ERROR");
    }
  }
  const o = {
    SUBMIT_CONTACT: {
      target: "contactFormProcessing",
      effects: {
        onTransition: [
          () => {
            t == null || t.track("Contact Submitted");
          }
        ]
      }
    }
  }, l = {
    onEntry: [c]
  };
  async function c() {
    if (e.estimateViewModel.hasActiveJurisdiction && e.estimateViewModel.hasEstimate && e.contactViewModel.options && e.contactViewModel.options.lead && e.contactViewModel.options.lead.type && e.contactViewModel.options.lead.type === "Windfall") {
      const h = "windfall-estimate-or-eligibility-2023-07", u = Math.random() < 0.5 ? "amount-excluded" : "amount-included";
      e.experimentationViewModel.setActiveExperimentVariation(
        h,
        u
      );
    }
    try {
      let h = {
        firstName: e.contactViewModel.firstName.trim(),
        lastName: e.contactViewModel.lastName.trim(),
        email: e.contactViewModel.email.trim(),
        phone: e.contactViewModel.phone.trim(),
        desiredTimeline: e.contactViewModel.desiredTimeline.trim()
      };
      if (!Ni(h.email))
        throw new Error("Please enter a valid email address, and try again.", {
          cause: "INVALID_EMAIL"
        });
      if (!Hi(h.phone))
        throw new Error(
          "Please enter a valid phone number, including area code, and try again.",
          { cause: "INVALID_PHONE" }
        );
      e.addressViewModel.hasParcelDetails ? h = {
        ...h,
        ...e.addressViewModel.parcelDetails
      } : e.addressViewModel.isSelected && (h = {
        ...h,
        address: [
          e.addressViewModel.selectedMatch.address,
          e.addressViewModel.selectedMatch.context
        ].join(", ")
      });
      const u = {
        ...e.contactViewModel.options,
        contact: h,
        activeExperimentVariations: e.experimentationViewModel.activeExperimentVariations
      };
      await Promise.all([
        d(e.contactViewModel),
        Bi(u)
      ]), e.contactViewModel.isSubmitted = !0, e.flowState.transition("SUCCESS");
    } catch (h) {
      console.log("Error submitting contact:", h), h && h.cause && (h.cause === "INVALID_EMAIL" || h.cause === "INVALID_PHONE") ? e.contactViewModel.errorMessage = h.message : e.contactViewModel.errorMessage = "There was an error processing your info. Please try again, or contact us for help.", e.flowState.transition("ERROR");
    }
  }
  async function d(h) {
    const u = [
      "Checking flood zones...",
      "Checking fire hazard zones...",
      "Checking zoning district...",
      "Checking lot shape & size..."
    ];
    for (const p of u)
      h.lotAnalysisStep = p, await new Promise((_) => {
        setTimeout(_, 1500);
      });
  }
  const f = {
    onEntry: [m]
  };
  async function m() {
    if (e.estimateViewModel.hasActiveJurisdiction && e.estimateViewModel.hasEstimate) {
      await ht(
        "https://cdn.jsdelivr.net/npm/tsparticles-confetti@2.11.0/tsparticles.confetti.bundle.min.js",
        { async: !0 }
      );
      const h = e.contactViewModel.options && e.contactViewModel.options.lead && e.contactViewModel.options.lead.type && e.contactViewModel.options.lead.type === "webuyCAlots" ? ["ffffff", "#1c429c", "#f0bd1b"] : ["#ffffff", "#4cbd98", "#346af8"];
      setTimeout(() => {
        window.confetti("tsparticles", {
          angle: 270,
          count: 90,
          position: {
            x: 50,
            y: -5
          },
          spread: 180,
          startVelocity: 10,
          ticks: 200,
          colors: h,
          zIndex: 9999,
          disableForReducedMotion: !0
        });
      }, 500);
    }
    (!e.estimateViewModel.hasResults || e.estimateViewModel.hasActiveJurisdiction) && ht("https://assets.calendly.com/assets/external/widget.js", {
      async: !0
    });
  }
  const g = {
    EXIT: {
      target: "default"
    }
  };
  return {
    defaultState: "default",
    states: {
      default: {
        transitions: {
          ...n,
          START_MODAL_FLOW: {
            target: "modalAddressForm"
          }
        }
      },
      addressFormProcessing: {
        transitions: {
          ...i,
          ERROR: {
            target: "addressFormError",
            effects: {
              onTransition: [
                () => {
                  t.track("Address Form Error (Blocking)");
                }
              ]
            }
          }
        },
        effects: a
      },
      addressFormError: {
        transitions: {
          ...n
        },
        effects: {
          onExit: [
            () => {
              e.addressViewModel.errorMessage = "";
            }
          ]
        }
      },
      modalAddressForm: {
        transitions: {
          ...r,
          ...g
        }
      },
      modalAddressFormProcessing: {
        transitions: {
          ...i,
          ERROR: {
            target: "modalAddressFormError",
            effects: {
              onTransition: [
                () => {
                  t.track("Address Form Error (Blocking)");
                }
              ]
            }
          },
          ...g
        },
        effects: a
      },
      modalAddressFormError: {
        transitions: {
          ...r,
          ...g
        },
        effects: {
          onExit: [
            () => {
              e.addressViewModel.errorMessage = "";
            }
          ]
        }
      },
      contactForm: {
        transitions: {
          ...o,
          ...g
        }
      },
      contactFormProcessing: {
        transitions: {
          SUCCESS: {
            target: "estimateResults",
            effects: {
              onTransition: [
                () => {
                  t.track("Contact Submission Succeeded");
                }
              ]
            }
          },
          ERROR: {
            target: "contactFormError",
            effects: {
              onTransition: [
                () => {
                  t.track("Contact Submission Failed", {
                    error_str: e.contactViewModel.errorMessage
                  });
                }
              ]
            }
          },
          ...g
        },
        effects: l
      },
      contactFormError: {
        transitions: {
          ...o,
          ...g
        },
        effects: {
          onExit: [
            () => {
              e.contactViewModel.errorMessage = "";
            }
          ]
        }
      },
      estimateResults: {
        transitions: {
          SCHEDULE: {
            target: "scheduleConsultation",
            effects: {
              onTransition: [
                () => {
                  t.track("Schedule Consultation Clicked");
                }
              ]
            }
          },
          REQUEST_COMMUNITY: {
            target: "requestedCommunity",
            effects: {
              onTransition: [
                () => {
                  t.track("Community Requested");
                }
              ]
            }
          },
          ...g
        },
        effects: f
      },
      scheduleConsultation: {
        transitions: {
          ...g
        }
      },
      requestedCommunity: {
        transitions: {
          ...g
        }
      }
    }
  };
}
function Ui(e, t) {
  return {
    // Instance properties
    inputValue: "",
    matches: [],
    keyboardNavIndex: -1,
    selectedMatch: {},
    parcelDetails: {},
    options: {},
    submitButtonText: {
      normal: "Get Offer",
      processing: "Getting Offer..."
    },
    errorMessage: "",
    /**
     * Initializes the AddressViewModel instance properties.
     * Run automatically by Alpine, but can also be called manually to reset the view model state.
     * Need to call this manually on store creation if we stop using Alpine as our UI library.
     * @returns {void}
     */
    init() {
      this.inputValue = "", this.matches = [], this.keyboardNavIndex = -1, this.selectedMatch = {}, this.parcelDetails = {}, this.options = {}, this.errorMessage = "";
      const n = document.getElementById(
        "address-form-submit-button"
      );
      this.submitButtonText = {
        normal: n.value,
        processing: n.dataset.wait
      };
    },
    /**
     * Whether or not an address match has been selected with the typeahead.
     * @type {boolean}
     */
    get isSelected() {
      return Object.keys(this.selectedMatch).length != 0 && !!this.selectedMatch.ll_uuid;
    },
    /**
     * Whether or not the parcel details (jurisdiction and apn) have been set for the address.
     * @type {boolean}
     */
    get hasParcelDetails() {
      return Object.keys(this.parcelDetails).length != 0 && !!this.parcelDetails.jurisdiction && !!this.parcelDetails.apn;
    },
    /**
     * Handles input events from the address typeahead input field.
     * Fetches and updates address matches based on the current input value.
     * @returns {Promise.<void>} Promise that resolves when input handling is complete.
     */
    async handleInput() {
      this.isSelected && (this.selectedMatch = {}), this.hasParcelDetails && (this.parcelDetails = {}), e.estimateViewModel.hasResults && e.estimateViewModel.init(), e.contactViewModel.isSubmitted && (e.contactViewModel.isSubmitted = !1), e.experimentationViewModel.getActiveExperimentVariation(
        "windfall-estimate-or-eligibility-2023-07"
      ) && e.experimentationViewModel.clearActiveExperiment(
        "windfall-estimate-or-eligibility-2023-07"
      );
      try {
        this.matches = await Ri(this.inputValue);
      } catch {
        this.errorMessage = "There was an error finding your address. Please try again, or contact us for help.", e.flowState.transition("ERROR");
      }
    },
    /**
     * Handles keyboard events for the address typeahead input field.
     * Navigates up or down the list of matches if ArrowUp or ArrowDown are pressed.
     * Selects the address at the current keyboardNavIndex if Enter is pressed.
     * @param {KeyboardEvent} event - Keyboard event object.
     * @returns {void}
     */
    handleKeydown(n) {
      n.key != "Enter" && n.key != "ArrowUp" && n.key != "ArrowDown" || this.isSelected || this.matches.length === 0 || (n.preventDefault(), n.stopPropagation(), n.key === "Enter" && this.keyboardNavIndex != -1 ? this.handleMatchSelection(this.matches[this.keyboardNavIndex]) : n.key === "ArrowUp" ? this.keyboardNavIndex = this.keyboardNavIndex <= -1 ? this.matches.length - 1 : this.keyboardNavIndex - 1 : n.key === "ArrowDown" && (this.keyboardNavIndex = this.keyboardNavIndex >= this.matches.length - 1 ? -1 : this.keyboardNavIndex + 1));
    },
    /**
     * Handles the selection of an address match from the list of available matches.
     * Updates the selected address and typeahead input value.
     * Clears the matches list and keyboard navigation index.
     * @param {unknown} match
     */
    handleMatchSelection(n) {
      this.selectedMatch = n, this.inputValue = n.address + ", " + n.context, this.matches = [], this.keyboardNavIndex = -1, t.track("Address Selected");
    },
    /**
     * Handles the submission event for the address typeahead form.
     * @param {SubmitEvent} event - Form submission event object.
     * @param {object} options - Additional options for the submission.
     * @returns {void}
     */
    handleSubmit(n, r = {}) {
      n.preventDefault(), n.stopPropagation(), this.options = r, e.flowState.transition("SUBMIT_ADDRESS");
    }
  };
}
function Ji(e) {
  return {
    // Instance properties
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    desiredTimeline: "",
    options: {},
    submitButtonText: {
      normal: "Get Estimate",
      processing: "Getting Estimate..."
    },
    isSubmitted: !1,
    lotAnalysisStep: "Checking...",
    errorMessage: "",
    /**
     * Initializes the ContactViewModel instance properties.
     * Run automatically by Alpine, but can also be called manually to reset the view model state.
     * Need to call this manually on store creation if we stop using Alpine as our UI library.
     * @returns {void}
     */
    init() {
      this.firstName = "", this.lastName = "", this.email = "", this.phone = "", this.desiredTimeline = "", this.options = {}, this.isSubmitted = !1, this.lotAnalysisStep = "Checking...", this.errorMessage = "";
      const t = document.getElementById(
        "contact-form-submit-button"
      );
      this.submitButtonText = {
        normal: t.value,
        processing: t.dataset.wait
      };
    },
    /**
     * Whether or not any contact details have been added.
     * @type {boolean}
     */
    get hasAnyContactDetails() {
      return !!this.firstName.trim() || !!this.lastName.trim() || !!this.email.trim() || !!this.phone.trim();
    },
    formatPhoneInput(t) {
      return Ii(t);
    },
    /**
     * Handles the submission event for the contact form.
     * @param {SubmitEvent} event - Form submission event object.
     * @param {object} options - Additional options for the submission.
     * @returns {void}
     */
    handleSubmit(t, n = {}) {
      t.preventDefault(), t.stopPropagation(), this.options = n, e.transition("SUBMIT_CONTACT");
    }
  };
}
function Yi(e) {
  return {
    // Instance properties
    jurisdiction: {
      status: ""
    },
    estimate: {
      low: null,
      high: null
    },
    /**
     * Initializes the EstimateViewModel instance properties.
     * Run automatically by Alpine, but can also be called manually to reset the view model state.
     * Need to call this manually on store creation if we stop using Alpine as our UI library.
     * @returns {void}
     */
    init() {
      this.jurisdiction = {
        status: ""
      }, this.estimate = {
        low: null,
        high: null
      };
    },
    /**
     * Whether or not estimate results have already been retrieved.
     * @type {boolean}
     */
    get hasResults() {
      return !!this.jurisdiction.status;
    },
    /**
     * Whether or not the current address / parcel jurisdiction is actively supported.
     * @type {boolean}
     */
    get hasActiveJurisdiction() {
      return this.jurisdiction.status == "active";
    },
    /**
     * Whether or not there is currently a valid estimate with high and low values.
     * @type {boolean}
     */
    get hasEstimate() {
      return !!this.estimate.low && !!this.estimate.high;
    },
    /**
     * Low estimate value, converted to a USD currency formatted string.
     * @type {string}
     */
    get lowEstimateString() {
      return new Intl.NumberFormat(void 0, {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0
      }).format(Math.round(this.estimate.low));
    },
    /**
     * High estimate value, converted to a USD currency formatted string.
     * @type {string}
     */
    get highEstimateString() {
      return new Intl.NumberFormat(void 0, {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0
      }).format(Math.round(this.estimate.high));
    },
    /**
     * Handles click events for the Schedule Consultation button.
     * Transitions the flow state based on the desired behavior for this action.
     * @param {MouseEvent} event - Mouse event (click) object.
     * @returns {void}
     */
    handleScheduleConsultationClick(t) {
      t.preventDefault(), t.stopPropagation(), e.transition("SCHEDULE");
    },
    /**
     * Handles click events for the Request Community button.
     * Transitions the flow state based on the desired behavior for this action.
     * @param {MouseEvent} event - Mouse event (click) object.
     * @returns {void}
     */
    handleRequestCommunityClick(t) {
      t.preventDefault(), t.stopPropagation(), e.transition("REQUEST_COMMUNITY");
    }
  };
}
function Qi() {
  return {
    userGeo: {},
    marketsData: {},
    get market() {
      return Rn(this.userGeo.city, this.marketsData);
    },
    get bcPhoneNumber() {
      return ji(this.userGeo.city, this.marketsData);
    },
    get bcPhoneNumberHref() {
      return `tel:+1${this.bcPhoneNumber.replace(/\D/g, "")}`;
    },
    async init() {
      this.marketsData = {
        Sacramento: {
          bcPhoneNumber: "(916) 619-1442",
          cities: [
            "Alta",
            "Auburn",
            "Carnelian Bay",
            "Cedar Flat",
            "Colfax",
            "Dollar Point",
            "Dutch Flat",
            "Foresthill",
            "Granite Bay",
            "Kings Beach",
            "Kingvale",
            "Lincoln",
            "Loomis",
            "Meadow Vista",
            "Newcastle",
            "North Auburn",
            "Penryn",
            "Rocklin",
            "Roseville",
            "Sheridan",
            "Sunnyside-Tahoe City",
            "Tahoe Vista",
            "Tahoma",
            "Truckee",
            "Antelope",
            "Arden-Arcade",
            "Carmichael",
            "Citrus Heights",
            "Clay",
            "Courtland",
            "Elk Grove",
            "Elverta",
            "Fair Oaks",
            "Florin",
            "Folsom",
            "Foothill Farms",
            "Franklin",
            "Freeport",
            "Fruitridge Pocket",
            "Galt",
            "Gold River",
            "Herald",
            "Hood",
            "Isleton",
            "La Riviera",
            "Lemon Hill",
            "Mather",
            "McClellan Park",
            "North Highlands",
            "Orangevale",
            "Parkway",
            "Rancho Cordova",
            "Rancho Murieta",
            "Rio Linda",
            "Rosemont",
            "Sacramento",
            "Vineyard",
            "Walnut Grove",
            "Wilton",
            "Clarksburg",
            "Davis",
            "Dunnigan",
            "El Macero",
            "Esparto",
            "Guinda",
            "Knights Landing",
            "Madison",
            "Monument Hills",
            "Rumsey",
            "Tancred",
            "West Sacramento",
            "Winters",
            "Woodland",
            "Yolo"
          ]
        },
        "Bay Area": {
          bcPhoneNumber: "(415) 941-5861",
          cities: [
            "Alameda",
            "Albany",
            "Ashland",
            "Berkeley",
            "Castro Valley",
            "Cherryland",
            "Dublin",
            "Emeryville",
            "Fairview",
            "Fremont",
            "Hayward",
            "Livermore",
            "Newark",
            "Oakland",
            "Piedmont",
            "Pleasanton",
            "San Leandro",
            "San Lorenzo",
            "Sunol",
            "Union City",
            "Acalanes Ridge",
            "Alamo",
            "Alhambra Valley",
            "Antioch",
            "Bay Point",
            "Bayview",
            "Bethel Island",
            "Blackhawk",
            "Brentwood",
            "Byron",
            "Camino Tassajara",
            "Castle Hill",
            "Clayton",
            "Clyde",
            "Concord",
            "Contra Costa Centre",
            "Crockett",
            "Danville",
            "Diablo",
            "Discovery Bay",
            "East Richmond Heights",
            "El Cerrito",
            "El Sobrante",
            "Hercules",
            "Kensington",
            "Knightsen",
            "Lafayette",
            "Martinez",
            "Montalvin Manor",
            "Moraga",
            "Mountain View",
            "Norris Canyon",
            "North Gate",
            "North Richmond",
            "Oakley",
            "Orinda",
            "Pacheco",
            "Pinole",
            "Pittsburg",
            "Pleasant Hill",
            "Port Costa",
            "Reliez Valley",
            "Richmond",
            "Rodeo",
            "Rollingwood",
            "San Miguel",
            "San Pablo",
            "San Ramon",
            "Saranap",
            "Shell Ridge",
            "Tara Hills",
            "Vine Hill",
            "Walnut Creek",
            "Alto",
            "Belvedere",
            "Black Point-Green Point",
            "Bolinas",
            "Corte Madera",
            "Dillon Beach",
            "Fairfax",
            "Inverness",
            "Kentfield",
            "Lagunitas-Forest Knolls",
            "Larkspur",
            "Lucas Valley-Marinwood",
            "Marin City",
            "Mill Valley",
            "Muir Beach",
            "Nicasio",
            "Novato",
            "Point Reyes Station",
            "Ross",
            "San Anselmo",
            "San Geronimo",
            "San Rafael",
            "Santa Venetia",
            "Sausalito",
            "Sleepy Hollow",
            "Stinson Beach",
            "Strawberry",
            "Tamalpais-Homestead Valley",
            "Tiburon",
            "Tomales",
            "Woodacre",
            "Atwater",
            "Ballico",
            "Bear Creek",
            "Cressey",
            "Delhi",
            "Dos Palos",
            "Dos Palos Y",
            "El Nido",
            "Franklin",
            "Gustine",
            "Hilmar-Irwin",
            "Le Grand",
            "Livingston",
            "Los Banos",
            "McSwain",
            "Merced",
            "Planada",
            "Santa Nella",
            "Snelling",
            "South Dos Palos",
            "Stevinson",
            "Tuttle",
            "Volta",
            "Winton",
            "Aromas",
            "Boronda",
            "Bradley",
            "Carmel Valley Village",
            "Carmel-by-the-Sea",
            "Castroville",
            "Chualar",
            "Del Monte Forest",
            "Del Rey Oaks",
            "Elkhorn",
            "Gonzales",
            "Greenfield",
            "King City",
            "Las Lomas",
            "Lockwood",
            "Marina",
            "Monterey",
            "Moss Landing",
            "Pacific Grove",
            "Pajaro",
            "Pine Canyon",
            "Prunedale",
            "Salinas",
            "San Ardo",
            "San Lucas",
            "Sand City",
            "Seaside",
            "Soledad",
            "Spreckels",
            "American Canyon",
            "Angwin",
            "Calistoga",
            "Deer Park",
            "Napa",
            "Silverado Resort",
            "St. Helena",
            "Vallejo",
            "Yountville",
            "August",
            "Country Club",
            "Dogtown",
            "Escalon",
            "Farmington",
            "French Camp",
            "Garden Acres",
            "Kennedy",
            "Lathrop",
            "Linden",
            "Lockeford",
            "Lodi",
            "Manteca",
            "Mountain House",
            "Peters",
            "Ripon",
            "Stockton",
            "Taft Mosswood",
            "Tracy",
            "Woodbridge",
            "Baywood Park",
            "Belmont",
            "Brisbane",
            "Broadmoor",
            "Burlingame",
            "Colma",
            "Daly City",
            "El Granada",
            "Highlands",
            "Hillsborough",
            "Millbrae",
            "Montara",
            "Moss Beach",
            "Pacifica",
            "San Bruno",
            "San Mateo",
            "South San Francisco",
            "Alum Rock",
            "Burbank",
            "Cambrian Park",
            "Campbell",
            "Cupertino",
            "East Foothills",
            "Fremont",
            "Fruitdale",
            "Gilroy",
            "Lexington Hills",
            "Los Altos",
            "Los Altos Hills",
            "Los Gatos",
            "Loyola",
            "Milpitas",
            "Monte Sereno",
            "Morgan Hill",
            "Mountain View",
            "Palo Alto",
            "Portola Valley",
            "San Jose",
            "San Martin",
            "Santa Clara",
            "Saratoga",
            "Stanford",
            "Sunnyvale",
            "Allendale",
            "Benicia",
            "Dixon",
            "Elmira",
            "Fairfield",
            "Green Valley",
            "Hartley",
            "Rio Vista",
            "Suisun City",
            "Vacaville",
            "Vallejo",
            "Bloomfield",
            "Bodega",
            "Bodega Bay",
            "Boyes Hot Springs",
            "Carmet",
            "Cazadero",
            "Cloverdale",
            "Cotati",
            "El Verano",
            "Eldridge",
            "Fetters Hot Springs-Agua Caliente",
            "Forestville",
            "Fulton",
            "Geyserville",
            "Glen Ellen",
            "Graton",
            "Guerneville",
            "Healdsburg",
            "Jenner",
            "Kenwood",
            "Larkfield-Wikiup",
            "Monte Rio",
            "Occidental",
            "Penngrove",
            "Petaluma",
            "Rohnert Park",
            "Salmon Creek",
            "Santa Rosa",
            "Sea Ranch",
            "Sebastopol",
            "Sereno del Mar",
            "Sonoma",
            "Temelec",
            "Timber Cove",
            "Valley Ford",
            "Windsor"
          ]
        },
        SoCal: {
          bcPhoneNumber: "(213) 322-1360",
          cities: [
            "Auberry",
            "Big Creek",
            "Biola",
            "Bowles",
            "Calwa",
            "Cantua Creek",
            "Caruthers",
            "Centerville",
            "Clovis",
            "Coalinga",
            "Del Rey",
            "Easton",
            "Firebaugh",
            "Fort Washington",
            "Fowler",
            "Fresno",
            "Friant",
            "Huron",
            "Kerman",
            "Kingsburg",
            "Lanare",
            "Laton",
            "Malaga",
            "Mayfair",
            "Mendota",
            "Millerton",
            "Minkler",
            "Monmouth",
            "Old Fig Garden",
            "Orange Cove",
            "Parlier",
            "Raisin City",
            "Reedley",
            "Riverdale",
            "San Joaquin",
            "Sanger",
            "Selma",
            "Shaver Lake",
            "Squaw Valley",
            "Sunnyside",
            "Tarpey Village",
            "Three Rocks",
            "Tranquillity",
            "West Park",
            "Westside",
            "Alta Sierra",
            "Arvin",
            "Bakersfield",
            "Bakersfield Country Club",
            "Bear Valley Springs",
            "Benton Park",
            "Bodfish",
            "Boron",
            "Buttonwillow",
            "California City",
            "Casa Loma",
            "Cherokee Strip",
            "China Lake Acres",
            "Choctaw Valley",
            "Cottonwood",
            "Delano",
            "Derby Acres",
            "Di Giorgio",
            "Dustin Acres",
            "East Bakersfield",
            "East Niles",
            "Edison",
            "Edmundson Acres",
            "El Adobe",
            "Fairfax",
            "Ford City",
            "Frazier Park",
            "Fuller Acres",
            "Glennville",
            "Golden Hills",
            "Goodmanville",
            "Greenacres",
            "Greenfield",
            "Hillcrest",
            "Inyokern",
            "Johannesburg",
            "Keene",
            "Kernville",
            "La Cresta",
            "Lake Isabella",
            "Lake of the Woods",
            "Lakeside",
            "Lamont",
            "Lebec",
            "Lost Hills",
            "Maricopa",
            "McFarland",
            "McKittrick",
            "Mettler",
            "Mexican Colony",
            "Mojave",
            "Mountain Meadows",
            "Mountain Mesa",
            "North Edwards",
            "Oildale",
            "Old River",
            "Old Stine",
            "Olde Stockdale",
            "Onyx",
            "Pine Mountain Club",
            "Potomac Park",
            "Pumpkin Center",
            "Randsburg",
            "Rexland Acres",
            "Ridgecrest",
            "Ridgecrest Heights",
            "Rivergrove",
            "Rosamond",
            "Rosedale",
            "Shafter",
            "Smith Corner",
            "South Taft",
            "Squirrel Mountain Valley",
            "Stallion Springs",
            "Stebbins",
            "Taft",
            "Taft Heights",
            "Tarina",
            "Tehachapi",
            "Tupman",
            "Valley Acres",
            "Wasco",
            "Weedpatch",
            "Weldon",
            "Wofford Heights",
            "Woody",
            "Acton",
            "Agoura Hills",
            "Agua Dulce",
            "Alhambra",
            "Alondra Park",
            "Altadena",
            "Arcadia",
            "Artesia",
            "Avalon",
            "Avocado Heights",
            "Azusa",
            "Baldwin Park",
            "Bell",
            "Bell Gardens",
            "Bellflower",
            "Beverly Hills",
            "Bradbury",
            "Burbank",
            "Calabasas",
            "Carson",
            "Castaic",
            "Cerritos",
            "Charter Oak",
            "Citrus",
            "Claremont",
            "Commerce",
            "Compton",
            "Covina",
            "Cudahy",
            "Culver City",
            "Del Aire",
            "Desert View Highlands",
            "Diamond Bar",
            "Downey",
            "Duarte",
            "East Los Angeles",
            "East Pasadena",
            "East Rancho Dominguez",
            "East San Gabriel",
            "East Whittier",
            "El Monte",
            "El Segundo",
            "Elizabeth Lake",
            "Florence-Graham",
            "Gardena",
            "Glendale",
            "Glendora",
            "Green Valley",
            "Hacienda Heights",
            "Hasley Canyon",
            "Hawaiian Gardens",
            "Hawthorne",
            "Hermosa Beach",
            "Hidden Hills",
            "Huntington Park",
            "Industry",
            "Inglewood",
            "Irwindale",
            "La Cañada Flintridge",
            "La Crescenta-Montrose",
            "La Habra Heights",
            "La Mirada",
            "La Puente",
            "La Verne",
            "Ladera Heights",
            "Lake Hughes",
            "Lake Los Angeles",
            "Lakewood",
            "Lancaster",
            "Lawndale",
            "Lennox",
            "Leona Valley",
            "Littlerock",
            "Lomita",
            "Long Beach",
            "Los Angeles",
            "Lynwood",
            "Malibu",
            "Manhattan Beach",
            "Marina del Rey",
            "Mayflower Village",
            "Maywood",
            "Monrovia",
            "Montclair",
            "Montebello",
            "Monterey Park",
            "North El Monte",
            "Norwalk",
            "Palmdale",
            "Palos Verdes Estates",
            "Paramount",
            "Pasadena",
            "Pepperdine University",
            "Pico Rivera",
            "Pomona",
            "Quartz Hill",
            "Rancho Palos Verdes",
            "Redondo Beach",
            "Rolling Hills",
            "Rolling Hills Estates",
            "Rose Hills",
            "Rosemead",
            "Rowland Heights",
            "San Dimas",
            "San Fernando",
            "San Gabriel",
            "San Marino",
            "San Pasqual",
            "Santa Clarita",
            "Santa Fe Springs",
            "Santa Monica",
            "Sierra Madre",
            "Signal Hill",
            "South El Monte",
            "South Gate",
            "South Monrovia Island",
            "South Pasadena",
            "South San Gabriel",
            "South San Jose Hills",
            "South Whittier",
            "Stevenson Ranch",
            "Sun Village",
            "Temple City",
            "Topanga",
            "Torrance",
            "Val Verde",
            "Valinda",
            "Vernon",
            "View Park-Windsor Hills",
            "Vincent",
            "Walnut",
            "Walnut Park",
            "West Athens",
            "West Carson",
            "West Covina",
            "West Hollywood",
            "West Puente Valley",
            "West Rancho Dominguez",
            "West Whittier-Los Nietos",
            "Westlake Village",
            "Westmont",
            "Whittier",
            "Willowbrook",
            "Aliso Viejo",
            "Anaheim",
            "Brea",
            "Buena Park",
            "Chino Hills",
            "Costa Mesa",
            "Coto de Caza",
            "Cypress",
            "Dana Point",
            "Fountain Valley",
            "Fullerton",
            "Garden Grove",
            "Huntington Beach",
            "Irvine",
            "La Habra",
            "La Mirada",
            "La Palma",
            "Ladera Ranch",
            "Laguna Beach",
            "Laguna Hills",
            "Laguna Niguel",
            "Laguna Woods",
            "Lake Forest",
            "Las Flores",
            "Long Beach",
            "Los Alamitos",
            "Midway City",
            "Mission Viejo",
            "Modjeska",
            "Newport Beach",
            "North Tustin",
            "Orange",
            "Placentia",
            "Rancho Mission Viejo",
            "Rancho Santa Margarita",
            "Rossmoor",
            "San Clemente",
            "San Juan Capistrano",
            "Santa Ana",
            "Seal Beach",
            "Silverado",
            "Stanton",
            "Trabuco Canyon",
            "Tustin",
            "Villa Park",
            "Westminster",
            "Williams Canyon",
            "Yorba Linda",
            "Aguanga",
            "Anza",
            "Banning",
            "Beaumont",
            "Bermuda Dunes",
            "Blythe",
            "Cabazon",
            "Calimesa",
            "Canyon Lake",
            "Cathedral City",
            "Cherry Valley",
            "Coachella",
            "Colton",
            "Corona",
            "Coronita",
            "Desert Center",
            "Desert Edge",
            "Desert Hot Springs",
            "Desert Palms",
            "East Hemet",
            "Eastvale",
            "El Cerrito",
            "El Sobrante",
            "Fontana",
            "French Valley",
            "Garnet",
            "Good Hope",
            "Green Acres",
            "Hemet",
            "Highgrove",
            "Home Gardens",
            "Homeland",
            "Idyllwild-Pine Cove",
            "Indian Wells",
            "Indio",
            "Indio Hills",
            "Jurupa Valley",
            "La Quinta",
            "Lake Elsinore",
            "Lake Mathews",
            "Lake Riverside",
            "Lakeland Village",
            "Lakeview",
            "March ARB",
            "Mead Valley",
            "Meadowbrook",
            "Mecca",
            "Menifee",
            "Mesa Verde",
            "Moreno Valley",
            "Mountain Center",
            "Murrieta",
            "Norco",
            "North Shore",
            "Nuevo",
            "Oasis",
            "Ontario",
            "Palm Desert",
            "Palm Springs",
            "Perris",
            "Rancho Mirage",
            "Redlands",
            "Ripley",
            "Riverside",
            "Romoland",
            "Sage",
            "San Jacinto",
            "Sky Valley",
            "Temecula",
            "Temescal Valley",
            "Thermal",
            "Thousand Palms",
            "Valle Vista",
            "Vista Santa Rosa",
            "Warm Springs",
            "Whitewater",
            "Wildomar",
            "Winchester",
            "Woodcrest",
            "Yucaipa",
            "Adelanto",
            "Apple Valley",
            "Baker",
            "Barstow",
            "Big Bear City",
            "Big Bear Lake",
            "Big River",
            "Bloomington",
            "Bluewater",
            "Chino",
            "Chino Hills",
            "Colton",
            "Crestline",
            "Fontana",
            "Grand Terrace",
            "Hesperia",
            "Highland",
            "Homestead Valley",
            "Joshua Tree",
            "Lake Arrowhead",
            "Lenwood",
            "Loma Linda",
            "Lucerne Valley",
            "Lytle Creek",
            "Mentone",
            "Montclair",
            "Morongo Valley",
            "Mountain View Acres",
            "Muscoy",
            "Needles",
            "Oak Glen",
            "Oak Hills",
            "Ontario",
            "Phelan",
            "Piñon Hills",
            "Pomona",
            "Rancho Cucamonga",
            "Redlands",
            "Rialto",
            "Running Springs",
            "San Antonio Heights",
            "San Bernardino",
            "Searles Valley",
            "Silver Lakes",
            "Spring Valley Lake",
            "Twentynine Palms",
            "Upland",
            "Victorville",
            "Wrightwood",
            "Yermo",
            "Yucaipa",
            "Yucca Valley",
            "Alpine",
            "Bonita",
            "Bonsall",
            "Borrego Springs",
            "Bostonia",
            "Boulevard",
            "Campo",
            "Carlsbad",
            "Casa de Oro-Mount Helix",
            "Chula Vista",
            "Coronado",
            "Crest",
            "Del Dios",
            "Del Mar",
            "Descanso",
            "El Cajon",
            "Elfin Forest",
            "Encinitas",
            "Escondido",
            "Eucalyptus Hills",
            "Fairbanks Ranch",
            "Fallbrook",
            "Granite Hills",
            "Harbison Canyon",
            "Harmony Grove",
            "Hidden Meadows",
            "Imperial Beach",
            "Jacumba",
            "Jamul",
            "Julian",
            "La Mesa",
            "La Presa",
            "Lake San Marcos",
            "Lakeside",
            "Lemon Grove",
            "Mount Laguna",
            "National City",
            "Oceanside",
            "Pala",
            "Pine Valley",
            "Potrero",
            "Poway",
            "Rainbow",
            "Ramona",
            "Rancho San Diego",
            "Rancho Santa Fe",
            "San Diego",
            "San Diego Country Estates",
            "San Marcos",
            "Santee",
            "Solana Beach",
            "Spring Valley",
            "Valley Center",
            "Vista",
            "Winter Gardens",
            "Bell Canyon",
            "Camarillo",
            "Casa Conejo",
            "Channel Islands Beach",
            "El Rio",
            "Fillmore",
            "Lake Sherwood",
            "Meiners Oaks",
            "Mira Monte",
            "Moorpark",
            "Oak Park",
            "Oak View",
            "Ojai",
            "Oxnard",
            "Piru",
            "Port Hueneme",
            "San Buenaventura (Ventura)",
            "Santa Paula",
            "Santa Rosa Valley",
            "Santa Susana",
            "Saticoy",
            "Simi Valley",
            "Somis",
            "Thousand Oaks"
          ]
        }
      };
      const e = await fetch("https://get.geojs.io/v1/ip/geo.json");
      this.userGeo = await e.json();
    }
  };
}
function ji(e, t) {
  const n = "(415) 941-5861";
  if (!e || typeof e != "string")
    return n;
  const r = Rn(e, t);
  return Wi(
    r,
    t
  ) ?? n;
}
function Rn(e, t) {
  if (!e || typeof e != "string")
    return null;
  for (const n of Object.keys(t))
    if (t[n].cities.filter(
      (r) => r.toLowerCase().trim() === e.toLowerCase().trim()
    ).length > 0)
      return n;
  return null;
}
function Wi(e, t) {
  if (!e || typeof e != "string")
    return null;
  for (const n of Object.keys(t))
    if (n.toLowerCase().trim() === e.toLowerCase().trim())
      return t[n].bcPhoneNumber ?? null;
  return null;
}
function Zi() {
  return {
    // Instance properties
    activeExperimentVariations: {},
    /**
     * Initializes the ExperimentationViewModel instance properties.
     * Run automatically by Alpine, but can also be called manually to reset the view model state.
     * Need to call this manually on store creation if we stop using Alpine as our UI library.
     * @returns {void}
     */
    init() {
      this.activeExperimentVariations = {};
    },
    /**
     * Sets the active variation for a given experiment.
     * @param {string} experiment - The name of the experiment.
     * @param {string} variation - The name of the variation.
     * @returns {void}
     */
    setActiveExperimentVariation(e, t) {
      this.activeExperimentVariations[e] = t;
    },
    /**
     * Gets the active variation for a given experiment.
     * @param {string} experiment - The name of the experiment.
     * @returns {string} The name of the active variation.
     */
    getActiveExperimentVariation(e) {
      return this.activeExperimentVariations[e];
    },
    /**
     * Clears the active variation for a given experiment.
     * @param {string} experiment - The name of the experiment.
     * @returns {void}
     */
    clearActiveExperiment(e) {
      this.activeExperimentVariations[e] && delete this.activeExperimentVariations[e];
    }
  };
}
function Xi(e, t) {
  return {
    get isOpen() {
      return e.flowState.value == "modalAddressForm" || e.flowState.value == "modalAddressFormProcessing" || e.flowState.value == "modalAddressFormError" || e.flowState.value == "contactForm" || e.flowState.value == "contactFormProcessing" || e.flowState.value == "contactFormError" || e.flowState.value == "estimateResults" || e.flowState.value == "scheduleConsultation" || e.flowState.value == "requestedCommunity";
    },
    handleModalFlowStart(n = null) {
      e.flowState.transition("START_MODAL_FLOW");
      let r = {};
      n && (r = {
        cta_str: n
      }), t.track("Modal Get Offer Flow Opened", r);
    },
    handleModalClose() {
      let n = !0;
      e.flowState.value == "contactForm" && e.contactViewModel.hasAnyContactDetails && (n = confirm(
        "Are you sure you want to stop before you've seen how much your extra lot space could be worth?"
      )), e.flowState.value == "contactFormProcessing" && (n = !1), n && (e.flowState.transition("EXIT"), t.track("Get Offer Modal Closed"));
    }
  };
}
export {
  Ui as a,
  Ji as b,
  zi as c,
  Yi as d,
  Qi as e,
  Zi as f,
  Xi as g,
  $i as h,
  qi as i,
  Ki as j,
  Gi as m
};
