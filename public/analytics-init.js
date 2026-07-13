(function () {
  var id = (window.SITE && window.SITE.ga4MeasurementId) || 'G-C24JK5CTF0';

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };

  gtag('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'denied',
    functionality_storage: 'denied',
    personalization_storage: 'denied',
    security_storage: 'granted',
    wait_for_update: 500
  });

  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(id);
  document.head.appendChild(s);

  gtag('js', new Date());
  gtag('config', id, {
    anonymize_ip: true,
    allow_google_signals: false,
    allow_ad_personalization_signals: false
  });

  window.updateGoogleConsent = function (granted) {
    var state = granted ? 'granted' : 'denied';
    gtag('consent', 'update', {
      analytics_storage: state
    });
    if (granted) {
      gtag('config', id, {
        anonymize_ip: true,
        allow_google_signals: true
      });
    }
  };
})();
