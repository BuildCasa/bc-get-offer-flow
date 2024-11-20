import { m as n, c as d, a as u, b as S, d as m } from "./shared-S7gTYUPM.js";
function F() {
  return {
    defaultState: "default",
    states: {
      default: {
        transitions: {
          GET_STARTED: {
            target: "modalGetStartedForm"
          }
        }
      },
      modalGetStartedForm: {
        transitions: {
          EXIT: {
            target: "default"
          }
        }
      }
    }
  };
}
function f(a, r) {
  return {
    modal: {
      get isOpen() {
        return a.flowState.value == "modalGetStartedForm";
      },
      handleModalFlowStart(t = "GET_STARTED", i = null) {
        a.flowState.transition(t);
        const l = {
          GET_STARTED: "Get Started Clicked"
        }[t];
        let s = {};
        i && (s = {
          cta_str: i
        }), l && r.track(l, s);
      },
      handleModalClose(t) {
        t.preventDefault(), t.stopPropagation(), a.flowState.transition("EXIT"), r.track("Modal Closed");
      }
    }
  };
}
const h = {
  content: {
    potentialEarnings: "$750,000"
  }
}, w = {
  content: {
    potentialEarnings: "$250,000"
  },
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
}, E = {
  DEFAULT: h,
  Sacramento: w
};
window.Alpine = n;
const o = S(n), e = {}, c = m(window.FS, e);
T();
n.start();
function T() {
  e.flowState = o.createStore(
    "flowState",
    d(
      F(),
      c
    )
  ), e.flowUIHelpers = o.createStore(
    "flowUIHelpers",
    f(e, c)
  ), e.personalizationViewModel = o.createStore(
    "personalizationViewModel",
    u(E)
  );
}
