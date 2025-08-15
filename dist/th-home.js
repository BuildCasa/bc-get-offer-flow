import { m as w, c as k, a as V, b } from "./shared-dpXQ-LAr.js";
import { v as U, t as B, c as v, d as x } from "./shared-nA7yK6XY.js";
const a = {
  STATES: {
    DEFAULT: "default",
    GET_STARTED: {
      DEFAULT_FILLOUT_FORM: "getStartedDefaultFilloutForm",
      // Default Fillout Form
      INTEREST_AREA_SEARCH: "modalGetStartedInterestAreaSearch",
      INTEREST_AREA_FILLOUT_FORM_A1: "modalGetStartedInterestAreaFilloutFormA1",
      INTEREST_AREA_FILLOUT_FORM_A2_ACTIONS: "modalGetStartedInterestAreaFilloutFormA2Actions",
      COMPLETE: {
        DEFAULT: "getStartedComplete",
        MODAL: "modalGetStartedComplete"
      }
    },
    BUYER_PROFILE: {
      FORM: "modalBuyerProfileForm"
    },
    BOOK_INTRO: {
      FORM: "modalBookIntroForm"
    },
    GET_VALUATION_REPORT: {
      FORM: "modalGetValuationReportForm"
    },
    GET_GUIDES: {
      FORM: "modalGuidesContactForm",
      PROCESSING: "modalGuidesContactFormProcessing",
      ERROR: "modalGuidesContactFormError",
      SUCCESS: "modalGuidesContactFormSuccess"
    }
  },
  EVENTS: {
    GET_STARTED: {
      START: "GET_STARTED_START"
    },
    INTEREST_AREA_SEARCH: {
      SELECT: "INTEREST_AREA_SEARCH_SELECT"
    },
    BUYER_PROFILE: {
      START: "BUYER_PROFILE_START"
    },
    BOOK_INTRO: {
      START: "BOOK_INTRO_START"
    },
    GET_VALUATION_REPORT: {
      START: "GET_VALUATION_REPORT_START"
    },
    GET_GUIDES: {
      START: "GET_GUIDES_START"
    },
    SUBMIT_CONTACT: {
      SUBMIT: "CONTACT_SUBMIT",
      SUCCESS: "CONTACT_SUBMIT_SUCCESS",
      ERROR: "CONTACT_SUBMIT_ERROR"
    },
    EXIT: "EXIT"
  }
};
function H(i, e) {
  const t = {
    [a.EVENTS.EXIT]: {
      target: a.STATES.DEFAULT,
      effects: {
        onTransition: [
          (n) => {
            e == null || e.track("Modal Closed", n);
          }
        ]
      }
    }
  }, o = {
    [a.EVENTS.EXIT]: {
      target: a.STATES.GET_STARTED.COMPLETE.DEFAULT,
      effects: {
        onTransition: [
          (n) => {
            e == null || e.track("Modal Closed", n);
          }
        ]
      }
    }
  }, s = {
    [a.EVENTS.INTEREST_AREA_SEARCH.SELECT]: () => {
      var l;
      let n = a.STATES.GET_STARTED.INTEREST_AREA_FILLOUT_FORM_A1;
      const S = (l = i.experimentationViewModel) == null ? void 0 : l.getActiveExperimentVariation(
        "interest-area-typeahead-2025-06"
      );
      return S && S === "interest-area-typeahead-fillout-form-a2-actions" && (n = a.STATES.GET_STARTED.INTEREST_AREA_FILLOUT_FORM_A2_ACTIONS), {
        target: n,
        effects: {
          onTransition: [
            (T) => {
              e.track("Interest Area Selected", T);
            }
          ]
        }
      };
    }
  }, r = {
    [a.EVENTS.SUBMIT_CONTACT.SUBMIT]: {
      target: a.STATES.GET_GUIDES.PROCESSING,
      effects: {
        onTransition: [
          (n) => {
            e == null || e.track("Guides Contact Submitted", n);
          }
        ]
      }
    }
  }, d = {
    onEntry: [async () => W(i)]
  };
  return {
    constants: a,
    defaultState: a.STATES.DEFAULT,
    states: {
      [a.STATES.DEFAULT]: {
        transitions: {
          ...s,
          [a.EVENTS.GET_STARTED.START]: () => {
            var l;
            let n = a.STATES.GET_STARTED.DEFAULT_FILLOUT_FORM;
            const S = (l = i.experimentationViewModel) == null ? void 0 : l.getActiveExperimentVariation(
              "interest-area-typeahead-2025-06"
            );
            return S && (S === "interest-area-typeahead-fillout-form-a1" || S === "interest-area-typeahead-fillout-form-a2-actions") && (n = a.STATES.GET_STARTED.INTEREST_AREA_SEARCH), {
              target: n,
              effects: {
                onTransition: [
                  (T) => {
                    e.track(
                      "Get Started Clicked",
                      T
                    );
                  }
                ]
              }
            };
          },
          [a.EVENTS.BOOK_INTRO.START]: {
            target: a.STATES.BOOK_INTRO.FORM,
            effects: {
              onTransition: [
                (n) => {
                  e.track(
                    "Book Intro Call Clicked",
                    n
                  );
                }
              ]
            }
          },
          [a.EVENTS.GET_VALUATION_REPORT.START]: {
            target: a.STATES.GET_VALUATION_REPORT.FORM,
            effects: {
              onTransition: [
                (n) => {
                  e.track(
                    "Get Valuation Report Clicked",
                    n
                  );
                }
              ]
            }
          },
          [a.EVENTS.GET_GUIDES.START]: {
            target: a.STATES.GET_GUIDES.FORM,
            effects: {
              onTransition: [
                (n) => {
                  e.track("Get Guide Clicked", n);
                }
              ]
            }
          }
        }
      },
      [a.STATES.GET_STARTED.DEFAULT_FILLOUT_FORM]: {
        transitions: {
          ...t
        }
      },
      [a.STATES.GET_STARTED.INTEREST_AREA_SEARCH]: {
        transitions: {
          ...s,
          ...t
        }
      },
      [a.STATES.GET_STARTED.INTEREST_AREA_FILLOUT_FORM_A1]: {
        transitions: {
          ...t
        }
      },
      [a.STATES.GET_STARTED.INTEREST_AREA_FILLOUT_FORM_A2_ACTIONS]: {
        transitions: {
          ...t
        }
      },
      [a.STATES.GET_STARTED.COMPLETE.DEFAULT]: {
        transitions: {
          [a.EVENTS.GET_STARTED.START]: {
            target: a.STATES.GET_STARTED.COMPLETE.MODAL,
            effects: {
              onTransition: [
                (n) => {
                  e.track("Get Started Clicked", n);
                }
              ]
            }
          },
          [a.EVENTS.BOOK_INTRO.START]: {
            target: a.STATES.BOOK_INTRO.FORM,
            effects: {
              onTransition: [
                (n) => {
                  e.track(
                    "Book Intro Call Clicked",
                    n
                  );
                }
              ]
            }
          },
          [a.EVENTS.GET_VALUATION_REPORT.START]: {
            target: a.STATES.GET_VALUATION_REPORT.FORM,
            effects: {
              onTransition: [
                (n) => {
                  e.track(
                    "Get Valuation Report Clicked",
                    n
                  );
                }
              ]
            }
          },
          [a.EVENTS.GET_GUIDES.START]: {
            target: a.STATES.GET_GUIDES.FORM,
            effects: {
              onTransition: [
                (n) => {
                  e.track("Get Guide Clicked", n);
                }
              ]
            }
          }
        }
      },
      [a.STATES.GET_STARTED.COMPLETE.MODAL]: {
        transitions: {
          ...o,
          [a.EVENTS.BUYER_PROFILE.START]: {
            target: a.STATES.BUYER_PROFILE.FORM,
            effects: {
              onTransition: [
                (n) => {
                  e.track(
                    "Fill Out Buyer Profile Clicked",
                    n
                  );
                }
              ]
            }
          },
          [a.EVENTS.BOOK_INTRO.START]: {
            target: a.STATES.BOOK_INTRO.FORM,
            effects: {
              onTransition: [
                (n) => {
                  e.track(
                    "Book Intro Call Clicked",
                    n
                  );
                }
              ]
            }
          }
        }
      },
      [a.STATES.BUYER_PROFILE.FORM]: {
        transitions: {
          ...o
        }
      },
      [a.STATES.BOOK_INTRO.FORM]: {
        transitions: {
          ...t
        }
      },
      [a.STATES.GET_VALUATION_REPORT.FORM]: {
        transitions: {
          ...t
        }
      },
      [a.STATES.GET_GUIDES.FORM]: {
        transitions: {
          ...t,
          ...r
        }
      },
      [a.STATES.GET_GUIDES.PROCESSING]: {
        transitions: {
          ...t,
          [a.EVENTS.SUBMIT_CONTACT.SUCCESS]: {
            target: a.STATES.GET_GUIDES.SUCCESS,
            effects: {
              onTransition: [
                (n) => {
                  e.track(
                    "Guides Contact Submission Succeeded",
                    n
                  );
                }
              ]
            }
          },
          [a.EVENTS.SUBMIT_CONTACT.ERROR]: {
            target: a.STATES.GET_GUIDES.ERROR,
            effects: {
              onTransition: [
                (n) => {
                  e.track("Guides Contact Submission Failed", {
                    ...n,
                    error_str: i.thGuidesContactViewModel.errorMessage
                  });
                }
              ]
            }
          }
        },
        effects: d
      },
      [a.STATES.GET_GUIDES.ERROR]: {
        transitions: {
          ...t,
          ...r
        },
        effects: {
          onExit: [
            () => {
              i.thGuidesContactViewModel.errorMessage = "";
            }
          ]
        }
      },
      [a.STATES.GET_GUIDES.SUCCESS]: {
        transitions: {
          ...t
        },
        effects: {
          onEntry: [
            () => {
              i.thGuidesDownloadViewModel.downloadButtonElement.click();
            }
          ]
        }
      }
    }
  };
}
function K(i) {
  return {
    modal: {
      get isOpen() {
        return [
          a.STATES.GET_STARTED.DEFAULT_FILLOUT_FORM,
          a.STATES.GET_STARTED.INTEREST_AREA_SEARCH,
          a.STATES.GET_STARTED.INTEREST_AREA_FILLOUT_FORM_A1,
          a.STATES.GET_STARTED.INTEREST_AREA_FILLOUT_FORM_A2_ACTIONS,
          a.STATES.GET_STARTED.COMPLETE.MODAL,
          a.STATES.BUYER_PROFILE.FORM,
          a.STATES.GET_VALUATION_REPORT.FORM,
          a.STATES.BOOK_INTRO.FORM,
          a.STATES.GET_GUIDES.FORM,
          a.STATES.GET_GUIDES.PROCESSING,
          a.STATES.GET_GUIDES.ERROR,
          a.STATES.GET_GUIDES.SUCCESS
        ].includes(i.flowState.value);
      }
    }
  };
}
async function W(i) {
  try {
    let e = {
      firstName: i.thGuidesContactViewModel.firstName.trim(),
      lastName: i.thGuidesContactViewModel.lastName.trim(),
      email: i.thGuidesContactViewModel.email.trim()
    };
    if (!U(e.email))
      throw new Error("Please enter a valid email address, and try again.", {
        cause: "INVALID_EMAIL"
      });
    const t = {
      ...i.thGuidesContactViewModel.options,
      contact: e
    };
    await Promise.all([B(t)]), i.thGuidesContactViewModel.isSubmitted = !0, i.flowState.transition(
      a.EVENTS.SUBMIT_CONTACT.SUCCESS
    );
  } catch (e) {
    console.log("Error submitting contact:", e), e && e.cause && e.cause === "INVALID_EMAIL" ? i.thGuidesContactViewModel.errorMessage = e.message : i.thGuidesContactViewModel.errorMessage = "There was an error processing your info. Please try again, or contact us for help.", i.flowState.transition(a.EVENTS.SUBMIT_CONTACT.ERROR);
  }
}
function j(i, e, t, o) {
  function s(r) {
    return r instanceof t ? r : new t(function(d) {
      d(r);
    });
  }
  return new (t || (t = Promise))(function(r, d) {
    function u(l) {
      try {
        S(o.next(l));
      } catch (T) {
        d(T);
      }
    }
    function n(l) {
      try {
        S(o.throw(l));
      } catch (T) {
        d(T);
      }
    }
    function S(l) {
      l.done ? r(l.value) : s(l.value).then(u, n);
    }
    S((o = o.apply(i, e || [])).next());
  });
}
function Y(i) {
  return i && i.__esModule && Object.prototype.hasOwnProperty.call(i, "default") ? i.default : i;
}
var $ = function i(e, t) {
  if (e === t)
    return !0;
  if (e && t && typeof e == "object" && typeof t == "object") {
    if (e.constructor !== t.constructor)
      return !1;
    var o, s, r;
    if (Array.isArray(e)) {
      if (o = e.length, o != t.length)
        return !1;
      for (s = o; s-- !== 0; )
        if (!i(e[s], t[s]))
          return !1;
      return !0;
    }
    if (e.constructor === RegExp)
      return e.source === t.source && e.flags === t.flags;
    if (e.valueOf !== Object.prototype.valueOf)
      return e.valueOf() === t.valueOf();
    if (e.toString !== Object.prototype.toString)
      return e.toString() === t.toString();
    if (r = Object.keys(e), o = r.length, o !== Object.keys(t).length)
      return !1;
    for (s = o; s-- !== 0; )
      if (!Object.prototype.hasOwnProperty.call(t, r[s]))
        return !1;
    for (s = o; s-- !== 0; ) {
      var d = r[s];
      if (!i(e[d], t[d]))
        return !1;
    }
    return !0;
  }
  return e !== e && t !== t;
}, J = /* @__PURE__ */ Y($);
const P = "__googleMapsScriptId";
var E;
(function(i) {
  i[i.INITIALIZED = 0] = "INITIALIZED", i[i.LOADING = 1] = "LOADING", i[i.SUCCESS = 2] = "SUCCESS", i[i.FAILURE = 3] = "FAILURE";
})(E || (E = {}));
class m {
  /**
   * Creates an instance of Loader using [[LoaderOptions]]. No defaults are set
   * using this library, instead the defaults are set by the Google Maps
   * JavaScript API server.
   *
   * ```
   * const loader = Loader({apiKey, version: 'weekly', libraries: ['places']});
   * ```
   */
  constructor({ apiKey: e, authReferrerPolicy: t, channel: o, client: s, id: r = P, language: d, libraries: u = [], mapIds: n, nonce: S, region: l, retries: T = 3, url: A = "https://maps.googleapis.com/maps/api/js", version: p }) {
    if (this.callbacks = [], this.done = !1, this.loading = !1, this.errors = [], this.apiKey = e, this.authReferrerPolicy = t, this.channel = o, this.client = s, this.id = r || P, this.language = d, this.libraries = u, this.mapIds = n, this.nonce = S, this.region = l, this.retries = T, this.url = A, this.version = p, m.instance) {
      if (!J(this.options, m.instance.options))
        throw new Error(`Loader must not be called again with different options. ${JSON.stringify(this.options)} !== ${JSON.stringify(m.instance.options)}`);
      return m.instance;
    }
    m.instance = this;
  }
  get options() {
    return {
      version: this.version,
      apiKey: this.apiKey,
      channel: this.channel,
      client: this.client,
      id: this.id,
      libraries: this.libraries,
      language: this.language,
      region: this.region,
      mapIds: this.mapIds,
      nonce: this.nonce,
      url: this.url,
      authReferrerPolicy: this.authReferrerPolicy
    };
  }
  get status() {
    return this.errors.length ? E.FAILURE : this.done ? E.SUCCESS : this.loading ? E.LOADING : E.INITIALIZED;
  }
  get failed() {
    return this.done && !this.loading && this.errors.length >= this.retries + 1;
  }
  /**
   * CreateUrl returns the Google Maps JavaScript API script url given the [[LoaderOptions]].
   *
   * @ignore
   * @deprecated
   */
  createUrl() {
    let e = this.url;
    return e += "?callback=__googleMapsCallback&loading=async", this.apiKey && (e += `&key=${this.apiKey}`), this.channel && (e += `&channel=${this.channel}`), this.client && (e += `&client=${this.client}`), this.libraries.length > 0 && (e += `&libraries=${this.libraries.join(",")}`), this.language && (e += `&language=${this.language}`), this.region && (e += `&region=${this.region}`), this.version && (e += `&v=${this.version}`), this.mapIds && (e += `&map_ids=${this.mapIds.join(",")}`), this.authReferrerPolicy && (e += `&auth_referrer_policy=${this.authReferrerPolicy}`), e;
  }
  deleteScript() {
    const e = document.getElementById(this.id);
    e && e.remove();
  }
  /**
   * Load the Google Maps JavaScript API script and return a Promise.
   * @deprecated, use importLibrary() instead.
   */
  load() {
    return this.loadPromise();
  }
  /**
   * Load the Google Maps JavaScript API script and return a Promise.
   *
   * @ignore
   * @deprecated, use importLibrary() instead.
   */
  loadPromise() {
    return new Promise((e, t) => {
      this.loadCallback((o) => {
        o ? t(o.error) : e(window.google);
      });
    });
  }
  importLibrary(e) {
    return this.execute(), google.maps.importLibrary(e);
  }
  /**
   * Load the Google Maps JavaScript API script with a callback.
   * @deprecated, use importLibrary() instead.
   */
  loadCallback(e) {
    this.callbacks.push(e), this.execute();
  }
  /**
   * Set the script on document.
   */
  setScript() {
    var e, t;
    if (document.getElementById(this.id)) {
      this.callback();
      return;
    }
    const o = {
      key: this.apiKey,
      channel: this.channel,
      client: this.client,
      libraries: this.libraries.length && this.libraries,
      v: this.version,
      mapIds: this.mapIds,
      language: this.language,
      region: this.region,
      authReferrerPolicy: this.authReferrerPolicy
    };
    Object.keys(o).forEach(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (r) => !o[r] && delete o[r]
    ), !((t = (e = window == null ? void 0 : window.google) === null || e === void 0 ? void 0 : e.maps) === null || t === void 0) && t.importLibrary || ((r) => {
      let d, u, n, S = "The Google Maps JavaScript API", l = "google", T = "importLibrary", A = "__ib__", p = document, g = window;
      g = g[l] || (g[l] = {});
      const C = g.maps || (g.maps = {}), L = /* @__PURE__ */ new Set(), f = new URLSearchParams(), F = () => (
        // @ts-ignore
        d || (d = new Promise((M, y) => j(this, void 0, void 0, function* () {
          var _;
          yield u = p.createElement("script"), u.id = this.id, f.set("libraries", [...L] + "");
          for (n in r)
            f.set(n.replace(/[A-Z]/g, (D) => "_" + D[0].toLowerCase()), r[n]);
          f.set("callback", l + ".maps." + A), u.src = this.url + "?" + f, C[A] = M, u.onerror = () => d = y(Error(S + " could not load.")), u.nonce = this.nonce || ((_ = p.querySelector("script[nonce]")) === null || _ === void 0 ? void 0 : _.nonce) || "", p.head.append(u);
        })))
      );
      C[T] ? console.warn(S + " only loads once. Ignoring:", r) : C[T] = (M, ...y) => L.add(M) && F().then(() => C[T](M, ...y));
    })(o);
    const s = this.libraries.map((r) => this.importLibrary(r));
    s.length || s.push(this.importLibrary("core")), Promise.all(s).then(() => this.callback(), (r) => {
      const d = new ErrorEvent("error", { error: r });
      this.loadErrorCallback(d);
    });
  }
  /**
   * Reset the loader state.
   */
  reset() {
    this.deleteScript(), this.done = !1, this.loading = !1, this.errors = [], this.onerrorEvent = null;
  }
  resetIfRetryingFailed() {
    this.failed && this.reset();
  }
  loadErrorCallback(e) {
    if (this.errors.push(e), this.errors.length <= this.retries) {
      const t = this.errors.length * Math.pow(2, this.errors.length);
      console.error(`Failed to load Google Maps script, retrying in ${t} ms.`), setTimeout(() => {
        this.deleteScript(), this.setScript();
      }, t);
    } else
      this.onerrorEvent = e, this.callback();
  }
  callback() {
    this.done = !0, this.loading = !1, this.callbacks.forEach((e) => {
      e(this.onerrorEvent);
    }), this.callbacks = [];
  }
  execute() {
    if (this.resetIfRetryingFailed(), !this.loading)
      if (this.done)
        this.callback();
      else {
        if (window.google && window.google.maps && window.google.maps.version) {
          console.warn("Google Maps already loaded outside @googlemaps/js-api-loader. This may result in undesirable behavior as options and script parameters may not match."), this.callback();
          return;
        }
        this.loading = !0, this.setScript();
      }
  }
}
const z = "AIzaSyCOAucx7oi5vgR0w5CUfLj6G67YZINBSMc", q = new m({
  apiKey: z,
  version: "weekly"
});
let I = null, O = null;
async function X() {
  try {
    const i = await q.importLibrary("places");
    I = i.AutocompleteSuggestion, O = i.AutocompleteSessionToken;
  } catch (i) {
    console.error("Error loading Google Maps Places library:", i);
  }
}
function Z() {
  if (O)
    return new O();
}
async function Q(i, e) {
  if (I)
    try {
      const { suggestions: t } = await I.fetchAutocompleteSuggestions({
        input: i,
        language: "en-US",
        region: "us",
        sessionToken: e,
        includedRegionCodes: ["us"],
        includedPrimaryTypes: [
          "administrative_area_level_1",
          "locality",
          "postal_code"
        ]
      });
      return t.map((o) => ({
        placePrediction: o.placePrediction,
        text: o.placePrediction.text.toString()
      }));
    } catch (t) {
      throw console.error(
        "Error fetching Google Places Autocomplete suggestions:",
        t
      ), new Error(
        "There was an error finding your address. Please try again, or contact us for help."
      );
    }
}
function ee(i) {
  return i.addressComponents && (i.addressComponents.some(
    (e) => e.types[0] === "locality"
  ) || i.addressComponents.some(
    (e) => e.types[0] === "administrative_area_level_1"
  ) || i.addressComponents.some(
    (e) => e.types[0] === "postal_code"
  ));
}
function te(i, e) {
  return {
    // Instance properties
    inputValue: "",
    sessionToken: "",
    suggestions: [],
    keyboardNavIndex: -1,
    selectedPlace: {},
    isSubmitted: !1,
    errorMessage: "",
    /**
     * Initializes the InterestAreaViewModel instance properties.
     * Run automatically by Alpine, but can also be called manually to reset the view model state.
     * Need to call this manually on store creation if we stop using Alpine as our UI library.
     * @returns {void}
     */
    async init() {
      this.inputValue = "", this.suggestions = [], this.keyboardNavIndex = -1, this.selectedPlace = {}, this.isSubmitted = !1, this.errorMessage = "", await X(), this.refreshSessionToken();
    },
    refreshSessionToken() {
      this.sessionToken = Z();
    },
    /**
     * Whether or not an location match has been selected with the typeahead.
     * @type {boolean}
     */
    get isSelected() {
      return Object.keys(this.selectedPlace).length != 0;
    },
    get isSelectedValid() {
      return ee(this.selectedPlace);
    },
    get selectedCity() {
      var o;
      let t;
      return this.isSelectedValid && (t = (o = this.selectedPlace.addressComponents.find(
        (s) => s.types.includes("locality")
      )) == null ? void 0 : o.longText), t;
    },
    get selectedState() {
      var o;
      let t;
      return this.isSelectedValid && (t = (o = this.selectedPlace.addressComponents.find(
        (s) => s.types.includes("administrative_area_level_1")
      )) == null ? void 0 : o.shortText), t;
    },
    get selectedPostalCode() {
      var o;
      let t;
      return this.isSelectedValid && (t = (o = this.selectedPlace.addressComponents.find(
        (s) => s.types.includes("postal_code")
      )) == null ? void 0 : o.shortText), t;
    },
    /**
     * Handles input events from the location typeahead input field.
     * Fetches and updates location suggestions based on the current input value.
     * @returns {Promise.<void>} Promise that resolves when input handling is complete.
     */
    async handleInput() {
      if (this.isSubmitted && (this.isSubmitted = !1), this.errorMessage && (this.errorMessage = ""), this.isSelected && (this.selectedPlace = {}), !this.inputValue) {
        this.suggestions = [];
        return;
      }
      try {
        this.suggestions = await Q(
          this.inputValue,
          this.sessionToken
        );
      } catch (t) {
        this.errorMessage = t.message;
      }
    },
    /**
     * Handles keyboard events for the location typeahead input field.
     * Navigates up or down the list of matches if ArrowUp or ArrowDown are pressed.
     * Selects the location at the current keyboardNavIndex if Enter is pressed.
     * @param {KeyboardEvent} event - Keyboard event object.
     * @returns {void}
     */
    handleKeydown(t) {
      t.key != "Enter" && t.key != "ArrowUp" && t.key != "ArrowDown" || this.isSelected || this.suggestions.length === 0 || (t.preventDefault(), t.stopPropagation(), t.key === "Enter" && this.keyboardNavIndex != -1 ? this.selectSuggestion(this.suggestions[this.keyboardNavIndex]) : t.key === "ArrowUp" ? this.keyboardNavIndex = this.keyboardNavIndex <= -1 ? this.suggestions.length - 1 : this.keyboardNavIndex - 1 : t.key === "ArrowDown" && (this.keyboardNavIndex = this.keyboardNavIndex >= this.suggestions.length - 1 ? -1 : this.keyboardNavIndex + 1));
    },
    async selectSuggestion(t) {
      let o = t.placePrediction.toPlace();
      await o.fetchFields({
        fields: ["displayName", "formattedAddress", "addressComponents"]
      }), this.selectedPlace = o, this.inputValue = o.formattedAddress, this.isSelectedValid || (this.errorMessage = "Please select a valid US city, state, or postal code to continue, or contact us for help."), e.track("Interest Area Selected"), this.refreshSessionToken(), this.suggestions = [], this.keyboardNavIndex = -1, this.isSelectedValid && (this.isSubmitted = !0, i.transition(a.EVENTS.INTEREST_AREA_SEARCH.SELECT), this.isSubmitted = !1);
    },
    handleSubmit(t) {
      t.preventDefault(), t.stopPropagation(), !this.isSubmitted && (this.isSubmitted = !0, this.isSelected && this.isSelectedValid && i.transition(a.EVENTS.INTEREST_AREA_SEARCH.SELECT), this.isSubmitted = !1);
    }
  };
}
function ie(i) {
  return {
    // Instance properties
    loading: !0,
    email: "",
    phone: "",
    /**
     * Initializes the THConvertedContactViewModel instance properties.
     * Run automatically by Alpine, but can also be called manually to reset the view model state.
     * Need to call this manually on store creation if we stop using Alpine as our UI library.
     * @returns {void}
     */
    init() {
      this.loading = !0, this.email = (i == null ? void 0 : i.email) || "", this.phone = (i == null ? void 0 : i.phone) || "", this.loading = !1;
    }
  };
}
function ae(i) {
  return {
    // Instance properties
    GUIDES: {
      HOMEBUYING: "homebuying",
      OFFERS: "offers",
      CLOSING: "closing"
    },
    guide: "",
    downloadButtonElement: null,
    /**
     * Initializes the THGuidesDownloadViewModel instance properties.
     * Run automatically by Alpine, but can also be called manually to reset the view model state.
     * Need to call this manually on store creation if we stop using Alpine as our UI library.
     * @returns {void}
     */
    init() {
      this.guide = "", this.downloadButtonElement = null;
    },
    /**
     * Handles the click event for a Guide Download button.
     * @param {MouseEvent} event - Mouse event object.
     * @returns {void}
     */
    handleDownloadClick(e, t) {
      this.guide = t, this.downloadButtonElement = e.target;
      const o = i.thGuidesContactViewModel.isSubmitted;
      o || (e.preventDefault(), i.flowState.transition(
        a.EVENTS.GET_GUIDES.START,
        {
          guide_str: this.guide,
          contact_submitted_str: o
        }
      ));
    }
  };
}
function oe(i) {
  return {
    // Instance properties
    firstName: "",
    lastName: "",
    email: "",
    options: {},
    isSubmitted: !1,
    errorMessage: "",
    /**
     * Initializes the ContactViewModel instance properties.
     * Run automatically by Alpine, but can also be called manually to reset the view model state.
     * Need to call this manually on store creation if we stop using Alpine as our UI library.
     * @returns {void}
     */
    init() {
      this.firstName = "", this.lastName = "", this.email = "", this.options = {}, this.isSubmitted = !1, this.errorMessage = "";
    },
    /**
     * Whether or not any contact details have been added.
     * @type {boolean}
     */
    get hasAnyContactDetails() {
      return !!this.firstName.trim() || !!this.lastName.trim() || !!this.email.trim();
    },
    /**
     * Handles the submission event for the contact form.
     * @param {SubmitEvent} event - Form submission event object.
     * @param {object} options - Additional options for the submission.
     * @returns {void}
     */
    handleSubmit(e, t = {}) {
      e.preventDefault(), e.stopPropagation(), this.options = t, i.transition(a.EVENTS.SUBMIT_CONTACT.SUBMIT);
    }
  };
}
const ne = 0.03, se = 0.01, re = 15e5, le = 75e5, ce = 25e4, de = 5e4;
function Se(i = {}) {
  return {
    listPrice: null,
    init: function() {
      this.listPrice = this.defaultListPrice;
    },
    /**
     * Computed property that returns the value of the calcCommissionRate key in the personalizationViewModel
     *
     * @type {number}
     */
    get commissionRate() {
      return i.getContent("calcCommissionRate") || ne;
    },
    /**
     * Computed property that returns the value of the calcSplitCommissionRate key in the personalizationViewModel
     *
     * @type {number}
     */
    get splitCommissionRate() {
      return i.getContent("calcSplitCommissionRate") || se;
    },
    /**
     * Computed property that returns the value of the calcDefaultlistPrice key in the personalizationViewModel
     *
     * Add Alpine attribute to calc slider input element to update input value when this changes:
     * x-init=$watch('$store.thCalculatorViewModel.defaultlistPrice', (newVal, oldVal) => $store.thCalculatorViewModel.listPrice = newVal)
     *
     * @type {number}
     */
    get defaultListPrice() {
      return i.getContent("calcDefaultListPrice") || re;
    },
    /**
     * Computed property that returns the value of the calcMaxlistPrice key in the personalizationViewModel
     *
     * Add Alpine attribute to calc slider input element to set max value of input element:
     * x-bind:max=$store.thCalculatorViewModel.maxlistPrice
     *
     * @type {number}
     */
    get maxListPrice() {
      return i.getContent("calcMaxListPrice") || le;
    },
    /**
     * Computed property that returns the value of the calcMinlistPrice key in the personalizationViewModel
     *
     * Add Alpine attribute to calc slider input element to set min value of input element:
     * x-bind:min=$store.thCalculatorViewModel.minlistPrice
     *
     * @type {number}
     */
    get minListPrice() {
      return i.getContent("calcMinListPrice") || ce;
    },
    /**
     * Computed property that returns the value of the calcInputStep key in the personalizationViewModel
     *
     * Add Alpine attribute to calc slider input element to set step value of input element:
     * x-bind:step=$store.thCalculatorViewModel.inputStep
     *
     * @type {number}
     */
    get inputStep() {
      return i.getContent("calcInputStep") || de;
    },
    get formattedListPrice() {
      return G(this.listPrice);
    },
    get turboHomeFee() {
      return i.getContent("pricingModel") === "Split Commission" ? this.listPrice * (this.commissionRate - this.splitCommissionRate) : this.listPrice <= 5e5 ? 6e3 : this.listPrice <= 1e6 ? 9e3 : this.listPrice <= 2e6 ? 12e3 : this.listPrice <= 3e6 ? 15e3 : this.listPrice <= 5e6 ? 2e4 : 3e4;
    },
    get cashBack() {
      return Math.round(
        this.listPrice * this.commissionRate - this.turboHomeFee
      );
    },
    get formattedCashBack() {
      return G(this.cashBack);
    }
  };
}
function G(i) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  }).format(i);
}
const Te = {
  content: {
    phoneNumberText: "(888) 516-6331",
    phoneNumberLink: "tel:+18885166331",
    pricingModel: "Split Commission",
    calcCommissionRate: 0.03,
    calcSplitCommissionRate: 0.01,
    calcDefaultListPrice: 15e5,
    calcMaxListPrice: 75e5,
    calcMinListPrice: 25e4,
    calcInputStep: 5e4
  }
}, ue = {
  content: {
    phoneNumberText: "(510) 391-5392",
    phoneNumberLink: "tel:+15103915392",
    pricingModel: "Flat Fee"
  },
  state: "California",
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
}, he = {
  content: {
    pricingModel: "Split Commission"
  },
  state: "Alaska"
}, me = {
  content: {
    pricingModel: "Split Commission"
  },
  state: "Alabama"
}, Ee = {
  content: {
    pricingModel: "Split Commission"
  },
  state: "Arkansas"
}, pe = {
  content: {
    pricingModel: "Split Commission"
  },
  state: "Arizona"
}, ge = {
  content: {
    phoneNumberText: "(510) 391-5392",
    phoneNumberLink: "tel:+15103915392",
    pricingModel: "Flat Fee"
  },
  state: "California"
}, Ae = {
  content: {
    pricingModel: "Split Commission"
  },
  state: "Colorado"
}, Ce = {
  content: {
    pricingModel: "Split Commission"
  },
  state: "Connecticut"
}, fe = {
  content: {
    pricingModel: "Split Commission"
  },
  state: "Delaware"
}, Me = {
  content: {
    pricingModel: "Split Commission"
  },
  state: "Florida"
}, Re = {
  content: {
    pricingModel: "Split Commission"
  },
  state: "Georgia"
}, ye = {
  content: {
    pricingModel: "Split Commission"
  },
  state: "Hawaii"
}, _e = {
  content: {
    pricingModel: "Split Commission"
  },
  state: "Idaho"
}, Ie = {
  content: {
    pricingModel: "Split Commission"
  },
  state: "Illinois"
}, Oe = {
  content: {
    pricingModel: "Split Commission"
  },
  state: "Indiana"
}, we = {
  content: {
    pricingModel: "Split Commission"
  },
  state: "Iowa"
}, Le = {
  content: {
    pricingModel: "Split Commission"
  },
  state: "Kansas"
}, Pe = {
  content: {
    pricingModel: "Split Commission"
  },
  state: "Kentucky"
}, Ge = {
  content: {
    pricingModel: "Split Commission"
  },
  state: "Louisiana"
}, Ne = {
  content: {
    pricingModel: "Split Commission"
  },
  state: "Maine"
}, Fe = {
  content: {
    pricingModel: "Split Commission"
  },
  state: "Maryland"
}, De = {
  content: {
    pricingModel: "Split Commission"
  },
  state: "Massachusetts"
}, ke = {
  content: {
    pricingModel: "Split Commission"
  },
  state: "Michigan"
}, Ve = {
  content: {
    pricingModel: "Split Commission"
  },
  state: "Minnesota"
}, be = {
  content: {
    pricingModel: "Split Commission"
  },
  state: "Mississippi"
}, Ue = {
  content: {
    pricingModel: "Split Commission"
  },
  state: "Missouri"
}, Be = {
  content: {
    pricingModel: "Split Commission"
  },
  state: "Montana"
}, ve = {
  content: {
    pricingModel: "Split Commission"
  },
  state: "Nebraska"
}, xe = {
  content: {
    pricingModel: "Split Commission"
  },
  state: "Nevada"
}, He = {
  content: {
    pricingModel: "Split Commission"
  },
  state: "Ohio"
}, Ke = {
  content: {
    pricingModel: "Split Commission"
  },
  state: "Oklahoma"
}, We = {
  content: {
    pricingModel: "Split Commission"
  },
  state: "Oregon"
}, je = {
  content: {
    pricingModel: "Split Commission"
  },
  state: "Pennsylvania"
}, Ye = {
  content: {
    pricingModel: "Split Commission"
  },
  state: "Tennessee"
}, $e = {
  content: {
    phoneNumberText: "(469) 564-1214",
    phoneNumberLink: "tel:+14695641214",
    pricingModel: "Flat Fee"
  },
  state: "Texas"
}, Je = {
  content: {
    pricingModel: "Split Commission"
  },
  state: "Utah"
}, ze = {
  content: {
    pricingModel: "Split Commission"
  },
  state: "Vermont"
}, qe = {
  content: {
    pricingModel: "Split Commission"
  },
  state: "Virginia"
}, Xe = {
  content: {
    pricingModel: "Split Commission"
  },
  state: "Washington"
}, Ze = {
  content: {
    pricingModel: "Split Commission"
  },
  state: "Wisconsin"
}, Qe = {
  content: {
    pricingModel: "Split Commission"
  },
  state: "Wyoming"
}, et = {
  DEFAULT: Te,
  "Bay Area": {
    content: {
      phoneNumberText: "(510) 391-5392",
      phoneNumberLink: "tel:+15103915392",
      pricingModel: "Flat Fee"
    },
    state: "California",
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
  Sacramento: ue,
  "Southern California": {
    content: {
      phoneNumberText: "(323) 310-3103",
      phoneNumberLink: "tel:+13233103103",
      pricingModel: "Flat Fee"
    },
    state: "California",
    cities: [
      "Agoura Hills",
      "Alhambra",
      "Arcadia",
      "Artesia",
      "Avalon",
      "Azusa",
      "Baldwin Park",
      "Bell",
      "Bellflower",
      "Bell Gardens",
      "Beverly Hills",
      "Bradbury",
      "Burbank",
      "Calabasas",
      "Carson",
      "Cerritos",
      "Claremont",
      "Commerce",
      "Compton",
      "Covina",
      "Cudahy",
      "Culver City",
      "Diamond Bar",
      "Downey",
      "Duarte",
      "El Monte",
      "El Segundo",
      "Gardena",
      "Glendale",
      "Glendora",
      "Hawaiian Gardens",
      "Hawthorne",
      "Hermosa Beach",
      "Hidden Hills",
      "Huntington Park",
      "Industry",
      "Inglewood",
      "Irwindale",
      "La Cañada Flintridge",
      "La Habra Heights",
      "La Mirada",
      "La Puente",
      "La Verne",
      "Lakewood",
      "Lancaster",
      "Lawndale",
      "Lomita",
      "Long Beach",
      "Los Angeles",
      "Lynwood",
      "Malibu",
      "Manhattan Beach",
      "Maywood",
      "Monrovia",
      "Montebello",
      "Monterey Park",
      "Norwalk",
      "Palmdale",
      "Palos Verdes Estates",
      "Paramount",
      "Pasadena",
      "Pico Rivera",
      "Pomona",
      "Rancho Palos Verdes",
      "Redondo Beach",
      "Rolling Hills",
      "Rolling Hills Estates",
      "Rosemead",
      "San Dimas",
      "San Fernando",
      "San Gabriel",
      "San Marino",
      "Santa Clarita",
      "Santa Fe Springs",
      "Santa Monica",
      "Sierra Madre",
      "Signal Hill",
      "South El Monte",
      "South Gate",
      "South Pasadena",
      "Temple City",
      "Torrance",
      "Vernon",
      "Walnut",
      "West Covina",
      "West Hollywood",
      "Westlake Village",
      "Whittier",
      "Carlsbad",
      "Chula Vista",
      "Coronado",
      "Del Mar",
      "El Cajon",
      "Encinitas",
      "Escondido",
      "Imperial Beach",
      "La Mesa",
      "Lemon Grove",
      "National City",
      "Oceanside",
      "Poway",
      "San Diego",
      "San Marcos",
      "Santee",
      "Solana Beach",
      "Vista",
      "Banning",
      "Beaumont",
      "Blythe",
      "Calimesa",
      "Canyon Lake",
      "Cathedral City",
      "Coachella",
      "Corona",
      "Desert Hot Springs",
      "Eastvale",
      "Hemet",
      "Indian Wells",
      "Indio",
      "Jurupa Valley",
      "La Quinta",
      "Lake Elsinore",
      "Menifee",
      "Moreno Valley",
      "Murrieta",
      "Norco",
      "Palm Desert",
      "Palm Springs",
      "Perris",
      "Rancho Mirage",
      "Riverside",
      "San Jacinto",
      "Temecula",
      "Wildomar"
    ]
  },
  Alaska: he,
  Alabama: me,
  Arkansas: Ee,
  Arizona: pe,
  California: ge,
  Colorado: Ae,
  Connecticut: Ce,
  Delaware: fe,
  Florida: Me,
  Georgia: Re,
  Hawaii: ye,
  Idaho: _e,
  Illinois: Ie,
  Indiana: Oe,
  Iowa: we,
  Kansas: Le,
  Kentucky: Pe,
  Louisiana: Ge,
  Maine: Ne,
  Maryland: Fe,
  Massachusetts: De,
  Michigan: ke,
  Minnesota: Ve,
  Mississippi: be,
  Missouri: Ue,
  Montana: Be,
  Nebraska: ve,
  Nevada: xe,
  "New Hampshire": {
    content: {
      pricingModel: "Split Commission"
    },
    state: "New Hampshire"
  },
  "New Jersey": {
    content: {
      pricingModel: "Split Commission"
    },
    state: "New Jersey"
  },
  "New Mexico": {
    content: {
      pricingModel: "Split Commission"
    },
    state: "New Mexico"
  },
  "New York": {
    content: {
      pricingModel: "Flat Fee"
    },
    state: "New York"
  },
  "North Carolina": {
    content: {
      pricingModel: "Split Commission"
    },
    state: "North Carolina"
  },
  "North Dakota": {
    content: {
      pricingModel: "Split Commission"
    },
    state: "North Dakota"
  },
  Ohio: He,
  Oklahoma: Ke,
  Oregon: We,
  Pennsylvania: je,
  "Rhode Island": {
    content: {
      pricingModel: "Split Commission"
    },
    state: "Rhode Island"
  },
  "South Carolina": {
    content: {
      pricingModel: "Split Commission"
    },
    state: "South Carolina"
  },
  "South Dakota": {
    content: {
      pricingModel: "Split Commission"
    },
    state: "South Dakota"
  },
  Tennessee: Ye,
  Texas: $e,
  Utah: Je,
  Vermont: ze,
  Virginia: qe,
  Washington: Xe,
  "West Virginia": {
    content: {
      pricingModel: "Split Commission"
    },
    state: "West Virginia"
  },
  Wisconsin: Ze,
  Wyoming: Qe
};
function tt() {
  return {
    gclid: null,
    /**
     * Initializes the AdTrackingViewModel instance properties.
     * Run automatically by Alpine, but can also be called manually to reset the view model state.
     * Need to call this manually on store creation if we stop using Alpine as our UI library.
     * @returns {void}
     */
    init: function() {
      this.addGclid();
    },
    /**
     * Sets the Google Click ID (GCLID) for the session.
     * Adds GCLID to local storage if present in the URL and not expired.
     * Sets the GCLID value to the view model if present in local storage and not expired.
     * Adapted from script in Google Help Article: https://support.google.com/google-ads/answer/7012522
     * @returns {void}
     */
    addGclid() {
      const i = N("gclid");
      let e = null;
      const t = N("gclsrc"), o = !t || t.indexOf("aw") !== -1;
      i && o && (e = it(i), localStorage.setItem("gclid", JSON.stringify(e)));
      const s = e || JSON.parse(localStorage.getItem("gclid"));
      s && (/* @__PURE__ */ new Date()).getTime() < s.expiryDate && (this.gclid = s.value);
    }
  };
}
function N(i) {
  const e = RegExp("[?&]" + i + "=([^&]*)").exec(window.location.search);
  return e && decodeURIComponent(e[1].replace(/\+/g, " "));
}
function it(i) {
  const t = (/* @__PURE__ */ new Date()).getTime() + 7776e6;
  return {
    value: i,
    expiryDate: t
  };
}
window.Alpine = w;
const h = V(w), c = {}, R = b(window.FS, c);
at();
ot();
w.start();
function at() {
  const i = new URL(window.location.href), e = i.searchParams.get("get_started"), t = e && e === "complete", o = t ? a.STATES.GET_STARTED.COMPLETE.MODAL : a.STATES.DEFAULT, s = i.searchParams.get("user_email"), r = i.searchParams.get("user_phone");
  t && (s || r) && (window.dataLayer = window.dataLayer || [], window.dataLayer.push({
    event: "ec_form_submit",
    user_data: {
      email: s || "",
      phone_number: r || ""
    }
  })), c.flowState = h.createStore(
    "flowState",
    k(
      H(c, R),
      R,
      o
    )
  ), c.flowUIHelpers = h.createStore(
    "flowUIHelpers",
    K(c)
  ), c.personalizationViewModel = h.createStore(
    "personalizationViewModel",
    v(et)
  ), c.experimentationViewModel = h.createStore(
    "experimentationViewModel",
    x()
  ), c.adTrackingViewModel = h.createStore(
    "adTrackingViewModel",
    tt()
  ), c.interestAreaViewModel = h.createStore(
    "interestAreaViewModel",
    te(c.flowState, R)
  ), c.thConvertedContactViewModel = h.createStore(
    "thConvertedContactViewModel",
    ie({
      email: s || "",
      phone: r || ""
    })
  ), c.thGuidesContactViewModel = h.createStore(
    "thGuidesContactViewModel",
    oe(c.flowState)
  ), c.thGuidesDownloadViewModel = h.createStore(
    "thGuidesDownloadViewModel",
    ae(c)
  ), c.thCalculatorViewModel = h.createStore(
    "thCalculatorViewModel",
    Se(c.personalizationViewModel)
  );
}
function ot() {
  if (c.flowState.value === a.STATES.DEFAULT) {
    const e = "interest-area-typeahead-2025-06", t = Math.random();
    let o = "existing-button-cta-fillout-form";
    t < 0.25 ? o = "interest-area-typeahead-fillout-form-a1" : t < 0.5 && (o = "interest-area-typeahead-fillout-form-a2-actions"), c.experimentationViewModel.setActiveExperimentVariation(
      e,
      o
    ), R.track(
      "2025-06 Interest Area Typeahead Flow Experiment Set"
    );
  }
}
