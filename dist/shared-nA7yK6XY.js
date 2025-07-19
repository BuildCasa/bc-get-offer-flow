const s = "https://hook.us1.make.com/t9mrl5xiqcub1netw5sk7l1vjgoz3gt9", c = "https://hook.us1.make.com/7pyo51sq4xxjbpz14t03uomufndj45ut", u = "https://hook.us1.make.com/7v5cthrabpbte91f7cijshu2n3jttp43";
async function f(e) {
  return await o(s, e, !0);
}
async function p(e) {
  await o(c, e, !1);
}
async function m(e) {
  await o(u, e, !1);
}
async function o(e, t, n = !1) {
  const a = new Request(e, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(t)
  }), i = await fetch(a);
  if (!i.ok)
    throw new Error("Network response was not OK");
  if (n)
    return await i.json();
}
function g(e) {
  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(e);
}
const l = "https://get.geojs.io/v1/ip/geo.json";
async function h() {
  return await (await fetch(l)).json();
}
function E(e) {
  return {
    loading: !0,
    personalizationData: {},
    userGeo: {},
    getContent(t) {
      return this.loading || !t ? "" : this.marketContentConfig[t] ?? this.defaultContentConfig[t] ?? "";
    },
    get market() {
      if (this.loading)
        return null;
      const { region: t, city: n } = this.userGeo;
      if (!t || typeof t != "string" || !n || typeof n != "string")
        return null;
      for (const a of Object.keys(this.personalizationData).filter(
        (i) => i !== "DEFAULT"
      )) {
        const i = this.personalizationData[a];
        if (i.state.toLowerCase().trim() === t.toLowerCase().trim() && (!i.cities || i.cities.filter(
          (r) => r.toLowerCase().trim() === n.toLowerCase().trim()
        ).length > 0))
          return a;
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
      this.loading = !0, this.personalizationData = e;
      try {
        this.userGeo = await h();
      } catch (t) {
        console.error("Error fetching user geolocation:", t), this.userGeo = {};
      }
      this.loading = !1;
    }
  };
}
function C() {
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
export {
  p as a,
  f as b,
  E as c,
  C as d,
  m as t,
  g as v
};
