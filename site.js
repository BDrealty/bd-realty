/* B&D Realty — shared behaviour, loaded on every page.
   1. Lazy-loads background photos marked data-bg (cards on the Top 10 pages).
   2. Deep links: #tulum / #playa / #cancun pre-select a city filter; #<villa-id> opens that villa.
   3. bdLead(): saves a lead to the form service before WhatsApp opens. */

/* Paste your Formspree form URL here once (e.g. 'https://formspree.io/f/abcdwxyz').
   Every form on the site (guide, villas, beachfront, developments, investors, sell) then saves leads. */
window.BD_FORM_ENDPOINT = '';

window.bdLead = function (data) {
  try {
    if (!window.BD_FORM_ENDPOINT) return;
    data = data || {};
    data.page = location.href;
    data.submittedAt = new Date().toLocaleString('en-GB', { timeZone: 'America/Cancun' }) + ' (Cancun)';
    var body = JSON.stringify(data);
    if (navigator.sendBeacon) {
      navigator.sendBeacon(window.BD_FORM_ENDPOINT, new Blob([body], { type: 'application/json' }));
    } else {
      fetch(window.BD_FORM_ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }, body: body, keepalive: true });
    }
  } catch (e) {}
};

(function () {
  /* 1. lazy backgrounds */
  var els = Array.prototype.slice.call(document.querySelectorAll('[data-bg]'));
  function show(el) { el.style.backgroundImage = "url('" + el.getAttribute('data-bg') + "')"; el.removeAttribute('data-bg'); }
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { show(e.target); io.unobserve(e.target); } });
    }, { rootMargin: '600px 0px' });
    els.forEach(function (el) { io.observe(el); });
  } else { els.forEach(show); }

  /* 1b. ES / FR buttons: pages with a real translated version go to /es/ or /fr/ */
  var LANG_PAGES = {
    es: ['index.html', 'sell.html', 'the-process.html', 'buyers-guide.html', 'about.html'],
    fr: ['index.html', 'about.html', 'sell.html', 'the-process.html', 'buyers-guide.html', 'investors.html',
         'top10.html', 'top10-villas.html', 'top10-beachfront.html', 'top10-developments.html',
         'rentals-long-term.html', 'rentals-vacation.html']
  };
  if (document.documentElement.lang === 'en') {
    Object.keys(LANG_PAGES).forEach(function (lang) {
      Array.prototype.slice.call(document.querySelectorAll('.lang-btn[data-lang="' + lang + '"]')).forEach(function (b) {
        b.addEventListener('click', function (e) {
          var f = location.pathname.split('/').pop() || 'index.html';
          if (LANG_PAGES[lang].indexOf(f) !== -1) { e.stopImmediatePropagation(); e.preventDefault(); location.href = lang + '/' + (f === 'index.html' ? '' : f) + location.hash; }
        }, true);
      });
    });
  }

  /* 2. deep links */
  function route() {
    var h = (location.hash || '').slice(1).toLowerCase();
    if (!h) return;
    if (['tulum', 'playa', 'cancun'].indexOf(h) !== -1) {
      var btn = Array.prototype.slice.call(document.querySelectorAll('button[onclick]')).filter(function (b) {
        var oc = b.getAttribute('onclick') || '';
        return /filterVillas|selectCity|filterDevs/.test(oc) && oc.indexOf("'" + h + "'") !== -1;
      })[0];
      if (btn) btn.click();
      return;
    }
    /* the pages declare these with const, so they are global names but not window properties */
    if (typeof openVilla === 'function' && typeof villas !== 'undefined' && villas[h]) openVilla(h);
    else if (typeof openModal === 'function' && typeof developments !== 'undefined' && developments[h]) openModal(h);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', route); else route();
})();
