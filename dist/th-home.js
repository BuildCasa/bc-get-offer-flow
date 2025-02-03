import { m as y, c as V, a as F, b as k } from "./shared-lDivQ9uY.js";
import { v as B, t as x, c as v } from "./shared-3ha5dRcd.js";
const i = {
  STATES: {
    DEFAULT: "default",
    GET_STARTED: {
      PROPERTY_QUESTION: "modalGetStartedPropertyQuestion",
      ADDRESS_SEARCH: "modalGetStartedAddressSearch",
      TYPEFORM: "getStartedForm",
      COMPLETE: {
        DEFAULT: "getStartedComplete",
        MODAL: "modalGetStartedComplete"
      }
    },
    BOOK_INTRO: {
      FORM: "modalBookIntroForm"
    },
    GET_GUIDES: {
      FORM: "modalGuidesContactForm",
      PROCESSING: "modalGuidesContactFormProcessing",
      ERROR: "modalGuidesContactFormError",
      SUCCESS: "modalGuidesContactFormSuccess"
    },
    INTERRUPTOR_POPUP: {
      FORM: "modalInterruptorPopupForm",
      PROCESSING: "modalInterruptorPopupFormProcessing",
      ERROR: "modalInterruptorPopupFormError",
      SUCCESS: "modalInterruptorPopupFormSuccess"
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
    GET_GUIDES: {
      START: "GET_GUIDES_START"
    },
    INTERRUPTOR_POPUP: {
      START: "INTERRUPTOR_POPUP_START"
    },
    SUBMIT_CONTACT: {
      SUBMIT: "CONTACT_SUBMIT",
      SUCCESS: "CONTACT_SUBMIT_SUCCESS",
      ERROR: "CONTACT_SUBMIT_ERROR"
    },
    EXIT: "EXIT"
  }
};
function H(t, e) {
  const s = {
    [i.EVENTS.EXIT]: {
      target: i.STATES.DEFAULT,
      effects: {
        onTransition: [
          (r) => {
            e == null || e.track("Modal Closed", r);
          }
        ]
      }
    }
  }, o = {
    [i.EVENTS.EXIT]: {
      target: i.STATES.GET_STARTED.COMPLETE.DEFAULT,
      effects: {
        onTransition: [
          (r) => {
            e == null || e.track("Modal Closed", r);
          }
        ]
      }
    }
  }, a = {
    [i.EVENTS.SUBMIT_CONTACT.SUBMIT]: {
      target: i.STATES.GET_GUIDES.PROCESSING,
      effects: {
        onTransition: [
          (r) => {
            e == null || e.track("Guides Contact Submitted", r);
          }
        ]
      }
    }
  }, n = {
    [i.EVENTS.SUBMIT_CONTACT.SUBMIT]: {
      target: i.STATES.INTERRUPTOR_POPUP.PROCESSING,
      effects: {
        onTransition: [
          (r) => {
            e == null || e.track(
              "Interruptor Popup Contact Submitted",
              r
            );
          }
        ]
      }
    }
  }, l = {
    onEntry: [async () => Y(t)]
  };
  return {
    constants: i,
    defaultState: i.STATES.DEFAULT,
    states: {
      [i.STATES.DEFAULT]: {
        transitions: {
          [i.EVENTS.GET_STARTED.START]: {
            target: i.STATES.GET_STARTED.PROPERTY_QUESTION,
            effects: {
              onTransition: [
                (r) => {
                  e.track("Get Started Clicked", r);
                }
              ]
            }
          },
          [i.EVENTS.GET_GUIDES.START]: {
            target: i.STATES.GET_GUIDES.FORM,
            effects: {
              onTransition: [
                (r) => {
                  e.track("Get Guide Clicked", r);
                }
              ]
            }
          },
          [i.EVENTS.INTERRUPTOR_POPUP.START]: {
            target: i.STATES.INTERRUPTOR_POPUP.FORM,
            effects: {
              onTransition: [
                (r) => {
                  e.track(
                    "Interruptor Popup Shown",
                    r
                  );
                }
              ]
            }
          }
        }
      },
      [i.STATES.GET_STARTED.PROPERTY_QUESTION]: {
        transitions: {
          ...s,
          [i.EVENTS.GET_STARTED.HAS_PROPERTY.YES]: {
            target: i.STATES.GET_STARTED.ADDRESS_SEARCH,
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
          [i.EVENTS.GET_STARTED.HAS_PROPERTY.NO]: {
            target: i.STATES.GET_STARTED.TYPEFORM,
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
      [i.STATES.GET_STARTED.ADDRESS_SEARCH]: {
        transitions: {
          ...s
        }
      },
      [i.STATES.GET_STARTED.TYPEFORM]: {
        transitions: {
          ...s
        }
      },
      [i.STATES.GET_STARTED.COMPLETE.DEFAULT]: {
        transitions: {
          [i.EVENTS.GET_STARTED.START]: {
            target: i.STATES.GET_STARTED.COMPLETE.MODAL,
            effects: {
              onTransition: [
                (r) => {
                  e.track("Get Started Clicked", r);
                }
              ]
            }
          },
          [i.EVENTS.GET_GUIDES.START]: {
            target: i.STATES.GET_GUIDES.FORM,
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
      [i.STATES.GET_STARTED.COMPLETE.MODAL]: {
        transitions: {
          ...o,
          [i.EVENTS.BOOK_INTRO.START]: {
            target: i.STATES.BOOK_INTRO.FORM,
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
      [i.STATES.BOOK_INTRO.FORM]: {
        transitions: {
          ...o
        }
      },
      [i.STATES.GET_GUIDES.FORM]: {
        transitions: {
          ...s,
          ...a
        }
      },
      [i.STATES.GET_GUIDES.PROCESSING]: {
        transitions: {
          ...s,
          [i.EVENTS.SUBMIT_CONTACT.SUCCESS]: {
            target: i.STATES.GET_GUIDES.SUCCESS,
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
          [i.EVENTS.SUBMIT_CONTACT.ERROR]: {
            target: i.STATES.GET_GUIDES.ERROR,
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
        effects: l
      },
      [i.STATES.GET_GUIDES.ERROR]: {
        transitions: {
          ...s,
          ...a
        },
        effects: {
          onExit: [
            () => {
              t.thGuidesContactViewModel.errorMessage = "";
            }
          ]
        }
      },
      [i.STATES.GET_GUIDES.SUCCESS]: {
        transitions: {
          ...s
        },
        effects: {
          onEntry: [
            () => {
              t.thGuidesDownloadViewModel.downloadButtonElement.click();
            }
          ]
        }
      },
      [i.STATES.INTERRUPTOR_POPUP.FORM]: {
        transitions: {
          ...s,
          ...n
        }
      },
      [i.STATES.INTERRUPTOR_POPUP.PROCESSING]: {
        transitions: {
          ...s,
          [i.EVENTS.SUBMIT_CONTACT.SUCCESS]: {
            target: i.STATES.INTERRUPTOR_POPUP.SUCCESS,
            effects: {
              onTransition: [
                (r) => {
                  e.track(
                    "Interruptor Popup Submission Succeeded",
                    r
                  );
                }
              ]
            }
          },
          [i.EVENTS.SUBMIT_CONTACT.ERROR]: {
            target: i.STATES.INTERRUPTOR_POPUP.ERROR,
            effects: {
              onTransition: [
                (r) => {
                  e.track("Interruptor Popup Submission Failed", {
                    ...r,
                    error_str: t.thGuidesContactViewModel.errorMessage
                  });
                }
              ]
            }
          }
        },
        effects: l
      },
      [i.STATES.INTERRUPTOR_POPUP.ERROR]: {
        transitions: {
          ...s,
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
      [i.STATES.INTERRUPTOR_POPUP.SUCCESS]: {
        transitions: {
          ...s
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
          i.STATES.GET_STARTED.PROPERTY_QUESTION,
          i.STATES.GET_STARTED.ADDRESS_SEARCH,
          i.STATES.GET_STARTED.TYPEFORM,
          i.STATES.GET_STARTED.COMPLETE.MODAL,
          i.STATES.BOOK_INTRO.FORM,
          i.STATES.GET_GUIDES.FORM,
          i.STATES.GET_GUIDES.PROCESSING,
          i.STATES.GET_GUIDES.ERROR,
          i.STATES.GET_GUIDES.SUCCESS,
          i.STATES.INTERRUPTOR_POPUP.FORM,
          i.STATES.INTERRUPTOR_POPUP.PROCESSING,
          i.STATES.INTERRUPTOR_POPUP.ERROR,
          i.STATES.INTERRUPTOR_POPUP.SUCCESS
        ].includes(t.flowState.value);
      }
    }
  };
}
async function Y(t) {
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
    const s = {
      ...t.thGuidesContactViewModel.options,
      contact: e
    };
    await Promise.all([x(s)]), t.thGuidesContactViewModel.isSubmitted = !0, t.flowState.transition(
      i.EVENTS.SUBMIT_CONTACT.SUCCESS
    );
  } catch (e) {
    console.log("Error submitting contact:", e), e && e.cause && e.cause === "INVALID_EMAIL" ? t.thGuidesContactViewModel.errorMessage = e.message : t.thGuidesContactViewModel.errorMessage = "There was an error processing your info. Please try again, or contact us for help.", t.flowState.transition(i.EVENTS.SUBMIT_CONTACT.ERROR);
  }
}
function j(t, e, s, o) {
  function a(n) {
    return n instanceof s ? n : new s(function(l) {
      l(n);
    });
  }
  return new (s || (s = Promise))(function(n, l) {
    function T(d) {
      try {
        S(o.next(d));
      } catch (u) {
        l(u);
      }
    }
    function r(d) {
      try {
        S(o.throw(d));
      } catch (u) {
        l(u);
      }
    }
    function S(d) {
      d.done ? n(d.value) : a(d.value).then(T, r);
    }
    S((o = o.apply(t, e || [])).next());
  });
}
function $(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var J = function t(e, s) {
  if (e === s)
    return !0;
  if (e && s && typeof e == "object" && typeof s == "object") {
    if (e.constructor !== s.constructor)
      return !1;
    var o, a, n;
    if (Array.isArray(e)) {
      if (o = e.length, o != s.length)
        return !1;
      for (a = o; a-- !== 0; )
        if (!t(e[a], s[a]))
          return !1;
      return !0;
    }
    if (e.constructor === RegExp)
      return e.source === s.source && e.flags === s.flags;
    if (e.valueOf !== Object.prototype.valueOf)
      return e.valueOf() === s.valueOf();
    if (e.toString !== Object.prototype.toString)
      return e.toString() === s.toString();
    if (n = Object.keys(e), o = n.length, o !== Object.keys(s).length)
      return !1;
    for (a = o; a-- !== 0; )
      if (!Object.prototype.hasOwnProperty.call(s, n[a]))
        return !1;
    for (a = o; a-- !== 0; ) {
      var l = n[a];
      if (!t(e[l], s[l]))
        return !1;
    }
    return !0;
  }
  return e !== e && s !== s;
}, W = /* @__PURE__ */ $(J);
const G = "__googleMapsScriptId";
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
  constructor({ apiKey: e, authReferrerPolicy: s, channel: o, client: a, id: n = G, language: l, libraries: T = [], mapIds: r, nonce: S, region: d, retries: u = 3, url: R = "https://maps.googleapis.com/maps/api/js", version: p }) {
    if (this.callbacks = [], this.done = !1, this.loading = !1, this.errors = [], this.apiKey = e, this.authReferrerPolicy = s, this.channel = o, this.client = a, this.id = n || G, this.language = l, this.libraries = T, this.mapIds = r, this.nonce = S, this.region = d, this.retries = u, this.url = R, this.version = p, h.instance) {
      if (!W(this.options, h.instance.options))
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
    return new Promise((e, s) => {
      this.loadCallback((o) => {
        o ? s(o.error) : e(window.google);
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
    var e, s;
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
      (n) => !o[n] && delete o[n]
    ), !((s = (e = window == null ? void 0 : window.google) === null || e === void 0 ? void 0 : e.maps) === null || s === void 0) && s.importLibrary || ((n) => {
      let l, T, r, S = "The Google Maps JavaScript API", d = "google", u = "importLibrary", R = "__ib__", p = document, m = window;
      m = m[d] || (m[d] = {});
      const g = m.maps || (m.maps = {}), M = /* @__PURE__ */ new Set(), P = new URLSearchParams(), L = () => (
        // @ts-ignore
        l || (l = new Promise((A, C) => j(this, void 0, void 0, function* () {
          var I;
          yield T = p.createElement("script"), T.id = this.id, P.set("libraries", [...M] + "");
          for (r in n)
            P.set(r.replace(/[A-Z]/g, (b) => "_" + b[0].toLowerCase()), n[r]);
          P.set("callback", d + ".maps." + R), T.src = this.url + "?" + P, g[R] = A, T.onerror = () => l = C(Error(S + " could not load.")), T.nonce = this.nonce || ((I = p.querySelector("script[nonce]")) === null || I === void 0 ? void 0 : I.nonce) || "", p.head.append(T);
        })))
      );
      g[u] ? console.warn(S + " only loads once. Ignoring:", n) : g[u] = (A, ...C) => M.add(A) && L().then(() => g[u](A, ...C));
    })(o);
    const a = this.libraries.map((n) => this.importLibrary(n));
    a.length || a.push(this.importLibrary("core")), Promise.all(a).then(() => this.callback(), (n) => {
      const l = new ErrorEvent("error", { error: n });
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
      const s = this.errors.length * Math.pow(2, this.errors.length);
      console.error(`Failed to load Google Maps script, retrying in ${s} ms.`), setTimeout(() => {
        this.deleteScript(), this.setScript();
      }, s);
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
const Q = "AIzaSyCOAucx7oi5vgR0w5CUfLj6G67YZINBSMc", q = new h({
  apiKey: Q,
  version: "weekly"
});
let _ = null, w = null;
async function X() {
  try {
    const t = await q.importLibrary("places");
    _ = t.AutocompleteSuggestion, w = t.AutocompleteSessionToken;
  } catch (t) {
    console.error("Error loading Google Maps Places library:", t);
  }
}
function Z() {
  if (w)
    return new w();
}
async function z(t, e) {
  if (_)
    try {
      const { suggestions: s } = await _.fetchAutocompleteSuggestions({
        input: t,
        language: "en-US",
        region: "us",
        sessionToken: e,
        includedRegionCodes: ["us"],
        includedPrimaryTypes: ["geocode"]
      });
      return s.map((o) => ({
        placePrediction: o.placePrediction,
        text: o.placePrediction.text.toString()
      }));
    } catch (s) {
      throw console.error(
        "Error fetching Google Places Autocomplete suggestions:",
        s
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
const se = "https://bc-turbohome-buyer-portal-git-staging-turbohome.vercel.app/onboard";
function ie(t) {
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
      this.inputValue = "", this.suggestions = [], this.keyboardNavIndex = -1, this.selectedPlace = {}, this.isSubmitted = !1, this.errorMessage = "", await X(), this.refreshSessionToken();
    },
    refreshSessionToken() {
      this.sessionToken = Z();
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
        this.suggestions = await z(
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
      let s = e.placePrediction.toPlace();
      await s.fetchFields({
        fields: ["displayName", "formattedAddress", "addressComponents"]
      }), this.selectedPlace = s, this.inputValue = s.formattedAddress, this.isSelectedValid || (this.errorMessage = "Please select a valid property address to continue, or contact us for help."), t.track("Address Selected"), this.refreshSessionToken(), this.suggestions = [], this.keyboardNavIndex = -1, this.isSelectedValid && this.redirectToReport();
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
      const s = new URL(se);
      s.searchParams.append("address", e), new URL(window.location.href).searchParams.forEach((a, n) => {
        s.searchParams.append(n, a);
      }), t.track("Redirected to Comps Report"), window.location.assign(s);
    }
  };
}
function re(t) {
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
    handleDownloadClick(e, s) {
      this.guide = s, this.downloadButtonElement = e.target;
      const o = t.thGuidesContactViewModel.isSubmitted;
      o || (e.preventDefault(), t.flowState.transition(
        i.EVENTS.GET_GUIDES.START,
        {
          guide_str: this.guide,
          contact_submitted_str: o
        }
      ));
    }
  };
}
function oe(t) {
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
    handleSubmit(e, s = {}) {
      e.preventDefault(), e.stopPropagation(), this.options = s, t.transition(i.EVENTS.SUBMIT_CONTACT.SUBMIT);
    }
  };
}
const ne = 0.03, U = 15e5, ae = 5e6, le = 25e4, ce = 5e4;
function de(t = {}) {
  return {
    listPrice: null,
    commissionRate: ne,
    init: function() {
      this.listPrice = t.getContent("calcDefaultListPrice") || U;
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
      return t.getContent("calcDefaultListPrice") || U;
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
      return t.getContent("calcMaxListPrice") || ae;
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
      return t.getContent("calcMinListPrice") || le;
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
      return t.getContent("calcInputStep") || ce;
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
const Te = {
  content: {
    phoneNumberText: "(415) 941-5285",
    phoneNumberLink: "tel:+14159415285"
  }
}, ue = {
  content: {
    phoneNumberText: "(213) 322-1360",
    phoneNumberLink: "tel:+12133221360"
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
    phoneNumberText: "(469) 564-1214",
    phoneNumberLink: "tel:+14695641214"
  },
  state: "Texas"
}, Ee = {
  DEFAULT: Te,
  "Los Angeles": {
    content: {
      phoneNumberText: "(213) 322-1360",
      phoneNumberLink: "tel:+12133221360"
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
      phoneNumberText: "(213) 322-1360",
      phoneNumberLink: "tel:+12133221360"
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
  Riverside: ue,
  Texas: Se
};
function he() {
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
      const t = D("gclid");
      let e = null;
      const s = D("gclsrc"), o = !s || s.indexOf("aw") !== -1;
      t && o && (e = fe(t), localStorage.setItem("gclid", JSON.stringify(e)));
      const a = e || JSON.parse(localStorage.getItem("gclid"));
      a && (/* @__PURE__ */ new Date()).getTime() < a.expiryDate && (this.gclid = a.value);
    }
  };
}
function D(t) {
  const e = RegExp("[?&]" + t + "=([^&]*)").exec(window.location.search);
  return e && decodeURIComponent(e[1].replace(/\+/g, " "));
}
function fe(t) {
  const s = (/* @__PURE__ */ new Date()).getTime() + 7776e6;
  return {
    value: t,
    expiryDate: s
  };
}
window.Alpine = y;
const E = F(y), c = {}, O = k(window.FS, c);
pe();
y.start();
function pe() {
  const e = new URL(window.location.href).searchParams.get("get_started"), s = e && e === "complete" ? i.STATES.GET_STARTED.COMPLETE.MODAL : i.STATES.DEFAULT;
  c.flowState = E.createStore(
    "flowState",
    V(
      H(c, O),
      O,
      s
    )
  ), c.flowUIHelpers = E.createStore(
    "flowUIHelpers",
    K(c)
  ), c.personalizationViewModel = E.createStore(
    "personalizationViewModel",
    v(Ee)
  ), c.adTrackingViewModel = E.createStore(
    "adTrackingViewModel",
    he()
  ), c.addressViewModel = E.createStore(
    "addressViewModel",
    ie(O)
  ), c.thGuidesContactViewModel = E.createStore(
    "thGuidesContactViewModel",
    oe(c.flowState)
  ), c.thGuidesDownloadViewModel = E.createStore(
    "thGuidesDownloadViewModel",
    re(c)
  ), c.thCalculatorViewModel = E.createStore(
    "thCalculatorViewModel",
    de(c.personalizationViewModel)
  );
}
