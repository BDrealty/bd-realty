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
    + '.bdg-cta{position:fixed;bottom:2rem;left:50%;transform:translateX(-50%);z-index:400;'
    + 'display:flex;align-items:stretch;opacity:0;transition:opacity .6s ease;'
    + 'box-shadow:0 3px 18px rgba(0,0,0,.22);border-radius:1px;}'
    + '.bdg-cta.bdg-in{opacity:1;}'
    + '.bdg-cta:hover{box-shadow:0 6px 24px rgba(0,0,0,.3);}'
    + '.bdg-btn{background:#C4B89A;color:#17150E;font-family:"Raleway",sans-serif;font-size:10px;'
    + 'letter-spacing:.24em;text-transform:uppercase;font-weight:400;border:none;padding:15px 30px;'
    + 'cursor:pointer;display:flex;align-items:center;gap:11px;white-space:nowrap;text-decoration:none;'
    + 'transition:background .25s;}'
    + '.bdg-btn:hover{background:#E8E0D0;}'
    + '.bdg-btn svg{width:14px;height:14px;flex-shrink:0;opacity:.75;}'
    + '.bdg-x{background:#C4B89A;color:rgba(23,21,14,.4);border:none;'
    + 'border-left:0.5px solid rgba(23,21,14,.14);cursor:pointer;font-size:10px;line-height:1;'
    + 'padding:0 12px;transition:color .25s,background .25s;font-family:"Raleway",sans-serif;}'
    + '.bdg-x:hover{color:#17150E;background:#E8E0D0;}'
    + 'body{padding-bottom:100px;}'
    + '@media(max-width:600px){'
    + '.bdg-cta{bottom:1rem;left:1.25rem;right:1.25rem;transform:none;}'
    + '.bdg-btn{flex:1;justify-content:center;font-size:9.5px;letter-spacing:.18em;padding:16px 10px;gap:9px;}'
    + '.bdg-btn svg{width:13px;height:13px;}'
    + '.bdg-x{padding:0 14px;}'
    + 'body{padding-bottom:88px;}}';

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
