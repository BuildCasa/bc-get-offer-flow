import { m as y, c as V, a as F, b as k } from "./shared-dpXQ-LAr.js";
import { v as B, t as x, c as v, d as H } from "./shared-GNnSRXuc.js";
const s = {
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
function K(t, e) {
  const i = {
    [s.EVENTS.EXIT]: {
      target: s.STATES.DEFAULT,
      effects: {
        onTransition: [
          (r) => {
            e == null || e.track("Modal Closed", r);
          }
        ]
      }
    }
  }, o = {
    [s.EVENTS.EXIT]: {
      target: s.STATES.GET_STARTED.COMPLETE.DEFAULT,
      effects: {
        onTransition: [
          (r) => {
            e == null || e.track("Modal Closed", r);
          }
        ]
      }
    }
  }, n = {
    [s.EVENTS.SUBMIT_CONTACT.SUBMIT]: {
      target: s.STATES.GET_GUIDES.PROCESSING,
      effects: {
        onTransition: [
          (r) => {
            e == null || e.track("Guides Contact Submitted", r);
          }
        ]
      }
    }
  }, a = {
    onEntry: [async () => j(t)]
  };
  return {
    constants: s,
    defaultState: s.STATES.DEFAULT,
    states: {
      [s.STATES.DEFAULT]: {
        transitions: {
          [s.EVENTS.GET_STARTED.START]: () => ({
            target: s.STATES.GET_STARTED.OLD_TEST_TYPEFORM,
            effects: {
              onTransition: [
                (r) => {
                  e.track(
                    "Get Started Clicked",
                    r
                  );
                }
              ]
            }
          }),
          [s.EVENTS.BOOK_INTRO.START]: {
            target: s.STATES.BOOK_INTRO.FORM,
            effects: {
              onTransition: [
                (r) => {
                  e.track(
                    "Book Intro Call Clicked",
                    r
                  );
                }
              ]
            }
          },
          [s.EVENTS.GET_VALUATION_REPORT.START]: {
            target: s.STATES.GET_VALUATION_REPORT.FORM,
            effects: {
              onTransition: [
                (r) => {
                  e.track(
                    "Get Valuation Report Clicked",
                    r
                  );
                }
              ]
            }
          },
          [s.EVENTS.GET_GUIDES.START]: {
            target: s.STATES.GET_GUIDES.FORM,
            effects: {
              onTransition: [
                (r) => {
                  e.track("Get Guide Clicked", r);
                }
              ]
            }
          }
        }
      },
      [s.STATES.GET_STARTED.PROPERTY_QUESTION]: {
        transitions: {
          ...i,
          [s.EVENTS.GET_STARTED.HAS_PROPERTY.YES]: {
            target: s.STATES.GET_STARTED.ADDRESS_SEARCH,
            effects: {
              onTransition: [
                (r) => {
                  e.track(
                    "Has Specific Property",
                    r
                  );
                }
              ]
            }
          },
          [s.EVENTS.GET_STARTED.HAS_PROPERTY.NO]: {
            target: s.STATES.GET_STARTED.TYPEFORM,
            effects: {
              onTransition: [
                (r) => {
                  e.track("No Specific Property", r);
                }
              ]
            }
          }
        }
      },
      [s.STATES.GET_STARTED.ADDRESS_SEARCH]: {
        transitions: {
          ...i
        }
      },
      [s.STATES.GET_STARTED.TYPEFORM]: {
        transitions: {
          ...i
        }
      },
      // Old typeform state for 2025 Address Typeahead experiment
      [s.STATES.GET_STARTED.OLD_TEST_TYPEFORM]: {
        transitions: {
          ...i
        }
      },
      [s.STATES.GET_STARTED.COMPLETE.DEFAULT]: {
        transitions: {
          [s.EVENTS.GET_STARTED.START]: {
            target: s.STATES.GET_STARTED.COMPLETE.MODAL,
            effects: {
              onTransition: [
                (r) => {
                  e.track("Get Started Clicked", r);
                }
              ]
            }
          },
          [s.EVENTS.BOOK_INTRO.START]: {
            target: s.STATES.BOOK_INTRO.FORM,
            effects: {
              onTransition: [
                (r) => {
                  e.track(
                    "Book Intro Call Clicked",
                    r
                  );
                }
              ]
            }
          },
          [s.EVENTS.GET_VALUATION_REPORT.START]: {
            target: s.STATES.GET_VALUATION_REPORT.FORM,
            effects: {
              onTransition: [
                (r) => {
                  e.track(
                    "Get Valuation Report Clicked",
                    r
                  );
                }
              ]
            }
          },
          [s.EVENTS.GET_GUIDES.START]: {
            target: s.STATES.GET_GUIDES.FORM,
            effects: {
              onTransition: [
                (r) => {
                  e.track("Get Guide Clicked", r);
                }
              ]
            }
          }
        }
      },
      [s.STATES.GET_STARTED.COMPLETE.MODAL]: {
        transitions: {
          ...o,
          [s.EVENTS.BOOK_INTRO.START]: {
            target: s.STATES.BOOK_INTRO.FORM,
            effects: {
              onTransition: [
                (r) => {
                  e.track(
                    "Book Intro Call Clicked",
                    r
                  );
                }
              ]
            }
          }
        }
      },
      [s.STATES.BOOK_INTRO.FORM]: {
        transitions: {
          ...i
        }
      },
      [s.STATES.GET_VALUATION_REPORT.FORM]: {
        transitions: {
          ...i
        }
      },
      [s.STATES.GET_GUIDES.FORM]: {
        transitions: {
          ...i,
          ...n
        }
      },
      [s.STATES.GET_GUIDES.PROCESSING]: {
        transitions: {
          ...i,
          [s.EVENTS.SUBMIT_CONTACT.SUCCESS]: {
            target: s.STATES.GET_GUIDES.SUCCESS,
            effects: {
              onTransition: [
                (r) => {
                  e.track(
                    "Guides Contact Submission Succeeded",
                    r
                  );
                }
              ]
            }
          },
          [s.EVENTS.SUBMIT_CONTACT.ERROR]: {
            target: s.STATES.GET_GUIDES.ERROR,
            effects: {
              onTransition: [
                (r) => {
                  e.track("Guides Contact Submission Failed", {
                    ...r,
                    error_str: t.thGuidesContactViewModel.errorMessage
                  });
                }
              ]
            }
          }
        },
        effects: a
      },
      [s.STATES.GET_GUIDES.ERROR]: {
        transitions: {
          ...i,
          ...n
        },
        effects: {
          onExit: [
            () => {
              t.thGuidesContactViewModel.errorMessage = "";
            }
          ]
        }
      },
      [s.STATES.GET_GUIDES.SUCCESS]: {
        transitions: {
          ...i
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
function Y(t) {
  return {
    modal: {
      get isOpen() {
        return [
          s.STATES.GET_STARTED.PROPERTY_QUESTION,
          s.STATES.GET_STARTED.ADDRESS_SEARCH,
          s.STATES.GET_STARTED.TYPEFORM,
          s.STATES.GET_STARTED.OLD_TEST_TYPEFORM,
          // Old typeform state for 2025 Address Typeahead experiment
          s.STATES.GET_STARTED.COMPLETE.MODAL,
          s.STATES.GET_VALUATION_REPORT.FORM,
          s.STATES.BOOK_INTRO.FORM,
          s.STATES.GET_GUIDES.FORM,
          s.STATES.GET_GUIDES.PROCESSING,
          s.STATES.GET_GUIDES.ERROR,
          s.STATES.GET_GUIDES.SUCCESS
        ].includes(t.flowState.value);
      }
    }
  };
}
async function j(t) {
  try {
    let e = {
      firstName: t.thGuidesContactViewModel.firstName.trim(),
      lastName: t.thGuidesContactViewModel.lastName.trim(),
      email: t.thGuidesContactViewModel.email.trim()
    };
    if (!B(e.email))
      throw new Error("Please enter a valid email address, and try again.", {
        cause: "INVALID_EMAIL"
      });
    const i = {
      ...t.thGuidesContactViewModel.options,
      contact: e
    };
    await Promise.all([x(i)]), t.thGuidesContactViewModel.isSubmitted = !0, t.flowState.transition(
      s.EVENTS.SUBMIT_CONTACT.SUCCESS
    );
  } catch (e) {
    console.log("Error submitting contact:", e), e && e.cause && e.cause === "INVALID_EMAIL" ? t.thGuidesContactViewModel.errorMessage = e.message : t.thGuidesContactViewModel.errorMessage = "There was an error processing your info. Please try again, or contact us for help.", t.flowState.transition(s.EVENTS.SUBMIT_CONTACT.ERROR);
  }
}
function $(t, e, i, o) {
  function n(a) {
    return a instanceof i ? a : new i(function(l) {
      l(a);
    });
  }
  return new (i || (i = Promise))(function(a, l) {
    function r(d) {
      try {
        E(o.next(d));
      } catch (T) {
        l(T);
      }
    }
    function S(d) {
      try {
        E(o.throw(d));
      } catch (T) {
        l(T);
      }
    }
    function E(d) {
      d.done ? a(d.value) : n(d.value).then(r, S);
    }
    E((o = o.apply(t, e || [])).next());
  });
}
function J(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var W = function t(e, i) {
  if (e === i)
    return !0;
  if (e && i && typeof e == "object" && typeof i == "object") {
    if (e.constructor !== i.constructor)
      return !1;
    var o, n, a;
    if (Array.isArray(e)) {
      if (o = e.length, o != i.length)
        return !1;
      for (n = o; n-- !== 0; )
        if (!t(e[n], i[n]))
          return !1;
      return !0;
    }
    if (e.constructor === RegExp)
      return e.source === i.source && e.flags === i.flags;
    if (e.valueOf !== Object.prototype.valueOf)
      return e.valueOf() === i.valueOf();
    if (e.toString !== Object.prototype.toString)
      return e.toString() === i.toString();
    if (a = Object.keys(e), o = a.length, o !== Object.keys(i).length)
      return !1;
    for (n = o; n-- !== 0; )
      if (!Object.prototype.hasOwnProperty.call(i, a[n]))
        return !1;
    for (n = o; n-- !== 0; ) {
      var l = a[n];
      if (!t(e[l], i[l]))
        return !1;
    }
    return !0;
  }
  return e !== e && i !== i;
}, q = /* @__PURE__ */ J(W);
const M = "__googleMapsScriptId";
var f;
(function(t) {
  t[t.INITIALIZED = 0] = "INITIALIZED", t[t.LOADING = 1] = "LOADING", t[t.SUCCESS = 2] = "SUCCESS", t[t.FAILURE = 3] = "FAILURE";
})(f || (f = {}));
class h {
  /**
   * Creates an instance of Loader using [[LoaderOptions]]. No defaults are set
   * using this library, instead the defaults are set by the Google Maps
   * JavaScript API server.
   *
   * ```
   * const loader = Loader({apiKey, version: 'weekly', libraries: ['places']});
   * ```
   */
  constructor({ apiKey: e, authReferrerPolicy: i, channel: o, client: n, id: a = M, language: l, libraries: r = [], mapIds: S, nonce: E, region: d, retries: T = 3, url: g = "https://maps.googleapis.com/maps/api/js", version: m }) {
    if (this.callbacks = [], this.done = !1, this.loading = !1, this.errors = [], this.apiKey = e, this.authReferrerPolicy = i, this.channel = o, this.client = n, this.id = a || M, this.language = l, this.libraries = r, this.mapIds = S, this.nonce = E, this.region = d, this.retries = T, this.url = g, this.version = m, h.instance) {
      if (!q(this.options, h.instance.options))
        throw new Error(`Loader must not be called again with different options. ${JSON.stringify(this.options)} !== ${JSON.stringify(h.instance.options)}`);
      return h.instance;
    }
    h.instance = this;
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
    return this.errors.length ? f.FAILURE : this.done ? f.SUCCESS : this.loading ? f.LOADING : f.INITIALIZED;
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
    return new Promise((e, i) => {
      this.loadCallback((o) => {
        o ? i(o.error) : e(window.google);
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
    var e, i;
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
      (a) => !o[a] && delete o[a]
    ), !((i = (e = window == null ? void 0 : window.google) === null || e === void 0 ? void 0 : e.maps) === null || i === void 0) && i.importLibrary || ((a) => {
      let l, r, S, E = "The Google Maps JavaScript API", d = "google", T = "importLibrary", g = "__ib__", m = document, p = window;
      p = p[d] || (p[d] = {});
      const A = p.maps || (p.maps = {}), G = /* @__PURE__ */ new Set(), R = new URLSearchParams(), U = () => (
        // @ts-ignore
        l || (l = new Promise((C, O) => $(this, void 0, void 0, function* () {
          var _;
          yield r = m.createElement("script"), r.id = this.id, R.set("libraries", [...G] + "");
          for (S in a)
            R.set(S.replace(/[A-Z]/g, (b) => "_" + b[0].toLowerCase()), a[S]);
          R.set("callback", d + ".maps." + g), r.src = this.url + "?" + R, A[g] = C, r.onerror = () => l = O(Error(E + " could not load.")), r.nonce = this.nonce || ((_ = m.querySelector("script[nonce]")) === null || _ === void 0 ? void 0 : _.nonce) || "", m.head.append(r);
        })))
      );
      A[T] ? console.warn(E + " only loads once. Ignoring:", a) : A[T] = (C, ...O) => G.add(C) && U().then(() => A[T](C, ...O));
    })(o);
    const n = this.libraries.map((a) => this.importLibrary(a));
    n.length || n.push(this.importLibrary("core")), Promise.all(n).then(() => this.callback(), (a) => {
      const l = new ErrorEvent("error", { error: a });
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
      const i = this.errors.length * Math.pow(2, this.errors.length);
      console.error(`Failed to load Google Maps script, retrying in ${i} ms.`), setTimeout(() => {
        this.deleteScript(), this.setScript();
      }, i);
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
const Q = "AIzaSyCOAucx7oi5vgR0w5CUfLj6G67YZINBSMc", X = new h({
  apiKey: Q,
  version: "weekly"
});
let w = null, P = null;
async function Z() {
  try {
    const t = await X.importLibrary("places");
    w = t.AutocompleteSuggestion, P = t.AutocompleteSessionToken;
  } catch (t) {
    console.error("Error loading Google Maps Places library:", t);
  }
}
function z() {
  if (P)
    return new P();
}
async function ee(t, e) {
  if (w)
    try {
      const { suggestions: i } = await w.fetchAutocompleteSuggestions({
        input: t,
        language: "en-US",
        region: "us",
        sessionToken: e,
        includedRegionCodes: ["us"],
        includedPrimaryTypes: ["geocode"]
      });
      return i.map((o) => ({
        placePrediction: o.placePrediction,
        text: o.placePrediction.text.toString()
      }));
    } catch (i) {
      throw console.error(
        "Error fetching Google Places Autocomplete suggestions:",
        i
      ), new Error(
        "There was an error finding your address. Please try again, or contact us for help."
      );
    }
}
function te(t) {
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
function ie(t) {
  return encodeURIComponent(t.formattedAddress);
}
const se = "https://buyer.turbohome.com/onboard";
function re(t) {
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
      this.inputValue = "", this.suggestions = [], this.keyboardNavIndex = -1, this.selectedPlace = {}, this.isSubmitted = !1, this.errorMessage = "", await Z(), this.refreshSessionToken();
    },
    refreshSessionToken() {
      this.sessionToken = z();
    },
    /**
     * Whether or not an address match has been selected with the typeahead.
     * @type {boolean}
     */
    get isSelected() {
      return Object.keys(this.selectedPlace).length != 0;
    },
    get isSelectedValid() {
      return te(this.selectedPlace);
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
        this.suggestions = await ee(
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
      let i = e.placePrediction.toPlace();
      await i.fetchFields({
        fields: ["displayName", "formattedAddress", "addressComponents"]
      }), this.selectedPlace = i, this.inputValue = i.formattedAddress, this.isSelectedValid || (this.errorMessage = "Please select a valid property address to continue, or contact us for help."), t.track("Address Selected"), this.refreshSessionToken(), this.suggestions = [], this.keyboardNavIndex = -1, this.isSelectedValid && this.redirectToReport();
    },
    handleSubmit(e) {
      e.preventDefault(), e.stopPropagation();
    },
    redirectToReport() {
      this.isSubmitted = !0;
      const e = ie(
        this.selectedPlace
      );
      if (!this.isSelected || !this.isSelectedValid || !e) {
        this.isSubmitted = !1;
        return;
      }
      const i = new URL(se);
      i.searchParams.append("address", e), new URL(window.location.href).searchParams.forEach((n, a) => {
        i.searchParams.append(a, n);
      }), t.track("Redirected to Comps Report"), window.location.assign(i);
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
    handleDownloadClick(e, i) {
      this.guide = i, this.downloadButtonElement = e.target;
      const o = t.thGuidesContactViewModel.isSubmitted;
      o || (e.preventDefault(), t.flowState.transition(
        s.EVENTS.GET_GUIDES.START,
        {
          guide_str: this.guide,
          contact_submitted_str: o
        }
      ));
    }
  };
}
function ae(t) {
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
    handleSubmit(e, i = {}) {
      e.preventDefault(), e.stopPropagation(), this.options = i, t.transition(s.EVENTS.SUBMIT_CONTACT.SUBMIT);
    }
  };
}
const ne = 0.03, D = 15e5, le = 5e6, ce = 25e4, de = 5e4;
function Te(t = {}) {
  return {
    listPrice: null,
    commissionRate: ne,
    init: function() {
      this.listPrice = t.getContent("calcDefaultListPrice") || D;
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
      return t.getContent("calcDefaultListPrice") || D;
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
      return N(this.listPrice);
    },
    get turboHomeFee() {
      return this.listPrice <= 1e6 ? 7500 : this.listPrice <= 2e6 ? 1e4 : 15e3;
    },
    get cashBack() {
      return Math.round(
        this.listPrice * this.commissionRate - this.turboHomeFee
      );
    },
    get formattedCashBack() {
      return N(this.cashBack);
    }
  };
}
function N(t) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  }).format(t);
}
const ue = {
  content: {
    phoneNumberText: "(510) 391-5392",
    phoneNumberLink: "tel:+15103915392"
  }
}, Ee = {
  content: {
    phoneNumberText: "(323) 310-3103",
    phoneNumberLink: "tel:+13233103103"
  },
  state: "California",
  cities: [
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
}, Se = {
  content: {
    phoneNumberText: "(972) 860-1749",
    phoneNumberLink: "tel:+19728601749"
  },
  state: "Texas"
}, he = {
  DEFAULT: ue,
  "Los Angeles": {
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
      "Whittier"
    ]
  },
  "San Diego": {
    content: {
      phoneNumberText: "(323) 310-3103",
      phoneNumberLink: "tel:+13233103103"
    },
    state: "California",
    cities: [
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
      "Vista"
    ]
  },
  Riverside: Ee,
  Texas: Se
};
function fe() {
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
      const i = L("gclsrc"), o = !i || i.indexOf("aw") !== -1;
      t && o && (e = me(t), localStorage.setItem("gclid", JSON.stringify(e)));
      const n = e || JSON.parse(localStorage.getItem("gclid"));
      n && (/* @__PURE__ */ new Date()).getTime() < n.expiryDate && (this.gclid = n.value);
    }
  };
}
function L(t) {
  const e = RegExp("[?&]" + t + "=([^&]*)").exec(window.location.search);
  return e && decodeURIComponent(e[1].replace(/\+/g, " "));
}
function me(t) {
  const i = (/* @__PURE__ */ new Date()).getTime() + 7776e6;
  return {
    value: t,
    expiryDate: i
  };
}
window.Alpine = y;
const u = F(y), c = {}, I = k(window.FS, c);
pe();
y.start();
function pe() {
  const e = new URL(window.location.href).searchParams.get("get_started"), i = e && e === "complete" ? s.STATES.GET_STARTED.COMPLETE.MODAL : s.STATES.DEFAULT;
  c.flowState = u.createStore(
    "flowState",
    V(
      K(c, I),
      I,
      i
    )
  ), c.flowUIHelpers = u.createStore(
    "flowUIHelpers",
    Y(c)
  ), c.personalizationViewModel = u.createStore(
    "personalizationViewModel",
    v(he)
  ), c.experimentationViewModel = u.createStore(
    "experimentationViewModel",
    H()
  ), c.adTrackingViewModel = u.createStore(
    "adTrackingViewModel",
    fe()
  ), c.addressViewModel = u.createStore(
    "addressViewModel",
    re(I)
  ), c.thGuidesContactViewModel = u.createStore(
    "thGuidesContactViewModel",
    ae(c.flowState)
  ), c.thGuidesDownloadViewModel = u.createStore(
    "thGuidesDownloadViewModel",
    oe(c)
  ), c.thCalculatorViewModel = u.createStore(
    "thCalculatorViewModel",
    Te(c.personalizationViewModel)
  );
}
