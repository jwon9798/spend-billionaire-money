(function () {
  var cfg = window.ADSENSE;
  var loaded = false;

  window.loadAdsense = function () {
    if (loaded || !cfg || !cfg.client || cfg.client.indexOf('XXXX') >= 0) return;
    loaded = true;
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=' + encodeURIComponent(cfg.client);
    s.crossOrigin = 'anonymous';
    s.onload = injectAdSlots;
    document.head.appendChild(s);
    if (window.adsbygoogle) injectAdSlots();
  };

  function pushAd(el, slotKey) {
    var slot = slotKey && cfg.slots && cfg.slots[slotKey];
    el.innerHTML = '';
    el.className = 'ad-slot ad-live';
    var ins = document.createElement('ins');
    ins.className = 'adsbygoogle';
    ins.style.display = 'block';
    ins.setAttribute('data-ad-client', cfg.client);
    ins.setAttribute('data-ad-format', 'auto');
    ins.setAttribute('data-full-width-responsive', 'true');
    if (slot) ins.setAttribute('data-ad-slot', slot);
    el.appendChild(ins);
    try { (window.adsbygoogle = window.adsbygoogle || []).push({}); } catch (e) {}
  }

  function injectAdSlots() {
    document.querySelectorAll('.ad-slot[data-ad-pos]').forEach(function (el) {
      pushAd(el, el.getAttribute('data-ad-pos'));
    });
  }
})();
