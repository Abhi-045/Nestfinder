// ═══════════════════════════════════════════════
//   NESTFINDER — APPLICATION LAYER
//   UI Controllers, Event Handlers, State Mgmt
// ═══════════════════════════════════════════════

// ── APP STATE ──────────────────────────────────
const AppState = {
  currentPage: 'home',
  currentType: 'all',
  selectedBHK: 'all',
  compareList: [],
  favorites: new Set(),
  listingsPage: 1,
  listingsPerPage: 8,
  filteredListings: [],
  view: 'grid',
  searchQuery: { listingType: 'buy' }
};

// ── INIT ───────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  renderFeaturedProperties();
  renderCities();
  renderInsightsChart();
  renderRecentProperties();
  renderTestimonials();
  renderAllListings();
  renderMapView();
  renderCompareSlots();
  animateHeroStats();
  calcEMI();
  calcROI();
  initScrollEffects();
});

// ── PAGE NAVIGATION ────────────────────────────
function showPage(name) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById(`page-${name}`).classList.add('active');
  AppState.currentPage = name;
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Lazy-render on first visit
  if (name === 'listings') applyFilters();
  if (name === 'map') renderMapView();
  if (name === 'compare') renderCompareSlots();
  if (name === 'calculator') { calcEMI(); calcROI(); }
}

// ── PROPERTY CARD BUILDER ──────────────────────
function buildCard(prop, index = 0) {
  const isFav = AppState.favorites.has(prop.id);
  const priceDisplay = prop.listingType === 'rent'
    ? prop.priceLabel
    : prop.priceLabel;

  return `
    <div class="prop-card" style="animation-delay:${index * 0.07}s" onclick="openDetail('${prop.id}')">
      <div class="prop-image">
        <img src="${prop.image}" alt="${prop.title}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80'"/>
        <div class="prop-badges">
          ${prop.listingType === 'rent' ? '<span class="badge badge-rent">Rent</span>' : '<span class="badge badge-sale">Sale</span>'}
          ${prop.premium ? '<span class="badge badge-premium">Premium</span>' : ''}
          ${prop.isNew ? '<span class="badge badge-new">New</span>' : ''}
          ${prop.verified ? '<span class="badge badge-verified">✓ Verified</span>' : ''}
        </div>
        <button class="prop-fav ${isFav ? 'active' : ''}" onclick="toggleFavorite(event,'${prop.id}')">${isFav ? '❤️' : '🤍'}</button>
        ${prop.premium ? '<div class="prop-tour">🥽 3D Tour</div>' : ''}
      </div>
      <div class="prop-body">
        <div class="prop-price">${priceDisplay} <span>${prop.listingType === 'sale' && prop.emi ? '· EMI from ₹' + FormatService.number(prop.emi) + '/mo' : ''}</span></div>
        <div class="prop-title">${prop.title}</div>
        <div class="prop-location">📍 ${prop.area}, ${prop.city}</div>
        <div class="prop-specs">
          ${prop.bhk ? `<div class="prop-spec"><span>🛏️</span><strong>${prop.bhk} BHK</strong></div>` : ''}
          <div class="prop-spec"><span>📐</span><strong>${FormatService.number(prop.areaSqft)} sqft</strong></div>
          ${prop.floor !== 'N/A' && prop.floor !== 'G+1' && prop.floor !== 'G+2' ? `<div class="prop-spec"><span>🏢</span><strong>Floor ${prop.floor}</strong></div>` : ''}
          ${prop.furnishing !== 'N/A' ? `<div class="prop-spec"><span>🪑</span><strong>${prop.furnishing.split(' ')[0]}</strong></div>` : ''}
        </div>
        <div class="prop-footer">
          <div class="prop-score">⭐ ${prop.rating} <span style="color:var(--text-muted)">(${prop.reviews})</span></div>
          <div class="prop-contact">
            <button class="btn-call" onclick="event.stopPropagation();callOwner('${prop.id}')">📞 Call</button>
            <button class="btn-chat" onclick="event.stopPropagation();chatOwner('${prop.id}')">💬</button>
          </div>
        </div>
      </div>
    </div>
  `;
}

