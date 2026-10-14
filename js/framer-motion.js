/**
 * Rentora Framer Motion Engine
 * Emulates Framer Motion's AnimatePresence, whileInView, and staggered transitions.
 */
(() => {
  // Respect prefers-reduced-motion
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('section, main, article, .panel, .property-card, .service-card, .footer-main').forEach(el => {
      el.classList.add('fm-in-view');
    });
    return;
  }

  function initFramerMotion() {
    // Target sections and prominent containers across all pages
    const motionTargets = document.querySelectorAll(`
      main > section,
      section:not(#navbar):not(#footer),
      .page-view,
      .site-footer,
      .footer-main,
      .auth-form-card,
      .standalone-card,
      .hero-luxury,
      .hero-split,
      .property-grid,
      .services-grid,
      .stats-grid,
      .blog-grid,
      .enquiry-card,
      .contact-grid
    `);

    // Target child items for stagger animations (cards, list items, pills)
    const staggerParents = document.querySelectorAll(`
      .property-grid,
      .services-grid,
      .stats-grid,
      .blog-grid,
      .card-grid,
      .features-grid,
      .faq-accordion-group,
      .footer-main,
      .team-grid,
      .pref-form-grid,
      .rental-history-grid
    `);

    staggerParents.forEach(parent => {
      parent.classList.add('fm-stagger-parent');
      Array.from(parent.children).forEach(child => {
        child.classList.add('fm-motion-child');
      });
    });

    // Add interactive whileHover / whileTap listeners to buttons and cards
    document.querySelectorAll('.button, .btn-primary, .primary-button, .property-card, .stat-card, .panel, .service-card').forEach(el => {
      el.classList.add('fm-hover-lift');
    });

    document.querySelectorAll('.footer-social-btn, .icon-button, .favorite-button').forEach(el => {
      el.classList.add('fm-hover-press');
    });

    // IntersectionObserver with threshold & rootMargin to simulate whileInView={{ opacity: 1, y: 0 }}
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.08
    };

    const motionObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fm-in-view');
          // Once animated into view, stop observing for performance
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    motionTargets.forEach(target => {
      // Don't hide topmost elements already visible in viewport
      const rect = target.getBoundingClientRect();
      const isTopHero = rect.top >= 0 && rect.top <= window.innerHeight * 0.45;

      if (!target.classList.contains('fm-motion') && !target.classList.contains('fm-stagger-parent')) {
        target.classList.add('fm-motion');
      }

      if (isTopHero) {
        // Immediate spring trigger with gentle delay for first impression
        setTimeout(() => {
          target.classList.add('fm-in-view');
        }, 60);
      } else {
        motionObserver.observe(target);
      }
    });

    // Listen for tab/view switches in dashboard views to re-trigger motion
    document.querySelectorAll('.nav-item, [data-view]').forEach(tab => {
      tab.addEventListener('click', () => {
        setTimeout(() => {
          const activeView = document.querySelector('.page-view.active-view');
          if (activeView) {
            activeView.classList.remove('fm-in-view');
            void activeView.offsetWidth; // Force reflow
            activeView.classList.add('fm-motion', 'fm-in-view');
          }
        }, 30);
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFramerMotion);
  } else {
    initFramerMotion();
  }

  // Also re-run after shared footer/navbar components are loaded
  window.addEventListener('rentora-components-loaded', initFramerMotion);
})();
