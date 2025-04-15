const r = "https://hook.us1.make.com/t9mrl5xiqcub1netw5sk7l1vjgoz3gt9", c = "https://hook.us1.make.com/7pyo51sq4xxjbpz14t03uomufndj45ut", u = "https://hook.us1.make.com/7v5cthrabpbte91f7cijshu2n3jttp43";
async function l(t) {
  return await o(r, t, !0);
}
async function p(t) {
  await o(c, t, !1);
}
async function m(t) {
  await o(u, t, !1);
}
async function o(t, e, a = !1) {
  const n = new Request(t, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(e)
  }), i = await fetch(n);
  if (!i.ok)
    throw new Error("Network response was not OK");
  if (a)
    return await i.json();
}
function E(t) {
  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(t);
}
const f = "https://get.geojs.io/v1/ip/geo.json";
async function h() {
  return await (await fetch(f)).json();
}
function C(t) {
  return {
    personalizationData: {},
    userGeo: {},
    getContent(e) {
      return e ? this.marketContentConfig[e] ?? this.defaultContentConfig[e] ?? "" : "";
    },
    get market() {
      const { region: e, city: a } = this.userGeo;
      if (!e || typeof e != "string" || !a || typeof a != "string")
        return null;
      for (const n of Object.keys(this.personalizationData).filter(
        (i) => i !== "DEFAULT"
      )) {
        const i = this.personalizationData[n];
        if (i.state.toLowerCase().trim() === e.toLowerCase().trim() && (!i.cities || i.cities.filter(
          (s) => s.toLowerCase().trim() === a.toLowerCase().trim()
        ).length > 0))
          return n;
      }
      return null;
    },
    get marketContentConfig() {
      let e = {};
      return this.market && this.personalizationData[this.market] && this.personalizationData[this.market].content && (e = this.personalizationData[this.market].content), e;
    },
    get defaultContentConfig() {
      let e = {};
      return this.personalizationData.DEFAULT && this.personalizationData.DEFAULT.content && (e = this.personalizationData.DEFAULT.content), e;
    },
    async init() {
      this.personalizationData = t, this.userGeo = await h();
    }
  };
}
function g() {
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
    setActiveExperimentVariation(t, e) {
      this.activeExperimentVariations[t] = e;
    },
    /**
     * Gets the active variation for a given experiment.
     * @param {string} experiment - The name of the experiment.
     * @returns {string} The name of the active variation.
     */
    getActiveExperimentVariation(t) {
      return this.activeExperimentVariations[t];
    },
    /**
     * Clears the active variation for a given experiment.
     * @param {string} experiment - The name of the experiment.
     * @returns {void}
     */
    clearActiveExperiment(t) {
      this.activeExperimentVariations[t] && delete this.activeExperimentVariations[t];
    }
  };
}
export {
  p as a,
  l as b,
  C as c,
  g as d,
  m as t,
  E as v
};
