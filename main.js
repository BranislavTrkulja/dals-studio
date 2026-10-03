/* ============================================================
   SALON CONFIGURATION
   Edit this object to update services, prices, WhatsApp number,
   and pre-filled messages. This is the single source of truth.
   ============================================================ */
var SALON_CONFIG = {
  // WhatsApp number in international format, no + or spaces — UPDATE WITH REAL NUMBER
  whatsappNumber: '381606623383',

  // Phone number displayed in the modal — UPDATE WITH REAL NUMBER
  phone: '+381 60 662 3383',

  // Services shown in the booking modal.
  // id: unique key used internally
  // name: displayed in the modal and service list
  // price: shown in the modal (can be null to hide)
  // message: pre-filled WhatsApp message for this service
  services: [
    // --- MANIKIR ---
    {
      id: 'klasican-manikir',
      name: 'Klasičan manikir',
      price: '1.800 rsd',
      message: 'Zdravo! Zelim da zakazem termin za klasican manikir (30 min, 1.800 rsd). Molim vas da mi potvrdite dostupan termin. Hvala!'
    },
    {
      id: 'manikir-gel-lak',
      name: 'Manikir + gel lak',
      price: '2.800 rsd',
      message: 'Zdravo! Zelim da zakazem termin za manikir + gel lak (60 min, 2.800 rsd). Molim vas da mi potvrdite dostupan termin. Hvala!'
    },
    {
      id: 'spa-manikir-gel',
      name: 'Spa manikir + gel lak',
      price: '3.800 rsd',
      message: 'Zdravo! Zelim da zakazem termin za spa manikir + gel lak (90 min, 3.800 rsd). Molim vas da mi potvrdite dostupan termin. Hvala!'
    },
    {
      id: 'ojacavanje-s',
      name: 'Ojacavanje gelom — S duzina',
      price: '3.000 rsd',
      message: 'Zdravo! Zelim da zakazem termin za ojacavanje prirodnih noktiju gelom - S duzina (90 min, 3.000 rsd). Molim vas da mi potvrdite dostupan termin. Hvala!'
    },
    {
      id: 'ojacavanje-m',
      name: 'Ojacavanje gelom — M duzina',
      price: '3.300 rsd',
      message: 'Zdravo! Zelim da zakazem termin za ojacavanje prirodnih noktiju gelom - M duzina (90 min, 3.300 rsd). Molim vas da mi potvrdite dostupan termin. Hvala!'
    },
    {
      id: 'izlivanje-m',
      name: 'Izlivanje gelom — M duzina',
      price: '4.200 rsd',
      message: 'Zdravo! Zelim da zakazem termin za izlivanje noktiju gelom - M duzina (120 min, 4.200 rsd). Molim vas da mi potvrdite dostupan termin. Hvala!'
    },
    {
      id: 'korekcija-m',
      name: 'Korekcija noktiju — M duzina',
      price: '3.500 rsd',
      message: 'Zdravo! Zelim da zakazem termin za korekciju noktiju - M duzina (120 min, 3.500 rsd). Molim vas da mi potvrdite dostupan termin. Hvala!'
    },
    // --- PEDIKIR ---
    {
      id: 'estetski-pedikir-gel',
      name: 'Estetski pedikir + gel lak',
      price: '4.000 rsd',
      message: 'Zdravo! Zelim da zakazem termin za estetski pedikir + gel lak (90 min, 4.000 rsd). Molim vas da mi potvrdite dostupan termin. Hvala!'
    },
    {
      id: 'spa-pedikir-gel',
      name: 'Spa pedikir + gel lak',
      price: '4.500 rsd',
      message: 'Zdravo! Zelim da zakazem termin za spa pedikir + gel lak (90 min, 4.500 rsd). Molim vas da mi potvrdite dostupan termin. Hvala!'
    },
    {
      id: 'medicinski-pedikir-zahtevniji',
      name: 'Medicinski pedikir — zahtevniji',
      price: '4.800 rsd',
      message: 'Zdravo! Zelim da zakazem termin za medicinski pedikir - zahtevniji (80 min, 4.800 rsd). Molim vas da mi potvrdite dostupan termin. Hvala!'
    },
    {
      id: 'medicinski-pedikir-osnovni',
      name: 'Medicinski pedikir — osnovni',
      price: '4.000 rsd',
      message: 'Zdravo! Zelim da zakazem termin za medicinski pedikir - osnovni (60 min, 4.000 rsd). Molim vas da mi potvrdite dostupan termin. Hvala!'
    },
    {
      id: 'ostalo',
      name: 'Ostalo / upit',
      price: null,
      message: 'Zdravo! Zelim da zakazem termin. Molim vas da mi potvrdite dostupan termin kako bismo se dogovorili o usluzi. Hvala!'
    }
  ]
};


