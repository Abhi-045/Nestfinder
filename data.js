// ═══════════════════════════════════════════════
//   NESTFINDER — DATABASE / DATA LAYER
//   Simulates backend API responses & DB models
// ═══════════════════════════════════════════════

// ── PROPERTY DATABASE ──────────────────────────
const DB = {

  properties: [
    {
      id: "P001", title: "Luxury 3 BHK Apartment in Koregaon Park",
      type: "Apartment", listingType: "sale", bhk: 3, city: "Pune", area: "Koregaon Park",
      price: 12500000, priceLabel: "₹1.25 Cr", perSqft: 9615,
      areaSqft: 1300, floor: 8, totalFloors: 15, age: 2,
      furnishing: "Fully Furnished", facing: "East",
      builder: "Paranjape Schemes", possession: "Ready to Move",
      rating: 4.8, reviews: 42, premium: true, verified: true, isNew: true,
      amenities: ["parking", "gym", "pool", "security", "garden", "clubhouse", "lift", "powerBackup"],
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",
      images: ["https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800","https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800"],
      lat: 18.535, lng: 73.892,
      description: "Stunning 3 BHK apartment in the heart of Koregaon Park. Features premium Italian marble flooring, modular kitchen, and a breathtaking city view. The society offers world-class amenities including an infinity pool, fully equipped gymnasium, and 24×7 security.",
      contact: "+91 98765 43210", emi: 89000,
      tags: ["3 virtual tours", "RERA Approved"]
    },
    {
      id: "P002", title: "Modern 4 BHK Villa with Private Pool",
      type: "Villa", listingType: "sale", bhk: 4, city: "Pune", area: "Baner",
      price: 28000000, priceLabel: "₹2.8 Cr", perSqft: 7000,
      areaSqft: 4000, floor: "G+1", totalFloors: 2, age: 1,
      furnishing: "Semi Furnished", facing: "West",
      builder: "Kumar Properties", possession: "Ready to Move",
      rating: 4.9, reviews: 18, premium: true, verified: true, isNew: true,
      amenities: ["parking", "pool", "garden", "security", "gym", "clubhouse"],
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
      images: ["https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800"],
      lat: 18.559, lng: 73.787,
      description: "An architectural masterpiece — this 4 BHK villa blends contemporary design with lush greenery. Private swimming pool, landscaped garden, double-height living room, and a dedicated home theatre make this a once-in-a-lifetime opportunity.",
      contact: "+91 98765 43211", emi: 200000,
      tags: ["Virtual Tour Available", "RERA Approved"]
    },
    {
      id: "P003", title: "Affordable 2 BHK in Hinjewadi IT Hub",
      type: "Apartment", listingType: "sale", bhk: 2, city: "Pune", area: "Hinjewadi",
      price: 5800000, priceLabel: "₹58 L", perSqft: 5800,
      areaSqft: 1000, floor: 4, totalFloors: 20, age: 3,
      furnishing: "Unfurnished", facing: "South",
      builder: "Kolte Patil", possession: "Ready to Move",
      rating: 4.2, reviews: 87, premium: false, verified: true, isNew: false,
      amenities: ["parking", "security", "lift", "gym"],
      image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80",
      images: ["https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800"],
      lat: 18.591, lng: 73.736,
      description: "Perfect for IT professionals. This well-maintained 2 BHK apartment is minutes from Hinjewadi Tech Park. Metro connectivity, schools, and hospitals all within reach. Low maintenance, ample parking.",
      contact: "+91 98765 43212", emi: 41500,
      tags: ["Metro Nearby", "RERA Approved"]
    },
    {
      id: "P004", title: "Premium Studio in Viman Nagar",
      type: "Studio", listingType: "rent", bhk: 1, city: "Pune", area: "Viman Nagar",
      price: 22000, priceLabel: "₹22K/mo", perSqft: 44,
      areaSqft: 500, floor: 6, totalFloors: 14, age: 2,
      furnishing: "Fully Furnished", facing: "North",
      builder: "Goel Ganga", possession: "Immediate",
      rating: 4.5, reviews: 31, premium: false, verified: true, isNew: true,
      amenities: ["parking", "security", "gym", "powerBackup"],
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80",
      images: ["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800"],
      lat: 18.567, lng: 73.919,
      description: "Beautifully designed fully furnished studio near Phoenix Mall & Pune Airport. Complete with AC, modular kitchen, work desk, and high-speed internet ready infrastructure. Available immediately.",
      contact: "+91 98765 43213", emi: null,
      tags: ["Fully Furnished", "Airport Nearby"]
    },
    {
      id: "P005", title: "Spacious 3 BHK Independent House",
      type: "Independent House", listingType: "sale", bhk: 3, city: "Pune", area: "Kothrud",
      price: 9800000, priceLabel: "₹98 L", perSqft: 6125,
      areaSqft: 1600, floor: "G+2", totalFloors: 3, age: 15,
      furnishing: "Semi Furnished", facing: "East",
      builder: "Self Constructed", possession: "Ready to Move",
      rating: 4.0, reviews: 12, premium: false, verified: true, isNew: false,
      amenities: ["parking", "garden", "security"],
      image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80",
      images: ["https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800"],
      lat: 18.504, lng: 73.829,
      description: "A classic independent house in one of Pune's prime localities. Large rooms, rooftop access, private garden, and 2-car parking. Located in a quiet lane with excellent connectivity to schools and hospitals.",
      contact: "+91 98765 43214", emi: 70000,
      tags: ["Rooftop Access", "Corner Plot"]
    },
    {
      id: "P006", title: "Exclusive Penthouse in Aundh",
      type: "Penthouse", listingType: "sale", bhk: 5, city: "Pune", area: "Aundh",
      price: 45000000, priceLabel: "₹4.5 Cr", perSqft: 12000,
      areaSqft: 3750, floor: 22, totalFloors: 22, age: 0,
      furnishing: "Fully Furnished", facing: "All Sides",
      builder: "Rohan Builders", possession: "Dec 2025",
      rating: 5.0, reviews: 7, premium: true, verified: true, isNew: true,
      amenities: ["parking", "gym", "pool", "security", "garden", "clubhouse", "theatre", "helipad"],
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
      images: ["https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800"],
      lat: 18.56, lng: 73.808,
      description: "The crown jewel of Pune's skyline — a 5 BHK sky mansion with panoramic views of the Sahyadri mountains. Sky lounge, private terrace pool, home automation, and a dedicated service lift. For those who demand nothing but the finest.",
      contact: "+91 98765 43215", emi: 320000,
      tags: ["Sky Mansion", "3D Tour", "RERA Approved"]
    },
    {
      id: "P007", title: "2 BHK Apartment in Whitefield",
      type: "Apartment", listingType: "sale", bhk: 2, city: "Bangalore", area: "Whitefield",
      price: 7500000, priceLabel: "₹75 L", perSqft: 6250,
      areaSqft: 1200, floor: 5, totalFloors: 12, age: 4,
      furnishing: "Semi Furnished", facing: "North",
      builder: "Prestige Group", possession: "Ready to Move",
      rating: 4.4, reviews: 55, premium: false, verified: true, isNew: false,
      amenities: ["parking", "security", "gym", "garden", "lift"],
      image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
      lat: 12.969, lng: 77.750,
      description: "Premium 2 BHK in Whitefield's top residential complex. Easy access to ITPL, Phoenix Marketcity, and Manipal Hospital. Modern amenities, vastu-compliant design.",
      contact: "+91 98765 43216", emi: 53500,
      tags: ["Metro Nearby", "RERA Approved"]
    },
    {
      id: "P008", title: "3 BHK in Powai with Lake View",
      type: "Apartment", listingType: "sale", bhk: 3, city: "Mumbai", area: "Powai",
      price: 22000000, priceLabel: "₹2.2 Cr", perSqft: 22000,
      areaSqft: 1000, floor: 14, totalFloors: 30, age: 5,
      furnishing: "Fully Furnished", facing: "Lake View",
      builder: "Hiranandani Group", possession: "Ready to Move",
      rating: 4.7, reviews: 63, premium: true, verified: true, isNew: false,
      amenities: ["parking", "pool", "gym", "security", "clubhouse", "lift"],
      image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80",
      lat: 19.117, lng: 72.905,
      description: "Wake up to stunning Powai Lake views every morning. This beautifully designed 3 BHK in Hiranandani is surrounded by lush greenery and world-class infrastructure. Walking distance to IITB and IIT Tech Park.",
      contact: "+91 98765 43217", emi: 157000,
      tags: ["Lake View", "RERA Approved"]
    },
    {
      id: "P009", title: "Compact 1 BHK for Rent in Koramangala",
      type: "Apartment", listingType: "rent", bhk: 1, city: "Bangalore", area: "Koramangala",
      price: 18000, priceLabel: "₹18K/mo", perSqft: 36,
      areaSqft: 500, floor: 2, totalFloors: 6, age: 7,
      furnishing: "Semi Furnished", facing: "South",
      builder: "Individual Owner", possession: "Immediate",
      rating: 3.9, reviews: 28, premium: false, verified: true, isNew: true,
      amenities: ["parking", "security"],
      image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80",
      lat: 12.935, lng: 77.626,
      description: "Cozy 1 BHK in the buzzing Koramangala area. Walking distance from cafes, restaurants, Forum Mall, and major tech startups. Perfect for young professionals.",
      contact: "+91 98765 43218", emi: null,
      tags: ["Pet Friendly", "Startup Hub"]
    },
    {
      id: "P010", title: "Plot in Gachibowli IT Corridor",
      type: "Plot", listingType: "sale", bhk: null, city: "Hyderabad", area: "Gachibowli",
      price: 16000000, priceLabel: "₹1.6 Cr", perSqft: 8000,
      areaSqft: 2000, floor: "N/A", totalFloors: "N/A", age: 0,
      furnishing: "N/A", facing: "East",
      builder: "HMDA Approved", possession: "Immediate",
      rating: 4.3, reviews: 19, premium: false, verified: true, isNew: false,
      amenities: ["garden"],
      image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80",
      lat: 17.445, lng: 78.349,
      description: "Excellent investment plot in Gachibowli — Hyderabad's most sought-after IT corridor. HMDA-approved, clear title, surrounded by Premium IT parks, hotels and schools. Ideal for residential or commercial development.",
      contact: "+91 98765 43219", emi: 114000,
      tags: ["HMDA Approved", "Investment Grade"]
    },
    {
      id: "P011", title: "4 BHK Duplex in Jubilee Hills",
      type: "Independent House", listingType: "sale", bhk: 4, city: "Hyderabad", area: "Jubilee Hills",
      price: 38000000, priceLabel: "₹3.8 Cr", perSqft: 9500,
      areaSqft: 4000, floor: "G+2", totalFloors: 3, age: 6,
      furnishing: "Fully Furnished", facing: "West",
      builder: "Aparna Constructions", possession: "Ready to Move",
      rating: 4.6, reviews: 24, premium: true, verified: true, isNew: false,
      amenities: ["parking", "pool", "garden", "security", "gym", "clubhouse"],
      image: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800&q=80",
      lat: 17.432, lng: 78.407,
      description: "Grand duplex villa in Jubilee Hills' most exclusive enclave. Features a private pool, landscaped garden, home theatre, smart home automation, and a chef's kitchen. Bespoke interior design by award-winning architects.",
      contact: "+91 98765 43220", emi: 271000,
      tags: ["Smart Home", "Virtual Tour", "RERA Approved"]
    },
    {
      id: "P012", title: "2 BHK Apartment in Sector 62, Noida",
      type: "Apartment", listingType: "sale", bhk: 2, city: "Delhi NCR", area: "Noida Sector 62",
      price: 6200000, priceLabel: "₹62 L", perSqft: 5167,
      areaSqft: 1200, floor: 7, totalFloors: 18, age: 3,
      furnishing: "Semi Furnished", facing: "North",
      builder: "Mahagun Developers", possession: "Ready to Move",
      rating: 4.1, reviews: 47, premium: false, verified: true, isNew: false,
      amenities: ["parking", "gym", "security", "lift", "garden"],
      image: "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800&q=80",
      lat: 28.627, lng: 77.375,
      description: "Well-designed 2 BHK in one of Noida's most connected sectors. Easy metro access, proximity to major IT companies and shopping malls. Ideal for first-time homebuyers.",
      contact: "+91 98765 43221", emi: 44300,
      tags: ["Metro Nearby", "RERA Approved"]
    }
  ],

  cities: [
    { name: "Pune", emoji: "🏙️", count: 12400, avgPrice: "₹72L", growth: "+12% YoY" },
    { name: "Mumbai", emoji: "🌊", count: 18900, avgPrice: "₹1.8Cr", growth: "+8% YoY" },
    { name: "Bangalore", emoji: "🌿", count: 15200, avgPrice: "₹85L", growth: "+15% YoY" },
    { name: "Hyderabad", emoji: "💎", count: 9800, avgPrice: "₹68L", growth: "+18% YoY" },
    { name: "Delhi NCR", emoji: "🏛️", count: 22100, avgPrice: "₹95L", growth: "+7% YoY" },
    { name: "Chennai", emoji: "🌴", count: 7600, avgPrice: "₹58L", growth: "+9% YoY" },
    { name: "Kolkata", emoji: "🎭", count: 5400, avgPrice: "₹45L", growth: "+6% YoY" },
    { name: "Ahmedabad", emoji: "🦁", count: 8200, avgPrice: "₹52L", growth: "+11% YoY" }
  ],

  testimonials: [
    {
      text: "NestFinder helped us find our dream home in just 3 weeks! The AI price predictor was spot-on and saved us from overpaying. The virtual tour feature was a game-changer.",
      name: "Priya Sharma", meta: "Bought 3 BHK in Koregaon Park, Pune", avatar: "🏠", stars: 5
    },
    {
      text: "Sold my apartment 40% faster than the traditional route. The verified buyer leads were genuine and the process was completely transparent. Highly recommend!",
      name: "Rahul Mehta", meta: "Sold 2 BHK in Whitefield, Bangalore", avatar: "🏡", stars: 5
    },
    {
      text: "The ROI calculator convinced me to invest in Hyderabad instead of Pune. Best decision ever — my property has already appreciated 22% in 18 months!",
      name: "Sneha Reddy", meta: "Investor, Gachibowli, Hyderabad", avatar: "📈", stars: 5
    },
    {
      text: "As an NRI, buying property in India seemed daunting. NestFinder's video consultation and documentation support made it completely seamless from Dubai.",
      name: "Vikram Singh", meta: "NRI Buyer, Jubilee Hills, Hyderabad", avatar: "✈️", stars: 5
    },
    {
      text: "The comparison feature let me evaluate 3 properties side by side. Clear data, honest ratings, no hidden charges. Found the perfect 2 BHK under budget.",
      name: "Ananya Patel", meta: "Bought Studio in Viman Nagar, Pune", avatar: "🎯", stars: 4
    },
    {
      text: "From property search to home loan pre-approval — everything in one place. The EMI calculator with live bank rates is incredibly useful. 10/10 platform!",
      name: "Arjun Nair", meta: "First-time Buyer, Noida", avatar: "🔑", stars: 5
    }
  ],

  priceHistory: {
    Pune: [55, 58, 60, 62, 65, 68, 71, 73, 72, 75, 79, 82],
    Mumbai: [140, 145, 148, 152, 158, 162, 165, 168, 172, 178, 182, 188],
    Bangalore: [62, 65, 67, 70, 74, 78, 82, 85, 88, 92, 97, 102],
    Hyderabad: [48, 50, 52, 55, 58, 62, 65, 68, 71, 74, 78, 82]
  }
};

