// Properties Page Interactive Filtering & Neighborhood Highlights
document.addEventListener('DOMContentLoaded', () => {
  // 1. Inject Custom-Created Properties from Admin Dashboard LocalStorage
  const propGrid = document.querySelector('.prop-grid');
  if (propGrid) {
    try {
      const customProps = JSON.parse(localStorage.getItem('rentora_custom_properties') || '[]');
      customProps.forEach(prop => {
        const article = document.createElement('article');
        article.className = 'prop-card';
        article.dataset.category = (prop.category || 'apartment').toLowerCase();
        article.dataset.furnishing = (prop.furnishing || 'furnished').toLowerCase();
        article.dataset.price = String(prop.rent || '0');
        
        const bedText = String(prop.beds || '2').includes('+') ? `${prop.beds} Beds` : `${prop.beds} Beds`;
        const bathText = `${prop.baths || 2} Baths`;
        const areaText = prop.area || '1,500 sqft';
        const furnishLabel = prop.furnishing === 'semi-furnished' ? 'Semi Furnished' :
                             prop.furnishing === 'unfurnished' ? 'Unfurnished' : 'Fully Furnished';

        article.innerHTML = `
          <div class="prop-card-media">
            <a href="property-detail.html?id=${encodeURIComponent(prop.id || 'custom')}">
              <img src="${prop.image || 'assets/twilight-luxury-apartment.png'}" alt="${prop.title}">
            </a>
            <span class="prop-badge featured">NEW LISTING</span>
            <span class="prop-price">₹${Number(prop.rent).toLocaleString('en-IN')}<small>/mo</small></span>
          </div>
          <div class="prop-card-body">
            <span class="prop-location">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s-7-4.35-7-10a7 7 0 1 1 14 0c0 5.65-7 10-7 10z"/><circle cx="12" cy="11" r="2.5"/></svg>
              <span>${prop.location}</span>
            </span>
            <h3><a href="property-detail.html?id=${encodeURIComponent(prop.id || 'custom')}">${prop.title}</a></h3>
            <p>${prop.desc || 'Premium verified residence with modern interior fittings, security, and immediate lease availability.'}</p>
            <div class="prop-amenities">
              <span class="prop-amenity">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2 4v16M2 8h20M22 4v16M2 17h20"/></svg>
                <span>${bedText}</span>
              </span>
              <span class="prop-amenity">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6h6a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z"/><line x1="12" y1="2" x2="12" y2="6"/></svg>
                <span>${bathText}</span>
              </span>
              <span class="prop-amenity">
                <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>
                <span>${areaText}</span>
              </span>
            </div>
          </div>
          <div class="prop-card-footer">
            <span class="prop-furnish-tag">${furnishLabel}</span>
            <a href="property-detail.html?id=${encodeURIComponent(prop.id || 'custom')}" class="prop-view-btn">Schedule Visit <span>→</span></a>
          </div>
        `;
        propGrid.prepend(article);
      });
    } catch (e) {
      console.error('Error hydrating custom properties in properties.js:', e);
    }
  }

  // Tabs & Search Elements
  const tabs = document.querySelectorAll('.prop-tab');
  const searchInput = document.querySelector('.prop-search-box input');
  const cards = document.querySelectorAll('.prop-card');
  const countDisplay = document.querySelector('.prop-count-num');
  const noResults = document.querySelector('.prop-no-results');

  // Hero Quick Search Elements
  const heroLocationInput = document.getElementById('prop-hero-location');
  const heroTypeSelect = document.getElementById('prop-hero-type');
  const heroFurnishingSelect = document.getElementById('prop-hero-furnishing');
  const heroBudgetSelect = document.getElementById('prop-hero-budget');
  const heroSearchBtn = document.getElementById('prop-hero-search-btn');

  // State
  let currentCategory = 'all';
  let searchQuery = '';
  let heroFurnishing = 'any';
  let heroBudget = 'any';

  function filterProperties() {
    let visibleCount = 0;

    cards.forEach(card => {
      const cardCategory = (card.dataset.category || '').toLowerCase();
      const cardFurnishing = (card.dataset.furnishing || '').toLowerCase();
      const cardPrice = parseInt(card.dataset.price || '0', 10);
      const cardTitle = (card.querySelector('h3') ? card.querySelector('h3').textContent : '').toLowerCase();
      const cardLocation = (card.querySelector('.prop-location') ? card.querySelector('.prop-location').textContent : '').toLowerCase();
      const cardDesc = (card.querySelector('p') ? card.querySelector('p').textContent : '').toLowerCase();

      // Category matching
      const matchesCategory = currentCategory === 'all' || cardCategory === currentCategory;

      // Search matching (Location, Name, Description)
      const matchesSearch = !searchQuery || 
                            cardTitle.includes(searchQuery) || 
                            cardLocation.includes(searchQuery) || 
                            cardDesc.includes(searchQuery);

      // Furnishing matching
      const matchesFurnishing = heroFurnishing === 'any' || cardFurnishing === heroFurnishing;

      // Budget matching
      let matchesBudget = true;
      if (heroBudget === 'under-40') {
        matchesBudget = cardPrice > 0 && cardPrice < 40000;
      } else if (heroBudget === '40-75') {
        matchesBudget = cardPrice >= 40000 && cardPrice <= 75000;
      } else if (heroBudget === '75-120') {
        matchesBudget = cardPrice > 75000 && cardPrice <= 120000;
      } else if (heroBudget === '120-plus') {
        matchesBudget = cardPrice > 120000;
      }

      if (matchesCategory && matchesSearch && matchesFurnishing && matchesBudget) {
        card.style.display = 'flex';
        card.style.animation = 'fadeIn 0.3s ease forwards';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    if (countDisplay) {
      countDisplay.textContent = visibleCount;
    }

    if (noResults) {
      noResults.style.display = visibleCount === 0 ? 'block' : 'none';
    }
  }

  // Category Tab clicks
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentCategory = (tab.dataset.filter || 'all').trim().toLowerCase();
      
      // Sync hero property type select if matched
      if (heroTypeSelect) {
        heroTypeSelect.value = currentCategory === 'all' ? 'all' : currentCategory;
      }

      filterProperties();
    });
  });

  // Search input typing in filter strip
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.trim().toLowerCase();
      filterProperties();
    });
  }

  // Hero Search Button Click Handler
  if (heroSearchBtn) {
    heroSearchBtn.addEventListener('click', (e) => {
      e.preventDefault();

      // Read values from hero search bar
      const locationVal = heroLocationInput ? heroLocationInput.value.trim().toLowerCase() : '';
      const typeVal = heroTypeSelect ? heroTypeSelect.value.trim().toLowerCase() : 'all';
      const furnishingVal = heroFurnishingSelect ? heroFurnishingSelect.value.trim().toLowerCase() : 'any';
      const budgetVal = heroBudgetSelect ? heroBudgetSelect.value.trim().toLowerCase() : 'any';

      // Update state
      searchQuery = locationVal;
      currentCategory = typeVal;
      heroFurnishing = furnishingVal;
      heroBudget = budgetVal;

      // Sync filter strip input and tabs
      if (searchInput) {
        searchInput.value = heroLocationInput ? heroLocationInput.value : '';
      }
      tabs.forEach(tab => {
        const tabFilter = (tab.dataset.filter || '').toLowerCase();
        if (tabFilter === currentCategory) {
          tab.classList.add('active');
        } else {
          tab.classList.remove('active');
        }
      });

      // Filter properties
      filterProperties();

      // Smooth scroll down to featured properties section
      const propGridSection = document.getElementById('property-listings');
      if (propGridSection) {
        propGridSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }

  // Neighborhood dynamic selector
  const cityButtons = document.querySelectorAll('.neighborhood-nav-btn');
  const cityPanels = document.querySelectorAll('.city-insight-panel');

  cityButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetCity = btn.dataset.city;

      cityButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      cityPanels.forEach(panel => {
        if (panel.id === `city-${targetCity}`) {
          panel.classList.add('active');
          panel.style.display = 'grid';
        } else {
          panel.classList.remove('active');
          panel.style.display = 'none';
        }
      });
    });
  });

  // Click on neighborhood cards to filter by city
  const neighborhoodCards = document.querySelectorAll('.neighborhood-card');
  neighborhoodCards.forEach(nCard => {
    nCard.addEventListener('click', (e) => {
      e.preventDefault();
      const city = nCard.dataset.city || '';
      if (city) {
        searchQuery = city.toLowerCase();
        if (searchInput) searchInput.value = city;
        if (heroLocationInput) heroLocationInput.value = city;
        filterProperties();
        const listings = document.getElementById('property-listings');
        if (listings) listings.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Initial filter run (defaults to All Properties visible)
  filterProperties();
});