// ── RENDER SECTIONS ────────────────────────────
function renderFeaturedProperties() {
  const grid = document.getElementById('featuredGrid');
  const props = PropertyController.getFeatured();
  grid.innerHTML = props.map((p, i) => buildCard(p, i)).join('');
}

function renderRecentProperties() {
  const grid = document.getElementById('recentGrid');
  const all = PropertyController.getRecent();
  const filtered = AppState.currentType === 'all'
    ? all : all.filter(p => p.type === AppState.currentType);
  grid.innerHTML = filtered.slice(0, 8).map((p, i) => buildCard(p, i)).join('');
}

function renderCities() {
  const grid = document.getElementById('citiesGrid');
  grid.innerHTML = DB.cities.map(c => `
    <div class="city-card" onclick="quickSearch('${c.name}')">
      <span class="city-emoji">${c.emoji}</span>
      <div class="city-name">${c.name}</div>
      <div class="city-count">${FormatService.number(c.count)} listings</div>
      <div class="city-avg">Avg. ${c.avgPrice} · ${c.growth}</div>
    </div>
  `).join('');
}

function renderTestimonials() {
  const grid = document.getElementById('testimonialsGrid');
  grid.innerHTML = DB.testimonials.map(t => `
    <div class="testimonial-card">
      <div class="testi-stars">${'★'.repeat(t.stars)}</div>
      <div class="testi-text">"${t.text}"</div>
      <div class="testi-author">
        <div class="testi-avatar">${t.avatar}</div>
        <div>
          <div class="testi-name">${t.name}</div>
          <div class="testi-meta">${t.meta}</div>
        </div>
      </div>
    </div>
  `).join('');
}

// ── INSIGHTS CHART (CSS-based bar chart) ───────
function renderInsightsChart() {
  const chart = document.getElementById('insightsChart');
  const data = DB.priceHistory['Pune'];
  const max = Math.max(...data);
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

  chart.innerHTML = `
    <div style="font-size:11px;color:var(--gold);text-transform:uppercase;letter-spacing:1px;margin-bottom:12px;font-weight:600;">Pune — 12 Month Price Trend (₹L/sqft)</div>
    <div style="display:flex;align-items:flex-end;gap:6px;height:180px;border-bottom:1px solid var(--border);padding-bottom:4px;">
      ${data.map((v, i) => `
        <div style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;gap:4px;">
          <div style="width:100%;background:${i === data.length-1 ? 'var(--gold)' : 'rgba(201,168,76,0.3)'};border-radius:3px 3px 0 0;height:${(v/max)*160}px;transition:height 0.5s ease ${i*0.05}s;"></div>
          <div style="font-size:9px;color:var(--text-muted)">${months[i]}</div>
        </div>
      `).join('')}
    </div>
    <div style="display:flex;justify-content:space-between;margin-top:12px;font-size:12px;">
      <span style="color:var(--text-muted)">Jan: ₹${data[0]}L</span>
      <span style="color:var(--success)">↑ +${Math.round((data[11]-data[0])/data[0]*100)}% YoY</span>
      <span style="color:var(--gold)">Dec: ₹${data[11]}L</span>
    </div>
  `;
}

// ── LISTINGS PAGE ──────────────────────────────
function renderAllListings() { applyFilters(); }

function applyFilters() {
  const types = [...document.querySelectorAll('#typeCheckboxes input:checked')].map(i => i.value);
  const minPrice = parseInt(document.getElementById('priceRangeMin').value);
  const maxPrice = parseInt(document.getElementById('priceRangeMax').value);
  const city = document.getElementById('cityFilter').value;
  const sort = document.getElementById('sortFilter').value;
  const furnishing = [...document.querySelectorAll('.checkbox-group input[value="Fully Furnished"]:checked, .checkbox-group input[value="Semi Furnished"]:checked, .checkbox-group input[value="Unfurnished"]:checked')].map(i => i.value);
  const amenities = [...document.querySelectorAll('.checkbox-group input[value="parking"]:checked, .checkbox-group input[value="gym"]:checked, .checkbox-group input[value="pool"]:checked, .checkbox-group input[value="security"]:checked, .checkbox-group input[value="garden"]:checked, .checkbox-group input[value="clubhouse"]:checked')].map(i => i.value);

  AppState.filteredListings = PropertyController.filter({
    types: types.length ? types : null,
    minPrice, maxPrice,
    bhk: AppState.selectedBHK,
    city: city || null,
    amenities: amenities.length ? amenities : null,
    furnishing: furnishing.length ? furnishing : null,
    sort
  });

  AppState.listingsPage = 1;
  renderListingsPage();
}

