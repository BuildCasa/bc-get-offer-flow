var Bn = Object.defineProperty;
var Nn = (e, t, n) => t in e ? Bn(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var k = (e, t, n) => (Nn(e, typeof t != "symbol" ? t + "" : t, n), n), ft = (e, t, n) => {
  if (!t.has(e))
    throw TypeError("Cannot " + n);
};
var f = (e, t, n) => (ft(e, t, "read from private field"), n ? n.call(e) : t.get(e)), Ae = (e, t, n) => {
  if (t.has(e))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(e) : t.set(e, n);
}, Pe = (e, t, n, r) => (ft(e, t, "write to private field"), r ? r.call(e, n) : t.set(e, n), n);
var Te = !1, Oe = !1, O = [];
function In(e) {
  Hn(e);
}
function Hn(e) {
  O.includes(e) || O.push(e), jn();
}
function St(e) {
  let t = O.indexOf(e);
  t !== -1 && O.splice(t, 1);
}
function jn() {
  !Oe && !Te && (Te = !0, queueMicrotask(Wn));
}
function Wn() {
  Te = !1, Oe = !0;
  for (let e = 0; e < O.length; e++)
    O[e]();
  O.length = 0, Oe = !1;
}
var K, ee, he, Mt, Fe = !0;
function $n(e) {
  Fe = !1, e(), Fe = !0;
}
function Gn(e) {
  K = e.reactive, he = e.release, ee = (t) => e.effect(t, { scheduler: (n) => {
    Fe ? In(n) : n();
  } }), Mt = e.raw;
}
function ht(e) {
  ee = e;
}
function Kn(e) {
  let t = () => {
  };
  return [(r) => {
    let i = ee(r);
    return e._x_effects || (e._x_effects = /* @__PURE__ */ new Set(), e._x_runEffects = () => {
      e._x_effects.forEach((a) => a());
    }), e._x_effects.add(i), t = () => {
      i !== void 0 && (e._x_effects.delete(i), he(i));
    }, i;
  }, () => {
    t();
  }];
}
var xt = [], Ct = [], bt = [];
function zn(e) {
  bt.push(e);
}
function Et(e, t) {
  typeof t == "function" ? (e._x_cleanups || (e._x_cleanups = []), e._x_cleanups.push(t)) : (t = e, Ct.push(t));
}
function qn(e) {
  xt.push(e);
}
function Un(e, t, n) {
  e._x_attributeCleanups || (e._x_attributeCleanups = {}), e._x_attributeCleanups[t] || (e._x_attributeCleanups[t] = []), e._x_attributeCleanups[t].push(n);
}
function At(e, t) {
  e._x_attributeCleanups && Object.entries(e._x_attributeCleanups).forEach(([n, r]) => {
    (t === void 0 || t.includes(n)) && (r.forEach((i) => i()), delete e._x_attributeCleanups[n]);
  });
}
var Je = new MutationObserver(Ze), Ye = !1;
function Pt() {
  Je.observe(document, { subtree: !0, childList: !0, attributes: !0, attributeOldValue: !0 }), Ye = !0;
}
function Jn() {
  Yn(), Je.disconnect(), Ye = !1;
}
var Y = [], ke = !1;
function Yn() {
  Y = Y.concat(Je.takeRecords()), Y.length && !ke && (ke = !0, queueMicrotask(() => {
    Qn(), ke = !1;
  }));
}
function Qn() {
  Ze(Y), Y.length = 0;
}
function v(e) {
  if (!Ye)
    return e();
  Jn();
  let t = e();
  return Pt(), t;
}
var Qe = !1, ue = [];
function Zn() {
  Qe = !0;
}
function Xn() {
  Qe = !1, Ze(ue), ue = [];
}
function Ze(e) {
  if (Qe) {
    ue = ue.concat(e);
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
    At(s, a);
  }), r.forEach((a, s) => {
    xt.forEach((o) => o(s, a));
  });
  for (let a of n)
    if (!t.includes(a) && (Ct.forEach((s) => s(a)), a._x_cleanups))
      for (; a._x_cleanups.length; )
        a._x_cleanups.pop()();
  t.forEach((a) => {
    a._x_ignoreSelf = !0, a._x_ignore = !0;
  });
  for (let a of t)
    n.includes(a) || a.isConnected && (delete a._x_ignoreSelf, delete a._x_ignore, bt.forEach((s) => s(a)), a._x_ignore = !0, a._x_ignoreSelf = !0);
  t.forEach((a) => {
    delete a._x_ignoreSelf, delete a._x_ignore;
  }), t = null, n = null, r = null, i = null;
}
function kt(e) {
  return ne(W(e));
}
function te(e, t, n) {
  return e._x_dataStack = [t, ...W(n || e)], () => {
    e._x_dataStack = e._x_dataStack.filter((r) => r !== t);
  };
}
function pt(e, t) {
  let n = e._x_dataStack[0];
  Object.entries(t).forEach(([r, i]) => {
    n[r] = i;
  });
}
function W(e) {
  return e._x_dataStack ? e._x_dataStack : typeof ShadowRoot == "function" && e instanceof ShadowRoot ? W(e.host) : e.parentNode ? W(e.parentNode) : [];
}
function ne(e) {
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
function Vt(e) {
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
function Rt(e, t = () => {
}) {
  let n = {
    initialValue: void 0,
    _x_interceptor: !0,
    initialize(r, i, a) {
      return e(this.initialValue, () => er(r, i), (s) => De(r, i, s), i, a);
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
function er(e, t) {
  return t.split(".").reduce((n, r) => n[r], e);
}
function De(e, t, n) {
  if (typeof t == "string" && (t = t.split(".")), t.length === 1)
    e[t[0]] = n;
  else {
    if (t.length === 0)
      throw error;
    return e[t[0]] || (e[t[0]] = {}), De(e[t[0]], t.slice(1), n);
  }
}
var Lt = {};
function E(e, t) {
  Lt[e] = t;
}
function Be(e, t) {
  return Object.entries(Lt).forEach(([n, r]) => {
    Object.defineProperty(e, `$${n}`, {
      get() {
        let [i, a] = Nt(t);
        return i = { interceptor: Rt, ...i }, Et(t, a), r(t, i);
      },
      enumerable: !1
    });
  }), e;
}
function tr(e, t, n, ...r) {
  try {
    return n(...r);
  } catch (i) {
    X(i, e, t);
  }
}
function X(e, t, n = void 0) {
  Object.assign(e, { el: t, expression: n }), console.warn(`Alpine Expression Error: ${e.message}

${n ? 'Expression: "' + n + `"

` : ""}`, t), setTimeout(() => {
    throw e;
  }, 0);
}
var ce = !0;
function nr(e) {
  let t = ce;
  ce = !1, e(), ce = t;
}
function H(e, t, n = {}) {
  let r;
  return M(e, t)((i) => r = i, n), r;
}
function M(...e) {
  return Tt(...e);
}
var Tt = Ot;
function rr(e) {
  Tt = e;
}
function Ot(e, t) {
  let n = {};
  Be(n, e);
  let r = [n, ...W(e)];
  if (typeof t == "function")
    return ir(r, t);
  let i = sr(r, t, e);
  return tr.bind(null, e, t, i);
}
function ir(e, t) {
  return (n = () => {
  }, { scope: r = {}, params: i = [] } = {}) => {
    let a = t.apply(ne([r, ...e]), i);
    de(n, a);
  };
}
var Ve = {};
function ar(e, t) {
  if (Ve[e])
    return Ve[e];
  let n = Object.getPrototypeOf(async function() {
  }).constructor, r = /^[\n\s]*if.*\(.*\)/.test(e) || /^(let|const)\s/.test(e) ? `(() => { ${e} })()` : e, a = (() => {
    try {
      return new n(["__self", "scope"], `with (scope) { __self.result = ${r} }; __self.finished = true; return __self.result;`);
    } catch (s) {
      return X(s, t, e), Promise.resolve();
    }
  })();
  return Ve[e] = a, a;
}
function sr(e, t, n) {
  let r = ar(t, n);
  return (i = () => {
  }, { scope: a = {}, params: s = [] } = {}) => {
    r.result = void 0, r.finished = !1;
    let o = ne([a, ...e]);
    if (typeof r == "function") {
      let l = r(r, o).catch((c) => X(c, n, t));
      r.finished ? (de(i, r.result, o, s, n), r.result = void 0) : l.then((c) => {
        de(i, c, o, s, n);
      }).catch((c) => X(c, n, t)).finally(() => r.result = void 0);
    }
  };
}
function de(e, t, n, r, i) {
  if (ce && typeof t == "function") {
    let a = t.apply(n, r);
    a instanceof Promise ? a.then((s) => de(e, s, n, r)).catch((s) => X(s, i, t)) : e(a);
  } else
    e(t);
}
var Xe = "x-";
function z(e = "") {
  return Xe + e;
}
function or(e) {
  Xe = e;
}
var Ft = {};
function g(e, t) {
  Ft[e] = t;
}
function et(e, t, n) {
  if (t = Array.from(t), e._x_virtualDirectives) {
    let a = Object.entries(e._x_virtualDirectives).map(([o, l]) => ({ name: o, value: l })), s = Dt(a);
    a = a.map((o) => s.find((l) => l.name === o.name) ? {
      name: `x-bind:${o.name}`,
      value: `"${o.value}"`
    } : o), t = t.concat(a);
  }
  let r = {};
  return t.map(jt((a, s) => r[a] = s)).filter($t).map(ur(r, n)).sort(dr).map((a) => cr(e, a));
}
function Dt(e) {
  return Array.from(e).map(jt()).filter((t) => !$t(t));
}
var Ne = !1, J = /* @__PURE__ */ new Map(), Bt = Symbol();
function lr(e) {
  Ne = !0;
  let t = Symbol();
  Bt = t, J.set(t, []);
  let n = () => {
    for (; J.get(t).length; )
      J.get(t).shift()();
    J.delete(t);
  }, r = () => {
    Ne = !1, n();
  };
  e(n), r();
}
function Nt(e) {
  let t = [], n = (o) => t.push(o), [r, i] = Kn(e);
  return t.push(i), [{
    Alpine: re,
    effect: r,
    cleanup: n,
    evaluateLater: M.bind(M, e),
    evaluate: H.bind(H, e)
  }, () => t.forEach((o) => o())];
}
function cr(e, t) {
  let n = () => {
  }, r = Ft[t.type] || n, [i, a] = Nt(e);
  Un(e, t.original, a);
  let s = () => {
    e._x_ignore || e._x_ignoreSelf || (r.inline && r.inline(e, t, i), r = r.bind(r, e, t, i), Ne ? J.get(Bt).push(r) : r());
  };
  return s.runCleanups = a, s;
}
var It = (e, t) => ({ name: n, value: r }) => (n.startsWith(e) && (n = n.replace(e, t)), { name: n, value: r }), Ht = (e) => e;
function jt(e = () => {
}) {
  return ({ name: t, value: n }) => {
    let { name: r, value: i } = Wt.reduce((a, s) => s(a), { name: t, value: n });
    return r !== t && e(r, t), { name: r, value: i };
  };
}
var Wt = [];
function tt(e) {
  Wt.push(e);
}
function $t({ name: e }) {
  return Gt().test(e);
}
var Gt = () => new RegExp(`^${Xe}([^:^.]+)\\b`);
function ur(e, t) {
  return ({ name: n, value: r }) => {
    let i = n.match(Gt()), a = n.match(/:([a-zA-Z0-9\-:]+)/), s = n.match(/\.[^.\]]+(?=[^\]]*$)/g) || [], o = t || e[n] || n;
    return {
      type: i ? i[1] : null,
      value: a ? a[1] : null,
      modifiers: s.map((l) => l.replace(".", "")),
      expression: r,
      original: o
    };
  };
}
var Ie = "DEFAULT", se = [
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
  Ie,
  "teleport"
];
function dr(e, t) {
  let n = se.indexOf(e.type) === -1 ? Ie : e.type, r = se.indexOf(t.type) === -1 ? Ie : t.type;
  return se.indexOf(n) - se.indexOf(r);
}
function Q(e, t, n = {}) {
  e.dispatchEvent(new CustomEvent(t, {
    detail: n,
    bubbles: !0,
    composed: !0,
    cancelable: !0
  }));
}
var He = [], nt = !1;
function Kt(e = () => {
}) {
  return queueMicrotask(() => {
    nt || setTimeout(() => {
      je();
    });
  }), new Promise((t) => {
    He.push(() => {
      e(), t();
    });
  });
}
function je() {
  for (nt = !1; He.length; )
    He.shift()();
}
function fr() {
  nt = !0;
}
function B(e, t) {
  if (typeof ShadowRoot == "function" && e instanceof ShadowRoot) {
    Array.from(e.children).forEach((i) => B(i, t));
    return;
  }
  let n = !1;
  if (t(e, () => n = !0), n)
    return;
  let r = e.firstElementChild;
  for (; r; )
    B(r, t), r = r.nextElementSibling;
}
function $(e, ...t) {
  console.warn(`Alpine Warning: ${e}`, ...t);
}
function hr() {
  document.body || $("Unable to initialize. Trying to load Alpine before `<body>` is available. Did you forget to add `defer` in Alpine's `<script>` tag?"), Q(document, "alpine:init"), Q(document, "alpine:initializing"), Pt(), zn((t) => R(t, B)), Et((t) => mr(t)), qn((t, n) => {
    et(t, n).forEach((r) => r());
  });
  let e = (t) => !pe(t.parentElement, !0);
  Array.from(document.querySelectorAll(Ut())).filter(e).forEach((t) => {
    R(t);
  }), Q(document, "alpine:initialized");
}
var rt = [], zt = [];
function qt() {
  return rt.map((e) => e());
}
function Ut() {
  return rt.concat(zt).map((e) => e());
}
function Jt(e) {
  rt.push(e);
}
function Yt(e) {
  zt.push(e);
}
function pe(e, t = !1) {
  return me(e, (n) => {
    if ((t ? Ut() : qt()).some((i) => n.matches(i)))
      return !0;
  });
}
function me(e, t) {
  if (e) {
    if (t(e))
      return e;
    if (e._x_teleportBack && (e = e._x_teleportBack), !!e.parentElement)
      return me(e.parentElement, t);
  }
}
function pr(e) {
  return qt().some((t) => e.matches(t));
}
function R(e, t = B) {
  lr(() => {
    t(e, (n, r) => {
      et(n, n.attributes).forEach((i) => i()), n._x_ignore && r();
    });
  });
}
function mr(e) {
  B(e, (t) => At(t));
}
function it(e, t) {
  return Array.isArray(t) ? mt(e, t.join(" ")) : typeof t == "object" && t !== null ? _r(e, t) : typeof t == "function" ? it(e, t()) : mt(e, t);
}
function mt(e, t) {
  let n = (i) => i.split(" ").filter((a) => !e.classList.contains(a)).filter(Boolean), r = (i) => (e.classList.add(...i), () => {
    e.classList.remove(...i);
  });
  return t = t === !0 ? t = "" : t || "", r(n(t));
}
function _r(e, t) {
  let n = (o) => o.split(" ").filter(Boolean), r = Object.entries(t).flatMap(([o, l]) => l ? n(o) : !1).filter(Boolean), i = Object.entries(t).flatMap(([o, l]) => l ? !1 : n(o)).filter(Boolean), a = [], s = [];
  return i.forEach((o) => {
    e.classList.contains(o) && (e.classList.remove(o), s.push(o));
  }), r.forEach((o) => {
    e.classList.contains(o) || (e.classList.add(o), a.push(o));
  }), () => {
    s.forEach((o) => e.classList.add(o)), a.forEach((o) => e.classList.remove(o));
  };
}
function _e(e, t) {
  return typeof t == "object" && t !== null ? yr(e, t) : gr(e, t);
}
function yr(e, t) {
  let n = {};
  return Object.entries(t).forEach(([r, i]) => {
    n[r] = e.style[r], r.startsWith("--") || (r = wr(r)), e.style.setProperty(r, i);
  }), setTimeout(() => {
    e.style.length === 0 && e.removeAttribute("style");
  }), () => {
    _e(e, n);
  };
}
function gr(e, t) {
  let n = e.getAttribute("style", t);
  return e.setAttribute("style", t), () => {
    e.setAttribute("style", n || "");
  };
}
function wr(e) {
  return e.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}
function We(e, t = () => {
}) {
  let n = !1;
  return function() {
    n ? t.apply(this, arguments) : (n = !0, e.apply(this, arguments));
  };
}
g("transition", (e, { value: t, modifiers: n, expression: r }, { evaluate: i }) => {
  typeof r == "function" && (r = i(r)), r ? vr(e, r, t) : Sr(e, n, t);
});
function vr(e, t, n) {
  Qt(e, it, ""), {
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
function Sr(e, t, n) {
  Qt(e, _e);
  let r = !t.includes("in") && !t.includes("out") && !n, i = r || t.includes("in") || ["enter"].includes(n), a = r || t.includes("out") || ["leave"].includes(n);
  t.includes("in") && !r && (t = t.filter((m, w) => w < t.indexOf("out"))), t.includes("out") && !r && (t = t.filter((m, w) => w > t.indexOf("out")));
  let s = !t.includes("opacity") && !t.includes("scale"), o = s || t.includes("opacity"), l = s || t.includes("scale"), c = o ? 0 : 1, u = l ? q(t, "scale", 95) / 100 : 1, p = q(t, "delay", 0), y = q(t, "origin", "center"), P = "opacity, transform", N = q(t, "duration", 150) / 1e3, ie = q(t, "duration", 75) / 1e3, h = "cubic-bezier(0.4, 0.0, 0.2, 1)";
  i && (e._x_transition.enter.during = {
    transformOrigin: y,
    transitionDelay: p,
    transitionProperty: P,
    transitionDuration: `${N}s`,
    transitionTimingFunction: h
  }, e._x_transition.enter.start = {
    opacity: c,
    transform: `scale(${u})`
  }, e._x_transition.enter.end = {
    opacity: 1,
    transform: "scale(1)"
  }), a && (e._x_transition.leave.during = {
    transformOrigin: y,
    transitionDelay: p,
    transitionProperty: P,
    transitionDuration: `${ie}s`,
    transitionTimingFunction: h
  }, e._x_transition.leave.start = {
    opacity: 1,
    transform: "scale(1)"
  }, e._x_transition.leave.end = {
    opacity: c,
    transform: `scale(${u})`
  });
}
function Qt(e, t, n = {}) {
  e._x_transition || (e._x_transition = {
    enter: { during: n, start: n, end: n },
    leave: { during: n, start: n, end: n },
    in(r = () => {
    }, i = () => {
    }) {
      $e(e, t, {
        during: this.enter.during,
        start: this.enter.start,
        end: this.enter.end
      }, r, i);
    },
    out(r = () => {
    }, i = () => {
    }) {
      $e(e, t, {
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
    let s = Zt(e);
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
function Zt(e) {
  let t = e.parentNode;
  if (t)
    return t._x_hidePromise ? t : Zt(t);
}
function $e(e, t, { during: n, start: r, end: i } = {}, a = () => {
}, s = () => {
}) {
  if (e._x_transitioning && e._x_transitioning.cancel(), Object.keys(n).length === 0 && Object.keys(r).length === 0 && Object.keys(i).length === 0) {
    a(), s();
    return;
  }
  let o, l, c;
  Mr(e, {
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
function Mr(e, t) {
  let n, r, i, a = We(() => {
    v(() => {
      n = !0, r || t.before(), i || (t.end(), je()), t.after(), e.isConnected && t.cleanup(), delete e._x_transitioning;
    });
  });
  e._x_transitioning = {
    beforeCancels: [],
    beforeCancel(s) {
      this.beforeCancels.push(s);
    },
    cancel: We(function() {
      for (; this.beforeCancels.length; )
        this.beforeCancels.shift()();
      a();
    }),
    finish: a
  }, v(() => {
    t.start(), t.during();
  }), fr(), requestAnimationFrame(() => {
    if (n)
      return;
    let s = Number(getComputedStyle(e).transitionDuration.replace(/,.*/, "").replace("s", "")) * 1e3, o = Number(getComputedStyle(e).transitionDelay.replace(/,.*/, "").replace("s", "")) * 1e3;
    s === 0 && (s = Number(getComputedStyle(e).animationDuration.replace("s", "")) * 1e3), v(() => {
      t.before();
    }), r = !0, requestAnimationFrame(() => {
      n || (v(() => {
        t.end();
      }), je(), setTimeout(e._x_transitioning.finish, s + o), i = !0);
    });
  });
}
function q(e, t, n) {
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
var Ge = !1;
function ye(e, t = () => {
}) {
  return (...n) => Ge ? t(...n) : e(...n);
}
function xr(e, t) {
  t._x_dataStack || (t._x_dataStack = e._x_dataStack), Ge = !0, br(() => {
    Cr(t);
  }), Ge = !1;
}
function Cr(e) {
  let t = !1;
  R(e, (r, i) => {
    B(r, (a, s) => {
      if (t && pr(a))
        return s();
      t = !0, i(a, s);
    });
  });
}
function br(e) {
  let t = ee;
  ht((n, r) => {
    let i = t(n);
    return he(i), () => {
    };
  }), e(), ht(t);
}
function Xt(e, t, n, r = []) {
  switch (e._x_bindings || (e._x_bindings = K({})), e._x_bindings[t] = n, t = r.includes("camel") ? Lr(t) : t, t) {
    case "value":
      Er(e, n);
      break;
    case "style":
      Pr(e, n);
      break;
    case "class":
      Ar(e, n);
      break;
    default:
      kr(e, t, n);
      break;
  }
}
function Er(e, t) {
  if (e.type === "radio")
    e.attributes.value === void 0 && (e.value = t), window.fromModel && (e.checked = _t(e.value, t));
  else if (e.type === "checkbox")
    Number.isInteger(t) ? e.value = t : !Number.isInteger(t) && !Array.isArray(t) && typeof t != "boolean" && ![null, void 0].includes(t) ? e.value = String(t) : Array.isArray(t) ? e.checked = t.some((n) => _t(n, e.value)) : e.checked = !!t;
  else if (e.tagName === "SELECT")
    Rr(e, t);
  else {
    if (e.value === t)
      return;
    e.value = t;
  }
}
function Ar(e, t) {
  e._x_undoAddedClasses && e._x_undoAddedClasses(), e._x_undoAddedClasses = it(e, t);
}
function Pr(e, t) {
  e._x_undoAddedStyles && e._x_undoAddedStyles(), e._x_undoAddedStyles = _e(e, t);
}
function kr(e, t, n) {
  [null, void 0, !1].includes(n) && Tr(t) ? e.removeAttribute(t) : (en(t) && (n = t), Vr(e, t, n));
}
function Vr(e, t, n) {
  e.getAttribute(t) != n && e.setAttribute(t, n);
}
function Rr(e, t) {
  const n = [].concat(t).map((r) => r + "");
  Array.from(e.options).forEach((r) => {
    r.selected = n.includes(r.value);
  });
}
function Lr(e) {
  return e.toLowerCase().replace(/-(\w)/g, (t, n) => n.toUpperCase());
}
function _t(e, t) {
  return e == t;
}
function en(e) {
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
function Tr(e) {
  return !["aria-pressed", "aria-checked", "aria-expanded", "aria-selected"].includes(e);
}
function Or(e, t, n) {
  if (e._x_bindings && e._x_bindings[t] !== void 0)
    return e._x_bindings[t];
  let r = e.getAttribute(t);
  return r === null ? typeof n == "function" ? n() : n : r === "" ? !0 : en(t) ? !![t, "true"].includes(r) : r;
}
function tn(e, t) {
  var n;
  return function() {
    var r = this, i = arguments, a = function() {
      n = null, e.apply(r, i);
    };
    clearTimeout(n), n = setTimeout(a, t);
  };
}
function nn(e, t) {
  let n;
  return function() {
    let r = this, i = arguments;
    n || (e.apply(r, i), n = !0, setTimeout(() => n = !1, t));
  };
}
function Fr(e) {
  e(re);
}
var T = {}, yt = !1;
function Dr(e, t) {
  if (yt || (T = K(T), yt = !0), t === void 0)
    return T[e];
  T[e] = t, typeof t == "object" && t !== null && t.hasOwnProperty("init") && typeof t.init == "function" && T[e].init(), Vt(T[e]);
}
function Br() {
  return T;
}
var rn = {};
function Nr(e, t) {
  let n = typeof t != "function" ? () => t : t;
  e instanceof Element ? an(e, n()) : rn[e] = n;
}
function Ir(e) {
  return Object.entries(rn).forEach(([t, n]) => {
    Object.defineProperty(e, t, {
      get() {
        return (...r) => n(...r);
      }
    });
  }), e;
}
function an(e, t, n) {
  let r = [];
  for (; r.length; )
    r.pop()();
  let i = Object.entries(t).map(([s, o]) => ({ name: s, value: o })), a = Dt(i);
  i = i.map((s) => a.find((o) => o.name === s.name) ? {
    name: `x-bind:${s.name}`,
    value: `"${s.value}"`
  } : s), et(e, i, n).map((s) => {
    r.push(s.runCleanups), s();
  });
}
var sn = {};
function Hr(e, t) {
  sn[e] = t;
}
function jr(e, t) {
  return Object.entries(sn).forEach(([n, r]) => {
    Object.defineProperty(e, n, {
      get() {
        return (...i) => r.bind(t)(...i);
      },
      enumerable: !1
    });
  }), e;
}
var Wr = {
  get reactive() {
    return K;
  },
  get release() {
    return he;
  },
  get effect() {
    return ee;
  },
  get raw() {
    return Mt;
  },
  version: "3.10.5",
  flushAndStopDeferringMutations: Xn,
  dontAutoEvaluateFunctions: nr,
  disableEffectScheduling: $n,
  setReactivityEngine: Gn,
  closestDataStack: W,
  skipDuringClone: ye,
  addRootSelector: Jt,
  addInitSelector: Yt,
  addScopeToNode: te,
  deferMutations: Zn,
  mapAttributes: tt,
  evaluateLater: M,
  setEvaluator: rr,
  mergeProxies: ne,
  findClosest: me,
  closestRoot: pe,
  interceptor: Rt,
  transition: $e,
  setStyles: _e,
  mutateDom: v,
  directive: g,
  throttle: nn,
  debounce: tn,
  evaluate: H,
  initTree: R,
  nextTick: Kt,
  prefixed: z,
  prefix: or,
  plugin: Fr,
  magic: E,
  store: Dr,
  start: hr,
  clone: xr,
  bound: Or,
  $data: kt,
  data: Hr,
  bind: Nr
}, re = Wr;
function $r(e, t) {
  const n = /* @__PURE__ */ Object.create(null), r = e.split(",");
  for (let i = 0; i < r.length; i++)
    n[r[i]] = !0;
  return t ? (i) => !!n[i.toLowerCase()] : (i) => !!n[i];
}
var Gr = Object.freeze({}), on = Object.assign, Kr = Object.prototype.hasOwnProperty, ge = (e, t) => Kr.call(e, t), F = Array.isArray, Z = (e) => ln(e) === "[object Map]", zr = (e) => typeof e == "string", at = (e) => typeof e == "symbol", we = (e) => e !== null && typeof e == "object", qr = Object.prototype.toString, ln = (e) => qr.call(e), cn = (e) => ln(e).slice(8, -1), st = (e) => zr(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, Ur = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (n) => t[n] || (t[n] = e(n));
}, Jr = Ur((e) => e.charAt(0).toUpperCase() + e.slice(1)), un = (e, t) => e !== t && (e === e || t === t), Ke = /* @__PURE__ */ new WeakMap(), U = [], A, D = Symbol("iterate"), ze = Symbol("Map key iterate");
function Yr(e) {
  return e && e._isEffect === !0;
}
function Qr(e, t = Gr) {
  Yr(e) && (e = e.raw);
  const n = ei(e, t);
  return t.lazy || n(), n;
}
function Zr(e) {
  e.active && (dn(e), e.options.onStop && e.options.onStop(), e.active = !1);
}
var Xr = 0;
function ei(e, t) {
  const n = function() {
    if (!n.active)
      return e();
    if (!U.includes(n)) {
      dn(n);
      try {
        return ni(), U.push(n), A = n, e();
      } finally {
        U.pop(), fn(), A = U[U.length - 1];
      }
    }
  };
  return n.id = Xr++, n.allowRecurse = !!t.allowRecurse, n._isEffect = !0, n.active = !0, n.raw = e, n.deps = [], n.options = t, n;
}
function dn(e) {
  const { deps: t } = e;
  if (t.length) {
    for (let n = 0; n < t.length; n++)
      t[n].delete(e);
    t.length = 0;
  }
}
var G = !0, ot = [];
function ti() {
  ot.push(G), G = !1;
}
function ni() {
  ot.push(G), G = !0;
}
function fn() {
  const e = ot.pop();
  G = e === void 0 ? !0 : e;
}
function b(e, t, n) {
  if (!G || A === void 0)
    return;
  let r = Ke.get(e);
  r || Ke.set(e, r = /* @__PURE__ */ new Map());
  let i = r.get(n);
  i || r.set(n, i = /* @__PURE__ */ new Set()), i.has(A) || (i.add(A), A.deps.push(i), A.options.onTrack && A.options.onTrack({
    effect: A,
    target: e,
    type: t,
    key: n
  }));
}
function L(e, t, n, r, i, a) {
  const s = Ke.get(e);
  if (!s)
    return;
  const o = /* @__PURE__ */ new Set(), l = (u) => {
    u && u.forEach((p) => {
      (p !== A || p.allowRecurse) && o.add(p);
    });
  };
  if (t === "clear")
    s.forEach(l);
  else if (n === "length" && F(e))
    s.forEach((u, p) => {
      (p === "length" || p >= r) && l(u);
    });
  else
    switch (n !== void 0 && l(s.get(n)), t) {
      case "add":
        F(e) ? st(n) && l(s.get("length")) : (l(s.get(D)), Z(e) && l(s.get(ze)));
        break;
      case "delete":
        F(e) || (l(s.get(D)), Z(e) && l(s.get(ze)));
        break;
      case "set":
        Z(e) && l(s.get(D));
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
var ri = /* @__PURE__ */ $r("__proto__,__v_isRef,__isVue"), hn = new Set(Object.getOwnPropertyNames(Symbol).map((e) => Symbol[e]).filter(at)), ii = /* @__PURE__ */ ve(), ai = /* @__PURE__ */ ve(!1, !0), si = /* @__PURE__ */ ve(!0), oi = /* @__PURE__ */ ve(!0, !0), fe = {};
["includes", "indexOf", "lastIndexOf"].forEach((e) => {
  const t = Array.prototype[e];
  fe[e] = function(...n) {
    const r = _(this);
    for (let a = 0, s = this.length; a < s; a++)
      b(r, "get", a + "");
    const i = t.apply(r, n);
    return i === -1 || i === !1 ? t.apply(r, n.map(_)) : i;
  };
});
["push", "pop", "shift", "unshift", "splice"].forEach((e) => {
  const t = Array.prototype[e];
  fe[e] = function(...n) {
    ti();
    const r = t.apply(this, n);
    return fn(), r;
  };
});
function ve(e = !1, t = !1) {
  return function(r, i, a) {
    if (i === "__v_isReactive")
      return !e;
    if (i === "__v_isReadonly")
      return e;
    if (i === "__v_raw" && a === (e ? t ? yi : Pn : t ? _i : An).get(r))
      return r;
    const s = F(r);
    if (!e && s && ge(fe, i))
      return Reflect.get(fe, i, a);
    const o = Reflect.get(r, i, a);
    return (at(i) ? hn.has(i) : ri(i)) || (e || b(r, "get", i), t) ? o : qe(o) ? !s || !st(i) ? o.value : o : we(o) ? e ? kn(o) : dt(o) : o;
  };
}
var li = /* @__PURE__ */ pn(), ci = /* @__PURE__ */ pn(!0);
function pn(e = !1) {
  return function(n, r, i, a) {
    let s = n[r];
    if (!e && (i = _(i), s = _(s), !F(n) && qe(s) && !qe(i)))
      return s.value = i, !0;
    const o = F(n) && st(r) ? Number(r) < n.length : ge(n, r), l = Reflect.set(n, r, i, a);
    return n === _(a) && (o ? un(i, s) && L(n, "set", r, i, s) : L(n, "add", r, i)), l;
  };
}
function ui(e, t) {
  const n = ge(e, t), r = e[t], i = Reflect.deleteProperty(e, t);
  return i && n && L(e, "delete", t, void 0, r), i;
}
function di(e, t) {
  const n = Reflect.has(e, t);
  return (!at(t) || !hn.has(t)) && b(e, "has", t), n;
}
function fi(e) {
  return b(e, "iterate", F(e) ? "length" : D), Reflect.ownKeys(e);
}
var mn = {
  get: ii,
  set: li,
  deleteProperty: ui,
  has: di,
  ownKeys: fi
}, _n = {
  get: si,
  set(e, t) {
    return console.warn(`Set operation on key "${String(t)}" failed: target is readonly.`, e), !0;
  },
  deleteProperty(e, t) {
    return console.warn(`Delete operation on key "${String(t)}" failed: target is readonly.`, e), !0;
  }
};
on({}, mn, {
  get: ai,
  set: ci
});
on({}, _n, {
  get: oi
});
var lt = (e) => we(e) ? dt(e) : e, ct = (e) => we(e) ? kn(e) : e, ut = (e) => e, Se = (e) => Reflect.getPrototypeOf(e);
function Me(e, t, n = !1, r = !1) {
  e = e.__v_raw;
  const i = _(e), a = _(t);
  t !== a && !n && b(i, "get", t), !n && b(i, "get", a);
  const { has: s } = Se(i), o = r ? ut : n ? ct : lt;
  if (s.call(i, t))
    return o(e.get(t));
  if (s.call(i, a))
    return o(e.get(a));
  e !== i && e.get(t);
}
function xe(e, t = !1) {
  const n = this.__v_raw, r = _(n), i = _(e);
  return e !== i && !t && b(r, "has", e), !t && b(r, "has", i), e === i ? n.has(e) : n.has(e) || n.has(i);
}
function Ce(e, t = !1) {
  return e = e.__v_raw, !t && b(_(e), "iterate", D), Reflect.get(e, "size", e);
}
function yn(e) {
  e = _(e);
  const t = _(this);
  return Se(t).has.call(t, e) || (t.add(e), L(t, "add", e, e)), this;
}
function gn(e, t) {
  t = _(t);
  const n = _(this), { has: r, get: i } = Se(n);
  let a = r.call(n, e);
  a ? En(n, r, e) : (e = _(e), a = r.call(n, e));
  const s = i.call(n, e);
  return n.set(e, t), a ? un(t, s) && L(n, "set", e, t, s) : L(n, "add", e, t), this;
}
function wn(e) {
  const t = _(this), { has: n, get: r } = Se(t);
  let i = n.call(t, e);
  i ? En(t, n, e) : (e = _(e), i = n.call(t, e));
  const a = r ? r.call(t, e) : void 0, s = t.delete(e);
  return i && L(t, "delete", e, void 0, a), s;
}
function vn() {
  const e = _(this), t = e.size !== 0, n = Z(e) ? new Map(e) : new Set(e), r = e.clear();
  return t && L(e, "clear", void 0, void 0, n), r;
}
function be(e, t) {
  return function(r, i) {
    const a = this, s = a.__v_raw, o = _(s), l = t ? ut : e ? ct : lt;
    return !e && b(o, "iterate", D), s.forEach((c, u) => r.call(i, l(c), l(u), a));
  };
}
function oe(e, t, n) {
  return function(...r) {
    const i = this.__v_raw, a = _(i), s = Z(a), o = e === "entries" || e === Symbol.iterator && s, l = e === "keys" && s, c = i[e](...r), u = n ? ut : t ? ct : lt;
    return !t && b(a, "iterate", l ? ze : D), {
      next() {
        const { value: p, done: y } = c.next();
        return y ? { value: p, done: y } : {
          value: o ? [u(p[0]), u(p[1])] : u(p),
          done: y
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
      console.warn(`${Jr(e)} operation ${n}failed: target is readonly.`, _(this));
    }
    return e === "delete" ? !1 : this;
  };
}
var Sn = {
  get(e) {
    return Me(this, e);
  },
  get size() {
    return Ce(this);
  },
  has: xe,
  add: yn,
  set: gn,
  delete: wn,
  clear: vn,
  forEach: be(!1, !1)
}, Mn = {
  get(e) {
    return Me(this, e, !1, !0);
  },
  get size() {
    return Ce(this);
  },
  has: xe,
  add: yn,
  set: gn,
  delete: wn,
  clear: vn,
  forEach: be(!1, !0)
}, xn = {
  get(e) {
    return Me(this, e, !0);
  },
  get size() {
    return Ce(this, !0);
  },
  has(e) {
    return xe.call(this, e, !0);
  },
  add: V("add"),
  set: V("set"),
  delete: V("delete"),
  clear: V("clear"),
  forEach: be(!0, !1)
}, Cn = {
  get(e) {
    return Me(this, e, !0, !0);
  },
  get size() {
    return Ce(this, !0);
  },
  has(e) {
    return xe.call(this, e, !0);
  },
  add: V("add"),
  set: V("set"),
  delete: V("delete"),
  clear: V("clear"),
  forEach: be(!0, !0)
}, hi = ["keys", "values", "entries", Symbol.iterator];
hi.forEach((e) => {
  Sn[e] = oe(e, !1, !1), xn[e] = oe(e, !0, !1), Mn[e] = oe(e, !1, !0), Cn[e] = oe(e, !0, !0);
});
function bn(e, t) {
  const n = t ? e ? Cn : Mn : e ? xn : Sn;
  return (r, i, a) => i === "__v_isReactive" ? !e : i === "__v_isReadonly" ? e : i === "__v_raw" ? r : Reflect.get(ge(n, i) && i in r ? n : r, i, a);
}
var pi = {
  get: bn(!1, !1)
}, mi = {
  get: bn(!0, !1)
};
function En(e, t, n) {
  const r = _(n);
  if (r !== n && t.call(e, r)) {
    const i = cn(e);
    console.warn(`Reactive ${i} contains both the raw and reactive versions of the same object${i === "Map" ? " as keys" : ""}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`);
  }
}
var An = /* @__PURE__ */ new WeakMap(), _i = /* @__PURE__ */ new WeakMap(), Pn = /* @__PURE__ */ new WeakMap(), yi = /* @__PURE__ */ new WeakMap();
function gi(e) {
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
function wi(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : gi(cn(e));
}
function dt(e) {
  return e && e.__v_isReadonly ? e : Vn(e, !1, mn, pi, An);
}
function kn(e) {
  return Vn(e, !0, _n, mi, Pn);
}
function Vn(e, t, n, r, i) {
  if (!we(e))
    return console.warn(`value cannot be made reactive: ${String(e)}`), e;
  if (e.__v_raw && !(t && e.__v_isReactive))
    return e;
  const a = i.get(e);
  if (a)
    return a;
  const s = wi(e);
  if (s === 0)
    return e;
  const o = new Proxy(e, s === 2 ? r : n);
  return i.set(e, o), o;
}
function _(e) {
  return e && _(e.__v_raw) || e;
}
function qe(e) {
  return !!(e && e.__v_isRef === !0);
}
E("nextTick", () => Kt);
E("dispatch", (e) => Q.bind(Q, e));
E("watch", (e, { evaluateLater: t, effect: n }) => (r, i) => {
  let a = t(r), s = !0, o, l = n(() => a((c) => {
    JSON.stringify(c), s ? o = c : queueMicrotask(() => {
      i(c, o), o = c;
    }), s = !1;
  }));
  e._x_effects.delete(l);
});
E("store", Br);
E("data", (e) => kt(e));
E("root", (e) => pe(e));
E("refs", (e) => (e._x_refs_proxy || (e._x_refs_proxy = ne(vi(e))), e._x_refs_proxy));
function vi(e) {
  let t = [], n = e;
  for (; n; )
    n._x_refs && t.push(n._x_refs), n = n.parentNode;
  return t;
}
var Re = {};
function Rn(e) {
  return Re[e] || (Re[e] = 0), ++Re[e];
}
function Si(e, t) {
  return me(e, (n) => {
    if (n._x_ids && n._x_ids[t])
      return !0;
  });
}
function Mi(e, t) {
  e._x_ids || (e._x_ids = {}), e._x_ids[t] || (e._x_ids[t] = Rn(t));
}
E("id", (e) => (t, n = null) => {
  let r = Si(e, t), i = r ? r._x_ids[t] : Rn(t);
  return n ? `${t}-${i}-${n}` : `${t}-${i}`;
});
E("el", (e) => e);
Ln("Focus", "focus", "focus");
Ln("Persist", "persist", "persist");
function Ln(e, t, n) {
  E(t, (r) => $(`You can't use [$${directiveName}] without first installing the "${e}" plugin here: https://alpinejs.dev/plugins/${n}`, r));
}
g("modelable", (e, { expression: t }, { effect: n, evaluateLater: r }) => {
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
g("teleport", (e, { expression: t }, { cleanup: n }) => {
  e.tagName.toLowerCase() !== "template" && $("x-teleport can only be used on a <template> tag", e);
  let r = document.querySelector(t);
  r || $(`Cannot find x-teleport element for selector: "${t}"`);
  let i = e.content.cloneNode(!0).firstElementChild;
  e._x_teleport = i, i._x_teleportBack = e, e._x_forwardEvents && e._x_forwardEvents.forEach((a) => {
    i.addEventListener(a, (s) => {
      s.stopPropagation(), e.dispatchEvent(new s.constructor(s.type, s));
    });
  }), te(i, {}, e), v(() => {
    r.appendChild(i), R(i), i._x_ignore = !0;
  }), n(() => i.remove());
});
var Tn = () => {
};
Tn.inline = (e, { modifiers: t }, { cleanup: n }) => {
  t.includes("self") ? e._x_ignoreSelf = !0 : e._x_ignore = !0, n(() => {
    t.includes("self") ? delete e._x_ignoreSelf : delete e._x_ignore;
  });
};
g("ignore", Tn);
g("effect", (e, { expression: t }, { effect: n }) => n(M(e, t)));
function On(e, t, n, r) {
  let i = e, a = (l) => r(l), s = {}, o = (l, c) => (u) => c(l, u);
  if (n.includes("dot") && (t = xi(t)), n.includes("camel") && (t = Ci(t)), n.includes("passive") && (s.passive = !0), n.includes("capture") && (s.capture = !0), n.includes("window") && (i = window), n.includes("document") && (i = document), n.includes("prevent") && (a = o(a, (l, c) => {
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
    Ei(t) && Ai(c, n) || l(c);
  }), n.includes("debounce")) {
    let l = n[n.indexOf("debounce") + 1] || "invalid-wait", c = Ue(l.split("ms")[0]) ? Number(l.split("ms")[0]) : 250;
    a = tn(a, c);
  }
  if (n.includes("throttle")) {
    let l = n[n.indexOf("throttle") + 1] || "invalid-wait", c = Ue(l.split("ms")[0]) ? Number(l.split("ms")[0]) : 250;
    a = nn(a, c);
  }
  return i.addEventListener(t, a, s), () => {
    i.removeEventListener(t, a, s);
  };
}
function xi(e) {
  return e.replace(/-/g, ".");
}
function Ci(e) {
  return e.toLowerCase().replace(/-(\w)/g, (t, n) => n.toUpperCase());
}
function Ue(e) {
  return !Array.isArray(e) && !isNaN(e);
}
function bi(e) {
  return e.replace(/([a-z])([A-Z])/g, "$1-$2").replace(/[_\s]/, "-").toLowerCase();
}
function Ei(e) {
  return ["keydown", "keyup"].includes(e);
}
function Ai(e, t) {
  let n = t.filter((a) => !["window", "document", "prevent", "stop", "once"].includes(a));
  if (n.includes("debounce")) {
    let a = n.indexOf("debounce");
    n.splice(a, Ue((n[a + 1] || "invalid-wait").split("ms")[0]) ? 2 : 1);
  }
  if (n.length === 0 || n.length === 1 && gt(e.key).includes(n[0]))
    return !1;
  const i = ["ctrl", "shift", "alt", "meta", "cmd", "super"].filter((a) => n.includes(a));
  return n = n.filter((a) => !i.includes(a)), !(i.length > 0 && i.filter((s) => ((s === "cmd" || s === "super") && (s = "meta"), e[`${s}Key`])).length === i.length && gt(e.key).includes(n[0]));
}
function gt(e) {
  if (!e)
    return [];
  e = bi(e);
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
g("model", (e, { modifiers: t, expression: n }, { effect: r, cleanup: i }) => {
  let a = M(e, n), s = `${n} = rightSideOfExpression($event, ${n})`, o = M(e, s);
  var l = e.tagName.toLowerCase() === "select" || ["checkbox", "radio"].includes(e.type) || t.includes("lazy") ? "change" : "input";
  let c = Pi(e, t, n), u = On(e, l, t, (y) => {
    o(() => {
    }, { scope: {
      $event: y,
      rightSideOfExpression: c
    } });
  });
  e._x_removeModelListeners || (e._x_removeModelListeners = {}), e._x_removeModelListeners.default = u, i(() => e._x_removeModelListeners.default());
  let p = M(e, `${n} = __placeholder`);
  e._x_model = {
    get() {
      let y;
      return a((P) => y = P), y;
    },
    set(y) {
      p(() => {
      }, { scope: { __placeholder: y } });
    }
  }, e._x_forceModelUpdate = () => {
    a((y) => {
      y === void 0 && n.match(/\./) && (y = ""), window.fromModel = !0, v(() => Xt(e, "value", y)), delete window.fromModel;
    });
  }, r(() => {
    t.includes("unintrusive") && document.activeElement.isSameNode(e) || e._x_forceModelUpdate();
  });
});
function Pi(e, t, n) {
  return e.type === "radio" && v(() => {
    e.hasAttribute("name") || e.setAttribute("name", n);
  }), (r, i) => v(() => {
    if (r instanceof CustomEvent && r.detail !== void 0)
      return r.detail || r.target.value;
    if (e.type === "checkbox")
      if (Array.isArray(i)) {
        let a = t.includes("number") ? Le(r.target.value) : r.target.value;
        return r.target.checked ? i.concat([a]) : i.filter((s) => !ki(s, a));
      } else
        return r.target.checked;
    else {
      if (e.tagName.toLowerCase() === "select" && e.multiple)
        return t.includes("number") ? Array.from(r.target.selectedOptions).map((a) => {
          let s = a.value || a.text;
          return Le(s);
        }) : Array.from(r.target.selectedOptions).map((a) => a.value || a.text);
      {
        let a = r.target.value;
        return t.includes("number") ? Le(a) : t.includes("trim") ? a.trim() : a;
      }
    }
  });
}
function Le(e) {
  let t = e ? parseFloat(e) : null;
  return Vi(t) ? t : e;
}
function ki(e, t) {
  return e == t;
}
function Vi(e) {
  return !Array.isArray(e) && !isNaN(e);
}
g("cloak", (e) => queueMicrotask(() => v(() => e.removeAttribute(z("cloak")))));
Yt(() => `[${z("init")}]`);
g("init", ye((e, { expression: t }, { evaluate: n }) => typeof t == "string" ? !!t.trim() && n(t, {}, !1) : n(t, {}, !1)));
g("text", (e, { expression: t }, { effect: n, evaluateLater: r }) => {
  let i = r(t);
  n(() => {
    i((a) => {
      v(() => {
        e.textContent = a;
      });
    });
  });
});
g("html", (e, { expression: t }, { effect: n, evaluateLater: r }) => {
  let i = r(t);
  n(() => {
    i((a) => {
      v(() => {
        e.innerHTML = a, e._x_ignoreSelf = !0, R(e), delete e._x_ignoreSelf;
      });
    });
  });
});
tt(It(":", Ht(z("bind:"))));
g("bind", (e, { value: t, modifiers: n, expression: r, original: i }, { effect: a }) => {
  if (!t) {
    let o = {};
    Ir(o), M(e, r)((c) => {
      an(e, c, i);
    }, { scope: o });
    return;
  }
  if (t === "key")
    return Ri(e, r);
  let s = M(e, r);
  a(() => s((o) => {
    o === void 0 && typeof r == "string" && r.match(/\./) && (o = ""), v(() => Xt(e, t, o, n));
  }));
});
function Ri(e, t) {
  e._x_keyExpression = t;
}
Jt(() => `[${z("data")}]`);
g("data", ye((e, { expression: t }, { cleanup: n }) => {
  t = t === "" ? "{}" : t;
  let r = {};
  Be(r, e);
  let i = {};
  jr(i, r);
  let a = H(e, t, { scope: i });
  a === void 0 && (a = {}), Be(a, e);
  let s = K(a);
  Vt(s);
  let o = te(e, s);
  s.init && H(e, s.init), n(() => {
    s.destroy && H(e, s.destroy), o();
  });
}));
g("show", (e, { modifiers: t, expression: n }, { effect: r }) => {
  let i = M(e, n);
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
  }, o = () => setTimeout(s), l = We((p) => p ? s() : a(), (p) => {
    typeof e._x_toggleAndCascadeWithTransitions == "function" ? e._x_toggleAndCascadeWithTransitions(e, p, s, a) : p ? o() : a();
  }), c, u = !0;
  r(() => i((p) => {
    !u && p === c || (t.includes("immediate") && (p ? o() : a()), l(p), c = p, u = !1);
  }));
});
g("for", (e, { expression: t }, { effect: n, cleanup: r }) => {
  let i = Ti(t), a = M(e, i.items), s = M(e, e._x_keyExpression || "index");
  e._x_prevKeys = [], e._x_lookup = {}, n(() => Li(e, i, a, s)), r(() => {
    Object.values(e._x_lookup).forEach((o) => o.remove()), delete e._x_prevKeys, delete e._x_lookup;
  });
});
function Li(e, t, n, r) {
  let i = (s) => typeof s == "object" && !Array.isArray(s), a = e;
  n((s) => {
    Oi(s) && s >= 0 && (s = Array.from(Array(s).keys(), (h) => h + 1)), s === void 0 && (s = []);
    let o = e._x_lookup, l = e._x_prevKeys, c = [], u = [];
    if (i(s))
      s = Object.entries(s).map(([h, m]) => {
        let w = wt(t, m, h, s);
        r((S) => u.push(S), { scope: { index: h, ...w } }), c.push(w);
      });
    else
      for (let h = 0; h < s.length; h++) {
        let m = wt(t, s[h], h, s);
        r((w) => u.push(w), { scope: { index: h, ...m } }), c.push(m);
      }
    let p = [], y = [], P = [], N = [];
    for (let h = 0; h < l.length; h++) {
      let m = l[h];
      u.indexOf(m) === -1 && P.push(m);
    }
    l = l.filter((h) => !P.includes(h));
    let ie = "template";
    for (let h = 0; h < u.length; h++) {
      let m = u[h], w = l.indexOf(m);
      if (w === -1)
        l.splice(h, 0, m), p.push([ie, h]);
      else if (w !== h) {
        let S = l.splice(h, 1)[0], C = l.splice(w - 1, 1)[0];
        l.splice(h, 0, C), l.splice(w, 0, S), y.push([S, C]);
      } else
        N.push(m);
      ie = m;
    }
    for (let h = 0; h < P.length; h++) {
      let m = P[h];
      o[m]._x_effects && o[m]._x_effects.forEach(St), o[m].remove(), o[m] = null, delete o[m];
    }
    for (let h = 0; h < y.length; h++) {
      let [m, w] = y[h], S = o[m], C = o[w], I = document.createElement("div");
      v(() => {
        C.after(I), S.after(C), C._x_currentIfEl && C.after(C._x_currentIfEl), I.before(S), S._x_currentIfEl && S.after(S._x_currentIfEl), I.remove();
      }), pt(C, c[u.indexOf(w)]);
    }
    for (let h = 0; h < p.length; h++) {
      let [m, w] = p[h], S = m === "template" ? a : o[m];
      S._x_currentIfEl && (S = S._x_currentIfEl);
      let C = c[w], I = u[w], ae = document.importNode(a.content, !0).firstElementChild;
      te(ae, K(C), a), v(() => {
        S.after(ae), R(ae);
      }), typeof I == "object" && $("x-for key cannot be an object, it must be a string or an integer", a), o[I] = ae;
    }
    for (let h = 0; h < N.length; h++)
      pt(o[N[h]], c[u.indexOf(N[h])]);
    a._x_prevKeys = u;
  });
}
function Ti(e) {
  let t = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/, n = /^\s*\(|\)\s*$/g, r = /([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/, i = e.match(r);
  if (!i)
    return;
  let a = {};
  a.items = i[2].trim();
  let s = i[1].replace(n, "").trim(), o = s.match(t);
  return o ? (a.item = s.replace(t, "").trim(), a.index = o[1].trim(), o[2] && (a.collection = o[2].trim())) : a.item = s, a;
}
function wt(e, t, n, r) {
  let i = {};
  return /^\[.*\]$/.test(e.item) && Array.isArray(t) ? e.item.replace("[", "").replace("]", "").split(",").map((s) => s.trim()).forEach((s, o) => {
    i[s] = t[o];
  }) : /^\{.*\}$/.test(e.item) && !Array.isArray(t) && typeof t == "object" ? e.item.replace("{", "").replace("}", "").split(",").map((s) => s.trim()).forEach((s) => {
    i[s] = t[s];
  }) : i[e.item] = t, e.index && (i[e.index] = n), e.collection && (i[e.collection] = r), i;
}
function Oi(e) {
  return !Array.isArray(e) && !isNaN(e);
}
function Fn() {
}
Fn.inline = (e, { expression: t }, { cleanup: n }) => {
  let r = pe(e);
  r._x_refs || (r._x_refs = {}), r._x_refs[t] = e, n(() => delete r._x_refs[t]);
};
g("ref", Fn);
g("if", (e, { expression: t }, { effect: n, cleanup: r }) => {
  let i = M(e, t), a = () => {
    if (e._x_currentIfEl)
      return e._x_currentIfEl;
    let o = e.content.cloneNode(!0).firstElementChild;
    return te(o, {}, e), v(() => {
      e.after(o), R(o);
    }), e._x_currentIfEl = o, e._x_undoIf = () => {
      B(o, (l) => {
        l._x_effects && l._x_effects.forEach(St);
      }), o.remove(), delete e._x_currentIfEl;
    }, o;
  }, s = () => {
    e._x_undoIf && (e._x_undoIf(), delete e._x_undoIf);
  };
  n(() => i((o) => {
    o ? a() : s();
  })), r(() => e._x_undoIf && e._x_undoIf());
});
g("id", (e, { expression: t }, { evaluate: n }) => {
  n(t).forEach((i) => Mi(e, i));
});
tt(It("@", Ht(z("on:"))));
g("on", ye((e, { value: t, modifiers: n, expression: r }, { cleanup: i }) => {
  let a = r ? M(e, r) : () => {
  };
  e.tagName.toLowerCase() === "template" && (e._x_forwardEvents || (e._x_forwardEvents = []), e._x_forwardEvents.includes(t) || e._x_forwardEvents.push(t));
  let s = On(e, t, n, (o) => {
    a(() => {
    }, { scope: { $event: o }, params: [o] });
  });
  i(() => s());
}));
Ee("Collapse", "collapse", "collapse");
Ee("Intersect", "intersect", "intersect");
Ee("Focus", "trap", "focus");
Ee("Mask", "mask", "mask");
function Ee(e, t, n) {
  g(t, (r) => $(`You can't use [x-${t}] without first installing the "${e}" plugin here: https://alpinejs.dev/plugins/${n}`, r));
}
re.setEvaluator(Ot);
re.setReactivityEngine({ reactive: dt, effect: Qr, release: Zr, raw: _ });
var Fi = re, ea = Fi, j;
class Di {
  /**
   * Create an AlpineStoreFactory instance.
   * @param {import("alpinejs").Alpine} Alpine - Current Alpine.js instance.
   */
  constructor(t) {
    Ae(this, j, void 0);
    Pe(this, j, t);
  }
  /**
   * Create, register, and return a reference to a global Alpine.Store.
   * @param {string} key - Descriptive key for the Alpine.Store registry.
   * @param {object} data - Initial data for the store.
   * @returns {unknown} Reference to the registered store.
   */
  createStore(t, n) {
    return f(this, j).store(t, n), f(this, j).store(t);
  }
}
j = new WeakMap();
function ta(e) {
  return new Di(e);
}
function x(e, t, n = {}) {
  try {
    window.FS && window.FS.event(e, {
      ...Bi(t),
      ...n
    });
  } catch {
  }
}
function Bi(e) {
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
var d;
class Ni {
  /**
   * Create an AddressViewModel instance.
   * @param {unknown} globalStore - Reference to the global store.
   */
  constructor(t) {
    Ae(this, d, void 0);
    k(this, "inputValue", "");
    k(this, "matches", []);
    k(this, "keyboardNavIndex", -1);
    k(this, "selectedMatch", {});
    k(this, "parcelDetails", {});
    k(this, "submitButtonText", {
      normal: "",
      processing: ""
    });
    k(this, "errorMessage", "");
    Pe(this, d, t);
    const n = document.getElementById(
      "address-form-submit-button"
    );
    this.submitButtonText = {
      normal: n.value,
      processing: n.dataset.wait
    };
  }
  /**
   * Whether or not an address match has been selected with the typeahead.
   * @type {boolean}
   */
  get isSelected() {
    return Object.keys(this.selectedMatch).length != 0 && !!this.selectedMatch.ll_uuid;
  }
  /**
   * Whether or not the parcel details (jurisdiction and apn) have been set for the address.
   * @type {boolean}
   */
  get hasParcelDetails() {
    return Object.keys(this.parcelDetails).length != 0 && !!this.parcelDetails.jurisdiction && !!this.parcelDetails.apn;
  }
  /**
   * Handles input events from the address typeahead input field.
   * Fetches and updates address matches based on the current input value.
   * @returns {Promise.<void>} Promise that resolves when input handling is complete.
   */
  async handleInput() {
    this.isSelected && (this.selectedMatch = {}), this.hasParcelDetails && (this.parcelDetails = {}), f(this, d).estimateViewModel.hasResults && f(this, d).estimateViewModel.init(), f(this, d).contactViewModel.isSubmitted && (f(this, d).contactViewModel.isSubmitted = !1), f(this, d).experimentationViewModel.getActiveExperimentVariation(
      "windfall-estimate-or-eligibility-2023-07"
    ) && f(this, d).experimentationViewModel.clearActiveExperiment(
      "windfall-estimate-or-eligibility-2023-07"
    );
    try {
      this.matches = await Ii(this.inputValue);
    } catch {
      this.errorMessage = "There was an error finding your address. Please try again, or contact us for help.", f(this, d).flowState.value = f(this, d).flowStateMachine.transition(
        f(this, d).flowState.value,
        "ERROR"
      );
    }
  }
  /**
   * Handles keyboard events for the address typeahead input field.
   * Navigates up or down the list of matches if ArrowUp or ArrowDown are pressed.
   * Selects the address at the current keyboardNavIndex if Enter is pressed.
   * @param {KeyboardEvent} event - Keyboard event object.
   * @returns {void}
   */
  handleKeydown(t) {
    t.key != "Enter" && t.key != "ArrowUp" && t.key != "ArrowDown" || this.isSelected || this.matches.length === 0 || (t.preventDefault(), t.stopPropagation(), t.key === "Enter" && this.keyboardNavIndex != -1 ? this.handleMatchSelection(this.matches[this.keyboardNavIndex]) : t.key === "ArrowUp" ? this.keyboardNavIndex = this.keyboardNavIndex <= -1 ? this.matches.length - 1 : this.keyboardNavIndex - 1 : t.key === "ArrowDown" && (this.keyboardNavIndex = this.keyboardNavIndex >= this.matches.length - 1 ? -1 : this.keyboardNavIndex + 1));
  }
  /**
   * Handles the selection of an address match from the list of available matches.
   * Updates the selected address and typeahead input value.
   * Clears the matches list and keyboard navigation index.
   * @param {unknown} match
   */
  handleMatchSelection(t) {
    this.selectedMatch = t, this.inputValue = t.address + ", " + t.context, this.matches = [], this.keyboardNavIndex = -1, x("Address Selected", f(this, d));
  }
  /**
   * Handles the submission event for the address typeahead form.
   * @param {SubmitEvent} event - Form submission event object.
   * @param {object} options - Additional options for the submission.
   * @returns {void}
   */
  handleSubmit(t, n = {}) {
    t.preventDefault(), t.stopPropagation(), this.submitAddress(n);
  }
  /**
   * Submits the selected address for processing.
   * Transitions the flow state based on the results of the submission.
   * @param {object} options - Additional options for the submission.
   * @returns {Promise.<void>} Promise that resolves when the address submission is complete.
   */
  async submitAddress(t = {}) {
    var n;
    if (!(f(this, d).flowState.value == "addressFormProcessing" || f(this, d).flowState.value == "modalAddressFormProcessing")) {
      (n = document.activeElement) == null || n.blur(), this.errorMessage = "", f(this, d).flowState.value = f(this, d).flowStateMachine.transition(
        f(this, d).flowState.value,
        "SUBMIT_ADDRESS"
      ), x("Address Submitted", f(this, d));
      try {
        if (this.hasParcelDetails && f(this, d).estimateViewModel.hasResults && f(this, d).contactViewModel.isSubmitted)
          f(this, d).flowState.value = f(this, d).flowStateMachine.transition(
            f(this, d).flowState.value,
            "SKIP_CONTACT"
          );
        else {
          if (f(this, d).addressViewModel.hasParcelDetails || (f(this, d).addressViewModel.parcelDetails = {
            ...await $i(
              f(this, d).addressViewModel.selectedMatch.ll_uuid
            ),
            address: f(this, d).addressViewModel.selectedMatch.address,
            city: f(this, d).addressViewModel.selectedMatch.context.split(
              ", "
            )[0],
            state: f(this, d).addressViewModel.selectedMatch.context.split(
              ", "
            )[1]
          }), !f(this, d).estimateViewModel.hasResults) {
            const r = {
              ...t,
              parcel: {
                apn: f(this, d).addressViewModel.parcelDetails.apn,
                jurisdiction: f(this, d).addressViewModel.parcelDetails.jurisdiction
              },
              address: {
                address: f(this, d).addressViewModel.parcelDetails.address,
                city: f(this, d).addressViewModel.parcelDetails.city,
                state: f(this, d).addressViewModel.parcelDetails.state,
                zip: f(this, d).addressViewModel.parcelDetails.zip
              }
            }, i = await Ki(r);
            f(this, d).estimateViewModel.jurisdiction = i.jurisdiction, f(this, d).estimateViewModel.estimate = i.estimate;
          }
          f(this, d).flowState.value = f(this, d).flowStateMachine.transition(
            f(this, d).flowState.value,
            "SUCCESS"
          ), x("Address Submission Succeeded", f(this, d));
        }
      } catch {
        f(this, d).flowState.value = f(this, d).flowStateMachine.transition(
          f(this, d).flowState.value,
          "SUCCESS"
        ), x("Address Submission Errors (Non-Blocking)", f(this, d));
      }
    }
  }
}
d = new WeakMap();
function na(e) {
  return new Ni(e);
}
async function Ii(e) {
  const t = "https://app.regrid.com/api/v1/typeahead.json", n = "1SnpL7AQekjA4mH2vqUmkGm9AAfQxi_6mxwdm4qDzo_C-xSTx9z3pd9rTsRWDWV4", r = new Request(`${t}/?token=${n}&query=${e}`, {
    method: "GET"
  }), i = await fetch(r);
  if (!i.ok)
    throw new Error("Network response was not OK");
  const a = await i.json();
  return Hi(a);
}
function Hi(e) {
  return e.filter((r) => r.ll_uuid && r.address && r.address.match(/^[0-9].*[^0-9]$/)).sort((r, i) => {
    const a = ji(r, i);
    return a != 0 ? a : Wi(r, i);
  }).slice(0, 10);
}
function ji(e, t) {
  return le(e) && !le(t) ? -1 : !le(e) && le(t) ? 1 : 0;
}
function le(e) {
  return e.context.endsWith("CA");
}
function Wi(e, t) {
  return e.score > t.score ? -1 : e.score < t.score ? 1 : 0;
}
async function $i(e) {
  const t = "https://app.regrid.com/api/v1/parcel/", n = "1SnpL7AQekjA4mH2vqUmkGm9AAfQxi_6mxwdm4qDzo_C-xSTx9z3pd9rTsRWDWV4", r = new Request(
    `${t}${e}.json?token=${n}&return_custom=false`,
    {
      method: "GET"
    }
  ), i = await fetch(r);
  if (!i.ok)
    throw new Error("Network response was not OK");
  const a = await i.json();
  return Gi(a);
}
function Gi(e) {
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
async function Ki(e) {
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
async function vt(e, t = {}) {
  return new Promise(function(n, r) {
    const i = document.createElement("script");
    i.src = e, t.defer ? i.defer = !0 : t.async && (i.async = !0), i.addEventListener("load", function() {
      n();
    }), i.addEventListener("error", function(a) {
      r(a);
    }), document.body.appendChild(i);
  });
}
function ra(e) {
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
      return zi(t);
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
        x("Contact Submitted", e);
        try {
          let r = {
            firstName: this.firstName.trim(),
            lastName: this.lastName.trim(),
            email: this.email.trim(),
            phone: this.phone.trim(),
            desiredTimeline: this.desiredTimeline.trim()
          };
          if (!qi(r.email))
            throw new Error(
              "Please enter a valid email address, and try again.",
              { cause: "INVALID_EMAIL" }
            );
          if (!Ui(r.phone))
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
            Ji(this),
            Yi(i)
          ]), (!e.estimateViewModel.hasResults || e.estimateViewModel.hasActiveJurisdiction) && vt("https://assets.calendly.com/assets/external/widget.js", {
            async: !0
          }), e.estimateViewModel.hasActiveJurisdiction && e.estimateViewModel.hasEstimate && await vt(
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
          x("Contact Submission Succeeded", e);
        } catch (r) {
          r && r.cause && (r.cause === "INVALID_EMAIL" || r.cause === "INVALID_PHONE") ? this.errorMessage = r.message : this.errorMessage = "There was an error processing your info. Please try again, or contact us for help.", e.flowState.value = e.flowStateMachine.transition(
            e.flowState.value,
            "ERROR"
          ), x("Contact Submission Failed", e, {
            error_str: this.errorMessage
          });
        }
      }
    }
  };
}
function zi(e) {
  const t = e.replace(/\D/g, ""), n = t.startsWith("1"), a = (n ? t.slice(1) : t).slice(0, 10).match(
    /^(\d{0,3})(\d{0,3})(\d{0,4})$/
  ), s = n ? "1" : "", o = a[1] ? (n ? " " : "") + ("(" + a[1]) : "", l = a[2] ? ") " + a[2] : "", c = a[3] ? "-" + a[3] : "";
  return s + o + l + c;
}
function qi(e) {
  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(e);
}
function Ui(e) {
  return /^\+?1?\s?(\()?\d{3}(\))?[-.\s]?\d{3}[-.\s]?\d{4}$|^\d{10}$/.test(e);
}
async function Ji(e) {
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
async function Yi(e) {
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
function ia(e) {
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
      ), x("Schedule Consultation Clicked", e);
    },
    handleRequestCommunityClick(t) {
      t.preventDefault(), t.stopPropagation(), e.flowState.value = e.flowStateMachine.transition(
        e.flowState.value,
        "REQUEST_COMMUNITY"
      ), x("Community Requested", e);
    }
  };
}
function aa() {
  return {
    userGeo: {},
    marketsData: {},
    get market() {
      return Dn(this.userGeo.city, this.marketsData);
    },
    get bcPhoneNumber() {
      return Qi(this.userGeo.city, this.marketsData);
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
function Qi(e, t) {
  const n = "(415) 941-5861";
  if (!e || typeof e != "string")
    return n;
  const r = Dn(e, t);
  return Zi(
    r,
    t
  ) ?? n;
}
function Dn(e, t) {
  if (!e || typeof e != "string")
    return null;
  for (const n of Object.keys(t))
    if (t[n].cities.filter(
      (r) => r.toLowerCase().trim() === e.toLowerCase().trim()
    ).length > 0)
      return n;
  return null;
}
function Zi(e, t) {
  if (!e || typeof e != "string")
    return null;
  for (const n of Object.keys(t))
    if (n.toLowerCase().trim() === e.toLowerCase().trim())
      return t[n].bcPhoneNumber ?? null;
  return null;
}
function sa() {
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
function oa(e) {
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
      return l ? l.target : (x("Invalid State Transition Triggered", e, {
        current_state_str: a,
        event_str: s
      }), a);
    }
  };
}
function la(e) {
  return {
    value: "",
    init() {
      this.value = e.flowStateMachine.defaultState;
    }
  };
}
function ca(e) {
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
      }), x("Modal Get Offer Flow Opened", e, n);
    },
    handleModalClose() {
      let t = !0;
      e.flowState.value == "contactForm" && e.contactViewModel.hasAnyContactDetails && (t = confirm(
        "Are you sure you want to stop before you've seen how much your extra lot space could be worth?"
      )), e.flowState.value == "contactFormProcessing" && (t = !1), t && (e.flowState.value = e.flowStateMachine.transition(
        e.flowState.value,
        "EXIT"
      ), x("Get Offer Modal Closed", e));
    }
  };
}
export {
  ra as a,
  ia as b,
  na as c,
  aa as d,
  sa as e,
  oa as f,
  la as g,
  ca as h,
  ta as i,
  ea as m
};
