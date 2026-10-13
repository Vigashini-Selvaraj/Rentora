// Property Detail Page Controller
document.addEventListener('DOMContentLoaded', () => {
  const propertyDatabase = {
    'grandview': {
      title: 'The Grandview Residences',
      location: 'Koramangala 4th Block, Bangalore',
      price: '₹45,000',
      deposit: '₹90,000 (2 Months)',
      type: '2 BHK Luxury Apartment',
      area: '1,280 sq.ft',
      baths: '2 Baths',
      beds: '2 Beds',
      furnishing: 'Fully Furnished',
      floor: '4th Floor (of 12)',
      facing: 'East Facing',
      available: 'Immediate Move-In',
      mainImg: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85',
      thumbnails: [
        'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80'
      ],
      description: 'The Grandview Residences offers modern metropolitan living at its finest. Featuring expansive floor-to-ceiling glass windows that illuminate a generous open-plan living and dining area. The master bedroom includes a walk-in wardrobe, ensuite bathroom with imported ceramic fixtures, and a private balcony overlooking lush manicured gardens.',
      neighborhood: {
        desc: 'Enjoy effortless connectivity to leading IT hubs, dining, shopping, transit links, and top-tier infrastructure in Koramangala.',
        transit: {
          sub: 'Effortless Metro & Road Links',
          body: 'Located just 8 minutes walking distance to the Trinity & South End metro stations. Quick arterial connectivity to Outer Ring Road, Silk Board flyover, and direct airport express bus stops within 500m.',
          tags: ['Metro: 8 min walk', 'ORR Hub: 12 min drive', 'Airport Flyover: 35 min']
        },
        dining: {
          sub: 'Premier Cafes & Shopping',
          body: 'Step right into Bangalore\'s gourmet capital. Over 80+ artisanal cafes, microbreweries, Forum Mall, and curated gourmet supermarkets like Nature\'s Basket are within a 4-minute walking radius.',
          tags: ['100ft Road: 4 min walk', 'Forum Mall: 600m', 'Nature\'s Basket: 3 min']
        },
        healthcare: {
          sub: '24/7 Multi-Specialty Care',
          body: 'Immediate 24/7 medical access with Apollo Clinic, Manipal Hospital, and St. John\'s Medical College Hospital within 1.2 km. Round-the-clock pharmacies and emergency triage at your doorstep.',
          tags: ['Apollo Clinic: 500m', 'St. John\'s: 1.2 km', '24/7 MedPlus: 200m']
        },
        education: {
          sub: 'Top Academics & Tech Parks',
          body: 'Proximity to renowned institutions including National Public School, Bethany High, and Christ University. Surrounded by premium tech parks, WeWork hubs, and venture studios.',
          tags: ['Bethany High: 1.8 km', 'Christ University: 2.5 km', 'WeWork Hub: 650m']
        }
      },
      owner: {
        name: 'Vikram Singhania',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
        phone: '+91 98450 12345',
        email: 'vikram.singhania@rentora.example',
        rating: '4.95 ★ (28 Reviews)',
        response: '< 15 mins'
      }
    },
    'serene-palms': {
      title: 'Serene Palms Villa',
      location: 'Jubilee Hills, Road No. 36, Hyderabad',
      price: '₹85,000',
      deposit: '₹1,70,000 (2 Months)',
      type: '4 BHK Private Gated Villa',
      area: '2,650 sq.ft',
      baths: '3 Baths',
      beds: '4 Beds',
      furnishing: 'Semi-Furnished',
      floor: 'Independent Ground + 1',
      facing: 'North-East',
      available: 'Available from 1st Next Month',
      mainImg: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=85',
      thumbnails: [
        'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80'
      ],
      description: 'Serene Palms Villa is an exceptional independent luxury home situated in the elite enclave of Jubilee Hills. Designed with soaring double-height ceilings, Italian tile flooring, a private landscaped backyard garden, and a dedicated servant quarter. Safe and serene private community with round-the-clock guarded gate.',
      neighborhood: {
        desc: 'Nestled in Jubilee Hills, Hyderabad\'s most prestigious residential district, minutes away from HITEC City and scenic hills.',
        transit: {
          sub: 'HITEC City & Metro Access',
          body: 'Direct access to Peddamma Gudi Metro Station (5 min) and Jubilee Hills Check Post. Effortless commute to HITEC City & Financial District within 15 minutes.',
          tags: ['Metro: 5 min', 'HITEC City: 15 min', 'Outer Ring Road: 10 min']
        },
        dining: {
          sub: 'Fine Dining & Luxury Retail',
          body: 'Surrounded by Hyderabad\'s finest culinary establishments on Road No. 36 & 45, luxury boutiques, and upscale organic grocery grocers.',
          tags: ['Road 36 Cafes: 3 min', 'Inorbit Mall: 12 min', 'Q-Mart: 5 min']
        },
        healthcare: {
          sub: 'World-Class Healthcare Centers',
          body: 'World-renowned medical institutions including Apollo Health City Jubilee Hills (1.5 km) and Care Hospital within easy reach.',
          tags: ['Apollo Health City: 1.5 km', 'Care Hospital: 3 km', 'Omega Hospital: 2.2 km']
        },
        education: {
          sub: 'Elite International Schools',
          body: 'Home to Oakridge International, CHIREC, and Hyderabad Public School, alongside upscale commercial headquarters.',
          tags: ['Oakridge: 4 km', 'CHIREC: 5 km', 'Jubilee Clubs: 2 min']
        }
      },
      owner: {
        name: 'Dr. Ramesh Reddy',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
        phone: '+91 94400 56789',
        email: 'ramesh.reddy@rentora.example',
        rating: '4.9 ★ (19 Reviews)',
        response: '< 30 mins'
      }
    },
    'skyline-loft': {
      title: 'Skyline Urban Loft',
      location: 'Carter Road, Bandra West, Mumbai',
      price: '₹38,000',
      deposit: '₹76,000 (2 Months)',
      type: '1 BHK Designer Loft',
      area: '840 sq.ft',
      baths: '1 Bath',
      beds: '1 Bed',
      furnishing: 'Fully Furnished with Appliances',
      floor: '9th Floor (of 16)',
      facing: 'West (Sea View)',
      available: 'Immediate Move-In',
      mainImg: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85',
      thumbnails: [
        'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=600&q=80'
      ],
      description: 'A stylish coastal apartment perfectly tailored for modern professionals and creatives. Boasts an open-concept layout with floor-to-ceiling windows overlooking the Arabian Sea, custom modular kitchenette, workstation with fiber internet, and sleek designer mood lighting.',
      neighborhood: {
        desc: 'Iconic Carter Road coastal promenade in Bandra West, with direct Arabian sea views and Mumbai\'s vibrant cultural vibe.',
        transit: {
          sub: 'Sea Link & Local Stations',
          body: '5 minutes to Bandra-Worli Sea Link for rapid South Mumbai access. Bandra railway & upcoming Metro Line 2B within 10 minutes.',
          tags: ['Sea Link: 5 min', 'Bandra Station: 10 min', 'BKC Hub: 15 min drive']
        },
        dining: {
          sub: 'Iconic Bistros & Seafront Promenades',
          body: 'Step out to Carter Road promenade, Pali Hill cafes, artisanal bakeries, and high-street fashion on Linking Road.',
          tags: ['Promenade: 1 min walk', 'Pali Hill Cafes: 5 min', 'Linking Rd: 8 min']
        },
        healthcare: {
          sub: 'Top Tier Hospitals',
          body: 'Proximity to Lilavati Hospital & Research Centre (2 km) and Holy Family Hospital (1 km) with round-the-clock emergency care.',
          tags: ['Lilavati Hospital: 2 km', 'Holy Family: 1 km', '24/7 Pharmacy: 100m']
        },
        education: {
          sub: 'Prominent Schools & Creative Hubs',
          body: 'Close to St. Stanislaus, American School of Bombay (BKC), and Mumbai\'s top media production studios and agencies.',
          tags: ['St. Andrew\'s: 1.2 km', 'Bandra Gymkhana: 4 min', 'BKC: 15 min']
        }
      },
      owner: {
        name: 'Kavita Chawla',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
        phone: '+91 98200 45678',
        email: 'kavita.chawla@rentora.example',
        rating: '5.0 ★ (34 Reviews)',
        response: '< 10 mins'
      }
    },
    'solarium-villa': {
      title: 'Solarium Sunset Villa',
      location: 'Whitefield Inner Circle, Bangalore',
      price: '₹95,000',
      deposit: '₹1,90,000 (2 Months)',
      type: '4 BHK Eco-Luxury Villa',
      area: '3,100 sq.ft',
      baths: '4 Baths',
      beds: '4 Beds',
      furnishing: 'Semi-Furnished',
      floor: 'Independent G+2',
      facing: 'North Facing',
      available: 'Immediate Move-In',
      mainImg: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=85',
      thumbnails: [
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=600&q=80'
      ],
      description: 'An eco-friendly architectural masterpiece equipped with rooftop solar cells, rain harvesting, EV charging bay, and smart home automation. Situated within a private gated enclave in close proximity to premier international schools and IT corridors in Whitefield.',
      neighborhood: {
        desc: 'Situated inside the peaceful Whitefield Inner Circle, seamlessly connected to ITPL, international schools, and metro stations.',
        transit: {
          sub: 'Purple Line Metro & Tech Corridors',
          body: 'Kadugodi Whitefield Metro Station is 6 minutes away. Seamless commuting to ITPL, Outer Ring Road, and KR Puram railway hub.',
          tags: ['Whitefield Metro: 6 min', 'ITPL Tech Park: 8 min', 'Hoodi Junction: 12 min']
        },
        dining: {
          sub: 'Malls & Microbreweries',
          body: 'Walking distance to Windmills Craftworks, Phoenix Marketcity, VR Bengaluru, and specialty organic retail markets.',
          tags: ['Windmills: 4 min', 'Phoenix Marketcity: 10 min', 'Forum Shantiniketan: 5 min']
        },
        healthcare: {
          sub: 'Super-Specialty Hospitals',
          body: 'Vydehi Hospital, Manipal Hospital Whitefield, and Columbia Asia (Aster) within a 5 to 8-minute radius with trauma care.',
          tags: ['Manipal Whitefield: 1.5 km', 'Vydehi Hospital: 2 km', 'Aster Clinic: 800m']
        },
        education: {
          sub: 'Premier International Academies',
          body: 'Close to The International School Bangalore (TISB), Greenwood High, and Inventure Academy with dedicated bus routes.',
          tags: ['Greenwood High: 15 min', 'Inventure Academy: 18 min', 'Deens Academy: 5 min']
        }
      },
      owner: {
        name: 'Arunav Sengupta',
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80',
        phone: '+91 99001 88220',
        email: 'arunav.sengupta@rentora.example',
        rating: '4.9 ★ (15 Reviews)',
        response: '< 20 mins'
      }
    }
  };

  // Get ID from URL param
  const urlParams = new URLSearchParams(window.location.search);
  const propId = urlParams.get('id') || 'grandview';
  const data = propertyDatabase[propId] || propertyDatabase['grandview'];

  // Update DOM elements if present
  const titleEl = document.getElementById('pd-title');
  const breadcrumbEl = document.getElementById('pd-breadcrumb-title');
  const locationEl = document.getElementById('pd-location');
  const priceEl = document.getElementById('pd-price');
  const depositEl = document.getElementById('pd-deposit');
  const typeEl = document.getElementById('pd-type');
  const areaEl = document.getElementById('pd-area');
  const bedsEl = document.getElementById('pd-beds');
  const bathsEl = document.getElementById('pd-baths');
  const furnishingEl = document.getElementById('pd-furnishing');
  const floorEl = document.getElementById('pd-floor');
  const facingEl = document.getElementById('pd-facing');
  const availableEl = document.getElementById('pd-available');
  const descEl = document.getElementById('pd-description');
  const mainImgEl = document.getElementById('pd-main-img');
  const thumbContainer = document.getElementById('pd-thumbs');
  const ownerNameEl = document.getElementById('pd-owner-name');
  const ownerAvatarEl = document.getElementById('pd-owner-avatar');
  const ownerPhoneEl = document.getElementById('pd-owner-phone');
  const ownerRatingEl = document.getElementById('pd-owner-rating');
  const contactMsgBtn = document.getElementById('pd-contact-msg-btn');

  // Format dual tone title: split on last word or customized
  if (titleEl) {
    const words = data.title.split(' ');
    if (words.length > 1) {
      const lastWord = words.pop();
      titleEl.innerHTML = `${words.join(' ')} <span class="text-green">${lastWord}</span>`;
    } else {
      titleEl.innerHTML = `<span class="text-green">${data.title}</span>`;
    }
  }

  if (breadcrumbEl) breadcrumbEl.textContent = data.title;
  
  const locationTextEl = document.getElementById('pd-location-text');
  if (locationTextEl) {
    locationTextEl.textContent = data.location;
  } else if (locationEl) {
    locationEl.innerHTML = `<svg class="pd-pin-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg><span>${data.location}</span>`;
  }

  if (priceEl) priceEl.textContent = data.price;
  if (depositEl) depositEl.textContent = data.deposit;
  if (typeEl) typeEl.textContent = data.type;
  if (areaEl) areaEl.textContent = data.area;
  if (bedsEl) bedsEl.textContent = data.beds;
  if (bathsEl) bathsEl.textContent = data.baths;
  if (furnishingEl) furnishingEl.textContent = data.furnishing;
  if (floorEl) floorEl.textContent = data.floor;
  if (facingEl) facingEl.textContent = data.facing;
  if (availableEl) availableEl.textContent = data.available;
  if (descEl) descEl.textContent = data.description;
  if (mainImgEl) mainImgEl.src = data.mainImg;

  // Update Neighborhood details dynamically
  if (data.neighborhood) {
    const nhDescEl = document.getElementById('pd-neighborhood-desc');
    if (nhDescEl) nhDescEl.textContent = data.neighborhood.desc;

    // Transit
    const transitSub = document.getElementById('nh-transit-sub');
    const transitBody = document.getElementById('nh-transit-body');
    const transitTags = document.getElementById('nh-transit-tags');
    if (transitSub && data.neighborhood.transit) transitSub.textContent = data.neighborhood.transit.sub;
    if (transitBody && data.neighborhood.transit) transitBody.textContent = data.neighborhood.transit.body;
    if (transitTags && data.neighborhood.transit && data.neighborhood.transit.tags) {
      transitTags.innerHTML = data.neighborhood.transit.tags.map(tag => `<span class="pd-nh-tag">${tag}</span>`).join('');
    }

    // Dining
    const diningSub = document.getElementById('nh-dining-sub');
    const diningBody = document.getElementById('nh-dining-body');
    const diningTags = document.getElementById('nh-dining-tags');
    if (diningSub && data.neighborhood.dining) diningSub.textContent = data.neighborhood.dining.sub;
    if (diningBody && data.neighborhood.dining) diningBody.textContent = data.neighborhood.dining.body;
    if (diningTags && data.neighborhood.dining && data.neighborhood.dining.tags) {
      diningTags.innerHTML = data.neighborhood.dining.tags.map(tag => `<span class="pd-nh-tag">${tag}</span>`).join('');
    }

    // Healthcare
    const healthSub = document.getElementById('nh-health-sub');
    const healthBody = document.getElementById('nh-health-body');
    const healthTags = document.getElementById('nh-health-tags');
    if (healthSub && data.neighborhood.healthcare) healthSub.textContent = data.neighborhood.healthcare.sub;
    if (healthBody && data.neighborhood.healthcare) healthBody.textContent = data.neighborhood.healthcare.body;
    if (healthTags && data.neighborhood.healthcare && data.neighborhood.healthcare.tags) {
      healthTags.innerHTML = data.neighborhood.healthcare.tags.map(tag => `<span class="pd-nh-tag">${tag}</span>`).join('');
    }

    // Education
    const eduSub = document.getElementById('nh-edu-sub');
    const eduBody = document.getElementById('nh-edu-body');
    const eduTags = document.getElementById('nh-edu-tags');
    if (eduSub && data.neighborhood.education) eduSub.textContent = data.neighborhood.education.sub;
    if (eduBody && data.neighborhood.education) eduBody.textContent = data.neighborhood.education.body;
    if (eduTags && data.neighborhood.education && data.neighborhood.education.tags) {
      eduTags.innerHTML = data.neighborhood.education.tags.map(tag => `<span class="pd-nh-tag">${tag}</span>`).join('');
    }
  }

  if (ownerNameEl) ownerNameEl.textContent = data.owner.name;
  if (ownerAvatarEl) ownerAvatarEl.src = data.owner.avatar;
  if (ownerPhoneEl) {
    ownerPhoneEl.querySelector('span') ? ownerPhoneEl.querySelector('span').textContent = `Call ${data.owner.phone}` : ownerPhoneEl.textContent = `Call ${data.owner.phone}`;
    ownerPhoneEl.href = `tel:${data.owner.phone.replace(/[^0-9+]/g, '')}`;
  }
  if (ownerRatingEl) {
    ownerRatingEl.innerHTML = `<svg viewBox="0 0 24 24" fill="currentColor" stroke="none" style="width:13px;height:13px;display:inline-block;vertical-align:-1px;color:#f59e0b;"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg> ${data.owner.rating.replace('★', '').trim()} • Responds ${data.owner.response}`;
  }

  if (contactMsgBtn) {
    contactMsgBtn.href = `contact.html?property=${encodeURIComponent(data.title)}&owner=${encodeURIComponent(data.owner.name)}`;
  }

  // Thumbnails click to swap main image
  if (thumbContainer && data.thumbnails) {
    thumbContainer.innerHTML = '';
    data.thumbnails.forEach((src) => {
      const thumb = document.createElement('div');
      thumb.className = 'pd-thumb';
      thumb.innerHTML = `<img src="${src}" alt="${data.title}">`;
      thumb.addEventListener('click', () => {
        if (mainImgEl) {
          mainImgEl.style.opacity = '0.5';
          setTimeout(() => {
            mainImgEl.src = src;
            mainImgEl.style.opacity = '1';
          }, 150);
        }
      });
      thumbContainer.appendChild(thumb);
    });
  }

  // Visit Type Buttons (In-person vs Virtual)
  const typeBtns = document.querySelectorAll('.pd-type-btn');
  typeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      typeBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  // Schedule Visit Form Submission
  const scheduleForm = document.getElementById('pd-schedule-form');
  if (scheduleForm) {
    scheduleForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const activeType = document.querySelector('.pd-type-btn.active') ? document.querySelector('.pd-type-btn.active').textContent : 'In-Person Visit';
      const dateVal = document.getElementById('pd-date') ? document.getElementById('pd-date').value : '';
      const nameVal = document.getElementById('pd-name') ? document.getElementById('pd-name').value : '';
      
      // Redirect to contact.html with prefilled details
      const targetUrl = `contact.html?action=scheduled&property=${encodeURIComponent(data.title)}&type=${encodeURIComponent(activeType)}&date=${encodeURIComponent(dateVal)}&visitor=${encodeURIComponent(nameVal)}`;
      window.location.href = targetUrl;
    });
  }
});
