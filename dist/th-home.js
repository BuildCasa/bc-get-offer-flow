import { m as d, c as h, a as P, b as C, d as S } from "./shared-mfbOJKPH.js";
import { v as f, t as g, c as M } from "./shared-nZgaNMS3.js";
function F(e, a) {
  const t = {
    SUBMIT_CONTACT: {
      target: "modalGuidesContactFormProcessing",
      effects: {
        onTransition: [
          () => {
            a == null || a.track("Guides Contact Submitted");
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
            a == null || a.track("Interruptor Popup Contact Submitted");
          }
        ]
      }
    }
  }, l = {
    onEntry: [c]
  };
  async function c() {
    try {
      let n = {
        firstName: e.thGuidesContactViewModel.firstName.trim(),
        lastName: e.thGuidesContactViewModel.lastName.trim(),
        email: e.thGuidesContactViewModel.email.trim()
      };
      if (!f(n.email))
        throw new Error("Please enter a valid email address, and try again.", {
          cause: "INVALID_EMAIL"
        });
      const p = {
        ...e.thGuidesContactViewModel.options,
        contact: n
      };
      await Promise.all([g(p)]), e.thGuidesContactViewModel.isSubmitted = !0, e.flowState.transition("SUCCESS");
    } catch (n) {
      console.log("Error submitting contact:", n), n && n.cause && n.cause === "INVALID_EMAIL" ? e.thGuidesContactViewModel.errorMessage = n.message : e.thGuidesContactViewModel.errorMessage = "There was an error processing your info. Please try again, or contact us for help.", e.flowState.transition("ERROR");
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
                  a.track("Interruptor Popup Shown");
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
                  a.track("Book Intro Call Clicked");
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
          ...t,
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
                  a.track("Guides Contact Submission Succeeded");
                }
              ]
            }
          },
          ERROR: {
            target: "modalGuidesContactFormError",
            effects: {
              onTransition: [
                () => {
                  a.track("Guides Contact Submission Failed", {
                    error_str: e.thGuidesContactViewModel.errorMessage
                  });
                }
              ]
            }
          },
          EXIT: {
            target: "default"
          }
        },
        effects: l
      },
      modalGuidesContactFormError: {
        transitions: {
          ...t,
          EXIT: {
            target: "default"
          }
        },
        effects: {
          onExit: [
            () => {
              e.thGuidesContactViewModel.errorMessage = "";
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
              e.thGuidesDownloadViewModel.downloadButtonElement.click();
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
                  a.track(
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
                  a.track("Interruptor Popup Submission Failed", {
                    error_str: e.thGuidesContactViewModel.errorMessage
                  });
                }
              ]
            }
          },
          EXIT: {
            target: "default"
          }
        },
        effects: l
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
              e.thGuidesContactViewModel.errorMessage = "";
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
function w(e, a) {
  return {
    modal: {
      get isOpen() {
        return e.flowState.value == "modalGetStartedForm" || e.flowState.value == "modalGetStartedComplete" || e.flowState.value == "modalBookIntroForm" || e.flowState.value == "modalGetDemoForm" || e.flowState.value == "modalGuidesContactForm" || e.flowState.value == "modalGuidesContactFormProcessing" || e.flowState.value == "modalGuidesContactFormError" || e.flowState.value == "modalGuidesContactFormSuccess" || e.flowState.value == "modalInterruptorPopupForm" || e.flowState.value == "modalInterruptorPopupFormProcessing" || e.flowState.value == "modalInterruptorPopupFormError" || e.flowState.value == "modalInterruptorPopupFormSuccess";
      },
      handleModalFlowStart(t = "GET_STARTED", r = null) {
        e.flowState.transition(t);
        const c = {
          GET_STARTED: "Get Started Clicked",
          GET_DEMO: "Get Demo Clicked"
        }[t];
        let u = {};
        r && (u = {
          cta_str: r
        }), c && a.track(c, u);
      },
      handleModalClose(t) {
        t.preventDefault(), t.stopPropagation(), e.flowState.transition("EXIT"), a.track("Modal Closed");
      }
    }
  };
}
const E = {
  content: {
    calcFlatFee: 8e3,
    calcDefaultPurchasePrice: 12e5,
    calcMaxPurchasePrice: 8e6,
    calcMinPurchasePrice: 6e5,
    calcInputStep: 1e5,
    pricingDefaultPurchasePrice: "$1.2M",
    pricingFlatFee: "$8K",
    pricingCashBack: "$28K",
    pricingAgentFee: "$36K+"
  }
}, y = {
  content: {
    calcFlatFee: 5e3,
    calcDefaultPurchasePrice: 5e5,
    calcMaxPurchasePrice: 2e6,
    calcMinPurchasePrice: 2e5,
    calcInputStep: 25e3,
    pricingDefaultPurchasePrice: "$500K",
    pricingFlatFee: "$5K",
    pricingCashBack: "$10K",
    pricingAgentFee: "$15K+"
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
}, G = {
  content: {
    calcFlatFee: 5e3,
    calcDefaultPurchasePrice: 7e5,
    calcMaxPurchasePrice: 5e6,
    calcMinPurchasePrice: 3e5,
    calcInputStep: 5e4,
    pricingDefaultPurchasePrice: "$700K",
    pricingFlatFee: "$5K",
    pricingCashBack: "$16K",
    pricingAgentFee: "$21K+"
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
}, T = {
  content: {
    calcFlatFee: 5e3,
    calcDefaultPurchasePrice: 5e5,
    calcMaxPurchasePrice: 15e5,
    calcMinPurchasePrice: 25e4,
    calcInputStep: 25e3,
    pricingDefaultPurchasePrice: "$500K",
    pricingFlatFee: "$5K",
    pricingCashBack: "$10K",
    pricingAgentFee: "$15K+"
  },
  state: "Texas"
}, D = {
  DEFAULT: E,
  "Bay Area": {
    content: {
      calcFlatFee: 8e3,
      calcDefaultPurchasePrice: 12e5,
      calcMaxPurchasePrice: 8e6,
      calcMinPurchasePrice: 6e5,
      calcInputStep: 1e5,
      pricingDefaultPurchasePrice: "$1.2M",
      pricingFlatFee: "$8K",
      pricingCashBack: "$28K",
      pricingAgentFee: "$36K+"
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
  Sacramento: y,
  "Los Angeles": {
    content: {
      calcFlatFee: 8e3,
      calcDefaultPurchasePrice: 1e6,
      calcMaxPurchasePrice: 5e6,
      calcMinPurchasePrice: 6e5,
      calcInputStep: 5e4,
      pricingDefaultPurchasePrice: "$1M",
      pricingFlatFee: "$8K",
      pricingCashBack: "$22K",
      pricingAgentFee: "$30K+"
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
      calcFlatFee: 8e3,
      calcDefaultPurchasePrice: 95e4,
      calcMaxPurchasePrice: 5e6,
      calcMinPurchasePrice: 6e5,
      calcInputStep: 5e4,
      pricingDefaultPurchasePrice: "$950K",
      pricingFlatFee: "$8K",
      pricingCashBack: "$20.5K",
      pricingAgentFee: "$28.5K+"
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
  Riverside: G,
  Texas: T
};
function I(e, a) {
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
    handleDownloadClick(t, r) {
      this.guide = r, this.downloadButtonElement = t.target;
      const l = e.thGuidesContactViewModel.isSubmitted;
      l || (t.preventDefault(), e.flowState.transition("GET_GUIDES")), a.track("Guide Download Clicked", {
        guide_str: this.guide,
        contact_submitted_str: l
      });
    }
  };
}
function B(e) {
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
    handleSubmit(a, t = {}) {
      a.preventDefault(), a.stopPropagation(), this.options = t, e.transition("SUBMIT_CONTACT");
    }
  };
}
function R(e) {
  return {
    purchasePrice: null,
    commissionRate: 0.03,
    init: function() {
      this.purchasePrice = e.getContent(
        "calcDefaultPurchasePrice"
      );
    },
    /**
     * Computed property that returns the value of the calcDefaultPurchasePrice key in the personalizationViewModel
     *
     * Add Alpine attribute to calc slider input element to update input value when this changes:
     * x-init=$watch('$store.thCalculatorViewModel.defaultPurchasePrice', (newVal, oldVal) => $store.thCalculatorViewModel.purchasePrice = newVal)
     *
     * @type {number}
     */
    get defaultPurchasePrice() {
      return e.getContent("calcDefaultPurchasePrice");
    },
    /**
     * Computed property that returns the value of the calcMaxPurchasePrice key in the personalizationViewModel
     *
     * Add Alpine attribute to calc slider input element to set max value of input element:
     * x-bind:max=$store.thCalculatorViewModel.maxPurchasePrice
     *
     * @type {number}
     */
    get maxPurchasePrice() {
      return e.getContent("calcMaxPurchasePrice");
    },
    /**
     * Computed property that returns the value of the calcMinPurchasePrice key in the personalizationViewModel
     *
     * Add Alpine attribute to calc slider input element to set min value of input element:
     * x-bind:min=$store.thCalculatorViewModel.minPurchasePrice
     *
     * @type {number}
     */
    get minPurchasePrice() {
      return e.getContent("calcMinPurchasePrice");
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
      return e.getContent("calcInputStep");
    },
    /**
     * Computed property that returns the value of the calcFlatFee key in the personalizationViewModel
     *
     * @type {number}
     */
    get flatFee() {
      return e.getContent("calcFlatFee");
    },
    get formattedPurchasePrice() {
      return m(this.purchasePrice);
    },
    get cashBack() {
      return Math.round(this.purchasePrice * this.commissionRate - this.flatFee);
    },
    get formattedCashBack() {
      return m(this.cashBack);
    }
  };
}
function m(e) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  }).format(e);
}
window.Alpine = d;
const i = C(d), o = {}, s = S(window.FS, o);
k();
V();
d.start();
function k() {
  const a = new URL(window.location.href).searchParams.get("get_started"), t = a && a === "complete" ? "modalGetStartedComplete" : "default";
  o.flowState = i.createStore(
    "flowState",
    h(
      F(o, s),
      s,
      t
    )
  ), o.flowUIHelpers = i.createStore(
    "flowUIHelpers",
    w(o, s)
  ), o.experimentationViewModel = i.createStore(
    "experimentationViewModel",
    M()
  ), o.personalizationViewModel = i.createStore(
    "personalizationViewModel",
    P(D)
  ), o.thGuidesContactViewModel = i.createStore(
    "thGuidesContactViewModel",
    B(o.flowState)
  ), o.thGuidesDownloadViewModel = i.createStore(
    "thGuidesDownloadViewModel",
    I(o, s)
  ), o.thCalculatorViewModel = i.createStore(
    "thCalculatorViewModel",
    R(o.personalizationViewModel)
  );
}
function V() {
  if (o.flowState.value === "default") {
    const a = "interruptor-popups-2024-11", t = ["none", "guides", "discount-plus-1500"], r = t[Math.floor(Math.random() * t.length)];
    o.experimentationViewModel.setActiveExperimentVariation(
      a,
      r
    ), s.track("Interruptor Popup Experiment Set"), r !== "none" && (setTimeout(() => {
      o.flowState.transition("SHOW_INTERRUPTOR_POPUP");
    }, 15e3), s.track("Interruptor Popup Scheduled"));
  }
}
