(function () {
  var KEY = 'cookie_consent';
  var BANNER_HTML =
    '<p>본 사이트는 <strong>Google Analytics 4</strong>(방문 통계)와 <strong>Google AdSense</strong>(광고)를 위해 쿠키를 사용합니다. ' +
    '동의 시 분석·맞춤 광고 쿠키가 설정되며, 거부해도 게임 이용은 가능합니다. ' +
    '<a href="privacy.html">서비스 개인정보처리방침</a> · ' +
    '<a href="https://jwonlabs.com/privacy.html">JWON Labs 공통 정책</a></p>' +
    '<div class="btns">' +
    '<button class="accept" type="button" data-cookie="accept">모두 동의</button>' +
    '<button class="decline" type="button" data-cookie="decline">필수만(거부)</button>' +
    '</div>';

  function showBanner() {
    var el = document.getElementById('cookieBanner');
    if (el) el.classList.add('show');
  }

  function hideBanner() {
    var el = document.getElementById('cookieBanner');
    if (el) el.classList.remove('show');
  }

  function applyConsent(granted) {
    if (typeof window.updateGoogleConsent === 'function') {
      window.updateGoogleConsent(granted);
    }
    if (granted && typeof window.loadAdsense === 'function') {
      window.loadAdsense();
    }
  }

  window.acceptCookies = function () {
    try { localStorage.setItem(KEY, 'accepted'); } catch (e) {}
    applyConsent(true);
    hideBanner();
  };

  window.declineCookies = function () {
    try { localStorage.setItem(KEY, 'declined'); } catch (e) {}
    applyConsent(false);
    hideBanner();
  };

  function restoreConsent() {
    try {
      var v = localStorage.getItem(KEY);
      if (v === 'accepted') {
        applyConsent(true);
        return;
      }
      if (v === 'declined') {
        applyConsent(false);
        return;
      }
      showBanner();
    } catch (e) {
      showBanner();
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    var btn = document.querySelector('.menu-btn');
    var links = document.querySelector('.site-nav .links');
    if (btn && links) {
      btn.addEventListener('click', function () {
        links.classList.toggle('open');
      });
    }

    var path = location.pathname.replace(/\/$/, '') || '/index.html';
    if (path === '' || path === '/') path = '/index.html';
    document.querySelectorAll('.site-nav .links a').forEach(function (a) {
      var href = a.getAttribute('href');
      if (href === 'index.html' && (path === '/index.html' || path.endsWith('/'))) {
        a.classList.add('active');
      } else if (href && (path.endsWith(href) || path.endsWith(href.replace('.html', '')))) {
        a.classList.add('active');
      }
    });

    var banner = document.getElementById('cookieBanner');
    if (banner) {
      banner.innerHTML = BANNER_HTML;
      banner.addEventListener('click', function (e) {
        var t = e.target;
        if (!t || !t.getAttribute) return;
        var action = t.getAttribute('data-cookie');
        if (action === 'accept') window.acceptCookies();
        if (action === 'decline') window.declineCookies();
      });
    }

    restoreConsent();
  });
})();