function renderListingsPage() {
  const { items, total, pages } = PropertyController.paginate(
    AppState.filteredListings, AppState.listingsPage, AppState.listingsPerPage
  );

  document.getElementById('resultCount').textContent = total;
  const grid = document.getElementById('listingsGrid');
  grid.className = `properties-grid${AppState.view === 'list' ? ' list-view' : ''}`;
  grid.innerHTML = items.length
    ? items.map((p, i) => buildCard(p, i)).join('')
    : `<div style="grid-column:1/-1;text-align:center;padding:80px;color:var(--text-muted);">
        <div style="font-size:48px;margin-bottom:16px;">🏘️</div>
        <h3 style="color:var(--white);margin-bottom:8px;">No properties found</h3>
        <p>Try adjusting your filters</p>
       </div>`;

  renderPagination(pages);
}

function renderPagination(totalPages) {
  const pag = document.getElementById('pagination');
  if (totalPages <= 1) { pag.innerHTML = ''; return; }
  let html = '';
  for (let i = 1; i <= totalPages; i++) {
    html += `<button class="pag-btn ${i === AppState.listingsPage ? 'active' : ''}" onclick="goToPage(${i})">${i}</button>`;
  }
  pag.innerHTML = html;
}

function goToPage(n) {
  AppState.listingsPage = n;
  renderListingsPage();
  document.querySelector('.listings-main').scrollTo({ top: 0, behavior: 'smooth' });
}

function setView(v, btn) {
  AppState.view = v;
  document.querySelectorAll('.vtog').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderListingsPage();
}

function updatePriceRange() {
  const min = parseInt(document.getElementById('priceRangeMin').value);
  const max = parseInt(document.getElementById('priceRangeMax').value);
  document.getElementById('priceMin').textContent = FormatService.price(min);
  document.getElementById('priceMax').textContent = FormatService.price(max);
  applyFilters();
}

function toggleBHK(btn, val) {
  document.querySelectorAll('.btog').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  AppState.selectedBHK = val;
  applyFilters();
}

function clearFilters() {
  document.querySelectorAll('#filterSidebar input[type=checkbox]').forEach(i => i.checked = false);
  document.getElementById('priceRangeMin').value = 0;
  document.getElementById('priceRangeMax').value = 100000000;
  document.getElementById('cityFilter').value = '';
  document.getElementById('sortFilter').value = 'newest';
  document.getElementById('priceMin').textContent = '₹0';
  document.getElementById('priceMax').textContent = '₹10Cr+';
  AppState.selectedBHK = 'all';
  document.querySelectorAll('.btog').forEach(b => b.classList.remove('active'));
  document.querySelector('.btog:first-child').classList.add('active');
  applyFilters();
  showToast('Filters cleared', 'success');
}

// ── SEARCH ─────────────────────────────────────
function performSearch() {
  const location = document.getElementById('searchLocation').value;
  const type = document.getElementById('searchType').value;
  const budget = document.getElementById('searchBudget').value;
  const bhk = document.getElementById('searchBHK').value;

  AppState.filteredListings = PropertyController.search({ location, type, budget });
  showPage('listings');
  renderListingsPage();
  if (location) showToast(`Showing results for "${location}"`, 'success');
}

function quickSearch(city) {
  document.getElementById('searchLocation').value = city;
  AppState.filteredListings = PropertyController.search({ location: city });
  showPage('listings');
  renderListingsPage();
  showToast(`Showing properties in ${city}`, 'success');
}

