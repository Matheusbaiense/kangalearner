// KangaLearner — official resources by state/territory
(function () {
  "use strict";

  // Each entry: status "available" (verified links) or "coming-soon" (links must be []).
  // TODO: add official links after verification for non-WA states.
  window.KL_OFFICIAL_RESOURCES = [
    {
      state: "WA",
      name: "Western Australia",
      authority: "Department of Transport WA",
      status: "available",
      links: [
        { label: "Official website", url: "https://www.transport.wa.gov.au" },
        {
          label: "Road Rules Handbook for Western Australia",
          url: "https://www.transport.wa.gov.au/licensing/road-rules-handbook.asp"
        },
        {
          label: "Computer theory test info",
          url: "https://www.transport.wa.gov.au/licensing/computer-theory-test.asp"
        }
      ]
    },
    {
      state: "NSW",
      name: "New South Wales",
      authority: "Transport for NSW",
      status: "coming-soon",
      links: []
    },
    {
      state: "VIC",
      name: "Victoria",
      authority: "VicRoads",
      status: "coming-soon",
      links: []
    },
    {
      state: "QLD",
      name: "Queensland",
      authority: "Department of Transport and Main Roads (Queensland)",
      status: "coming-soon",
      links: []
    },
    {
      state: "SA",
      name: "South Australia",
      authority: "Government of South Australia — Department for Infrastructure and Transport",
      status: "coming-soon",
      links: []
    },
    {
      state: "TAS",
      name: "Tasmania",
      authority: "Department of State Growth — Transport",
      status: "coming-soon",
      links: []
    },
    {
      state: "ACT",
      name: "Australian Capital Territory",
      authority: "Access Canberra — Road Transport Authority",
      status: "coming-soon",
      links: []
    },
    {
      state: "NT",
      name: "Northern Territory",
      authority: "Northern Territory Government",
      status: "coming-soon",
      links: []
    }
  ];
})();
