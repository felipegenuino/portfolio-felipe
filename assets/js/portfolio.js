/* ====================================================
   THREE.JS — Hero particle field
==================================================== */
(function () {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas || typeof THREE === 'undefined') return;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setClearColor(0x000000, 0);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const scene  = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 1000);
  camera.position.z = 42;

  /* --- Particles --- */
  const COUNT = window.innerWidth < 640 ? 380 : 750;
  const pos   = new Float32Array(COUNT * 3);

  for (let i = 0; i < COUNT; i++) {
    pos[i * 3]     = (Math.random() - 0.5) * 110;
    pos[i * 3 + 1] = (Math.random() - 0.5) * 110;
    pos[i * 3 + 2] = (Math.random() - 0.5) * 65;
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));

  const mat = new THREE.PointsMaterial({
    color: 0xb5a28a,
    size: 0.22,
    sizeAttenuation: true,
    transparent: true,
    opacity: 0.52,
  });

  const mesh = new THREE.Points(geo, mat);
  scene.add(mesh);

  /* --- Mouse --- */
  const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
  document.addEventListener('mousemove', e => {
    mouse.tx = (e.clientX / innerWidth  - 0.5) *  0.32;
    mouse.ty = (e.clientY / innerHeight - 0.5) * -0.18;
  }, { passive: true });

  /* --- Resize --- */
  function onResize() {
    const w = canvas.parentElement.offsetWidth;
    const h = canvas.parentElement.offsetHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }

  onResize();
  window.addEventListener('resize', onResize, { passive: true });

  /* --- Loop --- */
  const clock = new THREE.Clock();

  (function loop() {
    requestAnimationFrame(loop);

    const t = clock.getElapsedTime();

    /* Smooth mouse follow */
    mouse.x += (mouse.tx - mouse.x) * 0.04;
    mouse.y += (mouse.ty - mouse.y) * 0.04;

    mesh.rotation.y = t * 0.014 + mouse.x;
    mesh.rotation.x = t * 0.007 + mouse.y;

    renderer.render(scene, camera);
  })();
})();

/* ====================================================
   SWIPER — Cards Effect
==================================================== */
new Swiper('.mySwiper', {
  effect:          'cards',
  grabCursor:      true,
  centeredSlides:  true,
  cardsEffect: {
    perSlideOffset: 9,
    perSlideRotate: 3,
    rotate:         true,
    slideShadows:   true,
  },
  pagination: {
    el:        '.swiper-pagination',
    clickable: true,
  },
  keyboard: { enabled: true },
  a11y:     { enabled: true },
});

/* ====================================================
   NAV — Scroll state
==================================================== */
(function () {
  const nav = document.getElementById('nav');
  const toggle = () => nav.classList.toggle('scrolled', scrollY > 55);
  window.addEventListener('scroll', toggle, { passive: true });
  toggle();
})();

/* ====================================================
   Scroll Reveal
==================================================== */
(function () {
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
})();

/* ====================================================
   DESKTOP EDITORIAL LIST — cursor preview
==================================================== */
(function () {
  const cursor    = document.getElementById('projCursor');
  const cursorBg  = document.getElementById('projCursorBg');
  const cursorImg = document.getElementById('projCursorImg');
  const rows      = document.querySelectorAll('.proj-row');

  if (!cursor || !rows.length) return;

  // Only run on desktop
  if (window.matchMedia('(max-width: 767px)').matches) return;

  let mouseX = 0, mouseY = 0;
  let curX   = 0, curY   = 0;
  let rafId;

  // Smooth follow loop
  function follow() {
    curX += (mouseX - curX) * 0.1;
    curY += (mouseY - curY) * 0.1;

    // Offset so cursor appears above-right of mouse
    const offsetX = 24;
    const offsetY = -180;

    // Clamp to viewport edges
    const w = cursor.offsetWidth;
    const h = cursor.offsetHeight;
    const x = Math.min(Math.max(curX + offsetX, 8), window.innerWidth  - w - 8);
    const y = Math.min(Math.max(curY + offsetY, 8), window.innerHeight - h - 8);

    cursor.style.left = x + 'px';
    cursor.style.top  = y + 'px';

    rafId = requestAnimationFrame(follow);
  }

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  }, { passive: true });

  // Start loop once
  rafId = requestAnimationFrame(follow);

  rows.forEach(row => {
    const imgSrc   = row.dataset.img      || '';
    const gradient = row.dataset.gradient || '#2a2520, #4a4035';

    row.addEventListener('mouseenter', () => {
      // Update background gradient
      cursorBg.style.background = `linear-gradient(140deg, ${gradient})`;

      // Update image (let CSS z-index handle fallback)
      if (imgSrc) {
        cursorImg.src = imgSrc;
        cursorImg.style.display = '';
      } else {
        cursorImg.style.display = 'none';
      }

      cursor.classList.add('is-active');
    });

    row.addEventListener('mouseleave', () => {
      cursor.classList.remove('is-active');
    });
  });
})();