function filterByType(btn, type) {
  document.querySelectorAll('.filter-pills .pill').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  AppState.currentType = type;
  renderRecentProperties();
}

function switchSearchTab(btn, type) {
  document.querySelectorAll('.stab').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  AppState.searchQuery.listingType = type;
}

// ── MAP VIEW ───────────────────────────────────
function renderMapView() {
  const pins = document.getElementById('mapPins');
  const list = document.getElementById('mapList');
  if (!pins || !list) return;

  const props = PropertyController.getAll();

  // Canvas-based positioning (simulated map)
  const mapW = 800, mapH = 600;
  const minLat = 12.9, maxLat = 28.7, minLng = 73.7, maxLng = 78.9;

  pins.innerHTML = props.map((p, i) => {
    const x = ((p.lng - minLng) / (maxLng - minLng) * 85 + 5);
    const y = ((maxLat - p.lat) / (maxLat - minLat) * 80 + 5);
    return `
      <div class="map-pin ${p.listingType}" style="left:${x}%;top:${y}%;animation-delay:${i*0.1}s"
           onclick="highlightMapProperty('${p.id}')" title="${p.title}">
        <div class="map-pin-bubble">${p.priceLabel}</div>
      </div>
    `;
  }).join('');

  list.innerHTML = props.map(p => `
    <div class="map-list-item" id="mli-${p.id}" onclick="highlightMapProperty('${p.id}')">
      <img class="map-list-thumb" src="${p.image}" alt="${p.title}" onerror="this.style.background='var(--ink3)'"/>
      <div class="map-list-info">
        <div class="map-list-price">${p.priceLabel}</div>
        <div class="map-list-title">${p.title}</div>
        <div class="map-list-loc">📍 ${p.area}, ${p.city}</div>
      </div>
    </div>
  `).join('');
}

function filterMapListings(q) {
  const lower = q.toLowerCase();
  document.querySelectorAll('.map-list-item').forEach(item => {
    const text = item.textContent.toLowerCase();
    item.style.display = text.includes(lower) ? '' : 'none';
  });
}

