// KangaLearner — which AU states have live question banks on the static site
(function () {
  "use strict";

  var AVAILABLE = ["WA"];

  function norm(s) {
    return String(s || "")
      .trim()
      .toUpperCase();
  }

  window.KL_REGION = {
    AVAILABLE_STATES: AVAILABLE.slice(),
    isStateAvailable: function (state) {
      return AVAILABLE.includes(norm(state));
    },
    getPrimaryState: function () {
      return "WA";
    }
  };
})();
