/* ─────────────────────────────────────────────────────────────
   script.js — Okuhle Nzimande Personal Site
───────────────────────────────────────────────────────────── */

(function () {
  'use strict';

  /* ── 1. Footer year ─────────────────────────────────────── */
  const yearEl = document.getElementById('footerYear');
  if (yearEl) yearEl.textContent = new Date().getFullYear();


  /* ── 2. Nav scroll shadow ───────────────────────────────── */
  const nav = document.querySelector('.site-nav');

  function updateNav() {
    if (!nav) return;
    if (window.scrollY > 30) {
      nav.style.background = 'rgba(10, 10, 10, 0.97)';
      nav.style.boxShadow = '0 1px 0 rgba(46, 204, 113, 0.12)';
    } else {
      nav.style.background = 'rgba(10, 10, 10, 0.85)';
      nav.style.boxShadow = 'none';
    }
  }

  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();


  /* ── 3. Lightweight scroll-reveal (AOS-like) ────────────── */
  const aosEls = document.querySelectorAll('[data-aos]');

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('aos-animate');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  aosEls.forEach((el) => revealObserver.observe(el));


  /* ── 4. Smooth nav link scroll ──────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const navHeight = nav ? nav.offsetHeight : 0;
      const top = target.getBoundingClientRect().top + window.scrollY - navHeight - 16;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });


  /* ── 5. Testimonials — pause on hover, resume on leave ──── */
  const track = document.getElementById('testimonialsTrack');

  // Clone already done in HTML for infinite scroll.
  // Pause/resume handled in CSS (.testimonials-track:hover).
  // JS adds touch support (drag to scroll manually on mobile).

  if (track) {
    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;
    const wrap = track.parentElement;

    wrap.addEventListener('mousedown', (e) => {
      isDown = true;
      wrap.style.cursor = 'grabbing';
      startX = e.pageX - wrap.offsetLeft;
      scrollLeft = wrap.scrollLeft;
    });

    wrap.addEventListener('mouseleave', () => {
      isDown = false;
      wrap.style.cursor = '';
    });

    wrap.addEventListener('mouseup', () => {
      isDown = false;
      wrap.style.cursor = '';
    });

    wrap.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - wrap.offsetLeft;
      const walk = (x - startX) * 1.4;
      wrap.scrollLeft = scrollLeft - walk;
    });

    // Touch
    let touchStartX = 0;
    let touchScrollLeft = 0;

    wrap.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].pageX;
      touchScrollLeft = wrap.scrollLeft;
      track.style.animationPlayState = 'paused';
    }, { passive: true });

    wrap.addEventListener('touchmove', (e) => {
      const x = e.touches[0].pageX;
      const walk = (touchStartX - x) * 1.2;
      wrap.scrollLeft = touchScrollLeft + walk;
    }, { passive: true });

    wrap.addEventListener('touchend', () => {
      // resume auto-scroll after 2 s
      setTimeout(() => {
        track.style.animationPlayState = '';
      }, 2000);
    });
  }


  /* ── 6. Active nav link highlight on scroll ─────────────── */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((link) => {
            link.classList.remove('nav-link--active');
            if (link.getAttribute('href') === '#' + entry.target.id) {
              link.classList.add('nav-link--active');
            }
          });
        }
      });
    },
    { threshold: 0.4 }
  );

  sections.forEach((sec) => sectionObserver.observe(sec));

})();