function highlightMapProperty(id) {
  document.querySelectorAll('.map-list-item').forEach(i => i.style.borderColor = '');
  const el = document.getElementById(`mli-${id}`);
  if (el) {
    el.style.borderColor = 'var(--gold)';
    el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}

// ── PROPERTY DETAIL ────────────────────────────
function openDetail(id) {
  const p = PropertyController.getById(id);
  if (!p) return;
  const content = document.getElementById('detailContent');
  content.innerHTML = `
    <div class="detail-header">
      <img class="detail-image" src="${p.image}" alt="${p.title}" onerror="this.src='https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800'"/>
      <div class="detail-badge-row">
        ${p.premium ? '<span class="badge badge-premium">Premium</span>' : ''}
        ${p.verified ? '<span class="badge badge-verified">✓ Verified</span>' : ''}
        ${p.isNew ? '<span class="badge badge-new">New</span>' : ''}
      </div>
    </div>
    <div class="detail-body">
      <div class="detail-price-row">
        <div class="detail-price">${p.priceLabel}</div>
        <div class="prop-score" style="font-size:15px">⭐ ${p.rating} <span style="color:var(--text-muted);font-size:12px">(${p.reviews} reviews)</span></div>
      </div>
      <div class="detail-title">${p.title}</div>
      <div class="detail-location">📍 ${p.area}, ${p.city} · ${p.facing} Facing · ${p.possession}</div>
      <div class="detail-specs">
        ${p.bhk ? `<div class="dspec"><span class="dspec-icon">🛏️</span><div class="dspec-val">${p.bhk} BHK</div><div class="dspec-lbl">Bedrooms</div></div>` : ''}
        <div class="dspec"><span class="dspec-icon">📐</span><div class="dspec-val">${FormatService.number(p.areaSqft)}</div><div class="dspec-lbl">sq.ft.</div></div>
        <div class="dspec"><span class="dspec-icon">💰</span><div class="dspec-val">₹${FormatService.number(p.perSqft)}</div><div class="dspec-lbl">per sqft</div></div>
        ${p.floor !== 'N/A' ? `<div class="dspec"><span class="dspec-icon">🏢</span><div class="dspec-val">${p.floor}/${p.totalFloors}</div><div class="dspec-lbl">Floor</div></div>` : ''}
        <div class="dspec"><span class="dspec-icon">🪑</span><div class="dspec-val">${p.furnishing.split(' ')[0]}</div><div class="dspec-lbl">Furnishing</div></div>
        <div class="dspec"><span class="dspec-icon">📅</span><div class="dspec-val">${p.age === 0 ? 'New' : p.age + 'yr'}</div><div class="dspec-lbl">Age</div></div>
      </div>
      <div class="detail-desc">${p.description}</div>
      ${p.amenities.length ? `
        <div class="detail-amenities">
          <h4>Amenities</h4>
          <div class="amenity-tags">
            ${p.amenities.map(a => `<span class="amenity-tag">✓ ${a.charAt(0).toUpperCase() + a.slice(1)}</span>`).join('')}
          </div>
        </div>
      ` : ''}
      ${p.emi ? `<div style="background:var(--gold-light);border:1px solid var(--border);border-radius:10px;padding:14px;margin-bottom:20px;font-size:14px;color:var(--text);">
        🏦 <strong style="color:var(--gold)">EMI starts at ₹${FormatService.number(p.emi)}/month</strong> at 8.5% for 20 yrs · 
        <a onclick="showPage('calculator')" style="color:var(--gold);cursor:pointer;text-decoration:underline">Calculate exact EMI →</a>
      </div>` : ''}
      <div style="margin-bottom:12px;padding:12px;background:var(--ink3);border-radius:10px;font-size:13px;">
        <strong style="color:var(--white);">Builder:</strong> <span style="color:var(--text-muted)">${p.builder}</span> &nbsp;·&nbsp;
        <strong style="color:var(--white);">Tags:</strong> ${p.tags.map(t => `<span style="color:var(--gold)">${t}</span>`).join(', ')}
      </div>
      <div class="detail-cta">
        <button class="dcta-call" onclick="callOwner('${p.id}')">📞 Call Owner</button>
        <button class="dcta-whatsapp" style="border:none" onclick="showToast('Opening WhatsApp...','success')">💬 WhatsApp</button>
        <button class="dcta-save" style="border:1px solid var(--border)" onclick="toggleFavorite(event,'${p.id}')">🤍 Save</button>
        <button class="dcta-save" style="border:1px solid var(--border)" onclick="addToCompare('${p.id}')">⚖️ Compare</button>
      </div>
    </div>
  `;
  openModal('detailModal');
  // Reset scroll to top every time
  setTimeout(() => {
    const body = document.querySelector('.detail-body');
    if (body) body.scrollTop = 0;
  }, 50);
}

// ── COMPARE ────────────────────────────────────
function renderCompareSlots() {
  const slots = document.getElementById('compareSlots');
  const MAX = 3;
  let html = '';
  for (let i = 0; i < MAX; i++) {
    const prop = AppState.compareList[i];
    if (prop) {
      html += `
        <div class="compare-slot filled">
          <img src="${prop.image}" style="width:100%;height:80px;object-fit:cover;border-radius:8px;" alt="${prop.title}"/>
          <div style="font-size:12px;color:var(--white);text-align:center;font-weight:600;padding:0 8px">${prop.title.substring(0,40)}...</div>
          <div style="font-size:13px;color:var(--gold);font-weight:700;">${prop.priceLabel}</div>
          <button class="compare-slot-remove" onclick="removeFromCompare('${prop.id}')">✕</button>
        </div>
      `;
    } else {
      html += `<div class="compare-slot"><span style="font-size:24px">+</span><span>Add Property</span></div>`;
    }
  }
  document.getElementById('compareSlots').innerHTML = html;
  renderCompareTable();
}

function renderCompareTable() {
  const wrap = document.getElementById('compareTableWrap');
  if (AppState.compareList.length < 2) {
    wrap.innerHTML = `<p style="text-align:center;color:var(--text-muted);padding:32px;">Add at least 2 properties to compare</p>`;
    return;
  }
  const rows = [
    { label: 'Price', key: 'priceLabel', winner: 'min', parse: p => p.price },
    { label: 'Area (sqft)', key: 'areaSqft', winner: 'max', parse: p => p.areaSqft },
    { label: 'Price/sqft', key: 'perSqft', winner: 'min', parse: p => p.perSqft },
    { label: 'BHK', key: 'bhk', winner: 'max', parse: p => p.bhk || 0 },
    { label: 'Furnishing', key: 'furnishing', winner: null },
    { label: 'Floor', key: 'floor', winner: null },
    { label: 'Age', key: 'age', winner: 'min', parse: p => p.age },
    { label: 'Rating', key: 'rating', winner: 'max', parse: p => p.rating },
    { label: 'Amenities', key: null, winner: 'max', parse: p => p.amenities.length },
    { label: 'Possession', key: 'possession', winner: null },
    { label: 'Builder', key: 'builder', winner: null }
  ];

  const props = AppState.compareList;
  let tableHTML = `
    <table class="compare-table">
      <thead>
        <tr>
          <th>Feature</th>
          ${props.map(p => `<th>${p.title.substring(0,30)}...</th>`).join('')}
        </tr>
      </thead>
      <tbody>
  `;

  rows.forEach(row => {
    const vals = props.map(p => row.parse ? row.parse(p) : null);
    const winnerIdx = row.winner === 'max' ? vals.indexOf(Math.max(...vals.filter(v => v != null)))
      : row.winner === 'min' ? vals.indexOf(Math.min(...vals.filter(v => v != null))) : -1;

    tableHTML += `<tr><td style="font-weight:600;color:var(--text)">${row.label}</td>`;
    props.forEach((p, i) => {
      const display = row.key === null ? p.amenities.length + ' amenities'
        : row.key === 'age' ? (p.age === 0 ? 'New' : p.age + ' years')
        : p[row.key] != null ? p[row.key] : '—';
      tableHTML += `<td class="${i === winnerIdx && winnerIdx !== -1 ? 'winner' : ''}">${display}${i === winnerIdx && winnerIdx !== -1 ? ' ✓' : ''}</td>`;
    });
    tableHTML += `</tr>`;
  });

  tableHTML += '</tbody></table>';
  wrap.innerHTML = tableHTML;
}

function filterCompareSearch(q) {
  const dd = document.getElementById('compareSearchResults');
  if (!q || q.length < 2) { dd.classList.remove('show'); return; }
  const results = PropertyController.search({ location: q }).slice(0, 6);
  if (!results.length) { dd.classList.remove('show'); return; }
  dd.innerHTML = results.map(p => `
    <div class="compare-dd-item" onclick="addToCompare('${p.id}')">
      <strong>${p.title.substring(0,45)}...</strong><br/>
      <small>${p.city} · ${p.priceLabel}</small>
    </div>
  `).join('');
  dd.classList.add('show');
}

function addToCompare(id) {
  if (AppState.compareList.length >= 3) { showToast('Max 3 properties can be compared', 'error'); return; }
  const prop = PropertyController.getById(id);
  if (!prop) return;
  if (AppState.compareList.find(p => p.id === id)) { showToast('Property already in compare', 'error'); return; }
  AppState.compareList.push(prop);
  renderCompareSlots();
  document.getElementById('compareSearchResults').classList.remove('show');
  document.getElementById('compareSearchInput').value = '';
  showToast(`"${prop.title.substring(0,30)}..." added to compare`, 'success');
  if (AppState.currentPage !== 'compare') showPage('compare');
}

function removeFromCompare(id) {
  AppState.compareList = AppState.compareList.filter(p => p.id !== id);
  renderCompareSlots();
}

// ── CALCULATORS ────────────────────────────────
function calcEMI() {
  const principal = parseFloat(document.getElementById('loanAmount').value) || 0;
  const rate = parseFloat(document.getElementById('interestRate').value) || 0;
  const tenure = parseFloat(document.getElementById('loanTenure').value) || 0;
  const { emi, total, interest } = EMIService.calculate(principal, rate, tenure);

  document.getElementById('emiValue').textContent = FormatService.price(emi);
  document.getElementById('totalAmount').textContent = FormatService.price(total);
  document.getElementById('totalInterest').textContent = FormatService.price(interest);
  document.getElementById('principalAmt').textContent = FormatService.price(principal);

  // Donut chart
  const pct = principal > 0 ? Math.round(principal / total * 100) : 0;
  document.getElementById('emiDonut').innerHTML = `
    <svg width="80" height="80" viewBox="0 0 80 80">
      <circle cx="40" cy="40" r="30" fill="none" stroke="var(--ink2)" stroke-width="10"/>
      <circle cx="40" cy="40" r="30" fill="none" stroke="var(--gold)" stroke-width="10"
        stroke-dasharray="${pct * 188.4 / 100} 188.4"
        stroke-dashoffset="47.1" stroke-linecap="round" transform="rotate(-90 40 40)"/>
      <text x="40" y="45" text-anchor="middle" font-size="11" fill="var(--gold)" font-weight="700">${pct}%</text>
    </svg>
    <span style="font-size:11px;color:var(--text-muted);margin-left:8px">Principal<br/>portion</span>
  `;
}

function calcROI() {
  const price = parseFloat(document.getElementById('roiPrice').value) || 0;
  const growth = parseFloat(document.getElementById('roiCity').value) || 8;
  const years = parseFloat(document.getElementById('roiYears').value) || 5;
  const rent = parseFloat(document.getElementById('rentalIncome').value) || 0;

  const { futureValue, totalRental, capitalGain, totalReturns } = ROIService.calculate(price, growth, years, rent);

  document.getElementById('futureValue').textContent = FormatService.price(futureValue);
  document.getElementById('totalRental').textContent = FormatService.price(totalRental);
  document.getElementById('capitalGain').textContent = FormatService.price(capitalGain);
  document.getElementById('totalROI').textContent = FormatService.price(totalReturns);

  // Bar chart
  const max = Math.max(price, futureValue, totalReturns);
  const bars = [
    { val: price, label: 'Purchase', color: 'rgba(63,167,214,0.5)', border: 'rgba(63,167,214,0.8)' },
    { val: futureValue, label: 'Resale', color: 'rgba(201,168,76,0.3)', border: 'rgba(201,168,76,0.6)' },
    { val: totalReturns, label: 'Total', color: 'rgba(76,175,120,0.3)', border: 'rgba(76,175,120,0.6)' }
  ];
  document.getElementById('roiBarChart').innerHTML = bars.map(b => `
    <div style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;gap:4px;height:100%;">
      <div style="font-size:10px;color:var(--gold);font-weight:700;">${FormatService.price(b.val)}</div>
      <div style="width:100%;background:${b.color};border:1px solid ${b.border};border-radius:4px 4px 0 0;height:${max > 0 ? (b.val/max*80)+20 : 20}px;transition:height 0.5s ease;"></div>
      <div style="font-size:10px;color:var(--text-muted);text-align:center;">${b.label}</div>
    </div>
  `).join('');
}

function predictPrice() {
  const city = document.getElementById('aiCity').value;
  const area = parseInt(document.getElementById('aiArea').value) || 1000;
  const bhk = document.getElementById('aiBHK').value;
  const floor = parseInt(document.getElementById('aiFloor').value) || 5;
  const age = parseInt(document.getElementById('aiAge').value) || 0;

  const result = PricePredictor.predict(city, area, bhk, floor, age);
  const el = document.getElementById('aiResult');

  el.innerHTML = `
    <div style="font-size:11px;color:var(--gold);text-transform:uppercase;letter-spacing:1px;margin-bottom:8px;">AI Estimated Price Range</div>
    <div class="ai-price-range">${FormatService.price(result.low)} – ${FormatService.price(result.high)}</div>
    <div class="ai-confidence">🎯 ${result.confidence}% Confidence Score</div>
    <div class="ai-factors">
      Based on ${area} sqft · ${bhk} · Floor ${floor} · ${age === 0 ? 'New' : age + 'yr old'} · ${city}<br/>
      <strong style="color:var(--text)">Estimated per sqft:</strong> ₹${FormatService.number(Math.round(result.mid / area))}<br/>
      <strong style="color:var(--text)">Market trend:</strong> Bullish (+11% projected this year)<br/>
      <strong style="color:var(--text)">Best time to buy:</strong> <span style="color:var(--success)">Now (Pre-launch advantages available)</span>
    </div>
  `;
  el.classList.add('show');
}

// ── FAVORITES ──────────────────────────────────
function toggleFavorite(event, id) {
  event.stopPropagation();
  if (AppState.favorites.has(id)) {
    AppState.favorites.delete(id);
    showToast('Removed from saved properties', 'success');
  } else {
    AppState.favorites.add(id);
    showToast('❤️ Saved to your wishlist!', 'success');
  }
  // Re-render to update heart icons
  if (AppState.currentPage === 'listings') renderListingsPage();
  else { renderFeaturedProperties(); renderRecentProperties(); }
}

// ── MODALS ─────────────────────────────────────
function openModal(id) {
  document.getElementById(id).classList.add('show');
  // Do NOT lock body.overflow — it prevents inner flex-child scroll
  // Instead prevent background scroll via CSS only
  document.body.style.paddingRight = '0px'; // prevent layout shift
}
function closeModal(id) {
  document.getElementById(id).classList.remove('show');
  document.body.style.paddingRight = '';
}

// ── TOAST ──────────────────────────────────────
function showToast(msg, type = '') {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.className = `toast show ${type}`;
  clearTimeout(window._toastTimer);
  window._toastTimer = setTimeout(() => toast.classList.remove('show'), 3200);
}

// ── ACTIONS ────────────────────────────────────
function callOwner(id) {
  const p = PropertyController.getById(id);
  if (p) showToast(`📞 Calling ${p.contact}...`, 'success');
}

function chatOwner(id) {
  const p = PropertyController.getById(id);
  if (p) showToast(`💬 Opening chat with seller...`, 'success');
}

function submitListing() {
  closeModal('postModal');
  showToast('🎉 Your property has been listed successfully!', 'success');
}

// ── ANIMATIONS ─────────────────────────────────
function animateHeroStats() {
  document.querySelectorAll('.hnum').forEach(el => {
    const target = parseInt(el.dataset.target);
    let current = 0;
    const step = target / 60;
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = FormatService.number(Math.round(current));
      if (current >= target) clearInterval(timer);
    }, 30);
  });
}

function initScrollEffects() {
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  });

  // Intersection observer for cards
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.style.opacity = '1';
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.prop-card, .testimonial-card, .city-card').forEach(el => obs.observe(el));
}

function toggleMenu() {
  // Mobile menu toggle
  const links = document.querySelector('.nav-links');
  const actions = document.querySelector('.nav-actions');
  if (links) {
    const isShowing = links.style.display === 'flex';
    links.style.display = isShowing ? '' : 'flex';
    links.style.flexDirection = 'column';
    links.style.position = 'fixed';
    links.style.top = '68px';
    links.style.left = '0';
    links.style.right = '0';
    links.style.background = 'var(--card-bg2)';
    links.style.padding = '20px';
    links.style.borderBottom = '1px solid var(--border)';
    links.style.zIndex = '999';
    if (isShowing) { links.style.display = ''; }
  }
}

// Close compare dropdown when clicking outside
document.addEventListener('click', (e) => {
  if (!e.target.closest('.compare-search-row')) {
    const dd = document.getElementById('compareSearchResults');
    if (dd) dd.classList.remove('show');
  }
  if (!e.target.closest('.navbar')) {
    const links = document.querySelector('.nav-links');
    if (links && window.innerWidth < 900) links.style.display = '';
  }
});