// ============================================================
// SUPABASE CONFIGURATION
// ============================================================

const SUPABASE_URL = 'https://bjryicnxhaapteifmzav.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJqcnlpY254aGFhcHRlaWZtemF2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk1MTI5ODQsImV4cCI6MjA4NTA4ODk4NH0.RofWDTRDhl1D4_7BXY51BOcoQP5W-bTgC8sBVeeQcKw';

// Supabase client - will be initialized after library loads
let supabaseClient = null;

// ============================================================
// CONFIGURATION
// ============================================================

const CONFIG = {
  STORAGE_KEYS: {
    JOBS: 'istex_jobs',
    AGENTS: 'istex_agents',
    SCHEDULE_NOTES: 'istex_schedule_notes',
    SCHEDULE_EXTRA_JOBS: 'istex_schedule_extra_jobs',
    LANG: 'istex_lang',
    RESOURCE_LIBRARY: 'istex_resource_library',
    QUOTES: 'istex_quotes',
    STORAGE: 'istex_storage'
  },
  
  // Booking types - determines workflow and customer relationship
  BOOKING_TYPES: ['Door to Door', 'Door to Port', 'Port to Door'],
  
  // Client types - affects documentation requirements and consignment instructions
  CLIENT_TYPES: ['Private', 'Corporate', 'Diplomatic'],
  
  // Agent/Broker types - for filtering in Agents tab
  AGENT_TYPES: ['Agent', 'Customs Broker', 'Sea Freight Broker', 'Air Freight Broker'],
  
  // Quote statuses
  QUOTE_STATUSES: ['Draft', 'Sent', 'Approved', 'Rejected', 'Expired'],
  
  // Storage statuses
  STORAGE_STATUSES: ['Active', 'Closed'],
  
  // All 193 UN Member Countries with translations
  COUNTRIES: [
    { en: "Afghanistan", tr: "Afganistan" },
    { en: "Albania", tr: "Arnavutluk" },
    { en: "Algeria", tr: "Cezayir" },
    { en: "Andorra", tr: "Andorra" },
    { en: "Angola", tr: "Angola" },
    { en: "Antigua and Barbuda", tr: "Antigua ve Barbuda" },
    { en: "Argentina", tr: "Arjantin" },
    { en: "Armenia", tr: "Ermenistan" },
    { en: "Australia", tr: "Avustralya" },
    { en: "Austria", tr: "Avusturya" },
    { en: "Azerbaijan", tr: "Azerbaycan" },
    { en: "Bahamas", tr: "Bahamalar" },
    { en: "Bahrain", tr: "Bahreyn" },
    { en: "Bangladesh", tr: "Bangladeş" },
    { en: "Barbados", tr: "Barbados" },
    { en: "Belarus", tr: "Belarus" },
    { en: "Belgium", tr: "Belçika" },
    { en: "Belize", tr: "Belize" },
    { en: "Benin", tr: "Benin" },
    { en: "Bhutan", tr: "Butan" },
    { en: "Bolivia", tr: "Bolivya" },
    { en: "Bosnia and Herzegovina", tr: "Bosna Hersek" },
    { en: "Botswana", tr: "Botsvana" },
    { en: "Brazil", tr: "Brezilya" },
    { en: "Brunei", tr: "Brunei" },
    { en: "Bulgaria", tr: "Bulgaristan" },
    { en: "Burkina Faso", tr: "Burkina Faso" },
    { en: "Burundi", tr: "Burundi" },
    { en: "Cabo Verde", tr: "Cabo Verde" },
    { en: "Cambodia", tr: "Kamboçya" },
    { en: "Cameroon", tr: "Kamerun" },
    { en: "Canada", tr: "Kanada" },
    { en: "Central African Republic", tr: "Orta Afrika Cumhuriyeti" },
    { en: "Chad", tr: "Çad" },
    { en: "Chile", tr: "Şili" },
    { en: "China", tr: "Çin" },
    { en: "Colombia", tr: "Kolombiya" },
    { en: "Comoros", tr: "Komorlar" },
    { en: "Congo (Democratic Republic)", tr: "Kongo (Demokratik Cumhuriyeti)" },
    { en: "Congo (Republic)", tr: "Kongo (Cumhuriyeti)" },
    { en: "Costa Rica", tr: "Kosta Rika" },
    { en: "Côte d'Ivoire", tr: "Fildişi Sahili" },
    { en: "Croatia", tr: "Hırvatistan" },
    { en: "Cuba", tr: "Küba" },
    { en: "Cyprus", tr: "Kıbrıs" },
    { en: "Czech Republic", tr: "Çekya" },
    { en: "Denmark", tr: "Danimarka" },
    { en: "Djibouti", tr: "Cibuti" },
    { en: "Dominica", tr: "Dominika" },
    { en: "Dominican Republic", tr: "Dominik Cumhuriyeti" },
    { en: "Ecuador", tr: "Ekvador" },
    { en: "Egypt", tr: "Mısır" },
    { en: "El Salvador", tr: "El Salvador" },
    { en: "Equatorial Guinea", tr: "Ekvator Ginesi" },
    { en: "Eritrea", tr: "Eritre" },
    { en: "Estonia", tr: "Estonya" },
    { en: "Eswatini", tr: "Esvatini" },
    { en: "Ethiopia", tr: "Etiyopya" },
    { en: "Fiji", tr: "Fiji" },
    { en: "Finland", tr: "Finlandiya" },
    { en: "France", tr: "Fransa" },
    { en: "Gabon", tr: "Gabon" },
    { en: "Gambia", tr: "Gambiya" },
    { en: "Georgia", tr: "Gürcistan" },
    { en: "Germany", tr: "Almanya" },
    { en: "Ghana", tr: "Gana" },
    { en: "Greece", tr: "Yunanistan" },
    { en: "Grenada", tr: "Grenada" },
    { en: "Guatemala", tr: "Guatemala" },
    { en: "Guinea", tr: "Gine" },
    { en: "Guinea-Bissau", tr: "Gine-Bissau" },
    { en: "Guyana", tr: "Guyana" },
    { en: "Haiti", tr: "Haiti" },
    { en: "Honduras", tr: "Honduras" },
    { en: "Hungary", tr: "Macaristan" },
    { en: "Iceland", tr: "İzlanda" },
    { en: "India", tr: "Hindistan" },
    { en: "Indonesia", tr: "Endonezya" },
    { en: "Iran", tr: "İran" },
    { en: "Iraq", tr: "Irak" },
    { en: "Ireland", tr: "İrlanda" },
    { en: "Israel", tr: "İsrail" },
    { en: "Italy", tr: "İtalya" },
    { en: "Jamaica", tr: "Jamaika" },
    { en: "Japan", tr: "Japonya" },
    { en: "Jordan", tr: "Ürdün" },
    { en: "Kazakhstan", tr: "Kazakistan" },
    { en: "Kenya", tr: "Kenya" },
    { en: "Kiribati", tr: "Kiribati" },
    { en: "Korea (North)", tr: "Kuzey Kore" },
    { en: "Korea (South)", tr: "Güney Kore" },
    { en: "Kuwait", tr: "Kuveyt" },
    { en: "Kyrgyzstan", tr: "Kırgızistan" },
    { en: "Laos", tr: "Laos" },
    { en: "Latvia", tr: "Letonya" },
    { en: "Lebanon", tr: "Lübnan" },
    { en: "Lesotho", tr: "Lesotho" },
    { en: "Liberia", tr: "Liberya" },
    { en: "Libya", tr: "Libya" },
    { en: "Liechtenstein", tr: "Lihtenştayn" },
    { en: "Lithuania", tr: "Litvanya" },
    { en: "Luxembourg", tr: "Lüksemburg" },
    { en: "Madagascar", tr: "Madagaskar" },
    { en: "Malawi", tr: "Malavi" },
    { en: "Malaysia", tr: "Malezya" },
    { en: "Maldives", tr: "Maldivler" },
    { en: "Mali", tr: "Mali" },
    { en: "Malta", tr: "Malta" },
    { en: "Marshall Islands", tr: "Marshall Adaları" },
    { en: "Mauritania", tr: "Moritanya" },
    { en: "Mauritius", tr: "Mauritius" },
    { en: "Mexico", tr: "Meksika" },
    { en: "Micronesia", tr: "Mikronezya" },
    { en: "Moldova", tr: "Moldova" },
    { en: "Monaco", tr: "Monako" },
    { en: "Mongolia", tr: "Moğolistan" },
    { en: "Montenegro", tr: "Karadağ" },
    { en: "Morocco", tr: "Fas" },
    { en: "Mozambique", tr: "Mozambik" },
    { en: "Myanmar", tr: "Myanmar" },
    { en: "Namibia", tr: "Namibya" },
    { en: "Nauru", tr: "Nauru" },
    { en: "Nepal", tr: "Nepal" },
    { en: "Netherlands", tr: "Hollanda" },
    { en: "New Zealand", tr: "Yeni Zelanda" },
    { en: "Nicaragua", tr: "Nikaragua" },
    { en: "Niger", tr: "Nijer" },
    { en: "Nigeria", tr: "Nijerya" },
    { en: "North Macedonia", tr: "Kuzey Makedonya" },
    { en: "Norway", tr: "Norveç" },
    { en: "Oman", tr: "Umman" },
    { en: "Pakistan", tr: "Pakistan" },
    { en: "Palau", tr: "Palau" },
    { en: "Panama", tr: "Panama" },
    { en: "Papua New Guinea", tr: "Papua Yeni Gine" },
    { en: "Paraguay", tr: "Paraguay" },
    { en: "Peru", tr: "Peru" },
    { en: "Philippines", tr: "Filipinler" },
    { en: "Poland", tr: "Polonya" },
    { en: "Portugal", tr: "Portekiz" },
    { en: "Qatar", tr: "Katar" },
    { en: "Romania", tr: "Romanya" },
    { en: "Russia", tr: "Rusya" },
    { en: "Rwanda", tr: "Ruanda" },
    { en: "Saint Kitts and Nevis", tr: "Saint Kitts ve Nevis" },
    { en: "Saint Lucia", tr: "Saint Lucia" },
    { en: "Saint Vincent and the Grenadines", tr: "Saint Vincent ve Grenadinler" },
    { en: "Samoa", tr: "Samoa" },
    { en: "San Marino", tr: "San Marino" },
    { en: "Sao Tome and Principe", tr: "São Tomé ve Príncipe" },
    { en: "Saudi Arabia", tr: "Suudi Arabistan" },
    { en: "Senegal", tr: "Senegal" },
    { en: "Serbia", tr: "Sırbistan" },
    { en: "Seychelles", tr: "Seyşeller" },
    { en: "Sierra Leone", tr: "Sierra Leone" },
    { en: "Singapore", tr: "Singapur" },
    { en: "Slovakia", tr: "Slovakya" },
    { en: "Slovenia", tr: "Slovenya" },
    { en: "Solomon Islands", tr: "Solomon Adaları" },
    { en: "Somalia", tr: "Somali" },
    { en: "South Africa", tr: "Güney Afrika" },
    { en: "South Sudan", tr: "Güney Sudan" },
    { en: "Spain", tr: "İspanya" },
    { en: "Sri Lanka", tr: "Sri Lanka" },
    { en: "Sudan", tr: "Sudan" },
    { en: "Suriname", tr: "Surinam" },
    { en: "Sweden", tr: "İsveç" },
    { en: "Switzerland", tr: "İsviçre" },
    { en: "Syria", tr: "Suriye" },
    { en: "Tajikistan", tr: "Tacikistan" },
    { en: "Tanzania", tr: "Tanzanya" },
    { en: "Thailand", tr: "Tayland" },
    { en: "Timor-Leste", tr: "Doğu Timor" },
    { en: "Togo", tr: "Togo" },
    { en: "Tonga", tr: "Tonga" },
    { en: "Trinidad and Tobago", tr: "Trinidad ve Tobago" },
    { en: "Tunisia", tr: "Tunus" },
    { en: "Turkey", tr: "Türkiye" },
    { en: "Turkmenistan", tr: "Türkmenistan" },
    { en: "Tuvalu", tr: "Tuvalu" },
    { en: "Uganda", tr: "Uganda" },
    { en: "Ukraine", tr: "Ukrayna" },
    { en: "United Arab Emirates", tr: "Birleşik Arap Emirlikleri" },
    { en: "United Kingdom", tr: "Birleşik Krallık" },
    { en: "United States", tr: "Amerika Birleşik Devletleri" },
    { en: "Uruguay", tr: "Uruguay" },
    { en: "Uzbekistan", tr: "Özbekistan" },
    { en: "Vanuatu", tr: "Vanuatu" },
    { en: "Vatican City", tr: "Vatikan" },
    { en: "Venezuela", tr: "Venezuela" },
    { en: "Vietnam", tr: "Vietnam" },
    { en: "Yemen", tr: "Yemen" },
    { en: "Zambia", tr: "Zambiya" },
    { en: "Zimbabwe", tr: "Zimbabve" }
  ],

  // Helper to get country name in current language
  getCountryName(country) {
    if (typeof country === 'string') {
      // If it's a string, find the matching country object
      const found = this.COUNTRIES.find(c => c.en === country || c.tr === country);
      if (found) return State.lang === 'tr' ? found.tr : found.en;
      return country; // Return as-is if not found
    }
    if (country && typeof country === 'object') {
      return State.lang === 'tr' ? country.tr : country.en;
    }
    return '';
  },
  
  // Helper to get BOTH language versions of country name (for search)
  getCountryNameBilingual(country) {
    if (typeof country === 'string') {
      const found = this.COUNTRIES.find(c => c.en === country || c.tr === country);
      if (found) return `${found.en} ${found.tr}`;
      return country;
    }
    if (country && typeof country === 'object') {
      return `${country.en} ${country.tr}`;
    }
    return '';
  },

  // Get sorted country list for dropdowns
  getCountryList() {
    return this.COUNTRIES
      .map(c => ({ value: c.en, label: State.lang === 'tr' ? c.tr : c.en }))
      .sort((a, b) => a.label.localeCompare(b.label, State.lang === 'tr' ? 'tr' : 'en'));
  },

  CHECKLIST_TEMPLATES: {
    IMPORT: ["Quote sent","Passport copy with entry stamp","Copy of resident permit","Signed personal application (Dilekçe)","Power of Attorney (Vekaletname)","Company application (Şirket yazısı)","Signed packing list","Inventory list received","Turkish tax ID or foreign citizen number","Lease contract","List of all entry/exit in Turkey during the last 2 years","Insurance documents","Customs forms completed","In transit to Turkey","Arrived at port/terminal","Delivered to warehouse","Delivered to residence","Proof of Delivery (POD) signed","Payment received"],
    EXPORT: ["Quote sent","Survey done","Packing complete","In storage","Copy of passport","Flight ticket","Signed personal application (Dilekçe)","Power of Attorney (Vekaletname)","Company application","Signed packing list","Inventory list received","Copy of work/residence permit","Insurance documents","Customs forms completed","In transit to destination","Delivered","Proof of Delivery (POD) signed","Payment received"],
    LOCAL: ["Quote sent","Survey done","Packing complete","In storage or N/A","Inventory list received","In transit to destination address","Delivered","Proof of Delivery (POD) signed","Payment received"]
  },

  STEP_DEFINITIONS: {
    packing: { label: "Packing", fields: ["date","time","personnel","vehicle","address","notes"], autoFillAddress: "origin" },
    survey: { label: "Survey", fields: ["date","time","personnel","vehicle","address","estimatedVolume","notes"], autoFillAddress: "origin" },
    delivery_to_residence: { label: "Delivery to Residence", fields: ["date","time","personnel","vehicle","address","notes"], autoFillAddress: "destination" },
    container_delivery: { label: "Container Delivery", fields: ["date","time","personnel","vehicle","portDetails","notes"] },
    container_pickup: { label: "Container Pickup", fields: ["date","time","personnel","vehicle","portDetails","notes"] },
    container_unloading: { label: "Container Unloading", fields: ["date","time","personnel","vehicle","notes"] },
    container_loading: { label: "Container Loading", fields: ["date","time","personnel","vehicle","notes"] },
    air_cargo_packing: { label: "Air Cargo Packing", fields: ["date","time","personnel","vehicle","address","notes"], autoFillAddress: "origin" },
    air_cargo_delivery_to_address: { label: "Air Cargo Delivery to Address", fields: ["date","time","personnel","vehicle","pickupAirport","deliveryAddress","notes"], autoFillDeliveryAddress: "destination" },
    air_cargo_delivery_to_airport: { label: "Air Cargo Delivery to Airport", fields: ["date","time","personnel","vehicle","deliveryAirport","pickupAddress","notes"], autoFillPickupAddress: "origin" }
  },

  // include Custom so user can type a manual task name
  EXTRA_JOB_TYPES: [
    "Custom",
    "Packing","Survey","Delivery to Residence","Container Delivery","Container Pickup","Container Unloading","Container Loading",
    "Air Cargo Packing","Air Cargo Delivery to Address","Air Cargo Delivery to Airport",
    "Delivery to Port","Pickup from Port","Air Cargo Pickup","Air Cargo Delivery","Warehouse Cleaning","Truck Preparation",
    "Vehicle Delivery","Vehicle Pickup"
  ],

  // Offices list for filtering/exporting/assignment
  OFFICES: ["Istanbul", "Ankara", "Adana", "Izmir"],

  // Storage warehouse locations
  STORAGE_LOCATIONS: [
    { id: 'istanbul_esenler', name: 'Istanbul (Esenler)' },
    { id: 'ankara', name: 'Ankara' },
    { id: 'izmir_bornova', name: 'Izmir (Bornova)' },
    { id: 'adana', name: 'Adana' }
  ],

  // Storage billing types
  STORAGE_BILLING_TYPES: ['Per CBM', 'Flat Rate'],
  
  // Storage billing periods
  STORAGE_BILLING_PERIODS: ['Monthly', 'Daily'],
  
  // Storage inventory item types
  STORAGE_INVENTORY_TYPES: ['HHE', 'Auto'],

  // Currencies
  CURRENCIES: ['TRY', 'USD', 'EUR']
};

const DEFAULT_RESOURCE_LIBRARY = {
  categories: []
};

//==============================================// QUOTE TEMPLATES // =========================

const QUOTE_TEMPLATES = {
  // ============================================================
  // AGENT TEMPLATES - Detailed breakdown
  // ============================================================
  
  // Agent + Sea + Export - Full details, you handle origin
  'Sea|Export|Agent': {
    chargeCategories: [
      'Origin Services',
      'Local Container Drayage',
      'Export Customs Clearance (billed at actual cost)',
      'Sea Freight from [DEPARTURE_PORT] to [POE]',
      'Destination Terminal Handling (billed at actual cost)',
      'Destination Services'
    ],
    includes: [
      'Full export packing and wrapping at origin residence',
      'Preparation of detailed inventory lists for each separate shipment',
      'Inland haulage from residence to departure port',
      'Origin terminal handling',
      'Export customs clearance formalities and terminal fees',
      'Ocean freight to [POE] port in a [CONTAINER_DETAILS]'
    ],
    conditionalIncludes: {
      'Destination Terminal Handling': ['Destination terminal handling and terminal fees'],
      'Destination Services': [
        'Delivery to address in [DESTINATION]',
        'Full unpacking of boxes to table top, unwrapping of furniture and re-assembly of basic furniture',
        'Removal of debris upon completion'
      ]
    }
  },

  // Agent + Sea + Import - NO freight (origin pays), only destination services
  'Sea|Import|Agent': {
    chargeCategories: [
      'Import Clearance (billed at actual cost)',
      'SS Line Port Agent "Delivery Order" Charge (billed at actual cost)',
      '[POE] Port "Terminal Handling & Bonded Storage" Charges (billed at actual cost)',
      'Destination Services'
    ],
    includes: [
      'Import clearance in arrival port',
      'Delivery up to and including 1st floor residence with normal access within [DESTINATION] city limits',
      'Full unpacking of boxes onto flat surfaces, re-assembly of basic furniture, removal of the debris, and return of empty container to port'
    ],
    conditionalIncludes: {}
  },

  // Agent + Air + Export - Full details with per ACW rate
  'Air|Export|Agent': {
    chargeCategories: [
      'Origin Services',
      'Air Freight',
      'Airwaybill Charge (billed at actual cost)',
      'Export Customs Clearance (billed at actual cost)',
      '[DEPARTURE_AIRPORT] Terminal Handling (billed at actual cost)',
      'Destination Terminal Handling (billed at actual cost)',
      'Destination Services'
    ],
    airFreightPerACW: true,
    includes: [
      'Full export packing and wrapping at origin residence for air freight',
      'Preparation of detailed inventory lists for each separate shipment',
      'Delivery from residence to airline cargo terminal',
      'Origin terminal handling',
      'Export customs clearance formalities and terminal fees',
      'Air freight to [ARRIVAL_AIRPORT]'
    ],
    conditionalIncludes: {
      'Destination Terminal Handling': ['Destination terminal handling and terminal fees'],
      'Destination Services': [
        'Delivery to address in [DESTINATION]',
        'Full unpacking of boxes to table top, unwrapping of furniture and re-assembly of basic furniture',
        'Removal of debris upon completion'
      ]
    }
  },

  // Agent + Air + Import - NO freight (origin pays), only destination services
  'Air|Import|Agent': {
    chargeCategories: [
      'Import Clearance (billed at actual cost)',
      'Delivery Order Charge (billed at actual cost)',
      '[ARRIVAL_AIRPORT] Terminal Handling Charges (billed at actual cost)',
      'Destination Services'
    ],
    includes: [
      'Payment of mandatory airline delivery order and [ARRIVAL_AIRPORT] terminal fees',
      'Turkish import formalities',
      'Inland haulage from airport to a residence in [DESTINATION]',
      'Delivery, unpacking, and removal of the debris upon completion of delivery services'
    ],
    conditionalIncludes: {}
  },

  // Agent + Land + Export
  'Land|Export|Agent': {
    chargeCategories: [
      'Origin Services',
      'Export Customs Clearance (billed at actual cost)',
      'Road Transportation from [ORIGIN] to [DESTINATION]',
      'Destination Services'
    ],
    includes: [
      'Full export packing and wrapping at origin residence',
      'Preparation of detailed inventory lists for each separate shipment',
      'Loading of items to a [TRUCK_TYPE_LOWER] truck',
      'Export customs clearance formalities',
      'Delivery from [ORIGIN] to address/warehouse at [DESTINATION]'
    ],
    conditionalIncludes: {
      'Destination Services': [
        'Full unpacking of boxes to table top, unwrapping of furniture and re-assembly of basic furniture',
        'Removal of debris upon completion'
      ]
    }
  },

  // Agent + Land + Import
  'Land|Import|Agent': {
    chargeCategories: [
      'Road Transport from [ORIGIN] to [DESTINATION]',
      'Import Customs Clearance (billed at actual cost)',
      'Destination Services'
    ],
    includes: [
      'Transport from [ORIGIN] to [DESTINATION]',
      'Receipt of trucks at arrival in land customs in Turkiye',
      'Normal import clearance',
      'Delivery up to and including 2nd floor residence with normal access within [DESTINATION] city limits',
      'Full unpacking, re-assembly of furniture, and removal of the debris'
    ],
    conditionalIncludes: {
      'Origin Services': [
        'Full export packing and wrapping at origin residence',
        'Preparation of detailed inventory lists'
      ]
    }
  },

  // Agent + Land + Local
  'Land|Local|Agent': {
    chargeCategories: [
      'Local Moving Charge'
    ],
    includes: [
      'Packing and wrapping at origin',
      'Local door-to-door transport from address at [ORIGIN] to address at [DESTINATION]',
      'Unpacking and unwrapping at destination',
      'Removal of debris'
    ],
    conditionalIncludes: {}
  },

  // ============================================================
  // CLIENT TEMPLATES - Simplified door-to-door
  // ============================================================
  
  'Sea|Export|Client': {
    chargeCategories: [
      'Origin Services',
      'Sea Freight',
      'Customs and Port Handling Fees (billed at actual cost)',
      'Destination Services'
    ],
    includes: [
      'Professional packing and wrapping at origin residence',
      'Preparation of detailed inventory lists',
      'Local transport to departure port',
      'Export customs clearance',
      'Sea freight from [DEPARTURE_PORT] to [POE]',
      'Import clearance at destination',
      'Delivery and unpacking at destination residence',
      'Removal of packing debris'
    ],
    conditionalIncludes: {}
  },

  'Sea|Import|Client': {
    chargeCategories: [
      'Origin Services',
      'Sea Freight',
      'Customs and Port Handling Fees (billed at actual cost)',
      'Destination Services'
    ],
    includes: [
      'Professional packing and wrapping at origin residence',
      'Local transport to departure port',
      'Sea freight to [POE]',
      'Import clearance in Turkey',
      'Delivery to residence in [DESTINATION]',
      'Unpacking and debris removal'
    ],
    conditionalIncludes: {}
  },

  'Air|Export|Client': {
    chargeCategories: [
      'Origin Services',
      'Air Freight',
      'Customs and Terminal Fees (billed at actual cost)',
      'Destination Services'
    ],
    includes: [
      'Professional packing and wrapping for air transport',
      'Preparation of detailed inventory lists',
      'Local transport to airport',
      'Export customs clearance',
      'Air freight to [ARRIVAL_AIRPORT]',
      'Import clearance at destination',
      'Delivery and unpacking at destination residence',
      'Removal of packing debris'
    ],
    conditionalIncludes: {}
  },

  'Air|Import|Client': {
    chargeCategories: [
      'Origin Services',
      'Air Freight',
      'Customs and Terminal Fees (billed at actual cost)',
      'Destination Services'
    ],
    includes: [
      'Professional packing and wrapping at origin',
      'Transport to departure airport',
      'Air freight to [ARRIVAL_AIRPORT]',
      'Turkish import customs clearance',
      'Delivery to residence in [DESTINATION]',
      'Unpacking and debris removal'
    ],
    conditionalIncludes: {}
  },

  'Land|Export|Client': {
    chargeCategories: [
      'Origin Services',
      'Road Transportation',
      'Customs Fees (billed at actual cost)',
      'Destination Services'
    ],
    includes: [
      'Professional packing and wrapping at origin residence',
      'Preparation of detailed inventory lists',
      'Road transport from [ORIGIN] to [DESTINATION]',
      'Export and import customs clearance',
      'Delivery and unpacking at destination',
      'Removal of packing debris'
    ],
    conditionalIncludes: {}
  },

  'Land|Import|Client': {
    chargeCategories: [
      'Origin Services',
      'Road Transportation',
      'Customs Fees (billed at actual cost)',
      'Destination Services'
    ],
    includes: [
      'Professional packing and wrapping at origin',
      'Road transport from [ORIGIN] to [DESTINATION]',
      'Turkish import customs clearance',
      'Delivery to residence in [DESTINATION]',
      'Unpacking and debris removal'
    ],
    conditionalIncludes: {}
  },

  'Land|Local|Client': {
    chargeCategories: [
      'Moving Services'
    ],
    includes: [
      'Professional packing and wrapping at origin',
      'Door-to-door transport from [ORIGIN] to [DESTINATION]',
      'Unpacking and unwrapping at destination',
      'Removal of debris'
    ],
    conditionalIncludes: {}
  }
};

const ADDITIONAL_CHARGES_CONFIG = {
  Export: [
    'Special crating for high value/extra fragile items',
    'Shuttle service',
    'Long/Stair carry (if pick-up from above 2nd floor and/or if 20-meter carry)',
    'Supply of external lift',
    'Handling of extra heavy appliance/furniture (such as Large freezers, Piano, Safe, Marble)',
    'Additional charges if very narrow stair carry',
    'Moving/Transit Insurance coverage (available upon request)',
    'Turkish customs export extensive inspection order and related handling costs',
    'Electrician, Handyman service or any other 3rd party service',
    'Multiple address pick-up at origin',
    'Storage and warehouse handling charges in our nearest warehouse (if more than 7-day free time offer)',
    'Destination duties, taxes, customs terminal charges, import clearance formalities',
    'Destination port/airport terminal handling and NVOCC fees (if / when applicable)'
  ],
  Export_Sea: [
    'Any changes in sea freight, equipment availability at time of actual booking'
  ],
  Export_Vehicle: [
    'Receipt of AUTO inside warehouse, container loading & lashing',
    'Turkish traffic de-registration (per vehicle)'
  ],
  Import: [
    'Shuttle service during delivery',
    'Parking permit during delivery',
    'Long/Stair carry',
    'Turkish Bandrol tax (for each used imported TV)',
    'Intensive customs inspection and handling fee if ordered by Turkish customs department',
    'Door to door moving insurance coverage (Insurance policy premium charge is 2.2% of total declared value of the effects)'
  ],
  Import_Sea: [
    'Container demurrage charges (due to customs inspection or port congestion)'
  ],
  Import_Vehicle: [
    'Turkish traffic registration (per vehicle)',
    'Car Carrier / Towtruck delivery (per vehicle, per trip)'
  ],
  Local: [
    'Special crating for high value/extra fragile items',
    'Shuttle service',
    'Long/Stair carry (if pick-up from above 2nd floor and/or if 20-meter carry)',
    'Supply of external lift',
    'Handling of extra heavy appliance/furniture (such as Large freezers, Piano, Safe, Marble)',
    'Additional charges if very narrow stair carry',
    'Moving/Transit Insurance coverage (available upon request)',
    'Storage and warehouse handling charges in our nearest warehouse (if more than 7-day free time offer)'
  ]
};

// Consignment Instructions for Import Requirements
const CONSIGNMENT_INSTRUCTIONS = {
  // Office-specific consignee details
  offices: {
    Istanbul: {
      address: `C/O ISTANBUL EKSPRES A.S.
Izzetpasa Mahallesi, Yeniyol Caddesi
Nurol Tower, No:3, Daire:1403
Sisli, Istanbul, Turkiye
Tax ID: OSTIM 4810032912`,
      notify: `ISTANBUL EKSPRES A.S.
T. +90 212 217 49 68 - 69
movers@istanbulekspres.com.tr`
    },
    Adana: {
      address: `C/O ISTANBUL EKSPRES A.S.
Guzel Cumhuriyet Mahallesi
Incirlik Bulvari, No: 324 / 1
Yuregir, Adana, Turkiye
Tax ID: OSTIM 4810032912`,
      notify: `ISTANBUL EKSPRES A.S.
T. +90 322 346 08 11
movers@istanbulekspres.com.tr`
    },
    Izmir: {
      address: `C/O ISTANBUL EKSPRES A.S.
Sair Esref Bulvari
No:48, Kat:7
35210 Alsancak, Konak, Izmir, Turkiye
Tax ID: OSTIM 4810032912`,
      notify: `ISTANBUL EKSPRES A.S.
T. +90 232 489 65 04 - 05
movers@istanbulekspres.com.tr`
    },
    Ankara: {
      address: `C/O ISTANBUL EKSPRES A.S.
Inonu Mahallesi, Bati Bulvari No:83
06370 Yenimahalle, Ankara, Turkiye
Tax ID: OSTIM 4810032912`,
      notify: `ISTANBUL EKSPRES A.S.
T. +90 312 278 29 97
movers@istanbulekspres.com.tr`
    }
  },
  
  // Get consignee template for specific office
  getConsigneeTemplate(office = 'Istanbul') {
    const officeData = this.offices[office] || this.offices.Istanbul;
    return `CONSIGNMENT INSTRUCTION (for express release Bill of Lading):

Consignee:
Full Name of Client (as in passport)
${officeData.address}

Notify:
${officeData.notify}`;
  },

  foreign_national: {
    title: 'IMPORT REQUIREMENTS - FOREIGN NATIONALS',
    description: 'Relocating to Turkey for temporary work/residence purpose should have applied for OR already obtained Turkish Residence/Work Permit and have arranged a Local Property Rental Contract (valid for a minimum term of 12 months) for tax-free importation of used household and personal effects into Turkey.',
    note: 'Client must not have resided in Turkey for more than 180 days (within the last 365 days) at the time of actual import clearance formalities to be eligible for the tax-free importation.',
    documents: [
      'Passport copy',
      'Notarized Power of Attorney (we will supply sample document for the public notary)',
      'Turkish ID number (for foreign nationals)',
      'Property Rental Contract (with a minimum validity of 1 year and notarized by a public notary)',
      'Statement listing border entries/departures to/from Turkey (to be obtained via "e-devlet" website)'
    ]
  },

  returning_turkish: {
    title: 'IMPORT REQUIREMENTS - RETURNING TURKISH NATIONALS',
    description: 'Documents required from returning Turkish nationals (non-diplomat) for tax-free importation of used Household and Personal Effects into Turkey.',
    note: 'Client must not have resided in Turkey for more than 180 days (within the last 365 days) at the time of actual import clearance formalities to be eligible for the tax-free importation.',
    documents: [
      'Deed of a Local Property in Turkey (TAPU) --or-- Local Property Rental Contract in Turkey (KIRA KONTRATI) valid for a minimum term of 12 months and issued in client\'s name (or in his/her legal partner\'s name)',
      'Passport copy',
      'Turkish National Identity No. (TC KIMLIK NO)',
      'Power of Attorney notarized by a Turkish public notary (NOTER TASDIKLI SAHSI VEKALETNAME) -- we will supply client with a sample form',
      'Statement of Turkish border entry/departure list for client for the last 2 years (YURDA GIRIS-CIKIS BELGESI) -- this document can be obtained online from Turkish government\'s "e-devlet" portal',
      'Extract of Turkish Civil Registry Record (VUKUATLI NUFUS KAYIT ORNEGI) -- this document can be obtained online from Turkish government\'s "e-devlet" portal'
    ]
  },

  diplomatic: {
    title: 'IMPORT REQUIREMENTS - FOREIGN NATIONALS (DIPLOMATIC)',
    description: 'Relocating to Turkey for diplomatic duty must obtain "diplomatic franchise" (TAKRIR) for tax-free importation of household and personal effects into Turkey. This application can only be submitted to the Turkish Foreign Ministry upon physical arrival of the container into Turkish port. Diplomatic mission will be in charge to obtain the required "diplomatic franchise" from Turkish Ministry of Foreign Affairs.',
    note: '',
    documents: [
      'Packing list',
      'Power of Attorney (Diplomatic Mission will issue)',
      'Client\'s Passport and Turkish Diplomatic I.D. Card copy',
      'TAKRIR --Diplomatic Franchise-- (Diplomatic Mission will apply to Turkish Ministry of Foreign Affairs for this document)'
    ]
  }
};

// ============================================================
// TURKISH CHECKLIST TRANSLATIONS
// ============================================================

const TR_SYSTEM = {
  // Checklist items (used by TR.checklist for Turkish UI)
  chk_QuoteSent: "Teklif gönderildi",
  chk_MoveReserved: "Taşıma rezerve edildi",
  chk_SurveyDone: "Survey tamamlandı",
  chk_SurveyDoneNA: "Survey - Gerekli değil",
  chk_DocumentsComplete: "Dokümanlar tamamlandı",
  chk_PackingDone: "Paketleme tamamlandı",
  chk_PackingDoneNA: "Paketleme - Gerekli değil",
  chk_InStorage: "Depoda",
  chk_InStorageNA: "Depoda - Gerekli değil",
  chk_EnRoute: "Yolda",
  chk_PaymentReceived: "Ödeme alındı",
  chk_Delivered: "Teslim edildi",
  
  // Import checklist
  chk_PassportCopyWithEntryStamp: "Giriş damgalı pasaport kopyası",
  chk_CopyOfResidentPermit: "Oturma izni kopyası",
  chk_SignedPersonalApplication: "İmzalı kişisel dilekçe",
  chk_PowerOfAttorney: "Vekaletname",
  chk_CompanyApplication: "Şirket başvuru yazısı",
  chk_SignedPackingList: "İmzalı envanter listesi",
  chk_TurkishTaxID: "Türk vergi numarası veya yabancı kimlik numarası",
  chk_LeaseContract: "Kira sözleşmesi",
  chk_EntryExitList: "Son 2 yıl giriş/çıkış listesi",
  chk_InTransitToTurkey: "Türkiye'ye yolda",
  chk_ArrivedAtPort: "Liman/terminale vardı",
  chk_DeliveredToWarehouse: "Depoya teslim edildi",
  chk_DeliveredToResidence: "İkametgaha teslim edildi",
  
  // Export checklist
  chk_PackingComplete: "Paketleme tamamlandı",
  chk_CopyOfPassport: "Pasaport kopyası",
  chk_FlightTicket: "Uçak bileti",
  chk_CopyOfWorkResidencePermit: "Çalışma/oturma izni kopyası",
  chk_InTransitToDestination: "Hedefe yolda",
  chk_InTransitToDestinationAddress: "Hedef adrese yolda",

  // Helper function
  get(key, fallback = '') {
    const value = this[key];
    return (typeof value === 'string' && value.trim()) ? value : (fallback || key);
  }
};

// ============================================================
// TRANSLATION HELPER (Checklist only - other methods migrated to I18n)
// ============================================================

const TR = {
  checklist(text) {
    const raw = String(text || '').trim();
    if (!raw) return '';

    const map = {
      'Quote sent': 'chk_QuoteSent',
      'Move reserved': 'chk_MoveReserved',
      'Survey done': 'chk_SurveyDone',
      'Survey done - N/A': 'chk_SurveyDoneNA',
      'Documents complete': 'chk_DocumentsComplete',
      'Packing done': 'chk_PackingDone',
      'Packing done - N/A': 'chk_PackingDoneNA',
      'In storage': 'chk_InStorage',
      'In storage - N/A': 'chk_InStorageNA',
      'In storage or N/A': 'chk_InStorageNA',
      'En route': 'chk_EnRoute',
      'Payment received': 'chk_PaymentReceived',
      'Delivered': 'chk_Delivered',
      'Passport copy with entry stamp': 'chk_PassportCopyWithEntryStamp',
      'Copy of resident permit': 'chk_CopyOfResidentPermit',
      'Signed personal application (Dilekçe)': 'chk_SignedPersonalApplication',
      'Power of Attorney (Vekaletname)': 'chk_PowerOfAttorney',
      'Company application (Şirket yazısı)': 'chk_CompanyApplication',
      'Company application': 'chk_CompanyApplication',
      'Signed packing list': 'chk_SignedPackingList',
      'Turkish tax ID or foreign citizen number': 'chk_TurkishTaxID',
      'Lease contract': 'chk_LeaseContract',
      'List of all entry/exit in Turkey during the last 2 years': 'chk_EntryExitList',
      'In transit to Turkey': 'chk_InTransitToTurkey',
      'Arrived at port/terminal': 'chk_ArrivedAtPort',
      'Delivered to warehouse': 'chk_DeliveredToWarehouse',
      'Delivered to residence': 'chk_DeliveredToResidence',
      'Packing complete': 'chk_PackingComplete',
      'Copy of passport': 'chk_CopyOfPassport',
      'Flight ticket': 'chk_FlightTicket',
      'Copy of work/residence permit': 'chk_CopyOfWorkResidencePermit',
      'In transit to destination': 'chk_InTransitToDestination',
      'In transit to destination address': 'chk_InTransitToDestinationAddress'
    };

    const key = map[raw];
    return key ? TR_SYSTEM.get(key, raw) : raw;
  }
};
// ============================================================
// i18n (Turkish UI toggle)
// ============================================================

const I18n = {
  dict: {
    en: {
      langShort: 'EN',
      dashboard: 'Dashboard',
      moves: 'Moves',
      movesTitle: 'Moves',
      agents: 'Agents',
      schedule: 'Schedule',
      storage: 'Storage',
      documents: 'Documents',
      quotes: 'Quotes',
      // Storage translations
      storageTitle: 'Storage',
      activeStorage: 'Active Storage',
      activeStorageDesc: 'Items currently in storage or partially retrieved',
      completedStorage: 'Completed Storage',
      completedStorageDesc: 'Fully retrieved items',
      noActiveStorage: 'No items currently in storage.',
      noStorageRecords: 'No storage records match this filter.',
      storageRecords: 'Storage Records',
      noCompletedStorage: 'No completed storage records.',
      allLocations: 'All Locations',
      allStatuses: 'All Statuses',
      statusActive: 'Active',
      statusClosed: 'Closed',
      storageDetails: 'Storage Details',
      storageDetailsTitle: 'Storage Details',
      hintSelectStorage: 'Select a storage record from the left to see details here.',
      editStorage: 'Edit',
      btnAddStorage: 'Add Storage',
      btnEditStorage: 'Edit Storage',
      modalAddStorageTitle: 'Add Storage',
      modalEditStorageTitle: 'Edit Storage',
      storageLocation: 'Storage Location',
      selectLocation: 'Select location',
      noLinkedJob: 'No linked job (standalone storage)',
      clientNamePlaceholder: 'Enter client name',
      additionalNotesPlaceholder: 'Additional notes about this storage...',
      storageContents: 'Storage Contents',
      storageCode: 'Storage Code',
      entryDate: 'Entry Date',
      exitDate: 'Exit Date',
      daysInStorage: 'Days in Storage',
      billingInfo: 'Billing Information',
      billingType: 'Billing Type',
      rate: 'Rate',
      currency: 'Currency',
      freeDays: 'Free Days',
      billableDays: 'Billable Days',
      billingNotes: 'Billing Notes',
      storageInventory: 'Storage Inventory',
      addItem: 'Add Item',
      noInventoryItems: 'No inventory items added yet.',
      enterItemDescription: 'Enter item description:',
      enterQuantity: 'Enter quantity:',
      enterCBM: 'Enter CBM (optional):',
      retrieve: 'Retrieve',
      confirmDeleteItem: 'Are you sure you want to delete this item?',
      confirmDeleteStorage: 'Are you sure you want to delete this storage record?',
      storageLabel: 'Storage',
      storageYes: 'This move requires storage',
      viewStorage: 'View in Storage Tab',
      clientInfo: 'Client Information',
      clientName: 'Client Name',
      organization: 'Organization',
      organizationLabel: 'Organization (optional)',
      clientNameLabel: 'Client Name',
      linkedJob: 'Linked Job',
      linkedJobOptional: 'Linked Job (Optional)',
      linkedJobHint: 'Link to an existing job or leave empty for standalone storage',
      moveTypeLabel: 'Move Type',
      statusRequiredLabel: 'Status (required)',
      originAgentLabel: 'Origin Agent (at least one of Origin/Destination required)',
      destinationAgentLabel: 'Destination Agent (at least one of Origin/Destination required)',
      agentNameLabel: 'Name',
      cityLabel: 'City',
      countryLabel: 'Country',
      membershipsLabel: 'Memberships',
      storageCodeLabel: 'Storage Code',
      storageContentsLabel: 'Storage Contents',
      hheLabel: 'HHE (Household Effects)',
      autoLabel: 'Auto (Vehicle)',
      billingTypeLabel: 'Billing Type',
      perCBM: 'Per CBM',
      flatRateOption: 'Flat Rate',
      ratePerCBMLabel: 'Rate per CBM',
      freeDaysLabel: 'Free Days',
      billingNotesLabel: 'Billing Notes',
      billingNotesPlaceholderText: 'Additional billing notes...',
      orgPlaceholder: 'Enter organization name (optional)',
      btnSaveAgent: 'Save Agent',
      btnSaveStorage: 'Save Storage',
      locationContents: 'Location & Contents',
      location: 'Location',
      grossWeight: 'Gross Weight',
      grossWeightOptional: 'Gross Weight (kg) - optional',
      dates: 'Dates',
      inventoryStatus: 'Inventory Status',
      estimatedCost: 'Estimated Cost',
      totalCost: 'Total Cost',
      statusNotes: 'Status & Notes',
      searchStoragePlaceholder: 'Search by code, client, location...',
      jobCode: 'Job Code',
      client: 'Client',
      contents: 'Contents',
      totalCBM: 'Total CBM',
      ratePerCBM: 'Rate per CBM',
      flatRate: 'Flat Rate',
      monthly: 'Month',
      daily: 'Day',
      billingNotesPlaceholder: 'Special arrangements, discounts, etc.',
      addInventoryItem: 'Add Inventory Item',
      itemDescription: 'Item Description',
      itemDescriptionPlaceholder: 'e.g. Sofa, Box #12, Kitchen items...',
      quantity: 'Quantity',
      itemCBM: 'CBM',
      itemNotes: 'Notes',
      itemNotesPlaceholder: 'Optional notes about this item',
      save: 'Save',
      cancel: 'Cancel',
      delete: 'Delete',
      add: 'Add',
      movesByStatus: 'Moves by Status',
      movesByType: 'Moves by Type',
      paymentStatus: 'Payment Status',
      movesThisMonth: 'Moves This Month',
      activeMovesLabel: 'Active Moves',
      scheduledThisMonth: 'With Activity',
      upcomingJobs: 'UPCOMING JOBS (3 DAYS)',
      upcomingSchedule: 'UPCOMING SCHEDULE (14 DAYS)',
      overdueItems: 'OVERDUE ITEMS',
      unpaidMoves: 'UNPAID MOVES',
      noUpcomingJobs: 'No jobs scheduled in the next 3 days.',
      noUpcomingItems: 'No upcoming scheduled items.',
      noOverdueItems: 'No overdue items.',
      noUnpaidMoves: 'All moves are paid.',
      task: 'task',
      tasks: 'tasks',
      total: 'Total',
      addNewMove: 'Add New Move',
      editMove: 'Edit Move',
      moveDetails: 'Move Details',
      moveAgents: 'Move Agents',
      checklist: 'Checklist',
      notes: 'Notes',
      addChecklistItems: 'Add Checklist Items',
      customChecklist: 'Custom Checklist (one item per line)',
      addNote: 'Add Note',
      addDocument: 'Add Document',
      documentsGlobal: 'Documents',
      documentsSearchTab: 'Documents Search',
      resourceLibraryTab: 'Resource Library',
      officeAll: 'All',
      officeIstanbul: 'Istanbul',
      officeAnkara: 'Ankara',
      officeIzmir: 'Izmir',
      officeAdana: 'Adana',
      searchMovesPh: 'Search by move ID, client, origin, destination, agent...',
      searchAgentsPh: 'Search agents by name, city, country...',
      searchDocsPh: 'Search by job ID, client, document name, agent...',
      allMoves: 'All moves',
      all: 'All',
      planned: 'Planned',
      ongoing: 'Ongoing',
      completed: 'Completed',
      cancelled: 'Cancelled',
      allTypes: 'All types',
      importType: 'Import',
      exportType: 'Export',
      localType: 'Local',
      allPayments: 'All payments',
      paid: 'Paid',
      unpaid: 'Unpaid',
      noMovesMatch: 'No moves match this view.',
      selectMoveDetails: 'Select a move from the left to see details here.',
      agentsForMoveHere: 'Agents for this move will appear here.',
      noChecklistYet: 'No checklist yet.',
      noNotesYet: 'No notes yet.',
      noDocumentsYet: 'No documents yet.',
      noMediaYet: 'No photos or videos yet.',
      noAgentsYet: 'No agents yet.',
      noBrokersYet: 'No brokers yet.',
      createNewMove: 'Create New Move',
      saveMove: 'Save Move',
      cancel: 'Cancel',
      statusRequired: 'Status is required.',
      selectOneAgent: 'Please select at least one agent.',
      documentNameRequired: 'Document name is required.',
      exportedOk: 'Exported successfully.',
      exportFailed: 'Export failed.',
      importPromptEmpty: 'Please paste JSON to import.',
      importConfirm: 'This will replace all current data. Continue?',
      importOk: 'Import successful.',
      invalidJson: 'Invalid JSON: ',
      scheduleDayDetailsHint: 'Select a day in the calendar to see scheduled steps and extra jobs.',
      dayDetails: 'Day Details',
      extraJobs: 'Additional Jobs',
      dayNotes: 'Day Notes',
      noScheduledSteps: 'No scheduled steps for this day.',
      openMove: 'Open Move',
      edit: 'Edit',
      save: 'Save',
      delete: 'Delete',
      download: 'Download',
      openLink: 'Open Link',
      addJob: 'Add Job',
      noExtraJobs: 'No additional jobs for this day.',
      addNoteBtn: 'Add Note',
      stepSaved: 'Saved.',
      updatePaymentStatus: 'Update payment status:',
      yes: 'Yes',
      no: 'No',
      moveSteps: 'Move Steps',
      noStepsDefined: 'No steps defined.',
      typeLabel: 'Type',
      paymentReceived: 'Payment received',
      statusLabel: 'Status',
      modeLabel: 'Mode',
      origin: 'Origin',
      destination: 'Destination',
      fullOriginAddress: 'Full Origin Address',
      fullDestinationAddress: 'Full Destination Address',
      clientPhoneLabel: 'Phone',
      clientEmailLabel: 'Email',
      floorLabel: 'Floor',
      elevatorLabel: 'Elevator',
      freightElevator: 'Freight Elevator',
      accessConditionsLabel: 'Access Conditions',
      estimatedVolume: 'Estimated Volume',
      weight: 'Weight',
      volume: 'Volume',
      moveId: 'Move ID',
      time: 'Time',
      personnel: 'Personnel',
      vehicle: 'Vehicle',
      address: 'Address',
      portDetails: 'Port Details',
      pickupAirport: 'Pickup Airport',
      deliveryAirport: 'Delivery Airport',
      pickupAddress: 'Pickup Address',
      deliveryAddress: 'Delivery Address',
      notesLabel: 'Notes',
      task: 'Task',
      taskNotes: 'Notes',
      addNoteOrEdit: 'Add Note',
      editNote: 'Edit',
      deleteDayNotesConfirm: 'Delete day notes?',
      deleteExtraJobConfirm: 'Delete this additional job?',
      deleteAgentConfirm: 'Delete this agent?',
      deleteBrokerConfirm: 'Delete this broker?',
      deleteContactConfirm: 'Delete this contact?',
      fillAtLeastOneField: 'Please fill at least one field.',
      noDocumentsFound: 'No documents found.',
      documentsSearchTab: 'Documents Search',
      resourceLibraryTab: 'Resource Library',
      recentMoves: 'Recent Moves',
      noMovesLinked: 'No moves linked yet.',
      location: 'Location',
      editAgent: 'Edit Agent',
      deleteAgent: 'Delete Agent',
      memberships: 'Memberships',
      contacts: 'Contacts',
      // Agent/Broker types
      agentTypeAgent: 'Agents',
      agentTypeBroker: 'Brokers',
      addAgent: 'Add Agent',
      addBroker: 'Add Broker',
      addAgentTitle: 'Add Agent',
      addBrokerTitle: 'Add Broker',
      editAgentTitle: 'Edit Agent',
      editBrokerTitle: 'Edit Broker',
      typeAgent: 'Agent',
      typeCustomsBroker: 'Customs Broker',
      typeSeaFreightBroker: 'Sea Freight Broker',
      typeAirFreightBroker: 'Air Freight Broker',
      agentTypeLabel: 'Type',
      hintSelectAgent: 'Select an agent from the left to see details.',
      hintSelectBroker: 'Select a broker from the left to see details.',
      jobsUsingBroker: 'Jobs Using This Broker',
      noBrokerJobs: 'Not used in any jobs yet.',
      originAgent: 'Origin Agent',
      destinationAgent: 'Destination Agent',
      contactName: 'Contact Name',
      email: 'Email',
      phone: 'Phone',
      addContact: 'Add Contact',
      addUpdateContact: 'Add / Update Contact',
      updateContact: 'Update Contact',
      addAgentTitle: 'Add Agent',
      editAgentTitle: 'Edit Agent',
      saveAgent: 'Save Agent',
      jobCardTypePayment: 'Type: {type} • {pay}',
      paidLabel: 'Paid',
      unpaidLabel: 'Unpaid',
      originAgent: 'Origin agent: {name}',
      destinationAgent: 'Destination agent: {name}',
      originAgentRole: 'Origin Agent',
      destinationAgentRole: 'Destination Agent',
      noAgentsLinkedToMove: 'No agents linked to this move.',
      noMovesYet: 'No moves yet.',
      dataToolsTitle: 'Data Tools (Developer Only)',
      importAreaHint: 'Paste JSON from a previous export and click "Import Data".',
      importData: 'Import Data',
      exportData: 'Export Data',
      importNow: 'Import Now',
      toggleImportArea: 'Import Data',
      monthLocale: undefined,
      monday: 'Mon',
      tuesday: 'Tue',
      wednesday: 'Wed',
      thursday: 'Thu',
      friday: 'Fri',
      saturday: 'Sat',
      sunday: 'Sun',
      allMovesFilter: 'All moves',

      // new labels
      office: 'Office',
      linkedMove: 'Linked Move (optional)',
      none: 'None',
      customTaskName: 'Custom Task Name',
      exportDayPdf: 'Export Day (PDF)',
      addAdditionalJob: 'Add Additional Job',
      addMoveStep: 'Add Move Step',
      selectStepType: 'Select Step Type',

      // translated enums
      statusPlanned: 'Planned',
      statusOngoing: 'Ongoing',
      statusCompleted: 'Completed',
      statusCancelled: 'Cancelled',
      modeSea: 'Sea',
      modeLand: 'Land',
      modeAir: 'Air',

      // step labels (display only; stored ids are stable)
      step_packing: 'Packing',
      step_survey: 'Survey',
      step_delivery_to_residence: 'Delivery to Residence',
      step_container_delivery: 'Container Delivery',
      step_container_pickup: 'Container Pickup',
      step_container_unloading: 'Container Unloading',
      step_container_loading: 'Container Loading',
      step_air_cargo_packing: 'Air Cargo Packing',
      step_air_cargo_delivery_to_address: 'Air Cargo Delivery to Address',
      step_air_cargo_delivery_to_airport: 'Air Cargo Delivery to Airport',
      
      // Booking and Client Types
      bookingTypeLabel: 'Booking Type',
      selectBookingType: 'Select booking type',
      bookingDoorToDoor: 'Door to Door',
      bookingDoorToPort: 'Door to Port',
      bookingPortToDoor: 'Port to Door',
      clientTypeLabel: 'Client Type',
      selectClientType: 'Select client type',
      clientPrivate: 'Private',
      clientCorporate: 'Corporate',
      clientDiplomatic: 'Diplomatic',
      
      // Brokers
      brokersSection: 'Brokers',
      customsBrokerLabel: 'Customs Broker',
      seaFreightBrokerLabel: 'Sea Freight Broker',
      airFreightBrokerLabel: 'Air Freight Broker',
      selectBroker: 'Select broker',
      
      // Additional labels
      moveManager: 'Move Manager',
      shipmentContents: 'Shipment Contents',
      
      // ========== QUOTES SECTION ==========
      quotesTitle: 'Quotes',
      btnAddNewQuote: 'Add New Quote',
      quoteDetailsTitle: 'Quote Details',
      btnEditQuote: 'Edit Quote',
      hintSelectQuote: 'Select a quote from the left to see details here.',
      hintSelectDocument: 'Select a document or resource from the left to see details here.',
      searchQuotesPlaceholder: 'Search by quote ID, client, origin, destination...',
      noQuotesYet: 'No quotes yet.',
      createQuoteTitle: 'Create New Quote',
      editQuoteTitle: 'Edit Quote',
      quoteRecipient: 'Quote Recipient',
      basicInfoSection: 'Basic Information',
      recipientClient: 'Client',
      recipientAgent: 'Agent / Partner',
      recipientHint: 'Affects which fields and charges are shown',
      quoteType: 'Quote Type',
      selectQuoteType: 'Select type',
      quoteModes: 'Transport Modes',
      quoteContents: 'Shipment Contents',
      householdGoods: 'Household Goods (HHE)',
      vehicleAuto: 'Vehicle / Auto',
      quoteCurrency: 'Quote Currency',
      quoteCurrencyHint: 'This currency will be used for all charges in this quote',
      quoteClientName: 'Client Name',
      quoteClientOrg: 'Organization',
      quoteOrigin: 'Origin',
      quoteDestination: 'Destination',
      estimatedVolume: 'Estimated Volume',
      quoteValidUntil: 'Valid Until',
      transitInsurance: 'Transit Insurance',
      includeInsurance: 'Include transit insurance',
      insuranceNote: 'Insurance premium calculated as percentage of declared value',
      declaredValue: 'Declared Value',
      insuranceRate: 'Insurance Rate',
      
      // Sea Freight Fields
      seaFreightDetails: 'Sea Freight Details',
      seaVolume: 'Volume (CBM)',
      departurePort: 'Departure Port',
      poePort: 'Port of Entry (POE)',
      containerType: 'Container Type',
      seaTransitTime: 'Transit Time (days)',
      containerLCL: 'LCL (Less than Container)',
      containerFCL20: '20\' FCL',
      containerFCL40: '40\' FCL',
      containerFCL40HC: '40\' HC FCL',
      
      // Air Freight Fields
      airFreightDetails: 'Air Freight Details',
      airCargoWeight: 'Cargo Weight (kg)',
      airVolume: 'Volume (CBM)',
      calculatedACW: 'Calculated ACW',
      acwNote: 'ACW = max(gross weight, volume × 167)',
      departureAirport: 'Departure Airport',
      arrivalAirport: 'Arrival Airport',
      airlineCarrier: 'Airline Carrier',
      airTransitTime: 'Transit Time (days)',
      
      // Land Freight Fields
      landFreightDetails: 'Land Freight Details',
      landVolume: 'Volume (CBM)',
      truckType: 'Truck Type',
      truckDedicated: 'Dedicated Truck',
      truckGroupage: 'Groupage',
      landTransitTime: 'Transit Time (days)',
      
      // Vehicle Fields
      vehicleDetails: 'Vehicle Details',
      vehicleType: 'Vehicle Type',
      vehicleCar: 'Car',
      vehicleMotorcycle: 'Motorcycle',
      vehicleBoat: 'Boat',
      vehicleOther: 'Other',
      vehicleMake: 'Make',
      vehicleModel: 'Model',
      vehicleYear: 'Year',
      vehicleVIN: 'VIN',
      vehicleCondition: 'Vehicle Condition',
      vehicleRunning: 'Running',
      vehicleNonRunning: 'Non-Running',
      
      // Charges Section
      chargesSection: 'Charges',
      seaFreightCharges: 'Sea Freight Charges',
      airFreightCharges: 'Air Freight Charges',
      landFreightCharges: 'Land Freight Charges',
      chargesHint: 'Default charges auto-populated based on recipient and type. You can edit or add more.',
      addCharge: '+ Add Charge',
      chargeDescription: 'Charge description',
      chargeTypeFixed: 'Fixed',
      chargeTypeRange: 'Range',
      
      // Quote Includes
      quotationIncludes: 'Quotation Includes',
      quotationIncludesHint: 'Select items to include in the quote (items auto-populate based on mode and type):',
      addCustomInclude: 'Add Custom Item',
      
      // Additional Charges
      additionalCharges: 'Additional Charges May Apply',
      additionalChargesHint: 'These charges are not included in the quoted price and will be invoiced separately if applicable:',
      addCustomCharge: 'Add Custom Charge',
      
      // Consignment Instructions
      consignmentInstructions: 'Consignment Instructions',
      importRequirementsTitle: 'Import Requirements & Consignment Instructions',
      consignmentOfficeLabel: 'Office / Destination City',
      includeConsignmentLabel: 'Include consignment instructions in quote',
      selectRequirementsHint: 'Select which import requirement information to include (optional - can select multiple or none):',
      foreignNationalLabel: 'Foreign Nationals (relocating to Turkey for work/residence)',
      returningTurkishLabel: 'Returning Turkish Nationals',
      diplomaticLabel: 'Foreign Nationals (Diplomatic)',
      includeConsignment: 'Include consignment instructions and import requirements in quote',
      clientCategory: 'Client Category',
      categoryForeignNational: 'Foreign National',
      categoryReturningTurkish: 'Returning Turkish National',
      categoryDiplomatic: 'Diplomatic',
      
      // Quote Actions
      saveQuote: 'Save Quote',
      exportPdf: 'Export PDF',
      convertToMove: 'Convert to Move',
      deleteQuote: 'Delete Quote',
      quoteInfo: 'Quote Information',
      routeInfo: 'Route Information',
      validityDate: 'Validity Date',
      
      // Common / Shared
      yes: 'Yes',
      no: 'No',
      none: 'None',
      select: 'Select',
      optional: 'optional',
      required: 'required',
      example: 'e.g.',
      loading: 'Loading...',
      noResults: 'No results found',
      confirm: 'Confirm',
      warning: 'Warning',
      error: 'Error',
      success: 'Success',
      info: 'Info',
      noClientName: 'No client name',
      
      // Placeholders
      phSearchMoves: 'Search by move ID, client, origin, destination, agent...',
      phSearchAgents: 'Search agents by name, city, country...',
      phSearchDocs: 'Search by job ID, client, document name, agent...',
      phSearchStorage: 'Search by code, client, location...',
      phSearchQuotes: 'Search by quote ID, client, origin, destination...',
      phEnterChecklist: 'Enter checklist item...',
      phDocLabel: 'Document Label',
      docNameLabel: 'Document Label',
      docDateLabel: 'Document Date',
      docDatePlaceholder: 'dd/mm/yyyy',
      docUploadLabel: 'Upload (optional)',
      phMediaLabel: 'Label / Description',
      phWriteNote: 'Write a note about this move...',
      phPhone: '+90 555 123 4567',
      phEmail: 'client@example.com',
      phTag: 'e.g. Diplomatic, VIP, Military...',
      phFloor: 'e.g. 3',
      phAccessConditions: 'e.g. Narrow stairs',
      phMoveManager: 'Person responsible for this move',
      phContainerDetails: 'e.g. 1x20ft FCL, 1x40ft HQ',
      phVolume: 'e.g. 14.5',
      phWeight: 'e.g. 2500',
      phACW: 'e.g. 835',
      phMake: 'e.g. Toyota',
      phModel: 'e.g. Camry',
      phYear: 'e.g. 2022',
      phVIN: 'Vehicle Identification Number',
      phOrigin: 'Istanbul, Turkey',
      phDestination: 'Dubai, UAE',
      
      // Form Labels
      lblClientInfo: 'Client Information',
      lblMoveInfo: 'Move Information',
      lblRoute: 'Route',
      lblOriginDetails: 'Origin Details',
      lblDestinationDetails: 'Destination Details',
      lblModeDetails: 'Mode Details',
      lblShipmentContents: 'Shipment Contents',
      lblVehicleDetails: 'Vehicle Details',
      lblBrokers: 'Brokers',
      lblPhone: 'Phone',
      lblEmail: 'Email',
      lblFloor: 'Floor',
      lblElevator: 'Elevator',
      lblFreightElevator: 'Freight Elevator',
      lblAccessConditions: 'Access Conditions',
      lblTag: 'Tag/Label',
      lblNotes: 'Notes',
      lblContainerDetails: 'Container Details',
      lblVolumeCBM: 'Volume (CBM)',
      lblGrossWeight: 'Gross Weight (kg)',
      lblCalculatedACW: 'Calculated ACW (kg)',
      lblHouseholdGoods: 'Household Goods (HHE)',
      lblVehicle: 'Vehicle / Auto',
      lblVehicleType: 'Vehicle Type',
      lblVehicleMake: 'Make',
      lblVehicleModel: 'Model',
      lblVehicleYear: 'Year',
      lblVehicleVIN: 'VIN',
      lblVehicleCondition: 'Condition',
      lblRunning: 'Running',
      lblNonRunning: 'Non-Running',
      lblCustomsBroker: 'Customs Broker',
      lblSeaFreightBroker: 'Sea Freight Broker',
      lblAirFreightBroker: 'Air Freight Broker',
      lblSelectBroker: 'Select broker',
      
      // Move Form Labels
      tagLabel: 'Tag (optional)',
      originCityLabel: 'Origin City',
      originCountryLabel: 'Origin Country',
      originAddressLabel: 'Full Origin Address',
      originFloorLabel: 'Floor',
      originElevatorLabel: 'Elevator',
      originAccessLabel: 'Access Conditions',
      destinationCityLabel: 'Destination City',
      destinationCountryLabel: 'Destination Country',
      destinationAddressLabel: 'Full Destination Address',
      destinationFloorLabel: 'Floor',
      destinationElevatorLabel: 'Elevator',
      destinationAccessLabel: 'Access Conditions',
      tradeDirectionLabel: 'Trade Direction',
      modeLabel: 'Mode',
      moveManagerLabel: 'Move Manager',
      moveManagerPlaceholder: 'Person responsible for this move',
      seaFreightDetailsTitle: 'Sea Freight Details',
      airFreightDetailsTitle: 'Air Freight Details',
      landFreightDetailsTitle: 'Land Freight Details',
      vehicleDetailsTitle: 'Vehicle Details',
      storageRequired: 'This move requires storage',
      stepsHint: 'After creating the move, you can add steps (Survey, Packing, Container, Delivery, etc.) manually in Move Details using the "Add Move Step" button.',
      vehicleCar: 'Car',
      vehicleMotorcycle: 'Motorcycle',
      vehicleTruck: 'Truck',
      vehicleBoat: 'Boat',
      vehicleOther: 'Other',
      grossWeightOptional: 'Gross Weight (kg) - optional',
      containerDetailsLabel: 'Container Details',
      volumeCbmLabel: 'Volume (CBM)',
      grossWeightLabel: 'Gross Weight (kg)',
      cargoWeightLabel: 'Cargo Weight (kg)',
      calculatedAcwLabel: 'Calculated ACW (kg)',
      shipmentContentsLabel: 'Shipment Contents',
      seaVolumeLabel: 'Sea Cargo Volume (cbm)',
      airVolumeLabel: 'Air Cargo Volume (cbm)',
      airWeightLabel: 'Air Cargo Weight (kg)',
      acwLabel: 'Chargeable Weight / ACW (kg)',
      landVolumeLabel: 'Land Cargo Volume (cbm)',
      vehicleTypeLabel: 'Vehicle Type',
      vehicleMakeLabel: 'Vehicle Make',
      vehicleModelLabel: 'Vehicle Model',
      vehicleYearLabel: 'Vehicle Year',
      vinLabel: 'VIN Number (optional)',
      conditionLabel: 'Condition',
      
      // Buttons
      btnAdd: 'Add',
      btnSave: 'Save',
      btnCancel: 'Cancel',
      btnDelete: 'Delete',
      btnEdit: 'Edit',
      btnClose: 'Close',
      btnExport: 'Export',
      btnImport: 'Import',
      btnDownload: 'Download',
      btnUpload: 'Upload',
      btnOpenLink: 'Open Link',
      btnAddNote: 'Add Note',
      btnAddDocument: 'Add Document',
      btnAddMedia: 'Add Media',
      btnAddChecklistItem: 'Add Checklist Item',
      btnSaveMove: 'Save Move',
      btnAddBroker: 'Add Broker',
      btnAddResource: 'Add Resource',
      addChecklistItem: 'Add Checklist Item',
      selectCountry: 'Select country',
      selectType: 'Select type',
      selectStatus: 'Select status',
      selectOriginAgent: 'Select origin agent',
      selectDestinationAgent: 'Select destination agent',
      resourceDetails: 'Resource Details',
      hintSelectResource: 'Select a document or resource from the left to see details here.',
      usedInMoves: 'moves',
      usedInMove: 'move',
      addCategory: 'Add Category',
      editCategory: 'Edit Category',
      deleteCategory: 'Delete Category',
      categoryName: 'Category Name',
      categoryNameEn: 'Category Name (English)',
      categoryNameTr: 'Category Name (Turkish)',
      noCategories: 'No categories yet. Add a category to get started.',
      confirmDeleteCategory: 'Delete this category? All resources in it will also be deleted.',
      categoryAdded: 'Category added!',
      categoryUpdated: 'Category updated!',
      categoryDeleted: 'Category deleted.',
      cannotDeleteNonEmpty: 'Cannot delete category with resources. Delete resources first.',
      
      // Job Modal
      createMoveTitle: 'Create New Move',
      editMoveTitle: 'Edit Move',
      
      // Section Headers
      sectionChecklist: 'Checklist',
      sectionDocuments: 'Documents',
      sectionPhotosVideos: 'Photos & Videos',
      sectionNotes: 'Notes',
      sectionMoveAgents: 'Move Agents',
      sectionSeaFreightDetails: 'Sea Freight Details',
      sectionAirFreightDetails: 'Air Freight Details',
      sectionLandFreightDetails: 'Land Freight Details',
      moveAgentsTitle: 'Move Agents',
      checklistTitle: 'Checklist',
      documentsTitle: 'Documents',
      photosVideosTitle: 'Photos & Videos',
      notesTitle: 'Notes',
      
      // Move Details Labels
      lblVolume: 'Volume',
      lblContainer: 'Container',
      lblChargeableWeight: 'Chargeable Weight (ACW)',
      lblTruckType: 'Truck Type',
      
      // Agent Section
      agentsTitle: 'Agents',
      agentDetailsTitle: 'Agent Details',
      
      // Storage Statuses
      statusActive: 'Active',
      statusClosed: 'Closed',
      statusInStorage: 'In Storage',
      statusFullyRetrieved: 'Fully Retrieved',
      statusPartiallyRetrieved: 'Partially Retrieved',
      
      // Booking Types
      bookingDoorToDoor: 'Door to Door',
      bookingDoorToPort: 'Door to Port',
      bookingPortToDoor: 'Port to Door',
      
      // Client Types
      clientTypePrivate: 'Private',
      clientTypeCorporate: 'Corporate',
      clientTypeDiplomatic: 'Diplomatic',
      
      // Contents Types
      contentsHHE: 'Household Goods',
      contentsVehicle: 'Vehicle',
      
      // Units
      unitDays: 'days',
      unitDay: 'day',
      unitMonth: 'month',
      unitMonths: 'months',
      unitKg: 'kg',
      unitCbm: 'cbm',
      
      // Storage Billing
      perCBM: 'Per CBM',
      flatRate: 'Flat Rate',
      
      // File Upload
      dragDropText: 'Drag & drop file here or click to browse',
      labelDescription: 'Label / Description',
      
      // Extra Job Types (for schedule dropdown)
      jobCustom: 'Custom',
      jobPacking: 'Packing',
      jobSurvey: 'Survey',
      jobDeliveryToResidence: 'Delivery to Residence',
      jobContainerDelivery: 'Container Delivery',
      jobContainerPickup: 'Container Pickup',
      jobContainerUnloading: 'Container Unloading',
      jobContainerLoading: 'Container Loading',
      jobAirCargoPacking: 'Air Cargo Packing',
      jobAirCargoDeliveryToAddress: 'Air Cargo Delivery to Address',
      jobAirCargoDeliveryToAirport: 'Air Cargo Delivery to Airport',
      jobDeliveryToPort: 'Delivery to Port',
      jobPickupFromPort: 'Pickup from Port',
      jobAirCargoPickup: 'Air Cargo Pickup',
      jobAirCargoDelivery: 'Air Cargo Delivery',
      jobWarehouseCleaning: 'Warehouse Cleaning',
      jobTruckPreparation: 'Truck Preparation',
      jobVehicleDelivery: 'Vehicle Delivery',
      jobVehiclePickup: 'Vehicle Pickup',
      
      // Misc
      additionalJob: 'Additional Job',
      video: 'Video',
      media: 'Media',
      nameEnglish: 'Name (English)',
      nameTurkish: 'Name (Turkish)',
      selectQuoteToSee: 'Select a quote to see details.',
      selectModeAndType: 'Select mode and type to see available items',
      selectTypeToSee: 'Select type to see available items',
      freightItems: 'Freight Items',
      additionalItemsIf: 'Additional items (if corresponding charges included)',
      to: 'to',
      previousMoves: 'Previous Moves',
      costBreakdown: 'Cost Breakdown',
      moving: 'Moving',
      subtotal: 'Subtotal',
      total: 'Total',
      addCharge: 'Add Charge',
      editCharge: 'Edit Charge',
      deleteCharge: 'Delete Charge',
      retrieveItem: 'Retrieve',
      selectOffice: 'Select Office',
      clientNameOptional: 'Client Name (optional)',
      enterClientName: 'Enter client name...',
      dateLabel: 'Date',
      timeLabel: 'Time',
      personnelLabel: 'Personnel',
      vehicleLabel: 'Vehicle',
      addressLabel: 'Address',
      officeLabel: 'Office',
      freeDaysLabel: 'Free Days',
      billableDaysLabel: 'Billable Days',
      totalDays: 'total',
      estimatedCostLabel: 'Estimated Cost',
      totalCostLabel: 'Total Cost',
      billingInfoLabel: 'Billing Information',
      billingTypeLabel: 'Billing Type',
      rateLabel: 'Rate',
      // Day of week abbreviations
      dowMon: 'Mon',
      dowTue: 'Tue',
      dowWed: 'Wed',
      dowThu: 'Thu',
      dowFri: 'Fri',
      dowSat: 'Sat',
      dowSun: 'Sun',
      // Filter labels
      filterAll: 'All',
      typeAll: 'All Types',
      typeImport: 'Import',
      typeExport: 'Export',
      typeLocal: 'Local',
      payAll: 'All',
      payPaid: 'Paid',
      payUnpaid: 'Unpaid',
      // Button labels
      btnAddAgent: 'Add Agent',
      btnAddNewMove: 'New Move',
      btnEditMove: 'Edit Move',
      btnExportData: 'Export Data',
      btnImportData: 'Import Data',
      btnImportNow: 'Import',
      // Section titles
      dayDetailsTitle: 'Day Details',
      moveDetailsTitle: 'Move Details',
      scheduleTitle: 'Schedule',
      modalAddAgentTitle: 'Add Agent',
      modalCreateMoveTitle: 'Create Move',
      // Misc
      addNoteLabel: 'Add Note',
      docsAllMoves: 'All Moves',
      hintAgentsAppear: 'Agents will appear here',
      hintSelectDay: 'Select a day to see details',
      hintSelectMove: 'Select a move to see details',
      importHint: 'Select a JSON file to import',
      importNote: 'This will replace all existing data',
      footerCopyright: '© Istanbul Ekspres',
      deleteConfirm: 'Confirm Delete',
      lblCargoWeightShort: 'Cargo Weight',
      dateFormatHint: '(DD/MM/YYYY)',
      dateFormatPlaceholder: 'dd/mm/yyyy'
    },
    tr: {
      langShort: 'TR',
      dashboard: 'Özet',
      moves: 'Taşımalar',
      movesTitle: 'Taşımalar',
      agents: 'Acenteler',
      schedule: 'Takvim',
      storage: 'Depolama',
      documents: 'Belgeler',
      quotes: 'Teklifler',
      // Storage translations
      storageTitle: 'Depolama',
      activeStorage: 'Aktif Depolama',
      activeStorageDesc: 'Şu anda depoda veya kısmen alınmış öğeler',
      completedStorage: 'Tamamlanan Depolama',
      completedStorageDesc: 'Tamamen alınmış öğeler',
      noActiveStorage: 'Şu anda depoda öğe yok.',
      noStorageRecords: 'Bu filtreye uyan depolama kaydı yok.',
      storageRecords: 'Depolama Kayıtları',
      noCompletedStorage: 'Tamamlanan depolama kaydı yok.',
      allLocations: 'Tüm Lokasyonlar',
      allStatuses: 'Tüm Durumlar',
      statusActive: 'Aktif',
      statusClosed: 'Çıktı',
      storageDetails: 'Depolama Detayları',
      storageDetailsTitle: 'Depolama Detayları',
      hintSelectStorage: 'Detayları görmek için soldan bir depolama kaydı seçin.',
      editStorage: 'Düzenle',
      btnAddStorage: 'Depolama Ekle',
      btnEditStorage: 'Depolamayı Düzenle',
      modalAddStorageTitle: 'Depolama Ekle',
      modalEditStorageTitle: 'Depolamayı Düzenle',
      storageLocation: 'Depo Lokasyonu',
      selectLocation: 'Lokasyon seçin',
      noLinkedJob: 'Bağlı iş yok (bağımsız depolama)',
      clientNamePlaceholder: 'Müşteri adı girin',
      additionalNotesPlaceholder: 'Bu depolama hakkında ek notlar...',
      storageContents: 'Depo İçeriği',
      storageCode: 'Depolama Kodu',
      entryDate: 'Giriş Tarihi',
      exitDate: 'Çıkış Tarihi',
      daysInStorage: 'Depoda Gün',
      billingInfo: 'Fatura Bilgisi',
      billingType: 'Fatura Tipi',
      rate: 'Ücret',
      currency: 'Para Birimi',
      freeDays: 'Ücretsiz Günler',
      billableDays: 'Faturalanabilir Günler',
      billingNotes: 'Fatura Notları',
      storageInventory: 'Depo Envanteri',
      addItem: 'Öğe Ekle',
      noInventoryItems: 'Henüz envanter öğesi eklenmedi.',
      enterItemDescription: 'Öğe açıklaması girin:',
      enterQuantity: 'Miktar girin:',
      enterCBM: 'CBM girin (opsiyonel):',
      retrieve: 'Al',
      confirmDeleteItem: 'Bu öğeyi silmek istediğinizden emin misiniz?',
      confirmDeleteStorage: 'Bu depolama kaydını silmek istediğinizden emin misiniz?',
      storageLabel: 'Depolama',
      storageYes: 'Bu taşıma depolama gerektirir',
      viewStorage: 'Depolama Sekmesinde Görüntüle',
      clientInfo: 'Müşteri Bilgisi',
      clientName: 'Müşteri Adı',
      organization: 'Organizasyon',
      organizationLabel: 'Organizasyon (isteğe bağlı)',
      clientNameLabel: 'Müşteri Adı',
      linkedJob: 'Bağlantılı Taşıma',
      linkedJobOptional: 'Bağlı İş (İsteğe Bağlı)',
      linkedJobHint: 'Mevcut bir işe bağlayın veya bağımsız depolama için boş bırakın',
      moveTypeLabel: 'Taşıma Türü',
      statusRequiredLabel: 'Durum (zorunlu)',
      originAgentLabel: 'Çıkış Acentesi (en az bir Çıkış/Varış gerekli)',
      destinationAgentLabel: 'Varış Acentesi (en az bir Çıkış/Varış gerekli)',
      agentNameLabel: 'Ad',
      cityLabel: 'Şehir',
      countryLabel: 'Ülke',
      membershipsLabel: 'Üyelikler',
      storageCodeLabel: 'Depolama Kodu',
      storageContentsLabel: 'Depo İçeriği',
      hheLabel: 'Ev Eşyası',
      autoLabel: 'Araç',
      billingTypeLabel: 'Fatura Tipi',
      perCBM: 'CBM Başına',
      flatRateOption: 'Sabit Ücret',
      ratePerCBMLabel: 'CBM Başına Ücret',
      freeDaysLabel: 'Ücretsiz Günler',
      billingNotesLabel: 'Fatura Notları',
      billingNotesPlaceholderText: 'Ek fatura notları...',
      orgPlaceholder: 'Organizasyon adı girin (isteğe bağlı)',
      btnSaveAgent: 'Acenteyi Kaydet',
      btnSaveStorage: 'Depolamayı Kaydet',
      locationContents: 'Lokasyon ve İçerik',
      location: 'Lokasyon',
      grossWeight: 'Brüt Ağırlık',
      grossWeightOptional: 'Brüt Ağırlık (kg) - isteğe bağlı',
      dates: 'Tarihler',
      inventoryStatus: 'Envanter Durumu',
      estimatedCost: 'Tahmini Maliyet',
      totalCost: 'Toplam Maliyet',
      statusNotes: 'Durum ve Notlar',
      searchStoragePlaceholder: 'Kod, müşteri, lokasyon ile ara...',
      jobCode: 'Taşıma Kodu',
      client: 'Müşteri',
      contents: 'İçerik',
      totalCBM: 'Toplam CBM',
      ratePerCBM: 'CBM Başına Ücret',
      flatRate: 'Sabit Ücret',
      monthly: 'Ay',
      daily: 'Gün',
      billingNotesPlaceholder: 'Özel düzenlemeler, indirimler vb.',
      addInventoryItem: 'Envanter Öğesi Ekle',
      itemDescription: 'Öğe Açıklaması',
      itemDescriptionPlaceholder: 'örn. Kanepe, Kutu #12, Mutfak eşyaları...',
      quantity: 'Miktar',
      itemCBM: 'CBM',
      itemNotes: 'Notlar',
      itemNotesPlaceholder: 'Bu öğe hakkında opsiyonel notlar',
      save: 'Kaydet',
      cancel: 'İptal',
      delete: 'Sil',
      add: 'Ekle',
      movesByStatus: 'Duruma Göre Taşımalar',
      movesByType: 'Türe Göre Taşımalar',
      paymentStatus: 'Ödeme Durumu',
      movesThisMonth: 'Bu Ay Taşımalar',
      activeMovesLabel: 'Aktif Taşımalar',
      scheduledThisMonth: 'Aktiviteli',
      upcomingJobs: 'YAKLAŞAN İŞLER (3 GÜN)',
      upcomingSchedule: 'YAKLAŞAN TAKVİM (14 GÜN)',
      overdueItems: 'GECİKMİŞ İŞLER',
      unpaidMoves: 'ÖDENMEMİŞ TAŞIMALAR',
      noUpcomingJobs: 'Önümüzdeki 3 günde planlanmış iş yok.',
      noUpcomingItems: 'Yaklaşan planlı iş yok.',
      noOverdueItems: 'Gecikmiş iş yok.',
      noUnpaidMoves: 'Tüm taşımalar ödendi.',
      task: 'görev',
      tasks: 'görev',
      total: 'Toplam',
      addNewMove: 'Yeni Taşıma',
      editMove: 'Taşımayı Düzenle',
      moveDetails: 'Taşıma Detayları',
      moveAgents: 'Taşıma Acenteleri',
      checklist: 'Kontrol Listesi',
      notes: 'Notlar',
      addChecklistItems: 'Kontrol Listesi Ekle',
      customChecklist: 'Özel Kontrol Listesi (satır başına 1 madde)',
      addNote: 'Not Ekle',
      addDocument: 'Belge Ekle',
      documentsGlobal: 'Belgeler',
      documentsSearchTab: 'Belge Arama',
      resourceLibraryTab: 'Kaynak Kütüphanesi',
      officeAll: 'Hepsi',
      officeIstanbul: 'İstanbul',
      officeAnkara: 'Ankara',
      officeIzmir: 'İzmir',
      officeAdana: 'Adana',
      searchMovesPh: 'Taşıma no, müşteri, çıkış, varış, acente ile ara...',
      searchAgentsPh: 'Acente adı, şehir, ülke ile ara...',
      searchDocsPh: 'Taşıma no, müşteri, belge adı, acente ile ara...',
      allMoves: 'Tüm taşımalar',
      all: 'Hepsi',
      planned: 'Planlı',
      ongoing: 'Devam Ediyor',
      completed: 'Tamamlandı',
      cancelled: 'İptal',
      allTypes: 'Tüm tipler',
      importType: 'İthalat',
      exportType: 'İhracat',
      localType: 'Yurtiçi',
      allPayments: 'Tüm ödemeler',
      paid: 'Ödendi',
      unpaid: 'Ödenmedi',
      noMovesMatch: 'Bu görünümde eşleşen taşıma yok.',
      selectMoveDetails: 'Detayları görmek için soldan bir taşıma seçin.',
      agentsForMoveHere: 'Bu taşıma için acenteler burada görünecek.',
      noChecklistYet: 'Henüz kontrol listesi yok.',
      noNotesYet: 'Henüz not yok.',
      noDocumentsYet: 'Henüz belge yok.',
      noMediaYet: 'Henüz fotoğraf veya video yok.',
      noAgentsYet: 'Henüz acente yok.',
      noBrokersYet: 'Henüz broker yok.',
      createNewMove: 'Yeni Taşıma Oluştur',
      saveMove: 'Taşımayı Kaydet',
      cancel: 'İptal',
      statusRequired: 'Durum zorunludur.',
      selectOneAgent: 'Lütfen en az bir acente seçin.',
      documentNameRequired: 'Belge adı zorunludur.',
      docNameLabel: 'Belge Adı',
      docDateLabel: 'Belge Tarihi',
      docDatePlaceholder: 'gg/aa/yyyy',
      docUploadLabel: 'Dosya Yükle (opsiyonel)',
      exportedOk: 'Dışa aktarma başarılı.',
      exportFailed: 'Dışa aktarma başarısız.',
      importPromptEmpty: 'İçe aktarmak için JSON yapıştırın.',
      importConfirm: 'Bu işlem mevcut tüm veriyi değiştirecek. Devam?',
      importOk: 'İçe aktarma başarılı.',
      invalidJson: 'Geçersiz JSON: ',
      scheduleDayDetailsHint: 'Planlı adımları ve ek işleri görmek için takvimden bir gün seçin.',
      dayDetails: 'Gün Detayları',
      extraJobs: 'Ek İşler',
      dayNotes: 'Gün Notları',
      noScheduledSteps: 'Bu gün için planlı adım yok.',
      openMove: 'Taşımayı Aç',
      edit: 'Düzenle',
      save: 'Kaydet',
      delete: 'Sil',
      download: 'İndir',
      openLink: 'Link Aç',
      addJob: 'İş Ekle',
      noExtraJobs: 'Bu gün için ek iş yok.',
      addNoteBtn: 'Not Ekle',
      stepSaved: 'Kaydedildi.',
      updatePaymentStatus: 'Ödeme durumunu güncelle:',
      yes: 'Evet',
      no: 'Hayır',
      moveSteps: 'Taşıma Adımları',
      noStepsDefined: 'Adım tanımlı değil.',
      typeLabel: 'Tip',
      paymentReceived: 'Ödeme alındı',
      statusLabel: 'Durum',
      modeLabel: 'Mod',
      origin: 'Çıkış',
      destination: 'Varış',
      fullOriginAddress: 'Çıkış Adresi',
      fullDestinationAddress: 'Varış Adresi',
      clientPhoneLabel: 'Telefon',
      clientEmailLabel: 'E-posta',
      floorLabel: 'Kat',
      elevatorLabel: 'Asansör',
      freightElevator: 'Yük Asansörü',
      accessConditionsLabel: 'Erişim Koşulları',
      estimatedVolume: 'Tahmini Hacim',
      weight: 'Ağırlık',
      volume: 'Hacim',
      moveId: 'Taşıma No',
      time: 'Saat',
      personnel: 'Personel',
      vehicle: 'Araç',
      address: 'Adres',
      portDetails: 'Liman Detayları',
      pickupAirport: 'Alış Havalimanı',
      deliveryAirport: 'Teslim Havalimanı',
      pickupAddress: 'Alış Adresi',
      deliveryAddress: 'Teslim Adresi',
      notesLabel: 'Notlar',
      task: 'İş',
      taskNotes: 'Notlar',
      addNoteOrEdit: 'Not Ekle',
      editNote: 'Düzenle',
      deleteDayNotesConfirm: 'Gün notları silinsin mi?',
      deleteExtraJobConfirm: 'Bu ek iş silinsin mi?',
      deleteAgentConfirm: 'Bu acente silinsin mi?',
      deleteBrokerConfirm: 'Bu broker silinsin mi?',
      deleteContactConfirm: 'Bu kontak silinsin mi?',
      fillAtLeastOneField: 'Lütfen en az bir alan doldurun.',
      // Agent/Broker types
      agentTypeAgent: 'Acenteler',
      agentTypeBroker: 'Aracılar',
      addAgent: 'Acente Ekle',
      addBroker: 'Aracı Ekle',
      addAgentTitle: 'Acente Ekle',
      addBrokerTitle: 'Aracı Ekle',
      editAgentTitle: 'Acente Düzenle',
      editBrokerTitle: 'Aracıyı Düzenle',
      typeAgent: 'Acente',
      typeCustomsBroker: 'Gümrük Müşaviri',
      typeSeaFreightBroker: 'Denizyolu Aracısı',
      typeAirFreightBroker: 'Havayolu Aracısı',
      agentTypeLabel: 'Tip',
      hintSelectAgent: 'Detayları görmek için soldan bir acente seçin.',
      hintSelectBroker: 'Detayları görmek için soldan bir broker seçin.',
      jobsUsingBroker: 'Bu Broker Kullanan İşler',
      noBrokerJobs: 'Henüz hiçbir işte kullanılmadı.',
      originAgent: 'Çıkış Acentesi',
      destinationAgent: 'Varış Acentesi',
      noDocumentsFound: 'Belge bulunamadı.',
      documentsSearchTab: 'Belge Arama',
      resourceLibraryTab: 'Kaynak Kütüphanesi',
      recentMoves: 'Son Taşımalar',
      noMovesLinked: 'Bağlı taşıma yok.',
      location: 'Konum: ',
      editAgent: 'Acenteyi Düzenle',
      deleteAgent: 'Acenteyi Sil',
      memberships: 'Üyelikler',
      contacts: 'Kontaklar',
      contactName: 'Kontak Adı',
      email: 'E-posta',
      phone: 'Telefon',
      addContact: 'Kontak Ekle',
      addUpdateContact: 'Kontak Ekle / Güncelle',
      updateContact: 'Kontak Güncelle',
      addAgentTitle: 'Acente Ekle',
      editAgentTitle: 'Acenteyi Düzenle',
      saveAgent: 'Acenteyi Kaydet',
      jobCardTypePayment: 'Tip: {type} • {pay}',
      paidLabel: 'Ödendi',
      unpaidLabel: 'Ödenmedi',
      originAgent: 'Çıkış acentesi: {name}',
      destinationAgent: 'Varış acentesi: {name}',
      originAgentRole: 'Çıkış Acentesi',
      destinationAgentRole: 'Varış Acentesi',
      noAgentsLinkedToMove: 'Bu taşımaya bağlı acente yok.',
      noMovesYet: 'Henüz taşıma yok.',
      dataToolsTitle: 'Veri Araçları (Sadece Geliştirici)',
      importAreaHint: 'Önceki bir dışa aktarımdan JSON yapıştırın ve "İçe Aktar" tıklayın.',
      importData: 'Yükle',
      exportData: 'İndir',
      importNow: 'Şimdi Yükle',
      toggleImportArea: 'Yükle',
      monthLocale: 'tr-TR',
      monday: 'Pzt',
      tuesday: 'Sal',
      wednesday: 'Çar',
      thursday: 'Per',
      friday: 'Cum',
      saturday: 'Cmt',
      sunday: 'Paz',
      allMovesFilter: 'Tüm taşımalar',

      // new labels
      office: 'Ofis',
      linkedMove: 'Bağlı Taşıma (opsiyonel)',
      none: 'Yok',
      customTaskName: 'Özel İş Adı',
      exportDayPdf: 'Günü PDF Olarak Çıkar',
      addAdditionalJob: 'Ek İş Ekle',
      addMoveStep: 'Adım Ekle',
      selectStepType: 'Adım Türü Seçin',

      // translated enums
      statusPlanned: 'Planlı',
      statusOngoing: 'Devam Ediyor',
      statusCompleted: 'Tamamlandı',
      statusCancelled: 'İptal',
      modeSea: 'Deniz',
      modeLand: 'Kara',
      modeAir: 'Hava',

      // step labels
      step_packing: 'Paketleme',
      step_survey: 'Survey',
      step_delivery_to_residence: 'Eve Teslimat',
      step_container_delivery: 'Konteyner Teslimatı',
      step_container_pickup: 'Konteyner Alımı',
      step_container_unloading: 'Konteyner Boşaltma',
      step_container_loading: 'Konteyner Yükleme',
      step_air_cargo_packing: 'Hava Kargo Paketleme',
      step_air_cargo_delivery_to_address: 'Hava Kargo Adrese Teslim',
      step_air_cargo_delivery_to_airport: 'Hava Kargo Havalimanına Teslim',
      
      // Booking and Client Types
      bookingTypeLabel: 'Rezervasyon Tipi',
      selectBookingType: 'Rezervasyon tipi seçin',
      bookingDoorToDoor: 'Kapıdan Kapıya',
      bookingDoorToPort: 'Kapıdan Limana',
      bookingPortToDoor: 'Limandan Kapıya',
      clientTypeLabel: 'Müşteri Tipi',
      selectClientType: 'Müşteri tipi seçin',
      clientPrivate: 'Bireysel',
      clientCorporate: 'Kurumsal',
      clientDiplomatic: 'Diplomatik',
      
      // Brokers
      brokersSection: 'Aracılar',
      customsBrokerLabel: 'Gümrük Müşaviri',
      seaFreightBrokerLabel: 'Deniz Aracısı',
      airFreightBrokerLabel: 'Hava Aracısı',
      selectBroker: 'Aracı seçin',
      
      // Additional labels
      moveManager: 'Taşıma Yöneticisi',
      shipmentContents: 'Gönderi İçeriği',
      
      // ========== QUOTES SECTION ==========
      quotesTitle: 'Teklifler',
      btnAddNewQuote: 'Yeni Teklif',
      quoteDetailsTitle: 'Teklif Detayları',
      btnEditQuote: 'Teklifi Düzenle',
      hintSelectQuote: 'Detayları görmek için soldan bir teklif seçin.',
      hintSelectDocument: 'Detayları görmek için soldan bir belge veya kaynak seçin.',
      searchQuotesPlaceholder: 'Teklif no, müşteri, çıkış, varış ile ara...',
      noQuotesYet: 'Henüz teklif yok.',
      createQuoteTitle: 'Yeni Teklif Oluştur',
      editQuoteTitle: 'Teklifi Düzenle',
      quoteRecipient: 'Teklif Alıcısı',
      basicInfoSection: 'Temel Bilgiler',
      recipientClient: 'Müşteri',
      recipientAgent: 'Acente / Partner',
      recipientHint: 'Hangi alanların ve ücretlerin gösterileceğini etkiler',
      quoteType: 'Teklif Tipi',
      selectQuoteType: 'Tip seçin',
      quoteModes: 'Taşıma Modları',
      quoteContents: 'Gönderi İçeriği',
      householdGoods: 'Ev Eşyaları (HHE)',
      vehicleAuto: 'Araç / Otomobil',
      quoteCurrency: 'Teklif Para Birimi',
      quoteCurrencyHint: 'Bu para birimi bu teklifteki tüm masraflar için kullanılacak',
      quoteClientName: 'Müşteri Adı',
      quoteClientOrg: 'Organizasyon',
      quoteOrigin: 'Çıkış Yeri',
      quoteDestination: 'Varış Yeri',
      estimatedVolume: 'Tahmini Hacim',
      quoteValidUntil: 'Geçerlilik Tarihi',
      transitInsurance: 'Nakliye Sigortası',
      includeInsurance: 'Nakliye sigortası dahil',
      insuranceNote: 'Sigorta primi beyan edilen değerin yüzdesi olarak hesaplanır',
      declaredValue: 'Beyan Edilen Değer',
      insuranceRate: 'Sigorta Oranı',
      
      // Sea Freight Fields
      seaFreightDetails: 'Denizyolu Detayları',
      seaVolume: 'Hacim (CBM)',
      departurePort: 'Çıkış Limanı',
      poePort: 'Varış Limanı (POE)',
      containerType: 'Konteyner Tipi',
      seaTransitTime: 'Transit Süresi (gün)',
      containerLCL: 'LCL (Parsiyel)',
      containerFCL20: '20\' FCL',
      containerFCL40: '40\' FCL',
      containerFCL40HC: '40\' HC FCL',
      
      // Air Freight Fields
      airFreightDetails: 'Havayolu Detayları',
      airCargoWeight: 'Kargo Ağırlığı (kg)',
      airVolume: 'Hacim (CBM)',
      calculatedACW: 'Hesaplanan ACW',
      acwNote: 'ACW = maks(brüt ağırlık, hacim × 167)',
      departureAirport: 'Çıkış Havalimanı',
      arrivalAirport: 'Varış Havalimanı',
      airlineCarrier: 'Havayolu',
      airTransitTime: 'Transit Süresi (gün)',
      
      // Land Freight Fields
      landFreightDetails: 'Karayolu Detayları',
      landVolume: 'Hacim (CBM)',
      truckType: 'Tır Tipi',
      truckDedicated: 'Tam Tır',
      truckGroupage: 'Parsiyel',
      landTransitTime: 'Transit Süresi (gün)',
      
      // Vehicle Fields
      vehicleDetails: 'Araç Detayları',
      vehicleType: 'Araç Tipi',
      vehicleCar: 'Otomobil',
      vehicleMotorcycle: 'Motosiklet',
      vehicleBoat: 'Tekne',
      vehicleOther: 'Diğer',
      vehicleMake: 'Marka',
      vehicleModel: 'Model',
      vehicleYear: 'Yıl',
      vehicleVIN: 'Şasi No',
      vehicleCondition: 'Araç Durumu',
      vehicleRunning: 'Çalışıyor',
      vehicleNonRunning: 'Çalışmıyor',
      
      // Charges Section
      chargesSection: 'Masraflar',
      seaFreightCharges: 'Denizyolu Masrafları',
      airFreightCharges: 'Havayolu Masrafları',
      landFreightCharges: 'Karayolu Masrafları',
      chargesHint: 'Varsayılan masraflar alıcı ve tipe göre otomatik oluşturulur. Düzenleyebilir veya yeni ekleyebilirsiniz.',
      addCharge: '+ Masraf Ekle',
      chargeDescription: 'Masraf açıklaması',
      chargeTypeFixed: 'Sabit',
      chargeTypeRange: 'Aralık',
      
      // Quote Includes
      quotationIncludes: 'Teklif Kapsamı',
      quotationIncludesHint: 'Teklife dahil edilecek öğeleri seçin (öğeler mod ve tipe göre otomatik doldurulur):',
      addCustomInclude: 'Özel Öğe Ekle',
      
      // Additional Charges
      additionalCharges: 'Ek Masraflar',
      additionalChargesHint: 'Bu masraflar teklif fiyatına dahil değildir ve geçerli olması halinde ayrıca faturalandırılacaktır:',
      addCustomCharge: 'Özel Masraf Ekle',
      
      // Consignment Instructions
      consignmentInstructions: 'Konşimento Talimatları',
      importRequirementsTitle: 'İthalat Gereklilikleri ve Konşimento Talimatları',
      consignmentOfficeLabel: 'Ofis / Varış Şehri',
      includeConsignmentLabel: 'Teklife konşimento talimatları ekle',
      selectRequirementsHint: 'Dahil edilecek ithalat gerekliliklerini seçin (isteğe bağlı - birden fazla veya hiçbiri seçilebilir):',
      foreignNationalLabel: 'Yabancı Uyruklu (çalışma/ikamet için Türkiye\'ye taşınan)',
      returningTurkishLabel: 'Yurda Dönen Türk Vatandaşları',
      diplomaticLabel: 'Yabancı Uyruklu (Diplomatik)',
      includeConsignment: 'Konşimento talimatları ve ithalat gereksinimlerini teklife dahil et',
      clientCategory: 'Müşteri Kategorisi',
      categoryForeignNational: 'Yabancı Uyruklu',
      categoryReturningTurkish: 'Dönen Türk Vatandaşı',
      categoryDiplomatic: 'Diplomatik',
      
      // Quote Actions
      saveQuote: 'Teklifi Kaydet',
      exportPdf: 'PDF İndir',
      convertToMove: 'Taşımaya Dönüştür',
      deleteQuote: 'Teklifi Sil',
      quoteInfo: 'Teklif Bilgileri',
      routeInfo: 'Rota Bilgileri',
      validityDate: 'Geçerlilik Tarihi',
      
      // Common / Shared
      yes: 'Evet',
      no: 'Hayır',
      none: 'Yok',
      select: 'Seçin',
      optional: 'opsiyonel',
      required: 'zorunlu',
      example: 'örn.',
      loading: 'Yükleniyor...',
      noResults: 'Sonuç bulunamadı',
      confirm: 'Onayla',
      warning: 'Uyarı',
      error: 'Hata',
      success: 'Başarılı',
      info: 'Bilgi',
      noClientName: 'Müşteri adı yok',
      
      // Placeholders
      phSearchMoves: 'Taşıma no, müşteri, çıkış, varış, acente ile ara...',
      phSearchAgents: 'Acente adı, şehir, ülke ile ara...',
      phSearchDocs: 'Taşıma no, müşteri, belge adı, acente ile ara...',
      phSearchStorage: 'Kod, müşteri, lokasyon ile ara...',
      phSearchQuotes: 'Teklif no, müşteri, çıkış, varış ile ara...',
      phEnterChecklist: 'Kontrol maddesi girin...',
      phDocLabel: 'Belge Adı',
      phMediaLabel: 'Etiket / Açıklama',
      phWriteNote: 'Bu taşıma hakkında not yazın...',
      phPhone: '+90 555 123 4567',
      phEmail: 'musteri@ornek.com',
      phTag: 'örn. Diplomatik, VIP, Askeri...',
      phFloor: 'örn. 3',
      phAccessConditions: 'örn. Dar merdiven',
      phMoveManager: 'Bu taşımadan sorumlu kişi',
      phContainerDetails: 'örn. 1x20ft FCL, 1x40ft HQ',
      phVolume: 'örn. 14.5',
      phWeight: 'örn. 2500',
      phACW: 'örn. 835',
      phMake: 'örn. Toyota',
      phModel: 'örn. Camry',
      phYear: 'örn. 2022',
      phVIN: 'Araç Şasi Numarası',
      phOrigin: 'İstanbul, Türkiye',
      phDestination: 'Dubai, BAE',
      
      // Form Labels
      lblClientInfo: 'Müşteri Bilgileri',
      lblMoveInfo: 'Taşıma Bilgileri',
      lblRoute: 'Rota',
      lblOriginDetails: 'Çıkış Detayları',
      lblDestinationDetails: 'Varış Detayları',
      lblModeDetails: 'Mod Detayları',
      lblShipmentContents: 'Gönderi İçeriği',
      lblVehicleDetails: 'Araç Detayları',
      lblBrokers: 'Aracılar',
      lblPhone: 'Telefon',
      lblEmail: 'E-posta',
      lblFloor: 'Kat',
      lblElevator: 'Asansör',
      lblFreightElevator: 'Yük Asansörü',
      lblAccessConditions: 'Erişim Koşulları',
      lblTag: 'Etiket',
      lblNotes: 'Notlar',
      lblContainerDetails: 'Konteyner Detayları',
      lblVolumeCBM: 'Hacim (CBM)',
      lblGrossWeight: 'Brüt Ağırlık (kg)',
      lblCalculatedACW: 'Hesaplanan ACW (kg)',
      lblHouseholdGoods: 'Ev Eşyaları (HHE)',
      lblVehicle: 'Araç / Otomobil',
      lblVehicleType: 'Araç Tipi',
      lblVehicleMake: 'Marka',
      lblVehicleModel: 'Model',
      lblVehicleYear: 'Yıl',
      lblVehicleVIN: 'Şasi No',
      lblVehicleCondition: 'Durum',
      lblRunning: 'Çalışıyor',
      lblNonRunning: 'Çalışmıyor',
      lblCustomsBroker: 'Gümrük Müşaviri',
      lblSeaFreightBroker: 'Denizyolu Aracısı',
      lblAirFreightBroker: 'Havayolu Aracısı',
      lblSelectBroker: 'Aracı seçin',
      
      // Move Form Labels
      tagLabel: 'Etiket (isteğe bağlı)',
      originCityLabel: 'Çıkış Şehri',
      originCountryLabel: 'Çıkış Ülkesi',
      originAddressLabel: 'Tam Çıkış Adresi',
      originFloorLabel: 'Kat',
      originElevatorLabel: 'Asansör',
      originAccessLabel: 'Erişim Koşulları',
      destinationCityLabel: 'Varış Şehri',
      destinationCountryLabel: 'Varış Ülkesi',
      destinationAddressLabel: 'Tam Varış Adresi',
      destinationFloorLabel: 'Kat',
      destinationElevatorLabel: 'Asansör',
      destinationAccessLabel: 'Erişim Koşulları',
      tradeDirectionLabel: 'Ticaret Yönü',
      modeLabel: 'Mod',
      moveManagerLabel: 'Taşıma Yöneticisi',
      moveManagerPlaceholder: 'Bu taşımadan sorumlu kişi',
      seaFreightDetailsTitle: 'Denizyolu Detayları',
      airFreightDetailsTitle: 'Havayolu Detayları',
      landFreightDetailsTitle: 'Karayolu Detayları',
      vehicleDetailsTitle: 'Araç Detayları',
      storageRequired: 'Bu taşıma depolama gerektirir',
      stepsHint: 'Taşıma oluşturduktan sonra, Taşıma Detayları bölümünde "Adım Ekle" butonu ile adımları (Survey, Paketleme, Konteyner, Teslimat vb.) manuel olarak ekleyebilirsiniz.',
      vehicleCar: 'Otomobil',
      vehicleMotorcycle: 'Motosiklet',
      vehicleTruck: 'Kamyon',
      vehicleBoat: 'Tekne',
      vehicleOther: 'Diğer',
      grossWeightOptional: 'Brüt Ağırlık (kg) - isteğe bağlı',
      containerDetailsLabel: 'Konteyner Detayları',
      volumeCbmLabel: 'Hacim (CBM)',
      grossWeightLabel: 'Brüt Ağırlık (kg)',
      cargoWeightLabel: 'Kargo Ağırlığı (kg)',
      calculatedAcwLabel: 'Hesaplanan ACW (kg)',
      shipmentContentsLabel: 'Gönderi İçeriği',
      seaVolumeLabel: 'Deniz Kargo Hacmi (cbm)',
      airVolumeLabel: 'Hava Kargo Hacmi (cbm)',
      airWeightLabel: 'Hava Kargo Ağırlığı (kg)',
      acwLabel: 'Ücretlendirilebilir Ağırlık / ACW (kg)',
      landVolumeLabel: 'Kara Kargo Hacmi (cbm)',
      vehicleTypeLabel: 'Araç Tipi',
      vehicleMakeLabel: 'Araç Markası',
      vehicleModelLabel: 'Araç Modeli',
      vehicleYearLabel: 'Araç Yılı',
      vinLabel: 'Şasi Numarası (isteğe bağlı)',
      conditionLabel: 'Durum',
      
      // Buttons
      btnAdd: 'Ekle',
      btnSave: 'Kaydet',
      btnCancel: 'İptal',
      btnDelete: 'Sil',
      btnEdit: 'Düzenle',
      btnClose: 'Kapat',
      btnExport: 'Dışa Aktar',
      btnImport: 'İçe Aktar',
      btnDownload: 'İndir',
      btnUpload: 'Yükle',
      btnOpenLink: 'Bağlantıyı Aç',
      btnAddNote: 'Not Ekle',
      btnAddDocument: 'Belge Ekle',
      btnAddMedia: 'Medya Ekle',
      btnAddChecklistItem: 'Madde Ekle',
      btnSaveMove: 'Taşımayı Kaydet',
      btnAddBroker: 'Aracı Ekle',
      btnAddResource: 'Kaynak Ekle',
      addChecklistItem: 'Madde Ekle',
      selectCountry: 'Ülke seçin',
      selectType: 'Tip seçin',
      selectStatus: 'Durum seçin',
      selectOriginAgent: 'Çıkış acentesi seçin',
      selectDestinationAgent: 'Varış acentesi seçin',
      resourceDetails: 'Kaynak Detayları',
      hintSelectResource: 'Detayları görmek için soldan bir kaynak seçin.',
      usedInMoves: 'taşıma',
      usedInMove: 'taşıma',
      addCategory: 'Kategori Ekle',
      editCategory: 'Kategoriyi Düzenle',
      deleteCategory: 'Kategoriyi Sil',
      categoryName: 'Kategori Adı',
      categoryNameEn: 'Kategori Adı (İngilizce)',
      categoryNameTr: 'Kategori Adı (Türkçe)',
      noCategories: 'Henüz kategori yok. Başlamak için bir kategori ekleyin.',
      confirmDeleteCategory: 'Bu kategori silinsin mi? İçindeki tüm kaynaklar da silinecek.',
      categoryAdded: 'Kategori eklendi!',
      categoryUpdated: 'Kategori güncellendi!',
      categoryDeleted: 'Kategori silindi.',
      cannotDeleteNonEmpty: 'İçinde kaynak olan kategori silinemez. Önce kaynakları silin.',
      
      // Job Modal
      createMoveTitle: 'Yeni Taşıma Oluştur',
      editMoveTitle: 'Taşımayı Düzenle',
      
      // Section Headers
      sectionChecklist: 'Kontrol Listesi',
      sectionDocuments: 'Belgeler',
      sectionPhotosVideos: 'Fotoğraflar ve Videolar',
      sectionNotes: 'Notlar',
      sectionMoveAgents: 'Taşıma Acenteleri',
      sectionSeaFreightDetails: 'Denizyolu Detayları',
      sectionAirFreightDetails: 'Havayolu Detayları',
      sectionLandFreightDetails: 'Karayolu Detayları',
      moveAgentsTitle: 'Taşıma Acenteleri',
      checklistTitle: 'Kontrol Listesi',
      documentsTitle: 'Belgeler',
      photosVideosTitle: 'Fotoğraflar ve Videolar',
      notesTitle: 'Notlar',
      
      // Move Details Labels
      lblVolume: 'Hacim',
      lblContainer: 'Konteyner',
      lblCargoWeightShort: 'Kargo Ağırlığı',
      lblChargeableWeight: 'Ücretlendirilebilir Ağırlık (ACW)',
      lblTruckType: 'Tır Tipi',
      
      // Agent Section
      agentsTitle: 'Acenteler',
      agentDetailsTitle: 'Acente Detayları',
      
      // Storage Statuses
      statusActive: 'Aktif',
      statusClosed: 'Çıktı',
      statusInStorage: 'Depoda',
      statusFullyRetrieved: 'Tamamen Alındı',
      statusPartiallyRetrieved: 'Kısmen Alındı',
      
      // Booking Types
      bookingDoorToDoor: 'Kapıdan Kapıya',
      bookingDoorToPort: 'Kapıdan Limana',
      bookingPortToDoor: 'Limandan Kapıya',
      
      // Client Types
      clientTypePrivate: 'Bireysel',
      clientTypeCorporate: 'Kurumsal',
      clientTypeDiplomatic: 'Diplomatik',
      
      // Contents Types
      contentsHHE: 'Ev Eşyaları',
      contentsVehicle: 'Araç',
      
      // Units
      unitDays: 'gün',
      unitDay: 'gün',
      unitMonth: 'ay',
      unitMonths: 'ay',
      unitKg: 'kg',
      unitCbm: 'cbm',
      
      // Storage Billing
      perCBM: 'CBM Başına',
      flatRate: 'Sabit Ücret',
      
      // File Upload
      dragDropText: 'Dosyayı buraya sürükleyin veya tıklayarak seçin',
      labelDescription: 'Etiket / Açıklama',
      
      // Extra Job Types (for schedule dropdown)
      jobCustom: 'Özel',
      jobPacking: 'Paketleme',
      jobSurvey: 'Survey',
      jobDeliveryToResidence: 'Eve Teslimat',
      jobContainerDelivery: 'Konteyner Teslimatı',
      jobContainerPickup: 'Konteyner Alımı',
      jobContainerUnloading: 'Konteyner Boşaltma',
      jobContainerLoading: 'Konteyner Yükleme',
      jobAirCargoPacking: 'Hava Kargo Paketleme',
      jobAirCargoDeliveryToAddress: 'Hava Kargo Adrese Teslimat',
      jobAirCargoDeliveryToAirport: 'Hava Kargo Havalimanına Teslimat',
      jobDeliveryToPort: 'Limana Teslimat',
      jobPickupFromPort: 'Limandan Alım',
      jobAirCargoPickup: 'Hava Kargo Alımı',
      jobAirCargoDelivery: 'Hava Kargo Teslimat',
      jobWarehouseCleaning: 'Depo Temizliği',
      jobTruckPreparation: 'Tır Hazırlama',
      jobVehicleDelivery: 'Araç Teslimatı',
      jobVehiclePickup: 'Araç Alımı',
      
      // Misc
      additionalJob: 'Ek İş',
      video: 'Video',
      media: 'Medya',
      nameEnglish: 'İsim (İngilizce)',
      nameTurkish: 'İsim (Türkçe)',
      selectQuoteToSee: 'Detayları görmek için bir teklif seçin.',
      selectModeAndType: 'Mevcut öğeleri görmek için mod ve tip seçin',
      selectTypeToSee: 'Mevcut öğeleri görmek için tip seçin',
      freightItems: 'Navlun Kalemleri',
      additionalItemsIf: 'Ek kalemler (ilgili masraflar dahilse)',
      to: '-',
      previousMoves: 'Önceki Taşımalar',
      costBreakdown: 'Maliyet Dökümü',
      moving: 'Taşıma',
      subtotal: 'Ara Toplam',
      total: 'Toplam',
      addCharge: 'Masraf Ekle',
      editCharge: 'Masrafı Düzenle',
      deleteCharge: 'Masrafı Sil',
      retrieveItem: 'Al',
      selectOffice: 'Ofis Seçin',
      clientNameOptional: 'Müşteri Adı (opsiyonel)',
      enterClientName: 'Müşteri adı girin...',
      dateLabel: 'Tarih',
      timeLabel: 'Saat',
      personnelLabel: 'Personel',
      vehicleLabel: 'Araç',
      addressLabel: 'Adres',
      officeLabel: 'Ofis',
      freeDaysLabel: 'Ücretsiz Günler',
      billableDaysLabel: 'Faturalanabilir Günler',
      totalDays: 'gün toplam',
      estimatedCostLabel: 'Tahmini Maliyet',
      totalCostLabel: 'Toplam Maliyet',
      billingInfoLabel: 'Faturalama Bilgileri',
      billingTypeLabel: 'Faturalama Tipi',
      rateLabel: 'Ücret',
      // Day of week abbreviations
      dowMon: 'Pzt',
      dowTue: 'Sal',
      dowWed: 'Çar',
      dowThu: 'Per',
      dowFri: 'Cum',
      dowSat: 'Cmt',
      dowSun: 'Paz',
      // Filter labels
      filterAll: 'Tümü',
      typeAll: 'Tüm Tipler',
      typeImport: 'İthalat',
      typeExport: 'İhracat',
      typeLocal: 'Yurtiçi',
      payAll: 'Tümü',
      payPaid: 'Ödendi',
      payUnpaid: 'Ödenmedi',
      // Button labels
      btnAddAgent: 'Acente Ekle',
      btnAddNewMove: 'Yeni Taşıma',
      btnEditMove: 'Taşımayı Düzenle',
      btnExportData: 'Veriyi Dışa Aktar',
      btnImportData: 'Veri İçe Aktar',
      btnImportNow: 'İçe Aktar',
      // Section titles
      dayDetailsTitle: 'Gün Detayları',
      moveDetailsTitle: 'Taşıma Detayları',
      scheduleTitle: 'Takvim',
      modalAddAgentTitle: 'Acente Ekle',
      modalCreateMoveTitle: 'Taşıma Oluştur',
      // Misc
      addNoteLabel: 'Not Ekle',
      docsAllMoves: 'Tüm Taşımalar',
      hintAgentsAppear: 'Acenteler burada görünecek',
      hintSelectDay: 'Detayları görmek için bir gün seçin',
      hintSelectMove: 'Detayları görmek için bir taşıma seçin',
      importHint: 'İçe aktarmak için bir JSON dosyası seçin',
      importNote: 'Bu işlem mevcut tüm verileri değiştirecektir',
      footerCopyright: '© İstanbul Ekspres',
      deleteConfirm: 'Silme Onayı',
      status: 'Durum',
      dateFormatHint: '(GG/AA/YYYY)',
      dateFormatPlaceholder: 'gg/aa/yyyy'
    }
  },

  t(key, vars) {
    const lang = State.lang || 'en';
    const base = (this.dict[lang] && this.dict[lang][key]) ?? (this.dict.en[key] ?? key);
    if (!vars) return base;
    return Object.keys(vars).reduce((s, k) => s.replaceAll(`{${k}}`, String(vars[k])), base);
  },

  // ---- enum helpers (keeps stored values stable, translates display) ----
  statusText(status) {
    const key = `status${String(status || '').trim()}`;
    if (this.dict[State.lang] && this.dict[State.lang][key]) return this.t(key);
    if (this.dict.en && this.dict.en[key]) return this.t(key);
    // fallback to existing per-button translations if they exist
    const map = { Planned: 'planned', Ongoing: 'ongoing', Completed: 'completed', Cancelled: 'cancelled' };
    if (map[status]) return this.t(map[status]);
    return status || '-';
  },
  
  // Bilingual status text for search (returns both EN and TR)
  statusTextBilingual(status) {
    const key = `status${String(status || '').trim()}`;
    const en = (this.dict.en && this.dict.en[key]) ? this.dict.en[key] : status;
    const tr = (this.dict.tr && this.dict.tr[key]) ? this.dict.tr[key] : status;
    return `${en} ${tr}`;
  },

  typeText(type) {
    const map = { Import: 'importType', Export: 'exportType', Local: 'localType' };
    return map[type] ? this.t(map[type]) : (type || '-');
  },
  
  // Bilingual type text for search (returns both EN and TR)
  typeTextBilingual(type) {
    const map = { Import: 'importType', Export: 'exportType', Local: 'localType' };
    if (!map[type]) return type || '';
    const key = map[type];
    const en = this.dict.en[key] || type;
    const tr = this.dict.tr[key] || type;
    return `${en} ${tr}`;
  },

  modeText(mode) {
    const m = String(mode || '');
    const map = { Sea: 'modeSea', Land: 'modeLand', Air: 'modeAir' };
    return map[m] ? this.t(map[m]) : (m || '-');
  },
  
  // Bilingual mode text for search
  modeTextBilingual(mode) {
    const m = String(mode || '');
    const map = { Sea: 'modeSea', Land: 'modeLand', Air: 'modeAir' };
    if (!map[m]) return m || '';
    const key = map[m];
    const en = this.dict.en[key] || m;
    const tr = this.dict.tr[key] || m;
    return `${en} ${tr}`;
  },

  modesText(modes) {
    const arr = Array.isArray(modes) ? modes : [];
    if (!arr.length) return (State.lang === 'tr') ? 'Mod yok' : 'No mode';
    return arr.map(m => this.modeText(m)).join(' + ');
  },
  
  // Bilingual modes text for search
  modesTextBilingual(modes) {
    const arr = Array.isArray(modes) ? modes : [];
    return arr.map(m => this.modeTextBilingual(m)).join(' ');
  },

  stepText(step) {
    const id = step && step.id ? String(step.id) : '';
    const key = `step_${id}`;
    if (this.dict[State.lang] && this.dict[State.lang][key]) return this.t(key);
    if (this.dict.en && this.dict.en[key]) return this.t(key);
    return (step && step.label) ? step.label : (id || '-');
  },

  // Storage status translation
  storageStatusText(status) {
    const map = {
      'Active': 'statusActive',
      'Closed': 'statusClosed',
      'In Storage': 'statusInStorage',
      'Fully Retrieved': 'statusFullyRetrieved',
      'Partially Retrieved': 'statusPartiallyRetrieved'
    };
    return map[status] ? this.t(map[status]) : (status || '-');
  },
  
  // Bilingual storage status for search
  storageStatusTextBilingual(status) {
    const map = {
      'Active': 'statusActive',
      'Closed': 'statusClosed',
      'In Storage': 'statusInStorage',
      'Fully Retrieved': 'statusFullyRetrieved',
      'Partially Retrieved': 'statusPartiallyRetrieved'
    };
    if (!map[status]) return status || '';
    const key = map[status];
    const en = this.dict.en[key] || status;
    const tr = this.dict.tr[key] || status;
    return `${en} ${tr}`;
  },

  // Agent/Broker type translation
  agentTypeText(type) {
    const map = {
      'Agent': 'typeAgent',
      'Customs Broker': 'typeCustomsBroker',
      'Sea Freight Broker': 'typeSeaFreightBroker',
      'Air Freight Broker': 'typeAirFreightBroker'
    };
    return map[type] ? this.t(map[type]) : (type || '-');
  },
  
  // Bilingual agent type for search
  agentTypeTextBilingual(type) {
    const map = {
      'Agent': 'typeAgent',
      'Customs Broker': 'typeCustomsBroker',
      'Sea Freight Broker': 'typeSeaFreightBroker',
      'Air Freight Broker': 'typeAirFreightBroker'
    };
    if (!map[type]) return type || '';
    const key = map[type];
    const en = this.dict.en[key] || type;
    const tr = this.dict.tr[key] || type;
    return `${en} ${tr}`;
  },

  // Booking type translation
  bookingTypeText(type) {
    const map = {
      'Door to Door': 'bookingDoorToDoor',
      'Door to Port': 'bookingDoorToPort',
      'Port to Door': 'bookingPortToDoor'
    };
    return map[type] ? this.t(map[type]) : (type || '-');
  },

  // Client type translation
  clientTypeText(type) {
    const map = {
      'Private': 'clientTypePrivate',
      'Corporate': 'clientTypeCorporate',
      'Diplomatic': 'clientTypeDiplomatic'
    };
    return map[type] ? this.t(map[type]) : (type || '-');
  },

  // Contents type translation
  contentsText(contents) {
    if (!contents) return '-';
    if (Array.isArray(contents)) {
      return contents.map(c => this.contentsText(c)).join(', ');
    }
    const map = {
      'HHE': 'contentsHHE',
      'Household Goods': 'contentsHHE',
      'Vehicle': 'contentsVehicle'
    };
    return map[contents] ? this.t(map[contents]) : contents;
  },

  // Billing type translation
  billingTypeText(type) {
    const map = {
      'Per CBM': 'perCBM',
      'Flat Rate': 'flatRate'
    };
    return map[type] ? this.t(map[type]) : (type || '-');
  },

  // Extra job type translation
  extraJobTypeText(taskType) {
    const t = String(taskType || '').trim();
    if (!t) return '-';
    
    // Map task types to translation keys
    const map = {
      'Custom': 'jobCustom',
      'Packing': 'jobPacking',
      'Survey': 'jobSurvey',
      'Delivery to Residence': 'jobDeliveryToResidence',
      'Container Delivery': 'jobContainerDelivery',
      'Container Pickup': 'jobContainerPickup',
      'Container Unloading': 'jobContainerUnloading',
      'Container Loading': 'jobContainerLoading',
      'Air Cargo Packing': 'jobAirCargoPacking',
      'Air Cargo Delivery to Address': 'jobAirCargoDeliveryToAddress',
      'Air Cargo Delivery to Airport': 'jobAirCargoDeliveryToAirport',
      'Delivery to Port': 'jobDeliveryToPort',
      'Pickup from Port': 'jobPickupFromPort',
      'Air Cargo Pickup': 'jobAirCargoPickup',
      'Air Cargo Delivery': 'jobAirCargoDelivery',
      'Warehouse Cleaning': 'jobWarehouseCleaning',
      'Truck Preparation': 'jobTruckPreparation',
      'Vehicle Delivery': 'jobVehicleDelivery',
      'Vehicle Pickup': 'jobVehiclePickup'
    };
    
    return map[t] ? this.t(map[t]) : t;
  },

  // Unit translation with value
  formatDays(value) {
    return `${value} ${this.t('unitDays')}`;
  },

  formatMonth(value) {
    return `${value} ${this.t('unitMonth')}`;
  },

taskTypeText(taskType) {
  return this.extraJobTypeText(taskType);
},
  
checklistText(text) {
  if (State.lang === 'tr') return TR.checklist(text);
  return text; // English: return as-is
},
  
  loadLang() {
    try {
      const saved = localStorage.getItem(CONFIG.STORAGE_KEYS.LANG);
      const parsed = saved ? JSON.parse(saved) : null;
      if (parsed === 'tr' || parsed === 'en') return parsed;
    } catch (e) {}
    return 'en';
  },

  saveLang(lang) {
    State.lang = lang;
    try {
      localStorage.setItem(CONFIG.STORAGE_KEYS.LANG, JSON.stringify(lang));
    } catch (e) {}
  },

  ensureToggle() {
    // Language toggle is now in the top header HTML, just attach event handler
    const langBtn = document.getElementById('langToggleBtn');
    const langLabel = document.getElementById('langLabel');
    
    if (langBtn && !langBtn.hasAttribute('data-initialized')) {
      langBtn.setAttribute('data-initialized', 'true');
      
      // Set initial label (short form)
      if (langLabel) {
        langLabel.textContent = State.lang === 'tr' ? 'TR' : 'EN';
      }

      langBtn.addEventListener('click', () => {
        const next = (State.lang === 'tr') ? 'en' : 'tr';
        this.saveLang(next);
        if (langLabel) {
          langLabel.textContent = next === 'tr' ? 'TR' : 'EN';
        }
        this.applyStaticTexts();
        Forms.refreshCountrySelects();
        DashboardUI.render();
        JobsUI.render();
        if (State.selectedJobId) {
          const job = State.getJob(State.selectedJobId);
          if (job) JobsUI.showDetails(job);
        }
        AgentsUI.render();
        if (State.selectedAgentId) {
          const ag = State.getAgent(State.selectedAgentId);
          if (ag) AgentsUI.showDetails(ag);
        }
        ScheduleUI.render();
        if (State.schedule.selectedDate) ScheduleUI.renderDay(State.schedule.selectedDate);
        DocumentsTabUI.render();
        QuotesUI.render();
        if (State.selectedQuoteId) {
          const quote = State.quotes.find(q => q.id === State.selectedQuoteId);
          if (quote) QuotesUI.showDetails(quote);
        }
        StorageUI.render();
        if (State.selectedStorageId) {
          const storage = State.getStorage(State.selectedStorageId);
          if (storage) StorageUI.showDetails(storage);
        }
      });
    } else if (langLabel) {
      langLabel.textContent = State.lang === 'tr' ? 'Türkçe' : 'English';
    }
  },

  applyStaticTexts() {
    // Update sidebar nav labels (they have nested .nav-label spans)
    const navDashboard = $.get('navDashboard'); 
    if (navDashboard) {
      const label = navDashboard.querySelector('.nav-label');
      if (label) label.textContent = this.t('dashboard');
    }
    const navMoves = $.get('navMoves'); 
    if (navMoves) {
      const label = navMoves.querySelector('.nav-label');
      if (label) label.textContent = this.t('moves');
    }
    const navAgents = $.get('navAgents'); 
    if (navAgents) {
      const label = navAgents.querySelector('.nav-label');
      if (label) label.textContent = this.t('agents');
    }
    const navSchedule = $.get('navSchedule'); 
    if (navSchedule) {
      const label = navSchedule.querySelector('.nav-label');
      if (label) label.textContent = this.t('schedule');
    }
    const navDocuments = $.get('navDocuments'); 
    if (navDocuments) {
      const label = navDocuments.querySelector('.nav-label');
      if (label) label.textContent = this.t('documents');
    }
    const navQuotes = $.get('navQuotes'); 
    if (navQuotes) {
      const label = navQuotes.querySelector('.nav-label');
      if (label) label.textContent = this.t('quotes');
    }
    
    // Dashboard title
    const dashboardTitle = document.querySelector('#dashboardView .dashboard-header h2');
    if (dashboardTitle) dashboardTitle.textContent = this.t('dashboard');
    
const scheduleDayDetailsTitle = document.querySelector('#scheduleView .right-panel .header-row h2');
if (scheduleDayDetailsTitle) scheduleDayDetailsTitle.textContent = this.t('dayDetails');
    const scheduleViewTitle = document.querySelector('#scheduleView .left-panel .header-row h2');
if (scheduleViewTitle) scheduleViewTitle.textContent = this.t('schedule');
    const scheduleHintText = document.querySelector('#scheduleDayDetails p[data-i18n="hintSelectDay"]');
if (scheduleHintText) scheduleHintText.textContent = this.t('scheduleDayDetailsHint');

const checklistSection = $.get('checklistSection');
if (checklistSection) {
  const label = checklistSection.querySelector('label');
  if (label) label.textContent = this.t('customChecklist');
}

const addNoteLabel = document.querySelector('#notesSection label');
if (addNoteLabel) addNoteLabel.textContent = this.t('addNote');

const docNameLabel = document.querySelector('#documentsSection label[data-i18n="docNameLabel"]');
if (docNameLabel) docNameLabel.textContent = this.t('docNameLabel');

const docDateLabel = document.querySelector('#documentsSection label[data-i18n="docDateLabel"]');
if (docDateLabel) docDateLabel.textContent = this.t('docDateLabel');

const docUploadLabel = document.querySelector('#documentsSection label[data-i18n="docUploadLabel"]');
if (docUploadLabel) docUploadLabel.textContent = this.t('docUploadLabel');
    const openCreateJob = $.get('openCreateJob'); if (openCreateJob) openCreateJob.textContent = this.t('addNewMove');
    const editJobBtn = $.get('editJobBtn'); if (editJobBtn) editJobBtn.textContent = this.t('editMove');
    const openCreateAgentBtn = $.get('openCreateAgentBtn'); if (openCreateAgentBtn) openCreateAgentBtn.textContent = this.t('addAgentTitle');

    const searchInput = $.get('searchInput'); if (searchInput) searchInput.placeholder = this.t('searchMovesPh');
    const agentSearchInput = $.get('agentSearchInput'); if (agentSearchInput) agentSearchInput.placeholder = this.t('searchAgentsPh');
    const documentsSearchInput = $.get('documentsSearchInput'); if (documentsSearchInput) documentsSearchInput.placeholder = this.t('searchDocsPh');
const checklistInput = $.get('checklistInput');
if (checklistInput) {
  checklistInput.placeholder = (State.lang === 'tr') 
    ? 'Örnek:\nPaketleme tamamlandı\nGümrük belgeleri hazır\nÖdeme alındı'
    : 'Example:\nPacking complete\nCustoms docs ready\nPayment received';
}

const newNoteText = $.get('newNoteText');
if (newNoteText) {
  newNoteText.placeholder = (State.lang === 'tr') 
    ? 'Bu taşıma hakkında not yazın...'
    : 'Write a note about this move...';
}

const docNameInput = $.get('docNameInput');
if (docNameInput) {
  docNameInput.placeholder = (State.lang === 'tr') 
    ? 'örn. Teklif #123, Konşimento, Envanter Listesi'
    : 'e.g. Quote #123, Bill of Lading, Packing List';
}

const docUrlInput = $.get('docUrlInput');
if (docUrlInput) {
  docUrlInput.placeholder = (State.lang === 'tr') 
    ? 'https://... (Drive/SharePoint/vb.)'
    : 'https://... (Drive/SharePoint/etc.)';
}
    const statusFilters = $.get('statusFilters');
    if (statusFilters) {
      const map = { All: 'all', Planned: 'planned', Ongoing: 'ongoing', Completed: 'completed', Cancelled: 'cancelled' };
      statusFilters.querySelectorAll('button.filter-btn').forEach(btn => {
        const st = btn.getAttribute('data-status');
        if (map[st]) btn.textContent = this.t(map[st]);
      });
    }

    const typeFilter = $.get('typeFilter');
    if (typeFilter) {
      const opts = Array.from(typeFilter.options);
      opts.forEach(o => {
        if (o.value === 'All') o.textContent = this.t('allTypes');
        if (o.value === 'Import') o.textContent = this.t('importType');
        if (o.value === 'Export') o.textContent = this.t('exportType');
        if (o.value === 'Local') o.textContent = this.t('localType');
      });
    }

    const paymentFilter = $.get('paymentFilter');
    if (paymentFilter) {
      const opts = Array.from(paymentFilter.options);
      opts.forEach(o => {
        if (o.value === 'All') o.textContent = this.t('allPayments');
        if (o.value === 'Paid') o.textContent = this.t('paid');
        if (o.value === 'Unpaid') o.textContent = this.t('unpaid');
      });
    }

    const documentsJobFilter = $.get('documentsJobFilter');
    if (documentsJobFilter && documentsJobFilter.options && documentsJobFilter.options[0]) {
      documentsJobFilter.options[0].textContent = this.t('allMovesFilter');
    }

    const schedHeader = document.querySelector('.schedule-calendar-header');
    if (schedHeader && schedHeader.children.length >= 7) {
      const days = ['monday','tuesday','wednesday','thursday','friday','saturday','sunday'];
      days.forEach((k, i) => {
        if (schedHeader.children[i]) schedHeader.children[i].textContent = this.t(k);
      });
    }

    const adminToolsTitle = document.querySelector('.admin-tools h3');
    if (adminToolsTitle) adminToolsTitle.textContent = this.t('dataToolsTitle');

    const exportBtn = $.get('exportDataBtn'); if (exportBtn) exportBtn.textContent = this.t('exportData');
    const toggleImportAreaBtn = $.get('toggleImportAreaBtn'); if (toggleImportAreaBtn) toggleImportAreaBtn.textContent = this.t('toggleImportArea');
    const importNowBtn = $.get('importDataBtn'); if (importNowBtn) importNowBtn.textContent = this.t('importNow');

    const importArea = $.get('importArea');
    if (importArea) {
      const p = importArea.querySelector('p');
      if (p) p.textContent = this.t('importAreaHint');
    }

    const langBtn = document.getElementById('langToggleBtn');
    if (langBtn) langBtn.textContent = this.t('langShort');
    
    // ========== QUOTES SECTION ==========
    const quotesViewTitle = document.querySelector('#quotesView .left-panel .header-row h2');
    if (quotesViewTitle) quotesViewTitle.textContent = this.t('quotesTitle');
    
    const openCreateQuote = $.get('openCreateQuote');
    if (openCreateQuote) openCreateQuote.textContent = this.t('btnAddNewQuote');
    
    const quoteDetailsTitle = document.querySelector('#quotesView .right-panel .header-row h2');
    if (quoteDetailsTitle) quoteDetailsTitle.textContent = this.t('quoteDetailsTitle');
    
    const editQuoteBtn = $.get('editQuoteBtn');
    if (editQuoteBtn) editQuoteBtn.textContent = this.t('btnEditQuote');
    
    const quoteSearchInput = $.get('quoteSearchInput');
    if (quoteSearchInput) quoteSearchInput.placeholder = this.t('searchQuotesPlaceholder');
    
    const hintSelectQuote = document.querySelector('#quoteDetails > p');
    if (hintSelectQuote) hintSelectQuote.textContent = this.t('hintSelectQuote');
    
    // Quote modal title
    const quoteModalTitle = $.get('quoteModalTitle');
    if (quoteModalTitle) {
      quoteModalTitle.textContent = State.quoteFormMode === 'edit' ? this.t('editQuoteTitle') : this.t('createQuoteTitle');
    }
    
    // ========== STORAGE SECTION ==========
    const navStorage = $.get('navStorage');
    if (navStorage) {
      const label = navStorage.querySelector('.nav-label');
      if (label) label.textContent = this.t('storage');
    }
    
    const storageViewTitle = document.querySelector('#storageView .left-panel .header-row h2');
    if (storageViewTitle) storageViewTitle.textContent = this.t('storageTitle');
    
    const openCreateStorage = $.get('openCreateStorage');
    if (openCreateStorage) openCreateStorage.textContent = this.t('btnAddStorage');
    
    const btnAddStorage = $.get('btnAddStorage');
    if (btnAddStorage) btnAddStorage.textContent = this.t('btnAddStorage');
    
    const storageDetailsTitle = document.querySelector('#storageView .right-panel .header-row h2');
    if (storageDetailsTitle) storageDetailsTitle.textContent = this.t('storageDetailsTitle');
    
    const editStorageBtn = $.get('editStorageBtn');
    if (editStorageBtn) editStorageBtn.textContent = this.t('btnEditStorage');
    
    const storageSearchInput = $.get('storageSearchInput');
    if (storageSearchInput) storageSearchInput.placeholder = this.t('searchStoragePlaceholder');
    
    // Storage filters
    const storageLocationFilter = $.get('storageLocationFilter');
    if (storageLocationFilter && storageLocationFilter.options[0]) {
      storageLocationFilter.options[0].textContent = this.t('allLocations');
    }
    
    const storageStatusFilter = $.get('storageStatusFilter');
    if (storageStatusFilter) {
      if (storageStatusFilter.options[0]) storageStatusFilter.options[0].textContent = this.t('allStatuses');
      // Translate Active and Closed options
      Array.from(storageStatusFilter.options).forEach(opt => {
        if (opt.value === 'Active') opt.textContent = this.t('statusActive');
        if (opt.value === 'Closed') opt.textContent = this.t('statusClosed');
      });
    }
    
    // Active Storage section title
    const activeStorageTitle = document.querySelector('.storage-section-title[data-i18n="activeStorage"]');
    if (activeStorageTitle) activeStorageTitle.textContent = this.t('activeStorage');
    
    // Hint text for storage
    const hintSelectStorage = document.querySelector('#storageDetails > p');
    if (hintSelectStorage) hintSelectStorage.textContent = this.t('hintSelectStorage');
    
    // Storage modal title
    const storageModalTitle = $.get('storageModalTitle');
    if (storageModalTitle) {
      storageModalTitle.textContent = State.storageFormMode === 'edit' ? this.t('modalEditStorageTitle') : this.t('modalAddStorageTitle');
    }
    
    // ========== AGENTS SECTION ==========
    const agentsViewTitle = document.querySelector('#agentsView .left-panel .header-row h2');
    if (agentsViewTitle) agentsViewTitle.textContent = this.t('agentsTitle');
    
    const agentDetailsTitle = document.querySelector('#agentsView .right-panel .header-row h2');
    if (agentDetailsTitle) agentDetailsTitle.textContent = this.t('agentDetailsTitle');
    
    // Agent type tabs
    const agentTypeAgentBtn = document.querySelector('#agentTypeFilter .filter-btn[data-type="Agent"]');
    if (agentTypeAgentBtn) agentTypeAgentBtn.textContent = this.t('agentTypeAgent');
    
    const agentTypeBrokerBtn = document.querySelector('#agentTypeFilter .filter-btn[data-type="Broker"]');
    if (agentTypeBrokerBtn) agentTypeBrokerBtn.textContent = this.t('agentTypeBroker');
    
    // ========== JOB MODAL ==========
    const jobModalTitle = $.get('jobModalTitle');
    if (jobModalTitle) {
      jobModalTitle.textContent = State.jobFormMode === 'edit' ? this.t('editMoveTitle') : this.t('createMoveTitle');
    }
    
    // Job form placeholders
    const clientPhoneInput = document.querySelector('input[name="clientPhone"]');
    if (clientPhoneInput) clientPhoneInput.placeholder = this.t('phPhone');
    
    const clientEmailInput = document.querySelector('input[name="clientEmail"]');
    if (clientEmailInput) clientEmailInput.placeholder = this.t('phEmail');
    
    const tagInput = document.querySelector('input[name="tag"]');
    if (tagInput) tagInput.placeholder = this.t('phTag');
    
    const originFloorInput = document.querySelector('input[name="originFloor"]');
    if (originFloorInput) originFloorInput.placeholder = this.t('phFloor');
    
    const destFloorInput = document.querySelector('input[name="destinationFloor"]');
    if (destFloorInput) destFloorInput.placeholder = this.t('phFloor');
    
    const originAccessInput = document.querySelector('input[name="originAccessConditions"]');
    if (originAccessInput) originAccessInput.placeholder = this.t('phAccessConditions');
    
    const destAccessInput = document.querySelector('input[name="destinationAccessConditions"]');
    if (destAccessInput) destAccessInput.placeholder = this.t('phAccessConditions');
    
    const moveManagerInput = document.querySelector('input[name="moveManager"]');
    if (moveManagerInput) moveManagerInput.placeholder = this.t('phMoveManager');
    
    // Vehicle placeholders
    const vehicleMakeInput = document.querySelector('input[name="jobVehicleMake"]');
    if (vehicleMakeInput) vehicleMakeInput.placeholder = this.t('phMake');
    
    const vehicleModelInput = document.querySelector('input[name="jobVehicleModel"]');
    if (vehicleModelInput) vehicleModelInput.placeholder = this.t('phModel');
    
    const vehicleVINInput = document.querySelector('input[name="jobVehicleVIN"]');
    if (vehicleVINInput) vehicleVINInput.placeholder = this.t('phVIN');
    
    // Checklist input placeholder
    const checklistNewItemInput = $.get('checklistNewItemInput');
    if (checklistNewItemInput) checklistNewItemInput.placeholder = this.t('phEnterChecklist');
    
    // Document label placeholder (use different variable name to avoid conflict)
    const docNameInputEl = $.get('docNameInput');
    if (docNameInputEl) docNameInputEl.placeholder = this.t('phDocLabel');
    
    // Media label placeholder
    const mediaLabelInput = $.get('mediaLabelInput');
    if (mediaLabelInput) mediaLabelInput.placeholder = this.t('phMediaLabel');
    
    // Note textarea placeholder (use different variable name)
    const noteTextarea = $.get('newNoteText');
    if (noteTextarea) noteTextarea.placeholder = this.t('phWriteNote');
    
    // Quote form placeholders
    const quoteOriginInput = document.querySelector('#quoteForm input[name="origin"]');
    if (quoteOriginInput) quoteOriginInput.placeholder = this.t('phOrigin');
    
    const quoteDestInput = document.querySelector('#quoteForm input[name="destination"]');
    if (quoteDestInput) quoteDestInput.placeholder = this.t('phDestination');
    
    const quoteVehicleMake = $.get('quoteVehicleMake');
    if (quoteVehicleMake) quoteVehicleMake.placeholder = this.t('phMake');
    
    const quoteVehicleModel = $.get('quoteVehicleModel');
    if (quoteVehicleModel) quoteVehicleModel.placeholder = this.t('phModel');
    
    const quoteVehicleVIN = $.get('quoteVehicleVIN');
    if (quoteVehicleVIN) quoteVehicleVIN.placeholder = this.t('phVIN');
    
    // ========== JOB DETAILS SECTION TITLES ==========
    const moveAgentsTitle = document.querySelector('[data-i18n="moveAgentsTitle"]');
    if (moveAgentsTitle) moveAgentsTitle.textContent = this.t('moveAgentsTitle');
    
    const checklistTitle = document.querySelector('[data-i18n="checklistTitle"]');
    if (checklistTitle) checklistTitle.textContent = this.t('checklistTitle');
    
    const documentsTitle = document.querySelector('[data-i18n="documentsTitle"]');
    if (documentsTitle) documentsTitle.textContent = this.t('documentsTitle');
    
    const notesTitle = document.querySelector('[data-i18n="notesTitle"]');
    if (notesTitle) notesTitle.textContent = this.t('notesTitle');
    
    // Photos & Videos doesn't have data-i18n, find by text content
    const photosTitle = document.querySelector('#jobDetails h4.details-section-title:not([data-i18n])');
    if (photosTitle && (photosTitle.textContent === 'Photos & Videos' || photosTitle.textContent === 'Fotoğraflar ve Videolar')) {
      photosTitle.textContent = this.t('photosVideosTitle');
    }
    
    // Drag & drop text
    const dropZoneTexts = document.querySelectorAll('.drop-zone-text');
    dropZoneTexts.forEach(el => {
      el.textContent = this.t('dragDropText');
    });
    
    // Label / Description
    const labelDescLabels = document.querySelectorAll('label');
    labelDescLabels.forEach(el => {
      if (el.textContent === 'Label / Description' || el.textContent === 'Etiket / Açıklama') {
        el.textContent = this.t('labelDescription');
      }
    });
    
    // Add Checklist Item button (has special structure with span)
    const openAddChecklistBtn = document.querySelector('#openAddChecklistBtn');
    if (openAddChecklistBtn) {
      openAddChecklistBtn.innerHTML = '<span>+</span> ' + this.t('addChecklistItem');
    }
    
    // Add Resource button
    const addResourceBtn = document.querySelector('#addResourceBtn');
    if (addResourceBtn) addResourceBtn.textContent = '+ ' + this.t('btnAddResource');
    
    // ========== UNIVERSAL DATA-I18N TRANSLATION ==========
    // Translate ALL elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (key && this.dict[State.lang] && this.dict[State.lang][key]) {
        el.textContent = this.t(key);
      }
    });
    
    // Translate ALL elements with data-i18n-placeholder attribute
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (key && this.dict[State.lang] && this.dict[State.lang][key]) {
        el.placeholder = this.t(key);
      }
    });
    
    // ========== SELECT DROPDOWN OPTIONS ==========
    // Booking Type dropdown options
    const bookingTypeSelect = document.querySelector('select[name="bookingType"]');
    if (bookingTypeSelect) {
      Array.from(bookingTypeSelect.options).forEach(opt => {
        if (opt.value === '') opt.textContent = this.t('selectBookingType');
        else if (opt.value === 'Door to Door') opt.textContent = this.t('bookingDoorToDoor');
        else if (opt.value === 'Door to Port') opt.textContent = this.t('bookingDoorToPort');
        else if (opt.value === 'Port to Door') opt.textContent = this.t('bookingPortToDoor');
      });
    }
    
    // Client Type dropdown options
    const clientTypeSelect = document.querySelector('select[name="clientType"]');
    if (clientTypeSelect) {
      Array.from(clientTypeSelect.options).forEach(opt => {
        if (opt.value === '') opt.textContent = this.t('selectClientType');
        else if (opt.value === 'Private') opt.textContent = this.t('clientTypePrivate');
        else if (opt.value === 'Corporate') opt.textContent = this.t('clientTypeCorporate');
        else if (opt.value === 'Diplomatic') opt.textContent = this.t('clientTypeDiplomatic');
      });
    }
  },

  init() {
    State.lang = this.loadLang();
    this.ensureToggle();
    this.applyStaticTexts();
  }
};

// ============================================================
// STATE MANAGEMENT
// ============================================================

const State = {
  jobs: [],
  agents: [],
  storageRecords: [],  // NEW - separate storage entity
  scheduleNotes: {},
  scheduleExtraJobs: {}, // { "YYYY-MM-DD": [ extraJob, ... ] }
  scheduleOfficeFilter: 'All', // NEW - for schedule office filter
  selectedJobId: null,
  jobFormMode: 'create',
  filters: { status: 'All', type: 'All', payment: 'All', search: '' },
  selectedAgentId: null,
  agentFormMode: 'create',
  agentSearch: '',
  agentTypeFilter: 'Agent',  // NEW - for Agent/Broker tabs
  editingContactIndex: null,
  schedule: { year: new Date().getFullYear(), month: new Date().getMonth(), selectedDate: null },

  lang: 'en',
  resourceLibrary: null,
  documentsViewTab: 'search',
  
  quotes: [],
  selectedQuoteId: null,
  quoteFormMode: 'create',
  quoteFilters: { search: '' },
  
  // NEW - storage tab state
  selectedStorageId: null,
  storageFormMode: 'create',
  storageFilters: { location: '', status: 'Active' },
  
  // Pagination state
  pagination: {
    jobs: { page: 1, perPage: 20 },
    quotes: { page: 1, perPage: 20 },
    storage: { page: 1, perPage: 20 },
    agents: { page: 1, perPage: 20 }
  },

  getJob(id) { return this.jobs.find(j => j.id === id); },
  getAgent(id) { return this.agents.find(a => a.id === id); },
  getAgentName(id) { const a = this.getAgent(id); return a ? a.name : ''; },
  getStorage(id) { return this.storageRecords.find(s => s.id === id); }
};

// ============================================================
// AUTH - Authentication Management
// ============================================================

const Auth = {
  currentUser: null,
  currentProfile: null,
  
  async initialize() {
    if (!supabaseClient) return false;
    
    const { data: { session } } = await supabaseClient.auth.getSession();
    if (session?.user) {
      this.currentUser = session.user;
      await this.loadProfile();
      return true;
    }
    return false;
  },
  
  async loadProfile() {
    if (!this.currentUser || !supabaseClient) return;
    
    const { data, error } = await supabaseClient
      .from('profiles')
      .select('*')
      .eq('id', this.currentUser.id)
      .single();
    
    if (data) {
      this.currentProfile = data;
    }
  },
  
  async login(email, password) {
    if (!supabaseClient) {
      return { error: { message: 'Database not connected' } };
    }
    
    const { data, error } = await supabaseClient.auth.signInWithPassword({
      email,
      password
    });
    
    if (error) return { error };
    
    this.currentUser = data.user;
    await this.loadProfile();
    return { data };
  },
  
  async logout() {
    if (!supabaseClient) return;
    
    await supabaseClient.auth.signOut();
    this.currentUser = null;
    this.currentProfile = null;
  },
  
  isLoggedIn() {
    return this.currentUser !== null;
  },
  
  getRole() {
    return this.currentProfile?.role || 'staff';
  },
  
  isAdmin() {
    return this.getRole() === 'admin';
  },
  
  isManager() {
    return this.getRole() === 'admin' || this.getRole() === 'manager';
  }
};

// ============================================================
// STORAGE - Data Persistence (Supabase + localStorage fallback)
// ============================================================

const Storage = {
  isOnline: false,
  
  // Initialize and check connection
  async init() {
    if (supabaseClient) {
      try {
        const { data, error } = await supabaseClient.from('agents').select('id').limit(1);
        this.isOnline = !error;
      } catch (e) {
        this.isOnline = false;
      }
    }
    return this.isOnline;
  },
  
  // Simple localStorage wrappers (used by I18n and other sync code)
  save(key, data) {
    return this.saveLocal(key, data);
  },
  
  load(key, defaultValue = null) {
    return this.loadLocal(key, defaultValue);
  },
  
  // Local storage helpers (fallback)
  saveLocal(key, data) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
      return true;
    } catch (e) {
      console.error('Local storage error:', e);
      return false;
    }
  },

  loadLocal(key, defaultValue = null) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (e) {
      return defaultValue;
    }
  },
  
  // ==================== AGENTS ====================
  async saveAgents() {
    // Always save to localStorage as backup
    this.saveLocal(CONFIG.STORAGE_KEYS.AGENTS, State.agents);
    
    if (!this.isOnline || !supabaseClient) return;
    
    // Sync to Supabase
    for (const agent of State.agents) {
      const record = this.agentToRecord(agent);
      const { error } = await supabaseClient
        .from('agents')
        .upsert(record, { onConflict: 'id' });
      if (error) console.error('Error saving agent:', error);
    }
  },
  
  async loadAgents() {
    if (this.isOnline && supabaseClient) {
      const { data, error } = await supabaseClient
        .from('agents')
        .select('*')
        .order('name');
      
      if (!error && data) {
        State.agents = data.map(r => this.recordToAgent(r));
        this.saveLocal(CONFIG.STORAGE_KEYS.AGENTS, State.agents);
        return;
      }
    }
    // Fallback to localStorage
    State.agents = this.loadLocal(CONFIG.STORAGE_KEYS.AGENTS, []);
  },
  
  async deleteAgent(id) {
    if (this.isOnline && supabaseClient) {
      await supabaseClient.from('agents').delete().eq('id', id);
    }
    State.agents = State.agents.filter(a => a.id !== id);
    this.saveLocal(CONFIG.STORAGE_KEYS.AGENTS, State.agents);
  },
  
  agentToRecord(agent) {
    return {
      id: agent.id,
      type: agent.type || 'Agent',
      name: agent.name,
      city: agent.city,
      country: agent.country,
      is_fidi: agent.isFIDI || false,
      is_iam: agent.isIAM || false,
      notes: agent.notes,
      contacts: agent.contacts || []
    };
  },
  
  recordToAgent(record) {
    return {
      id: record.id,
      type: record.type || 'Agent',
      name: record.name,
      city: record.city,
      country: record.country,
      isFIDI: record.is_fidi || false,
      isIAM: record.is_iam || false,
      notes: record.notes,
      contacts: record.contacts || []
    };
  },
  
  // ==================== MOVES (JOBS) ====================
  async saveJobs() {
    this.saveLocal(CONFIG.STORAGE_KEYS.JOBS, State.jobs);
    
    if (!this.isOnline || !supabaseClient) return;
    
    for (const job of State.jobs) {
      const record = this.jobToRecord(job);
      const { error } = await supabaseClient
        .from('moves')
        .upsert(record, { onConflict: 'id' });
      if (error) console.error('Error saving move:', error);
    }
  },
  
  async loadJobs() {
    if (this.isOnline && supabaseClient) {
      const { data, error } = await supabaseClient
        .from('moves')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (!error && data) {
        State.jobs = data.map(r => this.recordToJob(r));
        this.saveLocal(CONFIG.STORAGE_KEYS.JOBS, State.jobs);
        return;
      }
    }
    State.jobs = this.loadLocal(CONFIG.STORAGE_KEYS.JOBS, []);
  },
  
  async deleteJob(id) {
    if (this.isOnline && supabaseClient) {
      await supabaseClient.from('moves').delete().eq('id', id);
    }
    State.jobs = State.jobs.filter(j => j.id !== id);
    this.saveLocal(CONFIG.STORAGE_KEYS.JOBS, State.jobs);
  },
  
  jobToRecord(job) {
    return {
      id: job.id,
      job_code: job.jobCode,
      client_name: job.clientName,
      client_organization: job.clientOrganization,
      client_type: job.clientType,
      client_email: job.clientEmail,
      client_phone: job.clientPhone,
      trade_direction: job.tradeDirection,
      booking_type: job.bookingType,
      modes: job.modes || [],
      contents: job.contents,
      origin_city: job.originCity,
      origin_country: job.originCountry,
      origin_address: job.originAddress,
      origin_agent_id: job.originAgentId || null,
      destination_city: job.destinationCity,
      destination_country: job.destinationCountry,
      destination_address: job.destinationAddress,
      destination_agent_id: job.destinationAgentId || null,
      customs_broker_id: job.customsBrokerId || null,
      sea_freight_broker_id: job.seaFreightBrokerId || null,
      air_freight_broker_id: job.airFreightBrokerId || null,
      estimated_volume: job.estimatedVolume,
      sea_volume: job.seaVolume,
      air_cargo_weight: job.airCargoWeight,
      land_volume: job.landVolume,
      land_gross_weight: job.landGrossWeight,
      vehicle_type: job.vehicleType,
      vehicle_make: job.vehicleMake,
      vehicle_model: job.vehicleModel,
      vehicle_year: job.vehicleYear,
      vehicle_vin: job.vehicleVIN,
      vehicle_condition: job.vehicleCondition,
      status: job.status,
      steps: job.steps || [],
      checklist: job.checklist || [],
      documents: job.documents || [],
      media: job.media || [],
      notes: job.notes || [],
      payment_received: job.paymentReceived || false,
      tag: job.tag,
      has_storage: job.hasStorage || false
    };
  },
  
  recordToJob(record) {
    return {
      id: record.id,
      jobCode: record.job_code,
      clientName: record.client_name,
      clientOrganization: record.client_organization,
      clientType: record.client_type,
      clientEmail: record.client_email,
      clientPhone: record.client_phone,
      tradeDirection: record.trade_direction,
      bookingType: record.booking_type,
      modes: record.modes || [],
      contents: record.contents,
      originCity: record.origin_city,
      originCountry: record.origin_country,
      originAddress: record.origin_address,
      originAgentId: record.origin_agent_id,
      destinationCity: record.destination_city,
      destinationCountry: record.destination_country,
      destinationAddress: record.destination_address,
      destinationAgentId: record.destination_agent_id,
      customsBrokerId: record.customs_broker_id,
      seaFreightBrokerId: record.sea_freight_broker_id,
      airFreightBrokerId: record.air_freight_broker_id,
      estimatedVolume: record.estimated_volume,
      seaVolume: record.sea_volume,
      airCargoWeight: record.air_cargo_weight,
      landVolume: record.land_volume,
      landGrossWeight: record.land_gross_weight,
      vehicleType: record.vehicle_type,
      vehicleMake: record.vehicle_make,
      vehicleModel: record.vehicle_model,
      vehicleYear: record.vehicle_year,
      vehicleVIN: record.vehicle_vin,
      vehicleCondition: record.vehicle_condition,
      status: record.status,
      steps: record.steps || [],
      checklist: record.checklist || [],
      documents: record.documents || [],
      media: record.media || [],
      notes: record.notes || [],
      paymentReceived: record.payment_received || false,
      tag: record.tag,
      hasStorage: record.has_storage || false
    };
  },
  
  // ==================== QUOTES ====================
  async saveQuotes() {
    this.saveLocal(CONFIG.STORAGE_KEYS.QUOTES, State.quotes);
    
    if (!this.isOnline || !supabaseClient) return;
    
    for (const quote of State.quotes) {
      const record = this.quoteToRecord(quote);
      const { error } = await supabaseClient
        .from('quotes')
        .upsert(record, { onConflict: 'id' });
      if (error) console.error('Error saving quote:', error);
    }
  },
  
  async loadQuotes() {
    if (this.isOnline && supabaseClient) {
      const { data, error } = await supabaseClient
        .from('quotes')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (!error && data) {
        State.quotes = data.map(r => this.recordToQuote(r));
        State.quotes = State.quotes.map(q => Validator.normalizeQuote(q));
        this.saveLocal(CONFIG.STORAGE_KEYS.QUOTES, State.quotes);
        return;
      }
    }
    State.quotes = this.loadLocal(CONFIG.STORAGE_KEYS.QUOTES, []);
    State.quotes = State.quotes.map(q => Validator.normalizeQuote(q));
  },
  
  async deleteQuote(id) {
    if (this.isOnline && supabaseClient) {
      await supabaseClient.from('quotes').delete().eq('id', id);
    }
    State.quotes = State.quotes.filter(q => q.id !== id);
    this.saveLocal(CONFIG.STORAGE_KEYS.QUOTES, State.quotes);
  },
  
  quoteToRecord(quote) {
    return {
      id: quote.id,
      quote_code: quote.quoteCode,
      client_name: quote.clientName,
      client_organization: quote.clientOrganization,
      client_email: quote.clientEmail,
      client_phone: quote.clientPhone,
      origin: quote.origin,
      destination: quote.destination,
      type: quote.type,
      modes: quote.modes || [],
      contents: quote.contents,
      estimated_volume: quote.estimatedVolume,
      vehicle_type: quote.vehicleType,
      vehicle_make: quote.vehicleMake,
      vehicle_model: quote.vehicleModel,
      vehicle_year: quote.vehicleYear,
      vehicle_condition: quote.vehicleCondition,
      agent_type: quote.agentType,
      custom_includes: quote.customIncludes || [],
      additional_charges: quote.additionalCharges || [],
      agent_charges: quote.agentCharges || {},
      insurance_included: quote.insuranceIncluded || false,
      insurance_value: quote.insuranceValue,
      insurance_premium: quote.insurancePremium,
      status: quote.status,
      valid_until: quote.validUntil,
      converted_to_move_id: quote.convertedToMoveId
    };
  },
  
  recordToQuote(record) {
    return {
      id: record.id,
      quoteCode: record.quote_code,
      clientName: record.client_name,
      clientOrganization: record.client_organization,
      clientEmail: record.client_email,
      clientPhone: record.client_phone,
      origin: record.origin,
      destination: record.destination,
      type: record.type,
      modes: record.modes || [],
      contents: record.contents,
      estimatedVolume: record.estimated_volume,
      vehicleType: record.vehicle_type,
      vehicleMake: record.vehicle_make,
      vehicleModel: record.vehicle_model,
      vehicleYear: record.vehicle_year,
      vehicleCondition: record.vehicle_condition,
      agentType: record.agent_type,
      customIncludes: record.custom_includes || [],
      additionalCharges: record.additional_charges || [],
      agentCharges: record.agent_charges || {},
      insuranceIncluded: record.insurance_included || false,
      insuranceValue: record.insurance_value,
      insurancePremium: record.insurance_premium,
      status: record.status,
      validUntil: record.valid_until,
      convertedToMoveId: record.converted_to_move_id,
      createdAt: record.created_at
    };
  },
  
  // ==================== STORAGE RECORDS ====================
  async saveStorageRecords() {
    this.saveLocal(CONFIG.STORAGE_KEYS.STORAGE, State.storageRecords);
    
    if (!this.isOnline || !supabaseClient) return;
    
    for (const storage of State.storageRecords) {
      const record = this.storageToRecord(storage);
      const { error } = await supabaseClient
        .from('storage_records')
        .upsert(record, { onConflict: 'id' });
      if (error) console.error('Error saving storage:', error);
    }
  },
  
  async loadStorageRecords() {
    if (this.isOnline && supabaseClient) {
      const { data, error } = await supabaseClient
        .from('storage_records')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (!error && data) {
        State.storageRecords = data.map(r => this.recordToStorage(r));
        State.storageRecords = State.storageRecords.map(s => Validator.normalizeStorageRecord(s));
        this.saveLocal(CONFIG.STORAGE_KEYS.STORAGE, State.storageRecords);
        return;
      }
    }
    State.storageRecords = this.loadLocal(CONFIG.STORAGE_KEYS.STORAGE, []);
    State.storageRecords = State.storageRecords.map(s => Validator.normalizeStorageRecord(s));
  },
  
  async deleteStorageRecord(id) {
    if (this.isOnline && supabaseClient) {
      await supabaseClient.from('storage_records').delete().eq('id', id);
    }
    State.storageRecords = State.storageRecords.filter(s => s.id !== id);
    this.saveLocal(CONFIG.STORAGE_KEYS.STORAGE, State.storageRecords);
  },
  
  storageToRecord(storage) {
    return {
      id: storage.id,
      storage_code: storage.storageCode,
      client_name: storage.clientName,
      organization_name: storage.organizationName,
      linked_job_id: storage.linkedJobId || null,
      location: storage.location,
      date_entered: storage.dateEntered,
      date_exited: storage.dateExited,
      status: storage.status,
      billing_type: storage.billingType,
      rate_per_cbm: storage.ratePerCBM,
      rate_currency: storage.rateCurrency,
      billing_period: storage.billingPeriod,
      flat_rate: storage.flatRate,
      flat_rate_currency: storage.flatRateCurrency,
      free_days: storage.freeDays,
      inventory: storage.inventory || [],
      notes: storage.notes
    };
  },
  
  recordToStorage(record) {
    return {
      id: record.id,
      storageCode: record.storage_code,
      clientName: record.client_name,
      organizationName: record.organization_name,
      linkedJobId: record.linked_job_id,
      location: record.location,
      dateEntered: record.date_entered,
      dateExited: record.date_exited,
      status: record.status,
      billingType: record.billing_type,
      ratePerCBM: record.rate_per_cbm,
      rateCurrency: record.rate_currency,
      billingPeriod: record.billing_period,
      flatRate: record.flat_rate,
      flatRateCurrency: record.flat_rate_currency,
      freeDays: record.free_days,
      inventory: record.inventory || [],
      notes: record.notes
    };
  },
  
  // ==================== SCHEDULE ====================
  async saveScheduleNotes() {
    this.saveLocal(CONFIG.STORAGE_KEYS.SCHEDULE_NOTES, State.scheduleNotes);
    
    if (!this.isOnline || !supabaseClient) return;
    
    for (const [date, note] of Object.entries(State.scheduleNotes)) {
      if (note && note.trim()) {
        const { error } = await supabaseClient
          .from('schedule_notes')
          .upsert({ date, note }, { onConflict: 'date' });
        if (error) console.error('Error saving schedule note:', error);
      }
    }
  },
  
  async loadScheduleNotes() {
    if (this.isOnline && supabaseClient) {
      const { data, error } = await supabaseClient
        .from('schedule_notes')
        .select('*');
      
      if (!error && data) {
        State.scheduleNotes = {};
        data.forEach(row => {
          State.scheduleNotes[row.date] = row.note;
        });
        this.saveLocal(CONFIG.STORAGE_KEYS.SCHEDULE_NOTES, State.scheduleNotes);
        return;
      }
    }
    State.scheduleNotes = this.loadLocal(CONFIG.STORAGE_KEYS.SCHEDULE_NOTES, {});
  },
  
  async saveScheduleExtraJobs() {
    this.saveLocal(CONFIG.STORAGE_KEYS.SCHEDULE_EXTRA_JOBS, State.scheduleExtraJobs);
    
    if (!this.isOnline || !supabaseClient) return;
    
    // First delete all, then insert fresh (simpler than diffing)
    // This is fine for small datasets
    for (const [date, jobs] of Object.entries(State.scheduleExtraJobs)) {
      for (const job of jobs) {
        const record = {
          id: job.id,
          date: date,
          job_type: job.type,
          custom_label: job.customLabel,
          time: job.time,
          office: job.office,
          personnel: job.personnel,
          vehicle: job.vehicle,
          address: job.address,
          notes: job.notes,
          completed: job.completed || false
        };
        const { error } = await supabaseClient
          .from('schedule_extra_jobs')
          .upsert(record, { onConflict: 'id' });
        if (error) console.error('Error saving extra job:', error);
      }
    }
  },
  
  async loadScheduleExtraJobs() {
    if (this.isOnline && supabaseClient) {
      const { data, error } = await supabaseClient
        .from('schedule_extra_jobs')
        .select('*');
      
      if (!error && data) {
        State.scheduleExtraJobs = {};
        data.forEach(row => {
          const date = row.date;
          if (!State.scheduleExtraJobs[date]) {
            State.scheduleExtraJobs[date] = [];
          }
          State.scheduleExtraJobs[date].push({
            id: row.id,
            type: row.job_type,
            customLabel: row.custom_label,
            time: row.time,
            office: row.office,
            personnel: row.personnel,
            vehicle: row.vehicle,
            address: row.address,
            notes: row.notes,
            completed: row.completed || false
          });
        });
        this.saveLocal(CONFIG.STORAGE_KEYS.SCHEDULE_EXTRA_JOBS, State.scheduleExtraJobs);
        return;
      }
    }
    State.scheduleExtraJobs = this.loadLocal(CONFIG.STORAGE_KEYS.SCHEDULE_EXTRA_JOBS, {});
  },
  
  // ==================== RESOURCE LIBRARY ====================
  saveResourceLibrary() { 
    this.saveLocal(CONFIG.STORAGE_KEYS.RESOURCE_LIBRARY, State.resourceLibrary); 
    // Resource library is local-only for now (file uploads need R2)
  },

  loadResourceLibrary() {
    const saved = this.loadLocal(CONFIG.STORAGE_KEYS.RESOURCE_LIBRARY, null);
    if (saved && Array.isArray(saved.categories)) {
      State.resourceLibrary = saved;
    } else {
      State.resourceLibrary = JSON.parse(JSON.stringify(DEFAULT_RESOURCE_LIBRARY));
      this.saveResourceLibrary();
    }
  },
  
  // ==================== LOAD ALL ====================
  async loadAll() {
    await this.init();
    await this.loadAgents();
    await this.loadJobs();
    await this.loadQuotes();
    await this.loadStorageRecords();
    await this.loadScheduleNotes();
    await this.loadScheduleExtraJobs();
    this.loadResourceLibrary();
    Validator.normalizeAll();
  },

  // ==================== EXPORT/IMPORT ====================
  exportData() {
    return {
      jobs: State.jobs,
      agents: State.agents,
      scheduleNotes: State.scheduleNotes,
      scheduleExtraJobs: State.scheduleExtraJobs,
      quotes: State.quotes,
      storageRecords: State.storageRecords
    };
  },

  async importData(data) {
    if (!data || !Array.isArray(data.jobs) || !Array.isArray(data.agents)) {
      throw new Error('Invalid import data');
    }
    State.jobs = data.jobs;
    State.agents = data.agents;
    State.scheduleNotes = data.scheduleNotes || {};
    State.scheduleExtraJobs = data.scheduleExtraJobs || {};
    State.quotes = data.quotes || [];
    State.storageRecords = data.storageRecords || [];
    Validator.normalizeAll();
    await this.saveJobs();
    await this.saveAgents();
    await this.saveScheduleNotes();
    await this.saveScheduleExtraJobs();
    await this.saveQuotes();
    await this.saveStorageRecords();
  }
};

// ============================================================
// VALIDATOR
// ============================================================

const Validator = {
  normalizeAgent(agent) {
    if (!agent || typeof agent !== 'object') {
      return { 
        id: Utils.makeId('agent'), 
        name: '', 
        type: 'Agent',  // NEW: Agent, Customs Broker, Sea Freight Broker, Air Freight Broker
        city: '', 
        country: '', 
        isFIDI: false,
        isIAM: false,
        contacts: [],
        notes: ''
      };
    }
    if (!agent.id) agent.id = Utils.makeId('agent');
    if (!agent.type) agent.type = 'Agent';  // NEW - default to Agent for existing records
    if (typeof agent.isFIDI !== 'boolean') agent.isFIDI = false;
    if (typeof agent.isIAM !== 'boolean') agent.isIAM = false;
    if (!Array.isArray(agent.contacts)) agent.contacts = [];
    if (typeof agent.notes !== 'string') agent.notes = '';
    return agent;
  },

  normalizeExtraJob(ej, dateStr) {
    if (!ej || typeof ej !== 'object') ej = {};
    if (!ej.id) ej.id = Utils.makeId('xjob');               // stable IDs
    if (!ej.date) ej.date = dateStr || '';                  // store date inside item too (export-friendly)
    if (typeof ej.taskType !== 'string') ej.taskType = '';
    if (typeof ej.customTaskName !== 'string') ej.customTaskName = ''; // custom task support
    if (typeof ej.time !== 'string') ej.time = '';          // schedule items should have time
    if (typeof ej.address !== 'string') ej.address = '';    // schedule items should have address
    if (typeof ej.office !== 'string') ej.office = '';      // office selection (optional)
    if (typeof ej.personnel !== 'string') ej.personnel = '';
    if (typeof ej.vehicle !== 'string') ej.vehicle = '';
    if (typeof ej.notes !== 'string') ej.notes = '';

    // linking fields
    if (typeof ej.linkedJobId !== 'string') ej.linkedJobId = ej.linkedJobId ? String(ej.linkedJobId) : '';
    if (typeof ej.linkedJobCode !== 'string') ej.linkedJobCode = ej.linkedJobCode || '';
    if (typeof ej.linkedJobClientName !== 'string') ej.linkedJobClientName = ej.linkedJobClientName || '';

    // client name for standalone jobs (optional)
    if (typeof ej.clientName !== 'string') ej.clientName = '';

    // completion tracking
    if (typeof ej.completed !== 'boolean') ej.completed = false;

    return ej;
  },

  normalizeScheduleExtraJobs() {
    if (!State.scheduleExtraJobs || typeof State.scheduleExtraJobs !== 'object') State.scheduleExtraJobs = {};
    Object.keys(State.scheduleExtraJobs).forEach(dateStr => {
      const arr = State.scheduleExtraJobs[dateStr];
      if (!Array.isArray(arr)) {
        State.scheduleExtraJobs[dateStr] = [];
        return;
      }
      State.scheduleExtraJobs[dateStr] = arr.map(ej => this.normalizeExtraJob(ej, dateStr));
    });
  },

  normalizeJob(job) {
  if (!job || typeof job !== 'object') job = {};
  if (!job.id) job.id = Utils.makeId('job');
  if (!job.jobCode) job.jobCode = Utils.jobCode();
  
  // NEW: Booking and Client classification
  if (typeof job.bookingType !== 'string') job.bookingType = '';  // Door to Door, Door to Port, Port to Door
  if (typeof job.clientType !== 'string') job.clientType = '';    // Private, Corporate, Diplomatic
  
  // Client contact info
  if (typeof job.clientPhone !== 'string') job.clientPhone = '';
  if (typeof job.clientEmail !== 'string') job.clientEmail = '';
  
  // Origin address details
  if (typeof job.originFloor !== 'string') job.originFloor = '';
  if (typeof job.originElevator !== 'string') job.originElevator = '';
  if (typeof job.originAccessConditions !== 'string') job.originAccessConditions = '';
  
  // Destination address details
  if (typeof job.destinationFloor !== 'string') job.destinationFloor = '';
  if (typeof job.destinationElevator !== 'string') job.destinationElevator = '';
  if (typeof job.destinationAccessConditions !== 'string') job.destinationAccessConditions = '';
  
  if (!job.tradeDirection) job.tradeDirection = '';
  if (!job.status) job.status = 'Planned';
  if (!Array.isArray(job.modes)) job.modes = [];
  if (!Array.isArray(job.notes)) job.notes = [];
  if (!Array.isArray(job.documents)) job.documents = [];
  if (!Array.isArray(job.media)) job.media = [];
  if (typeof job.paymentReceived !== 'boolean') job.paymentReceived = false;
  if (!job.packDate) job.packDate = '';

  // Shipment contents (HHE, Vehicle)
  if (!Array.isArray(job.shipmentContents)) job.shipmentContents = ['HHE'];
  
  // Move Manager
  if (typeof job.moveManager !== 'string') job.moveManager = '';

  // Tag field for special moves (Diplomatic, VIP, Military, etc.)
  if (typeof job.tag !== 'string') job.tag = '';
  
  // NEW: Broker references
  if (typeof job.customsBrokerId !== 'string') job.customsBrokerId = '';
  if (typeof job.seaFreightBrokerId !== 'string') job.seaFreightBrokerId = '';
  if (typeof job.airFreightBrokerId !== 'string') job.airFreightBrokerId = '';
  
  // NEW: Quote link (when job created from quote)
  if (typeof job.linkedQuoteId !== 'string') job.linkedQuoteId = '';
  
  // NEW: Financial data (from quote conversion)
  if (!Array.isArray(job.chargeItems)) job.chargeItems = [];
  if (typeof job.quotedTotal !== 'number') job.quotedTotal = 0;
  if (typeof job.currency !== 'string') job.currency = 'USD';

  // Mode-specific fields - Sea
  if (typeof job.seaVolume !== 'number') job.seaVolume = 0;
  if (typeof job.containerDetails !== 'string') job.containerDetails = '';
  if (typeof job.seaGrossWeight !== 'number') job.seaGrossWeight = 0;

  // Mode-specific fields - Air
  if (typeof job.airVolume !== 'number') job.airVolume = 0;
  if (typeof job.airCargoWeight !== 'number') job.airCargoWeight = 0;
  if (typeof job.airACW !== 'number') job.airACW = 0;

  // Mode-specific fields - Land
  if (typeof job.landVolume !== 'number') job.landVolume = 0;
  if (typeof job.landGrossWeight !== 'number') job.landGrossWeight = 0;

  // Vehicle fields
  if (typeof job.vehicleType !== 'string') job.vehicleType = '';
  if (typeof job.vehicleMake !== 'string') job.vehicleMake = '';
  if (typeof job.vehicleModel !== 'string') job.vehicleModel = '';
  if (typeof job.vehicleYear !== 'number') job.vehicleYear = 0;
  if (typeof job.vehicleVIN !== 'string') job.vehicleVIN = '';
  if (typeof job.vehicleCondition !== 'string') job.vehicleCondition = 'Running';

  // Storage - reference to separate Storage entity
  if (typeof job.storageId !== 'string') job.storageId = '';

  if (!Array.isArray(job.checklist) || job.checklist.length === 0) {
    const template = ChecklistUtils.getTemplate(job.tradeDirection, job.modes);
    job.checklist = template.map(text => ({ text, done: false }));
  }

  Steps.ensure(job);

  return job;
},
  
   normalizeQuote(quote) {
  if (!quote || typeof quote !== 'object') return this.createEmptyQuote();
  
  if (!quote.id) quote.id = Utils.makeId('quote');
  if (!quote.quoteCode) quote.quoteCode = QuoteUtils.makeQuoteCode();
  if (!quote.clientName) quote.clientName = '';
  if (!quote.clientOrganization) quote.clientOrganization = '';
  if (!quote.origin) quote.origin = '';
  if (!quote.destination) quote.destination = '';
  if (!Array.isArray(quote.modes)) quote.modes = [];
  if (!quote.type) quote.type = 'Export';
  if (typeof quote.insurance !== 'boolean') quote.insurance = false;
  
  // NEW: Quote status and recipient type
  if (!quote.status) quote.status = 'Draft';  // Draft, Sent, Approved, Rejected, Expired
  if (!quote.recipientType) quote.recipientType = 'Client';  // Client or Agent
  
  // NEW: Conversion tracking
  if (typeof quote.convertedToJobId !== 'string') quote.convertedToJobId = '';
  if (typeof quote.convertedAt !== 'string') quote.convertedAt = '';
  
  // chargesByMode structure
  if (!quote.chargesByMode || typeof quote.chargesByMode !== 'object') {
    quote.chargesByMode = {};
    // Migrate old charges array if exists
    if (Array.isArray(quote.charges) && quote.charges.length > 0) {
      const primaryMode = quote.modes[0] || 'Sea';
      quote.chargesByMode[primaryMode] = quote.charges;
    }
  }
  
  if (!Array.isArray(quote.selectedIncludes)) quote.selectedIncludes = [];
  if (!Array.isArray(quote.selectedAdditionalCharges)) quote.selectedAdditionalCharges = [];
  if (!quote.validUntil) quote.validUntil = '';
  if (!quote.termsAndConditions) quote.termsAndConditions = '';
  if (!quote.createdAt) quote.createdAt = new Date().toISOString();
  
  // Sea-specific
  if (!quote.departurePort) quote.departurePort = '';
  if (!quote.poe) quote.poe = '';
  if (!quote.containerDetails) quote.containerDetails = '';
  if (typeof quote.seaTransitTime !== 'number') quote.seaTransitTime = 0;
  if (typeof quote.seaVolume !== 'number') quote.seaVolume = 0;
  
  // Air-specific
  if (!quote.departureAirportName) quote.departureAirportName = '';
  if (!quote.departureAirportIATA) quote.departureAirportIATA = '';
  if (!quote.arrivalAirportName) quote.arrivalAirportName = '';
  if (!quote.arrivalAirportIATA) quote.arrivalAirportIATA = '';
  if (!quote.airlineName) quote.airlineName = '';
  if (typeof quote.airCargoWeight !== 'number') quote.airCargoWeight = 0;
  if (typeof quote.airTransitTime !== 'number') quote.airTransitTime = 0;
  if (typeof quote.airVolume !== 'number') quote.airVolume = 0;
     if (typeof quote.airACW !== 'number') quote.airACW = 0;
  if (!quote.airQuoteType) quote.airQuoteType = 'client'; // 'client' or 'agent'
     
     // Shipment contents
if (!Array.isArray(quote.shipmentContents)) quote.shipmentContents = ['HHE'];

// Vehicle fields
if (typeof quote.vehicleType !== 'string') quote.vehicleType = '';
if (typeof quote.vehicleMake !== 'string') quote.vehicleMake = '';
if (typeof quote.vehicleModel !== 'string') quote.vehicleModel = '';
if (typeof quote.vehicleYear !== 'number') quote.vehicleYear = 0;
if (typeof quote.vehicleVIN !== 'string') quote.vehicleVIN = '';
if (typeof quote.vehicleCondition !== 'string') quote.vehicleCondition = 'Running';
     
  // Land-specific
  if (!quote.truckType) quote.truckType = 'Dedicated';
  if (typeof quote.landTransitTime !== 'number') quote.landTransitTime = 0;
  if (typeof quote.landVolume !== 'number') quote.landVolume = 0;
  
  // Insurance
  if (typeof quote.hhgValue !== 'number') quote.hhgValue = 0;
  if (!quote.hhgCurrency) quote.hhgCurrency = 'USD';
     if (typeof quote.insurancePercentage !== 'number') quote.insurancePercentage = 1.5;
if (!quote.quoteCurrency) quote.quoteCurrency = 'USD';
  
  // Legacy compatibility
  if (typeof quote.estimatedVolume !== 'number') quote.estimatedVolume = 0;
  
  return quote;
},

 createEmptyQuote() {
  return {
    id: Utils.makeId('quote'),
    quoteCode: QuoteUtils.makeQuoteCode(),
    clientName: '',
    clientOrganization: '',
    origin: '',
    destination: '',
    modes: [],
    type: 'Export',
    insurance: false,
    chargesByMode: {},
    selectedIncludes: [],
    selectedAdditionalCharges: [],
    validUntil: '',
    termsAndConditions: '',
    createdAt: new Date().toISOString(),
    // Sea
    departurePort: '',
    poe: '',
    containerDetails: '',
    seaTransitTime: 0,
    seaVolume: 0,
    // Air
    departureAirportName: '',
    departureAirportIATA: '',
    arrivalAirportName: '',
    arrivalAirportIATA: '',
    airlineName: '',
    airCargoWeight: 0,
    airTransitTime: 0,
    airVolume: 0,
    airACW: 0,
    
    // Land
    truckType: 'Dedicated',
    landTransitTime: 0,
    landVolume: 0,
    // Insurance
    hhgValue: 0,
    hhgCurrency: 'USD',
    insurancePercentage: 1.5,
    quoteCurrency: 'USD',
    // Legacy
    estimatedVolume: 0,
    airQuoteType: 'client',
    // Shipment contents
    shipmentContents: ['HHE'],
    // Vehicle fields
    vehicleType: '',
    vehicleMake: '',
    vehicleModel: '',
    vehicleYear: 0,
    vehicleVIN: '',
    vehicleCondition: 'Running',
  };
},

  // NEW: Storage Record normalizer
  normalizeStorageRecord(storage) {
    if (!storage || typeof storage !== 'object') storage = {};
    
    // Identity
    if (!storage.id) storage.id = Utils.makeId('storage');
    if (!storage.storageCode) storage.storageCode = Utils.storageCode();
    
    // Linking
    if (typeof storage.linkedJobId !== 'string') storage.linkedJobId = '';  // empty = standalone
    
    // Client info (for standalone or display)
    if (typeof storage.clientName !== 'string') storage.clientName = '';
    if (typeof storage.organizationName !== 'string') storage.organizationName = '';
    
    // Location
    if (typeof storage.location !== 'string') storage.location = '';
    
    // Contents
    if (!Array.isArray(storage.contents)) storage.contents = [];  // ['HHE', 'Auto']
    if (typeof storage.totalCBM !== 'number') storage.totalCBM = 0;
    if (typeof storage.grossWeight !== 'number') storage.grossWeight = 0;
    
    // Dates
    if (typeof storage.dateEntered !== 'string') storage.dateEntered = '';
    if (typeof storage.dateExited !== 'string') storage.dateExited = '';
    
    // Inventory - items with type (HHE or Auto)
    if (!Array.isArray(storage.inventory)) storage.inventory = [];
    storage.inventory = storage.inventory.map(item => {
      if (!item.id) item.id = Utils.makeId('item');
      if (typeof item.type !== 'string') item.type = 'HHE';  // HHE or Auto
      if (typeof item.description !== 'string') item.description = '';
      if (typeof item.quantity !== 'number') item.quantity = 1;
      if (typeof item.cbm !== 'number') item.cbm = 0;
      // Auto-specific fields
      if (typeof item.make !== 'string') item.make = '';
      if (typeof item.model !== 'string') item.model = '';
      if (typeof item.year !== 'number') item.year = 0;
      if (typeof item.vin !== 'string') item.vin = '';
      // Status
      if (typeof item.status !== 'string') item.status = 'In Storage';  // In Storage, Retrieved
      if (typeof item.dateRetrieved !== 'string') item.dateRetrieved = '';
      return item;
    });
    
    // Billing
    if (typeof storage.billingType !== 'string') storage.billingType = 'Per CBM';  // Per CBM, Flat Rate
    if (typeof storage.ratePerCBM !== 'number') storage.ratePerCBM = 0;
    if (typeof storage.ratePeriod !== 'string') storage.ratePeriod = 'Monthly';  // Monthly, Daily
    if (typeof storage.rateCurrency !== 'string') storage.rateCurrency = 'TRY';
    if (typeof storage.flatRate !== 'number') storage.flatRate = 0;
    if (typeof storage.flatRateCurrency !== 'string') storage.flatRateCurrency = 'TRY';
    if (typeof storage.freeDays !== 'number') storage.freeDays = 0;
    if (typeof storage.billingNotes !== 'string') storage.billingNotes = '';
    
    // Meta
    if (typeof storage.status !== 'string') storage.status = 'Active';  // Active, Closed
    if (typeof storage.createdAt !== 'string') storage.createdAt = new Date().toISOString();
    if (typeof storage.notes !== 'string') storage.notes = '';
    
    return storage;
  },

  normalizeAll() {
    State.agents = (State.agents || []).map(a => this.normalizeAgent(a));
    State.jobs = (State.jobs || []).map(j => this.normalizeJob(j));
    State.storageRecords = (State.storageRecords || []).map(s => this.normalizeStorageRecord(s));
    this.normalizeScheduleExtraJobs();
  }
};

// ============================================================
// STEPS SYSTEM
// ============================================================

const Steps = {
  ensure(job) {
    // Initialize steps as empty array if not present (manual-only mode)
    if (!Array.isArray(job.steps)) {
      job.steps = [];
    }
    // Ensure all required fields exist on each step (backward compatibility)
    job.steps.forEach(step => {
      if (typeof step.office !== 'string') step.office = '';
      if (typeof step.completed !== 'boolean') step.completed = false;
      // Ensure stepId exists for sync between Move Steps and Schedule
      if (!step.stepId) step.stepId = Utils.makeId('step');
    });
  },

  getEarliest(job) {
    if (!Array.isArray(job.steps)) return '';
    const dates = job.steps.map(s => s.date).filter(Boolean).sort();
    return dates[0] || '';
  },

  getForDate(dateStr) {
    const result = [];
    State.jobs.forEach(job => {
      if (Array.isArray(job.steps)) {
        job.steps.forEach((step, idx) => {
          if (step.date === dateStr) result.push({ job, step, stepIndex: idx });
        });
      }
    });
    return result;
  }
};

const ChecklistUtils = {
  getTemplate(tradeDirection, modes) {
    const typeKey = String(tradeDirection || '').toUpperCase();
    const modeKey = Array.isArray(modes) ? [...new Set(modes)].sort().join('/') : '';
    const scenarioKey = modeKey ? `${typeKey}|${modeKey}` : typeKey;
    return CONFIG.CHECKLIST_TEMPLATES[scenarioKey]
      || CONFIG.CHECKLIST_TEMPLATES[typeKey]
      || [];
  }
};

// ============================================================
// UTILITIES
// ============================================================

const Utils = {
  formatDate(str) {
    if (!str) return '-';
    const parts = str.split('-');
    return parts.length === 3 ? `${parts[2]}/${parts[1]}/${parts[0]}` : str;
  },
  
  // Format date for input display (empty string if no value)
  formatDateForInput(str) {
    if (!str) return '';
    const parts = str.split('-');
    return parts.length === 3 ? `${parts[2]}/${parts[1]}/${parts[0]}` : '';
  },

  parseDate(display) {
    if (!display) return '';
    const trimmed = display.trim();
    if (!trimmed) return '';
    const parts = trimmed.split(/[./-]/);
    if (parts.length !== 3) return '';
    const [dd, mm, yyyy] = parts.map(p => parseInt(p, 10));
    if (isNaN(dd) || isNaN(mm) || isNaN(yyyy) || dd < 1 || dd > 31 || mm < 1 || mm > 12) return '';
    return `${yyyy}-${String(mm).padStart(2,'0')}-${String(dd).padStart(2,'0')}`;
  },
  
  // Create a date input that shows DD/MM/YYYY format
  createDateInput(options = {}) {
    const { value = '', className = '', id = '', required = false } = options;
    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = I18n.t('dateFormatPlaceholder');
    input.value = this.formatDateForInput(value);
    if (className) input.className = className;
    if (id) input.id = id;
    if (required) input.required = true;
    input.setAttribute('data-date-input', 'true');
    input.setAttribute('pattern', '\\d{2}/\\d{2}/\\d{4}');
    input.setAttribute('maxlength', '10');
    
    // Auto-format as user types
    input.addEventListener('input', (e) => {
      let v = e.target.value.replace(/[^\d]/g, '');
      if (v.length > 8) v = v.slice(0, 8);
      if (v.length >= 4) {
        v = v.slice(0, 2) + '/' + v.slice(2, 4) + '/' + v.slice(4);
      } else if (v.length >= 2) {
        v = v.slice(0, 2) + '/' + v.slice(2);
      }
      e.target.value = v;
    });
    
    return input;
  },
  
  // Get ISO date value from a date input
  getDateInputValue(input) {
    return this.parseDate(input.value);
  },

  formatTime(iso) {
    try { return new Date(iso).toLocaleString(); } catch (e) { return '-'; }
  },

  formatCurrency(amount, currency) {
    const num = Number(amount) || 0;
    const cur = currency || 'USD';
    return `${num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${cur}`;
  },

  location(city, country) {
    // Translate country name if available
    const translatedCountry = country ? CONFIG.getCountryName(country) : '';
    return [city, translatedCountry].filter(Boolean).join(', ') || '-';
  },

  // safer unique IDs than Date.now() (prevents collisions)
  makeId(prefix) {
    const p = String(prefix || 'id');
    // time + random to avoid duplicates in fast clicks/imports
    return `${p}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
  },

  // ISTEX-YEAR-#### now uses max existing number + 1 (won't reuse numbers after deletions)
  jobCode() {
    const year = new Date().getFullYear();
    const prefix = `ISTEX-${year}-`;
    let maxNum = 0;
    State.jobs.forEach(j => {
      const code = j && j.jobCode ? String(j.jobCode) : '';
      if (!code.startsWith(prefix)) return;
      const tail = code.slice(prefix.length);
      const n = parseInt(tail, 10);
      if (!isNaN(n)) maxNum = Math.max(maxNum, n);
    });
    return `${prefix}${String(maxNum + 1).padStart(4, '0')}`;
  },
  
  // IES-YEAR-#### for storage records (Istanbul Ekspres Storage)
  storageCode() {
    const year = new Date().getFullYear();
    const prefix = `IES-${year}-`;
    let maxNum = 0;
    (State.storageRecords || []).forEach(s => {
      const code = s && s.storageCode ? String(s.storageCode) : '';
      if (!code.startsWith(prefix)) return;
      const tail = code.slice(prefix.length);
      const n = parseInt(tail, 10);
      if (!isNaN(n)) maxNum = Math.max(maxNum, n);
    });
    return `${prefix}${String(maxNum + 1).padStart(4, '0')}`;
  },

  // helper to safely escape html in export layout
  escapeHtml(str) {
    return String(str ?? '')
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#039;');
  },

  // show "MOVEID – Client" when linked
  jobLabelById(jobId, fallbackCode = '') {
    const j = jobId ? State.getJob(jobId) : null;
    if (j) return `${j.jobCode || ''} – ${j.clientName || ''}`.trim();
    return fallbackCode || '';
  },
  
  // Debounce helper - waits for user to stop typing before executing
  debounce(fn, delay = 300) {
    let timeoutId;
    return function(...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => fn.apply(this, args), delay);
    };
  }
};

// ============================================================
// QUOTE UTILITIES
// ============================================================

const QuoteUtils = {
  makeQuoteCode() {
    const year = new Date().getFullYear();
    const prefix = `IEQ-${year}-`;
    let maxNum = 0;
    (State.quotes || []).forEach(q => {
      const code = q && q.quoteCode ? String(q.quoteCode) : '';
      if (!code.startsWith(prefix)) return;
      const n = parseInt(code.slice(prefix.length), 10);
      if (!isNaN(n)) maxNum = Math.max(maxNum, n);
    });
    return `${prefix}${String(maxNum + 1).padStart(4, '0')}`;
  },

  calculateInsurancePremium(hhgValue, percentage = 1.5) {
  return (hhgValue || 0) * (percentage / 100);
},

  getTemplate(mode, type, recipientType = 'Agent') {
    // Build the template key: Mode|Type|RecipientType
    if (type === 'Local') {
      const key = `Land|Local|${recipientType}`;
      return QUOTE_TEMPLATES[key] || QUOTE_TEMPLATES['Land|Local|Agent'] || null;
    }
    const key = `${mode}|${type}|${recipientType}`;
    return QUOTE_TEMPLATES[key] || QUOTE_TEMPLATES[`${mode}|${type}|Agent`] || null;
  },

  replacePlaceholders(text, data) {
    if (!text) return '';
    let result = text;
    
    // Simple direct replacements (case-insensitive)
    const replacements = {
      '[ORIGIN]': data.origin || '',
      '[DESTINATION]': data.destination || '',
      '[POE]': data.poe || '',
      '[DEPARTURE_PORT]': data.departurePort || data.origin || '',
      '[CONTAINER_DETAILS]': data.containerDetails || '',
      '[DEPARTURE_AIRPORT]': data.departureAirportName || '',
      '[ARRIVAL_AIRPORT]': data.arrivalAirportName || '',
      '[TRUCK_TYPE]': data.truckType || 'Dedicated',
      '[TRUCK_TYPE_LOWER]': (data.truckType || 'dedicated').toLowerCase()
    };
    
    // Replace each placeholder (case-insensitive)
    Object.keys(replacements).forEach(placeholder => {
      const escaped = placeholder.replace(/[[\]]/g, '\\$&');
      const regex = new RegExp(escaped, 'gi');
      result = result.replace(regex, replacements[placeholder]);
    });
    
    return result;
  },

  getBaseIncludes(mode, type, data, recipientType = 'Agent') {
    const tpl = this.getTemplate(mode, type, recipientType);
    if (!tpl) return [];
    return (tpl.includes || []).map(i => this.replacePlaceholders(i, data));
  },

  getAdditionalChargesMayApply(type, modes = [], hasInsurance = false, hasVehicle = false) {
  let items = [...(ADDITIONAL_CHARGES_CONFIG[type] || [])];
  
  modes.forEach(m => {
    const key = `${type}_${m}`;
    if (ADDITIONAL_CHARGES_CONFIG[key]) {
      items = items.concat(ADDITIONAL_CHARGES_CONFIG[key]);
    }
  });
  
  // Add vehicle-specific charges if vehicle is included
  if (hasVehicle) {
    const vehicleKey = `${type}_Vehicle`;
    if (ADDITIONAL_CHARGES_CONFIG[vehicleKey]) {
      items = items.concat(ADDITIONAL_CHARGES_CONFIG[vehicleKey]);
    }
  }
  
  if (hasInsurance) {
    items = items.filter(i => !i.toLowerCase().includes('insurance'));
  }
  
  return [...new Set(items)];
},

  calculateTotals(charges) {
    const totals = {};
    let hasVariableCharges = false;
    
    (charges || []).forEach(c => {
      const displayType = c.displayType || (c.isPerAcw ? 'ratePerKgACW' : 'fixed');
      
      // Check if this is a variable charge type
      if (displayType !== 'fixed') {
        hasVariableCharges = true;
        return; // Don't add to totals
      }
      
      const curr = c.currency || 'USD';
      totals[curr] = (totals[curr] || 0) + (parseFloat(c.amount) || 0);
    });
    
    // Return null if any variable charges exist (caller should not show totals)
    if (hasVariableCharges) return null;
    
    return totals;
  },

  formatTotals(totals) {
    if (!totals) return ''; // No totals if variable charges
    return Object.entries(totals)
      .map(([c, a]) => `${c} ${a.toFixed(2)}`)
      .join(' + ');
  },

  // Format a single charge for display (used by both UI and PDF)
  formatChargeAmount(charge) {
    const displayType = charge.displayType || (charge.isPerAcw ? 'ratePerKgACW' : 'fixed');
    const currency = charge.currency || 'USD';
    
    switch (displayType) {
      case 'ratePerKgACW':
        return `${currency} ${parseFloat(charge.amount).toFixed(2)}/kg ACW`;
      case 'ratePerCBM':
        return `${currency} ${parseFloat(charge.amount).toFixed(2)}/CBM`;
      case 'range':
        const min = parseFloat(charge.amount).toFixed(2);
        const max = parseFloat(charge.rangeMax || charge.amount).toFixed(2);
        return `${currency} ${min} - ${max}`;
      default: // fixed
        return `${currency} ${parseFloat(charge.amount).toFixed(2)}`;
    }
  }
};


// ============================================================
// TIME HELPERS (24-hour dropdowns)
// ============================================================

const TimeHelpers = {
  // Create hour dropdown (00-23)
  createHourSelect(selectedHour = '') {
    const select = $.el('select', { className: 'time-hour-select' });
    select.appendChild($.el('option', { value: '', textContent: '--' }));
    for (let h = 0; h < 24; h++) {
      const val = String(h).padStart(2, '0');
      const opt = $.el('option', { value: val, textContent: val });
      if (val === selectedHour) opt.selected = true;
      select.appendChild(opt);
    }
    return select;
  },

  // Create minute dropdown (00, 15, 30, 45)
  createMinuteSelect(selectedMinute = '') {
    const select = $.el('select', { className: 'time-minute-select' });
    select.appendChild($.el('option', { value: '', textContent: '--' }));
    ['00', '15', '30', '45'].forEach(m => {
      const opt = $.el('option', { value: m, textContent: m });
      if (m === selectedMinute) opt.selected = true;
      select.appendChild(opt);
    });
    return select;
  },

  // Create complete time selector group
  createTimeSelector(currentTime = '') {
    const group = $.el('div', { className: 'time-select-group' });
    
    let hour = '';
    let minute = '';
    if (currentTime && currentTime.includes(':')) {
      const parts = currentTime.split(':');
      hour = parts[0] || '';
      minute = parts[1] || '';
      // Round minute to nearest option
      if (minute && !['00', '15', '30', '45'].includes(minute)) {
        const m = parseInt(minute, 10);
        if (m < 8) minute = '00';
        else if (m < 23) minute = '15';
        else if (m < 38) minute = '30';
        else if (m < 53) minute = '45';
        else minute = '00';
      }
    }
    
    const hourSelect = this.createHourSelect(hour);
    const minuteSelect = this.createMinuteSelect(minute);
    
    group.appendChild(hourSelect);
    group.appendChild($.el('span', { textContent: ':' }));
    group.appendChild(minuteSelect);
    
    return group;
  },

  // Get time value from selector group
  getTimeFromSelector(group) {
    const hour = group.querySelector('.time-hour-select')?.value || '';
    const minute = group.querySelector('.time-minute-select')?.value || '';
    if (!hour && !minute) return '';
    return `${hour || '00'}:${minute || '00'}`;
  }
};


// ============================================================
// DOM HELPERS
// ============================================================

const $ = {
  get(id) { return document.getElementById(id); },

  el(tag, props = {}) {
    const el = document.createElement(tag);
    Object.entries(props).forEach(([k, v]) => {
      if (k === 'className') {
        el.className = v;
      } else if (k === 'textContent') {
        el.textContent = v;
      } else if (k === 'innerHTML') {
        el.innerHTML = v;
      } else if (k.startsWith('data-')) {
        el.setAttribute(k, v);
      } else if (k === 'type' && tag.toLowerCase() === 'textarea') {
      } else if (k === 'rows' || k === 'cols') {
        el.setAttribute(k, v);
      } else {
        try {
          el[k] = v;
        } catch (e) {
          el.setAttribute(k, v);
        }
      }
    });
    return el;
  },

  clear(el) {
    if (!el) return;
    while (el.firstChild) el.removeChild(el.firstChild);
  },

  show(el) { if (el) el.classList.remove('hidden'); },
  hide(el) { if (el) el.classList.add('hidden'); },
  toggle(el) { if (el) el.classList.toggle('hidden'); }
};

// ============================================================
// MODALS & VIEWS
// ============================================================

const Modals = {
  open(id) {
    const modal = $.get(id);
    if (modal) { document.body.classList.add('modal-open'); $.show(modal); }
  },
  close(id) {
    const modal = $.get(id);
    if (modal) { document.body.classList.remove('modal-open'); $.hide(modal); }
  },
  closeJob() { this.close('createJobModal'); },
  closeAgent() { this.close('createAgentModal'); },
  
  // Simple alert dialog (just OK button)
  alert(options) {
    return new Promise((resolve) => {
      const modal = $.get('genericModal');
      const title = $.get('genericModalTitle');
      const message = $.get('genericModalMessage');
      const inputsContainer = $.get('genericModalInputs');
      const cancelBtn = $.get('genericModalCancel');
      const confirmBtn = $.get('genericModalConfirm');
      
      title.textContent = options.title || ((State.lang === 'tr') ? 'Bilgi' : 'Notice');
      message.textContent = options.message || '';
      
      // Hide inputs and cancel button for simple alert
      $.hide(inputsContainer);
      $.clear(inputsContainer);
      $.hide(cancelBtn);
      
      // Set OK button
      confirmBtn.textContent = options.okText || 'OK';
      confirmBtn.className = 'btn-primary';
      
      const cleanup = () => {
        this.close('genericModal');
        confirmBtn.removeEventListener('click', onConfirm);
        $.show(cancelBtn); // Restore cancel button visibility for other dialogs
      };
      
      const onConfirm = () => { cleanup(); resolve(true); };
      
      confirmBtn.addEventListener('click', onConfirm);
      
      this.open('genericModal');
    });
  },
  
  // Generic confirm dialog
  confirm(options) {
    return new Promise((resolve) => {
      const modal = $.get('genericModal');
      const title = $.get('genericModalTitle');
      const message = $.get('genericModalMessage');
      const inputsContainer = $.get('genericModalInputs');
      const cancelBtn = $.get('genericModalCancel');
      const confirmBtn = $.get('genericModalConfirm');
      
      title.textContent = options.title || ((State.lang === 'tr') ? 'Onayla' : 'Confirm');
      message.textContent = options.message || '';
      
      // Hide inputs for simple confirm
      $.hide(inputsContainer);
      $.clear(inputsContainer);
      
      // Set button labels
      cancelBtn.textContent = options.cancelText || ((State.lang === 'tr') ? 'İptal' : 'Cancel');
      confirmBtn.textContent = options.confirmText || ((State.lang === 'tr') ? 'Onayla' : 'Confirm');
      confirmBtn.className = options.danger ? 'btn-danger' : 'btn-primary';
      
      const cleanup = () => {
        this.close('genericModal');
        cancelBtn.removeEventListener('click', onCancel);
        confirmBtn.removeEventListener('click', onConfirm);
      };
      
      const onCancel = () => { cleanup(); resolve(false); };
      const onConfirm = () => { cleanup(); resolve(true); };
      
      cancelBtn.addEventListener('click', onCancel);
      confirmBtn.addEventListener('click', onConfirm);
      
      this.open('genericModal');
    });
  },
  
  // Generic input dialog
  prompt(options) {
    return new Promise((resolve) => {
      const modal = $.get('genericModal');
      const title = $.get('genericModalTitle');
      const message = $.get('genericModalMessage');
      const inputsContainer = $.get('genericModalInputs');
      const cancelBtn = $.get('genericModalCancel');
      const confirmBtn = $.get('genericModalConfirm');
      
      title.textContent = options.title || ((State.lang === 'tr') ? 'Giriş' : 'Input');
      message.textContent = options.message || '';
      
      // Clear and show inputs
      $.clear(inputsContainer);
      $.show(inputsContainer);
      
      // Build input fields
      const fields = options.fields || [{ name: 'value', label: 'Value', type: 'text' }];
      fields.forEach(field => {
        const wrapper = $.el('div');
        wrapper.appendChild($.el('label', { textContent: field.label || field.name }));
        
        let input;
        if (field.type === 'select' && field.options) {
          input = $.el('select', { name: field.name });
          field.options.forEach(opt => {
            const option = $.el('option', { value: opt.value || opt, textContent: opt.label || opt });
            if (field.value === (opt.value || opt)) option.selected = true;
            input.appendChild(option);
          });
        } else if (field.type === 'textarea') {
          input = $.el('textarea', { name: field.name, rows: '3' });
          input.textContent = field.value || '';
        } else {
          input = $.el('input', { 
            type: field.type || 'text', 
            name: field.name,
            value: field.value || '',
            placeholder: field.placeholder || ''
          });
          if (field.type === 'number') {
            input.step = field.step || 'any';
          }
        }
        wrapper.appendChild(input);
        inputsContainer.appendChild(wrapper);
      });
      
      // Set button labels
      cancelBtn.textContent = options.cancelText || ((State.lang === 'tr') ? 'İptal' : 'Cancel');
      confirmBtn.textContent = options.confirmText || ((State.lang === 'tr') ? 'Kaydet' : 'Save');
      confirmBtn.className = 'btn-primary';
      
      const cleanup = () => {
        this.close('genericModal');
        cancelBtn.removeEventListener('click', onCancel);
        confirmBtn.removeEventListener('click', onConfirm);
      };
      
      const onCancel = () => { cleanup(); resolve(null); };
      const onConfirm = () => {
        const values = {};
        fields.forEach(field => {
          const input = inputsContainer.querySelector(`[name="${field.name}"]`);
          if (input) {
            values[field.name] = field.type === 'number' ? parseFloat(input.value) || 0 : input.value;
          }
        });
        cleanup();
        resolve(values);
      };
      
      cancelBtn.addEventListener('click', onCancel);
      confirmBtn.addEventListener('click', onConfirm);
      
      this.open('genericModal');
      
      // Focus first input
      const firstInput = inputsContainer.querySelector('input, select, textarea');
      if (firstInput) firstInput.focus();
    });
  }
};

// ============================================================
// Dashboard UI
// ============================================================
const DashboardUI = {
  render() {
    const content = $.get('dashboardContent');
    if (!content) return;
    $.clear(content);

    // Top row: Moves by Status, Upcoming Jobs (3 days), Overdue Items
    const topRow = $.el('div', { className: 'dashboard-row' });
    
    // Moves by status
    const statusStats = this.getStatusStats();
    topRow.appendChild(this.createStatCard(I18n.t('movesByStatus'), statusStats));
    
    // Upcoming Jobs (next 3 days with details)
    topRow.appendChild(this.createUpcomingJobsSection());
    
    // Overdue items
    topRow.appendChild(this.createOverdueSection());
    
    content.appendChild(topRow);
    
    // Bottom row: Upcoming Schedule (14 days), Unpaid Moves, Payment Status
    const bottomRow = $.el('div', { className: 'dashboard-row' });
    
    // Upcoming Schedule (14 days)
    bottomRow.appendChild(this.createUpcomingScheduleSection());
    
    // Unpaid moves
    bottomRow.appendChild(this.createUnpaidSection());
    
    // Payment status
    const paymentStats = this.getPaymentStats();
    bottomRow.appendChild(this.createStatCard(I18n.t('paymentStatus'), paymentStats));
    
    content.appendChild(bottomRow);
  },

  getStatusStats() {
    const counts = { Planned: 0, Ongoing: 0, Completed: 0, Cancelled: 0 };
    State.jobs.forEach(job => {
      if (counts.hasOwnProperty(job.status)) {
        counts[job.status]++;
      }
    });
    return [
      { label: I18n.t('planned'), value: counts.Planned, color: 'var(--color-status-planned)' },
      { label: I18n.t('ongoing'), value: counts.Ongoing, color: 'var(--color-status-ongoing)' },
      { label: I18n.t('completed'), value: counts.Completed, color: 'var(--color-status-completed)' },
      { label: I18n.t('cancelled'), value: counts.Cancelled, color: 'var(--color-status-cancelled)' }
    ];
  },

  getPaymentStats() {
    let paid = 0;
    let unpaid = 0;
    State.jobs.forEach(job => {
      if (job.paymentReceived) paid++;
      else unpaid++;
    });
    return [
      { label: I18n.t('paid'), value: paid, color: '#22c55e' },
      { label: I18n.t('unpaid'), value: unpaid, color: '#ef4444' }
    ];
  },

  createStatCard(title, stats) {
    const card = $.el('div', { className: 'dashboard-stat-card' });
    
    const header = $.el('h3', { className: 'dashboard-stat-title', textContent: title });
    card.appendChild(header);
    
    const statsList = $.el('div', { className: 'dashboard-stat-list' });
    stats.forEach(stat => {
      const row = $.el('div', { className: 'dashboard-stat-row' });
      
      const indicator = $.el('span', { className: 'dashboard-stat-indicator' });
      indicator.style.backgroundColor = stat.color;
      row.appendChild(indicator);
      
      const label = $.el('span', { className: 'dashboard-stat-label', textContent: stat.label });
      row.appendChild(label);
      
      const value = $.el('span', { className: 'dashboard-stat-value', textContent: stat.value });
      row.appendChild(value);
      
      statsList.appendChild(row);
    });
    card.appendChild(statsList);
    
    // Total row
    const total = stats.reduce((sum, s) => sum + s.value, 0);
    const totalRow = $.el('div', { className: 'dashboard-stat-total' });
    totalRow.innerHTML = `<span>${I18n.t('total')}</span><span>${total}</span>`;
    card.appendChild(totalRow);
    
    return card;
  },

  // Upcoming Jobs section - next 3 days including today, with full details
  createUpcomingJobsSection() {
    const section = $.el('div', { className: 'dashboard-list-section' });
    
    const header = $.el('h3', { className: 'dashboard-section-title', textContent: I18n.t('upcomingJobs') });
    section.appendChild(header);
    
    const items = this.getUpcomingItems(3);
    
    if (items.length === 0) {
      const empty = $.el('p', { className: 'dashboard-empty-message', textContent: I18n.t('noUpcomingJobs') });
      section.appendChild(empty);
      return section;
    }
    
    const listClasses = items.length > 8 ? 'dashboard-upcoming-list dashboard-list-scrollable' : 'dashboard-upcoming-list';
    const list = $.el('div', { className: listClasses });
    items.forEach(item => {
      const row = $.el('div', { className: 'dashboard-upcoming-item' });
      
      const dateEl = $.el('span', { className: 'dashboard-upcoming-date', textContent: Utils.formatDate(item.date) });
      row.appendChild(dateEl);
      
      const jobEl = $.el('span', { className: 'dashboard-upcoming-job', textContent: item.jobCode });
      row.appendChild(jobEl);
      
      const stepEl = $.el('span', { className: 'dashboard-upcoming-step', textContent: item.stepName });
      row.appendChild(stepEl);
      
      const clientEl = $.el('span', { className: 'dashboard-upcoming-client', textContent: item.clientName });
      row.appendChild(clientEl);
      
      list.appendChild(row);
    });
    section.appendChild(list);
    
    return section;
  },

  // Upcoming Schedule section - next 14 days, compact (tasks count per day)
  createUpcomingScheduleSection() {
    const section = $.el('div', { className: 'dashboard-list-section' });
    
    const header = $.el('h3', { className: 'dashboard-section-title', textContent: I18n.t('upcomingSchedule') });
    section.appendChild(header);
    
    const dayItems = this.getUpcomingByDay(14);
    
    if (dayItems.length === 0) {
      const empty = $.el('p', { className: 'dashboard-empty-message', textContent: I18n.t('noUpcomingItems') });
      section.appendChild(empty);
      return section;
    }
    
    const listClasses = dayItems.length > 8 ? 'dashboard-schedule-compact-list dashboard-list-scrollable' : 'dashboard-schedule-compact-list';
    const list = $.el('div', { className: listClasses });
    dayItems.forEach(day => {
      const row = $.el('div', { className: 'dashboard-schedule-compact-item' });
      
      const dateEl = $.el('span', { className: 'dashboard-schedule-date', textContent: Utils.formatDate(day.date) });
      row.appendChild(dateEl);
      
      const countEl = $.el('span', { className: 'dashboard-schedule-count', textContent: `${day.count} ${day.count === 1 ? I18n.t('task') : I18n.t('tasks')}` });
      row.appendChild(countEl);
      
      list.appendChild(row);
    });
    section.appendChild(list);
    
    return section;
  },

  // Get upcoming items grouped by day (for compact schedule view)
  getUpcomingByDay(days) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const futureDate = new Date(today);
    futureDate.setDate(futureDate.getDate() + days);
    
    const dayCounts = {};
    
    State.jobs.forEach(job => {
      if (job.status === 'Completed' || job.status === 'Cancelled') return;
      
      (job.steps || []).forEach(step => {
        if (!step.date) return;
        
        const stepDate = new Date(step.date);
        stepDate.setHours(0, 0, 0, 0);
        
        if (stepDate >= today && stepDate <= futureDate) {
          dayCounts[step.date] = (dayCounts[step.date] || 0) + 1;
        }
      });
    });
    
    // Also count extra jobs
    Object.entries(State.scheduleExtraJobs || {}).forEach(([dateStr, extraJobs]) => {
      const stepDate = new Date(dateStr);
      stepDate.setHours(0, 0, 0, 0);
      
      if (stepDate >= today && stepDate <= futureDate) {
        const count = (extraJobs || []).filter(ej => !ej.completed).length;
        if (count > 0) {
          dayCounts[dateStr] = (dayCounts[dateStr] || 0) + count;
        }
      }
    });
    
    return Object.entries(dayCounts)
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => a.date.localeCompare(b.date));
  },

  getUpcomingItems(days) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const futureDate = new Date(today);
    futureDate.setDate(futureDate.getDate() + days);
    
    const items = [];
    
    // Job steps
    State.jobs.forEach(job => {
      if (job.status === 'Completed' || job.status === 'Cancelled') return;
      
      (job.steps || []).forEach(step => {
        if (!step.date || step.completed) return;
        
        const stepDate = new Date(step.date);
        stepDate.setHours(0, 0, 0, 0);
        
        if (stepDate >= today && stepDate <= futureDate) {
          // First try to translate using step.id
          let stepName = '';
          if (step.id) {
            const translationKey = 'step_' + step.id;
            const translated = I18n.t(translationKey);
            if (translated !== translationKey && !translated.startsWith('step_')) {
              stepName = translated;
            }
          }
          // If no translation found, use label or customLabel
          if (!stepName) {
            stepName = step.customLabel || step.label || '';
          }
          // Fallback: format the id nicely
          if (!stepName && step.id) {
            stepName = step.id.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
          }
          if (!stepName) stepName = (State.lang === 'tr') ? 'Adım' : 'Step';
          
          items.push({
            date: step.date,
            jobCode: job.jobCode,
            stepName: stepName,
            clientName: job.clientName || ''
          });
        }
      });
    });
    
    // Extra jobs (including standalone with manually entered client names)
    Object.entries(State.scheduleExtraJobs || {}).forEach(([dateStr, extraJobs]) => {
      const stepDate = new Date(dateStr);
      stepDate.setHours(0, 0, 0, 0);
      
      if (stepDate >= today && stepDate <= futureDate) {
        (extraJobs || []).forEach(ej => {
          if (ej.completed) return;
          
          // Get task name
          let taskName = (ej.taskType === 'Custom' && ej.customTaskName)
            ? ej.customTaskName
            : I18n.taskTypeText(ej.taskType || '');
          if (!taskName) taskName = (State.lang === 'tr') ? 'Ek İş' : 'Additional Job';
          
          // Get client name - from linked job or standalone clientName field
          const linkedJob = ej.linkedJobId ? State.getJob(ej.linkedJobId) : null;
          const clientName = linkedJob ? (linkedJob.clientName || '') : (ej.clientName || '');
          const jobCode = linkedJob ? linkedJob.jobCode : '';
          
          items.push({
            date: dateStr,
            jobCode: jobCode,
            stepName: taskName,
            clientName: clientName
          });
        });
      }
    });
    
    return items.sort((a, b) => a.date.localeCompare(b.date));
  },

  createOverdueSection() {
    const section = $.el('div', { className: 'dashboard-list-section' });
    
    const header = $.el('h3', { className: 'dashboard-section-title', textContent: I18n.t('overdueItems') });
    section.appendChild(header);
    
    const items = this.getOverdueItems();
    
    if (items.length === 0) {
      const empty = $.el('p', { className: 'dashboard-empty-message', textContent: I18n.t('noOverdueItems') });
      section.appendChild(empty);
      return section;
    }
    
    const listClasses = items.length > 8 ? 'dashboard-overdue-list dashboard-list-scrollable' : 'dashboard-overdue-list';
    const list = $.el('div', { className: listClasses });
    items.forEach(item => {
      const row = $.el('div', { className: 'dashboard-overdue-item' });
      
      const dateEl = $.el('span', { className: 'dashboard-overdue-date', textContent: Utils.formatDate(item.date) });
      row.appendChild(dateEl);
      
      const identifier = item.clientName || item.jobCode || '-';
      const jobEl = $.el('span', { className: 'dashboard-overdue-job', textContent: identifier });
      row.appendChild(jobEl);
      
      const stepEl = $.el('span', { className: 'dashboard-overdue-step', textContent: item.stepName });
      row.appendChild(stepEl);
      
      list.appendChild(row);
    });
    section.appendChild(list);
    
    return section;
  },

  getOverdueItems() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const items = [];
    
    // Check job steps
    State.jobs.forEach(job => {
      if (job.status === 'Completed' || job.status === 'Cancelled') return;
      
      (job.steps || []).forEach(step => {
        if (!step.date || step.completed) return;
        
        const stepDate = new Date(step.date);
        stepDate.setHours(0, 0, 0, 0);
        
        if (stepDate < today) {
          // First try to translate using step.id
          let stepName = '';
          if (step.id) {
            const translationKey = 'step_' + step.id;
            const translated = I18n.t(translationKey);
            if (translated !== translationKey && !translated.startsWith('step_')) {
              stepName = translated;
            }
          }
          // If no translation found, use label or customLabel
          if (!stepName) {
            stepName = step.customLabel || step.label || '';
          }
          // Fallback: format the id nicely
          if (!stepName && step.id) {
            stepName = step.id.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
          }
          if (!stepName) stepName = (State.lang === 'tr') ? 'Adım' : 'Step';
          
          items.push({
            date: step.date,
            jobCode: job.jobCode,
            stepName: stepName,
            clientName: job.clientName || ''
          });
        }
      });
    });
    
    // Check schedule extra jobs (items added directly to schedule without a job)
    Object.entries(State.scheduleExtraJobs || {}).forEach(([dateStr, extraJobs]) => {
      const stepDate = new Date(dateStr);
      stepDate.setHours(0, 0, 0, 0);
      
      if (stepDate < today) {
        (extraJobs || []).forEach(ej => {
          if (ej.completed) return;
          
          // Get task name
          let taskName = (ej.taskType === 'Custom' && ej.customTaskName)
            ? ej.customTaskName
            : I18n.taskTypeText(ej.taskType || '');
          if (!taskName) taskName = (State.lang === 'tr') ? 'Ek İş' : 'Additional Job';
          
          // Get client name - from linked job or standalone
          const linkedJob = ej.linkedJobId ? State.getJob(ej.linkedJobId) : null;
          const clientName = linkedJob ? (linkedJob.clientName || '') : (ej.clientName || '');
          const jobCode = linkedJob ? linkedJob.jobCode : null;
          
          items.push({
            date: dateStr,
            jobCode: jobCode,
            stepName: taskName,
            clientName: clientName
          });
        });
      }
    });
    
    return items.sort((a, b) => a.date.localeCompare(b.date));
  },

  createUnpaidSection() {
    const section = $.el('div', { className: 'dashboard-list-section' });
    
    const header = $.el('h3', { className: 'dashboard-section-title', textContent: I18n.t('unpaidMoves') });
    section.appendChild(header);
    
    const unpaidJobs = State.jobs.filter(j => !j.paymentReceived && j.status !== 'Cancelled');
    
    if (unpaidJobs.length === 0) {
      const empty = $.el('p', { className: 'dashboard-empty-message', textContent: I18n.t('noUnpaidMoves') });
      section.appendChild(empty);
      return section;
    }
    
    const listClasses = unpaidJobs.length > 8 ? 'dashboard-unpaid-list dashboard-list-scrollable' : 'dashboard-unpaid-list';
    const list = $.el('div', { className: listClasses });
    unpaidJobs.forEach(job => {
      const row = $.el('div', { className: 'dashboard-unpaid-item' });
      
      const jobEl = $.el('span', { className: 'dashboard-unpaid-job', textContent: job.jobCode || '-' });
      row.appendChild(jobEl);
      
      const clientEl = $.el('span', { className: 'dashboard-unpaid-client', textContent: job.clientName || '-' });
      row.appendChild(clientEl);
      
      const statusEl = $.el('span', { className: 'dashboard-unpaid-status', textContent: I18n.statusText(job.status) || '-' });
      row.appendChild(statusEl);
      
      list.appendChild(row);
    });
    section.appendChild(list);
    
    return section;
  }
};

const Views = {
  show(name) {
    ['dashboardView', 'movesView', 'agentsView', 'scheduleView', 'storageView', 'documentsView', 'quotesView']
      .forEach(id => $.hide($.get(id)));

    ['navDashboard', 'navMoves', 'navAgents', 'navSchedule', 'navStorage', 'navDocuments', 'navQuotes']
      .forEach(id => {
        const el = $.get(id);
        if (el) el.classList.remove('active');
      });

    const map = {
      'dashboard': { view: 'dashboardView', nav: 'navDashboard' },
      'moves':     { view: 'movesView',     nav: 'navMoves' },
      'agents':    { view: 'agentsView',    nav: 'navAgents' },
      'schedule':  { view: 'scheduleView',  nav: 'navSchedule' },
      'storage':   { view: 'storageView',   nav: 'navStorage' },
      'documents': { view: 'documentsView', nav: 'navDocuments' },
      'quotes':    { view: 'quotesView',    nav: 'navQuotes' }
    };

    const v = map[name];
    if (v) {
      $.show($.get(v.view));
      const navEl = $.get(v.nav);
      if (navEl) navEl.classList.add('active');

      if (name === 'dashboard') {
        DashboardUI.render();
      } else if (name === 'schedule') {
        ScheduleUI.render();
      } else if (name === 'storage') {
        StorageUI.render();
      } else if (name === 'documents') {
        DocumentsTabUI.render();
      } else if (name === 'quotes') {
        QuotesUI.render();
      }
    }
  }
};

// ============================================================
// Schedule Export (PDF via browser print)
// ============================================================

const ScheduleExport = {
  buildDayRows(dateStr) {
    const rows = [];

    // Steps
    const stepsForDay = Steps.getForDate(dateStr);
    stepsForDay.forEach(({ job, step }) => {
      const office = step.office || '';
      // Check all address-type fields including portDetails and airports
      const address = step.address || step.portDetails || step.pickupAddress || step.deliveryAddress || step.pickupAirport || step.deliveryAirport || '-';
      rows.push({
        office,
        time: step.time || '',
        jobCode: job.jobCode || '',
        client: job.clientName || '',
        task: I18n.stepText(step) || '',
        address,
        personnel: step.personnel || '',
        vehicle: step.vehicle || '',
        notes: step.notes || '',
        completed: step.completed ? '✓' : ''
      });
    });

    // Extra jobs
    const extra = (State.scheduleExtraJobs[dateStr] || []).map(ej => Validator.normalizeExtraJob(ej, dateStr));
    extra.forEach(ej => {
      const taskName = (ej.taskType === 'Custom' && ej.customTaskName)
        ? ej.customTaskName
        : I18n.taskTypeText(ej.taskType || '');

      const office = ej.office || '';
      const linked = ej.linkedJobId ? State.getJob(ej.linkedJobId) : null;
      
      // Client name: from linked job if available, otherwise from standalone clientName field
      const clientName = linked 
        ? (linked.clientName || '') 
        : (ej.clientName || ej.linkedJobClientName || '');

      rows.push({
        office,
        time: ej.time || '',
        jobCode: linked ? (linked.jobCode || '') : (ej.linkedJobCode || ''),
        client: clientName,
        task: taskName || '',
        address: ej.address || '',
        personnel: ej.personnel || '',
        vehicle: ej.vehicle || '',
        notes: ej.notes || '',
        completed: ej.completed ? '✓' : ''
      });
    });

    const officeGroups = {};
    CONFIG.OFFICES.forEach(office => { officeGroups[office] = []; });

    rows.forEach(row => {
      if (row.office && officeGroups[row.office]) {
        officeGroups[row.office].push(row);
      }
    });

    Object.values(officeGroups).forEach(items => {
      items.sort((a, b) => (a.time || '').localeCompare(b.time || ''));
    });

    return officeGroups;
  },

  exportDayToPdf(dateStr) {
    const officeGroups = this.buildDayRows(dateStr);
    const allRows = Object.values(officeGroups).flat();

    const title = (State.lang === 'tr')
      ? `Günlük Program: ${Utils.formatDate(dateStr)}`
      : `Daily Schedule: ${Utils.formatDate(dateStr)}`;

    // Build separate tables for each office
    const officeTables = CONFIG.OFFICES.map(office => {
      const items = officeGroups[office] || [];
      if (!items.length) return '';
      
      return `
        <div class="office-section">
          <h2 class="office-title">${Utils.escapeHtml(office)}</h2>
          <table>
            <thead>
              <tr>
                <th>${Utils.escapeHtml(I18n.t('time'))}</th>
                <th>${Utils.escapeHtml(I18n.t('moveId'))}</th>
                <th>${Utils.escapeHtml((State.lang === 'tr') ? 'Müşteri' : 'Client')}</th>
                <th>${Utils.escapeHtml(I18n.t('task'))}</th>
                <th>${Utils.escapeHtml(I18n.t('address'))}</th>
                <th>${Utils.escapeHtml(I18n.t('personnel'))}</th>
                <th>${Utils.escapeHtml(I18n.t('vehicle'))}</th>
                <th>${Utils.escapeHtml(I18n.t('notesLabel'))}</th>
              </tr>
            </thead>
            <tbody>
              ${items.map(r => `
                <tr>
                  <td>${Utils.escapeHtml(r.time || '')}</td>
                  <td>${Utils.escapeHtml(r.jobCode || '')}</td>
                  <td>${Utils.escapeHtml(r.client || '')}</td>
                  <td>${Utils.escapeHtml(r.task || '')}</td>
                  <td>${Utils.escapeHtml(r.address || '')}</td>
                  <td>${Utils.escapeHtml(r.personnel || '')}</td>
                  <td>${Utils.escapeHtml(r.vehicle || '')}</td>
                  <td>${Utils.escapeHtml(r.notes || '')}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `;
    }).join('');

    const html = `
<!doctype html>
<html>
<head>
  <meta charset="utf-8"/>
  <title>${Utils.escapeHtml(title)}</title>
  <style>
    body { font-family: Arial, sans-serif; padding: 18px; color: #111; }
    h1 { font-size: 18px; margin: 0 0 16px 0; }
    .meta { font-size: 12px; color: #555; margin-bottom: 20px; }
    .office-section { margin-bottom: 24px; }
    .office-title { font-size: 14px; margin: 0 0 8px 0; padding: 8px 12px; background: #f0f0f0; border-left: 4px solid #333; }
    table { width: 100%; border-collapse: collapse; font-size: 11px; margin-bottom: 8px; }
    th, td { border: 1px solid #ccc; padding: 6px 8px; vertical-align: top; text-align: left; }
    th { background: #f8f8f8; font-weight: 600; }
    .small { color:#555; font-size: 11px; }
    .no-items { color: #666; font-style: italic; padding: 20px; text-align: center; }
    @media print {
      body { padding: 0; }
      h1 { font-size: 16px; }
      .office-section { page-break-inside: avoid; }
      table { font-size: 10px; }
    }
  </style>
</head>
<body>
  <h1>${Utils.escapeHtml(title)}</h1>
  <div class="meta small">
    ${Utils.escapeHtml((State.lang === 'tr') ? 'Not: PDF almak için yazdır penceresinde "PDF olarak kaydet" seçin.' : 'Tip: In the print dialog choose "Save as PDF".')}
  </div>
  ${allRows.length ? officeTables : `<div class="no-items">${Utils.escapeHtml((State.lang === 'tr') ? 'Bu gün için kayıt yok.' : 'No items for this day.')}</div>`}
</body>
</html>
`.trim();

    const w = window.open('', '_blank');
    if (!w) {
      Modals.alert({ 
        title: (State.lang === 'tr') ? 'Uyarı' : 'Warning',
        message: (State.lang === 'tr') ? 'Açılır pencere engellendi. Lütfen pop-up izin verin.' : 'Popup blocked. Please allow popups.' 
      });
      return;
    }
    w.document.open();
    w.document.write(html);
    w.document.close();

    setTimeout(() => {
      try { w.focus(); w.print(); } catch (e) {}
    }, 150);
  }
};

// ============================================================
// PART 2 OF 4: JOBS & DOCUMENT UI
// ============================================================

const JobsUI = {
  render() {
    const container = $.get('jobList');
    const allJobs = this.filter();
    $.clear(container);
    
    if (allJobs.length === 0) {
      container.appendChild($.el('p', { textContent: I18n.t('noMovesMatch') }));
      return;
    }
    
    // Pagination
    const { page, perPage } = State.pagination.jobs;
    const totalPages = Math.ceil(allJobs.length / perPage);
    const startIdx = (page - 1) * perPage;
    const pageJobs = allJobs.slice(startIdx, startIdx + perPage);
    
    // Render job cards
    pageJobs.forEach(job => container.appendChild(this.createCard(job)));
    
    // Add pagination controls if more than one page
    if (totalPages > 1) {
      container.appendChild(this.createPaginationControls('jobs', page, totalPages, allJobs.length));
    }
  },
  
  createPaginationControls(type, currentPage, totalPages, totalItems) {
    const wrapper = $.el('div', { className: 'pagination-controls' });
    
    // Info text
    const { perPage } = State.pagination[type];
    const start = (currentPage - 1) * perPage + 1;
    const end = Math.min(currentPage * perPage, totalItems);
    const infoText = (State.lang === 'tr') 
      ? `${totalItems} kayıttan ${start}-${end} arası gösteriliyor`
      : `Showing ${start}-${end} of ${totalItems}`;
    wrapper.appendChild($.el('span', { className: 'pagination-info', textContent: infoText }));
    
    const buttons = $.el('div', { className: 'pagination-buttons' });
    
    // Previous button
    const prevBtn = $.el('button', { 
      type: 'button', 
      textContent: '← ' + ((State.lang === 'tr') ? 'Önceki' : 'Previous'),
      disabled: currentPage === 1
    });
    prevBtn.addEventListener('click', () => {
      if (State.pagination[type].page > 1) {
        State.pagination[type].page--;
        this.render();
      }
    });
    buttons.appendChild(prevBtn);
    
    // Page indicator
    buttons.appendChild($.el('span', { 
      className: 'pagination-current',
      textContent: `${currentPage} / ${totalPages}` 
    }));
    
    // Next button
    const nextBtn = $.el('button', { 
      type: 'button', 
      textContent: ((State.lang === 'tr') ? 'Sonraki' : 'Next') + ' →',
      disabled: currentPage === totalPages
    });
    nextBtn.addEventListener('click', () => {
      if (State.pagination[type].page < totalPages) {
        State.pagination[type].page++;
        this.render();
      }
    });
    buttons.appendChild(nextBtn);
    
    wrapper.appendChild(buttons);
    return wrapper;
  },

  filter() {
    let list = [...State.jobs];
    if (State.filters.status !== 'All') list = list.filter(j => j.status === State.filters.status);
    if (State.filters.type !== 'All') list = list.filter(j => j.tradeDirection === State.filters.type);
    if (State.filters.payment === 'Paid') list = list.filter(j => j.paymentReceived);
    else if (State.filters.payment === 'Unpaid') list = list.filter(j => !j.paymentReceived);

    if (State.filters.search) {
      const term = State.filters.search.toLowerCase();
      list = list.filter(job => {
        const text = [
          job.jobCode,
          job.clientName,
          job.originCity,
          job.originCountry,
          CONFIG.getCountryNameBilingual(job.originCountry),      // Both EN and TR country names
          job.destinationCity,
          job.destinationCountry,
          CONFIG.getCountryNameBilingual(job.destinationCountry), // Both EN and TR country names
          State.getAgentName(job.originAgentId),
          State.getAgentName(job.destinationAgentId),
          job.tradeDirection,
          I18n.typeTextBilingual(job.tradeDirection),        // Both EN and TR (Import/İthalat, etc.)
          job.status,
          I18n.statusTextBilingual(job.status),              // Both EN and TR status
          ...(job.modes || []),
          I18n.modesTextBilingual(job.modes)                 // Both EN and TR modes (Sea/Deniz, etc.)
        ]
          .filter(Boolean)
          .join(' ')
          .toLowerCase();
        return text.includes(term);
      });
    }

    list.sort((a, b) => {
      const da = Steps.getEarliest(a);
      const db = Steps.getEarliest(b);
      if (!da && !db) return 0;
      if (!da) return 1;
      if (!db) return -1;
      return da.localeCompare(db);
    });
    return list;
  },

  createCard(job) {
    const card = $.el('div', { className: 'job-card' });
    
    // Tag badge (top-right, positioned absolute)
    if (job.tag && job.tag.trim()) {
      card.classList.add('has-tag');
      const tagBadge = $.el('span', { 
        className: 'job-card-tag', 
        textContent: job.tag.trim() 
      });
      card.appendChild(tagBadge);
    }
    
    // Row 1: Client Name (left) — Job Code (right)
    const row1 = $.el('div', { className: 'job-card-header' });
    row1.appendChild($.el('span', { className: 'job-card-client', textContent: job.clientName || I18n.t('noClientName') }));
    row1.appendChild($.el('span', { className: 'job-card-code', textContent: job.jobCode || '' }));
    card.appendChild(row1);
    
    // Row 2: Route
    card.appendChild($.el('p', { 
      className: 'job-card-route',
      textContent: `${Utils.location(job.originCity, job.originCountry)} → ${Utils.location(job.destinationCity, job.destinationCountry)}` 
    }));
    
    // Row 3: Status (left) — Modes (right)
    const row3 = $.el('div', { className: 'job-card-row' });
    row3.appendChild($.el('span', { className: `status-label status-${job.status}`, textContent: I18n.statusText(job.status) }));
    
    const modesContainer = $.el('span', { className: 'job-card-modes' });
    if (job.modes && job.modes.length > 0) {
      job.modes.forEach(mode => {
        const modeText = I18n.modeText(mode);
        modesContainer.appendChild($.el('span', { className: 'mode-badge', textContent: modeText }));
      });
    }
    row3.appendChild(modesContainer);
    card.appendChild(row3);
    
    // Row 4: Trade Direction (left) — Payment Status (right)
    const row4 = $.el('div', { className: 'job-card-row' });
    const typeLabel = I18n.typeText(job.tradeDirection) || '-';
    row4.appendChild($.el('span', { className: 'job-card-type', textContent: typeLabel }));
    
    const payLabel = job.paymentReceived ? I18n.t('paidLabel') : I18n.t('unpaidLabel');
    const payClass = job.paymentReceived ? 'job-card-paid' : 'job-card-unpaid';
    row4.appendChild($.el('span', { className: payClass, textContent: payLabel }));
    card.appendChild(row4);

    card.addEventListener('click', () => this.showDetails(job));
    return card;
  },

  // Helper to add a label/value item to a grid
  addDetailItem(container, label, value) {
    const item = $.el('div', { className: 'detail-item' });
    item.appendChild($.el('span', { className: 'detail-label', textContent: label }));
    item.appendChild($.el('span', { className: 'detail-value', textContent: value || '-' }));
    container.appendChild(item);
  },

  showDetails(job) {
    State.selectedJobId = job.id;
    $.get('editJobBtn').disabled = false;

    const rightPanel = document.querySelector('#details.right-panel');
    if (rightPanel) {
      const headers = rightPanel.querySelectorAll('.header-row h2');
      if (headers[0]) headers[0].textContent = I18n.t('moveDetails');
      if (headers[1]) headers[1].textContent = I18n.t('moveAgents');
      if (headers[2]) headers[2].textContent = I18n.t('checklist');
      if (headers[3]) headers[3].textContent = I18n.t('notes');
      if (headers[4]) headers[4].textContent = I18n.t('documents');
    }

    const container = $.get('jobDetails');
    $.clear(container);

    // ===== HEADER: Job Code + Client Name + Tag =====
    const titleContainer = $.el('div', { className: 'move-details-header' });
    const titleText = `${job.jobCode || ''} – ${job.clientName || I18n.t('noClientName')}`;
    titleContainer.appendChild($.el('h3', { textContent: titleText }));
    
    if (job.tag && job.tag.trim()) {
      titleContainer.appendChild($.el('span', { 
        className: 'move-details-tag', 
        textContent: job.tag.trim() 
      }));
    }
    container.appendChild(titleContainer);

    // ===== STATUS BAR =====
    const statusBar = $.el('div', { className: 'move-status-bar' });
    const statusBadge = $.el('span', { 
      className: `status-badge ${(job.status || '').toLowerCase()}`,
      textContent: I18n.statusText(job.status)
    });
    statusBar.appendChild(statusBadge);
    
    const paymentBadge = $.el('span', { 
      className: `payment-badge ${job.paymentReceived ? 'paid' : 'unpaid'}`,
      textContent: job.paymentReceived ? I18n.t('paidLabel') : I18n.t('unpaidLabel')
    });
    statusBar.appendChild(paymentBadge);
    
    if (job.modes && job.modes.length > 0) {
      const modeBadge = $.el('span', { 
        className: 'mode-badge',
        textContent: I18n.modesText(job.modes)
      });
      statusBar.appendChild(modeBadge);
    }
    container.appendChild(statusBar);

    // ===== CLIENT INFORMATION CARD =====
    const clientCard = $.el('div', { className: 'details-card' });
    clientCard.appendChild($.el('h4', { className: 'details-card-title', textContent: (State.lang === 'tr') ? 'Müşteri Bilgileri' : 'Client Information' }));
    const clientGrid = $.el('div', { className: 'details-card-grid' });
    
    this.addDetailItem(clientGrid, (State.lang === 'tr') ? 'Müşteri' : 'Client', job.clientName || '-');
    if (job.organizationName) this.addDetailItem(clientGrid, I18n.t('organization'), job.organizationName);
    if (job.clientPhone) this.addDetailItem(clientGrid, I18n.t('clientPhoneLabel'), job.clientPhone);
    if (job.clientEmail) this.addDetailItem(clientGrid, I18n.t('clientEmailLabel'), job.clientEmail);
    this.addDetailItem(clientGrid, I18n.t('clientTypeLabel'), I18n.clientTypeText(job.clientType) || '-');
    
    clientCard.appendChild(clientGrid);
    container.appendChild(clientCard);

    // ===== MOVE INFORMATION CARD =====
    const moveCard = $.el('div', { className: 'details-card' });
    moveCard.appendChild($.el('h4', { className: 'details-card-title', textContent: (State.lang === 'tr') ? 'Taşıma Bilgileri' : 'Move Information' }));
    const moveGrid = $.el('div', { className: 'details-card-grid' });
    
    this.addDetailItem(moveGrid, I18n.t('moveId'), job.jobCode || '-');
    this.addDetailItem(moveGrid, I18n.t('typeLabel'), I18n.typeText(job.tradeDirection) || '-');
    this.addDetailItem(moveGrid, I18n.t('bookingTypeLabel'), I18n.bookingTypeText(job.bookingType) || '-');
    this.addDetailItem(moveGrid, I18n.t('moveManager'), job.moveManager || '-');
    this.addDetailItem(moveGrid, I18n.t('shipmentContents'), I18n.contentsText(job.shipmentContents || ['HHE']));
    
    moveCard.appendChild(moveGrid);
    container.appendChild(moveCard);

    // ===== ROUTE CARD (Origin / Destination side by side) =====
    const routeCard = $.el('div', { className: 'details-card' });
    routeCard.appendChild($.el('h4', { className: 'details-card-title', textContent: (State.lang === 'tr') ? 'Rota' : 'Route' }));
    
    const routeRow = $.el('div', { className: 'route-cards-row' });
    
    // Origin Card
    const originCard = $.el('div', { className: 'route-card origin' });
    originCard.appendChild($.el('div', { className: 'route-card-label', textContent: I18n.t('origin') }));
    originCard.appendChild($.el('div', { className: 'route-card-city', textContent: Utils.location(job.originCity, job.originCountry) }));
    if (job.originFullAddress) {
      originCard.appendChild($.el('div', { className: 'route-card-address', textContent: job.originFullAddress }));
    }
    const originDetails = [];
    if (job.originFloor) originDetails.push(`${I18n.t('floorLabel')}: ${job.originFloor}`);
    if (job.originElevator) originDetails.push(`${I18n.t('elevatorLabel')}: ${job.originElevator}`);
    if (job.originAccessConditions) originDetails.push(`${I18n.t('accessConditionsLabel')}: ${job.originAccessConditions}`);
    if (originDetails.length > 0) {
      const detailsDiv = $.el('div', { className: 'route-card-details' });
      originDetails.forEach(d => detailsDiv.appendChild($.el('div', { textContent: d })));
      originCard.appendChild(detailsDiv);
    }
    routeRow.appendChild(originCard);
    
    // Arrow
    routeRow.appendChild($.el('div', { className: 'route-arrow', textContent: '→' }));
    
    // Destination Card
    const destCard = $.el('div', { className: 'route-card destination' });
    destCard.appendChild($.el('div', { className: 'route-card-label', textContent: I18n.t('destination') }));
    destCard.appendChild($.el('div', { className: 'route-card-city', textContent: Utils.location(job.destinationCity, job.destinationCountry) }));
    if (job.destinationFullAddress) {
      destCard.appendChild($.el('div', { className: 'route-card-address', textContent: job.destinationFullAddress }));
    }
    const destDetails = [];
    if (job.destinationFloor) destDetails.push(`${I18n.t('floorLabel')}: ${job.destinationFloor}`);
    if (job.destinationElevator) destDetails.push(`${I18n.t('elevatorLabel')}: ${job.destinationElevator}`);
    if (job.destinationAccessConditions) destDetails.push(`${I18n.t('accessConditionsLabel')}: ${job.destinationAccessConditions}`);
    if (destDetails.length > 0) {
      const detailsDiv = $.el('div', { className: 'route-card-details' });
      destDetails.forEach(d => detailsDiv.appendChild($.el('div', { textContent: d })));
      destCard.appendChild(detailsDiv);
    }
    routeRow.appendChild(destCard);
    
    routeCard.appendChild(routeRow);
    container.appendChild(routeCard);

    // ===== BROKERS CARD (if any) =====
    const hasBrokers = job.customsBrokerId || job.seaFreightBrokerId || job.airFreightBrokerId;
    if (hasBrokers) {
      const brokersCard = $.el('div', { className: 'details-card' });
      brokersCard.appendChild($.el('h4', { className: 'details-card-title', textContent: I18n.t('brokersSection') }));
      const brokersGrid = $.el('div', { className: 'details-card-grid' });
      
      if (job.customsBrokerId) {
        const broker = State.getAgent(job.customsBrokerId);
        if (broker) this.addDetailItem(brokersGrid, I18n.t('customsBrokerLabel'), broker.name);
      }
      if (job.seaFreightBrokerId) {
        const broker = State.getAgent(job.seaFreightBrokerId);
        if (broker) this.addDetailItem(brokersGrid, I18n.t('seaFreightBrokerLabel'), broker.name);
      }
      if (job.airFreightBrokerId) {
        const broker = State.getAgent(job.airFreightBrokerId);
        if (broker) this.addDetailItem(brokersGrid, I18n.t('airFreightBrokerLabel'), broker.name);
      }
      
      brokersCard.appendChild(brokersGrid);
      container.appendChild(brokersCard);
    }

    // ===== PREVIOUS MOVES (collapsible) =====
    if (job.clientName && job.clientName.trim()) {
      const previousMoves = State.jobs.filter(j => 
        j.id !== job.id && 
        j.clientName && 
        j.clientName.toLowerCase().trim() === job.clientName.toLowerCase().trim()
      );
      
      if (previousMoves.length > 0) {
        const prevCard = $.el('div', { className: 'details-card collapsible' });
        
        const prevHeader = $.el('div', { className: 'details-card-header-toggle' });
        prevHeader.appendChild($.el('h4', { className: 'details-card-title', textContent: (State.lang === 'tr') ? `Önceki Taşımalar (${previousMoves.length})` : `Previous Moves (${previousMoves.length})` }));
        const toggleBtn = $.el('span', { className: 'collapse-toggle', textContent: '▼' });
        prevHeader.appendChild(toggleBtn);
        prevCard.appendChild(prevHeader);
        
        const prevList = $.el('div', { className: 'previous-moves-list' });
        previousMoves.slice(0, 10).forEach(prevJob => {
          const row = $.el('div', { className: 'previous-move-item' });
          
          const codeLink = $.el('span', { className: 'previous-move-code', textContent: prevJob.jobCode || '-' });
          codeLink.addEventListener('click', () => {
            State.selectedJobId = prevJob.id;
            this.showDetails(prevJob);
          });
          row.appendChild(codeLink);
          row.appendChild($.el('span', { className: 'previous-move-route', textContent: `${prevJob.originCity || '?'} → ${prevJob.destinationCity || '?'}` }));
          row.appendChild($.el('span', { className: `previous-move-status status-${(prevJob.status || '').toLowerCase()}`, textContent: I18n.statusText(prevJob.status) }));
          
          prevList.appendChild(row);
        });
        prevCard.appendChild(prevList);
        container.appendChild(prevCard);
        
        prevHeader.addEventListener('click', () => {
          prevList.classList.toggle('hidden');
          toggleBtn.textContent = prevList.classList.contains('hidden') ? '▶' : '▼';
        });
      }
    }

// Mode-specific information boxes
const modeInfoContainer = $.el('div', { style: 'margin-top: 16px;' });

if (job.modes && job.modes.includes('Sea')) {
  const seaBox = $.el('div', { className: 'mode-info-box sea' });
  seaBox.appendChild($.el('h5', { textContent: I18n.t('sectionSeaFreightDetails') }));
  const seaRows = [
    [I18n.t('lblVolume'), `${job.seaVolume || 0} cbm`],
    [I18n.t('lblContainer'), job.containerDetails || '-']
  ];
  // Add gross weight if entered
  if (job.seaGrossWeight) {
    seaRows.push([I18n.t('lblGrossWeight'), `${job.seaGrossWeight} kg`]);
  }
  seaRows.forEach(([label, value]) => {
    const row = $.el('div', { className: 'mode-info-row' });
    row.appendChild($.el('span', { className: 'mode-info-label', textContent: label }));
    row.appendChild($.el('span', { className: 'mode-info-value', textContent: value }));
    seaBox.appendChild(row);
  });
  modeInfoContainer.appendChild(seaBox);
}

if (job.modes && job.modes.includes('Air')) {
  const airBox = $.el('div', { className: 'mode-info-box air' });
  airBox.appendChild($.el('h5', { textContent: I18n.t('sectionAirFreightDetails') }));
  const airRows = [
    [I18n.t('lblVolume'), `${job.airVolume || 0} cbm`],
    [I18n.t('lblCargoWeightShort'), `${job.airCargoWeight || 0} kg`],
    [I18n.t('lblChargeableWeight'), `${job.airACW || 0} kg`]
  ];
  airRows.forEach(([label, value]) => {
    const row = $.el('div', { className: 'mode-info-row' });
    row.appendChild($.el('span', { className: 'mode-info-label', textContent: label }));
    row.appendChild($.el('span', { className: 'mode-info-value', textContent: value }));
    airBox.appendChild(row);
  });
  modeInfoContainer.appendChild(airBox);
}

if (job.modes && job.modes.includes('Land')) {
  const landBox = $.el('div', { className: 'mode-info-box land' });
  landBox.appendChild($.el('h5', { textContent: I18n.t('sectionLandFreightDetails') }));
  const landRows = [
    [I18n.t('lblVolume'), `${job.landVolume || 0} cbm`]
  ];
  // Add gross weight if entered
  if (job.landGrossWeight) {
    landRows.push([I18n.t('lblGrossWeight'), `${job.landGrossWeight} kg`]);
  }
  landRows.forEach(([label, value]) => {
    const row = $.el('div', { className: 'mode-info-row' });
    row.appendChild($.el('span', { className: 'mode-info-label', textContent: label }));
    row.appendChild($.el('span', { className: 'mode-info-value', textContent: value }));
    landBox.appendChild(row);
  });
  modeInfoContainer.appendChild(landBox);
}

// Vehicle information if present
if (job.shipmentContents && job.shipmentContents.includes('Vehicle') && job.vehicleType) {
  const vehicleBox = $.el('div', { className: 'mode-info-box vehicle' });
  vehicleBox.appendChild($.el('h5', { textContent: I18n.t('lblVehicleDetails') }));
  const vehicleRows = [
    [I18n.t('lblVehicleType'), job.vehicleType || '-'],
    [I18n.t('lblVehicleMake') + '/' + I18n.t('lblVehicleModel'), `${job.vehicleMake || '-'} ${job.vehicleModel || ''}`.trim()],
    [I18n.t('lblVehicleYear'), job.vehicleYear || '-'],
    [I18n.t('lblVehicleVIN'), job.vehicleVIN || '-'],
    [I18n.t('lblVehicleCondition'), job.vehicleCondition === 'Running' ? I18n.t('lblRunning') : (job.vehicleCondition === 'Non-Running' ? I18n.t('lblNonRunning') : (job.vehicleCondition || '-'))]
  ];
  vehicleRows.forEach(([label, value]) => {
    const row = $.el('div', { className: 'mode-info-row' });
    row.appendChild($.el('span', { className: 'mode-info-label', textContent: label }));
    row.appendChild($.el('span', { className: 'mode-info-value', textContent: value }));
    vehicleBox.appendChild(row);
  });
  modeInfoContainer.appendChild(vehicleBox);
}

container.appendChild(modeInfoContainer);

// Storage section (only shows if hasStorage is true) - moved before Cost Breakdown
if (job.hasStorage) {
  container.appendChild(StorageUI.renderJobStorageSection(job));
}

// Cost Breakdown section
container.appendChild(this.createCostBreakdownSection(job));

// Payment Status section (moved directly after cost breakdown)
container.appendChild(this.paymentSection(job));

// Move Steps section
    container.appendChild(this.stepsSection(job));
    this.renderAgents(job);
    ChecklistUI.render(job);
    DocumentsUI.render(job);
    MediaUI.render(job);
    NotesUI.render(job);

    const checklistSection = $.get('checklistSection');
    if (checklistSection) {
      const label = checklistSection.querySelector('label');
      if (label) label.textContent = I18n.t('customChecklist');
      const btn = $.get('setChecklistBtn');
      if (btn) btn.textContent = I18n.t('addChecklistItems');
    }

    const addNoteBtn = $.get('addNoteBtn');
    if (addNoteBtn) addNoteBtn.textContent = I18n.t('addNoteBtn');

    const addDocumentBtn = $.get('addDocumentBtn');
    if (addDocumentBtn) addDocumentBtn.textContent = I18n.t('addDocument');
  },

  // Cost Breakdown Section
  createCostBreakdownSection(job) {
    const section = $.el('div', { className: 'cost-breakdown-section' });
    
    const header = $.el('div', { className: 'cost-breakdown-header' });
    header.appendChild($.el('h4', { className: 'details-card-title', textContent: (State.lang === 'tr') ? 'Maliyet Dökümü' : 'Cost Breakdown' }));
    
    const addBtn = $.el('button', { 
      type: 'button', 
      className: 'cost-add-btn',
      textContent: '+'
    });
    header.appendChild(addBtn);
    section.appendChild(header);
    
    // Ensure chargeItems exists
    if (!Array.isArray(job.chargeItems)) job.chargeItems = [];
    
    const chargesList = $.el('div', { className: 'cost-breakdown-list' });
    
    let grandTotal = 0;
    const currency = job.currency || 'USD';
    
    // Moving charges (all non-storage charges grouped together)
    if (job.chargeItems.length > 0) {
      const movingSection = $.el('div', { className: 'cost-category' });
      movingSection.appendChild($.el('div', { 
        className: 'cost-category-header',
        textContent: (State.lang === 'tr') ? 'Taşıma' : 'Moving'
      }));
      
      let movingTotal = 0;
      job.chargeItems.forEach((item, idx) => {
        const row = $.el('div', { className: 'cost-item-row' });
        
        const desc = $.el('span', { className: 'cost-item-desc', textContent: item.description || item.category || '-' });
        row.appendChild(desc);
        
        const amount = $.el('span', { 
          className: 'cost-item-amount', 
          textContent: Utils.formatCurrency(item.amount || 0, item.currency || currency)
        });
        row.appendChild(amount);
        
        const actions = $.el('div', { className: 'cost-item-actions' });
        
        const editBtn = $.el('button', { type: 'button', className: 'cost-item-btn', textContent: (State.lang === 'tr') ? 'Düzenle' : 'Edit' });
        editBtn.addEventListener('click', () => this.editChargeItem(job, idx));
        actions.appendChild(editBtn);
        
        const deleteBtn = $.el('button', { type: 'button', className: 'cost-item-btn cost-item-delete', textContent: '×' });
        deleteBtn.addEventListener('click', async () => {
          const confirmed = await Modals.confirm({
            title: (State.lang === 'tr') ? 'Masrafı Sil' : 'Delete Charge',
            message: (State.lang === 'tr') ? 'Bu masraf kalemi silinsin mi?' : 'Are you sure you want to delete this charge?',
            confirmText: (State.lang === 'tr') ? 'Sil' : 'Delete',
            danger: true
          });
          if (confirmed) {
            job.chargeItems.splice(idx, 1);
            Storage.saveJobs();
            this.showDetails(job);
          }
        });
        actions.appendChild(deleteBtn);
        
        row.appendChild(actions);
        movingSection.appendChild(row);
        
        movingTotal += (item.amount || 0);
      });
      
      // Moving subtotal
      if (job.chargeItems.length > 1) {
        const subtotalRow = $.el('div', { className: 'cost-subtotal-row' });
        subtotalRow.appendChild($.el('span', { textContent: (State.lang === 'tr') ? 'Alt Toplam:' : 'Subtotal:' }));
        subtotalRow.appendChild($.el('span', { textContent: Utils.formatCurrency(movingTotal, currency) }));
        movingSection.appendChild(subtotalRow);
      }
      
      chargesList.appendChild(movingSection);
      grandTotal += movingTotal;
    }
    
    // Storage cost (if linked storage exists)
    let storageCost = 0;
    let storageCurrency = 'TRY';
    if (job.storageId) {
      const storage = State.storageRecords.find(s => s.id === job.storageId);
      if (storage) {
        const costInfo = StorageUI.calculateCost(storage);
        storageCost = costInfo.total || 0;
        storageCurrency = costInfo.currency || 'TRY';
        
        if (storageCost > 0) {
          const storageSection = $.el('div', { className: 'cost-category' });
          storageSection.appendChild($.el('div', { 
            className: 'cost-category-header',
            textContent: (State.lang === 'tr') ? 'Depolama' : 'Storage'
          }));
          
          const storageRow = $.el('div', { className: 'cost-item-row' });
          storageRow.appendChild($.el('span', { 
            className: 'cost-item-desc', 
            textContent: `${StorageUI.getDaysInStorage(storage)} ${(State.lang === 'tr') ? 'gün' : 'days'}`
          }));
          storageRow.appendChild($.el('span', { 
            className: 'cost-item-amount', 
            textContent: Utils.formatCurrency(storageCost, storageCurrency)
          }));
          storageRow.appendChild($.el('div', { className: 'cost-item-actions' })); // empty placeholder
          storageSection.appendChild(storageRow);
          
          chargesList.appendChild(storageSection);
        }
      }
    }
    
    section.appendChild(chargesList);
    
    // Grand total (include storage)
    const totalRow = $.el('div', { className: 'cost-grand-total' });
    totalRow.appendChild($.el('span', { textContent: (State.lang === 'tr') ? 'TOPLAM:' : 'TOTAL:' }));
    
    // If storage is in different currency, show both
    if (storageCost > 0 && storageCurrency !== currency) {
      const totalText = `${Utils.formatCurrency(grandTotal, currency)} + ${Utils.formatCurrency(storageCost, storageCurrency)}`;
      totalRow.appendChild($.el('span', { textContent: totalText }));
    } else {
      totalRow.appendChild($.el('span', { textContent: Utils.formatCurrency(grandTotal + storageCost, currency) }));
    }
    section.appendChild(totalRow);
    
    // Add charge button handler
    addBtn.addEventListener('click', () => this.addChargeItem(job));
    
    return section;
  },

  getCategoryNameTR(category) {
    const map = {
      'Origin': 'Çıkış',
      'Freight': 'Navlun',
      'Destination': 'Varış',
      'Moving': 'Taşıma',
      'Additional': 'Ek Ücretler'
    };
    return map[category] || category;
  },

  async addChargeItem(job) {
    const result = await Modals.prompt({
      title: (State.lang === 'tr') ? 'Masraf Ekle' : 'Add Charge',
      message: (State.lang === 'tr') ? 'Yeni masraf kalemi bilgilerini girin.' : 'Enter the charge item details.',
      fields: [
        { name: 'description', label: (State.lang === 'tr') ? 'Açıklama' : 'Description', type: 'text', placeholder: (State.lang === 'tr') ? 'Masraf açıklaması' : 'Charge description' },
        { name: 'amount', label: (State.lang === 'tr') ? 'Tutar' : 'Amount', type: 'number', value: '0', step: '0.01' },
        { name: 'currency', label: (State.lang === 'tr') ? 'Para Birimi' : 'Currency', type: 'text', value: job.currency || 'USD' }
      ],
      confirmText: (State.lang === 'tr') ? 'Ekle' : 'Add'
    });
    
    if (!result) return;
    
    if (!Array.isArray(job.chargeItems)) job.chargeItems = [];
    job.chargeItems.push({
      category: 'Moving',
      description: result.description || '',
      amount: result.amount || 0,
      currency: result.currency || 'USD'
    });
    
    Storage.saveJobs();
    this.showDetails(job);
  },

  async editChargeItem(job, index) {
    const item = job.chargeItems[index];
    if (!item) return;
    
    const result = await Modals.prompt({
      title: (State.lang === 'tr') ? 'Masrafı Düzenle' : 'Edit Charge',
      message: '',
      fields: [
        { name: 'description', label: (State.lang === 'tr') ? 'Açıklama' : 'Description', type: 'text', value: item.description || '' },
        { name: 'amount', label: (State.lang === 'tr') ? 'Tutar' : 'Amount', type: 'number', value: String(item.amount || 0), step: '0.01' },
        { name: 'currency', label: (State.lang === 'tr') ? 'Para Birimi' : 'Currency', type: 'text', value: item.currency || 'USD' }
      ],
      confirmText: (State.lang === 'tr') ? 'Kaydet' : 'Save'
    });
    
    if (!result) return;
    
    item.description = result.description;
    item.amount = result.amount || 0;
    item.currency = result.currency;
    
    Storage.saveJobs();
    this.showDetails(job);
  },

  paymentSection(job) {
    const section = $.el('div', { className: 'details-card payment-status-card' });
    section.appendChild($.el('h4', { className: 'details-card-title', textContent: (State.lang === 'tr') ? 'Ödeme Durumu' : 'Payment Status' }));
    
    const buttons = $.el('div', { className: 'payment-buttons' });

    [[I18n.t('paidLabel'), true], [I18n.t('unpaidLabel'), false]].forEach(([label, isYes]) => {
      const btn = $.el('button', {
        type: 'button',
        className: `payment-btn ${job.paymentReceived === isYes ? 'active' : ''}`,
        textContent: label
      });
      btn.addEventListener('click', () => {
        job.paymentReceived = isYes;
        Storage.saveJobs();
        this.showDetails(job);
        this.render();
        ScheduleUI.render();
        DashboardUI.render();
      });
      buttons.appendChild(btn);
    });
    section.appendChild(buttons);
    return section;
  },

  // Move Steps: collapsible cards with progress indicator
stepsSection(job) {
  const section = $.el('div', { className: 'steps-section' });

  const headerRow = $.el('div', {
    style: 'display:flex; align-items:center; justify-content:space-between; gap:10px; flex-wrap:wrap; margin-bottom:8px;'
  });
  headerRow.appendChild($.el('h4', { className: 'details-section-title', textContent: I18n.t('moveSteps'), style: 'margin:0;' }));

  // Add Move Step button with dropdown
  const addBtnContainer = $.el('div', { style: 'position: relative;' });
  const addBtn = $.el('button', { type: 'button', textContent: I18n.t('addMoveStep') });
  addBtnContainer.appendChild(addBtn);
  
  // Dropdown menu for step types
  const dropdown = $.el('div', { 
    className: 'step-type-dropdown hidden',
    style: 'position: absolute; top: 100%; right: 0; margin-top: 4px; background: white; border: 1px solid #d1d5db; border-radius: 6px; box-shadow: 0 4px 12px rgba(0,0,0,0.15); z-index: 100; min-width: 220px; max-height: 300px; overflow-y: auto;'
  });
  
  // Step types: predefined + Custom
  const stepTypes = [
    { id: 'survey', label: I18n.t('step_survey') },
    { id: 'packing', label: I18n.t('step_packing') },
    { id: 'delivery_to_residence', label: I18n.t('step_delivery_to_residence') },
    { id: 'container_pickup', label: I18n.t('step_container_pickup') },
    { id: 'container_loading', label: I18n.t('step_container_loading') },
    { id: 'container_unloading', label: I18n.t('step_container_unloading') },
    { id: 'container_delivery', label: I18n.t('step_container_delivery') },
    { id: 'air_cargo_packing', label: I18n.t('step_air_cargo_packing') },
    { id: 'air_cargo_delivery_to_address', label: I18n.t('step_air_cargo_delivery_to_address') },
    { id: 'air_cargo_delivery_to_airport', label: I18n.t('step_air_cargo_delivery_to_airport') },
    { id: 'custom', label: (State.lang === 'tr') ? 'Özel (Custom)' : 'Custom' }
  ];
  
  stepTypes.forEach(stepType => {
    const item = $.el('div', {
      textContent: stepType.label,
      style: 'padding: 10px 14px; cursor: pointer; font-size: 13px; border-bottom: 1px solid #f3f4f6;'
    });
    item.addEventListener('mouseenter', () => { item.style.background = '#f3f4f6'; });
    item.addEventListener('mouseleave', () => { item.style.background = 'white'; });
    item.addEventListener('click', () => {
      dropdown.classList.add('hidden');
      this.addMoveStep(job, stepType.id);
    });
    dropdown.appendChild(item);
  });
  
  addBtnContainer.appendChild(dropdown);
  headerRow.appendChild(addBtnContainer);
  
  // Toggle dropdown on button click
  addBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    dropdown.classList.toggle('hidden');
  });
  
  // Close dropdown when clicking outside
  document.addEventListener('click', () => {
    dropdown.classList.add('hidden');
  });

  section.appendChild(headerRow);

  const steps = job.steps || [];
  const totalItems = steps.length;
  
  // Progress bar - only steps (no more linked additional jobs)
  if (totalItems > 0) {
    const progressBar = $.el('div', { className: 'steps-progress-bar' });
    let completedCount = 0;
    
    // Count steps
    steps.forEach(step => {
      const segment = $.el('div', { className: 'steps-progress-segment' });
      if (step.completed) {
        segment.classList.add('completed');
        completedCount++;
      } else if (step.date) {
        segment.classList.add('scheduled');
      }
      progressBar.appendChild(segment);
    });
    
    const progressText = $.el('span', { 
      className: 'steps-progress-text',
      textContent: `${completedCount}/${totalItems} ` + ((State.lang === 'tr') ? 'tamamlandı' : 'completed')
    });
    progressBar.appendChild(progressText);
    section.appendChild(progressBar);
  }

  const container = $.el('div', { id: 'stepsContainer' });

  if (steps.length === 0) {
    container.appendChild($.el('p', { textContent: I18n.t('noStepsDefined') }));
  } else {
    steps.forEach((step, idx) => container.appendChild(this.stepCardCollapsible(step, idx, job)));
  }

  section.appendChild(container);
  return section;
},

// Add a new move step to the job
async addMoveStep(job, stepTypeId) {
  const def = CONFIG.STEP_DEFINITIONS[stepTypeId] || {};
  
  // If custom, prompt for label
  let label = def.label || stepTypeId;
  if (stepTypeId === 'custom') {
    const result = await Modals.prompt({
      title: (State.lang === 'tr') ? 'Özel Adım' : 'Custom Step',
      message: (State.lang === 'tr') ? 'Adım adını girin:' : 'Enter step name:',
      fields: [{ name: 'stepName', label: (State.lang === 'tr') ? 'Adım Adı' : 'Step Name', type: 'text' }]
    });
    if (!result || !result.stepName || !result.stepName.trim()) return;
    label = result.stepName.trim();
  }
  
  // Create new step
  const newStep = {
    stepId: Utils.makeId('step'),
    id: stepTypeId,
    label: label,
    date: '',
    time: '',
    personnel: '',
    vehicle: '',
    address: '',
    portDetails: '',
    pickupAirport: '',
    deliveryAirport: '',
    pickupAddress: '',
    deliveryAddress: '',
    notes: '',
    office: '',
    completed: false
  };
  
  // Auto-fill address based on step definition
  if (def.autoFillAddress === 'origin' && job.originFullAddress) newStep.address = job.originFullAddress;
  if (def.autoFillAddress === 'destination' && job.destinationFullAddress) newStep.address = job.destinationFullAddress;
  if (def.autoFillDeliveryAddress === 'destination' && job.destinationFullAddress) newStep.deliveryAddress = job.destinationFullAddress;
  if (def.autoFillPickupAddress === 'origin' && job.originFullAddress) newStep.pickupAddress = job.originFullAddress;
  
  // Add step to job
  if (!Array.isArray(job.steps)) job.steps = [];
  job.steps.push(newStep);
  
  Storage.saveJobs();
  ScheduleUI.render();
  if (State.schedule.selectedDate) ScheduleUI.renderDay(State.schedule.selectedDate);
  this.showDetails(job);
},

  // Collapsible step card for Move Details
stepCardCollapsible(step, idx, job) {
  const def = CONFIG.STEP_DEFINITIONS[step.id] || { fields: [] };
  const card = $.el('div', { className: 'step-card-collapsible' });

  // Determine status - based on explicit completed flag
  let status = 'pending';
  if (step.completed) {
    status = 'completed';
  } else if (step.date || step.time) {
    status = 'scheduled';
  }

  // Collapse Header
  const header = $.el('div', { className: 'step-card-collapse-header' });
  
  const headerLeft = $.el('div', { className: 'step-card-header-left' });
  
  // Status indicator
  const statusIndicator = $.el('div', { className: `step-status-indicator ${status}` });
  statusIndicator.textContent = status === 'completed' ? '✓' : (status === 'scheduled' ? '•' : '○');
  headerLeft.appendChild(statusIndicator);
  
  // Title and subtitle
  const titleGroup = $.el('div');
  titleGroup.appendChild($.el('div', { className: 'step-card-title', textContent: I18n.stepText(step) }));
  
  const subtitle = $.el('div', { className: 'step-card-subtitle' });
  if (step.date) {
    subtitle.appendChild($.el('span', { textContent: Utils.formatDate(step.date) }));
  }
  if (step.time) {
    subtitle.appendChild($.el('span', { textContent: step.time }));
  }
  if (step.personnel) {
    subtitle.appendChild($.el('span', { textContent: step.personnel }));
  }
  titleGroup.appendChild(subtitle);
  headerLeft.appendChild(titleGroup);
  
  header.appendChild(headerLeft);
  
  // Arrow
  const arrow = $.el('span', { className: 'step-card-arrow', textContent: '▼' });
  header.appendChild(arrow);
  
  card.appendChild(header);

  // Collapse Body
  const body = $.el('div', { className: 'step-card-collapse-body hidden' });
  
  // View section
  const viewBox = $.el('div', { className: 'schedule-step-fields-view' });
  const officeComputed = step.office || '-';
  const addrShort = (step.address || step.portDetails || step.pickupAddress || step.deliveryAddress || step.pickupAirport || step.deliveryAirport || '').trim();
  const addrView = addrShort ? (addrShort.length > 120 ? (addrShort.slice(0, 120) + '...') : addrShort) : '-';

  const rows = [
    [(State.lang === 'tr') ? 'Tarih' : 'Date', step.date ? Utils.formatDate(step.date) : '-'],
    [I18n.t('time'), step.time || '-'],
    [I18n.t('office'), officeComputed],
    [I18n.t('personnel'), step.personnel || '-'],
    [I18n.t('vehicle'), step.vehicle || '-']
  ];

  if (def.fields.includes('address')) rows.push([I18n.t('address'), addrView]);
  if (def.fields.includes('estimatedVolume')) rows.push([I18n.t('estimatedVolume'), step.estimatedVolume ? `${step.estimatedVolume} cbm` : '-']);
  if (def.fields.includes('portDetails')) rows.push([I18n.t('portDetails'), step.portDetails || '-']);
  if (def.fields.includes('pickupAirport')) rows.push([I18n.t('pickupAirport'), step.pickupAirport || '-']);
  if (def.fields.includes('deliveryAirport')) rows.push([I18n.t('deliveryAirport'), step.deliveryAirport || '-']);
  if (def.fields.includes('pickupAddress')) rows.push([I18n.t('pickupAddress'), step.pickupAddress || '-']);
  if (def.fields.includes('deliveryAddress')) rows.push([I18n.t('deliveryAddress'), step.deliveryAddress || '-']);
  rows.push([I18n.t('notesLabel'), step.notes || '-']);

  rows.forEach(([label, value]) => {
    const r = $.el('div', { className: 'schedule-field-row' });
    r.appendChild($.el('span', { className: 'schedule-field-label', textContent: label }));
    r.appendChild($.el('span', { className: 'schedule-field-value', textContent: value }));
    viewBox.appendChild(r);
  });
  body.appendChild(viewBox);

  // Edit section (hidden by default)
  const editBox = $.el('div', { className: 'step-card-body hidden' });

  // Date input
  const dateDiv = $.el('div');
  const dateLabel = $.el('label', { textContent: (State.lang === 'tr') ? 'Tarih' : 'Date' });
  dateDiv.appendChild(dateLabel);
  dateDiv.appendChild(Utils.createDateInput({ value: step.date, className: 'step-date-input' }));
  editBox.appendChild(dateDiv);

  // Time selector (24-hour dropdowns)
  const timeDiv = $.el('div');
  timeDiv.appendChild($.el('label', { textContent: I18n.t('time') }));
  const timeSelector = TimeHelpers.createTimeSelector(step.time || '');
  timeSelector.classList.add('step-time-selector');
  timeDiv.appendChild(timeSelector);
  editBox.appendChild(timeDiv);

  // Personnel
  const personnelDiv = $.el('div');
  personnelDiv.appendChild($.el('label', { textContent: I18n.t('personnel') }));
  personnelDiv.appendChild($.el('input', { type: 'text', className: 'step-personnel-input', value: step.personnel || '' }));
  editBox.appendChild(personnelDiv);

  // Vehicle
  const vehicleDiv = $.el('div');
  vehicleDiv.appendChild($.el('label', { textContent: I18n.t('vehicle') }));
  vehicleDiv.appendChild($.el('input', { type: 'text', className: 'step-vehicle-input', value: step.vehicle || '' }));
  editBox.appendChild(vehicleDiv);

  // Office select
  const officeDiv = $.el('div');
  officeDiv.appendChild($.el('label', { textContent: I18n.t('office') }));
  const officeSelect = $.el('select', { className: 'step-office-select', required: true });
  officeSelect.appendChild($.el('option', { value: '', textContent: (State.lang === 'tr') ? '-- Ofis Seçin --' : '-- Select Office --' }));
  CONFIG.OFFICES.forEach(o => officeSelect.appendChild($.el('option', { value: o, textContent: o })));
  officeSelect.value = step.office || '';
  officeDiv.appendChild(officeSelect);
  editBox.appendChild(officeDiv);

  if (def.fields.includes('address')) {
    const div = $.el('div', { className: 'full-width' });
    div.appendChild($.el('label', { textContent: I18n.t('address') }));
    div.appendChild($.el('textarea', { rows: '2', className: 'step-address-input', textContent: step.address || '' }));
    editBox.appendChild(div);
  }
  if (def.fields.includes('estimatedVolume')) {
    const div = $.el('div');
    div.appendChild($.el('label', { textContent: I18n.t('estimatedVolume') + ' (cbm)' }));
    div.appendChild($.el('input', { type: 'number', step: '0.1', className: 'step-estimated-volume-input', value: step.estimatedVolume || '' }));
    editBox.appendChild(div);
  }
  if (def.fields.includes('portDetails')) {
    const div = $.el('div', { className: 'full-width' });
    div.appendChild($.el('label', { textContent: I18n.t('portDetails') }));
    div.appendChild($.el('textarea', { rows: '2', className: 'step-port-input', textContent: step.portDetails || '' }));
    editBox.appendChild(div);
  }
  if (def.fields.includes('pickupAirport')) {
    const div = $.el('div');
    div.appendChild($.el('label', { textContent: I18n.t('pickupAirport') }));
    div.appendChild($.el('input', { type: 'text', className: 'step-pickup-airport-input', value: step.pickupAirport || '' }));
    editBox.appendChild(div);
  }
  if (def.fields.includes('deliveryAirport')) {
    const div = $.el('div');
    div.appendChild($.el('label', { textContent: I18n.t('deliveryAirport') }));
    div.appendChild($.el('input', { type: 'text', className: 'step-delivery-airport-input', value: step.deliveryAirport || '' }));
    editBox.appendChild(div);
  }
  if (def.fields.includes('pickupAddress')) {
    const div = $.el('div', { className: 'full-width' });
    div.appendChild($.el('label', { textContent: I18n.t('pickupAddress') }));
    div.appendChild($.el('textarea', { rows: '2', className: 'step-pickup-address-input', textContent: step.pickupAddress || '' }));
    editBox.appendChild(div);
  }
  if (def.fields.includes('deliveryAddress')) {
    const div = $.el('div', { className: 'full-width' });
    div.appendChild($.el('label', { textContent: I18n.t('deliveryAddress') }));
    div.appendChild($.el('textarea', { rows: '2', className: 'step-delivery-address-input', textContent: step.deliveryAddress || '' }));
    editBox.appendChild(div);
  }

  const notesDiv = $.el('div', { className: 'full-width' });
  notesDiv.appendChild($.el('label', { textContent: I18n.t('notesLabel') }));
  notesDiv.appendChild($.el('textarea', { rows: '2', className: 'step-notes-input', textContent: step.notes || '' }));
  editBox.appendChild(notesDiv);

  body.appendChild(editBox);

  // Actions - spans full width in grid
  const actions = $.el('div', { className: 'step-card-actions', style: 'margin-top:12px; display:flex; justify-content:flex-end; gap:8px; flex-wrap:wrap; grid-column: 1 / -1;' });

  const editBtn = $.el('button', { type: 'button', textContent: I18n.t('edit') });
  const saveBtn = $.el('button', { type: 'button', className: 'hidden step-save-btn', textContent: I18n.t('save') });
  const cancelBtn = $.el('button', { type: 'button', className: 'hidden', textContent: I18n.t('cancel') });
  const deleteStepBtn = $.el('button', {
    type: 'button',
    className: 'delete-step-btn',
    textContent: (State.lang === 'tr') ? 'Sil' : 'Remove'
  });
  const completeBtn = $.el('button', { 
    type: 'button', 
    className: step.completed ? 'complete-btn completed' : 'complete-btn',
    textContent: step.completed ? ((State.lang === 'tr') ? '✓ Tamamlandı' : '✓ Completed') : ((State.lang === 'tr') ? 'Tamamla' : 'Mark Complete')
  });
  completeBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    step.completed = !step.completed;
    Storage.saveJobs();
    this.showDetails(job);
    ScheduleUI.render();
    if (State.schedule.selectedDate) ScheduleUI.renderDay(State.schedule.selectedDate);
    DashboardUI.render();
  });

  editBtn.addEventListener('click', () => {
    $.hide(viewBox);
    $.show(editBox);
    $.hide(editBtn);
    $.show(saveBtn);
    $.show(cancelBtn);
  });

  cancelBtn.addEventListener('click', () => {
    this.showDetails(job);
  });

  saveBtn.addEventListener('click', () => {
    const dateInput = card.querySelector('.step-date-input');
    step.date = Utils.getDateInputValue(dateInput) || '';
    const timeSelector = card.querySelector('.step-time-selector');
    step.time = TimeHelpers.getTimeFromSelector(timeSelector);
    step.personnel = card.querySelector('.step-personnel-input').value.trim();
    step.vehicle = card.querySelector('.step-vehicle-input').value.trim();
    const officeValue = card.querySelector('.step-office-select').value || '';
    if (!officeValue) {
      Modals.alert({ title: (State.lang === 'tr') ? 'Uyarı' : 'Warning', message: (State.lang === 'tr') ? 'Lütfen ofis seçin.' : 'Please select an office.' });
      return;
    }
    step.office = officeValue;

    if (def.fields.includes('address')) step.address = card.querySelector('.step-address-input').value.trim();
    if (def.fields.includes('estimatedVolume')) step.estimatedVolume = parseFloat(card.querySelector('.step-estimated-volume-input').value) || 0;
    if (def.fields.includes('portDetails')) step.portDetails = card.querySelector('.step-port-input').value.trim();
    if (def.fields.includes('pickupAirport')) step.pickupAirport = card.querySelector('.step-pickup-airport-input').value.trim();
    if (def.fields.includes('deliveryAirport')) step.deliveryAirport = card.querySelector('.step-delivery-airport-input').value.trim();
    if (def.fields.includes('pickupAddress')) step.pickupAddress = card.querySelector('.step-pickup-address-input').value.trim();
    if (def.fields.includes('deliveryAddress')) step.deliveryAddress = card.querySelector('.step-delivery-address-input').value.trim();
    step.notes = card.querySelector('.step-notes-input').value.trim();

    Storage.saveJobs();
    ScheduleUI.render();
    if (State.schedule.selectedDate) ScheduleUI.renderDay(State.schedule.selectedDate);
    DashboardUI.render();
    Modals.alert({ title: (State.lang === 'tr') ? 'Başarılı' : 'Success', message: I18n.t('stepSaved') });
    this.showDetails(job);
  });

  deleteStepBtn.addEventListener('click', async (e) => {
    e.stopPropagation();
    const confirmMsg = (State.lang === 'tr') ? 'Bu adımı silmek istediğinize emin misiniz?' : 'Are you sure you want to remove this step?';
    const confirmed = await Modals.confirm({ 
      title: (State.lang === 'tr') ? 'Adımı Sil' : 'Delete Step',
      message: confirmMsg,
      danger: true,
      confirmText: (State.lang === 'tr') ? 'Sil' : 'Delete'
    });
    if (!confirmed) return;
    job.steps.splice(idx, 1);
    Storage.saveJobs();
    this.showDetails(job);
    ScheduleUI.render();
    if (State.schedule.selectedDate) ScheduleUI.renderDay(State.schedule.selectedDate);
    DashboardUI.render();
  });

  actions.appendChild(completeBtn);
  actions.appendChild(editBtn);
  actions.appendChild(saveBtn);
  actions.appendChild(cancelBtn);
  actions.appendChild(deleteStepBtn);  // Always show delete button for all steps
  body.appendChild(actions);

  card.appendChild(body);

  // Toggle collapse on header click
  header.addEventListener('click', () => {
    const isExpanded = !body.classList.contains('hidden');
    if (isExpanded) {
      body.classList.add('hidden');
      header.classList.remove('expanded');
      arrow.classList.remove('expanded');
    } else {
      body.classList.remove('hidden');
      header.classList.add('expanded');
      arrow.classList.add('expanded');
    }
  });

  return card;
},
  
  // Collapsible linked extra job card
linkedExtraJobCollapsible(job, item) {
  const { dateStr, ej } = item;
  const card = $.el('div', { className: 'step-card-collapsible' });

  const taskName = (ej.taskType === 'Custom' && ej.customTaskName)
    ? ej.customTaskName
    : I18n.taskTypeText(ej.taskType || '');

  // Collapse Header
  const header = $.el('div', { className: 'step-card-collapse-header' });
  
  const headerLeft = $.el('div', { className: 'step-card-header-left' });
  
  // Status indicator - based on explicit completed flag
  let ejStatus = 'pending';
  if (ej.completed) {
    ejStatus = 'completed';
  } else if (ej.date || dateStr || ej.time) {
    ejStatus = 'scheduled';
  }
  const statusIndicator = $.el('div', { className: `step-status-indicator ${ejStatus}` });
  statusIndicator.textContent = ejStatus === 'completed' ? '✓' : (ejStatus === 'scheduled' ? '•' : '○');
  headerLeft.appendChild(statusIndicator);
  
  const titleGroup = $.el('div');
  titleGroup.appendChild($.el('div', { className: 'step-card-title', textContent: taskName || I18n.t('additionalJob') }));
  
  const subtitle = $.el('div', { className: 'step-card-subtitle' });
  subtitle.appendChild($.el('span', { textContent: Utils.formatDate(dateStr) }));
  if (ej.time) {
    subtitle.appendChild($.el('span', { textContent: ej.time }));
  }
  titleGroup.appendChild(subtitle);
  headerLeft.appendChild(titleGroup);
  
  header.appendChild(headerLeft);
  
  const arrow = $.el('span', { className: 'step-card-arrow', textContent: '▼' });
  header.appendChild(arrow);
  
  card.appendChild(header);

  // Collapse Body
  const body = $.el('div', { className: 'step-card-collapse-body hidden' });

  // View section
  const viewBox = $.el('div', { className: 'schedule-step-fields-view' });
  const office = ej.office || '-';
  const addr = (ej.address || '').trim();
  const addrView = addr ? (addr.length > 120 ? (addr.slice(0, 120) + '...') : addr) : '-';

  const vRows = [
    [(State.lang === 'tr') ? 'Tarih' : 'Date', Utils.formatDate(dateStr)],
    [I18n.t('time'), ej.time || '-'],
    [I18n.t('office'), office],
    [I18n.t('personnel'), ej.personnel || '-'],
    [I18n.t('vehicle'), ej.vehicle || '-'],
    [I18n.t('address'), addrView],
    [I18n.t('notesLabel'), ej.notes || '-']
  ];

  vRows.forEach(([label, value]) => {
    const r = $.el('div', { className: 'schedule-field-row' });
    r.appendChild($.el('span', { className: 'schedule-field-label', textContent: label }));
    r.appendChild($.el('span', { className: 'schedule-field-value', textContent: value }));
    viewBox.appendChild(r);
  });

  body.appendChild(viewBox);

  // Edit section
  const editBox = $.el('div', { className: 'step-card-body hidden' });

  const dateDiv = $.el('div');
  dateDiv.appendChild($.el('label', { textContent: (State.lang === 'tr') ? 'Tarih' : 'Date' }));
  dateDiv.appendChild($.el('input', { type: 'text', value: Utils.formatDate(dateStr), disabled: true }));
  editBox.appendChild(dateDiv);

  const timeDiv = $.el('div');
  timeDiv.appendChild($.el('label', { textContent: I18n.t('time') }));
  const timeSelector = TimeHelpers.createTimeSelector(ej.time || '');
  timeSelector.classList.add('lej-time-selector');
  timeDiv.appendChild(timeSelector);
  editBox.appendChild(timeDiv);

  const officeDiv = $.el('div');
  officeDiv.appendChild($.el('label', { textContent: I18n.t('office') }));
  const officeSelect = $.el('select', { className: 'lej-office' });
  officeSelect.appendChild($.el('option', { value: '', textContent: (State.lang === 'tr') ? '-- Ofis Seçin --' : '-- Select Office --' }));
  CONFIG.OFFICES.forEach(o => officeSelect.appendChild($.el('option', { value: o, textContent: o })));
  officeSelect.value = ej.office || '';
  officeDiv.appendChild(officeSelect);
  editBox.appendChild(officeDiv);

  const pDiv = $.el('div');
  pDiv.appendChild($.el('label', { textContent: I18n.t('personnel') }));
  pDiv.appendChild($.el('input', { type: 'text', className: 'lej-personnel', value: ej.personnel || '' }));
  editBox.appendChild(pDiv);

  const vDiv = $.el('div');
  vDiv.appendChild($.el('label', { textContent: I18n.t('vehicle') }));
  vDiv.appendChild($.el('input', { type: 'text', className: 'lej-vehicle', value: ej.vehicle || '' }));
  editBox.appendChild(vDiv);

  const aDiv = $.el('div', { className: 'full-width' });
  aDiv.appendChild($.el('label', { textContent: I18n.t('address') }));
  aDiv.appendChild($.el('textarea', { rows: '2', className: 'lej-address', textContent: ej.address || '' }));
  editBox.appendChild(aDiv);

  const nDiv = $.el('div', { className: 'full-width' });
  nDiv.appendChild($.el('label', { textContent: I18n.t('notesLabel') }));
  nDiv.appendChild($.el('textarea', { rows: '2', className: 'lej-notes', textContent: ej.notes || '' }));
  editBox.appendChild(nDiv);

  body.appendChild(editBox);

  const actions = $.el('div', { style: 'margin-top:12px; display:flex; justify-content:flex-end; gap:8px; flex-wrap:wrap;' });

  const editBtn = $.el('button', { type: 'button', textContent: I18n.t('edit') });
  const saveBtn = $.el('button', { type: 'button', className: 'hidden', textContent: I18n.t('save') });
  const cancelBtn = $.el('button', { type: 'button', className: 'hidden', textContent: I18n.t('cancel') });
  const deleteBtn = $.el('button', { type: 'button', textContent: I18n.t('delete') });
  const completeBtn = $.el('button', { 
    type: 'button', 
    className: ej.completed ? 'complete-btn completed' : 'complete-btn',
    textContent: ej.completed ? ((State.lang === 'tr') ? '✓ Tamamlandı' : '✓ Completed') : ((State.lang === 'tr') ? 'Tamamla' : 'Mark Complete')
  });
  completeBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    ej.completed = !ej.completed;
    Storage.saveScheduleExtraJobs();
    ScheduleUI.render();
    if (State.schedule.selectedDate) ScheduleUI.renderDay(State.schedule.selectedDate);
    const current = State.getJob(State.selectedJobId);
    if (current) this.showDetails(current);
  });

  editBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    $.hide(viewBox);
    $.show(editBox);
    $.hide(editBtn);
    $.show(saveBtn);
    $.show(cancelBtn);
  });

  cancelBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    this.showDetails(job);
  });

  saveBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const timeSelector = card.querySelector('.lej-time-selector');
    ej.time = TimeHelpers.getTimeFromSelector(timeSelector);
    ej.office = card.querySelector('.lej-office').value || '';
    ej.personnel = card.querySelector('.lej-personnel').value.trim();
    ej.vehicle = card.querySelector('.lej-vehicle').value.trim();
    ej.address = card.querySelector('.lej-address').value.trim();
    ej.notes = card.querySelector('.lej-notes').value.trim();

    Storage.saveScheduleExtraJobs();
    ScheduleUI.render();
    if (State.schedule.selectedDate) ScheduleUI.renderDay(State.schedule.selectedDate);
    const current = State.getJob(State.selectedJobId);
    if (current) this.showDetails(current);
  });

  deleteBtn.addEventListener('click', async (e) => {
    e.stopPropagation();
    const confirmed = await Modals.confirm({
      title: (State.lang === 'tr') ? 'Ek İşi Sil' : 'Delete Additional Job',
      message: I18n.t('deleteExtraJobConfirm'),
      danger: true,
      confirmText: (State.lang === 'tr') ? 'Sil' : 'Delete'
    });
    if (!confirmed) return;
    ScheduleExtraJobs.deleteById(dateStr, ej.id);
    Storage.saveScheduleExtraJobs();
    ScheduleUI.render();
    if (State.schedule.selectedDate) ScheduleUI.renderDay(State.schedule.selectedDate);
    const current = State.getJob(State.selectedJobId);
    if (current) this.showDetails(current);
  });

  actions.appendChild(completeBtn);
  actions.appendChild(editBtn);
  actions.appendChild(saveBtn);
  actions.appendChild(cancelBtn);
  actions.appendChild(deleteBtn);
  body.appendChild(actions);

  card.appendChild(body);

  // Toggle collapse
  header.addEventListener('click', () => {
    const isExpanded = !body.classList.contains('hidden');
    if (isExpanded) {
      body.classList.add('hidden');
      header.classList.remove('expanded');
      arrow.classList.remove('expanded');
    } else {
      body.classList.remove('hidden');
      header.classList.add('expanded');
      arrow.classList.add('expanded');
    }
  });

  return card;
},
  
  // Compact step card: view mode + edit mode
  stepCard(step, idx, job) {
    const def = CONFIG.STEP_DEFINITIONS[step.id] || { fields: [] };
    const card = $.el('div', { className: 'step-card' });

    const header = $.el('div', { className: 'step-card-header' });
    header.appendChild($.el('div', { className: 'step-card-header-title', textContent: I18n.stepText(step) }));
    header.appendChild($.el('div', { innerHTML: `#${idx + 1}`, style: 'font-size: 11px; color:#6b7280;' }));
    card.appendChild(header);

    // ---- compact view box ----
    const viewBox = $.el('div', { className: 'schedule-step-fields-view' });

    const officeComputed = step.office || '-';
    const addrShort = (step.address || step.portDetails || step.pickupAddress || step.deliveryAddress || step.pickupAirport || step.deliveryAirport || '').trim();
    const addrView = addrShort ? (addrShort.length > 120 ? (addrShort.slice(0, 120) + '…') : addrShort) : '-';

    const rows = [
      [(State.lang === 'tr') ? 'Tarih' : 'Date', step.date ? Utils.formatDate(step.date) : '-'],
      [I18n.t('time'), step.time || '-'],
      [I18n.t('office'), officeComputed],
      [I18n.t('personnel'), step.personnel || '-'],
      [I18n.t('vehicle'), step.vehicle || '-']
    ];

    if (def.fields.includes('address')) rows.push([I18n.t('address'), addrView]);
    if (def.fields.includes('portDetails')) rows.push([I18n.t('portDetails'), step.portDetails || '-']);
    if (def.fields.includes('pickupAirport')) rows.push([I18n.t('pickupAirport'), step.pickupAirport || '-']);
    if (def.fields.includes('deliveryAirport')) rows.push([I18n.t('deliveryAirport'), step.deliveryAirport || '-']);
    if (def.fields.includes('pickupAddress')) rows.push([I18n.t('pickupAddress'), step.pickupAddress || '-']);
    if (def.fields.includes('deliveryAddress')) rows.push([I18n.t('deliveryAddress'), step.deliveryAddress || '-']);
    rows.push([I18n.t('notesLabel'), step.notes || '-']);

    rows.forEach(([label, value]) => {
      const r = $.el('div', { className: 'schedule-field-row' });
      r.appendChild($.el('span', { className: 'schedule-field-label', textContent: label }));
      r.appendChild($.el('span', { className: 'schedule-field-value', textContent: value }));
      viewBox.appendChild(r);
    });
    card.appendChild(viewBox);

    // ---- full edit body (hidden by default) ----
    const body = $.el('div', { className: 'step-card-body hidden' });

    const baseFields = [
      [(State.lang === 'tr') ? 'Tarih' : 'Date', 'date', 'date'],
      [I18n.t('time'), 'time', 'time'],
      [I18n.t('personnel'), 'personnel', 'text'],
      [I18n.t('vehicle'), 'vehicle', 'text']
    ];

    baseFields.forEach(([label, field, type]) => {
      const div = $.el('div');
      div.appendChild($.el('label', { textContent: label }));
      div.appendChild($.el('input', { type, className: `step-${field}-input`, value: step[field] || '' }));
      body.appendChild(div);
    });

    // Office select
    const officeDiv = $.el('div');
    officeDiv.appendChild($.el('label', { textContent: I18n.t('office') }));
    const officeSelect = $.el('select', { className: 'step-office-select' });
    officeSelect.appendChild($.el('option', { value: '', textContent: (State.lang === 'tr') ? '-- Ofis Seçin --' : '-- Select Office --' }));
    CONFIG.OFFICES.forEach(o => officeSelect.appendChild($.el('option', { value: o, textContent: o })));
    officeSelect.value = step.office || '';
    officeDiv.appendChild(officeSelect);
    body.appendChild(officeDiv);

    if (def.fields.includes('address')) {
      const div = $.el('div', { className: 'full-width' });
      div.appendChild($.el('label', { textContent: I18n.t('address') }));
      div.appendChild($.el('textarea', { rows: '2', className: 'step-address-input', textContent: step.address || '' }));
      body.appendChild(div);
    }
    if (def.fields.includes('portDetails')) {
      const div = $.el('div', { className: 'full-width' });
      div.appendChild($.el('label', { textContent: I18n.t('portDetails') }));
      div.appendChild($.el('textarea', { rows: '2', className: 'step-port-input', textContent: step.portDetails || '' }));
      body.appendChild(div);
    }
    if (def.fields.includes('pickupAirport')) {
      const div = $.el('div');
      div.appendChild($.el('label', { textContent: I18n.t('pickupAirport') }));
      div.appendChild($.el('input', { type: 'text', className: 'step-pickup-airport-input', value: step.pickupAirport || '' }));
      body.appendChild(div);
    }
    if (def.fields.includes('deliveryAirport')) {
      const div = $.el('div');
      div.appendChild($.el('label', { textContent: I18n.t('deliveryAirport') }));
      div.appendChild($.el('input', { type: 'text', className: 'step-delivery-airport-input', value: step.deliveryAirport || '' }));
      body.appendChild(div);
    }
    if (def.fields.includes('pickupAddress')) {
      const div = $.el('div', { className: 'full-width' });
      div.appendChild($.el('label', { textContent: I18n.t('pickupAddress') }));
      div.appendChild($.el('textarea', { rows: '2', className: 'step-pickup-address-input', textContent: step.pickupAddress || '' }));
      body.appendChild(div);
    }
    if (def.fields.includes('deliveryAddress')) {
      const div = $.el('div', { className: 'full-width' });
      div.appendChild($.el('label', { textContent: I18n.t('deliveryAddress') }));
      div.appendChild($.el('textarea', { rows: '2', className: 'step-delivery-address-input', textContent: step.deliveryAddress || '' }));
      body.appendChild(div);
    }

    const notesDiv = $.el('div', { className: 'full-width' });
    notesDiv.appendChild($.el('label', { textContent: I18n.t('notesLabel') }));
    notesDiv.appendChild($.el('textarea', { rows: '2', className: 'step-notes-input', textContent: step.notes || '' }));
    body.appendChild(notesDiv);

    card.appendChild(body);

    // ---- actions ----
    const actions = $.el('div', { style: 'margin-top:6px; display:flex; justify-content:flex-end; gap:8px; flex-wrap:wrap;' });

    const editBtn = $.el('button', { type: 'button', textContent: I18n.t('edit') });
    const saveBtn = $.el('button', { type: 'button', className: 'hidden step-save-btn', textContent: I18n.t('save') });
    const cancelBtn = $.el('button', { type: 'button', className: 'hidden', textContent: I18n.t('cancel') });

    editBtn.addEventListener('click', () => {
      $.hide(viewBox);
      $.show(body);
      $.hide(editBtn);
      $.show(saveBtn);
      $.show(cancelBtn);
    });

    cancelBtn.addEventListener('click', () => {
      // easiest and safest: re-render details to reset edits
      this.showDetails(job);
    });

    saveBtn.addEventListener('click', () => {
      const dateInput = card.querySelector('.step-date-input');
      step.date = Utils.getDateInputValue(dateInput) || '';
      step.time = card.querySelector('.step-time-input').value || '';
      step.personnel = card.querySelector('.step-personnel-input').value.trim();
      step.vehicle = card.querySelector('.step-vehicle-input').value.trim();
      const officeValue = card.querySelector('.step-office-select').value || '';
      if (!officeValue) {
        Modals.alert({ title: (State.lang === 'tr') ? 'Uyarı' : 'Warning', message: (State.lang === 'tr') ? 'Lütfen ofis seçin.' : 'Please select an office.' });
        return;
      }
      step.office = officeValue;

      if (def.fields.includes('address')) step.address = card.querySelector('.step-address-input').value.trim();
      if (def.fields.includes('portDetails')) step.portDetails = card.querySelector('.step-port-input').value.trim();
      if (def.fields.includes('pickupAirport')) step.pickupAirport = card.querySelector('.step-pickup-airport-input').value.trim();
      if (def.fields.includes('deliveryAirport')) step.deliveryAirport = card.querySelector('.step-delivery-airport-input').value.trim();
      if (def.fields.includes('pickupAddress')) step.pickupAddress = card.querySelector('.step-pickup-address-input').value.trim();
      if (def.fields.includes('deliveryAddress')) step.deliveryAddress = card.querySelector('.step-delivery-address-input').value.trim();
      step.notes = card.querySelector('.step-notes-input').value.trim();

      Storage.saveJobs();
      ScheduleUI.render();
      if (State.schedule.selectedDate) ScheduleUI.renderDay(State.schedule.selectedDate);
      Modals.alert({ title: (State.lang === 'tr') ? 'Başarılı' : 'Success', message: I18n.t('stepSaved') });
      this.showDetails(job);
    });

    // Completion toggle button
  const completeBtn = $.el('button', { 
    type: 'button', 
    className: step.completed ? 'complete-btn completed' : 'complete-btn',
    textContent: step.completed ? ((State.lang === 'tr') ? '✓ Tamamlandı' : '✓ Completed') : ((State.lang === 'tr') ? 'Tamamla' : 'Mark Complete')
  });
  completeBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    step.completed = !step.completed;
    Storage.saveJobs();
    this.showDetails(job);
    ScheduleUI.render();
    if (State.schedule.selectedDate) ScheduleUI.renderDay(State.schedule.selectedDate);
    DashboardUI.render();
  });

  // Delete step button
  const deleteStepBtn = $.el('button', { 
    type: 'button', 
    className: 'delete-step-btn',
    textContent: (State.lang === 'tr') ? 'Sil' : 'Remove'
  });
  deleteStepBtn.addEventListener('click', async (e) => {
    e.stopPropagation();
    const confirmMsg = (State.lang === 'tr') ? 'Bu adımı silmek istediğinize emin misiniz?' : 'Are you sure you want to remove this step?';
    const confirmed = await Modals.confirm({
      title: (State.lang === 'tr') ? 'Adımı Sil' : 'Delete Step',
      message: confirmMsg,
      danger: true,
      confirmText: (State.lang === 'tr') ? 'Sil' : 'Delete'
    });
    if (!confirmed) return;
    job.steps.splice(idx, 1);
    Storage.saveJobs();
    this.showDetails(job);
    ScheduleUI.render();
    if (State.schedule.selectedDate) ScheduleUI.renderDay(State.schedule.selectedDate);
    DashboardUI.render();
  });

  actions.appendChild(completeBtn);
  actions.appendChild(editBtn);
  actions.appendChild(saveBtn);
  actions.appendChild(cancelBtn);
  actions.appendChild(deleteStepBtn);
  body.appendChild(actions);
    return card;
  },

  // Linked extra job shown as a step card in move details (compact + edit)
  linkedExtraJobAsStepCard(job, item) {
    const { dateStr, ej } = item;
    const card = $.el('div', { className: 'step-card' });

    const header = $.el('div', { className: 'step-card-header' });
    const taskName = (ej.taskType === 'Custom' && ej.customTaskName)
      ? ej.customTaskName
      : I18n.taskTypeText(ej.taskType || '');

    header.appendChild($.el('div', { className: 'step-card-header-title', textContent: taskName || I18n.t('additionalJob') }));
    header.appendChild($.el('div', { innerHTML: Utils.formatDate(dateStr), style: 'font-size: 11px; color:#6b7280;' }));
    card.appendChild(header);

    // view
    const viewBox = $.el('div', { className: 'schedule-step-fields-view' });
    const office = ej.office || '-';
    const addr = (ej.address || '').trim();
    const addrView = addr ? (addr.length > 120 ? (addr.slice(0, 120) + '…') : addr) : '-';

    const vRows = [
      [(State.lang === 'tr') ? 'Tarih' : 'Date', Utils.formatDate(dateStr)],
      [I18n.t('time'), ej.time || '-'],
      [I18n.t('office'), office],
      [I18n.t('personnel'), ej.personnel || '-'],
      [I18n.t('vehicle'), ej.vehicle || '-'],
      [I18n.t('address'), addrView],
      [I18n.t('notesLabel'), ej.notes || '-']
    ];

    vRows.forEach(([label, value]) => {
      const r = $.el('div', { className: 'schedule-field-row' });
      r.appendChild($.el('span', { className: 'schedule-field-label', textContent: label }));
      r.appendChild($.el('span', { className: 'schedule-field-value', textContent: value }));
      viewBox.appendChild(r);
    });

    card.appendChild(viewBox);

    // edit
    const body = $.el('div', { className: 'step-card-body hidden' });

    const dateDiv = $.el('div');
    dateDiv.appendChild($.el('label', { textContent: (State.lang === 'tr') ? 'Tarih' : 'Date' }));
    dateDiv.appendChild($.el('input', { type: 'text', value: Utils.formatDate(dateStr), disabled: true }));
    body.appendChild(dateDiv);

    const timeDiv = $.el('div');
    timeDiv.appendChild($.el('label', { textContent: I18n.t('time') }));
    timeDiv.appendChild($.el('input', { type: 'time', className: 'lej-time', value: ej.time || '' }));
    body.appendChild(timeDiv);

    // Office
    const officeDiv = $.el('div');
    officeDiv.appendChild($.el('label', { textContent: I18n.t('office') }));
    const officeSelect = $.el('select', { className: 'lej-office' });
    officeSelect.appendChild($.el('option', { value: '', textContent: (State.lang === 'tr') ? '-- Ofis Seçin --' : '-- Select Office --' }));
    CONFIG.OFFICES.forEach(o => officeSelect.appendChild($.el('option', { value: o, textContent: o })));
    officeSelect.value = ej.office || '';
    officeDiv.appendChild(officeSelect);
    body.appendChild(officeDiv);

    // Personnel / Vehicle
    const pDiv = $.el('div');
    pDiv.appendChild($.el('label', { textContent: I18n.t('personnel') }));
    pDiv.appendChild($.el('input', { type: 'text', className: 'lej-personnel', value: ej.personnel || '' }));
    body.appendChild(pDiv);

    const vDiv = $.el('div');
    vDiv.appendChild($.el('label', { textContent: I18n.t('vehicle') }));
    vDiv.appendChild($.el('input', { type: 'text', className: 'lej-vehicle', value: ej.vehicle || '' }));
    body.appendChild(vDiv);

    // Address
    const aDiv = $.el('div', { className: 'full-width' });
    aDiv.appendChild($.el('label', { textContent: I18n.t('address') }));
    aDiv.appendChild($.el('textarea', { rows: '2', className: 'lej-address', textContent: ej.address || '' }));
    body.appendChild(aDiv);

    // Notes
    const nDiv = $.el('div', { className: 'full-width' });
    nDiv.appendChild($.el('label', { textContent: I18n.t('notesLabel') }));
    nDiv.appendChild($.el('textarea', { rows: '2', className: 'lej-notes', textContent: ej.notes || '' }));
    body.appendChild(nDiv);

    card.appendChild(body);

    const actions = $.el('div', { style: 'margin-top:6px; display:flex; justify-content:flex-end; gap:8px; flex-wrap:wrap;' });

    const editBtn = $.el('button', { type: 'button', textContent: I18n.t('edit') });
    const saveBtn = $.el('button', { type: 'button', className: 'hidden', textContent: I18n.t('save') });
    const cancelBtn = $.el('button', { type: 'button', className: 'hidden', textContent: I18n.t('cancel') });
    const deleteBtn = $.el('button', { type: 'button', textContent: I18n.t('delete') });

    editBtn.addEventListener('click', () => {
      $.hide(viewBox);
      $.show(body);
      $.hide(editBtn);
      $.show(saveBtn);
      $.show(cancelBtn);
    });

    cancelBtn.addEventListener('click', () => this.showDetails(job));

    saveBtn.addEventListener('click', () => {
      ej.time = card.querySelector('.lej-time').value || '';
      ej.office = card.querySelector('.lej-office').value || '';
      ej.personnel = card.querySelector('.lej-personnel').value.trim();
      ej.vehicle = card.querySelector('.lej-vehicle').value.trim();
      ej.address = card.querySelector('.lej-address').value.trim();
      ej.notes = card.querySelector('.lej-notes').value.trim();

      Storage.saveScheduleExtraJobs();
      ScheduleUI.render();
      if (State.schedule.selectedDate) ScheduleUI.renderDay(State.schedule.selectedDate);
      const current = State.getJob(State.selectedJobId);
      if (current) this.showDetails(current);
    });

    deleteBtn.addEventListener('click', async (e) => {
    e.stopPropagation();
    const confirmed = await Modals.confirm({
      title: (State.lang === 'tr') ? 'Ek İşi Sil' : 'Delete Additional Job',
      message: I18n.t('deleteExtraJobConfirm'),
      danger: true,
      confirmText: (State.lang === 'tr') ? 'Sil' : 'Delete'
    });
    if (!confirmed) return;
    ScheduleExtraJobs.deleteById(dateStr, ej.id);
    Storage.saveScheduleExtraJobs();
    ScheduleUI.render();
    if (State.schedule.selectedDate) ScheduleUI.renderDay(State.schedule.selectedDate);
    const current = State.getJob(State.selectedJobId);
    if (current) this.showDetails(current);
  });

  // Completion toggle button
  const completeBtn = $.el('button', { 
    type: 'button', 
    className: ej.completed ? 'complete-btn completed' : 'complete-btn',
    textContent: ej.completed ? ((State.lang === 'tr') ? '✓ Tamamlandı' : '✓ Completed') : ((State.lang === 'tr') ? 'Tamamla' : 'Mark Complete')
  });
  completeBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    ej.completed = !ej.completed;
    Storage.saveScheduleExtraJobs();
    ScheduleUI.render();
    if (State.schedule.selectedDate) ScheduleUI.renderDay(State.schedule.selectedDate);
    const current = State.getJob(State.selectedJobId);
    if (current) this.showDetails(current);
  });

  actions.appendChild(completeBtn);
  actions.appendChild(editBtn);
  actions.appendChild(saveBtn);
  actions.appendChild(cancelBtn);
  actions.appendChild(deleteBtn);
  body.appendChild(actions);

    return card;
  },

  // Inline add additional job form (toggleable). No separate title/section.
  addAdditionalJobForm(job) {
    const wrap = $.el('div', { style: 'margin-top:10px; padding-top:10px; border-top: 1px dashed #e5e7eb;' });

    const form = $.el('div', { className: 'schedule-extra-form' });

    // Date
    const dateDiv = $.el('div');
    const dateLabel = $.el('label', { textContent: (State.lang === 'tr') ? 'Tarih' : 'Date' });
    dateDiv.appendChild(dateLabel);
    const dateInput = Utils.createDateInput({ id: 'moveAddJobDate' });
    dateDiv.appendChild(dateInput);
    form.appendChild(dateDiv);

    // Time
    const timeDiv = $.el('div');
    timeDiv.appendChild($.el('label', { textContent: I18n.t('time') }));
    const timeInput = $.el('input', { type: 'time', id: 'moveAddJobTime' });
    timeDiv.appendChild(timeInput);
    form.appendChild(timeDiv);

    // Task type
    const taskDiv = $.el('div');
    taskDiv.appendChild($.el('label', { textContent: I18n.t('task') }));
    const taskSelect = $.el('select', { id: 'moveAddJobType' });
    CONFIG.EXTRA_JOB_TYPES.forEach(type => {
      taskSelect.appendChild($.el('option', { value: type, textContent: I18n.taskTypeText(type) }));
    });
    taskDiv.appendChild(taskSelect);
    form.appendChild(taskDiv);

    // Custom name (shown only when Custom)
    const customDiv = $.el('div');
    customDiv.appendChild($.el('label', { textContent: I18n.t('customTaskName') }));
    const customInput = $.el('input', { type: 'text', id: 'moveAddJobCustomName', placeholder: (State.lang === 'tr') ? 'Örn. Depo temizlik' : 'e.g. Warehouse cleaning' });
    customDiv.appendChild(customInput);
    form.appendChild(customDiv);

    const toggleCustom = () => {
      customDiv.style.display = (taskSelect.value === 'Custom') ? '' : 'none';
      if (taskSelect.value !== 'Custom') customInput.value = '';
    };
    taskSelect.addEventListener('change', toggleCustom);
    toggleCustom();

    // Office
    const officeDiv = $.el('div');
    officeDiv.appendChild($.el('label', { textContent: I18n.t('office') }));
    const officeSelect = $.el('select', { id: 'moveAddJobOffice' });
    officeSelect.appendChild($.el('option', { value: '', textContent: (State.lang === 'tr') ? '-- Ofis Seçin --' : '-- Select Office --' }));
    CONFIG.OFFICES.forEach(o => officeSelect.appendChild($.el('option', { value: o, textContent: o })));
    officeDiv.appendChild(officeSelect);
    form.appendChild(officeDiv);

    // Personnel
    const pDiv = $.el('div');
    pDiv.appendChild($.el('label', { textContent: I18n.t('personnel') }));
    const pInput = $.el('input', { type: 'text', id: 'moveAddJobPersonnel' });
    pDiv.appendChild(pInput);
    form.appendChild(pDiv);

    // Vehicle
    const vDiv = $.el('div');
    vDiv.appendChild($.el('label', { textContent: I18n.t('vehicle') }));
    const vInput = $.el('input', { type: 'text', id: 'moveAddJobVehicle' });
    vDiv.appendChild(vInput);
    form.appendChild(vDiv);

    // Address
    const aDiv = $.el('div');
    aDiv.appendChild($.el('label', { textContent: I18n.t('address') }));
    const aInput = $.el('textarea', { id: 'moveAddJobAddress', rows: '2' });
    aDiv.appendChild(aInput);
    form.appendChild(aDiv);

    // Notes
    const nDiv = $.el('div');
    nDiv.appendChild($.el('label', { textContent: I18n.t('notesLabel') }));
    const nInput = $.el('textarea', { id: 'moveAddJobNotes', rows: '2' });
    nDiv.appendChild(nInput);
    form.appendChild(nDiv);

    // Actions
    const actionsDiv = $.el('div', { className: 'schedule-extra-actions' });
    const addBtn = $.el('button', { type: 'button', textContent: I18n.t('addJob') });
    const cancelBtn = $.el('button', { type: 'button', textContent: I18n.t('cancel') });

    addBtn.addEventListener('click', () => {
      const dateStr = Utils.getDateInputValue(dateInput) || '';
      const taskType = taskSelect.value || '';
      const customTaskName = customInput.value.trim();
      const time = timeInput.value || '';
      const personnel = pInput.value.trim();
      const vehicle = vInput.value.trim();
      const address = aInput.value.trim();
      const notes = nInput.value.trim();
      const office = officeSelect.value || '';

      if (!dateStr) {
        Modals.alert({ title: (State.lang === 'tr') ? 'Uyarı' : 'Warning', message: (State.lang === 'tr') ? 'Lütfen tarih seçin.' : 'Please select a date.' });
        return;
      }

      if (!taskType && !customTaskName && !time && !personnel && !vehicle && !address && !notes && !office) {
        Modals.alert({ title: (State.lang === 'tr') ? 'Uyarı' : 'Warning', message: I18n.t('fillAtLeastOneField') });
        return;
      }

      if (!Array.isArray(State.scheduleExtraJobs[dateStr])) State.scheduleExtraJobs[dateStr] = [];

      State.scheduleExtraJobs[dateStr].push(Validator.normalizeExtraJob({
        id: Utils.makeId('xjob'),
        date: dateStr,
        taskType,
        customTaskName,
        time,
        address,
        office,
        personnel,
        vehicle,
        notes,
        linkedJobId: String(job.id),
        linkedJobCode: job.jobCode || '',
        linkedJobClientName: job.clientName || ''
      }, dateStr));

      Storage.saveScheduleExtraJobs();
      ScheduleUI.render();
      if (State.schedule.selectedDate) ScheduleUI.renderDay(State.schedule.selectedDate);

      // reset + hide form
      timeInput.value = '';
      pInput.value = '';
      vInput.value = '';
      aInput.value = '';
      nInput.value = '';
      officeSelect.value = '';
      taskSelect.value = 'Custom';
      toggleCustom();

      wrap.classList.add('hidden');
      this.showDetails(job);
    });

    cancelBtn.addEventListener('click', () => {
      wrap.classList.add('hidden');
    });

    actionsDiv.appendChild(addBtn);
    actionsDiv.appendChild(cancelBtn);
    form.appendChild(actionsDiv);

    wrap.appendChild(form);
    return wrap;
  },

  renderAgents(job) {
    const container = $.get('agentDetails');
    $.clear(container);
    const oAgent = State.getAgent(job.originAgentId);
    const dAgent = State.getAgent(job.destinationAgentId);
    if (!oAgent && !dAgent) {
      container.appendChild($.el('p', { textContent: I18n.t('noAgentsLinkedToMove') }));
      return;
    }
    [oAgent, dAgent]
      .filter(Boolean)
      .forEach(agent => {
        const card = $.el('div', {
          className: 'agent-card clickable-agent',
          'data-agent-id': agent.id
        });
        card.appendChild($.el('h3', { textContent: agent.name }));
        card.appendChild($.el('p', {
          textContent: agent === oAgent ? I18n.t('originAgentRole') : I18n.t('destinationAgentRole')
        }));
        card.appendChild($.el('p', {
          textContent: `${agent.city}, ${agent.country}`
        }));
        card.addEventListener('click', () => {
          Views.show('agents');
          AgentsUI.render();
          AgentsUI.showDetails(agent);
        });
        container.appendChild(card);
      });
  }
};

const ChecklistUI = {
  render(job) {
    const container = $.get('checklistItems');
    $.clear(container);
    const items = job.checklist || [];
    
    if (items.length === 0) {
      container.appendChild($.el('p', { textContent: I18n.t('noChecklistYet') }));
      return;
    }

    // Progress bar
    const completedCount = items.filter(i => i.done).length;
    const progressBar = $.el('div', { className: 'steps-progress-bar' });
    items.forEach((item) => {
      const segment = $.el('div', { className: 'steps-progress-segment' });
      if (item.done) segment.classList.add('completed');
      progressBar.appendChild(segment);
    });
    const progressText = $.el('span', { 
      className: 'steps-progress-text',
      textContent: `${completedCount}/${items.length} ` + ((State.lang === 'tr') ? 'tamamlandı' : 'completed')
    });
    progressBar.appendChild(progressText);
    container.appendChild(progressBar);

    // Checklist items styled like step cards
    const listContainer = $.el('div', { className: 'checklist-items-list' });
    items.forEach((item, idx) => {
      const card = $.el('div', { className: 'step-card-collapsible' });

      const header = $.el('div', { className: 'step-card-collapse-header' });
      const headerLeft = $.el('div', { className: 'step-card-header-left' });

      const status = item.done ? 'completed' : 'pending';
      const statusIndicator = $.el('div', { className: `step-status-indicator ${status}` });
      statusIndicator.textContent = item.done ? '✓' : '○';
      headerLeft.appendChild(statusIndicator);

      const titleGroup = $.el('div');
      titleGroup.appendChild($.el('div', {
        className: 'step-card-title',
        textContent: I18n.checklistText(item.text)
      }));
      headerLeft.appendChild(titleGroup);
      header.appendChild(headerLeft);

      const arrow = $.el('span', { className: 'step-card-arrow', textContent: '▼' });
      header.appendChild(arrow);
      card.appendChild(header);

      const body = $.el('div', { className: 'step-card-collapse-body hidden' });
      const actions = $.el('div', { className: 'schedule-step-actions' });

      const completeBtn = $.el('button', { 
        type: 'button', 
        className: item.done ? 'complete-btn completed' : 'complete-btn',
        textContent: item.done ? ((State.lang === 'tr') ? '✓ Tamamlandı' : '✓ Completed') : ((State.lang === 'tr') ? 'Tamamla' : 'Mark Complete')
      });
      completeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        job.checklist[idx].done = !job.checklist[idx].done;
        Storage.saveJobs();
        this.render(job);
      });

      const deleteBtn = $.el('button', { 
        type: 'button', 
        className: 'delete-step-btn',
        textContent: I18n.t('delete')
      });
      deleteBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        job.checklist.splice(idx, 1);
        Storage.saveJobs();
        this.render(job);
      });

      actions.appendChild(completeBtn);
      actions.appendChild(deleteBtn);
      body.appendChild(actions);
      card.appendChild(body);

      header.addEventListener('click', () => {
        const isExpanded = !body.classList.contains('hidden');
        if (isExpanded) {
          body.classList.add('hidden');
          header.classList.remove('expanded');
          arrow.classList.remove('expanded');
        } else {
          body.classList.remove('hidden');
          header.classList.add('expanded');
          arrow.classList.add('expanded');
        }
      });

      listContainer.appendChild(card);
    });
    container.appendChild(listContainer);
  }
};

const NotesUI = {
  render(job) {
    const container = $.get('notesList');
    $.clear(container);
    const notes = job.notes || [];
    if (notes.length === 0) {
      container.appendChild($.el('p', { textContent: I18n.t('noNotesYet') }));
      container.classList.remove('notes-list-scrollable');
      return;
    }
    
    // Apply scroll class if more than 10 notes
    if (notes.length > 10) {
      container.classList.add('notes-list-scrollable');
    } else {
      container.classList.remove('notes-list-scrollable');
    }
    
    notes.forEach(note => {
      const div = $.el('div', { className: 'note-item' });
      div.appendChild($.el('div', {
        className: 'note-meta',
        textContent: Utils.formatTime(note.createdAt)
      }));
      div.appendChild($.el('div', {
        className: 'note-text',
        textContent: note.text
      }));
      container.appendChild(div);
    });
  }
};

const DocumentsUI = {
  render(job) {
    const container = $.get('documentsList');
    $.clear(container);
    const docs = job.documents || [];
    if (docs.length === 0) {
      container.appendChild($.el('p', { textContent: I18n.t('noDocumentsYet') }));
      return;
    }
    docs.forEach((doc, idx) => {
      const row = $.el('div', { className: 'document-item' });
      const main = $.el('div', { className: 'document-main' });
      const nameSpan = $.el('span', { className: 'document-name' });
      const datePart = doc.date ? ` (${Utils.formatDate(doc.date)})` : '';
      const displayName = (doc.name || doc.fileName || 'Document') + datePart;

      if (doc.fileData) {
        const link = $.el('a', {
          href: doc.fileData,
          download: doc.fileName || doc.name || 'document',
          textContent: displayName,
          className: 'document-link'
        });
        nameSpan.appendChild(link);
      } else if (doc.url) {
        const link = $.el('a', {
          href: doc.url,
          target: '_blank',
          rel: 'noopener noreferrer',
          textContent: displayName,
          className: 'document-link'
        });
        nameSpan.appendChild(link);
      } else {
        nameSpan.textContent = displayName;
      }

      main.appendChild(nameSpan);
      if (doc.fileName) {
        main.appendChild($.el('span', {
          className: 'document-meta',
          textContent: doc.fileName
        }));
      }

      const actions = $.el('div', { className: 'document-actions' });
      const delBtn = $.el('button', {
        type: 'button',
        textContent: I18n.t('delete')
      });
      delBtn.addEventListener('click', () => {
        job.documents.splice(idx, 1);
        Storage.saveJobs();
        this.render(job);
      });
      actions.appendChild(delBtn);
      row.appendChild(main);
      row.appendChild(actions);
      container.appendChild(row);
    });
  }
};

const MediaUI = {
  render(job) {
    const container = $.get('mediaList');
    if (!container) return;
    $.clear(container);
    const media = job.media || [];
    
    if (media.length === 0) {
      container.appendChild($.el('p', { textContent: (State.lang === 'tr') ? 'Henüz fotoğraf/video yok.' : 'No photos or videos yet.' }));
      return;
    }
    
    const grid = $.el('div', { className: 'media-grid' });
    
    media.forEach((item, idx) => {
      const card = $.el('div', { className: 'media-card' });
      
      // Thumbnail or icon
      const preview = $.el('div', { className: 'media-preview' });
      if (item.fileData && item.fileType && item.fileType.startsWith('image/')) {
        const img = $.el('img', { src: item.fileData, alt: item.label || 'Image' });
        preview.appendChild(img);
      } else if (item.fileData && item.fileType && item.fileType.startsWith('video/')) {
        preview.appendChild($.el('span', { className: 'media-icon', textContent: I18n.t('video') }));
      } else {
        preview.appendChild($.el('span', { className: 'media-icon', textContent: I18n.t('media') }));
      }
      card.appendChild(preview);
      
      // Label
      const label = $.el('div', { className: 'media-label', textContent: item.label || item.fileName || I18n.t('media') });
      card.appendChild(label);
      
      // Actions
      const actions = $.el('div', { className: 'media-actions' });
      
      if (item.fileData) {
        const downloadBtn = $.el('button', { type: 'button', textContent: (State.lang === 'tr') ? 'İndir' : 'Download' });
        downloadBtn.addEventListener('click', () => {
          const a = document.createElement('a');
          a.href = item.fileData;
          a.download = item.fileName || 'media';
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        });
        actions.appendChild(downloadBtn);
      }
      
      const deleteBtn = $.el('button', { type: 'button', textContent: (State.lang === 'tr') ? 'Sil' : 'Delete' });
      deleteBtn.addEventListener('click', () => {
        job.media.splice(idx, 1);
        Storage.saveJobs();
        this.render(job);
      });
      actions.appendChild(deleteBtn);
      
      card.appendChild(actions);
      grid.appendChild(card);
    });
    
    container.appendChild(grid);
  }
};

// ============================================================
// GLOBAL DOCUMENTS TAB UI
// ============================================================

const DocumentsTabUI = {
  currentTab: 'search', // 'search' or 'library'
  
  render() {
    // Render based on current tab
    if (this.currentTab === 'search') {
      this.renderDocumentsSearch();
    } else {
      this.renderResourceLibrary();
    }
  },
  
  renderDocumentsSearch() {
    // Show/hide panels
    const searchPanel = $.get('documentsSearchPanel');
    const libraryPanel = $.get('resourceLibraryPanel');
    if (searchPanel) $.show(searchPanel);
    if (libraryPanel) $.hide(libraryPanel);
    
    // Update right panel title
    const rightTitle = $.get('documentsRightTitle');
    if (rightTitle) rightTitle.textContent = (State.lang === 'tr') ? 'Belge Detayları' : 'Document Details';
    
    // Clear details panel and show hint
    const container = $.get('documentDetailsContent');
    if (container) $.clear(container);
    const hint = $.get('documentDetailsHint');
    if (hint) {
      hint.style.display = 'block';
      hint.textContent = I18n.t('hintSelectDocument');
    }
    
    // Get containers
    const listEl = $.get('documentsListGlobal');
    if (!listEl) return;

    const jobFilterEl = $.get('documentsJobFilter');
    const searchEl = $.get('documentsSearchInput');

    const searchTerm = (searchEl?.value || '').toLowerCase().trim();
    if (jobFilterEl) this.refreshJobFilter(jobFilterEl);
    $.clear(listEl);

    const rows = [];
    State.jobs.forEach(job => {
      const docs = job.documents || [];
      docs.forEach(doc => rows.push({ job, doc }));
    });

    let filtered = rows;

    const selectedJobCode = jobFilterEl?.value;
    if (selectedJobCode) {
      filtered = filtered.filter(({ job }) => job.jobCode === selectedJobCode);
    }

    if (searchTerm) {
      filtered = filtered.filter(({ job, doc }) => {
        const textParts = [
          job.jobCode,
          job.clientName,
          job.tradeDirection,
          I18n.typeTextBilingual(job.tradeDirection),      // Both EN and TR type
          (job.modes && job.modes.length ? job.modes.join(' ') : ''),
          I18n.modesTextBilingual(job.modes),              // Both EN and TR modes
          Utils.location(job.originCity, job.originCountry),
          Utils.location(job.destinationCity, job.destinationCountry),
          CONFIG.getCountryNameBilingual(job.originCountry),      // Both EN and TR country
          CONFIG.getCountryNameBilingual(job.destinationCountry), // Both EN and TR country
          State.getAgentName(job.originAgentId),
          State.getAgentName(job.destinationAgentId),
          doc.name,
          doc.fileName
        ].filter(Boolean);

        const text = textParts.join(' ').toLowerCase();
        return text.includes(searchTerm);
      });
    }

    if (!filtered.length) {
      listEl.appendChild($.el('p', { 
        textContent: I18n.t('noDocumentsFound'),
        style: 'color: var(--color-text-muted); text-align: center; padding: 20px;'
      }));
    } else {
      filtered.forEach(({ job, doc }) => listEl.appendChild(this.row(job, doc)));
    }
  },
  
  renderResourceLibrary() {
    // Show/hide panels
    const searchPanel = $.get('documentsSearchPanel');
    const libraryPanel = $.get('resourceLibraryPanel');
    if (searchPanel) $.hide(searchPanel);
    if (libraryPanel) $.show(libraryPanel);
    
    // Update right panel title
    const rightTitle = $.get('documentsRightTitle');
    if (rightTitle) rightTitle.textContent = (State.lang === 'tr') ? 'Kaynak Detayları' : 'Resource Details';
    
    // Clear details panel and show hint
    const container = $.get('documentDetailsContent');
    if (container) $.clear(container);
    const hint = $.get('documentDetailsHint');
    if (hint) {
      hint.style.display = 'block';
      hint.textContent = (State.lang === 'tr') 
        ? 'Detayları görmek için soldan bir kaynak seçin.' 
        : 'Select a resource from the left to see details.';
    }
    
    // Render resource library
    ResourceLibraryUI.render();
  },
  
  switchTab(tabType) {
    this.currentTab = tabType;
    
    // Update tab buttons
    document.querySelectorAll('.documents-type-tab').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.type === tabType);
    });
    
    // Show/hide Add Resource button based on tab
    const addBtn = $.get('addResourceBtn');
    if (addBtn) {
      addBtn.style.display = tabType === 'library' ? 'block' : 'none';
    }
    
    this.render();
  },

  refreshJobFilter(selectEl) {
    const previous = selectEl.value;

    while (selectEl.options.length > 1) selectEl.remove(1);
    if (selectEl.options[0]) selectEl.options[0].textContent = I18n.t('allMovesFilter');

    const codes = [...new Set(
      State.jobs.map(j => j.jobCode).filter(Boolean)
    )].sort();

    codes.forEach(code => {
      selectEl.appendChild($.el('option', {
        value: code,
        textContent: code
      }));
    });

    if (codes.includes(previous)) selectEl.value = previous;
    else selectEl.value = '';
  },

  row(job, doc) {
    const row = $.el('div', { className: 'document-item' });
    row.style.cursor = 'pointer';
    
    // Add click handler to show details in right panel
    row.addEventListener('click', (e) => {
      // Don't trigger if clicking a button
      if (e.target.tagName === 'BUTTON') return;
      this.showDocumentDetails(job, doc);
    });
    
    const main = $.el('div', { className: 'document-main' });

    const title = $.el('div', { className: 'document-name' });
    const docLabel = doc.name || doc.fileName || 'Document';
    const codeLabel = job.jobCode || '-';
    title.textContent = `${docLabel} (${codeLabel})`;
    main.appendChild(title);

    const meta = $.el('div', { className: 'document-meta' });
    const modeLabel = I18n.modesText(job.modes);
    const typeLabel = I18n.typeText(job.tradeDirection) || '-';
    const routeLabel = `${Utils.location(job.originCity, job.originCountry)} → ${Utils.location(job.destinationCity, job.destinationCountry)}`;
    meta.textContent = [
      job.clientName || I18n.t('noClientName'),
      modeLabel,
      typeLabel,
      routeLabel
    ].join(' • ');
    main.appendChild(meta);

    const actions = $.el('div', { className: 'document-actions' });

    if (doc.fileData) {
      const downloadBtn = $.el('button', { type: 'button', textContent: I18n.t('download') });
      downloadBtn.addEventListener('click', () => {
        const a = document.createElement('a');
        a.href = doc.fileData;
        a.download = doc.fileName || doc.name || 'document';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      });
      actions.appendChild(downloadBtn);
    } else if (doc.url) {
      const openLinkBtn = $.el('button', { type: 'button', textContent: I18n.t('openLink') });
      openLinkBtn.addEventListener('click', () => window.open(doc.url, '_blank', 'noopener'));
      actions.appendChild(openLinkBtn);
    }

    const openMoveBtn = $.el('button', { type: 'button', textContent: I18n.t('openMove') });
    openMoveBtn.addEventListener('click', () => {
      Views.show('moves');
      JobsUI.render();
      JobsUI.showDetails(job);
    });
    actions.appendChild(openMoveBtn);

    row.appendChild(main);
    row.appendChild(actions);
    return row;
  },
  
  showDocumentDetails(job, doc) {
    const container = $.get('documentDetailsContent');
    if (!container) return;
    $.clear(container);
    
    // Hide the hint text
    const hint = $.get('documentDetailsHint');
    if (hint) hint.style.display = 'none';
    
    // Document info card
    const card = $.el('div', { className: 'details-card' });
    
    // Document name and type
    const header = $.el('div', { className: 'document-details-header' });
    const docName = doc.name || doc.fileName || 'Document';
    header.appendChild($.el('h3', { textContent: docName }));
    
    if (doc.fileName) {
      const fileExt = doc.fileName.split('.').pop().toUpperCase();
      header.appendChild($.el('span', { 
        className: 'document-type-badge',
        textContent: fileExt
      }));
    }
    card.appendChild(header);
    
    // Document metadata - only show if there's meaningful info
    if (doc.date) {
      const dateItem = $.el('div', { className: 'detail-item', style: 'margin-top: 12px;' });
      dateItem.appendChild($.el('span', { className: 'detail-label', textContent: (State.lang === 'tr') ? 'TARİH' : 'DATE' }));
      dateItem.appendChild($.el('span', { className: 'detail-value', textContent: Utils.formatDate(doc.date) }));
      card.appendChild(dateItem);
    }
    
    container.appendChild(card);
    
    // Linked Move card
    const moveCard = $.el('div', { className: 'details-card' });
    moveCard.appendChild($.el('h4', { 
      className: 'details-card-title', 
      textContent: (State.lang === 'tr') ? 'BAĞLI TAŞIMA' : 'LINKED MOVE' 
    }));
    
    const moveInfo = $.el('div', { className: 'linked-move-info' });
    
    const moveLink = $.el('a', { 
      href: '#',
      className: 'linked-move-code',
      textContent: job.jobCode || '-'
    });
    moveLink.addEventListener('click', (e) => {
      e.preventDefault();
      Views.show('moves');
      JobsUI.render();
      JobsUI.showDetails(job);
    });
    moveInfo.appendChild(moveLink);
    
    moveInfo.appendChild($.el('div', { 
      className: 'linked-move-client',
      textContent: job.clientName || I18n.t('noClientName')
    }));
    
    moveInfo.appendChild($.el('div', { 
      className: 'linked-move-route',
      textContent: `${Utils.location(job.originCity, job.originCountry)} → ${Utils.location(job.destinationCity, job.destinationCountry)}`
    }));
    
    moveCard.appendChild(moveInfo);
    container.appendChild(moveCard);
    
    // Actions card
    const actionsCard = $.el('div', { className: 'details-card' });
    actionsCard.appendChild($.el('h4', { 
      className: 'details-card-title', 
      textContent: (State.lang === 'tr') ? 'İŞLEMLER' : 'ACTIONS' 
    }));
    
    const actionsRow = $.el('div', { className: 'document-details-actions' });
    
    if (doc.fileData) {
      const downloadBtn = $.el('button', { 
        type: 'button', 
        className: 'btn-primary',
        textContent: I18n.t('download')
      });
      downloadBtn.addEventListener('click', () => {
        const a = document.createElement('a');
        a.href = doc.fileData;
        a.download = doc.fileName || doc.name || 'document';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      });
      actionsRow.appendChild(downloadBtn);
    } else if (doc.url) {
      const openBtn = $.el('button', { 
        type: 'button', 
        className: 'btn-primary',
        textContent: I18n.t('openLink')
      });
      openBtn.addEventListener('click', () => window.open(doc.url, '_blank', 'noopener'));
      actionsRow.appendChild(openBtn);
    }
    
    const goToMoveBtn = $.el('button', { 
      type: 'button',
      textContent: I18n.t('openMove')
    });
    goToMoveBtn.addEventListener('click', () => {
      Views.show('moves');
      JobsUI.render();
      JobsUI.showDetails(job);
    });
    actionsRow.appendChild(goToMoveBtn);
    
    actionsCard.appendChild(actionsRow);
    container.appendChild(actionsCard);
  }
};


const ResourceLibraryUI = {
  render() {
    const container = $.get('resourceLibraryContainer');
    if (!container) return;

    $.clear(container);

    // Ensure resourceLibrary exists
    if (!State.resourceLibrary) {
      State.resourceLibrary = { categories: [] };
    }
    if (!State.resourceLibrary.categories) {
      State.resourceLibrary.categories = [];
    }

    // Check if there are any categories
    if (State.resourceLibrary.categories.length === 0) {
      // Empty state - no categories yet
      const emptyState = $.el('div', { className: 'empty-state', style: 'padding: 40px 20px; text-align: center;' });
      emptyState.appendChild($.el('div', { 
        className: 'empty-state-icon', 
        textContent: '📁',
        style: 'font-size: 48px; margin-bottom: 16px;'
      }));
      emptyState.appendChild($.el('p', { 
        className: 'empty-state-text',
        textContent: I18n.t('noCategories'),
        style: 'color: #6b7280; margin-bottom: 20px;'
      }));
      
      const addCatBtn = $.el('button', {
        type: 'button',
        className: 'btn-primary',
        textContent: '+ ' + I18n.t('addCategory')
      });
      addCatBtn.addEventListener('click', () => this.openCategoryModal());
      emptyState.appendChild(addCatBtn);
      
      container.appendChild(emptyState);
      return;
    }

    // Render categories
    State.resourceLibrary.categories.forEach(category => {
      container.appendChild(this.renderCategory(category));
    });
    
    // Add Category button at bottom
    const addCatRow = $.el('div', { className: 'add-category-row', style: 'margin-top: 16px; padding-top: 16px; border-top: 1px solid #e5e7eb;' });
    const addCatBtn = $.el('button', {
      type: 'button',
      className: 'btn-secondary',
      style: 'width: 100%;',
      textContent: '+ ' + I18n.t('addCategory')
    });
    addCatBtn.addEventListener('click', () => this.openCategoryModal());
    addCatRow.appendChild(addCatBtn);
    container.appendChild(addCatRow);
  },

  renderCategory(category) {
    const categoryDiv = $.el('div', { className: 'resource-category' });
    
    // Category header
    const header = $.el('div', { className: 'resource-category-header' });
    
    const leftSide = $.el('div', { className: 'category-header-left', style: 'display: flex; align-items: center; gap: 8px; flex: 1; cursor: pointer;' });
    
    const arrow = $.el('span', { 
      textContent: '▼', 
      className: 'category-arrow',
      style: 'transition: transform 0.2s;'
    });
    const name = $.el('span', { 
      className: 'resource-category-name',
      textContent: (State.lang === 'tr' ? category.nametr : category.name) || category.name
    });
    const count = $.el('span', {
      className: 'resource-category-count',
      textContent: category.items ? category.items.length : 0
    });
    
    leftSide.appendChild(arrow);
    leftSide.appendChild(name);
    leftSide.appendChild(count);
    
    // Category actions (edit/delete)
    const actionsDiv = $.el('div', { className: 'category-actions', style: 'display: flex; gap: 4px;' });
    
    const editBtn = $.el('button', {
      type: 'button',
      className: 'btn-icon-sm',
      textContent: '✏️',
      title: I18n.t('editCategory'),
      style: 'padding: 4px 8px; font-size: 12px; background: transparent; border: none; cursor: pointer;'
    });
    editBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.openCategoryModal(category);
    });
    
    const deleteBtn = $.el('button', {
      type: 'button',
      className: 'btn-icon-sm',
      textContent: '🗑️',
      title: I18n.t('deleteCategory'),
      style: 'padding: 4px 8px; font-size: 12px; background: transparent; border: none; cursor: pointer;'
    });
    deleteBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.deleteCategory(category.id);
    });
    
    actionsDiv.appendChild(editBtn);
    actionsDiv.appendChild(deleteBtn);
    
    header.appendChild(leftSide);
    header.appendChild(actionsDiv);
    categoryDiv.appendChild(header);

    // Items container (collapsible)
    const itemsContainer = $.el('div', { className: 'resource-items' });

    if (!category.items || category.items.length === 0) {
      const emptyMsg = $.el('p', { 
        textContent: (State.lang === 'tr') ? 'Bu kategoride kaynak yok.' : 'No resources in this category.',
        style: 'color:#6b7280; font-size:13px; padding:8px 0;'
      });
      itemsContainer.appendChild(emptyMsg);
    } else {
      category.items.forEach(item => {
        itemsContainer.appendChild(this.renderItem(item, category.id));
      });
    }

    categoryDiv.appendChild(itemsContainer);

    // Toggle collapse on left side click
    let isCollapsed = false;
    leftSide.addEventListener('click', () => {
      isCollapsed = !isCollapsed;
      itemsContainer.style.display = isCollapsed ? 'none' : 'block';
      arrow.style.transform = isCollapsed ? 'rotate(-90deg)' : 'rotate(0deg)';
    });

    return categoryDiv;
  },

  renderItem(item, categoryId) {
    const itemDiv = $.el('div', { className: 'resource-item' });
    itemDiv.style.cursor = 'pointer';
    
    // Add click handler to show details
    itemDiv.addEventListener('click', (e) => {
      // Don't trigger if clicking a button
      if (e.target.tagName === 'BUTTON') return;
      this.showResourceDetails(item, categoryId);
    });

    // Left side: icon + name
    const infoDiv = $.el('div', { className: 'resource-item-info' });
    const fileIcon = $.el('span', { className: 'resource-item-icon', textContent: '📄' });
    const nameSpan = $.el('span', { 
      className: 'resource-item-name',
      textContent: (State.lang === 'tr' ? item.nametr : item.name) || item.name
    });
    
    infoDiv.appendChild(fileIcon);
    infoDiv.appendChild(nameSpan);

    // Right side: actions
    const actionsDiv = $.el('div', { className: 'resource-item-actions' });

    // Download button
    const downloadBtn = $.el('button', { 
      type: 'button',
      className: 'download-btn',
      textContent: I18n.t('btnDownload')
    });
    downloadBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.downloadItem(item);
    });

    // Delete button
    const deleteBtn = $.el('button', { 
      type: 'button',
      className: 'delete-btn',
      textContent: I18n.t('btnDelete')
    });
    deleteBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.deleteItem(item.id, categoryId);
    });

    actionsDiv.appendChild(downloadBtn);
    actionsDiv.appendChild(deleteBtn);

    itemDiv.appendChild(infoDiv);
    itemDiv.appendChild(actionsDiv);

    return itemDiv;
  },

  showResourceDetails(item, categoryId) {
    const container = $.get('documentDetailsContent');
    if (!container) return;
    $.clear(container);
    
    // Hide the hint text
    const hint = $.get('documentDetailsHint');
    if (hint) hint.style.display = 'none';
    
    // Update right panel title
    const titleEl = $.get('documentsRightTitle');
    if (titleEl) titleEl.textContent = I18n.t('resourceDetails');
    
    // Find category name
    const category = State.resourceLibrary?.categories?.find(c => c.id === categoryId);
    const categoryName = category ? ((State.lang === 'tr' ? category.nametr : category.name) || category.name) : '';
    
    // Resource details card
    const detailsCard = $.el('div', { className: 'resource-details-card' });
    
    // Header with icon and name
    const headerDiv = $.el('div', { className: 'resource-details-header', style: 'display: flex; align-items: center; gap: 12px; margin-bottom: 16px;' });
    headerDiv.appendChild($.el('span', { style: 'font-size: 32px;', textContent: '📄' }));
    
    const headerText = $.el('div');
    headerText.appendChild($.el('h3', { 
      textContent: (State.lang === 'tr' ? item.nametr : item.name) || item.name,
      style: 'margin: 0 0 4px 0;'
    }));
    headerText.appendChild($.el('p', { 
      textContent: categoryName,
      style: 'margin: 0; color: #6b7280; font-size: 13px;'
    }));
    headerDiv.appendChild(headerText);
    detailsCard.appendChild(headerDiv);
    
    // File info
    const infoGrid = $.el('div', { className: 'resource-info-grid', style: 'display: grid; gap: 12px; margin-bottom: 20px;' });
    
    if (item.fileName) {
      const fileRow = $.el('div', { className: 'info-row' });
      fileRow.appendChild($.el('span', { className: 'info-label', textContent: (State.lang === 'tr') ? 'Dosya:' : 'File:', style: 'font-weight: 500; color: #374151;' }));
      fileRow.appendChild($.el('span', { className: 'info-value', textContent: item.fileName, style: 'color: #6b7280;' }));
      infoGrid.appendChild(fileRow);
    }
    
    if (item.uploadedAt) {
      const dateRow = $.el('div', { className: 'info-row' });
      dateRow.appendChild($.el('span', { className: 'info-label', textContent: (State.lang === 'tr') ? 'Yüklenme:' : 'Uploaded:', style: 'font-weight: 500; color: #374151;' }));
      dateRow.appendChild($.el('span', { className: 'info-value', textContent: Utils.fmtDate(item.uploadedAt), style: 'color: #6b7280;' }));
      infoGrid.appendChild(dateRow);
    }
    
    detailsCard.appendChild(infoGrid);
    
    // Actions
    const actionsCard = $.el('div', { className: 'resource-actions', style: 'display: flex; gap: 8px;' });
    
    const downloadBtn = $.el('button', {
      type: 'button',
      className: 'btn-primary',
      textContent: I18n.t('btnDownload')
    });
    downloadBtn.addEventListener('click', () => this.downloadItem(item));
    actionsCard.appendChild(downloadBtn);
    
    const deleteBtn = $.el('button', {
      type: 'button',
      className: 'btn-danger',
      textContent: I18n.t('btnDelete')
    });
    deleteBtn.addEventListener('click', async () => {
      const confirmed = await Modals.confirm({
        title: I18n.t('deleteConfirm'),
        message: (State.lang === 'tr') ? 'Bu kaynak silinsin mi?' : 'Delete this resource?',
        confirmText: I18n.t('btnDelete'),
        danger: true
      });
      if (confirmed) {
        this.deleteItem(item.id, categoryId);
        // Clear details panel
        $.clear(container);
        const hint = $.get('documentDetailsHint');
        if (hint) {
          hint.style.display = 'block';
          hint.textContent = I18n.t('hintSelectResource');
        }
      }
    });
    actionsCard.appendChild(deleteBtn);
    
    detailsCard.appendChild(actionsCard);
    container.appendChild(detailsCard);
  },

  // Category Modal
  openCategoryModal(existingCategory = null) {
    const isEdit = !!existingCategory;
    
    // Remove existing modal if any
    const existingModal = $.get('categoryModal');
    if (existingModal) existingModal.remove();
    
    // Create modal
    const modal = $.el('div', { 
      id: 'categoryModal',
      className: 'modal'
    });

    const modalCard = $.el('div', { className: 'modal-card', style: 'max-width: 450px;' });

    // Header
    const modalHeader = $.el('div', { className: 'modal-header' });
    const title = $.el('h2', { 
      textContent: isEdit ? I18n.t('editCategory') : I18n.t('addCategory')
    });
    const closeBtn = $.el('button', { 
      type: 'button',
      className: 'close-button',
      textContent: '×'
    });
    closeBtn.addEventListener('click', () => {
      modal.remove();
    });
    
    modalHeader.appendChild(title);
    modalHeader.appendChild(closeBtn);
    modalCard.appendChild(modalHeader);

    // Form
    const form = $.el('form', { id: 'categoryForm' });

    // Name (English)
    const nameEnLabel = $.el('label', { textContent: I18n.t('categoryNameEn') });
    const nameEnInput = $.el('input', { 
      type: 'text',
      name: 'nameEn',
      required: true,
      value: isEdit ? existingCategory.name : ''
    });
    form.appendChild(nameEnLabel);
    form.appendChild(nameEnInput);

    // Name (Turkish)
    const nameTrLabel = $.el('label', { textContent: I18n.t('categoryNameTr') });
    const nameTrInput = $.el('input', { 
      type: 'text',
      name: 'nameTr',
      required: true,
      value: isEdit ? (existingCategory.nametr || '') : ''
    });
    form.appendChild(nameTrLabel);
    form.appendChild(nameTrInput);

    // Actions
    const actionsDiv = $.el('div', { className: 'modal-actions' });
    const cancelBtn = $.el('button', { 
      type: 'button',
      textContent: I18n.t('btnCancel')
    });
    cancelBtn.addEventListener('click', () => {
      modal.remove();
    });
    
    const submitBtn = $.el('button', { 
      type: 'submit',
      textContent: I18n.t('btnSave')
    });

    actionsDiv.appendChild(cancelBtn);
    actionsDiv.appendChild(submitBtn);
    form.appendChild(actionsDiv);

    // Form submit handler
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const nameEn = form.nameEn.value.trim();
      const nameTr = form.nameTr.value.trim();
      
      if (!nameEn || !nameTr) return;
      
      if (isEdit) {
        // Update existing category
        existingCategory.name = nameEn;
        existingCategory.nametr = nameTr;
      } else {
        // Create new category
        const newCategory = {
          id: Utils.makeId('cat'),
          name: nameEn,
          nametr: nameTr,
          items: []
        };
        State.resourceLibrary.categories.push(newCategory);
      }
      
      Storage.saveResourceLibrary();
      modal.remove();
      this.render();
    });
    
    modalCard.appendChild(form);
    modal.appendChild(modalCard);
    document.body.appendChild(modal);
    
    // Focus first input
    nameEnInput.focus();
  },
  
  deleteCategory(categoryId) {
    const category = State.resourceLibrary.categories.find(c => c.id === categoryId);
    if (!category) return;
    
    // Check if category has items
    if (category.items && category.items.length > 0) {
      Modals.alert({
        title: (State.lang === 'tr') ? 'Uyarı' : 'Warning',
        message: I18n.t('cannotDeleteNonEmpty')
      });
      return;
    }
    
    Modals.confirm({
      title: I18n.t('deleteCategory'),
      message: I18n.t('confirmDeleteCategory'),
      confirmText: I18n.t('btnDelete'),
      danger: true
    }).then(confirmed => {
      if (!confirmed) return;
      
      const index = State.resourceLibrary.categories.findIndex(c => c.id === categoryId);
      if (index !== -1) {
        State.resourceLibrary.categories.splice(index, 1);
        Storage.saveResourceLibrary();
        this.render();
      }
    });
  },

  openAddModal() {
    // Show modal
    const modal = $.get('resourceLibraryModal');
    if (!modal) {
      this.createModal();
    } else {
      // Update category dropdown options
      this.updateCategoryOptions();
    }
    
    // Reset form
    const form = $.get('resourceLibraryForm');
    if (form) form.reset();
    
    Modals.open('resourceLibraryModal');
  },
  
  updateCategoryOptions() {
    const categorySelect = document.querySelector('#resourceLibraryForm select[name="category"]');
    if (!categorySelect) return;
    
    $.clear(categorySelect);
    
    if (!State.resourceLibrary.categories || State.resourceLibrary.categories.length === 0) {
      categorySelect.appendChild($.el('option', {
        value: '',
        textContent: (State.lang === 'tr') ? '-- Önce kategori ekleyin --' : '-- Add a category first --',
        disabled: true,
        selected: true
      }));
      return;
    }
    
    State.resourceLibrary.categories.forEach(cat => {
      categorySelect.appendChild($.el('option', {
        value: cat.id,
        textContent: (State.lang === 'tr' ? cat.nametr : cat.name) || cat.name
      }));
    });
  },

  createModal() {
    // Create modal HTML
    const modal = $.el('div', { 
      id: 'resourceLibraryModal',
      className: 'modal hidden'
    });

    const modalCard = $.el('div', { className: 'modal-card' });

    // Header
    const modalHeader = $.el('div', { className: 'modal-header' });
    const title = $.el('h2', { 
      textContent: I18n.t('btnAddResource')
    });
    const closeBtn = $.el('button', { 
      type: 'button',
      className: 'close-button',
      textContent: '×'
    });
    closeBtn.addEventListener('click', () => Modals.close('resourceLibraryModal'));
    
    modalHeader.appendChild(title);
    modalHeader.appendChild(closeBtn);
    modalCard.appendChild(modalHeader);

    // Form
    const form = $.el('form', { id: 'resourceLibraryForm' });

    // Category select
    const categoryLabel = $.el('label', { 
      textContent: (State.lang === 'tr') ? 'Kategori' : 'Category'
    });
    const categorySelect = $.el('select', { 
      name: 'category',
      required: true
    });
    
    // Populate category options
    if (!State.resourceLibrary.categories || State.resourceLibrary.categories.length === 0) {
      categorySelect.appendChild($.el('option', {
        value: '',
        textContent: (State.lang === 'tr') ? '-- Önce kategori ekleyin --' : '-- Add a category first --',
        disabled: true,
        selected: true
      }));
    } else {
      State.resourceLibrary.categories.forEach(cat => {
        categorySelect.appendChild($.el('option', {
          value: cat.id,
          textContent: (State.lang === 'tr' ? cat.nametr : cat.name) || cat.name
        }));
      });
    }

    form.appendChild(categoryLabel);
    form.appendChild(categorySelect);

    // Name (English)
    const nameEnLabel = $.el('label', { textContent: I18n.t('nameEnglish') });
    const nameEnInput = $.el('input', { 
      type: 'text',
      name: 'nameEn',
      required: true
    });
    form.appendChild(nameEnLabel);
    form.appendChild(nameEnInput);

    // Name (Turkish)
    const nameTrLabel = $.el('label', { textContent: I18n.t('nameTurkish') });
    const nameTrInput = $.el('input', { 
      type: 'text',
      name: 'nameTr',
      required: true
    });
    form.appendChild(nameTrLabel);
    form.appendChild(nameTrInput);

    // File upload
    const fileLabel = $.el('label', { 
      textContent: (State.lang === 'tr') ? 'Dosya' : 'File'
    });
    const fileInput = $.el('input', { 
      type: 'file',
      name: 'file',
      required: true
    });
    form.appendChild(fileLabel);
    form.appendChild(fileInput);

    // Actions
    const actionsDiv = $.el('div', { className: 'modal-actions' });
    const cancelBtn = $.el('button', { 
      type: 'button',
      textContent: I18n.t('btnCancel')
    });
    cancelBtn.addEventListener('click', () => Modals.close('resourceLibraryModal'));
    
    const submitBtn = $.el('button', { 
      type: 'submit',
      textContent: I18n.t('btnSave')
    });

    actionsDiv.appendChild(cancelBtn);
    actionsDiv.appendChild(submitBtn);
    form.appendChild(actionsDiv);

    // Form submit handler
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const categoryId = form.category.value;
      const nameEn = form.nameEn.value.trim();
      const nameTr = form.nameTr.value.trim();
      const file = form.file.files[0];

      if (!categoryId) {
        Modals.alert({ 
          title: (State.lang === 'tr') ? 'Uyarı' : 'Warning', 
          message: (State.lang === 'tr') ? 'Lütfen önce bir kategori ekleyin.' : 'Please add a category first.' 
        });
        return;
      }

      if (!file) {
        Modals.alert({ 
          title: (State.lang === 'tr') ? 'Uyarı' : 'Warning', 
          message: (State.lang === 'tr') ? 'Lütfen dosya seçin.' : 'Please select a file.' 
        });
        return;
      }

      // Read file as base64
      const reader = new FileReader();
      reader.onload = (event) => {
        const category = State.resourceLibrary.categories.find(c => c.id === categoryId);
        if (!category) return;

        // Ensure items array exists
        if (!category.items) category.items = [];

        // Create new item
        const newItem = {
          id: Utils.makeId('resource'),
          name: nameEn,
          nametr: nameTr,
          fileName: file.name,
          fileData: event.target.result,
          uploadedAt: new Date().toISOString()
        };

        category.items.push(newItem);
        Storage.saveResourceLibrary();

        // Close modal and refresh
        Modals.close('resourceLibraryModal');
        ResourceLibraryUI.render();
      };

      reader.readAsDataURL(file);
    });
    
    modalCard.appendChild(form);
    modal.appendChild(modalCard);

    document.body.appendChild(modal);
  },
    
  downloadItem(item) {
    if (!item.fileData) {
      Modals.alert({ 
        title: (State.lang === 'tr') ? 'Hata' : 'Error', 
        message: (State.lang === 'tr') ? 'Dosya bulunamadı.' : 'File not found.' 
      });
      return;
    }

    // Create download link
    const link = document.createElement('a');
    link.href = item.fileData;
    link.download = item.fileName || 'download';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  },

  deleteItem(itemId, categoryId) {
    Modals.confirm({
      title: (State.lang === 'tr') ? 'Silme Onayı' : 'Confirm Delete',
      message: (State.lang === 'tr') ? 'Bu kaynak silinsin mi?' : 'Delete this resource?',
      danger: true,
      confirmText: I18n.t('btnDelete')
    }).then(confirmed => {
      if (!confirmed) return;

      const category = State.resourceLibrary.categories.find(c => c.id === categoryId);
      if (!category || !category.items) return;

      const index = category.items.findIndex(item => item.id === itemId);
      if (index !== -1) {
        category.items.splice(index, 1);
        Storage.saveResourceLibrary();
        this.render();
      }
    });
  }
};

// ========== // QUOTES UI // ========== //

const QuotesUI = {
  render() {
    const container = $.get('quoteList');
    if (!container) return;
    
    const allQuotes = this.filter();
    $.clear(container);
    
    if (allQuotes.length === 0) {
      container.appendChild($.el('p', { 
        textContent: (State.lang === 'tr') ? 'Henuz teklif yok.' : 'No quotes yet.' 
      }));
      return;
    }
    
    // Pagination
    const { page, perPage } = State.pagination.quotes;
    const totalPages = Math.ceil(allQuotes.length / perPage);
    const startIdx = (page - 1) * perPage;
    const pageQuotes = allQuotes.slice(startIdx, startIdx + perPage);
    
    pageQuotes.forEach(quote => container.appendChild(this.createCard(quote)));
    
    // Add pagination controls if more than one page
    if (totalPages > 1) {
      container.appendChild(this.createPaginationControls('quotes', page, totalPages, allQuotes.length));
    }
  },
  
  createPaginationControls(type, currentPage, totalPages, totalItems) {
    const wrapper = $.el('div', { className: 'pagination-controls' });
    
    const { perPage } = State.pagination[type];
    const start = (currentPage - 1) * perPage + 1;
    const end = Math.min(currentPage * perPage, totalItems);
    const infoText = (State.lang === 'tr') 
      ? `${totalItems} kayıttan ${start}-${end} arası gösteriliyor`
      : `Showing ${start}-${end} of ${totalItems}`;
    wrapper.appendChild($.el('span', { className: 'pagination-info', textContent: infoText }));
    
    const buttons = $.el('div', { className: 'pagination-buttons' });
    
    const prevBtn = $.el('button', { 
      type: 'button', 
      textContent: '← ' + ((State.lang === 'tr') ? 'Önceki' : 'Previous'),
      disabled: currentPage === 1
    });
    prevBtn.addEventListener('click', () => {
      if (State.pagination[type].page > 1) {
        State.pagination[type].page--;
        this.render();
      }
    });
    buttons.appendChild(prevBtn);
    
    buttons.appendChild($.el('span', { 
      className: 'pagination-current',
      textContent: `${currentPage} / ${totalPages}` 
    }));
    
    const nextBtn = $.el('button', { 
      type: 'button', 
      textContent: ((State.lang === 'tr') ? 'Sonraki' : 'Next') + ' →',
      disabled: currentPage === totalPages
    });
    nextBtn.addEventListener('click', () => {
      if (State.pagination[type].page < totalPages) {
        State.pagination[type].page++;
        this.render();
      }
    });
    buttons.appendChild(nextBtn);
    
    wrapper.appendChild(buttons);
    return wrapper;
  },

  filter() {
    let list = [...State.quotes];
    
    if (State.quoteFilters.search) {
      const term = State.quoteFilters.search.toLowerCase();
      list = list.filter(quote => {
        const text = [
          quote.quoteCode,
          quote.clientName,
          quote.clientOrganization,
          quote.origin,
          quote.destination,
          quote.type,
          I18n.typeTextBilingual(quote.type),           // Both EN and TR type
          ...(quote.modes || []),
          I18n.modesTextBilingual(quote.modes),         // Both EN and TR modes
          quote.status,
          I18n.statusTextBilingual(quote.status)        // Both EN and TR status
        ].filter(Boolean).join(' ').toLowerCase();
        return text.includes(term);
      });
    }
    
    list.sort((a, b) => {
      const da = a.createdAt || '';
      const db = b.createdAt || '';
      return db.localeCompare(da);
    });
    
    return list;
  },

  createCard(quote) {
    const card = $.el('div', { className: 'quote-card' });
    
    // Row 1: Client Name (left) — Quote Code (right) - matching job card layout
    const row1 = $.el('div', { className: 'quote-card-header' });
    row1.appendChild($.el('span', { className: 'quote-card-client', textContent: quote.clientName || I18n.t('noClientName') }));
    row1.appendChild($.el('span', { className: 'quote-card-code', textContent: quote.quoteCode || '' }));
    card.appendChild(row1);
    
    // Row 2: Organization (if exists)
    if (quote.clientOrganization) {
      card.appendChild($.el('p', { 
        className: 'quote-card-org',
        textContent: quote.clientOrganization
      }));
    }
    
    // Row 3: Route
    card.appendChild($.el('p', { 
      className: 'quote-card-route',
      textContent: `${quote.origin || '-'} → ${quote.destination || '-'}` 
    }));
    
    // Row 4: Modes (left) — Type (right)
    const row4 = $.el('div', { className: 'quote-card-row' });
    
    // Mode badges - translated
    const modesContainer = $.el('span', { className: 'quote-card-modes' });
    if (quote.modes && quote.modes.length > 0) {
      quote.modes.forEach(mode => {
        const modeText = I18n.modeText(mode);
        modesContainer.appendChild($.el('span', { className: 'mode-badge', textContent: modeText }));
      });
    }
    row4.appendChild(modesContainer);
    
    // Type label - translated
    const typeLabel = I18n.typeText(quote.type) || '-';
    row4.appendChild($.el('span', { className: 'quote-card-type', textContent: typeLabel }));
    card.appendChild(row4);
    
    // Row 5: Linked job indicator (if converted)
    if (quote.convertedToJobId) {
      const linkedJob = State.getJob(quote.convertedToJobId);
      if (linkedJob) {
        const linkedRow = $.el('div', { className: 'quote-card-linked' });
        linkedRow.textContent = (State.lang === 'tr') 
          ? `${linkedJob.jobCode} taşımasına dönüştürüldü`
          : `Converted to ${linkedJob.jobCode}`;
        card.appendChild(linkedRow);
      }
    }
    
    card.addEventListener('click', () => this.showDetails(quote));
    return card;
  },

  showDetails(quote) {
    State.selectedQuoteId = quote.id;
    const editBtn = $.get('editQuoteBtn');
    if (editBtn) editBtn.disabled = false;
    
    const container = $.get('quoteDetails');
    $.clear(container);
    
    // ===== HEADER: Quote Code + Client Name =====
    const titleContainer = $.el('div', { className: 'move-details-header' });
    const titleText = `${quote.quoteCode || ''} - ${quote.clientName || I18n.t('noClientName')}`;
    titleContainer.appendChild($.el('h3', { textContent: titleText }));
    container.appendChild(titleContainer);
    
    // ===== CLIENT INFORMATION CARD =====
    const clientCard = $.el('div', { className: 'details-card' });
    clientCard.appendChild($.el('h4', { className: 'details-card-title', textContent: (State.lang === 'tr') ? 'MÜŞTERİ BİLGİLERİ' : 'CLIENT INFORMATION' }));
    const clientGrid = $.el('div', { className: 'details-card-grid' });
    
    this.addDetailItem(clientGrid, (State.lang === 'tr') ? 'MÜŞTERİ' : 'CLIENT', quote.clientName || '-');
    this.addDetailItem(clientGrid, (State.lang === 'tr') ? 'ORGANİZASYON' : 'ORGANIZATION', quote.clientOrganization || '-');
    
    clientCard.appendChild(clientGrid);
    container.appendChild(clientCard);
    
    // ===== QUOTE INFORMATION CARD =====
    const quoteCard = $.el('div', { className: 'details-card' });
    quoteCard.appendChild($.el('h4', { className: 'details-card-title', textContent: (State.lang === 'tr') ? 'TEKLİF BİLGİLERİ' : 'QUOTE INFORMATION' }));
    const quoteGrid = $.el('div', { className: 'details-card-grid' });
    
    this.addDetailItem(quoteGrid, (State.lang === 'tr') ? 'TİP' : 'TYPE', I18n.typeText(quote.type) || '-');
    this.addDetailItem(quoteGrid, (State.lang === 'tr') ? 'MODLAR' : 'MODES', I18n.modesText(quote.modes) || '-');
    this.addDetailItem(quoteGrid, (State.lang === 'tr') ? 'SİGORTA' : 'INSURANCE', quote.insurance ? ((State.lang === 'tr') ? 'Evet' : 'Yes') : ((State.lang === 'tr') ? 'Hayır' : 'No'));
    this.addDetailItem(quoteGrid, (State.lang === 'tr') ? 'GEÇERLİLİK' : 'VALID UNTIL', quote.validUntil ? Utils.formatDate(quote.validUntil) : '-');
    
    quoteCard.appendChild(quoteGrid);
    container.appendChild(quoteCard);
    
    // ===== ROUTE CARD =====
    const routeCard = $.el('div', { className: 'details-card' });
    routeCard.appendChild($.el('h4', { className: 'details-card-title', textContent: (State.lang === 'tr') ? 'ROTA' : 'ROUTE' }));
    const routeGrid = $.el('div', { className: 'details-card-grid' });
    
    this.addDetailItem(routeGrid, (State.lang === 'tr') ? 'ÇIKIŞ' : 'ORIGIN', quote.origin || '-');
    this.addDetailItem(routeGrid, (State.lang === 'tr') ? 'VARIŞ' : 'DESTINATION', quote.destination || '-');
    
    routeCard.appendChild(routeGrid);
    container.appendChild(routeCard);
    
    const formData = {
      origin: quote.origin,
      destination: quote.destination,
      departurePort: quote.departurePort,
      poe: quote.poe,
      containerDetails: quote.containerDetails,
      departureAirportName: quote.departureAirportName,
      arrivalAirportName: quote.arrivalAirportName,
      truckType: quote.truckType
    };
    
    // ===== MODE CHARGES SECTIONS =====
    (quote.modes || []).forEach(mode => {
      const charges = (quote.chargesByMode && quote.chargesByMode[mode]) || [];
      if (charges.length > 0) {
        container.appendChild(this.buildChargesSection(mode, charges, quote, formData));
      }
    });
    
    // ===== INCLUDES SECTION =====
    const includes = quote.selectedIncludes || [];
    if (includes.length > 0) {
      const sec = $.el('div', { className: 'details-section' });
      sec.appendChild($.el('h4', { className: 'details-section-title', textContent: (State.lang === 'tr') ? 'TEKLİFİMİZE DAHİL' : 'OUR QUOTATION INCLUDES' }));
      const ul = $.el('ul', { className: 'quote-includes-list' });
      includes.forEach(item => {
        ul.appendChild($.el('li', { textContent: item }));
      });
      sec.appendChild(ul);
      container.appendChild(sec);
    }
    
    // ===== ADDITIONAL CHARGES SECTION =====
    const additional = quote.selectedAdditionalCharges || [];
    if (additional.length > 0) {
      const sec = $.el('div', { className: 'details-section' });
      sec.appendChild($.el('h4', { className: 'details-section-title', textContent: (State.lang === 'tr') ? 'EK MASRAFLAR UYGULANABİLİR' : 'ADDITIONAL CHARGES MAY APPLY' }));
      const ul = $.el('ul', { className: 'quote-includes-list' });
      additional.forEach(item => {
        ul.appendChild($.el('li', { textContent: item }));
      });
      sec.appendChild(ul);
      container.appendChild(sec);
    }
    
    // ===== TERMS SECTION =====
    if (quote.termsAndConditions) {
      const sec = $.el('div', { className: 'details-section' });
      sec.appendChild($.el('h4', { className: 'details-section-title', textContent: (State.lang === 'tr') ? 'ŞARTLAR VE KOŞULLAR' : 'TERMS & CONDITIONS' }));
      sec.appendChild($.el('p', { 
        textContent: quote.termsAndConditions,
        className: 'quote-terms-text'
      }));
      container.appendChild(sec);
    }
    
    // ===== VALIDITY BOX =====
    if (quote.validUntil) {
      const box = $.el('div', { className: 'quote-validity-box' });
      box.textContent = `${(State.lang === 'tr') ? 'Geçerlilik Tarihi:' : 'Rates & Services are Valid Until:'} ${Utils.formatDate(quote.validUntil)}`;
      container.appendChild(box);
    }
    
    // ===== ACTIONS =====
    const actions = $.el('div', { className: 'quote-actions' });
    
    const exportBtn = $.el('button', { type: 'button', textContent: (State.lang === 'tr') ? 'PDF İndir' : 'Export PDF' });
    exportBtn.addEventListener('click', () => QuoteExport.exportToPdf(quote));
    
    const convertBtn = $.el('button', { type: 'button', textContent: (State.lang === 'tr') ? 'Taşımaya Dönüştür' : 'Convert to Job' });
    convertBtn.addEventListener('click', () => this.convertToJob(quote));
    
    const deleteBtn = $.el('button', { type: 'button', className: 'btn-danger', textContent: (State.lang === 'tr') ? 'Teklifi Sil' : 'Delete Quote' });
    deleteBtn.addEventListener('click', () => this.deleteQuote(quote));
    
    actions.appendChild(exportBtn);
    actions.appendChild(convertBtn);
    actions.appendChild(deleteBtn);
    container.appendChild(actions);
  },
  
  // Helper to add a detail item to a grid
  addDetailItem(container, label, value) {
    const item = $.el('div', { className: 'detail-item' });
    item.appendChild($.el('span', { className: 'detail-label', textContent: label }));
    item.appendChild($.el('span', { className: 'detail-value', textContent: value || '-' }));
    container.appendChild(item);
  },

  buildChargesSection(mode, charges, quote, formData) {
    const section = $.el('div', { className: 'details-section quote-charges-section' });
    
    const modeColors = { Sea: 'sea', Air: 'air', Land: 'land' };
    const quoteCurrency = quote.quoteCurrency || 'USD';
    
    // Build header with relevant info
    let headerText = '';
    let subInfo = '';
    
    if (mode === 'Sea') {
      const vol = quote.seaVolume || quote.estimatedVolume || 0;
      const container = quote.containerDetails || 'LCL';
      headerText = (State.lang === 'tr') 
        ? `DENİZYOLU (${container}) tahmini toplam hacim: ${vol} cbm`
        : `SEA FREIGHT (${container}) est. total volume: ${vol} cbm`;
      subInfo = `${quote.departurePort || quote.origin || '-'} → POE ${quote.poe || quote.destination || '-'}`;
      if (quote.seaTransitTime) subInfo += (State.lang === 'tr') 
        ? `\nTahmini transit süresi: ${quote.seaTransitTime} gün`
        : `\nEstimated port-to-port transit time: ${quote.seaTransitTime} days`;
    } else if (mode === 'Air') {
      const acw = quote.airACW || 0;
      headerText = (State.lang === 'tr') 
        ? `HAVAYOLU - ${acw.toFixed(1)} kg (ACW)`
        : `AIR FREIGHT - ${acw.toFixed(1)} kg (ACW)`;
      const airline = quote.airlineCarrier ? `via ${quote.airlineCarrier}` : '';
      subInfo = `${quote.departureAirportName || quote.origin || '-'} → ${quote.arrivalAirportName || quote.destination || '-'}`;
      if (airline) subInfo += `\n${airline}`;
      if (quote.airTransitTime) subInfo += (State.lang === 'tr') 
        ? ` - Tahmini transit süresi: ${quote.airTransitTime} gün`
        : ` - Estimated transit time: ${quote.airTransitTime} days`;
    } else if (mode === 'Land') {
      const vol = quote.landVolume || quote.estimatedVolume || 0;
      const truck = quote.truckType || 'Dedicated';
      headerText = (State.lang === 'tr') 
        ? `KARAYOLU (${truck}) tahmini toplam hacim: ${vol} cbm`
        : `LAND FREIGHT (${truck}) est. total volume: ${vol} cbm`;
      subInfo = `${quote.origin || '-'} → ${quote.destination || '-'}`;
      if (quote.landTransitTime) subInfo += (State.lang === 'tr') 
        ? `\nTahmini transit süresi: ${quote.landTransitTime} gün`
        : `\nEstimated transit time: ${quote.landTransitTime} days`;
    }
    
    const header = $.el('h4', { 
      className: `details-section-title mode-${modeColors[mode] || 'default'}`,
      textContent: headerText
    });
    section.appendChild(header);
    
    if (subInfo) {
      const info = $.el('div', { className: 'quote-charges-info', style: 'white-space: pre-line;' });
      info.textContent = subInfo;
      section.appendChild(info);
    }
    
    const table = $.el('table', { className: 'quote-charges-table' });
    
    charges.forEach(charge => {
      const row = $.el('tr');
      const amountDisplay = QuoteUtils.formatChargeAmount(charge);
      row.innerHTML = `
        <td class="charge-category">${charge.category}</td>
        <td class="charge-amount">${amountDisplay}</td>
      `;
      table.appendChild(row);
    });
    
    // Calculate totals (returns null if any variable charges exist)
    const totals = QuoteUtils.calculateTotals(charges);
    const totalText = QuoteUtils.formatTotals(totals);
    
    if (totalText) {
      const totalRow = $.el('tr', { className: 'total-row' });
      totalRow.innerHTML = `
        <td class="charge-category">TOTAL (${mode})</td>
        <td class="charge-amount">${totalText}</td>
      `;
      table.appendChild(totalRow);
    }
    
    section.appendChild(table);
    return section;
  },

  async deleteQuote(quote) {
    const confirmed = await Modals.confirm({
      title: (State.lang === 'tr') ? 'Teklifi Sil' : 'Delete Quote',
      message: (State.lang === 'tr') ? 'Bu teklifi silmek istediğinize emin misiniz?' : 'Are you sure you want to delete this quote?',
      danger: true,
      confirmText: (State.lang === 'tr') ? 'Sil' : 'Delete'
    });
    if (!confirmed) return;
    
    State.quotes = State.quotes.filter(q => q.id !== quote.id);
    Storage.saveQuotes();
    this.render();
    
    const container = $.get('quoteDetails');
    $.clear(container);
    container.appendChild($.el('p', { textContent: I18n.t('selectQuoteToSee') }));
    
    const editBtn = $.get('editQuoteBtn');
    if (editBtn) editBtn.disabled = true;
    
    State.selectedQuoteId = null;
  },

  async convertToJob(quote) {
  const confirmed = await Modals.confirm({
    title: (State.lang === 'tr') ? 'Taşımaya Dönüştür' : 'Convert to Move',
    message: (State.lang === 'tr') ? 'Bu teklif taşımaya dönüştürülsün mü?' : 'Convert this quote to a move? The quote will be marked as approved.',
    confirmText: (State.lang === 'tr') ? 'Dönüştür' : 'Convert'
  });
  
  if (!confirmed) return;
  
  // Convert quote charges to job chargeItems
  // Only fixed charges get amount, variable charges get description only (amount = 0)
  const chargeItems = [];
  if (quote.chargesByMode) {
    Object.keys(quote.chargesByMode).forEach(mode => {
      const charges = quote.chargesByMode[mode] || [];
      charges.forEach(charge => {
        const displayType = charge.displayType || (charge.isPerAcw ? 'ratePerKgACW' : 'fixed');
        const isFixed = displayType === 'fixed';
        
        chargeItems.push({
          category: 'Moving',
          description: charge.description || charge.category || mode,
          amount: isFixed ? (charge.amount || 0) : 0, // Only fixed charges transfer amount
          currency: charge.currency || quote.quoteCurrency || 'USD',
          notes: isFixed ? '' : `Quote rate: ${displayType}` // Note the original rate type
        });
      });
    });
  }
  
  const job = Validator.normalizeJob({
    clientName: quote.clientName,
    organizationName: quote.clientOrganization || '',
    originCity: quote.origin.split(',')[0]?.trim() || '',
    originCountry: quote.origin.split(',').slice(1).join(',').trim() || '',
    originFullAddress: quote.origin,
    destinationCity: quote.destination.split(',')[0]?.trim() || '',
    destinationCountry: quote.destination.split(',').slice(1).join(',').trim() || '',
    destinationFullAddress: quote.destination,
    tradeDirection: quote.type,
    modes: quote.modes,
    status: 'Planned',
    paymentReceived: false,
    shipmentContents: quote.shipmentContents || ['HHE'],
    
    // Link to quote
    linkedQuoteId: quote.id,
    
    // Copy charges
    chargeItems: chargeItems,
    quotedTotal: quote.grandTotal || 0,
    currency: quote.quoteCurrency || 'USD',
    
    // Mode-specific fields from quote
    seaVolume: quote.seaVolume || 0,
    containerDetails: quote.containerDetails || '',
    airVolume: quote.airVolume || 0,
    airCargoWeight: quote.airCargoWeight || 0,
    airACW: quote.airACW || 0,
    landVolume: quote.landVolume || 0,
    
    // Vehicle fields from quote
    vehicleType: quote.vehicleType || '',
    vehicleMake: quote.vehicleMake || '',
    vehicleModel: quote.vehicleModel || '',
    vehicleYear: quote.vehicleYear || 0,
    vehicleVIN: quote.vehicleVIN || '',
    vehicleCondition: quote.vehicleCondition || 'Running'
  });
  
  // Mark quote as converted
  quote.convertedToJobId = job.id;
  quote.status = 'Approved';
  Storage.saveQuotes();
  
  State.jobs.push(job);
  Storage.saveJobs();
  
  Views.show('moves');
  JobsUI.render();
  JobsUI.showDetails(job);
},

  showModal(quote = null) {
    State.quoteFormMode = quote ? 'edit' : 'create';
    const form = $.get('quoteForm');
    
    if (!form) {
      Modals.alert({ title: 'Error', message: 'Quote form not found' });
      return;
    }
    
    form.reset();
    this.clearAllChargeLists();
    this.clearChecklists();
    this.hideAllModeSections();
    
    if (quote) {
      $.get('quoteModalTitle').textContent = 'Edit Quote';
      State.selectedQuoteId = quote.id;
      this.populateFormForEdit(quote);
    } else {
      $.get('quoteModalTitle').textContent = 'Create New Quote';
      State.selectedQuoteId = null;
      
      const threeMonths = new Date();
      threeMonths.setMonth(threeMonths.getMonth() + 3);
      const isoDate = threeMonths.toISOString().split('T')[0];
      form.validUntil.value = Utils.formatDateForInput(isoDate);
      
      form.termsAndConditions.value = 'Our quotation is based on stated weights and normal access conditions. It is subject to change if actual volume/weight differs or if there are unforeseen difficulties (e.g. inspections, force majeure delays, etc.)';
      
      $.show($.get('noModeSelectedMsg'));
    }
    
    Modals.open('createQuoteModal');
  },

  hideAllModeSections() {
    ['Sea', 'Air', 'Land'].forEach(mode => {
      const fieldsSection = $.get(`${mode.toLowerCase()}FieldsSection`);
      const chargesSection = $.get(`${mode.toLowerCase()}ChargesSection`);
      if (fieldsSection) $.hide(fieldsSection);
      if (chargesSection) $.hide(chargesSection);
    });
  },

  clearAllChargeLists() {
    ['seaChargesList', 'airChargesList', 'landChargesList'].forEach(id => {
      const list = $.get(id);
      if (list) $.clear(list);
    });
  },

  clearChecklists() {
    const includesContainer = $.get('quotationIncludesChecklist');
    if (includesContainer) {
      $.clear(includesContainer);
      includesContainer.appendChild($.el('p', { 
        textContent: I18n.t('selectModeAndType'),
        style: 'color: #9ca3af; font-size: 13px; font-style: italic;'
      }));
    }
    
    const additionalContainer = $.get('additionalChargesChecklist');
    if (additionalContainer) {
      $.clear(additionalContainer);
      additionalContainer.appendChild($.el('p', { 
        textContent: I18n.t('selectTypeToSee'),
        style: 'color: #9ca3af; font-size: 13px; font-style: italic;'
      }));
    }
    
    const customIncludesList = $.get('customIncludedItems');
    if (customIncludesList) $.clear(customIncludesList);
    
    const customAdditionalList = $.get('additionalChargesList');
    if (customAdditionalList) $.clear(customAdditionalList);
  },

  populateFormForEdit(quote) {
    const form = $.get('quoteForm');
    
    form.clientName.value = quote.clientName || '';
    if (form.clientOrganization) form.clientOrganization.value = quote.clientOrganization || '';
    form.origin.value = quote.origin || '';
    form.destination.value = quote.destination || '';
    form.quoteType.value = quote.type || 'Export';
    
    // Recipient type
    const recipientSelect = $.get('quoteRecipientType');
    if (recipientSelect) recipientSelect.value = quote.recipientType || 'Client';
    
    form.termsAndConditions.value = quote.termsAndConditions || '';
    form.validUntil.value = Utils.formatDateForInput(quote.validUntil) || '';
    
    // Set mode checkboxes
    ['Sea', 'Air', 'Land'].forEach(mode => {
      const cb = $.get(`quoteMode${mode}`);
      if (cb) cb.checked = (quote.modes || []).includes(mode);
    });
    
    // Show/hide mode sections WITHOUT auto-populating charges
    const selectedModes = (quote.modes || []);
    ['Sea', 'Air', 'Land'].forEach(mode => {
      const fieldsSection = $.get(`${mode.toLowerCase()}FieldsSection`);
      const chargesSection = $.get(`${mode.toLowerCase()}ChargesSection`);
      const shouldShow = selectedModes.includes(mode);
      if (fieldsSection) {
        if (shouldShow) $.show(fieldsSection);
        else $.hide(fieldsSection);
      }
      if (chargesSection) {
        if (shouldShow) $.show(chargesSection);
        else $.hide(chargesSection);
      }
    });
    
    const noModeMsg = $.get('noModeSelectedMsg');
    if (noModeMsg) {
      if (selectedModes.length === 0) $.show(noModeMsg);
      else $.hide(noModeMsg);
    }
    
    // Apply context-aware field visibility
    this.updateContextAwareFields(quote.type || 'Export', quote.recipientType || 'Client');
    
    // Sea fields
    if (form.departurePort) form.departurePort.value = quote.departurePort || '';
    if (form.poe) form.poe.value = quote.poe || '';
    if (form.containerDetails) form.containerDetails.value = quote.containerDetails || '';
    if (form.seaTransitTime) form.seaTransitTime.value = quote.seaTransitTime || '';
    if (form.seaVolume) form.seaVolume.value = quote.seaVolume || '';
    
    // Air fields
    if (form.departureAirportName) form.departureAirportName.value = quote.departureAirportName || '';
    if (form.departureAirportIATA) form.departureAirportIATA.value = quote.departureAirportIATA || '';
    if (form.arrivalAirportName) form.arrivalAirportName.value = quote.arrivalAirportName || '';
    if (form.arrivalAirportIATA) form.arrivalAirportIATA.value = quote.arrivalAirportIATA || '';
    if (form.airlineName) form.airlineName.value = quote.airlineName || '';
    if (form.airTransitTime) form.airTransitTime.value = quote.airTransitTime || '';
    if (form.airCargoWeight) form.airCargoWeight.value = quote.airCargoWeight || '';
    if (form.airVolume) form.airVolume.value = quote.airVolume || '';
    if (form.airACW) form.airACW.value = quote.airACW || '';
    
    // Air quote type
if (quote.airQuoteType) {
  const radio = form.querySelector(`input[name="airQuoteType"][value="${quote.airQuoteType}"]`);
  if (radio) radio.checked = true;
}
    // Shipment Contents
['HHE', 'Vehicle'].forEach(content => {
  const cb = $.get(`quoteContents${content}`);
  if (cb) cb.checked = (quote.shipmentContents || ['HHE']).includes(content);
});

// Vehicle fields
if (form.quoteVehicleType) form.quoteVehicleType.value = quote.vehicleType || '';
if (form.quoteVehicleMake) form.quoteVehicleMake.value = quote.vehicleMake || '';
if (form.quoteVehicleModel) form.quoteVehicleModel.value = quote.vehicleModel || '';
if (form.quoteVehicleYear) form.quoteVehicleYear.value = quote.vehicleYear || '';
if (form.quoteVehicleVIN) form.quoteVehicleVIN.value = quote.vehicleVIN || '';
const vehicleConditionRadio = form.querySelector(`input[name="quoteVehicleCondition"][value="${quote.vehicleCondition || 'Running'}"]`);
if (vehicleConditionRadio) vehicleConditionRadio.checked = true;

// Show/hide vehicle fields
toggleQuoteVehicleFields();
    
    
    // Land fields
    if (quote.truckType) {
      const radio = form.querySelector(`input[name="truckType"][value="${quote.truckType}"]`);
      if (radio) radio.checked = true;
    }
    if (form.landTransitTime) form.landTransitTime.value = quote.landTransitTime || '';
    if (form.landVolume) form.landVolume.value = quote.landVolume || '';
    
    // Insurance
    const insuranceYes = form.querySelector('input[name="insurance"][value="yes"]');
    const insuranceNo = form.querySelector('input[name="insurance"][value="no"]');
    if (quote.insurance) {
      if (insuranceYes) insuranceYes.checked = true;
      this.toggleInsuranceFields(true);
      if (form.hhgValue) form.hhgValue.value = quote.hhgValue || '';
      if (form.hhgCurrency) form.hhgCurrency.value = quote.hhgCurrency || 'USD';
      if (form.insurancePercentage) form.insurancePercentage.value = quote.insurancePercentage || 1.5;
if (form.quoteCurrency) form.quoteCurrency.value = quote.quoteCurrency || 'USD';
    } else {
      if (insuranceNo) insuranceNo.checked = true;
      this.toggleInsuranceFields(false);
    }
    
    // NOW populate charges from saved data (not auto-populate)
    if (quote.chargesByMode) {
      Object.keys(quote.chargesByMode).forEach(mode => {
        const charges = quote.chargesByMode[mode] || [];
        charges.forEach(charge => {
          const displayType = charge.displayType || (charge.isPerAcw ? 'ratePerKgACW' : 'fixed');
          this.addChargeRow(mode, charge.category, charge.amount, '', displayType, charge.rangeMax || '');
        });
      });
    }
    
    // Update checklists
    this.updateChecklists();
    
    // Consignment instructions restoration
    const includeConsignmentCb = $.get('includeConsignmentInstructions');
    const officeSelect = $.get('quoteConsignmentOffice');
    const foreignCb = $.get('includeForeignNational');
    const turkishCb = $.get('includeReturningTurkish');
    const diplomaticCb = $.get('includeDiplomatic');
    
    if (includeConsignmentCb) {
      includeConsignmentCb.checked = quote.includeConsignmentInstructions || false;
      this.toggleConsignmentOptions(includeConsignmentCb.checked);
    }
    if (officeSelect) {
      officeSelect.value = quote.consignmentOffice || 'Istanbul';
    }
    if (foreignCb) {
      foreignCb.checked = quote.includeForeignNational || false;
    }
    if (turkishCb) {
      turkishCb.checked = quote.includeReturningTurkish || false;
    }
    if (diplomaticCb) {
      diplomaticCb.checked = quote.includeDiplomatic || false;
    }
    this.updateConsignmentPreview();
    
    // Set selected checkboxes after a brief delay to let DOM update
    setTimeout(() => {
      if (quote.selectedIncludes) {
        document.querySelectorAll('#quotationIncludesChecklist input[type="checkbox"]').forEach(cb => {
          cb.checked = quote.selectedIncludes.includes(cb.value);
        });
      }
      if (quote.selectedAdditionalCharges) {
        document.querySelectorAll('#additionalChargesChecklist input[type="checkbox"]').forEach(cb => {
          cb.checked = quote.selectedAdditionalCharges.includes(cb.value);
        });
      }
    }, 100);
  },

  updateModeFields() {
    const selectedModes = this.getSelectedModes();
    const type = this.getSelectedType();
    const recipientType = this.getRecipientType();
    
    ['Sea', 'Air', 'Land'].forEach(mode => {
      const fieldsSection = $.get(`${mode.toLowerCase()}FieldsSection`);
      const chargesSection = $.get(`${mode.toLowerCase()}ChargesSection`);
      
      const shouldShow = selectedModes.includes(mode);
      
      if (fieldsSection) {
        if (shouldShow) $.show(fieldsSection);
        else $.hide(fieldsSection);
      }
      if (chargesSection) {
        if (shouldShow) $.show(chargesSection);
        else $.hide(chargesSection);
      }
      
      if (shouldShow && type) {
        this.autoPopulateCharges(mode, type);
      }
    });
    
    const noModeMsg = $.get('noModeSelectedMsg');
    if (noModeMsg) {
      if (selectedModes.length === 0) $.show(noModeMsg);
      else $.hide(noModeMsg);
    }
    
    // Apply context-aware field visibility
    this.updateContextAwareFields(type, recipientType);
    
    this.updateChecklists();
  },

  // Get the recipient type (Client or Agent)
  getRecipientType() {
    const select = $.get('quoteRecipientType');
    return select ? select.value : 'Client';
  },

  // Update field visibility based on quote type (Import/Export)
  // Both Client and Agent see all fields - differences are in charges and PDF output
  updateContextAwareFields(type, recipientType) {
    const isImport = type === 'Import';
    
    // All technical fields are always visible for form entry
    // The difference is only in what appears in the PDF (hide empty fields)
    
    // SEA FIELDS - always show for Export, always show for Import too (user may fill them)
    const seaDepartureField = $.get('seaDeparturePortField');
    const seaTransitField = $.get('seaTransitTimeField');
    
    if (seaDepartureField) $.show(seaDepartureField);
    if (seaTransitField) $.show(seaTransitField);
    
    // AIR FIELDS - always show
    const airDepartureFields = $.get('airDepartureFields');
    const airAirlineField = $.get('airAirlineField');
    const airTransitField = $.get('airTransitTimeField');
    
    if (airDepartureFields) $.show(airDepartureFields);
    if (airAirlineField) $.show(airAirlineField);
    if (airTransitField) $.show(airTransitField);
    
    // Show/hide consignment instructions section based on type
    // Only show for Import quotes
    const consignmentSection = $.get('consignmentInstructionsSection');
    if (consignmentSection) {
      if (isImport) $.show(consignmentSection);
      else $.hide(consignmentSection);
    }
  },

  // Toggle consignment instructions options visibility
  toggleConsignmentOptions(show) {
    const wrapper = $.get('consignmentOptionsWrapper');
    if (wrapper) {
      if (show) wrapper.classList.remove('hidden');
      else wrapper.classList.add('hidden');
    }
    
    if (show) {
      this.updateConsignmentPreview();
    }
  },

  // Update the consignment preview based on selected office and checkboxes
  updateConsignmentPreview() {
    const preview = $.get('consignmentPreview');
    const officeSelect = $.get('quoteConsignmentOffice');
    if (!preview) return;
    
    const office = officeSelect?.value || 'Istanbul';
    
    // Build preview HTML
    let html = '<div style="margin-bottom: 16px;">';
    html += '<strong>CONSIGNMENT INSTRUCTION</strong><br>';
    html += '<span style="color: #6b7280; font-size: 11px;">(for express release Bill of Lading)</span><br><br>';
    html += CONSIGNMENT_INSTRUCTIONS.getConsigneeTemplate(office).replace(/\n/g, '<br>');
    html += '</div>';
    
    // Check which requirement types are selected
    const includeForeign = $.get('includeForeignNational')?.checked;
    const includeTurkish = $.get('includeReturningTurkish')?.checked;
    const includeDiplomatic = $.get('includeDiplomatic')?.checked;
    
    if (includeForeign) {
      const data = CONSIGNMENT_INSTRUCTIONS.foreign_national;
      html += this.formatRequirementSection(data);
    }
    
    if (includeTurkish) {
      const data = CONSIGNMENT_INSTRUCTIONS.returning_turkish;
      html += this.formatRequirementSection(data);
    }
    
    if (includeDiplomatic) {
      const data = CONSIGNMENT_INSTRUCTIONS.diplomatic;
      html += this.formatRequirementSection(data);
    }
    
    if (!includeForeign && !includeTurkish && !includeDiplomatic) {
      html += '<p style="color: #6b7280; font-style: italic; font-size: 11px;">No import requirement sections selected. Only consignment address will be included.</p>';
    }
    
    preview.innerHTML = html;
  },
  
  formatRequirementSection(data) {
    let html = '<div style="margin-top: 16px; padding-top: 16px; border-top: 1px solid #e5e7eb;">';
    html += `<strong>${data.title}</strong><br><br>`;
    html += `<p style="margin-bottom: 8px; font-size: 11px;">${data.description}</p>`;
    
    if (data.note) {
      html += `<p style="margin-bottom: 8px; color: #b45309; font-style: italic; font-size: 11px;">${data.note}</p>`;
    }
    
    html += '<strong style="font-size: 11px;">Required documents:</strong><ul style="margin: 8px 0; padding-left: 20px; font-size: 11px;">';
    data.documents.forEach(doc => {
      html += `<li style="margin: 4px 0;">${doc}</li>`;
    });
    html += '</ul></div>';
    
    return html;
  },

  // Get consignment instructions text for PDF export
  getConsignmentInstructionsText(quote) {
    const office = quote.consignmentOffice || 'Istanbul';
    let text = CONSIGNMENT_INSTRUCTIONS.getConsigneeTemplate(office);
    
    // Add selected requirement sections
    const sections = [];
    if (quote.includeForeignNational) sections.push('foreign_national');
    if (quote.includeReturningTurkish) sections.push('returning_turkish');
    if (quote.includeDiplomatic) sections.push('diplomatic');
    
    sections.forEach(key => {
      const data = CONSIGNMENT_INSTRUCTIONS[key];
      if (!data) return;
      
      text += '\n\n\n';
      text += data.title + '\n\n';
      text += data.description + '\n\n';
      
      if (data.note) {
        text += data.note + '\n\n';
      }
      
      text += 'Required documents for import clearance:\n\n';
      data.documents.forEach(doc => {
        text += '- ' + doc + '\n';
      });
    });
    
    return text;
  },


  autoPopulateCharges(mode, type) {
    const listId = `${mode.toLowerCase()}ChargesList`;
    const container = $.get(listId);
    if (!container) return;
    
    if (container.children.length > 0) return;
    
    // Get recipient type
    const recipientType = this.getRecipientType();
    
    // Get raw categories from template
    const tpl = QuoteUtils.getTemplate(mode, type, recipientType);
    if (!tpl) return;
    
    const formData = this.getFormDataForPlaceholders();
    const rawCategories = tpl.chargeCategories || [];
    
    rawCategories.forEach(cat => {
      // Replace placeholders that have values, keep others intact
      let processed = cat;
      if (formData.origin) processed = processed.replace(/\[ORIGIN\]/gi, formData.origin);
      if (formData.destination) processed = processed.replace(/\[DESTINATION\]/gi, formData.destination);
      if (formData.departurePort) processed = processed.replace(/\[DEPARTURE_PORT\]/gi, formData.departurePort);
      if (formData.poe) processed = processed.replace(/\[POE\]/gi, formData.poe);
      if (formData.containerDetails) processed = processed.replace(/\[CONTAINER_DETAILS\]/gi, formData.containerDetails);
      if (formData.departureAirportName) processed = processed.replace(/\[DEPARTURE_AIRPORT\]/gi, formData.departureAirportName);
      if (formData.arrivalAirportName) processed = processed.replace(/\[ARRIVAL_AIRPORT\]/gi, formData.arrivalAirportName);
      if (formData.truckType) processed = processed.replace(/\[TRUCK_TYPE\]/gi, formData.truckType);
      
      this.addChargeRow(mode, processed, '', 'USD');
    });
  },
  
  refreshChargeCategoryPlaceholders() {
    const formData = this.getFormDataForPlaceholders();
    
    ['Sea', 'Air', 'Land'].forEach(mode => {
      const listId = `${mode.toLowerCase()}ChargesList`;
      const container = $.get(listId);
      if (!container) return;
      
      container.querySelectorAll('.charge-category-input').forEach(input => {
        // Only replace if it still contains a placeholder AND we have a value to replace with
        if (input.value.includes('[DEPARTURE_AIRPORT]') && formData.departureAirportName) {
          input.value = input.value.replace(/\[DEPARTURE_AIRPORT\]/gi, formData.departureAirportName);
        }
        if (input.value.includes('[ARRIVAL_AIRPORT]') && formData.arrivalAirportName) {
          input.value = input.value.replace(/\[ARRIVAL_AIRPORT\]/gi, formData.arrivalAirportName);
        }
        if (input.value.includes('[DEPARTURE_PORT]') && formData.departurePort) {
          input.value = input.value.replace(/\[DEPARTURE_PORT\]/gi, formData.departurePort);
        }
        if (input.value.includes('[POE]') && formData.poe) {
          input.value = input.value.replace(/\[POE\]/gi, formData.poe);
        }
        if (input.value.includes('[CONTAINER_DETAILS]') && formData.containerDetails) {
          input.value = input.value.replace(/\[CONTAINER_DETAILS\]/gi, formData.containerDetails);
        }
      });
    });
  },

  getSelectedModes() {
    const modes = [];
    ['Sea', 'Air', 'Land'].forEach(mode => {
      const cb = $.get(`quoteMode${mode}`);
      if (cb && cb.checked) modes.push(mode);
    });
    return modes;
  },

  getSelectedType() {
    const form = $.get('quoteForm');
    return form?.quoteType?.value || '';
  },

  getFormDataForPlaceholders() {
    const form = $.get('quoteForm');
    if (!form) return {};
    return {
      origin: form.origin?.value || '',
      destination: form.destination?.value || '',
      departurePort: form.departurePort?.value || '',
      poe: form.poe?.value || '',
      containerDetails: form.containerDetails?.value || '',
      departureAirportName: form.departureAirportName?.value || '',
      arrivalAirportName: form.arrivalAirportName?.value || '',
      departureAirportIATA: form.departureAirportIATA?.value || '',
      arrivalAirportIATA: form.arrivalAirportIATA?.value || '',
      truckType: form.querySelector('input[name="truckType"]:checked')?.value || 'Dedicated'
    };
  },

  toggleInsuranceFields(show) {
    const insuranceFields = $.get('insuranceFields');
    if (insuranceFields) {
      if (show) $.show(insuranceFields);
      else $.hide(insuranceFields);
    }
  },

  updateChecklists() {
    const selectedModes = this.getSelectedModes();
    const type = this.getSelectedType();
    const recipientType = this.getRecipientType();
    const formData = this.getFormDataForPlaceholders();
    
    const includesContainer = $.get('quotationIncludesChecklist');
    if (includesContainer) {
      $.clear(includesContainer);
      
      if (selectedModes.length === 0 || !type) {
        includesContainer.appendChild($.el('p', { 
          textContent: I18n.t('selectModeAndType'),
          style: 'color: #9ca3af; font-size: 13px; font-style: italic;'
        }));
      } else {
        const addedItems = new Set();
        
        selectedModes.forEach(mode => {
          if (selectedModes.length > 1) {
            includesContainer.appendChild($.el('div', { 
              textContent: `${mode} Freight Items:`,
              style: 'font-weight: 600; margin-top: 8px; margin-bottom: 4px; color: #374151;'
            }));
          }
          
          const baseIncludes = QuoteUtils.getBaseIncludes(mode, type, formData, recipientType);
          baseIncludes.forEach(item => {
            if (!addedItems.has(item)) {
              addedItems.add(item);
              this.addChecklistItem(includesContainer, item, true);
            }
          });
          
          const tpl = QuoteUtils.getTemplate(mode, type, recipientType);
          if (tpl && tpl.conditionalIncludes && Object.keys(tpl.conditionalIncludes).length > 0) {
            includesContainer.appendChild($.el('div', { 
              textContent: 'Additional items (if corresponding charges included):',
              style: 'font-size: 11px; color: #6b7280; margin-top: 8px; margin-bottom: 4px;'
            }));
            
            Object.keys(tpl.conditionalIncludes).forEach(key => {
              tpl.conditionalIncludes[key].forEach(item => {
                const replaced = QuoteUtils.replacePlaceholders(item, formData);
                if (!addedItems.has(replaced)) {
                  addedItems.add(replaced);
                  this.addChecklistItem(includesContainer, replaced, false, `If "${key}" charge included`);
                }
              });
            });
          }
        });
      }
    }
    
    const additionalContainer = $.get('additionalChargesChecklist');
    if (additionalContainer) {
      $.clear(additionalContainer);
      
      if (!type) {
        additionalContainer.appendChild($.el('p', { 
          textContent: I18n.t('selectTypeToSee'),
          style: 'color: #9ca3af; font-size: 13px; font-style: italic;'
        }));
      } else {
        const form = $.get('quoteForm');
        const hasInsurance = form?.querySelector('input[name="insurance"]:checked')?.value === 'yes';
        const hasVehicle = $.get('quoteContentsVehicle')?.checked || false;
const items = QuoteUtils.getAdditionalChargesMayApply(type, selectedModes, hasInsurance, hasVehicle);
        
        items.forEach(item => {
          this.addChecklistItem(additionalContainer, item, true);
        });
      }
    }
  },

  addChecklistItem(container, text, checked, hint = '') {
    const label = $.el('label', { 
      style: 'display: block; margin: 6px 0; font-size: 13px; cursor: pointer;'
    });
    const checkbox = $.el('input', { 
      type: 'checkbox', 
      value: text,
      style: 'margin-right: 8px;'
    });
    checkbox.checked = checked;
    label.appendChild(checkbox);
    
    if (hint) {
      label.appendChild(document.createTextNode(`${text} `));
      label.appendChild($.el('span', { 
        textContent: `(${hint})`,
        style: 'color: #9ca3af; font-size: 11px;'
      }));
    } else {
      label.appendChild(document.createTextNode(text));
    }
    
    container.appendChild(label);
  },

  addChargeRow(mode, category = '', amount = '', currency = '', displayType = 'fixed', rangeMax = '') {
  const listId = `${mode.toLowerCase()}ChargesList`;
  const container = $.get(listId);
  if (!container) return;
  
  const row = $.el('div', { 
    className: 'charge-row',
    style: 'display: grid; grid-template-columns: 2fr 110px 1fr 32px; gap: 8px; margin-bottom: 8px; align-items: center;'
  });
  
  // Category input
  const categoryInput = $.el('input', { 
    type: 'text', 
    placeholder: (State.lang === 'tr') ? 'Masraf açıklaması' : 'Charge description',
    className: 'charge-category-input',
    value: category
  });
  
  // Display type selector (Fixed, /kg ACW, /CBM, Range)
  const typeSelect = $.el('select', { className: 'charge-type-select', style: 'padding: 6px; font-size: 13px;' });
  const typeOptions = [
    { value: 'fixed', label: (State.lang === 'tr') ? 'Sabit' : 'Fixed' },
    { value: 'ratePerKgACW', label: '/kg ACW' },
    { value: 'ratePerCBM', label: '/CBM' },
    { value: 'range', label: (State.lang === 'tr') ? 'Aralık' : 'Range' }
  ];
  typeOptions.forEach(opt => {
    const option = $.el('option', { value: opt.value, textContent: opt.label });
    if (opt.value === displayType) option.selected = true;
    typeSelect.appendChild(option);
  });
  
  // Amount container - simplified, no currency labels
  const amountContainer = $.el('div', { className: 'charge-amount-container', style: 'display: flex; gap: 4px; align-items: center;' });
  
  const updateAmountInputs = () => {
    $.clear(amountContainer);
    const type = typeSelect.value;
    
    if (type === 'range') {
      const minInput = $.el('input', { 
        type: 'number', 
        step: '0.01',
        placeholder: 'Min',
        className: 'charge-amount-input',
        value: amount,
        style: 'width: 65px;'
      });
      const dash = $.el('span', { textContent: '–', style: 'margin: 0 2px; color: #6b7280;' });
      const maxInput = $.el('input', { 
        type: 'number', 
        step: '0.01',
        placeholder: 'Max',
        className: 'charge-range-max',
        value: rangeMax,
        style: 'width: 65px;'
      });
      amountContainer.appendChild(minInput);
      amountContainer.appendChild(dash);
      amountContainer.appendChild(maxInput);
    } else {
      // Fixed, ratePerKgACW, ratePerCBM - all just need a single amount/rate input
      const amountInput = $.el('input', { 
        type: 'number', 
        step: '0.01',
        placeholder: type === 'fixed' ? ((State.lang === 'tr') ? 'Tutar' : 'Amount') : ((State.lang === 'tr') ? 'Oran' : 'Rate'),
        className: 'charge-amount-input',
        value: amount,
        style: 'flex: 1;'
      });
      amountContainer.appendChild(amountInput);
    }
  };
  
  typeSelect.addEventListener('change', updateAmountInputs);
  updateAmountInputs();
  
  // Delete button
  const deleteBtn = $.el('button', { 
    type: 'button', 
    textContent: '×',
    style: 'background: #ef4444; color: white; border: none; width: 28px; height: 28px; border-radius: 4px; cursor: pointer; font-size: 16px; line-height: 1;'
  });
  deleteBtn.addEventListener('click', () => row.remove());
  
  row.appendChild(categoryInput);
  row.appendChild(typeSelect);
  row.appendChild(amountContainer);
  row.appendChild(deleteBtn);
  
  container.appendChild(row);
},

  handleFormSubmit(e) {
    e.preventDefault();
    const form = $.get('quoteForm');
    
    const modes = this.getSelectedModes();
    
    if (modes.length === 0) {
      Modals.alert({ title: (State.lang === 'tr') ? 'Uyarı' : 'Warning', message: (State.lang === 'tr') ? 'En az bir mod seçin (Deniz, Hava veya Kara)' : 'Please select at least one mode (Sea, Air, or Land)' });
      return;
    }
    
    const type = this.getSelectedType();
    if (!type) {
      Modals.alert({ title: (State.lang === 'tr') ? 'Uyarı' : 'Warning', message: (State.lang === 'tr') ? 'Tip seçin (İhracat, İthalat veya Yurtiçi)' : 'Please select a type (Export, Import, or Local)' });
      return;
    }
    
    const quoteCurrency = form.quoteCurrency?.value || 'USD';

const chargesByMode = {};
modes.forEach(mode => {
  const listId = `${mode.toLowerCase()}ChargesList`;
  const container = $.get(listId);
  if (!container) return;
  
  chargesByMode[mode] = [];
  container.querySelectorAll('.charge-row').forEach(row => {
    const category = row.querySelector('.charge-category-input')?.value.trim();
    const displayType = row.querySelector('.charge-type-select')?.value || 'fixed';
    const amount = parseFloat(row.querySelector('.charge-amount-input')?.value) || 0;
    const rangeMax = parseFloat(row.querySelector('.charge-range-max')?.value) || 0;
    
    if (category) {
      chargesByMode[mode].push({ 
        category, 
        amount, 
        currency: quoteCurrency,
        displayType: displayType,
        rangeMax: rangeMax
      });
    }
  });
});
    
    const selectedIncludes = [];
    document.querySelectorAll('#quotationIncludesChecklist input[type="checkbox"]:checked').forEach(cb => {
      selectedIncludes.push(cb.value);
    });
    
    const customIncludesList = $.get('customIncludedItems');
    if (customIncludesList) {
      customIncludesList.querySelectorAll('li span').forEach(span => {
        const text = span.textContent?.trim();
        if (text) selectedIncludes.push(text);
      });
    }
    
    const selectedAdditionalCharges = [];
    document.querySelectorAll('#additionalChargesChecklist input[type="checkbox"]:checked').forEach(cb => {
      selectedAdditionalCharges.push(cb.value);
    });
    
    const customAdditionalList = $.get('additionalChargesList');
    if (customAdditionalList) {
      customAdditionalList.querySelectorAll('li span').forEach(span => {
        const text = span.textContent?.trim();
        if (text) selectedAdditionalCharges.push(text);
      });
    }
    
    const quote = {
      clientName: form.clientName.value.trim(),
      clientOrganization: form.clientOrganization?.value.trim() || '',
      origin: form.origin.value.trim(),
      destination: form.destination.value.trim(),
      type: type,
      recipientType: this.getRecipientType(),
      modes: modes,
      shipmentContents: Array.from(document.querySelectorAll('input[name="quoteContents"]:checked')).map(cb => cb.value),
      quoteCurrency: quoteCurrency,
      chargesByMode: chargesByMode,
      selectedIncludes: selectedIncludes,
      selectedAdditionalCharges: selectedAdditionalCharges,
      termsAndConditions: form.termsAndConditions?.value.trim() || '',
      validUntil: Utils.parseDate(form.validUntil?.value) || '',
      departurePort: form.departurePort?.value.trim() || '',
      poe: form.poe?.value.trim() || '',
      containerDetails: form.containerDetails?.value.trim() || '',
      seaTransitTime: parseInt(form.seaTransitTime?.value) || 0,
      seaVolume: parseFloat(form.seaVolume?.value) || 0,
      departureAirportName: form.departureAirportName?.value.trim() || '',
      departureAirportIATA: (form.departureAirportIATA?.value || '').toUpperCase().trim(),
      arrivalAirportName: form.arrivalAirportName?.value.trim() || '',
      arrivalAirportIATA: (form.arrivalAirportIATA?.value || '').toUpperCase().trim(),
      airlineName: form.airlineName?.value.trim() || '',
      airCargoWeight: parseFloat(form.airCargoWeight?.value) || 0,
      airTransitTime: parseInt(form.airTransitTime?.value) || 0,
      airVolume: parseFloat(form.airVolume?.value) || 0,
      airACW: parseFloat(form.airACW?.value) || 0,
      // Per-mode insurance
      seaInsurance: $.get('seaInsuranceCheck')?.checked || false,
      seaInsuranceValue: parseFloat(form.seaInsuranceValue?.value) || 0,
      seaInsuranceRate: parseFloat(form.seaInsuranceRate?.value) || 1.5,
      airInsurance: $.get('airInsuranceCheck')?.checked || false,
      airInsuranceValue: parseFloat(form.airInsuranceValue?.value) || 0,
      airInsuranceRate: parseFloat(form.airInsuranceRate?.value) || 1.5,
      landInsurance: $.get('landInsuranceCheck')?.checked || false,
      landInsuranceValue: parseFloat(form.landInsuranceValue?.value) || 0,
      landInsuranceRate: parseFloat(form.landInsuranceRate?.value) || 1.5,
      // Vehicle fields
vehicleType: form.quoteVehicleType?.value || '',
vehicleMake: form.quoteVehicleMake?.value.trim() || '',
vehicleModel: form.quoteVehicleModel?.value.trim() || '',
vehicleYear: parseInt(form.quoteVehicleYear?.value) || 0,
vehicleVIN: form.quoteVehicleVIN?.value.trim() || '',
vehicleCondition: form.querySelector('input[name="quoteVehicleCondition"]:checked')?.value || 'Running',
      truckType: form.querySelector('input[name="truckType"]:checked')?.value || 'Dedicated',
      landTransitTime: parseInt(form.landTransitTime?.value) || 0,
      landVolume: parseFloat(form.landVolume?.value) || 0,
      estimatedVolume: parseFloat(form.seaVolume?.value) || parseFloat(form.airVolume?.value) || parseFloat(form.landVolume?.value) || 0,
      // Consignment instructions
      includeConsignmentInstructions: $.get('includeConsignmentInstructions')?.checked || false,
      consignmentOffice: $.get('quoteConsignmentOffice')?.value || 'Istanbul',
      includeForeignNational: $.get('includeForeignNational')?.checked || false,
      includeReturningTurkish: $.get('includeReturningTurkish')?.checked || false,
      includeDiplomatic: $.get('includeDiplomatic')?.checked || false
    };
    
    // Handle per-mode insurance
    const quoteCurr = quote.quoteCurrency || 'USD';
    ['Sea', 'Air', 'Land'].forEach(mode => {
      const modeLower = mode.toLowerCase();
      const hasInsurance = quote[`${modeLower}Insurance`];
      const insValue = quote[`${modeLower}InsuranceValue`];
      const insRate = quote[`${modeLower}InsuranceRate`] || 1.5;
      
      if (hasInsurance && insValue > 0 && chargesByMode[mode]) {
        const premium = QuoteUtils.calculateInsurancePremium(insValue, insRate);
        const insuranceText = `Transit Insurance (${insRate}% of ${insValue.toLocaleString()} ${quoteCurr})`;
        
        // Add to includes
        if (!quote.selectedIncludes.includes(insuranceText)) {
          quote.selectedIncludes.push(insuranceText);
        }
        
        // Remove any existing Transit Insurance charge
        chargesByMode[mode] = chargesByMode[mode].filter(c => 
          !c.category.toLowerCase().includes('transit insurance')
        );
        // Add the insurance charge
        chargesByMode[mode].push({
          category: 'Transit Insurance',
          amount: premium,
          currency: quoteCurr
        });
      }
    });
    
    // Update chargesByMode in quote
    quote.chargesByMode = chargesByMode;
    
    if (State.quoteFormMode === 'create') {
      quote.id = Date.now();
      quote.quoteCode = QuoteUtils.makeQuoteCode();
      quote.createdAt = new Date().toISOString();
      State.quotes.push(quote);
    } else {
      const existingIndex = State.quotes.findIndex(q => q.id === State.selectedQuoteId);
      if (existingIndex !== -1) {
        quote.id = State.selectedQuoteId;
        quote.quoteCode = State.quotes[existingIndex].quoteCode;
        quote.createdAt = State.quotes[existingIndex].createdAt;
        State.quotes[existingIndex] = quote;
      }
    }
    
    Storage.saveQuotes();
    Modals.close('createQuoteModal');
    this.render();
    
    const savedQuote = State.quotes.find(q => q.id === quote.id);
    if (savedQuote) this.showDetails(savedQuote);
  }
};


// END OF QuotesUI

// ============================================================
// QuoteExport (PDF Generation)
// ============================================================

const QuoteExport = {
  
  bannerImage: 'data:image/png;base64,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',
  
   exportToPdf(quote) {
    const html = this.buildPdfHtml(quote);
    const w = window.open('', '_blank');
    if (!w) { 
      Modals.alert({ title: (State.lang === 'tr') ? 'Uyarı' : 'Warning', message: (State.lang === 'tr') ? 'Açılır pencere engellendi. Lütfen pop-up izin verin.' : 'Popup blocked. Please allow popups.' }); 
      return; 
    }
    w.document.open();
    w.document.write(html);
    w.document.close();
    setTimeout(() => { 
      try { 
        w.focus(); 
        w.print(); 
      } catch(e) {} 
    }, 300);
  },

  buildPdfHtml(quote) {
    const title = quote.type === 'Local'
      ? `MOVING QUOTE FROM ${(quote.origin || '').toUpperCase()} TO ${(quote.destination || '').toUpperCase()}`
      : `INTERNATIONAL MOVING QUOTE FROM ${(quote.origin || '').toUpperCase()} TO ${(quote.destination || '').toUpperCase()}`;

    const formData = {
  origin: quote.origin,
  destination: quote.destination,
  departurePort: quote.departurePort,
  poe: quote.poe,
  containerDetails: quote.containerDetails,
  departureAirportName: quote.departureAirportName,
  arrivalAirportName: quote.arrivalAirportName,
  truckType: quote.truckType
};

    let modeSections = '';
    (quote.modes || []).forEach(m => { 
      modeSections += this.buildModeSection(m, quote, formData); 
    });

    const validDate = quote.validUntil ? Utils.formatDate(quote.validUntil) : '';
    const today = Utils.formatDate(new Date().toISOString().split('T')[0]);

    return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Quote - ${quote.quoteCode || ''}</title>
  <style>
    @page { margin: 0.6in 0.5in; size: A4; }
    @media print {
      body { padding: 0; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
      .no-print { display: none !important; }
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: Arial, sans-serif; font-size: 11pt; line-height: 1.4; color: #000; padding: 20px; }
    .banner { width: 100%; height: auto; display: block; margin-bottom: 16px; }
    .main-title { text-align: center; font-size: 16pt; font-weight: bold; color: #c00; margin: 16px 0 20px 0; }
    .header-info { display: flex; justify-content: space-between; margin-bottom: 24px; padding-bottom: 12px; border-bottom: 3px solid #c00; }
    .header-left, .header-right { font-size: 10pt; line-height: 1.6; }
    .header-right { text-align: right; }
    .header-label { font-weight: bold; }
    .mode-section { margin-bottom: 28px; page-break-inside: avoid; }
    .mode-header { background: #c00; color: white; padding: 10px 14px; font-weight: bold; font-size: 12pt; }
    .mode-details { padding: 12px 14px; background: #fafafa; border: 1px solid #e0e0e0; border-top: none; margin-bottom: 12px; font-size: 10pt; line-height: 1.5; }
    .mode-details strong { font-size: 11pt; }
    .charges-table { width: 100%; border-collapse: collapse; font-size: 10pt; }
    .charges-table td { padding: 8px 12px; border: 1px solid #ddd; }
    .charge-category { width: 75%; }
    .charge-amount { width: 25%; text-align: right; white-space: nowrap; }
    .total-row { background: #f0f0f0; font-weight: bold; }
    .section { margin-top: 24px; page-break-inside: avoid; }
    .section-header { background: #f5f5f5; padding: 8px 12px; font-weight: bold; font-size: 11pt; border-left: 4px solid #c00; margin-bottom: 12px; }
    .section ul { margin: 0; padding-left: 24px; }
    .section li { margin-bottom: 6px; font-size: 10pt; line-height: 1.4; }
    .terms-section { margin-top: 24px; page-break-inside: avoid; }
    .terms-section .section-header { background: #f5f5f5; padding: 8px 12px; font-weight: bold; font-size: 11pt; border-left: 4px solid #c00; margin-bottom: 12px; }
    .terms-content { padding: 0 12px; font-size: 10pt; line-height: 1.5; }
    .validity-box { margin-top: 20px; padding: 14px 20px; background: #fff3cd; border: 2px solid #f59e0b; border-radius: 6px; text-align: center; font-weight: bold; font-size: 12pt; color: #92400e; }
  </style>
</head>
<body>
  <img src="${this.bannerImage}" class="banner" alt="" onerror="this.style.display='none'">
  
  <h1 class="main-title">${Utils.escapeHtml(title)}</h1>
  
  <div class="header-info">
    <div class="header-left">
      <div><span class="header-label">Client:</span> ${Utils.escapeHtml(quote.clientName || '')}</div>
      ${quote.clientOrganization ? `<div><span class="header-label">Organization:</span> ${Utils.escapeHtml(quote.clientOrganization)}</div>` : ''}
      <div><span class="header-label">Reference Number:</span> ${Utils.escapeHtml(quote.quoteCode || '')}</div>
    </div>
    <div class="header-right">
      <div><span class="header-label">Date:</span> ${today}</div>
      ${validDate ? `<div><span class="header-label">Valid Until:</span> ${validDate}</div>` : ''}
    </div>
  </div>
  
  ${modeSections}
  
  ${this.buildIncludesSection(quote, formData)}
  
  ${this.buildAdditionalSection(quote)}
  
  ${this.buildTermsSection(quote)}
  
  ${this.buildConsignmentSection(quote)}
  
  ${validDate ? `<div class="validity-box">Rates & Services are Valid Until: ${validDate}</div>` : ''}
</body>
</html>`;
  },

  buildModeSection(mode, quote, formData) {
    let charges = (quote.chargesByMode && quote.chargesByMode[mode]) || [];
    if (charges.length === 0) return '';

    // For Agent/Partner Export quotes: remove Destination Terminal Handling and Destination Services
    const isAgentExport = quote.recipientType === 'agent' && quote.type === 'Export';
    if (isAgentExport) {
      charges = charges.filter(c => {
        const cat = (c.category || '').toLowerCase();
        return !cat.includes('destination terminal') && !cat.includes('destination services');
      });
      // If all charges were filtered out, return empty
      if (charges.length === 0) return '';
    }

    let headerTitle = '';
    let detailsHtml = '';
    let chargeRows = '';
    let totalText = '';

    if (mode === 'Sea') {
      const vol = quote.seaVolume || quote.estimatedVolume || 0;
      headerTitle = `SEA FREIGHT (${Utils.escapeHtml(quote.containerDetails || 'Container details not specified')}) est. total volume: ${vol} cbm`;
      
      // Build details conditionally - hide empty fields
      const seaDetailLines = [];
      const departurePort = quote.departurePort || quote.origin;
      const poe = quote.poe;
      if (departurePort && poe) {
        seaDetailLines.push(`<div>${Utils.escapeHtml(departurePort)} to POE ${Utils.escapeHtml(poe)}</div>`);
      } else if (departurePort) {
        seaDetailLines.push(`<div>From ${Utils.escapeHtml(departurePort)}</div>`);
      } else if (poe) {
        seaDetailLines.push(`<div>To POE ${Utils.escapeHtml(poe)}</div>`);
      }
      if (quote.seaTransitTime) {
        seaDetailLines.push(`<div>Estimated port-to-port transit time: ${quote.seaTransitTime} days</div>`);
      }
      detailsHtml = seaDetailLines.join('');
      
      const totals = QuoteUtils.calculateTotals(charges);
      totalText = QuoteUtils.formatTotals(totals);
      
      chargeRows = charges.map(c => {
        const replacedCategory = QuoteUtils.replacePlaceholders(c.category, formData);
        const amountDisplay = QuoteUtils.formatChargeAmount(c);
        return `
          <tr>
            <td class="charge-category">${Utils.escapeHtml(replacedCategory)}</td>
            <td class="charge-amount">${amountDisplay}</td>
          </tr>
        `;
      }).join('');
      
      if (totalText) {
        chargeRows += `
          <tr class="total-row">
            <td class="charge-category">TOTAL (${mode})</td>
            <td class="charge-amount">${totalText}</td>
          </tr>
        `;
      }
      
    } else if (mode === 'Air') {
  const vol = quote.airVolume || quote.estimatedVolume || 0;
  const acw = quote.airACW || 0;
  headerTitle = `AIR FREIGHT - ${acw.toFixed(1)} kg (ACW)`;
  
  // Build details conditionally - hide empty fields
  const airDetailLines = [];
  const depAirport = quote.departureAirportName;
  const depIATA = quote.departureAirportIATA;
  const arrAirport = quote.arrivalAirportName;
  const arrIATA = quote.arrivalAirportIATA;
  
  // Only show route if we have at least departure OR arrival info
  if (depAirport || depIATA || arrAirport || arrIATA) {
    const depPart = depAirport ? `${Utils.escapeHtml(depAirport)}${depIATA ? ` (${Utils.escapeHtml(depIATA)})` : ''}` : (depIATA ? `(${Utils.escapeHtml(depIATA)})` : '');
    const arrPart = arrAirport ? `${Utils.escapeHtml(arrAirport)}${arrIATA ? ` (${Utils.escapeHtml(arrIATA)})` : ''}` : (arrIATA ? `(${Utils.escapeHtml(arrIATA)})` : '');
    if (depPart && arrPart) {
      airDetailLines.push(`<div>${depPart} to ${arrPart}</div>`);
    } else if (depPart) {
      airDetailLines.push(`<div>From ${depPart}</div>`);
    } else if (arrPart) {
      airDetailLines.push(`<div>To ${arrPart}</div>`);
    }
  }
  
  // Airline and transit time
  const airline = quote.airlineName;
  const transitTime = quote.airTransitTime;
  if (airline && transitTime) {
    airDetailLines.push(`<div>via ${Utils.escapeHtml(airline)} - Estimated transit time: ${transitTime} days</div>`);
  } else if (airline) {
    airDetailLines.push(`<div>via ${Utils.escapeHtml(airline)}</div>`);
  } else if (transitTime) {
    airDetailLines.push(`<div>Estimated transit time: ${transitTime} days</div>`);
  }
  detailsHtml = airDetailLines.join('');
      
      // Check if this is agent or client quote type
      const isAgentQuote = quote.airQuoteType === 'agent';
      
      // Use displayType for all charge formatting (works for both agent and client)
      const totals = QuoteUtils.calculateTotals(charges);
      totalText = QuoteUtils.formatTotals(totals);
      
      chargeRows = charges.map(c => {
        const replacedCategory = QuoteUtils.replacePlaceholders(c.category, formData);
        const amountDisplay = QuoteUtils.formatChargeAmount(c);
        return `
          <tr>
            <td class="charge-category">${Utils.escapeHtml(replacedCategory)}</td>
            <td class="charge-amount">${amountDisplay}</td>
          </tr>
        `;
      }).join('');
      
      // Only show total if we have fixed charges and totals exist
      if (totalText) {
        chargeRows += `
          <tr class="total-row">
            <td class="charge-category">TOTAL (${mode})</td>
            <td class="charge-amount">${totalText}</td>
          </tr>
        `;
      }
      
    } else if (mode === 'Land') {
      const vol = quote.landVolume || quote.estimatedVolume || 0;
      headerTitle = `LAND FREIGHT (${Utils.escapeHtml(quote.truckType || 'Dedicated')} Truck) est. total volume: ${vol} cbm`;
      
      // Build details conditionally - hide empty fields
      const landDetailLines = [];
      const origin = quote.origin;
      const destination = quote.destination;
      if (origin && destination) {
        landDetailLines.push(`<div>${Utils.escapeHtml(origin)} to ${Utils.escapeHtml(destination)}</div>`);
      } else if (origin) {
        landDetailLines.push(`<div>From ${Utils.escapeHtml(origin)}</div>`);
      } else if (destination) {
        landDetailLines.push(`<div>To ${Utils.escapeHtml(destination)}</div>`);
      }
      if (quote.landTransitTime) {
        landDetailLines.push(`<div>Estimated transit time: ${quote.landTransitTime} days</div>`);
      }
      detailsHtml = landDetailLines.join('');
      
      const totals = QuoteUtils.calculateTotals(charges);
      totalText = QuoteUtils.formatTotals(totals);
      
      chargeRows = charges.map(c => {
        const replacedCategory = QuoteUtils.replacePlaceholders(c.category, formData);
        const amountDisplay = QuoteUtils.formatChargeAmount(c);
        return `
          <tr>
            <td class="charge-category">${Utils.escapeHtml(replacedCategory)}</td>
            <td class="charge-amount">${amountDisplay}</td>
          </tr>
        `;
      }).join('');
      
      if (totalText) {
        chargeRows += `
          <tr class="total-row">
            <td class="charge-category">TOTAL (${mode})</td>
            <td class="charge-amount">${totalText}</td>
          </tr>
        `;
      }
    }

    return `
      <div class="mode-section">
        <div class="mode-header">${headerTitle}</div>
        <div class="mode-details">
          ${detailsHtml}
        </div>
        <table class="charges-table">
          <tbody>${chargeRows}</tbody>
        </table>
      </div>
    `;
  },

  buildIncludesSection(quote, formData) {
    let items = [...(quote.selectedIncludes || [])];
    
    // For Agent/Partner Export quotes: remove Destination Terminal Handling and Destination Services
    const isAgentExport = quote.recipientType === 'agent' && quote.type === 'Export';
    if (isAgentExport) {
      items = items.filter(i => {
        const text = i.toLowerCase();
        return !text.includes('destination terminal') && !text.includes('destination services');
      });
    }
    
    if (quote.insurance && quote.hhgValue) {
  const percentage = quote.insurancePercentage || 1.5;
  const premium = QuoteUtils.calculateInsurancePremium(quote.hhgValue, percentage);
  const insuranceCurrency = quote.quoteCurrency || 'USD';
  const insuranceText = `Moving/Transit Insurance coverage (${percentage}% of ${quote.hhgValue.toLocaleString()} ${insuranceCurrency} = ${premium.toFixed(2)} ${insuranceCurrency})`;
  if (!items.some(i => i.toLowerCase().includes('insurance'))) {
    items.push(insuranceText);
  }
}
    
    if (items.length === 0) return '';
    
    const lis = items.map(i => `<li>${Utils.escapeHtml(i)}</li>`).join('');
    return `
      <div class="section">
        <div class="section-header">OUR QUOTATION INCLUDES:</div>
        <ul>${lis}</ul>
      </div>
    `;
  },

  buildAdditionalSection(quote) {
    let items = quote.selectedAdditionalCharges || [];
    if (items.length === 0) return '';
    
    // Filter out insurance text if:
    // 1. Insurance checkbox is selected (quote.insurance === true), OR
    // 2. Insurance has already been added as a charge
    const hasInsuranceCharge = (quote.charges || []).some(c => 
      c.description?.toLowerCase().includes('insurance') || 
      c.category?.toLowerCase().includes('insurance')
    );
    
    if (quote.insurance === true || hasInsuranceCharge) {
      items = items.filter(i => !i.toLowerCase().includes('insurance'));
    }
    
    // If all items were filtered out, return empty
    if (items.length === 0) return '';
    
    const lis = items.map(i => `<li>${Utils.escapeHtml(i)}</li>`).join('');
    return `
      <div class="section">
        <div class="section-header">ADDITIONAL CHARGES MAY APPLY (if required):</div>
        <ul>${lis}</ul>
      </div>
    `;
  },

  buildTermsSection(quote) {
    if (!quote.termsAndConditions) return '';
    
    return `
      <div class="terms-section">
        <div class="section-header">TERMS & CONDITIONS:</div>
        <div class="terms-content">${Utils.escapeHtml(quote.termsAndConditions).replace(/\n/g, '<br>')}</div>
      </div>
    `;
  },
  
  buildConsignmentSection(quote) {
    // Only include if the checkbox was checked
    if (!quote.includeConsignmentInstructions) return '';
    
    // Check if any requirement type is selected or just consignment address
    const hasRequirements = quote.includeForeignNational || quote.includeReturningTurkish || quote.includeDiplomatic;
    
    const text = QuotesUI.getConsignmentInstructionsText(quote);
    if (!text) return '';
    
    return `
      <div class="terms-section" style="margin-top: 24px; page-break-inside: avoid;">
        <div class="section-header">${hasRequirements ? 'IMPORT REQUIREMENTS & CONSIGNMENT INSTRUCTIONS:' : 'CONSIGNMENT INSTRUCTIONS:'}</div>
        <div class="terms-content" style="white-space: pre-wrap; font-size: 9pt; line-height: 1.5;">${Utils.escapeHtml(text)}</div>
      </div>
    `;
  }
};

// ============================================================
// HELPER FUNCTIONS FOR QUOTES
// ============================================================

function addCustomIncluded() {
  const input = $.get('customIncludedInput');
  const text = input ? input.value.trim() : '';
  if (!text) return;
  
  const list = $.get('customIncludedItems');
  if (!list) return;
  
  const li = $.el('li', { 
    className: 'custom-item', 
    style: 'display:flex; justify-content:space-between; align-items:center; margin:4px 0; padding:4px 8px; background:#f0f9ff; border-radius:4px;' 
  });
  const span = $.el('span', { textContent: text });
  const btn = $.el('button', { 
    type: 'button', 
    textContent: 'x',
    style: 'background:#ef4444; color:white; border:none; padding:2px 8px; border-radius:3px; cursor:pointer; margin-left:8px;'
  });
  btn.addEventListener('click', () => li.remove());
  
  li.appendChild(span);
  li.appendChild(btn);
  list.appendChild(li);
  input.value = '';
}

function addAdditionalCharge() {
  const input = $.get('additionalChargeInput');
  const text = input ? input.value.trim() : '';
  if (!text) return;
  
  const list = $.get('additionalChargesList');
  if (!list) return;
  
  const li = $.el('li', { 
    className: 'custom-item', 
    style: 'display:flex; justify-content:space-between; align-items:center; margin:4px 0; padding:4px 8px; background:#fffbeb; border-radius:4px;' 
  });
  const span = $.el('span', { textContent: text });
  const btn = $.el('button', { 
    type: 'button', 
    textContent: 'x',
    style: 'background:#ef4444; color:white; border:none; padding:2px 8px; border-radius:3px; cursor:pointer; margin-left:8px;'
  });
  btn.addEventListener('click', () => li.remove());
  
  li.appendChild(span);
  li.appendChild(btn);
  list.appendChild(li);
  input.value = '';
}

// ============================================================
// STORAGE UI - Now manages separate Storage entity
// ============================================================

const StorageUI = {
  // Main render function
  render() {
    this.populateLocationFilter();
    this.renderActiveStorage();
    this.renderCompletedStorage();
  },

  // Populate location filter dropdown
  populateLocationFilter() {
    const select = $.get('storageLocationFilter');
    if (!select) return;
    
    // Preserve current value
    const currentValue = select.value;
    
    // Clear and repopulate
    while (select.options.length > 1) {
      select.remove(1);
    }
    
    CONFIG.STORAGE_LOCATIONS.forEach(loc => {
      const opt = $.el('option', { value: loc.id, textContent: loc.name });
      select.appendChild(opt);
    });
    
    // Restore selected value
    select.value = currentValue;
    
    select.onchange = () => {
      State.pagination.storage.page = 1; // Reset to page 1
      this.render();
    };
    
    // Status filter
    const statusSelect = $.get('storageStatusFilter');
    if (statusSelect) {
      statusSelect.onchange = () => {
        State.pagination.storage.page = 1; // Reset to page 1
        this.render();
      };
    }
  },

  // Get filtered storage records
  getFilteredRecords() {
    const locationFilter = $.get('storageLocationFilter')?.value || '';
    const statusFilter = $.get('storageStatusFilter')?.value || '';
    const searchTerm = $.get('storageSearchInput')?.value?.toLowerCase() || '';
    
    return State.storageRecords.filter(storage => {
      // Location filter
      if (locationFilter && storage.location !== locationFilter) return false;
      
      // Status filter
      if (statusFilter && storage.status !== statusFilter) return false;
      
      // Search filter
      if (searchTerm) {
        // Get linked job info for search
        const linkedJob = storage.linkedJobId ? State.getJob(storage.linkedJobId) : null;
        
        const searchableText = [
          storage.storageCode,
          storage.clientName,
          storage.organizationName,
          storage.location,
          this.getLocationName(storage.location),
          storage.notes,
          storage.status,
          I18n.storageStatusTextBilingual(storage.status),  // Both EN and TR status
          // Include linked job info
          linkedJob?.jobCode,
          linkedJob?.clientName,
          linkedJob?.tradeDirection,
          I18n.typeTextBilingual(linkedJob?.tradeDirection),  // Both EN and TR type
          CONFIG.getCountryNameBilingual(linkedJob?.originCountry),
          CONFIG.getCountryNameBilingual(linkedJob?.destinationCountry)
        ].filter(Boolean).join(' ').toLowerCase();
        
        if (!searchableText.includes(searchTerm)) return false;
      }
      
      return true;
    });
  },

  // Get location display name
  getLocationName(locationId) {
    return CONFIG.STORAGE_LOCATIONS.find(l => l.id === locationId)?.name || locationId || '-';
  },

  // Get storage status based on inventory
  getInventoryStatus(storage) {
    if (!storage.inventory || storage.inventory.length === 0) {
      return storage.status === 'Closed' 
        ? I18n.t('statusFullyRetrieved') 
        : I18n.t('statusInStorage');
    }
    
    const totalItems = storage.inventory.length;
    const retrievedItems = storage.inventory.filter(item => item.status === 'Retrieved').length;
    
    if (retrievedItems === 0) return I18n.t('statusInStorage');
    if (retrievedItems === totalItems) return I18n.t('statusFullyRetrieved');
    return I18n.t('statusPartiallyRetrieved');
  },

  // Calculate days in storage
  getDaysInStorage(storage) {
    if (!storage.dateEntered) return 0;
    const entered = new Date(storage.dateEntered);
    const exitOrNow = storage.dateExited ? new Date(storage.dateExited) : new Date();
    const diffTime = exitOrNow - entered;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  },

  // Calculate storage cost
  calculateCost(storage) {
    const days = this.getDaysInStorage(storage);
    const billableDays = Math.max(0, days - (storage.freeDays || 0));
    
    if (storage.billingType === 'Flat Rate') {
      return {
        rate: storage.flatRate || 0,
        currency: storage.flatRateCurrency || 'TRY',
        total: storage.flatRate || 0,
        period: 'flat',
        days: days,
        billableDays: billableDays,
        freeDays: storage.freeDays || 0
      };
    }
    
    // Per CBM billing
    const rate = storage.ratePerCBM || 0;
    const cbm = storage.totalCBM || 0;
    const currency = storage.rateCurrency || 'TRY';
    const period = storage.ratePeriod || 'Monthly';
    
    let total = 0;
    if (period === 'Daily') {
      total = rate * cbm * billableDays;
    } else {
      // Monthly - calculate months (partial months count as full)
      const months = Math.ceil(billableDays / 30);
      total = rate * cbm * months;
    }
    
    return {
      rate: rate,
      cbm: cbm,
      currency: currency,
      total: total,
      period: period,
      days: days,
      billableDays: billableDays,
      freeDays: storage.freeDays || 0
    };
  },

  // Render active storage list (now renders ALL filtered records, not just active)
  renderActiveStorage() {
    const container = $.get('activeStorageList');
    if (!container) return;
    $.clear(container);

    const allRecords = this.getFilteredRecords();

    if (allRecords.length === 0) {
      container.appendChild($.el('p', { 
        className: 'storage-empty-message',
        textContent: I18n.t('noStorageRecords')
      }));
      return;
    }

    // Pagination
    const { page, perPage } = State.pagination.storage;
    const totalPages = Math.ceil(allRecords.length / perPage);
    const startIdx = (page - 1) * perPage;
    const pageRecords = allRecords.slice(startIdx, startIdx + perPage);

    pageRecords.forEach(storage => {
      container.appendChild(this.createStorageCard(storage));
    });
    
    // Add pagination controls if more than one page
    if (totalPages > 1) {
      container.appendChild(this.createPaginationControls('storage', page, totalPages, allRecords.length));
    }
  },
  
  createPaginationControls(type, currentPage, totalPages, totalItems) {
    const wrapper = $.el('div', { className: 'pagination-controls' });
    
    const { perPage } = State.pagination[type];
    const start = (currentPage - 1) * perPage + 1;
    const end = Math.min(currentPage * perPage, totalItems);
    const infoText = (State.lang === 'tr') 
      ? `${totalItems} kayıttan ${start}-${end} arası gösteriliyor`
      : `Showing ${start}-${end} of ${totalItems}`;
    wrapper.appendChild($.el('span', { className: 'pagination-info', textContent: infoText }));
    
    const buttons = $.el('div', { className: 'pagination-buttons' });
    
    const prevBtn = $.el('button', { 
      type: 'button', 
      textContent: '← ' + ((State.lang === 'tr') ? 'Önceki' : 'Previous'),
      disabled: currentPage === 1
    });
    prevBtn.addEventListener('click', () => {
      if (State.pagination[type].page > 1) {
        State.pagination[type].page--;
        this.render();
      }
    });
    buttons.appendChild(prevBtn);
    
    buttons.appendChild($.el('span', { 
      className: 'pagination-current',
      textContent: `${currentPage} / ${totalPages}` 
    }));
    
    const nextBtn = $.el('button', { 
      type: 'button', 
      textContent: ((State.lang === 'tr') ? 'Sonraki' : 'Next') + ' →',
      disabled: currentPage === totalPages
    });
    nextBtn.addEventListener('click', () => {
      if (State.pagination[type].page < totalPages) {
        State.pagination[type].page++;
        this.render();
      }
    });
    buttons.appendChild(nextBtn);
    
    wrapper.appendChild(buttons);
    return wrapper;
  },

  // Render completed storage list - now empty since we use single list
  renderCompletedStorage() {
    const container = $.get('completedStorageList');
    if (!container) return;
    $.clear(container);
    // No longer rendering separate completed section - all handled by filter dropdown
  },

  // Create a storage card for the list
  createStorageCard(storage) {
    const card = $.el('div', { 
      className: 'storage-card' + (State.selectedStorageId === storage.id ? ' selected' : '')
    });
    
    // Header with code and status
    const header = $.el('div', { className: 'storage-card-header' });
    header.appendChild($.el('span', { 
      className: 'storage-card-code', 
      textContent: storage.storageCode 
    }));
    const statusClass = storage.status === 'Active' ? 'storage-card-status-active' : 'storage-card-status-closed';
    header.appendChild($.el('span', { 
      className: `storage-card-status ${statusClass}`, 
      textContent: I18n.storageStatusText(storage.status)
    }));
    card.appendChild(header);
    
    // Client name
    if (storage.clientName) {
      card.appendChild($.el('div', { 
        className: 'storage-card-client', 
        textContent: storage.clientName + (storage.organizationName ? ` (${storage.organizationName})` : '')
      }));
    }
    
    // Meta info
    const meta = $.el('div', { className: 'storage-card-meta' });
    
    // Location
    const locationSpan = $.el('span');
    locationSpan.textContent = this.getLocationName(storage.location);
    meta.appendChild(locationSpan);
    
    // Contents
    if (storage.contents && storage.contents.length > 0) {
      const contentsSpan = $.el('span');
      contentsSpan.textContent = storage.contents.join(', ');
      meta.appendChild(contentsSpan);
    }
    
    // CBM
    if (storage.totalCBM) {
      const cbmSpan = $.el('span');
      cbmSpan.textContent = `${storage.totalCBM} CBM`;
      meta.appendChild(cbmSpan);
    }
    
    // Days
    if (storage.dateEntered) {
      const days = this.getDaysInStorage(storage);
      const daysSpan = $.el('span');
      daysSpan.textContent = `${days} ${I18n.t('unitDays')}`;
      meta.appendChild(daysSpan);
    }
    
    card.appendChild(meta);
    
    // Linked job indicator
    if (storage.linkedJobId) {
      const linkedJob = State.getJob(storage.linkedJobId);
      if (linkedJob) {
        const linkedDiv = $.el('div', { className: 'storage-card-linked' });
        const linkedLabel = $.el('span', { className: 'storage-card-linked-job' });
        linkedLabel.textContent = (State.lang === 'tr') ? `${linkedJob.jobCode} ile bağlantılı` : `Linked to ${linkedJob.jobCode}`;
        linkedDiv.appendChild(linkedLabel);
        card.appendChild(linkedDiv);
      }
    }
    
    // Click handler
    card.addEventListener('click', () => {
      State.selectedStorageId = storage.id;
      this.render();
      this.showDetails(storage);
    });
    
    return card;
  },

  // Show storage details in right panel
  showDetails(storage) {
    const panel = $.get('storageDetailsPanel');
    if (!panel) return;
    $.clear(panel);
    
    // Enable edit button
    const editBtn = $.get('editStorageBtn');
    if (editBtn) {
      editBtn.disabled = false;
      editBtn.onclick = () => this.openModal('edit', storage);
    }
    
    // ===== HEADER: Storage Code + Status (like Move Details) =====
    const header = $.el('div', { className: 'move-details-header' });
    header.appendChild($.el('h3', { textContent: storage.storageCode, style: 'color: var(--color-accent);' }));
    const statusClass = storage.status === 'Active' ? 'storage-card-status-active' : 'storage-card-status-closed';
    header.appendChild($.el('span', { className: `storage-card-status ${statusClass}`, textContent: I18n.storageStatusText(storage.status) }));
    panel.appendChild(header);
    
    // ===== CLIENT INFORMATION CARD =====
    const clientCard = $.el('div', { className: 'details-card' });
    clientCard.appendChild($.el('h4', { className: 'details-card-title', textContent: (State.lang === 'tr') ? 'MÜŞTERİ BİLGİLERİ' : 'CLIENT INFORMATION' }));
    const clientGrid = $.el('div', { className: 'details-card-grid' });
    
    this.addDetailItem(clientGrid, (State.lang === 'tr') ? 'MÜŞTERİ ADI' : 'CLIENT NAME', storage.clientName || '-');
    this.addDetailItem(clientGrid, (State.lang === 'tr') ? 'ORGANİZASYON' : 'ORGANIZATION', storage.organizationName || '-');
    
    // Linked Job
    if (storage.linkedJobId) {
      const linkedJob = State.getJob(storage.linkedJobId);
      if (linkedJob) {
        const item = $.el('div', { className: 'detail-item' });
        item.appendChild($.el('span', { className: 'detail-label', textContent: (State.lang === 'tr') ? 'BAĞLI İŞ' : 'LINKED JOB' }));
        const link = $.el('a', { 
          href: '#', 
          textContent: linkedJob.jobCode,
          className: 'detail-value-link'
        });
        link.addEventListener('click', (e) => {
          e.preventDefault();
          Views.show('moves');
          JobsUI.render();
          JobsUI.showDetails(linkedJob);
        });
        item.appendChild(link);
        clientGrid.appendChild(item);
      }
    }
    
    clientCard.appendChild(clientGrid);
    panel.appendChild(clientCard);
    
    // ===== LOCATION & CONTENTS CARD =====
    const locationCard = $.el('div', { className: 'details-card' });
    locationCard.appendChild($.el('h4', { className: 'details-card-title', textContent: (State.lang === 'tr') ? 'KONUM VE İÇERİK' : 'LOCATION & CONTENTS' }));
    const locationGrid = $.el('div', { className: 'details-card-grid' });
    
    this.addDetailItem(locationGrid, (State.lang === 'tr') ? 'KONUM' : 'LOCATION', this.getLocationName(storage.location));
    // Translate contents (HHE -> Ev Eşyası, Auto -> Araç)
    const contentsText = (storage.contents || []).map(c => {
      if (State.lang === 'tr') {
        if (c === 'HHE') return 'Ev Eşyası';
        if (c === 'Auto') return 'Araç';
      }
      return c;
    }).join(', ') || '-';
    this.addDetailItem(locationGrid, (State.lang === 'tr') ? 'İÇERİK' : 'CONTENTS', contentsText);
    this.addDetailItem(locationGrid, (State.lang === 'tr') ? 'TOPLAM CBM' : 'TOTAL CBM', storage.totalCBM || '0');
    this.addDetailItem(locationGrid, (State.lang === 'tr') ? 'BRÜT AĞIRLIK' : 'GROSS WEIGHT', storage.grossWeight ? `${storage.grossWeight} kg` : '-');
    
    locationCard.appendChild(locationGrid);
    panel.appendChild(locationCard);
    
    // ===== DATES CARD =====
    const datesCard = $.el('div', { className: 'details-card' });
    datesCard.appendChild($.el('h4', { className: 'details-card-title', textContent: (State.lang === 'tr') ? 'TARİHLER' : 'DATES' }));
    const datesGrid = $.el('div', { className: 'details-card-grid' });
    
    this.addDetailItem(datesGrid, (State.lang === 'tr') ? 'GİRİŞ TARİHİ' : 'ENTRY DATE', storage.dateEntered ? Utils.formatDate(storage.dateEntered) : '-');
    this.addDetailItem(datesGrid, (State.lang === 'tr') ? 'ÇIKIŞ TARİHİ' : 'EXIT DATE', storage.dateExited ? Utils.formatDate(storage.dateExited) : '-');
    this.addDetailItem(datesGrid, (State.lang === 'tr') ? 'DEPODA GÜN' : 'DAYS IN STORAGE', this.getDaysInStorage(storage));
    this.addDetailItem(datesGrid, (State.lang === 'tr') ? 'ENVANTER DURUMU' : 'INVENTORY STATUS', this.getInventoryStatus(storage));
    
    datesCard.appendChild(datesGrid);
    panel.appendChild(datesCard);
    
    // ===== BILLING SECTION =====
    const billingSection = $.el('div', { className: 'details-section' });
    billingSection.appendChild($.el('h4', { className: 'details-section-title', textContent: (State.lang === 'tr') ? 'FATURALANDIRMA BİLGİLERİ' : 'BILLING INFORMATION' }));
    const billingGrid = $.el('div', { className: 'details-card-grid' });
    
    this.addDetailItem(billingGrid, (State.lang === 'tr') ? 'FATURALANDIRMA TİPİ' : 'BILLING TYPE', I18n.billingTypeText(storage.billingType));
    
    if (storage.billingType === 'Flat Rate') {
      this.addDetailItem(billingGrid, (State.lang === 'tr') ? 'ÜCRET' : 'RATE', `${storage.flatRate || 0} ${storage.flatRateCurrency || 'TRY'}`);
    } else {
      const periodLabel = storage.ratePeriod === 'Daily' ? ((State.lang === 'tr') ? 'Gün' : 'Day') : ((State.lang === 'tr') ? 'Ay' : 'Month');
      this.addDetailItem(billingGrid, (State.lang === 'tr') ? 'ÜCRET' : 'RATE', `${storage.ratePerCBM || 0} ${storage.rateCurrency || 'TRY'} / CBM / ${periodLabel}`);
    }
    
    if (storage.freeDays) {
      this.addDetailItem(billingGrid, (State.lang === 'tr') ? 'ÜCRETSİZ GÜN' : 'FREE DAYS', storage.freeDays);
    }
    
    billingSection.appendChild(billingGrid);
    
    // Cost Calculation Box
    const cost = this.calculateCost(storage);
    if (cost.total > 0 || cost.days > 0) {
      const costBox = $.el('div', { className: 'storage-cost-box' });
      
      const costHeader = $.el('div', { className: 'storage-cost-header' });
      costHeader.appendChild($.el('h5', { textContent: I18n.t('estimatedCostLabel') }));
      costHeader.appendChild($.el('span', { className: 'storage-cost-days', textContent: `${cost.days} ${I18n.t('totalDays')}` }));
      costBox.appendChild(costHeader);
      
      if (cost.freeDays > 0) {
        const freeRow = $.el('div', { className: 'storage-cost-row' });
        freeRow.appendChild($.el('span', { textContent: I18n.t('freeDaysLabel') }));
        freeRow.appendChild($.el('span', { textContent: `${cost.freeDays} ${I18n.t('unitDays')}` }));
        costBox.appendChild(freeRow);
      }
      
      const billableRow = $.el('div', { className: 'storage-cost-row' });
      billableRow.appendChild($.el('span', { textContent: I18n.t('billableDaysLabel') }));
      billableRow.appendChild($.el('span', { textContent: `${cost.billableDays} ${I18n.t('unitDays')}` }));
      costBox.appendChild(billableRow);
      
      if (cost.period !== 'flat') {
        const rateRow = $.el('div', { className: 'storage-cost-row' });
        rateRow.appendChild($.el('span', { textContent: `${cost.rate} ${cost.currency} × ${cost.cbm} CBM` }));
        if (cost.period === 'Monthly') {
          const months = Math.ceil(cost.billableDays / 30);
          rateRow.appendChild($.el('span', { textContent: `× ${months} ${I18n.t('unitMonth')}` }));
        } else {
          rateRow.appendChild($.el('span', { textContent: `× ${cost.billableDays} ${I18n.t('unitDays')}` }));
        }
        costBox.appendChild(rateRow);
      }
      
      const totalRow = $.el('div', { className: 'storage-cost-row total' });
      totalRow.appendChild($.el('span', { textContent: I18n.t('totalCostLabel') }));
      totalRow.appendChild($.el('span', { textContent: `${cost.total.toLocaleString()} ${cost.currency}` }));
      costBox.appendChild(totalRow);
      
      if (storage.billingNotes) {
        costBox.appendChild($.el('p', { className: 'storage-cost-note', textContent: storage.billingNotes }));
      }
      
      billingSection.appendChild(costBox);
    }
    
    panel.appendChild(billingSection);
    
    // ===== INVENTORY SECTION =====
    const inventorySection = $.el('div', { className: 'details-section' });
    inventorySection.appendChild($.el('h4', { className: 'details-section-title', textContent: (State.lang === 'tr') ? 'DEPO ENVANTERİ' : 'STORAGE INVENTORY' }));
    
    // Add item form
    const addForm = this.createInventoryAddForm(storage);
    inventorySection.appendChild(addForm);
    
    // Inventory list
    if (storage.inventory && storage.inventory.length > 0) {
      const invList = $.el('div', { className: 'storage-inventory-list' });
      
      // Group by type
      const hheItems = storage.inventory.filter(i => i.type === 'HHE' || !i.type);
      const autoItems = storage.inventory.filter(i => i.type === 'Auto');
      
      // HHE Items
      if (hheItems.length > 0) {
        invList.appendChild($.el('div', { 
          className: 'inventory-type-header',
          innerHTML: '<span class="inventory-type-badge inventory-type-badge-hhe">HHE</span> Household Effects'
        }));
        hheItems.forEach((item) => {
          const realIdx = storage.inventory.indexOf(item);
          invList.appendChild(this.createInventoryItemRow(storage, item, realIdx));
        });
      }
      
      // Auto Items
      if (autoItems.length > 0) {
        const autoHeader = $.el('div', { 
          className: 'inventory-type-header',
          style: hheItems.length > 0 ? 'margin-top: 16px;' : ''
        });
        autoHeader.innerHTML = '<span class="inventory-type-badge inventory-type-badge-auto">Auto</span> Vehicles';
        invList.appendChild(autoHeader);
        autoItems.forEach((item) => {
          const realIdx = storage.inventory.indexOf(item);
          invList.appendChild(this.createInventoryItemRow(storage, item, realIdx));
        });
      }
      
      inventorySection.appendChild(invList);
    } else {
      inventorySection.appendChild($.el('p', { 
        className: 'storage-empty-message',
        textContent: (State.lang === 'tr') ? 'Henüz envanter öğesi yok.' : 'No inventory items added yet.'
      }));
    }
    
    panel.appendChild(inventorySection);
    
    // Notes Section
    if (storage.notes) {
      const notesSection = $.el('div', { className: 'details-section' });
      notesSection.appendChild($.el('h4', { className: 'details-section-title', textContent: (State.lang === 'tr') ? 'NOTLAR' : 'NOTES' }));
      notesSection.appendChild($.el('p', { textContent: storage.notes, className: 'storage-notes-text' }));
      panel.appendChild(notesSection);
    }
  },

  // Helper to add detail item to a grid (consistent with Move Details)
  addDetailItem(container, label, value) {
    const item = $.el('div', { className: 'detail-item' });
    item.appendChild($.el('span', { className: 'detail-label', textContent: label }));
    item.appendChild($.el('span', { className: 'detail-value', textContent: value || '-' }));
    container.appendChild(item);
  },

  // Create inventory add form - supports bulk adding and quick entry
  createInventoryAddForm(storage) {
    const formContainer = $.el('div', { className: 'storage-inventory-add-container' });
    
    // Quick Add Row - always visible for fast entry
    const quickAddRow = $.el('div', { className: 'quick-add-row' });
    
    const quickNameInput = $.el('input', { 
      type: 'text', 
      placeholder: (State.lang === 'tr') ? 'Öğe adı' : 'Item name', 
      className: 'quick-add-input quick-add-name'
    });
    
    const quickQtyInput = $.el('input', { 
      type: 'number', 
      placeholder: (State.lang === 'tr') ? 'Adet' : 'Qty', 
      min: '1',
      value: '1',
      className: 'quick-add-input quick-add-qty'
    });
    
    const quickCbmInput = $.el('input', { 
      type: 'number', 
      placeholder: 'CBM', 
      step: '0.01',
      min: '0',
      className: 'quick-add-input quick-add-cbm'
    });
    
    const quickAddBtn = $.el('button', { 
      type: 'button', 
      className: 'quick-add-btn',
      textContent: '+'
    });
    
    quickAddRow.appendChild(quickNameInput);
    quickAddRow.appendChild(quickQtyInput);
    quickAddRow.appendChild(quickCbmInput);
    quickAddRow.appendChild(quickAddBtn);
    formContainer.appendChild(quickAddRow);
    
    // Quick add handler
    const doQuickAdd = () => {
      const name = quickNameInput.value.trim();
      if (!name) {
        quickNameInput.focus();
        return;
      }
      
      if (!storage.inventory) storage.inventory = [];
      
      storage.inventory.push({
        id: Utils.makeId('item'),
        type: 'HHE',
        description: name,
        quantity: parseInt(quickQtyInput.value) || 1,
        cbm: parseFloat(quickCbmInput.value) || 0,
        status: 'In Storage',
        dateRetrieved: ''
      });
      
      quickNameInput.value = '';
      quickQtyInput.value = '1';
      quickCbmInput.value = '';
      quickNameInput.focus();
      
      Storage.saveStorageRecords();
      this.showDetails(storage);
    };
    
    quickAddBtn.addEventListener('click', doQuickAdd);
    quickNameInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') doQuickAdd();
    });
    
    // Bulk Add Section (collapsible)
    const bulkToggle = $.el('button', { 
      type: 'button', 
      className: 'bulk-add-toggle',
      textContent: (State.lang === 'tr') ? 'Toplu Ekle...' : 'Bulk Add...'
    });
    formContainer.appendChild(bulkToggle);
    
    const bulkSection = $.el('div', { className: 'bulk-add-section hidden' });
    
    // Type selector tabs
    const typeTabs = $.el('div', { className: 'inventory-type-tabs' });
    const hheTab = $.el('button', { type: 'button', className: 'inventory-type-tab active', textContent: (State.lang === 'tr') ? 'Ev Eşyaları' : 'HHE Items' });
    const autoTab = $.el('button', { type: 'button', className: 'inventory-type-tab', textContent: (State.lang === 'tr') ? 'Araç' : 'Auto/Vehicle' });
    typeTabs.appendChild(hheTab);
    typeTabs.appendChild(autoTab);
    bulkSection.appendChild(typeTabs);
    
    // HHE bulk add form
    const hheForm = $.el('div', { className: 'hhe-bulk-form' });
    const hheLabel = $.el('p', { 
      className: 'inventory-form-hint',
      textContent: (State.lang === 'tr') 
        ? 'Her satıra bir öğe girin. Format: açıklama (isteğe bağlı: adet x CBM)'
        : 'Enter items one per line. Format: description (optional: qty x CBM)'
    });
    hheForm.appendChild(hheLabel);
    
    const hheTextarea = $.el('textarea', {
      className: 'inventory-bulk-textarea',
      rows: 4,
      placeholder: 'Box 1\nBox 2\nSofa\nDining table\nKitchen boxes (5 x 0.5 cbm)'
    });
    hheForm.appendChild(hheTextarea);
    
    const hheAddBtn = $.el('button', { 
      type: 'button', 
      className: 'storage-add-btn',
      textContent: (State.lang === 'tr') ? 'Ev Eşyası Ekle' : 'Add HHE Items'
    });
    hheForm.appendChild(hheAddBtn);
    bulkSection.appendChild(hheForm);
    
    // Auto add form (single vehicle at a time)
    const autoForm = $.el('div', { className: 'auto-add-form hidden' });
    const autoFields = $.el('div', { className: 'auto-fields-row' });
    
    const makeInput = $.el('input', { type: 'text', placeholder: (State.lang === 'tr') ? 'Marka (örn. Toyota)' : 'Make (e.g. Toyota)', className: 'auto-field' });
    const modelInput = $.el('input', { type: 'text', placeholder: (State.lang === 'tr') ? 'Model (örn. Camry)' : 'Model (e.g. Camry)', className: 'auto-field' });
    const yearInput = $.el('input', { type: 'number', placeholder: (State.lang === 'tr') ? 'Yıl' : 'Year', className: 'auto-field auto-field-small' });
    const vinInput = $.el('input', { type: 'text', placeholder: (State.lang === 'tr') ? 'VIN (isteğe bağlı)' : 'VIN (optional)', className: 'auto-field' });
    
    autoFields.appendChild(makeInput);
    autoFields.appendChild(modelInput);
    autoFields.appendChild(yearInput);
    autoFields.appendChild(vinInput);
    autoForm.appendChild(autoFields);
    
    const autoAddBtn = $.el('button', { 
      type: 'button', 
      className: 'storage-add-btn',
      textContent: (State.lang === 'tr') ? 'Araç Ekle' : 'Add Vehicle'
    });
    autoForm.appendChild(autoAddBtn);
    bulkSection.appendChild(autoForm);
    
    // Add bulk section to container
    formContainer.appendChild(bulkSection);
    
    // Bulk toggle handler
    bulkToggle.addEventListener('click', () => {
      bulkSection.classList.toggle('hidden');
      bulkToggle.textContent = bulkSection.classList.contains('hidden') 
        ? ((State.lang === 'tr') ? 'Toplu Ekle...' : 'Bulk Add...')
        : ((State.lang === 'tr') ? 'Toplu Eklemeyi Gizle' : 'Hide Bulk Add');
    });
    
    // Tab switching
    hheTab.addEventListener('click', () => {
      hheTab.classList.add('active');
      autoTab.classList.remove('active');
      hheForm.classList.remove('hidden');
      autoForm.classList.add('hidden');
    });
    
    autoTab.addEventListener('click', () => {
      autoTab.classList.add('active');
      hheTab.classList.remove('active');
      autoForm.classList.remove('hidden');
      hheForm.classList.add('hidden');
    });
    
    // HHE bulk add handler
    hheAddBtn.addEventListener('click', () => {
      const lines = hheTextarea.value.split('\n').filter(line => line.trim());
      if (lines.length === 0) return;
      
      if (!storage.inventory) storage.inventory = [];
      
      lines.forEach(line => {
        const trimmed = line.trim();
        if (!trimmed) return;
        
        // Parse format: "description" or "description (qty x cbm)"
        let description = trimmed;
        let quantity = 1;
        let cbm = 0;
        
        const match = trimmed.match(/^(.+?)\s*\((\d+)\s*x\s*([\d.]+)\s*(?:cbm)?\)$/i);
        if (match) {
          description = match[1].trim();
          quantity = parseInt(match[2]) || 1;
          cbm = parseFloat(match[3]) || 0;
        }
        
        storage.inventory.push({
          id: Utils.makeId('item'),
          type: 'HHE',
          description: description,
          quantity: quantity,
          cbm: cbm,
          status: 'In Storage',
          dateRetrieved: ''
        });
      });
      
      hheTextarea.value = '';
      Storage.saveStorageRecords();
      this.showDetails(storage);
    });
    
    // Auto add handler
    autoAddBtn.addEventListener('click', () => {
      if (!makeInput.value.trim() || !modelInput.value.trim()) {
        Modals.alert({ title: (State.lang === 'tr') ? 'Uyarı' : 'Warning', message: (State.lang === 'tr') ? 'Lütfen en az Marka ve Model girin' : 'Please enter at least Make and Model' });
        return;
      }
      
      if (!storage.inventory) storage.inventory = [];
      
      storage.inventory.push({
        id: Utils.makeId('item'),
        type: 'Auto',
        description: `${makeInput.value.trim()} ${modelInput.value.trim()}${yearInput.value ? ' ' + yearInput.value : ''}`,
        make: makeInput.value.trim(),
        model: modelInput.value.trim(),
        year: parseInt(yearInput.value) || 0,
        vin: vinInput.value.trim(),
        quantity: 1,
        cbm: 0,
        status: 'In Storage',
        dateRetrieved: ''
      });
      
      makeInput.value = '';
      modelInput.value = '';
      yearInput.value = '';
      vinInput.value = '';
      
      Storage.saveStorageRecords();
      this.showDetails(storage);
    });
    
    return formContainer;
  },


  // Create inventory item row
  createInventoryItemRow(storage, item, idx) {
    const row = $.el('div', { className: 'storage-inventory-item' });
    
    const itemInfo = $.el('div', { className: 'storage-item-info' });
    
    // Type badge + description
    const nameRow = $.el('div', { className: 'storage-inventory-item-type' });
    const typeBadge = $.el('span', { 
      className: `inventory-type-badge inventory-type-badge-${(item.type || 'hhe').toLowerCase()}`,
      textContent: item.type || 'HHE'
    });
    nameRow.appendChild(typeBadge);
    nameRow.appendChild($.el('span', { className: 'storage-item-desc', textContent: item.description }));
    itemInfo.appendChild(nameRow);
    
    // Meta info
    const metaText = [];
    if (item.quantity && item.quantity > 1) metaText.push(`Qty: ${item.quantity}`);
    if (item.cbm) metaText.push(`${item.cbm} cbm`);
    
    // Auto-specific details
    if (item.type === 'Auto') {
      if (item.vin) metaText.push(`VIN: ${item.vin}`);
    }
    
    if (metaText.length > 0) {
      itemInfo.appendChild($.el('span', { className: 'storage-item-meta', textContent: metaText.join(' | ') }));
    }
    
    row.appendChild(itemInfo);
    
    // Status badge
    const statusClass = (item.status || 'In Storage').toLowerCase().replace(/\s+/g, '-');
    row.appendChild($.el('span', { 
      className: `storage-item-status storage-item-status-${statusClass}`,
      textContent: I18n.storageStatusText(item.status || 'In Storage')
    }));
    
    // Actions
    const actions = $.el('div', { className: 'storage-item-actions' });
    
    if (item.status !== 'Retrieved') {
      const retrieveBtn = $.el('button', { 
        type: 'button', 
        className: 'btn-icon',
        textContent: I18n.t('retrieve')
      });
      retrieveBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.retrieveItem(storage, idx);
      });
      actions.appendChild(retrieveBtn);
    }
    
    const deleteBtn = $.el('button', { 
      type: 'button', 
      className: 'btn-icon btn-icon-danger',
      textContent: I18n.t('delete')
    });
    deleteBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.deleteItem(storage, idx);
    });
    actions.appendChild(deleteBtn);
    
    row.appendChild(actions);
    return row;
  },

  // Retrieve an inventory item
  retrieveItem(storage, idx) {
    if (!storage.inventory || !storage.inventory[idx]) return;
    
    storage.inventory[idx].status = 'Retrieved';
    storage.inventory[idx].dateRetrieved = new Date().toISOString().split('T')[0];
    
    // Check if all items retrieved - auto-close storage
    const allRetrieved = storage.inventory.every(item => item.status === 'Retrieved');
    if (allRetrieved && !storage.dateExited) {
      storage.dateExited = new Date().toISOString().split('T')[0];
      storage.status = 'Closed';
    }
    
    Storage.saveStorageRecords();
    this.render();
    this.showDetails(storage);
  },

  // Delete an inventory item
  async deleteItem(storage, idx) {
    const confirmed = await Modals.confirm({
      title: (State.lang === 'tr') ? 'Öğeyi Sil' : 'Delete Item',
      message: I18n.t('confirmDeleteItem'),
      danger: true,
      confirmText: (State.lang === 'tr') ? 'Sil' : 'Delete'
    });
    if (!confirmed) return;
    
    storage.inventory.splice(idx, 1);
    Storage.saveStorageRecords();
    this.showDetails(storage);
  },

  // Open modal for create/edit
  openModal(mode, storage = null) {
    State.storageFormMode = mode;
    
    const modal = $.get('storageModal');
    const form = $.get('storageForm');
    const title = $.get('storageModalTitle');
    
    if (!modal || !form) return;
    
    // Set title
    title.textContent = mode === 'create' ? I18n.t('modalAddStorageTitle') : I18n.t('modalEditStorageTitle');
    
    // Populate location dropdown
    const locSelect = $.get('storageLocationSelect');
    if (locSelect) {
      while (locSelect.options.length > 1) locSelect.remove(1);
      CONFIG.STORAGE_LOCATIONS.forEach(loc => {
        locSelect.appendChild($.el('option', { value: loc.id, textContent: loc.name }));
      });
    }
    
    // Populate linked job dropdown
    const jobSelect = $.get('storageLinkedJobSelect');
    if (jobSelect) {
      while (jobSelect.options.length > 1) jobSelect.remove(1);
      State.jobs.forEach(job => {
        jobSelect.appendChild($.el('option', { 
          value: job.id, 
          textContent: `${job.jobCode} - ${job.clientName || 'No client'}`
        }));
      });
    }
    
    // Reset or populate form
    if (mode === 'create') {
      form.reset();
      form.storageCode.value = Utils.storageCode();
      form.status.value = 'Active';
      form.billingType.value = 'Per CBM';
    } else if (storage) {
      form.storageCode.value = storage.storageCode;
      form.clientName.value = storage.clientName || '';
      form.organizationName.value = storage.organizationName || '';
      form.linkedJobId.value = storage.linkedJobId || '';
      form.location.value = storage.location || '';
      form.totalCBM.value = storage.totalCBM || '';
      form.grossWeight.value = storage.grossWeight || '';
      form.dateEntered.value = Utils.formatDateForInput(storage.dateEntered) || '';
      form.dateExited.value = Utils.formatDateForInput(storage.dateExited) || '';
      form.billingType.value = storage.billingType || 'Per CBM';
      form.ratePerCBM.value = storage.ratePerCBM || '';
      form.rateCurrency.value = storage.rateCurrency || 'TRY';
      form.ratePeriod.value = storage.ratePeriod || 'Monthly';
      form.flatRate.value = storage.flatRate || '';
      form.flatRateCurrency.value = storage.flatRateCurrency || 'TRY';
      form.freeDays.value = storage.freeDays || '';
      form.billingNotes.value = storage.billingNotes || '';
      form.status.value = storage.status || 'Active';
      form.notes.value = storage.notes || '';
      
      // Contents checkboxes
      form.querySelectorAll('input[name="contents"]').forEach(cb => {
        cb.checked = (storage.contents || []).includes(cb.value);
      });
      
      modal.dataset.storageId = storage.id;
    }
    
    // Toggle billing fields
    this.toggleBillingFields();
    
    modal.classList.remove('hidden');
  },

  // Toggle billing type fields visibility
  toggleBillingFields() {
    const billingType = $.get('storageBillingTypeSelect');
    const cbmFields = $.get('storageCbmBillingFields');
    const flatFields = $.get('storageFlatRateFields');
    
    if (!billingType || !cbmFields || !flatFields) return;
    
    if (billingType.value === 'Flat Rate') {
      cbmFields.classList.add('hidden');
      flatFields.classList.remove('hidden');
    } else {
      cbmFields.classList.remove('hidden');
      flatFields.classList.add('hidden');
    }
  },

  // Save storage from form
  saveFromForm() {
    const modal = $.get('storageModal');
    const form = $.get('storageForm');
    
    if (!form) return;
    
    const isEdit = State.storageFormMode === 'edit';
    let storage;
    
    if (isEdit) {
      storage = State.getStorage(modal.dataset.storageId);
      if (!storage) return;
    } else {
      storage = Validator.normalizeStorageRecord({});
    }
    
    // Update fields
    storage.storageCode = form.storageCode.value;
    storage.clientName = form.clientName.value;
    storage.organizationName = form.organizationName.value;
    storage.linkedJobId = form.linkedJobId.value;
    storage.location = form.location.value;
    storage.contents = Array.from(form.querySelectorAll('input[name="contents"]:checked')).map(cb => cb.value);
    storage.totalCBM = parseFloat(form.totalCBM.value) || 0;
    storage.grossWeight = parseFloat(form.grossWeight.value) || 0;
    storage.dateEntered = Utils.parseDate(form.dateEntered.value) || '';
    storage.dateExited = Utils.parseDate(form.dateExited.value) || '';
    storage.billingType = form.billingType.value;
    storage.ratePerCBM = parseFloat(form.ratePerCBM.value) || 0;
    storage.rateCurrency = form.rateCurrency.value;
    storage.ratePeriod = form.ratePeriod.value;
    storage.flatRate = parseFloat(form.flatRate.value) || 0;
    storage.flatRateCurrency = form.flatRateCurrency.value;
    storage.freeDays = parseInt(form.freeDays.value) || 0;
    storage.billingNotes = form.billingNotes.value;
    storage.status = form.status.value;
    storage.notes = form.notes.value;
    
    // If linked to job, update job's storageId
    if (storage.linkedJobId) {
      const linkedJob = State.getJob(storage.linkedJobId);
      if (linkedJob) {
        linkedJob.storageId = storage.id;
        linkedJob.hasStorage = true;
        Storage.saveJobs();
      }
    }
    
    if (!isEdit) {
      State.storageRecords.push(storage);
    }
    
    Storage.saveStorageRecords();
    modal.classList.add('hidden');
    
    State.selectedStorageId = storage.id;
    this.render();
    this.showDetails(storage);
  },

  // Delete a storage record
  async deleteStorage(storageId) {
    const storage = State.getStorage(storageId);
    if (!storage) return;
    
    const confirmed = await Modals.confirm({
      title: (State.lang === 'tr') ? 'Depo Kaydını Sil' : 'Delete Storage Record',
      message: I18n.t('confirmDeleteStorage'),
      danger: true,
      confirmText: (State.lang === 'tr') ? 'Sil' : 'Delete'
    });
    if (!confirmed) return;
    
    // Unlink from job if linked
    if (storage.linkedJobId) {
      const job = State.getJob(storage.linkedJobId);
      if (job) {
        job.storageId = '';
        job.hasStorage = false;
        Storage.saveJobs();
      }
    }
    
    // Remove storage record
    const idx = State.storageRecords.findIndex(s => s.id === storageId);
    if (idx !== -1) {
      State.storageRecords.splice(idx, 1);
      Storage.saveStorageRecords();
    }
    
    State.selectedStorageId = null;
    this.render();
    
    const panel = $.get('storageDetailsPanel');
    if (panel) {
      $.clear(panel);
      panel.appendChild($.el('p', { textContent: I18n.t('hintSelectStorage') }));
    }
  },

  // Render storage section in job details (legacy support)
  renderJobStorageSection(job) {
    const section = $.el('div', { className: 'storage-details-section' });
    
    // Check if job has linked storage record
    if (job.storageId) {
      const storage = State.getStorage(job.storageId);
      if (storage) {
        const header = $.el('div', { className: 'storage-details-header' });
        header.appendChild($.el('h4', { className: 'details-section-title', textContent: I18n.t('storageDetails') }));
        
        const viewBtn = $.el('button', { 
          type: 'button', 
          className: 'btn-icon',
          textContent: I18n.t('viewStorage')
        });
        viewBtn.addEventListener('click', () => {
          Views.show('storage');
          State.selectedStorageId = storage.id;
          this.render();
          this.showDetails(storage);
        });
        header.appendChild(viewBtn);
        section.appendChild(header);
        
        // Quick summary
        const summary = $.el('div', { className: 'storage-info-grid' });
        
        const infoRows = [
          [I18n.t('storageCode'), storage.storageCode],
          [I18n.t('location'), this.getLocationName(storage.location)],
          [I18n.t('status'), I18n.storageStatusText(storage.status)],
          [I18n.t('daysInStorage'), this.getDaysInStorage(storage)]
        ];
        
        infoRows.forEach(([label, value]) => {
          const row = $.el('div', { className: 'storage-info-row' });
          row.appendChild($.el('span', { className: 'storage-info-label', textContent: label }));
          row.appendChild($.el('span', { className: 'storage-info-value', textContent: value }));
          summary.appendChild(row);
        });
        
        section.appendChild(summary);
        return section;
      }
    }
    
    return section;
  }
};

// ============================================================
// PART 3 OF 4: AGENTS & SCHEDULE UI
// ============================================================

const AgentsUI = {
  render() {
    const container = $.get('agentList');
    const allAgents = this.filter();
    $.clear(container);
    
    // Update tab active state
    document.querySelectorAll('.agent-type-tab').forEach(tab => {
      const isAgent = tab.dataset.type === 'Agent';
      const isCurrentlyAgents = State.agentTypeFilter === 'Agent';
      tab.classList.toggle('active', isAgent === isCurrentlyAgents);
    });
    
    // Update button text based on current tab
    const addBtn = $.get('openCreateAgentBtn');
    if (addBtn) {
      const isAgentTab = State.agentTypeFilter === 'Agent';
      addBtn.textContent = isAgentTab ? I18n.t('addAgent') : I18n.t('addBroker');
    }
    
    if (allAgents.length === 0) {
      const emptyMsg = State.agentTypeFilter === 'Agent' ? I18n.t('noAgentsYet') : I18n.t('noBrokersYet');
      container.appendChild($.el('p', { textContent: emptyMsg }));
      return;
    }
    
    // Pagination
    const { page, perPage } = State.pagination.agents;
    const totalPages = Math.ceil(allAgents.length / perPage);
    const startIdx = (page - 1) * perPage;
    const pageAgents = allAgents.slice(startIdx, startIdx + perPage);
    
    pageAgents.forEach(agent => {
      container.appendChild(this.createAgentCard(agent));
    });
    
    // Add pagination controls if more than one page
    if (totalPages > 1) {
      container.appendChild(this.createPaginationControls('agents', page, totalPages, allAgents.length));
    }
  },
  
  createAgentCard(agent) {
    const card = $.el('div', { className: 'agent-list-card' });
    
    // Name row with type badge for brokers
    const nameRow = $.el('div', { className: 'agent-card-name-row' });
    nameRow.appendChild($.el('h3', { textContent: agent.name }));
    
    // Add type badge for brokers
    if (agent.type && agent.type !== 'Agent') {
      const badgeClass = agent.type === 'Customs Broker' ? 'agent-type-badge-customs' :
                        agent.type === 'Sea Freight Broker' ? 'agent-type-badge-sea' : 'agent-type-badge-air';
      const shortLabel = agent.type === 'Customs Broker' 
        ? ((State.lang === 'tr') ? 'Gümrük' : 'Customs')
        : agent.type === 'Sea Freight Broker' 
          ? ((State.lang === 'tr') ? 'Deniz' : 'Sea') 
          : ((State.lang === 'tr') ? 'Hava' : 'Air');
      nameRow.appendChild($.el('span', { 
        className: `agent-type-badge ${badgeClass}`,
        textContent: shortLabel
      }));
    }
    card.appendChild(nameRow);
    
    card.appendChild($.el('p', { textContent: Utils.location(agent.city, agent.country) }));
    
    // For agents, show move count. For brokers, show job usage count
    if (agent.type === 'Agent' || !agent.type) {
      const moveCount = State.jobs.filter(
        j => j.originAgentId === agent.id || j.destinationAgentId === agent.id
      ).length;
      card.appendChild($.el('p', {
        className: 'agent-moves-summary',
        textContent: moveCount === 1
          ? ((State.lang === 'tr') ? '1 taşıma' : '1 move')
          : ((State.lang === 'tr') ? `${moveCount} taşıma` : `${moveCount} moves`)
      }));
      
      // FIDI/IAM badges for agents
      if (agent.isFIDI || agent.isIAM) {
        const badgesRow = $.el('div', { className: 'agent-card-badges' });
        if (agent.isFIDI) badgesRow.appendChild($.el('span', { className: 'membership-badge fidi-badge', textContent: 'FIDI' }));
        if (agent.isIAM) badgesRow.appendChild($.el('span', { className: 'membership-badge iam-badge', textContent: 'IAM' }));
        card.appendChild(badgesRow);
      }
    } else {
      // For brokers, show usage in jobs
      const usageCount = State.jobs.filter(j => 
        j.customsBrokerId === agent.id || 
        j.seaFreightBrokerId === agent.id || 
        j.airFreightBrokerId === agent.id
      ).length;
      card.appendChild($.el('p', {
        className: 'agent-moves-summary',
        textContent: usageCount === 1
          ? ((State.lang === 'tr') ? '1 taşıma' : '1 move')
          : ((State.lang === 'tr') ? `${usageCount} taşıma` : `${usageCount} moves`)
      }));
    }
    
    card.addEventListener('click', () => {
      State.selectedAgentId = agent.id;
      this.showDetails(agent);
    });
    
    return card;
  },
  
  createPaginationControls(type, currentPage, totalPages, totalItems) {
    const wrapper = $.el('div', { className: 'pagination-controls' });
    
    const { perPage } = State.pagination[type];
    const start = (currentPage - 1) * perPage + 1;
    const end = Math.min(currentPage * perPage, totalItems);
    const infoText = (State.lang === 'tr') 
      ? `${totalItems} kayıttan ${start}-${end} arası gösteriliyor`
      : `Showing ${start}-${end} of ${totalItems}`;
    wrapper.appendChild($.el('span', { className: 'pagination-info', textContent: infoText }));
    
    const buttons = $.el('div', { className: 'pagination-buttons' });
    
    const prevBtn = $.el('button', { 
      type: 'button', 
      textContent: '← ' + ((State.lang === 'tr') ? 'Önceki' : 'Previous'),
      disabled: currentPage === 1
    });
    prevBtn.addEventListener('click', () => {
      if (State.pagination[type].page > 1) {
        State.pagination[type].page--;
        this.render();
      }
    });
    buttons.appendChild(prevBtn);
    
    buttons.appendChild($.el('span', { 
      className: 'pagination-current',
      textContent: `${currentPage} / ${totalPages}` 
    }));
    
    const nextBtn = $.el('button', { 
      type: 'button', 
      textContent: ((State.lang === 'tr') ? 'Sonraki' : 'Next') + ' →',
      disabled: currentPage === totalPages
    });
    nextBtn.addEventListener('click', () => {
      if (State.pagination[type].page < totalPages) {
        State.pagination[type].page++;
        this.render();
      }
    });
    buttons.appendChild(nextBtn);
    
    wrapper.appendChild(buttons);
    return wrapper;
  },

  filter() {
    let list = [...State.agents];
    
    // Filter by type (Agent tab vs Broker tab)
    if (State.agentTypeFilter === 'Agent') {
      list = list.filter(a => !a.type || a.type === 'Agent');
    } else {
      // Broker tab - show all broker types
      list = list.filter(a => a.type && a.type !== 'Agent');
    }
    
    // Filter by search
    if (State.agentSearch) {
      const term = State.agentSearch.toLowerCase();
      list = list.filter(agent => {
        const text = [
          agent.name, 
          agent.city, 
          agent.country,
          CONFIG.getCountryNameBilingual(agent.country),  // Both EN and TR country
          agent.type,
          I18n.agentTypeTextBilingual(agent.type)         // Both EN and TR type
        ]
          .filter(Boolean)
          .join(' ')
          .toLowerCase();
        return text.includes(term);
      });
    }
    return list;
  },

  showDetails(agent) {
    State.editingContactIndex = null;
    State.selectedAgentId = agent.id;
    const container = $.get('agentDetailsPanel');
    $.clear(container);
    
    const isAgent = !agent.type || agent.type === 'Agent';
    const isBroker = !isAgent;

    // Header with name and action buttons at top right
    const headerRow = $.el('div', { className: 'agent-detail-header' });
    const nameWithType = $.el('div', { className: 'agent-name-with-type' });
    nameWithType.appendChild($.el('h3', { textContent: agent.name }));
    
    // Type badge for brokers
    if (isBroker) {
      const badgeClass = agent.type === 'Customs Broker' ? 'agent-type-badge-customs' :
                        agent.type === 'Sea Freight Broker' ? 'agent-type-badge-sea' : 'agent-type-badge-air';
      const typeKey = agent.type === 'Customs Broker' ? 'typeCustomsBroker' :
                      agent.type === 'Sea Freight Broker' ? 'typeSeaFreightBroker' : 'typeAirFreightBroker';
      nameWithType.appendChild($.el('span', { 
        className: `agent-type-badge ${badgeClass}`,
        textContent: I18n.t(typeKey)
      }));
    }
    headerRow.appendChild(nameWithType);
    
    const actions = $.el('div', { className: 'agent-header-actions' });
    const editBtn = $.el('button', { type: 'button', className: 'btn-icon', textContent: I18n.t('edit') });
    editBtn.addEventListener('click', () => {
      State.agentFormMode = 'edit';
      this.showModal(agent);
    });
    const delBtn = $.el('button', { type: 'button', className: 'btn-icon btn-icon-danger', textContent: I18n.t('delete') });
    delBtn.addEventListener('click', async () => {
      const confirmMsg = isAgent ? I18n.t('deleteAgentConfirm') : I18n.t('deleteBrokerConfirm');
      const confirmed = await Modals.confirm({
        title: isAgent ? ((State.lang === 'tr') ? 'Acenteyi Sil' : 'Delete Agent') : ((State.lang === 'tr') ? 'Broker\'ı Sil' : 'Delete Broker'),
        message: confirmMsg,
        danger: true,
        confirmText: (State.lang === 'tr') ? 'Sil' : 'Delete'
      });
      if (!confirmed) return;
      State.agents = State.agents.filter(a => a.id !== agent.id);
      Storage.saveAgents();
      Forms.refreshAgentSelects();
      this.render();
      $.clear(container);
      container.appendChild($.el('p', { textContent: isAgent ? I18n.t('noAgentsYet') : I18n.t('noBrokersYet') }));
    });
    actions.appendChild(editBtn);
    actions.appendChild(delBtn);
    headerRow.appendChild(actions);
    container.appendChild(headerRow);

    // Location
    const locP = $.el('p', { className: 'agent-location' });
    locP.appendChild($.el('strong', { textContent: I18n.t('location') + ': ' }));
    locP.appendChild(document.createTextNode(Utils.location(agent.city, agent.country)));
    container.appendChild(locP);

    // FIDI/IAM badges - only for agents
    if (isAgent && (agent.isFIDI || agent.isIAM)) {
      const badgesRow = $.el('div', { className: 'agent-membership-badges' });
      if (agent.isFIDI) {
        const fidiBadge = $.el('span', { className: 'membership-badge fidi-badge' });
        fidiBadge.innerHTML = 'FIDI ✓';
        badgesRow.appendChild(fidiBadge);
      }
      if (agent.isIAM) {
        const iamBadge = $.el('span', { className: 'membership-badge iam-badge' });
        iamBadge.innerHTML = 'IAM ✓';
        badgesRow.appendChild(iamBadge);
      }
      container.appendChild(badgesRow);
    }
    
    // Notes (if any)
    if (agent.notes) {
      const notesP = $.el('p', { className: 'agent-notes' });
      notesP.appendChild($.el('strong', { textContent: I18n.t('notes') + ': ' }));
      notesP.appendChild(document.createTextNode(agent.notes));
      container.appendChild(notesP);
    }

    this.renderContacts(container, agent);

    // Recent moves/jobs section
    if (isAgent) {
      // For agents: show moves where they are origin or destination agent
      container.appendChild($.el('h4', { className: 'details-section-title', textContent: I18n.t('recentMoves') }));
      const moves = State.jobs.filter(j => j.originAgentId === agent.id || j.destinationAgentId === agent.id);
      if (moves.length === 0) {
        container.appendChild($.el('p', { textContent: I18n.t('noMovesLinked') }));
      } else {
        const ul = $.el('ul');
        moves.forEach(job => {
          const role = job.originAgentId === agent.id ? I18n.t('originAgentRole') : I18n.t('destinationAgentRole');
          const route = `${job.originCity || '?'} → ${job.destinationCity || '?'}`;
          const li = $.el('li', {
            className: 'agent-job-link',
            textContent: `${job.jobCode || '-'} – ${job.clientName || '-'} (${route}) [${role}]`
          });
          li.addEventListener('click', () => {
            Views.show('moves');
            JobsUI.render();
            JobsUI.showDetails(job);
          });
          ul.appendChild(li);
        });
        container.appendChild(ul);
      }
    } else {
      // For brokers: show jobs where they were used
      container.appendChild($.el('h4', { className: 'details-section-title', textContent: I18n.t('jobsUsingBroker') }));
      const jobs = State.jobs.filter(j => 
        j.customsBrokerId === agent.id || 
        j.seaFreightBrokerId === agent.id || 
        j.airFreightBrokerId === agent.id
      );
      if (jobs.length === 0) {
        container.appendChild($.el('p', { textContent: I18n.t('noBrokerJobs') }));
      } else {
        const ul = $.el('ul');
        jobs.forEach(job => {
          const li = $.el('li', {
            className: 'agent-job-link',
            textContent: `${job.jobCode || '-'} – ${job.clientName || '-'}`
          });
          li.addEventListener('click', () => {
            Views.show('moves');
            JobsUI.render();
            JobsUI.showDetails(job);
          });
          ul.appendChild(li);
        });
        container.appendChild(ul);
      }
    }
  },

  renderContacts(container, agent) {
    // Main contacts section container
    const section = $.el('div', { className: 'agent-contacts-section' });
    
    // Header with title and Add Contact button
    const header = $.el('div', { className: 'agent-contacts-header' });
    header.appendChild($.el('h4', { textContent: I18n.t('contacts') }));
    
    const addContactBtn = $.el('button', { 
      type: 'button', 
      className: 'add-contact-btn',
      textContent: (State.lang === 'tr') ? '+ Kişi Ekle' : '+ Add Contact'
    });
    header.appendChild(addContactBtn);
    section.appendChild(header);
    
    // Contacts list
    if (!Array.isArray(agent.contacts)) agent.contacts = [];
    
    const contactsList = $.el('div', { className: 'contacts-list' });
    
    if (agent.contacts.length === 0) {
      contactsList.appendChild($.el('div', { 
        className: 'no-contacts-message',
        textContent: (State.lang === 'tr') ? 'Henüz kişi eklenmedi.' : 'No contacts added yet.'
      }));
    } else {
      agent.contacts.forEach((contact, idx) => {
        const card = $.el('div', { className: 'contact-card' });
        
        // Card header with name and actions
        const cardHeader = $.el('div', { className: 'contact-card-header' });
        cardHeader.appendChild($.el('h5', { 
          className: 'contact-card-name', 
          textContent: contact.name || (State.lang === 'tr' ? 'İsimsiz Kişi' : 'Unnamed Contact')
        }));
        
        const cardActions = $.el('div', { className: 'contact-card-actions' });
        
        const editBtn = $.el('button', { type: 'button', textContent: I18n.t('edit') });
        editBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          // Show the form and populate it for editing
          State.editingContactIndex = idx;
          formContainer.classList.remove('hidden');
          formTitle.textContent = (State.lang === 'tr') ? 'Kişiyi Düzenle' : 'Edit Contact';
          nameInput.value = contact.name || '';
          emailInput.value = contact.email || '';
          phoneInput.value = contact.phone || '';
          notesInput.value = contact.notes || '';
          saveBtn.textContent = I18n.t('updateContact');
        });
        
        const delBtn = $.el('button', { type: 'button', className: 'btn-danger', textContent: I18n.t('delete') });
        delBtn.addEventListener('click', async (e) => {
          e.stopPropagation();
          const confirmed = await Modals.confirm({
            title: (State.lang === 'tr') ? 'Kişiyi Sil' : 'Delete Contact',
            message: I18n.t('deleteContactConfirm'),
            danger: true,
            confirmText: (State.lang === 'tr') ? 'Sil' : 'Delete'
          });
          if (!confirmed) return;
          
          if (State.editingContactIndex === idx) {
            State.editingContactIndex = null;
          } else if (State.editingContactIndex != null && State.editingContactIndex > idx) {
            State.editingContactIndex--;
          }
          
          agent.contacts.splice(idx, 1);
          Storage.saveAgents();
          this.showDetails(agent);
        });
        
        cardActions.appendChild(editBtn);
        cardActions.appendChild(delBtn);
        cardHeader.appendChild(cardActions);
        card.appendChild(cardHeader);
        
        // Card info (email, phone)
        const cardInfo = $.el('div', { className: 'contact-card-info' });
        if (contact.email) {
          cardInfo.appendChild($.el('span', { 
            className: 'contact-card-info-item email', 
            textContent: contact.email 
          }));
        }
        if (contact.phone) {
          cardInfo.appendChild($.el('span', { 
            className: 'contact-card-info-item phone', 
            textContent: contact.phone 
          }));
        }
        if (cardInfo.children.length > 0) {
          card.appendChild(cardInfo);
        }
        
        // Card notes
        if (contact.notes) {
          card.appendChild($.el('div', {
            className: 'contact-card-notes',
            textContent: contact.notes
          }));
        }
        
        contactsList.appendChild(card);
      });
    }
    
    section.appendChild(contactsList);
    
    // Hidden form container for adding/editing contacts
    const formContainer = $.el('div', { className: 'contact-form-container hidden' });
    
    const formTitle = $.el('h5', { 
      className: 'contact-form-title',
      textContent: (State.lang === 'tr') ? 'Yeni Kişi Ekle' : 'Add New Contact'
    });
    formContainer.appendChild(formTitle);
    
    const formGrid = $.el('div', { className: 'contact-form-grid' });
    
    // Name input
    const nameDiv = $.el('div');
    nameDiv.appendChild($.el('label', { textContent: I18n.t('contactName') }));
    const nameInput = $.el('input', { 
      type: 'text', 
      id: 'contactNameInput', 
      placeholder: (State.lang === 'tr') ? 'İsim girin...' : 'Enter name...' 
    });
    nameDiv.appendChild(nameInput);
    formGrid.appendChild(nameDiv);
    
    // Email input
    const emailDiv = $.el('div');
    emailDiv.appendChild($.el('label', { textContent: I18n.t('email') }));
    const emailInput = $.el('input', { 
      type: 'email', 
      id: 'contactEmailInput', 
      placeholder: (State.lang === 'tr') ? 'E-posta girin...' : 'Enter email...' 
    });
    emailDiv.appendChild(emailInput);
    formGrid.appendChild(emailDiv);
    
    // Phone input
    const phoneDiv = $.el('div');
    phoneDiv.appendChild($.el('label', { textContent: I18n.t('phone') }));
    const phoneInput = $.el('input', { 
      type: 'text', 
      id: 'contactPhoneInput', 
      placeholder: (State.lang === 'tr') ? 'Telefon girin...' : 'Enter phone...' 
    });
    phoneDiv.appendChild(phoneInput);
    formGrid.appendChild(phoneDiv);
    
    // Notes input (full width)
    const notesDiv = $.el('div', { className: 'full-width' });
    notesDiv.appendChild($.el('label', { textContent: I18n.t('notesLabel') }));
    const notesInput = $.el('textarea', { 
      id: 'contactNotesInput', 
      rows: '2', 
      placeholder: (State.lang === 'tr') ? 'Notlar ekleyin...' : 'Add notes...' 
    });
    notesDiv.appendChild(notesInput);
    formGrid.appendChild(notesDiv);
    
    formContainer.appendChild(formGrid);
    
    // Form actions
    const formActions = $.el('div', { className: 'contact-form-actions' });
    
    const cancelBtn = $.el('button', { 
      type: 'button', 
      className: 'cancel-btn',
      textContent: I18n.t('cancel')
    });
    cancelBtn.addEventListener('click', () => {
      formContainer.classList.add('hidden');
      State.editingContactIndex = null;
      nameInput.value = '';
      emailInput.value = '';
      phoneInput.value = '';
      notesInput.value = '';
      formTitle.textContent = (State.lang === 'tr') ? 'Yeni Kişi Ekle' : 'Add New Contact';
      saveBtn.textContent = I18n.t('addContact');
    });
    
    const saveBtn = $.el('button', {
      type: 'button',
      textContent: I18n.t('addContact')
    });
    saveBtn.addEventListener('click', () => {
      const name = (nameInput.value || '').trim();
      const email = (emailInput.value || '').trim();
      const phone = (phoneInput.value || '').trim();
      const notes = (notesInput.value || '').trim();
      
      if (!name && !email && !phone && !notes) {
        Modals.alert({ title: (State.lang === 'tr') ? 'Uyarı' : 'Warning', message: I18n.t('fillAtLeastOneField') });
        return;
      }
      
      const newContact = { name, email, phone, notes };
      
      if (State.editingContactIndex != null) {
        agent.contacts[State.editingContactIndex] = newContact;
        State.editingContactIndex = null;
      } else {
        agent.contacts.push(newContact);
      }
      
      Storage.saveAgents();
      this.showDetails(agent);
    });
    
    formActions.appendChild(cancelBtn);
    formActions.appendChild(saveBtn);
    formContainer.appendChild(formActions);
    
    section.appendChild(formContainer);
    
    // Add Contact button click handler
    addContactBtn.addEventListener('click', () => {
      State.editingContactIndex = null;
      formTitle.textContent = (State.lang === 'tr') ? 'Yeni Kişi Ekle' : 'Add New Contact';
      saveBtn.textContent = I18n.t('addContact');
      nameInput.value = '';
      emailInput.value = '';
      phoneInput.value = '';
      notesInput.value = '';
      formContainer.classList.remove('hidden');
      nameInput.focus();
    });
    
    container.appendChild(section);
  },

  showModal(agent = null) {
    const form = $.get('agentForm');
    form.reset();
    
    const membershipsSection = $.get('agentMembershipsSection');
    const typeSelect = form.agentType;
    
    // Toggle memberships visibility based on type
    const updateMembershipsVisibility = () => {
      if (membershipsSection) {
        membershipsSection.style.display = typeSelect.value === 'Agent' ? 'block' : 'none';
      }
    };
    
    typeSelect.addEventListener('change', updateMembershipsVisibility);
    
    if (State.agentFormMode === 'edit' && agent) {
      const isAgent = !agent.type || agent.type === 'Agent';
      $.get('agentModalTitle').textContent = isAgent ? I18n.t('editAgentTitle') : I18n.t('editBrokerTitle');
      form.agentType.value = agent.type || 'Agent';
      form.agentName.value = agent.name || '';
      form.agentCity.value = agent.city || '';
      form.agentCountry.value = agent.country || '';
      if (form.isFIDI) form.isFIDI.checked = agent.isFIDI || false;
      if (form.isIAM) form.isIAM.checked = agent.isIAM || false;
      if (form.agentNotes) form.agentNotes.value = agent.notes || '';
      State.selectedAgentId = agent.id;
    } else {
      // When creating new, use current tab to set default type
      const isAgentTab = State.agentTypeFilter === 'Agent';
      $.get('agentModalTitle').textContent = isAgentTab ? I18n.t('addAgentTitle') : I18n.t('addBrokerTitle');
      form.agentType.value = isAgentTab ? 'Agent' : 'Customs Broker';
      State.selectedAgentId = null;
    }
    
    updateMembershipsVisibility();
    Modals.open('createAgentModal');
  }
};

// ============================================================
// schedule extra jobs helper (linked to move support)
// ============================================================

const ScheduleExtraJobs = {
  getLinkedToJob(jobId) {
    const idStr = String(jobId);
    const out = [];
    Object.keys(State.scheduleExtraJobs || {}).forEach(dateStr => {
      const arr = State.scheduleExtraJobs[dateStr] || [];
      arr.forEach(ej => {
        const fixed = Validator.normalizeExtraJob(ej, dateStr);
        if (fixed.linkedJobId && String(fixed.linkedJobId) === idStr) {
          out.push({ dateStr, ej: fixed });
        }
      });
    });
    out.sort((a, b) => {
      const d = a.dateStr.localeCompare(b.dateStr);
      if (d !== 0) return d;
      return (a.ej.time || '').localeCompare(b.ej.time || '');
    });
    return out;
  },

  deleteById(dateStr, id) {
    const arr = State.scheduleExtraJobs[dateStr] || [];
    const idx = arr.findIndex(e => String(e.id) === String(id));
    if (idx !== -1) {
      arr.splice(idx, 1);
      if (!arr.length) delete State.scheduleExtraJobs[dateStr];
    }
  }
};

const ScheduleUI = {
  render() {
    const year = State.schedule.year;
    const month = State.schedule.month;
    const firstDay = new Date(year, month, 1);
    const startWeekday = (firstDay.getDay() + 6) % 7;
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const locale = I18n.dict[State.lang]?.monthLocale;
    $.get('monthLabel').textContent = firstDay.toLocaleDateString(locale || undefined, {
      month: 'long',
      year: 'numeric'
    });
    
    // Update office filter button states
    document.querySelectorAll('.office-filter-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.office === State.scheduleOfficeFilter);
    });

    const calendar = $.get('scheduleCalendar');
    $.clear(calendar);
    for (let i = 0; i < startWeekday; i++) {
      calendar.appendChild($.el('div', { className: 'calendar-day empty' }));
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${year}-${String(month + 1).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
      
      // Check if this is today
      const today = new Date();
      const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2,'0')}-${String(today.getDate()).padStart(2,'0')}`;
      const isToday = dateStr === todayStr;
      
      // Count completed and uncompleted items (with office filter)
      let completedCount = 0;
      let uncompletedCount = 0;
      
      const officeFilter = State.scheduleOfficeFilter;
      
      State.jobs.forEach(job => {
        if (Array.isArray(job.steps)) {
          job.steps.filter(s => s.date === dateStr).forEach(step => {
            // Apply office filter
            if (officeFilter !== 'All' && step.office !== officeFilter) return;
            
            if (step.completed) {
              completedCount++;
            } else {
              uncompletedCount++;
            }
          });
        }
      });
      
      // Count extra jobs (with office filter)
      const extraJobs = State.scheduleExtraJobs[dateStr] || [];
      extraJobs.forEach(ej => {
        // Apply office filter
        if (officeFilter !== 'All' && ej.office !== officeFilter) return;
        
        if (ej.completed) {
          completedCount++;
        } else {
          uncompletedCount++;
        }
      });
      
      const hasItems = completedCount > 0 || uncompletedCount > 0;

      const dayDiv = $.el('div', {
        className: `calendar-day${
          hasItems ? ' has-moves' : ''
        }${
          State.schedule.selectedDate === dateStr ? ' selected' : ''
        }${
          isToday ? ' today' : ''
        }`
      });
      dayDiv.appendChild($.el('div', {
        className: 'day-number',
        textContent: String(day)
      }));
      
      // Add badges container if there are items
      if (hasItems) {
        const badgesContainer = $.el('div', { className: 'day-badges' });
        
        if (uncompletedCount > 0) {
          badgesContainer.appendChild($.el('span', {
            className: 'day-badge day-badge-pending',
            textContent: String(uncompletedCount)
          }));
        }
        
        if (completedCount > 0) {
          badgesContainer.appendChild($.el('span', {
            className: 'day-badge day-badge-completed',
            textContent: String(completedCount)
          }));
        }
        
        dayDiv.appendChild(badgesContainer);
      }
      dayDiv.addEventListener('click', () => {
        State.schedule.selectedDate = dateStr;
        this.render();
        this.renderDay(dateStr);
      });
      calendar.appendChild(dayDiv);
    }
  },

  renderDay(dateStr) {
  const container = $.get('scheduleDayDetails');
  $.clear(container);

  const topRow = $.el('div', { style: 'display:flex; justify-content:space-between; align-items:center; gap:10px; flex-wrap:wrap; margin-bottom: 16px;' });
  topRow.appendChild($.el('h3', { 
    textContent: I18n.t('dayDetails') + ': ' + Utils.formatDate(dateStr), 
    style: 'margin:0;' 
  }));

  const btnGroup = $.el('div', { style: 'display:flex; gap:8px;' });
  
  const addJobBtn = $.el('button', { type: 'button', textContent: (State.lang === 'tr') ? '+ Ek İş Ekle' : 'Add Additional Job' });
  btnGroup.appendChild(addJobBtn);
  
  const exportBtn = $.el('button', { type: 'button', textContent: I18n.t('exportDayPdf') });
  exportBtn.addEventListener('click', () => ScheduleExport.exportDayToPdf(dateStr));
  btnGroup.appendChild(exportBtn);
  
  topRow.appendChild(btnGroup);
  container.appendChild(topRow);

  const stepsForDay = Steps.getForDate(dateStr);
  const extraJobs = (State.scheduleExtraJobs[dateStr] || []).map(ej => Validator.normalizeExtraJob(ej, dateStr));
  const dayNote = State.scheduleNotes[dateStr] || '';

  // Combine all items and group by office
  const allItems = [];
  
  // Add steps
  stepsForDay.forEach(({ job, step }) => {
    allItems.push({
      type: 'step',
      job,
      step,
      office: step.office || '',
      time: step.time || '',
      completed: step.completed || false
    });
  });
  
  // Add extra jobs
  extraJobs.forEach(ej => {
    const linkedJob = ej.linkedJobId ? State.getJob(ej.linkedJobId) : null;
    allItems.push({
      type: 'extraJob',
      job: linkedJob,
      ej,
      office: ej.office || '',
      time: ej.time || '',
      completed: ej.completed || false
    });
  });

  // Group by office
  const officeGroups = {};
  CONFIG.OFFICES.forEach(office => { officeGroups[office] = []; });
  
  const officeFilter = State.scheduleOfficeFilter;
  
  allItems.forEach(item => {
    const office = item.office && CONFIG.OFFICES.includes(item.office) ? item.office : '';
    if (office) {
      // Apply office filter
      if (officeFilter === 'All' || office === officeFilter) {
        officeGroups[office].push(item);
      }
    }
  });
  
  // Sort items within each office by time
  Object.values(officeGroups).forEach(items => {
    items.sort((a, b) => (a.time || '').localeCompare(b.time || ''));
  });

  // Render grouped by office
  const filteredItems = Object.values(officeGroups).flat();
  const hasAnyItems = filteredItems.length > 0;
  
  if (!hasAnyItems) {
    const noItemsMsg = officeFilter === 'All' 
      ? I18n.t('scheduleDayDetailsHint')
      : ((State.lang === 'tr') ? `${officeFilter} ofisi için bugün planlanmış iş yok.` : `No items scheduled for ${officeFilter} office today.`);
    container.appendChild($.el('p', { textContent: noItemsMsg }));
  } else {
    CONFIG.OFFICES.forEach(office => {
      // Skip offices not matching filter
      if (officeFilter !== 'All' && office !== officeFilter) return;
      
      const items = officeGroups[office];
      if (items.length === 0) return;
      
      const groupDiv = $.el('div', { className: 'schedule-office-group' });
      
      // Office header
      const header = $.el('div', { className: 'schedule-office-header' });
      header.appendChild($.el('span', { className: 'schedule-office-name', textContent: office }));
      header.appendChild($.el('span', { className: 'schedule-office-count', textContent: `${items.length} ` + ((State.lang === 'tr') ? 'iş' : 'items') }));
      groupDiv.appendChild(header);
      
      // Items for this office
      items.forEach(item => {
        if (item.type === 'step') {
          groupDiv.appendChild(this.scheduleStepCardCollapsible(item.job, item.step, dateStr));
        } else {
          groupDiv.appendChild(this.scheduleExtraJobCardCollapsible(dateStr, item.ej));
        }
      });
      
      container.appendChild(groupDiv);
    });
    
  }

  // Add job form (hidden by default)
  const addJobForm = this.extraJobsAddForm(dateStr);
  addJobForm.classList.add('hidden');
  container.appendChild(addJobForm);
  
  addJobBtn.addEventListener('click', () => {
    addJobForm.classList.toggle('hidden');
    if (!addJobForm.classList.contains('hidden')) {
      addJobForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });

  container.appendChild(this.dayNotesSection(dateStr, dayNote));
},

// Collapsible step card for Schedule view
scheduleStepCardCollapsible(job, step, dateStr) {
  const def = CONFIG.STEP_DEFINITIONS[step.id] || { fields: [] };
  
  // Determine status
  let status = 'pending';
  if (step.completed) {
    status = 'completed';
  } else if (step.date || step.time) {
    status = 'scheduled';
  }
  
  const card = $.el('div', { className: `step-card-collapsible status-${status}` });

  // Collapse Header
  const header = $.el('div', { className: 'step-card-collapse-header' });
  
  const headerLeft = $.el('div', { className: 'step-card-header-left' });
  
  const statusIndicator = $.el('div', { className: `step-status-indicator ${status}` });
  statusIndicator.textContent = status === 'completed' ? '✓' : (status === 'scheduled' ? '•' : '○');
  headerLeft.appendChild(statusIndicator);
  
  // Title: Job Code - Step Name
  const titleGroup = $.el('div');
  const titleText = job.jobCode 
    ? `${job.jobCode} - ${I18n.stepText(step)}`
    : I18n.stepText(step);
  titleGroup.appendChild($.el('div', { className: 'step-card-title', textContent: titleText }));
  
  const subtitle = $.el('div', { className: 'step-card-subtitle' });
  // Show client name first (bold) for prominence
  if (job.clientName) {
    const clientSpan = $.el('span', { textContent: job.clientName });
    clientSpan.style.fontWeight = '600';
    subtitle.appendChild(clientSpan);
  }
  if (step.time) {
    subtitle.appendChild($.el('span', { textContent: step.time }));
  }
  if (step.personnel) {
    subtitle.appendChild($.el('span', { textContent: step.personnel }));
  }
  titleGroup.appendChild(subtitle);
  headerLeft.appendChild(titleGroup);
  
  header.appendChild(headerLeft);
  
  // Time badge if set
  if (step.time) {
    const timeBadge = $.el('span', { className: 'step-time-badge', textContent: step.time });
    header.appendChild(timeBadge);
  }
  
  const arrow = $.el('span', { className: 'step-card-arrow', textContent: '▼' });
  header.appendChild(arrow);
  
  card.appendChild(header);

  // Collapse Body
  const body = $.el('div', { className: 'step-card-collapse-body hidden' });
  
  // View section
  const viewBox = $.el('div', { className: 'schedule-step-fields-view' });
  const officeComputed = step.office || '-';

  const fields = [
    [I18n.t('office'), officeComputed],
    [I18n.t('time'), step.time || '-'],
    [I18n.t('personnel'), step.personnel || '-'],
    [I18n.t('vehicle'), step.vehicle || '-']
  ];
  if (def.fields && def.fields.includes('address')) fields.push([I18n.t('address'), step.address || '-']);
  if (def.fields && def.fields.includes('portDetails')) fields.push([I18n.t('portDetails'), step.portDetails || '-']);
  if (def.fields && def.fields.includes('pickupAirport')) fields.push([I18n.t('pickupAirport'), step.pickupAirport || '-']);
  if (def.fields && def.fields.includes('deliveryAirport')) fields.push([I18n.t('deliveryAirport'), step.deliveryAirport || '-']);
  if (def.fields && def.fields.includes('pickupAddress')) fields.push([I18n.t('pickupAddress'), step.pickupAddress || '-']);
  if (def.fields && def.fields.includes('deliveryAddress')) fields.push([I18n.t('deliveryAddress'), step.deliveryAddress || '-']);
  fields.push([I18n.t('notesLabel'), step.notes || '-']);

  fields.forEach(([label, value]) => {
    const row = $.el('div', { className: 'schedule-field-row' });
    row.appendChild($.el('span', { className: 'schedule-field-label', textContent: label }));
    row.appendChild($.el('span', { className: 'schedule-field-value', textContent: value }));
    viewBox.appendChild(row);
  });
  body.appendChild(viewBox);

  // Edit section
  const editBox = $.el('div', { className: 'schedule-step-fields-edit hidden' });

  // Office
  const officeDiv = $.el('div');
  officeDiv.appendChild($.el('label', { textContent: I18n.t('office') }));
  const officeSelect = $.el('select', { className: 'sched-office-input', required: true });
  officeSelect.appendChild($.el('option', { value: '', textContent: (State.lang === 'tr') ? '-- Ofis Seçin --' : '-- Select Office --' }));
  CONFIG.OFFICES.forEach(o => officeSelect.appendChild($.el('option', { value: o, textContent: o })));
  officeSelect.value = step.office || '';
  officeDiv.appendChild(officeSelect);
  editBox.appendChild(officeDiv);

  // Time (24-hour dropdowns)
  const timeDiv = $.el('div');
  timeDiv.appendChild($.el('label', { textContent: I18n.t('time') }));
  const timeSelector = TimeHelpers.createTimeSelector(step.time || '');
  timeSelector.classList.add('sched-time-selector');
  timeDiv.appendChild(timeSelector);
  editBox.appendChild(timeDiv);

  // Personnel
  const pDiv = $.el('div');
  pDiv.appendChild($.el('label', { textContent: I18n.t('personnel') }));
  pDiv.appendChild($.el('input', { type: 'text', className: 'sched-personnel-input', value: step.personnel || '' }));
  editBox.appendChild(pDiv);

  // Vehicle
  const vDiv = $.el('div');
  vDiv.appendChild($.el('label', { textContent: I18n.t('vehicle') }));
  vDiv.appendChild($.el('input', { type: 'text', className: 'sched-vehicle-input', value: step.vehicle || '' }));
  editBox.appendChild(vDiv);

  if (def.fields && def.fields.includes('address')) {
    const addrDiv = $.el('div', { className: 'full-width' });
    addrDiv.appendChild($.el('label', { textContent: I18n.t('address') }));
    addrDiv.appendChild($.el('textarea', { rows: '2', className: 'sched-address-input', textContent: step.address || '' }));
    editBox.appendChild(addrDiv);
  }

  const notesDiv = $.el('div', { className: 'full-width' });
  notesDiv.appendChild($.el('label', { textContent: I18n.t('notesLabel') }));
  notesDiv.appendChild($.el('textarea', { rows: '2', className: 'sched-notes-input', textContent: step.notes || '' }));
  editBox.appendChild(notesDiv);

  body.appendChild(editBox);

  // Actions
  const actions = $.el('div', { className: 'schedule-step-actions' });
  
  const openBtn = $.el('button', { type: 'button', className: 'schedule-open-btn', textContent: I18n.t('openMove') });
  openBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    Views.show('moves');
    JobsUI.render();
    JobsUI.showDetails(job);
  });

  const editBtn = $.el('button', { type: 'button', className: 'schedule-edit-btn', textContent: I18n.t('edit') });
  const saveBtn = $.el('button', { type: 'button', className: 'hidden', textContent: I18n.t('save') });
  const cancelBtn = $.el('button', { type: 'button', className: 'hidden', textContent: I18n.t('cancel') });
  const completeBtn = $.el('button', { 
    type: 'button', 
    className: step.completed ? 'complete-btn completed' : 'complete-btn',
    textContent: step.completed ? ((State.lang === 'tr') ? '✓ Tamamlandı' : '✓ Completed') : ((State.lang === 'tr') ? 'Tamamla' : 'Mark Complete')
  });
  completeBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    step.completed = !step.completed;
    Storage.saveJobs();
    this.renderDay(dateStr);
    this.render();
    DashboardUI.render();
  });

  editBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    $.hide(viewBox);
    $.show(editBox);
    $.hide(editBtn);
    $.hide(openBtn);
    $.hide(completeBtn);
    $.show(saveBtn);
    $.show(cancelBtn);
  });

  saveBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const officeValue = card.querySelector('.sched-office-input').value || '';
    if (!officeValue) {
      Modals.alert({ title: (State.lang === 'tr') ? 'Uyarı' : 'Warning', message: (State.lang === 'tr') ? 'Lütfen ofis seçin.' : 'Please select an office.' });
      return;
    }
    step.office = officeValue;
    const timeSelector = card.querySelector('.sched-time-selector');
    step.time = TimeHelpers.getTimeFromSelector(timeSelector);
    step.personnel = card.querySelector('.sched-personnel-input').value.trim();
    step.vehicle = card.querySelector('.sched-vehicle-input').value.trim();
    const addrEl = card.querySelector('.sched-address-input');
    if (addrEl) step.address = addrEl.value.trim();
    step.notes = card.querySelector('.sched-notes-input').value.trim();
    Storage.saveJobs();
    this.renderDay(dateStr);
  });

  cancelBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    this.renderDay(dateStr);
  });

  actions.appendChild(openBtn);
  actions.appendChild(completeBtn);
  actions.appendChild(editBtn);
  actions.appendChild(saveBtn);
  actions.appendChild(cancelBtn);
  body.appendChild(actions);

  card.appendChild(body);

  // Toggle collapse on header click
  header.addEventListener('click', () => {
    const isExpanded = !body.classList.contains('hidden');
    if (isExpanded) {
      body.classList.add('hidden');
      header.classList.remove('expanded');
      arrow.classList.remove('expanded');
    } else {
      body.classList.remove('hidden');
      header.classList.add('expanded');
      arrow.classList.add('expanded');
    }
  });

  return card;
},

  // Extra job card in schedule with same style as step cards
scheduleExtraJobCardCollapsible(dateStr, ej) {
  // Determine status first
  let status = 'pending';
  if (ej.completed) {
    status = 'completed';
  } else if (ej.date || dateStr) {
    status = 'scheduled';
  }

  const card = $.el('div', { className: `step-card-collapsible extra-job-card status-${status}` });

  const taskName = (ej.taskType === 'Custom' && ej.customTaskName)
    ? ej.customTaskName
    : I18n.taskTypeText(ej.taskType || '');

  // Get client name - from linked job or standalone clientName field
  const linkedJob = ej.linkedJobId ? State.getJob(ej.linkedJobId) : null;
  const clientName = linkedJob ? (linkedJob.clientName || '') : (ej.clientName || '');
  const isStandalone = !ej.linkedJobId;

  // Collapse Header
  const header = $.el('div', { className: 'step-card-collapse-header' });
  
  const headerLeft = $.el('div', { className: 'step-card-header-left' });
  
  const statusIndicator = $.el('div', { className: `step-status-indicator ${status}` });
  statusIndicator.textContent = status === 'completed' ? '✓' : (status === 'scheduled' ? '•' : '○');
  headerLeft.appendChild(statusIndicator);
  
  const titleGroup = $.el('div');
  
  // Show linked job info if available
  const titleText = linkedJob 
    ? `${linkedJob.jobCode || ''} - ${taskName}`
    : taskName || ((State.lang === 'tr') ? 'Ek İş' : 'Additional Job');
  
  titleGroup.appendChild($.el('div', { className: 'step-card-title', textContent: titleText }));
  
  const subtitle = $.el('div', { className: 'step-card-subtitle' });
  // Show client name first (bold) for prominence
  if (clientName) {
    const clientSpan = $.el('span', { textContent: clientName });
    clientSpan.style.fontWeight = '600';
    subtitle.appendChild(clientSpan);
  }
  if (ej.time) subtitle.appendChild($.el('span', { textContent: ej.time }));
  if (ej.personnel) subtitle.appendChild($.el('span', { textContent: ej.personnel }));
  titleGroup.appendChild(subtitle);
  headerLeft.appendChild(titleGroup);
  
  header.appendChild(headerLeft);
  
  if (ej.time) {
    const timeBadge = $.el('span', { className: 'step-time-badge', textContent: ej.time });
    header.appendChild(timeBadge);
  }
  
  const arrow = $.el('span', { className: 'step-card-arrow', textContent: '▼' });
  header.appendChild(arrow);
  
  card.appendChild(header);

  // Collapse Body
  const body = $.el('div', { className: 'step-card-collapse-body hidden' });
  
  // View section
  const viewBox = $.el('div', { className: 'schedule-step-fields-view' });
  
  const fields = [
    [I18n.t('office'), ej.office || '-'],
    [I18n.t('time'), ej.time || '-'],
    [(State.lang === 'tr') ? 'Müşteri' : 'Client', clientName || '-'],
    [I18n.t('personnel'), ej.personnel || '-'],
    [I18n.t('vehicle'), ej.vehicle || '-'],
    [I18n.t('address'), ej.address || '-'],
    [I18n.t('notesLabel'), ej.notes || '-']
  ];

  fields.forEach(([label, value]) => {
    const row = $.el('div', { className: 'schedule-field-row' });
    row.appendChild($.el('span', { className: 'schedule-field-label', textContent: label }));
    row.appendChild($.el('span', { className: 'schedule-field-value', textContent: value }));
    viewBox.appendChild(row);
  });
  body.appendChild(viewBox);

  // Edit section
  const editBox = $.el('div', { className: 'schedule-step-fields-edit hidden' });

  // Office (required)
  const officeDiv = $.el('div');
  officeDiv.appendChild($.el('label', { textContent: I18n.t('office') }));
  const officeSelect = $.el('select', { className: 'ej-edit-office', required: true });
  officeSelect.appendChild($.el('option', { value: '', textContent: (State.lang === 'tr') ? '-- Ofis Seçin --' : '-- Select Office --' }));
  CONFIG.OFFICES.forEach(o => officeSelect.appendChild($.el('option', { value: o, textContent: o })));
  officeSelect.value = ej.office || '';
  officeDiv.appendChild(officeSelect);
  editBox.appendChild(officeDiv);

  // Time (24-hour dropdown)
  const timeDiv = $.el('div');
  timeDiv.appendChild($.el('label', { textContent: I18n.t('time') }));
  const timeSelector = TimeHelpers.createTimeSelector(ej.time || '');
  timeSelector.classList.add('ej-edit-time-selector');
  timeDiv.appendChild(timeSelector);
  editBox.appendChild(timeDiv);

  // Client Name (only editable for standalone jobs)
  const clientDiv = $.el('div');
  clientDiv.appendChild($.el('label', { textContent: (State.lang === 'tr') ? 'Müşteri Adı' : 'Client Name' }));
  if (isStandalone) {
    const clientInput = $.el('input', { type: 'text', className: 'ej-edit-client', value: ej.clientName || '' });
    clientDiv.appendChild(clientInput);
  } else {
    // For linked jobs, show read-only client name from move
    const clientReadonly = $.el('input', { type: 'text', value: clientName, disabled: true, style: 'background: #f3f4f6; color: #6b7280;' });
    clientDiv.appendChild(clientReadonly);
    clientDiv.appendChild($.el('span', { textContent: (State.lang === 'tr') ? '(Bağlı taşımadan)' : '(from linked move)', style: 'font-size: 11px; color: #6b7280; display: block; margin-top: 2px;' }));
  }
  editBox.appendChild(clientDiv);

  // Personnel
  const pDiv = $.el('div');
  pDiv.appendChild($.el('label', { textContent: I18n.t('personnel') }));
  pDiv.appendChild($.el('input', { type: 'text', className: 'ej-edit-personnel', value: ej.personnel || '' }));
  editBox.appendChild(pDiv);

  // Vehicle
  const vDiv = $.el('div');
  vDiv.appendChild($.el('label', { textContent: I18n.t('vehicle') }));
  vDiv.appendChild($.el('input', { type: 'text', className: 'ej-edit-vehicle', value: ej.vehicle || '' }));
  editBox.appendChild(vDiv);

  // Address
  const aDiv = $.el('div', { className: 'full-width' });
  aDiv.appendChild($.el('label', { textContent: I18n.t('address') }));
  aDiv.appendChild($.el('textarea', { rows: '2', className: 'ej-edit-address', textContent: ej.address || '' }));
  editBox.appendChild(aDiv);

  // Notes
  const nDiv = $.el('div', { className: 'full-width' });
  nDiv.appendChild($.el('label', { textContent: I18n.t('notesLabel') }));
  nDiv.appendChild($.el('textarea', { rows: '2', className: 'ej-edit-notes', textContent: ej.notes || '' }));
  editBox.appendChild(nDiv);

  body.appendChild(editBox);

  // Actions
  const actions = $.el('div', { className: 'schedule-step-actions' });
  
  // Completion toggle
  const completeBtn = $.el('button', { 
    type: 'button', 
    className: ej.completed ? 'complete-btn completed' : 'complete-btn',
    textContent: ej.completed ? ((State.lang === 'tr') ? '✓ Tamamlandı' : '✓ Completed') : ((State.lang === 'tr') ? 'Tamamla' : 'Mark Complete')
  });
  completeBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    ej.completed = !ej.completed;
    Storage.saveScheduleExtraJobs();
    this.renderDay(dateStr);
    this.render();
    DashboardUI.render();
  });

  // Open linked move button
  if (ej.linkedJobId) {
  const openBtn = $.el('button', { type: 'button', className: 'schedule-open-btn', textContent: I18n.t('openMove') });
    openBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const job = State.getJob(ej.linkedJobId);
      if (job) {
        Views.show('moves');
        JobsUI.render();
        JobsUI.showDetails(job);
      }
    });
    actions.appendChild(openBtn);
  }

  const editBtn = $.el('button', { type: 'button', className: 'schedule-edit-btn', textContent: I18n.t('edit') });
  const saveBtn = $.el('button', { type: 'button', className: 'hidden', textContent: I18n.t('save') });
  const cancelBtn = $.el('button', { type: 'button', className: 'hidden', textContent: I18n.t('cancel') });
  const deleteBtn = $.el('button', { type: 'button', className: 'delete-step-btn', textContent: I18n.t('delete') });

  editBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    $.hide(viewBox);
    $.show(editBox);
    $.hide(editBtn);
    $.hide(completeBtn);
    $.show(saveBtn);
    $.show(cancelBtn);
  });

  saveBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const officeValue = card.querySelector('.ej-edit-office').value || '';
    if (!officeValue) {
      Modals.alert({ title: (State.lang === 'tr') ? 'Uyarı' : 'Warning', message: (State.lang === 'tr') ? 'Lütfen ofis seçin.' : 'Please select an office.' });
      return;
    }
    ej.office = officeValue;
    const timeSelector = card.querySelector('.ej-edit-time-selector');
    ej.time = TimeHelpers.getTimeFromSelector(timeSelector);
    // Save client name only for standalone jobs
    if (isStandalone) {
      const clientInput = card.querySelector('.ej-edit-client');
      if (clientInput) ej.clientName = clientInput.value.trim();
    }
    ej.personnel = card.querySelector('.ej-edit-personnel').value.trim();
    ej.vehicle = card.querySelector('.ej-edit-vehicle').value.trim();
    ej.address = card.querySelector('.ej-edit-address').value.trim();
    ej.notes = card.querySelector('.ej-edit-notes').value.trim();
    Storage.saveScheduleExtraJobs();
    this.renderDay(dateStr);
    this.render();
  });

  cancelBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    this.renderDay(dateStr);
  });

  deleteBtn.addEventListener('click', async (e) => {
    e.stopPropagation();
    const confirmed = await Modals.confirm({
      title: (State.lang === 'tr') ? 'Ek İşi Sil' : 'Delete Additional Job',
      message: I18n.t('deleteExtraJobConfirm'),
      danger: true,
      confirmText: (State.lang === 'tr') ? 'Sil' : 'Delete'
    });
    if (!confirmed) return;
    ScheduleExtraJobs.deleteById(dateStr, ej.id);
    Storage.saveScheduleExtraJobs();
    this.renderDay(dateStr);
    this.render();
  });

  actions.appendChild(completeBtn);
  actions.appendChild(editBtn);
  actions.appendChild(saveBtn);
  actions.appendChild(cancelBtn);
  actions.appendChild(deleteBtn);
  body.appendChild(actions);

  card.appendChild(body);

  // Toggle collapse
  header.addEventListener('click', () => {
    const isExpanded = !body.classList.contains('hidden');
    if (isExpanded) {
      body.classList.add('hidden');
      header.classList.remove('expanded');
      arrow.classList.remove('expanded');
    } else {
      body.classList.remove('hidden');
      header.classList.add('expanded');
      arrow.classList.add('expanded');
    }
  });

  return card;
},
  
  stepCard(job, step, dateStr) {
    const def = CONFIG.STEP_DEFINITIONS[step.id] || {};
    const card = $.el('div', { className: 'schedule-step-card' });
    card.appendChild($.el('h4', { textContent: `${job.jobCode || ''} – ${job.clientName || I18n.t('noClientName')}` }));
    card.appendChild($.el('p', { textContent: I18n.stepText(step) }));
    card.appendChild($.el('p', {
      textContent: `${Utils.location(job.originCity, job.originCountry)} → ${Utils.location(job.destinationCity, job.destinationCountry)}`
    }));
    card.appendChild($.el('p', {
      className: 'schedule-step-meta',
      innerHTML: `${I18n.modesText(job.modes)} • ${I18n.typeText(job.tradeDirection)} • ${I18n.t('statusLabel')}: ${I18n.statusText(job.status)}`
    }));

    const viewBox = $.el('div', { className: 'schedule-step-fields-view' });

    const officeComputed = step.office || '-';
    const fields = [
      [I18n.t('office'), officeComputed],
      [I18n.t('time'), step.time || '-'],
      [I18n.t('personnel'), step.personnel || '-'],
      [I18n.t('vehicle'), step.vehicle || '-']
    ];
    if (def.fields && def.fields.includes('address')) fields.push([I18n.t('address'), step.address || '-']);
    if (def.fields && def.fields.includes('portDetails')) fields.push([I18n.t('portDetails'), step.portDetails || '-']);
    if (def.fields && def.fields.includes('pickupAirport')) fields.push([I18n.t('pickupAirport'), step.pickupAirport || '-']);
    if (def.fields && def.fields.includes('deliveryAirport')) fields.push([I18n.t('deliveryAirport'), step.deliveryAirport || '-']);
    if (def.fields && def.fields.includes('pickupAddress')) fields.push([I18n.t('pickupAddress'), step.pickupAddress || '-']);
    if (def.fields && def.fields.includes('deliveryAddress')) fields.push([I18n.t('deliveryAddress'), step.deliveryAddress || '-']);
    fields.push([I18n.t('notesLabel'), step.notes || '-']);

    fields.forEach(([label, value]) => {
      const row = $.el('div', { className: 'schedule-field-row' });
      row.appendChild($.el('span', { className: 'schedule-field-label', textContent: label }));
      row.appendChild($.el('span', { className: 'schedule-field-value', textContent: value }));
      viewBox.appendChild(row);
    });
    card.appendChild(viewBox);

    const editBox = $.el('div', { className: 'schedule-step-fields-edit hidden' });

    // office
    const officeDiv = $.el('div');
    officeDiv.appendChild($.el('label', { textContent: I18n.t('office') }));
    const officeSelect = $.el('select', { className: 'sched-office-input' });
    officeSelect.appendChild($.el('option', { value: '', textContent: (State.lang === 'tr') ? '-- Ofis Seçin --' : '-- Select Office --' }));
    CONFIG.OFFICES.forEach(o => officeSelect.appendChild($.el('option', { value: o, textContent: o })));
    officeSelect.value = step.office || '';
    officeDiv.appendChild(officeSelect);
    editBox.appendChild(officeDiv);

    [[I18n.t('time'), 'time', 'time'], [I18n.t('personnel'), 'personnel', 'text'], [I18n.t('vehicle'), 'vehicle', 'text']].forEach(
      ([label, field, type]) => {
        const div = $.el('div');
        div.appendChild($.el('label', { textContent: label }));
        div.appendChild($.el('input', { type, className: `sched-${field}-input`, value: step[field] || '' }));
        editBox.appendChild(div);
      }
    );

    if (def.fields && def.fields.includes('address')) {
      const addrDiv = $.el('div', { className: 'full-width' });
      addrDiv.appendChild($.el('label', { textContent: I18n.t('address') }));
      addrDiv.appendChild($.el('textarea', { rows: '2', className: 'sched-address-input', textContent: step.address || '' }));
      editBox.appendChild(addrDiv);
    }

    const notesDiv = $.el('div', { className: 'full-width' });
    notesDiv.appendChild($.el('label', { textContent: I18n.t('notesLabel') }));
    notesDiv.appendChild($.el('textarea', { rows: '2', className: 'sched-notes-input', textContent: step.notes || '' }));
    editBox.appendChild(notesDiv);

    const saveBtn = $.el('button', { type: 'button', className: 'hidden', textContent: I18n.t('save') });
    saveBtn.addEventListener('click', () => {
      const officeValue = card.querySelector('.sched-office-input').value || '';
      if (!officeValue) {
        Modals.alert({ title: (State.lang === 'tr') ? 'Uyarı' : 'Warning', message: (State.lang === 'tr') ? 'Lütfen ofis seçin.' : 'Please select an office.' });
        return;
      }
      step.office = officeValue;
      step.time = card.querySelector('.sched-time-input').value || '';
      step.personnel = card.querySelector('.sched-personnel-input').value.trim();
      step.vehicle = card.querySelector('.sched-vehicle-input').value.trim();
      const addrEl = card.querySelector('.sched-address-input');
      if (addrEl) step.address = addrEl.value.trim();
      step.notes = card.querySelector('.sched-notes-input').value.trim();
      Storage.saveJobs();
      this.renderDay(dateStr);
    });

    const cancelBtn = $.el('button', { type: 'button', className: 'hidden', textContent: I18n.t('cancel') });
    cancelBtn.addEventListener('click', () => this.renderDay(dateStr));

    const actions = $.el('div', { className: 'schedule-step-actions' });
    const openBtn = $.el('button', { type: 'button', className: 'schedule-open-btn', textContent: I18n.t('openMove') });
    openBtn.addEventListener('click', () => {
      Views.show('moves');
      JobsUI.render();
      JobsUI.showDetails(job);
    });

    const editBtn = $.el('button', { type: 'button', className: 'schedule-edit-btn', textContent: I18n.t('edit') });
    editBtn.addEventListener('click', () => {
      $.hide(viewBox);
      $.show(editBox);
      $.hide(editBtn);
      $.hide(openBtn);
      $.show(saveBtn);
      $.show(cancelBtn);
    });

  actions.appendChild(openBtn);
  actions.appendChild(completeBtn);
    actions.appendChild(editBtn);
    actions.appendChild(saveBtn);
    actions.appendChild(cancelBtn);
    card.appendChild(editBox);
    card.appendChild(actions);
    return card;
  },

  // Add form for extra jobs (hidden by default, shown via button)
extraJobsAddForm(dateStr) {
  const formWrap = $.el('div', { className: 'schedule-extra-add-form' });
  
  const formTitle = $.el('h4', { 
    textContent: (State.lang === 'tr') ? 'Yeni Ek İş Ekle' : 'Add New Job',
    style: 'margin: 0 0 12px 0;'
  });
  formWrap.appendChild(formTitle);

  const form = $.el('div', { className: 'schedule-extra-form' });

  // Linked Move select
  const linkDiv = $.el('div');
  linkDiv.appendChild($.el('label', { textContent: I18n.t('linkedMove') }));
  const linkSelect = $.el('select', { id: 'extraJobLinkedMove_' + dateStr });
  linkSelect.appendChild($.el('option', { value: '', textContent: I18n.t('none') }));
  State.jobs
    .slice()
    .map(j => ({ id: String(j.id), code: j.jobCode || '', client: j.clientName || '' }))
    .filter(x => x.code)
    .sort((a, b) => a.code.localeCompare(b.code))
    .forEach(x => linkSelect.appendChild($.el('option', { value: x.id, textContent: `${x.code} – ${x.client}`.trim() })));
  linkDiv.appendChild(linkSelect);
  form.appendChild(linkDiv);

  // Client Name (only for standalone jobs - hidden when linked move selected)
  const clientDiv = $.el('div');
  clientDiv.appendChild($.el('label', { textContent: (State.lang === 'tr') ? 'Müşteri Adı (opsiyonel)' : 'Client Name (optional)' }));
  const clientInput = $.el('input', { type: 'text', id: 'extraJobClientName_' + dateStr, placeholder: (State.lang === 'tr') ? 'Müşteri adı girin...' : 'Enter client name...' });
  clientDiv.appendChild(clientInput);
  form.appendChild(clientDiv);

  // Toggle client name visibility based on linked move selection
  const toggleClientField = () => {
    if (linkSelect.value) {
      clientDiv.style.display = 'none';
      clientInput.value = '';
    } else {
      clientDiv.style.display = '';
    }
  };
  linkSelect.addEventListener('change', toggleClientField);
  toggleClientField();

  // Task type
  const taskDiv = $.el('div');
  taskDiv.appendChild($.el('label', { textContent: I18n.t('task') }));
  const taskSelect = $.el('select', { id: 'extraJobType_' + dateStr });
  CONFIG.EXTRA_JOB_TYPES.forEach(type => taskSelect.appendChild($.el('option', { value: type, textContent: I18n.taskTypeText(type) })));
  taskDiv.appendChild(taskSelect);
  form.appendChild(taskDiv);

  // Custom name
  const customDiv = $.el('div');
  customDiv.appendChild($.el('label', { textContent: I18n.t('customTaskName') }));
  const customInput = $.el('input', { type: 'text', id: 'extraJobCustomName_' + dateStr });
  customDiv.appendChild(customInput);
  form.appendChild(customDiv);

  const toggleCustom = () => {
    customDiv.style.display = (taskSelect.value === 'Custom') ? '' : 'none';
    if (taskSelect.value !== 'Custom') customInput.value = '';
  };
  taskSelect.addEventListener('change', toggleCustom);
  toggleCustom();

  // Office (required)
  const officeDiv = $.el('div');
  officeDiv.appendChild($.el('label', { textContent: I18n.t('office') + ' *' }));
  const officeSelect = $.el('select', { id: 'extraJobOffice_' + dateStr, required: true });
  officeSelect.appendChild($.el('option', { value: '', textContent: (State.lang === 'tr') ? '-- Ofis Seçin --' : '-- Select Office --' }));
  CONFIG.OFFICES.forEach(o => officeSelect.appendChild($.el('option', { value: o, textContent: o })));
  officeDiv.appendChild(officeSelect);
  form.appendChild(officeDiv);

  // Time (24-hour dropdowns)
  const timeDiv = $.el('div');
  timeDiv.appendChild($.el('label', { textContent: I18n.t('time') }));
  const timeSelector = TimeHelpers.createTimeSelector('');
  timeSelector.id = 'extraJobTime_' + dateStr;
  timeDiv.appendChild(timeSelector);
  form.appendChild(timeDiv);

  // Address
  const addressDiv = $.el('div');
  addressDiv.appendChild($.el('label', { textContent: I18n.t('address') }));
  const addressInput = $.el('textarea', { id: 'extraJobAddress_' + dateStr, rows: '2' });
  addressDiv.appendChild(addressInput);
  form.appendChild(addressDiv);

  // Personnel
  const pDiv = $.el('div');
  pDiv.appendChild($.el('label', { textContent: I18n.t('personnel') }));
  pDiv.appendChild($.el('input', { type: 'text', id: 'extraJobPersonnel_' + dateStr }));
  form.appendChild(pDiv);

  // Vehicle
  const vDiv = $.el('div');
  vDiv.appendChild($.el('label', { textContent: I18n.t('vehicle') }));
  vDiv.appendChild($.el('input', { type: 'text', id: 'extraJobVehicle_' + dateStr }));
  form.appendChild(vDiv);

  // Notes
  const nDiv = $.el('div', { className: 'full-width' });
  nDiv.appendChild($.el('label', { textContent: I18n.t('notesLabel') }));
  nDiv.appendChild($.el('textarea', { id: 'extraJobNotes_' + dateStr, rows: '2' }));
  form.appendChild(nDiv);

  // Actions
  const actionsDiv = $.el('div', { className: 'schedule-extra-actions', style: 'grid-column: 1 / -1;' });
  
  const addBtn = $.el('button', { type: 'button', textContent: I18n.t('addJob') });
  addBtn.addEventListener('click', () => {
    const linkedJobId = linkSelect.value || '';
    const linkedJob = linkedJobId ? State.getJob(linkedJobId) : null;
    const clientName = clientInput.value.trim();
    const taskType = taskSelect.value;
    const customTaskName = customInput.value.trim();
    const office = officeSelect.value;
    const time = TimeHelpers.getTimeFromSelector(timeSelector);
    const address = addressInput.value.trim();
    const personnel = $.get('extraJobPersonnel_' + dateStr).value.trim();
    const vehicle = $.get('extraJobVehicle_' + dateStr).value.trim();
    const notes = $.get('extraJobNotes_' + dateStr).value.trim();

    // Require office selection
    if (!office) {
      Modals.alert({ title: (State.lang === 'tr') ? 'Uyarı' : 'Warning', message: (State.lang === 'tr') ? 'Lütfen ofis seçin.' : 'Please select an office.' });
      return;
    }

    if (!taskType && !customTaskName && !time && !address && !personnel && !vehicle && !notes) {
      Modals.alert({ title: (State.lang === 'tr') ? 'Uyarı' : 'Warning', message: I18n.t('fillAtLeastOneField') });
      return;
    }

    // If linked to a move, add/update step in job.steps[] for proper two-way sync
    if (linkedJob) {
      // Map display label to step ID
      const taskTypeToStepId = {
        'Packing': 'packing',
        'Survey': 'survey',
        'Delivery to Residence': 'delivery_to_residence',
        'Container Delivery': 'container_delivery',
        'Container Pickup': 'container_pickup',
        'Container Unloading': 'container_unloading',
        'Container Loading': 'container_loading',
        'Air Cargo Packing': 'air_cargo_packing',
        'Air Cargo Delivery to Address': 'air_cargo_delivery_to_address',
        'Air Cargo Delivery to Airport': 'air_cargo_delivery_to_airport'
      };
      
      const stepId = taskTypeToStepId[taskType];
      
      if (!Array.isArray(linkedJob.steps)) linkedJob.steps = [];
      
      // Check if matching step already exists (without a date)
      let matchingStep = stepId ? linkedJob.steps.find(s => s.id === stepId && !s.date) : null;
      
      if (matchingStep) {
        // Update existing step
        matchingStep.date = dateStr;
        matchingStep.time = time;
        matchingStep.office = office;
        if (address) matchingStep.address = address;
        if (personnel) matchingStep.personnel = personnel;
        if (vehicle) matchingStep.vehicle = vehicle;
        if (notes) matchingStep.notes = notes;
      } else {
        // Create new step in job.steps[]
        const def = stepId ? (CONFIG.STEP_DEFINITIONS[stepId] || {}) : {};
        const newStep = {
          id: stepId || 'custom',
          stepId: Utils.makeId('step'),
          label: (taskType === 'Custom' && customTaskName) ? customTaskName : (def.label || taskType || 'Custom'),
          customLabel: (taskType === 'Custom' && customTaskName) ? customTaskName : '',
          date: dateStr,
          time: time,
          office: office,
          personnel: personnel,
          vehicle: vehicle,
          address: address || '',
          portDetails: '',
          pickupAirport: '',
          deliveryAirport: '',
          pickupAddress: '',
          deliveryAddress: '',
          notes: notes,
          completed: false
        };
        linkedJob.steps.push(newStep);
      }
      
      Storage.saveJobs();
      this.renderDay(dateStr);
      this.render();
      return;
    }

    // Standalone job (no linked move) - create as extra job
    if (!Array.isArray(State.scheduleExtraJobs[dateStr])) State.scheduleExtraJobs[dateStr] = [];

    State.scheduleExtraJobs[dateStr].push(Validator.normalizeExtraJob({
      id: Utils.makeId('xjob'),
      date: dateStr,
      taskType,
      customTaskName,
      time,
      office,
      address,
      personnel,
      vehicle,
      notes,
      linkedJobId: '',
      linkedJobCode: '',
      linkedJobClientName: '',
      clientName: clientName,
      completed: false
    }, dateStr));

    Storage.saveScheduleExtraJobs();
    this.renderDay(dateStr);
    this.render();
  });

  const cancelBtn = $.el('button', { type: 'button', textContent: I18n.t('cancel') });
  cancelBtn.addEventListener('click', () => {
    formWrap.classList.add('hidden');
  });

  actionsDiv.appendChild(addBtn);
  actionsDiv.appendChild(cancelBtn);
  form.appendChild(actionsDiv);

  formWrap.appendChild(form);
  return formWrap;
},

  // NEW: Additional job card in schedule that matches step-card style and supports edit/delete
  extraJobCard(dateStr, ej) {
    const card = $.el('div', { className: 'schedule-step-card' });

    const taskName = (ej.taskType === 'Custom' && ej.customTaskName)
      ? ej.customTaskName
      : I18n.taskTypeText(ej.taskType || '');

    const linkedLabel = ej.linkedJobId ? Utils.jobLabelById(ej.linkedJobId, ej.linkedJobCode) : '';

    card.appendChild($.el('h4', {
      textContent: linkedLabel ? `${linkedLabel} • ${taskName}` : taskName
    }));

    const viewBox = $.el('div', { className: 'schedule-step-fields-view' });

    const office = ej.office || '-';
    const fields = [
      [I18n.t('office'), office],
      [I18n.t('time'), ej.time || '-'],
      [I18n.t('task'), taskName || '-'],
      [I18n.t('address'), ej.address || '-'],
      [I18n.t('personnel'), ej.personnel || '-'],
      [I18n.t('vehicle'), ej.vehicle || '-'],
      [I18n.t('notesLabel'), ej.notes || '-']
    ];

    if (linkedLabel) fields.unshift([I18n.t('moveId'), linkedLabel]);

    fields.forEach(([label, value]) => {
      const row = $.el('div', { className: 'schedule-field-row' });
      row.appendChild($.el('span', { className: 'schedule-field-label', textContent: label }));
      row.appendChild($.el('span', { className: 'schedule-field-value', textContent: value }));
      viewBox.appendChild(row);
    });

    card.appendChild(viewBox);

    // edit box
    const editBox = $.el('div', { className: 'schedule-step-fields-edit hidden' });

    // linked move select
    const linkDiv = $.el('div');
    linkDiv.appendChild($.el('label', { textContent: I18n.t('linkedMove') }));
    const linkSelect = $.el('select', { className: 'ej-edit-linked' });
    linkSelect.appendChild($.el('option', { value: '', textContent: I18n.t('none') }));
    State.jobs
      .slice()
      .map(j => ({ id: String(j.id), code: j.jobCode || '', client: j.clientName || '' }))
      .filter(x => x.code)
      .sort((a, b) => a.code.localeCompare(b.code))
      .forEach(x => linkSelect.appendChild($.el('option', { value: x.id, textContent: `${x.code} – ${x.client}`.trim() })));
    linkSelect.value = ej.linkedJobId || '';
    linkDiv.appendChild(linkSelect);
    editBox.appendChild(linkDiv);

    // task type + custom
    const taskDiv = $.el('div');
    taskDiv.appendChild($.el('label', { textContent: I18n.t('task') }));
    const typeSelect = $.el('select', { className: 'ej-edit-type' });
    CONFIG.EXTRA_JOB_TYPES.forEach(type => typeSelect.appendChild($.el('option', { value: type, textContent: I18n.taskTypeText(type) })));
    typeSelect.value = ej.taskType || 'Custom';
    taskDiv.appendChild(typeSelect);
    editBox.appendChild(taskDiv);

    const customDiv = $.el('div');
    customDiv.appendChild($.el('label', { textContent: I18n.t('customTaskName') }));
    const customInput = $.el('input', { type: 'text', className: 'ej-edit-custom', value: ej.customTaskName || '' });
    customDiv.appendChild(customInput);
    editBox.appendChild(customDiv);

    const toggleCustom = () => {
      customDiv.style.display = (typeSelect.value === 'Custom') ? '' : 'none';
      if (typeSelect.value !== 'Custom') customInput.value = '';
    };
    typeSelect.addEventListener('change', toggleCustom);
    toggleCustom();

    // time, office
    const timeDiv = $.el('div');
    timeDiv.appendChild($.el('label', { textContent: I18n.t('time') }));
    timeDiv.appendChild($.el('input', { type: 'time', className: 'ej-edit-time', value: ej.time || '' }));
    editBox.appendChild(timeDiv);

    const officeDiv = $.el('div');
    officeDiv.appendChild($.el('label', { textContent: I18n.t('office') }));
    const officeSelect = $.el('select', { className: 'ej-edit-office' });
    officeSelect.appendChild($.el('option', { value: '', textContent: (State.lang === 'tr') ? '-- Ofis Seçin --' : '-- Select Office --' }));
    CONFIG.OFFICES.forEach(o => officeSelect.appendChild($.el('option', { value: o, textContent: o })));
    officeSelect.value = ej.office || '';
    officeDiv.appendChild(officeSelect);
    editBox.appendChild(officeDiv);

    // address, personnel, vehicle, notes
    const addrDiv = $.el('div', { className: 'full-width' });
    addrDiv.appendChild($.el('label', { textContent: I18n.t('address') }));
    addrDiv.appendChild($.el('textarea', { rows: '2', className: 'ej-edit-address', textContent: ej.address || '' }));
    editBox.appendChild(addrDiv);

    const pDiv = $.el('div');
    pDiv.appendChild($.el('label', { textContent: I18n.t('personnel') }));
    pDiv.appendChild($.el('input', { type: 'text', className: 'ej-edit-personnel', value: ej.personnel || '' }));
    editBox.appendChild(pDiv);

    const vDiv = $.el('div');
    vDiv.appendChild($.el('label', { textContent: I18n.t('vehicle') }));
    vDiv.appendChild($.el('input', { type: 'text', className: 'ej-edit-vehicle', value: ej.vehicle || '' }));
    editBox.appendChild(vDiv);

    const nDiv = $.el('div', { className: 'full-width' });
    nDiv.appendChild($.el('label', { textContent: I18n.t('notesLabel') }));
    nDiv.appendChild($.el('textarea', { rows: '2', className: 'ej-edit-notes', textContent: ej.notes || '' }));
    editBox.appendChild(nDiv);

    card.appendChild(editBox);

    // actions (open move if linked, edit/save/cancel, delete)
    const actions = $.el('div', { className: 'schedule-step-actions', style: 'display:flex; justify-content:flex-end; gap:8px; flex-wrap:wrap;' });

    const openMoveBtn = $.el('button', { type: 'button', textContent: I18n.t('openMove') });
    openMoveBtn.addEventListener('click', () => {
      const job = ej.linkedJobId ? State.getJob(ej.linkedJobId) : null;
      if (job) {
        Views.show('moves');
        JobsUI.render();
        JobsUI.showDetails(job);
      }
    });

    const editBtn = $.el('button', { type: 'button', textContent: I18n.t('edit') });
    const saveBtn = $.el('button', { type: 'button', className: 'hidden', textContent: I18n.t('save') });
    const cancelBtn = $.el('button', { type: 'button', className: 'hidden', textContent: I18n.t('cancel') });
    const delBtn = $.el('button', { type: 'button', textContent: I18n.t('delete') });

    if (ej.linkedJobId) actions.appendChild(openMoveBtn);

    editBtn.addEventListener('click', () => {
      $.hide(viewBox);
      $.show(editBox);
      $.hide(editBtn);
      if (openMoveBtn) $.hide(openMoveBtn);
      $.show(saveBtn);
      $.show(cancelBtn);
    });

    cancelBtn.addEventListener('click', () => this.renderDay(dateStr));

    saveBtn.addEventListener('click', () => {
      ej.linkedJobId = linkSelect.value || '';
      const linked = ej.linkedJobId ? State.getJob(ej.linkedJobId) : null;
      ej.linkedJobCode = linked ? (linked.jobCode || '') : '';
      ej.linkedJobClientName = linked ? (linked.clientName || '') : '';

      ej.taskType = typeSelect.value || '';
      ej.customTaskName = customInput.value.trim();
      ej.time = card.querySelector('.ej-edit-time').value || '';
      const officeValue = card.querySelector('.ej-edit-office').value || '';
      if (!officeValue) {
        Modals.alert({ title: (State.lang === 'tr') ? 'Uyarı' : 'Warning', message: (State.lang === 'tr') ? 'Lütfen ofis seçin.' : 'Please select an office.' });
        return;
      }
      ej.office = officeValue;
      ej.address = card.querySelector('.ej-edit-address').value.trim();
      ej.personnel = card.querySelector('.ej-edit-personnel').value.trim();
      ej.vehicle = card.querySelector('.ej-edit-vehicle').value.trim();
      ej.notes = card.querySelector('.ej-edit-notes').value.trim();

      Storage.saveScheduleExtraJobs();
      this.renderDay(dateStr);
      this.render();
      // refresh move details if currently open and linked
      if (State.selectedJobId && ej.linkedJobId && String(State.selectedJobId) === String(ej.linkedJobId)) {
        const j = State.getJob(State.selectedJobId);
        if (j) JobsUI.showDetails(j);
      }
    });

    delBtn.addEventListener('click', async () => {
      const confirmed = await Modals.confirm({
        title: (State.lang === 'tr') ? 'Ek İşi Sil' : 'Delete Additional Job',
        message: I18n.t('deleteExtraJobConfirm'),
        danger: true,
        confirmText: (State.lang === 'tr') ? 'Sil' : 'Delete'
      });
      if (!confirmed) return;
      ScheduleExtraJobs.deleteById(dateStr, ej.id);
      Storage.saveScheduleExtraJobs();
      this.renderDay(dateStr);
      this.render();
      if (State.selectedJobId && ej.linkedJobId && String(State.selectedJobId) === String(ej.linkedJobId)) {
        const j = State.getJob(State.selectedJobId);
        if (j) JobsUI.showDetails(j);
      }
    });

    actions.appendChild(editBtn);
    actions.appendChild(saveBtn);
    actions.appendChild(cancelBtn);
    actions.appendChild(delBtn);
    card.appendChild(actions);

    return card;
  },

  dayNotesSection(dateStr, note) {
    const section = $.el('div', { className: 'schedule-day-notes' });
    section.appendChild($.el('h4', { className: 'details-section-title', textContent: I18n.t('dayNotes') }));

    const display = $.el('div');
    if (note) {
      const lines = String(note).split('\n');
      lines.forEach((line, i) => {
        display.appendChild(document.createTextNode(line));
        if (i < lines.length - 1) display.appendChild($.el('br'));
      });
    } else {
      const em = $.el('em', { textContent: (State.lang === 'tr') ? 'Bu gün için not yok.' : 'No notes for this day.' });
      display.appendChild(em);
    }

    const textarea = $.el('textarea', { className: 'hidden', rows: '3', textContent: note });
    section.appendChild(display);
    section.appendChild(textarea);

    const actions = $.el('div', { className: 'schedule-day-notes-actions' });
    const editBtn = $.el('button', { type: 'button', textContent: note ? I18n.t('edit') : I18n.t('addNoteOrEdit') });
    editBtn.addEventListener('click', () => {
      $.hide(display);
      $.show(textarea);
      $.hide(editBtn);
      if (note && delBtn) $.hide(delBtn);
      $.show(saveBtn);
      $.show(cancelBtn);
    });

    const saveBtn = $.el('button', { type: 'button', className: 'hidden', textContent: I18n.t('save') });
    saveBtn.addEventListener('click', () => {
      const text = textarea.value.trim();
      if (text) State.scheduleNotes[dateStr] = text;
      else delete State.scheduleNotes[dateStr];
      Storage.saveScheduleNotes();
      this.renderDay(dateStr);
    });

    const cancelBtn = $.el('button', { type: 'button', className: 'hidden', textContent: I18n.t('cancel') });
    cancelBtn.addEventListener('click', () => this.renderDay(dateStr));

    actions.appendChild(editBtn);
    let delBtn;
    if (note) {
      delBtn = $.el('button', { type: 'button', textContent: I18n.t('delete') });
      delBtn.addEventListener('click', async () => {
        const confirmed = await Modals.confirm({
          title: (State.lang === 'tr') ? 'Notu Sil' : 'Delete Note',
          message: I18n.t('deleteDayNotesConfirm'),
          danger: true,
          confirmText: (State.lang === 'tr') ? 'Sil' : 'Delete'
        });
        if (!confirmed) return;
        delete State.scheduleNotes[dateStr];
        Storage.saveScheduleNotes();
        this.renderDay(dateStr);
      });
      actions.appendChild(delBtn);
    }
    actions.appendChild(saveBtn);
    actions.appendChild(cancelBtn);
    section.appendChild(actions);
    return section;
  }
};

// ============================================================
// PART 4 OF 4: FORMS, EVENTS & INITIALIZATION
// ============================================================

// Toggle job form mode-specific field sections
function toggleJobModeFields() {
  const seaChecked = $.get('jobModeSea')?.checked;
  const airChecked = $.get('jobModeAir')?.checked;
  const landChecked = $.get('jobModeLand')?.checked;
  
  const seaFields = $.get('jobSeaFields');
  const airFields = $.get('jobAirFields');
  const landFields = $.get('jobLandFields');
  
  if (seaFields) {
    if (seaChecked) $.show(seaFields);
    else $.hide(seaFields);
  }
  if (airFields) {
    if (airChecked) $.show(airFields);
    else $.hide(airFields);
  }
  if (landFields) {
    if (landChecked) $.show(landFields);
    else $.hide(landFields);
  }
}

// Toggle job form vehicle fields
function toggleJobVehicleFields() {
  const vehicleChecked = $.get('jobContentsVehicle')?.checked;
  const vehicleFields = $.get('jobVehicleFields');
  
  if (vehicleFields) {
    if (vehicleChecked) $.show(vehicleFields);
    else $.hide(vehicleFields);
  }
}

// Toggle quote form vehicle fields
function toggleQuoteVehicleFields() {
  const vehicleChecked = $.get('quoteContentsVehicle')?.checked;
  const vehicleFields = $.get('quoteVehicleFields');
  
  if (vehicleFields) {
    if (vehicleChecked) $.show(vehicleFields);
    else $.hide(vehicleFields);
  }
}

const Forms = {
  populateCountrySelects() {
    const countries = CONFIG.getCountryList();
    ['originCountrySelect', 'destinationCountrySelect', 'agentCountrySelect'].forEach(id => {
      const select = $.get(id);
      if (!select) return;
      // Clear existing options except first (placeholder)
      while (select.options.length > 1) select.remove(1);
      countries.forEach(c => {
        select.appendChild($.el('option', { value: c.value, textContent: c.label }));
      });
    });
  },

  refreshCountrySelects() {
    // Called on language change to update country labels
    this.populateCountrySelects();
  },

  refreshAgentSelects() {
    // Agent dropdowns (only type: Agent)
    const agents = State.agents.filter(a => !a.type || a.type === 'Agent');
    ['originAgentSelect', 'destinationAgentSelect'].forEach(id => {
      const select = $.get(id);
      if (!select) return;
      while (select.options.length > 1) select.remove(1);
      agents.forEach(agent => {
        select.appendChild($.el('option', {
          value: String(agent.id),
          textContent: `${agent.name} (${agent.city}, ${agent.country})`
        }));
      });
    });
    
    // Broker dropdowns by type
    const brokerSelects = [
      { id: 'customsBrokerSelect', type: 'Customs Broker' },
      { id: 'seaFreightBrokerSelect', type: 'Sea Freight Broker' },
      { id: 'airFreightBrokerSelect', type: 'Air Freight Broker' }
    ];
    
    brokerSelects.forEach(({ id, type }) => {
      const select = $.get(id);
      if (!select) return;
      while (select.options.length > 1) select.remove(1);
      const brokers = State.agents.filter(a => a.type === type);
      brokers.forEach(broker => {
        select.appendChild($.el('option', {
          value: String(broker.id),
          textContent: `${broker.name} (${broker.city}, ${broker.country})`
        }));
      });
    });
  },

  handleJobSubmit(e) {
  e.preventDefault();
  const form = $.get('jobForm');
  
  // Get shipment contents
  const shipmentContents = Array.from(form.querySelectorAll('input[name="shipmentContents"]:checked')).map(cb => cb.value);
  
  const job = {
    clientName: form.clientName.value.trim(),
    organizationName: form.organizationName?.value.trim() || '',
    clientPhone: form.clientPhone?.value.trim() || '',
    clientEmail: form.clientEmail?.value.trim() || '',
    bookingType: form.bookingType?.value || '',
    clientType: form.clientType?.value || '',
    tag: form.tag?.value.trim() || '',
    originCity: form.originCity.value.trim(),
    originCountry: form.originCountry.value,
    originFullAddress: form.originFullAddress.value.trim(),
    originFloor: form.originFloor?.value.trim() || '',
    originElevator: form.originElevator?.value || '',
    originAccessConditions: form.originAccessConditions?.value.trim() || '',
    destinationCity: form.destinationCity.value.trim(),
    destinationCountry: form.destinationCountry.value,
    destinationFullAddress: form.destinationFullAddress.value.trim(),
    destinationFloor: form.destinationFloor?.value.trim() || '',
    destinationElevator: form.destinationElevator?.value || '',
    destinationAccessConditions: form.destinationAccessConditions?.value.trim() || '',
    tradeDirection: form.tradeDirection.value,
    status: form.status.value,
    originAgentId: form.originAgentId.value ? String(form.originAgentId.value) : null,
    destinationAgentId: form.destinationAgentId.value ? String(form.destinationAgentId.value) : null,
    
    // Broker references
    customsBrokerId: form.customsBrokerId?.value || '',
    seaFreightBrokerId: form.seaFreightBrokerId?.value || '',
    airFreightBrokerId: form.airFreightBrokerId?.value || '',
    
    modes: Array.from(form.querySelectorAll('input[name="mode"]:checked')).map(cb => cb.value),
    shipmentContents: shipmentContents.length > 0 ? shipmentContents : ['HHE'],
    moveManager: form.moveManager?.value.trim() || '',
    
    // Mode-specific fields
    seaVolume: parseFloat(form.jobSeaVolume?.value) || 0,
    containerDetails: form.jobContainerDetails?.value.trim() || '',
    seaGrossWeight: parseFloat(form.jobSeaGrossWeight?.value) || 0,
    airVolume: parseFloat(form.jobAirVolume?.value) || 0,
    airCargoWeight: parseFloat(form.jobAirCargoWeight?.value) || 0,
    airACW: parseFloat(form.jobAirACW?.value) || 0,
    landVolume: parseFloat(form.jobLandVolume?.value) || 0,
    landGrossWeight: parseFloat(form.jobLandGrossWeight?.value) || 0,
    
    // Vehicle fields
    vehicleType: form.jobVehicleType?.value || '',
    vehicleMake: form.jobVehicleMake?.value.trim() || '',
    vehicleModel: form.jobVehicleModel?.value.trim() || '',
    vehicleYear: parseInt(form.jobVehicleYear?.value) || 0,
    vehicleVIN: form.jobVehicleVIN?.value.trim() || '',
    vehicleCondition: form.querySelector('input[name="jobVehicleCondition"]:checked')?.value || 'Running',
    
    // Storage toggle
    hasStorage: form.hasStorage?.checked || false
  };

  if (!job.status) {
    Modals.alert({ title: (State.lang === 'tr') ? 'Uyarı' : 'Warning', message: I18n.t('statusRequired') });
    return;
  }
  if (!job.originAgentId && !job.destinationAgentId) {
    Modals.alert({ title: (State.lang === 'tr') ? 'Uyarı' : 'Warning', message: I18n.t('selectOneAgent') });
    return;
  }

  if (State.jobFormMode === 'create') {
    job.id = Utils.makeId('job');
    job.jobCode = Utils.jobCode();
    job.notes = [];
    job.documents = [];
    job.paymentReceived = false;
    job.packDate = '';
    const templateKey = (job.tradeDirection || '').toUpperCase();
    const template = CONFIG.CHECKLIST_TEMPLATES[templateKey] || CONFIG.CHECKLIST_TEMPLATES.IMPORT || [];
    job.checklist = template.map(text => ({ text, done: false }));
    job.steps = [];  // Manual steps only - start empty
    State.jobs.push(job);
  } else {
    const existing = State.getJob(State.selectedJobId);
    if (existing) {
      // Preserve existing steps when editing
      const oldSteps = existing.steps || [];
      Object.assign(existing, job);
      existing.steps = oldSteps;  // Keep existing steps, don't regenerate
    }
  }

  Storage.saveJobs();
  Modals.closeJob();
  JobsUI.render();
  const lastJob =
    State.jobFormMode === 'create'
      ? State.jobs[State.jobs.length - 1]
      : State.getJob(State.selectedJobId);
  if (lastJob) JobsUI.showDetails(lastJob);
  ScheduleUI.render();
},

  handleAgentSubmit(e) {
    e.preventDefault();
    const form = $.get('agentForm');
    const agentType = form.agentType?.value || 'Agent';
    const name = form.agentName.value.trim();
    const city = form.agentCity.value.trim();
    const country = form.agentCountry.value;
    const isFIDI = agentType === 'Agent' ? (form.isFIDI?.checked || false) : false;
    const isIAM = agentType === 'Agent' ? (form.isIAM?.checked || false) : false;
    const notes = form.agentNotes?.value?.trim() || '';
    
    if (!name || !city || !country) {
      Modals.alert({ title: (State.lang === 'tr') ? 'Uyarı' : 'Warning', message: (State.lang === 'tr') ? 'Lütfen ad, şehir ve ülke girin.' : 'Please fill name, city and country.' });
      return;
    }

    if (State.agentFormMode === 'create') {
      State.agents.push({
        id: Utils.makeId('agent'),
        type: agentType,
        name,
        city,
        country,
        isFIDI,
        isIAM,
        notes,
        contacts: []
      });
    } else {
      const agent = State.getAgent(State.selectedAgentId);
      if (agent) {
        agent.type = agentType;
        agent.name = name;
        agent.city = city;
        agent.country = country;
        agent.isFIDI = isFIDI;
        agent.isIAM = isIAM;
        agent.notes = notes;
      }
    }

    Storage.saveAgents();
    Forms.refreshAgentSelects();
    AgentsUI.render();
    Modals.closeAgent();
  }
};

function initEventHandlers() {
  // Mobile menu toggle
  const mobileMenuBtn = $.get('mobileMenuBtn');
  const headerNav = $.get('headerNav');
  if (mobileMenuBtn && headerNav) {
    mobileMenuBtn.addEventListener('click', () => {
      headerNav.classList.toggle('mobile-open');
      mobileMenuBtn.textContent = headerNav.classList.contains('mobile-open') ? '✕' : '☰';
    });
    
    // Close mobile menu when nav item clicked
    headerNav.querySelectorAll('.nav-item').forEach(item => {
      item.addEventListener('click', () => {
        headerNav.classList.remove('mobile-open');
        mobileMenuBtn.textContent = '☰';
      });
    });
  }

  $.get('navDashboard').addEventListener('click', () => Views.show('dashboard'));
  $.get('navMoves').addEventListener('click', () => Views.show('moves'));
  $.get('navAgents').addEventListener('click', () => Views.show('agents'));
  $.get('navSchedule').addEventListener('click', () => Views.show('schedule'));
  $.get('navStorage').addEventListener('click', () => Views.show('storage'));
  $.get('navDocuments').addEventListener('click', () => Views.show('documents'));

  $.get('openCreateJob').addEventListener('click', () => {
    State.jobFormMode = 'create';
    $.get('jobModalTitle').textContent = I18n.t('createNewMove');
    $.get('jobForm').reset();
    Modals.open('createJobModal');
  });

  $.get('editJobBtn').addEventListener('click', () => {
  const job = State.getJob(State.selectedJobId);
  if (!job) return;
  State.jobFormMode = 'edit';
  $.get('jobModalTitle').textContent = I18n.t('editMove');
  const form = $.get('jobForm');
  form.clientName.value = job.clientName || '';
  if (form.organizationName) form.organizationName.value = job.organizationName || '';
  if (form.clientPhone) form.clientPhone.value = job.clientPhone || '';
  if (form.clientEmail) form.clientEmail.value = job.clientEmail || '';
  
  // NEW: Booking Type and Client Type
  if (form.bookingType) form.bookingType.value = job.bookingType || '';
  if (form.clientType) form.clientType.value = job.clientType || '';
  
  if (form.tag) form.tag.value = job.tag || '';
  form.originCity.value = job.originCity || '';
  form.originCountry.value = job.originCountry || '';
  form.originFullAddress.value = job.originFullAddress || '';
  if (form.originFloor) form.originFloor.value = job.originFloor || '';
  if (form.originElevator) form.originElevator.value = job.originElevator || '';
  if (form.originAccessConditions) form.originAccessConditions.value = job.originAccessConditions || '';
  form.destinationCity.value = job.destinationCity || '';
  form.destinationCountry.value = job.destinationCountry || '';
  form.destinationFullAddress.value = job.destinationFullAddress || '';
  if (form.destinationFloor) form.destinationFloor.value = job.destinationFloor || '';
  if (form.destinationElevator) form.destinationElevator.value = job.destinationElevator || '';
  if (form.destinationAccessConditions) form.destinationAccessConditions.value = job.destinationAccessConditions || '';
  form.tradeDirection.value = job.tradeDirection || '';
  form.status.value = job.status || '';
  form.originAgentId.value = job.originAgentId || '';
  form.destinationAgentId.value = job.destinationAgentId || '';
  
  // NEW: Broker fields
  if (form.customsBrokerId) form.customsBrokerId.value = job.customsBrokerId || '';
  if (form.seaFreightBrokerId) form.seaFreightBrokerId.value = job.seaFreightBrokerId || '';
  if (form.airFreightBrokerId) form.airFreightBrokerId.value = job.airFreightBrokerId || '';
  
  // Move Manager
  if (form.moveManager) form.moveManager.value = job.moveManager || '';
  
  // Modes
  Array.from(form.querySelectorAll('input[name="mode"]')).forEach(cb => {
    cb.checked = job.modes && job.modes.includes(cb.value);
  });
  
  // Shipment Contents
  Array.from(form.querySelectorAll('input[name="shipmentContents"]')).forEach(cb => {
    cb.checked = job.shipmentContents && job.shipmentContents.includes(cb.value);
  });
  
  // Mode-specific fields
  if (form.jobSeaVolume) form.jobSeaVolume.value = job.seaVolume || '';
  if (form.jobContainerDetails) form.jobContainerDetails.value = job.containerDetails || '';
  if (form.jobSeaGrossWeight) form.jobSeaGrossWeight.value = job.seaGrossWeight || '';
  if (form.jobAirVolume) form.jobAirVolume.value = job.airVolume || '';
  if (form.jobAirCargoWeight) form.jobAirCargoWeight.value = job.airCargoWeight || '';
  if (form.jobAirACW) form.jobAirACW.value = job.airACW || '';
  if (form.jobLandVolume) form.jobLandVolume.value = job.landVolume || '';
  if (form.jobLandGrossWeight) form.jobLandGrossWeight.value = job.landGrossWeight || '';
  
  // Vehicle fields
  if (form.jobVehicleType) form.jobVehicleType.value = job.vehicleType || '';
  if (form.jobVehicleMake) form.jobVehicleMake.value = job.vehicleMake || '';
  if (form.jobVehicleModel) form.jobVehicleModel.value = job.vehicleModel || '';
  if (form.jobVehicleYear) form.jobVehicleYear.value = job.vehicleYear || '';
  if (form.jobVehicleVIN) form.jobVehicleVIN.value = job.vehicleVIN || '';
  const vehicleConditionRadio = form.querySelector(`input[name="jobVehicleCondition"][value="${job.vehicleCondition || 'Running'}"]`);
  if (vehicleConditionRadio) vehicleConditionRadio.checked = true;
  
  // Storage toggle
  if (form.hasStorage) form.hasStorage.checked = job.hasStorage || false;
  
  // Show/hide mode-specific sections
  toggleJobModeFields();
  toggleJobVehicleFields();
  
  Modals.open('createJobModal');
});

  $.get('closeModalBtn').addEventListener('click', () => Modals.closeJob());
  $.get('cancelJobBtn').addEventListener('click', () => Modals.closeJob());
  $.get('createJobModal').addEventListener('click', (e) => {
    if (e.target === $.get('createJobModal')) Modals.closeJob();
  });
  $.get('jobForm').addEventListener('submit', Forms.handleJobSubmit);

  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      State.filters.status = btn.dataset.status;
      State.pagination.jobs.page = 1; // Reset to page 1
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      JobsUI.render();
    });
  });

  $.get('typeFilter').addEventListener('change', (e) => {
    State.filters.type = e.target.value;
    State.pagination.jobs.page = 1; // Reset to page 1
    JobsUI.render();
  });
  $.get('paymentFilter').addEventListener('change', (e) => {
    State.filters.payment = e.target.value;
    State.pagination.jobs.page = 1; // Reset to page 1
    JobsUI.render();
  });
  $.get('searchInput').addEventListener('input', Utils.debounce((e) => {
    State.filters.search = e.target.value.trim();
    State.pagination.jobs.page = 1; // Reset to page 1
    JobsUI.render();
  }, 300));

  // Checklist add button handlers
  const openAddChecklistBtn = $.get('openAddChecklistBtn');
  const checklistAddForm = $.get('checklistAddForm');
  const confirmAddChecklistBtn = $.get('confirmAddChecklistBtn');
  const cancelAddChecklistBtn = $.get('cancelAddChecklistBtn');
  const checklistNewItemInput = $.get('checklistNewItemInput');

  if (openAddChecklistBtn) {
    openAddChecklistBtn.addEventListener('click', () => {
      $.show(checklistAddForm);
      $.hide(openAddChecklistBtn);
      checklistNewItemInput.focus();
    });
  }

  if (cancelAddChecklistBtn) {
    cancelAddChecklistBtn.addEventListener('click', () => {
      $.hide(checklistAddForm);
      $.show(openAddChecklistBtn);
      checklistNewItemInput.value = '';
    });
  }

  if (confirmAddChecklistBtn) {
    confirmAddChecklistBtn.addEventListener('click', () => {
      const job = State.getJob(State.selectedJobId);
      if (!job) return;
      const text = checklistNewItemInput.value.trim();
      if (!text) return;
      if (!job.checklist) job.checklist = [];
      job.checklist.push({ text, done: false });
      checklistNewItemInput.value = '';
      $.hide(checklistAddForm);
      $.show(openAddChecklistBtn);
      ChecklistUI.render(job);
      Storage.saveJobs();
    });
  }

  // Allow Enter key to add item
  if (checklistNewItemInput) {
    checklistNewItemInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        confirmAddChecklistBtn.click();
      }
    });
  }

  $.get('addNoteBtn').addEventListener('click', () => {
    const job = State.getJob(State.selectedJobId);
    if (!job) return;
    const text = $.get('newNoteText').value.trim();
    if (!text) return;
    if (!job.notes) job.notes = [];
    job.notes.push({ text, createdAt: new Date().toISOString() });
    $.get('newNoteText').value = '';
    NotesUI.render(job);
    Storage.saveJobs();
  });

  $.get('addDocumentBtn').addEventListener('click', () => {
    const job = State.getJob(State.selectedJobId);
    if (!job) return;
    const name = $.get('docNameInput').value.trim();
    const rawDate = $.get('docDateInput').value.trim();
    const date = Utils.parseDate(rawDate);
    const url = $.get('docUrlInput').value.trim();
    const file = $.get('docFileInput').files[0];
    if (!name) {
      Modals.alert({ title: (State.lang === 'tr') ? 'Uyarı' : 'Warning', message: I18n.t('documentNameRequired') });
      return;
    }
    if (!job.documents) job.documents = [];

    const refreshGlobalDocsIfVisible = () => {
      const view = $.get('documentsView');
      if (view && !view.classList.contains('hidden')) {
        DocumentsTabUI.render();
      }
    };

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        job.documents.push({
          name,
          date,
          url: '',
          fileName: file.name,
          fileData: e.target.result
        });
        $.get('docNameInput').value = '';
        $.get('docDateInput').value = '';
        $.get('docFileInput').value = '';
        $.get('docUrlInput').value = '';
        Storage.saveJobs();
        DocumentsUI.render(job);
        refreshGlobalDocsIfVisible();
      };
      reader.readAsDataURL(file);
    } else {
      job.documents.push({ name, date, url, fileName: '', fileData: '' });
      $.get('docNameInput').value = '';
      $.get('docDateInput').value = '';
      $.get('docFileInput').value = '';
      $.get('docUrlInput').value = '';
      Storage.saveJobs();
      DocumentsUI.render(job);
      refreshGlobalDocsIfVisible();
    }
  });
  
  // Media (Photos/Videos) upload handler
  const addMediaBtn = $.get('addMediaBtn');
  if (addMediaBtn) {
    addMediaBtn.addEventListener('click', () => {
      const job = State.getJob(State.selectedJobId);
      if (!job) return;
      const label = $.get('mediaLabelInput').value.trim();
      const file = $.get('mediaFileInput').files[0];
      
      if (!file) {
        Modals.alert({ title: (State.lang === 'tr') ? 'Uyarı' : 'Warning', message: (State.lang === 'tr') ? 'Lütfen bir dosya seçin.' : 'Please select a file.' });
        return;
      }
      
      if (!job.media) job.media = [];

      const reader = new FileReader();
      reader.onload = (e) => {
        job.media.push({
          label: label || file.name,
          fileName: file.name,
          fileType: file.type,
          fileData: e.target.result,
          uploadedAt: new Date().toISOString()
        });
        $.get('mediaLabelInput').value = '';
        $.get('mediaFileInput').value = '';
        Storage.saveJobs();
        MediaUI.render(job);
      };
      reader.readAsDataURL(file);
    });
  }

  $.get('agentSearchInput').addEventListener('input', Utils.debounce((e) => {
    State.agentSearch = e.target.value.trim();
    State.pagination.agents.page = 1; // Reset to page 1
    AgentsUI.render();
  }, 300));
  
  // Agent/Broker type tab handlers
  document.querySelectorAll('.agent-type-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const type = tab.dataset.type;
      State.agentTypeFilter = type;
      State.selectedAgentId = null;
      State.pagination.agents.page = 1; // Reset to page 1
      AgentsUI.render();
      // Clear details panel
      const detailsPanel = $.get('agentDetailsPanel');
      $.clear(detailsPanel);
      const hint = type === 'Agent' ? I18n.t('hintSelectAgent') : I18n.t('hintSelectBroker');
      detailsPanel.appendChild($.el('p', { textContent: hint }));
    });
  });
  
  $.get('openCreateAgentBtn').addEventListener('click', () => {
    State.agentFormMode = 'create';
    AgentsUI.showModal();
  });
  $.get('closeAgentModalBtn').addEventListener('click', () => Modals.closeAgent());
  $.get('cancelAgentBtn').addEventListener('click', () => Modals.closeAgent());
  $.get('agentForm').addEventListener('submit', Forms.handleAgentSubmit);

  $.get('prevMonthBtn').addEventListener('click', () => {
    State.schedule.month--;
    if (State.schedule.month < 0) {
      State.schedule.month = 11;
      State.schedule.year--;
    }
    ScheduleUI.render();
    if (State.schedule.selectedDate) ScheduleUI.renderDay(State.schedule.selectedDate);
  });

  $.get('nextMonthBtn').addEventListener('click', () => {
    State.schedule.month++;
    if (State.schedule.month > 11) {
      State.schedule.month = 0;
      State.schedule.year++;
    }
    ScheduleUI.render();
    if (State.schedule.selectedDate) ScheduleUI.renderDay(State.schedule.selectedDate);
  });

  // Schedule office filter buttons
  document.querySelectorAll('.office-filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      State.scheduleOfficeFilter = btn.dataset.office;
      ScheduleUI.render();
      if (State.schedule.selectedDate) ScheduleUI.renderDay(State.schedule.selectedDate);
    });
  });

  $.get('exportDataBtn').addEventListener('click', () => {
    const data = Storage.exportData();
    const json = JSON.stringify(data, null, 2);
    try {
      const blob = new Blob([json], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'istex-move-manager-backup.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      Modals.alert({ title: (State.lang === 'tr') ? 'Başarılı' : 'Success', message: I18n.t('exportedOk') });
    } catch (e) {
      console.error('Export failed:', e);
      Modals.alert({ title: (State.lang === 'tr') ? 'Hata' : 'Error', message: I18n.t('exportFailed') });
    }
  });

  $.get('toggleImportAreaBtn').addEventListener('click', () => $.toggle($.get('importArea')));

  $.get('importDataBtn').addEventListener('click', async () => {
    const raw = $.get('importDataInput').value.trim();
    if (!raw) {
      Modals.alert({ title: (State.lang === 'tr') ? 'Uyarı' : 'Warning', message: I18n.t('importPromptEmpty') });
      return;
    }
    try {
      const data = JSON.parse(raw);
      const confirmed = await Modals.confirm({
        title: (State.lang === 'tr') ? 'Veri İçe Aktar' : 'Import Data',
        message: I18n.t('importConfirm'),
        confirmText: (State.lang === 'tr') ? 'İçe Aktar' : 'Import'
      });
      if (!confirmed) return;
      Storage.importData(data);
      Forms.refreshAgentSelects();
      JobsUI.render();
      AgentsUI.render();
      ScheduleUI.render();
      if (State.jobs.length > 0) {
        const sorted = [...State.jobs].sort((a, b) => {
          const da = Steps.getEarliest(a);
          const db = Steps.getEarliest(b);
          if (!da && !db) return 0;
          if (!da) return 1;
          if (!db) return -1;
          return da.localeCompare(db);
        });
        JobsUI.showDetails(sorted[0]);
      }
      if (State.agents.length > 0) {
        AgentsUI.showDetails(State.agents[0]);
      }
      const view = $.get('documentsView');
      if (view && !view.classList.contains('hidden')) {
        DocumentsTabUI.render();
      }
      Modals.alert({ title: (State.lang === 'tr') ? 'Başarılı' : 'Success', message: I18n.t('importOk') });
    } catch (e) {
      Modals.alert({ title: (State.lang === 'tr') ? 'Hata' : 'Error', message: I18n.t('invalidJson') + e.message });
    }
  });

  const docsSearchInput = $.get('documentsSearchInput');
  if (docsSearchInput) docsSearchInput.addEventListener('input', Utils.debounce(() => DocumentsTabUI.render(), 300));

  const docsJobFilter = $.get('documentsJobFilter');
  if (docsJobFilter) docsJobFilter.addEventListener('change', () => DocumentsTabUI.render());

  // Documents tab switching
  document.querySelectorAll('.documents-type-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      DocumentsTabUI.switchTab(tab.dataset.type);
    });
  });

  // Add Resource button
  const addResourceBtn = $.get('addResourceBtn');
  if (addResourceBtn) {
    // Initially hide button since we start on search tab
    addResourceBtn.style.display = 'none';
    addResourceBtn.addEventListener('click', () => {
      ResourceLibraryUI.openAddModal();
    });
  }

  // Drag-and-drop for upload zones
  function setupDropZone(dropZoneId, fileInputId) {
    const dropZone = $.get(dropZoneId);
    const fileInput = $.get(fileInputId);
    if (!dropZone || !fileInput) return;

    const textEl = dropZone.querySelector('.drop-zone-text');
    const originalText = textEl ? textEl.textContent : '';

    ['dragenter', 'dragover'].forEach(eventName => {
      dropZone.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropZone.classList.add('drag-over');
      });
    });

    ['dragleave', 'drop'].forEach(eventName => {
      dropZone.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropZone.classList.remove('drag-over');
      });
    });

    dropZone.addEventListener('drop', (e) => {
      const files = e.dataTransfer.files;
      if (files.length > 0) {
        fileInput.files = files;
        dropZone.classList.add('has-file');
        if (textEl) textEl.textContent = files[0].name;
      }
    });

    fileInput.addEventListener('change', () => {
      if (fileInput.files.length > 0) {
        dropZone.classList.add('has-file');
        if (textEl) textEl.textContent = fileInput.files[0].name;
      } else {
        dropZone.classList.remove('has-file');
        if (textEl) textEl.textContent = originalText;
      }
    });
  }

  setupDropZone('docDropZone', 'docFileInput');
  setupDropZone('mediaDropZone', 'mediaFileInput');
  
// Quotes navigation
$.get('navQuotes').addEventListener('click', () => {
  Views.show('quotes');
  QuotesUI.render();
});

// Quote search
const quoteSearchInput = $.get('quoteSearchInput');
if (quoteSearchInput) {
  quoteSearchInput.addEventListener('input', Utils.debounce((e) => {
    State.quoteFilters.search = e.target.value.trim();
    State.pagination.quotes.page = 1; // Reset to page 1
    QuotesUI.render();
  }, 300));
}

// Create/Edit Quote buttons
$.get('openCreateQuote').addEventListener('click', () => {
  State.quoteFormMode = 'create';
  QuotesUI.showModal();
});

$.get('editQuoteBtn').addEventListener('click', () => {
  const quote = State.quotes.find(q => q.id === State.selectedQuoteId);
  if (quote) {
    State.quoteFormMode = 'edit';
    QuotesUI.showModal(quote);
  }
});

// Modal controls
$.get('closeQuoteModalBtn').addEventListener('click', () => Modals.close('createQuoteModal'));
$.get('cancelQuoteBtn').addEventListener('click', () => Modals.close('createQuoteModal'));
$.get('createQuoteModal').addEventListener('click', (e) => {
  if (e.target === $.get('createQuoteModal')) Modals.close('createQuoteModal');
});

// Form submit
$.get('quoteForm').addEventListener('submit', (e) => QuotesUI.handleFormSubmit(e));

// Mode checkbox changes
['Sea', 'Air', 'Land'].forEach(mode => {
  const cb = $.get(`quoteMode${mode}`);
  if (cb) {
    cb.addEventListener('change', () => QuotesUI.updateModeFields());
  }
});
  
  // Refresh checklist AND charge categories when key fields change (so placeholders get replaced)
['departureAirportName', 'arrivalAirportName', 'departurePort', 'poe', 'containerDetails'].forEach(fieldName => {
  const field = $.get('quoteForm')?.[fieldName];
  if (field) {
    field.addEventListener('change', () => {
      QuotesUI.updateChecklists();
      QuotesUI.refreshChargeCategoryPlaceholders();
    });
    field.addEventListener('blur', () => {
      QuotesUI.updateChecklists();
      QuotesUI.refreshChargeCategoryPlaceholders();
    });
  }
});

// Type change - update both checklists and context-aware fields
const quoteTypeSelect = $.get('quoteTypeSelect');
if (quoteTypeSelect) {
  quoteTypeSelect.addEventListener('change', () => {
    QuotesUI.updateModeFields(); // This now handles context-aware fields
    QuotesUI.updateChecklists();
  });
}

// Recipient type change - clear and repopulate charges
const quoteRecipientType = $.get('quoteRecipientType');
if (quoteRecipientType) {
  quoteRecipientType.addEventListener('change', () => {
    // Clear existing charges when switching between Client/Agent
    ['Sea', 'Air', 'Land'].forEach(mode => {
      const container = $.get(`${mode.toLowerCase()}ChargesList`);
      if (container) $.clear(container);
    });
    
    QuotesUI.updateModeFields();
    QuotesUI.updateChecklists();
  });
}

// Per-mode insurance toggles
['sea', 'air', 'land'].forEach(mode => {
  const checkbox = $.get(`${mode}InsuranceCheck`);
  if (checkbox) {
    checkbox.addEventListener('change', (e) => {
      const fieldsDiv = $.get(`${mode}InsuranceFields`);
      if (fieldsDiv) {
        if (e.target.checked) $.show(fieldsDiv);
        else $.hide(fieldsDiv);
      }
    });
  }
});

// Consignment instructions toggle
const includeConsignmentCheckbox = $.get('includeConsignmentInstructions');
if (includeConsignmentCheckbox) {
  includeConsignmentCheckbox.addEventListener('change', (e) => {
    QuotesUI.toggleConsignmentOptions(e.target.checked);
  });
}

// Office change for consignment preview
const quoteConsignmentOffice = $.get('quoteConsignmentOffice');
if (quoteConsignmentOffice) {
  quoteConsignmentOffice.addEventListener('change', () => {
    QuotesUI.updateConsignmentPreview();
  });
}

// Requirement type checkboxes
['includeForeignNational', 'includeReturningTurkish', 'includeDiplomatic'].forEach(id => {
  const cb = $.get(id);
  if (cb) {
    cb.addEventListener('change', () => {
      QuotesUI.updateConsignmentPreview();
    });
  }
});

// Add charge buttons for each mode
['Sea', 'Air', 'Land'].forEach(mode => {
  const btn = $.get(`add${mode}ChargeBtn`);
  if (btn) {
    btn.addEventListener('click', () => QuotesUI.addChargeRow(mode));
  }
});
  
  // Quote currency change - update amount placeholders
const quoteCurrencySelect = $.get('quoteCurrency');
if (quoteCurrencySelect) {
  quoteCurrencySelect.addEventListener('change', () => {
    const currency = quoteCurrencySelect.value;
    document.querySelectorAll('.charge-amount-input').forEach(input => {
      input.placeholder = `Amount (${currency})`;
    });
  });
}
  
 // Custom items
const addCustomIncludedBtn = $.get('addCustomIncludedBtn');
if (addCustomIncludedBtn) {
  addCustomIncludedBtn.addEventListener('click', addCustomIncluded);
}

const addAdditionalChargeBtn = $.get('addAdditionalChargeBtn');
if (addAdditionalChargeBtn) {
  addAdditionalChargeBtn.addEventListener('click', addAdditionalCharge);
}

// Enter key for custom inputs
const customIncludedInput = $.get('customIncludedInput');
if (customIncludedInput) {
  customIncludedInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') { e.preventDefault(); addCustomIncluded(); }
  });
}

const additionalChargeInput = $.get('additionalChargeInput');
if (additionalChargeInput) {
  additionalChargeInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') { e.preventDefault(); addAdditionalCharge(); }
  });
}
  
  // Job form mode field toggles
['jobModeSea', 'jobModeAir', 'jobModeLand'].forEach(id => {
  const cb = $.get(id);
  if (cb) {
    cb.addEventListener('change', toggleJobModeFields);
  }
});

// Job form vehicle checkbox toggle
const jobContentsVehicle = $.get('jobContentsVehicle');
if (jobContentsVehicle) {
  jobContentsVehicle.addEventListener('change', toggleJobVehicleFields);
}

// Quote form vehicle checkbox toggle
const quoteContentsVehicle = $.get('quoteContentsVehicle');
if (quoteContentsVehicle) {
  quoteContentsVehicle.addEventListener('change', toggleQuoteVehicleFields);
}

// ============================================================
// STORAGE EVENT HANDLERS
// ============================================================

// Storage search
const storageSearchInput = $.get('storageSearchInput');
if (storageSearchInput) {
  storageSearchInput.addEventListener('input', Utils.debounce(() => {
    State.pagination.storage.page = 1; // Reset to page 1
    StorageUI.render();
  }, 300));
}

// Create Storage button
const openCreateStorage = $.get('openCreateStorage');
if (openCreateStorage) {
  openCreateStorage.addEventListener('click', () => {
    StorageUI.openModal('create');
  });
}

// Edit Storage button
const editStorageBtn = $.get('editStorageBtn');
if (editStorageBtn) {
  editStorageBtn.addEventListener('click', () => {
    const storage = State.getStorage(State.selectedStorageId);
    if (storage) {
      StorageUI.openModal('edit', storage);
    }
  });
}

// Storage Modal controls
const closeStorageModalBtn = $.get('closeStorageModalBtn');
if (closeStorageModalBtn) {
  closeStorageModalBtn.addEventListener('click', () => {
    $.get('storageModal').classList.add('hidden');
  });
}

const cancelStorageFormBtn = $.get('cancelStorageFormBtn');
if (cancelStorageFormBtn) {
  cancelStorageFormBtn.addEventListener('click', () => {
    $.get('storageModal').classList.add('hidden');
  });
}

// Storage modal click outside to close
const storageModal = $.get('storageModal');
if (storageModal) {
  storageModal.addEventListener('click', (e) => {
    if (e.target === storageModal) {
      storageModal.classList.add('hidden');
    }
  });
}

// Storage form submit
const storageForm = $.get('storageForm');
if (storageForm) {
  storageForm.addEventListener('submit', (e) => {
    e.preventDefault();
    StorageUI.saveFromForm();
  });
}

// Storage billing type toggle
const storageBillingTypeSelect = $.get('storageBillingTypeSelect');
if (storageBillingTypeSelect) {
  storageBillingTypeSelect.addEventListener('change', () => {
    StorageUI.toggleBillingFields();
  });
}
}


// ============================================================
// LOGIN UI
// ============================================================

const LoginUI = {
  show() {
    const overlay = $.el('div', { className: 'login-overlay', id: 'loginOverlay' });
    
    const box = $.el('div', { className: 'login-box' });
    
    // Logo image
    const logo = $.el('img', { 
      src: 'logo.svg',
      alt: 'Istanbul Ekspres',
      className: 'login-logo-img'
    });
    box.appendChild(logo);
    
    // Form
    const form = $.el('form', { id: 'loginForm', className: 'login-form' });
    
    // Email field
    const emailGroup = $.el('div', { className: 'login-field' });
    emailGroup.appendChild($.el('label', { textContent: 'E-mail / E-posta', htmlFor: 'loginEmail' }));
    const emailInput = $.el('input', { 
      type: 'email', 
      id: 'loginEmail', 
      name: 'email',
      required: true
    });
    emailGroup.appendChild(emailInput);
    form.appendChild(emailGroup);
    
    // Password field
    const passGroup = $.el('div', { className: 'login-field' });
    passGroup.appendChild($.el('label', { textContent: 'Password / Şifre', htmlFor: 'loginPassword' }));
    const passInput = $.el('input', { 
      type: 'password', 
      id: 'loginPassword', 
      name: 'password',
      required: true,
      placeholder: '••••••••'
    });
    passGroup.appendChild(passInput);
    form.appendChild(passGroup);
    
    // Error message
    const errorMsg = $.el('div', { id: 'loginError', className: 'login-error hidden' });
    form.appendChild(errorMsg);
    
    // Submit button
    const submitBtn = $.el('button', { 
      type: 'submit', 
      className: 'login-btn',
      textContent: 'Sign In'
    });
    form.appendChild(submitBtn);
    
    // Form submit handler
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      errorMsg.classList.add('hidden');
      submitBtn.disabled = true;
      submitBtn.textContent = 'Signing in...';
      
      const email = emailInput.value.trim();
      const password = passInput.value;
      
      const { error } = await Auth.login(email, password);
      
      if (error) {
        errorMsg.textContent = error.message || 'Login failed. Please try again.';
        errorMsg.classList.remove('hidden');
        submitBtn.disabled = false;
        submitBtn.textContent = 'Sign In';
      } else {
        // Success - hide login and load app
        overlay.remove();
        await loadAppData();
      }
    });
    
    box.appendChild(form);
    
    overlay.appendChild(box);
    document.body.appendChild(overlay);
    
    // Focus email input
    emailInput.focus();
  },
  
  hide() {
    const overlay = $.get('loginOverlay');
    if (overlay) overlay.remove();
  }
};

// ============================================================
// APP INITIALIZATION
// ============================================================

async function loadAppData() {
  // Show loading indicator
  const mainContent = document.querySelector('.main-content');
  if (mainContent) {
    mainContent.style.opacity = '0.5';
  }
  
  await Storage.loadAll();

  Forms.populateCountrySelects();
  Forms.refreshAgentSelects();
  initEventHandlers();
  
  // Initialize all HTML date inputs with auto-formatting
  document.querySelectorAll('input[data-date-input="true"]').forEach(input => {
    input.addEventListener('input', (e) => {
      let v = e.target.value.replace(/[^\d]/g, '');
      if (v.length > 8) v = v.slice(0, 8);
      if (v.length >= 4) {
        v = v.slice(0, 2) + '/' + v.slice(2, 4) + '/' + v.slice(4);
      } else if (v.length >= 2) {
        v = v.slice(0, 2) + '/' + v.slice(2);
      }
      e.target.value = v;
    });
  });

  I18n.applyStaticTexts();

  JobsUI.render();
  AgentsUI.render();
  ScheduleUI.render();
  QuotesUI.render();

  // Show dashboard as landing page
  Views.show('dashboard');

  if (State.jobs.length > 0) {
    const sorted = [...State.jobs].sort((a, b) => {
      const da = Steps.getEarliest(a);
      const db = Steps.getEarliest(b);
      if (!da && !db) return 0;
      if (!da) return 1;
      if (!db) return -1;
      return da.localeCompare(db);
    });
    JobsUI.showDetails(sorted[0]);
  } else {
    const jobDetails = $.get('jobDetails');
    $.clear(jobDetails);
    jobDetails.appendChild($.el('p', { textContent: I18n.t('noMovesYet') }));

    const agentDetails = $.get('agentDetails');
    $.clear(agentDetails);
    agentDetails.appendChild($.el('p', { textContent: I18n.t('agentsForMoveHere') }));
  }

  if (State.agents.length > 0) {
    AgentsUI.showDetails(State.agents[0]);
  } else {
    const panel = $.get('agentDetailsPanel');
    $.clear(panel);
    panel.appendChild($.el('p', { textContent: I18n.t('noAgentsYet') }));
  }
  
  // Restore opacity
  if (mainContent) {
    mainContent.style.opacity = '1';
  }
  
  // Update connection status indicator
  updateConnectionStatus();
  
  // Start idle timeout tracker
  IdleTimeout.init();
}

function updateConnectionStatus() {
  // Add a small indicator showing online/offline status
  let indicator = $.get('connectionStatus');
  if (!indicator) {
    indicator = $.el('div', { 
      id: 'connectionStatus',
      className: 'connection-status'
    });
    document.querySelector('.top-header')?.appendChild(indicator);
  }
  
  if (Storage.isOnline) {
    indicator.className = 'connection-status online';
    indicator.title = 'Connected to cloud';
    indicator.textContent = '●';
  } else {
    indicator.className = 'connection-status offline';
    indicator.title = 'Offline mode - using local data';
    indicator.textContent = '○';
  }
  
  // Add logout button if logged in and not already added
  if (Auth.isLoggedIn() && !$.get('logoutBtn')) {
    const logoutBtn = $.el('button', {
      id: 'logoutBtn',
      className: 'logout-btn',
      title: 'Logout',
      textContent: '⏻'
    });
    logoutBtn.addEventListener('click', async () => {
      if (confirm('Are you sure you want to logout?')) {
        await Auth.logout();
        localStorage.clear();
        location.reload();
      }
    });
    document.querySelector('.top-header')?.appendChild(logoutBtn);
  }
}

// ============================================================
// AUTO-LOGOUT (Idle Timeout)
// ============================================================

const IdleTimeout = {
  timeoutMinutes: 10,
  timeoutId: null,
  warningId: null,
  
  init() {
    if (!Auth.isLoggedIn()) return;
    
    // Reset timer on any user activity
    const events = ['mousedown', 'mousemove', 'keydown', 'scroll', 'touchstart', 'click'];
    events.forEach(event => {
      document.addEventListener(event, () => this.resetTimer(), { passive: true });
    });
    
    this.resetTimer();
  },
  
  resetTimer() {
    // Clear existing timers
    if (this.timeoutId) clearTimeout(this.timeoutId);
    if (this.warningId) clearTimeout(this.warningId);
    
    // Hide warning if shown
    const warning = $.get('idleWarning');
    if (warning) warning.remove();
    
    // Set warning at 9 minutes (1 minute before logout)
    this.warningId = setTimeout(() => {
      this.showWarning();
    }, (this.timeoutMinutes - 1) * 60 * 1000);
    
    // Set logout at 10 minutes
    this.timeoutId = setTimeout(() => {
      this.logout();
    }, this.timeoutMinutes * 60 * 1000);
  },
  
  showWarning() {
    // Remove existing warning if any
    const existing = $.get('idleWarning');
    if (existing) existing.remove();
    
    const warning = $.el('div', {
      id: 'idleWarning',
      className: 'idle-warning'
    });
    warning.innerHTML = `
      <p>You will be logged out in 1 minute due to inactivity.</p>
      <button id="stayLoggedIn">Stay Logged In</button>
    `;
    document.body.appendChild(warning);
    
    $.get('stayLoggedIn').addEventListener('click', () => {
      this.resetTimer();
    });
  },
  
  async logout() {
    // Remove warning
    const warning = $.get('idleWarning');
    if (warning) warning.remove();
    
    await Auth.logout();
    localStorage.removeItem('sb-bjryicnxhaapteifmzav-auth-token');
    location.reload();
  }
};

async function init() {
  // Initialize language first (from localStorage, no auth needed)
  I18n.init();
  
  // Initialize Supabase client
  if (typeof window !== 'undefined' && window.supabase) {
    supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    
    // Check if already logged in
    const isLoggedIn = await Auth.initialize();
    
    if (isLoggedIn) {
      // Already has session, load app
      await loadAppData();
    } else {
      // Show login screen
      LoginUI.show();
    }
  } else {
    // Supabase library not loaded - show error
    document.body.innerHTML = `
      <div style="display:flex;align-items:center;justify-content:center;height:100vh;background:#1a1a2e;">
        <div style="background:white;padding:40px;border-radius:12px;text-align:center;max-width:400px;">
          <h2 style="color:#dc2626;margin:0 0 16px 0;">Connection Error</h2>
          <p style="color:#666;margin:0 0 20px 0;">Unable to connect to the server. Please check your internet connection and try again.</p>
          <button onclick="location.reload()" style="background:#3b82f6;color:white;border:none;padding:12px 24px;border-radius:8px;cursor:pointer;font-size:16px;">Retry</button>
        </div>
      </div>
    `;
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// ============================================================
// END OF APP.JS
// ============================================================