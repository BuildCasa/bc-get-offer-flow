import { v as M, t as F } from "./shared-nA7yK6XY.js";
const s = {
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
function W(i, e) {
  const t = {
    [s.EVENTS.EXIT]: {
      target: s.STATES.DEFAULT,
      effects: {
        onTransition: [
          (n) => {
            e == null || e.track("Modal Closed", n);
          }
        ]
      }
    }
  }, r = {
    [s.EVENTS.EXIT]: {
      target: s.STATES.GET_STARTED.COMPLETE.DEFAULT,
      effects: {
        onTransition: [
          (n) => {
            e == null || e.track("Modal Closed", n);
          }
        ]
      }
    }
  }, o = {
    [s.EVENTS.INTEREST_AREA_SEARCH.SELECT]: () => {
      var l;
      let n = s.STATES.GET_STARTED.INTEREST_AREA_FILLOUT_FORM_A1;
      const c = (l = i.experimentationViewModel) == null ? void 0 : l.getActiveExperimentVariation(
        "interest-area-typeahead-2025-06"
      );
      return c && c === "interest-area-typeahead-fillout-form-a2-actions" && (n = s.STATES.GET_STARTED.INTEREST_AREA_FILLOUT_FORM_A2_ACTIONS), {
        target: n,
        effects: {
          onTransition: [
            (E) => {
              e.track("Interest Area Selected", E);
            }
          ]
        }
      };
    }
  }, a = {
    [s.EVENTS.SUBMIT_CONTACT.SUBMIT]: {
      target: s.STATES.GET_GUIDES.PROCESSING,
      effects: {
        onTransition: [
          (n) => {
            e == null || e.track("Guides Contact Submitted", n);
          }
        ]
      }
    }
  }, T = {
    onEntry: [async () => U(i)]
  };
  return {
    constants: s,
    defaultState: s.STATES.DEFAULT,
    states: {
      [s.STATES.DEFAULT]: {
        transitions: {
          ...o,
          [s.EVENTS.GET_STARTED.START]: () => {
            var l;
            let n = s.STATES.GET_STARTED.DEFAULT_FILLOUT_FORM;
            const c = (l = i.experimentationViewModel) == null ? void 0 : l.getActiveExperimentVariation(
              "interest-area-typeahead-2025-06"
            );
            return c && (c === "interest-area-typeahead-fillout-form-a1" || c === "interest-area-typeahead-fillout-form-a2-actions") && (n = s.STATES.GET_STARTED.INTEREST_AREA_SEARCH), {
              target: n,
              effects: {
                onTransition: [
                  (E) => {
                    e.track(
                      "Get Started Clicked",
                      E
                    );
                  }
                ]
              }
            };
          },
          [s.EVENTS.BOOK_INTRO.START]: {
            target: s.STATES.BOOK_INTRO.FORM,
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
          [s.EVENTS.GET_VALUATION_REPORT.START]: {
            target: s.STATES.GET_VALUATION_REPORT.FORM,
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
          [s.EVENTS.GET_GUIDES.START]: {
            target: s.STATES.GET_GUIDES.FORM,
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
      [s.STATES.GET_STARTED.DEFAULT_FILLOUT_FORM]: {
        transitions: {
          ...t
        }
      },
      [s.STATES.GET_STARTED.INTEREST_AREA_SEARCH]: {
        transitions: {
          ...o,
          ...t
        }
      },
      [s.STATES.GET_STARTED.INTEREST_AREA_FILLOUT_FORM_A1]: {
        transitions: {
          ...t
        }
      },
      [s.STATES.GET_STARTED.INTEREST_AREA_FILLOUT_FORM_A2_ACTIONS]: {
        transitions: {
          ...t
        }
      },
      [s.STATES.GET_STARTED.COMPLETE.DEFAULT]: {
        transitions: {
          [s.EVENTS.GET_STARTED.START]: {
            target: s.STATES.GET_STARTED.COMPLETE.MODAL,
            effects: {
              onTransition: [
                (n) => {
                  e.track("Get Started Clicked", n);
                }
              ]
            }
          },
          [s.EVENTS.BOOK_INTRO.START]: {
            target: s.STATES.BOOK_INTRO.FORM,
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
          [s.EVENTS.GET_VALUATION_REPORT.START]: {
            target: s.STATES.GET_VALUATION_REPORT.FORM,
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
          [s.EVENTS.GET_GUIDES.START]: {
            target: s.STATES.GET_GUIDES.FORM,
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
      [s.STATES.GET_STARTED.COMPLETE.MODAL]: {
        transitions: {
          ...r,
          [s.EVENTS.BUYER_PROFILE.START]: {
            target: s.STATES.BUYER_PROFILE.FORM,
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
          [s.EVENTS.BOOK_INTRO.START]: {
            target: s.STATES.BOOK_INTRO.FORM,
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
      [s.STATES.BUYER_PROFILE.FORM]: {
        transitions: {
          ...r
        }
      },
      [s.STATES.BOOK_INTRO.FORM]: {
        transitions: {
          ...t
        }
      },
      [s.STATES.GET_VALUATION_REPORT.FORM]: {
        transitions: {
          ...t
        }
      },
      [s.STATES.GET_GUIDES.FORM]: {
        transitions: {
          ...t,
          ...a
        }
      },
      [s.STATES.GET_GUIDES.PROCESSING]: {
        transitions: {
          ...t,
          [s.EVENTS.SUBMIT_CONTACT.SUCCESS]: {
            target: s.STATES.GET_GUIDES.SUCCESS,
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
          [s.EVENTS.SUBMIT_CONTACT.ERROR]: {
            target: s.STATES.GET_GUIDES.ERROR,
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
        effects: T
      },
      [s.STATES.GET_GUIDES.ERROR]: {
        transitions: {
          ...t,
          ...a
        },
        effects: {
          onExit: [
            () => {
              i.thGuidesContactViewModel.errorMessage = "";
            }
          ]
        }
      },
      [s.STATES.GET_GUIDES.SUCCESS]: {
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
function z(i) {
  return {
    modal: {
      get isOpen() {
        return [
          s.STATES.GET_STARTED.DEFAULT_FILLOUT_FORM,
          s.STATES.GET_STARTED.INTEREST_AREA_SEARCH,
          s.STATES.GET_STARTED.INTEREST_AREA_FILLOUT_FORM_A1,
          s.STATES.GET_STARTED.INTEREST_AREA_FILLOUT_FORM_A2_ACTIONS,
          s.STATES.GET_STARTED.COMPLETE.MODAL,
          s.STATES.BUYER_PROFILE.FORM,
          s.STATES.GET_VALUATION_REPORT.FORM,
          s.STATES.BOOK_INTRO.FORM,
          s.STATES.GET_GUIDES.FORM,
          s.STATES.GET_GUIDES.PROCESSING,
          s.STATES.GET_GUIDES.ERROR,
          s.STATES.GET_GUIDES.SUCCESS
        ].includes(i.flowState.value);
      }
    }
  };
}
async function U(i) {
  try {
    let e = {
      firstName: i.thGuidesContactViewModel.firstName.trim(),
      lastName: i.thGuidesContactViewModel.lastName.trim(),
      email: i.thGuidesContactViewModel.email.trim()
    };
    if (!M(e.email))
      throw new Error("Please enter a valid email address, and try again.", {
        cause: "INVALID_EMAIL"
      });
    const t = {
      ...i.thGuidesContactViewModel.options,
      contact: e
    };
    await Promise.all([F(t)]), i.thGuidesContactViewModel.isSubmitted = !0, i.flowState.transition(
      s.EVENTS.SUBMIT_CONTACT.SUCCESS
    );
  } catch (e) {
    console.log("Error submitting contact:", e), e && e.cause && e.cause === "INVALID_EMAIL" ? i.thGuidesContactViewModel.errorMessage = e.message : i.thGuidesContactViewModel.errorMessage = "There was an error processing your info. Please try again, or contact us for help.", i.flowState.transition(s.EVENTS.SUBMIT_CONTACT.ERROR);
  }
}
function D(i, e, t, r) {
  function o(a) {
    return a instanceof t ? a : new t(function(T) {
      T(a);
    });
  }
  return new (t || (t = Promise))(function(a, T) {
    function d(l) {
      try {
        c(r.next(l));
      } catch (E) {
        T(E);
      }
    }
    function n(l) {
      try {
        c(r.throw(l));
      } catch (E) {
        T(E);
      }
    }
    function c(l) {
      l.done ? a(l.value) : o(l.value).then(d, n);
    }
    c((r = r.apply(i, e || [])).next());
  });
}
function w(i) {
  return i && i.__esModule && Object.prototype.hasOwnProperty.call(i, "default") ? i.default : i;
}
var V = function i(e, t) {
  if (e === t)
    return !0;
  if (e && t && typeof e == "object" && typeof t == "object") {
    if (e.constructor !== t.constructor)
      return !1;
    var r, o, a;
    if (Array.isArray(e)) {
      if (r = e.length, r != t.length)
        return !1;
      for (o = r; o-- !== 0; )
        if (!i(e[o], t[o]))
          return !1;
      return !0;
    }
    if (e.constructor === RegExp)
      return e.source === t.source && e.flags === t.flags;
    if (e.valueOf !== Object.prototype.valueOf)
      return e.valueOf() === t.valueOf();
    if (e.toString !== Object.prototype.toString)
      return e.toString() === t.toString();
    if (a = Object.keys(e), r = a.length, r !== Object.keys(t).length)
      return !1;
    for (o = r; o-- !== 0; )
      if (!Object.prototype.hasOwnProperty.call(t, a[o]))
        return !1;
    for (o = r; o-- !== 0; ) {
      var T = a[o];
      if (!i(e[T], t[T]))
        return !1;
    }
    return !0;
  }
  return e !== e && t !== t;
}, b = /* @__PURE__ */ w(V);
const y = "__googleMapsScriptId";
var u;
(function(i) {
  i[i.INITIALIZED = 0] = "INITIALIZED", i[i.LOADING = 1] = "LOADING", i[i.SUCCESS = 2] = "SUCCESS", i[i.FAILURE = 3] = "FAILURE";
})(u || (u = {}));
class S {
  /**
   * Creates an instance of Loader using [[LoaderOptions]]. No defaults are set
   * using this library, instead the defaults are set by the Google Maps
   * JavaScript API server.
   *
   * ```
   * const loader = Loader({apiKey, version: 'weekly', libraries: ['places']});
   * ```
   */
  constructor({ apiKey: e, authReferrerPolicy: t, channel: r, client: o, id: a = y, language: T, libraries: d = [], mapIds: n, nonce: c, region: l, retries: E = 3, url: f = "https://maps.googleapis.com/maps/api/js", version: h }) {
    if (this.callbacks = [], this.done = !1, this.loading = !1, this.errors = [], this.apiKey = e, this.authReferrerPolicy = t, this.channel = r, this.client = o, this.id = a || y, this.language = T, this.libraries = d, this.mapIds = n, this.nonce = c, this.region = l, this.retries = E, this.url = f, this.version = h, S.instance) {
      if (!b(this.options, S.instance.options))
        throw new Error(`Loader must not be called again with different options. ${JSON.stringify(this.options)} !== ${JSON.stringify(S.instance.options)}`);
      return S.instance;
    }
    S.instance = this;
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
    return this.errors.length ? u.FAILURE : this.done ? u.SUCCESS : this.loading ? u.LOADING : u.INITIALIZED;
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
      this.loadCallback((r) => {
        r ? t(r.error) : e(window.google);
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
    const r = {
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
    Object.keys(r).forEach(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (a) => !r[a] && delete r[a]
    ), !((t = (e = window == null ? void 0 : window.google) === null || e === void 0 ? void 0 : e.maps) === null || t === void 0) && t.importLibrary || ((a) => {
      let T, d, n, c = "The Google Maps JavaScript API", l = "google", E = "importLibrary", f = "__ib__", h = document, A = window;
      A = A[l] || (A[l] = {});
      const R = A.maps || (A.maps = {}), C = /* @__PURE__ */ new Set(), _ = new URLSearchParams(), N = () => (
        // @ts-ignore
        T || (T = new Promise((p, m) => D(this, void 0, void 0, function* () {
          var g;
          yield d = h.createElement("script"), d.id = this.id, _.set("libraries", [...C] + "");
          for (n in a)
            _.set(n.replace(/[A-Z]/g, (P) => "_" + P[0].toLowerCase()), a[n]);
          _.set("callback", l + ".maps." + f), d.src = this.url + "?" + _, R[f] = p, d.onerror = () => T = m(Error(c + " could not load.")), d.nonce = this.nonce || ((g = h.querySelector("script[nonce]")) === null || g === void 0 ? void 0 : g.nonce) || "", h.head.append(d);
        })))
      );
      R[E] ? console.warn(c + " only loads once. Ignoring:", a) : R[E] = (p, ...m) => C.add(p) && N().then(() => R[E](p, ...m));
    })(r);
    const o = this.libraries.map((a) => this.importLibrary(a));
    o.length || o.push(this.importLibrary("core")), Promise.all(o).then(() => this.callback(), (a) => {
      const T = new ErrorEvent("error", { error: a });
      this.loadErrorCallback(T);
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
const k = "AIzaSyCOAucx7oi5vgR0w5CUfLj6G67YZINBSMc", B = new S({
  apiKey: k,
  version: "weekly"
});
let I = null, O = null;
async function x() {
  try {
    const i = await B.importLibrary("places");
    I = i.AutocompleteSuggestion, O = i.AutocompleteSessionToken;
  } catch (i) {
    console.error("Error loading Google Maps Places library:", i);
  }
}
function v() {
  if (O)
    return new O();
}
async function K(i, e) {
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
      return t.map((r) => ({
        placePrediction: r.placePrediction,
        text: r.placePrediction.text.toString()
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
function j(i) {
  return i.addressComponents && (i.addressComponents.some(
    (e) => e.types[0] === "locality"
  ) || i.addressComponents.some(
    (e) => e.types[0] === "administrative_area_level_1"
  ) || i.addressComponents.some(
    (e) => e.types[0] === "postal_code"
  ));
}
function ee(i, e) {
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
      this.inputValue = "", this.suggestions = [], this.keyboardNavIndex = -1, this.selectedPlace = {}, this.isSubmitted = !1, this.errorMessage = "", await x(), this.refreshSessionToken();
    },
    refreshSessionToken() {
      this.sessionToken = v();
    },
    /**
     * Whether or not an location match has been selected with the typeahead.
     * @type {boolean}
     */
    get isSelected() {
      return Object.keys(this.selectedPlace).length != 0;
    },
    get isSelectedValid() {
      return j(this.selectedPlace);
    },
    get selectedCity() {
      var r;
      let t;
      return this.isSelectedValid && (t = (r = this.selectedPlace.addressComponents.find(
        (o) => o.types.includes("locality")
      )) == null ? void 0 : r.longText), t;
    },
    get selectedState() {
      var r;
      let t;
      return this.isSelectedValid && (t = (r = this.selectedPlace.addressComponents.find(
        (o) => o.types.includes("administrative_area_level_1")
      )) == null ? void 0 : r.shortText), t;
    },
    get selectedPostalCode() {
      var r;
      let t;
      return this.isSelectedValid && (t = (r = this.selectedPlace.addressComponents.find(
        (o) => o.types.includes("postal_code")
      )) == null ? void 0 : r.shortText), t;
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
        this.suggestions = await K(
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
      let r = t.placePrediction.toPlace();
      await r.fetchFields({
        fields: ["displayName", "formattedAddress", "addressComponents"]
      }), this.selectedPlace = r, this.inputValue = r.formattedAddress, this.isSelectedValid || (this.errorMessage = "Please select a valid US city, state, or postal code to continue, or contact us for help."), e.track("Interest Area Selected"), this.refreshSessionToken(), this.suggestions = [], this.keyboardNavIndex = -1, this.isSelectedValid && (this.isSubmitted = !0, i.transition(s.EVENTS.INTEREST_AREA_SEARCH.SELECT), this.isSubmitted = !1);
    },
    handleSubmit(t) {
      t.preventDefault(), t.stopPropagation(), !this.isSubmitted && (this.isSubmitted = !0, this.isSelected && this.isSelectedValid && i.transition(s.EVENTS.INTEREST_AREA_SEARCH.SELECT), this.isSubmitted = !1);
    }
  };
}
function te(i) {
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
const H = 0.03, $ = 0.01, Y = 15e5, q = 75e5, J = 25e4, X = 5e4;
function ie(i = {}) {
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
      return i.getContent("calcCommissionRate") || H;
    },
    /**
     * Computed property that returns the value of the calcSplitCommissionRate key in the personalizationViewModel
     *
     * @type {number}
     */
    get splitCommissionRate() {
      return i.getContent("calcSplitCommissionRate") || $;
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
      return i.getContent("calcDefaultListPrice") || Y;
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
      return i.getContent("calcMaxListPrice") || q;
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
      return i.getContent("calcMinListPrice") || J;
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
      return i.getContent("calcInputStep") || X;
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
function se() {
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
      const i = L("gclid");
      let e = null;
      const t = L("gclsrc"), r = !t || t.indexOf("aw") !== -1;
      i && r && (e = Z(i), localStorage.setItem("gclid", JSON.stringify(e)));
      const o = e || JSON.parse(localStorage.getItem("gclid"));
      o && (/* @__PURE__ */ new Date()).getTime() < o.expiryDate && (this.gclid = o.value);
    }
  };
}
function L(i) {
  const e = RegExp("[?&]" + i + "=([^&]*)").exec(window.location.search);
  return e && decodeURIComponent(e[1].replace(/\+/g, " "));
}
function Z(i) {
  const t = (/* @__PURE__ */ new Date()).getTime() + 7776e6;
  return {
    value: i,
    expiryDate: t
  };
}
export {
  se as a,
  ee as b,
  z as c,
  te as d,
  ie as e,
  s as f,
  W as g
};
