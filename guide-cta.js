/* B&D Realty — floating "Free Buyer's Guide" call to action.
   Include once per page, just before </body>:
     <script src="guide-cta.js"></script>
   Automatically hides itself on the guide page and the sell page. */

(function () {
  var EXCLUDE = ['buyers-guide.html', 'sell.html'];
  var path = (window.location.pathname || '').toLowerCase();
  for (var i = 0; i < EXCLUDE.length; i++) {
    if (path.indexOf(EXCLUDE[i]) !== -1) return;
  }

  try {
    if (window.sessionStorage && sessionStorage.getItem('bdGuideDismissed') === '1') return;
  } catch (e) {}

  var css = ''
    + '.bdg-cta{position:fixed;bottom:2.25rem;left:50%;transform:translateX(-50%);z-index:400;'
    + 'display:flex;align-items:center;opacity:0;transition:opacity .5s ease,transform .3s ease;}'
    + '.bdg-cta.bdg-in{opacity:1;}'
    + '.bdg-btn{background:#C4B89A;color:#111009;font-family:"Raleway",sans-serif;font-size:13px;'
    + 'letter-spacing:.2em;text-transform:uppercase;font-weight:400;border:none;padding:22px 46px;'
    + 'cursor:pointer;display:flex;align-items:center;gap:14px;white-space:nowrap;text-decoration:none;'
    + 'box-shadow:0 6px 32px rgba(0,0,0,.35);transition:background .2s,transform .2s;border-radius:1px;}'
    + '.bdg-btn:hover{background:#E8E0D0;transform:translateY(-3px);}'
    + '.bdg-btn svg{width:19px;height:19px;flex-shrink:0;}'
    + '.bdg-x{background:#C4B89A;color:#6B6452;border:none;border-left:0.5px solid rgba(17,16,9,.18);'
    + 'cursor:pointer;font-size:14px;line-height:1;padding:0 14px;align-self:stretch;'
    + 'box-shadow:0 6px 32px rgba(0,0,0,.35);transition:color .2s;font-family:"Raleway",sans-serif;}'
    + '.bdg-x:hover{color:#111009;}'
    + 'body{padding-bottom:120px;}'
    + '@media(max-width:600px){'
    + '.bdg-cta{bottom:1rem;left:1rem;right:1rem;transform:none;}'
    + '.bdg-btn{flex:1;justify-content:center;font-size:11px;letter-spacing:.14em;padding:19px 14px;gap:10px;}'
    + '.bdg-btn svg{width:16px;height:16px;}'
    + '.bdg-x{padding:0 16px;}'
    + 'body{padding-bottom:100px;}}';

  var style = document.createElement('style');
  style.appendChild(document.createTextNode(css));
  document.head.appendChild(style);

  var wrap = document.createElement('div');
  wrap.className = 'bdg-cta';
  wrap.innerHTML = ''
    + '<a class="bdg-btn" href="buyers-guide.html">'
    + '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">'
    + '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>'
    + '<path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>'
    + '<span>Free Buyer&rsquo;s Guide to Mexico</span></a>'
    + '<button class="bdg-x" aria-label="Dismiss">&#10005;</button>';

  function mount() {
    document.body.appendChild(wrap);
    setTimeout(function () { wrap.classList.add('bdg-in'); }, 600);
    wrap.querySelector('.bdg-x').addEventListener('click', function () {
      wrap.style.display = 'none';
      document.body.style.paddingBottom = '';
      try { sessionStorage.setItem('bdGuideDismissed', '1'); } catch (e) {}
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }
})();