/* ============================================================
   NAV — scroll state + mobile overlay
   ============================================================ */
(function () {
  var nav = document.getElementById('site-nav');
  var hamburger = document.getElementById('nav-hamburger');
  var mobileNav = document.getElementById('mobile-nav');

  function onScroll() {
    if (window.scrollY > 40) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  var navOpen = false;

  function openNav() {
    navOpen = true;
    mobileNav.classList.add('is-open');
    hamburger.setAttribute('aria-expanded', 'true');
    hamburger.setAttribute('aria-label', 'Zatvori meni');
    nav.classList.add('scrolled');
    document.body.style.overflow = 'hidden';
  }

  function closeNav() {
    navOpen = false;
    mobileNav.classList.remove('is-open');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.setAttribute('aria-label', 'Otvori meni');
    document.body.style.overflow = '';
    setTimeout(function () {
      if (!navOpen && window.scrollY <= 40) {
        nav.classList.remove('scrolled');
      }
    }, 440);
  }

  hamburger.addEventListener('click', function () {
    if (navOpen) closeNav(); else openNav();
  });

  mobileNav.querySelectorAll('.mobile-nav-link').forEach(function (link) {
    link.addEventListener('click', function () {
      closeNav();
    });
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && navOpen) closeNav();
  });
})();


/* ============================================================
   BOOKING MODAL
   ============================================================ */