// ── CONTROLLER LAYER (API Simulation) ──────────
const PropertyController = {

  getAll() { return [...DB.properties]; },

  getById(id) { return DB.properties.find(p => p.id === id); },

  getFeatured() { return DB.properties.filter(p => p.premium).slice(0, 5); },

  getRecent() { return [...DB.properties].sort((a,b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)); },

  search({ location, type, budget, bhk, listingType }) {
    let results = [...DB.properties];
    if (location) {
      const q = location.toLowerCase();
      results = results.filter(p =>
        p.city.toLowerCase().includes(q) ||
        p.area.toLowerCase().includes(q) ||
        p.title.toLowerCase().includes(q)
      );
    }
    if (type && type !== '') results = results.filter(p => p.type === type);
    if (bhk && bhk !== '') results = results.filter(p => p.bhk === parseInt(bhk) || (bhk === '4+' && p.bhk >= 4));
    if (budget && budget !== '') {
      const [min, max] = budget.split('-').map(v => v === '+' ? Infinity : parseInt(v));
      if (!isNaN(min)) results = results.filter(p => p.price >= min);
      if (max !== Infinity && !isNaN(max)) results = results.filter(p => p.price <= max);
    }
    if (listingType) results = results.filter(p => p.listingType === listingType);
    return results;
  },

  filter({ types, minPrice, maxPrice, bhk, city, amenities, furnishing, sort }) {
    let results = [...DB.properties];
    if (types && types.length) results = results.filter(p => types.includes(p.type));
    if (minPrice != null) results = results.filter(p => p.price >= minPrice);
    if (maxPrice != null) results = results.filter(p => p.price <= maxPrice);
    if (bhk && bhk !== 'all') {
      if (bhk === '4+') results = results.filter(p => p.bhk >= 4);
      else results = results.filter(p => p.bhk === parseInt(bhk));
    }
    if (city) results = results.filter(p => p.city === city);
    if (amenities && amenities.length) results = results.filter(p => amenities.every(a => p.amenities.includes(a)));
    if (furnishing && furnishing.length) results = results.filter(p => furnishing.includes(p.furnishing));
    if (sort === 'price-asc') results.sort((a,b) => a.price - b.price);
    else if (sort === 'price-desc') results.sort((a,b) => b.price - a.price);
    else if (sort === 'area-asc') results.sort((a,b) => a.areaSqft - b.areaSqft);
    else if (sort === 'rating') results.sort((a,b) => b.rating - a.rating);
    else results.sort((a,b) => (b.isNew ? 1:0) - (a.isNew ? 1:0));
    return results;
  },

  paginate(items, page = 1, perPage = 8) {
    const total = items.length;
    const pages = Math.ceil(total / perPage);
    const start = (page - 1) * perPage;
    return { items: items.slice(start, start + perPage), total, pages, page };
  }
};

