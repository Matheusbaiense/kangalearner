// KangaLearner — Resources, About, and Contact page renderers
(function () {
  "use strict";

  var OFFICIAL_SOURCES = [
    {
      state: "WA",
      name: "Western Australia",
      authority: "Department of Transport WA",
      handbook: "Road Rules Handbook for Western Australia",
      handbookUrl: "https://www.transport.wa.gov.au/licensing/road-rules-handbook.asp",
      testInfo: "https://www.transport.wa.gov.au/licensing/computer-theory-test.asp",
      authority_site: "https://www.transport.wa.gov.au",
      available: true
    },
    {
      state: "NSW",
      name: "New South Wales",
      authority: "Transport for NSW",
      handbook: "Road Users' Handbook (NSW)",
      handbookUrl: "#",
      testInfo: "#",
      authority_site: "https://www.nsw.gov.au/transport-nsw",
      available: false
    },
    {
      state: "VIC",
      name: "Victoria",
      authority: "VicRoads",
      handbook: "Road to Solo Driving handbook",
      handbookUrl: "#",
      testInfo: "#",
      authority_site: "https://www.vicroads.vic.gov.au",
      available: false
    },
    {
      state: "QLD",
      name: "Queensland",
      authority: "Department of Transport and Main Roads (Queensland)",
      handbook: "Your Keys to Driving in Queensland",
      handbookUrl: "#",
      testInfo: "#",
      authority_site: "https://www.qld.gov.au/transport",
      available: false
    },
    {
      state: "SA",
      name: "South Australia",
      authority: "Government of South Australia — Department for Infrastructure and Transport",
      handbook: "The Driver's Handbook (SA)",
      handbookUrl: "#",
      testInfo: "#",
      authority_site: "https://www.sa.gov.au/topics/driving-and-transport",
      available: false
    },
    {
      state: "TAS",
      name: "Tasmania",
      authority: "Department of State Growth — Transport",
      handbook: "Road Rules Handbook (Tasmania)",
      handbookUrl: "#",
      testInfo: "#",
      authority_site: "https://www.transport.tas.gov.au",
      available: false
    },
    {
      state: "ACT",
      name: "Australian Capital Territory",
      authority: "Access Canberra — Road Transport Authority",
      handbook: "Road Rules Handbook (ACT)",
      handbookUrl: "#",
      testInfo: "#",
      authority_site: "https://www.accesscanberra.act.gov.au",
      available: false
    },
    {
      state: "NT",
      name: "Northern Territory",
      authority: "Northern Territory Government",
      handbook: "Road Users' Handbook (NT)",
      handbookUrl: "#",
      testInfo: "#",
      authority_site: "https://nt.gov.au/driving",
      available: false
    }
  ];

  window.KL_PAGES = window.KL_PAGES || {};

  window.KL_PAGES.resources = function () {
    var cards = OFFICIAL_SOURCES.map(function (src) {
      var badge = src.available
        ? '<span class="resource-badge resource-badge--active" data-i18n="resources.availableNow"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></span>'
        : '<span class="resource-badge resource-badge--soon" data-i18n="state.comingSoon"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></span>';
      return (
        '<div class="resource-card' +
        (src.available ? "" : " resource-card--disabled") +
        '">' +
        '<div class="resource-card-head">' +
        '<span class="resource-state-code">' +
        src.state +
        "</span>" +
        '<span class="resource-state-name">' +
        src.name +
        "</span>" +
        badge +
        "</div>" +
        '<p class="resource-authority">' +
        src.authority +
        "</p>" +
        '<ul class="resource-links">' +
        '<li><a href="' +
        src.handbookUrl +
        '" target="_blank" rel="noopener noreferrer" class="resource-link">📖 ' +
        src.handbook +
        "</a></li>" +
        '<li><a href="' +
        src.testInfo +
        '" target="_blank" rel="noopener noreferrer" class="resource-link" data-i18n="resources.learnerTestInfo">📋 <span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></a></li>' +
        '<li><a href="' +
        src.authority_site +
        '" target="_blank" rel="noopener noreferrer" class="resource-link" data-i18n="resources.officialSite">🔗 <span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></a></li>' +
        "</ul></div>"
      );
    }).join("");

    return (
      '<section class="page-section resources-page"><div class="container">' +
      '<div class="page-header"><p class="page-kicker" data-i18n="resources.kicker"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></p>' +
      '<h1 class="page-title" data-i18n="resources.title"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></h1>' +
      '<p class="page-sub" data-i18n="resources.sub"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></p></div>' +
      '<div class="resources-grid">' +
      cards +
      "</div>" +
      '<div class="page-footer-actions"><a href="#learn" class="btn btn-primary" data-i18n="resources.ctaStudy"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></a>' +
      '<a href="#practice" class="btn btn-secondary" data-i18n="resources.ctaPractice"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></a></div>' +
      "</div></section>"
    );
  };

  window.KL_PAGES.about = function () {
    return (
      '<section class="page-section about-page"><div class="container">' +
      '<div class="page-header"><h1 class="page-title" data-i18n="about.title"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></h1></div>' +
      '<div class="about-body"><p data-i18n="about.body"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></p></div>' +
      '<div class="page-footer-actions"><a href="#practice" class="btn btn-primary" data-i18n="about.ctaPractice"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></a>' +
      '<a href="#contact" class="btn btn-secondary" data-i18n="about.ctaContact"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></a></div>' +
      "</div></section>"
    );
  };

  window.KL_PAGES.contact = function () {
    return (
      '<section class="page-section contact-page"><div class="container">' +
      '<div class="page-header"><h1 class="page-title" data-i18n="contact.title"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></h1>' +
      '<p class="page-sub" data-i18n="contact.sub"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></p></div>' +
      '<form class="contact-form" id="contact-form" novalidate>' +
      '<div class="form-field"><label for="contact-name" data-i18n="contact.nameLabel"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></label><input type="text" id="contact-name" name="name" autocomplete="name" required></div>' +
      '<div class="form-field"><label for="contact-email" data-i18n="contact.emailLabel"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></label><input type="email" id="contact-email" name="email" autocomplete="email" required></div>' +
      '<div class="form-field"><label for="contact-msg" data-i18n="contact.msgLabel"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></label><textarea id="contact-msg" name="message" rows="5" required></textarea></div>' +
      '<button type="submit" class="btn btn-primary" data-i18n="contact.send"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></button>' +
      '<p class="contact-feedback" id="contact-feedback" aria-live="polite"></p>' +
      "</form></div></section>"
    );
  };
})();
