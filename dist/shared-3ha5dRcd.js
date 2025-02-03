const r = "https://hook.us1.make.com/t9mrl5xiqcub1netw5sk7l1vjgoz3gt9", c = "https://hook.us1.make.com/7pyo51sq4xxjbpz14t03uomufndj45ut", f = "https://hook.us1.make.com/l9dtc4vhy7k2wjfy690wjtpxs92ra6e8";
async function h(e) {
  return await s(r, e, !0);
}
async function p(e) {
  await s(c, e, !1);
}
async function m(e) {
  await s(f, e, !1);
}
async function s(e, t, a = !1) {
  const o = new Request(e, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(t)
  }), n = await fetch(o);
  if (!n.ok)
    throw new Error("Network response was not OK");
  if (a)
    return await n.json();
}
function C(e) {
  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(e);
}
const u = "https://get.geojs.io/v1/ip/geo.json";
async function l() {
  return await (await fetch(u)).json();
}
function g(e) {
  return {
    personalizationData: {},
    userGeo: {},
    getContent(t) {
      return t ? this.marketContentConfig[t] ?? this.defaultContentConfig[t] ?? "" : "";
    },
    get market() {
      const { region: t, city: a } = this.userGeo;
      if (!t || typeof t != "string" || !a || typeof a != "string")
        return null;
      for (const o of Object.keys(this.personalizationData).filter(
        (n) => n !== "DEFAULT"
      )) {
        const n = this.personalizationData[o];
        if (n.state.toLowerCase().trim() === t.toLowerCase().trim() && (!n.cities || n.cities.filter(
          (i) => i.toLowerCase().trim() === a.toLowerCase().trim()
        ).length > 0))
          return o;
      }
      return null;
    },
    get marketContentConfig() {
      let t = {};
      return this.market && this.personalizationData[this.market] && this.personalizationData[this.market].content && (t = this.personalizationData[this.market].content), t;
    },
    get defaultContentConfig() {
      let t = {};
      return this.personalizationData.DEFAULT && this.personalizationData.DEFAULT.content && (t = this.personalizationData.DEFAULT.content), t;
    },
    async init() {
      this.personalizationData = e, this.userGeo = await l();
    }
  };
}
export {
  p as a,
  h as b,
  g as c,
  m as t,
  C as v
};
