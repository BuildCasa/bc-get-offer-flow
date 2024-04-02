var lt = (e, t, n) => {
  if (!t.has(e))
    throw TypeError("Cannot " + n);
};
var Se = (e, t, n) => (lt(e, t, "read from private field"), n ? n.call(e) : t.get(e)), ct = (e, t, n) => {
  if (t.has(e))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(e) : t.set(e, n);
}, ut = (e, t, n, r) => (lt(e, t, "write to private field"), r ? r.call(e, n) : t.set(e, n), n);
var ke = !1, Ve = !1, R = [];
function Fn(e) {
  Dn(e);
}
function Dn(e) {
  R.includes(e) || R.push(e), Bn();
}
function gt(e) {
  let t = R.indexOf(e);
  t !== -1 && R.splice(t, 1);
}
function Bn() {
  !Ve && !ke && (ke = !0, queueMicrotask(Nn));
}
function Nn() {
  ke = !1, Ve = !0;
  for (let e = 0; e < R.length; e++)
    R[e]();
  R.length = 0, Ve = !1;
}
var W, Q, ue, vt, Re = !0;
function In(e) {
  Re = !1, e(), Re = !0;
}
function Hn(e) {
  W = e.reactive, ue = e.release, Q = (t) => e.effect(t, { scheduler: (n) => {
    Re ? Fn(n) : n();
  } }), vt = e.raw;
}
function dt(e) {
  Q = e;
}
function jn(e) {
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
var Mt = [], xt = [], Ct = [];
function Wn(e) {
  Ct.push(e);
}
function St(e, t) {
  typeof t == "function" ? (e._x_cleanups || (e._x_cleanups = []), e._x_cleanups.push(t)) : (t = e, xt.push(t));
}
function $n(e) {
  Mt.push(e);
}
function Gn(e, t, n) {
  e._x_attributeCleanups || (e._x_attributeCleanups = {}), e._x_attributeCleanups[t] || (e._x_attributeCleanups[t] = []), e._x_attributeCleanups[t].push(n);
}
function Et(e, t) {
  e._x_attributeCleanups && Object.entries(e._x_attributeCleanups).forEach(([n, r]) => {
    (t === void 0 || t.includes(n)) && (r.forEach((i) => i()), delete e._x_attributeCleanups[n]);
  });
}
var Ke = new MutationObserver(Ue), ze = !1;
function At() {
  Ke.observe(document, { subtree: !0, childList: !0, attributes: !0, attributeOldValue: !0 }), ze = !0;
}
function Kn() {
  zn(), Ke.disconnect(), ze = !1;
}
var q = [], Ee = !1;
function zn() {
  q = q.concat(Ke.takeRecords()), q.length && !Ee && (Ee = !0, queueMicrotask(() => {
    qn(), Ee = !1;
  }));
}
function qn() {
  Ue(q), q.length = 0;
}
function w(e) {
  if (!ze)
    return e();
  Kn();
  let t = e();
  return At(), t;
}
var qe = !1, oe = [];
function Un() {
  qe = !0;
}
function Jn() {
  qe = !1, Ue(oe), oe = [];
}
function Ue(e) {
  if (qe) {
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
    Et(s, a);
  }), r.forEach((a, s) => {
    Mt.forEach((o) => o(s, a));
  });
  for (let a of n)
    if (!t.includes(a) && (xt.forEach((s) => s(a)), a._x_cleanups))
      for (; a._x_cleanups.length; )
        a._x_cleanups.pop()();
  t.forEach((a) => {
    a._x_ignoreSelf = !0, a._x_ignore = !0;
  });
  for (let a of t)
    n.includes(a) || a.isConnected && (delete a._x_ignoreSelf, delete a._x_ignore, Ct.forEach((s) => s(a)), a._x_ignore = !0, a._x_ignoreSelf = !0);
  t.forEach((a) => {
    delete a._x_ignoreSelf, delete a._x_ignore;
  }), t = null, n = null, r = null, i = null;
}
function bt(e) {
  return X(I(e));
}
function Z(e, t, n) {
  return e._x_dataStack = [t, ...I(n || e)], () => {
    e._x_dataStack = e._x_dataStack.filter((r) => r !== t);
  };
}
function ft(e, t) {
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
function Pt(e) {
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
function kt(e, t = () => {
}) {
  let n = {
    initialValue: void 0,
    _x_interceptor: !0,
    initialize(r, i, a) {
      return e(this.initialValue, () => Yn(r, i), (s) => Le(r, i, s), i, a);
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
function Yn(e, t) {
  return t.split(".").reduce((n, r) => n[r], e);
}
function Le(e, t, n) {
  if (typeof t == "string" && (t = t.split(".")), t.length === 1)
    e[t[0]] = n;
  else {
    if (t.length === 0)
      throw error;
    return e[t[0]] || (e[t[0]] = {}), Le(e[t[0]], t.slice(1), n);
  }
}
var Vt = {};
function S(e, t) {
  Vt[e] = t;
}
function Te(e, t) {
  return Object.entries(Vt).forEach(([n, r]) => {
    Object.defineProperty(e, `$${n}`, {
      get() {
        let [i, a] = Dt(t);
        return i = { interceptor: kt, ...i }, St(t, a), r(t, i);
      },
      enumerable: !1
    });
  }), e;
}
function Qn(e, t, n, ...r) {
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
function Zn(e) {
  let t = se;
  se = !1, e(), se = t;
}
function B(e, t, n = {}) {
  let r;
  return v(e, t)((i) => r = i, n), r;
}
function v(...e) {
  return Rt(...e);
}
var Rt = Lt;
function Xn(e) {
  Rt = e;
}
function Lt(e, t) {
  let n = {};
  Te(n, e);
  let r = [n, ...I(e)];
  if (typeof t == "function")
    return er(r, t);
  let i = nr(r, t, e);
  return Qn.bind(null, e, t, i);
}
function er(e, t) {
  return (n = () => {
  }, { scope: r = {}, params: i = [] } = {}) => {
    let a = t.apply(X([r, ...e]), i);
    le(n, a);
  };
}
var Ae = {};
function tr(e, t) {
  if (Ae[e])
    return Ae[e];
  let n = Object.getPrototypeOf(async function() {
  }).constructor, r = /^[\n\s]*if.*\(.*\)/.test(e) || /^(let|const)\s/.test(e) ? `(() => { ${e} })()` : e, a = (() => {
    try {
      return new n(["__self", "scope"], `with (scope) { __self.result = ${r} }; __self.finished = true; return __self.result;`);
    } catch (s) {
      return Y(s, t, e), Promise.resolve();
    }
  })();
  return Ae[e] = a, a;
}
function nr(e, t, n) {
  let r = tr(t, n);
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
var Je = "x-";
function $(e = "") {
  return Je + e;
}
function rr(e) {
  Je = e;
}
var Tt = {};
function _(e, t) {
  Tt[e] = t;
}
function Ye(e, t, n) {
  if (t = Array.from(t), e._x_virtualDirectives) {
    let a = Object.entries(e._x_virtualDirectives).map(([o, l]) => ({ name: o, value: l })), s = Ot(a);
    a = a.map((o) => s.find((l) => l.name === o.name) ? {
      name: `x-bind:${o.name}`,
      value: `"${o.value}"`
    } : o), t = t.concat(a);
  }
  let r = {};
  return t.map(It((a, s) => r[a] = s)).filter(jt).map(sr(r, n)).sort(or).map((a) => ar(e, a));
}
function Ot(e) {
  return Array.from(e).map(It()).filter((t) => !jt(t));
}
var Oe = !1, z = /* @__PURE__ */ new Map(), Ft = Symbol();
function ir(e) {
  Oe = !0;
  let t = Symbol();
  Ft = t, z.set(t, []);
  let n = () => {
    for (; z.get(t).length; )
      z.get(t).shift()();
    z.delete(t);
  }, r = () => {
    Oe = !1, n();
  };
  e(n), r();
}
function Dt(e) {
  let t = [], n = (o) => t.push(o), [r, i] = jn(e);
  return t.push(i), [{
    Alpine: ee,
    effect: r,
    cleanup: n,
    evaluateLater: v.bind(v, e),
    evaluate: B.bind(B, e)
  }, () => t.forEach((o) => o())];
}
function ar(e, t) {
  let n = () => {
  }, r = Tt[t.type] || n, [i, a] = Dt(e);
  Gn(e, t.original, a);
  let s = () => {
    e._x_ignore || e._x_ignoreSelf || (r.inline && r.inline(e, t, i), r = r.bind(r, e, t, i), Oe ? z.get(Ft).push(r) : r());
  };
  return s.runCleanups = a, s;
}
var Bt = (e, t) => ({ name: n, value: r }) => (n.startsWith(e) && (n = n.replace(e, t)), { name: n, value: r }), Nt = (e) => e;
function It(e = () => {
}) {
  return ({ name: t, value: n }) => {
    let { name: r, value: i } = Ht.reduce((a, s) => s(a), { name: t, value: n });
    return r !== t && e(r, t), { name: r, value: i };
  };
}
var Ht = [];
function Qe(e) {
  Ht.push(e);
}
function jt({ name: e }) {
  return Wt().test(e);
}
var Wt = () => new RegExp(`^${Je}([^:^.]+)\\b`);
function sr(e, t) {
  return ({ name: n, value: r }) => {
    let i = n.match(Wt()), a = n.match(/:([a-zA-Z0-9\-:]+)/), s = n.match(/\.[^.\]]+(?=[^\]]*$)/g) || [], o = t || e[n] || n;
    return {
      type: i ? i[1] : null,
      value: a ? a[1] : null,
      modifiers: s.map((l) => l.replace(".", "")),
      expression: r,
      original: o
    };
  };
}
var Fe = "DEFAULT", re = [
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
  Fe,
  "teleport"
];
function or(e, t) {
  let n = re.indexOf(e.type) === -1 ? Fe : e.type, r = re.indexOf(t.type) === -1 ? Fe : t.type;
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
var De = [], Ze = !1;
function $t(e = () => {
}) {
  return queueMicrotask(() => {
    Ze || setTimeout(() => {
      Be();
    });
  }), new Promise((t) => {
    De.push(() => {
      e(), t();
    });
  });
}
function Be() {
  for (Ze = !1; De.length; )
    De.shift()();
}
function lr() {
  Ze = !0;
}
function O(e, t) {
  if (typeof ShadowRoot == "function" && e instanceof ShadowRoot) {
    Array.from(e.children).forEach((i) => O(i, t));
    return;
  }
  let n = !1;
  if (t(e, () => n = !0), n)
    return;
  let r = e.firstElementChild;
  for (; r; )
    O(r, t), r = r.nextElementSibling;
}
function H(e, ...t) {
  console.warn(`Alpine Warning: ${e}`, ...t);
}
function cr() {
  document.body || H("Unable to initialize. Trying to load Alpine before `<body>` is available. Did you forget to add `defer` in Alpine's `<script>` tag?"), U(document, "alpine:init"), U(document, "alpine:initializing"), At(), Wn((t) => P(t, O)), St((t) => dr(t)), $n((t, n) => {
    Ye(t, n).forEach((r) => r());
  });
  let e = (t) => !de(t.parentElement, !0);
  Array.from(document.querySelectorAll(zt())).filter(e).forEach((t) => {
    P(t);
  }), U(document, "alpine:initialized");
}
var Xe = [], Gt = [];
function Kt() {
  return Xe.map((e) => e());
}
function zt() {
  return Xe.concat(Gt).map((e) => e());
}
function qt(e) {
  Xe.push(e);
}
function Ut(e) {
  Gt.push(e);
}
function de(e, t = !1) {
  return fe(e, (n) => {
    if ((t ? zt() : Kt()).some((i) => n.matches(i)))
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
function ur(e) {
  return Kt().some((t) => e.matches(t));
}
function P(e, t = O) {
  ir(() => {
    t(e, (n, r) => {
      Ye(n, n.attributes).forEach((i) => i()), n._x_ignore && r();
    });
  });
}
function dr(e) {
  O(e, (t) => Et(t));
}
function et(e, t) {
  return Array.isArray(t) ? ht(e, t.join(" ")) : typeof t == "object" && t !== null ? fr(e, t) : typeof t == "function" ? et(e, t()) : ht(e, t);
}
function ht(e, t) {
  let n = (i) => i.split(" ").filter((a) => !e.classList.contains(a)).filter(Boolean), r = (i) => (e.classList.add(...i), () => {
    e.classList.remove(...i);
  });
  return t = t === !0 ? t = "" : t || "", r(n(t));
}
function fr(e, t) {
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
  return typeof t == "object" && t !== null ? hr(e, t) : pr(e, t);
}
function hr(e, t) {
  let n = {};
  return Object.entries(t).forEach(([r, i]) => {
    n[r] = e.style[r], r.startsWith("--") || (r = mr(r)), e.style.setProperty(r, i);
  }), setTimeout(() => {
    e.style.length === 0 && e.removeAttribute("style");
  }), () => {
    he(e, n);
  };
}
function pr(e, t) {
  let n = e.getAttribute("style", t);
  return e.setAttribute("style", t), () => {
    e.setAttribute("style", n || "");
  };
}
function mr(e) {
  return e.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}
function Ne(e, t = () => {
}) {
  let n = !1;
  return function() {
    n ? t.apply(this, arguments) : (n = !0, e.apply(this, arguments));
  };
}
_("transition", (e, { value: t, modifiers: n, expression: r }, { evaluate: i }) => {
  typeof r == "function" && (r = i(r)), r ? _r(e, r, t) : yr(e, n, t);
});
function _r(e, t, n) {
  Jt(e, et, ""), {
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
function yr(e, t, n) {
  Jt(e, he);
  let r = !t.includes("in") && !t.includes("out") && !n, i = r || t.includes("in") || ["enter"].includes(n), a = r || t.includes("out") || ["leave"].includes(n);
  t.includes("in") && !r && (t = t.filter((h, y) => y < t.indexOf("out"))), t.includes("out") && !r && (t = t.filter((h, y) => y > t.indexOf("out")));
  let s = !t.includes("opacity") && !t.includes("scale"), o = s || t.includes("opacity"), l = s || t.includes("scale"), c = o ? 0 : 1, u = l ? G(t, "scale", 95) / 100 : 1, f = G(t, "delay", 0), m = G(t, "origin", "center"), A = "opacity, transform", F = G(t, "duration", 150) / 1e3, te = G(t, "duration", 75) / 1e3, d = "cubic-bezier(0.4, 0.0, 0.2, 1)";
  i && (e._x_transition.enter.during = {
    transformOrigin: m,
    transitionDelay: f,
    transitionProperty: A,
    transitionDuration: `${F}s`,
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
    transitionProperty: A,
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
function Jt(e, t, n = {}) {
  e._x_transition || (e._x_transition = {
    enter: { during: n, start: n, end: n },
    leave: { during: n, start: n, end: n },
    in(r = () => {
    }, i = () => {
    }) {
      Ie(e, t, {
        during: this.enter.during,
        start: this.enter.start,
        end: this.enter.end
      }, r, i);
    },
    out(r = () => {
    }, i = () => {
    }) {
      Ie(e, t, {
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
    let s = Yt(e);
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
function Yt(e) {
  let t = e.parentNode;
  if (t)
    return t._x_hidePromise ? t : Yt(t);
}
function Ie(e, t, { during: n, start: r, end: i } = {}, a = () => {
}, s = () => {
}) {
  if (e._x_transitioning && e._x_transitioning.cancel(), Object.keys(n).length === 0 && Object.keys(r).length === 0 && Object.keys(i).length === 0) {
    a(), s();
    return;
  }
  let o, l, c;
  wr(e, {
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
function wr(e, t) {
  let n, r, i, a = Ne(() => {
    w(() => {
      n = !0, r || t.before(), i || (t.end(), Be()), t.after(), e.isConnected && t.cleanup(), delete e._x_transitioning;
    });
  });
  e._x_transitioning = {
    beforeCancels: [],
    beforeCancel(s) {
      this.beforeCancels.push(s);
    },
    cancel: Ne(function() {
      for (; this.beforeCancels.length; )
        this.beforeCancels.shift()();
      a();
    }),
    finish: a
  }, w(() => {
    t.start(), t.during();
  }), lr(), requestAnimationFrame(() => {
    if (n)
      return;
    let s = Number(getComputedStyle(e).transitionDuration.replace(/,.*/, "").replace("s", "")) * 1e3, o = Number(getComputedStyle(e).transitionDelay.replace(/,.*/, "").replace("s", "")) * 1e3;
    s === 0 && (s = Number(getComputedStyle(e).animationDuration.replace("s", "")) * 1e3), w(() => {
      t.before();
    }), r = !0, requestAnimationFrame(() => {
      n || (w(() => {
        t.end();
      }), Be(), setTimeout(e._x_transitioning.finish, s + o), i = !0);
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
var He = !1;
function pe(e, t = () => {
}) {
  return (...n) => He ? t(...n) : e(...n);
}
function gr(e, t) {
  t._x_dataStack || (t._x_dataStack = e._x_dataStack), He = !0, Mr(() => {
    vr(t);
  }), He = !1;
}
function vr(e) {
  let t = !1;
  P(e, (r, i) => {
    O(r, (a, s) => {
      if (t && ur(a))
        return s();
      t = !0, i(a, s);
    });
  });
}
function Mr(e) {
  let t = Q;
  dt((n, r) => {
    let i = t(n);
    return ue(i), () => {
    };
  }), e(), dt(t);
}
function Qt(e, t, n, r = []) {
  switch (e._x_bindings || (e._x_bindings = W({})), e._x_bindings[t] = n, t = r.includes("camel") ? Pr(t) : t, t) {
    case "value":
      xr(e, n);
      break;
    case "style":
      Sr(e, n);
      break;
    case "class":
      Cr(e, n);
      break;
    default:
      Er(e, t, n);
      break;
  }
}
function xr(e, t) {
  if (e.type === "radio")
    e.attributes.value === void 0 && (e.value = t), window.fromModel && (e.checked = pt(e.value, t));
  else if (e.type === "checkbox")
    Number.isInteger(t) ? e.value = t : !Number.isInteger(t) && !Array.isArray(t) && typeof t != "boolean" && ![null, void 0].includes(t) ? e.value = String(t) : Array.isArray(t) ? e.checked = t.some((n) => pt(n, e.value)) : e.checked = !!t;
  else if (e.tagName === "SELECT")
    br(e, t);
  else {
    if (e.value === t)
      return;
    e.value = t;
  }
}
function Cr(e, t) {
  e._x_undoAddedClasses && e._x_undoAddedClasses(), e._x_undoAddedClasses = et(e, t);
}
function Sr(e, t) {
  e._x_undoAddedStyles && e._x_undoAddedStyles(), e._x_undoAddedStyles = he(e, t);
}
function Er(e, t, n) {
  [null, void 0, !1].includes(n) && kr(t) ? e.removeAttribute(t) : (Zt(t) && (n = t), Ar(e, t, n));
}
function Ar(e, t, n) {
  e.getAttribute(t) != n && e.setAttribute(t, n);
}
function br(e, t) {
  const n = [].concat(t).map((r) => r + "");
  Array.from(e.options).forEach((r) => {
    r.selected = n.includes(r.value);
  });
}
function Pr(e) {
  return e.toLowerCase().replace(/-(\w)/g, (t, n) => n.toUpperCase());
}
function pt(e, t) {
  return e == t;
}
function Zt(e) {
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
function kr(e) {
  return !["aria-pressed", "aria-checked", "aria-expanded", "aria-selected"].includes(e);
}
function Vr(e, t, n) {
  if (e._x_bindings && e._x_bindings[t] !== void 0)
    return e._x_bindings[t];
  let r = e.getAttribute(t);
  return r === null ? typeof n == "function" ? n() : n : r === "" ? !0 : Zt(t) ? !![t, "true"].includes(r) : r;
}
function Xt(e, t) {
  var n;
  return function() {
    var r = this, i = arguments, a = function() {
      n = null, e.apply(r, i);
    };
    clearTimeout(n), n = setTimeout(a, t);
  };
}
function en(e, t) {
  let n;
  return function() {
    let r = this, i = arguments;
    n || (e.apply(r, i), n = !0, setTimeout(() => n = !1, t));
  };
}
function Rr(e) {
  e(ee);
}
var V = {}, mt = !1;
function Lr(e, t) {
  if (mt || (V = W(V), mt = !0), t === void 0)
    return V[e];
  V[e] = t, typeof t == "object" && t !== null && t.hasOwnProperty("init") && typeof t.init == "function" && V[e].init(), Pt(V[e]);
}
function Tr() {
  return V;
}
var tn = {};
function Or(e, t) {
  let n = typeof t != "function" ? () => t : t;
  e instanceof Element ? nn(e, n()) : tn[e] = n;
}
function Fr(e) {
  return Object.entries(tn).forEach(([t, n]) => {
    Object.defineProperty(e, t, {
      get() {
        return (...r) => n(...r);
      }
    });
  }), e;
}
function nn(e, t, n) {
  let r = [];
  for (; r.length; )
    r.pop()();
  let i = Object.entries(t).map(([s, o]) => ({ name: s, value: o })), a = Ot(i);
  i = i.map((s) => a.find((o) => o.name === s.name) ? {
    name: `x-bind:${s.name}`,
    value: `"${s.value}"`
  } : s), Ye(e, i, n).map((s) => {
    r.push(s.runCleanups), s();
  });
}
var rn = {};
function Dr(e, t) {
  rn[e] = t;
}
function Br(e, t) {
  return Object.entries(rn).forEach(([n, r]) => {
    Object.defineProperty(e, n, {
      get() {
        return (...i) => r.bind(t)(...i);
      },
      enumerable: !1
    });
  }), e;
}
var Nr = {
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
    return vt;
  },
  version: "3.10.5",
  flushAndStopDeferringMutations: Jn,
  dontAutoEvaluateFunctions: Zn,
  disableEffectScheduling: In,
  setReactivityEngine: Hn,
  closestDataStack: I,
  skipDuringClone: pe,
  addRootSelector: qt,
  addInitSelector: Ut,
  addScopeToNode: Z,
  deferMutations: Un,
  mapAttributes: Qe,
  evaluateLater: v,
  setEvaluator: Xn,
  mergeProxies: X,
  findClosest: fe,
  closestRoot: de,
  interceptor: kt,
  transition: Ie,
  setStyles: he,
  mutateDom: w,
  directive: _,
  throttle: en,
  debounce: Xt,
  evaluate: B,
  initTree: P,
  nextTick: $t,
  prefixed: $,
  prefix: rr,
  plugin: Rr,
  magic: S,
  store: Lr,
  start: cr,
  clone: gr,
  bound: Vr,
  $data: bt,
  data: Dr,
  bind: Or
}, ee = Nr;
function Ir(e, t) {
  const n = /* @__PURE__ */ Object.create(null), r = e.split(",");
  for (let i = 0; i < r.length; i++)
    n[r[i]] = !0;
  return t ? (i) => !!n[i.toLowerCase()] : (i) => !!n[i];
}
var Hr = Object.freeze({}), an = Object.assign, jr = Object.prototype.hasOwnProperty, me = (e, t) => jr.call(e, t), L = Array.isArray, J = (e) => sn(e) === "[object Map]", Wr = (e) => typeof e == "string", tt = (e) => typeof e == "symbol", _e = (e) => e !== null && typeof e == "object", $r = Object.prototype.toString, sn = (e) => $r.call(e), on = (e) => sn(e).slice(8, -1), nt = (e) => Wr(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, Gr = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (n) => t[n] || (t[n] = e(n));
}, Kr = Gr((e) => e.charAt(0).toUpperCase() + e.slice(1)), ln = (e, t) => e !== t && (e === e || t === t), je = /* @__PURE__ */ new WeakMap(), K = [], E, T = Symbol("iterate"), We = Symbol("Map key iterate");
function zr(e) {
  return e && e._isEffect === !0;
}
function qr(e, t = Hr) {
  zr(e) && (e = e.raw);
  const n = Yr(e, t);
  return t.lazy || n(), n;
}
function Ur(e) {
  e.active && (cn(e), e.options.onStop && e.options.onStop(), e.active = !1);
}
var Jr = 0;
function Yr(e, t) {
  const n = function() {
    if (!n.active)
      return e();
    if (!K.includes(n)) {
      cn(n);
      try {
        return Zr(), K.push(n), E = n, e();
      } finally {
        K.pop(), un(), E = K[K.length - 1];
      }
    }
  };
  return n.id = Jr++, n.allowRecurse = !!t.allowRecurse, n._isEffect = !0, n.active = !0, n.raw = e, n.deps = [], n.options = t, n;
}
function cn(e) {
  const { deps: t } = e;
  if (t.length) {
    for (let n = 0; n < t.length; n++)
      t[n].delete(e);
    t.length = 0;
  }
}
var j = !0, rt = [];
function Qr() {
  rt.push(j), j = !1;
}
function Zr() {
  rt.push(j), j = !0;
}
function un() {
  const e = rt.pop();
  j = e === void 0 ? !0 : e;
}
function C(e, t, n) {
  if (!j || E === void 0)
    return;
  let r = je.get(e);
  r || je.set(e, r = /* @__PURE__ */ new Map());
  let i = r.get(n);
  i || r.set(n, i = /* @__PURE__ */ new Set()), i.has(E) || (i.add(E), E.deps.push(i), E.options.onTrack && E.options.onTrack({
    effect: E,
    target: e,
    type: t,
    key: n
  }));
}
function k(e, t, n, r, i, a) {
  const s = je.get(e);
  if (!s)
    return;
  const o = /* @__PURE__ */ new Set(), l = (u) => {
    u && u.forEach((f) => {
      (f !== E || f.allowRecurse) && o.add(f);
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
        L(e) ? nt(n) && l(s.get("length")) : (l(s.get(T)), J(e) && l(s.get(We)));
        break;
      case "delete":
        L(e) || (l(s.get(T)), J(e) && l(s.get(We)));
        break;
      case "set":
        J(e) && l(s.get(T));
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
var Xr = /* @__PURE__ */ Ir("__proto__,__v_isRef,__isVue"), dn = new Set(Object.getOwnPropertyNames(Symbol).map((e) => Symbol[e]).filter(tt)), ei = /* @__PURE__ */ ye(), ti = /* @__PURE__ */ ye(!1, !0), ni = /* @__PURE__ */ ye(!0), ri = /* @__PURE__ */ ye(!0, !0), ce = {};
["includes", "indexOf", "lastIndexOf"].forEach((e) => {
  const t = Array.prototype[e];
  ce[e] = function(...n) {
    const r = p(this);
    for (let a = 0, s = this.length; a < s; a++)
      C(r, "get", a + "");
    const i = t.apply(r, n);
    return i === -1 || i === !1 ? t.apply(r, n.map(p)) : i;
  };
});
["push", "pop", "shift", "unshift", "splice"].forEach((e) => {
  const t = Array.prototype[e];
  ce[e] = function(...n) {
    Qr();
    const r = t.apply(this, n);
    return un(), r;
  };
});
function ye(e = !1, t = !1) {
  return function(r, i, a) {
    if (i === "__v_isReactive")
      return !e;
    if (i === "__v_isReadonly")
      return e;
    if (i === "__v_raw" && a === (e ? t ? hi : An : t ? fi : En).get(r))
      return r;
    const s = L(r);
    if (!e && s && me(ce, i))
      return Reflect.get(ce, i, a);
    const o = Reflect.get(r, i, a);
    return (tt(i) ? dn.has(i) : Xr(i)) || (e || C(r, "get", i), t) ? o : $e(o) ? !s || !nt(i) ? o.value : o : _e(o) ? e ? bn(o) : ot(o) : o;
  };
}
var ii = /* @__PURE__ */ fn(), ai = /* @__PURE__ */ fn(!0);
function fn(e = !1) {
  return function(n, r, i, a) {
    let s = n[r];
    if (!e && (i = p(i), s = p(s), !L(n) && $e(s) && !$e(i)))
      return s.value = i, !0;
    const o = L(n) && nt(r) ? Number(r) < n.length : me(n, r), l = Reflect.set(n, r, i, a);
    return n === p(a) && (o ? ln(i, s) && k(n, "set", r, i, s) : k(n, "add", r, i)), l;
  };
}
function si(e, t) {
  const n = me(e, t), r = e[t], i = Reflect.deleteProperty(e, t);
  return i && n && k(e, "delete", t, void 0, r), i;
}
function oi(e, t) {
  const n = Reflect.has(e, t);
  return (!tt(t) || !dn.has(t)) && C(e, "has", t), n;
}
function li(e) {
  return C(e, "iterate", L(e) ? "length" : T), Reflect.ownKeys(e);
}
var hn = {
  get: ei,
  set: ii,
  deleteProperty: si,
  has: oi,
  ownKeys: li
}, pn = {
  get: ni,
  set(e, t) {
    return console.warn(`Set operation on key "${String(t)}" failed: target is readonly.`, e), !0;
  },
  deleteProperty(e, t) {
    return console.warn(`Delete operation on key "${String(t)}" failed: target is readonly.`, e), !0;
  }
};
an({}, hn, {
  get: ti,
  set: ai
});
an({}, pn, {
  get: ri
});
var it = (e) => _e(e) ? ot(e) : e, at = (e) => _e(e) ? bn(e) : e, st = (e) => e, we = (e) => Reflect.getPrototypeOf(e);
function ge(e, t, n = !1, r = !1) {
  e = e.__v_raw;
  const i = p(e), a = p(t);
  t !== a && !n && C(i, "get", t), !n && C(i, "get", a);
  const { has: s } = we(i), o = r ? st : n ? at : it;
  if (s.call(i, t))
    return o(e.get(t));
  if (s.call(i, a))
    return o(e.get(a));
  e !== i && e.get(t);
}
function ve(e, t = !1) {
  const n = this.__v_raw, r = p(n), i = p(e);
  return e !== i && !t && C(r, "has", e), !t && C(r, "has", i), e === i ? n.has(e) : n.has(e) || n.has(i);
}
function Me(e, t = !1) {
  return e = e.__v_raw, !t && C(p(e), "iterate", T), Reflect.get(e, "size", e);
}
function mn(e) {
  e = p(e);
  const t = p(this);
  return we(t).has.call(t, e) || (t.add(e), k(t, "add", e, e)), this;
}
function _n(e, t) {
  t = p(t);
  const n = p(this), { has: r, get: i } = we(n);
  let a = r.call(n, e);
  a ? Sn(n, r, e) : (e = p(e), a = r.call(n, e));
  const s = i.call(n, e);
  return n.set(e, t), a ? ln(t, s) && k(n, "set", e, t, s) : k(n, "add", e, t), this;
}
function yn(e) {
  const t = p(this), { has: n, get: r } = we(t);
  let i = n.call(t, e);
  i ? Sn(t, n, e) : (e = p(e), i = n.call(t, e));
  const a = r ? r.call(t, e) : void 0, s = t.delete(e);
  return i && k(t, "delete", e, void 0, a), s;
}
function wn() {
  const e = p(this), t = e.size !== 0, n = J(e) ? new Map(e) : new Set(e), r = e.clear();
  return t && k(e, "clear", void 0, void 0, n), r;
}
function xe(e, t) {
  return function(r, i) {
    const a = this, s = a.__v_raw, o = p(s), l = t ? st : e ? at : it;
    return !e && C(o, "iterate", T), s.forEach((c, u) => r.call(i, l(c), l(u), a));
  };
}
function ie(e, t, n) {
  return function(...r) {
    const i = this.__v_raw, a = p(i), s = J(a), o = e === "entries" || e === Symbol.iterator && s, l = e === "keys" && s, c = i[e](...r), u = n ? st : t ? at : it;
    return !t && C(a, "iterate", l ? We : T), {
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
function b(e) {
  return function(...t) {
    {
      const n = t[0] ? `on key "${t[0]}" ` : "";
      console.warn(`${Kr(e)} operation ${n}failed: target is readonly.`, p(this));
    }
    return e === "delete" ? !1 : this;
  };
}
var gn = {
  get(e) {
    return ge(this, e);
  },
  get size() {
    return Me(this);
  },
  has: ve,
  add: mn,
  set: _n,
  delete: yn,
  clear: wn,
  forEach: xe(!1, !1)
}, vn = {
  get(e) {
    return ge(this, e, !1, !0);
  },
  get size() {
    return Me(this);
  },
  has: ve,
  add: mn,
  set: _n,
  delete: yn,
  clear: wn,
  forEach: xe(!1, !0)
}, Mn = {
  get(e) {
    return ge(this, e, !0);
  },
  get size() {
    return Me(this, !0);
  },
  has(e) {
    return ve.call(this, e, !0);
  },
  add: b("add"),
  set: b("set"),
  delete: b("delete"),
  clear: b("clear"),
  forEach: xe(!0, !1)
}, xn = {
  get(e) {
    return ge(this, e, !0, !0);
  },
  get size() {
    return Me(this, !0);
  },
  has(e) {
    return ve.call(this, e, !0);
  },
  add: b("add"),
  set: b("set"),
  delete: b("delete"),
  clear: b("clear"),
  forEach: xe(!0, !0)
}, ci = ["keys", "values", "entries", Symbol.iterator];
ci.forEach((e) => {
  gn[e] = ie(e, !1, !1), Mn[e] = ie(e, !0, !1), vn[e] = ie(e, !1, !0), xn[e] = ie(e, !0, !0);
});
function Cn(e, t) {
  const n = t ? e ? xn : vn : e ? Mn : gn;
  return (r, i, a) => i === "__v_isReactive" ? !e : i === "__v_isReadonly" ? e : i === "__v_raw" ? r : Reflect.get(me(n, i) && i in r ? n : r, i, a);
}
var ui = {
  get: Cn(!1, !1)
}, di = {
  get: Cn(!0, !1)
};
function Sn(e, t, n) {
  const r = p(n);
  if (r !== n && t.call(e, r)) {
    const i = on(e);
    console.warn(`Reactive ${i} contains both the raw and reactive versions of the same object${i === "Map" ? " as keys" : ""}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`);
  }
}
var En = /* @__PURE__ */ new WeakMap(), fi = /* @__PURE__ */ new WeakMap(), An = /* @__PURE__ */ new WeakMap(), hi = /* @__PURE__ */ new WeakMap();
function pi(e) {
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
function mi(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : pi(on(e));
}
function ot(e) {
  return e && e.__v_isReadonly ? e : Pn(e, !1, hn, ui, En);
}
function bn(e) {
  return Pn(e, !0, pn, di, An);
}
function Pn(e, t, n, r, i) {
  if (!_e(e))
    return console.warn(`value cannot be made reactive: ${String(e)}`), e;
  if (e.__v_raw && !(t && e.__v_isReactive))
    return e;
  const a = i.get(e);
  if (a)
    return a;
  const s = mi(e);
  if (s === 0)
    return e;
  const o = new Proxy(e, s === 2 ? r : n);
  return i.set(e, o), o;
}
function p(e) {
  return e && p(e.__v_raw) || e;
}
function $e(e) {
  return !!(e && e.__v_isRef === !0);
}
S("nextTick", () => $t);
S("dispatch", (e) => U.bind(U, e));
S("watch", (e, { evaluateLater: t, effect: n }) => (r, i) => {
  let a = t(r), s = !0, o, l = n(() => a((c) => {
    JSON.stringify(c), s ? o = c : queueMicrotask(() => {
      i(c, o), o = c;
    }), s = !1;
  }));
  e._x_effects.delete(l);
});
S("store", Tr);
S("data", (e) => bt(e));
S("root", (e) => de(e));
S("refs", (e) => (e._x_refs_proxy || (e._x_refs_proxy = X(_i(e))), e._x_refs_proxy));
function _i(e) {
  let t = [], n = e;
  for (; n; )
    n._x_refs && t.push(n._x_refs), n = n.parentNode;
  return t;
}
var be = {};
function kn(e) {
  return be[e] || (be[e] = 0), ++be[e];
}
function yi(e, t) {
  return fe(e, (n) => {
    if (n._x_ids && n._x_ids[t])
      return !0;
  });
}
function wi(e, t) {
  e._x_ids || (e._x_ids = {}), e._x_ids[t] || (e._x_ids[t] = kn(t));
}
S("id", (e) => (t, n = null) => {
  let r = yi(e, t), i = r ? r._x_ids[t] : kn(t);
  return n ? `${t}-${i}-${n}` : `${t}-${i}`;
});
S("el", (e) => e);
Vn("Focus", "focus", "focus");
Vn("Persist", "persist", "persist");
function Vn(e, t, n) {
  S(t, (r) => H(`You can't use [$${directiveName}] without first installing the "${e}" plugin here: https://alpinejs.dev/plugins/${n}`, r));
}
_("modelable", (e, { expression: t }, { effect: n, evaluateLater: r }) => {
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
_("teleport", (e, { expression: t }, { cleanup: n }) => {
  e.tagName.toLowerCase() !== "template" && H("x-teleport can only be used on a <template> tag", e);
  let r = document.querySelector(t);
  r || H(`Cannot find x-teleport element for selector: "${t}"`);
  let i = e.content.cloneNode(!0).firstElementChild;
  e._x_teleport = i, i._x_teleportBack = e, e._x_forwardEvents && e._x_forwardEvents.forEach((a) => {
    i.addEventListener(a, (s) => {
      s.stopPropagation(), e.dispatchEvent(new s.constructor(s.type, s));
    });
  }), Z(i, {}, e), w(() => {
    r.appendChild(i), P(i), i._x_ignore = !0;
  }), n(() => i.remove());
});
var Rn = () => {
};
Rn.inline = (e, { modifiers: t }, { cleanup: n }) => {
  t.includes("self") ? e._x_ignoreSelf = !0 : e._x_ignore = !0, n(() => {
    t.includes("self") ? delete e._x_ignoreSelf : delete e._x_ignore;
  });
};
_("ignore", Rn);
_("effect", (e, { expression: t }, { effect: n }) => n(v(e, t)));
function Ln(e, t, n, r) {
  let i = e, a = (l) => r(l), s = {}, o = (l, c) => (u) => c(l, u);
  if (n.includes("dot") && (t = gi(t)), n.includes("camel") && (t = vi(t)), n.includes("passive") && (s.passive = !0), n.includes("capture") && (s.capture = !0), n.includes("window") && (i = window), n.includes("document") && (i = document), n.includes("prevent") && (a = o(a, (l, c) => {
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
    xi(t) && Ci(c, n) || l(c);
  }), n.includes("debounce")) {
    let l = n[n.indexOf("debounce") + 1] || "invalid-wait", c = Ge(l.split("ms")[0]) ? Number(l.split("ms")[0]) : 250;
    a = Xt(a, c);
  }
  if (n.includes("throttle")) {
    let l = n[n.indexOf("throttle") + 1] || "invalid-wait", c = Ge(l.split("ms")[0]) ? Number(l.split("ms")[0]) : 250;
    a = en(a, c);
  }
  return i.addEventListener(t, a, s), () => {
    i.removeEventListener(t, a, s);
  };
}
function gi(e) {
  return e.replace(/-/g, ".");
}
function vi(e) {
  return e.toLowerCase().replace(/-(\w)/g, (t, n) => n.toUpperCase());
}
function Ge(e) {
  return !Array.isArray(e) && !isNaN(e);
}
function Mi(e) {
  return e.replace(/([a-z])([A-Z])/g, "$1-$2").replace(/[_\s]/, "-").toLowerCase();
}
function xi(e) {
  return ["keydown", "keyup"].includes(e);
}
function Ci(e, t) {
  let n = t.filter((a) => !["window", "document", "prevent", "stop", "once"].includes(a));
  if (n.includes("debounce")) {
    let a = n.indexOf("debounce");
    n.splice(a, Ge((n[a + 1] || "invalid-wait").split("ms")[0]) ? 2 : 1);
  }
  if (n.length === 0 || n.length === 1 && _t(e.key).includes(n[0]))
    return !1;
  const i = ["ctrl", "shift", "alt", "meta", "cmd", "super"].filter((a) => n.includes(a));
  return n = n.filter((a) => !i.includes(a)), !(i.length > 0 && i.filter((s) => ((s === "cmd" || s === "super") && (s = "meta"), e[`${s}Key`])).length === i.length && _t(e.key).includes(n[0]));
}
function _t(e) {
  if (!e)
    return [];
  e = Mi(e);
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
_("model", (e, { modifiers: t, expression: n }, { effect: r, cleanup: i }) => {
  let a = v(e, n), s = `${n} = rightSideOfExpression($event, ${n})`, o = v(e, s);
  var l = e.tagName.toLowerCase() === "select" || ["checkbox", "radio"].includes(e.type) || t.includes("lazy") ? "change" : "input";
  let c = Si(e, t, n), u = Ln(e, l, t, (m) => {
    o(() => {
    }, { scope: {
      $event: m,
      rightSideOfExpression: c
    } });
  });
  e._x_removeModelListeners || (e._x_removeModelListeners = {}), e._x_removeModelListeners.default = u, i(() => e._x_removeModelListeners.default());
  let f = v(e, `${n} = __placeholder`);
  e._x_model = {
    get() {
      let m;
      return a((A) => m = A), m;
    },
    set(m) {
      f(() => {
      }, { scope: { __placeholder: m } });
    }
  }, e._x_forceModelUpdate = () => {
    a((m) => {
      m === void 0 && n.match(/\./) && (m = ""), window.fromModel = !0, w(() => Qt(e, "value", m)), delete window.fromModel;
    });
  }, r(() => {
    t.includes("unintrusive") && document.activeElement.isSameNode(e) || e._x_forceModelUpdate();
  });
});
function Si(e, t, n) {
  return e.type === "radio" && w(() => {
    e.hasAttribute("name") || e.setAttribute("name", n);
  }), (r, i) => w(() => {
    if (r instanceof CustomEvent && r.detail !== void 0)
      return r.detail || r.target.value;
    if (e.type === "checkbox")
      if (Array.isArray(i)) {
        let a = t.includes("number") ? Pe(r.target.value) : r.target.value;
        return r.target.checked ? i.concat([a]) : i.filter((s) => !Ei(s, a));
      } else
        return r.target.checked;
    else {
      if (e.tagName.toLowerCase() === "select" && e.multiple)
        return t.includes("number") ? Array.from(r.target.selectedOptions).map((a) => {
          let s = a.value || a.text;
          return Pe(s);
        }) : Array.from(r.target.selectedOptions).map((a) => a.value || a.text);
      {
        let a = r.target.value;
        return t.includes("number") ? Pe(a) : t.includes("trim") ? a.trim() : a;
      }
    }
  });
}
function Pe(e) {
  let t = e ? parseFloat(e) : null;
  return Ai(t) ? t : e;
}
function Ei(e, t) {
  return e == t;
}
function Ai(e) {
  return !Array.isArray(e) && !isNaN(e);
}
_("cloak", (e) => queueMicrotask(() => w(() => e.removeAttribute($("cloak")))));
Ut(() => `[${$("init")}]`);
_("init", pe((e, { expression: t }, { evaluate: n }) => typeof t == "string" ? !!t.trim() && n(t, {}, !1) : n(t, {}, !1)));
_("text", (e, { expression: t }, { effect: n, evaluateLater: r }) => {
  let i = r(t);
  n(() => {
    i((a) => {
      w(() => {
        e.textContent = a;
      });
    });
  });
});
_("html", (e, { expression: t }, { effect: n, evaluateLater: r }) => {
  let i = r(t);
  n(() => {
    i((a) => {
      w(() => {
        e.innerHTML = a, e._x_ignoreSelf = !0, P(e), delete e._x_ignoreSelf;
      });
    });
  });
});
Qe(Bt(":", Nt($("bind:"))));
_("bind", (e, { value: t, modifiers: n, expression: r, original: i }, { effect: a }) => {
  if (!t) {
    let o = {};
    Fr(o), v(e, r)((c) => {
      nn(e, c, i);
    }, { scope: o });
    return;
  }
  if (t === "key")
    return bi(e, r);
  let s = v(e, r);
  a(() => s((o) => {
    o === void 0 && typeof r == "string" && r.match(/\./) && (o = ""), w(() => Qt(e, t, o, n));
  }));
});
function bi(e, t) {
  e._x_keyExpression = t;
}
qt(() => `[${$("data")}]`);
_("data", pe((e, { expression: t }, { cleanup: n }) => {
  t = t === "" ? "{}" : t;
  let r = {};
  Te(r, e);
  let i = {};
  Br(i, r);
  let a = B(e, t, { scope: i });
  a === void 0 && (a = {}), Te(a, e);
  let s = W(a);
  Pt(s);
  let o = Z(e, s);
  s.init && B(e, s.init), n(() => {
    s.destroy && B(e, s.destroy), o();
  });
}));
_("show", (e, { modifiers: t, expression: n }, { effect: r }) => {
  let i = v(e, n);
  e._x_doHide || (e._x_doHide = () => {
    w(() => {
      e.style.setProperty("display", "none", t.includes("important") ? "important" : void 0);
    });
  }), e._x_doShow || (e._x_doShow = () => {
    w(() => {
      e.style.length === 1 && e.style.display === "none" ? e.removeAttribute("style") : e.style.removeProperty("display");
    });
  });
  let a = () => {
    e._x_doHide(), e._x_isShown = !1;
  }, s = () => {
    e._x_doShow(), e._x_isShown = !0;
  }, o = () => setTimeout(s), l = Ne((f) => f ? s() : a(), (f) => {
    typeof e._x_toggleAndCascadeWithTransitions == "function" ? e._x_toggleAndCascadeWithTransitions(e, f, s, a) : f ? o() : a();
  }), c, u = !0;
  r(() => i((f) => {
    !u && f === c || (t.includes("immediate") && (f ? o() : a()), l(f), c = f, u = !1);
  }));
});
_("for", (e, { expression: t }, { effect: n, cleanup: r }) => {
  let i = ki(t), a = v(e, i.items), s = v(e, e._x_keyExpression || "index");
  e._x_prevKeys = [], e._x_lookup = {}, n(() => Pi(e, i, a, s)), r(() => {
    Object.values(e._x_lookup).forEach((o) => o.remove()), delete e._x_prevKeys, delete e._x_lookup;
  });
});
function Pi(e, t, n, r) {
  let i = (s) => typeof s == "object" && !Array.isArray(s), a = e;
  n((s) => {
    Vi(s) && s >= 0 && (s = Array.from(Array(s).keys(), (d) => d + 1)), s === void 0 && (s = []);
    let o = e._x_lookup, l = e._x_prevKeys, c = [], u = [];
    if (i(s))
      s = Object.entries(s).map(([d, h]) => {
        let y = yt(t, h, d, s);
        r((g) => u.push(g), { scope: { index: d, ...y } }), c.push(y);
      });
    else
      for (let d = 0; d < s.length; d++) {
        let h = yt(t, s[d], d, s);
        r((y) => u.push(y), { scope: { index: d, ...h } }), c.push(h);
      }
    let f = [], m = [], A = [], F = [];
    for (let d = 0; d < l.length; d++) {
      let h = l[d];
      u.indexOf(h) === -1 && A.push(h);
    }
    l = l.filter((d) => !A.includes(d));
    let te = "template";
    for (let d = 0; d < u.length; d++) {
      let h = u[d], y = l.indexOf(h);
      if (y === -1)
        l.splice(d, 0, h), f.push([te, d]);
      else if (y !== d) {
        let g = l.splice(d, 1)[0], x = l.splice(y - 1, 1)[0];
        l.splice(d, 0, x), l.splice(y, 0, g), m.push([g, x]);
      } else
        F.push(h);
      te = h;
    }
    for (let d = 0; d < A.length; d++) {
      let h = A[d];
      o[h]._x_effects && o[h]._x_effects.forEach(gt), o[h].remove(), o[h] = null, delete o[h];
    }
    for (let d = 0; d < m.length; d++) {
      let [h, y] = m[d], g = o[h], x = o[y], D = document.createElement("div");
      w(() => {
        x.after(D), g.after(x), x._x_currentIfEl && x.after(x._x_currentIfEl), D.before(g), g._x_currentIfEl && g.after(g._x_currentIfEl), D.remove();
      }), ft(x, c[u.indexOf(y)]);
    }
    for (let d = 0; d < f.length; d++) {
      let [h, y] = f[d], g = h === "template" ? a : o[h];
      g._x_currentIfEl && (g = g._x_currentIfEl);
      let x = c[y], D = u[y], ne = document.importNode(a.content, !0).firstElementChild;
      Z(ne, W(x), a), w(() => {
        g.after(ne), P(ne);
      }), typeof D == "object" && H("x-for key cannot be an object, it must be a string or an integer", a), o[D] = ne;
    }
    for (let d = 0; d < F.length; d++)
      ft(o[F[d]], c[u.indexOf(F[d])]);
    a._x_prevKeys = u;
  });
}
function ki(e) {
  let t = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/, n = /^\s*\(|\)\s*$/g, r = /([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/, i = e.match(r);
  if (!i)
    return;
  let a = {};
  a.items = i[2].trim();
  let s = i[1].replace(n, "").trim(), o = s.match(t);
  return o ? (a.item = s.replace(t, "").trim(), a.index = o[1].trim(), o[2] && (a.collection = o[2].trim())) : a.item = s, a;
}
function yt(e, t, n, r) {
  let i = {};
  return /^\[.*\]$/.test(e.item) && Array.isArray(t) ? e.item.replace("[", "").replace("]", "").split(",").map((s) => s.trim()).forEach((s, o) => {
    i[s] = t[o];
  }) : /^\{.*\}$/.test(e.item) && !Array.isArray(t) && typeof t == "object" ? e.item.replace("{", "").replace("}", "").split(",").map((s) => s.trim()).forEach((s) => {
    i[s] = t[s];
  }) : i[e.item] = t, e.index && (i[e.index] = n), e.collection && (i[e.collection] = r), i;
}
function Vi(e) {
  return !Array.isArray(e) && !isNaN(e);
}
function Tn() {
}
Tn.inline = (e, { expression: t }, { cleanup: n }) => {
  let r = de(e);
  r._x_refs || (r._x_refs = {}), r._x_refs[t] = e, n(() => delete r._x_refs[t]);
};
_("ref", Tn);
_("if", (e, { expression: t }, { effect: n, cleanup: r }) => {
  let i = v(e, t), a = () => {
    if (e._x_currentIfEl)
      return e._x_currentIfEl;
    let o = e.content.cloneNode(!0).firstElementChild;
    return Z(o, {}, e), w(() => {
      e.after(o), P(o);
    }), e._x_currentIfEl = o, e._x_undoIf = () => {
      O(o, (l) => {
        l._x_effects && l._x_effects.forEach(gt);
      }), o.remove(), delete e._x_currentIfEl;
    }, o;
  }, s = () => {
    e._x_undoIf && (e._x_undoIf(), delete e._x_undoIf);
  };
  n(() => i((o) => {
    o ? a() : s();
  })), r(() => e._x_undoIf && e._x_undoIf());
});
_("id", (e, { expression: t }, { evaluate: n }) => {
  n(t).forEach((i) => wi(e, i));
});
Qe(Bt("@", Nt($("on:"))));
_("on", pe((e, { value: t, modifiers: n, expression: r }, { cleanup: i }) => {
  let a = r ? v(e, r) : () => {
  };
  e.tagName.toLowerCase() === "template" && (e._x_forwardEvents || (e._x_forwardEvents = []), e._x_forwardEvents.includes(t) || e._x_forwardEvents.push(t));
  let s = Ln(e, t, n, (o) => {
    a(() => {
    }, { scope: { $event: o }, params: [o] });
  });
  i(() => s());
}));
Ce("Collapse", "collapse", "collapse");
Ce("Intersect", "intersect", "intersect");
Ce("Focus", "trap", "focus");
Ce("Mask", "mask", "mask");
function Ce(e, t, n) {
  _(t, (r) => H(`You can't use [x-${t}] without first installing the "${e}" plugin here: https://alpinejs.dev/plugins/${n}`, r));
}
ee.setEvaluator(Lt);
ee.setReactivityEngine({ reactive: ot, effect: qr, release: Ur, raw: p });
var Ri = ee, Ji = Ri, N;
class Li {
  constructor(t) {
    ct(this, N, void 0);
    ut(this, N, t);
  }
  createStore(t, n) {
    return Se(this, N).store(t, n), Se(this, N).store(t);
  }
}
N = new WeakMap();
function Yi(e) {
  return new Li(e);
}
function M(e, t, n = {}) {
  try {
    window.FS && window.FS.event(e, {
      ...Ti(t),
      ...n
    });
  } catch {
  }
}
function Ti(e) {
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
function Qi(e) {
  return {
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
        this.matches = await Oi(this.inputValue);
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
      this.selectedMatch = t, this.inputValue = t.address + ", " + t.context, this.matches = [], this.keyboardNavIndex = -1, M("Address Selected", e);
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
        ), M("Address Submitted", e);
        try {
          if (this.hasParcelDetails && e.estimateViewModel.hasResults && e.contactViewModel.isSubmitted)
            e.flowState.value = e.flowStateMachine.transition(
              e.flowState.value,
              "SKIP_CONTACT"
            );
          else {
            if (e.addressViewModel.hasParcelDetails || (e.addressViewModel.parcelDetails = {
              ...await Ni(
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
              }, i = await Hi(r);
              e.estimateViewModel.jurisdiction = i.jurisdiction, e.estimateViewModel.estimate = i.estimate;
            }
            e.flowState.value = e.flowStateMachine.transition(
              e.flowState.value,
              "SUCCESS"
            ), M("Address Submission Succeeded", e);
          }
        } catch {
          e.flowState.value = e.flowStateMachine.transition(
            e.flowState.value,
            "SUCCESS"
          ), M("Address Submission Errors (Non-Blocking)", e);
        }
      }
    }
  };
}
async function Oi(e) {
  const t = "https://app.regrid.com/api/v1/typeahead.json", n = "1SnpL7AQekjA4mH2vqUmkGm9AAfQxi_6mxwdm4qDzo_C-xSTx9z3pd9rTsRWDWV4", r = new Request(`${t}/?token=${n}&query=${e}`, {
    method: "GET"
  }), i = await fetch(r);
  if (!i.ok)
    throw new Error("Network response was not OK");
  const a = await i.json();
  return Fi(a);
}
function Fi(e) {
  return e.filter((r) => r.ll_uuid && r.address && r.address.match(/^[0-9].*[^0-9]$/)).sort((r, i) => {
    const a = Di(r, i);
    return a != 0 ? a : Bi(r, i);
  }).slice(0, 10);
}
function Di(e, t) {
  return ae(e) && !ae(t) ? -1 : !ae(e) && ae(t) ? 1 : 0;
}
function ae(e) {
  return e.context.endsWith("CA");
}
function Bi(e, t) {
  return e.score > t.score ? -1 : e.score < t.score ? 1 : 0;
}
async function Ni(e) {
  const t = "https://app.regrid.com/api/v1/parcel/", n = "1SnpL7AQekjA4mH2vqUmkGm9AAfQxi_6mxwdm4qDzo_C-xSTx9z3pd9rTsRWDWV4", r = new Request(
    `${t}${e}.json?token=${n}&return_custom=false`,
    {
      method: "GET"
    }
  ), i = await fetch(r);
  if (!i.ok)
    throw new Error("Network response was not OK");
  const a = await i.json();
  return Ii(a);
}
function Ii(e) {
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
async function Hi(e) {
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
async function wt(e, t = {}) {
  return new Promise(function(n, r) {
    const i = document.createElement("script");
    i.src = e, t.defer ? i.defer = !0 : t.async && (i.async = !0), i.addEventListener("load", function() {
      n();
    }), i.addEventListener("error", function(a) {
      r(a);
    }), document.body.appendChild(i);
  });
}
function Zi(e) {
  return {
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
      return ji(t);
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
        M("Contact Submitted", e);
        try {
          let r = {
            firstName: this.firstName.trim(),
            lastName: this.lastName.trim(),
            email: this.email.trim(),
            phone: this.phone.trim(),
            desiredTimeline: this.desiredTimeline.trim()
          };
          if (!Wi(r.email))
            throw new Error(
              "Please enter a valid email address, and try again.",
              { cause: "INVALID_EMAIL" }
            );
          if (!$i(r.phone))
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
            Gi(this),
            Ki(i)
          ]), (!e.estimateViewModel.hasResults || e.estimateViewModel.hasActiveJurisdiction) && wt("https://assets.calendly.com/assets/external/widget.js", {
            async: !0
          }), e.estimateViewModel.hasActiveJurisdiction && e.estimateViewModel.hasEstimate && await wt(
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
          M("Contact Submission Succeeded", e);
        } catch (r) {
          r && r.cause && (r.cause === "INVALID_EMAIL" || r.cause === "INVALID_PHONE") ? this.errorMessage = r.message : this.errorMessage = "There was an error processing your info. Please try again, or contact us for help.", e.flowState.value = e.flowStateMachine.transition(
            e.flowState.value,
            "ERROR"
          ), M("Contact Submission Failed", e, {
            error_str: this.errorMessage
          });
        }
      }
    }
  };
}
function ji(e) {
  const t = e.replace(/\D/g, ""), n = t.startsWith("1"), a = (n ? t.slice(1) : t).slice(0, 10).match(
    /^(\d{0,3})(\d{0,3})(\d{0,4})$/
  ), s = n ? "1" : "", o = a[1] ? (n ? " " : "") + ("(" + a[1]) : "", l = a[2] ? ") " + a[2] : "", c = a[3] ? "-" + a[3] : "";
  return s + o + l + c;
}
function Wi(e) {
  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(e);
}
function $i(e) {
  return /^\+?1?\s?(\()?\d{3}(\))?[-.\s]?\d{3}[-.\s]?\d{4}$|^\d{10}$/.test(e);
}
async function Gi(e) {
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
async function Ki(e) {
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
function Xi(e) {
  return {
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
      ), M("Schedule Consultation Clicked", e);
    },
    handleRequestCommunityClick(t) {
      t.preventDefault(), t.stopPropagation(), e.flowState.value = e.flowStateMachine.transition(
        e.flowState.value,
        "REQUEST_COMMUNITY"
      ), M("Community Requested", e);
    }
  };
}
function ea() {
  return {
    userGeo: {},
    marketsData: {},
    get market() {
      return On(this.userGeo.city, this.marketsData);
    },
    get bcPhoneNumber() {
      return zi(this.userGeo.city, this.marketsData);
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
function zi(e, t) {
  const n = "(415) 941-5861";
  if (!e || typeof e != "string")
    return n;
  const r = On(e, t);
  return qi(
    r,
    t
  ) ?? n;
}
function On(e, t) {
  if (!e || typeof e != "string")
    return null;
  for (const n of Object.keys(t))
    if (t[n].cities.filter(
      (r) => r.toLowerCase().trim() === e.toLowerCase().trim()
    ).length > 0)
      return n;
  return null;
}
function qi(e, t) {
  if (!e || typeof e != "string")
    return null;
  for (const n of Object.keys(t))
    if (n.toLowerCase().trim() === e.toLowerCase().trim())
      return t[n].bcPhoneNumber ?? null;
  return null;
}
function ta() {
  return {
    activeExperimentVariations: {},
    setActiveExperimentVariation(e, t) {
      this.activeExperimentVariations[e] = t;
    },
    getActiveExperimentVariation(e) {
      return this.activeExperimentVariations[e];
    },
    clearActiveExperiment(e) {
      this.activeExperimentVariations[e] && delete this.activeExperimentVariations[e];
    },
    getFullStoryActiveExperimentVariationsEventPropertyValue() {
      return Object.entries(this.activeExperimentVariations).map(
        ([e, t]) => `${e}:${t}`
      );
    },
    init() {
      this.activeExperimentVariations = {};
    }
  };
}
function na(e) {
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
  return {
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
      return l ? l.target : (M("Invalid State Transition Triggered", e, {
        current_state_str: a,
        event_str: s
      }), a);
    }
  };
}
function ra(e) {
  return {
    value: "",
    init() {
      this.value = e.flowStateMachine.defaultState;
    }
  };
}
function ia(e) {
  return {
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
      }), M("Modal Get Offer Flow Opened", e, n);
    },
    handleModalClose() {
      let t = !0;
      e.flowState.value == "contactForm" && e.contactViewModel.hasAnyContactDetails && (t = confirm(
        "Are you sure you want to stop before you've seen how much your extra lot space could be worth?"
      )), e.flowState.value == "contactFormProcessing" && (t = !1), t && (e.flowState.value = e.flowStateMachine.transition(
        e.flowState.value,
        "EXIT"
      ), M("Get Offer Modal Closed", e));
    }
  };
}
export {
  Zi as a,
  Xi as b,
  Qi as c,
  ea as d,
  ta as e,
  na as f,
  ra as g,
  ia as h,
  Yi as i,
  Ji as m
};
