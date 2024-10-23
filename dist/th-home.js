import { v as f, t as w, m as l, c as G, a as C, b as h } from "./shared-2KfH2FLj.js";
function E(t, e) {
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
  }, i = {
    onEntry: [r]
  };
  async function r() {
    try {
      let o = {
        firstName: t.thGuidesContactViewModel.firstName.trim(),
        lastName: t.thGuidesContactViewModel.lastName.trim(),
        email: t.thGuidesContactViewModel.email.trim()
      };
      if (!f(o.email))
        throw new Error("Please enter a valid email address, and try again.", {
          cause: "INVALID_EMAIL"
        });
      const m = {
        ...t.thGuidesContactViewModel.options,
        contact: o
      };
      await Promise.all([w(m)]), t.thGuidesContactViewModel.isSubmitted = !0, t.flowState.transition("SUCCESS");
    } catch (o) {
      console.log("Error submitting contact:", o), o && o.cause && o.cause === "INVALID_EMAIL" ? t.thGuidesContactViewModel.errorMessage = o.message : t.thGuidesContactViewModel.errorMessage = "There was an error processing your info. Please try again, or contact us for help.", t.flowState.transition("ERROR");
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
        effects: i
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
      }
    }
  };
}
function S(t, e) {
  return {
    modal: {
      get isOpen() {
        return t.flowState.value == "modalGetStartedForm" || t.flowState.value == "modalGetStartedComplete" || t.flowState.value == "modalBookIntroForm" || t.flowState.value == "modalGetDemoForm" || t.flowState.value == "modalGuidesContactForm" || t.flowState.value == "modalGuidesContactFormProcessing" || t.flowState.value == "modalGuidesContactFormError" || t.flowState.value == "modalGuidesContactFormSuccess";
      },
      handleModalFlowStart(a = "GET_STARTED", i = null) {
        t.flowState.transition(a);
        const c = {
          GET_STARTED: "Get Started Clicked",
          GET_DEMO: "Get Demo Clicked"
        }[a];
        let o = {};
        i && (o = {
          cta_str: i
        }), c && e.track(c, o);
      },
      handleModalClose(a) {
        a.preventDefault(), a.stopPropagation(), t.flowState.transition("EXIT"), e.track("Modal Closed");
      }
    }
  };
}
function T(t, e) {
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
    handleDownloadClick(a, i) {
      this.guide = i, this.downloadButtonElement = a.target;
      const r = t.thGuidesContactViewModel.isSubmitted;
      r || (a.preventDefault(), t.flowState.transition("GET_GUIDES")), e.track("Guide Download Clicked", {
        guide_str: this.guide,
        contact_submitted_str: r
      });
    }
  };
}
function M(t) {
  return {
    // Instance properties
    firstName: "",
    lastName: "",
    email: "",
    options: {},
    submitButtonText: {
      normal: "Get Download",
      processing: "Getting Download..."
    },
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
      const e = document.getElementById(
        "guides-contact-form-submit-button"
      );
      e && (this.submitButtonText = {
        normal: e.value,
        processing: e.dataset.wait
      });
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
function F() {
  return {
    purchasePrice: null,
    init: function() {
      this.purchasePrice = 1e6;
    },
    get formattedPurchasePrice() {
      return u(this.purchasePrice);
    },
    get cashBack() {
      return Math.round(this.purchasePrice * 0.03 - 5e3);
    },
    get formattedCashBack() {
      return u(this.cashBack);
    }
  };
}
function u(t) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  }).format(t);
}
window.Alpine = l;
const n = C(l), s = {}, d = h(window.FS, s);
g();
l.start();
function g() {
  const e = new URL(window.location.href).searchParams.get("get_started"), a = e && e === "complete" ? "modalGetStartedComplete" : "default";
  s.flowState = n.createStore(
    "flowState",
    G(
      E(s, d),
      d,
      a
    )
  ), s.flowUIHelpers = n.createStore(
    "flowUIHelpers",
    S(s, d)
  ), s.thGuidesContactViewModel = n.createStore(
    "thGuidesContactViewModel",
    M(s.flowState)
  ), s.thGuidesDownloadViewModel = n.createStore(
    "thGuidesDownloadViewModel",
    T(s, d)
  ), s.thCalculatorViewModel = n.createStore(
    "thCalculatorViewModel",
    F()
  );
}
