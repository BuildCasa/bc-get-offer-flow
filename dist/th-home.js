import { v as f, t as w, m as c, c as E, a as C, b as h, d as G } from "./shared-JXB_n1Zn.js";
function I(t, e) {
  const o = {
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
    onEntry: [u]
  };
  async function u() {
    try {
      let n = {
        firstName: t.thGuidesContactViewModel.firstName.trim(),
        lastName: t.thGuidesContactViewModel.lastName.trim(),
        email: t.thGuidesContactViewModel.email.trim()
      };
      if (!f(n.email))
        throw new Error("Please enter a valid email address, and try again.", {
          cause: "INVALID_EMAIL"
        });
      const p = {
        ...t.thGuidesContactViewModel.options,
        contact: n
      };
      await Promise.all([w(p)]), t.thGuidesContactViewModel.isSubmitted = !0, t.flowState.transition("SUCCESS");
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
          ...o,
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
          ...o,
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
function T(t, e) {
  return {
    modal: {
      get isOpen() {
        return t.flowState.value == "modalGetStartedForm" || t.flowState.value == "modalGetStartedComplete" || t.flowState.value == "modalBookIntroForm" || t.flowState.value == "modalGetDemoForm" || t.flowState.value == "modalGuidesContactForm" || t.flowState.value == "modalGuidesContactFormProcessing" || t.flowState.value == "modalGuidesContactFormError" || t.flowState.value == "modalGuidesContactFormSuccess" || t.flowState.value == "modalInterruptorPopupForm" || t.flowState.value == "modalInterruptorPopupFormProcessing" || t.flowState.value == "modalInterruptorPopupFormError" || t.flowState.value == "modalInterruptorPopupFormSuccess";
      },
      handleModalFlowStart(o = "GET_STARTED", r = null) {
        t.flowState.transition(o);
        const u = {
          GET_STARTED: "Get Started Clicked",
          GET_DEMO: "Get Demo Clicked"
        }[o];
        let l = {};
        r && (l = {
          cta_str: r
        }), u && e.track(u, l);
      },
      handleModalClose(o) {
        o.preventDefault(), o.stopPropagation(), t.flowState.transition("EXIT"), e.track("Modal Closed");
      }
    }
  };
}
function S(t, e) {
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
    handleDownloadClick(o, r) {
      this.guide = r, this.downloadButtonElement = o.target;
      const s = t.thGuidesContactViewModel.isSubmitted;
      s || (o.preventDefault(), t.flowState.transition("GET_GUIDES")), e.track("Guide Download Clicked", {
        guide_str: this.guide,
        contact_submitted_str: s
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
    handleSubmit(e, o = {}) {
      e.preventDefault(), e.stopPropagation(), this.options = o, t.transition("SUBMIT_CONTACT");
    }
  };
}
function P() {
  return {
    purchasePrice: null,
    init: function() {
      this.purchasePrice = 1e6;
    },
    get formattedPurchasePrice() {
      return m(this.purchasePrice);
    },
    get cashBack() {
      return Math.round(this.purchasePrice * 0.03 - 5e3);
    },
    get formattedCashBack() {
      return m(this.cashBack);
    }
  };
}
function m(t) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  }).format(t);
}
window.Alpine = c;
const i = h(c), a = {}, d = G(window.FS, a);
F();
g();
c.start();
function F() {
  const e = new URL(window.location.href).searchParams.get("get_started"), o = e && e === "complete" ? "modalGetStartedComplete" : "default";
  a.flowState = i.createStore(
    "flowState",
    E(
      I(a, d),
      d,
      o
    )
  ), a.flowUIHelpers = i.createStore(
    "flowUIHelpers",
    T(a, d)
  ), a.experimentationViewModel = i.createStore(
    "experimentationViewModel",
    C()
  ), a.thGuidesContactViewModel = i.createStore(
    "thGuidesContactViewModel",
    M(a.flowState)
  ), a.thGuidesDownloadViewModel = i.createStore(
    "thGuidesDownloadViewModel",
    S(a, d)
  ), a.thCalculatorViewModel = i.createStore(
    "thCalculatorViewModel",
    P()
  );
}
function g() {
  if (a.flowState.value === "default") {
    const e = "interruptor-popups-2024-11", o = ["none", "guides", "discount-plus-1500"], r = o[Math.floor(Math.random() * o.length)];
    a.experimentationViewModel.setActiveExperimentVariation(
      e,
      r
    ), d.track("Interruptor Popup Experiment Set"), r !== "none" && (setTimeout(() => {
      a.flowState.transition("SHOW_INTERRUPTOR_POPUP");
    }, 15e3), d.track("Interruptor Popup Scheduled"));
  }
}
