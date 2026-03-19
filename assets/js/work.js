/* NAV scroll */
(function () {
  const nav = document.getElementById('nav');
  const t   = () => nav.classList.toggle('scrolled', scrollY > 55);
  window.addEventListener('scroll', t, { passive: true });
  t();
})();

/* Scroll Reveal */
(function () {
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
})();