(function () {
  var modal = document.getElementById('booking-modal');
  var backdrop = document.getElementById('modal-backdrop');
  var closeBtn = document.getElementById('modal-close');
  var servicesContainer = document.getElementById('modal-services');
  var whatsappBtn = document.getElementById('modal-whatsapp-btn');
  var phoneLink = document.getElementById('modal-phone-link');

  var selectedServiceId = null;
  var previouslyFocused = null;

  // Update phone link from config
  if (phoneLink) {
    phoneLink.textContent = SALON_CONFIG.phone;
    phoneLink.href = 'tel:' + SALON_CONFIG.whatsappNumber;
  }

  // Build service option elements
  SALON_CONFIG.services.forEach(function (service) {
    var label = document.createElement('label');
    label.className = 'modal-service-option';
    label.setAttribute('data-service-id', service.id);

    var input = document.createElement('input');
    input.type = 'radio';
    input.name = 'booking-service';
    input.value = service.id;
    input.className = 'modal-service-input';
    input.setAttribute('aria-label', service.name + (service.price ? ' — ' + service.price : ''));

    var radio = document.createElement('span');
    radio.className = 'modal-radio';
    radio.setAttribute('aria-hidden', 'true');

    var nameSpan = document.createElement('span');
    nameSpan.className = 'modal-service-name';
    nameSpan.textContent = service.name;

    label.appendChild(input);
    label.appendChild(radio);
    label.appendChild(nameSpan);

    if (service.price) {
      var priceSpan = document.createElement('span');
      priceSpan.className = 'modal-service-price';
      priceSpan.textContent = service.price;
      label.appendChild(priceSpan);
    }

    // Select on click anywhere on the label
    label.addEventListener('click', function (e) {
      e.preventDefault();
      selectService(service.id);
    });

    // Also handle the real radio input for keyboard users
    input.addEventListener('change', function () {
      if (input.checked) selectService(service.id);
    });

    servicesContainer.appendChild(label);
  });

  function selectService(id) {
    selectedServiceId = id;

    // Update visual state
    servicesContainer.querySelectorAll('.modal-service-option').forEach(function (opt) {
      var isThis = opt.getAttribute('data-service-id') === id;
      opt.classList.toggle('is-selected', isThis);
      var inp = opt.querySelector('.modal-service-input');
      if (inp) inp.checked = isThis;
    });

    // Enable the WhatsApp button
    whatsappBtn.removeAttribute('aria-disabled');
    whatsappBtn.removeAttribute('tabindex');

    // Build the WhatsApp URL
    var service = SALON_CONFIG.services.find(function (s) { return s.id === id; });
    if (service) {
      var encoded = encodeURIComponent(service.message);
      whatsappBtn.href = 'https://wa.me/' + SALON_CONFIG.whatsappNumber + '?text=' + encoded;
    }
  }

  // Focusable elements in modal for focus trap
  function getFocusable() {
    return Array.prototype.slice.call(
      modal.querySelectorAll(
        'button:not([disabled]), a[href]:not([aria-disabled="true"]), input:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )
    ).filter(function (el) {
      return !el.classList.contains('modal-service-input'); // skip hidden real radios
    });
  }

  function openModal() {
    previouslyFocused = document.activeElement;
    modal.setAttribute('aria-hidden', 'false');
    modal.classList.add('is-open');
    document.body.style.overflow = 'hidden';

    // Focus the close button after transition
    setTimeout(function () {
      closeBtn.focus();
    }, 50);
  }

  function closeModal() {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';

    setTimeout(function () {
      if (previouslyFocused && previouslyFocused.focus) {
        previouslyFocused.focus();
      }
    }, 310);
  }

  // Open triggers — any element with data-modal-open
  document.querySelectorAll('[data-modal-open]').forEach(function (trigger) {
    trigger.addEventListener('click', openModal);
  });

  // Close button
  closeBtn.addEventListener('click', closeModal);

  // Backdrop click
  backdrop.addEventListener('click', closeModal);

  // Escape key + focus trap
  document.addEventListener('keydown', function (e) {
    if (!modal.classList.contains('is-open')) return;

    if (e.key === 'Escape') {
      closeModal();
      return;
    }

    if (e.key === 'Tab') {
      var focusable = getFocusable();
      if (!focusable.length) return;
      var first = focusable[0];
      var last = focusable[focusable.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
  });
})();


/* ============================================================
   SCROLL REVEAL
   ============================================================ */
(function () {
  if (!('IntersectionObserver' in window)) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  var selectors = [
    '.section-label',
    '.section-title',
    '.salon-about',
    '.booking-headline',
    '.service-category',
    '.gallery-header',
    '.booking-body',
    '.btn-primary',
    '.booking-hours',
    '.combined-booking',
    '.combined-contact',
    '.contact-map',
    '.services-note',
    '.services-booking-cta'
  ];

  selectors.forEach(function (sel) {
    document.querySelectorAll(sel).forEach(function (el, i) {
      el.classList.add('reveal');
      if (i === 1) el.classList.add('reveal-delay-1');
      if (i === 2) el.classList.add('reveal-delay-2');
    });
  });

  document.querySelectorAll('.service-break--manikir, .service-break--pedikir').forEach(function (el) {
    el.classList.add('reveal-clip');
  });

  document.querySelectorAll('.gallery-item').forEach(function (el, i) {
    el.classList.add('reveal');
    if (i % 3 === 1) el.classList.add('reveal-delay-1');
    if (i % 3 === 2) el.classList.add('reveal-delay-2');
  });

  document.querySelectorAll('.reveal, .reveal-clip').forEach(function (el) {
    observer.observe(el);
  });
})();


/* ============================================================
   HERO CAROUSEL
   ============================================================ */
(function () {
  var hero = document.getElementById('hero-carousel');
  if (!hero) return;

  var slides = hero.querySelectorAll('.carousel-slide');
  var dots   = hero.querySelectorAll('.carousel-dot');
  var current = 0;
  var timer = null;
  var INTERVAL = 4500;
  var paused = false;

  function goTo(index, direction) {
    var prev = current;
    var next = (index + slides.length) % slides.length;
    if (next === prev) return;

    // Determine direction: 1 = forward (slide left), -1 = backward (slide right)
    if (direction === undefined) {
      direction = next > prev ? 1 : -1;
      // Handle wrap-around: going from last to first is forward
      if (prev === slides.length - 1 && next === 0) direction = 1;
      if (prev === 0 && next === slides.length - 1) direction = -1;
    }

    var incoming = slides[next];
    var outgoing = slides[prev];

    // Position incoming slide off-screen in the correct direction
    incoming.classList.remove('is-active', 'is-leaving', 'is-leaving-back', 'is-incoming-back');
    if (direction === 1) {
      // coming from right — remove translateX(100%) default by just letting is-active handle it
      // but first we need it off-screen right without transition
      incoming.style.transition = 'none';
      incoming.style.transform = 'translateX(100%)';
    } else {
      incoming.style.transition = 'none';
      incoming.style.transform = 'translateX(-100%)';
    }

    // Force reflow so the no-transition repositioning takes effect
    incoming.offsetHeight;

    // Now animate both slides
    incoming.style.transition = '';
    incoming.style.transform = '';
    incoming.classList.add('is-active');

    outgoing.classList.remove('is-active');
    outgoing.style.transition = '';
    outgoing.style.transform = '';
    if (direction === 1) {
      outgoing.classList.add('is-leaving');
    } else {
      outgoing.classList.add('is-leaving-back');
    }

    // Clean up outgoing after transition
    setTimeout(function () {
      outgoing.classList.remove('is-leaving', 'is-leaving-back');
      outgoing.style.transform = '';
    }, 720);

    // Update dots
    dots[prev].classList.remove('is-active');
    dots[prev].setAttribute('aria-selected', 'false');
    dots[next].classList.add('is-active');
    dots[next].setAttribute('aria-selected', 'true');

    current = next;
  }

  function next() { goTo(current + 1, 1); }

  function startTimer() {
    clearInterval(timer);
    timer = setInterval(function () {
      if (!paused) next();
    }, INTERVAL);
  }

  // Dot clicks
  dots.forEach(function (dot, i) {
    dot.addEventListener('click', function () {
      goTo(i);
      startTimer();
    });
  });

  // Arrow clicks
  var prevBtn = document.getElementById('carousel-prev');
  var nextBtn = document.getElementById('carousel-next');
  if (prevBtn) prevBtn.addEventListener('click', function () { goTo(current - 1, -1); startTimer(); });
  if (nextBtn) nextBtn.addEventListener('click', function () { goTo(current + 1,  1); startTimer(); });

  // Pause on hover / focus
  hero.addEventListener('mouseenter', function () { paused = true; });
  hero.addEventListener('mouseleave', function () { paused = false; });
  hero.addEventListener('focusin',    function () { paused = true; });
  hero.addEventListener('focusout',   function () { paused = false; });

  // Touch swipe
  var touchStartX = 0;
  hero.addEventListener('touchstart', function (e) {
    touchStartX = e.changedTouches[0].clientX;
  }, { passive: true });
  hero.addEventListener('touchend', function (e) {
    var dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) < 40) return;
    if (dx < 0) { goTo(current + 1,  1); } else { goTo(current - 1, -1); }
    startTimer();
  }, { passive: true });

  // Respect reduced-motion — disable slide animation
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    slides.forEach(function (s) { s.style.transition = 'none'; });
  }

  startTimer();
})();


/* ============================================================
   SMOOTH SCROLL for anchor links
   ============================================================ */
(function () {
  var NAV_HEIGHT = 64;

  function scrollToSection(href) {
    var target = document.querySelector(href);
    if (!target) return;
    var top = target.getBoundingClientRect().top + window.pageYOffset - NAV_HEIGHT;
    window.scrollTo({ top: top, behavior: 'smooth' });
    history.pushState(null, '', href);
  }

  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var href = this.getAttribute('href');
      if (href === '#') return;
      if (!document.querySelector(href)) return;
      e.preventDefault();
      scrollToSection(href);
    });
  });
})();
