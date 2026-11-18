(function () {
  // Mobile menu
  var btn = document.getElementById('menuBtn');
  var menu = document.getElementById('menu');
  if (btn && menu) {
    btn.addEventListener('click', function () { menu.classList.toggle('open'); });
  }

  // Highlight the current page in the menu
  var page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('#menu a').forEach(function (a) {
    if (a.getAttribute('href') === page) a.classList.add('active');
  });

  // Fade-in when scrolling
  var els = document.querySelectorAll('.rv');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.1 });
    els.forEach(function (el) { io.observe(el); });
  } else {
    els.forEach(function (el) { el.classList.add('in'); });
  }

  // Typing effect in the hero
  var t = document.getElementById('typed');
  if (t) {
    var words = ['beautiful websites', 'clean code', 'real projects', 'new ideas'];
    var w = 0, c = 0, del = false;
    (function tick() {
      var word = words[w];
      t.textContent = word.slice(0, c);
      if (!del && c < word.length) { c++; setTimeout(tick, 90); }
      else if (!del) { del = true; setTimeout(tick, 1400); }
      else if (c > 0) { c--; setTimeout(tick, 45); }
      else { del = false; w = (w + 1) % words.length; setTimeout(tick, 300); }
    })();
  }

  // Project filters
  var chips = document.querySelectorAll('.chip');
  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      chips.forEach(function (c) { c.classList.remove('active'); });
      chip.classList.add('active');
      var f = chip.getAttribute('data-f');
      document.querySelectorAll('.pcard').forEach(function (card) {
        var show = f === 'all' || card.getAttribute('data-cat').indexOf(f) !== -1;
        card.classList.toggle('hide', !show);
      });
    });
  });

  // Gallery lightbox
  document.querySelectorAll('.masonry img').forEach(function (img) {
    img.addEventListener('click', function () {
      var box = document.createElement('div');
      box.className = 'lightbox';
      box.innerHTML = '<img src="' + img.src + '" alt="' + img.alt + '">';
      box.addEventListener('click', function () { box.remove(); });
      document.body.appendChild(box);
    });
  });

  // Contact form opens the visitor's email app
  var form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var n = form.name.value, em = form.email.value, m = form.message.value;
      var body = encodeURIComponent(m + '\n\nFrom: ' + n + ' (' + em + ')');
      location.href = 'mailto:geniuscoding8@gmail.com?subject=' + encodeURIComponent('Portfolio message from ' + n) + '&body=' + body;
    });
  }
})();
