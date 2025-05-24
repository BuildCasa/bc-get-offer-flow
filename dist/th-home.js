import { m as O, c as k, a as b, b as V } from "./shared-dpXQ-LAr.js";
import { v as U, t as B, c as v, d as H } from "./shared-n24Ri3Q5.js";
const n = {
  STATES: {
    DEFAULT: "default",
    GET_STARTED: {
      PROPERTY_QUESTION: "modalGetStartedPropertyQuestion",
      ADDRESS_SEARCH: "modalGetStartedAddressSearch",
      TYPEFORM: "getStartedForm",
      OLD_TEST_TYPEFORM: "getStartedFormOld",
      // Old typeform state for 2025 Address Typeahead experiment
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
      START: "GET_STARTED_START",
      HAS_PROPERTY: {
        YES: "HAS_PROPERTY_YES",
        NO: "HAS_PROPERTY_NO"
      }
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
function x(t, e) {
  const a = {
    [n.EVENTS.EXIT]: {
      target: n.STATES.DEFAULT,
      effects: {
        onTransition: [
          (o) => {
            e == null || e.track("Modal Closed", o);
          }
        ]
      }
    }
  }, i = {
    [n.EVENTS.EXIT]: {
      target: n.STATES.GET_STARTED.COMPLETE.DEFAULT,
      effects: {
        onTransition: [
          (o) => {
            e == null || e.track("Modal Closed", o);
          }
        ]
      }
    }
  }, r = {
    [n.EVENTS.SUBMIT_CONTACT.SUBMIT]: {
      target: n.STATES.GET_GUIDES.PROCESSING,
      effects: {
        onTransition: [
          (o) => {
            e == null || e.track("Guides Contact Submitted", o);
          }
        ]
      }
    }
  }, s = {
    onEntry: [async () => W(t)]
  };
  return {
    constants: n,
    defaultState: n.STATES.DEFAULT,
    states: {
      [n.STATES.DEFAULT]: {
        transitions: {
          [n.EVENTS.GET_STARTED.START]: () => ({
            target: n.STATES.GET_STARTED.OLD_TEST_TYPEFORM,
            effects: {
              onTransition: [
                (o) => {
                  e.track(
                    "Get Started Clicked",
                    o
                  );
                }
              ]
            }
          }),
          [n.EVENTS.BOOK_INTRO.START]: {
            target: n.STATES.BOOK_INTRO.FORM,
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
          [n.EVENTS.GET_VALUATION_REPORT.START]: {
            target: n.STATES.GET_VALUATION_REPORT.FORM,
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
          [n.EVENTS.GET_GUIDES.START]: {
            target: n.STATES.GET_GUIDES.FORM,
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
      [n.STATES.GET_STARTED.PROPERTY_QUESTION]: {
        transitions: {
          ...a,
          [n.EVENTS.GET_STARTED.HAS_PROPERTY.YES]: {
            target: n.STATES.GET_STARTED.ADDRESS_SEARCH,
            effects: {
              onTransition: [
                (o) => {
                  e.track(
                    "Has Specific Property",
                    o
                  );
                }
              ]
            }
          },
          [n.EVENTS.GET_STARTED.HAS_PROPERTY.NO]: {
            target: n.STATES.GET_STARTED.TYPEFORM,
            effects: {
              onTransition: [
                (o) => {
                  e.track("No Specific Property", o);
                }
              ]
            }
          }
        }
      },
      [n.STATES.GET_STARTED.ADDRESS_SEARCH]: {
        transitions: {
          ...a
        }
      },
      [n.STATES.GET_STARTED.TYPEFORM]: {
        transitions: {
          ...a
        }
      },
      // Old typeform state for 2025 Address Typeahead experiment
      [n.STATES.GET_STARTED.OLD_TEST_TYPEFORM]: {
        transitions: {
          ...a
        }
      },
      [n.STATES.GET_STARTED.COMPLETE.DEFAULT]: {
        transitions: {
          [n.EVENTS.GET_STARTED.START]: {
            target: n.STATES.GET_STARTED.COMPLETE.MODAL,
            effects: {
              onTransition: [
                (o) => {
                  e.track("Get Started Clicked", o);
                }
              ]
            }
          },
          [n.EVENTS.BOOK_INTRO.START]: {
            target: n.STATES.BOOK_INTRO.FORM,
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
          [n.EVENTS.GET_VALUATION_REPORT.START]: {
            target: n.STATES.GET_VALUATION_REPORT.FORM,
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
          [n.EVENTS.GET_GUIDES.START]: {
            target: n.STATES.GET_GUIDES.FORM,
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
      [n.STATES.GET_STARTED.COMPLETE.MODAL]: {
        transitions: {
          ...i,
          [n.EVENTS.BOOK_INTRO.START]: {
            target: n.STATES.BOOK_INTRO.FORM,
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
      [n.STATES.BOOK_INTRO.FORM]: {
        transitions: {
          ...a
        }
      },
      [n.STATES.GET_VALUATION_REPORT.FORM]: {
        transitions: {
          ...a
        }
      },
      [n.STATES.GET_GUIDES.FORM]: {
        transitions: {
          ...a,
          ...r
        }
      },
      [n.STATES.GET_GUIDES.PROCESSING]: {
        transitions: {
          ...a,
          [n.EVENTS.SUBMIT_CONTACT.SUCCESS]: {
            target: n.STATES.GET_GUIDES.SUCCESS,
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
          [n.EVENTS.SUBMIT_CONTACT.ERROR]: {
            target: n.STATES.GET_GUIDES.ERROR,
            effects: {
              onTransition: [
                (o) => {
                  e.track("Guides Contact Submission Failed", {
                    ...o,
                    error_str: t.thGuidesContactViewModel.errorMessage
                  });
                }
              ]
            }
          }
        },
        effects: s
      },
      [n.STATES.GET_GUIDES.ERROR]: {
        transitions: {
          ...a,
          ...r
        },
        effects: {
          onExit: [
            () => {
              t.thGuidesContactViewModel.errorMessage = "";
            }
          ]
        }
      },
      [n.STATES.GET_GUIDES.SUCCESS]: {
        transitions: {
          ...a
        },
        effects: {
          onEntry: [
            () => {
              t.thGuidesDownloadViewModel.downloadButtonElement.click();
            }
          ]
        }
      }
    }
  };
}
function K(t) {
  return {
    modal: {
      get isOpen() {
        return [
          n.STATES.GET_STARTED.PROPERTY_QUESTION,
          n.STATES.GET_STARTED.ADDRESS_SEARCH,
          n.STATES.GET_STARTED.TYPEFORM,
          n.STATES.GET_STARTED.OLD_TEST_TYPEFORM,
          // Old typeform state for 2025 Address Typeahead experiment
          n.STATES.GET_STARTED.COMPLETE.MODAL,
          n.STATES.GET_VALUATION_REPORT.FORM,
          n.STATES.BOOK_INTRO.FORM,
          n.STATES.GET_GUIDES.FORM,
          n.STATES.GET_GUIDES.PROCESSING,
          n.STATES.GET_GUIDES.ERROR,
          n.STATES.GET_GUIDES.SUCCESS
        ].includes(t.flowState.value);
      }
    }
  };
}
async function W(t) {
  try {
    let e = {
      firstName: t.thGuidesContactViewModel.firstName.trim(),
      lastName: t.thGuidesContactViewModel.lastName.trim(),
      email: t.thGuidesContactViewModel.email.trim()
    };
    if (!U(e.email))
      throw new Error("Please enter a valid email address, and try again.", {
        cause: "INVALID_EMAIL"
      });
    const a = {
      ...t.thGuidesContactViewModel.options,
      contact: e
    };
    await Promise.all([B(a)]), t.thGuidesContactViewModel.isSubmitted = !0, t.flowState.transition(
      n.EVENTS.SUBMIT_CONTACT.SUCCESS
    );
  } catch (e) {
    console.log("Error submitting contact:", e), e && e.cause && e.cause === "INVALID_EMAIL" ? t.thGuidesContactViewModel.errorMessage = e.message : t.thGuidesContactViewModel.errorMessage = "There was an error processing your info. Please try again, or contact us for help.", t.flowState.transition(n.EVENTS.SUBMIT_CONTACT.ERROR);
  }
}
function Y(t, e, a, i) {
  function r(s) {
    return s instanceof a ? s : new a(function(l) {
      l(s);
    });
  }
  return new (a || (a = Promise))(function(s, l) {
    function o(d) {
      try {
        S(i.next(d));
      } catch (T) {
        l(T);
      }
    }
    function h(d) {
      try {
        S(i.throw(d));
      } catch (T) {
        l(T);
      }
    }
    function S(d) {
      d.done ? s(d.value) : r(d.value).then(o, h);
    }
    S((i = i.apply(t, e || [])).next());
  });
}
function j(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var $ = function t(e, a) {
  if (e === a)
    return !0;
  if (e && a && typeof e == "object" && typeof a == "object") {
    if (e.constructor !== a.constructor)
      return !1;
    var i, r, s;
    if (Array.isArray(e)) {
      if (i = e.length, i != a.length)
        return !1;
      for (r = i; r-- !== 0; )
        if (!t(e[r], a[r]))
          return !1;
      return !0;
    }
    if (e.constructor === RegExp)
      return e.source === a.source && e.flags === a.flags;
    if (e.valueOf !== Object.prototype.valueOf)
      return e.valueOf() === a.valueOf();
    if (e.toString !== Object.prototype.toString)
      return e.toString() === a.toString();
    if (s = Object.keys(e), i = s.length, i !== Object.keys(a).length)
      return !1;
    for (r = i; r-- !== 0; )
      if (!Object.prototype.hasOwnProperty.call(a, s[r]))
        return !1;
    for (r = i; r-- !== 0; ) {
      var l = s[r];
      if (!t(e[l], a[l]))
        return !1;
    }
    return !0;
  }
  return e !== e && a !== a;
}, J = /* @__PURE__ */ j($);
const G = "__googleMapsScriptId";
var g;
(function(t) {
  t[t.INITIALIZED = 0] = "INITIALIZED", t[t.LOADING = 1] = "LOADING", t[t.SUCCESS = 2] = "SUCCESS", t[t.FAILURE = 3] = "FAILURE";
})(g || (g = {}));
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
  constructor({ apiKey: e, authReferrerPolicy: a, channel: i, client: r, id: s = G, language: l, libraries: o = [], mapIds: h, nonce: S, region: d, retries: T = 3, url: f = "https://maps.googleapis.com/maps/api/js", version: m }) {
    if (this.callbacks = [], this.done = !1, this.loading = !1, this.errors = [], this.apiKey = e, this.authReferrerPolicy = a, this.channel = i, this.client = r, this.id = s || G, this.language = l, this.libraries = o, this.mapIds = h, this.nonce = S, this.region = d, this.retries = T, this.url = f, this.version = m, E.instance) {
      if (!J(this.options, E.instance.options))
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
    return this.errors.length ? g.FAILURE : this.done ? g.SUCCESS : this.loading ? g.LOADING : g.INITIALIZED;
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
    return new Promise((e, a) => {
      this.loadCallback((i) => {
        i ? a(i.error) : e(window.google);
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
    var e, a;
    if (document.getElementById(this.id)) {
      this.callback();
      return;
    }
    const i = {
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
    Object.keys(i).forEach(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (s) => !i[s] && delete i[s]
    ), !((a = (e = window == null ? void 0 : window.google) === null || e === void 0 ? void 0 : e.maps) === null || a === void 0) && a.importLibrary || ((s) => {
      let l, o, h, S = "The Google Maps JavaScript API", d = "google", T = "importLibrary", f = "__ib__", m = document, p = window;
      p = p[d] || (p[d] = {});
      const M = p.maps || (p.maps = {}), I = /* @__PURE__ */ new Set(), A = new URLSearchParams(), N = () => (
        // @ts-ignore
        l || (l = new Promise((C, R) => Y(this, void 0, void 0, function* () {
          var y;
          yield o = m.createElement("script"), o.id = this.id, A.set("libraries", [...I] + "");
          for (h in s)
            A.set(h.replace(/[A-Z]/g, (D) => "_" + D[0].toLowerCase()), s[h]);
          A.set("callback", d + ".maps." + f), o.src = this.url + "?" + A, M[f] = C, o.onerror = () => l = R(Error(S + " could not load.")), o.nonce = this.nonce || ((y = m.querySelector("script[nonce]")) === null || y === void 0 ? void 0 : y.nonce) || "", m.head.append(o);
        })))
      );
      M[T] ? console.warn(S + " only loads once. Ignoring:", s) : M[T] = (C, ...R) => I.add(C) && N().then(() => M[T](C, ...R));
    })(i);
    const r = this.libraries.map((s) => this.importLibrary(s));
    r.length || r.push(this.importLibrary("core")), Promise.all(r).then(() => this.callback(), (s) => {
      const l = new ErrorEvent("error", { error: s });
      this.loadErrorCallback(l);
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
      const a = this.errors.length * Math.pow(2, this.errors.length);
      console.error(`Failed to load Google Maps script, retrying in ${a} ms.`), setTimeout(() => {
        this.deleteScript(), this.setScript();
      }, a);
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
const z = "AIzaSyCOAucx7oi5vgR0w5CUfLj6G67YZINBSMc", q = new E({
  apiKey: z,
  version: "weekly"
});
let P = null, w = null;
async function Q() {
  try {
    const t = await q.importLibrary("places");
    P = t.AutocompleteSuggestion, w = t.AutocompleteSessionToken;
  } catch (t) {
    console.error("Error loading Google Maps Places library:", t);
  }
}
function X() {
  if (w)
    return new w();
}
async function Z(t, e) {
  if (P)
    try {
      const { suggestions: a } = await P.fetchAutocompleteSuggestions({
        input: t,
        language: "en-US",
        region: "us",
        sessionToken: e,
        includedRegionCodes: ["us"],
        includedPrimaryTypes: ["geocode"]
      });
      return a.map((i) => ({
        placePrediction: i.placePrediction,
        text: i.placePrediction.text.toString()
      }));
    } catch (a) {
      throw console.error(
        "Error fetching Google Places Autocomplete suggestions:",
        a
      ), new Error(
        "There was an error finding your address. Please try again, or contact us for help."
      );
    }
}
function ee(t) {
  return t.addressComponents && t.addressComponents.some(
    (e) => e.types[0] === "street_number"
  ) && t.addressComponents.some(
    (e) => e.types[0] === "route"
  ) && t.addressComponents.some(
    (e) => e.types[0] === "locality"
  ) && t.addressComponents.some(
    (e) => e.types[0] === "administrative_area_level_1"
  );
}
function te(t) {
  return encodeURIComponent(t.formattedAddress);
}
const ae = "https://buyer.turbohome.com/onboard";
function ne(t) {
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
     * Initializes the AddressViewModel instance properties.
     * Run automatically by Alpine, but can also be called manually to reset the view model state.
     * Need to call this manually on store creation if we stop using Alpine as our UI library.
     * @returns {void}
     */
    async init() {
      this.inputValue = "", this.suggestions = [], this.keyboardNavIndex = -1, this.selectedPlace = {}, this.isSubmitted = !1, this.errorMessage = "", await Q(), this.refreshSessionToken();
    },
    refreshSessionToken() {
      this.sessionToken = X();
    },
    /**
     * Whether or not an address match has been selected with the typeahead.
     * @type {boolean}
     */
    get isSelected() {
      return Object.keys(this.selectedPlace).length != 0;
    },
    get isSelectedValid() {
      return ee(this.selectedPlace);
    },
    /**
     * Handles input events from the address typeahead input field.
     * Fetches and updates address suggestions based on the current input value.
     * @returns {Promise.<void>} Promise that resolves when input handling is complete.
     */
    async handleInput() {
      if (this.isSubmitted && (this.isSubmitted = !1), this.errorMessage && (this.errorMessage = ""), this.isSelected && (this.selectedPlace = {}), !this.inputValue) {
        this.suggestions = [];
        return;
      }
      try {
        this.suggestions = await Z(
          this.inputValue,
          this.sessionToken
        );
      } catch (e) {
        this.errorMessage = e.message;
      }
    },
    /**
     * Handles keyboard events for the address typeahead input field.
     * Navigates up or down the list of matches if ArrowUp or ArrowDown are pressed.
     * Selects the address at the current keyboardNavIndex if Enter is pressed.
     * @param {KeyboardEvent} event - Keyboard event object.
     * @returns {void}
     */
    handleKeydown(e) {
      e.key != "Enter" && e.key != "ArrowUp" && e.key != "ArrowDown" || this.isSelected || this.suggestions.length === 0 || (e.preventDefault(), e.stopPropagation(), e.key === "Enter" && this.keyboardNavIndex != -1 ? this.selectSuggestion(this.suggestions[this.keyboardNavIndex]) : e.key === "ArrowUp" ? this.keyboardNavIndex = this.keyboardNavIndex <= -1 ? this.suggestions.length - 1 : this.keyboardNavIndex - 1 : e.key === "ArrowDown" && (this.keyboardNavIndex = this.keyboardNavIndex >= this.suggestions.length - 1 ? -1 : this.keyboardNavIndex + 1));
    },
    async selectSuggestion(e) {
      let a = e.placePrediction.toPlace();
      await a.fetchFields({
        fields: ["displayName", "formattedAddress", "addressComponents"]
      }), this.selectedPlace = a, this.inputValue = a.formattedAddress, this.isSelectedValid || (this.errorMessage = "Please select a valid property address to continue, or contact us for help."), t.track("Address Selected"), this.refreshSessionToken(), this.suggestions = [], this.keyboardNavIndex = -1, this.isSelectedValid && this.redirectToReport();
    },
    handleSubmit(e) {
      e.preventDefault(), e.stopPropagation();
    },
    redirectToReport() {
      this.isSubmitted = !0;
      const e = te(
        this.selectedPlace
      );
      if (!this.isSelected || !this.isSelectedValid || !e) {
        this.isSubmitted = !1;
        return;
      }
      const a = new URL(ae);
      a.searchParams.append("address", e), new URL(window.location.href).searchParams.forEach((r, s) => {
        a.searchParams.append(s, r);
      }), t.track("Redirected to Comps Report"), window.location.assign(a);
    }
  };
}
function oe(t) {
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
    handleDownloadClick(e, a) {
      this.guide = a, this.downloadButtonElement = e.target;
      const i = t.thGuidesContactViewModel.isSubmitted;
      i || (e.preventDefault(), t.flowState.transition(
        n.EVENTS.GET_GUIDES.START,
        {
          guide_str: this.guide,
          contact_submitted_str: i
        }
      ));
    }
  };
}
function ie(t) {
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
    handleSubmit(e, a = {}) {
      e.preventDefault(), e.stopPropagation(), this.options = a, t.transition(n.EVENTS.SUBMIT_CONTACT.SUBMIT);
    }
  };
}
const se = 0.03, re = 15e5, le = 5e6, ce = 25e4, de = 5e4;
function Te(t = {}) {
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
      return t.getContent("calcCommissionRate") || se;
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
      return t.getContent("calcDefaultListPrice") || re;
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
      return t.getContent("calcMaxListPrice") || le;
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
      return t.getContent("calcMinListPrice") || ce;
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
      return t.getContent("calcInputStep") || de;
    },
    get formattedListPrice() {
      return _(this.listPrice);
    },
    get turboHomeFee() {
      return t.getContent("pricingModel") === "Split Commission" ? this.listPrice * this.commissionRate / 2 : this.listPrice <= 5e5 ? 5e3 : this.listPrice <= 1e6 ? 7500 : this.listPrice <= 2e6 ? 1e4 : 15e3;
    },
    get cashBack() {
      return Math.round(
        this.listPrice * this.commissionRate - this.turboHomeFee
      );
    },
    get formattedCashBack() {
      return _(this.cashBack);
    }
  };
}
function _(t) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  }).format(t);
}
const ue = {
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
}, Se = {
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
}, Ee = {
  content: {
    pricingModel: "Flat Fee"
  },
  state: "Alabama"
}, ge = {
  content: {
    pricingModel: "Flat Fee"
  },
  state: "Arkansas"
}, me = {
  content: {
    pricingModel: "Flat Fee"
  },
  state: "Arizona"
}, pe = {
  content: {
    phoneNumberText: "(510) 391-5392",
    phoneNumberLink: "tel:+15103915392",
    pricingModel: "Flat Fee"
  },
  state: "California"
}, fe = {
  content: {
    pricingModel: "Flat Fee"
  },
  state: "Colorado"
}, Me = {
  content: {
    pricingModel: "Split Commission"
  },
  state: "Connecticut"
}, Ae = {
  content: {
    pricingModel: "Flat Fee"
  },
  state: "Delaware"
}, Ce = {
  content: {
    pricingModel: "Flat Fee"
  },
  state: "Florida"
}, Re = {
  content: {
    pricingModel: "Flat Fee"
  },
  state: "Georgia"
}, ye = {
  content: {
    pricingModel: "Flat Fee"
  },
  state: "Hawaii"
}, Fe = {
  content: {
    pricingModel: "Flat Fee"
  },
  state: "Idaho"
}, Pe = {
  content: {
    pricingModel: "Flat Fee"
  },
  state: "Illinois"
}, we = {
  content: {
    pricingModel: "Flat Fee"
  },
  state: "Indiana"
}, Oe = {
  content: {
    pricingModel: "Flat Fee"
  },
  state: "Iowa"
}, Ie = {
  content: {
    pricingModel: "Flat Fee"
  },
  state: "Kansas"
}, Ge = {
  content: {
    pricingModel: "Flat Fee"
  },
  state: "Kentucky"
}, _e = {
  content: {
    pricingModel: "Flat Fee"
  },
  state: "Louisiana"
}, Le = {
  content: {
    pricingModel: "Flat Fee"
  },
  state: "Maine"
}, Ne = {
  content: {
    pricingModel: "Flat Fee"
  },
  state: "Maryland"
}, De = {
  content: {
    pricingModel: "Split Commission"
  },
  state: "Massachusetts"
}, ke = {
  content: {
    pricingModel: "Flat Fee"
  },
  state: "Michigan"
}, be = {
  content: {
    pricingModel: "Flat Fee"
  },
  state: "Minnesota"
}, Ve = {
  content: {
    pricingModel: "Flat Fee"
  },
  state: "Mississippi"
}, Ue = {
  content: {
    pricingModel: "Flat Fee"
  },
  state: "Missouri"
}, Be = {
  content: {
    pricingModel: "Flat Fee"
  },
  state: "Montana"
}, ve = {
  content: {
    pricingModel: "Flat Fee"
  },
  state: "Nebraska"
}, He = {
  content: {
    pricingModel: "Flat Fee"
  },
  state: "Nevada"
}, xe = {
  content: {
    pricingModel: "Flat Fee"
  },
  state: "Ohio"
}, Ke = {
  content: {
    pricingModel: "Flat Fee"
  },
  state: "Oklahoma"
}, We = {
  content: {
    pricingModel: "Flat Fee"
  },
  state: "Oregon"
}, Ye = {
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
}, qe = {
  content: {
    pricingModel: "Flat Fee"
  },
  state: "Virginia"
}, Qe = {
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
}, et = {
  DEFAULT: ue,
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
  Sacramento: Se,
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
  Alabama: Ee,
  Arkansas: ge,
  Arizona: me,
  California: pe,
  Colorado: fe,
  Connecticut: Me,
  Delaware: Ae,
  Florida: Ce,
  Georgia: Re,
  Hawaii: ye,
  Idaho: Fe,
  Illinois: Pe,
  Indiana: we,
  Iowa: Oe,
  Kansas: Ie,
  Kentucky: Ge,
  Louisiana: _e,
  Maine: Le,
  Maryland: Ne,
  Massachusetts: De,
  Michigan: ke,
  Minnesota: be,
  Mississippi: Ve,
  Missouri: Ue,
  Montana: Be,
  Nebraska: ve,
  Nevada: He,
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
  Oklahoma: Ke,
  Oregon: We,
  Pennsylvania: Ye,
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
  Virginia: qe,
  Washington: Qe,
  "West Virginia": {
    content: {
      pricingModel: "Flat Fee"
    },
    state: "West Virginia"
  },
  Wisconsin: Xe,
  Wyoming: Ze
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
      const t = L("gclid");
      let e = null;
      const a = L("gclsrc"), i = !a || a.indexOf("aw") !== -1;
      t && i && (e = at(t), localStorage.setItem("gclid", JSON.stringify(e)));
      const r = e || JSON.parse(localStorage.getItem("gclid"));
      r && (/* @__PURE__ */ new Date()).getTime() < r.expiryDate && (this.gclid = r.value);
    }
  };
}
function L(t) {
  const e = RegExp("[?&]" + t + "=([^&]*)").exec(window.location.search);
  return e && decodeURIComponent(e[1].replace(/\+/g, " "));
}
function at(t) {
  const a = (/* @__PURE__ */ new Date()).getTime() + 7776e6;
  return {
    value: t,
    expiryDate: a
  };
}
window.Alpine = O;
const u = b(O), c = {}, F = V(window.FS, c);
nt();
O.start();
function nt() {
  const e = new URL(window.location.href).searchParams.get("get_started"), a = e && e === "complete" ? n.STATES.GET_STARTED.COMPLETE.MODAL : n.STATES.DEFAULT;
  c.flowState = u.createStore(
    "flowState",
    k(
      x(c, F),
      F,
      a
    )
  ), c.flowUIHelpers = u.createStore(
    "flowUIHelpers",
    K(c)
  ), c.personalizationViewModel = u.createStore(
    "personalizationViewModel",
    v(et)
  ), c.experimentationViewModel = u.createStore(
    "experimentationViewModel",
    H()
  ), c.adTrackingViewModel = u.createStore(
    "adTrackingViewModel",
    tt()
  ), c.addressViewModel = u.createStore(
    "addressViewModel",
    ne(F)
  ), c.thGuidesContactViewModel = u.createStore(
    "thGuidesContactViewModel",
    ie(c.flowState)
  ), c.thGuidesDownloadViewModel = u.createStore(
    "thGuidesDownloadViewModel",
    oe(c)
  ), c.thCalculatorViewModel = u.createStore(
    "thCalculatorViewModel",
    Te(c.personalizationViewModel)
  );
}
