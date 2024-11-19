const o = "https://hook.us1.make.com/t9mrl5xiqcub1netw5sk7l1vjgoz3gt9", r = "https://hook.us1.make.com/7pyo51sq4xxjbpz14t03uomufndj45ut", c = "https://hook.us1.make.com/l9dtc4vhy7k2wjfy690wjtpxs92ra6e8";
async function u(t) {
  return await a(o, t, !0);
}
async function m(t) {
  await a(r, t, !1);
}
async function E(t) {
  await a(c, t, !1);
}
async function a(t, e, n = !1) {
  const s = new Request(t, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(e)
  }), i = await fetch(s);
  if (!i.ok)
    throw new Error("Network response was not OK");
  if (n)
    return await i.json();
}
function p(t) {
  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(t);
}
function h() {
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
  m as a,
  u as b,
  h as c,
  E as t,
  p as v
};
