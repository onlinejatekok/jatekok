// Hamburger menü kezelő — minden oldalon használható
(function() {
  function initHamburger() {
    const header = document.querySelector('.site-header');
    if (!header) return;
    const navLinks = header.querySelector('.nav-links');
    if (!navLinks) return;

    // Hamburger gomb létrehozása
    const btn = document.createElement('button');
    btn.className = 'hamburger';
    btn.setAttribute('aria-label', 'Menü');
    btn.setAttribute('aria-expanded', 'false');
    btn.textContent = '☰';
    header.appendChild(btn);

    // Drawer létrehozása — nav-links klónozása
    const drawer = document.createElement('nav');
    drawer.className = 'nav-drawer';
    drawer.setAttribute('aria-label', 'Mobil navigáció');

    // Tartalmat másolunk át
    function syncDrawer() {
      drawer.innerHTML = navLinks.innerHTML;
    }
    syncDrawer();

    // Drawer beszúrása fejléc után
    header.insertAdjacentElement('afterend', drawer);

    // Toggle
    btn.addEventListener('click', function() {
      const isOpen = drawer.classList.toggle('open');
      btn.setAttribute('aria-expanded', isOpen);
      btn.textContent = isOpen ? '✕' : '☰';
      if (isOpen) syncDrawer(); // frissíti a tartalmát (pl. bejelentkezett név)
    });

    // Kattintásnál bezár
    drawer.addEventListener('click', function(e) {
      if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON') {
        drawer.classList.remove('open');
        btn.textContent = '☰';
        btn.setAttribute('aria-expanded', 'false');
      }
    });

    // Kívülre kattintásnál bezár
    document.addEventListener('click', function(e) {
      if (!header.contains(e.target) && !drawer.contains(e.target)) {
        drawer.classList.remove('open');
        btn.textContent = '☰';
        btn.setAttribute('aria-expanded', 'false');
      }
    });

    // Nav-links dinamikus változásait figyeli (pl. bejelentkezés után)
    const observer = new MutationObserver(function() {
      if (drawer.classList.contains('open')) syncDrawer();
    });
    observer.observe(navLinks, { childList: true, subtree: true, characterData: true, attributes: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHamburger);
  } else {
    initHamburger();
  }
})();
