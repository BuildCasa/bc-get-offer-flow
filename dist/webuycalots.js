import { m as M, c as T, a as D, b as F, d as N } from "./shared-S7gTYUPM.js";
import { b as P, v as x, a as k, c as O } from "./shared-nZgaNMS3.js";
const _ = "https://app.regrid.com/api/v1/typeahead.json", L = "https://app.regrid.com/api/v1/parcel/", E = "eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJyZWdyaWQuY29tIiwiaWF0IjoxNzIyNDQyMTU0LCJnIjo1NDA4OSwidCI6MSwiY2FwIjoicGE6dHkiLCJ0aSI6ODJ9.7c30coXkbffieawauRttlK0mC_uBhrzWdNPLtRCzXA8";
async function S(e) {
  const t = _, s = E, n = new Request(`${t}/?token=${s}&query=${e}`, {
    method: "GET"
  }), a = await fetch(n);
  if (!a.ok)
    throw new Error("Network response was not OK");
  const o = await a.json();
  return U(o);
}
function U(e) {
  return e.filter((n) => n.ll_uuid && n.address && n.address.match(/^[0-9].*[^0-9]$/)).sort((n, a) => {
    const o = j(n, a);
    return o != 0 ? o : v(n, a);
  }).slice(0, 10);
}
function j(e, t) {
  return m(e) && !m(t) ? -1 : !m(e) && m(t) ? 1 : 0;
}
function m(e) {
  return e.context.endsWith("CA");
}
function v(e, t) {
  return e.score > t.score ? -1 : e.score < t.score ? 1 : 0;
}
async function B(e) {
  const t = L, s = E, n = new Request(
    `${t}${e}.json?token=${s}&return_custom=false`,
    {
      method: "GET"
    }
  ), a = await fetch(n);
  if (!a.ok)
    throw new Error("Network response was not OK");
  const o = await a.json();
  return z(o);
}
function z(e) {
  const t = e.results[0].properties.fields;
  return {
    apn: t.parcelnumb,
    jurisdiction: t.county,
    zip: t.szip
  };
}
function G(e) {
  const t = e.replace(/\D/g, ""), s = t.startsWith("1"), o = (s ? t.slice(1) : t).slice(0, 10).match(
    /^(\d{0,3})(\d{0,3})(\d{0,4})$/
  ), h = s ? "1" : "", l = o[1] ? (s ? " " : "") + ("(" + o[1]) : "", w = o[2] ? ") " + o[2] : "", p = o[3] ? "-" + o[3] : "";
  return h + l + w + p;
}
function W(e) {
  return /^\+?1?\s?(\()?\d{3}(\))?[-.\s]?\d{3}[-.\s]?\d{4}$|^\d{10}$/.test(e);
}
async function V(e, t = {}) {
  return new Promise(function(s, n) {
    const a = document.createElement("script");
    a.src = e, t.defer ? a.defer = !0 : t.async && (a.async = !0), a.addEventListener("load", function() {
      s();
    }), a.addEventListener("error", function(o) {
      n(o);
    }), document.body.appendChild(a);
  });
}
function $(e, t) {
  const s = {
    SUBMIT_ADDRESS: {
      target: "addressFormProcessing",
      effects: {
        onTransition: [
          () => {
            t == null || t.track("Address Submitted");
          }
        ]
      }
    }
  }, n = {
    SUBMIT_ADDRESS: {
      target: "modalAddressFormProcessing",
      effects: {
        onTransition: [
          () => {
            t == null || t.track("Address Submitted");
          }
        ]
      }
    }
  }, a = {
    SUCCESS: {
      target: "contactForm",
      effects: {
        onTransition: [
          () => {
            t.track("Address Submission Succeeded");
          }
        ]
      }
    },
    NON_BLOCKING_ERROR: {
      target: "contactForm",
      effects: {
        onTransition: [
          () => {
            t.track(
              "Address Submission Completed with Non-Blocking Error"
            );
          }
        ]
      }
    },
    SKIP_CONTACT: {
      target: "estimateResults",
      effects: {
        onTransition: [
          () => {
            t.track(
              "Address Submission Completed with Contact Form Skipped"
            );
          }
        ]
      }
    }
  }, o = {
    onEntry: [h]
  };
  async function h() {
    try {
      if (e.addressViewModel.hasParcelDetails && e.estimateViewModel.hasResults && e.contactViewModel.isSubmitted)
        e.flowState.transition("SKIP_CONTACT");
      else {
        if (e.addressViewModel.hasParcelDetails || (e.addressViewModel.parcelDetails = {
          ...await B(
            e.addressViewModel.selectedMatch.ll_uuid
          ),
          address: e.addressViewModel.selectedMatch.address,
          city: e.addressViewModel.selectedMatch.context.split(
            ", "
          )[0],
          state: e.addressViewModel.selectedMatch.context.split(", ")[1]
        }), !e.estimateViewModel.hasResults) {
          const i = {
            ...e.addressViewModel.options,
            parcel: {
              apn: e.addressViewModel.parcelDetails.apn,
              jurisdiction: e.addressViewModel.parcelDetails.jurisdiction
            },
            address: {
              address: e.addressViewModel.parcelDetails.address,
              city: e.addressViewModel.parcelDetails.city,
              state: e.addressViewModel.parcelDetails.state,
              zip: e.addressViewModel.parcelDetails.zip
            }
          }, d = await P(i);
          e.estimateViewModel.jurisdiction = d.jurisdiction, e.estimateViewModel.estimate = d.estimate;
        }
        e.flowState.transition("SUCCESS");
      }
    } catch {
      e.flowState.transition("NON_BLOCKING_ERROR");
    }
  }
  const l = {
    SUBMIT_CONTACT: {
      target: "contactFormProcessing",
      effects: {
        onTransition: [
          () => {
            t == null || t.track("Contact Submitted");
          }
        ]
      }
    }
  }, w = {
    onEntry: [p]
  };
  async function p() {
    if (e.estimateViewModel.hasActiveJurisdiction && e.estimateViewModel.hasEstimate && e.contactViewModel.options && e.contactViewModel.options.lead && e.contactViewModel.options.lead.type && e.contactViewModel.options.lead.type === "Windfall") {
      const i = "windfall-estimate-or-eligibility-2023-07", d = Math.random() < 0.5 ? "amount-excluded" : "amount-included";
      e.experimentationViewModel.setActiveExperimentVariation(
        i,
        d
      );
    }
    try {
      let i = {
        firstName: e.contactViewModel.firstName.trim(),
        lastName: e.contactViewModel.lastName.trim(),
        email: e.contactViewModel.email.trim(),
        phone: e.contactViewModel.phone.trim(),
        desiredTimeline: e.contactViewModel.desiredTimeline.trim()
      };
      if (!x(i.email))
        throw new Error("Please enter a valid email address, and try again.", {
          cause: "INVALID_EMAIL"
        });
      if (!W(i.phone))
        throw new Error(
          "Please enter a valid phone number, including area code, and try again.",
          { cause: "INVALID_PHONE" }
        );
      e.addressViewModel.hasParcelDetails ? i = {
        ...i,
        ...e.addressViewModel.parcelDetails
      } : e.addressViewModel.isSelected && (i = {
        ...i,
        address: [
          e.addressViewModel.selectedMatch.address,
          e.addressViewModel.selectedMatch.context
        ].join(", ")
      });
      const d = {
        ...e.contactViewModel.options,
        contact: i,
        activeExperimentVariations: e.experimentationViewModel.activeExperimentVariations
      };
      await Promise.all([
        y(e.contactViewModel),
        k(d)
      ]), e.contactViewModel.isSubmitted = !0, e.flowState.transition("SUCCESS");
    } catch (i) {
      console.log("Error submitting contact:", i), i && i.cause && (i.cause === "INVALID_EMAIL" || i.cause === "INVALID_PHONE") ? e.contactViewModel.errorMessage = i.message : e.contactViewModel.errorMessage = "There was an error processing your info. Please try again, or contact us for help.", e.flowState.transition("ERROR");
    }
  }
  async function y(i) {
    const d = [
      "Checking flood zones...",
      "Checking fire hazard zones...",
      "Checking zoning district...",
      "Checking lot shape & size..."
    ];
    for (const I of d)
      i.lotAnalysisStep = I, await new Promise((R) => {
        setTimeout(R, 1500);
      });
  }
  const C = {
    onEntry: [A]
  };
  async function A() {
    if (e.estimateViewModel.hasActiveJurisdiction && e.estimateViewModel.hasEstimate) {
      await V(
        "https://cdn.jsdelivr.net/npm/tsparticles-confetti@2.11.0/tsparticles.confetti.bundle.min.js",
        { async: !0 }
      );
      const i = e.contactViewModel.options && e.contactViewModel.options.lead && e.contactViewModel.options.lead.type && e.contactViewModel.options.lead.type === "webuyCAlots" ? ["ffffff", "#1c429c", "#f0bd1b"] : ["#ffffff", "#4cbd98", "#346af8"];
      setTimeout(() => {
        window.confetti("tsparticles", {
          angle: 270,
          count: 90,
          position: {
            x: 50,
            y: -5
          },
          spread: 180,
          startVelocity: 10,
          ticks: 200,
          colors: i,
          zIndex: 9999,
          disableForReducedMotion: !0
        });
      }, 500);
    }
    (!e.estimateViewModel.hasResults || e.estimateViewModel.hasActiveJurisdiction) && V("https://assets.calendly.com/assets/external/widget.js", {
      async: !0
    });
  }
  const c = {
    EXIT: {
      target: "default"
    }
  };
  return {
    defaultState: "default",
    states: {
      default: {
        transitions: {
          ...s,
          START_MODAL_FLOW: {
            target: "modalAddressForm"
          }
        }
      },
      addressFormProcessing: {
        transitions: {
          ...a,
          ERROR: {
            target: "addressFormError",
            effects: {
              onTransition: [
                () => {
                  t.track("Address Form Error (Blocking)");
                }
              ]
            }
          }
        },
        effects: o
      },
      addressFormError: {
        transitions: {
          ...s
        },
        effects: {
          onExit: [
            () => {
              e.addressViewModel.errorMessage = "";
            }
          ]
        }
      },
      modalAddressForm: {
        transitions: {
          ...n,
          ...c
        }
      },
      modalAddressFormProcessing: {
        transitions: {
          ...a,
          ERROR: {
            target: "modalAddressFormError",
            effects: {
              onTransition: [
                () => {
                  t.track("Address Form Error (Blocking)");
                }
              ]
            }
          },
          ...c
        },
        effects: o
      },
      modalAddressFormError: {
        transitions: {
          ...n,
          ...c
        },
        effects: {
          onExit: [
            () => {
              e.addressViewModel.errorMessage = "";
            }
          ]
        }
      },
      contactForm: {
        transitions: {
          ...l,
          ...c
        }
      },
      contactFormProcessing: {
        transitions: {
          SUCCESS: {
            target: "estimateResults",
            effects: {
              onTransition: [
                () => {
                  t.track("Contact Submission Succeeded");
                }
              ]
            }
          },
          ERROR: {
            target: "contactFormError",
            effects: {
              onTransition: [
                () => {
                  t.track("Contact Submission Failed", {
                    error_str: e.contactViewModel.errorMessage
                  });
                }
              ]
            }
          },
          ...c
        },
        effects: w
      },
      contactFormError: {
        transitions: {
          ...l,
          ...c
        },
        effects: {
          onExit: [
            () => {
              e.contactViewModel.errorMessage = "";
            }
          ]
        }
      },
      estimateResults: {
        transitions: {
          SCHEDULE: {
            target: "scheduleConsultation",
            effects: {
              onTransition: [
                () => {
                  t.track("Schedule Consultation Clicked");
                }
              ]
            }
          },
          REQUEST_COMMUNITY: {
            target: "requestedCommunity",
            effects: {
              onTransition: [
                () => {
                  t.track("Community Requested");
                }
              ]
            }
          },
          ...c
        },
        effects: C
      },
      scheduleConsultation: {
        transitions: {
          ...c
        }
      },
      requestedCommunity: {
        transitions: {
          ...c
        }
      }
    }
  };
}
function J(e, t) {
  return {
    modal: {
      get isOpen() {
        return e.flowState.value == "modalAddressForm" || e.flowState.value == "modalAddressFormProcessing" || e.flowState.value == "modalAddressFormError" || e.flowState.value == "contactForm" || e.flowState.value == "contactFormProcessing" || e.flowState.value == "contactFormError" || e.flowState.value == "estimateResults" || e.flowState.value == "scheduleConsultation" || e.flowState.value == "requestedCommunity";
      },
      handleModalFlowStart(s = null) {
        e.flowState.transition("START_MODAL_FLOW");
        let n = {};
        s && (n = {
          cta_str: s
        }), t.track("Modal Get Offer Flow Opened", n);
      },
      handleModalClose() {
        let s = !0;
        e.flowState.value == "contactForm" && e.contactViewModel.hasAnyContactDetails && (s = confirm(
          "Are you sure you want to stop before you've seen how much your extra lot space could be worth?"
        )), e.flowState.value == "contactFormProcessing" && (s = !1), s && (e.flowState.transition("EXIT"), t.track("Get Offer Modal Closed"));
      }
    }
  };
}
function q(e, t) {
  return {
    // Instance properties
    inputValue: "",
    matches: [],
    keyboardNavIndex: -1,
    selectedMatch: {},
    parcelDetails: {},
    options: {},
    submitButtonText: {
      normal: "Get Offer",
      processing: "Getting Offer..."
    },
    errorMessage: "",
    /**
     * Initializes the AddressViewModel instance properties.
     * Run automatically by Alpine, but can also be called manually to reset the view model state.
     * Need to call this manually on store creation if we stop using Alpine as our UI library.
     * @returns {void}
     */
    init() {
      this.inputValue = "", this.matches = [], this.keyboardNavIndex = -1, this.selectedMatch = {}, this.parcelDetails = {}, this.options = {}, this.errorMessage = "";
      const s = document.getElementById(
        "address-form-submit-button"
      );
      this.submitButtonText = {
        normal: s.value,
        processing: s.dataset.wait
      };
    },
    /**
     * Whether or not an address match has been selected with the typeahead.
     * @type {boolean}
     */
    get isSelected() {
      return Object.keys(this.selectedMatch).length != 0 && !!this.selectedMatch.ll_uuid;
    },
    /**
     * Whether or not the parcel details (jurisdiction and apn) have been set for the address.
     * @type {boolean}
     */
    get hasParcelDetails() {
      return Object.keys(this.parcelDetails).length != 0 && !!this.parcelDetails.jurisdiction && !!this.parcelDetails.apn;
    },
    /**
     * Handles input events from the address typeahead input field.
     * Fetches and updates address matches based on the current input value.
     * @returns {Promise.<void>} Promise that resolves when input handling is complete.
     */
    async handleInput() {
      this.isSelected && (this.selectedMatch = {}), this.hasParcelDetails && (this.parcelDetails = {}), e.estimateViewModel.hasResults && e.estimateViewModel.init(), e.contactViewModel.isSubmitted && (e.contactViewModel.isSubmitted = !1), e.experimentationViewModel.getActiveExperimentVariation(
        "windfall-estimate-or-eligibility-2023-07"
      ) && e.experimentationViewModel.clearActiveExperiment(
        "windfall-estimate-or-eligibility-2023-07"
      );
      try {
        this.matches = await S(this.inputValue);
      } catch {
        this.errorMessage = "There was an error finding your address. Please try again, or contact us for help.", e.flowState.transition("ERROR");
      }
    },
    /**
     * Handles keyboard events for the address typeahead input field.
     * Navigates up or down the list of matches if ArrowUp or ArrowDown are pressed.
     * Selects the address at the current keyboardNavIndex if Enter is pressed.
     * @param {KeyboardEvent} event - Keyboard event object.
     * @returns {void}
     */
    handleKeydown(s) {
      s.key != "Enter" && s.key != "ArrowUp" && s.key != "ArrowDown" || this.isSelected || this.matches.length === 0 || (s.preventDefault(), s.stopPropagation(), s.key === "Enter" && this.keyboardNavIndex != -1 ? this.handleMatchSelection(this.matches[this.keyboardNavIndex]) : s.key === "ArrowUp" ? this.keyboardNavIndex = this.keyboardNavIndex <= -1 ? this.matches.length - 1 : this.keyboardNavIndex - 1 : s.key === "ArrowDown" && (this.keyboardNavIndex = this.keyboardNavIndex >= this.matches.length - 1 ? -1 : this.keyboardNavIndex + 1));
    },
    /**
     * Handles the selection of an address match from the list of available matches.
     * Updates the selected address and typeahead input value.
     * Clears the matches list and keyboard navigation index.
     * @param {unknown} match
     */
    handleMatchSelection(s) {
      this.selectedMatch = s, this.inputValue = s.address + ", " + s.context, this.matches = [], this.keyboardNavIndex = -1, t.track("Address Selected");
    },
    /**
     * Handles the submission event for the address typeahead form.
     * @param {SubmitEvent} event - Form submission event object.
     * @param {object} options - Additional options for the submission.
     * @returns {void}
     */
    handleSubmit(s, n = {}) {
      s.preventDefault(), s.stopPropagation(), this.options = n, e.flowState.transition("SUBMIT_ADDRESS");
    }
  };
}
function g(e) {
  return {
    // Instance properties
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    desiredTimeline: "",
    options: {},
    submitButtonText: {
      normal: "Get Estimate",
      processing: "Getting Estimate..."
    },
    isSubmitted: !1,
    lotAnalysisStep: "Checking...",
    errorMessage: "",
    /**
     * Initializes the ContactViewModel instance properties.
     * Run automatically by Alpine, but can also be called manually to reset the view model state.
     * Need to call this manually on store creation if we stop using Alpine as our UI library.
     * @returns {void}
     */
    init() {
      this.firstName = "", this.lastName = "", this.email = "", this.phone = "", this.desiredTimeline = "", this.options = {}, this.isSubmitted = !1, this.lotAnalysisStep = "Checking...", this.errorMessage = "";
      const t = document.getElementById(
        "contact-form-submit-button"
      );
      this.submitButtonText = {
        normal: t.value,
        processing: t.dataset.wait
      };
    },
    /**
     * Whether or not any contact details have been added.
     * @type {boolean}
     */
    get hasAnyContactDetails() {
      return !!this.firstName.trim() || !!this.lastName.trim() || !!this.email.trim() || !!this.phone.trim();
    },
    formatPhoneInput(t) {
      return G(t);
    },
    /**
     * Handles the submission event for the contact form.
     * @param {SubmitEvent} event - Form submission event object.
     * @param {object} options - Additional options for the submission.
     * @returns {void}
     */
    handleSubmit(t, s = {}) {
      t.preventDefault(), t.stopPropagation(), this.options = s, e.transition("SUBMIT_CONTACT");
    }
  };
}
function H(e) {
  return {
    // Instance properties
    jurisdiction: {
      status: ""
    },
    estimate: {
      low: null,
      high: null
    },
    /**
     * Initializes the EstimateViewModel instance properties.
     * Run automatically by Alpine, but can also be called manually to reset the view model state.
     * Need to call this manually on store creation if we stop using Alpine as our UI library.
     * @returns {void}
     */
    init() {
      this.jurisdiction = {
        status: ""
      }, this.estimate = {
        low: null,
        high: null
      };
    },
    /**
     * Whether or not estimate results have already been retrieved.
     * @type {boolean}
     */
    get hasResults() {
      return !!this.jurisdiction.status;
    },
    /**
     * Whether or not the current address / parcel jurisdiction is actively supported.
     * @type {boolean}
     */
    get hasActiveJurisdiction() {
      return this.jurisdiction.status == "active";
    },
    /**
     * Whether or not there is currently a valid estimate with high and low values.
     * @type {boolean}
     */
    get hasEstimate() {
      return !!this.estimate.low && !!this.estimate.high;
    },
    /**
     * Low estimate value, converted to a USD currency formatted string.
     * @type {string}
     */
    get lowEstimateString() {
      return new Intl.NumberFormat(void 0, {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0
      }).format(Math.round(this.estimate.low));
    },
    /**
     * High estimate value, converted to a USD currency formatted string.
     * @type {string}
     */
    get highEstimateString() {
      return new Intl.NumberFormat(void 0, {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0
      }).format(Math.round(this.estimate.high));
    },
    /**
     * Handles click events for the Schedule Consultation button.
     * Transitions the flow state based on the desired behavior for this action.
     * @param {MouseEvent} event - Mouse event (click) object.
     * @returns {void}
     */
    handleScheduleConsultationClick(t) {
      t.preventDefault(), t.stopPropagation(), e.transition("SCHEDULE");
    },
    /**
     * Handles click events for the Request Community button.
     * Transitions the flow state based on the desired behavior for this action.
     * @param {MouseEvent} event - Mouse event (click) object.
     * @returns {void}
     */
    handleRequestCommunityClick(t) {
      t.preventDefault(), t.stopPropagation(), e.transition("REQUEST_COMMUNITY");
    }
  };
}
window.Alpine = M;
const u = F(M), r = {}, f = N(window.FS, r);
K();
M.start();
function K() {
  r.flowState = u.createStore(
    "flowState",
    T(
      $(r, f),
      f
    )
  ), r.flowUIHelpers = u.createStore(
    "flowUIHelpers",
    J(r, f)
  ), r.addressViewModel = u.createStore(
    "addressViewModel",
    q(r, f)
  ), r.contactViewModel = u.createStore(
    "contactViewModel",
    g(r.flowState)
  ), r.estimateViewModel = u.createStore(
    "estimateViewModel",
    H(r.flowState)
  ), r.personalizationViewModel = u.createStore(
    "personalizationViewModel",
    D()
  ), r.experimentationViewModel = u.createStore(
    "experimentationViewModel",
    O()
  );
}
