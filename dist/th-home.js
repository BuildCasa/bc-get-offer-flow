import { m as w, c as V, a as k, b } from "./shared-dpXQ-LAr.js";
import { v as U, t as B, c as v, d as x } from "./shared-nA7yK6XY.js";
const i = {
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
function H(a, e) {
  const t = {
    [i.EVENTS.EXIT]: {
      target: i.STATES.DEFAULT,
      effects: {
        onTransition: [
          (o) => {
            e == null || e.track("Modal Closed", o);
          }
        ]
      }
    }
  }, n = {
    [i.EVENTS.EXIT]: {
      target: i.STATES.GET_STARTED.COMPLETE.DEFAULT,
      effects: {
        onTransition: [
          (o) => {
            e == null || e.track("Modal Closed", o);
          }
        ]
      }
    }
  }, s = {
    [i.EVENTS.INTEREST_AREA_SEARCH.SELECT]: () => {
      var l;
      let o = i.STATES.GET_STARTED.INTEREST_AREA_FILLOUT_FORM_A1;
      const T = (l = a.experimentationViewModel) == null ? void 0 : l.getActiveExperimentVariation(
        "interest-area-typeahead-2025-06"
      );
      return T && T === "interest-area-typeahead-fillout-form-a2-actions" && (o = i.STATES.GET_STARTED.INTEREST_AREA_FILLOUT_FORM_A2_ACTIONS), {
        target: o,
        effects: {
          onTransition: [
            (u) => {
              e.track("Interest Area Selected", u);
            }
          ]
        }
      };
    }
  }, r = {
    [i.EVENTS.SUBMIT_CONTACT.SUBMIT]: {
      target: i.STATES.GET_GUIDES.PROCESSING,
      effects: {
        onTransition: [
          (o) => {
            e == null || e.track("Guides Contact Submitted", o);
          }
        ]
      }
    }
  }, d = {
    onEntry: [async () => W(a)]
  };
  return {
    constants: i,
    defaultState: i.STATES.DEFAULT,
    states: {
      [i.STATES.DEFAULT]: {
        transitions: {
          ...s,
          [i.EVENTS.GET_STARTED.START]: () => {
            var l;
            let o = i.STATES.GET_STARTED.DEFAULT_FILLOUT_FORM;
            const T = (l = a.experimentationViewModel) == null ? void 0 : l.getActiveExperimentVariation(
              "interest-area-typeahead-2025-06"
            );
            return T && (T === "interest-area-typeahead-fillout-form-a1" || T === "interest-area-typeahead-fillout-form-a2-actions") && (o = i.STATES.GET_STARTED.INTEREST_AREA_SEARCH), {
              target: o,
              effects: {
                onTransition: [
                  (u) => {
                    e.track(
                      "Get Started Clicked",
                      u
                    );
                  }
                ]
              }
            };
          },
          [i.EVENTS.BOOK_INTRO.START]: {
            target: i.STATES.BOOK_INTRO.FORM,
            effects: {
              onTransition: [
                (o) => {
                  e.track(
                    "Book Intro Call Clicked",
                    o
                  );
                }
              ]
            }
          },
          [i.EVENTS.GET_VALUATION_REPORT.START]: {
            target: i.STATES.GET_VALUATION_REPORT.FORM,
            effects: {
              onTransition: [
                (o) => {
                  e.track(
                    "Get Valuation Report Clicked",
                    o
                  );
                }
              ]
            }
          },
          [i.EVENTS.GET_GUIDES.START]: {
            target: i.STATES.GET_GUIDES.FORM,
            effects: {
              onTransition: [
                (o) => {
                  e.track("Get Guide Clicked", o);
                }
              ]
            }
          }
        }
      },
      [i.STATES.GET_STARTED.DEFAULT_FILLOUT_FORM]: {
        transitions: {
          ...t
        }
      },
      [i.STATES.GET_STARTED.INTEREST_AREA_SEARCH]: {
        transitions: {
          ...s,
          ...t
        }
      },
      [i.STATES.GET_STARTED.INTEREST_AREA_FILLOUT_FORM_A1]: {
        transitions: {
          ...t
        }
      },
      [i.STATES.GET_STARTED.INTEREST_AREA_FILLOUT_FORM_A2_ACTIONS]: {
        transitions: {
          ...t
        }
      },
      [i.STATES.GET_STARTED.COMPLETE.DEFAULT]: {
        transitions: {
          [i.EVENTS.GET_STARTED.START]: {
            target: i.STATES.GET_STARTED.COMPLETE.MODAL,
            effects: {
              onTransition: [
                (o) => {
                  e.track("Get Started Clicked", o);
                }
              ]
            }
          },
          [i.EVENTS.BOOK_INTRO.START]: {
            target: i.STATES.BOOK_INTRO.FORM,
            effects: {
              onTransition: [
                (o) => {
                  e.track(
                    "Book Intro Call Clicked",
                    o
                  );
                }
              ]
            }
          },
          [i.EVENTS.GET_VALUATION_REPORT.START]: {
            target: i.STATES.GET_VALUATION_REPORT.FORM,
            effects: {
              onTransition: [
                (o) => {
                  e.track(
                    "Get Valuation Report Clicked",
                    o
                  );
                }
              ]
            }
          },
          [i.EVENTS.GET_GUIDES.START]: {
            target: i.STATES.GET_GUIDES.FORM,
            effects: {
              onTransition: [
                (o) => {
                  e.track("Get Guide Clicked", o);
                }
              ]
            }
          }
        }
      },
      [i.STATES.GET_STARTED.COMPLETE.MODAL]: {
        transitions: {
          ...n,
          [i.EVENTS.BOOK_INTRO.START]: {
            target: i.STATES.BOOK_INTRO.FORM,
            effects: {
              onTransition: [
                (o) => {
                  e.track(
                    "Book Intro Call Clicked",
                    o
                  );
                }
              ]
            }
          }
        }
      },
      [i.STATES.BOOK_INTRO.FORM]: {
        transitions: {
          ...t
        }
      },
      [i.STATES.GET_VALUATION_REPORT.FORM]: {
        transitions: {
          ...t
        }
      },
      [i.STATES.GET_GUIDES.FORM]: {
        transitions: {
          ...t,
          ...r
        }
      },
      [i.STATES.GET_GUIDES.PROCESSING]: {
        transitions: {
          ...t,
          [i.EVENTS.SUBMIT_CONTACT.SUCCESS]: {
            target: i.STATES.GET_GUIDES.SUCCESS,
            effects: {
              onTransition: [
                (o) => {
                  e.track(
                    "Guides Contact Submission Succeeded",
                    o
                  );
                }
              ]
            }
          },
          [i.EVENTS.SUBMIT_CONTACT.ERROR]: {
            target: i.STATES.GET_GUIDES.ERROR,
            effects: {
              onTransition: [
                (o) => {
                  e.track("Guides Contact Submission Failed", {
                    ...o,
                    error_str: a.thGuidesContactViewModel.errorMessage
                  });
                }
              ]
            }
          }
        },
        effects: d
      },
      [i.STATES.GET_GUIDES.ERROR]: {
        transitions: {
          ...t,
          ...r
        },
        effects: {
          onExit: [
            () => {
              a.thGuidesContactViewModel.errorMessage = "";
            }
          ]
        }
      },
      [i.STATES.GET_GUIDES.SUCCESS]: {
        transitions: {
          ...t
        },
        effects: {
          onEntry: [
            () => {
              a.thGuidesDownloadViewModel.downloadButtonElement.click();
            }
          ]
        }
      }
    }
  };
}
function K(a) {
  return {
    modal: {
      get isOpen() {
        return [
          i.STATES.GET_STARTED.DEFAULT_FILLOUT_FORM,
          i.STATES.GET_STARTED.INTEREST_AREA_SEARCH,
          i.STATES.GET_STARTED.INTEREST_AREA_FILLOUT_FORM_A1,
          i.STATES.GET_STARTED.INTEREST_AREA_FILLOUT_FORM_A2_ACTIONS,
          i.STATES.GET_STARTED.COMPLETE.MODAL,
          i.STATES.GET_VALUATION_REPORT.FORM,
          i.STATES.BOOK_INTRO.FORM,
          i.STATES.GET_GUIDES.FORM,
          i.STATES.GET_GUIDES.PROCESSING,
          i.STATES.GET_GUIDES.ERROR,
          i.STATES.GET_GUIDES.SUCCESS
        ].includes(a.flowState.value);
      }
    }
  };
}
async function W(a) {
  try {
    let e = {
      firstName: a.thGuidesContactViewModel.firstName.trim(),
      lastName: a.thGuidesContactViewModel.lastName.trim(),
      email: a.thGuidesContactViewModel.email.trim()
    };
    if (!U(e.email))
      throw new Error("Please enter a valid email address, and try again.", {
        cause: "INVALID_EMAIL"
      });
    const t = {
      ...a.thGuidesContactViewModel.options,
      contact: e
    };
    await Promise.all([B(t)]), a.thGuidesContactViewModel.isSubmitted = !0, a.flowState.transition(
      i.EVENTS.SUBMIT_CONTACT.SUCCESS
    );
  } catch (e) {
    console.log("Error submitting contact:", e), e && e.cause && e.cause === "INVALID_EMAIL" ? a.thGuidesContactViewModel.errorMessage = e.message : a.thGuidesContactViewModel.errorMessage = "There was an error processing your info. Please try again, or contact us for help.", a.flowState.transition(i.EVENTS.SUBMIT_CONTACT.ERROR);
  }
}
function j(a, e, t, n) {
  function s(r) {
    return r instanceof t ? r : new t(function(d) {
      d(r);
    });
  }
  return new (t || (t = Promise))(function(r, d) {
    function h(l) {
      try {
        T(n.next(l));
      } catch (u) {
        d(u);
      }
    }
    function o(l) {
      try {
        T(n.throw(l));
      } catch (u) {
        d(u);
      }
    }
    function T(l) {
      l.done ? r(l.value) : s(l.value).then(h, o);
    }
    T((n = n.apply(a, e || [])).next());
  });
}
function $(a) {
  return a && a.__esModule && Object.prototype.hasOwnProperty.call(a, "default") ? a.default : a;
}
var J = function a(e, t) {
  if (e === t)
    return !0;
  if (e && t && typeof e == "object" && typeof t == "object") {
    if (e.constructor !== t.constructor)
      return !1;
    var n, s, r;
    if (Array.isArray(e)) {
      if (n = e.length, n != t.length)
        return !1;
      for (s = n; s-- !== 0; )
        if (!a(e[s], t[s]))
          return !1;
      return !0;
    }
    if (e.constructor === RegExp)
      return e.source === t.source && e.flags === t.flags;
    if (e.valueOf !== Object.prototype.valueOf)
      return e.valueOf() === t.valueOf();
    if (e.toString !== Object.prototype.toString)
      return e.toString() === t.toString();
    if (r = Object.keys(e), n = r.length, n !== Object.keys(t).length)
      return !1;
    for (s = n; s-- !== 0; )
      if (!Object.prototype.hasOwnProperty.call(t, r[s]))
        return !1;
    for (s = n; s-- !== 0; ) {
      var d = r[s];
      if (!a(e[d], t[d]))
        return !1;
    }
    return !0;
  }
  return e !== e && t !== t;
}, z = /* @__PURE__ */ $(J);
const L = "__googleMapsScriptId";
var m;
(function(a) {
  a[a.INITIALIZED = 0] = "INITIALIZED", a[a.LOADING = 1] = "LOADING", a[a.SUCCESS = 2] = "SUCCESS", a[a.FAILURE = 3] = "FAILURE";
})(m || (m = {}));
class E {
  /**
   * Creates an instance of Loader using [[LoaderOptions]]. No defaults are set
   * using this library, instead the defaults are set by the Google Maps
   * JavaScript API server.
   *
   * ```
   * const loader = Loader({apiKey, version: 'weekly', libraries: ['places']});
   * ```
   */
  constructor({ apiKey: e, authReferrerPolicy: t, channel: n, client: s, id: r = L, language: d, libraries: h = [], mapIds: o, nonce: T, region: l, retries: u = 3, url: A = "https://maps.googleapis.com/maps/api/js", version: g }) {
    if (this.callbacks = [], this.done = !1, this.loading = !1, this.errors = [], this.apiKey = e, this.authReferrerPolicy = t, this.channel = n, this.client = s, this.id = r || L, this.language = d, this.libraries = h, this.mapIds = o, this.nonce = T, this.region = l, this.retries = u, this.url = A, this.version = g, E.instance) {
      if (!z(this.options, E.instance.options))
        throw new Error(`Loader must not be called again with different options. ${JSON.stringify(this.options)} !== ${JSON.stringify(E.instance.options)}`);
      return E.instance;
    }
    E.instance = this;
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
    return this.errors.length ? m.FAILURE : this.done ? m.SUCCESS : this.loading ? m.LOADING : m.INITIALIZED;
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
      this.loadCallback((n) => {
        n ? t(n.error) : e(window.google);
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
    const n = {
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
    Object.keys(n).forEach(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (r) => !n[r] && delete n[r]
    ), !((t = (e = window == null ? void 0 : window.google) === null || e === void 0 ? void 0 : e.maps) === null || t === void 0) && t.importLibrary || ((r) => {
      let d, h, o, T = "The Google Maps JavaScript API", l = "google", u = "importLibrary", A = "__ib__", g = document, p = window;
      p = p[l] || (p[l] = {});
      const f = p.maps || (p.maps = {}), O = /* @__PURE__ */ new Set(), C = new URLSearchParams(), P = () => (
        // @ts-ignore
        d || (d = new Promise((M, y) => j(this, void 0, void 0, function* () {
          var F;
          yield h = g.createElement("script"), h.id = this.id, C.set("libraries", [...O] + "");
          for (o in r)
            C.set(o.replace(/[A-Z]/g, (D) => "_" + D[0].toLowerCase()), r[o]);
          C.set("callback", l + ".maps." + A), h.src = this.url + "?" + C, f[A] = M, h.onerror = () => d = y(Error(T + " could not load.")), h.nonce = this.nonce || ((F = g.querySelector("script[nonce]")) === null || F === void 0 ? void 0 : F.nonce) || "", g.head.append(h);
        })))
      );
      f[u] ? console.warn(T + " only loads once. Ignoring:", r) : f[u] = (M, ...y) => O.add(M) && P().then(() => f[u](M, ...y));
    })(n);
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
const Y = "AIzaSyCOAucx7oi5vgR0w5CUfLj6G67YZINBSMc", q = new E({
  apiKey: Y,
  version: "weekly"
});
let _ = null, I = null;
async function X() {
  try {
    const a = await q.importLibrary("places");
    _ = a.AutocompleteSuggestion, I = a.AutocompleteSessionToken;
  } catch (a) {
    console.error("Error loading Google Maps Places library:", a);
  }
}
function Z() {
  if (I)
    return new I();
}
async function Q(a, e) {
  if (_)
    try {
      const { suggestions: t } = await _.fetchAutocompleteSuggestions({
        input: a,
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
      return t.map((n) => ({
        placePrediction: n.placePrediction,
        text: n.placePrediction.text.toString()
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
function ee(a) {
  return a.addressComponents && (a.addressComponents.some(
    (e) => e.types[0] === "locality"
  ) || a.addressComponents.some(
    (e) => e.types[0] === "administrative_area_level_1"
  ) || a.addressComponents.some(
    (e) => e.types[0] === "postal_code"
  ));
}
function te(a, e) {
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
      var n;
      let t;
      return this.isSelectedValid && (t = (n = this.selectedPlace.addressComponents.find(
        (s) => s.types.includes("locality")
      )) == null ? void 0 : n.longText), t;
    },
    get selectedState() {
      var n;
      let t;
      return this.isSelectedValid && (t = (n = this.selectedPlace.addressComponents.find(
        (s) => s.types.includes("administrative_area_level_1")
      )) == null ? void 0 : n.shortText), t;
    },
    get selectedPostalCode() {
      var n;
      let t;
      return this.isSelectedValid && (t = (n = this.selectedPlace.addressComponents.find(
        (s) => s.types.includes("postal_code")
      )) == null ? void 0 : n.shortText), t;
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
      let n = t.placePrediction.toPlace();
      await n.fetchFields({
        fields: ["displayName", "formattedAddress", "addressComponents"]
      }), this.selectedPlace = n, this.inputValue = n.formattedAddress, this.isSelectedValid || (this.errorMessage = "Please select a valid US city, state, or postal code to continue, or contact us for help."), e.track("Interest Area Selected"), this.refreshSessionToken(), this.suggestions = [], this.keyboardNavIndex = -1, this.isSelectedValid && (this.isSubmitted = !0, a.transition(i.EVENTS.INTEREST_AREA_SEARCH.SELECT), this.isSubmitted = !1);
    },
    handleSubmit(t) {
      t.preventDefault(), t.stopPropagation(), !this.isSubmitted && (this.isSubmitted = !0, this.isSelected && this.isSelectedValid && a.transition(i.EVENTS.INTEREST_AREA_SEARCH.SELECT), this.isSubmitted = !1);
    }
  };
}
function ae(a) {
  return {
    // Instance properties
    email: "",
    phone: "",
    /**
     * Initializes the THConvertedContactViewModel instance properties.
     * Run automatically by Alpine, but can also be called manually to reset the view model state.
     * Need to call this manually on store creation if we stop using Alpine as our UI library.
     * @returns {void}
     */
    init() {
      this.email = (a == null ? void 0 : a.email) || "", this.phone = (a == null ? void 0 : a.phone) || "";
    }
  };
}
function ie(a) {
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
      const n = a.thGuidesContactViewModel.isSubmitted;
      n || (e.preventDefault(), a.flowState.transition(
        i.EVENTS.GET_GUIDES.START,
        {
          guide_str: this.guide,
          contact_submitted_str: n
        }
      ));
    }
  };
}
function ne(a) {
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
      e.preventDefault(), e.stopPropagation(), this.options = t, a.transition(i.EVENTS.SUBMIT_CONTACT.SUBMIT);
    }
  };
}
const oe = 0.03, se = 15e5, re = 5e6, le = 25e4, ce = 5e4;
function de(a = {}) {
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
      return a.getContent("calcCommissionRate") || oe;
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
      return a.getContent("calcDefaultListPrice") || se;
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
      return a.getContent("calcMaxListPrice") || re;
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
      return a.getContent("calcMinListPrice") || le;
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
      return a.getContent("calcInputStep") || ce;
    },
    get formattedListPrice() {
      return G(this.listPrice);
    },
    get turboHomeFee() {
      return a.getContent("pricingModel") === "Split Commission" ? this.listPrice * this.commissionRate / 2 : this.listPrice <= 5e5 ? 5e3 : this.listPrice <= 1e6 ? 7500 : this.listPrice <= 2e6 ? 1e4 : 15e3;
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
function G(a) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  }).format(a);
}
const Te = {
  content: {
    phoneNumberText: "(888) 516-6331",
    phoneNumberLink: "tel:+18885166331",
    pricingModel: "Flat Fee",
    calcCommissionRate: 0.03,
    calcDefaultListPrice: 15e5,
    calcMaxListPrice: 5e6,
    calcMinListPrice: 25e4,
    calcInputStep: 5e4
  }
}, ue = {
  content: {
    phoneNumberText: "(510) 391-5392",
    phoneNumberLink: "tel:+15103915392"
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
    pricingModel: "Flat Fee"
  },
  state: "Alaska"
}, Se = {
  content: {
    pricingModel: "Flat Fee"
  },
  state: "Alabama"
}, Ee = {
  content: {
    pricingModel: "Flat Fee"
  },
  state: "Arkansas"
}, me = {
  content: {
    pricingModel: "Flat Fee"
  },
  state: "Arizona"
}, ge = {
  content: {
    phoneNumberText: "(510) 391-5392",
    phoneNumberLink: "tel:+15103915392",
    pricingModel: "Flat Fee"
  },
  state: "California"
}, pe = {
  content: {
    pricingModel: "Flat Fee"
  },
  state: "Colorado"
}, Ae = {
  content: {
    pricingModel: "Flat Fee"
  },
  state: "Connecticut"
}, fe = {
  content: {
    pricingModel: "Flat Fee"
  },
  state: "Delaware"
}, Ce = {
  content: {
    pricingModel: "Flat Fee"
  },
  state: "Florida"
}, Me = {
  content: {
    pricingModel: "Flat Fee"
  },
  state: "Georgia"
}, Re = {
  content: {
    pricingModel: "Flat Fee"
  },
  state: "Hawaii"
}, ye = {
  content: {
    pricingModel: "Flat Fee"
  },
  state: "Idaho"
}, Fe = {
  content: {
    pricingModel: "Flat Fee"
  },
  state: "Illinois"
}, _e = {
  content: {
    pricingModel: "Flat Fee"
  },
  state: "Indiana"
}, Ie = {
  content: {
    pricingModel: "Flat Fee"
  },
  state: "Iowa"
}, we = {
  content: {
    pricingModel: "Flat Fee"
  },
  state: "Kansas"
}, Oe = {
  content: {
    pricingModel: "Flat Fee"
  },
  state: "Kentucky"
}, Le = {
  content: {
    pricingModel: "Flat Fee"
  },
  state: "Louisiana"
}, Ge = {
  content: {
    pricingModel: "Flat Fee"
  },
  state: "Maine"
}, Ne = {
  content: {
    pricingModel: "Flat Fee"
  },
  state: "Maryland"
}, Pe = {
  content: {
    pricingModel: "Split Commission"
  },
  state: "Massachusetts"
}, De = {
  content: {
    pricingModel: "Flat Fee"
  },
  state: "Michigan"
}, Ve = {
  content: {
    pricingModel: "Flat Fee"
  },
  state: "Minnesota"
}, ke = {
  content: {
    pricingModel: "Flat Fee"
  },
  state: "Mississippi"
}, be = {
  content: {
    pricingModel: "Flat Fee"
  },
  state: "Missouri"
}, Ue = {
  content: {
    pricingModel: "Flat Fee"
  },
  state: "Montana"
}, Be = {
  content: {
    pricingModel: "Flat Fee"
  },
  state: "Nebraska"
}, ve = {
  content: {
    pricingModel: "Flat Fee"
  },
  state: "Nevada"
}, xe = {
  content: {
    pricingModel: "Flat Fee"
  },
  state: "Ohio"
}, He = {
  content: {
    pricingModel: "Flat Fee"
  },
  state: "Oklahoma"
}, Ke = {
  content: {
    pricingModel: "Flat Fee"
  },
  state: "Oregon"
}, We = {
  content: {
    pricingModel: "Flat Fee"
  },
  state: "Pennsylvania"
}, je = {
  content: {
    pricingModel: "Flat Fee"
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
    pricingModel: "Flat Fee"
  },
  state: "Utah"
}, ze = {
  content: {
    pricingModel: "Flat Fee"
  },
  state: "Vermont"
}, Ye = {
  content: {
    pricingModel: "Flat Fee"
  },
  state: "Virginia"
}, qe = {
  content: {
    pricingModel: "Split Commission"
  },
  state: "Washington"
}, Xe = {
  content: {
    pricingModel: "Flat Fee"
  },
  state: "Wisconsin"
}, Ze = {
  content: {
    pricingModel: "Flat Fee"
  },
  state: "Wyoming"
}, Qe = {
  DEFAULT: Te,
  "Bay Area": {
    content: {
      phoneNumberText: "(510) 391-5392",
      phoneNumberLink: "tel:+15103915392"
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
      phoneNumberLink: "tel:+13233103103"
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
  Alabama: Se,
  Arkansas: Ee,
  Arizona: me,
  California: ge,
  Colorado: pe,
  Connecticut: Ae,
  Delaware: fe,
  Florida: Ce,
  Georgia: Me,
  Hawaii: Re,
  Idaho: ye,
  Illinois: Fe,
  Indiana: _e,
  Iowa: Ie,
  Kansas: we,
  Kentucky: Oe,
  Louisiana: Le,
  Maine: Ge,
  Maryland: Ne,
  Massachusetts: Pe,
  Michigan: De,
  Minnesota: Ve,
  Mississippi: ke,
  Missouri: be,
  Montana: Ue,
  Nebraska: Be,
  Nevada: ve,
  "New Hampshire": {
    content: {
      pricingModel: "Flat Fee"
    },
    state: "New Hampshire"
  },
  "New Jersey": {
    content: {
      pricingModel: "Flat Fee"
    },
    state: "New Jersey"
  },
  "New Mexico": {
    content: {
      pricingModel: "Flat Fee"
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
      pricingModel: "Flat Fee"
    },
    state: "North Carolina"
  },
  "North Dakota": {
    content: {
      pricingModel: "Flat Fee"
    },
    state: "North Dakota"
  },
  Ohio: xe,
  Oklahoma: He,
  Oregon: Ke,
  Pennsylvania: We,
  "Rhode Island": {
    content: {
      pricingModel: "Flat Fee"
    },
    state: "Rhode Island"
  },
  "South Carolina": {
    content: {
      pricingModel: "Flat Fee"
    },
    state: "South Carolina"
  },
  "South Dakota": {
    content: {
      pricingModel: "Flat Fee"
    },
    state: "South Dakota"
  },
  Tennessee: je,
  Texas: $e,
  Utah: Je,
  Vermont: ze,
  Virginia: Ye,
  Washington: qe,
  "West Virginia": {
    content: {
      pricingModel: "Flat Fee"
    },
    state: "West Virginia"
  },
  Wisconsin: Xe,
  Wyoming: Ze
};
function et() {
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
      const a = N("gclid");
      let e = null;
      const t = N("gclsrc"), n = !t || t.indexOf("aw") !== -1;
      a && n && (e = tt(a), localStorage.setItem("gclid", JSON.stringify(e)));
      const s = e || JSON.parse(localStorage.getItem("gclid"));
      s && (/* @__PURE__ */ new Date()).getTime() < s.expiryDate && (this.gclid = s.value);
    }
  };
}
function N(a) {
  const e = RegExp("[?&]" + a + "=([^&]*)").exec(window.location.search);
  return e && decodeURIComponent(e[1].replace(/\+/g, " "));
}
function tt(a) {
  const t = (/* @__PURE__ */ new Date()).getTime() + 7776e6;
  return {
    value: a,
    expiryDate: t
  };
}
window.Alpine = w;
const S = k(w), c = {}, R = b(window.FS, c);
at();
it();
w.start();
function at() {
  const a = new URL(window.location.href), e = a.searchParams.get("get_started"), t = e && e === "complete", n = t ? i.STATES.GET_STARTED.COMPLETE.MODAL : i.STATES.DEFAULT, s = a.searchParams.get("user_email"), r = a.searchParams.get("user_phone");
  t && (s || r) && (window.dataLayer = window.dataLayer || [], window.dataLayer.push({
    event: "ec_form_submit",
    user_data: {
      email: s || "",
      phone_number: r || ""
    }
  })), c.flowState = S.createStore(
    "flowState",
    V(
      H(c, R),
      R,
      n
    )
  ), c.flowUIHelpers = S.createStore(
    "flowUIHelpers",
    K(c)
  ), c.personalizationViewModel = S.createStore(
    "personalizationViewModel",
    v(Qe)
  ), c.experimentationViewModel = S.createStore(
    "experimentationViewModel",
    x()
  ), c.adTrackingViewModel = S.createStore(
    "adTrackingViewModel",
    et()
  ), c.interestAreaViewModel = S.createStore(
    "interestAreaViewModel",
    te(c.flowState, R)
  ), c.thConvertedContactViewModel = S.createStore(
    "thConvertedContactViewModel",
    ae({
      email: s || "",
      phone: r || ""
    })
  ), c.thGuidesContactViewModel = S.createStore(
    "thGuidesContactViewModel",
    ne(c.flowState)
  ), c.thGuidesDownloadViewModel = S.createStore(
    "thGuidesDownloadViewModel",
    ie(c)
  ), c.thCalculatorViewModel = S.createStore(
    "thCalculatorViewModel",
    de(c.personalizationViewModel)
  );
}
function it() {
  if (c.flowState.value === i.STATES.DEFAULT) {
    const e = "interest-area-typeahead-2025-06", t = Math.random();
    let n = "existing-button-cta-fillout-form";
    t < 0.25 ? n = "interest-area-typeahead-fillout-form-a1" : t < 0.5 && (n = "interest-area-typeahead-fillout-form-a2-actions"), c.experimentationViewModel.setActiveExperimentVariation(
      e,
      n
    ), R.track(
      "2025-06 Interest Area Typeahead Flow Experiment Set"
    );
  }
}
