import { m as c, c as C, a as h, b as w } from "./shared-lDivQ9uY.js";
import { v as E, t as S, d as P, c as T } from "./shared-Ke-5IP1j.js";
function I(t, e) {
  const a = {
    SUBMIT_CONTACT: {
      target: "modalGuidesContactFormProcessing",
      effects: {
        onTransition: [
          () => {
            e == null || e.track("Guides Contact Submitted");
          }
        ]
      }
    }
  }, r = {
    SUBMIT_CONTACT: {
      target: "modalInterruptorPopupFormProcessing",
      effects: {
        onTransition: [
          () => {
            e == null || e.track("Interruptor Popup Contact Submitted");
          }
        ]
      }
    }
  }, s = {
    onEntry: [d]
  };
  async function d() {
    try {
      let n = {
        firstName: t.thGuidesContactViewModel.firstName.trim(),
        lastName: t.thGuidesContactViewModel.lastName.trim(),
        email: t.thGuidesContactViewModel.email.trim()
      };
      if (!E(n.email))
        throw new Error("Please enter a valid email address, and try again.", {
          cause: "INVALID_EMAIL"
        });
      const f = {
        ...t.thGuidesContactViewModel.options,
        contact: n
      };
      await Promise.all([S(f)]), t.thGuidesContactViewModel.isSubmitted = !0, t.flowState.transition("SUCCESS");
    } catch (n) {
      console.log("Error submitting contact:", n), n && n.cause && n.cause === "INVALID_EMAIL" ? t.thGuidesContactViewModel.errorMessage = n.message : t.thGuidesContactViewModel.errorMessage = "There was an error processing your info. Please try again, or contact us for help.", t.flowState.transition("ERROR");
    }
  }
  return {
    defaultState: "default",
    states: {
      default: {
        transitions: {
          GET_STARTED: {
            target: "modalGetStartedForm"
          },
          GET_DEMO: {
            target: "modalGetDemoForm"
          },
          GET_GUIDES: {
            target: "modalGuidesContactForm"
          },
          SHOW_INTERRUPTOR_POPUP: {
            target: "modalInterruptorPopupForm",
            effects: {
              onTransition: [
                () => {
                  e.track("Interruptor Popup Shown");
                }
              ]
            }
          }
        }
      },
      getStartedComplete: {
        transitions: {
          GET_STARTED: {
            target: "modalGetStartedComplete"
          },
          GET_DEMO: {
            target: "modalGetDemoForm"
          },
          GET_GUIDES: {
            target: "modalGuidesContactForm"
          }
        }
      },
      modalGetStartedForm: {
        transitions: {
          EXIT: {
            target: "default"
          }
        }
      },
      modalGetStartedComplete: {
        transitions: {
          BOOK_INTRO: {
            target: "modalBookIntroForm",
            effects: {
              onTransition: [
                () => {
                  e.track("Book Intro Call Clicked");
                }
              ]
            }
          },
          EXIT: {
            target: "getStartedComplete"
          }
        }
      },
      modalBookIntroForm: {
        transitions: {
          EXIT: {
            target: "getStartedComplete"
          }
        }
      },
      modalGetDemoForm: {
        transitions: {
          EXIT: {
            target: "default"
          }
        }
      },
      modalGuidesContactForm: {
        transitions: {
          ...a,
          EXIT: {
            target: "default"
          }
        }
      },
      modalGuidesContactFormProcessing: {
        transitions: {
          SUCCESS: {
            target: "modalGuidesContactFormSuccess",
            effects: {
              onTransition: [
                () => {
                  e.track("Guides Contact Submission Succeeded");
                }
              ]
            }
          },
          ERROR: {
            target: "modalGuidesContactFormError",
            effects: {
              onTransition: [
                () => {
                  e.track("Guides Contact Submission Failed", {
                    error_str: t.thGuidesContactViewModel.errorMessage
                  });
                }
              ]
            }
          },
          EXIT: {
            target: "default"
          }
        },
        effects: s
      },
      modalGuidesContactFormError: {
        transitions: {
          ...a,
          EXIT: {
            target: "default"
          }
        },
        effects: {
          onExit: [
            () => {
              t.thGuidesContactViewModel.errorMessage = "";
            }
          ]
        }
      },
      modalGuidesContactFormSuccess: {
        transitions: {
          EXIT: {
            target: "default"
          }
        },
        effects: {
          onEntry: [
            () => {
              t.thGuidesDownloadViewModel.downloadButtonElement.click();
            }
          ]
        }
      },
      modalInterruptorPopupForm: {
        transitions: {
          ...r,
          EXIT: {
            target: "default"
          }
        }
      },
      modalInterruptorPopupFormProcessing: {
        transitions: {
          SUCCESS: {
            target: "modalInterruptorPopupFormSuccess",
            effects: {
              onTransition: [
                () => {
                  e.track(
                    "Interruptor Popup Submission Succeeded"
                  );
                }
              ]
            }
          },
          ERROR: {
            target: "modalInterruptorPopupFormError",
            effects: {
              onTransition: [
                () => {
                  e.track("Interruptor Popup Submission Failed", {
                    error_str: t.thGuidesContactViewModel.errorMessage
                  });
                }
              ]
            }
          },
          EXIT: {
            target: "default"
          }
        },
        effects: s
      },
      modalInterruptorPopupFormError: {
        transitions: {
          ...r,
          EXIT: {
            target: "default"
          }
        },
        effects: {
          onExit: [
            () => {
              t.thGuidesContactViewModel.errorMessage = "";
            }
          ]
        }
      },
      modalInterruptorPopupFormSuccess: {
        transitions: {
          EXIT: {
            target: "default"
          }
        }
      }
    }
  };
}
function M(t, e) {
  return {
    modal: {
      get isOpen() {
        return t.flowState.value == "modalGetStartedForm" || t.flowState.value == "modalGetStartedComplete" || t.flowState.value == "modalBookIntroForm" || t.flowState.value == "modalGetDemoForm" || t.flowState.value == "modalGuidesContactForm" || t.flowState.value == "modalGuidesContactFormProcessing" || t.flowState.value == "modalGuidesContactFormError" || t.flowState.value == "modalGuidesContactFormSuccess" || t.flowState.value == "modalInterruptorPopupForm" || t.flowState.value == "modalInterruptorPopupFormProcessing" || t.flowState.value == "modalInterruptorPopupFormError" || t.flowState.value == "modalInterruptorPopupFormSuccess";
      },
      handleModalFlowStart(a = "GET_STARTED", r = null) {
        t.flowState.transition(a);
        const d = {
          GET_STARTED: "Get Started Clicked",
          GET_DEMO: "Get Demo Clicked"
        }[a];
        let u = {};
        r && (u = {
          cta_str: r
        }), d && e.track(d, u);
      },
      handleModalClose(a) {
        a.preventDefault(), a.stopPropagation(), t.flowState.transition("EXIT"), e.track("Modal Closed");
      }
    }
  };
}
const G = {
  content: {
    phoneNumberText: "(415) 941-5285",
    phoneNumberLink: "tel:+14159415285"
  }
}, g = {
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
}, F = {
  content: {
    phoneNumberText: "(469) 564-1214",
    phoneNumberLink: "tel:+14695641214"
  },
  state: "Texas"
}, L = {
  DEFAULT: G,
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
  Riverside: g,
  Texas: F
};
function D(t, e) {
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
    handleDownloadClick(a, r) {
      this.guide = r, this.downloadButtonElement = a.target;
      const s = t.thGuidesContactViewModel.isSubmitted;
      s || (a.preventDefault(), t.flowState.transition("GET_GUIDES")), e.track("Guide Download Clicked", {
        guide_str: this.guide,
        contact_submitted_str: s
      });
    }
  };
}
function R(t) {
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
      e.preventDefault(), e.stopPropagation(), this.options = a, t.transition("SUBMIT_CONTACT");
    }
  };
}
const V = 0.025, m = 1e6, _ = 5e6, B = 6e5, N = 5e4;
function A(t = {}) {
  return {
    listPrice: null,
    commissionRate: V,
    init: function() {
      this.listPrice = t.getContent("calcDefaultListPrice") || m;
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
      return t.getContent("calcDefaultListPrice") || m;
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
      return t.getContent("calcMaxListPrice") || _;
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
      return t.getContent("calcMinListPrice") || B;
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
      return t.getContent("calcInputStep") || N;
    },
    get formattedListPrice() {
      return p(this.listPrice);
    },
    get turboHomeFee() {
      return this.listPrice <= 1e6 ? 5e3 : this.listPrice <= 2e6 ? 1e4 : 15e3;
    },
    get cashBack() {
      return Math.round(
        this.listPrice * this.commissionRate - this.turboHomeFee
      );
    },
    get formattedCashBack() {
      return p(this.cashBack);
    }
  };
}
function p(t) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  }).format(t);
}
window.Alpine = c;
const i = h(c), o = {}, l = w(window.FS, o);
y();
U();
c.start();
function y() {
  const e = new URL(window.location.href).searchParams.get("get_started"), a = e && e === "complete" ? "modalGetStartedComplete" : "default";
  o.flowState = i.createStore(
    "flowState",
    C(
      I(o, l),
      l,
      a
    )
  ), o.flowUIHelpers = i.createStore(
    "flowUIHelpers",
    M(o, l)
  ), o.experimentationViewModel = i.createStore(
    "experimentationViewModel",
    P()
  ), o.personalizationViewModel = i.createStore(
    "personalizationViewModel",
    T(L)
  ), o.thGuidesContactViewModel = i.createStore(
    "thGuidesContactViewModel",
    R(o.flowState)
  ), o.thGuidesDownloadViewModel = i.createStore(
    "thGuidesDownloadViewModel",
    D(o, l)
  ), o.thCalculatorViewModel = i.createStore(
    "thCalculatorViewModel",
    A(o.personalizationViewModel)
  );
}
function U() {
  if (o.flowState.value === "default") {
    const e = "interruptor-popups-2024-11", a = ["none", "guides"], r = a[Math.floor(Math.random() * a.length)];
    o.experimentationViewModel.setActiveExperimentVariation(
      e,
      r
    ), l.track("Interruptor Popup Experiment Set"), r !== "none" && (setTimeout(() => {
      o.flowState.transition("SHOW_INTERRUPTOR_POPUP");
    }, 15e3), l.track("Interruptor Popup Scheduled"));
  }
}
