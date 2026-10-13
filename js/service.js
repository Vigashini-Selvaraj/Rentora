// Services Page interactive controllers: Filter tabs, Accordion FAQs
document.addEventListener('DOMContentLoaded', () => {
  // Service Tab Filtering (All / For Owners / For Tenants)
  const filterTabs = document.querySelectorAll('.svc-tab-btn');
  const serviceCards = document.querySelectorAll('.service-grid .service-card');

  if (filterTabs.length && serviceCards.length) {
    filterTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const targetFilter = tab.getAttribute('data-filter');

        // Sync all filter buttons with matching data-filter
        filterTabs.forEach(t => {
          if (t.getAttribute('data-filter') === targetFilter) {
            t.classList.add('active');
          } else {
            t.classList.remove('active');
          }
        });

        // Filter the core services cards
        serviceCards.forEach(card => {
          const cardAudience = (card.getAttribute('data-audience') || 'all').toLowerCase();
          if (targetFilter === 'all' || cardAudience.includes(targetFilter)) {
            card.style.display = 'flex';
            card.style.opacity = '0';
            card.style.transform = 'translateY(12px)';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, 60);
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // FAQ Accordion
  const faqItems = document.querySelectorAll('.svc-faq-item');
  if (faqItems.length) {
    faqItems.forEach(item => {
      const questionBtn = item.querySelector('.svc-faq-question');
      if (questionBtn) {
        questionBtn.addEventListener('click', () => {
          const isOpen = item.classList.contains('active');

          // Close all open FAQs
          faqItems.forEach(otherItem => {
            otherItem.classList.remove('active');
            const otherBtn = otherItem.querySelector('.svc-faq-question');
            if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
          });

          // Toggle current
          if (!isOpen) {
            item.classList.add('active');
            questionBtn.setAttribute('aria-expanded', 'true');
          }
        });
      }
    });
  }
});
