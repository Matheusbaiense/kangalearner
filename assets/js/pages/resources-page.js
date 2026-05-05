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
      available: true,
    },
  ];

  window.KL_PAGES = window.KL_PAGES || {};

  window.KL_PAGES.resources = function () {
    var cards = OFFICIAL_SOURCES.map(function (src) {
      var badge = src.available
        ? '<span class="resource-badge resource-badge--active">Available now</span>'
        : '<span class="resource-badge resource-badge--soon">Coming soon</span>';
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
        '" target="_blank" rel="noopener noreferrer" class="resource-link">📋 Learner test information</a></li>' +
        '<li><a href="' +
        src.authority_site +
        '" target="_blank" rel="noopener noreferrer" class="resource-link">🔗 Official authority website</a></li>' +
        "</ul></div>"
      );
    }).join("");

    return (
      '<section class="page-section resources-page"><div class="container">' +
      '<div class="page-header"><p class="page-kicker">Official sources</p>' +
      '<h1 class="page-title">Resources</h1>' +
      '<p class="page-sub">Direct links to official government handbooks and test information.</p></div>' +
      '<div class="resources-grid">' +
      cards +
      "</div>" +
      '<div class="page-footer-actions"><a href="#learn" class="btn btn-primary">Study guides</a>' +
      '<a href="#practice" class="btn btn-secondary">Practice questions</a></div>' +
      "</div></section>"
    );
  };

  window.KL_PAGES.about = function () {
    return (
      '<section class="page-section about-page"><div class="container">' +
      '<div class="page-header"><h1 class="page-title">About KangaLearner</h1></div>' +
      '<div class="about-body"><p>KangaLearner is a study platform built to help learner drivers pass the Australian road rules knowledge test.</p></div>' +
      '<div class="page-footer-actions"><a href="#practice" class="btn btn-primary">Start practising</a>' +
      '<a href="#contact" class="btn btn-secondary">Contact us</a></div>' +
      "</div></section>"
    );
  };

  window.KL_PAGES.contact = function () {
    return (
      '<section class="page-section contact-page"><div class="container">' +
      '<div class="page-header"><h1 class="page-title">Contact</h1>' +
      '<p class="page-sub">Found an error in the questions? Have a suggestion? We\'d love to hear from you.</p></div>' +
      '<form class="contact-form" id="contact-form" novalidate>' +
      '<div class="form-field"><label for="contact-name">Name</label><input type="text" id="contact-name" name="name" autocomplete="name" required></div>' +
      '<div class="form-field"><label for="contact-email">Email</label><input type="email" id="contact-email" name="email" autocomplete="email" required></div>' +
      '<div class="form-field"><label for="contact-msg">Message</label><textarea id="contact-msg" name="message" rows="5" required></textarea></div>' +
      '<button type="submit" class="btn btn-primary">Send message</button>' +
      '<p class="contact-feedback" id="contact-feedback" aria-live="polite"></p>' +
      "</form></div></section>"
    );
  };
})();

