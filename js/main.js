/* ==========================================================================
   Lumière Wellness Studio — main.js
   Vanilla ES6+, no dependencies besides Lucide icons.
   ========================================================================== */
(() => {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    initIcons();
    initHeader();
    initMobileNav();
    initReveal();
    initFilters();
    initBeforeAfter();
    initGallery();
    initTestimonials();
    initFaq();
    initBookingForm();
    initNewsletter();
    initYear();
  });

  function initIcons() {
    if (window.lucide) window.lucide.createIcons();
  }

  /* ---------------- Header scroll state ---------------- */
  function initHeader() {
    const header = document.querySelector('.site-header');
    if (!header) return;
    const onScroll = () => {
      header.classList.toggle('is-scrolled', window.scrollY > 24);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---------------- Mobile nav drawer ---------------- */
  function initMobileNav() {
    const toggle = document.querySelector('.nav-toggle');
    const drawer = document.querySelector('.mobile-nav');
    const closeBtn = document.querySelector('.mobile-nav-close');
    if (!toggle || !drawer) return;

    const open = () => {
      drawer.classList.add('open');
      document.body.style.overflow = 'hidden';
      toggle.setAttribute('aria-expanded', 'true');
    };
    const close = () => {
      drawer.classList.remove('open');
      document.body.style.overflow = '';
      toggle.setAttribute('aria-expanded', 'false');
    };
    toggle.addEventListener('click', open);
    closeBtn?.addEventListener('click', close);
    drawer.querySelectorAll('a').forEach(a => a.addEventListener('click', close));
    document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
  }

  /* ---------------- Scroll reveal ---------------- */
  function initReveal() {
    const items = document.querySelectorAll('.reveal');
    if (!items.length) return;
    if (!('IntersectionObserver' in window)) {
      items.forEach(el => el.classList.add('in-view'));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
    items.forEach(el => io.observe(el));
  }

  /* ---------------- Service filtering ---------------- */
  function initFilters() {
    const tabWraps = document.querySelectorAll('[data-filter-group]');
    tabWraps.forEach(wrap => {
      const targetSelector = wrap.getAttribute('data-filter-group');
      const cards = document.querySelectorAll(targetSelector);
      const tabs = wrap.querySelectorAll('.filter-tab');
      tabs.forEach(tab => {
        tab.addEventListener('click', () => {
          tabs.forEach(t => t.classList.remove('active'));
          tab.classList.add('active');
          const category = tab.getAttribute('data-category');
          cards.forEach(card => {
            const match = category === 'all' || card.getAttribute('data-category') === category;
            card.style.display = match ? '' : 'none';
            if (match) {
              card.style.animation = 'none';
              // eslint-disable-next-line no-unused-expressions
              card.offsetHeight;
              card.style.animation = 'fade-in .5s ease';
            }
          });
        });
      });
    });
  }

  /* ---------------- Before / After slider ---------------- */
  function initBeforeAfter() {
    document.querySelectorAll('.ba-slider').forEach(slider => {
      const handle = slider.querySelector('.ba-handle');
      const afterWrap = slider.querySelector('.ba-after-wrap');
      const afterImg = slider.querySelector('.ba-after-wrap img');
      if (!handle || !afterWrap) return;

      let dragging = false;

      const setPosition = (percent) => {
        const clamped = Math.min(96, Math.max(4, percent));
        afterWrap.style.width = clamped + '%';
        handle.style.left = clamped + '%';
        if (afterImg) {
          const scale = 100 / clamped * 100;
          afterImg.style.width = scale + '%';
        }
      };

      const getPercent = (clientX) => {
        const rect = slider.getBoundingClientRect();
        return ((clientX - rect.left) / rect.width) * 100;
      };

      const start = () => { dragging = true; };
      const stop = () => { dragging = false; };
      const move = (clientX) => { if (dragging) setPosition(getPercent(clientX)); };

      handle.addEventListener('mousedown', start);
      window.addEventListener('mouseup', stop);
      window.addEventListener('mousemove', e => move(e.clientX));

      handle.addEventListener('touchstart', start, { passive: true });
      window.addEventListener('touchend', stop);
      window.addEventListener('touchmove', e => {
        if (dragging && e.touches[0]) move(e.touches[0].clientX);
      }, { passive: true });

      slider.addEventListener('click', (e) => {
        if (e.target.closest('.ba-handle')) return;
        setPosition(getPercent(e.clientX));
      });

      // keyboard accessibility
      handle.setAttribute('tabindex', '0');
      handle.setAttribute('role', 'slider');
      handle.setAttribute('aria-label', 'Before and after comparison slider');
      handle.setAttribute('aria-valuemin', '0');
      handle.setAttribute('aria-valuemax', '100');
      handle.addEventListener('keydown', (e) => {
        const current = parseFloat(afterWrap.style.width) || 50;
        if (e.key === 'ArrowLeft') setPosition(current - 5);
        if (e.key === 'ArrowRight') setPosition(current + 5);
      });

      setPosition(50);
    });
  }

  /* ---------------- Gallery lightbox ---------------- */
  function initGallery() {
    const items = document.querySelectorAll('.gallery-item');
    const lightbox = document.querySelector('.lightbox');
    if (!items.length || !lightbox) return;

    const lbImg = lightbox.querySelector('img');
    const lbCaption = lightbox.querySelector('figcaption');
    const closeBtn = lightbox.querySelector('.lb-close');
    const prevBtn = lightbox.querySelector('.lb-prev');
    const nextBtn = lightbox.querySelector('.lb-next');

    const images = Array.from(items).map(el => ({
      src: el.getAttribute('data-full') || el.querySelector('img').src,
      caption: el.getAttribute('data-caption') || el.querySelector('img').alt
    }));

    let index = 0;

    const show = (i) => {
      index = (i + images.length) % images.length;
      lbImg.src = images[index].src;
      lbImg.alt = images[index].caption;
      lbCaption.textContent = images[index].caption;
    };

    const open = (i) => {
      show(i);
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
    };
    const close = () => {
      lightbox.classList.remove('open');
      document.body.style.overflow = '';
    };

    items.forEach((item, i) => {
      item.addEventListener('click', () => open(i));
      item.setAttribute('tabindex', '0');
      item.setAttribute('role', 'button');
      item.addEventListener('keydown', e => { if (e.key === 'Enter') open(i); });
    });

    closeBtn?.addEventListener('click', close);
    prevBtn?.addEventListener('click', () => show(index - 1));
    nextBtn?.addEventListener('click', () => show(index + 1));
    lightbox.addEventListener('click', (e) => { if (e.target === lightbox) close(); });
    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('open')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') show(index - 1);
      if (e.key === 'ArrowRight') show(index + 1);
    });
  }

  /* ---------------- Testimonial slider ---------------- */
  function initTestimonials() {
    const track = document.querySelector('.testi-track');
    if (!track) return;
    const slides = track.querySelectorAll('.testi-slide');
    const dotsWrap = document.querySelector('.testi-dots');
    let current = 0;
    let timer;

    slides.forEach((s, i) => {
      const dot = document.createElement('button');
      dot.setAttribute('aria-label', `Show testimonial ${i + 1}`);
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goTo(i));
      dotsWrap?.appendChild(dot);
    });

    const dots = dotsWrap ? dotsWrap.querySelectorAll('button') : [];

    function goTo(i) {
      slides[current].classList.remove('active');
      dots[current]?.classList.remove('active');
      current = (i + slides.length) % slides.length;
      slides[current].classList.add('active');
      dots[current]?.classList.add('active');
      resetTimer();
    }

    function resetTimer() {
      clearInterval(timer);
      timer = setInterval(() => goTo(current + 1), 6000);
    }

    resetTimer();
  }

  /* ---------------- FAQ accordion ---------------- */
  function initFaq() {
    document.querySelectorAll('.faq-item').forEach(item => {
      const q = item.querySelector('.faq-q');
      const a = item.querySelector('.faq-a');
      if (!q || !a) return;
      q.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        item.closest('.faq-list').querySelectorAll('.faq-item').forEach(other => {
          other.classList.remove('open');
          other.querySelector('.faq-a').style.maxHeight = null;
          other.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
        });
        if (!isOpen) {
          item.classList.add('open');
          a.style.maxHeight = a.scrollHeight + 'px';
          q.setAttribute('aria-expanded', 'true');
        }
      });
    });
  }

  /* ---------------- Appointment booking form ---------------- */
  function initBookingForm() {
    const form = document.querySelector('#booking-form');
    if (!form) return;
    const success = document.querySelector('.form-success');

    const today = new Date().toISOString().split('T')[0];
    const dateInput = form.querySelector('#appt-date');
    if (dateInput) dateInput.setAttribute('min', today);

    const validators = {
      name: v => v.trim().length >= 2 || 'Please enter your full name.',
      phone: v => /^[0-9()+\-\s]{7,20}$/.test(v.trim()) || 'Enter a valid phone number.',
      email: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) || 'Enter a valid email address.',
      service: v => v !== '' || 'Please select a service.',
      date: v => v !== '' || 'Please choose a preferred date.',
      time: v => v !== '' || 'Please choose a preferred time.'
    };

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let valid = true;

      Object.keys(validators).forEach(key => {
        const field = form.querySelector(`[name="${key}"]`);
        if (!field) return;
        const wrap = field.closest('.form-field');
        const errorEl = wrap.querySelector('.error-msg');
        const result = validators[key](field.value);
        if (result !== true) {
          valid = false;
          wrap.classList.add('has-error');
          if (errorEl) errorEl.textContent = result;
        } else {
          wrap.classList.remove('has-error');
          if (errorEl) errorEl.textContent = '';
        }
      });

      if (!valid) {
        form.querySelector('.has-error input, .has-error select')?.focus();
        return;
      }

      success?.classList.add('show');
      form.reset();
      success?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setTimeout(() => success?.classList.remove('show'), 8000);
    });

    form.querySelectorAll('input, select, textarea').forEach(field => {
      field.addEventListener('input', () => {
        field.closest('.form-field')?.classList.remove('has-error');
      });
    });
  }

  /* ---------------- Newsletter (footer) ---------------- */
  function initNewsletter() {
    const form = document.querySelector('.footer-newsletter form');
    if (!form) return;
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('input');
      const btn = form.querySelector('button');
      if (!input.value.trim()) return;
      const original = btn.innerHTML;
      btn.innerHTML = '<i data-lucide="check" style="width:18px;height:18px"></i>';
      if (window.lucide) window.lucide.createIcons();
      input.value = '';
      setTimeout(() => { btn.innerHTML = original; if (window.lucide) window.lucide.createIcons(); }, 2200);
    });
  }

  function initYear() {
    document.querySelectorAll('.current-year').forEach(el => {
      el.textContent = new Date().getFullYear();
    });
  }
})();
