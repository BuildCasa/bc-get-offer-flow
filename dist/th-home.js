import { m as d, c as m, a as p, b as S } from "./shared-dpXQ-LAr.js";
import { f as s, c as M, a as u, b as C, d as g, e as h, g as w } from "./shared-vuDP1x0y.js";
import { c as y, d as k } from "./shared-nA7yK6XY.js";
function L(t) {
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
    handleDownloadClick(a, n) {
      this.guide = n, this.downloadButtonElement = a.target;
      const i = t.thGuidesContactViewModel.isSubmitted;
      i || (a.preventDefault(), t.flowState.transition(
        s.EVENTS.GET_GUIDES.START,
        {
          guide_str: this.guide,
          contact_submitted_str: i
        }
      ));
    }
  };
}
function V(t) {
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
    handleSubmit(a, n = {}) {
      a.preventDefault(), a.stopPropagation(), this.options = n, t.transition(s.EVENTS.SUBMIT_CONTACT.SUBMIT);
    }
  };
}
const A = {
  content: {
    phoneNumberText: "(888) 516-6331",
    phoneNumberLink: "tel:+18885166331",
    pricingModel: "Split Commission",
    calcCommissionRate: 0.03,
    calcSplitCommissionRate: 0.01,
    calcDefaultListPrice: 15e5,
    calcMaxListPrice: 75e5,
    calcMinListPrice: 25e4,
    calcInputStep: 5e4
  }
}, P = {
  content: {
    phoneNumberText: "(510) 391-5392",
    phoneNumberLink: "tel:+15103915392",
    pricingModel: "Flat Fee"
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
}, f = {
  content: {
    pricingModel: "Split Commission"
  },
  state: "Alaska"
}, T = {
  content: {
    pricingModel: "Split Commission"
  },
  state: "Alabama"
}, b = {
  content: {
    pricingModel: "Split Commission"
  },
  state: "Arkansas"
}, B = {
  content: {
    pricingModel: "Split Commission"
  },
  state: "Arizona"
}, F = {
  content: {
    phoneNumberText: "(510) 391-5392",
    phoneNumberLink: "tel:+15103915392",
    pricingModel: "Flat Fee"
  },
  state: "California"
}, v = {
  content: {
    pricingModel: "Split Commission"
  },
  state: "Colorado"
}, E = {
  content: {
    pricingModel: "Split Commission"
  },
  state: "Connecticut"
}, H = {
  content: {
    pricingModel: "Split Commission"
  },
  state: "Delaware"
}, N = {
  content: {
    pricingModel: "Split Commission"
  },
  state: "Florida"
}, D = {
  content: {
    pricingModel: "Split Commission"
  },
  state: "Georgia"
}, R = {
  content: {
    pricingModel: "Split Commission"
  },
  state: "Hawaii"
}, G = {
  content: {
    pricingModel: "Split Commission"
  },
  state: "Idaho"
}, I = {
  content: {
    pricingModel: "Split Commission"
  },
  state: "Illinois"
}, W = {
  content: {
    pricingModel: "Split Commission"
  },
  state: "Indiana"
}, x = {
  content: {
    pricingModel: "Split Commission"
  },
  state: "Iowa"
}, O = {
  content: {
    pricingModel: "Split Commission"
  },
  state: "Kansas"
}, U = {
  content: {
    pricingModel: "Split Commission"
  },
  state: "Kentucky"
}, K = {
  content: {
    pricingModel: "Split Commission"
  },
  state: "Louisiana"
}, z = {
  content: {
    pricingModel: "Split Commission"
  },
  state: "Maine"
}, _ = {
  content: {
    pricingModel: "Split Commission"
  },
  state: "Maryland"
}, J = {
  content: {
    pricingModel: "Split Commission"
  },
  state: "Massachusetts"
}, Y = {
  content: {
    pricingModel: "Split Commission"
  },
  state: "Michigan"
}, j = {
  content: {
    pricingModel: "Split Commission"
  },
  state: "Minnesota"
}, $ = {
  content: {
    pricingModel: "Split Commission"
  },
  state: "Mississippi"
}, Q = {
  content: {
    pricingModel: "Split Commission"
  },
  state: "Missouri"
}, q = {
  content: {
    pricingModel: "Split Commission"
  },
  state: "Montana"
}, X = {
  content: {
    pricingModel: "Split Commission"
  },
  state: "Nebraska"
}, Z = {
  content: {
    pricingModel: "Split Commission"
  },
  state: "Nevada"
}, ee = {
  content: {
    pricingModel: "Split Commission"
  },
  state: "Ohio"
}, ae = {
  content: {
    pricingModel: "Split Commission"
  },
  state: "Oklahoma"
}, oe = {
  content: {
    pricingModel: "Split Commission"
  },
  state: "Oregon"
}, te = {
  content: {
    pricingModel: "Split Commission"
  },
  state: "Pennsylvania"
}, ne = {
  content: {
    pricingModel: "Split Commission"
  },
  state: "Tennessee"
}, ie = {
  content: {
    phoneNumberText: "(469) 564-1214",
    phoneNumberLink: "tel:+14695641214",
    pricingModel: "Flat Fee"
  },
  state: "Texas"
}, se = {
  content: {
    pricingModel: "Split Commission"
  },
  state: "Utah"
}, le = {
  content: {
    pricingModel: "Split Commission"
  },
  state: "Vermont"
}, re = {
  content: {
    pricingModel: "Split Commission"
  },
  state: "Virginia"
}, ce = {
  content: {
    pricingModel: "Split Commission"
  },
  state: "Washington"
}, de = {
  content: {
    pricingModel: "Split Commission"
  },
  state: "Wisconsin"
}, me = {
  content: {
    pricingModel: "Split Commission"
  },
  state: "Wyoming"
}, pe = {
  DEFAULT: A,
  "Bay Area": {
    content: {
      phoneNumberText: "(510) 391-5392",
      phoneNumberLink: "tel:+15103915392",
      pricingModel: "Flat Fee"
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
  Sacramento: P,
  "Southern California": {
    content: {
      phoneNumberText: "(323) 310-3103",
      phoneNumberLink: "tel:+13233103103",
      pricingModel: "Flat Fee"
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
  Alaska: f,
  Alabama: T,
  Arkansas: b,
  Arizona: B,
  California: F,
  Colorado: v,
  Connecticut: E,
  Delaware: H,
  Florida: N,
  Georgia: D,
  Hawaii: R,
  Idaho: G,
  Illinois: I,
  Indiana: W,
  Iowa: x,
  Kansas: O,
  Kentucky: U,
  Louisiana: K,
  Maine: z,
  Maryland: _,
  Massachusetts: J,
  Michigan: Y,
  Minnesota: j,
  Mississippi: $,
  Missouri: Q,
  Montana: q,
  Nebraska: X,
  Nevada: Z,
  "New Hampshire": {
    content: {
      pricingModel: "Split Commission"
    },
    state: "New Hampshire"
  },
  "New Jersey": {
    content: {
      pricingModel: "Split Commission"
    },
    state: "New Jersey"
  },
  "New Mexico": {
    content: {
      pricingModel: "Split Commission"
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
      pricingModel: "Split Commission"
    },
    state: "North Carolina"
  },
  "North Dakota": {
    content: {
      pricingModel: "Split Commission"
    },
    state: "North Dakota"
  },
  Ohio: ee,
  Oklahoma: ae,
  Oregon: oe,
  Pennsylvania: te,
  "Rhode Island": {
    content: {
      pricingModel: "Split Commission"
    },
    state: "Rhode Island"
  },
  "South Carolina": {
    content: {
      pricingModel: "Split Commission"
    },
    state: "South Carolina"
  },
  "South Dakota": {
    content: {
      pricingModel: "Split Commission"
    },
    state: "South Dakota"
  },
  Tennessee: ne,
  Texas: ie,
  Utah: se,
  Vermont: le,
  Virginia: re,
  Washington: ce,
  "West Virginia": {
    content: {
      pricingModel: "Split Commission"
    },
    state: "West Virginia"
  },
  Wisconsin: de,
  Wyoming: me
};
window.Alpine = d;
const o = p(d), e = {}, l = S(window.FS, e);
Se();
Me();
d.start();
function Se() {
  const t = new URL(window.location.href), a = t.searchParams.get("get_started"), n = a && a === "complete", i = n ? s.STATES.GET_STARTED.COMPLETE.MODAL : s.STATES.DEFAULT, r = t.searchParams.get("user_email"), c = t.searchParams.get("user_phone");
  n && (r || c) && (window.dataLayer = window.dataLayer || [], window.dataLayer.push({
    event: "ec_form_submit",
    user_data: {
      email: r || "",
      phone_number: c || ""
    }
  })), e.flowState = o.createStore(
    "flowState",
    m(
      w(e, l),
      l,
      i
    )
  ), e.flowUIHelpers = o.createStore(
    "flowUIHelpers",
    M(e)
  ), e.personalizationViewModel = o.createStore(
    "personalizationViewModel",
    y(pe)
  ), e.experimentationViewModel = o.createStore(
    "experimentationViewModel",
    k()
  ), e.adTrackingViewModel = o.createStore(
    "adTrackingViewModel",
    u()
  ), e.interestAreaViewModel = o.createStore(
    "interestAreaViewModel",
    C(e.flowState, l)
  ), e.thConvertedContactViewModel = o.createStore(
    "thConvertedContactViewModel",
    g({
      email: r || "",
      phone: c || ""
    })
  ), e.thGuidesContactViewModel = o.createStore(
    "thGuidesContactViewModel",
    V(e.flowState)
  ), e.thGuidesDownloadViewModel = o.createStore(
    "thGuidesDownloadViewModel",
    L(e)
  ), e.thCalculatorViewModel = o.createStore(
    "thCalculatorViewModel",
    h(e.personalizationViewModel)
  );
}
function Me() {
  if (e.flowState.value === s.STATES.DEFAULT) {
    const a = "interest-area-typeahead-2025-06", n = Math.random();
    let i = "existing-button-cta-fillout-form";
    n < 0.25 ? i = "interest-area-typeahead-fillout-form-a1" : n < 0.5 && (i = "interest-area-typeahead-fillout-form-a2-actions"), e.experimentationViewModel.setActiveExperimentVariation(
      a,
      i
    ), l.track(
      "2025-06 Interest Area Typeahead Flow Experiment Set"
    );
  }
}
