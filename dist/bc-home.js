var Ve = !1, Pe = !1, T = [];
function Rn(e) {
  Tn(e);
}
function Tn(e) {
  T.includes(e) || T.push(e), Ln();
}
function mt(e) {
  let t = T.indexOf(e);
  t !== -1 && T.splice(t, 1);
}
function Ln() {
  !Pe && !Ve && (Ve = !0, queueMicrotask(On));
}
function On() {
  Ve = !1, Pe = !0;
  for (let e = 0; e < T.length; e++)
    T[e]();
  T.length = 0, Pe = !1;
}
var W, Q, ue, _t, ke = !0;
function Fn(e) {
  ke = !1, e(), ke = !0;
}
function Dn(e) {
  W = e.reactive, ue = e.release, Q = (t) => e.effect(t, { scheduler: (n) => {
    ke ? Rn(n) : n();
  } }), _t = e.raw;
}
function ot(e) {
  Q = e;
}
function Bn(e) {
  let t = () => {
  };
  return [(r) => {
    let i = Q(r);
    return e._x_effects || (e._x_effects = /* @__PURE__ */ new Set(), e._x_runEffects = () => {
      e._x_effects.forEach((a) => a());
    }), e._x_effects.add(i), t = () => {
      i !== void 0 && (e._x_effects.delete(i), ue(i));
    }, i;
  }, () => {
    t();
  }];
}
var yt = [], wt = [], gt = [];
function Nn(e) {
  gt.push(e);
}
function vt(e, t) {
  typeof t == "function" ? (e._x_cleanups || (e._x_cleanups = []), e._x_cleanups.push(t)) : (t = e, wt.push(t));
}
function In(e) {
  yt.push(e);
}
function Hn(e, t, n) {
  e._x_attributeCleanups || (e._x_attributeCleanups = {}), e._x_attributeCleanups[t] || (e._x_attributeCleanups[t] = []), e._x_attributeCleanups[t].push(n);
}
function Mt(e, t) {
  e._x_attributeCleanups && Object.entries(e._x_attributeCleanups).forEach(([n, r]) => {
    (t === void 0 || t.includes(n)) && (r.forEach((i) => i()), delete e._x_attributeCleanups[n]);
  });
}
var ze = new MutationObserver(qe), Ge = !1;
function Ct() {
  ze.observe(document, { subtree: !0, childList: !0, attributes: !0, attributeOldValue: !0 }), Ge = !0;
}
function jn() {
  Wn(), ze.disconnect(), Ge = !1;
}
var q = [], Se = !1;
function Wn() {
  q = q.concat(ze.takeRecords()), q.length && !Se && (Se = !0, queueMicrotask(() => {
    $n(), Se = !1;
  }));
}
function $n() {
  qe(q), q.length = 0;
}
function g(e) {
  if (!Ge)
    return e();
  jn();
  let t = e();
  return Ct(), t;
}
var Ke = !1, oe = [];
function zn() {
  Ke = !0;
}
function Gn() {
  Ke = !1, qe(oe), oe = [];
}
function qe(e) {
  if (Ke) {
    oe = oe.concat(e);
    return;
  }
  let t = [], n = [], r = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map();
  for (let a = 0; a < e.length; a++)
    if (!e[a].target._x_ignoreMutationObserver && (e[a].type === "childList" && (e[a].addedNodes.forEach((s) => s.nodeType === 1 && t.push(s)), e[a].removedNodes.forEach((s) => s.nodeType === 1 && n.push(s))), e[a].type === "attributes")) {
      let s = e[a].target, o = e[a].attributeName, l = e[a].oldValue, c = () => {
        r.has(s) || r.set(s, []), r.get(s).push({ name: o, value: s.getAttribute(o) });
      }, u = () => {
        i.has(s) || i.set(s, []), i.get(s).push(o);
      };
      s.hasAttribute(o) && l === null ? c() : s.hasAttribute(o) ? (u(), c()) : u();
    }
  i.forEach((a, s) => {
    Mt(s, a);
  }), r.forEach((a, s) => {
    yt.forEach((o) => o(s, a));
  });
  for (let a of n)
    if (!t.includes(a) && (wt.forEach((s) => s(a)), a._x_cleanups))
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
function xt(e) {
  return X(I(e));
}
function Z(e, t, n) {
  return e._x_dataStack = [t, ...I(n || e)], () => {
    e._x_dataStack = e._x_dataStack.filter((r) => r !== t);
  };
}
function lt(e, t) {
  let n = e._x_dataStack[0];
  Object.entries(t).forEach(([r, i]) => {
    n[r] = i;
  });
}
function I(e) {
  return e._x_dataStack ? e._x_dataStack : typeof ShadowRoot == "function" && e instanceof ShadowRoot ? I(e.host) : e.parentNode ? I(e.parentNode) : [];
}
function X(e) {
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
function St(e) {
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
      return e(this.initialValue, () => Kn(r, i), (s) => Re(r, i, s), i, a);
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
function Kn(e, t) {
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
var At = {};
function E(e, t) {
  At[e] = t;
}
function Te(e, t) {
  return Object.entries(At).forEach(([n, r]) => {
    Object.defineProperty(e, `$${n}`, {
      get() {
        let [i, a] = Tt(t);
        return i = { interceptor: Et, ...i }, vt(t, a), r(t, i);
      },
      enumerable: !1
    });
  }), e;
}
function qn(e, t, n, ...r) {
  try {
    return n(...r);
  } catch (i) {
    Y(i, e, t);
  }
}
function Y(e, t, n = void 0) {
  Object.assign(e, { el: t, expression: n }), console.warn(`Alpine Expression Error: ${e.message}

${n ? 'Expression: "' + n + `"

` : ""}`, t), setTimeout(() => {
    throw e;
  }, 0);
}
var se = !0;
function Un(e) {
  let t = se;
  se = !1, e(), se = t;
}
function N(e, t, n = {}) {
  let r;
  return M(e, t)((i) => r = i, n), r;
}
function M(...e) {
  return bt(...e);
}
var bt = Vt;
function Jn(e) {
  bt = e;
}
function Vt(e, t) {
  let n = {};
  Te(n, e);
  let r = [n, ...I(e)];
  if (typeof t == "function")
    return Yn(r, t);
  let i = Zn(r, t, e);
  return qn.bind(null, e, t, i);
}
function Yn(e, t) {
  return (n = () => {
  }, { scope: r = {}, params: i = [] } = {}) => {
    let a = t.apply(X([r, ...e]), i);
    le(n, a);
  };
}
var Ee = {};
function Qn(e, t) {
  if (Ee[e])
    return Ee[e];
  let n = Object.getPrototypeOf(async function() {
  }).constructor, r = /^[\n\s]*if.*\(.*\)/.test(e) || /^(let|const)\s/.test(e) ? `(() => { ${e} })()` : e, a = (() => {
    try {
      return new n(["__self", "scope"], `with (scope) { __self.result = ${r} }; __self.finished = true; return __self.result;`);
    } catch (s) {
      return Y(s, t, e), Promise.resolve();
    }
  })();
  return Ee[e] = a, a;
}
function Zn(e, t, n) {
  let r = Qn(t, n);
  return (i = () => {
  }, { scope: a = {}, params: s = [] } = {}) => {
    r.result = void 0, r.finished = !1;
    let o = X([a, ...e]);
    if (typeof r == "function") {
      let l = r(r, o).catch((c) => Y(c, n, t));
      r.finished ? (le(i, r.result, o, s, n), r.result = void 0) : l.then((c) => {
        le(i, c, o, s, n);
      }).catch((c) => Y(c, n, t)).finally(() => r.result = void 0);
    }
  };
}
function le(e, t, n, r, i) {
  if (se && typeof t == "function") {
    let a = t.apply(n, r);
    a instanceof Promise ? a.then((s) => le(e, s, n, r)).catch((s) => Y(s, i, t)) : e(a);
  } else
    e(t);
}
var Ue = "x-";
function $(e = "") {
  return Ue + e;
}
function Xn(e) {
  Ue = e;
}
var Pt = {};
function y(e, t) {
  Pt[e] = t;
}
function Je(e, t, n) {
  if (t = Array.from(t), e._x_virtualDirectives) {
    let a = Object.entries(e._x_virtualDirectives).map(([o, l]) => ({ name: o, value: l })), s = kt(a);
    a = a.map((o) => s.find((l) => l.name === o.name) ? {
      name: `x-bind:${o.name}`,
      value: `"${o.value}"`
    } : o), t = t.concat(a);
  }
  let r = {};
  return t.map(Ft((a, s) => r[a] = s)).filter(Bt).map(nr(r, n)).sort(rr).map((a) => tr(e, a));
}
function kt(e) {
  return Array.from(e).map(Ft()).filter((t) => !Bt(t));
}
var Le = !1, K = /* @__PURE__ */ new Map(), Rt = Symbol();
function er(e) {
  Le = !0;
  let t = Symbol();
  Rt = t, K.set(t, []);
  let n = () => {
    for (; K.get(t).length; )
      K.get(t).shift()();
    K.delete(t);
  }, r = () => {
    Le = !1, n();
  };
  e(n), r();
}
function Tt(e) {
  let t = [], n = (o) => t.push(o), [r, i] = Bn(e);
  return t.push(i), [{
    Alpine: ee,
    effect: r,
    cleanup: n,
    evaluateLater: M.bind(M, e),
    evaluate: N.bind(N, e)
  }, () => t.forEach((o) => o())];
}
function tr(e, t) {
  let n = () => {
  }, r = Pt[t.type] || n, [i, a] = Tt(e);
  Hn(e, t.original, a);
  let s = () => {
    e._x_ignore || e._x_ignoreSelf || (r.inline && r.inline(e, t, i), r = r.bind(r, e, t, i), Le ? K.get(Rt).push(r) : r());
  };
  return s.runCleanups = a, s;
}
var Lt = (e, t) => ({ name: n, value: r }) => (n.startsWith(e) && (n = n.replace(e, t)), { name: n, value: r }), Ot = (e) => e;
function Ft(e = () => {
}) {
  return ({ name: t, value: n }) => {
    let { name: r, value: i } = Dt.reduce((a, s) => s(a), { name: t, value: n });
    return r !== t && e(r, t), { name: r, value: i };
  };
}
var Dt = [];
function Ye(e) {
  Dt.push(e);
}
function Bt({ name: e }) {
  return Nt().test(e);
}
var Nt = () => new RegExp(`^${Ue}([^:^.]+)\\b`);
function nr(e, t) {
  return ({ name: n, value: r }) => {
    let i = n.match(Nt()), a = n.match(/:([a-zA-Z0-9\-:]+)/), s = n.match(/\.[^.\]]+(?=[^\]]*$)/g) || [], o = t || e[n] || n;
    return {
      type: i ? i[1] : null,
      value: a ? a[1] : null,
      modifiers: s.map((l) => l.replace(".", "")),
      expression: r,
      original: o
    };
  };
}
var Oe = "DEFAULT", re = [
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
  let n = re.indexOf(e.type) === -1 ? Oe : e.type, r = re.indexOf(t.type) === -1 ? Oe : t.type;
  return re.indexOf(n) - re.indexOf(r);
}
function U(e, t, n = {}) {
  e.dispatchEvent(new CustomEvent(t, {
    detail: n,
    bubbles: !0,
    composed: !0,
    cancelable: !0
  }));
}
var Fe = [], Qe = !1;
function It(e = () => {
}) {
  return queueMicrotask(() => {
    Qe || setTimeout(() => {
      De();
    });
  }), new Promise((t) => {
    Fe.push(() => {
      e(), t();
    });
  });
}
function De() {
  for (Qe = !1; Fe.length; )
    Fe.shift()();
}
function ir() {
  Qe = !0;
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
function H(e, ...t) {
  console.warn(`Alpine Warning: ${e}`, ...t);
}
function ar() {
  document.body || H("Unable to initialize. Trying to load Alpine before `<body>` is available. Did you forget to add `defer` in Alpine's `<script>` tag?"), U(document, "alpine:init"), U(document, "alpine:initializing"), Ct(), Nn((t) => P(t, F)), vt((t) => or(t)), In((t, n) => {
    Je(t, n).forEach((r) => r());
  });
  let e = (t) => !de(t.parentElement, !0);
  Array.from(document.querySelectorAll(Wt())).filter(e).forEach((t) => {
    P(t);
  }), U(document, "alpine:initialized");
}
var Ze = [], Ht = [];
function jt() {
  return Ze.map((e) => e());
}
function Wt() {
  return Ze.concat(Ht).map((e) => e());
}
function $t(e) {
  Ze.push(e);
}
function zt(e) {
  Ht.push(e);
}
function de(e, t = !1) {
  return fe(e, (n) => {
    if ((t ? Wt() : jt()).some((i) => n.matches(i)))
      return !0;
  });
}
function fe(e, t) {
  if (e) {
    if (t(e))
      return e;
    if (e._x_teleportBack && (e = e._x_teleportBack), !!e.parentElement)
      return fe(e.parentElement, t);
  }
}
function sr(e) {
  return jt().some((t) => e.matches(t));
}
function P(e, t = F) {
  er(() => {
    t(e, (n, r) => {
      Je(n, n.attributes).forEach((i) => i()), n._x_ignore && r();
    });
  });
}
function or(e) {
  F(e, (t) => Mt(t));
}
function Xe(e, t) {
  return Array.isArray(t) ? ct(e, t.join(" ")) : typeof t == "object" && t !== null ? lr(e, t) : typeof t == "function" ? Xe(e, t()) : ct(e, t);
}
function ct(e, t) {
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
function he(e, t) {
  return typeof t == "object" && t !== null ? cr(e, t) : ur(e, t);
}
function cr(e, t) {
  let n = {};
  return Object.entries(t).forEach(([r, i]) => {
    n[r] = e.style[r], r.startsWith("--") || (r = dr(r)), e.style.setProperty(r, i);
  }), setTimeout(() => {
    e.style.length === 0 && e.removeAttribute("style");
  }), () => {
    he(e, n);
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
function Be(e, t = () => {
}) {
  let n = !1;
  return function() {
    n ? t.apply(this, arguments) : (n = !0, e.apply(this, arguments));
  };
}
y("transition", (e, { value: t, modifiers: n, expression: r }, { evaluate: i }) => {
  typeof r == "function" && (r = i(r)), r ? fr(e, r, t) : hr(e, n, t);
});
function fr(e, t, n) {
  Gt(e, Xe, ""), {
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
  Gt(e, he);
  let r = !t.includes("in") && !t.includes("out") && !n, i = r || t.includes("in") || ["enter"].includes(n), a = r || t.includes("out") || ["leave"].includes(n);
  t.includes("in") && !r && (t = t.filter((h, w) => w < t.indexOf("out"))), t.includes("out") && !r && (t = t.filter((h, w) => w > t.indexOf("out")));
  let s = !t.includes("opacity") && !t.includes("scale"), o = s || t.includes("opacity"), l = s || t.includes("scale"), c = o ? 0 : 1, u = l ? z(t, "scale", 95) / 100 : 1, f = z(t, "delay", 0), m = z(t, "origin", "center"), b = "opacity, transform", D = z(t, "duration", 150) / 1e3, te = z(t, "duration", 75) / 1e3, d = "cubic-bezier(0.4, 0.0, 0.2, 1)";
  i && (e._x_transition.enter.during = {
    transformOrigin: m,
    transitionDelay: f,
    transitionProperty: b,
    transitionDuration: `${D}s`,
    transitionTimingFunction: d
  }, e._x_transition.enter.start = {
    opacity: c,
    transform: `scale(${u})`
  }, e._x_transition.enter.end = {
    opacity: 1,
    transform: "scale(1)"
  }), a && (e._x_transition.leave.during = {
    transformOrigin: m,
    transitionDelay: f,
    transitionProperty: b,
    transitionDuration: `${te}s`,
    transitionTimingFunction: d
  }, e._x_transition.leave.start = {
    opacity: 1,
    transform: "scale(1)"
  }, e._x_transition.leave.end = {
    opacity: c,
    transform: `scale(${u})`
  });
}
function Gt(e, t, n = {}) {
  e._x_transition || (e._x_transition = {
    enter: { during: n, start: n, end: n },
    leave: { during: n, start: n, end: n },
    in(r = () => {
    }, i = () => {
    }) {
      Ne(e, t, {
        during: this.enter.during,
        start: this.enter.start,
        end: this.enter.end
      }, r, i);
    },
    out(r = () => {
    }, i = () => {
    }) {
      Ne(e, t, {
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
        ]).then(([u]) => u());
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
function Ne(e, t, { during: n, start: r, end: i } = {}, a = () => {
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
  let n, r, i, a = Be(() => {
    g(() => {
      n = !0, r || t.before(), i || (t.end(), De()), t.after(), e.isConnected && t.cleanup(), delete e._x_transitioning;
    });
  });
  e._x_transitioning = {
    beforeCancels: [],
    beforeCancel(s) {
      this.beforeCancels.push(s);
    },
    cancel: Be(function() {
      for (; this.beforeCancels.length; )
        this.beforeCancels.shift()();
      a();
    }),
    finish: a
  }, g(() => {
    t.start(), t.during();
  }), ir(), requestAnimationFrame(() => {
    if (n)
      return;
    let s = Number(getComputedStyle(e).transitionDuration.replace(/,.*/, "").replace("s", "")) * 1e3, o = Number(getComputedStyle(e).transitionDelay.replace(/,.*/, "").replace("s", "")) * 1e3;
    s === 0 && (s = Number(getComputedStyle(e).animationDuration.replace("s", "")) * 1e3), g(() => {
      t.before();
    }), r = !0, requestAnimationFrame(() => {
      n || (g(() => {
        t.end();
      }), De(), setTimeout(e._x_transitioning.finish, s + o), i = !0);
    });
  });
}
function z(e, t, n) {
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
var Ie = !1;
function pe(e, t = () => {
}) {
  return (...n) => Ie ? t(...n) : e(...n);
}
function mr(e, t) {
  t._x_dataStack || (t._x_dataStack = e._x_dataStack), Ie = !0, yr(() => {
    _r(t);
  }), Ie = !1;
}
function _r(e) {
  let t = !1;
  P(e, (r, i) => {
    F(r, (a, s) => {
      if (t && sr(a))
        return s();
      t = !0, i(a, s);
    });
  });
}
function yr(e) {
  let t = Q;
  ot((n, r) => {
    let i = t(n);
    return ue(i), () => {
    };
  }), e(), ot(t);
}
function qt(e, t, n, r = []) {
  switch (e._x_bindings || (e._x_bindings = W({})), e._x_bindings[t] = n, t = r.includes("camel") ? Sr(t) : t, t) {
    case "value":
      wr(e, n);
      break;
    case "style":
      vr(e, n);
      break;
    case "class":
      gr(e, n);
      break;
    default:
      Mr(e, t, n);
      break;
  }
}
function wr(e, t) {
  if (e.type === "radio")
    e.attributes.value === void 0 && (e.value = t), window.fromModel && (e.checked = ut(e.value, t));
  else if (e.type === "checkbox")
    Number.isInteger(t) ? e.value = t : !Number.isInteger(t) && !Array.isArray(t) && typeof t != "boolean" && ![null, void 0].includes(t) ? e.value = String(t) : Array.isArray(t) ? e.checked = t.some((n) => ut(n, e.value)) : e.checked = !!t;
  else if (e.tagName === "SELECT")
    xr(e, t);
  else {
    if (e.value === t)
      return;
    e.value = t;
  }
}
function gr(e, t) {
  e._x_undoAddedClasses && e._x_undoAddedClasses(), e._x_undoAddedClasses = Xe(e, t);
}
function vr(e, t) {
  e._x_undoAddedStyles && e._x_undoAddedStyles(), e._x_undoAddedStyles = he(e, t);
}
function Mr(e, t, n) {
  [null, void 0, !1].includes(n) && Er(t) ? e.removeAttribute(t) : (Ut(t) && (n = t), Cr(e, t, n));
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
function Sr(e) {
  return e.toLowerCase().replace(/-(\w)/g, (t, n) => n.toUpperCase());
}
function ut(e, t) {
  return e == t;
}
function Ut(e) {
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
function Er(e) {
  return !["aria-pressed", "aria-checked", "aria-expanded", "aria-selected"].includes(e);
}
function Ar(e, t, n) {
  if (e._x_bindings && e._x_bindings[t] !== void 0)
    return e._x_bindings[t];
  let r = e.getAttribute(t);
  return r === null ? typeof n == "function" ? n() : n : r === "" ? !0 : Ut(t) ? !![t, "true"].includes(r) : r;
}
function Jt(e, t) {
  var n;
  return function() {
    var r = this, i = arguments, a = function() {
      n = null, e.apply(r, i);
    };
    clearTimeout(n), n = setTimeout(a, t);
  };
}
function Yt(e, t) {
  let n;
  return function() {
    let r = this, i = arguments;
    n || (e.apply(r, i), n = !0, setTimeout(() => n = !1, t));
  };
}
function br(e) {
  e(ee);
}
var R = {}, dt = !1;
function Vr(e, t) {
  if (dt || (R = W(R), dt = !0), t === void 0)
    return R[e];
  R[e] = t, typeof t == "object" && t !== null && t.hasOwnProperty("init") && typeof t.init == "function" && R[e].init(), St(R[e]);
}
function Pr() {
  return R;
}
var Qt = {};
function kr(e, t) {
  let n = typeof t != "function" ? () => t : t;
  e instanceof Element ? Zt(e, n()) : Qt[e] = n;
}
function Rr(e) {
  return Object.entries(Qt).forEach(([t, n]) => {
    Object.defineProperty(e, t, {
      get() {
        return (...r) => n(...r);
      }
    });
  }), e;
}
function Zt(e, t, n) {
  let r = [];
  for (; r.length; )
    r.pop()();
  let i = Object.entries(t).map(([s, o]) => ({ name: s, value: o })), a = kt(i);
  i = i.map((s) => a.find((o) => o.name === s.name) ? {
    name: `x-bind:${s.name}`,
    value: `"${s.value}"`
  } : s), Je(e, i, n).map((s) => {
    r.push(s.runCleanups), s();
  });
}
var Xt = {};
function Tr(e, t) {
  Xt[e] = t;
}
function Lr(e, t) {
  return Object.entries(Xt).forEach(([n, r]) => {
    Object.defineProperty(e, n, {
      get() {
        return (...i) => r.bind(t)(...i);
      },
      enumerable: !1
    });
  }), e;
}
var Or = {
  get reactive() {
    return W;
  },
  get release() {
    return ue;
  },
  get effect() {
    return Q;
  },
  get raw() {
    return _t;
  },
  version: "3.10.5",
  flushAndStopDeferringMutations: Gn,
  dontAutoEvaluateFunctions: Un,
  disableEffectScheduling: Fn,
  setReactivityEngine: Dn,
  closestDataStack: I,
  skipDuringClone: pe,
  addRootSelector: $t,
  addInitSelector: zt,
  addScopeToNode: Z,
  deferMutations: zn,
  mapAttributes: Ye,
  evaluateLater: M,
  setEvaluator: Jn,
  mergeProxies: X,
  findClosest: fe,
  closestRoot: de,
  interceptor: Et,
  transition: Ne,
  setStyles: he,
  mutateDom: g,
  directive: y,
  throttle: Yt,
  debounce: Jt,
  evaluate: N,
  initTree: P,
  nextTick: It,
  prefixed: $,
  prefix: Xn,
  plugin: br,
  magic: E,
  store: Vr,
  start: ar,
  clone: mr,
  bound: Ar,
  $data: xt,
  data: Tr,
  bind: kr
}, ee = Or;
function Fr(e, t) {
  const n = /* @__PURE__ */ Object.create(null), r = e.split(",");
  for (let i = 0; i < r.length; i++)
    n[r[i]] = !0;
  return t ? (i) => !!n[i.toLowerCase()] : (i) => !!n[i];
}
var Dr = Object.freeze({}), en = Object.assign, Br = Object.prototype.hasOwnProperty, me = (e, t) => Br.call(e, t), L = Array.isArray, J = (e) => tn(e) === "[object Map]", Nr = (e) => typeof e == "string", et = (e) => typeof e == "symbol", _e = (e) => e !== null && typeof e == "object", Ir = Object.prototype.toString, tn = (e) => Ir.call(e), nn = (e) => tn(e).slice(8, -1), tt = (e) => Nr(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, Hr = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (n) => t[n] || (t[n] = e(n));
}, jr = Hr((e) => e.charAt(0).toUpperCase() + e.slice(1)), rn = (e, t) => e !== t && (e === e || t === t), He = /* @__PURE__ */ new WeakMap(), G = [], A, O = Symbol("iterate"), je = Symbol("Map key iterate");
function Wr(e) {
  return e && e._isEffect === !0;
}
function $r(e, t = Dr) {
  Wr(e) && (e = e.raw);
  const n = Kr(e, t);
  return t.lazy || n(), n;
}
function zr(e) {
  e.active && (an(e), e.options.onStop && e.options.onStop(), e.active = !1);
}
var Gr = 0;
function Kr(e, t) {
  const n = function() {
    if (!n.active)
      return e();
    if (!G.includes(n)) {
      an(n);
      try {
        return Ur(), G.push(n), A = n, e();
      } finally {
        G.pop(), sn(), A = G[G.length - 1];
      }
    }
  };
  return n.id = Gr++, n.allowRecurse = !!t.allowRecurse, n._isEffect = !0, n.active = !0, n.raw = e, n.deps = [], n.options = t, n;
}
function an(e) {
  const { deps: t } = e;
  if (t.length) {
    for (let n = 0; n < t.length; n++)
      t[n].delete(e);
    t.length = 0;
  }
}
var j = !0, nt = [];
function qr() {
  nt.push(j), j = !1;
}
function Ur() {
  nt.push(j), j = !0;
}
function sn() {
  const e = nt.pop();
  j = e === void 0 ? !0 : e;
}
function S(e, t, n) {
  if (!j || A === void 0)
    return;
  let r = He.get(e);
  r || He.set(e, r = /* @__PURE__ */ new Map());
  let i = r.get(n);
  i || r.set(n, i = /* @__PURE__ */ new Set()), i.has(A) || (i.add(A), A.deps.push(i), A.options.onTrack && A.options.onTrack({
    effect: A,
    target: e,
    type: t,
    key: n
  }));
}
function k(e, t, n, r, i, a) {
  const s = He.get(e);
  if (!s)
    return;
  const o = /* @__PURE__ */ new Set(), l = (u) => {
    u && u.forEach((f) => {
      (f !== A || f.allowRecurse) && o.add(f);
    });
  };
  if (t === "clear")
    s.forEach(l);
  else if (n === "length" && L(e))
    s.forEach((u, f) => {
      (f === "length" || f >= r) && l(u);
    });
  else
    switch (n !== void 0 && l(s.get(n)), t) {
      case "add":
        L(e) ? tt(n) && l(s.get("length")) : (l(s.get(O)), J(e) && l(s.get(je)));
        break;
      case "delete":
        L(e) || (l(s.get(O)), J(e) && l(s.get(je)));
        break;
      case "set":
        J(e) && l(s.get(O));
        break;
    }
  const c = (u) => {
    u.options.onTrigger && u.options.onTrigger({
      effect: u,
      target: e,
      key: n,
      type: t,
      newValue: r,
      oldValue: i,
      oldTarget: a
    }), u.options.scheduler ? u.options.scheduler(u) : u();
  };
  o.forEach(c);
}
var Jr = /* @__PURE__ */ Fr("__proto__,__v_isRef,__isVue"), on = new Set(Object.getOwnPropertyNames(Symbol).map((e) => Symbol[e]).filter(et)), Yr = /* @__PURE__ */ ye(), Qr = /* @__PURE__ */ ye(!1, !0), Zr = /* @__PURE__ */ ye(!0), Xr = /* @__PURE__ */ ye(!0, !0), ce = {};
["includes", "indexOf", "lastIndexOf"].forEach((e) => {
  const t = Array.prototype[e];
  ce[e] = function(...n) {
    const r = p(this);
    for (let a = 0, s = this.length; a < s; a++)
      S(r, "get", a + "");
    const i = t.apply(r, n);
    return i === -1 || i === !1 ? t.apply(r, n.map(p)) : i;
  };
});
["push", "pop", "shift", "unshift", "splice"].forEach((e) => {
  const t = Array.prototype[e];
  ce[e] = function(...n) {
    qr();
    const r = t.apply(this, n);
    return sn(), r;
  };
});
function ye(e = !1, t = !1) {
  return function(r, i, a) {
    if (i === "__v_isReactive")
      return !e;
    if (i === "__v_isReadonly")
      return e;
    if (i === "__v_raw" && a === (e ? t ? ci : Cn : t ? li : Mn).get(r))
      return r;
    const s = L(r);
    if (!e && s && me(ce, i))
      return Reflect.get(ce, i, a);
    const o = Reflect.get(r, i, a);
    return (et(i) ? on.has(i) : Jr(i)) || (e || S(r, "get", i), t) ? o : We(o) ? !s || !tt(i) ? o.value : o : _e(o) ? e ? xn(o) : st(o) : o;
  };
}
var ei = /* @__PURE__ */ ln(), ti = /* @__PURE__ */ ln(!0);
function ln(e = !1) {
  return function(n, r, i, a) {
    let s = n[r];
    if (!e && (i = p(i), s = p(s), !L(n) && We(s) && !We(i)))
      return s.value = i, !0;
    const o = L(n) && tt(r) ? Number(r) < n.length : me(n, r), l = Reflect.set(n, r, i, a);
    return n === p(a) && (o ? rn(i, s) && k(n, "set", r, i, s) : k(n, "add", r, i)), l;
  };
}
function ni(e, t) {
  const n = me(e, t), r = e[t], i = Reflect.deleteProperty(e, t);
  return i && n && k(e, "delete", t, void 0, r), i;
}
function ri(e, t) {
  const n = Reflect.has(e, t);
  return (!et(t) || !on.has(t)) && S(e, "has", t), n;
}
function ii(e) {
  return S(e, "iterate", L(e) ? "length" : O), Reflect.ownKeys(e);
}
var cn = {
  get: Yr,
  set: ei,
  deleteProperty: ni,
  has: ri,
  ownKeys: ii
}, un = {
  get: Zr,
  set(e, t) {
    return console.warn(`Set operation on key "${String(t)}" failed: target is readonly.`, e), !0;
  },
  deleteProperty(e, t) {
    return console.warn(`Delete operation on key "${String(t)}" failed: target is readonly.`, e), !0;
  }
};
en({}, cn, {
  get: Qr,
  set: ti
});
en({}, un, {
  get: Xr
});
var rt = (e) => _e(e) ? st(e) : e, it = (e) => _e(e) ? xn(e) : e, at = (e) => e, we = (e) => Reflect.getPrototypeOf(e);
function ge(e, t, n = !1, r = !1) {
  e = e.__v_raw;
  const i = p(e), a = p(t);
  t !== a && !n && S(i, "get", t), !n && S(i, "get", a);
  const { has: s } = we(i), o = r ? at : n ? it : rt;
  if (s.call(i, t))
    return o(e.get(t));
  if (s.call(i, a))
    return o(e.get(a));
  e !== i && e.get(t);
}
function ve(e, t = !1) {
  const n = this.__v_raw, r = p(n), i = p(e);
  return e !== i && !t && S(r, "has", e), !t && S(r, "has", i), e === i ? n.has(e) : n.has(e) || n.has(i);
}
function Me(e, t = !1) {
  return e = e.__v_raw, !t && S(p(e), "iterate", O), Reflect.get(e, "size", e);
}
function dn(e) {
  e = p(e);
  const t = p(this);
  return we(t).has.call(t, e) || (t.add(e), k(t, "add", e, e)), this;
}
function fn(e, t) {
  t = p(t);
  const n = p(this), { has: r, get: i } = we(n);
  let a = r.call(n, e);
  a ? vn(n, r, e) : (e = p(e), a = r.call(n, e));
  const s = i.call(n, e);
  return n.set(e, t), a ? rn(t, s) && k(n, "set", e, t, s) : k(n, "add", e, t), this;
}
function hn(e) {
  const t = p(this), { has: n, get: r } = we(t);
  let i = n.call(t, e);
  i ? vn(t, n, e) : (e = p(e), i = n.call(t, e));
  const a = r ? r.call(t, e) : void 0, s = t.delete(e);
  return i && k(t, "delete", e, void 0, a), s;
}
function pn() {
  const e = p(this), t = e.size !== 0, n = J(e) ? new Map(e) : new Set(e), r = e.clear();
  return t && k(e, "clear", void 0, void 0, n), r;
}
function Ce(e, t) {
  return function(r, i) {
    const a = this, s = a.__v_raw, o = p(s), l = t ? at : e ? it : rt;
    return !e && S(o, "iterate", O), s.forEach((c, u) => r.call(i, l(c), l(u), a));
  };
}
function ie(e, t, n) {
  return function(...r) {
    const i = this.__v_raw, a = p(i), s = J(a), o = e === "entries" || e === Symbol.iterator && s, l = e === "keys" && s, c = i[e](...r), u = n ? at : t ? it : rt;
    return !t && S(a, "iterate", l ? je : O), {
      next() {
        const { value: f, done: m } = c.next();
        return m ? { value: f, done: m } : {
          value: o ? [u(f[0]), u(f[1])] : u(f),
          done: m
        };
      },
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function V(e) {
  return function(...t) {
    {
      const n = t[0] ? `on key "${t[0]}" ` : "";
      console.warn(`${jr(e)} operation ${n}failed: target is readonly.`, p(this));
    }
    return e === "delete" ? !1 : this;
  };
}
var mn = {
  get(e) {
    return ge(this, e);
  },
  get size() {
    return Me(this);
  },
  has: ve,
  add: dn,
  set: fn,
  delete: hn,
  clear: pn,
  forEach: Ce(!1, !1)
}, _n = {
  get(e) {
    return ge(this, e, !1, !0);
  },
  get size() {
    return Me(this);
  },
  has: ve,
  add: dn,
  set: fn,
  delete: hn,
  clear: pn,
  forEach: Ce(!1, !0)
}, yn = {
  get(e) {
    return ge(this, e, !0);
  },
  get size() {
    return Me(this, !0);
  },
  has(e) {
    return ve.call(this, e, !0);
  },
  add: V("add"),
  set: V("set"),
  delete: V("delete"),
  clear: V("clear"),
  forEach: Ce(!0, !1)
}, wn = {
  get(e) {
    return ge(this, e, !0, !0);
  },
  get size() {
    return Me(this, !0);
  },
  has(e) {
    return ve.call(this, e, !0);
  },
  add: V("add"),
  set: V("set"),
  delete: V("delete"),
  clear: V("clear"),
  forEach: Ce(!0, !0)
}, ai = ["keys", "values", "entries", Symbol.iterator];
ai.forEach((e) => {
  mn[e] = ie(e, !1, !1), yn[e] = ie(e, !0, !1), _n[e] = ie(e, !1, !0), wn[e] = ie(e, !0, !0);
});
function gn(e, t) {
  const n = t ? e ? wn : _n : e ? yn : mn;
  return (r, i, a) => i === "__v_isReactive" ? !e : i === "__v_isReadonly" ? e : i === "__v_raw" ? r : Reflect.get(me(n, i) && i in r ? n : r, i, a);
}
var si = {
  get: gn(!1, !1)
}, oi = {
  get: gn(!0, !1)
};
function vn(e, t, n) {
  const r = p(n);
  if (r !== n && t.call(e, r)) {
    const i = nn(e);
    console.warn(`Reactive ${i} contains both the raw and reactive versions of the same object${i === "Map" ? " as keys" : ""}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`);
  }
}
var Mn = /* @__PURE__ */ new WeakMap(), li = /* @__PURE__ */ new WeakMap(), Cn = /* @__PURE__ */ new WeakMap(), ci = /* @__PURE__ */ new WeakMap();
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
  return e.__v_skip || !Object.isExtensible(e) ? 0 : ui(nn(e));
}
function st(e) {
  return e && e.__v_isReadonly ? e : Sn(e, !1, cn, si, Mn);
}
function xn(e) {
  return Sn(e, !0, un, oi, Cn);
}
function Sn(e, t, n, r, i) {
  if (!_e(e))
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
function p(e) {
  return e && p(e.__v_raw) || e;
}
function We(e) {
  return !!(e && e.__v_isRef === !0);
}
E("nextTick", () => It);
E("dispatch", (e) => U.bind(U, e));
E("watch", (e, { evaluateLater: t, effect: n }) => (r, i) => {
  let a = t(r), s = !0, o, l = n(() => a((c) => {
    JSON.stringify(c), s ? o = c : queueMicrotask(() => {
      i(c, o), o = c;
    }), s = !1;
  }));
  e._x_effects.delete(l);
});
E("store", Pr);
E("data", (e) => xt(e));
E("root", (e) => de(e));
E("refs", (e) => (e._x_refs_proxy || (e._x_refs_proxy = X(fi(e))), e._x_refs_proxy));
function fi(e) {
  let t = [], n = e;
  for (; n; )
    n._x_refs && t.push(n._x_refs), n = n.parentNode;
  return t;
}
var Ae = {};
function En(e) {
  return Ae[e] || (Ae[e] = 0), ++Ae[e];
}
function hi(e, t) {
  return fe(e, (n) => {
    if (n._x_ids && n._x_ids[t])
      return !0;
  });
}
function pi(e, t) {
  e._x_ids || (e._x_ids = {}), e._x_ids[t] || (e._x_ids[t] = En(t));
}
E("id", (e) => (t, n = null) => {
  let r = hi(e, t), i = r ? r._x_ids[t] : En(t);
  return n ? `${t}-${i}-${n}` : `${t}-${i}`;
});
E("el", (e) => e);
An("Focus", "focus", "focus");
An("Persist", "persist", "persist");
function An(e, t, n) {
  E(t, (r) => H(`You can't use [$${directiveName}] without first installing the "${e}" plugin here: https://alpinejs.dev/plugins/${n}`, r));
}
y("modelable", (e, { expression: t }, { effect: n, evaluateLater: r }) => {
  let i = r(t), a = () => {
    let c;
    return i((u) => c = u), c;
  }, s = r(`${t} = __placeholder`), o = (c) => s(() => {
  }, { scope: { __placeholder: c } }), l = a();
  o(l), queueMicrotask(() => {
    if (!e._x_model)
      return;
    e._x_removeModelListeners.default();
    let c = e._x_model.get, u = e._x_model.set;
    n(() => o(c())), n(() => u(a()));
  });
});
y("teleport", (e, { expression: t }, { cleanup: n }) => {
  e.tagName.toLowerCase() !== "template" && H("x-teleport can only be used on a <template> tag", e);
  let r = document.querySelector(t);
  r || H(`Cannot find x-teleport element for selector: "${t}"`);
  let i = e.content.cloneNode(!0).firstElementChild;
  e._x_teleport = i, i._x_teleportBack = e, e._x_forwardEvents && e._x_forwardEvents.forEach((a) => {
    i.addEventListener(a, (s) => {
      s.stopPropagation(), e.dispatchEvent(new s.constructor(s.type, s));
    });
  }), Z(i, {}, e), g(() => {
    r.appendChild(i), P(i), i._x_ignore = !0;
  }), n(() => i.remove());
});
var bn = () => {
};
bn.inline = (e, { modifiers: t }, { cleanup: n }) => {
  t.includes("self") ? e._x_ignoreSelf = !0 : e._x_ignore = !0, n(() => {
    t.includes("self") ? delete e._x_ignoreSelf : delete e._x_ignore;
  });
};
y("ignore", bn);
y("effect", (e, { expression: t }, { effect: n }) => n(M(e, t)));
function Vn(e, t, n, r) {
  let i = e, a = (l) => r(l), s = {}, o = (l, c) => (u) => c(l, u);
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
    wi(t) && gi(c, n) || l(c);
  }), n.includes("debounce")) {
    let l = n[n.indexOf("debounce") + 1] || "invalid-wait", c = $e(l.split("ms")[0]) ? Number(l.split("ms")[0]) : 250;
    a = Jt(a, c);
  }
  if (n.includes("throttle")) {
    let l = n[n.indexOf("throttle") + 1] || "invalid-wait", c = $e(l.split("ms")[0]) ? Number(l.split("ms")[0]) : 250;
    a = Yt(a, c);
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
function $e(e) {
  return !Array.isArray(e) && !isNaN(e);
}
function yi(e) {
  return e.replace(/([a-z])([A-Z])/g, "$1-$2").replace(/[_\s]/, "-").toLowerCase();
}
function wi(e) {
  return ["keydown", "keyup"].includes(e);
}
function gi(e, t) {
  let n = t.filter((a) => !["window", "document", "prevent", "stop", "once"].includes(a));
  if (n.includes("debounce")) {
    let a = n.indexOf("debounce");
    n.splice(a, $e((n[a + 1] || "invalid-wait").split("ms")[0]) ? 2 : 1);
  }
  if (n.length === 0 || n.length === 1 && ft(e.key).includes(n[0]))
    return !1;
  const i = ["ctrl", "shift", "alt", "meta", "cmd", "super"].filter((a) => n.includes(a));
  return n = n.filter((a) => !i.includes(a)), !(i.length > 0 && i.filter((s) => ((s === "cmd" || s === "super") && (s = "meta"), e[`${s}Key`])).length === i.length && ft(e.key).includes(n[0]));
}
function ft(e) {
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
y("model", (e, { modifiers: t, expression: n }, { effect: r, cleanup: i }) => {
  let a = M(e, n), s = `${n} = rightSideOfExpression($event, ${n})`, o = M(e, s);
  var l = e.tagName.toLowerCase() === "select" || ["checkbox", "radio"].includes(e.type) || t.includes("lazy") ? "change" : "input";
  let c = vi(e, t, n), u = Vn(e, l, t, (m) => {
    o(() => {
    }, { scope: {
      $event: m,
      rightSideOfExpression: c
    } });
  });
  e._x_removeModelListeners || (e._x_removeModelListeners = {}), e._x_removeModelListeners.default = u, i(() => e._x_removeModelListeners.default());
  let f = M(e, `${n} = __placeholder`);
  e._x_model = {
    get() {
      let m;
      return a((b) => m = b), m;
    },
    set(m) {
      f(() => {
      }, { scope: { __placeholder: m } });
    }
  }, e._x_forceModelUpdate = () => {
    a((m) => {
      m === void 0 && n.match(/\./) && (m = ""), window.fromModel = !0, g(() => qt(e, "value", m)), delete window.fromModel;
    });
  }, r(() => {
    t.includes("unintrusive") && document.activeElement.isSameNode(e) || e._x_forceModelUpdate();
  });
});
function vi(e, t, n) {
  return e.type === "radio" && g(() => {
    e.hasAttribute("name") || e.setAttribute("name", n);
  }), (r, i) => g(() => {
    if (r instanceof CustomEvent && r.detail !== void 0)
      return r.detail || r.target.value;
    if (e.type === "checkbox")
      if (Array.isArray(i)) {
        let a = t.includes("number") ? be(r.target.value) : r.target.value;
        return r.target.checked ? i.concat([a]) : i.filter((s) => !Mi(s, a));
      } else
        return r.target.checked;
    else {
      if (e.tagName.toLowerCase() === "select" && e.multiple)
        return t.includes("number") ? Array.from(r.target.selectedOptions).map((a) => {
          let s = a.value || a.text;
          return be(s);
        }) : Array.from(r.target.selectedOptions).map((a) => a.value || a.text);
      {
        let a = r.target.value;
        return t.includes("number") ? be(a) : t.includes("trim") ? a.trim() : a;
      }
    }
  });
}
function be(e) {
  let t = e ? parseFloat(e) : null;
  return Ci(t) ? t : e;
}
function Mi(e, t) {
  return e == t;
}
function Ci(e) {
  return !Array.isArray(e) && !isNaN(e);
}
y("cloak", (e) => queueMicrotask(() => g(() => e.removeAttribute($("cloak")))));
zt(() => `[${$("init")}]`);
y("init", pe((e, { expression: t }, { evaluate: n }) => typeof t == "string" ? !!t.trim() && n(t, {}, !1) : n(t, {}, !1)));
y("text", (e, { expression: t }, { effect: n, evaluateLater: r }) => {
  let i = r(t);
  n(() => {
    i((a) => {
      g(() => {
        e.textContent = a;
      });
    });
  });
});
y("html", (e, { expression: t }, { effect: n, evaluateLater: r }) => {
  let i = r(t);
  n(() => {
    i((a) => {
      g(() => {
        e.innerHTML = a, e._x_ignoreSelf = !0, P(e), delete e._x_ignoreSelf;
      });
    });
  });
});
Ye(Lt(":", Ot($("bind:"))));
y("bind", (e, { value: t, modifiers: n, expression: r, original: i }, { effect: a }) => {
  if (!t) {
    let o = {};
    Rr(o), M(e, r)((c) => {
      Zt(e, c, i);
    }, { scope: o });
    return;
  }
  if (t === "key")
    return xi(e, r);
  let s = M(e, r);
  a(() => s((o) => {
    o === void 0 && typeof r == "string" && r.match(/\./) && (o = ""), g(() => qt(e, t, o, n));
  }));
});
function xi(e, t) {
  e._x_keyExpression = t;
}
$t(() => `[${$("data")}]`);
y("data", pe((e, { expression: t }, { cleanup: n }) => {
  t = t === "" ? "{}" : t;
  let r = {};
  Te(r, e);
  let i = {};
  Lr(i, r);
  let a = N(e, t, { scope: i });
  a === void 0 && (a = {}), Te(a, e);
  let s = W(a);
  St(s);
  let o = Z(e, s);
  s.init && N(e, s.init), n(() => {
    s.destroy && N(e, s.destroy), o();
  });
}));
y("show", (e, { modifiers: t, expression: n }, { effect: r }) => {
  let i = M(e, n);
  e._x_doHide || (e._x_doHide = () => {
    g(() => {
      e.style.setProperty("display", "none", t.includes("important") ? "important" : void 0);
    });
  }), e._x_doShow || (e._x_doShow = () => {
    g(() => {
      e.style.length === 1 && e.style.display === "none" ? e.removeAttribute("style") : e.style.removeProperty("display");
    });
  });
  let a = () => {
    e._x_doHide(), e._x_isShown = !1;
  }, s = () => {
    e._x_doShow(), e._x_isShown = !0;
  }, o = () => setTimeout(s), l = Be((f) => f ? s() : a(), (f) => {
    typeof e._x_toggleAndCascadeWithTransitions == "function" ? e._x_toggleAndCascadeWithTransitions(e, f, s, a) : f ? o() : a();
  }), c, u = !0;
  r(() => i((f) => {
    !u && f === c || (t.includes("immediate") && (f ? o() : a()), l(f), c = f, u = !1);
  }));
});
y("for", (e, { expression: t }, { effect: n, cleanup: r }) => {
  let i = Ei(t), a = M(e, i.items), s = M(e, e._x_keyExpression || "index");
  e._x_prevKeys = [], e._x_lookup = {}, n(() => Si(e, i, a, s)), r(() => {
    Object.values(e._x_lookup).forEach((o) => o.remove()), delete e._x_prevKeys, delete e._x_lookup;
  });
});
function Si(e, t, n, r) {
  let i = (s) => typeof s == "object" && !Array.isArray(s), a = e;
  n((s) => {
    Ai(s) && s >= 0 && (s = Array.from(Array(s).keys(), (d) => d + 1)), s === void 0 && (s = []);
    let o = e._x_lookup, l = e._x_prevKeys, c = [], u = [];
    if (i(s))
      s = Object.entries(s).map(([d, h]) => {
        let w = ht(t, h, d, s);
        r((v) => u.push(v), { scope: { index: d, ...w } }), c.push(w);
      });
    else
      for (let d = 0; d < s.length; d++) {
        let h = ht(t, s[d], d, s);
        r((w) => u.push(w), { scope: { index: d, ...h } }), c.push(h);
      }
    let f = [], m = [], b = [], D = [];
    for (let d = 0; d < l.length; d++) {
      let h = l[d];
      u.indexOf(h) === -1 && b.push(h);
    }
    l = l.filter((d) => !b.includes(d));
    let te = "template";
    for (let d = 0; d < u.length; d++) {
      let h = u[d], w = l.indexOf(h);
      if (w === -1)
        l.splice(d, 0, h), f.push([te, d]);
      else if (w !== d) {
        let v = l.splice(d, 1)[0], x = l.splice(w - 1, 1)[0];
        l.splice(d, 0, x), l.splice(w, 0, v), m.push([v, x]);
      } else
        D.push(h);
      te = h;
    }
    for (let d = 0; d < b.length; d++) {
      let h = b[d];
      o[h]._x_effects && o[h]._x_effects.forEach(mt), o[h].remove(), o[h] = null, delete o[h];
    }
    for (let d = 0; d < m.length; d++) {
      let [h, w] = m[d], v = o[h], x = o[w], B = document.createElement("div");
      g(() => {
        x.after(B), v.after(x), x._x_currentIfEl && x.after(x._x_currentIfEl), B.before(v), v._x_currentIfEl && v.after(v._x_currentIfEl), B.remove();
      }), lt(x, c[u.indexOf(w)]);
    }
    for (let d = 0; d < f.length; d++) {
      let [h, w] = f[d], v = h === "template" ? a : o[h];
      v._x_currentIfEl && (v = v._x_currentIfEl);
      let x = c[w], B = u[w], ne = document.importNode(a.content, !0).firstElementChild;
      Z(ne, W(x), a), g(() => {
        v.after(ne), P(ne);
      }), typeof B == "object" && H("x-for key cannot be an object, it must be a string or an integer", a), o[B] = ne;
    }
    for (let d = 0; d < D.length; d++)
      lt(o[D[d]], c[u.indexOf(D[d])]);
    a._x_prevKeys = u;
  });
}
function Ei(e) {
  let t = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/, n = /^\s*\(|\)\s*$/g, r = /([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/, i = e.match(r);
  if (!i)
    return;
  let a = {};
  a.items = i[2].trim();
  let s = i[1].replace(n, "").trim(), o = s.match(t);
  return o ? (a.item = s.replace(t, "").trim(), a.index = o[1].trim(), o[2] && (a.collection = o[2].trim())) : a.item = s, a;
}
function ht(e, t, n, r) {
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
  let r = de(e);
  r._x_refs || (r._x_refs = {}), r._x_refs[t] = e, n(() => delete r._x_refs[t]);
};
y("ref", Pn);
y("if", (e, { expression: t }, { effect: n, cleanup: r }) => {
  let i = M(e, t), a = () => {
    if (e._x_currentIfEl)
      return e._x_currentIfEl;
    let o = e.content.cloneNode(!0).firstElementChild;
    return Z(o, {}, e), g(() => {
      e.after(o), P(o);
    }), e._x_currentIfEl = o, e._x_undoIf = () => {
      F(o, (l) => {
        l._x_effects && l._x_effects.forEach(mt);
      }), o.remove(), delete e._x_currentIfEl;
    }, o;
  }, s = () => {
    e._x_undoIf && (e._x_undoIf(), delete e._x_undoIf);
  };
  n(() => i((o) => {
    o ? a() : s();
  })), r(() => e._x_undoIf && e._x_undoIf());
});
y("id", (e, { expression: t }, { evaluate: n }) => {
  n(t).forEach((i) => pi(e, i));
});
Ye(Lt("@", Ot($("on:"))));
y("on", pe((e, { value: t, modifiers: n, expression: r }, { cleanup: i }) => {
  let a = r ? M(e, r) : () => {
  };
  e.tagName.toLowerCase() === "template" && (e._x_forwardEvents || (e._x_forwardEvents = []), e._x_forwardEvents.includes(t) || e._x_forwardEvents.push(t));
  let s = Vn(e, t, n, (o) => {
    a(() => {
    }, { scope: { $event: o }, params: [o] });
  });
  i(() => s());
}));
xe("Collapse", "collapse", "collapse");
xe("Intersect", "intersect", "intersect");
xe("Focus", "trap", "focus");
xe("Mask", "mask", "mask");
function xe(e, t, n) {
  y(t, (r) => H(`You can't use [x-${t}] without first installing the "${e}" plugin here: https://alpinejs.dev/plugins/${n}`, r));
}
ee.setEvaluator(Vt);
ee.setReactivityEngine({ reactive: st, effect: $r, release: zr, raw: p });
var bi = ee, _ = bi;
function C(e, t, n = {}) {
  try {
    window.FS && window.FS.event(e, {
      ...Vi(t),
      ...n
    });
  } catch {
  }
}
function Vi(e) {
  let t = {};
  if (e.addressViewModel.hasParcelDetails) {
    const n = {
      address_str: e.addressViewModel.parcelDetails.address,
      address_city_str: e.addressViewModel.parcelDetails.city,
      address_state_str: e.addressViewModel.parcelDetails.state,
      address_zip_str: e.addressViewModel.parcelDetails.zip,
      parcel_apn_str: e.addressViewModel.parcelDetails.apn,
      parcel_jurisdiction_str: e.addressViewModel.parcelDetails.jurisdiction
    };
    t = {
      ...t,
      ...n
    };
  } else if (e.addressViewModel.selectedMatch) {
    const n = {
      address_str: e.addressViewModel.selectedMatch.address,
      address_context_str: e.addressViewModel.selectedMatch.context,
      regrid_ll_uuid_str: e.addressViewModel.selectedMatch.ll_uuid
    };
    t = {
      ...t,
      ...n
    };
  }
  if (e.estimateViewModel.hasEstimateResults) {
    const n = {
      jurisdiction_status_str: e.estimateViewModel.jurisdiction.status,
      estimate_low_real: e.estimateViewModel.estimate.low,
      estimate_high_real: e.estimateViewModel.estimate.high
    };
    t = {
      ...t,
      ...n
    };
  }
  if (e.contactViewModel.hasAnyContactDetails) {
    const n = {
      contact_first_name_str: e.contactViewModel.firstName,
      contact_last_name_str: e.contactViewModel.lastName,
      contact_email_str: e.contactViewModel.email,
      contact_phone_str: e.contactViewModel.phone,
      contact_desired_timeline_str: e.contactViewModel.desiredTimeline
    };
    t = {
      ...t,
      ...n
    };
  }
  return t.active_experiment_variations_strs = e.experimentationViewModel.getFullStoryActiveExperimentVariationsEventPropertyValue(), t;
}
function Pi(e) {
  _.store("addressViewModel", {
    inputValue: "",
    matches: [],
    keyboardNavIndex: -1,
    selectedMatch: {},
    parcelDetails: {},
    submitButtonText: {
      normal: "",
      processing: ""
    },
    errorMessage: "",
    get isSelected() {
      return Object.keys(this.selectedMatch).length != 0 && !!this.selectedMatch.ll_uuid;
    },
    get hasParcelDetails() {
      return Object.keys(this.parcelDetails).length != 0 && !!this.parcelDetails.jurisdiction && !!this.parcelDetails.apn;
    },
    init() {
      const t = document.getElementById(
        "address-form-submit-button"
      );
      this.submitButtonText = {
        normal: t.value,
        processing: t.dataset.wait
      };
    },
    async handleInput() {
      this.isSelected && (this.selectedMatch = {}), this.hasParcelDetails && (this.parcelDetails = {}), e.estimateViewModel.hasResults && e.estimateViewModel.init(), e.contactViewModel.isSubmitted && (e.contactViewModel.isSubmitted = !1), e.experimentationViewModel.getActiveExperimentVariation(
        "windfall-estimate-or-eligibility-2023-07"
      ) && e.experimentationViewModel.clearActiveExperiment(
        "windfall-estimate-or-eligibility-2023-07"
      );
      try {
        this.matches = await ki(this.inputValue);
      } catch {
        this.errorMessage = "There was an error finding your address. Please try again, or contact us for help.", e.flowState.value = e.flowStateMachine.transition(
          e.flowState.value,
          "ERROR"
        );
      }
    },
    handleKeydown(t) {
      t.key != "Enter" && t.key != "ArrowUp" && t.key != "ArrowDown" || this.isSelected || this.matches.length === 0 || (t.preventDefault(), t.stopPropagation(), t.key === "Enter" && this.keyboardNavIndex != -1 ? this.handleMatchSelection(this.matches[this.keyboardNavIndex]) : t.key === "ArrowUp" ? this.keyboardNavIndex = this.keyboardNavIndex <= -1 ? this.matches.length - 1 : this.keyboardNavIndex - 1 : t.key === "ArrowDown" && (this.keyboardNavIndex = this.keyboardNavIndex >= this.matches.length - 1 ? -1 : this.keyboardNavIndex + 1));
    },
    handleMatchSelection(t) {
      this.selectedMatch = t, this.inputValue = t.address + ", " + t.context, this.matches = [], this.keyboardNavIndex = -1, C("Address Selected", e);
    },
    handleSubmit(t, n = {}) {
      t.preventDefault(), t.stopPropagation(), this.submitAddress(n);
    },
    async submitAddress(t = {}) {
      var n;
      if (!(e.flowState.value == "addressFormProcessing" || e.flowState.value == "modalAddressFormProcessing")) {
        (n = document.activeElement) == null || n.blur(), this.errorMessage = "", e.flowState.value = e.flowStateMachine.transition(
          e.flowState.value,
          "SUBMIT_ADDRESS"
        ), C("Address Submitted", e);
        try {
          if (this.hasParcelDetails && e.estimateViewModel.hasResults && e.contactViewModel.isSubmitted)
            e.flowState.value = e.flowStateMachine.transition(
              e.flowState.value,
              "SKIP_CONTACT"
            );
          else {
            if (e.addressViewModel.hasParcelDetails || (e.addressViewModel.parcelDetails = {
              ...await Oi(
                e.addressViewModel.selectedMatch.ll_uuid
              ),
              address: e.addressViewModel.selectedMatch.address,
              city: e.addressViewModel.selectedMatch.context.split(
                ", "
              )[0],
              state: e.addressViewModel.selectedMatch.context.split(
                ", "
              )[1]
            }), !e.estimateViewModel.hasResults) {
              const r = {
                ...t,
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
              }, i = await Di(r);
              e.estimateViewModel.jurisdiction = i.jurisdiction, e.estimateViewModel.estimate = i.estimate;
            }
            e.flowState.value = e.flowStateMachine.transition(
              e.flowState.value,
              "SUCCESS"
            ), C("Address Submission Succeeded", e);
          }
        } catch {
          e.flowState.value = e.flowStateMachine.transition(
            e.flowState.value,
            "SUCCESS"
          ), C("Address Submission Errors (Non-Blocking)", e);
        }
      }
    }
  }), e.addressViewModel = _.store("addressViewModel");
}
async function ki(e) {
  const t = "https://app.regrid.com/api/v1/typeahead.json", n = "1SnpL7AQekjA4mH2vqUmkGm9AAfQxi_6mxwdm4qDzo_C-xSTx9z3pd9rTsRWDWV4", r = new Request(`${t}/?token=${n}&query=${e}`, {
    method: "GET"
  }), i = await fetch(r);
  if (!i.ok)
    throw new Error("Network response was not OK");
  const a = await i.json();
  return Ri(a);
}
function Ri(e) {
  return e.filter((r) => r.ll_uuid && r.address && r.address.match(/^[0-9].*[^0-9]$/)).sort((r, i) => {
    const a = Ti(r, i);
    return a != 0 ? a : Li(r, i);
  }).slice(0, 10);
}
function Ti(e, t) {
  return ae(e) && !ae(t) ? -1 : !ae(e) && ae(t) ? 1 : 0;
}
function ae(e) {
  return e.context.endsWith("CA");
}
function Li(e, t) {
  return e.score > t.score ? -1 : e.score < t.score ? 1 : 0;
}
async function Oi(e) {
  const t = "https://app.regrid.com/api/v1/parcel/", n = "1SnpL7AQekjA4mH2vqUmkGm9AAfQxi_6mxwdm4qDzo_C-xSTx9z3pd9rTsRWDWV4", r = new Request(
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
    // address: regridResultFields.address,
    // city: regridResultFields.scity,
    // state: regridResultFields.state2,
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
async function pt(e, t = {}) {
  return new Promise(function(n, r) {
    const i = document.createElement("script");
    i.src = e, t.defer ? i.defer = !0 : t.async && (i.async = !0), i.addEventListener("load", function() {
      n();
    }), i.addEventListener("error", function(a) {
      r(a);
    }), document.body.appendChild(i);
  });
}
function Bi(e) {
  _.store("contactViewModel", {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    desiredTimeline: "",
    submitButtonText: {
      normal: "",
      processing: ""
    },
    errorMessage: "",
    get hasAnyContactDetails() {
      return !!this.firstName.trim() || !!this.lastName.trim() || !!this.email.trim() || !!this.phone.trim();
    },
    isSubmitted: !1,
    lotAnalysisStep: "",
    init() {
      this.firstName = "", this.lastName = "", this.email = "", this.phone = "", this.desiredTimeline = "", this.errorMessage = "", this.isSubmitted = !1, this.lotAnalysisStep = "Checking...";
      const t = document.getElementById(
        "contact-form-submit-button"
      );
      this.submitButtonText = {
        normal: t.value,
        processing: t.dataset.wait
      };
    },
    formatPhoneInput(t) {
      return Ni(t);
    },
    handleSubmit(t, n = {}) {
      t.preventDefault(), t.stopPropagation(), this.submitContact(n);
    },
    async submitContact(t = {}) {
      var n;
      if (e.flowState.value != "contactFormProcessing") {
        if ((n = document.activeElement) == null || n.blur(), this.errorMessage = "", e.flowState.value = e.flowStateMachine.transition(
          e.flowState.value,
          "SUBMIT_CONTACT"
        ), e.estimateViewModel.hasActiveJurisdiction && e.estimateViewModel.hasEstimate && t && t.lead && t.lead.type && t.lead.type === "Windfall") {
          const r = "windfall-estimate-or-eligibility-2023-07", i = Math.random() < 0.5 ? "amount-excluded" : "amount-included";
          e.experimentationViewModel.setActiveExperimentVariation(
            r,
            i
          );
        }
        C("Contact Submitted", e);
        try {
          let r = {
            firstName: this.firstName.trim(),
            lastName: this.lastName.trim(),
            email: this.email.trim(),
            phone: this.phone.trim(),
            desiredTimeline: this.desiredTimeline.trim()
          };
          if (!Ii(r.email))
            throw new Error(
              "Please enter a valid email address, and try again.",
              { cause: "INVALID_EMAIL" }
            );
          if (!Hi(r.phone))
            throw new Error(
              "Please enter a valid phone number, including area code, and try again.",
              { cause: "INVALID_PHONE" }
            );
          e.addressViewModel.hasParcelDetails ? r = {
            ...r,
            ...e.addressViewModel.parcelDetails
          } : e.addressViewModel.isSelected && (r = {
            ...r,
            address: [
              e.addressViewModel.selectedMatch.address,
              e.addressViewModel.selectedMatch.context
            ].join(", ")
          });
          const i = {
            ...t,
            contact: r,
            activeExperimentVariations: e.experimentationViewModel.activeExperimentVariations
          };
          if (await Promise.all([
            ji(this),
            Wi(i)
          ]), (!e.estimateViewModel.hasResults || e.estimateViewModel.hasActiveJurisdiction) && pt("https://assets.calendly.com/assets/external/widget.js", {
            async: !0
          }), e.estimateViewModel.hasActiveJurisdiction && e.estimateViewModel.hasEstimate && await pt(
            "https://cdn.jsdelivr.net/npm/tsparticles-confetti@2.11.0/tsparticles.confetti.bundle.min.js",
            { async: !0 }
          ), this.isSubmitted = !0, e.flowState.value = e.flowStateMachine.transition(
            e.flowState.value,
            "SUCCESS"
          ), e.estimateViewModel.hasActiveJurisdiction && e.estimateViewModel.hasEstimate && window.confetti) {
            const a = t && t.lead && t.lead.type && t.lead.type === "webuyCAlots" ? ["ffffff", "#1c429c", "#f0bd1b"] : ["#ffffff", "#4cbd98", "#346af8"];
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
                colors: a,
                zIndex: 9999,
                disableForReducedMotion: !0
              });
            }, 500);
          }
          C("Contact Submission Succeeded", e);
        } catch (r) {
          r && r.cause && (r.cause === "INVALID_EMAIL" || r.cause === "INVALID_PHONE") ? this.errorMessage = r.message : this.errorMessage = "There was an error processing your info. Please try again, or contact us for help.", e.flowState.value = e.flowStateMachine.transition(
            e.flowState.value,
            "ERROR"
          ), C("Contact Submission Failed", e, {
            error_str: this.errorMessage
          });
        }
      }
    }
  }), e.contactViewModel = _.store("contactViewModel");
}
function Ni(e) {
  const t = e.replace(/\D/g, ""), n = t.startsWith("1"), a = (n ? t.slice(1) : t).slice(0, 10).match(
    /^(\d{0,3})(\d{0,3})(\d{0,4})$/
  ), s = n ? "1" : "", o = a[1] ? (n ? " " : "") + ("(" + a[1]) : "", l = a[2] ? ") " + a[2] : "", c = a[3] ? "-" + a[3] : "";
  return s + o + l + c;
}
function Ii(e) {
  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(e);
}
function Hi(e) {
  return /^\+?1?\s?(\()?\d{3}(\))?[-.\s]?\d{3}[-.\s]?\d{4}$|^\d{10}$/.test(e);
}
async function ji(e) {
  const t = [
    "Checking flood zones...",
    "Checking fire hazard zones...",
    "Checking zoning district...",
    "Checking lot shape & size..."
  ];
  for (const n of t)
    e.lotAnalysisStep = n, await new Promise((r) => {
      setTimeout(r, 1500);
    });
}
async function Wi(e) {
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
function $i(e) {
  _.store("estimateViewModel", {
    jurisdiction: {
      status: ""
    },
    estimate: {
      low: null,
      high: null
    },
    get hasResults() {
      return !!this.jurisdiction.status;
    },
    get hasActiveJurisdiction() {
      return this.jurisdiction.status == "active";
    },
    get hasEstimate() {
      return !!this.estimate.low && !!this.estimate.high;
    },
    get lowEstimateString() {
      return new Intl.NumberFormat(void 0, {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0
      }).format(Math.round(this.estimate.low));
    },
    get highEstimateString() {
      return new Intl.NumberFormat(void 0, {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0
      }).format(Math.round(this.estimate.high));
    },
    init() {
      this.jurisdiction = {
        status: ""
      }, this.estimate = {
        low: null,
        high: null
      };
    },
    handleScheduleConsultationClick(t) {
      t.preventDefault(), t.stopPropagation(), e.flowState.value = e.flowStateMachine.transition(
        e.flowState.value,
        "SCHEDULE"
      ), C("Schedule Consultation Clicked", e);
    },
    handleRequestCommunityClick(t) {
      t.preventDefault(), t.stopPropagation(), e.flowState.value = e.flowStateMachine.transition(
        e.flowState.value,
        "REQUEST_COMMUNITY"
      ), C("Community Requested", e);
    }
  }), e.estimateViewModel = _.store("estimateViewModel");
}
function zi(e) {
  _.store("personalizationViewModel", {
    userGeo: {},
    marketsData: {},
    get market() {
      return kn(this.userGeo.city, this.marketsData);
    },
    get bcPhoneNumber() {
      return Gi(this.userGeo.city, this.marketsData);
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
      const t = await fetch("https://get.geojs.io/v1/ip/geo.json");
      this.userGeo = await t.json();
    }
  }), e.personalizationViewModel = _.store(
    "personalizationViewModel"
  );
}
function Gi(e, t) {
  const n = "(415) 941-5861";
  if (!e || typeof e != "string")
    return n;
  const r = kn(e, t);
  return Ki(
    r,
    t
  ) ?? n;
}
function kn(e, t) {
  if (!e || typeof e != "string")
    return null;
  for (const n of Object.keys(t))
    if (t[n].cities.filter(
      (r) => r.toLowerCase().trim() === e.toLowerCase().trim()
    ).length > 0)
      return n;
  return null;
}
function Ki(e, t) {
  if (!e || typeof e != "string")
    return null;
  for (const n of Object.keys(t))
    if (n.toLowerCase().trim() === e.toLowerCase().trim())
      return t[n].bcPhoneNumber ?? null;
  return null;
}
function qi(e) {
  _.store("experimentationViewModel", {
    activeExperimentVariations: {},
    setActiveExperimentVariation(t, n) {
      this.activeExperimentVariations[t] = n;
    },
    getActiveExperimentVariation(t) {
      return this.activeExperimentVariations[t];
    },
    clearActiveExperiment(t) {
      this.activeExperimentVariations[t] && delete this.activeExperimentVariations[t];
    },
    getFullStoryActiveExperimentVariationsEventPropertyValue() {
      return Object.entries(this.activeExperimentVariations).map(
        ([t, n]) => `${t}:${n}`
      );
    },
    init() {
      this.activeExperimentVariations = {};
    }
  }), e.experimentationViewModel = _.store(
    "experimentationViewModel"
  );
}
function Ui(e) {
  _.store("aduCalculatorViewModel", {
    homeValue: null,
    homeSize: null,
    aduCost: null,
    aduSize: null,
    result: null,
    init: function() {
      this.homeValue = this.formatInput("1000000"), this.homeSize = this.formatInput("2000"), this.aduCost = this.formatInput("250000"), this.aduSize = this.formatInput("800"), this.result = this.calculateResult();
    },
    handleInput: function(t) {
      t.target.value = this.formatInput(t.target.value), this.result = this.calculateResult();
    },
    handleSubmit: function(t) {
      t.preventDefault();
    },
    formatInput: function(t) {
      const n = "en-US";
      let r = t;
      return r = r.replace(/\D/g, ""), r = new Intl.NumberFormat(n, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(r), r = r !== "0" ? r : "", r;
    },
    calculateResult: function() {
      const t = this.convertFieldValueToNumber(this.homeValue), n = this.convertFieldValueToNumber(this.homeSize), r = this.convertFieldValueToNumber(this.aduCost), i = this.convertFieldValueToNumber(this.aduSize);
      if (!t || !n || !i)
        return "--";
      let a = t / n * i - r - 5e4;
      return a = a < 1e4 ? 1e4 : Math.ceil(a / 1e4) * 1e4, a = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(a), a;
    },
    convertFieldValueToNumber: function(t) {
      return Number(t.replace(/[^0-9.-]+/g, ""));
    }
  }), e.aduCalculatorViewModel = _.store("aduCalculatorViewModel");
}
function Ji(e) {
  const t = {
    SUBMIT_ADDRESS: {
      target: "addressFormProcessing"
    }
  }, n = {
    SUBMIT_ADDRESS: {
      target: "modalAddressFormProcessing"
    }
  }, r = {
    SUBMIT_CONTACT: {
      target: "contactFormProcessing"
    }
  }, i = {
    EXIT: {
      target: "default"
    }
  };
  _.store("flowStateMachine", {
    defaultState: "default",
    states: {
      default: {
        transitions: {
          ...t,
          START_MODAL_FLOW: {
            target: "modalAddressForm"
          }
        }
      },
      addressFormProcessing: {
        transitions: {
          SUCCESS: {
            target: "contactForm"
          },
          SKIP_CONTACT: {
            target: "estimateResults"
          },
          ERROR: {
            target: "addressFormError"
          }
        }
      },
      addressFormError: {
        transitions: {
          ...t
        }
      },
      modalAddressForm: {
        transitions: {
          ...n,
          ...i
        }
      },
      modalAddressFormProcessing: {
        transitions: {
          SUCCESS: {
            target: "contactForm"
          },
          SKIP_CONTACT: {
            target: "estimateResults"
          },
          ERROR: {
            target: "modalAddressFormError"
          },
          ...i
        }
      },
      modalAddressFormError: {
        transitions: {
          ...n,
          ...i
        }
      },
      contactForm: {
        transitions: {
          ...r,
          ...i
        }
      },
      contactFormProcessing: {
        transitions: {
          SUCCESS: {
            target: "estimateResults"
          },
          ERROR: {
            target: "contactFormError"
          },
          ...i
        }
      },
      contactFormError: {
        transitions: {
          ...r,
          ...i
        }
      },
      estimateResults: {
        transitions: {
          SCHEDULE: {
            target: "scheduleConsultation"
          },
          REQUEST_COMMUNITY: {
            target: "requestedCommunity"
          },
          ...i
        }
      },
      scheduleConsultation: {
        transitions: {
          ...i
        }
      },
      requestedCommunity: {
        transitions: {
          ...i
        }
      }
    },
    // Method to trigger state transitions, given the current state, and a valid transition event
    // For a successful transition, returns the resulting state
    transition(a, s) {
      const l = this.states[a].transitions[s];
      return l ? l.target : (C("Invalid State Transition Triggered", e, {
        current_state_str: a,
        event_str: s
      }), a);
    }
  }), e.flowStateMachine = _.store("flowStateMachine");
}
function Yi(e) {
  _.store("flowState", {
    value: "",
    init() {
      this.value = e.flowStateMachine.defaultState;
    }
  }), e.flowState = _.store("flowState");
}
function Qi(e) {
  _.store("modalHelpers", {
    get isOpen() {
      return e.flowState.value == "modalAddressForm" || e.flowState.value == "modalAddressFormProcessing" || e.flowState.value == "modalAddressFormError" || e.flowState.value == "contactForm" || e.flowState.value == "contactFormProcessing" || e.flowState.value == "contactFormError" || e.flowState.value == "estimateResults" || e.flowState.value == "scheduleConsultation" || e.flowState.value == "requestedCommunity";
    },
    handleModalFlowStart(t = null) {
      e.flowState.value = e.flowStateMachine.transition(
        e.flowState.value,
        "START_MODAL_FLOW"
      );
      let n = {};
      t && (n = {
        cta_str: t
      }), C("Modal Get Offer Flow Opened", e, n);
    },
    handleModalClose() {
      let t = !0;
      e.flowState.value == "contactForm" && e.contactViewModel.hasAnyContactDetails && (t = confirm(
        "Are you sure you want to stop before you've seen how much your extra lot space could be worth?"
      )), e.flowState.value == "contactFormProcessing" && (t = !1), t && (e.flowState.value = e.flowStateMachine.transition(
        e.flowState.value,
        "EXIT"
      ), C("Get Offer Modal Closed", e));
    }
  }), e.modalHelpers = _.store("modalHelpers");
}
window.Alpine = _;
const Zi = {};
Xi(Zi);
_.start();
function Xi(e) {
  ea(e), ta(e), na(e);
}
function ea(e) {
  Pi(e), Bi(e), $i(e), zi(e), qi(e), Ui(e);
}
function ta(e) {
  Ji(e), Yi(e);
}
function na(e) {
  Qi(e);
}
