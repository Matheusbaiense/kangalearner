// KangaLearner — Resources, About, and Contact page renderers
(function () {
  "use strict";

  function escapeHtml(s) {
    return String(s || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function sources() {
    return Array.isArray(window.KL_OFFICIAL_RESOURCES) ? window.KL_OFFICIAL_RESOURCES : [];
  }

  function isAvailable(src) {
    return src.status === "available";
  }

  function localePickString(root, dotKey) {
    if (!root || !dotKey) return "";
    var cur = root;
    var parts = dotKey.split(".");
    for (var i = 0; i < parts.length; i++) {
      cur = cur && cur[parts[i]];
    }
    return typeof cur === "string" ? cur : "";
  }

  function resolveLinkLabel(l) {
    if (l && l.labelKey && window.__KANGA_LOCALES__) {
      var lang =
        window.KL_I18N && typeof window.KL_I18N.getDisplayLang === "function"
          ? window.KL_I18N.getDisplayLang(window.KL_I18N.getLang())
          : "en";
      var pack = window.__KANGA_LOCALES__[lang] || window.__KANGA_LOCALES__.en;
      var t = localePickString(pack, l.labelKey);
      if (t) return t;
    }
    return typeof (l && l.label) === "string" ? l.label : "";
  }

  window.KL_PAGES = window.KL_PAGES || {};

  window.KL_PAGES.resources = function () {
    var cards = sources()
      .map(function (src) {
        var avail = isAvailable(src);
        var links = Array.isArray(src.links) ? src.links : [];
        var safeLinks = avail
          ? links.filter(function (l) {
              return l && typeof l.url === "string" && l.url.indexOf("http") === 0;
            })
          : [];

        var badge = avail
          ? '<span class="resource-badge resource-badge--active" data-i18n="resources.available"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></span>'
          : '<span class="resource-badge resource-badge--soon" data-i18n="resources.comingSoonBadge"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></span>';

        var bodyHtml = avail
          ? '<ul class="resource-links">' +
            safeLinks
              .map(function (l) {
                var lab = resolveLinkLabel(l);
                return (
                  '<li><a href="' +
                  escapeHtml(l.url) +
                  '" target="_blank" rel="noopener noreferrer" class="resource-link">' +
                  escapeHtml(lab) +
                  "</a></li>"
                );
              })
              .join("") +
            "</ul>"
          : '<div class="resource-coming">' +
            '<p class="resource-coming-text" data-i18n="resources.officialResourcesComingSoon"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></p>' +
            '<button type="button" class="btn btn-secondary btn-sm resource-coming-btn" disabled aria-disabled="true" data-i18n="resources.comingSoon"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></button>' +
            "</div>";

        return (
          '<div class="resource-card' +
          (avail ? "" : " resource-card--disabled") +
          '">' +
          '<div class="resource-card-head">' +
          '<span class="resource-state-code">' +
          escapeHtml(src.state) +
          "</span>" +
          '<span class="resource-state-name">' +
          escapeHtml(src.name) +
          "</span>" +
          badge +
          "</div>" +
          '<p class="resource-authority">' +
          escapeHtml(src.authority) +
          "</p>" +
          bodyHtml +
          "</div>"
        );
      })
      .join("");

    return (
      '<section class="page-section resources-page"><div class="container">' +
      '<div class="page-header"><p class="page-kicker" data-i18n="resources.kicker"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></p>' +
      '<h1 class="page-title" data-i18n="resources.title"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></h1>' +
      '<p class="page-sub" data-i18n="resources.sub"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></p></div>' +
      '<p class="resources-wa-notice" data-i18n="resources.waOnlyNotice"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></p>' +
      '<div class="resources-grid">' +
      cards +
      "</div>" +
      '<p class="resources-disclaimer">' +
      (window.KL_I18N?.t?.(window.KL_UI_COPY?.disclaimer?.studyAid, "") || "") +
      "</p>" +
      '<div class="page-footer-actions"><a href="#learn" class="btn btn-primary" data-i18n="resources.backToLearn"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></a>' +
      '<a href="#practice" class="btn btn-secondary" data-i18n="resources.practiseWA"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></a></div>' +
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
