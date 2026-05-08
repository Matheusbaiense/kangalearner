// KangaLearner — Premium / Pricing / Billing pages (UI skeleton; no Stripe)
(function () {
  "use strict";

  window.KL_PAGES = window.KL_PAGES || {};

  function roleLabel() {
    try {
      var A = window.KL_AUTH_MOCK;
      return A && A.getDisplayName ? A.getDisplayName() : "Guest";
    } catch (e) {
      return "Guest";
    }
  }

  function premiumHome() {
    return (
      '<section class="page-section premium-shell">' +
      '<div class="container">' +
      '<div class="page-header">' +
      '<div class="page-kicker" data-i18n="premium.kicker"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></div>' +
      '<h1 class="page-title" data-i18n="premium.title"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></h1>' +
      '<p class="page-sub" data-i18n="premium.subtitle"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></p>' +
      "</div>" +
      '<div class="account-grid">' +
      '<div class="account-card">' +
      '<div class="settings-row"><span class="settings-row-label" data-i18n="premium.currentRole"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></span><span class="settings-row-value">' +
      roleLabel() +
      "</span></div>" +
      '<div class="settings-row"><span class="settings-row-label" data-i18n="premium.currentPlan"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></span><span class="settings-row-value" data-i18n="premium.plan.free"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></span></div>' +
      "</div>" +
      '<div class="account-card">' +
      '<h2 class="settings-section" data-i18n="premium.next.title"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></h2>' +
      '<p class="page-sub" data-i18n="premium.next.body"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></p>' +
      '<div class="page-footer-actions">' +
      '<a class="btn btn-primary" href="#pricing" data-i18n="premium.cta.viewPricing"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></a>' +
      '<a class="btn btn-secondary" href="#account" data-i18n="premium.cta.backAccount"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></a>' +
      "</div>" +
      "</div>" +
      "</div>" +
      "</div>" +
      "</section>"
    );
  }

  function pricingPage() {
    return (
      '<section class="page-section premium-shell">' +
      '<div class="container">' +
      '<div class="page-header">' +
      '<div class="page-kicker" data-i18n="pricing.kicker"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></div>' +
      '<h1 class="page-title" data-i18n="pricing.title"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></h1>' +
      '<p class="page-sub" data-i18n="pricing.subtitle"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></p>' +
      "</div>" +
      '<div class="premium-grid">' +
      '<div class="premium-card">' +
      '<h2 class="premium-card-title" data-i18n="pricing.plans.free.title"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></h2>' +
      '<p class="premium-card-body" data-i18n="pricing.plans.free.body"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></p>' +
      "</div>" +
      '<div class="premium-card premium-card-featured">' +
      '<h2 class="premium-card-title" data-i18n="pricing.plans.plus.title"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></h2>' +
      '<p class="premium-card-body" data-i18n="pricing.plans.plus.body"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></p>' +
      '<div class="page-footer-actions">' +
      '<a class="btn btn-primary" href="#upgrade-success" data-i18n="pricing.cta.upgrade"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></a>' +
      '<a class="btn btn-secondary" href="#upgrade-cancelled" data-i18n="pricing.cta.cancel"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></a>' +
      "</div>" +
      '<div class="auth-notice" role="status" aria-live="polite" data-i18n="pricing.notice.noStripe"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></div>' +
      "</div>" +
      "</div>" +
      "</div>" +
      "</section>"
    );
  }

  function billingPage() {
    return (
      '<section class="page-section premium-shell">' +
      '<div class="container">' +
      '<div class="page-header">' +
      '<div class="page-kicker" data-i18n="billing.kicker"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></div>' +
      '<h1 class="page-title" data-i18n="billing.title"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></h1>' +
      '<p class="page-sub" data-i18n="billing.subtitle"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></p>' +
      "</div>" +
      '<div class="account-grid">' +
      '<div class="account-card"><div class="settings-row"><span class="settings-row-label" data-i18n="billing.currentPlan"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></span><span class="settings-row-value" data-i18n="premium.plan.free"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></span></div></div>' +
      '<div class="account-card"><div class="settings-row"><span class="settings-row-label" data-i18n="billing.history"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></span><span class="settings-row-value" data-i18n="billing.notAvailable"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></span></div></div>' +
      "</div>" +
      "</div>" +
      "</section>"
    );
  }

  function upgradeSuccess() {
    return (
      '<section class="page-section premium-shell">' +
      '<div class="container">' +
      '<div class="auth-card">' +
      '<h1 class="auth-title" data-i18n="pricing.success.title"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></h1>' +
      '<p class="auth-subtitle" data-i18n="pricing.success.subtitle"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></p>' +
      '<div class="page-footer-actions"><a class="btn btn-primary" href="#premium" data-i18n="pricing.success.backPremium"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></a></div>' +
      "</div>" +
      "</div>" +
      "</section>"
    );
  }

  function upgradeCancelled() {
    return (
      '<section class="page-section premium-shell">' +
      '<div class="container">' +
      '<div class="auth-card">' +
      '<h1 class="auth-title" data-i18n="pricing.cancelled.title"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></h1>' +
      '<p class="auth-subtitle" data-i18n="pricing.cancelled.subtitle"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></p>' +
      '<div class="page-footer-actions"><a class="btn btn-secondary" href="#pricing" data-i18n="pricing.cancelled.backPricing"><span class="l-pt"></span><span class="l-en"></span><span class="l-es"></span></a></div>' +
      "</div>" +
      "</div>" +
      "</section>"
    );
  }

  window.KL_PAGES.premium = premiumHome;
  window.KL_PAGES.pricing = pricingPage;
  window.KL_PAGES.billing = billingPage;
  window.KL_PAGES["upgrade-success"] = upgradeSuccess;
  window.KL_PAGES["upgrade-cancelled"] = upgradeCancelled;
})();
