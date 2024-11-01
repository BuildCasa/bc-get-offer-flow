import { d as S, v as g, e as k } from "./shared-2KfH2FLj.js";
const A = "https://app.regrid.com/api/v1/typeahead.json", E = "https://app.regrid.com/api/v1/parcel/", M = "eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJyZWdyaWQuY29tIiwiaWF0IjoxNzIyNDQyMTU0LCJnIjo1NDA4OSwidCI6MSwiY2FwIjoicGE6dHkiLCJ0aSI6ODJ9.7c30coXkbffieawauRttlK0mC_uBhrzWdNPLtRCzXA8";
async function R(e) {
  const a = A, t = M, n = new Request(`${a}/?token=${t}&query=${e}`, {
    method: "GET"
  }), s = await fetch(n);
  if (!s.ok)
    throw new Error("Network response was not OK");
  const o = await s.json();
  return P(o);
}
function P(e) {
  return e.filter((n) => n.ll_uuid && n.address && n.address.match(/^[0-9].*[^0-9]$/)).sort((n, s) => {
    const o = L(n, s);
    return o != 0 ? o : B(n, s);
  }).slice(0, 10);
}
function L(e, a) {
  return c(e) && !c(a) ? -1 : !c(e) && c(a) ? 1 : 0;
}
function c(e) {
  return e.context.endsWith("CA");
}
function B(e, a) {
  return e.score > a.score ? -1 : e.score < a.score ? 1 : 0;
}
async function D(e) {
  const a = E, t = M, n = new Request(
    `${a}${e}.json?token=${t}&return_custom=false`,
    {
      method: "GET"
    }
  ), s = await fetch(n);
  if (!s.ok)
    throw new Error("Network response was not OK");
  const o = await s.json();
  return F(o);
}
function F(e) {
  const a = e.results[0].properties.fields;
  return {
    apn: a.parcelnumb,
    jurisdiction: a.county,
    zip: a.szip
  };
}
function v(e) {
  const a = e.replace(/\D/g, ""), t = a.startsWith("1"), o = (t ? a.slice(1) : a).slice(0, 10).match(
    /^(\d{0,3})(\d{0,3})(\d{0,4})$/
  ), u = t ? "1" : "", d = o[1] ? (t ? " " : "") + ("(" + o[1]) : "", m = o[2] ? ") " + o[2] : "", h = o[3] ? "-" + o[3] : "";
  return u + d + m + h;
}
function T(e) {
  return /^\+?1?\s?(\()?\d{3}(\))?[-.\s]?\d{3}[-.\s]?\d{4}$|^\d{10}$/.test(e);
}
async function y(e, a = {}) {
  return new Promise(function(t, n) {
    const s = document.createElement("script");
    s.src = e, a.defer ? s.defer = !0 : a.async && (s.async = !0), s.addEventListener("load", function() {
      t();
    }), s.addEventListener("error", function(o) {
      n(o);
    }), document.body.appendChild(s);
  });
}
function j(e, a) {
  const t = {
    SUBMIT_ADDRESS: {
      target: "addressFormProcessing",
      effects: {
        onTransition: [
          () => {
            a == null || a.track("Address Submitted");
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
            a == null || a.track("Address Submitted");
          }
        ]
      }
    }
  }, s = {
    SUCCESS: {
      target: "contactForm",
      effects: {
        onTransition: [
          () => {
            a.track("Address Submission Succeeded");
          }
        ]
      }
    },
    NON_BLOCKING_ERROR: {
      target: "contactForm",
      effects: {
        onTransition: [
          () => {
            a.track(
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
            a.track(
              "Address Submission Completed with Contact Form Skipped"
            );
          }
        ]
      }
    }
  }, o = {
    onEntry: [u]
  };
  async function u() {
    try {
      if (e.addressViewModel.hasParcelDetails && e.estimateViewModel.hasResults && e.contactViewModel.isSubmitted)
        e.flowState.transition("SKIP_CONTACT");
      else {
        if (e.addressViewModel.hasParcelDetails || (e.addressViewModel.parcelDetails = {
          ...await D(
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
          }, l = await S(i);
          e.estimateViewModel.jurisdiction = l.jurisdiction, e.estimateViewModel.estimate = l.estimate;
        }
        e.flowState.transition("SUCCESS");
      }
    } catch {
      e.flowState.transition("NON_BLOCKING_ERROR");
    }
  }
  const d = {
    SUBMIT_CONTACT: {
      target: "contactFormProcessing",
      effects: {
        onTransition: [
          () => {
            a == null || a.track("Contact Submitted");
          }
        ]
      }
    }
  }, m = {
    onEntry: [h]
  };
  async function h() {
    if (e.estimateViewModel.hasActiveJurisdiction && e.estimateViewModel.hasEstimate && e.contactViewModel.options && e.contactViewModel.options.lead && e.contactViewModel.options.lead.type && e.contactViewModel.options.lead.type === "Windfall") {
      const i = "windfall-estimate-or-eligibility-2023-07", l = Math.random() < 0.5 ? "amount-excluded" : "amount-included";
      e.experimentationViewModel.setActiveExperimentVariation(
        i,
        l
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
      if (!g(i.email))
        throw new Error("Please enter a valid email address, and try again.", {
          cause: "INVALID_EMAIL"
        });
      if (!T(i.phone))
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
      const l = {
        ...e.contactViewModel.options,
        contact: i,
        activeExperimentVariations: e.experimentationViewModel.activeExperimentVariations
      };
      await Promise.all([
        f(e.contactViewModel),
        k(l)
      ]), e.contactViewModel.isSubmitted = !0, e.flowState.transition("SUCCESS");
    } catch (i) {
      console.log("Error submitting contact:", i), i && i.cause && (i.cause === "INVALID_EMAIL" || i.cause === "INVALID_PHONE") ? e.contactViewModel.errorMessage = i.message : e.contactViewModel.errorMessage = "There was an error processing your info. Please try again, or contact us for help.", e.flowState.transition("ERROR");
    }
  }
  async function f(i) {
    const l = [
      "Checking flood zones...",
      "Checking fire hazard zones...",
      "Checking zoning district...",
      "Checking lot shape & size..."
    ];
    for (const w of l)
      i.lotAnalysisStep = w, await new Promise((V) => {
        setTimeout(V, 1500);
      });
  }
  const C = {
    onEntry: [p]
  };
  async function p() {
    if (e.estimateViewModel.hasActiveJurisdiction && e.estimateViewModel.hasEstimate) {
      await y(
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
    (!e.estimateViewModel.hasResults || e.estimateViewModel.hasActiveJurisdiction) && y("https://assets.calendly.com/assets/external/widget.js", {
      async: !0
    });
  }
  const r = {
    EXIT: {
      target: "default"
    }
  };
  return {
    defaultState: "default",
    states: {
      default: {
        transitions: {
          ...t,
          START_MODAL_FLOW: {
            target: "modalAddressForm"
          }
        }
      },
      addressFormProcessing: {
        transitions: {
          ...s,
          ERROR: {
            target: "addressFormError",
            effects: {
              onTransition: [
                () => {
                  a.track("Address Form Error (Blocking)");
                }
              ]
            }
          }
        },
        effects: o
      },
      addressFormError: {
        transitions: {
          ...t
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
          ...r
        }
      },
      modalAddressFormProcessing: {
        transitions: {
          ...s,
          ERROR: {
            target: "modalAddressFormError",
            effects: {
              onTransition: [
                () => {
                  a.track("Address Form Error (Blocking)");
                }
              ]
            }
          },
          ...r
        },
        effects: o
      },
      modalAddressFormError: {
        transitions: {
          ...n,
          ...r
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
          ...d,
          ...r
        }
      },
      contactFormProcessing: {
        transitions: {
          SUCCESS: {
            target: "estimateResults",
            effects: {
              onTransition: [
                () => {
                  a.track("Contact Submission Succeeded");
                }
              ]
            }
          },
          ERROR: {
            target: "contactFormError",
            effects: {
              onTransition: [
                () => {
                  a.track("Contact Submission Failed", {
                    error_str: e.contactViewModel.errorMessage
                  });
                }
              ]
            }
          },
          ...r
        },
        effects: m
      },
      contactFormError: {
        transitions: {
          ...d,
          ...r
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
                  a.track("Schedule Consultation Clicked");
                }
              ]
            }
          },
          REQUEST_COMMUNITY: {
            target: "requestedCommunity",
            effects: {
              onTransition: [
                () => {
                  a.track("Community Requested");
                }
              ]
            }
          },
          ...r
        },
        effects: C
      },
      scheduleConsultation: {
        transitions: {
          ...r
        }
      },
      requestedCommunity: {
        transitions: {
          ...r
        }
      }
    }
  };
}
function _(e, a) {
  return {
    modal: {
      get isOpen() {
        return e.flowState.value == "modalAddressForm" || e.flowState.value == "modalAddressFormProcessing" || e.flowState.value == "modalAddressFormError" || e.flowState.value == "contactForm" || e.flowState.value == "contactFormProcessing" || e.flowState.value == "contactFormError" || e.flowState.value == "estimateResults" || e.flowState.value == "scheduleConsultation" || e.flowState.value == "requestedCommunity";
      },
      handleModalFlowStart(t = null) {
        e.flowState.transition("START_MODAL_FLOW");
        let n = {};
        t && (n = {
          cta_str: t
        }), a.track("Modal Get Offer Flow Opened", n);
      },
      handleModalClose() {
        let t = !0;
        e.flowState.value == "contactForm" && e.contactViewModel.hasAnyContactDetails && (t = confirm(
          "Are you sure you want to stop before you've seen how much your extra lot space could be worth?"
        )), e.flowState.value == "contactFormProcessing" && (t = !1), t && (e.flowState.transition("EXIT"), a.track("Get Offer Modal Closed"));
      }
    }
  };
}
function U(e, a) {
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
      const t = document.getElementById(
        "address-form-submit-button"
      );
      this.submitButtonText = {
        normal: t.value,
        processing: t.dataset.wait
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
        this.matches = await R(this.inputValue);
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
    handleKeydown(t) {
      t.key != "Enter" && t.key != "ArrowUp" && t.key != "ArrowDown" || this.isSelected || this.matches.length === 0 || (t.preventDefault(), t.stopPropagation(), t.key === "Enter" && this.keyboardNavIndex != -1 ? this.handleMatchSelection(this.matches[this.keyboardNavIndex]) : t.key === "ArrowUp" ? this.keyboardNavIndex = this.keyboardNavIndex <= -1 ? this.matches.length - 1 : this.keyboardNavIndex - 1 : t.key === "ArrowDown" && (this.keyboardNavIndex = this.keyboardNavIndex >= this.matches.length - 1 ? -1 : this.keyboardNavIndex + 1));
    },
    /**
     * Handles the selection of an address match from the list of available matches.
     * Updates the selected address and typeahead input value.
     * Clears the matches list and keyboard navigation index.
     * @param {unknown} match
     */
    handleMatchSelection(t) {
      this.selectedMatch = t, this.inputValue = t.address + ", " + t.context, this.matches = [], this.keyboardNavIndex = -1, a.track("Address Selected");
    },
    /**
     * Handles the submission event for the address typeahead form.
     * @param {SubmitEvent} event - Form submission event object.
     * @param {object} options - Additional options for the submission.
     * @returns {void}
     */
    handleSubmit(t, n = {}) {
      t.preventDefault(), t.stopPropagation(), this.options = n, e.flowState.transition("SUBMIT_ADDRESS");
    }
  };
}
function z(e) {
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
      const a = document.getElementById(
        "contact-form-submit-button"
      );
      this.submitButtonText = {
        normal: a.value,
        processing: a.dataset.wait
      };
    },
    /**
     * Whether or not any contact details have been added.
     * @type {boolean}
     */
    get hasAnyContactDetails() {
      return !!this.firstName.trim() || !!this.lastName.trim() || !!this.email.trim() || !!this.phone.trim();
    },
    formatPhoneInput(a) {
      return v(a);
    },
    /**
     * Handles the submission event for the contact form.
     * @param {SubmitEvent} event - Form submission event object.
     * @param {object} options - Additional options for the submission.
     * @returns {void}
     */
    handleSubmit(a, t = {}) {
      a.preventDefault(), a.stopPropagation(), this.options = t, e.transition("SUBMIT_CONTACT");
    }
  };
}
function J(e) {
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
    handleScheduleConsultationClick(a) {
      a.preventDefault(), a.stopPropagation(), e.transition("SCHEDULE");
    },
    /**
     * Handles click events for the Request Community button.
     * Transitions the flow state based on the desired behavior for this action.
     * @param {MouseEvent} event - Mouse event (click) object.
     * @returns {void}
     */
    handleRequestCommunityClick(a) {
      a.preventDefault(), a.stopPropagation(), e.transition("REQUEST_COMMUNITY");
    }
  };
}
const H = {
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
}, N = {
  cities: [
    "Auberry",
    "Big Creek",
    "Biola",
    "Bowles",
    "Calwa",
    "Cantua Creek",
    "Caruthers",
    "Centerville",
    "Clovis",
    "Coalinga",
    "Del Rey",
    "Easton",
    "Firebaugh",
    "Fort Washington",
    "Fowler",
    "Fresno",
    "Friant",
    "Huron",
    "Kerman",
    "Kingsburg",
    "Lanare",
    "Laton",
    "Malaga",
    "Mayfair",
    "Mendota",
    "Millerton",
    "Minkler",
    "Monmouth",
    "Old Fig Garden",
    "Orange Cove",
    "Parlier",
    "Raisin City",
    "Reedley",
    "Riverdale",
    "San Joaquin",
    "Sanger",
    "Selma",
    "Shaver Lake",
    "Squaw Valley",
    "Sunnyside",
    "Tarpey Village",
    "Three Rocks",
    "Tranquillity",
    "West Park",
    "Westside",
    "Alta Sierra",
    "Arvin",
    "Bakersfield",
    "Bakersfield Country Club",
    "Bear Valley Springs",
    "Benton Park",
    "Bodfish",
    "Boron",
    "Buttonwillow",
    "California City",
    "Casa Loma",
    "Cherokee Strip",
    "China Lake Acres",
    "Choctaw Valley",
    "Cottonwood",
    "Delano",
    "Derby Acres",
    "Di Giorgio",
    "Dustin Acres",
    "East Bakersfield",
    "East Niles",
    "Edison",
    "Edmundson Acres",
    "El Adobe",
    "Fairfax",
    "Ford City",
    "Frazier Park",
    "Fuller Acres",
    "Glennville",
    "Golden Hills",
    "Goodmanville",
    "Greenacres",
    "Greenfield",
    "Hillcrest",
    "Inyokern",
    "Johannesburg",
    "Keene",
    "Kernville",
    "La Cresta",
    "Lake Isabella",
    "Lake of the Woods",
    "Lakeside",
    "Lamont",
    "Lebec",
    "Lost Hills",
    "Maricopa",
    "McFarland",
    "McKittrick",
    "Mettler",
    "Mexican Colony",
    "Mojave",
    "Mountain Meadows",
    "Mountain Mesa",
    "North Edwards",
    "Oildale",
    "Old River",
    "Old Stine",
    "Olde Stockdale",
    "Onyx",
    "Pine Mountain Club",
    "Potomac Park",
    "Pumpkin Center",
    "Randsburg",
    "Rexland Acres",
    "Ridgecrest",
    "Ridgecrest Heights",
    "Rivergrove",
    "Rosamond",
    "Rosedale",
    "Shafter",
    "Smith Corner",
    "South Taft",
    "Squirrel Mountain Valley",
    "Stallion Springs",
    "Stebbins",
    "Taft",
    "Taft Heights",
    "Tarina",
    "Tehachapi",
    "Tupman",
    "Valley Acres",
    "Wasco",
    "Weedpatch",
    "Weldon",
    "Wofford Heights",
    "Woody",
    "Acton",
    "Agoura Hills",
    "Agua Dulce",
    "Alhambra",
    "Alondra Park",
    "Altadena",
    "Arcadia",
    "Artesia",
    "Avalon",
    "Avocado Heights",
    "Azusa",
    "Baldwin Park",
    "Bell",
    "Bell Gardens",
    "Bellflower",
    "Beverly Hills",
    "Bradbury",
    "Burbank",
    "Calabasas",
    "Carson",
    "Castaic",
    "Cerritos",
    "Charter Oak",
    "Citrus",
    "Claremont",
    "Commerce",
    "Compton",
    "Covina",
    "Cudahy",
    "Culver City",
    "Del Aire",
    "Desert View Highlands",
    "Diamond Bar",
    "Downey",
    "Duarte",
    "East Los Angeles",
    "East Pasadena",
    "East Rancho Dominguez",
    "East San Gabriel",
    "East Whittier",
    "El Monte",
    "El Segundo",
    "Elizabeth Lake",
    "Florence-Graham",
    "Gardena",
    "Glendale",
    "Glendora",
    "Green Valley",
    "Hacienda Heights",
    "Hasley Canyon",
    "Hawaiian Gardens",
    "Hawthorne",
    "Hermosa Beach",
    "Hidden Hills",
    "Huntington Park",
    "Industry",
    "Inglewood",
    "Irwindale",
    "La Cañada Flintridge",
    "La Crescenta-Montrose",
    "La Habra Heights",
    "La Mirada",
    "La Puente",
    "La Verne",
    "Ladera Heights",
    "Lake Hughes",
    "Lake Los Angeles",
    "Lakewood",
    "Lancaster",
    "Lawndale",
    "Lennox",
    "Leona Valley",
    "Littlerock",
    "Lomita",
    "Long Beach",
    "Los Angeles",
    "Lynwood",
    "Malibu",
    "Manhattan Beach",
    "Marina del Rey",
    "Mayflower Village",
    "Maywood",
    "Monrovia",
    "Montclair",
    "Montebello",
    "Monterey Park",
    "North El Monte",
    "Norwalk",
    "Palmdale",
    "Palos Verdes Estates",
    "Paramount",
    "Pasadena",
    "Pepperdine University",
    "Pico Rivera",
    "Pomona",
    "Quartz Hill",
    "Rancho Palos Verdes",
    "Redondo Beach",
    "Rolling Hills",
    "Rolling Hills Estates",
    "Rose Hills",
    "Rosemead",
    "Rowland Heights",
    "San Dimas",
    "San Fernando",
    "San Gabriel",
    "San Marino",
    "San Pasqual",
    "Santa Clarita",
    "Santa Fe Springs",
    "Santa Monica",
    "Sierra Madre",
    "Signal Hill",
    "South El Monte",
    "South Gate",
    "South Monrovia Island",
    "South Pasadena",
    "South San Gabriel",
    "South San Jose Hills",
    "South Whittier",
    "Stevenson Ranch",
    "Sun Village",
    "Temple City",
    "Topanga",
    "Torrance",
    "Val Verde",
    "Valinda",
    "Vernon",
    "View Park-Windsor Hills",
    "Vincent",
    "Walnut",
    "Walnut Park",
    "West Athens",
    "West Carson",
    "West Covina",
    "West Hollywood",
    "West Puente Valley",
    "West Rancho Dominguez",
    "West Whittier-Los Nietos",
    "Westlake Village",
    "Westmont",
    "Whittier",
    "Willowbrook",
    "Aliso Viejo",
    "Anaheim",
    "Brea",
    "Buena Park",
    "Chino Hills",
    "Costa Mesa",
    "Coto de Caza",
    "Cypress",
    "Dana Point",
    "Fountain Valley",
    "Fullerton",
    "Garden Grove",
    "Huntington Beach",
    "Irvine",
    "La Habra",
    "La Mirada",
    "La Palma",
    "Ladera Ranch",
    "Laguna Beach",
    "Laguna Hills",
    "Laguna Niguel",
    "Laguna Woods",
    "Lake Forest",
    "Las Flores",
    "Long Beach",
    "Los Alamitos",
    "Midway City",
    "Mission Viejo",
    "Modjeska",
    "Newport Beach",
    "North Tustin",
    "Orange",
    "Placentia",
    "Rancho Mission Viejo",
    "Rancho Santa Margarita",
    "Rossmoor",
    "San Clemente",
    "San Juan Capistrano",
    "Santa Ana",
    "Seal Beach",
    "Silverado",
    "Stanton",
    "Trabuco Canyon",
    "Tustin",
    "Villa Park",
    "Westminster",
    "Williams Canyon",
    "Yorba Linda",
    "Aguanga",
    "Anza",
    "Banning",
    "Beaumont",
    "Bermuda Dunes",
    "Blythe",
    "Cabazon",
    "Calimesa",
    "Canyon Lake",
    "Cathedral City",
    "Cherry Valley",
    "Coachella",
    "Colton",
    "Corona",
    "Coronita",
    "Desert Center",
    "Desert Edge",
    "Desert Hot Springs",
    "Desert Palms",
    "East Hemet",
    "Eastvale",
    "El Cerrito",
    "El Sobrante",
    "Fontana",
    "French Valley",
    "Garnet",
    "Good Hope",
    "Green Acres",
    "Hemet",
    "Highgrove",
    "Home Gardens",
    "Homeland",
    "Idyllwild-Pine Cove",
    "Indian Wells",
    "Indio",
    "Indio Hills",
    "Jurupa Valley",
    "La Quinta",
    "Lake Elsinore",
    "Lake Mathews",
    "Lake Riverside",
    "Lakeland Village",
    "Lakeview",
    "March ARB",
    "Mead Valley",
    "Meadowbrook",
    "Mecca",
    "Menifee",
    "Mesa Verde",
    "Moreno Valley",
    "Mountain Center",
    "Murrieta",
    "Norco",
    "North Shore",
    "Nuevo",
    "Oasis",
    "Ontario",
    "Palm Desert",
    "Palm Springs",
    "Perris",
    "Rancho Mirage",
    "Redlands",
    "Ripley",
    "Riverside",
    "Romoland",
    "Sage",
    "San Jacinto",
    "Sky Valley",
    "Temecula",
    "Temescal Valley",
    "Thermal",
    "Thousand Palms",
    "Valle Vista",
    "Vista Santa Rosa",
    "Warm Springs",
    "Whitewater",
    "Wildomar",
    "Winchester",
    "Woodcrest",
    "Yucaipa",
    "Adelanto",
    "Apple Valley",
    "Baker",
    "Barstow",
    "Big Bear City",
    "Big Bear Lake",
    "Big River",
    "Bloomington",
    "Bluewater",
    "Chino",
    "Chino Hills",
    "Colton",
    "Crestline",
    "Fontana",
    "Grand Terrace",
    "Hesperia",
    "Highland",
    "Homestead Valley",
    "Joshua Tree",
    "Lake Arrowhead",
    "Lenwood",
    "Loma Linda",
    "Lucerne Valley",
    "Lytle Creek",
    "Mentone",
    "Montclair",
    "Morongo Valley",
    "Mountain View Acres",
    "Muscoy",
    "Needles",
    "Oak Glen",
    "Oak Hills",
    "Ontario",
    "Phelan",
    "Piñon Hills",
    "Pomona",
    "Rancho Cucamonga",
    "Redlands",
    "Rialto",
    "Running Springs",
    "San Antonio Heights",
    "San Bernardino",
    "Searles Valley",
    "Silver Lakes",
    "Spring Valley Lake",
    "Twentynine Palms",
    "Upland",
    "Victorville",
    "Wrightwood",
    "Yermo",
    "Yucaipa",
    "Yucca Valley",
    "Alpine",
    "Bonita",
    "Bonsall",
    "Borrego Springs",
    "Bostonia",
    "Boulevard",
    "Campo",
    "Carlsbad",
    "Casa de Oro-Mount Helix",
    "Chula Vista",
    "Coronado",
    "Crest",
    "Del Dios",
    "Del Mar",
    "Descanso",
    "El Cajon",
    "Elfin Forest",
    "Encinitas",
    "Escondido",
    "Eucalyptus Hills",
    "Fairbanks Ranch",
    "Fallbrook",
    "Granite Hills",
    "Harbison Canyon",
    "Harmony Grove",
    "Hidden Meadows",
    "Imperial Beach",
    "Jacumba",
    "Jamul",
    "Julian",
    "La Mesa",
    "La Presa",
    "Lake San Marcos",
    "Lakeside",
    "Lemon Grove",
    "Mount Laguna",
    "National City",
    "Oceanside",
    "Pala",
    "Pine Valley",
    "Potrero",
    "Poway",
    "Rainbow",
    "Ramona",
    "Rancho San Diego",
    "Rancho Santa Fe",
    "San Diego",
    "San Diego Country Estates",
    "San Marcos",
    "Santee",
    "Solana Beach",
    "Spring Valley",
    "Valley Center",
    "Vista",
    "Winter Gardens",
    "Bell Canyon",
    "Camarillo",
    "Casa Conejo",
    "Channel Islands Beach",
    "El Rio",
    "Fillmore",
    "Lake Sherwood",
    "Meiners Oaks",
    "Mira Monte",
    "Moorpark",
    "Oak Park",
    "Oak View",
    "Ojai",
    "Oxnard",
    "Piru",
    "Port Hueneme",
    "San Buenaventura (Ventura)",
    "Santa Paula",
    "Santa Rosa Valley",
    "Santa Susana",
    "Saticoy",
    "Simi Valley",
    "Somis",
    "Thousand Oaks"
  ]
}, I = {
  Sacramento: H,
  "Bay Area": {
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
  SoCal: N
}, G = "https://get.geojs.io/v1/ip/geo.json";
async function O() {
  return await (await fetch(G)).json();
}
function K() {
  return {
    userGeo: {},
    marketsData: {},
    get market() {
      return x(this.userGeo.city, this.marketsData);
    },
    async init() {
      this.marketsData = I, this.userGeo = await O();
    }
  };
}
function x(e, a) {
  if (!e || typeof e != "string")
    return null;
  for (const t of Object.keys(a))
    if (a[t].cities.filter(
      (n) => n.toLowerCase().trim() === e.toLowerCase().trim()
    ).length > 0)
      return t;
  return null;
}
function q() {
  return {
    // Instance properties
    activeExperimentVariations: {},
    /**
     * Initializes the ExperimentationViewModel instance properties.
     * Run automatically by Alpine, but can also be called manually to reset the view model state.
     * Need to call this manually on store creation if we stop using Alpine as our UI library.
     * @returns {void}
     */
    init() {
      this.activeExperimentVariations = {};
    },
    /**
     * Sets the active variation for a given experiment.
     * @param {string} experiment - The name of the experiment.
     * @param {string} variation - The name of the variation.
     * @returns {void}
     */
    setActiveExperimentVariation(e, a) {
      this.activeExperimentVariations[e] = a;
    },
    /**
     * Gets the active variation for a given experiment.
     * @param {string} experiment - The name of the experiment.
     * @returns {string} The name of the active variation.
     */
    getActiveExperimentVariation(e) {
      return this.activeExperimentVariations[e];
    },
    /**
     * Clears the active variation for a given experiment.
     * @param {string} experiment - The name of the experiment.
     * @returns {void}
     */
    clearActiveExperiment(e) {
      this.activeExperimentVariations[e] && delete this.activeExperimentVariations[e];
    }
  };
}
export {
  U as a,
  z as b,
  _ as c,
  J as d,
  K as e,
  q as f,
  j as g
};