// ── SERVICE LAYER ──────────────────────────────
const EMIService = {
  calculate(principal, ratePercent, tenureYears) {
    const r = ratePercent / 12 / 100;
    const n = tenureYears * 12;
    if (r === 0) return { emi: principal / n, total: principal, interest: 0 };
    const emi = principal * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
    const total = emi * n;
    return { emi: Math.round(emi), total: Math.round(total), interest: Math.round(total - principal) };
  }
};

const ROIService = {
  calculate(price, growthRatePercent, years, monthlyRent) {
    const fv = price * Math.pow(1 + growthRatePercent / 100, years);
    const totalRental = monthlyRent * 12 * years;
    const capitalGain = fv - price;
    const totalReturns = capitalGain + totalRental;
    return {
      futureValue: Math.round(fv),
      totalRental: Math.round(totalRental),
      capitalGain: Math.round(capitalGain),
      totalReturns: Math.round(totalReturns)
    };
  }
};

const PricePredictor = {
  predict(city, areaSqft, bhk, floor, age) {
    const basePrices = { Pune: 7000, Mumbai: 22000, Bangalore: 8500, Hyderabad: 7500, "Delhi NCR": 8000 };
    const base = basePrices[city] || 7000;
    let price = base * areaSqft;
    const bhkMap = { "1 BHK": 0.9, "2 BHK": 1.0, "3 BHK": 1.1, "4+ BHK": 1.2 };
    price *= (bhkMap[bhk] || 1);
    if (floor > 10) price *= 1.08;
    else if (floor > 5) price *= 1.04;
    price *= Math.max(0.75, 1 - age * 0.015);
    const low = Math.round(price * 0.92);
    const high = Math.round(price * 1.08);
    return { low, high, mid: Math.round(price), confidence: 87 + Math.floor(Math.random() * 9) };
  }
};

const FormatService = {
  price(val) {
    if (val >= 10000000) return '₹' + (val / 10000000).toFixed(2) + ' Cr';
    if (val >= 100000) return '₹' + (val / 100000).toFixed(1) + ' L';
    if (val >= 1000) return '₹' + (val / 1000).toFixed(1) + 'K';
    return '₹' + val.toLocaleString('en-IN');
  },
  number(n) { return n.toLocaleString('en-IN'); }
};
