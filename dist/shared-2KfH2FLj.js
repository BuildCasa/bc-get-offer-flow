var Oe = !1, Me = !1, $ = [];
function Mr(e) {
  Cr(e);
}
function Cr(e) {
  $.includes(e) || $.push(e), Tr();
}
function pt(e) {
  let t = $.indexOf(e);
  t !== -1 && $.splice(t, 1);
}
function Tr() {
  !Me && !Oe && (Oe = !0, queueMicrotask(Pr));
}
function Pr() {
  Oe = !1, Me = !0;
  for (let e = 0; e < $.length; e++)
    $[e]();
  $.length = 0, Me = !1;
}
var K, Y, oe, _t, Ce = !0;
function Rr(e) {
  Ce = !1, e(), Ce = !0;
}
function $r(e) {
  K = e.reactive, oe = e.release, Y = (t) => e.effect(t, { scheduler: (r) => {
    Ce ? Mr(r) : r();
  } }), _t = e.raw;
}
function at(e) {
  Y = e;
}
function Ir(e) {
  let t = () => {
  };
  return [(n) => {
    let i = Y(n);
    return e._x_effects || (e._x_effects = /* @__PURE__ */ new Set(), e._x_runEffects = () => {
      e._x_effects.forEach((s) => s());
    }), e._x_effects.add(i), t = () => {
      i !== void 0 && (e._x_effects.delete(i), oe(i));
    }, i;
  }, () => {
    t();
  }];
}
var ht = [], gt = [], vt = [];
function jr(e) {
  vt.push(e);
}
function xt(e, t) {
  typeof t == "function" ? (e._x_cleanups || (e._x_cleanups = []), e._x_cleanups.push(t)) : (t = e, gt.push(t));
}
function Lr(e) {
  ht.push(e);
}
function Fr(e, t, r) {
  e._x_attributeCleanups || (e._x_attributeCleanups = {}), e._x_attributeCleanups[t] || (e._x_attributeCleanups[t] = []), e._x_attributeCleanups[t].push(r);
}
function mt(e, t) {
  e._x_attributeCleanups && Object.entries(e._x_attributeCleanups).forEach(([r, n]) => {
    (t === void 0 || t.includes(r)) && (n.forEach((i) => i()), delete e._x_attributeCleanups[r]);
  });
}
var ze = new MutationObserver(He), Be = !1;
function yt() {
  ze.observe(document, { subtree: !0, childList: !0, attributes: !0, attributeOldValue: !0 }), Be = !0;
}
function Nr() {
  kr(), ze.disconnect(), Be = !1;
}
var W = [], we = !1;
function kr() {
  W = W.concat(ze.takeRecords()), W.length && !we && (we = !0, queueMicrotask(() => {
    Vr(), we = !1;
  }));
}
function Vr() {
  He(W), W.length = 0;
}
function x(e) {
  if (!Be)
    return e();
  Nr();
  let t = e();
  return yt(), t;
}
var qe = !1, ie = [];
function Dr() {
  qe = !0;
}
function Kr() {
  qe = !1, He(ie), ie = [];
}
function He(e) {
  if (qe) {
    ie = ie.concat(e);
    return;
  }
  let t = [], r = [], n = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map();
  for (let s = 0; s < e.length; s++)
    if (!e[s].target._x_ignoreMutationObserver && (e[s].type === "childList" && (e[s].addedNodes.forEach((a) => a.nodeType === 1 && t.push(a)), e[s].removedNodes.forEach((a) => a.nodeType === 1 && r.push(a))), e[s].type === "attributes")) {
      let a = e[s].target, o = e[s].attributeName, c = e[s].oldValue, u = () => {
        n.has(a) || n.set(a, []), n.get(a).push({ name: o, value: a.getAttribute(o) });
      }, l = () => {
        i.has(a) || i.set(a, []), i.get(a).push(o);
      };
      a.hasAttribute(o) && c === null ? u() : a.hasAttribute(o) ? (l(), u()) : l();
    }
  i.forEach((s, a) => {
    mt(a, s);
  }), n.forEach((s, a) => {
    ht.forEach((o) => o(a, s));
  });
  for (let s of r)
    if (!t.includes(s) && (gt.forEach((a) => a(s)), s._x_cleanups))
      for (; s._x_cleanups.length; )
        s._x_cleanups.pop()();
  t.forEach((s) => {
    s._x_ignoreSelf = !0, s._x_ignore = !0;
  });
  for (let s of t)
    r.includes(s) || s.isConnected && (delete s._x_ignoreSelf, delete s._x_ignore, vt.forEach((a) => a(s)), s._x_ignore = !0, s._x_ignoreSelf = !0);
  t.forEach((s) => {
    delete s._x_ignoreSelf, delete s._x_ignore;
  }), t = null, r = null, n = null, i = null;
}
function wt(e) {
  return Q(k(e));
}
function Z(e, t, r) {
  return e._x_dataStack = [t, ...k(r || e)], () => {
    e._x_dataStack = e._x_dataStack.filter((n) => n !== t);
  };
}
function ot(e, t) {
  let r = e._x_dataStack[0];
  Object.entries(t).forEach(([n, i]) => {
    r[n] = i;
  });
}
function k(e) {
  return e._x_dataStack ? e._x_dataStack : typeof ShadowRoot == "function" && e instanceof ShadowRoot ? k(e.host) : e.parentNode ? k(e.parentNode) : [];
}
function Q(e) {
  let t = new Proxy({}, {
    ownKeys: () => Array.from(new Set(e.flatMap((r) => Object.keys(r)))),
    has: (r, n) => e.some((i) => i.hasOwnProperty(n)),
    get: (r, n) => (e.find((i) => {
      if (i.hasOwnProperty(n)) {
        let s = Object.getOwnPropertyDescriptor(i, n);
        if (s.get && s.get._x_alreadyBound || s.set && s.set._x_alreadyBound)
          return !0;
        if ((s.get || s.set) && s.enumerable) {
          let a = s.get, o = s.set, c = s;
          a = a && a.bind(t), o = o && o.bind(t), a && (a._x_alreadyBound = !0), o && (o._x_alreadyBound = !0), Object.defineProperty(i, n, {
            ...c,
            get: a,
            set: o
          });
        }
        return !0;
      }
      return !1;
    }) || {})[n],
    set: (r, n, i) => {
      let s = e.find((a) => a.hasOwnProperty(n));
      return s ? s[n] = i : e[e.length - 1][n] = i, !0;
    }
  });
  return t;
}
function bt(e) {
  let t = (n) => typeof n == "object" && !Array.isArray(n) && n !== null, r = (n, i = "") => {
    Object.entries(Object.getOwnPropertyDescriptors(n)).forEach(([s, { value: a, enumerable: o }]) => {
      if (o === !1 || a === void 0)
        return;
      let c = i === "" ? s : `${i}.${s}`;
      typeof a == "object" && a !== null && a._x_interceptor ? n[s] = a.initialize(e, c, s) : t(a) && a !== n && !(a instanceof Element) && r(a, c);
    });
  };
  return r(e);
}
function Et(e, t = () => {
}) {
  let r = {
    initialValue: void 0,
    _x_interceptor: !0,
    initialize(n, i, s) {
      return e(this.initialValue, () => zr(n, i), (a) => Te(n, i, a), i, s);
    }
  };
  return t(r), (n) => {
    if (typeof n == "object" && n !== null && n._x_interceptor) {
      let i = r.initialize.bind(r);
      r.initialize = (s, a, o) => {
        let c = n.initialize(s, a, o);
        return r.initialValue = c, i(s, a, o);
      };
    } else
      r.initialValue = n;
    return r;
  };
}
function zr(e, t) {
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
var At = {};
function A(e, t) {
  At[e] = t;
}
function Pe(e, t) {
  return Object.entries(At).forEach(([r, n]) => {
    Object.defineProperty(e, `$${r}`, {
      get() {
        let [i, s] = Pt(t);
        return i = { interceptor: Et, ...i }, xt(t, s), n(t, i);
      },
      enumerable: !1
    });
  }), e;
}
function Br(e, t, r, ...n) {
  try {
    return r(...n);
  } catch (i) {
    J(i, e, t);
  }
}
function J(e, t, r = void 0) {
  Object.assign(e, { el: t, expression: r }), console.warn(`Alpine Expression Error: ${e.message}

${r ? 'Expression: "' + r + `"

` : ""}`, t), setTimeout(() => {
    throw e;
  }, 0);
}
var ne = !0;
function qr(e) {
  let t = ne;
  ne = !1, e(), ne = t;
}
function N(e, t, r = {}) {
  let n;
  return y(e, t)((i) => n = i, r), n;
}
function y(...e) {
  return St(...e);
}
var St = Ot;
function Hr(e) {
  St = e;
}
function Ot(e, t) {
  let r = {};
  Pe(r, e);
  let n = [r, ...k(e)];
  if (typeof t == "function")
    return Wr(n, t);
  let i = Gr(n, t, e);
  return Br.bind(null, e, t, i);
}
function Wr(e, t) {
  return (r = () => {
  }, { scope: n = {}, params: i = [] } = {}) => {
    let s = t.apply(Q([n, ...e]), i);
    se(r, s);
  };
}
var be = {};
function Ur(e, t) {
  if (be[e])
    return be[e];
  let r = Object.getPrototypeOf(async function() {
  }).constructor, n = /^[\n\s]*if.*\(.*\)/.test(e) || /^(let|const)\s/.test(e) ? `(() => { ${e} })()` : e, s = (() => {
    try {
      return new r(["__self", "scope"], `with (scope) { __self.result = ${n} }; __self.finished = true; return __self.result;`);
    } catch (a) {
      return J(a, t, e), Promise.resolve();
    }
  })();
  return be[e] = s, s;
}
function Gr(e, t, r) {
  let n = Ur(t, r);
  return (i = () => {
  }, { scope: s = {}, params: a = [] } = {}) => {
    n.result = void 0, n.finished = !1;
    let o = Q([s, ...e]);
    if (typeof n == "function") {
      let c = n(n, o).catch((u) => J(u, r, t));
      n.finished ? (se(i, n.result, o, a, r), n.result = void 0) : c.then((u) => {
        se(i, u, o, a, r);
      }).catch((u) => J(u, r, t)).finally(() => n.result = void 0);
    }
  };
}
function se(e, t, r, n, i) {
  if (ne && typeof t == "function") {
    let s = t.apply(r, n);
    s instanceof Promise ? s.then((a) => se(e, a, r, n)).catch((a) => J(a, i, t)) : e(s);
  } else
    e(t);
}
var We = "x-";
function z(e = "") {
  return We + e;
}
function Jr(e) {
  We = e;
}
var Mt = {};
function v(e, t) {
  Mt[e] = t;
}
function Ue(e, t, r) {
  if (t = Array.from(t), e._x_virtualDirectives) {
    let s = Object.entries(e._x_virtualDirectives).map(([o, c]) => ({ name: o, value: c })), a = Ct(s);
    s = s.map((o) => a.find((c) => c.name === o.name) ? {
      name: `x-bind:${o.name}`,
      value: `"${o.value}"`
    } : o), t = t.concat(s);
  }
  let n = {};
  return t.map(It((s, a) => n[s] = a)).filter(Lt).map(Qr(n, r)).sort(Xr).map((s) => Zr(e, s));
}
function Ct(e) {
  return Array.from(e).map(It()).filter((t) => !Lt(t));
}
var Re = !1, H = /* @__PURE__ */ new Map(), Tt = Symbol();
function Yr(e) {
  Re = !0;
  let t = Symbol();
  Tt = t, H.set(t, []);
  let r = () => {
    for (; H.get(t).length; )
      H.get(t).shift()();
    H.delete(t);
  }, n = () => {
    Re = !1, r();
  };
  e(r), n();
}
function Pt(e) {
  let t = [], r = (o) => t.push(o), [n, i] = Ir(e);
  return t.push(i), [{
    Alpine: X,
    effect: n,
    cleanup: r,
    evaluateLater: y.bind(y, e),
    evaluate: N.bind(N, e)
  }, () => t.forEach((o) => o())];
}
function Zr(e, t) {
  let r = () => {
  }, n = Mt[t.type] || r, [i, s] = Pt(e);
  Fr(e, t.original, s);
  let a = () => {
    e._x_ignore || e._x_ignoreSelf || (n.inline && n.inline(e, t, i), n = n.bind(n, e, t, i), Re ? H.get(Tt).push(n) : n());
  };
  return a.runCleanups = s, a;
}
var Rt = (e, t) => ({ name: r, value: n }) => (r.startsWith(e) && (r = r.replace(e, t)), { name: r, value: n }), $t = (e) => e;
function It(e = () => {
}) {
  return ({ name: t, value: r }) => {
    let { name: n, value: i } = jt.reduce((s, a) => a(s), { name: t, value: r });
    return n !== t && e(n, t), { name: n, value: i };
  };
}
var jt = [];
function Ge(e) {
  jt.push(e);
}
function Lt({ name: e }) {
  return Ft().test(e);
}
var Ft = () => new RegExp(`^${We}([^:^.]+)\\b`);
function Qr(e, t) {
  return ({ name: r, value: n }) => {
    let i = r.match(Ft()), s = r.match(/:([a-zA-Z0-9\-:]+)/), a = r.match(/\.[^.\]]+(?=[^\]]*$)/g) || [], o = t || e[r] || r;
    return {
      type: i ? i[1] : null,
      value: s ? s[1] : null,
      modifiers: a.map((c) => c.replace(".", "")),
      expression: n,
      original: o
    };
  };
}
var $e = "DEFAULT", te = [
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
  $e,
  "teleport"
];
function Xr(e, t) {
  let r = te.indexOf(e.type) === -1 ? $e : e.type, n = te.indexOf(t.type) === -1 ? $e : t.type;
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
var Ie = [], Je = !1;
function Nt(e = () => {
}) {
  return queueMicrotask(() => {
    Je || setTimeout(() => {
      je();
    });
  }), new Promise((t) => {
    Ie.push(() => {
      e(), t();
    });
  });
}
function je() {
  for (Je = !1; Ie.length; )
    Ie.shift()();
}
function en() {
  Je = !0;
}
function L(e, t) {
  if (typeof ShadowRoot == "function" && e instanceof ShadowRoot) {
    Array.from(e.children).forEach((i) => L(i, t));
    return;
  }
  let r = !1;
  if (t(e, () => r = !0), r)
    return;
  let n = e.firstElementChild;
  for (; n; )
    L(n, t), n = n.nextElementSibling;
}
function V(e, ...t) {
  console.warn(`Alpine Warning: ${e}`, ...t);
}
function tn() {
  document.body || V("Unable to initialize. Trying to load Alpine before `<body>` is available. Did you forget to add `defer` in Alpine's `<script>` tag?"), U(document, "alpine:init"), U(document, "alpine:initializing"), yt(), jr((t) => C(t, L)), xt((t) => nn(t)), Lr((t, r) => {
    Ue(t, r).forEach((n) => n());
  });
  let e = (t) => !ce(t.parentElement, !0);
  Array.from(document.querySelectorAll(Dt())).filter(e).forEach((t) => {
    C(t);
  }), U(document, "alpine:initialized");
}
var Ye = [], kt = [];
function Vt() {
  return Ye.map((e) => e());
}
function Dt() {
  return Ye.concat(kt).map((e) => e());
}
function Kt(e) {
  Ye.push(e);
}
function zt(e) {
  kt.push(e);
}
function ce(e, t = !1) {
  return ue(e, (r) => {
    if ((t ? Dt() : Vt()).some((i) => r.matches(i)))
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
function rn(e) {
  return Vt().some((t) => e.matches(t));
}
function C(e, t = L) {
  Yr(() => {
    t(e, (r, n) => {
      Ue(r, r.attributes).forEach((i) => i()), r._x_ignore && n();
    });
  });
}
function nn(e) {
  L(e, (t) => mt(t));
}
function Ze(e, t) {
  return Array.isArray(t) ? ct(e, t.join(" ")) : typeof t == "object" && t !== null ? sn(e, t) : typeof t == "function" ? Ze(e, t()) : ct(e, t);
}
function ct(e, t) {
  let r = (i) => i.split(" ").filter((s) => !e.classList.contains(s)).filter(Boolean), n = (i) => (e.classList.add(...i), () => {
    e.classList.remove(...i);
  });
  return t = t === !0 ? t = "" : t || "", n(r(t));
}
function sn(e, t) {
  let r = (o) => o.split(" ").filter(Boolean), n = Object.entries(t).flatMap(([o, c]) => c ? r(o) : !1).filter(Boolean), i = Object.entries(t).flatMap(([o, c]) => c ? !1 : r(o)).filter(Boolean), s = [], a = [];
  return i.forEach((o) => {
    e.classList.contains(o) && (e.classList.remove(o), a.push(o));
  }), n.forEach((o) => {
    e.classList.contains(o) || (e.classList.add(o), s.push(o));
  }), () => {
    a.forEach((o) => e.classList.add(o)), s.forEach((o) => e.classList.remove(o));
  };
}
function le(e, t) {
  return typeof t == "object" && t !== null ? an(e, t) : on(e, t);
}
function an(e, t) {
  let r = {};
  return Object.entries(t).forEach(([n, i]) => {
    r[n] = e.style[n], n.startsWith("--") || (n = cn(n)), e.style.setProperty(n, i);
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
function cn(e) {
  return e.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}
function Le(e, t = () => {
}) {
  let r = !1;
  return function() {
    r ? t.apply(this, arguments) : (r = !0, e.apply(this, arguments));
  };
}
v("transition", (e, { value: t, modifiers: r, expression: n }, { evaluate: i }) => {
  typeof n == "function" && (n = i(n)), n ? un(e, n, t) : ln(e, r, t);
});
function un(e, t, r) {
  Bt(e, Ze, ""), {
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
function ln(e, t, r) {
  Bt(e, le);
  let n = !t.includes("in") && !t.includes("out") && !r, i = n || t.includes("in") || ["enter"].includes(r), s = n || t.includes("out") || ["leave"].includes(r);
  t.includes("in") && !n && (t = t.filter((p, g) => g < t.indexOf("out"))), t.includes("out") && !n && (t = t.filter((p, g) => g > t.indexOf("out")));
  let a = !t.includes("opacity") && !t.includes("scale"), o = a || t.includes("opacity"), c = a || t.includes("scale"), u = o ? 0 : 1, l = c ? B(t, "scale", 95) / 100 : 1, d = B(t, "delay", 0), h = B(t, "origin", "center"), w = "opacity, transform", O = B(t, "duration", 150) / 1e3, P = B(t, "duration", 75) / 1e3, f = "cubic-bezier(0.4, 0.0, 0.2, 1)";
  i && (e._x_transition.enter.during = {
    transformOrigin: h,
    transitionDelay: d,
    transitionProperty: w,
    transitionDuration: `${O}s`,
    transitionTimingFunction: f
  }, e._x_transition.enter.start = {
    opacity: u,
    transform: `scale(${l})`
  }, e._x_transition.enter.end = {
    opacity: 1,
    transform: "scale(1)"
  }), s && (e._x_transition.leave.during = {
    transformOrigin: h,
    transitionDelay: d,
    transitionProperty: w,
    transitionDuration: `${P}s`,
    transitionTimingFunction: f
  }, e._x_transition.leave.start = {
    opacity: 1,
    transform: "scale(1)"
  }, e._x_transition.leave.end = {
    opacity: u,
    transform: `scale(${l})`
  });
}
function Bt(e, t, r = {}) {
  e._x_transition || (e._x_transition = {
    enter: { during: r, start: r, end: r },
    leave: { during: r, start: r, end: r },
    in(n = () => {
    }, i = () => {
    }) {
      Fe(e, t, {
        during: this.enter.during,
        start: this.enter.start,
        end: this.enter.end
      }, n, i);
    },
    out(n = () => {
    }, i = () => {
    }) {
      Fe(e, t, {
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
  e._x_hidePromise = e._x_transition ? new Promise((a, o) => {
    e._x_transition.out(() => {
    }, () => a(n)), e._x_transitioning.beforeCancel(() => o({ isFromCancelledTransition: !0 }));
  }) : Promise.resolve(n), queueMicrotask(() => {
    let a = qt(e);
    a ? (a._x_hideChildren || (a._x_hideChildren = []), a._x_hideChildren.push(e)) : i(() => {
      let o = (c) => {
        let u = Promise.all([
          c._x_hidePromise,
          ...(c._x_hideChildren || []).map(o)
        ]).then(([l]) => l());
        return delete c._x_hidePromise, delete c._x_hideChildren, u;
      };
      o(e).catch((c) => {
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
function Fe(e, t, { during: r, start: n, end: i } = {}, s = () => {
}, a = () => {
}) {
  if (e._x_transitioning && e._x_transitioning.cancel(), Object.keys(r).length === 0 && Object.keys(n).length === 0 && Object.keys(i).length === 0) {
    s(), a();
    return;
  }
  let o, c, u;
  fn(e, {
    start() {
      o = t(e, n);
    },
    during() {
      c = t(e, r);
    },
    before: s,
    end() {
      o(), u = t(e, i);
    },
    after: a,
    cleanup() {
      c(), u();
    }
  });
}
function fn(e, t) {
  let r, n, i, s = Le(() => {
    x(() => {
      r = !0, n || t.before(), i || (t.end(), je()), t.after(), e.isConnected && t.cleanup(), delete e._x_transitioning;
    });
  });
  e._x_transitioning = {
    beforeCancels: [],
    beforeCancel(a) {
      this.beforeCancels.push(a);
    },
    cancel: Le(function() {
      for (; this.beforeCancels.length; )
        this.beforeCancels.shift()();
      s();
    }),
    finish: s
  }, x(() => {
    t.start(), t.during();
  }), en(), requestAnimationFrame(() => {
    if (r)
      return;
    let a = Number(getComputedStyle(e).transitionDuration.replace(/,.*/, "").replace("s", "")) * 1e3, o = Number(getComputedStyle(e).transitionDelay.replace(/,.*/, "").replace("s", "")) * 1e3;
    a === 0 && (a = Number(getComputedStyle(e).animationDuration.replace("s", "")) * 1e3), x(() => {
      t.before();
    }), n = !0, requestAnimationFrame(() => {
      r || (x(() => {
        t.end();
      }), je(), setTimeout(e._x_transitioning.finish, a + o), i = !0);
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
var Ne = !1;
function fe(e, t = () => {
}) {
  return (...r) => Ne ? t(...r) : e(...r);
}
function dn(e, t) {
  t._x_dataStack || (t._x_dataStack = e._x_dataStack), Ne = !0, _n(() => {
    pn(t);
  }), Ne = !1;
}
function pn(e) {
  let t = !1;
  C(e, (n, i) => {
    L(n, (s, a) => {
      if (t && rn(s))
        return a();
      t = !0, i(s, a);
    });
  });
}
function _n(e) {
  let t = Y;
  at((r, n) => {
    let i = t(r);
    return oe(i), () => {
    };
  }), e(), at(t);
}
function Ht(e, t, r, n = []) {
  switch (e._x_bindings || (e._x_bindings = K({})), e._x_bindings[t] = r, t = n.includes("camel") ? wn(t) : t, t) {
    case "value":
      hn(e, r);
      break;
    case "style":
      vn(e, r);
      break;
    case "class":
      gn(e, r);
      break;
    default:
      xn(e, t, r);
      break;
  }
}
function hn(e, t) {
  if (e.type === "radio")
    e.attributes.value === void 0 && (e.value = t), window.fromModel && (e.checked = ut(e.value, t));
  else if (e.type === "checkbox")
    Number.isInteger(t) ? e.value = t : !Number.isInteger(t) && !Array.isArray(t) && typeof t != "boolean" && ![null, void 0].includes(t) ? e.value = String(t) : Array.isArray(t) ? e.checked = t.some((r) => ut(r, e.value)) : e.checked = !!t;
  else if (e.tagName === "SELECT")
    yn(e, t);
  else {
    if (e.value === t)
      return;
    e.value = t;
  }
}
function gn(e, t) {
  e._x_undoAddedClasses && e._x_undoAddedClasses(), e._x_undoAddedClasses = Ze(e, t);
}
function vn(e, t) {
  e._x_undoAddedStyles && e._x_undoAddedStyles(), e._x_undoAddedStyles = le(e, t);
}
function xn(e, t, r) {
  [null, void 0, !1].includes(r) && bn(t) ? e.removeAttribute(t) : (Wt(t) && (r = t), mn(e, t, r));
}
function mn(e, t, r) {
  e.getAttribute(t) != r && e.setAttribute(t, r);
}
function yn(e, t) {
  const r = [].concat(t).map((n) => n + "");
  Array.from(e.options).forEach((n) => {
    n.selected = r.includes(n.value);
  });
}
function wn(e) {
  return e.toLowerCase().replace(/-(\w)/g, (t, r) => r.toUpperCase());
}
function ut(e, t) {
  return e == t;
}
function Wt(e) {
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
function bn(e) {
  return !["aria-pressed", "aria-checked", "aria-expanded", "aria-selected"].includes(e);
}
function En(e, t, r) {
  if (e._x_bindings && e._x_bindings[t] !== void 0)
    return e._x_bindings[t];
  let n = e.getAttribute(t);
  return n === null ? typeof r == "function" ? r() : r : n === "" ? !0 : Wt(t) ? !![t, "true"].includes(n) : n;
}
function Ut(e, t) {
  var r;
  return function() {
    var n = this, i = arguments, s = function() {
      r = null, e.apply(n, i);
    };
    clearTimeout(r), r = setTimeout(s, t);
  };
}
function Gt(e, t) {
  let r;
  return function() {
    let n = this, i = arguments;
    r || (e.apply(n, i), r = !0, setTimeout(() => r = !1, t));
  };
}
function An(e) {
  e(X);
}
var R = {}, lt = !1;
function Sn(e, t) {
  if (lt || (R = K(R), lt = !0), t === void 0)
    return R[e];
  R[e] = t, typeof t == "object" && t !== null && t.hasOwnProperty("init") && typeof t.init == "function" && R[e].init(), bt(R[e]);
}
function On() {
  return R;
}
var Jt = {};
function Mn(e, t) {
  let r = typeof t != "function" ? () => t : t;
  e instanceof Element ? Yt(e, r()) : Jt[e] = r;
}
function Cn(e) {
  return Object.entries(Jt).forEach(([t, r]) => {
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
  let i = Object.entries(t).map(([a, o]) => ({ name: a, value: o })), s = Ct(i);
  i = i.map((a) => s.find((o) => o.name === a.name) ? {
    name: `x-bind:${a.name}`,
    value: `"${a.value}"`
  } : a), Ue(e, i, r).map((a) => {
    n.push(a.runCleanups), a();
  });
}
var Zt = {};
function Tn(e, t) {
  Zt[e] = t;
}
function Pn(e, t) {
  return Object.entries(Zt).forEach(([r, n]) => {
    Object.defineProperty(e, r, {
      get() {
        return (...i) => n.bind(t)(...i);
      },
      enumerable: !1
    });
  }), e;
}
var Rn = {
  get reactive() {
    return K;
  },
  get release() {
    return oe;
  },
  get effect() {
    return Y;
  },
  get raw() {
    return _t;
  },
  version: "3.10.5",
  flushAndStopDeferringMutations: Kr,
  dontAutoEvaluateFunctions: qr,
  disableEffectScheduling: Rr,
  setReactivityEngine: $r,
  closestDataStack: k,
  skipDuringClone: fe,
  addRootSelector: Kt,
  addInitSelector: zt,
  addScopeToNode: Z,
  deferMutations: Dr,
  mapAttributes: Ge,
  evaluateLater: y,
  setEvaluator: Hr,
  mergeProxies: Q,
  findClosest: ue,
  closestRoot: ce,
  interceptor: Et,
  transition: Fe,
  setStyles: le,
  mutateDom: x,
  directive: v,
  throttle: Gt,
  debounce: Ut,
  evaluate: N,
  initTree: C,
  nextTick: Nt,
  prefixed: z,
  prefix: Jr,
  plugin: An,
  magic: A,
  store: Sn,
  start: tn,
  clone: dn,
  bound: En,
  $data: wt,
  data: Tn,
  bind: Mn
}, X = Rn;
function $n(e, t) {
  const r = /* @__PURE__ */ Object.create(null), n = e.split(",");
  for (let i = 0; i < n.length; i++)
    r[n[i]] = !0;
  return t ? (i) => !!r[i.toLowerCase()] : (i) => !!r[i];
}
var In = Object.freeze({}), Qt = Object.assign, jn = Object.prototype.hasOwnProperty, de = (e, t) => jn.call(e, t), I = Array.isArray, G = (e) => Xt(e) === "[object Map]", Ln = (e) => typeof e == "string", Qe = (e) => typeof e == "symbol", pe = (e) => e !== null && typeof e == "object", Fn = Object.prototype.toString, Xt = (e) => Fn.call(e), er = (e) => Xt(e).slice(8, -1), Xe = (e) => Ln(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, Nn = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (r) => t[r] || (t[r] = e(r));
}, kn = Nn((e) => e.charAt(0).toUpperCase() + e.slice(1)), tr = (e, t) => e !== t && (e === e || t === t), ke = /* @__PURE__ */ new WeakMap(), q = [], S, j = Symbol("iterate"), Ve = Symbol("Map key iterate");
function Vn(e) {
  return e && e._isEffect === !0;
}
function Dn(e, t = In) {
  Vn(e) && (e = e.raw);
  const r = Bn(e, t);
  return t.lazy || r(), r;
}
function Kn(e) {
  e.active && (rr(e), e.options.onStop && e.options.onStop(), e.active = !1);
}
var zn = 0;
function Bn(e, t) {
  const r = function() {
    if (!r.active)
      return e();
    if (!q.includes(r)) {
      rr(r);
      try {
        return Hn(), q.push(r), S = r, e();
      } finally {
        q.pop(), nr(), S = q[q.length - 1];
      }
    }
  };
  return r.id = zn++, r.allowRecurse = !!t.allowRecurse, r._isEffect = !0, r.active = !0, r.raw = e, r.deps = [], r.options = t, r;
}
function rr(e) {
  const { deps: t } = e;
  if (t.length) {
    for (let r = 0; r < t.length; r++)
      t[r].delete(e);
    t.length = 0;
  }
}
var D = !0, et = [];
function qn() {
  et.push(D), D = !1;
}
function Hn() {
  et.push(D), D = !0;
}
function nr() {
  const e = et.pop();
  D = e === void 0 ? !0 : e;
}
function E(e, t, r) {
  if (!D || S === void 0)
    return;
  let n = ke.get(e);
  n || ke.set(e, n = /* @__PURE__ */ new Map());
  let i = n.get(r);
  i || n.set(r, i = /* @__PURE__ */ new Set()), i.has(S) || (i.add(S), S.deps.push(i), S.options.onTrack && S.options.onTrack({
    effect: S,
    target: e,
    type: t,
    key: r
  }));
}
function T(e, t, r, n, i, s) {
  const a = ke.get(e);
  if (!a)
    return;
  const o = /* @__PURE__ */ new Set(), c = (l) => {
    l && l.forEach((d) => {
      (d !== S || d.allowRecurse) && o.add(d);
    });
  };
  if (t === "clear")
    a.forEach(c);
  else if (r === "length" && I(e))
    a.forEach((l, d) => {
      (d === "length" || d >= n) && c(l);
    });
  else
    switch (r !== void 0 && c(a.get(r)), t) {
      case "add":
        I(e) ? Xe(r) && c(a.get("length")) : (c(a.get(j)), G(e) && c(a.get(Ve)));
        break;
      case "delete":
        I(e) || (c(a.get(j)), G(e) && c(a.get(Ve)));
        break;
      case "set":
        G(e) && c(a.get(j));
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
  o.forEach(u);
}
var Wn = /* @__PURE__ */ $n("__proto__,__v_isRef,__isVue"), ir = new Set(Object.getOwnPropertyNames(Symbol).map((e) => Symbol[e]).filter(Qe)), Un = /* @__PURE__ */ _e(), Gn = /* @__PURE__ */ _e(!1, !0), Jn = /* @__PURE__ */ _e(!0), Yn = /* @__PURE__ */ _e(!0, !0), ae = {};
["includes", "indexOf", "lastIndexOf"].forEach((e) => {
  const t = Array.prototype[e];
  ae[e] = function(...r) {
    const n = _(this);
    for (let s = 0, a = this.length; s < a; s++)
      E(n, "get", s + "");
    const i = t.apply(n, r);
    return i === -1 || i === !1 ? t.apply(n, r.map(_)) : i;
  };
});
["push", "pop", "shift", "unshift", "splice"].forEach((e) => {
  const t = Array.prototype[e];
  ae[e] = function(...r) {
    qn();
    const n = t.apply(this, r);
    return nr(), n;
  };
});
function _e(e = !1, t = !1) {
  return function(n, i, s) {
    if (i === "__v_isReactive")
      return !e;
    if (i === "__v_isReadonly")
      return e;
    if (i === "__v_raw" && s === (e ? t ? ai : mr : t ? si : xr).get(n))
      return n;
    const a = I(n);
    if (!e && a && de(ae, i))
      return Reflect.get(ae, i, s);
    const o = Reflect.get(n, i, s);
    return (Qe(i) ? ir.has(i) : Wn(i)) || (e || E(n, "get", i), t) ? o : De(o) ? !a || !Xe(i) ? o.value : o : pe(o) ? e ? yr(o) : it(o) : o;
  };
}
var Zn = /* @__PURE__ */ sr(), Qn = /* @__PURE__ */ sr(!0);
function sr(e = !1) {
  return function(r, n, i, s) {
    let a = r[n];
    if (!e && (i = _(i), a = _(a), !I(r) && De(a) && !De(i)))
      return a.value = i, !0;
    const o = I(r) && Xe(n) ? Number(n) < r.length : de(r, n), c = Reflect.set(r, n, i, s);
    return r === _(s) && (o ? tr(i, a) && T(r, "set", n, i, a) : T(r, "add", n, i)), c;
  };
}
function Xn(e, t) {
  const r = de(e, t), n = e[t], i = Reflect.deleteProperty(e, t);
  return i && r && T(e, "delete", t, void 0, n), i;
}
function ei(e, t) {
  const r = Reflect.has(e, t);
  return (!Qe(t) || !ir.has(t)) && E(e, "has", t), r;
}
function ti(e) {
  return E(e, "iterate", I(e) ? "length" : j), Reflect.ownKeys(e);
}
var ar = {
  get: Un,
  set: Zn,
  deleteProperty: Xn,
  has: ei,
  ownKeys: ti
}, or = {
  get: Jn,
  set(e, t) {
    return console.warn(`Set operation on key "${String(t)}" failed: target is readonly.`, e), !0;
  },
  deleteProperty(e, t) {
    return console.warn(`Delete operation on key "${String(t)}" failed: target is readonly.`, e), !0;
  }
};
Qt({}, ar, {
  get: Gn,
  set: Qn
});
Qt({}, or, {
  get: Yn
});
var tt = (e) => pe(e) ? it(e) : e, rt = (e) => pe(e) ? yr(e) : e, nt = (e) => e, he = (e) => Reflect.getPrototypeOf(e);
function ge(e, t, r = !1, n = !1) {
  e = e.__v_raw;
  const i = _(e), s = _(t);
  t !== s && !r && E(i, "get", t), !r && E(i, "get", s);
  const { has: a } = he(i), o = n ? nt : r ? rt : tt;
  if (a.call(i, t))
    return o(e.get(t));
  if (a.call(i, s))
    return o(e.get(s));
  e !== i && e.get(t);
}
function ve(e, t = !1) {
  const r = this.__v_raw, n = _(r), i = _(e);
  return e !== i && !t && E(n, "has", e), !t && E(n, "has", i), e === i ? r.has(e) : r.has(e) || r.has(i);
}
function xe(e, t = !1) {
  return e = e.__v_raw, !t && E(_(e), "iterate", j), Reflect.get(e, "size", e);
}
function cr(e) {
  e = _(e);
  const t = _(this);
  return he(t).has.call(t, e) || (t.add(e), T(t, "add", e, e)), this;
}
function ur(e, t) {
  t = _(t);
  const r = _(this), { has: n, get: i } = he(r);
  let s = n.call(r, e);
  s ? vr(r, n, e) : (e = _(e), s = n.call(r, e));
  const a = i.call(r, e);
  return r.set(e, t), s ? tr(t, a) && T(r, "set", e, t, a) : T(r, "add", e, t), this;
}
function lr(e) {
  const t = _(this), { has: r, get: n } = he(t);
  let i = r.call(t, e);
  i ? vr(t, r, e) : (e = _(e), i = r.call(t, e));
  const s = n ? n.call(t, e) : void 0, a = t.delete(e);
  return i && T(t, "delete", e, void 0, s), a;
}
function fr() {
  const e = _(this), t = e.size !== 0, r = G(e) ? new Map(e) : new Set(e), n = e.clear();
  return t && T(e, "clear", void 0, void 0, r), n;
}
function me(e, t) {
  return function(n, i) {
    const s = this, a = s.__v_raw, o = _(a), c = t ? nt : e ? rt : tt;
    return !e && E(o, "iterate", j), a.forEach((u, l) => n.call(i, c(u), c(l), s));
  };
}
function re(e, t, r) {
  return function(...n) {
    const i = this.__v_raw, s = _(i), a = G(s), o = e === "entries" || e === Symbol.iterator && a, c = e === "keys" && a, u = i[e](...n), l = r ? nt : t ? rt : tt;
    return !t && E(s, "iterate", c ? Ve : j), {
      next() {
        const { value: d, done: h } = u.next();
        return h ? { value: d, done: h } : {
          value: o ? [l(d[0]), l(d[1])] : l(d),
          done: h
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
      console.warn(`${kn(e)} operation ${r}failed: target is readonly.`, _(this));
    }
    return e === "delete" ? !1 : this;
  };
}
var dr = {
  get(e) {
    return ge(this, e);
  },
  get size() {
    return xe(this);
  },
  has: ve,
  add: cr,
  set: ur,
  delete: lr,
  clear: fr,
  forEach: me(!1, !1)
}, pr = {
  get(e) {
    return ge(this, e, !1, !0);
  },
  get size() {
    return xe(this);
  },
  has: ve,
  add: cr,
  set: ur,
  delete: lr,
  clear: fr,
  forEach: me(!1, !0)
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
  forEach: me(!0, !1)
}, hr = {
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
  forEach: me(!0, !0)
}, ri = ["keys", "values", "entries", Symbol.iterator];
ri.forEach((e) => {
  dr[e] = re(e, !1, !1), _r[e] = re(e, !0, !1), pr[e] = re(e, !1, !0), hr[e] = re(e, !0, !0);
});
function gr(e, t) {
  const r = t ? e ? hr : pr : e ? _r : dr;
  return (n, i, s) => i === "__v_isReactive" ? !e : i === "__v_isReadonly" ? e : i === "__v_raw" ? n : Reflect.get(de(r, i) && i in n ? r : n, i, s);
}
var ni = {
  get: gr(!1, !1)
}, ii = {
  get: gr(!0, !1)
};
function vr(e, t, r) {
  const n = _(r);
  if (n !== r && t.call(e, n)) {
    const i = er(e);
    console.warn(`Reactive ${i} contains both the raw and reactive versions of the same object${i === "Map" ? " as keys" : ""}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`);
  }
}
var xr = /* @__PURE__ */ new WeakMap(), si = /* @__PURE__ */ new WeakMap(), mr = /* @__PURE__ */ new WeakMap(), ai = /* @__PURE__ */ new WeakMap();
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
function ci(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : oi(er(e));
}
function it(e) {
  return e && e.__v_isReadonly ? e : wr(e, !1, ar, ni, xr);
}
function yr(e) {
  return wr(e, !0, or, ii, mr);
}
function wr(e, t, r, n, i) {
  if (!pe(e))
    return console.warn(`value cannot be made reactive: ${String(e)}`), e;
  if (e.__v_raw && !(t && e.__v_isReactive))
    return e;
  const s = i.get(e);
  if (s)
    return s;
  const a = ci(e);
  if (a === 0)
    return e;
  const o = new Proxy(e, a === 2 ? n : r);
  return i.set(e, o), o;
}
function _(e) {
  return e && _(e.__v_raw) || e;
}
function De(e) {
  return !!(e && e.__v_isRef === !0);
}
A("nextTick", () => Nt);
A("dispatch", (e) => U.bind(U, e));
A("watch", (e, { evaluateLater: t, effect: r }) => (n, i) => {
  let s = t(n), a = !0, o, c = r(() => s((u) => {
    JSON.stringify(u), a ? o = u : queueMicrotask(() => {
      i(u, o), o = u;
    }), a = !1;
  }));
  e._x_effects.delete(c);
});
A("store", On);
A("data", (e) => wt(e));
A("root", (e) => ce(e));
A("refs", (e) => (e._x_refs_proxy || (e._x_refs_proxy = Q(ui(e))), e._x_refs_proxy));
function ui(e) {
  let t = [], r = e;
  for (; r; )
    r._x_refs && t.push(r._x_refs), r = r.parentNode;
  return t;
}
var Ee = {};
function br(e) {
  return Ee[e] || (Ee[e] = 0), ++Ee[e];
}
function li(e, t) {
  return ue(e, (r) => {
    if (r._x_ids && r._x_ids[t])
      return !0;
  });
}
function fi(e, t) {
  e._x_ids || (e._x_ids = {}), e._x_ids[t] || (e._x_ids[t] = br(t));
}
A("id", (e) => (t, r = null) => {
  let n = li(e, t), i = n ? n._x_ids[t] : br(t);
  return r ? `${t}-${i}-${r}` : `${t}-${i}`;
});
A("el", (e) => e);
Er("Focus", "focus", "focus");
Er("Persist", "persist", "persist");
function Er(e, t, r) {
  A(t, (n) => V(`You can't use [$${directiveName}] without first installing the "${e}" plugin here: https://alpinejs.dev/plugins/${r}`, n));
}
v("modelable", (e, { expression: t }, { effect: r, evaluateLater: n }) => {
  let i = n(t), s = () => {
    let u;
    return i((l) => u = l), u;
  }, a = n(`${t} = __placeholder`), o = (u) => a(() => {
  }, { scope: { __placeholder: u } }), c = s();
  o(c), queueMicrotask(() => {
    if (!e._x_model)
      return;
    e._x_removeModelListeners.default();
    let u = e._x_model.get, l = e._x_model.set;
    r(() => o(u())), r(() => l(s()));
  });
});
v("teleport", (e, { expression: t }, { cleanup: r }) => {
  e.tagName.toLowerCase() !== "template" && V("x-teleport can only be used on a <template> tag", e);
  let n = document.querySelector(t);
  n || V(`Cannot find x-teleport element for selector: "${t}"`);
  let i = e.content.cloneNode(!0).firstElementChild;
  e._x_teleport = i, i._x_teleportBack = e, e._x_forwardEvents && e._x_forwardEvents.forEach((s) => {
    i.addEventListener(s, (a) => {
      a.stopPropagation(), e.dispatchEvent(new a.constructor(a.type, a));
    });
  }), Z(i, {}, e), x(() => {
    n.appendChild(i), C(i), i._x_ignore = !0;
  }), r(() => i.remove());
});
var Ar = () => {
};
Ar.inline = (e, { modifiers: t }, { cleanup: r }) => {
  t.includes("self") ? e._x_ignoreSelf = !0 : e._x_ignore = !0, r(() => {
    t.includes("self") ? delete e._x_ignoreSelf : delete e._x_ignore;
  });
};
v("ignore", Ar);
v("effect", (e, { expression: t }, { effect: r }) => r(y(e, t)));
function Sr(e, t, r, n) {
  let i = e, s = (c) => n(c), a = {}, o = (c, u) => (l) => u(c, l);
  if (r.includes("dot") && (t = di(t)), r.includes("camel") && (t = pi(t)), r.includes("passive") && (a.passive = !0), r.includes("capture") && (a.capture = !0), r.includes("window") && (i = window), r.includes("document") && (i = document), r.includes("prevent") && (s = o(s, (c, u) => {
    u.preventDefault(), c(u);
  })), r.includes("stop") && (s = o(s, (c, u) => {
    u.stopPropagation(), c(u);
  })), r.includes("self") && (s = o(s, (c, u) => {
    u.target === e && c(u);
  })), (r.includes("away") || r.includes("outside")) && (i = document, s = o(s, (c, u) => {
    e.contains(u.target) || u.target.isConnected !== !1 && (e.offsetWidth < 1 && e.offsetHeight < 1 || e._x_isShown !== !1 && c(u));
  })), r.includes("once") && (s = o(s, (c, u) => {
    c(u), i.removeEventListener(t, s, a);
  })), s = o(s, (c, u) => {
    hi(t) && gi(u, r) || c(u);
  }), r.includes("debounce")) {
    let c = r[r.indexOf("debounce") + 1] || "invalid-wait", u = Ke(c.split("ms")[0]) ? Number(c.split("ms")[0]) : 250;
    s = Ut(s, u);
  }
  if (r.includes("throttle")) {
    let c = r[r.indexOf("throttle") + 1] || "invalid-wait", u = Ke(c.split("ms")[0]) ? Number(c.split("ms")[0]) : 250;
    s = Gt(s, u);
  }
  return i.addEventListener(t, s, a), () => {
    i.removeEventListener(t, s, a);
  };
}
function di(e) {
  return e.replace(/-/g, ".");
}
function pi(e) {
  return e.toLowerCase().replace(/-(\w)/g, (t, r) => r.toUpperCase());
}
function Ke(e) {
  return !Array.isArray(e) && !isNaN(e);
}
function _i(e) {
  return e.replace(/([a-z])([A-Z])/g, "$1-$2").replace(/[_\s]/, "-").toLowerCase();
}
function hi(e) {
  return ["keydown", "keyup"].includes(e);
}
function gi(e, t) {
  let r = t.filter((s) => !["window", "document", "prevent", "stop", "once"].includes(s));
  if (r.includes("debounce")) {
    let s = r.indexOf("debounce");
    r.splice(s, Ke((r[s + 1] || "invalid-wait").split("ms")[0]) ? 2 : 1);
  }
  if (r.length === 0 || r.length === 1 && ft(e.key).includes(r[0]))
    return !1;
  const i = ["ctrl", "shift", "alt", "meta", "cmd", "super"].filter((s) => r.includes(s));
  return r = r.filter((s) => !i.includes(s)), !(i.length > 0 && i.filter((a) => ((a === "cmd" || a === "super") && (a = "meta"), e[`${a}Key`])).length === i.length && ft(e.key).includes(r[0]));
}
function ft(e) {
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
  let s = y(e, r), a = `${r} = rightSideOfExpression($event, ${r})`, o = y(e, a);
  var c = e.tagName.toLowerCase() === "select" || ["checkbox", "radio"].includes(e.type) || t.includes("lazy") ? "change" : "input";
  let u = vi(e, t, r), l = Sr(e, c, t, (h) => {
    o(() => {
    }, { scope: {
      $event: h,
      rightSideOfExpression: u
    } });
  });
  e._x_removeModelListeners || (e._x_removeModelListeners = {}), e._x_removeModelListeners.default = l, i(() => e._x_removeModelListeners.default());
  let d = y(e, `${r} = __placeholder`);
  e._x_model = {
    get() {
      let h;
      return s((w) => h = w), h;
    },
    set(h) {
      d(() => {
      }, { scope: { __placeholder: h } });
    }
  }, e._x_forceModelUpdate = () => {
    s((h) => {
      h === void 0 && r.match(/\./) && (h = ""), window.fromModel = !0, x(() => Ht(e, "value", h)), delete window.fromModel;
    });
  }, n(() => {
    t.includes("unintrusive") && document.activeElement.isSameNode(e) || e._x_forceModelUpdate();
  });
});
function vi(e, t, r) {
  return e.type === "radio" && x(() => {
    e.hasAttribute("name") || e.setAttribute("name", r);
  }), (n, i) => x(() => {
    if (n instanceof CustomEvent && n.detail !== void 0)
      return n.detail || n.target.value;
    if (e.type === "checkbox")
      if (Array.isArray(i)) {
        let s = t.includes("number") ? Ae(n.target.value) : n.target.value;
        return n.target.checked ? i.concat([s]) : i.filter((a) => !xi(a, s));
      } else
        return n.target.checked;
    else {
      if (e.tagName.toLowerCase() === "select" && e.multiple)
        return t.includes("number") ? Array.from(n.target.selectedOptions).map((s) => {
          let a = s.value || s.text;
          return Ae(a);
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
  return mi(t) ? t : e;
}
function xi(e, t) {
  return e == t;
}
function mi(e) {
  return !Array.isArray(e) && !isNaN(e);
}
v("cloak", (e) => queueMicrotask(() => x(() => e.removeAttribute(z("cloak")))));
zt(() => `[${z("init")}]`);
v("init", fe((e, { expression: t }, { evaluate: r }) => typeof t == "string" ? !!t.trim() && r(t, {}, !1) : r(t, {}, !1)));
v("text", (e, { expression: t }, { effect: r, evaluateLater: n }) => {
  let i = n(t);
  r(() => {
    i((s) => {
      x(() => {
        e.textContent = s;
      });
    });
  });
});
v("html", (e, { expression: t }, { effect: r, evaluateLater: n }) => {
  let i = n(t);
  r(() => {
    i((s) => {
      x(() => {
        e.innerHTML = s, e._x_ignoreSelf = !0, C(e), delete e._x_ignoreSelf;
      });
    });
  });
});
Ge(Rt(":", $t(z("bind:"))));
v("bind", (e, { value: t, modifiers: r, expression: n, original: i }, { effect: s }) => {
  if (!t) {
    let o = {};
    Cn(o), y(e, n)((u) => {
      Yt(e, u, i);
    }, { scope: o });
    return;
  }
  if (t === "key")
    return yi(e, n);
  let a = y(e, n);
  s(() => a((o) => {
    o === void 0 && typeof n == "string" && n.match(/\./) && (o = ""), x(() => Ht(e, t, o, r));
  }));
});
function yi(e, t) {
  e._x_keyExpression = t;
}
Kt(() => `[${z("data")}]`);
v("data", fe((e, { expression: t }, { cleanup: r }) => {
  t = t === "" ? "{}" : t;
  let n = {};
  Pe(n, e);
  let i = {};
  Pn(i, n);
  let s = N(e, t, { scope: i });
  s === void 0 && (s = {}), Pe(s, e);
  let a = K(s);
  bt(a);
  let o = Z(e, a);
  a.init && N(e, a.init), r(() => {
    a.destroy && N(e, a.destroy), o();
  });
}));
v("show", (e, { modifiers: t, expression: r }, { effect: n }) => {
  let i = y(e, r);
  e._x_doHide || (e._x_doHide = () => {
    x(() => {
      e.style.setProperty("display", "none", t.includes("important") ? "important" : void 0);
    });
  }), e._x_doShow || (e._x_doShow = () => {
    x(() => {
      e.style.length === 1 && e.style.display === "none" ? e.removeAttribute("style") : e.style.removeProperty("display");
    });
  });
  let s = () => {
    e._x_doHide(), e._x_isShown = !1;
  }, a = () => {
    e._x_doShow(), e._x_isShown = !0;
  }, o = () => setTimeout(a), c = Le((d) => d ? a() : s(), (d) => {
    typeof e._x_toggleAndCascadeWithTransitions == "function" ? e._x_toggleAndCascadeWithTransitions(e, d, a, s) : d ? o() : s();
  }), u, l = !0;
  n(() => i((d) => {
    !l && d === u || (t.includes("immediate") && (d ? o() : s()), c(d), u = d, l = !1);
  }));
});
v("for", (e, { expression: t }, { effect: r, cleanup: n }) => {
  let i = bi(t), s = y(e, i.items), a = y(e, e._x_keyExpression || "index");
  e._x_prevKeys = [], e._x_lookup = {}, r(() => wi(e, i, s, a)), n(() => {
    Object.values(e._x_lookup).forEach((o) => o.remove()), delete e._x_prevKeys, delete e._x_lookup;
  });
});
function wi(e, t, r, n) {
  let i = (a) => typeof a == "object" && !Array.isArray(a), s = e;
  r((a) => {
    Ei(a) && a >= 0 && (a = Array.from(Array(a).keys(), (f) => f + 1)), a === void 0 && (a = []);
    let o = e._x_lookup, c = e._x_prevKeys, u = [], l = [];
    if (i(a))
      a = Object.entries(a).map(([f, p]) => {
        let g = dt(t, p, f, a);
        n((m) => l.push(m), { scope: { index: f, ...g } }), u.push(g);
      });
    else
      for (let f = 0; f < a.length; f++) {
        let p = dt(t, a[f], f, a);
        n((g) => l.push(g), { scope: { index: f, ...p } }), u.push(p);
      }
    let d = [], h = [], w = [], O = [];
    for (let f = 0; f < c.length; f++) {
      let p = c[f];
      l.indexOf(p) === -1 && w.push(p);
    }
    c = c.filter((f) => !w.includes(f));
    let P = "template";
    for (let f = 0; f < l.length; f++) {
      let p = l[f], g = c.indexOf(p);
      if (g === -1)
        c.splice(f, 0, p), d.push([P, f]);
      else if (g !== f) {
        let m = c.splice(f, 1)[0], b = c.splice(g - 1, 1)[0];
        c.splice(f, 0, b), c.splice(g, 0, m), h.push([m, b]);
      } else
        O.push(p);
      P = p;
    }
    for (let f = 0; f < w.length; f++) {
      let p = w[f];
      o[p]._x_effects && o[p]._x_effects.forEach(pt), o[p].remove(), o[p] = null, delete o[p];
    }
    for (let f = 0; f < h.length; f++) {
      let [p, g] = h[f], m = o[p], b = o[g], F = document.createElement("div");
      x(() => {
        b.after(F), m.after(b), b._x_currentIfEl && b.after(b._x_currentIfEl), F.before(m), m._x_currentIfEl && m.after(m._x_currentIfEl), F.remove();
      }), ot(b, u[l.indexOf(g)]);
    }
    for (let f = 0; f < d.length; f++) {
      let [p, g] = d[f], m = p === "template" ? s : o[p];
      m._x_currentIfEl && (m = m._x_currentIfEl);
      let b = u[g], F = l[g], ee = document.importNode(s.content, !0).firstElementChild;
      Z(ee, K(b), s), x(() => {
        m.after(ee), C(ee);
      }), typeof F == "object" && V("x-for key cannot be an object, it must be a string or an integer", s), o[F] = ee;
    }
    for (let f = 0; f < O.length; f++)
      ot(o[O[f]], u[l.indexOf(O[f])]);
    s._x_prevKeys = l;
  });
}
function bi(e) {
  let t = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/, r = /^\s*\(|\)\s*$/g, n = /([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/, i = e.match(n);
  if (!i)
    return;
  let s = {};
  s.items = i[2].trim();
  let a = i[1].replace(r, "").trim(), o = a.match(t);
  return o ? (s.item = a.replace(t, "").trim(), s.index = o[1].trim(), o[2] && (s.collection = o[2].trim())) : s.item = a, s;
}
function dt(e, t, r, n) {
  let i = {};
  return /^\[.*\]$/.test(e.item) && Array.isArray(t) ? e.item.replace("[", "").replace("]", "").split(",").map((a) => a.trim()).forEach((a, o) => {
    i[a] = t[o];
  }) : /^\{.*\}$/.test(e.item) && !Array.isArray(t) && typeof t == "object" ? e.item.replace("{", "").replace("}", "").split(",").map((a) => a.trim()).forEach((a) => {
    i[a] = t[a];
  }) : i[e.item] = t, e.index && (i[e.index] = r), e.collection && (i[e.collection] = n), i;
}
function Ei(e) {
  return !Array.isArray(e) && !isNaN(e);
}
function Or() {
}
Or.inline = (e, { expression: t }, { cleanup: r }) => {
  let n = ce(e);
  n._x_refs || (n._x_refs = {}), n._x_refs[t] = e, r(() => delete n._x_refs[t]);
};
v("ref", Or);
v("if", (e, { expression: t }, { effect: r, cleanup: n }) => {
  let i = y(e, t), s = () => {
    if (e._x_currentIfEl)
      return e._x_currentIfEl;
    let o = e.content.cloneNode(!0).firstElementChild;
    return Z(o, {}, e), x(() => {
      e.after(o), C(o);
    }), e._x_currentIfEl = o, e._x_undoIf = () => {
      L(o, (c) => {
        c._x_effects && c._x_effects.forEach(pt);
      }), o.remove(), delete e._x_currentIfEl;
    }, o;
  }, a = () => {
    e._x_undoIf && (e._x_undoIf(), delete e._x_undoIf);
  };
  r(() => i((o) => {
    o ? s() : a();
  })), n(() => e._x_undoIf && e._x_undoIf());
});
v("id", (e, { expression: t }, { evaluate: r }) => {
  r(t).forEach((i) => fi(e, i));
});
Ge(Rt("@", $t(z("on:"))));
v("on", fe((e, { value: t, modifiers: r, expression: n }, { cleanup: i }) => {
  let s = n ? y(e, n) : () => {
  };
  e.tagName.toLowerCase() === "template" && (e._x_forwardEvents || (e._x_forwardEvents = []), e._x_forwardEvents.includes(t) || e._x_forwardEvents.push(t));
  let a = Sr(e, t, r, (o) => {
    s(() => {
    }, { scope: { $event: o }, params: [o] });
  });
  i(() => a());
}));
ye("Collapse", "collapse", "collapse");
ye("Intersect", "intersect", "intersect");
ye("Focus", "trap", "focus");
ye("Mask", "mask", "mask");
function ye(e, t, r) {
  v(t, (n) => V(`You can't use [x-${t}] without first installing the "${e}" plugin here: https://alpinejs.dev/plugins/${r}`, n));
}
X.setEvaluator(Ot);
X.setReactivityEngine({ reactive: it, effect: Dn, release: Kn, raw: _ });
var Ai = X, Ci = Ai;
function Ti(e) {
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
function Pi(e, t) {
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
function Ri(e, t, r) {
  let n = r;
  return (!n || !(e != null && e.states[n])) && (n = e == null ? void 0 : e.defaultState), {
    value: n,
    /**
     * Transition to a new state, based on the current state and a valid transition event.
     * @param {string} event - Event to trigger the desired state transition.
     * @returns {void}
     */
    transition(i) {
      var w, O, P, f, p, g;
      const s = this.value, a = (w = e == null ? void 0 : e.states) == null ? void 0 : w[s], o = (O = a == null ? void 0 : a.transitions) == null ? void 0 : O[i], c = o == null ? void 0 : o.target, u = (P = e == null ? void 0 : e.states) == null ? void 0 : P[c];
      if (!a || !o || !c || !u) {
        t.track("Invalid State Transition", {
          current_state_str: s,
          event_str: i
        });
        return;
      }
      const l = (f = a.effects) == null ? void 0 : f.onExit;
      Se(l);
      const d = (p = o.effects) == null ? void 0 : p.onTransition;
      Se(d), this.value = c;
      const h = (g = u.effects) == null ? void 0 : g.onEntry;
      Se(h);
    }
  };
}
function Se(e) {
  e && e.length && e.forEach((t) => {
    t();
  });
}
const Si = "https://hook.us1.make.com/t9mrl5xiqcub1netw5sk7l1vjgoz3gt9", Oi = "https://hook.us1.make.com/7pyo51sq4xxjbpz14t03uomufndj45ut", Mi = "https://hook.us1.make.com/l9dtc4vhy7k2wjfy690wjtpxs92ra6e8";
async function $i(e) {
  return await st(Si, e, !0);
}
async function Ii(e) {
  await st(Oi, e, !1);
}
async function ji(e) {
  await st(Mi, e, !1);
}
async function st(e, t, r = !1) {
  const n = new Request(e, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(t)
  }), i = await fetch(n);
  if (!i.ok)
    throw new Error("Network response was not OK");
  if (r)
    return await i.json();
}
function Li(e) {
  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(e);
}
export {
  Ti as a,
  Pi as b,
  Ri as c,
  $i as d,
  Ii as e,
  Ci as m,
  ji as t,
  Li as v
};
