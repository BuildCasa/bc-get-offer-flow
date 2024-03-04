var Pe = !1, ke = !1, L = [];
function Tn(e) {
  Ln(e);
}
function Ln(e) {
  L.includes(e) || L.push(e), On();
}
function gt(e) {
  let t = L.indexOf(e);
  t !== -1 && L.splice(t, 1);
}
function On() {
  !ke && !Pe && (Pe = !0, queueMicrotask(Fn));
}
function Fn() {
  Pe = !1, ke = !0;
  for (let e = 0; e < L.length; e++)
    L[e]();
  L.length = 0, ke = !1;
}
var $, Z, de, _t, Re = !0;
function Dn(e) {
  Re = !1, e(), Re = !0;
}
function Bn(e) {
  $ = e.reactive, de = e.release, Z = (t) => e.effect(t, { scheduler: (n) => {
    Re ? Tn(n) : n();
  } }), _t = e.raw;
}
function lt(e) {
  Z = e;
}
function Nn(e) {
  let t = () => {
  };
  return [(r) => {
    let a = Z(r);
    return e._x_effects || (e._x_effects = /* @__PURE__ */ new Set(), e._x_runEffects = () => {
      e._x_effects.forEach((i) => i());
    }), e._x_effects.add(a), t = () => {
      a !== void 0 && (e._x_effects.delete(a), de(a));
    }, a;
  }, () => {
    t();
  }];
}
var yt = [], wt = [], St = [];
function In(e) {
  St.push(e);
}
function vt(e, t) {
  typeof t == "function" ? (e._x_cleanups || (e._x_cleanups = []), e._x_cleanups.push(t)) : (t = e, wt.push(t));
}
function Hn(e) {
  yt.push(e);
}
function jn(e, t, n) {
  e._x_attributeCleanups || (e._x_attributeCleanups = {}), e._x_attributeCleanups[t] || (e._x_attributeCleanups[t] = []), e._x_attributeCleanups[t].push(n);
}
function bt(e, t) {
  e._x_attributeCleanups && Object.entries(e._x_attributeCleanups).forEach(([n, r]) => {
    (t === void 0 || t.includes(n)) && (r.forEach((a) => a()), delete e._x_attributeCleanups[n]);
  });
}
var Ge = new MutationObserver(Ue), Ke = !1;
function Mt() {
  Ge.observe(document, { subtree: !0, childList: !0, attributes: !0, attributeOldValue: !0 }), Ke = !0;
}
function Wn() {
  $n(), Ge.disconnect(), Ke = !1;
}
var U = [], xe = !1;
function $n() {
  U = U.concat(Ge.takeRecords()), U.length && !xe && (xe = !0, queueMicrotask(() => {
    zn(), xe = !1;
  }));
}
function zn() {
  Ue(U), U.length = 0;
}
function S(e) {
  if (!Ke)
    return e();
  Wn();
  let t = e();
  return Mt(), t;
}
var qe = !1, le = [];
function Gn() {
  qe = !0;
}
function Kn() {
  qe = !1, Ue(le), le = [];
}
function Ue(e) {
  if (qe) {
    le = le.concat(e);
    return;
  }
  let t = [], n = [], r = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Map();
  for (let i = 0; i < e.length; i++)
    if (!e[i].target._x_ignoreMutationObserver && (e[i].type === "childList" && (e[i].addedNodes.forEach((o) => o.nodeType === 1 && t.push(o)), e[i].removedNodes.forEach((o) => o.nodeType === 1 && n.push(o))), e[i].type === "attributes")) {
      let o = e[i].target, s = e[i].attributeName, c = e[i].oldValue, u = () => {
        r.has(o) || r.set(o, []), r.get(o).push({ name: s, value: o.getAttribute(s) });
      }, d = () => {
        a.has(o) || a.set(o, []), a.get(o).push(s);
      };
      o.hasAttribute(s) && c === null ? u() : o.hasAttribute(s) ? (d(), u()) : d();
    }
  a.forEach((i, o) => {
    bt(o, i);
  }), r.forEach((i, o) => {
    yt.forEach((s) => s(o, i));
  });
  for (let i of n)
    if (!t.includes(i) && (wt.forEach((o) => o(i)), i._x_cleanups))
      for (; i._x_cleanups.length; )
        i._x_cleanups.pop()();
  t.forEach((i) => {
    i._x_ignoreSelf = !0, i._x_ignore = !0;
  });
  for (let i of t)
    n.includes(i) || i.isConnected && (delete i._x_ignoreSelf, delete i._x_ignore, St.forEach((o) => o(i)), i._x_ignore = !0, i._x_ignoreSelf = !0);
  t.forEach((i) => {
    delete i._x_ignoreSelf, delete i._x_ignore;
  }), t = null, n = null, r = null, a = null;
}
function Ct(e) {
  return ee(H(e));
}
function X(e, t, n) {
  return e._x_dataStack = [t, ...H(n || e)], () => {
    e._x_dataStack = e._x_dataStack.filter((r) => r !== t);
  };
}
function ct(e, t) {
  let n = e._x_dataStack[0];
  Object.entries(t).forEach(([r, a]) => {
    n[r] = a;
  });
}
function H(e) {
  return e._x_dataStack ? e._x_dataStack : typeof ShadowRoot == "function" && e instanceof ShadowRoot ? H(e.host) : e.parentNode ? H(e.parentNode) : [];
}
function ee(e) {
  let t = new Proxy({}, {
    ownKeys: () => Array.from(new Set(e.flatMap((n) => Object.keys(n)))),
    has: (n, r) => e.some((a) => a.hasOwnProperty(r)),
    get: (n, r) => (e.find((a) => {
      if (a.hasOwnProperty(r)) {
        let i = Object.getOwnPropertyDescriptor(a, r);
        if (i.get && i.get._x_alreadyBound || i.set && i.set._x_alreadyBound)
          return !0;
        if ((i.get || i.set) && i.enumerable) {
          let o = i.get, s = i.set, c = i;
          o = o && o.bind(t), s = s && s.bind(t), o && (o._x_alreadyBound = !0), s && (s._x_alreadyBound = !0), Object.defineProperty(a, r, {
            ...c,
            get: o,
            set: s
          });
        }
        return !0;
      }
      return !1;
    }) || {})[r],
    set: (n, r, a) => {
      let i = e.find((o) => o.hasOwnProperty(r));
      return i ? i[r] = a : e[e.length - 1][r] = a, !0;
    }
  });
  return t;
}
function xt(e) {
  let t = (r) => typeof r == "object" && !Array.isArray(r) && r !== null, n = (r, a = "") => {
    Object.entries(Object.getOwnPropertyDescriptors(r)).forEach(([i, { value: o, enumerable: s }]) => {
      if (s === !1 || o === void 0)
        return;
      let c = a === "" ? i : `${a}.${i}`;
      typeof o == "object" && o !== null && o._x_interceptor ? r[i] = o.initialize(e, c, i) : t(o) && o !== r && !(o instanceof Element) && n(o, c);
    });
  };
  return n(e);
}
function Et(e, t = () => {
}) {
  let n = {
    initialValue: void 0,
    _x_interceptor: !0,
    initialize(r, a, i) {
      return e(this.initialValue, () => qn(r, a), (o) => Te(r, a, o), a, i);
    }
  };
  return t(n), (r) => {
    if (typeof r == "object" && r !== null && r._x_interceptor) {
      let a = n.initialize.bind(n);
      n.initialize = (i, o, s) => {
        let c = r.initialize(i, o, s);
        return n.initialValue = c, a(i, o, s);
      };
    } else
      n.initialValue = r;
    return n;
  };
}
function qn(e, t) {
  return t.split(".").reduce((n, r) => n[r], e);
}
function Te(e, t, n) {
  if (typeof t == "string" && (t = t.split(".")), t.length === 1)
    e[t[0]] = n;
  else {
    if (t.length === 0)
      throw error;
    return e[t[0]] || (e[t[0]] = {}), Te(e[t[0]], t.slice(1), n);
  }
}
var At = {};
function E(e, t) {
  At[e] = t;
}
function Le(e, t) {
  return Object.entries(At).forEach(([n, r]) => {
    Object.defineProperty(e, `$${n}`, {
      get() {
        let [a, i] = Lt(t);
        return a = { interceptor: Et, ...a }, vt(t, i), r(t, a);
      },
      enumerable: !1
    });
  }), e;
}
function Un(e, t, n, ...r) {
  try {
    return n(...r);
  } catch (a) {
    Q(a, e, t);
  }
}
function Q(e, t, n = void 0) {
  Object.assign(e, { el: t, expression: n }), console.warn(`Alpine Expression Error: ${e.message}

${n ? 'Expression: "' + n + `"

` : ""}`, t), setTimeout(() => {
    throw e;
  }, 0);
}
var se = !0;
function Jn(e) {
  let t = se;
  se = !1, e(), se = t;
}
function I(e, t, n = {}) {
  let r;
  return b(e, t)((a) => r = a, n), r;
}
function b(...e) {
  return Vt(...e);
}
var Vt = Pt;
function Yn(e) {
  Vt = e;
}
function Pt(e, t) {
  let n = {};
  Le(n, e);
  let r = [n, ...H(e)];
  if (typeof t == "function")
    return Qn(r, t);
  let a = Xn(r, t, e);
  return Un.bind(null, e, t, a);
}
function Qn(e, t) {
  return (n = () => {
  }, { scope: r = {}, params: a = [] } = {}) => {
    let i = t.apply(ee([r, ...e]), a);
    ce(n, i);
  };
}
var Ee = {};
function Zn(e, t) {
  if (Ee[e])
    return Ee[e];
  let n = Object.getPrototypeOf(async function() {
  }).constructor, r = /^[\n\s]*if.*\(.*\)/.test(e) || /^(let|const)\s/.test(e) ? `(() => { ${e} })()` : e, i = (() => {
    try {
      return new n(["__self", "scope"], `with (scope) { __self.result = ${r} }; __self.finished = true; return __self.result;`);
    } catch (o) {
      return Q(o, t, e), Promise.resolve();
    }
  })();
  return Ee[e] = i, i;
}
function Xn(e, t, n) {
  let r = Zn(t, n);
  return (a = () => {
  }, { scope: i = {}, params: o = [] } = {}) => {
    r.result = void 0, r.finished = !1;
    let s = ee([i, ...e]);
    if (typeof r == "function") {
      let c = r(r, s).catch((u) => Q(u, n, t));
      r.finished ? (ce(a, r.result, s, o, n), r.result = void 0) : c.then((u) => {
        ce(a, u, s, o, n);
      }).catch((u) => Q(u, n, t)).finally(() => r.result = void 0);
    }
  };
}
function ce(e, t, n, r, a) {
  if (se && typeof t == "function") {
    let i = t.apply(n, r);
    i instanceof Promise ? i.then((o) => ce(e, o, n, r)).catch((o) => Q(o, a, t)) : e(i);
  } else
    e(t);
}
var Je = "x-";
function z(e = "") {
  return Je + e;
}
function er(e) {
  Je = e;
}
var kt = {};
function _(e, t) {
  kt[e] = t;
}
function Ye(e, t, n) {
  if (t = Array.from(t), e._x_virtualDirectives) {
    let i = Object.entries(e._x_virtualDirectives).map(([s, c]) => ({ name: s, value: c })), o = Rt(i);
    i = i.map((s) => o.find((c) => c.name === s.name) ? {
      name: `x-bind:${s.name}`,
      value: `"${s.value}"`
    } : s), t = t.concat(i);
  }
  let r = {};
  return t.map(Dt((i, o) => r[i] = o)).filter(Nt).map(rr(r, n)).sort(ar).map((i) => nr(e, i));
}
function Rt(e) {
  return Array.from(e).map(Dt()).filter((t) => !Nt(t));
}
var Oe = !1, q = /* @__PURE__ */ new Map(), Tt = Symbol();
function tr(e) {
  Oe = !0;
  let t = Symbol();
  Tt = t, q.set(t, []);
  let n = () => {
    for (; q.get(t).length; )
      q.get(t).shift()();
    q.delete(t);
  }, r = () => {
    Oe = !1, n();
  };
  e(n), r();
}
function Lt(e) {
  let t = [], n = (s) => t.push(s), [r, a] = Nn(e);
  return t.push(a), [{
    Alpine: te,
    effect: r,
    cleanup: n,
    evaluateLater: b.bind(b, e),
    evaluate: I.bind(I, e)
  }, () => t.forEach((s) => s())];
}
function nr(e, t) {
  let n = () => {
  }, r = kt[t.type] || n, [a, i] = Lt(e);
  jn(e, t.original, i);
  let o = () => {
    e._x_ignore || e._x_ignoreSelf || (r.inline && r.inline(e, t, a), r = r.bind(r, e, t, a), Oe ? q.get(Tt).push(r) : r());
  };
  return o.runCleanups = i, o;
}
var Ot = (e, t) => ({ name: n, value: r }) => (n.startsWith(e) && (n = n.replace(e, t)), { name: n, value: r }), Ft = (e) => e;
function Dt(e = () => {
}) {
  return ({ name: t, value: n }) => {
    let { name: r, value: a } = Bt.reduce((i, o) => o(i), { name: t, value: n });
    return r !== t && e(r, t), { name: r, value: a };
  };
}
var Bt = [];
function Qe(e) {
  Bt.push(e);
}
function Nt({ name: e }) {
  return It().test(e);
}
var It = () => new RegExp(`^${Je}([^:^.]+)\\b`);
function rr(e, t) {
  return ({ name: n, value: r }) => {
    let a = n.match(It()), i = n.match(/:([a-zA-Z0-9\-:]+)/), o = n.match(/\.[^.\]]+(?=[^\]]*$)/g) || [], s = t || e[n] || n;
    return {
      type: a ? a[1] : null,
      value: i ? i[1] : null,
      modifiers: o.map((c) => c.replace(".", "")),
      expression: r,
      original: s
    };
  };
}
var Fe = "DEFAULT", ae = [
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
function ar(e, t) {
  let n = ae.indexOf(e.type) === -1 ? Fe : e.type, r = ae.indexOf(t.type) === -1 ? Fe : t.type;
  return ae.indexOf(n) - ae.indexOf(r);
}
function J(e, t, n = {}) {
  e.dispatchEvent(new CustomEvent(t, {
    detail: n,
    bubbles: !0,
    composed: !0,
    cancelable: !0
  }));
}
var De = [], Ze = !1;
function Ht(e = () => {
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
function ir() {
  Ze = !0;
}
function D(e, t) {
  if (typeof ShadowRoot == "function" && e instanceof ShadowRoot) {
    Array.from(e.children).forEach((a) => D(a, t));
    return;
  }
  let n = !1;
  if (t(e, () => n = !0), n)
    return;
  let r = e.firstElementChild;
  for (; r; )
    D(r, t), r = r.nextElementSibling;
}
function j(e, ...t) {
  console.warn(`Alpine Warning: ${e}`, ...t);
}
function or() {
  document.body || j("Unable to initialize. Trying to load Alpine before `<body>` is available. Did you forget to add `defer` in Alpine's `<script>` tag?"), J(document, "alpine:init"), J(document, "alpine:initializing"), Mt(), In((t) => k(t, D)), vt((t) => lr(t)), Hn((t, n) => {
    Ye(t, n).forEach((r) => r());
  });
  let e = (t) => !fe(t.parentElement, !0);
  Array.from(document.querySelectorAll($t())).filter(e).forEach((t) => {
    k(t);
  }), J(document, "alpine:initialized");
}
var Xe = [], jt = [];
function Wt() {
  return Xe.map((e) => e());
}
function $t() {
  return Xe.concat(jt).map((e) => e());
}
function zt(e) {
  Xe.push(e);
}
function Gt(e) {
  jt.push(e);
}
function fe(e, t = !1) {
  return he(e, (n) => {
    if ((t ? $t() : Wt()).some((a) => n.matches(a)))
      return !0;
  });
}
function he(e, t) {
  if (e) {
    if (t(e))
      return e;
    if (e._x_teleportBack && (e = e._x_teleportBack), !!e.parentElement)
      return he(e.parentElement, t);
  }
}
function sr(e) {
  return Wt().some((t) => e.matches(t));
}
function k(e, t = D) {
  tr(() => {
    t(e, (n, r) => {
      Ye(n, n.attributes).forEach((a) => a()), n._x_ignore && r();
    });
  });
}
function lr(e) {
  D(e, (t) => bt(t));
}
function et(e, t) {
  return Array.isArray(t) ? ut(e, t.join(" ")) : typeof t == "object" && t !== null ? cr(e, t) : typeof t == "function" ? et(e, t()) : ut(e, t);
}
function ut(e, t) {
  let n = (a) => a.split(" ").filter((i) => !e.classList.contains(i)).filter(Boolean), r = (a) => (e.classList.add(...a), () => {
    e.classList.remove(...a);
  });
  return t = t === !0 ? t = "" : t || "", r(n(t));
}
function cr(e, t) {
  let n = (s) => s.split(" ").filter(Boolean), r = Object.entries(t).flatMap(([s, c]) => c ? n(s) : !1).filter(Boolean), a = Object.entries(t).flatMap(([s, c]) => c ? !1 : n(s)).filter(Boolean), i = [], o = [];
  return a.forEach((s) => {
    e.classList.contains(s) && (e.classList.remove(s), o.push(s));
  }), r.forEach((s) => {
    e.classList.contains(s) || (e.classList.add(s), i.push(s));
  }), () => {
    o.forEach((s) => e.classList.add(s)), i.forEach((s) => e.classList.remove(s));
  };
}
function pe(e, t) {
  return typeof t == "object" && t !== null ? ur(e, t) : dr(e, t);
}
function ur(e, t) {
  let n = {};
  return Object.entries(t).forEach(([r, a]) => {
    n[r] = e.style[r], r.startsWith("--") || (r = fr(r)), e.style.setProperty(r, a);
  }), setTimeout(() => {
    e.style.length === 0 && e.removeAttribute("style");
  }), () => {
    pe(e, n);
  };
}
function dr(e, t) {
  let n = e.getAttribute("style", t);
  return e.setAttribute("style", t), () => {
    e.setAttribute("style", n || "");
  };
}
function fr(e) {
  return e.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}
function Ne(e, t = () => {
}) {
  let n = !1;
  return function() {
    n ? t.apply(this, arguments) : (n = !0, e.apply(this, arguments));
  };
}
_("transition", (e, { value: t, modifiers: n, expression: r }, { evaluate: a }) => {
  typeof r == "function" && (r = a(r)), r ? hr(e, r, t) : pr(e, n, t);
});
function hr(e, t, n) {
  Kt(e, et, ""), {
    enter: (a) => {
      e._x_transition.enter.during = a;
    },
    "enter-start": (a) => {
      e._x_transition.enter.start = a;
    },
    "enter-end": (a) => {
      e._x_transition.enter.end = a;
    },
    leave: (a) => {
      e._x_transition.leave.during = a;
    },
    "leave-start": (a) => {
      e._x_transition.leave.start = a;
    },
    "leave-end": (a) => {
      e._x_transition.leave.end = a;
    }
  }[n](t);
}
function pr(e, t, n) {
  Kt(e, pe);
  let r = !t.includes("in") && !t.includes("out") && !n, a = r || t.includes("in") || ["enter"].includes(n), i = r || t.includes("out") || ["leave"].includes(n);
  t.includes("in") && !r && (t = t.filter((p, y) => y < t.indexOf("out"))), t.includes("out") && !r && (t = t.filter((p, y) => y > t.indexOf("out")));
  let o = !t.includes("opacity") && !t.includes("scale"), s = o || t.includes("opacity"), c = o || t.includes("scale"), u = s ? 0 : 1, d = c ? G(t, "scale", 95) / 100 : 1, h = G(t, "delay", 0), g = G(t, "origin", "center"), V = "opacity, transform", B = G(t, "duration", 150) / 1e3, ne = G(t, "duration", 75) / 1e3, f = "cubic-bezier(0.4, 0.0, 0.2, 1)";
  a && (e._x_transition.enter.during = {
    transformOrigin: g,
    transitionDelay: h,
    transitionProperty: V,
    transitionDuration: `${B}s`,
    transitionTimingFunction: f
  }, e._x_transition.enter.start = {
    opacity: u,
    transform: `scale(${d})`
  }, e._x_transition.enter.end = {
    opacity: 1,
    transform: "scale(1)"
  }), i && (e._x_transition.leave.during = {
    transformOrigin: g,
    transitionDelay: h,
    transitionProperty: V,
    transitionDuration: `${ne}s`,
    transitionTimingFunction: f
  }, e._x_transition.leave.start = {
    opacity: 1,
    transform: "scale(1)"
  }, e._x_transition.leave.end = {
    opacity: u,
    transform: `scale(${d})`
  });
}
function Kt(e, t, n = {}) {
  e._x_transition || (e._x_transition = {
    enter: { during: n, start: n, end: n },
    leave: { during: n, start: n, end: n },
    in(r = () => {
    }, a = () => {
    }) {
      Ie(e, t, {
        during: this.enter.during,
        start: this.enter.start,
        end: this.enter.end
      }, r, a);
    },
    out(r = () => {
    }, a = () => {
    }) {
      Ie(e, t, {
        during: this.leave.during,
        start: this.leave.start,
        end: this.leave.end
      }, r, a);
    }
  });
}
window.Element.prototype._x_toggleAndCascadeWithTransitions = function(e, t, n, r) {
  const a = document.visibilityState === "visible" ? requestAnimationFrame : setTimeout;
  let i = () => a(n);
  if (t) {
    e._x_transition && (e._x_transition.enter || e._x_transition.leave) ? e._x_transition.enter && (Object.entries(e._x_transition.enter.during).length || Object.entries(e._x_transition.enter.start).length || Object.entries(e._x_transition.enter.end).length) ? e._x_transition.in(n) : i() : e._x_transition ? e._x_transition.in(n) : i();
    return;
  }
  e._x_hidePromise = e._x_transition ? new Promise((o, s) => {
    e._x_transition.out(() => {
    }, () => o(r)), e._x_transitioning.beforeCancel(() => s({ isFromCancelledTransition: !0 }));
  }) : Promise.resolve(r), queueMicrotask(() => {
    let o = qt(e);
    o ? (o._x_hideChildren || (o._x_hideChildren = []), o._x_hideChildren.push(e)) : a(() => {
      let s = (c) => {
        let u = Promise.all([
          c._x_hidePromise,
          ...(c._x_hideChildren || []).map(s)
        ]).then(([d]) => d());
        return delete c._x_hidePromise, delete c._x_hideChildren, u;
      };
      s(e).catch((c) => {
        if (!c.isFromCancelledTransition)
          throw c;
      });
    });
  });
};
function qt(e) {
  let t = e.parentNode;
  if (t)
    return t._x_hidePromise ? t : qt(t);
}
function Ie(e, t, { during: n, start: r, end: a } = {}, i = () => {
}, o = () => {
}) {
  if (e._x_transitioning && e._x_transitioning.cancel(), Object.keys(n).length === 0 && Object.keys(r).length === 0 && Object.keys(a).length === 0) {
    i(), o();
    return;
  }
  let s, c, u;
  mr(e, {
    start() {
      s = t(e, r);
    },
    during() {
      c = t(e, n);
    },
    before: i,
    end() {
      s(), u = t(e, a);
    },
    after: o,
    cleanup() {
      c(), u();
    }
  });
}
function mr(e, t) {
  let n, r, a, i = Ne(() => {
    S(() => {
      n = !0, r || t.before(), a || (t.end(), Be()), t.after(), e.isConnected && t.cleanup(), delete e._x_transitioning;
    });
  });
  e._x_transitioning = {
    beforeCancels: [],
    beforeCancel(o) {
      this.beforeCancels.push(o);
    },
    cancel: Ne(function() {
      for (; this.beforeCancels.length; )
        this.beforeCancels.shift()();
      i();
    }),
    finish: i
  }, S(() => {
    t.start(), t.during();
  }), ir(), requestAnimationFrame(() => {
    if (n)
      return;
    let o = Number(getComputedStyle(e).transitionDuration.replace(/,.*/, "").replace("s", "")) * 1e3, s = Number(getComputedStyle(e).transitionDelay.replace(/,.*/, "").replace("s", "")) * 1e3;
    o === 0 && (o = Number(getComputedStyle(e).animationDuration.replace("s", "")) * 1e3), S(() => {
      t.before();
    }), r = !0, requestAnimationFrame(() => {
      n || (S(() => {
        t.end();
      }), Be(), setTimeout(e._x_transitioning.finish, o + s), a = !0);
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
    let a = r.match(/([0-9]+)ms/);
    if (a)
      return a[1];
  }
  return t === "origin" && ["top", "right", "left", "center", "bottom"].includes(e[e.indexOf(t) + 2]) ? [r, e[e.indexOf(t) + 2]].join(" ") : r;
}
var He = !1;
function me(e, t = () => {
}) {
  return (...n) => He ? t(...n) : e(...n);
}
function gr(e, t) {
  t._x_dataStack || (t._x_dataStack = e._x_dataStack), He = !0, yr(() => {
    _r(t);
  }), He = !1;
}
function _r(e) {
  let t = !1;
  k(e, (r, a) => {
    D(r, (i, o) => {
      if (t && sr(i))
        return o();
      t = !0, a(i, o);
    });
  });
}
function yr(e) {
  let t = Z;
  lt((n, r) => {
    let a = t(n);
    return de(a), () => {
    };
  }), e(), lt(t);
}
function Ut(e, t, n, r = []) {
  switch (e._x_bindings || (e._x_bindings = $({})), e._x_bindings[t] = n, t = r.includes("camel") ? xr(t) : t, t) {
    case "value":
      wr(e, n);
      break;
    case "style":
      vr(e, n);
      break;
    case "class":
      Sr(e, n);
      break;
    default:
      br(e, t, n);
      break;
  }
}
function wr(e, t) {
  if (e.type === "radio")
    e.attributes.value === void 0 && (e.value = t), window.fromModel && (e.checked = dt(e.value, t));
  else if (e.type === "checkbox")
    Number.isInteger(t) ? e.value = t : !Number.isInteger(t) && !Array.isArray(t) && typeof t != "boolean" && ![null, void 0].includes(t) ? e.value = String(t) : Array.isArray(t) ? e.checked = t.some((n) => dt(n, e.value)) : e.checked = !!t;
  else if (e.tagName === "SELECT")
    Cr(e, t);
  else {
    if (e.value === t)
      return;
    e.value = t;
  }
}
function Sr(e, t) {
  e._x_undoAddedClasses && e._x_undoAddedClasses(), e._x_undoAddedClasses = et(e, t);
}
function vr(e, t) {
  e._x_undoAddedStyles && e._x_undoAddedStyles(), e._x_undoAddedStyles = pe(e, t);
}
function br(e, t, n) {
  [null, void 0, !1].includes(n) && Er(t) ? e.removeAttribute(t) : (Jt(t) && (n = t), Mr(e, t, n));
}
function Mr(e, t, n) {
  e.getAttribute(t) != n && e.setAttribute(t, n);
}
function Cr(e, t) {
  const n = [].concat(t).map((r) => r + "");
  Array.from(e.options).forEach((r) => {
    r.selected = n.includes(r.value);
  });
}
function xr(e) {
  return e.toLowerCase().replace(/-(\w)/g, (t, n) => n.toUpperCase());
}
function dt(e, t) {
  return e == t;
}
function Jt(e) {
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
  return r === null ? typeof n == "function" ? n() : n : r === "" ? !0 : Jt(t) ? !![t, "true"].includes(r) : r;
}
function Yt(e, t) {
  var n;
  return function() {
    var r = this, a = arguments, i = function() {
      n = null, e.apply(r, a);
    };
    clearTimeout(n), n = setTimeout(i, t);
  };
}
function Qt(e, t) {
  let n;
  return function() {
    let r = this, a = arguments;
    n || (e.apply(r, a), n = !0, setTimeout(() => n = !1, t));
  };
}
function Vr(e) {
  e(te);
}
var T = {}, ft = !1;
function Pr(e, t) {
  if (ft || (T = $(T), ft = !0), t === void 0)
    return T[e];
  T[e] = t, typeof t == "object" && t !== null && t.hasOwnProperty("init") && typeof t.init == "function" && T[e].init(), xt(T[e]);
}
function kr() {
  return T;
}
var Zt = {};
function Rr(e, t) {
  let n = typeof t != "function" ? () => t : t;
  e instanceof Element ? Xt(e, n()) : Zt[e] = n;
}
function Tr(e) {
  return Object.entries(Zt).forEach(([t, n]) => {
    Object.defineProperty(e, t, {
      get() {
        return (...r) => n(...r);
      }
    });
  }), e;
}
function Xt(e, t, n) {
  let r = [];
  for (; r.length; )
    r.pop()();
  let a = Object.entries(t).map(([o, s]) => ({ name: o, value: s })), i = Rt(a);
  a = a.map((o) => i.find((s) => s.name === o.name) ? {
    name: `x-bind:${o.name}`,
    value: `"${o.value}"`
  } : o), Ye(e, a, n).map((o) => {
    r.push(o.runCleanups), o();
  });
}
var en = {};
function Lr(e, t) {
  en[e] = t;
}
function Or(e, t) {
  return Object.entries(en).forEach(([n, r]) => {
    Object.defineProperty(e, n, {
      get() {
        return (...a) => r.bind(t)(...a);
      },
      enumerable: !1
    });
  }), e;
}
var Fr = {
  get reactive() {
    return $;
  },
  get release() {
    return de;
  },
  get effect() {
    return Z;
  },
  get raw() {
    return _t;
  },
  version: "3.10.5",
  flushAndStopDeferringMutations: Kn,
  dontAutoEvaluateFunctions: Jn,
  disableEffectScheduling: Dn,
  setReactivityEngine: Bn,
  closestDataStack: H,
  skipDuringClone: me,
  addRootSelector: zt,
  addInitSelector: Gt,
  addScopeToNode: X,
  deferMutations: Gn,
  mapAttributes: Qe,
  evaluateLater: b,
  setEvaluator: Yn,
  mergeProxies: ee,
  findClosest: he,
  closestRoot: fe,
  interceptor: Et,
  transition: Ie,
  setStyles: pe,
  mutateDom: S,
  directive: _,
  throttle: Qt,
  debounce: Yt,
  evaluate: I,
  initTree: k,
  nextTick: Ht,
  prefixed: z,
  prefix: er,
  plugin: Vr,
  magic: E,
  store: Pr,
  start: or,
  clone: gr,
  bound: Ar,
  $data: Ct,
  data: Lr,
  bind: Rr
}, te = Fr;
function Dr(e, t) {
  const n = /* @__PURE__ */ Object.create(null), r = e.split(",");
  for (let a = 0; a < r.length; a++)
    n[r[a]] = !0;
  return t ? (a) => !!n[a.toLowerCase()] : (a) => !!n[a];
}
var Br = Object.freeze({}), tn = Object.assign, Nr = Object.prototype.hasOwnProperty, ge = (e, t) => Nr.call(e, t), O = Array.isArray, Y = (e) => nn(e) === "[object Map]", Ir = (e) => typeof e == "string", tt = (e) => typeof e == "symbol", _e = (e) => e !== null && typeof e == "object", Hr = Object.prototype.toString, nn = (e) => Hr.call(e), rn = (e) => nn(e).slice(8, -1), nt = (e) => Ir(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, jr = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (n) => t[n] || (t[n] = e(n));
}, Wr = jr((e) => e.charAt(0).toUpperCase() + e.slice(1)), an = (e, t) => e !== t && (e === e || t === t), je = /* @__PURE__ */ new WeakMap(), K = [], A, F = Symbol("iterate"), We = Symbol("Map key iterate");
function $r(e) {
  return e && e._isEffect === !0;
}
function zr(e, t = Br) {
  $r(e) && (e = e.raw);
  const n = qr(e, t);
  return t.lazy || n(), n;
}
function Gr(e) {
  e.active && (on(e), e.options.onStop && e.options.onStop(), e.active = !1);
}
var Kr = 0;
function qr(e, t) {
  const n = function() {
    if (!n.active)
      return e();
    if (!K.includes(n)) {
      on(n);
      try {
        return Jr(), K.push(n), A = n, e();
      } finally {
        K.pop(), sn(), A = K[K.length - 1];
      }
    }
  };
  return n.id = Kr++, n.allowRecurse = !!t.allowRecurse, n._isEffect = !0, n.active = !0, n.raw = e, n.deps = [], n.options = t, n;
}
function on(e) {
  const { deps: t } = e;
  if (t.length) {
    for (let n = 0; n < t.length; n++)
      t[n].delete(e);
    t.length = 0;
  }
}
var W = !0, rt = [];
function Ur() {
  rt.push(W), W = !1;
}
function Jr() {
  rt.push(W), W = !0;
}
function sn() {
  const e = rt.pop();
  W = e === void 0 ? !0 : e;
}
function x(e, t, n) {
  if (!W || A === void 0)
    return;
  let r = je.get(e);
  r || je.set(e, r = /* @__PURE__ */ new Map());
  let a = r.get(n);
  a || r.set(n, a = /* @__PURE__ */ new Set()), a.has(A) || (a.add(A), A.deps.push(a), A.options.onTrack && A.options.onTrack({
    effect: A,
    target: e,
    type: t,
    key: n
  }));
}
function R(e, t, n, r, a, i) {
  const o = je.get(e);
  if (!o)
    return;
  const s = /* @__PURE__ */ new Set(), c = (d) => {
    d && d.forEach((h) => {
      (h !== A || h.allowRecurse) && s.add(h);
    });
  };
  if (t === "clear")
    o.forEach(c);
  else if (n === "length" && O(e))
    o.forEach((d, h) => {
      (h === "length" || h >= r) && c(d);
    });
  else
    switch (n !== void 0 && c(o.get(n)), t) {
      case "add":
        O(e) ? nt(n) && c(o.get("length")) : (c(o.get(F)), Y(e) && c(o.get(We)));
        break;
      case "delete":
        O(e) || (c(o.get(F)), Y(e) && c(o.get(We)));
        break;
      case "set":
        Y(e) && c(o.get(F));
        break;
    }
  const u = (d) => {
    d.options.onTrigger && d.options.onTrigger({
      effect: d,
      target: e,
      key: n,
      type: t,
      newValue: r,
      oldValue: a,
      oldTarget: i
    }), d.options.scheduler ? d.options.scheduler(d) : d();
  };
  s.forEach(u);
}
var Yr = /* @__PURE__ */ Dr("__proto__,__v_isRef,__isVue"), ln = new Set(Object.getOwnPropertyNames(Symbol).map((e) => Symbol[e]).filter(tt)), Qr = /* @__PURE__ */ ye(), Zr = /* @__PURE__ */ ye(!1, !0), Xr = /* @__PURE__ */ ye(!0), ea = /* @__PURE__ */ ye(!0, !0), ue = {};
["includes", "indexOf", "lastIndexOf"].forEach((e) => {
  const t = Array.prototype[e];
  ue[e] = function(...n) {
    const r = m(this);
    for (let i = 0, o = this.length; i < o; i++)
      x(r, "get", i + "");
    const a = t.apply(r, n);
    return a === -1 || a === !1 ? t.apply(r, n.map(m)) : a;
  };
});
["push", "pop", "shift", "unshift", "splice"].forEach((e) => {
  const t = Array.prototype[e];
  ue[e] = function(...n) {
    Ur();
    const r = t.apply(this, n);
    return sn(), r;
  };
});
function ye(e = !1, t = !1) {
  return function(r, a, i) {
    if (a === "__v_isReactive")
      return !e;
    if (a === "__v_isReadonly")
      return e;
    if (a === "__v_raw" && i === (e ? t ? ua : Mn : t ? ca : bn).get(r))
      return r;
    const o = O(r);
    if (!e && o && ge(ue, a))
      return Reflect.get(ue, a, i);
    const s = Reflect.get(r, a, i);
    return (tt(a) ? ln.has(a) : Yr(a)) || (e || x(r, "get", a), t) ? s : $e(s) ? !o || !nt(a) ? s.value : s : _e(s) ? e ? Cn(s) : st(s) : s;
  };
}
var ta = /* @__PURE__ */ cn(), na = /* @__PURE__ */ cn(!0);
function cn(e = !1) {
  return function(n, r, a, i) {
    let o = n[r];
    if (!e && (a = m(a), o = m(o), !O(n) && $e(o) && !$e(a)))
      return o.value = a, !0;
    const s = O(n) && nt(r) ? Number(r) < n.length : ge(n, r), c = Reflect.set(n, r, a, i);
    return n === m(i) && (s ? an(a, o) && R(n, "set", r, a, o) : R(n, "add", r, a)), c;
  };
}
function ra(e, t) {
  const n = ge(e, t), r = e[t], a = Reflect.deleteProperty(e, t);
  return a && n && R(e, "delete", t, void 0, r), a;
}
function aa(e, t) {
  const n = Reflect.has(e, t);
  return (!tt(t) || !ln.has(t)) && x(e, "has", t), n;
}
function ia(e) {
  return x(e, "iterate", O(e) ? "length" : F), Reflect.ownKeys(e);
}
var un = {
  get: Qr,
  set: ta,
  deleteProperty: ra,
  has: aa,
  ownKeys: ia
}, dn = {
  get: Xr,
  set(e, t) {
    return console.warn(`Set operation on key "${String(t)}" failed: target is readonly.`, e), !0;
  },
  deleteProperty(e, t) {
    return console.warn(`Delete operation on key "${String(t)}" failed: target is readonly.`, e), !0;
  }
};
tn({}, un, {
  get: Zr,
  set: na
});
tn({}, dn, {
  get: ea
});
var at = (e) => _e(e) ? st(e) : e, it = (e) => _e(e) ? Cn(e) : e, ot = (e) => e, we = (e) => Reflect.getPrototypeOf(e);
function Se(e, t, n = !1, r = !1) {
  e = e.__v_raw;
  const a = m(e), i = m(t);
  t !== i && !n && x(a, "get", t), !n && x(a, "get", i);
  const { has: o } = we(a), s = r ? ot : n ? it : at;
  if (o.call(a, t))
    return s(e.get(t));
  if (o.call(a, i))
    return s(e.get(i));
  e !== a && e.get(t);
}
function ve(e, t = !1) {
  const n = this.__v_raw, r = m(n), a = m(e);
  return e !== a && !t && x(r, "has", e), !t && x(r, "has", a), e === a ? n.has(e) : n.has(e) || n.has(a);
}
function be(e, t = !1) {
  return e = e.__v_raw, !t && x(m(e), "iterate", F), Reflect.get(e, "size", e);
}
function fn(e) {
  e = m(e);
  const t = m(this);
  return we(t).has.call(t, e) || (t.add(e), R(t, "add", e, e)), this;
}
function hn(e, t) {
  t = m(t);
  const n = m(this), { has: r, get: a } = we(n);
  let i = r.call(n, e);
  i ? vn(n, r, e) : (e = m(e), i = r.call(n, e));
  const o = a.call(n, e);
  return n.set(e, t), i ? an(t, o) && R(n, "set", e, t, o) : R(n, "add", e, t), this;
}
function pn(e) {
  const t = m(this), { has: n, get: r } = we(t);
  let a = n.call(t, e);
  a ? vn(t, n, e) : (e = m(e), a = n.call(t, e));
  const i = r ? r.call(t, e) : void 0, o = t.delete(e);
  return a && R(t, "delete", e, void 0, i), o;
}
function mn() {
  const e = m(this), t = e.size !== 0, n = Y(e) ? new Map(e) : new Set(e), r = e.clear();
  return t && R(e, "clear", void 0, void 0, n), r;
}
function Me(e, t) {
  return function(r, a) {
    const i = this, o = i.__v_raw, s = m(o), c = t ? ot : e ? it : at;
    return !e && x(s, "iterate", F), o.forEach((u, d) => r.call(a, c(u), c(d), i));
  };
}
function ie(e, t, n) {
  return function(...r) {
    const a = this.__v_raw, i = m(a), o = Y(i), s = e === "entries" || e === Symbol.iterator && o, c = e === "keys" && o, u = a[e](...r), d = n ? ot : t ? it : at;
    return !t && x(i, "iterate", c ? We : F), {
      next() {
        const { value: h, done: g } = u.next();
        return g ? { value: h, done: g } : {
          value: s ? [d(h[0]), d(h[1])] : d(h),
          done: g
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
      console.warn(`${Wr(e)} operation ${n}failed: target is readonly.`, m(this));
    }
    return e === "delete" ? !1 : this;
  };
}
var gn = {
  get(e) {
    return Se(this, e);
  },
  get size() {
    return be(this);
  },
  has: ve,
  add: fn,
  set: hn,
  delete: pn,
  clear: mn,
  forEach: Me(!1, !1)
}, _n = {
  get(e) {
    return Se(this, e, !1, !0);
  },
  get size() {
    return be(this);
  },
  has: ve,
  add: fn,
  set: hn,
  delete: pn,
  clear: mn,
  forEach: Me(!1, !0)
}, yn = {
  get(e) {
    return Se(this, e, !0);
  },
  get size() {
    return be(this, !0);
  },
  has(e) {
    return ve.call(this, e, !0);
  },
  add: P("add"),
  set: P("set"),
  delete: P("delete"),
  clear: P("clear"),
  forEach: Me(!0, !1)
}, wn = {
  get(e) {
    return Se(this, e, !0, !0);
  },
  get size() {
    return be(this, !0);
  },
  has(e) {
    return ve.call(this, e, !0);
  },
  add: P("add"),
  set: P("set"),
  delete: P("delete"),
  clear: P("clear"),
  forEach: Me(!0, !0)
}, oa = ["keys", "values", "entries", Symbol.iterator];
oa.forEach((e) => {
  gn[e] = ie(e, !1, !1), yn[e] = ie(e, !0, !1), _n[e] = ie(e, !1, !0), wn[e] = ie(e, !0, !0);
});
function Sn(e, t) {
  const n = t ? e ? wn : _n : e ? yn : gn;
  return (r, a, i) => a === "__v_isReactive" ? !e : a === "__v_isReadonly" ? e : a === "__v_raw" ? r : Reflect.get(ge(n, a) && a in r ? n : r, a, i);
}
var sa = {
  get: Sn(!1, !1)
}, la = {
  get: Sn(!0, !1)
};
function vn(e, t, n) {
  const r = m(n);
  if (r !== n && t.call(e, r)) {
    const a = rn(e);
    console.warn(`Reactive ${a} contains both the raw and reactive versions of the same object${a === "Map" ? " as keys" : ""}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`);
  }
}
var bn = /* @__PURE__ */ new WeakMap(), ca = /* @__PURE__ */ new WeakMap(), Mn = /* @__PURE__ */ new WeakMap(), ua = /* @__PURE__ */ new WeakMap();
function da(e) {
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
function fa(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : da(rn(e));
}
function st(e) {
  return e && e.__v_isReadonly ? e : xn(e, !1, un, sa, bn);
}
function Cn(e) {
  return xn(e, !0, dn, la, Mn);
}
function xn(e, t, n, r, a) {
  if (!_e(e))
    return console.warn(`value cannot be made reactive: ${String(e)}`), e;
  if (e.__v_raw && !(t && e.__v_isReactive))
    return e;
  const i = a.get(e);
  if (i)
    return i;
  const o = fa(e);
  if (o === 0)
    return e;
  const s = new Proxy(e, o === 2 ? r : n);
  return a.set(e, s), s;
}
function m(e) {
  return e && m(e.__v_raw) || e;
}
function $e(e) {
  return !!(e && e.__v_isRef === !0);
}
E("nextTick", () => Ht);
E("dispatch", (e) => J.bind(J, e));
E("watch", (e, { evaluateLater: t, effect: n }) => (r, a) => {
  let i = t(r), o = !0, s, c = n(() => i((u) => {
    JSON.stringify(u), o ? s = u : queueMicrotask(() => {
      a(u, s), s = u;
    }), o = !1;
  }));
  e._x_effects.delete(c);
});
E("store", kr);
E("data", (e) => Ct(e));
E("root", (e) => fe(e));
E("refs", (e) => (e._x_refs_proxy || (e._x_refs_proxy = ee(ha(e))), e._x_refs_proxy));
function ha(e) {
  let t = [], n = e;
  for (; n; )
    n._x_refs && t.push(n._x_refs), n = n.parentNode;
  return t;
}
var Ae = {};
function En(e) {
  return Ae[e] || (Ae[e] = 0), ++Ae[e];
}
function pa(e, t) {
  return he(e, (n) => {
    if (n._x_ids && n._x_ids[t])
      return !0;
  });
}
function ma(e, t) {
  e._x_ids || (e._x_ids = {}), e._x_ids[t] || (e._x_ids[t] = En(t));
}
E("id", (e) => (t, n = null) => {
  let r = pa(e, t), a = r ? r._x_ids[t] : En(t);
  return n ? `${t}-${a}-${n}` : `${t}-${a}`;
});
E("el", (e) => e);
An("Focus", "focus", "focus");
An("Persist", "persist", "persist");
function An(e, t, n) {
  E(t, (r) => j(`You can't use [$${directiveName}] without first installing the "${e}" plugin here: https://alpinejs.dev/plugins/${n}`, r));
}
_("modelable", (e, { expression: t }, { effect: n, evaluateLater: r }) => {
  let a = r(t), i = () => {
    let u;
    return a((d) => u = d), u;
  }, o = r(`${t} = __placeholder`), s = (u) => o(() => {
  }, { scope: { __placeholder: u } }), c = i();
  s(c), queueMicrotask(() => {
    if (!e._x_model)
      return;
    e._x_removeModelListeners.default();
    let u = e._x_model.get, d = e._x_model.set;
    n(() => s(u())), n(() => d(i()));
  });
});
_("teleport", (e, { expression: t }, { cleanup: n }) => {
  e.tagName.toLowerCase() !== "template" && j("x-teleport can only be used on a <template> tag", e);
  let r = document.querySelector(t);
  r || j(`Cannot find x-teleport element for selector: "${t}"`);
  let a = e.content.cloneNode(!0).firstElementChild;
  e._x_teleport = a, a._x_teleportBack = e, e._x_forwardEvents && e._x_forwardEvents.forEach((i) => {
    a.addEventListener(i, (o) => {
      o.stopPropagation(), e.dispatchEvent(new o.constructor(o.type, o));
    });
  }), X(a, {}, e), S(() => {
    r.appendChild(a), k(a), a._x_ignore = !0;
  }), n(() => a.remove());
});
var Vn = () => {
};
Vn.inline = (e, { modifiers: t }, { cleanup: n }) => {
  t.includes("self") ? e._x_ignoreSelf = !0 : e._x_ignore = !0, n(() => {
    t.includes("self") ? delete e._x_ignoreSelf : delete e._x_ignore;
  });
};
_("ignore", Vn);
_("effect", (e, { expression: t }, { effect: n }) => n(b(e, t)));
function Pn(e, t, n, r) {
  let a = e, i = (c) => r(c), o = {}, s = (c, u) => (d) => u(c, d);
  if (n.includes("dot") && (t = ga(t)), n.includes("camel") && (t = _a(t)), n.includes("passive") && (o.passive = !0), n.includes("capture") && (o.capture = !0), n.includes("window") && (a = window), n.includes("document") && (a = document), n.includes("prevent") && (i = s(i, (c, u) => {
    u.preventDefault(), c(u);
  })), n.includes("stop") && (i = s(i, (c, u) => {
    u.stopPropagation(), c(u);
  })), n.includes("self") && (i = s(i, (c, u) => {
    u.target === e && c(u);
  })), (n.includes("away") || n.includes("outside")) && (a = document, i = s(i, (c, u) => {
    e.contains(u.target) || u.target.isConnected !== !1 && (e.offsetWidth < 1 && e.offsetHeight < 1 || e._x_isShown !== !1 && c(u));
  })), n.includes("once") && (i = s(i, (c, u) => {
    c(u), a.removeEventListener(t, i, o);
  })), i = s(i, (c, u) => {
    wa(t) && Sa(u, n) || c(u);
  }), n.includes("debounce")) {
    let c = n[n.indexOf("debounce") + 1] || "invalid-wait", u = ze(c.split("ms")[0]) ? Number(c.split("ms")[0]) : 250;
    i = Yt(i, u);
  }
  if (n.includes("throttle")) {
    let c = n[n.indexOf("throttle") + 1] || "invalid-wait", u = ze(c.split("ms")[0]) ? Number(c.split("ms")[0]) : 250;
    i = Qt(i, u);
  }
  return a.addEventListener(t, i, o), () => {
    a.removeEventListener(t, i, o);
  };
}
function ga(e) {
  return e.replace(/-/g, ".");
}
function _a(e) {
  return e.toLowerCase().replace(/-(\w)/g, (t, n) => n.toUpperCase());
}
function ze(e) {
  return !Array.isArray(e) && !isNaN(e);
}
function ya(e) {
  return e.replace(/([a-z])([A-Z])/g, "$1-$2").replace(/[_\s]/, "-").toLowerCase();
}
function wa(e) {
  return ["keydown", "keyup"].includes(e);
}
function Sa(e, t) {
  let n = t.filter((i) => !["window", "document", "prevent", "stop", "once"].includes(i));
  if (n.includes("debounce")) {
    let i = n.indexOf("debounce");
    n.splice(i, ze((n[i + 1] || "invalid-wait").split("ms")[0]) ? 2 : 1);
  }
  if (n.length === 0 || n.length === 1 && ht(e.key).includes(n[0]))
    return !1;
  const a = ["ctrl", "shift", "alt", "meta", "cmd", "super"].filter((i) => n.includes(i));
  return n = n.filter((i) => !a.includes(i)), !(a.length > 0 && a.filter((o) => ((o === "cmd" || o === "super") && (o = "meta"), e[`${o}Key`])).length === a.length && ht(e.key).includes(n[0]));
}
function ht(e) {
  if (!e)
    return [];
  e = ya(e);
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
_("model", (e, { modifiers: t, expression: n }, { effect: r, cleanup: a }) => {
  let i = b(e, n), o = `${n} = rightSideOfExpression($event, ${n})`, s = b(e, o);
  var c = e.tagName.toLowerCase() === "select" || ["checkbox", "radio"].includes(e.type) || t.includes("lazy") ? "change" : "input";
  let u = va(e, t, n), d = Pn(e, c, t, (g) => {
    s(() => {
    }, { scope: {
      $event: g,
      rightSideOfExpression: u
    } });
  });
  e._x_removeModelListeners || (e._x_removeModelListeners = {}), e._x_removeModelListeners.default = d, a(() => e._x_removeModelListeners.default());
  let h = b(e, `${n} = __placeholder`);
  e._x_model = {
    get() {
      let g;
      return i((V) => g = V), g;
    },
    set(g) {
      h(() => {
      }, { scope: { __placeholder: g } });
    }
  }, e._x_forceModelUpdate = () => {
    i((g) => {
      g === void 0 && n.match(/\./) && (g = ""), window.fromModel = !0, S(() => Ut(e, "value", g)), delete window.fromModel;
    });
  }, r(() => {
    t.includes("unintrusive") && document.activeElement.isSameNode(e) || e._x_forceModelUpdate();
  });
});
function va(e, t, n) {
  return e.type === "radio" && S(() => {
    e.hasAttribute("name") || e.setAttribute("name", n);
  }), (r, a) => S(() => {
    if (r instanceof CustomEvent && r.detail !== void 0)
      return r.detail || r.target.value;
    if (e.type === "checkbox")
      if (Array.isArray(a)) {
        let i = t.includes("number") ? Ve(r.target.value) : r.target.value;
        return r.target.checked ? a.concat([i]) : a.filter((o) => !ba(o, i));
      } else
        return r.target.checked;
    else {
      if (e.tagName.toLowerCase() === "select" && e.multiple)
        return t.includes("number") ? Array.from(r.target.selectedOptions).map((i) => {
          let o = i.value || i.text;
          return Ve(o);
        }) : Array.from(r.target.selectedOptions).map((i) => i.value || i.text);
      {
        let i = r.target.value;
        return t.includes("number") ? Ve(i) : t.includes("trim") ? i.trim() : i;
      }
    }
  });
}
function Ve(e) {
  let t = e ? parseFloat(e) : null;
  return Ma(t) ? t : e;
}
function ba(e, t) {
  return e == t;
}
function Ma(e) {
  return !Array.isArray(e) && !isNaN(e);
}
_("cloak", (e) => queueMicrotask(() => S(() => e.removeAttribute(z("cloak")))));
Gt(() => `[${z("init")}]`);
_("init", me((e, { expression: t }, { evaluate: n }) => typeof t == "string" ? !!t.trim() && n(t, {}, !1) : n(t, {}, !1)));
_("text", (e, { expression: t }, { effect: n, evaluateLater: r }) => {
  let a = r(t);
  n(() => {
    a((i) => {
      S(() => {
        e.textContent = i;
      });
    });
  });
});
_("html", (e, { expression: t }, { effect: n, evaluateLater: r }) => {
  let a = r(t);
  n(() => {
    a((i) => {
      S(() => {
        e.innerHTML = i, e._x_ignoreSelf = !0, k(e), delete e._x_ignoreSelf;
      });
    });
  });
});
Qe(Ot(":", Ft(z("bind:"))));
_("bind", (e, { value: t, modifiers: n, expression: r, original: a }, { effect: i }) => {
  if (!t) {
    let s = {};
    Tr(s), b(e, r)((u) => {
      Xt(e, u, a);
    }, { scope: s });
    return;
  }
  if (t === "key")
    return Ca(e, r);
  let o = b(e, r);
  i(() => o((s) => {
    s === void 0 && typeof r == "string" && r.match(/\./) && (s = ""), S(() => Ut(e, t, s, n));
  }));
});
function Ca(e, t) {
  e._x_keyExpression = t;
}
zt(() => `[${z("data")}]`);
_("data", me((e, { expression: t }, { cleanup: n }) => {
  t = t === "" ? "{}" : t;
  let r = {};
  Le(r, e);
  let a = {};
  Or(a, r);
  let i = I(e, t, { scope: a });
  i === void 0 && (i = {}), Le(i, e);
  let o = $(i);
  xt(o);
  let s = X(e, o);
  o.init && I(e, o.init), n(() => {
    o.destroy && I(e, o.destroy), s();
  });
}));
_("show", (e, { modifiers: t, expression: n }, { effect: r }) => {
  let a = b(e, n);
  e._x_doHide || (e._x_doHide = () => {
    S(() => {
      e.style.setProperty("display", "none", t.includes("important") ? "important" : void 0);
    });
  }), e._x_doShow || (e._x_doShow = () => {
    S(() => {
      e.style.length === 1 && e.style.display === "none" ? e.removeAttribute("style") : e.style.removeProperty("display");
    });
  });
  let i = () => {
    e._x_doHide(), e._x_isShown = !1;
  }, o = () => {
    e._x_doShow(), e._x_isShown = !0;
  }, s = () => setTimeout(o), c = Ne((h) => h ? o() : i(), (h) => {
    typeof e._x_toggleAndCascadeWithTransitions == "function" ? e._x_toggleAndCascadeWithTransitions(e, h, o, i) : h ? s() : i();
  }), u, d = !0;
  r(() => a((h) => {
    !d && h === u || (t.includes("immediate") && (h ? s() : i()), c(h), u = h, d = !1);
  }));
});
_("for", (e, { expression: t }, { effect: n, cleanup: r }) => {
  let a = Ea(t), i = b(e, a.items), o = b(e, e._x_keyExpression || "index");
  e._x_prevKeys = [], e._x_lookup = {}, n(() => xa(e, a, i, o)), r(() => {
    Object.values(e._x_lookup).forEach((s) => s.remove()), delete e._x_prevKeys, delete e._x_lookup;
  });
});
function xa(e, t, n, r) {
  let a = (o) => typeof o == "object" && !Array.isArray(o), i = e;
  n((o) => {
    Aa(o) && o >= 0 && (o = Array.from(Array(o).keys(), (f) => f + 1)), o === void 0 && (o = []);
    let s = e._x_lookup, c = e._x_prevKeys, u = [], d = [];
    if (a(o))
      o = Object.entries(o).map(([f, p]) => {
        let y = pt(t, p, f, o);
        r((v) => d.push(v), { scope: { index: f, ...y } }), u.push(y);
      });
    else
      for (let f = 0; f < o.length; f++) {
        let p = pt(t, o[f], f, o);
        r((y) => d.push(y), { scope: { index: f, ...p } }), u.push(p);
      }
    let h = [], g = [], V = [], B = [];
    for (let f = 0; f < c.length; f++) {
      let p = c[f];
      d.indexOf(p) === -1 && V.push(p);
    }
    c = c.filter((f) => !V.includes(f));
    let ne = "template";
    for (let f = 0; f < d.length; f++) {
      let p = d[f], y = c.indexOf(p);
      if (y === -1)
        c.splice(f, 0, p), h.push([ne, f]);
      else if (y !== f) {
        let v = c.splice(f, 1)[0], C = c.splice(y - 1, 1)[0];
        c.splice(f, 0, C), c.splice(y, 0, v), g.push([v, C]);
      } else
        B.push(p);
      ne = p;
    }
    for (let f = 0; f < V.length; f++) {
      let p = V[f];
      s[p]._x_effects && s[p]._x_effects.forEach(gt), s[p].remove(), s[p] = null, delete s[p];
    }
    for (let f = 0; f < g.length; f++) {
      let [p, y] = g[f], v = s[p], C = s[y], N = document.createElement("div");
      S(() => {
        C.after(N), v.after(C), C._x_currentIfEl && C.after(C._x_currentIfEl), N.before(v), v._x_currentIfEl && v.after(v._x_currentIfEl), N.remove();
      }), ct(C, u[d.indexOf(y)]);
    }
    for (let f = 0; f < h.length; f++) {
      let [p, y] = h[f], v = p === "template" ? i : s[p];
      v._x_currentIfEl && (v = v._x_currentIfEl);
      let C = u[y], N = d[y], re = document.importNode(i.content, !0).firstElementChild;
      X(re, $(C), i), S(() => {
        v.after(re), k(re);
      }), typeof N == "object" && j("x-for key cannot be an object, it must be a string or an integer", i), s[N] = re;
    }
    for (let f = 0; f < B.length; f++)
      ct(s[B[f]], u[d.indexOf(B[f])]);
    i._x_prevKeys = d;
  });
}
function Ea(e) {
  let t = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/, n = /^\s*\(|\)\s*$/g, r = /([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/, a = e.match(r);
  if (!a)
    return;
  let i = {};
  i.items = a[2].trim();
  let o = a[1].replace(n, "").trim(), s = o.match(t);
  return s ? (i.item = o.replace(t, "").trim(), i.index = s[1].trim(), s[2] && (i.collection = s[2].trim())) : i.item = o, i;
}
function pt(e, t, n, r) {
  let a = {};
  return /^\[.*\]$/.test(e.item) && Array.isArray(t) ? e.item.replace("[", "").replace("]", "").split(",").map((o) => o.trim()).forEach((o, s) => {
    a[o] = t[s];
  }) : /^\{.*\}$/.test(e.item) && !Array.isArray(t) && typeof t == "object" ? e.item.replace("{", "").replace("}", "").split(",").map((o) => o.trim()).forEach((o) => {
    a[o] = t[o];
  }) : a[e.item] = t, e.index && (a[e.index] = n), e.collection && (a[e.collection] = r), a;
}
function Aa(e) {
  return !Array.isArray(e) && !isNaN(e);
}
function kn() {
}
kn.inline = (e, { expression: t }, { cleanup: n }) => {
  let r = fe(e);
  r._x_refs || (r._x_refs = {}), r._x_refs[t] = e, n(() => delete r._x_refs[t]);
};
_("ref", kn);
_("if", (e, { expression: t }, { effect: n, cleanup: r }) => {
  let a = b(e, t), i = () => {
    if (e._x_currentIfEl)
      return e._x_currentIfEl;
    let s = e.content.cloneNode(!0).firstElementChild;
    return X(s, {}, e), S(() => {
      e.after(s), k(s);
    }), e._x_currentIfEl = s, e._x_undoIf = () => {
      D(s, (c) => {
        c._x_effects && c._x_effects.forEach(gt);
      }), s.remove(), delete e._x_currentIfEl;
    }, s;
  }, o = () => {
    e._x_undoIf && (e._x_undoIf(), delete e._x_undoIf);
  };
  n(() => a((s) => {
    s ? i() : o();
  })), r(() => e._x_undoIf && e._x_undoIf());
});
_("id", (e, { expression: t }, { evaluate: n }) => {
  n(t).forEach((a) => ma(e, a));
});
Qe(Ot("@", Ft(z("on:"))));
_("on", me((e, { value: t, modifiers: n, expression: r }, { cleanup: a }) => {
  let i = r ? b(e, r) : () => {
  };
  e.tagName.toLowerCase() === "template" && (e._x_forwardEvents || (e._x_forwardEvents = []), e._x_forwardEvents.includes(t) || e._x_forwardEvents.push(t));
  let o = Pn(e, t, n, (s) => {
    i(() => {
    }, { scope: { $event: s }, params: [s] });
  });
  a(() => o());
}));
Ce("Collapse", "collapse", "collapse");
Ce("Intersect", "intersect", "intersect");
Ce("Focus", "trap", "focus");
Ce("Mask", "mask", "mask");
function Ce(e, t, n) {
  _(t, (r) => j(`You can't use [x-${t}] without first installing the "${e}" plugin here: https://alpinejs.dev/plugins/${n}`, r));
}
te.setEvaluator(Pt);
te.setReactivityEngine({ reactive: st, effect: zr, release: Gr, raw: m });
var Va = te, w = Va;
const l = {};
Pa(l);
ka(l);
Ra(l);
w.start();
function Pa(e) {
  e.addressViewModel = Ta(), e.contactViewModel = La(), e.estimateViewModel = Oa(), e.personalizationViewModel = Fa(), e.experimentationViewModel = Da(), e.aduCalculatorViewModel = Ba();
}
function ka(e) {
  e.flowStateMachine = Na(), e.flowState = Ia();
}
function Ra(e) {
  e.modalHelpers = Ha();
}
function Ta() {
  return w.store("addressViewModel", {
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
      const e = document.getElementById(
        "address-form-submit-button"
      );
      this.submitButtonText = {
        normal: e.value,
        processing: e.dataset.wait
      };
    },
    async handleInput() {
      this.isSelected && (this.selectedMatch = {}), this.hasParcelDetails && (this.parcelDetails = {}), l.estimateViewModel.hasResults && l.estimateViewModel.init(), l.contactViewModel.isSubmitted && (l.contactViewModel.isSubmitted = !1), l.experimentationViewModel.getActiveExperimentVariation(
        "windfall-estimate-or-eligibility-2023-07"
      ) && l.experimentationViewModel.clearActiveExperiment(
        "windfall-estimate-or-eligibility-2023-07"
      );
      try {
        this.matches = await ja(this.inputValue);
      } catch {
        this.errorMessage = "There was an error finding your address. Please try again, or contact us for help.", l.flowState.value = l.flowStateMachine.transition(
          l.flowState.value,
          "ERROR"
        );
      }
    },
    handleKeydown(e) {
      e.key != "Enter" && e.key != "ArrowUp" && e.key != "ArrowDown" || this.isSelected || this.matches.length === 0 || (e.preventDefault(), e.stopPropagation(), e.key === "Enter" && this.keyboardNavIndex != -1 ? this.handleMatchSelection(this.matches[this.keyboardNavIndex]) : e.key === "ArrowUp" ? this.keyboardNavIndex = this.keyboardNavIndex <= -1 ? this.matches.length - 1 : this.keyboardNavIndex - 1 : e.key === "ArrowDown" && (this.keyboardNavIndex = this.keyboardNavIndex >= this.matches.length - 1 ? -1 : this.keyboardNavIndex + 1));
    },
    handleMatchSelection(e) {
      this.selectedMatch = e, this.inputValue = e.address + ", " + e.context, this.matches = [], this.keyboardNavIndex = -1, M("Address Selected");
    },
    handleSubmit(e, t = {}) {
      e.preventDefault(), e.stopPropagation(), this.submitAddress(t);
    },
    async submitAddress(e = {}) {
      var t;
      if (!(l.flowState.value == "addressFormProcessing" || l.flowState.value == "modalAddressFormProcessing")) {
        (t = document.activeElement) == null || t.blur(), this.errorMessage = "", l.flowState.value = l.flowStateMachine.transition(
          l.flowState.value,
          "SUBMIT_ADDRESS"
        ), M("Address Submitted");
        try {
          if (this.hasParcelDetails && l.estimateViewModel.hasResults && l.contactViewModel.isSubmitted)
            l.flowState.value = l.flowStateMachine.transition(
              l.flowState.value,
              "SKIP_CONTACT"
            );
          else {
            if (l.addressViewModel.hasParcelDetails || (l.addressViewModel.parcelDetails = {
              ...await Ga(
                l.addressViewModel.selectedMatch.ll_uuid
              ),
              address: l.addressViewModel.selectedMatch.address,
              city: l.addressViewModel.selectedMatch.context.split(
                ", "
              )[0],
              state: l.addressViewModel.selectedMatch.context.split(", ")[1]
            }), !l.estimateViewModel.hasResults) {
              const n = {
                ...e,
                parcel: {
                  apn: l.addressViewModel.parcelDetails.apn,
                  jurisdiction: l.addressViewModel.parcelDetails.jurisdiction
                },
                address: {
                  address: l.addressViewModel.parcelDetails.address,
                  city: l.addressViewModel.parcelDetails.city,
                  state: l.addressViewModel.parcelDetails.state,
                  zip: l.addressViewModel.parcelDetails.zip
                }
              }, r = await qa(n);
              l.estimateViewModel.jurisdiction = r.jurisdiction, l.estimateViewModel.estimate = r.estimate;
            }
            l.flowState.value = l.flowStateMachine.transition(
              l.flowState.value,
              "SUCCESS"
            ), M("Address Submission Succeeded");
          }
        } catch {
          l.flowState.value = l.flowStateMachine.transition(
            l.flowState.value,
            "SUCCESS"
          ), M("Address Submission Errors (Non-Blocking)");
        }
      }
    }
  }), w.store("addressViewModel");
}
function La() {
  return w.store("contactViewModel", {
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
      const e = document.getElementById(
        "contact-form-submit-button"
      );
      this.submitButtonText = {
        normal: e.value,
        processing: e.dataset.wait
      };
    },
    formatPhoneInput(e) {
      return Ua(e);
    },
    handleSubmit(e, t = {}) {
      e.preventDefault(), e.stopPropagation(), this.submitContact(t);
    },
    async submitContact(e = {}) {
      var t;
      if (l.flowState.value != "contactFormProcessing") {
        if ((t = document.activeElement) == null || t.blur(), this.errorMessage = "", l.flowState.value = l.flowStateMachine.transition(
          l.flowState.value,
          "SUBMIT_CONTACT"
        ), l.estimateViewModel.hasActiveJurisdiction && l.estimateViewModel.hasEstimate && e && e.lead && e.lead.type && e.lead.type === "Windfall") {
          const n = "windfall-estimate-or-eligibility-2023-07", r = Math.random() < 0.5 ? "amount-excluded" : "amount-included";
          l.experimentationViewModel.setActiveExperimentVariation(
            n,
            r
          );
        }
        M("Contact Submitted");
        try {
          let n = {
            firstName: this.firstName.trim(),
            lastName: this.lastName.trim(),
            email: this.email.trim(),
            phone: this.phone.trim(),
            desiredTimeline: this.desiredTimeline.trim()
          };
          if (!Ja(n.email))
            throw new Error(
              "Please enter a valid email address, and try again.",
              { cause: "INVALID_EMAIL" }
            );
          if (!Ya(n.phone))
            throw new Error(
              "Please enter a valid phone number, including area code, and try again.",
              { cause: "INVALID_PHONE" }
            );
          l.addressViewModel.hasParcelDetails ? n = {
            ...n,
            ...l.addressViewModel.parcelDetails
          } : l.addressViewModel.isSelected && (n = {
            ...n,
            address: [
              l.addressViewModel.selectedMatch.address,
              l.addressViewModel.selectedMatch.context
            ].join(", ")
          });
          const r = {
            ...e,
            contact: n,
            activeExperimentVariations: l.experimentationViewModel.activeExperimentVariations
          };
          if (await Promise.all([
            Qa(this),
            Za(r)
          ]), (!l.estimateViewModel.hasResults || l.estimateViewModel.hasActiveJurisdiction) && mt("https://assets.calendly.com/assets/external/widget.js", {
            async: !0
          }), l.estimateViewModel.hasActiveJurisdiction && l.estimateViewModel.hasEstimate && await mt(
            "https://cdn.jsdelivr.net/npm/tsparticles-confetti@2.11.0/tsparticles.confetti.bundle.min.js",
            { async: !0 }
          ), this.isSubmitted = !0, l.flowState.value = l.flowStateMachine.transition(
            l.flowState.value,
            "SUCCESS"
          ), l.estimateViewModel.hasActiveJurisdiction && l.estimateViewModel.hasEstimate && confetti) {
            const a = e && e.lead && e.lead.type && e.lead.type === "webuyCAlots" ? ["ffffff", "#1c429c", "#f0bd1b"] : ["#ffffff", "#4cbd98", "#346af8"];
            setTimeout(() => {
              confetti("tsparticles", {
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
          M("Contact Submission Succeeded");
        } catch (n) {
          n && n.cause && (n.cause === "INVALID_EMAIL" || n.cause === "INVALID_PHONE") ? this.errorMessage = n.message : this.errorMessage = "There was an error processing your info. Please try again, or contact us for help.", l.flowState.value = l.flowStateMachine.transition(
            l.flowState.value,
            "ERROR"
          ), M("Contact Submission Failed", {
            error_str: this.errorMessage
          });
        }
      }
    }
  }), w.store("contactViewModel");
}
function Oa() {
  return w.store("estimateViewModel", {
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
    handleScheduleConsultationClick(e) {
      e.preventDefault(), e.stopPropagation(), l.flowState.value = l.flowStateMachine.transition(
        l.flowState.value,
        "SCHEDULE"
      ), M("Schedule Consultation Clicked");
    },
    handleRequestCommunityClick(e) {
      e.preventDefault(), e.stopPropagation(), l.flowState.value = l.flowStateMachine.transition(
        l.flowState.value,
        "REQUEST_COMMUNITY"
      ), M("Community Requested");
    }
  }), w.store("estimateViewModel");
}
function Fa() {
  return w.store("personalizationViewModel", {
    userGeo: {},
    marketsData: {},
    get market() {
      return Rn(this.userGeo.city, this.marketsData);
    },
    get bcPhoneNumber() {
      return Xa(this.userGeo.city, this.marketsData);
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
  }), w.store("personalizationViewModel");
}
function Da() {
  return w.store("experimentationViewModel", {
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
  }), w.store("experimentationViewModel");
}
function Ba() {
  return w.store("aduCalculatorViewModel", {
    homeValue: null,
    homeSize: null,
    aduCost: null,
    aduSize: null,
    result: null,
    init: function() {
      this.homeValue = this.formatInput("1000000"), this.homeSize = this.formatInput("2000"), this.aduCost = this.formatInput("250000"), this.aduSize = this.formatInput("800"), this.result = this.calculateResult();
    },
    handleInput: function(e) {
      e.target.value = this.formatInput(e.target.value), this.result = this.calculateResult();
    },
    handleSubmit: function(e) {
      e.preventDefault();
    },
    formatInput: function(e) {
      const t = "en-US";
      let n = e;
      return n = n.replace(/\D/g, ""), n = new Intl.NumberFormat(t, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(n), n = n !== "0" ? n : "", n;
    },
    calculateResult: function() {
      const e = this.convertFieldValueToNumber(this.homeValue), t = this.convertFieldValueToNumber(this.homeSize), n = this.convertFieldValueToNumber(this.aduCost), r = this.convertFieldValueToNumber(this.aduSize);
      if (!e || !t || !r)
        return "--";
      let a = e / t * r - n - 5e4;
      return a = a < 1e4 ? 1e4 : Math.ceil(a / 1e4) * 1e4, a = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(a), a;
    },
    convertFieldValueToNumber: function(e) {
      return Number(e.replace(/[^0-9.-]+/g, ""));
    }
  }), w.store("aduCalculatorViewModel");
}
function Na() {
  const e = {
    SUBMIT_ADDRESS: {
      target: "addressFormProcessing"
    }
  }, t = {
    SUBMIT_ADDRESS: {
      target: "modalAddressFormProcessing"
    }
  }, n = {
    SUBMIT_CONTACT: {
      target: "contactFormProcessing"
    }
  }, r = {
    EXIT: {
      target: "default"
    }
  };
  return w.store("flowStateMachine", {
    defaultState: "default",
    states: {
      default: {
        transitions: {
          ...e,
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
          ...e
        }
      },
      modalAddressForm: {
        transitions: {
          ...t,
          ...r
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
          ...r
        }
      },
      modalAddressFormError: {
        transitions: {
          ...t,
          ...r
        }
      },
      contactForm: {
        transitions: {
          ...n,
          ...r
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
          ...r
        }
      },
      contactFormError: {
        transitions: {
          ...n,
          ...r
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
          ...r
        }
      },
      scheduleConsultation: {
        transitions: {
          ...r
        }
      },
      requestedCommunity: {
        transitions: {
          ...r
        }
      }
    },
    // Method to trigger state transitions, given the current state, and a valid transition event
    // For a successful transition, returns the resulting state
    transition(a, i) {
      const s = this.states[a].transitions[i];
      return s ? s.target : (M("Invalid State Transition Triggered", {
        current_state_str: a,
        event_str: i
      }), a);
    }
  }), w.store("flowStateMachine");
}
function Ia() {
  return w.store("flowState", {
    value: "",
    init() {
      this.value = l.flowStateMachine.defaultState;
    }
  }), w.store("flowState");
}
function Ha() {
  return w.store("modalHelpers", {
    get isOpen() {
      return l.flowState.value == "modalAddressForm" || l.flowState.value == "modalAddressFormProcessing" || l.flowState.value == "modalAddressFormError" || l.flowState.value == "contactForm" || l.flowState.value == "contactFormProcessing" || l.flowState.value == "contactFormError" || l.flowState.value == "estimateResults" || l.flowState.value == "scheduleConsultation" || l.flowState.value == "requestedCommunity";
    },
    handleModalFlowStart(e = null) {
      l.flowState.value = l.flowStateMachine.transition(
        l.flowState.value,
        "START_MODAL_FLOW"
      );
      let t = {};
      e && (t = {
        cta_str: e
      }), M("Modal Get Offer Flow Opened", t);
    },
    handleModalClose() {
      let e = !0;
      l.flowState.value == "contactForm" && l.contactViewModel.hasAnyContactDetails && (e = confirm(
        "Are you sure you want to stop before you've seen how much your extra lot space could be worth?"
      )), l.flowState.value == "contactFormProcessing" && (e = !1), e && (l.flowState.value = l.flowStateMachine.transition(
        l.flowState.value,
        "EXIT"
      ), M("Get Offer Modal Closed"));
    }
  }), w.store("modalHelpers");
}
async function ja(e) {
  const t = "https://app.regrid.com/api/v1/typeahead.json", n = "1SnpL7AQekjA4mH2vqUmkGm9AAfQxi_6mxwdm4qDzo_C-xSTx9z3pd9rTsRWDWV4", r = new Request(`${t}/?token=${n}&query=${e}`, {
    method: "GET"
  }), a = await fetch(r);
  if (!a.ok)
    throw new Error("Network response was not OK");
  const i = await a.json();
  return Wa(i);
}
function Wa(e) {
  return e.filter((r) => r.ll_uuid && r.address && r.address.match(/^[0-9].*[^0-9]$/)).sort((r, a) => {
    const i = $a(r, a);
    return i != 0 ? i : za(r, a);
  }).slice(0, 10);
}
function $a(e, t) {
  return oe(e) && !oe(t) ? -1 : !oe(e) && oe(t) ? 1 : 0;
}
function oe(e) {
  return e.context.endsWith("CA");
}
function za(e, t) {
  return e.score > t.score ? -1 : e.score < t.score ? 1 : 0;
}
async function Ga(e) {
  const t = "https://app.regrid.com/api/v1/parcel/", n = "1SnpL7AQekjA4mH2vqUmkGm9AAfQxi_6mxwdm4qDzo_C-xSTx9z3pd9rTsRWDWV4", r = new Request(
    `${t}${e}.json?token=${n}&return_custom=false`,
    {
      method: "GET"
    }
  ), a = await fetch(r);
  if (!a.ok)
    throw new Error("Network response was not OK");
  const i = await a.json();
  return Ka(i);
}
function Ka(e) {
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
async function qa(e) {
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
function Ua(e) {
  const t = e.replace(/\D/g, ""), n = t.startsWith("1"), i = (n ? t.slice(1) : t).slice(0, 10).match(
    /^(\d{0,3})(\d{0,3})(\d{0,4})$/
  ), o = n ? "1" : "", s = i[1] ? (n ? " " : "") + ("(" + i[1]) : "", c = i[2] ? ") " + i[2] : "", u = i[3] ? "-" + i[3] : "";
  return o + s + c + u;
}
function Ja(e) {
  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(e);
}
function Ya(e) {
  return /^\+?1?\s?(\()?\d{3}(\))?[-.\s]?\d{3}[-.\s]?\d{4}$|^\d{10}$/.test(e);
}
async function Qa(e) {
  const t = [
    "Checking flood zones...",
    "Checking fire hazard zones...",
    "Checking zoning district...",
    "Checking lot shape & size..."
  ];
  return new Promise(async (n) => {
    for (const r of t)
      e.lotAnalysisStep = r, await new Promise((a) => setTimeout(a, 1500));
    n();
  });
}
async function Za(e) {
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
function Xa(e, t) {
  const n = "(415) 941-5861";
  if (!e || typeof e != "string")
    return n;
  const r = Rn(e, t);
  return ei(
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
function ei(e, t) {
  if (!e || typeof e != "string")
    return null;
  for (const n of Object.keys(t))
    if (n.toLowerCase().trim() === e.toLowerCase().trim())
      return t[n].bcPhoneNumber ?? null;
  return null;
}
function M(e, t = {}) {
  try {
    FS && FS.event(e, {
      ...ti(),
      eventProperties: t
    });
  } catch {
  }
}
function ti() {
  let e = {};
  if (l.addressViewModel.hasParcelDetails) {
    const t = {
      address_str: l.addressViewModel.parcelDetails.address,
      address_city_str: l.addressViewModel.parcelDetails.city,
      address_state_str: l.addressViewModel.parcelDetails.state,
      address_zip_str: l.addressViewModel.parcelDetails.zip,
      parcel_apn_str: l.addressViewModel.parcelDetails.apn,
      parcel_jurisdiction_str: l.addressViewModel.parcelDetails.jurisdiction
    };
    e = {
      ...e,
      ...t
    };
  } else if (l.addressViewModel.selectedMatch) {
    const t = {
      address_str: l.addressViewModel.selectedMatch.address,
      address_context_str: l.addressViewModel.selectedMatch.context,
      regrid_ll_uuid_str: l.addressViewModel.selectedMatch.ll_uuid
    };
    e = {
      ...e,
      ...t
    };
  }
  if (l.estimateViewModel.hasEstimateResults) {
    const t = {
      jurisdiction_status_str: l.estimateViewModel.jurisdiction.status,
      estimate_low_real: l.estimateViewModel.estimate.low,
      estimate_high_real: l.estimateViewModel.estimate.high
    };
    e = {
      ...e,
      ...t
    };
  }
  if (l.contactViewModel.hasAnyContactDetails) {
    const t = {
      contact_first_name_str: l.contactViewModel.firstName,
      contact_last_name_str: l.contactViewModel.lastName,
      contact_email_str: l.contactViewModel.email,
      contact_phone_str: l.contactViewModel.phone,
      contact_desired_timeline_str: l.contactViewModel.desiredTimeline
    };
    e = {
      ...e,
      ...t
    };
  }
  return e.active_experiment_variations_strs = l.experimentationViewModel.getFullStoryActiveExperimentVariationsEventPropertyValue(), e;
}
async function mt(e, t = {}) {
  return new Promise(function(n, r) {
    const a = document.createElement("script");
    a.src = e, t.defer ? a.defer = !0 : t.async && (a.async = !0), a.addEventListener("load", function() {
      n();
    }), a.addEventListener("error", function(i) {
      r(i);
    }), document.body.appendChild(a);
  });
}
