var Oe = !1, Ce = !1, I = [];
function Or(e) {
  Cr(e);
}
function Cr(e) {
  I.includes(e) || I.push(e), Mr();
}
function dt(e) {
  let t = I.indexOf(e);
  t !== -1 && I.splice(t, 1);
}
function Mr() {
  !Ce && !Oe && (Oe = !0, queueMicrotask(Tr));
}
function Tr() {
  Oe = !1, Ce = !0;
  for (let e = 0; e < I.length; e++)
    I[e]();
  I.length = 0, Ce = !1;
}
var k, J, ae, _t, Me = !0;
function Pr(e) {
  Me = !1, e(), Me = !0;
}
function $r(e) {
  k = e.reactive, ae = e.release, J = (t) => e.effect(t, { scheduler: (r) => {
    Me ? Or(r) : r();
  } }), _t = e.raw;
}
function st(e) {
  J = e;
}
function Ir(e) {
  let t = () => {
  };
  return [(n) => {
    let i = J(n);
    return e._x_effects || (e._x_effects = /* @__PURE__ */ new Set(), e._x_runEffects = () => {
      e._x_effects.forEach((s) => s());
    }), e._x_effects.add(i), t = () => {
      i !== void 0 && (e._x_effects.delete(i), ae(i));
    }, i;
  }, () => {
    t();
  }];
}
var pt = [], ht = [], gt = [];
function jr(e) {
  gt.push(e);
}
function vt(e, t) {
  typeof t == "function" ? (e._x_cleanups || (e._x_cleanups = []), e._x_cleanups.push(t)) : (t = e, ht.push(t));
}
function Rr(e) {
  pt.push(e);
}
function Nr(e, t, r) {
  e._x_attributeCleanups || (e._x_attributeCleanups = {}), e._x_attributeCleanups[t] || (e._x_attributeCleanups[t] = []), e._x_attributeCleanups[t].push(r);
}
function xt(e, t) {
  e._x_attributeCleanups && Object.entries(e._x_attributeCleanups).forEach(([r, n]) => {
    (t === void 0 || t.includes(r)) && (n.forEach((i) => i()), delete e._x_attributeCleanups[r]);
  });
}
var ze = new MutationObserver(qe), Be = !1;
function yt() {
  ze.observe(document, { subtree: !0, childList: !0, attributes: !0, attributeOldValue: !0 }), Be = !0;
}
function Vr() {
  Lr(), ze.disconnect(), Be = !1;
}
var W = [], we = !1;
function Lr() {
  W = W.concat(ze.takeRecords()), W.length && !we && (we = !0, queueMicrotask(() => {
    Fr(), we = !1;
  }));
}
function Fr() {
  qe(W), W.length = 0;
}
function y(e) {
  if (!Be)
    return e();
  Vr();
  let t = e();
  return yt(), t;
}
var He = !1, ie = [];
function Kr() {
  He = !0;
}
function Dr() {
  He = !1, qe(ie), ie = [];
}
function qe(e) {
  if (He) {
    ie = ie.concat(e);
    return;
  }
  let t = [], r = [], n = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map();
  for (let s = 0; s < e.length; s++)
    if (!e[s].target._x_ignoreMutationObserver && (e[s].type === "childList" && (e[s].addedNodes.forEach((o) => o.nodeType === 1 && t.push(o)), e[s].removedNodes.forEach((o) => o.nodeType === 1 && r.push(o))), e[s].type === "attributes")) {
      let o = e[s].target, a = e[s].attributeName, c = e[s].oldValue, u = () => {
        n.has(o) || n.set(o, []), n.get(o).push({ name: a, value: o.getAttribute(a) });
      }, l = () => {
        i.has(o) || i.set(o, []), i.get(o).push(a);
      };
      o.hasAttribute(a) && c === null ? u() : o.hasAttribute(a) ? (l(), u()) : l();
    }
  i.forEach((s, o) => {
    xt(o, s);
  }), n.forEach((s, o) => {
    pt.forEach((a) => a(o, s));
  });
  for (let s of r)
    if (!t.includes(s) && (ht.forEach((o) => o(s)), s._x_cleanups))
      for (; s._x_cleanups.length; )
        s._x_cleanups.pop()();
  t.forEach((s) => {
    s._x_ignoreSelf = !0, s._x_ignore = !0;
  });
  for (let s of t)
    r.includes(s) || s.isConnected && (delete s._x_ignoreSelf, delete s._x_ignore, gt.forEach((o) => o(s)), s._x_ignore = !0, s._x_ignoreSelf = !0);
  t.forEach((s) => {
    delete s._x_ignoreSelf, delete s._x_ignore;
  }), t = null, r = null, n = null, i = null;
}
function mt(e) {
  return Z(F(e));
}
function Q(e, t, r) {
  return e._x_dataStack = [t, ...F(r || e)], () => {
    e._x_dataStack = e._x_dataStack.filter((n) => n !== t);
  };
}
function ot(e, t) {
  let r = e._x_dataStack[0];
  Object.entries(t).forEach(([n, i]) => {
    r[n] = i;
  });
}
function F(e) {
  return e._x_dataStack ? e._x_dataStack : typeof ShadowRoot == "function" && e instanceof ShadowRoot ? F(e.host) : e.parentNode ? F(e.parentNode) : [];
}
function Z(e) {
  let t = new Proxy({}, {
    ownKeys: () => Array.from(new Set(e.flatMap((r) => Object.keys(r)))),
    has: (r, n) => e.some((i) => i.hasOwnProperty(n)),
    get: (r, n) => (e.find((i) => {
      if (i.hasOwnProperty(n)) {
        let s = Object.getOwnPropertyDescriptor(i, n);
        if (s.get && s.get._x_alreadyBound || s.set && s.set._x_alreadyBound)
          return !0;
        if ((s.get || s.set) && s.enumerable) {
          let o = s.get, a = s.set, c = s;
          o = o && o.bind(t), a = a && a.bind(t), o && (o._x_alreadyBound = !0), a && (a._x_alreadyBound = !0), Object.defineProperty(i, n, {
            ...c,
            get: o,
            set: a
          });
        }
        return !0;
      }
      return !1;
    }) || {})[n],
    set: (r, n, i) => {
      let s = e.find((o) => o.hasOwnProperty(n));
      return s ? s[n] = i : e[e.length - 1][n] = i, !0;
    }
  });
  return t;
}
function wt(e) {
  let t = (n) => typeof n == "object" && !Array.isArray(n) && n !== null, r = (n, i = "") => {
    Object.entries(Object.getOwnPropertyDescriptors(n)).forEach(([s, { value: o, enumerable: a }]) => {
      if (a === !1 || o === void 0)
        return;
      let c = i === "" ? s : `${i}.${s}`;
      typeof o == "object" && o !== null && o._x_interceptor ? n[s] = o.initialize(e, c, s) : t(o) && o !== n && !(o instanceof Element) && r(o, c);
    });
  };
  return r(e);
}
function bt(e, t = () => {
}) {
  let r = {
    initialValue: void 0,
    _x_interceptor: !0,
    initialize(n, i, s) {
      return e(this.initialValue, () => kr(n, i), (o) => Te(n, i, o), i, s);
    }
  };
  return t(r), (n) => {
    if (typeof n == "object" && n !== null && n._x_interceptor) {
      let i = r.initialize.bind(r);
      r.initialize = (s, o, a) => {
        let c = n.initialize(s, o, a);
        return r.initialValue = c, i(s, o, a);
      };
    } else
      r.initialValue = n;
    return r;
  };
}
function kr(e, t) {
  return t.split(".").reduce((r, n) => r[n], e);
}
function Te(e, t, r) {
  if (typeof t == "string" && (t = t.split(".")), t.length === 1)
    e[t[0]] = r;
  else {
    if (t.length === 0)
      throw error;
    return e[t[0]] || (e[t[0]] = {}), Te(e[t[0]], t.slice(1), r);
  }
}
var Et = {};
function A(e, t) {
  Et[e] = t;
}
function Pe(e, t) {
  return Object.entries(Et).forEach(([r, n]) => {
    Object.defineProperty(e, `$${r}`, {
      get() {
        let [i, s] = Tt(t);
        return i = { interceptor: bt, ...i }, vt(t, s), n(t, i);
      },
      enumerable: !1
    });
  }), e;
}
function zr(e, t, r, ...n) {
  try {
    return r(...n);
  } catch (i) {
    Y(i, e, t);
  }
}
function Y(e, t, r = void 0) {
  Object.assign(e, { el: t, expression: r }), console.warn(`Alpine Expression Error: ${e.message}

${r ? 'Expression: "' + r + `"

` : ""}`, t), setTimeout(() => {
    throw e;
  }, 0);
}
var ne = !0;
function Br(e) {
  let t = ne;
  ne = !1, e(), ne = t;
}
function L(e, t, r = {}) {
  let n;
  return m(e, t)((i) => n = i, r), n;
}
function m(...e) {
  return At(...e);
}
var At = St;
function Hr(e) {
  At = e;
}
function St(e, t) {
  let r = {};
  Pe(r, e);
  let n = [r, ...F(e)];
  if (typeof t == "function")
    return qr(n, t);
  let i = Ur(n, t, e);
  return zr.bind(null, e, t, i);
}
function qr(e, t) {
  return (r = () => {
  }, { scope: n = {}, params: i = [] } = {}) => {
    let s = t.apply(Z([n, ...e]), i);
    se(r, s);
  };
}
var be = {};
function Wr(e, t) {
  if (be[e])
    return be[e];
  let r = Object.getPrototypeOf(async function() {
  }).constructor, n = /^[\n\s]*if.*\(.*\)/.test(e) || /^(let|const)\s/.test(e) ? `(() => { ${e} })()` : e, s = (() => {
    try {
      return new r(["__self", "scope"], `with (scope) { __self.result = ${n} }; __self.finished = true; return __self.result;`);
    } catch (o) {
      return Y(o, t, e), Promise.resolve();
    }
  })();
  return be[e] = s, s;
}
function Ur(e, t, r) {
  let n = Wr(t, r);
  return (i = () => {
  }, { scope: s = {}, params: o = [] } = {}) => {
    n.result = void 0, n.finished = !1;
    let a = Z([s, ...e]);
    if (typeof n == "function") {
      let c = n(n, a).catch((u) => Y(u, r, t));
      n.finished ? (se(i, n.result, a, o, r), n.result = void 0) : c.then((u) => {
        se(i, u, a, o, r);
      }).catch((u) => Y(u, r, t)).finally(() => n.result = void 0);
    }
  };
}
function se(e, t, r, n, i) {
  if (ne && typeof t == "function") {
    let s = t.apply(r, n);
    s instanceof Promise ? s.then((o) => se(e, o, r, n)).catch((o) => Y(o, i, t)) : e(s);
  } else
    e(t);
}
var We = "x-";
function z(e = "") {
  return We + e;
}
function Gr(e) {
  We = e;
}
var Ot = {};
function v(e, t) {
  Ot[e] = t;
}
function Ue(e, t, r) {
  if (t = Array.from(t), e._x_virtualDirectives) {
    let s = Object.entries(e._x_virtualDirectives).map(([a, c]) => ({ name: a, value: c })), o = Ct(s);
    s = s.map((a) => o.find((c) => c.name === a.name) ? {
      name: `x-bind:${a.name}`,
      value: `"${a.value}"`
    } : a), t = t.concat(s);
  }
  let n = {};
  return t.map(It((s, o) => n[s] = o)).filter(Rt).map(Qr(n, r)).sort(Zr).map((s) => Jr(e, s));
}
function Ct(e) {
  return Array.from(e).map(It()).filter((t) => !Rt(t));
}
var $e = !1, q = /* @__PURE__ */ new Map(), Mt = Symbol();
function Yr(e) {
  $e = !0;
  let t = Symbol();
  Mt = t, q.set(t, []);
  let r = () => {
    for (; q.get(t).length; )
      q.get(t).shift()();
    q.delete(t);
  }, n = () => {
    $e = !1, r();
  };
  e(r), n();
}
function Tt(e) {
  let t = [], r = (a) => t.push(a), [n, i] = Ir(e);
  return t.push(i), [{
    Alpine: X,
    effect: n,
    cleanup: r,
    evaluateLater: m.bind(m, e),
    evaluate: L.bind(L, e)
  }, () => t.forEach((a) => a())];
}
function Jr(e, t) {
  let r = () => {
  }, n = Ot[t.type] || r, [i, s] = Tt(e);
  Nr(e, t.original, s);
  let o = () => {
    e._x_ignore || e._x_ignoreSelf || (n.inline && n.inline(e, t, i), n = n.bind(n, e, t, i), $e ? q.get(Mt).push(n) : n());
  };
  return o.runCleanups = s, o;
}
var Pt = (e, t) => ({ name: r, value: n }) => (r.startsWith(e) && (r = r.replace(e, t)), { name: r, value: n }), $t = (e) => e;
function It(e = () => {
}) {
  return ({ name: t, value: r }) => {
    let { name: n, value: i } = jt.reduce((s, o) => o(s), { name: t, value: r });
    return n !== t && e(n, t), { name: n, value: i };
  };
}
var jt = [];
function Ge(e) {
  jt.push(e);
}
function Rt({ name: e }) {
  return Nt().test(e);
}
var Nt = () => new RegExp(`^${We}([^:^.]+)\\b`);
function Qr(e, t) {
  return ({ name: r, value: n }) => {
    let i = r.match(Nt()), s = r.match(/:([a-zA-Z0-9\-:]+)/), o = r.match(/\.[^.\]]+(?=[^\]]*$)/g) || [], a = t || e[r] || r;
    return {
      type: i ? i[1] : null,
      value: s ? s[1] : null,
      modifiers: o.map((c) => c.replace(".", "")),
      expression: n,
      original: a
    };
  };
}
var Ie = "DEFAULT", te = [
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
function Zr(e, t) {
  let r = te.indexOf(e.type) === -1 ? Ie : e.type, n = te.indexOf(t.type) === -1 ? Ie : t.type;
  return te.indexOf(r) - te.indexOf(n);
}
function U(e, t, r = {}) {
  e.dispatchEvent(new CustomEvent(t, {
    detail: r,
    bubbles: !0,
    composed: !0,
    cancelable: !0
  }));
}
var je = [], Ye = !1;
function Vt(e = () => {
}) {
  return queueMicrotask(() => {
    Ye || setTimeout(() => {
      Re();
    });
  }), new Promise((t) => {
    je.push(() => {
      e(), t();
    });
  });
}
function Re() {
  for (Ye = !1; je.length; )
    je.shift()();
}
function Xr() {
  Ye = !0;
}
function N(e, t) {
  if (typeof ShadowRoot == "function" && e instanceof ShadowRoot) {
    Array.from(e.children).forEach((i) => N(i, t));
    return;
  }
  let r = !1;
  if (t(e, () => r = !0), r)
    return;
  let n = e.firstElementChild;
  for (; n; )
    N(n, t), n = n.nextElementSibling;
}
function K(e, ...t) {
  console.warn(`Alpine Warning: ${e}`, ...t);
}
function en() {
  document.body || K("Unable to initialize. Trying to load Alpine before `<body>` is available. Did you forget to add `defer` in Alpine's `<script>` tag?"), U(document, "alpine:init"), U(document, "alpine:initializing"), yt(), jr((t) => T(t, N)), vt((t) => rn(t)), Rr((t, r) => {
    Ue(t, r).forEach((n) => n());
  });
  let e = (t) => !ce(t.parentElement, !0);
  Array.from(document.querySelectorAll(Kt())).filter(e).forEach((t) => {
    T(t);
  }), U(document, "alpine:initialized");
}
var Je = [], Lt = [];
function Ft() {
  return Je.map((e) => e());
}
function Kt() {
  return Je.concat(Lt).map((e) => e());
}
function Dt(e) {
  Je.push(e);
}
function kt(e) {
  Lt.push(e);
}
function ce(e, t = !1) {
  return ue(e, (r) => {
    if ((t ? Kt() : Ft()).some((i) => r.matches(i)))
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
function tn(e) {
  return Ft().some((t) => e.matches(t));
}
function T(e, t = N) {
  Yr(() => {
    t(e, (r, n) => {
      Ue(r, r.attributes).forEach((i) => i()), r._x_ignore && n();
    });
  });
}
function rn(e) {
  N(e, (t) => xt(t));
}
function Qe(e, t) {
  return Array.isArray(t) ? at(e, t.join(" ")) : typeof t == "object" && t !== null ? nn(e, t) : typeof t == "function" ? Qe(e, t()) : at(e, t);
}
function at(e, t) {
  let r = (i) => i.split(" ").filter((s) => !e.classList.contains(s)).filter(Boolean), n = (i) => (e.classList.add(...i), () => {
    e.classList.remove(...i);
  });
  return t = t === !0 ? t = "" : t || "", n(r(t));
}
function nn(e, t) {
  let r = (a) => a.split(" ").filter(Boolean), n = Object.entries(t).flatMap(([a, c]) => c ? r(a) : !1).filter(Boolean), i = Object.entries(t).flatMap(([a, c]) => c ? !1 : r(a)).filter(Boolean), s = [], o = [];
  return i.forEach((a) => {
    e.classList.contains(a) && (e.classList.remove(a), o.push(a));
  }), n.forEach((a) => {
    e.classList.contains(a) || (e.classList.add(a), s.push(a));
  }), () => {
    o.forEach((a) => e.classList.add(a)), s.forEach((a) => e.classList.remove(a));
  };
}
function le(e, t) {
  return typeof t == "object" && t !== null ? sn(e, t) : on(e, t);
}
function sn(e, t) {
  let r = {};
  return Object.entries(t).forEach(([n, i]) => {
    r[n] = e.style[n], n.startsWith("--") || (n = an(n)), e.style.setProperty(n, i);
  }), setTimeout(() => {
    e.style.length === 0 && e.removeAttribute("style");
  }), () => {
    le(e, r);
  };
}
function on(e, t) {
  let r = e.getAttribute("style", t);
  return e.setAttribute("style", t), () => {
    e.setAttribute("style", r || "");
  };
}
function an(e) {
  return e.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}
function Ne(e, t = () => {
}) {
  let r = !1;
  return function() {
    r ? t.apply(this, arguments) : (r = !0, e.apply(this, arguments));
  };
}
v("transition", (e, { value: t, modifiers: r, expression: n }, { evaluate: i }) => {
  typeof n == "function" && (n = i(n)), n ? cn(e, n, t) : un(e, r, t);
});
function cn(e, t, r) {
  zt(e, Qe, ""), {
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
  }[r](t);
}
function un(e, t, r) {
  zt(e, le);
  let n = !t.includes("in") && !t.includes("out") && !r, i = n || t.includes("in") || ["enter"].includes(r), s = n || t.includes("out") || ["leave"].includes(r);
  t.includes("in") && !n && (t = t.filter((_, g) => g < t.indexOf("out"))), t.includes("out") && !n && (t = t.filter((_, g) => g > t.indexOf("out")));
  let o = !t.includes("opacity") && !t.includes("scale"), a = o || t.includes("opacity"), c = o || t.includes("scale"), u = a ? 0 : 1, l = c ? B(t, "scale", 95) / 100 : 1, d = B(t, "delay", 0), p = B(t, "origin", "center"), b = "opacity, transform", C = B(t, "duration", 150) / 1e3, V = B(t, "duration", 75) / 1e3, f = "cubic-bezier(0.4, 0.0, 0.2, 1)";
  i && (e._x_transition.enter.during = {
    transformOrigin: p,
    transitionDelay: d,
    transitionProperty: b,
    transitionDuration: `${C}s`,
    transitionTimingFunction: f
  }, e._x_transition.enter.start = {
    opacity: u,
    transform: `scale(${l})`
  }, e._x_transition.enter.end = {
    opacity: 1,
    transform: "scale(1)"
  }), s && (e._x_transition.leave.during = {
    transformOrigin: p,
    transitionDelay: d,
    transitionProperty: b,
    transitionDuration: `${V}s`,
    transitionTimingFunction: f
  }, e._x_transition.leave.start = {
    opacity: 1,
    transform: "scale(1)"
  }, e._x_transition.leave.end = {
    opacity: u,
    transform: `scale(${l})`
  });
}
function zt(e, t, r = {}) {
  e._x_transition || (e._x_transition = {
    enter: { during: r, start: r, end: r },
    leave: { during: r, start: r, end: r },
    in(n = () => {
    }, i = () => {
    }) {
      Ve(e, t, {
        during: this.enter.during,
        start: this.enter.start,
        end: this.enter.end
      }, n, i);
    },
    out(n = () => {
    }, i = () => {
    }) {
      Ve(e, t, {
        during: this.leave.during,
        start: this.leave.start,
        end: this.leave.end
      }, n, i);
    }
  });
}
window.Element.prototype._x_toggleAndCascadeWithTransitions = function(e, t, r, n) {
  const i = document.visibilityState === "visible" ? requestAnimationFrame : setTimeout;
  let s = () => i(r);
  if (t) {
    e._x_transition && (e._x_transition.enter || e._x_transition.leave) ? e._x_transition.enter && (Object.entries(e._x_transition.enter.during).length || Object.entries(e._x_transition.enter.start).length || Object.entries(e._x_transition.enter.end).length) ? e._x_transition.in(r) : s() : e._x_transition ? e._x_transition.in(r) : s();
    return;
  }
  e._x_hidePromise = e._x_transition ? new Promise((o, a) => {
    e._x_transition.out(() => {
    }, () => o(n)), e._x_transitioning.beforeCancel(() => a({ isFromCancelledTransition: !0 }));
  }) : Promise.resolve(n), queueMicrotask(() => {
    let o = Bt(e);
    o ? (o._x_hideChildren || (o._x_hideChildren = []), o._x_hideChildren.push(e)) : i(() => {
      let a = (c) => {
        let u = Promise.all([
          c._x_hidePromise,
          ...(c._x_hideChildren || []).map(a)
        ]).then(([l]) => l());
        return delete c._x_hidePromise, delete c._x_hideChildren, u;
      };
      a(e).catch((c) => {
        if (!c.isFromCancelledTransition)
          throw c;
      });
    });
  });
};
function Bt(e) {
  let t = e.parentNode;
  if (t)
    return t._x_hidePromise ? t : Bt(t);
}
function Ve(e, t, { during: r, start: n, end: i } = {}, s = () => {
}, o = () => {
}) {
  if (e._x_transitioning && e._x_transitioning.cancel(), Object.keys(r).length === 0 && Object.keys(n).length === 0 && Object.keys(i).length === 0) {
    s(), o();
    return;
  }
  let a, c, u;
  ln(e, {
    start() {
      a = t(e, n);
    },
    during() {
      c = t(e, r);
    },
    before: s,
    end() {
      a(), u = t(e, i);
    },
    after: o,
    cleanup() {
      c(), u();
    }
  });
}
function ln(e, t) {
  let r, n, i, s = Ne(() => {
    y(() => {
      r = !0, n || t.before(), i || (t.end(), Re()), t.after(), e.isConnected && t.cleanup(), delete e._x_transitioning;
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
      s();
    }),
    finish: s
  }, y(() => {
    t.start(), t.during();
  }), Xr(), requestAnimationFrame(() => {
    if (r)
      return;
    let o = Number(getComputedStyle(e).transitionDuration.replace(/,.*/, "").replace("s", "")) * 1e3, a = Number(getComputedStyle(e).transitionDelay.replace(/,.*/, "").replace("s", "")) * 1e3;
    o === 0 && (o = Number(getComputedStyle(e).animationDuration.replace("s", "")) * 1e3), y(() => {
      t.before();
    }), n = !0, requestAnimationFrame(() => {
      r || (y(() => {
        t.end();
      }), Re(), setTimeout(e._x_transitioning.finish, o + a), i = !0);
    });
  });
}
function B(e, t, r) {
  if (e.indexOf(t) === -1)
    return r;
  const n = e[e.indexOf(t) + 1];
  if (!n || t === "scale" && isNaN(n))
    return r;
  if (t === "duration") {
    let i = n.match(/([0-9]+)ms/);
    if (i)
      return i[1];
  }
  return t === "origin" && ["top", "right", "left", "center", "bottom"].includes(e[e.indexOf(t) + 2]) ? [n, e[e.indexOf(t) + 2]].join(" ") : n;
}
var Le = !1;
function fe(e, t = () => {
}) {
  return (...r) => Le ? t(...r) : e(...r);
}
function fn(e, t) {
  t._x_dataStack || (t._x_dataStack = e._x_dataStack), Le = !0, _n(() => {
    dn(t);
  }), Le = !1;
}
function dn(e) {
  let t = !1;
  T(e, (n, i) => {
    N(n, (s, o) => {
      if (t && tn(s))
        return o();
      t = !0, i(s, o);
    });
  });
}
function _n(e) {
  let t = J;
  st((r, n) => {
    let i = t(r);
    return ae(i), () => {
    };
  }), e(), st(t);
}
function Ht(e, t, r, n = []) {
  switch (e._x_bindings || (e._x_bindings = k({})), e._x_bindings[t] = r, t = n.includes("camel") ? mn(t) : t, t) {
    case "value":
      pn(e, r);
      break;
    case "style":
      gn(e, r);
      break;
    case "class":
      hn(e, r);
      break;
    default:
      vn(e, t, r);
      break;
  }
}
function pn(e, t) {
  if (e.type === "radio")
    e.attributes.value === void 0 && (e.value = t), window.fromModel && (e.checked = ct(e.value, t));
  else if (e.type === "checkbox")
    Number.isInteger(t) ? e.value = t : !Number.isInteger(t) && !Array.isArray(t) && typeof t != "boolean" && ![null, void 0].includes(t) ? e.value = String(t) : Array.isArray(t) ? e.checked = t.some((r) => ct(r, e.value)) : e.checked = !!t;
  else if (e.tagName === "SELECT")
    yn(e, t);
  else {
    if (e.value === t)
      return;
    e.value = t;
  }
}
function hn(e, t) {
  e._x_undoAddedClasses && e._x_undoAddedClasses(), e._x_undoAddedClasses = Qe(e, t);
}
function gn(e, t) {
  e._x_undoAddedStyles && e._x_undoAddedStyles(), e._x_undoAddedStyles = le(e, t);
}
function vn(e, t, r) {
  [null, void 0, !1].includes(r) && wn(t) ? e.removeAttribute(t) : (qt(t) && (r = t), xn(e, t, r));
}
function xn(e, t, r) {
  e.getAttribute(t) != r && e.setAttribute(t, r);
}
function yn(e, t) {
  const r = [].concat(t).map((n) => n + "");
  Array.from(e.options).forEach((n) => {
    n.selected = r.includes(n.value);
  });
}
function mn(e) {
  return e.toLowerCase().replace(/-(\w)/g, (t, r) => r.toUpperCase());
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
function wn(e) {
  return !["aria-pressed", "aria-checked", "aria-expanded", "aria-selected"].includes(e);
}
function bn(e, t, r) {
  if (e._x_bindings && e._x_bindings[t] !== void 0)
    return e._x_bindings[t];
  let n = e.getAttribute(t);
  return n === null ? typeof r == "function" ? r() : r : n === "" ? !0 : qt(t) ? !![t, "true"].includes(n) : n;
}
function Wt(e, t) {
  var r;
  return function() {
    var n = this, i = arguments, s = function() {
      r = null, e.apply(n, i);
    };
    clearTimeout(r), r = setTimeout(s, t);
  };
}
function Ut(e, t) {
  let r;
  return function() {
    let n = this, i = arguments;
    r || (e.apply(n, i), r = !0, setTimeout(() => r = !1, t));
  };
}
function En(e) {
  e(X);
}
var $ = {}, ut = !1;
function An(e, t) {
  if (ut || ($ = k($), ut = !0), t === void 0)
    return $[e];
  $[e] = t, typeof t == "object" && t !== null && t.hasOwnProperty("init") && typeof t.init == "function" && $[e].init(), wt($[e]);
}
function Sn() {
  return $;
}
var Gt = {};
function On(e, t) {
  let r = typeof t != "function" ? () => t : t;
  e instanceof Element ? Yt(e, r()) : Gt[e] = r;
}
function Cn(e) {
  return Object.entries(Gt).forEach(([t, r]) => {
    Object.defineProperty(e, t, {
      get() {
        return (...n) => r(...n);
      }
    });
  }), e;
}
function Yt(e, t, r) {
  let n = [];
  for (; n.length; )
    n.pop()();
  let i = Object.entries(t).map(([o, a]) => ({ name: o, value: a })), s = Ct(i);
  i = i.map((o) => s.find((a) => a.name === o.name) ? {
    name: `x-bind:${o.name}`,
    value: `"${o.value}"`
  } : o), Ue(e, i, r).map((o) => {
    n.push(o.runCleanups), o();
  });
}
var Jt = {};
function Mn(e, t) {
  Jt[e] = t;
}
function Tn(e, t) {
  return Object.entries(Jt).forEach(([r, n]) => {
    Object.defineProperty(e, r, {
      get() {
        return (...i) => n.bind(t)(...i);
      },
      enumerable: !1
    });
  }), e;
}
var Pn = {
  get reactive() {
    return k;
  },
  get release() {
    return ae;
  },
  get effect() {
    return J;
  },
  get raw() {
    return _t;
  },
  version: "3.10.5",
  flushAndStopDeferringMutations: Dr,
  dontAutoEvaluateFunctions: Br,
  disableEffectScheduling: Pr,
  setReactivityEngine: $r,
  closestDataStack: F,
  skipDuringClone: fe,
  addRootSelector: Dt,
  addInitSelector: kt,
  addScopeToNode: Q,
  deferMutations: Kr,
  mapAttributes: Ge,
  evaluateLater: m,
  setEvaluator: Hr,
  mergeProxies: Z,
  findClosest: ue,
  closestRoot: ce,
  interceptor: bt,
  transition: Ve,
  setStyles: le,
  mutateDom: y,
  directive: v,
  throttle: Ut,
  debounce: Wt,
  evaluate: L,
  initTree: T,
  nextTick: Vt,
  prefixed: z,
  prefix: Gr,
  plugin: En,
  magic: A,
  store: An,
  start: en,
  clone: fn,
  bound: bn,
  $data: mt,
  data: Mn,
  bind: On
}, X = Pn;
function $n(e, t) {
  const r = /* @__PURE__ */ Object.create(null), n = e.split(",");
  for (let i = 0; i < n.length; i++)
    r[n[i]] = !0;
  return t ? (i) => !!r[i.toLowerCase()] : (i) => !!r[i];
}
var In = Object.freeze({}), Qt = Object.assign, jn = Object.prototype.hasOwnProperty, de = (e, t) => jn.call(e, t), j = Array.isArray, G = (e) => Zt(e) === "[object Map]", Rn = (e) => typeof e == "string", Ze = (e) => typeof e == "symbol", _e = (e) => e !== null && typeof e == "object", Nn = Object.prototype.toString, Zt = (e) => Nn.call(e), Xt = (e) => Zt(e).slice(8, -1), Xe = (e) => Rn(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, Vn = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (r) => t[r] || (t[r] = e(r));
}, Ln = Vn((e) => e.charAt(0).toUpperCase() + e.slice(1)), er = (e, t) => e !== t && (e === e || t === t), Fe = /* @__PURE__ */ new WeakMap(), H = [], S, R = Symbol("iterate"), Ke = Symbol("Map key iterate");
function Fn(e) {
  return e && e._isEffect === !0;
}
function Kn(e, t = In) {
  Fn(e) && (e = e.raw);
  const r = zn(e, t);
  return t.lazy || r(), r;
}
function Dn(e) {
  e.active && (tr(e), e.options.onStop && e.options.onStop(), e.active = !1);
}
var kn = 0;
function zn(e, t) {
  const r = function() {
    if (!r.active)
      return e();
    if (!H.includes(r)) {
      tr(r);
      try {
        return Hn(), H.push(r), S = r, e();
      } finally {
        H.pop(), rr(), S = H[H.length - 1];
      }
    }
  };
  return r.id = kn++, r.allowRecurse = !!t.allowRecurse, r._isEffect = !0, r.active = !0, r.raw = e, r.deps = [], r.options = t, r;
}
function tr(e) {
  const { deps: t } = e;
  if (t.length) {
    for (let r = 0; r < t.length; r++)
      t[r].delete(e);
    t.length = 0;
  }
}
var D = !0, et = [];
function Bn() {
  et.push(D), D = !1;
}
function Hn() {
  et.push(D), D = !0;
}
function rr() {
  const e = et.pop();
  D = e === void 0 ? !0 : e;
}
function E(e, t, r) {
  if (!D || S === void 0)
    return;
  let n = Fe.get(e);
  n || Fe.set(e, n = /* @__PURE__ */ new Map());
  let i = n.get(r);
  i || n.set(r, i = /* @__PURE__ */ new Set()), i.has(S) || (i.add(S), S.deps.push(i), S.options.onTrack && S.options.onTrack({
    effect: S,
    target: e,
    type: t,
    key: r
  }));
}
function P(e, t, r, n, i, s) {
  const o = Fe.get(e);
  if (!o)
    return;
  const a = /* @__PURE__ */ new Set(), c = (l) => {
    l && l.forEach((d) => {
      (d !== S || d.allowRecurse) && a.add(d);
    });
  };
  if (t === "clear")
    o.forEach(c);
  else if (r === "length" && j(e))
    o.forEach((l, d) => {
      (d === "length" || d >= n) && c(l);
    });
  else
    switch (r !== void 0 && c(o.get(r)), t) {
      case "add":
        j(e) ? Xe(r) && c(o.get("length")) : (c(o.get(R)), G(e) && c(o.get(Ke)));
        break;
      case "delete":
        j(e) || (c(o.get(R)), G(e) && c(o.get(Ke)));
        break;
      case "set":
        G(e) && c(o.get(R));
        break;
    }
  const u = (l) => {
    l.options.onTrigger && l.options.onTrigger({
      effect: l,
      target: e,
      key: r,
      type: t,
      newValue: n,
      oldValue: i,
      oldTarget: s
    }), l.options.scheduler ? l.options.scheduler(l) : l();
  };
  a.forEach(u);
}
var qn = /* @__PURE__ */ $n("__proto__,__v_isRef,__isVue"), nr = new Set(Object.getOwnPropertyNames(Symbol).map((e) => Symbol[e]).filter(Ze)), Wn = /* @__PURE__ */ pe(), Un = /* @__PURE__ */ pe(!1, !0), Gn = /* @__PURE__ */ pe(!0), Yn = /* @__PURE__ */ pe(!0, !0), oe = {};
["includes", "indexOf", "lastIndexOf"].forEach((e) => {
  const t = Array.prototype[e];
  oe[e] = function(...r) {
    const n = h(this);
    for (let s = 0, o = this.length; s < o; s++)
      E(n, "get", s + "");
    const i = t.apply(n, r);
    return i === -1 || i === !1 ? t.apply(n, r.map(h)) : i;
  };
});
["push", "pop", "shift", "unshift", "splice"].forEach((e) => {
  const t = Array.prototype[e];
  oe[e] = function(...r) {
    Bn();
    const n = t.apply(this, r);
    return rr(), n;
  };
});
function pe(e = !1, t = !1) {
  return function(n, i, s) {
    if (i === "__v_isReactive")
      return !e;
    if (i === "__v_isReadonly")
      return e;
    if (i === "__v_raw" && s === (e ? t ? si : xr : t ? ii : vr).get(n))
      return n;
    const o = j(n);
    if (!e && o && de(oe, i))
      return Reflect.get(oe, i, s);
    const a = Reflect.get(n, i, s);
    return (Ze(i) ? nr.has(i) : qn(i)) || (e || E(n, "get", i), t) ? a : De(a) ? !o || !Xe(i) ? a.value : a : _e(a) ? e ? yr(a) : it(a) : a;
  };
}
var Jn = /* @__PURE__ */ ir(), Qn = /* @__PURE__ */ ir(!0);
function ir(e = !1) {
  return function(r, n, i, s) {
    let o = r[n];
    if (!e && (i = h(i), o = h(o), !j(r) && De(o) && !De(i)))
      return o.value = i, !0;
    const a = j(r) && Xe(n) ? Number(n) < r.length : de(r, n), c = Reflect.set(r, n, i, s);
    return r === h(s) && (a ? er(i, o) && P(r, "set", n, i, o) : P(r, "add", n, i)), c;
  };
}
function Zn(e, t) {
  const r = de(e, t), n = e[t], i = Reflect.deleteProperty(e, t);
  return i && r && P(e, "delete", t, void 0, n), i;
}
function Xn(e, t) {
  const r = Reflect.has(e, t);
  return (!Ze(t) || !nr.has(t)) && E(e, "has", t), r;
}
function ei(e) {
  return E(e, "iterate", j(e) ? "length" : R), Reflect.ownKeys(e);
}
var sr = {
  get: Wn,
  set: Jn,
  deleteProperty: Zn,
  has: Xn,
  ownKeys: ei
}, or = {
  get: Gn,
  set(e, t) {
    return console.warn(`Set operation on key "${String(t)}" failed: target is readonly.`, e), !0;
  },
  deleteProperty(e, t) {
    return console.warn(`Delete operation on key "${String(t)}" failed: target is readonly.`, e), !0;
  }
};
Qt({}, sr, {
  get: Un,
  set: Qn
});
Qt({}, or, {
  get: Yn
});
var tt = (e) => _e(e) ? it(e) : e, rt = (e) => _e(e) ? yr(e) : e, nt = (e) => e, he = (e) => Reflect.getPrototypeOf(e);
function ge(e, t, r = !1, n = !1) {
  e = e.__v_raw;
  const i = h(e), s = h(t);
  t !== s && !r && E(i, "get", t), !r && E(i, "get", s);
  const { has: o } = he(i), a = n ? nt : r ? rt : tt;
  if (o.call(i, t))
    return a(e.get(t));
  if (o.call(i, s))
    return a(e.get(s));
  e !== i && e.get(t);
}
function ve(e, t = !1) {
  const r = this.__v_raw, n = h(r), i = h(e);
  return e !== i && !t && E(n, "has", e), !t && E(n, "has", i), e === i ? r.has(e) : r.has(e) || r.has(i);
}
function xe(e, t = !1) {
  return e = e.__v_raw, !t && E(h(e), "iterate", R), Reflect.get(e, "size", e);
}
function ar(e) {
  e = h(e);
  const t = h(this);
  return he(t).has.call(t, e) || (t.add(e), P(t, "add", e, e)), this;
}
function cr(e, t) {
  t = h(t);
  const r = h(this), { has: n, get: i } = he(r);
  let s = n.call(r, e);
  s ? gr(r, n, e) : (e = h(e), s = n.call(r, e));
  const o = i.call(r, e);
  return r.set(e, t), s ? er(t, o) && P(r, "set", e, t, o) : P(r, "add", e, t), this;
}
function ur(e) {
  const t = h(this), { has: r, get: n } = he(t);
  let i = r.call(t, e);
  i ? gr(t, r, e) : (e = h(e), i = r.call(t, e));
  const s = n ? n.call(t, e) : void 0, o = t.delete(e);
  return i && P(t, "delete", e, void 0, s), o;
}
function lr() {
  const e = h(this), t = e.size !== 0, r = G(e) ? new Map(e) : new Set(e), n = e.clear();
  return t && P(e, "clear", void 0, void 0, r), n;
}
function ye(e, t) {
  return function(n, i) {
    const s = this, o = s.__v_raw, a = h(o), c = t ? nt : e ? rt : tt;
    return !e && E(a, "iterate", R), o.forEach((u, l) => n.call(i, c(u), c(l), s));
  };
}
function re(e, t, r) {
  return function(...n) {
    const i = this.__v_raw, s = h(i), o = G(s), a = e === "entries" || e === Symbol.iterator && o, c = e === "keys" && o, u = i[e](...n), l = r ? nt : t ? rt : tt;
    return !t && E(s, "iterate", c ? Ke : R), {
      next() {
        const { value: d, done: p } = u.next();
        return p ? { value: d, done: p } : {
          value: a ? [l(d[0]), l(d[1])] : l(d),
          done: p
        };
      },
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function M(e) {
  return function(...t) {
    {
      const r = t[0] ? `on key "${t[0]}" ` : "";
      console.warn(`${Ln(e)} operation ${r}failed: target is readonly.`, h(this));
    }
    return e === "delete" ? !1 : this;
  };
}
var fr = {
  get(e) {
    return ge(this, e);
  },
  get size() {
    return xe(this);
  },
  has: ve,
  add: ar,
  set: cr,
  delete: ur,
  clear: lr,
  forEach: ye(!1, !1)
}, dr = {
  get(e) {
    return ge(this, e, !1, !0);
  },
  get size() {
    return xe(this);
  },
  has: ve,
  add: ar,
  set: cr,
  delete: ur,
  clear: lr,
  forEach: ye(!1, !0)
}, _r = {
  get(e) {
    return ge(this, e, !0);
  },
  get size() {
    return xe(this, !0);
  },
  has(e) {
    return ve.call(this, e, !0);
  },
  add: M("add"),
  set: M("set"),
  delete: M("delete"),
  clear: M("clear"),
  forEach: ye(!0, !1)
}, pr = {
  get(e) {
    return ge(this, e, !0, !0);
  },
  get size() {
    return xe(this, !0);
  },
  has(e) {
    return ve.call(this, e, !0);
  },
  add: M("add"),
  set: M("set"),
  delete: M("delete"),
  clear: M("clear"),
  forEach: ye(!0, !0)
}, ti = ["keys", "values", "entries", Symbol.iterator];
ti.forEach((e) => {
  fr[e] = re(e, !1, !1), _r[e] = re(e, !0, !1), dr[e] = re(e, !1, !0), pr[e] = re(e, !0, !0);
});
function hr(e, t) {
  const r = t ? e ? pr : dr : e ? _r : fr;
  return (n, i, s) => i === "__v_isReactive" ? !e : i === "__v_isReadonly" ? e : i === "__v_raw" ? n : Reflect.get(de(r, i) && i in n ? r : n, i, s);
}
var ri = {
  get: hr(!1, !1)
}, ni = {
  get: hr(!0, !1)
};
function gr(e, t, r) {
  const n = h(r);
  if (n !== r && t.call(e, n)) {
    const i = Xt(e);
    console.warn(`Reactive ${i} contains both the raw and reactive versions of the same object${i === "Map" ? " as keys" : ""}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`);
  }
}
var vr = /* @__PURE__ */ new WeakMap(), ii = /* @__PURE__ */ new WeakMap(), xr = /* @__PURE__ */ new WeakMap(), si = /* @__PURE__ */ new WeakMap();
function oi(e) {
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
function ai(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : oi(Xt(e));
}
function it(e) {
  return e && e.__v_isReadonly ? e : mr(e, !1, sr, ri, vr);
}
function yr(e) {
  return mr(e, !0, or, ni, xr);
}
function mr(e, t, r, n, i) {
  if (!_e(e))
    return console.warn(`value cannot be made reactive: ${String(e)}`), e;
  if (e.__v_raw && !(t && e.__v_isReactive))
    return e;
  const s = i.get(e);
  if (s)
    return s;
  const o = ai(e);
  if (o === 0)
    return e;
  const a = new Proxy(e, o === 2 ? n : r);
  return i.set(e, a), a;
}
function h(e) {
  return e && h(e.__v_raw) || e;
}
function De(e) {
  return !!(e && e.__v_isRef === !0);
}
A("nextTick", () => Vt);
A("dispatch", (e) => U.bind(U, e));
A("watch", (e, { evaluateLater: t, effect: r }) => (n, i) => {
  let s = t(n), o = !0, a, c = r(() => s((u) => {
    JSON.stringify(u), o ? a = u : queueMicrotask(() => {
      i(u, a), a = u;
    }), o = !1;
  }));
  e._x_effects.delete(c);
});
A("store", Sn);
A("data", (e) => mt(e));
A("root", (e) => ce(e));
A("refs", (e) => (e._x_refs_proxy || (e._x_refs_proxy = Z(ci(e))), e._x_refs_proxy));
function ci(e) {
  let t = [], r = e;
  for (; r; )
    r._x_refs && t.push(r._x_refs), r = r.parentNode;
  return t;
}
var Ee = {};
function wr(e) {
  return Ee[e] || (Ee[e] = 0), ++Ee[e];
}
function ui(e, t) {
  return ue(e, (r) => {
    if (r._x_ids && r._x_ids[t])
      return !0;
  });
}
function li(e, t) {
  e._x_ids || (e._x_ids = {}), e._x_ids[t] || (e._x_ids[t] = wr(t));
}
A("id", (e) => (t, r = null) => {
  let n = ui(e, t), i = n ? n._x_ids[t] : wr(t);
  return r ? `${t}-${i}-${r}` : `${t}-${i}`;
});
A("el", (e) => e);
br("Focus", "focus", "focus");
br("Persist", "persist", "persist");
function br(e, t, r) {
  A(t, (n) => K(`You can't use [$${directiveName}] without first installing the "${e}" plugin here: https://alpinejs.dev/plugins/${r}`, n));
}
v("modelable", (e, { expression: t }, { effect: r, evaluateLater: n }) => {
  let i = n(t), s = () => {
    let u;
    return i((l) => u = l), u;
  }, o = n(`${t} = __placeholder`), a = (u) => o(() => {
  }, { scope: { __placeholder: u } }), c = s();
  a(c), queueMicrotask(() => {
    if (!e._x_model)
      return;
    e._x_removeModelListeners.default();
    let u = e._x_model.get, l = e._x_model.set;
    r(() => a(u())), r(() => l(s()));
  });
});
v("teleport", (e, { expression: t }, { cleanup: r }) => {
  e.tagName.toLowerCase() !== "template" && K("x-teleport can only be used on a <template> tag", e);
  let n = document.querySelector(t);
  n || K(`Cannot find x-teleport element for selector: "${t}"`);
  let i = e.content.cloneNode(!0).firstElementChild;
  e._x_teleport = i, i._x_teleportBack = e, e._x_forwardEvents && e._x_forwardEvents.forEach((s) => {
    i.addEventListener(s, (o) => {
      o.stopPropagation(), e.dispatchEvent(new o.constructor(o.type, o));
    });
  }), Q(i, {}, e), y(() => {
    n.appendChild(i), T(i), i._x_ignore = !0;
  }), r(() => i.remove());
});
var Er = () => {
};
Er.inline = (e, { modifiers: t }, { cleanup: r }) => {
  t.includes("self") ? e._x_ignoreSelf = !0 : e._x_ignore = !0, r(() => {
    t.includes("self") ? delete e._x_ignoreSelf : delete e._x_ignore;
  });
};
v("ignore", Er);
v("effect", (e, { expression: t }, { effect: r }) => r(m(e, t)));
function Ar(e, t, r, n) {
  let i = e, s = (c) => n(c), o = {}, a = (c, u) => (l) => u(c, l);
  if (r.includes("dot") && (t = fi(t)), r.includes("camel") && (t = di(t)), r.includes("passive") && (o.passive = !0), r.includes("capture") && (o.capture = !0), r.includes("window") && (i = window), r.includes("document") && (i = document), r.includes("prevent") && (s = a(s, (c, u) => {
    u.preventDefault(), c(u);
  })), r.includes("stop") && (s = a(s, (c, u) => {
    u.stopPropagation(), c(u);
  })), r.includes("self") && (s = a(s, (c, u) => {
    u.target === e && c(u);
  })), (r.includes("away") || r.includes("outside")) && (i = document, s = a(s, (c, u) => {
    e.contains(u.target) || u.target.isConnected !== !1 && (e.offsetWidth < 1 && e.offsetHeight < 1 || e._x_isShown !== !1 && c(u));
  })), r.includes("once") && (s = a(s, (c, u) => {
    c(u), i.removeEventListener(t, s, o);
  })), s = a(s, (c, u) => {
    pi(t) && hi(u, r) || c(u);
  }), r.includes("debounce")) {
    let c = r[r.indexOf("debounce") + 1] || "invalid-wait", u = ke(c.split("ms")[0]) ? Number(c.split("ms")[0]) : 250;
    s = Wt(s, u);
  }
  if (r.includes("throttle")) {
    let c = r[r.indexOf("throttle") + 1] || "invalid-wait", u = ke(c.split("ms")[0]) ? Number(c.split("ms")[0]) : 250;
    s = Ut(s, u);
  }
  return i.addEventListener(t, s, o), () => {
    i.removeEventListener(t, s, o);
  };
}
function fi(e) {
  return e.replace(/-/g, ".");
}
function di(e) {
  return e.toLowerCase().replace(/-(\w)/g, (t, r) => r.toUpperCase());
}
function ke(e) {
  return !Array.isArray(e) && !isNaN(e);
}
function _i(e) {
  return e.replace(/([a-z])([A-Z])/g, "$1-$2").replace(/[_\s]/, "-").toLowerCase();
}
function pi(e) {
  return ["keydown", "keyup"].includes(e);
}
function hi(e, t) {
  let r = t.filter((s) => !["window", "document", "prevent", "stop", "once"].includes(s));
  if (r.includes("debounce")) {
    let s = r.indexOf("debounce");
    r.splice(s, ke((r[s + 1] || "invalid-wait").split("ms")[0]) ? 2 : 1);
  }
  if (r.length === 0 || r.length === 1 && lt(e.key).includes(r[0]))
    return !1;
  const i = ["ctrl", "shift", "alt", "meta", "cmd", "super"].filter((s) => r.includes(s));
  return r = r.filter((s) => !i.includes(s)), !(i.length > 0 && i.filter((o) => ((o === "cmd" || o === "super") && (o = "meta"), e[`${o}Key`])).length === i.length && lt(e.key).includes(r[0]));
}
function lt(e) {
  if (!e)
    return [];
  e = _i(e);
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
  return t[e] = e, Object.keys(t).map((r) => {
    if (t[r] === e)
      return r;
  }).filter((r) => r);
}
v("model", (e, { modifiers: t, expression: r }, { effect: n, cleanup: i }) => {
  let s = m(e, r), o = `${r} = rightSideOfExpression($event, ${r})`, a = m(e, o);
  var c = e.tagName.toLowerCase() === "select" || ["checkbox", "radio"].includes(e.type) || t.includes("lazy") ? "change" : "input";
  let u = gi(e, t, r), l = Ar(e, c, t, (p) => {
    a(() => {
    }, { scope: {
      $event: p,
      rightSideOfExpression: u
    } });
  });
  e._x_removeModelListeners || (e._x_removeModelListeners = {}), e._x_removeModelListeners.default = l, i(() => e._x_removeModelListeners.default());
  let d = m(e, `${r} = __placeholder`);
  e._x_model = {
    get() {
      let p;
      return s((b) => p = b), p;
    },
    set(p) {
      d(() => {
      }, { scope: { __placeholder: p } });
    }
  }, e._x_forceModelUpdate = () => {
    s((p) => {
      p === void 0 && r.match(/\./) && (p = ""), window.fromModel = !0, y(() => Ht(e, "value", p)), delete window.fromModel;
    });
  }, n(() => {
    t.includes("unintrusive") && document.activeElement.isSameNode(e) || e._x_forceModelUpdate();
  });
});
function gi(e, t, r) {
  return e.type === "radio" && y(() => {
    e.hasAttribute("name") || e.setAttribute("name", r);
  }), (n, i) => y(() => {
    if (n instanceof CustomEvent && n.detail !== void 0)
      return n.detail || n.target.value;
    if (e.type === "checkbox")
      if (Array.isArray(i)) {
        let s = t.includes("number") ? Ae(n.target.value) : n.target.value;
        return n.target.checked ? i.concat([s]) : i.filter((o) => !vi(o, s));
      } else
        return n.target.checked;
    else {
      if (e.tagName.toLowerCase() === "select" && e.multiple)
        return t.includes("number") ? Array.from(n.target.selectedOptions).map((s) => {
          let o = s.value || s.text;
          return Ae(o);
        }) : Array.from(n.target.selectedOptions).map((s) => s.value || s.text);
      {
        let s = n.target.value;
        return t.includes("number") ? Ae(s) : t.includes("trim") ? s.trim() : s;
      }
    }
  });
}
function Ae(e) {
  let t = e ? parseFloat(e) : null;
  return xi(t) ? t : e;
}
function vi(e, t) {
  return e == t;
}
function xi(e) {
  return !Array.isArray(e) && !isNaN(e);
}
v("cloak", (e) => queueMicrotask(() => y(() => e.removeAttribute(z("cloak")))));
kt(() => `[${z("init")}]`);
v("init", fe((e, { expression: t }, { evaluate: r }) => typeof t == "string" ? !!t.trim() && r(t, {}, !1) : r(t, {}, !1)));
v("text", (e, { expression: t }, { effect: r, evaluateLater: n }) => {
  let i = n(t);
  r(() => {
    i((s) => {
      y(() => {
        e.textContent = s;
      });
    });
  });
});
v("html", (e, { expression: t }, { effect: r, evaluateLater: n }) => {
  let i = n(t);
  r(() => {
    i((s) => {
      y(() => {
        e.innerHTML = s, e._x_ignoreSelf = !0, T(e), delete e._x_ignoreSelf;
      });
    });
  });
});
Ge(Pt(":", $t(z("bind:"))));
v("bind", (e, { value: t, modifiers: r, expression: n, original: i }, { effect: s }) => {
  if (!t) {
    let a = {};
    Cn(a), m(e, n)((u) => {
      Yt(e, u, i);
    }, { scope: a });
    return;
  }
  if (t === "key")
    return yi(e, n);
  let o = m(e, n);
  s(() => o((a) => {
    a === void 0 && typeof n == "string" && n.match(/\./) && (a = ""), y(() => Ht(e, t, a, r));
  }));
});
function yi(e, t) {
  e._x_keyExpression = t;
}
Dt(() => `[${z("data")}]`);
v("data", fe((e, { expression: t }, { cleanup: r }) => {
  t = t === "" ? "{}" : t;
  let n = {};
  Pe(n, e);
  let i = {};
  Tn(i, n);
  let s = L(e, t, { scope: i });
  s === void 0 && (s = {}), Pe(s, e);
  let o = k(s);
  wt(o);
  let a = Q(e, o);
  o.init && L(e, o.init), r(() => {
    o.destroy && L(e, o.destroy), a();
  });
}));
v("show", (e, { modifiers: t, expression: r }, { effect: n }) => {
  let i = m(e, r);
  e._x_doHide || (e._x_doHide = () => {
    y(() => {
      e.style.setProperty("display", "none", t.includes("important") ? "important" : void 0);
    });
  }), e._x_doShow || (e._x_doShow = () => {
    y(() => {
      e.style.length === 1 && e.style.display === "none" ? e.removeAttribute("style") : e.style.removeProperty("display");
    });
  });
  let s = () => {
    e._x_doHide(), e._x_isShown = !1;
  }, o = () => {
    e._x_doShow(), e._x_isShown = !0;
  }, a = () => setTimeout(o), c = Ne((d) => d ? o() : s(), (d) => {
    typeof e._x_toggleAndCascadeWithTransitions == "function" ? e._x_toggleAndCascadeWithTransitions(e, d, o, s) : d ? a() : s();
  }), u, l = !0;
  n(() => i((d) => {
    !l && d === u || (t.includes("immediate") && (d ? a() : s()), c(d), u = d, l = !1);
  }));
});
v("for", (e, { expression: t }, { effect: r, cleanup: n }) => {
  let i = wi(t), s = m(e, i.items), o = m(e, e._x_keyExpression || "index");
  e._x_prevKeys = [], e._x_lookup = {}, r(() => mi(e, i, s, o)), n(() => {
    Object.values(e._x_lookup).forEach((a) => a.remove()), delete e._x_prevKeys, delete e._x_lookup;
  });
});
function mi(e, t, r, n) {
  let i = (o) => typeof o == "object" && !Array.isArray(o), s = e;
  r((o) => {
    bi(o) && o >= 0 && (o = Array.from(Array(o).keys(), (f) => f + 1)), o === void 0 && (o = []);
    let a = e._x_lookup, c = e._x_prevKeys, u = [], l = [];
    if (i(o))
      o = Object.entries(o).map(([f, _]) => {
        let g = ft(t, _, f, o);
        n((x) => l.push(x), { scope: { index: f, ...g } }), u.push(g);
      });
    else
      for (let f = 0; f < o.length; f++) {
        let _ = ft(t, o[f], f, o);
        n((g) => l.push(g), { scope: { index: f, ..._ } }), u.push(_);
      }
    let d = [], p = [], b = [], C = [];
    for (let f = 0; f < c.length; f++) {
      let _ = c[f];
      l.indexOf(_) === -1 && b.push(_);
    }
    c = c.filter((f) => !b.includes(f));
    let V = "template";
    for (let f = 0; f < l.length; f++) {
      let _ = l[f], g = c.indexOf(_);
      if (g === -1)
        c.splice(f, 0, _), d.push([V, f]);
      else if (g !== f) {
        let x = c.splice(f, 1)[0], w = c.splice(g - 1, 1)[0];
        c.splice(f, 0, w), c.splice(g, 0, x), p.push([x, w]);
      } else
        C.push(_);
      V = _;
    }
    for (let f = 0; f < b.length; f++) {
      let _ = b[f];
      a[_]._x_effects && a[_]._x_effects.forEach(dt), a[_].remove(), a[_] = null, delete a[_];
    }
    for (let f = 0; f < p.length; f++) {
      let [_, g] = p[f], x = a[_], w = a[g], O = document.createElement("div");
      y(() => {
        w.after(O), x.after(w), w._x_currentIfEl && w.after(w._x_currentIfEl), O.before(x), x._x_currentIfEl && x.after(x._x_currentIfEl), O.remove();
      }), ot(w, u[l.indexOf(g)]);
    }
    for (let f = 0; f < d.length; f++) {
      let [_, g] = d[f], x = _ === "template" ? s : a[_];
      x._x_currentIfEl && (x = x._x_currentIfEl);
      let w = u[g], O = l[g], ee = document.importNode(s.content, !0).firstElementChild;
      Q(ee, k(w), s), y(() => {
        x.after(ee), T(ee);
      }), typeof O == "object" && K("x-for key cannot be an object, it must be a string or an integer", s), a[O] = ee;
    }
    for (let f = 0; f < C.length; f++)
      ot(a[C[f]], u[l.indexOf(C[f])]);
    s._x_prevKeys = l;
  });
}
function wi(e) {
  let t = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/, r = /^\s*\(|\)\s*$/g, n = /([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/, i = e.match(n);
  if (!i)
    return;
  let s = {};
  s.items = i[2].trim();
  let o = i[1].replace(r, "").trim(), a = o.match(t);
  return a ? (s.item = o.replace(t, "").trim(), s.index = a[1].trim(), a[2] && (s.collection = a[2].trim())) : s.item = o, s;
}
function ft(e, t, r, n) {
  let i = {};
  return /^\[.*\]$/.test(e.item) && Array.isArray(t) ? e.item.replace("[", "").replace("]", "").split(",").map((o) => o.trim()).forEach((o, a) => {
    i[o] = t[a];
  }) : /^\{.*\}$/.test(e.item) && !Array.isArray(t) && typeof t == "object" ? e.item.replace("{", "").replace("}", "").split(",").map((o) => o.trim()).forEach((o) => {
    i[o] = t[o];
  }) : i[e.item] = t, e.index && (i[e.index] = r), e.collection && (i[e.collection] = n), i;
}
function bi(e) {
  return !Array.isArray(e) && !isNaN(e);
}
function Sr() {
}
Sr.inline = (e, { expression: t }, { cleanup: r }) => {
  let n = ce(e);
  n._x_refs || (n._x_refs = {}), n._x_refs[t] = e, r(() => delete n._x_refs[t]);
};
v("ref", Sr);
v("if", (e, { expression: t }, { effect: r, cleanup: n }) => {
  let i = m(e, t), s = () => {
    if (e._x_currentIfEl)
      return e._x_currentIfEl;
    let a = e.content.cloneNode(!0).firstElementChild;
    return Q(a, {}, e), y(() => {
      e.after(a), T(a);
    }), e._x_currentIfEl = a, e._x_undoIf = () => {
      N(a, (c) => {
        c._x_effects && c._x_effects.forEach(dt);
      }), a.remove(), delete e._x_currentIfEl;
    }, a;
  }, o = () => {
    e._x_undoIf && (e._x_undoIf(), delete e._x_undoIf);
  };
  r(() => i((a) => {
    a ? s() : o();
  })), n(() => e._x_undoIf && e._x_undoIf());
});
v("id", (e, { expression: t }, { evaluate: r }) => {
  r(t).forEach((i) => li(e, i));
});
Ge(Pt("@", $t(z("on:"))));
v("on", fe((e, { value: t, modifiers: r, expression: n }, { cleanup: i }) => {
  let s = n ? m(e, n) : () => {
  };
  e.tagName.toLowerCase() === "template" && (e._x_forwardEvents || (e._x_forwardEvents = []), e._x_forwardEvents.includes(t) || e._x_forwardEvents.push(t));
  let o = Ar(e, t, r, (a) => {
    s(() => {
    }, { scope: { $event: a }, params: [a] });
  });
  i(() => o());
}));
me("Collapse", "collapse", "collapse");
me("Intersect", "intersect", "intersect");
me("Focus", "trap", "focus");
me("Mask", "mask", "mask");
function me(e, t, r) {
  v(t, (n) => K(`You can't use [x-${t}] without first installing the "${e}" plugin here: https://alpinejs.dev/plugins/${r}`, n));
}
X.setEvaluator(St);
X.setReactivityEngine({ reactive: it, effect: Kn, release: Dn, raw: h });
var Ei = X, Ai = Ei;
function Si(e) {
  return {
    /**
     * Create, register, and return a reference to a global Alpine.Store.
     * @param {string} key - Descriptive key for the Alpine.Store registry.
     * @param {object} data - Initial data for the store.
     * @returns {unknown} Reference to the registered store.
     */
    createStore(t, r) {
      return e.store(t, r), e.store(t);
    }
  };
}
function Oi(e, t) {
  return {
    /**
     * Tracks an event with FullStory.
     * @param {string} eventName - The name of the event to track.
     * @param {object} eventProperties - The properties to include in the tracked event.
     * @returns {void}
     */
    track(r, n = {}) {
      try {
        e && e.event(r, {
          ...this._defaultTrackingProperties,
          ...n
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
      let r = {};
      if (t.addressViewModel && t.addressViewModel.hasParcelDetails) {
        const n = {
          address_str: t.addressViewModel.parcelDetails.address,
          address_city_str: t.addressViewModel.parcelDetails.city,
          address_state_str: t.addressViewModel.parcelDetails.state,
          address_zip_str: t.addressViewModel.parcelDetails.zip,
          parcel_apn_str: t.addressViewModel.parcelDetails.apn,
          parcel_jurisdiction_str: t.addressViewModel.parcelDetails.jurisdiction
        };
        r = {
          ...r,
          ...n
        };
      } else if (t.addressViewModel && t.addressViewModel.selectedMatch) {
        const n = {
          address_str: t.addressViewModel.selectedMatch.address,
          address_context_str: t.addressViewModel.selectedMatch.context,
          regrid_ll_uuid_str: t.addressViewModel.selectedMatch.ll_uuid
        };
        r = {
          ...r,
          ...n
        };
      }
      if (t.estimateViewModel && t.estimateViewModel.hasEstimateResults) {
        const n = {
          jurisdiction_status_str: t.estimateViewModel.jurisdiction.status,
          estimate_low_real: t.estimateViewModel.estimate.low,
          estimate_high_real: t.estimateViewModel.estimate.high
        };
        r = {
          ...r,
          ...n
        };
      }
      if (t.contactViewModel && t.contactViewModel.hasAnyContactDetails) {
        const n = {
          contact_first_name_str: t.contactViewModel.firstName,
          contact_last_name_str: t.contactViewModel.lastName,
          contact_email_str: t.contactViewModel.email,
          contact_phone_str: t.contactViewModel.phone,
          contact_desired_timeline_str: t.contactViewModel.desiredTimeline
        };
        r = {
          ...r,
          ...n
        };
      }
      return t.experimentationViewModel && t.experimentationViewModel.activeExperimentVariations && (r.active_experiment_variations_strs = Object.entries(
        t.experimentationViewModel.activeExperimentVariations
      ).map(([n, i]) => `${n}:${i}`)), r;
    }
  };
}
function Ci(e, t, r) {
  var i, s;
  let n = r;
  return (!n || !(e != null && e.states[n])) && (n = e == null ? void 0 : e.defaultState), {
    value: n,
    STATES: ((i = e == null ? void 0 : e.constants) == null ? void 0 : i.STATES) || {},
    EVENTS: ((s = e == null ? void 0 : e.constants) == null ? void 0 : s.EVENTS) || {},
    /**
     * Transition to a new state, based on the current state and a valid transition event.
     * @param {string} event - Event to trigger the desired state transition.
     * @param {object} [eventProperties] - Optional: Additional context to pass to transition effects, tracking service, etc.
     * @returns {void}
     */
    transition(o, a = {}) {
      var f, _, g, x, w, O;
      const c = this.value, u = (f = e == null ? void 0 : e.states) == null ? void 0 : f[c];
      let l = (_ = u == null ? void 0 : u.transitions) == null ? void 0 : _[o];
      typeof l == "function" && (l = l(a));
      const d = l == null ? void 0 : l.target, p = (g = e == null ? void 0 : e.states) == null ? void 0 : g[d];
      if (!u || !l || !d || !p) {
        t.track("Invalid State Transition", {
          ...a,
          current_state_str: c,
          event_str: o
        });
        return;
      }
      const b = (x = u.effects) == null ? void 0 : x.onExit;
      Se(b, a);
      const C = (w = l.effects) == null ? void 0 : w.onTransition;
      Se(C, a), this.value = d;
      const V = (O = p.effects) == null ? void 0 : O.onEntry;
      Se(V, a);
    }
  };
}
function Se(e, t = {}) {
  e && e.length && e.forEach((r) => {
    r(t);
  });
}
export {
  Si as a,
  Oi as b,
  Ci as c,
  Ai as m
};
