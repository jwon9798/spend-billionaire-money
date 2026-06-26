(function () {
  /* Mobile nav toggle */
  document.addEventListener('DOMContentLoaded', function () {
    var btn = document.querySelector('.menu-btn');
    var links = document.querySelector('.site-nav .links');
    if (btn && links) {
      btn.addEventListener('click', function () {
        links.classList.toggle('open');
      });
    }

    /* Highlight current page in nav */
    var path = location.pathname.replace(/\/$/, '') || '/index.html';
    if (path === '' || path === '/') path = '/index.html';
    document.querySelectorAll('.site-nav .links a').forEach(function (a) {
      var href = a.getAttribute('href');
      if (href === 'index.html' && (path === '/index.html' || path.endsWith('/'))) {
        a.classList.add('active');
      } else if (href && path.endsWith(href)) {
        a.classList.add('active');
      }
    });
  });

  /* Cookie consent for AdSense / analytics */
  var KEY = 'cookie_consent';
  function showBanner() {
    var el = document.getElementById('cookieBanner');
    if (el) el.classList.add('show');
  }
  function hideBanner() {
    var el = document.getElementById('cookieBanner');
    if (el) el.classList.remove('show');
  }
  window.acceptCookies = function () {
    try { localStorage.setItem(KEY, 'accepted'); } catch (e) {}
    hideBanner();
  };
  window.declineCookies = function () {
    try { localStorage.setItem(KEY, 'declined'); } catch (e) {}
    hideBanner();
  };
  document.addEventListener('DOMContentLoaded', function () {
    try {
      if (!localStorage.getItem(KEY)) showBanner();
    } catch (e) {
      showBanner();
    }
  });
})();
