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
    QUOTES: 'istex_quotes'
  },
  
  COUNTRIES: [
    "Afghanistan","Albania","Algeria","Andorra","Angola","Argentina","Armenia",
    "Australia","Austria","Azerbaijan","Bangladesh","Belgium","Bosnia and Herzegovina",
    "Brazil","Bulgaria","Canada","Chile","China","Croatia","Cyprus","Czech Republic",
    "Denmark","Egypt","Estonia","Finland","France","Georgia","Germany","Greece",
    "Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Israel","Italy",
    "Japan","Jordan","Kazakhstan","Kenya","Kuwait","Latvia","Lebanon","Lithuania",
    "Luxembourg","Malaysia","Malta","Mexico","Morocco","Netherlands","New Zealand",
    "Nigeria","Norway","Pakistan","Poland","Portugal","Qatar","Romania",
    "Russian Federation","Saudi Arabia","Serbia","Singapore","Slovakia","Slovenia",
    "South Africa","South Korea","Spain","Sri Lanka","Sweden","Switzerland",
    "Syria","Thailand","Tunisia","Turkey","Ukraine","United Arab Emirates",
    "United Kingdom","United States","Vietnam"
  ],

  CHECKLIST_TEMPLATES: {
    IMPORT: ["Quote sent","Passport copy with entry stamp","Copy of resident permit","Signed personal application (Dilekçe)","Power of Attorney (Vekaletname)","Company application (Şirket yazısı)","Signed packing list","Turkish tax ID or foreign citizen number","Lease contract","List of all entry/exit in Turkey during the last 2 years","In transit to Turkey","Arrived at port/terminal","Delivered to warehouse","Delivered to residence","Payment received"],
    EXPORT: ["Quote sent","Survey done","Packing complete","In storage","Copy of passport","Flight ticket","Signed personal application (Dilekçe)","Power of Attorney (Vekaletname)","Company application","Signed packing list","Copy of work/residence permit","In transit to destination","Delivered","Payment received"],
    LOCAL: ["Quote sent","Survey done","Packing complete","In storage or N/A","In transit to destination address","Delivered","Payment received"]
  },

  STEP_DEFINITIONS: {
    packing: { label: "Packing", fields: ["date","time","personnel","vehicle","address","notes"], autoFillAddress: "origin" },
    survey: { label: "Survey", fields: ["date","time","personnel","vehicle","address","notes"], autoFillAddress: "origin" },
    delivery_to_residence: { label: "Delivery to Residence", fields: ["date","time","personnel","vehicle","address","notes"], autoFillAddress: "destination" },
    container_delivery: { label: "Container Delivery", fields: ["date","time","personnel","vehicle","portDetails","notes"] },
    container_pickup: { label: "Container Pickup", fields: ["date","time","personnel","vehicle","portDetails","notes"] },
    container_unloading: { label: "Container Unloading", fields: ["date","time","personnel","vehicle","notes"] },
    container_loading: { label: "Container Loading", fields: ["date","time","personnel","vehicle","notes"] },
    air_cargo_packing: { label: "Air Cargo Packing", fields: ["date","time","personnel","vehicle","address","notes"], autoFillAddress: "origin" },
    air_cargo_delivery_to_address: { label: "Air Cargo Delivery to Address", fields: ["date","time","personnel","vehicle","pickupAirport","deliveryAddress","notes"], autoFillDeliveryAddress: "destination" },
    air_cargo_delivery_to_airport: { label: "Air Cargo Delivery to Airport", fields: ["date","time","personnel","vehicle","deliveryAirport","pickupAddress","notes"], autoFillPickupAddress: "origin" }
  },

  STEP_SCENARIOS: {
    "Import|Sea": ["container_pickup","container_unloading","container_delivery","delivery_to_residence"],
    "Import|Land": ["delivery_to_residence"],
    "Import|Air": ["air_cargo_delivery_to_address"],
    "Import|Land/Sea": ["container_pickup","container_unloading","container_delivery","delivery_to_residence"],
    "Import|Air/Sea": ["container_pickup","container_unloading","container_delivery","air_cargo_delivery_to_address","delivery_to_residence"],
    "Import|Air/Land": ["air_cargo_delivery_to_address","delivery_to_residence"],
    "Import|Air/Land/Sea": ["container_pickup","container_unloading","container_delivery","air_cargo_delivery_to_address","delivery_to_residence"],
    "Export|Sea": ["survey","packing","container_pickup","container_loading","container_delivery"],
    "Export|Land": ["survey","packing"],
    "Export|Air": ["survey","air_cargo_packing","air_cargo_delivery_to_airport"],
    "Export|Land/Sea": ["survey","packing","container_pickup","container_loading","container_delivery"],
    "Export|Air/Sea": ["survey","packing","container_pickup","container_loading","container_delivery","air_cargo_packing","air_cargo_delivery_to_airport"],
    "Export|Air/Land": ["survey","packing","air_cargo_packing","air_cargo_delivery_to_airport"],
    "Export|Air/Land/Sea": ["survey","packing","air_cargo_packing","air_cargo_delivery_to_airport","container_pickup","container_loading","container_delivery"],
    "Local|Sea": ["survey","packing","delivery_to_residence"],
    "Local|Land": ["survey","packing","delivery_to_residence"],
    "Local|Air": ["survey","packing","delivery_to_residence"],
    "Local|Land/Sea": ["survey","packing","delivery_to_residence"],
    "Local|Air/Sea": ["survey","packing","delivery_to_residence"],
    "Local|Air/Land": ["survey","packing","delivery_to_residence"],
    "Local|Air/Land/Sea": ["survey","packing","delivery_to_residence"]
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

  // very simple address keyword rules (you can expand later)
  OFFICE_RULES: {
    Istanbul: ["istanbul", "gebze", "kocaeli"],
    Ankara: ["ankara"],
    Adana: ["adana", "mersin"],
    Izmir: ["izmir", "aydın", "manisa"]
  }
};

const DEFAULT_RESOURCE_LIBRARY = {
  categories: [
    {
      id: 'quotes',
      name: 'Quote Templates',
      nametr: 'Teklif Şablonları',
      items: []
    },
    {
      id: 'forms',
      name: 'Forms',
      nametr: 'Formlar',
      items: []
    },
    {
      id: 'checklists',
      name: 'Checklists & Inventory',
      nametr: 'Kontrol Listeleri ve Envanter',
      items: []
    },
    {
      id: 'shipping',
      name: 'Shipping Documents',
      nametr: 'Taşıma Belgeleri',
      items: []
    },
    {
      id: 'required',
      name: 'Required Documents',
      nametr: 'Gerekli Belgeler',
      items: []
    }
  ]
};

//==============================================// QUOTE TEMPLATES // =========================

const QUOTE_TEMPLATES = {
  'Sea|Export': {
    chargeCategories: [
      'Origin Services',
      'Local Container Drayage',
      'Export Customs Clearance',
      'Sea Freight from [DEPARTURE_PORT] to [POE]'
    ],
    additionalChargeCategories: [
      'Destination Terminal Handling Cost and Port Fees',
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

  'Air|Export': {
    chargeCategories: [
      'Origin Services',
      'Air Freight',
      'Airwaybill Charge',
      'Export Customs Clearance',
      '[DEPARTURE_AIRPORT] Terminal Handling Cost'
    ],
    additionalChargeCategories: [
      'Destination Services',
      'Destination Terminal Handling Cost'
    ],
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

  'Land|Export': {
    chargeCategories: [
      'Origin Services',
      'Turkish Export Clearance',
      'Road Transportation from [ORIGIN] to [DESTINATION]'
    ],
    additionalChargeCategories: [
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

  'Sea|Import': {
    chargeCategories: [
      'Sea Freight from [DEPARTURE_PORT] to [POE]',
      'Import Clearance',
      'Destination Services',
      'SS Line Port Agent "Delivery Order" charge',
      '[POE] Port "Terminal Handling & Bonded Storage" charges'
    ],
    additionalChargeCategories: [
      'Origin Services'
    ],
    includes: [
      'Import clearance in arrival port',
      'Delivery up to and including 1st floor residence with normal access within [DESTINATION] city limits',
      'Full unpacking of boxes onto flat surfaces, re-assembly of basic furniture, removal of the debris, and return of empty container to port'
    ],
    conditionalIncludes: {
      'Origin Services': [
        'Professional packing of personal and household goods',
        'Preparation of detailed inventory list',
        'Inland haulage from storage or address to [ORIGIN] port',
        'Origin terminal handling in departure port',
        'Local charges at departure port for customs documentation and Bill of Lading',
        'Ocean freight from [ORIGIN] port to [POE] port in a [CONTAINER_DETAILS]'
      ]
    }
  },

  'Air|Import': {
    chargeCategories: [
      'Destination Services',
      'Delivery Order',
      'Terminal Handling Charges at [ARRIVAL_AIRPORT]'
    ],
    additionalChargeCategories: [
      'Origin Services'
    ],
    includes: [
      'Payment of mandatory airline delivery order and [ARRIVAL_AIRPORT] terminal fees',
      'Turkish import formalities',
      'Inland haulage from airport to a residence in [DESTINATION]',
      'Delivery, unpacking, and removal of the debris upon completion of delivery services'
    ],
    conditionalIncludes: {
      'Origin Services': [
        'Professional export packing and wrapping (for air transport) in [ORIGIN] residence, issue of detailed inventory list',
        'Inland haulage from residence to [DEPARTURE_AIRPORT]',
        'Payment of departure airport terminal handling fees',
        '[DEPARTURE_AIRPORT] export formalities',
        'Air freight from [DEPARTURE_AIRPORT] to [ARRIVAL_AIRPORT]'
      ]
    }
  },

  'Land|Import': {
    chargeCategories: [
      'Road Transport from [ORIGIN] to [DESTINATION]',
      'Import Customs Clearance',
      'Destination Services'
    ],
    additionalChargeCategories: [
      'Origin Services',
      'Shuttle Service'
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
      ],
      'Shuttle Service': ['Shuttle service']
    }
  },

  'Land|Local': {
    chargeCategories: [
      'Local Moving Charge'
    ],
    additionalChargeCategories: [
      'Storage Charge'
    ],
    includes: [
      'Packing and wrapping at origin',
      'Local door-to-door transport from address at [ORIGIN] to address at [DESTINATION]',
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

// ============================================================
// TURKISH TRANSLATION SYSTEM
// ============================================================

const TR_SYSTEM = {
  // ===============================
  // MOVE TYPES (Trade Direction)
  // ===============================
  trade_Import: "İthalat",
  trade_Export: "İhracat",
  trade_Local: "Yurtiçi",

  // ===============================
  // TRANSPORT MODES
  // ===============================
  mode_Sea: "Denizyolu",
  mode_Land: "Karayolu",
  mode_Air: "Havayolu",

  // ===============================
  // MOVE STATUS
  // ===============================
  status_Planned: "Planlandı",
  status_Ongoing: "Devam Ediyor",
  status_Completed: "Tamamlandı",
  status_Cancelled: "İptal Edildi",

  // ===============================
  // MOVE STEPS
  // ===============================
  step_packing: "Paketleme",
  step_survey: "Ekspertiz",
  step_delivery_to_residence: "Adrese Teslimat",
  step_container_pickup: "Konteyner Alımı",
  step_container_delivery: "Konteyner Teslimi",
  step_container_loading: "Konteyner Yükleme",
  step_container_unloading: "Konteyner Boşaltma",
  step_air_cargo_packing: "Hava Kargo Paketleme",
  step_air_cargo_delivery_to_address: "Hava Kargo Adrese Teslimat",
  step_air_cargo_delivery_to_airport: "Hava Kargo Havalimanına Teslimat",

  // ===============================
  // EXTRA JOB TYPES
  // ===============================
  job_Custom: "Özel",
  job_Packing: "Paketleme",
  job_Survey: "Ekspertiz",
  job_DeliveryToResidence: "Adrese Teslimat",
  job_ContainerDelivery: "Konteyner Teslimi",
  job_ContainerPickup: "Konteyner Alımı",
  job_ContainerUnloading: "Konteyner Boşaltma",
  job_ContainerLoading: "Konteyner Yükleme",
  job_AirCargoPacking: "Hava Kargo Paketleme",
  job_AirCargoDeliveryToAddress: "Hava Kargo Adrese Teslimat",
  job_AirCargoDeliveryToAirport: "Hava Kargo Havalimanına Teslimat",
  job_DeliveryToPort: "Limana Teslimat",
  job_PickupFromPort: "Limandan Alım",
  job_AirCargoPickup: "Hava Kargo Alımı",
  job_AirCargoDelivery: "Hava Kargo Teslimat",
  job_WarehouseCleaning: "Depo Temizliği",
  job_TruckPreparation: "Tır Hazırlama",
  job_VehicleDelivery: "Araç Teslimatı",
  job_VehiclePickup: "Araç Alımı",

  // ===============================
  // CHECKLIST ITEMS
  // ===============================
  chk_QuoteSent: "Teklif gönderildi",
  chk_MoveReserved: "Taşıma rezerve edildi",
  chk_SurveyDone: "Ekspertiz tamamlandı",
  chk_SurveyDoneNA: "Ekspertiz - Gerekli değil",
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
// TRANSLATION HELPER
// ============================================================

const TR = {
  get(key, fallback = '') {
    return TR_SYSTEM.get(key, fallback);
  },

  trade(type) {
    const map = { Import: 'trade_Import', Export: 'trade_Export', Local: 'trade_Local' };
    const key = map[String(type || '')];
    return key ? this.get(key, type || '-') : (type || '-');
  },

  mode(mode) {
    const map = { Sea: 'mode_Sea', Land: 'mode_Land', Air: 'mode_Air' };
    const key = map[String(mode || '')];
    return key ? this.get(key, mode || '-') : (mode || '-');
  },

  modes(modes) {
    const arr = Array.isArray(modes) ? modes : [];
    if (!arr.length) return '-';
    return arr.map(m => this.mode(m)).join(' + ');
  },

  status(status) {
    const map = {
      Planned: 'status_Planned',
      Ongoing: 'status_Ongoing',
      Completed: 'status_Completed',
      Cancelled: 'status_Cancelled'
    };
    const key = map[String(status || '')];
    return key ? this.get(key, status || '-') : (status || '-');
  },

  step(step) {
    const id = step && step.id ? String(step.id) : '';
    const key = `step_${id}`;
    const fallback = (step && step.label) ? step.label : (id || '-');
    return this.get(key, fallback);
  },

  extraJobType(taskType) {
    const t = String(taskType || '').trim();
    if (!t) return '-';
    
    // Convert to key format (remove spaces)
    const key = 'job_' + t.replace(/\s+/g, '');
    const translated = this.get(key);
    
    // If found, use it; otherwise return original
    return (translated !== key) ? translated : t;
  },

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
    return key ? this.get(key, raw) : raw;
  }
};
// ============================================================
// i18n (Turkish UI toggle)
// ============================================================

const I18n = {
  dict: {
    en: {
      langShort: 'EN',
      moves: 'Moves',
      agents: 'Agents',
      schedule: 'Schedule',
      documents: 'Documents',
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
      noAgentsYet: 'No agents yet.',
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
      deleteContactConfirm: 'Delete this contact?',
      fillAtLeastOneField: 'Please fill at least one field.',
      noDocumentsFound: 'No documents found.',
      documentsSearchTab: 'Documents Search',
      resourceLibraryTab: 'Resource Library',
      openLinkWin: 'Open Link',
      recentMoves: 'Recent Moves',
      noMovesLinked: 'No moves linked yet.',
      location: 'Location: ',
      editAgent: 'Edit Agent',
      deleteAgent: 'Delete Agent',
      contacts: 'Contacts',
      contactName: 'Contact Name',
      email: 'Email',
      phone: 'Phone',
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
      step_air_cargo_delivery_to_airport: 'Air Cargo Delivery to Airport'
    },
    tr: {
      langShort: 'TR',
      moves: 'Taşımalar',
      agents: 'Acenteler',
      schedule: 'Takvim',
      documents: 'Belgeler',
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
      searchMovesPh: 'Taşıma no, müşteri, çıkış, varış, acente ile ara...',
      searchAgentsPh: 'Acente adı, şehir, ülke ile ara...',
      searchDocsPh: 'Taşıma no, müşteri, belge adı, acente ile ara...',
      allMoves: 'Tüm taşımalar',
      all: 'Hepsi',
      planned: 'Planlandı',
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
      noAgentsYet: 'Henüz acente yok.',
      createNewMove: 'Yeni Taşıma Oluştur',
      saveMove: 'Taşımayı Kaydet',
      cancel: 'İptal',
      statusRequired: 'Durum zorunludur.',
      selectOneAgent: 'Lütfen en az bir acente seçin.',
      documentNameRequired: 'Belge adı zorunludur.',
      docNameLabel: 'Belge Adı',
      docDateLabel: 'Belge Tarihi (gg/aa/yyyy)',
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
      deleteContactConfirm: 'Bu kontak silinsin mi?',
      fillAtLeastOneField: 'Lütfen en az bir alan doldurun.',
      noDocumentsFound: 'Belge bulunamadı.',
      documentsSearchTab: 'Belge Arama',
      resourceLibraryTab: 'Kaynak Kütüphanesi',
      recentMoves: 'Son Taşımalar',
      noMovesLinked: 'Bağlı taşıma yok.',
      location: 'Konum: ',
      editAgent: 'Acenteyi Düzenle',
      deleteAgent: 'Acenteyi Sil',
      contacts: 'Kontaklar',
      contactName: 'Kontak Adı',
      email: 'E-posta',
      phone: 'Telefon',
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
      newNotePlaceholder: 'Yeni not girin...',
      docNamePlaceholder: 'Belge adı',
      docDatePlaceholder: 'Tarih (GG/AA/YYYY)',
      docUrlPlaceholder: 'URL (opsiyonel)',
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

      // translated enums
      statusPlanned: 'Planlandı',
      statusOngoing: 'Devam Ediyor',
      statusCompleted: 'Tamamlandı',
      statusCancelled: 'İptal',
      modeSea: 'Denizyolu',
      modeLand: 'Karayolu',
      modeAir: 'Havayolu',

      // step labels
      step_packing: 'Paketleme',
      step_survey: 'Ekspertiz',
      step_delivery_to_residence: 'Eve Teslimat',
      step_container_delivery: 'Konteyner Teslimatı',
      step_container_pickup: 'Konteyner Alımı',
      step_container_unloading: 'Konteyner Boşaltma',
      step_container_loading: 'Konteyner Yükleme',
      step_air_cargo_packing: 'Hava Kargo Paketleme',
      step_air_cargo_delivery_to_address: 'Hava Kargo Adrese Teslim',
      step_air_cargo_delivery_to_airport: 'Hava Kargo Havalimanına Teslim'
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

  typeText(type) {
    const map = { Import: 'importType', Export: 'exportType', Local: 'localType' };
    return map[type] ? this.t(map[type]) : (type || '-');
  },

  modeText(mode) {
    const m = String(mode || '');
    const map = { Sea: 'modeSea', Land: 'modeLand', Air: 'modeAir' };
    return map[m] ? this.t(map[m]) : (m || '-');
  },

  modesText(modes) {
    const arr = Array.isArray(modes) ? modes : [];
    if (!arr.length) return (State.lang === 'tr') ? 'Mod yok' : 'No mode';
    return arr.map(m => this.modeText(m)).join(' + ');
  },

  stepText(step) {
    const id = step && step.id ? String(step.id) : '';
    const key = `step_${id}`;
    if (this.dict[State.lang] && this.dict[State.lang][key]) return this.t(key);
    if (this.dict.en && this.dict.en[key]) return this.t(key);
    return (step && step.label) ? step.label : (id || '-');
  },

taskTypeText(taskType) {
  if (State.lang === 'tr') return TR.extraJobType(taskType);
  
  // English: return as-is
  const t = String(taskType || '');
  if (!t) return '-';
  return t;
},
  
checklistText(text) {
  if (State.lang === 'tr') return TR.checklist(text);
  return text; // English: return as-is
},
  
  loadLang() {
    const saved = Storage.load(CONFIG.STORAGE_KEYS.LANG, null);
    if (saved === 'tr' || saved === 'en') return saved;
    return 'en';
  },

  saveLang(lang) {
    State.lang = lang;
    Storage.save(CONFIG.STORAGE_KEYS.LANG, lang);
  },

  ensureToggle() {
    // Add a small language toggle button into the header (without changing HTML/CSS files).
    const header = document.querySelector('header');
    if (!header) return;

    if (!document.getElementById('langToggleBtn')) {
      header.style.display = header.style.display || 'flex';
      header.style.alignItems = header.style.alignItems || 'center';
      header.style.justifyContent = header.style.justifyContent || 'space-between';
      header.style.gap = header.style.gap || '10px';

      const btn = document.createElement('button');
      btn.type = 'button';
      btn.id = 'langToggleBtn';
      btn.title = 'Language';
      btn.textContent = this.t('langShort');

      btn.addEventListener('click', () => {
        const next = (State.lang === 'tr') ? 'en' : 'tr';
        this.saveLang(next);
        this.applyStaticTexts();
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
      });

      header.appendChild(btn);
    } else {
      document.getElementById('langToggleBtn').textContent = this.t('langShort');
    }
  },

  applyStaticTexts() {
    const navMoves = $.get('navMoves'); if (navMoves) navMoves.textContent = this.t('moves');
    const navAgents = $.get('navAgents'); if (navAgents) navAgents.textContent = this.t('agents');
    const navSchedule = $.get('navSchedule'); if (navSchedule) navSchedule.textContent = this.t('schedule');
const scheduleDayDetailsTitle = document.querySelector('#scheduleView .right-panel .header-row h2');
if (scheduleDayDetailsTitle) scheduleDayDetailsTitle.textContent = this.t('dayDetails');
    const scheduleViewTitle = document.querySelector('#scheduleView .left-panel .header-row h2');
if (scheduleViewTitle) scheduleViewTitle.textContent = this.t('schedule');
    const scheduleHintText = document.querySelector('#scheduleDayDetails p[data-i18n="hintSelectDay"]');
if (scheduleHintText) scheduleHintText.textContent = this.t('scheduleDayDetailsHint');
    const navDocuments = $.get('navDocuments'); if (navDocuments) navDocuments.textContent = this.t('documents');
    const documentsSearchTab = $.get('documentsSearchTab');
  if (documentsSearchTab) {
    const span = documentsSearchTab.querySelector('span');
    if (span) span.textContent = this.t('documentsSearchTab');
  }

  const resourceLibraryTab = $.get('resourceLibraryTab');
  if (resourceLibraryTab) {
    const span = resourceLibraryTab.querySelector('span');
    if (span) span.textContent = this.t('resourceLibraryTab');
  }
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
  scheduleNotes: {},
  scheduleExtraJobs: {}, // { "YYYY-MM-DD": [ extraJob, ... ] }
  selectedJobId: null,
  jobFormMode: 'create',
  filters: { status: 'All', type: 'All', payment: 'All', search: '' },
  selectedAgentId: null,
  agentFormMode: 'create',
  agentSearch: '',
  editingContactIndex: null,
  schedule: { year: new Date().getFullYear(), month: new Date().getMonth(), selectedDate: null },

  lang: 'en',
  resourceLibrary: null,
  documentsViewTab: 'search',
  
  quotes: [],
  selectedQuoteId: null,
  quoteFormMode: 'create',
  quoteFilters: { search: '' },

  getJob(id) { return this.jobs.find(j => j.id === id); },
  getAgent(id) { return this.agents.find(a => a.id === id); },
  getAgentName(id) { const a = this.getAgent(id); return a ? a.name : ''; }
};

// ============================================================
// STORAGE
// ============================================================

const Storage = {
  save(key, data) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
      return true;
    } catch (e) {
      console.error('Storage error:', e);
      return false;
    }
  },

  load(key, defaultValue = null) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (e) {
      return defaultValue;
    }
  },

  saveResourceLibrary() { 
  this.save(CONFIG.STORAGE_KEYS.RESOURCE_LIBRARY, State.resourceLibrary); 
},

loadResourceLibrary() {
  const saved = this.load(CONFIG.STORAGE_KEYS.RESOURCE_LIBRARY, null);
  if (saved && Array.isArray(saved.categories)) {
    State.resourceLibrary = saved;
  } else {
    // Initialize with default empty categories
    State.resourceLibrary = JSON.parse(JSON.stringify(DEFAULT_RESOURCE_LIBRARY));
    this.saveResourceLibrary();
  }
},
  
  saveJobs() { this.save(CONFIG.STORAGE_KEYS.JOBS, State.jobs); },
  saveAgents() { this.save(CONFIG.STORAGE_KEYS.AGENTS, State.agents); },
  saveScheduleNotes() { this.save(CONFIG.STORAGE_KEYS.SCHEDULE_NOTES, State.scheduleNotes); },
  saveScheduleExtraJobs() { this.save(CONFIG.STORAGE_KEYS.SCHEDULE_EXTRA_JOBS, State.scheduleExtraJobs); },
    saveQuotes() { 
    this.save(CONFIG.STORAGE_KEYS.QUOTES, State.quotes); 
  },

  loadQuotes() {
    State.quotes = this.load(CONFIG.STORAGE_KEYS.QUOTES, []);
    State.quotes = State.quotes.map(q => Validator.normalizeQuote(q));
  },

  loadAll() {
    State.agents = this.load(CONFIG.STORAGE_KEYS.AGENTS, []);
    State.jobs = this.load(CONFIG.STORAGE_KEYS.JOBS, []);
    State.scheduleNotes = this.load(CONFIG.STORAGE_KEYS.SCHEDULE_NOTES, {});
    State.scheduleExtraJobs = this.load(CONFIG.STORAGE_KEYS.SCHEDULE_EXTRA_JOBS, {});
    this.loadResourceLibrary();
    this.loadQuotes();
    Validator.normalizeAll();
  },

  exportData() {
    return {
      jobs: State.jobs,
      agents: State.agents,
      scheduleNotes: State.scheduleNotes,
      scheduleExtraJobs: State.scheduleExtraJobs,
      quotes: State.quotes
    };
  },

  importData(data) {
    if (!data || !Array.isArray(data.jobs) || !Array.isArray(data.agents)) {
      throw new Error('Invalid import data');
    }
    State.jobs = data.jobs;
    State.agents = data.agents;
    State.scheduleNotes = data.scheduleNotes || {};
    State.scheduleExtraJobs = data.scheduleExtraJobs || {};
    State.quotes = data.quotes || {};
    Validator.normalizeAll();
    this.saveJobs();
    this.saveAgents();
    this.saveScheduleNotes();
    this.saveScheduleExtraJobs();
    this.saveQuotes();
  }
};

// ============================================================
// VALIDATOR
// ============================================================

const Validator = {
  normalizeAgent(agent) {
    if (!agent || typeof agent !== 'object') return { id: Utils.makeId('agent'), name: '', city: '', country: '', contacts: [] };
    if (!agent.id) agent.id = Utils.makeId('agent');
    if (!Array.isArray(agent.contacts)) agent.contacts = [];
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
  if (!job.tradeDirection) job.tradeDirection = '';
  if (!Array.isArray(job.modes)) job.modes = [];
  if (!Array.isArray(job.notes)) job.notes = [];
  if (!Array.isArray(job.documents)) job.documents = [];
  if (!Array.isArray(job.media)) job.media = [];
  if (typeof job.paymentReceived !== 'boolean') job.paymentReceived = false;
  if (!job.packDate) job.packDate = '';
  if (!job.jobCode) job.jobCode = Utils.jobCode();
  if (!Array.isArray(job.removedAutoStepIds)) job.removedAutoStepIds = [];

  // Shipment contents (HHE, Vehicle)
  if (!Array.isArray(job.shipmentContents)) job.shipmentContents = ['HHE'];
  
  // Move Manager
  if (typeof job.moveManager !== 'string') job.moveManager = '';

  // Mode-specific fields - Sea
  if (typeof job.seaVolume !== 'number') job.seaVolume = 0;
  if (typeof job.containerDetails !== 'string') job.containerDetails = '';

  // Mode-specific fields - Air
  if (typeof job.airVolume !== 'number') job.airVolume = 0;
  if (typeof job.airCargoWeight !== 'number') job.airCargoWeight = 0;
  if (typeof job.airACW !== 'number') job.airACW = 0;

  // Mode-specific fields - Land
  if (typeof job.landVolume !== 'number') job.landVolume = 0;

  // Vehicle fields
  if (typeof job.vehicleType !== 'string') job.vehicleType = '';
  if (typeof job.vehicleMake !== 'string') job.vehicleMake = '';
  if (typeof job.vehicleModel !== 'string') job.vehicleModel = '';
  if (typeof job.vehicleYear !== 'number') job.vehicleYear = 0;
  if (typeof job.vehicleVIN !== 'string') job.vehicleVIN = '';
  if (typeof job.vehicleCondition !== 'string') job.vehicleCondition = 'Running';

  // Legacy field migration (if old jobs have weight/volume, migrate to primary mode)
  if (job.weight && !job.airCargoWeight && job.modes && job.modes.includes('Air')) {
    job.airCargoWeight = job.weight;
  }
  if (job.volume) {
    if (job.modes && job.modes.includes('Sea') && !job.seaVolume) job.seaVolume = job.volume;
    else if (job.modes && job.modes.includes('Air') && !job.airVolume) job.airVolume = job.volume;
    else if (job.modes && job.modes.includes('Land') && !job.landVolume) job.landVolume = job.volume;
  }

  if (!Array.isArray(job.checklist) || job.checklist.length === 0) {
    const template = CONFIG.CHECKLIST_TEMPLATES[job.tradeDirection] || [];
    job.checklist = template.map(text => ({ text, done: false }));
  }

  Steps.ensure(job);

  // Ensure completed field exists on all steps
  if (Array.isArray(job.steps)) {
    job.steps.forEach(step => {
      if (typeof step.completed !== 'boolean') step.completed = false;
    });
  }

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

  normalizeAll() {
    State.agents = (State.agents || []).map(a => this.normalizeAgent(a));
    State.jobs = (State.jobs || []).map(j => this.normalizeJob(j));
    this.normalizeScheduleExtraJobs();
  }
};

// ============================================================
// STEPS SYSTEM
// ============================================================

const Steps = {
  create(job) {
    const { tradeDirection, modes } = job;
    if (!tradeDirection || !modes || modes.length === 0) return [];

    const modeKey = [...new Set(modes)].sort().join('/');
    const scenarioKey = `${tradeDirection}|${modeKey}`;
    const stepIds = CONFIG.STEP_SCENARIOS[scenarioKey] || [];
    const removedStepIds = Array.isArray(job.removedAutoStepIds) ? job.removedAutoStepIds : [];

    return stepIds.filter(stepId => !removedStepIds.includes(stepId)).map(stepId => {
      const def = CONFIG.STEP_DEFINITIONS[stepId] || {};
      const step = {
        id: stepId, label: def.label || stepId,
        date: '', time: '', personnel: '', vehicle: '', address: '',
        portDetails: '', pickupAirport: '', deliveryAirport: '',
        pickupAddress: '', deliveryAddress: '', notes: '',
        office: '' // office per step (manual)
      };

      if (def.autoFillAddress === 'origin' && job.originFullAddress) step.address = job.originFullAddress;
      if (def.autoFillAddress === 'destination' && job.destinationFullAddress) step.address = job.destinationFullAddress;
      if (def.autoFillDeliveryAddress === 'destination' && job.destinationFullAddress) step.deliveryAddress = job.destinationFullAddress;
      if (def.autoFillPickupAddress === 'origin' && job.originFullAddress) step.pickupAddress = job.originFullAddress;

      return step;
    });
  },

  ensure(job) {
    if (!Array.isArray(job.steps)) {
      job.steps = this.create(job);
      if (job.packDate) {
        const packing = job.steps.find(s => s.id === 'packing');
        if (packing && !packing.date) packing.date = job.packDate;
      }
    } else {
      // ensure office field exists on existing data
      job.steps.forEach(step => {
        if (typeof step.office !== 'string') step.office = '';
      });
    }
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

// ============================================================
// UTILITIES
// ============================================================

const Utils = {
  formatDate(str) {
    if (!str) return '-';
    const parts = str.split('-');
    return parts.length === 3 ? `${parts[2]}/${parts[1]}/${parts[0]}` : str;
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

  formatTime(iso) {
    try { return new Date(iso).toLocaleString(); } catch (e) { return '-'; }
  },

  location(city, country) {
    return [city, country].filter(Boolean).join(', ') || '-';
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

  // office detection by address keywords (simple rule-based)
  detectOfficeFromAddress(address) {
    const text = String(address || '').toLowerCase();
    if (!text.trim()) return '';
    for (const office of CONFIG.OFFICES) {
      const rules = CONFIG.OFFICE_RULES[office] || [];
      if (rules.some(k => text.includes(k))) return office;
    }
    return '';
  },

  // pick best address for steps, then detect office
  detectOfficeForStep(step, job) {
    const candidates = [
      step.address,
      step.pickupAddress,
      step.deliveryAddress,
      job && job.originFullAddress,
      job && job.destinationFullAddress
    ].filter(Boolean);

    for (const addr of candidates) {
      const office = this.detectOfficeFromAddress(addr);
      if (office) return office;
    }
    return '';
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

  // NEW: show "MOVEID – Client" when linked
  jobLabelById(jobId, fallbackCode = '') {
    const j = jobId ? State.getJob(jobId) : null;
    if (j) return `${j.jobCode || ''} – ${j.clientName || ''}`.trim();
    return fallbackCode || '';
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

  getTemplate(mode, type) {
    if (type === 'Local') return QUOTE_TEMPLATES['Land|Local'] || null;
    return QUOTE_TEMPLATES[`${mode}|${type}`] || null;
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

  getChargeCategories(mode, type, data) {
    const tpl = this.getTemplate(mode, type);
    if (!tpl) return { main: [], additional: [] };
    return {
      main: (tpl.chargeCategories || []).map(c => this.replacePlaceholders(c, data)),
      additional: (tpl.additionalChargeCategories || []).map(c => this.replacePlaceholders(c, data))
    };
  },

  getBaseIncludes(mode, type, data) {
    const tpl = this.getTemplate(mode, type);
    if (!tpl) return [];
    return (tpl.includes || []).map(i => this.replacePlaceholders(i, data));
  },

  getConditionalIncludes(mode, type, data, selectedChargeCategories) {
    const tpl = this.getTemplate(mode, type);
    if (!tpl || !tpl.conditionalIncludes) return [];
    
    let items = [];
    Object.keys(tpl.conditionalIncludes).forEach(chargeKey => {
      const hasMatch = selectedChargeCategories.some(c => 
        c.toLowerCase().includes(chargeKey.toLowerCase()) || 
        chargeKey.toLowerCase().includes(c.toLowerCase().split(' ')[0])
      );
      if (hasMatch) {
        items = items.concat(tpl.conditionalIncludes[chargeKey].map(i => 
          this.replacePlaceholders(i, data)
        ));
      }
    });
    return items;
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
    (charges || []).forEach(c => {
      const curr = c.currency || 'USD';
      totals[curr] = (totals[curr] || 0) + (parseFloat(c.amount) || 0);
    });
    return totals;
  },

  formatTotals(totals) {
    return Object.entries(totals)
      .map(([c, a]) => `${c} ${a.toFixed(2)}`)
      .join(' + ');
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
  closeAgent() { this.close('createAgentModal'); }
};

const Views = {
  show(name) {
    ['movesView', 'agentsView', 'scheduleView', 'documentsView', 'quotesView']
      .forEach(id => $.hide($.get(id)));

    ['navMoves', 'navAgents', 'navSchedule', 'navDocuments', 'navQuotes']
      .forEach(id => {
        const el = $.get(id);
        if (el) el.classList.remove('active');
      });

    const map = {
      'moves':     { view: 'movesView',     nav: 'navMoves' },
      'agents':    { view: 'agentsView',    nav: 'navAgents' },
      'schedule':  { view: 'scheduleView',  nav: 'navSchedule' },
      'documents': { view: 'documentsView', nav: 'navDocuments' },
      'quotes':    { view: 'quotesView',    nav: 'navQuotes' }
    };

    const v = map[name];
    if (v) {
      $.show($.get(v.view));
      const navEl = $.get(v.nav);
      if (navEl) navEl.classList.add('active');

      if (name === 'schedule') {
        ScheduleUI.render();
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
      const address = step.address || step.pickupAddress || step.deliveryAddress || '-';
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

      rows.push({
        office,
        time: ej.time || '',
        jobCode: linked ? (linked.jobCode || '') : (ej.linkedJobCode || ''),
        client: linked ? (linked.clientName || '') : (ej.linkedJobClientName || ''),
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

    const html = `
<!doctype html>
<html>
<head>
  <meta charset="utf-8"/>
  <title>${Utils.escapeHtml(title)}</title>
  <style>
    body { font-family: Arial, sans-serif; padding: 18px; color: #111; }
    h1 { font-size: 18px; margin: 0 0 12px 0; }
    .meta { font-size: 12px; color: #555; margin-bottom: 12px; }
    table { width: 100%; border-collapse: collapse; font-size: 12px; }
    th, td { border: 1px solid #ccc; padding: 6px; vertical-align: top; }
    th { background: #f2f2f2; text-align: left; }
    .small { color:#555; font-size: 11px; }
    @media print {
      body { padding: 0; }
      h1 { font-size: 16px; }
      table { font-size: 11px; }
    }
  </style>
</head>
<body>
  <h1>${Utils.escapeHtml(title)}</h1>
  <div class="meta small">
    ${Utils.escapeHtml((State.lang === 'tr') ? 'Not: PDF almak için yazdır penceresinde “PDF olarak kaydet” seçin.' : 'Tip: In the print dialog choose “Save as PDF”.')}
  </div>
  <table>
    <thead>
      <tr>
        <th>${Utils.escapeHtml(I18n.t('office'))}</th>
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
      ${
        allRows.length
          ? CONFIG.OFFICES.map(office => {
              const items = officeGroups[office] || [];
              if (!items.length) return '';
              const header = `
                <tr>
                  <td colspan="9"><strong>${Utils.escapeHtml(office)}</strong></td>
                </tr>
              `;
              const body = items.map(r => `
            <tr>
              <td>${Utils.escapeHtml(r.office || '')}</td>
              <td>${Utils.escapeHtml(r.time || '')}</td>
              <td>${Utils.escapeHtml(r.jobCode || '')}</td>
              <td>${Utils.escapeHtml(r.client || '')}</td>
              <td>${Utils.escapeHtml(r.task || '')}</td>
              <td>${Utils.escapeHtml(r.address || '')}</td>
              <td>${Utils.escapeHtml(r.personnel || '')}</td>
              <td>${Utils.escapeHtml(r.vehicle || '')}</td>
              <td>${Utils.escapeHtml(r.notes || '')}</td>
            </tr>
              `).join('');
              return header + body;
            }).join('')
          : `<tr><td colspan="9">${Utils.escapeHtml((State.lang === 'tr') ? 'Bu gün için kayıt yok.' : 'No items for this day.')}</td></tr>`
      }
    </tbody>
  </table>
</body>
</html>
`.trim();

    const w = window.open('', '_blank');
    if (!w) {
      alert((State.lang === 'tr') ? 'Açılır pencere engellendi. Lütfen pop-up izin verin.' : 'Popup blocked. Please allow popups.');
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
    const jobs = this.filter();
    $.clear(container);
    if (jobs.length === 0) {
      container.appendChild($.el('p', { textContent: I18n.t('noMovesMatch') }));
      return;
    }
    jobs.forEach(job => container.appendChild(this.createCard(job)));
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
          job.destinationCity,
          job.destinationCountry,
          State.getAgentName(job.originAgentId),
          State.getAgentName(job.destinationAgentId),
          job.tradeDirection
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
    card.appendChild($.el('h3', { textContent: `${job.jobCode || ''} – ${job.clientName || 'No client name'}` }));
    card.appendChild($.el('p', { textContent: `${Utils.location(job.originCity, job.originCountry)} → ${Utils.location(job.destinationCity, job.destinationCountry)}` }));

    const oAgent = State.getAgentName(job.originAgentId);
    const dAgent = State.getAgentName(job.destinationAgentId);
    if (oAgent || dAgent) {
      const p = $.el('p', { className: 'job-card-agents' });
      if (oAgent) {
        p.appendChild(document.createTextNode(I18n.t('originAgent', { name: oAgent })));
        if (dAgent) p.appendChild($.el('br'));
      }
      if (dAgent) p.appendChild(document.createTextNode(I18n.t('destinationAgent', { name: dAgent })));
      card.appendChild(p);
    }

    const statusP = $.el('p');
    statusP.appendChild($.el('strong', { className: `status-label status-${job.status}`, textContent: I18n.statusText(job.status) }));
    const modes = I18n.modesText(job.modes);
    statusP.appendChild(document.createTextNode(' ' + modes));
    card.appendChild(statusP);

    const typeLabel = I18n.typeText(job.tradeDirection) || '-';
    const payLabel = job.paymentReceived ? I18n.t('paidLabel') : I18n.t('unpaidLabel');

    card.appendChild($.el('p', {
      innerHTML: I18n.t('jobCardTypePayment', { type: typeLabel, pay: payLabel }),
      style: 'font-size: 12px; color: #6b7280;'
    }));

    card.addEventListener('click', () => this.showDetails(job));
    return card;
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

    container.appendChild($.el('h3', { textContent: `${job.jobCode || ''} – ${job.clientName || 'No client name'}` }));

    const grid = $.el('div', { className: 'details-grid' });
    const details = [
  [I18n.t('statusLabel'), I18n.statusText(job.status)],
  [I18n.t('modeLabel'), I18n.modesText(job.modes)],
  [I18n.t('origin'), Utils.location(job.originCity, job.originCountry)],
  [I18n.t('destination'), Utils.location(job.destinationCity, job.destinationCountry)],
  [I18n.t('fullOriginAddress'), job.originFullAddress || '-'],
  [I18n.t('fullDestinationAddress'), job.destinationFullAddress || '-'],
  [I18n.t('moveId'), job.jobCode || '-'],
  [I18n.t('typeLabel'), I18n.typeText(job.tradeDirection) || '-'],
  ['Move Manager', job.moveManager || '-'],
  [I18n.t('paymentReceived'), job.paymentReceived ? I18n.t('yes') : I18n.t('no')]
];

// Add shipment contents info
const contents = (job.shipmentContents || ['HHE']).join(' + ');
details.push(['Shipment Contents', contents]);

details.forEach(([label, value]) => {
  const p = $.el('p');
  p.appendChild($.el('strong', { textContent: label + ': ' }));
  p.appendChild(document.createTextNode(value));
  grid.appendChild(p);
});

container.appendChild(grid);

// Mode-specific information boxes
const modeInfoContainer = $.el('div', { style: 'margin-top: 16px;' });

if (job.modes && job.modes.includes('Sea')) {
  const seaBox = $.el('div', { className: 'mode-info-box sea' });
  seaBox.appendChild($.el('h5', { textContent: 'Sea Freight Details' }));
  const seaRows = [
    ['Volume', `${job.seaVolume || 0} cbm`],
    ['Container', job.containerDetails || '-']
  ];
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
  airBox.appendChild($.el('h5', { textContent: 'Air Freight Details' }));
  const airRows = [
    ['Volume', `${job.airVolume || 0} cbm`],
    ['Cargo Weight', `${job.airCargoWeight || 0} kg`],
    ['Chargeable Weight (ACW)', `${job.airACW || 0} kg`]
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
  landBox.appendChild($.el('h5', { textContent: 'Land Freight Details' }));
  const landRows = [
    ['Volume', `${job.landVolume || 0} cbm`]
  ];
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
  vehicleBox.appendChild($.el('h5', { textContent: 'Vehicle Details' }));
  const vehicleRows = [
    ['Type', job.vehicleType || '-'],
    ['Make/Model', `${job.vehicleMake || '-'} ${job.vehicleModel || ''}`.trim()],
    ['Year', job.vehicleYear || '-'],
    ['VIN', job.vehicleVIN || '-'],
    ['Condition', job.vehicleCondition || '-']
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
    container.appendChild(this.paymentSection(job));
    container.appendChild(this.stepsSection(job));
    this.renderAgents(job);
    ChecklistUI.render(job);
    NotesUI.render(job);
    DocumentsUI.render(job);
    MediaUI.render(job);

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

  paymentSection(job) {
    const section = $.el('div', { className: 'payment-section' });
    const p = $.el('p');
    p.appendChild($.el('strong', { textContent: I18n.t('updatePaymentStatus') }));
    section.appendChild(p);
    const buttons = $.el('div', { className: 'payment-buttons' });

    [[I18n.t('yes'), true], [I18n.t('no'), false]].forEach(([label, isYes]) => {
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
  headerRow.appendChild($.el('h4', { textContent: I18n.t('moveSteps'), style: 'margin:0;' }));

  const addBtn = $.el('button', { type: 'button', textContent: I18n.t('addAdditionalJob') });
  headerRow.appendChild(addBtn);

  section.appendChild(headerRow);

  const steps = job.steps || [];
  const linked = ScheduleExtraJobs.getLinkedToJob(job.id);
  const totalItems = steps.length + linked.length;
  
  // Progress bar - includes both steps and linked additional jobs
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
    
    // Count additional jobs
    linked.forEach(item => {
      const segment = $.el('div', { className: 'steps-progress-segment extra-job-segment' });
      if (item.ej.completed) {
        segment.classList.add('completed');
        completedCount++;
      } else if (item.ej.date) {
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

  if (steps.length === 0 && linked.length === 0) {
    container.appendChild($.el('p', { textContent: I18n.t('noStepsDefined') }));
  } else {
    steps.forEach((step, idx) => container.appendChild(this.stepCardCollapsible(step, idx, job)));
    // Additional jobs use same style as steps
    linked.forEach(item => {
      container.appendChild(this.linkedExtraJobCollapsible(job, item));
    });
  }

  section.appendChild(container);

  // Inline add form (hidden until button click)
  const addForm = this.addAdditionalJobForm(job);
  addForm.classList.add('hidden');

  addBtn.addEventListener('click', () => {
    addForm.classList.toggle('hidden');
    if (!addForm.classList.contains('hidden')) addForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  section.appendChild(addForm);
  return section;
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
  const addrShort = (step.address || step.pickupAddress || step.deliveryAddress || '').trim();
  const addrView = addrShort ? (addrShort.length > 120 ? (addrShort.slice(0, 120) + '...') : addrShort) : '-';

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
  body.appendChild(viewBox);

  // Edit section (hidden by default)
  const editBox = $.el('div', { className: 'step-card-body hidden' });

  // Date input
  const dateDiv = $.el('div');
  dateDiv.appendChild($.el('label', { textContent: (State.lang === 'tr') ? 'Tarih' : 'Date' }));
  dateDiv.appendChild($.el('input', { type: 'date', className: 'step-date-input', value: step.date || '' }));
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

  // Actions
  const actions = $.el('div', { style: 'margin-top:12px; display:flex; justify-content:flex-end; gap:8px; flex-wrap:wrap;' });

  const editBtn = $.el('button', { type: 'button', textContent: I18n.t('edit') });
  const saveBtn = $.el('button', { type: 'button', className: 'hidden step-save-btn', textContent: I18n.t('save') });
  const cancelBtn = $.el('button', { type: 'button', className: 'hidden', textContent: I18n.t('cancel') });
  const deleteStepBtn = $.el('button', {
    type: 'button',
    className: 'delete-step-btn',
    textContent: (State.lang === 'tr') ? 'Sil' : 'Remove'
  });
  const isAutoStep = Boolean(CONFIG.STEP_DEFINITIONS[step.id]);
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
    step.date = card.querySelector('.step-date-input').value || '';
    const timeSelector = card.querySelector('.step-time-selector');
    step.time = TimeHelpers.getTimeFromSelector(timeSelector);
    step.personnel = card.querySelector('.step-personnel-input').value.trim();
    step.vehicle = card.querySelector('.step-vehicle-input').value.trim();
    const officeValue = card.querySelector('.step-office-select').value || '';
    if (!officeValue) {
      alert((State.lang === 'tr') ? 'Lütfen ofis seçin.' : 'Please select an office.');
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
    alert(I18n.t('stepSaved'));
    this.showDetails(job);
  });

  deleteStepBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const confirmMsg = (State.lang === 'tr') ? 'Bu adımı silmek istediğinize emin misiniz?' : 'Are you sure you want to remove this step?';
    if (!confirm(confirmMsg)) return;
    if (isAutoStep) {
      if (!Array.isArray(job.removedAutoStepIds)) job.removedAutoStepIds = [];
      if (!job.removedAutoStepIds.includes(step.id)) {
        job.removedAutoStepIds.push(step.id);
      }
    }
    job.steps.splice(idx, 1);
    Storage.saveJobs();
    this.showDetails(job);
    ScheduleUI.render();
    if (State.schedule.selectedDate) ScheduleUI.renderDay(State.schedule.selectedDate);
  });

  actions.appendChild(completeBtn);
  actions.appendChild(editBtn);
  actions.appendChild(saveBtn);
  actions.appendChild(cancelBtn);
  if (isAutoStep) actions.appendChild(deleteStepBtn);
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
  titleGroup.appendChild($.el('div', { className: 'step-card-title', textContent: taskName || 'Additional Job' }));
  
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

  deleteBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (!confirm(I18n.t('deleteExtraJobConfirm'))) return;
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
    const addrShort = (step.address || step.pickupAddress || step.deliveryAddress || '').trim();
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
      step.date = card.querySelector('.step-date-input').value || '';
      step.time = card.querySelector('.step-time-input').value || '';
      step.personnel = card.querySelector('.step-personnel-input').value.trim();
      step.vehicle = card.querySelector('.step-vehicle-input').value.trim();
      const officeValue = card.querySelector('.step-office-select').value || '';
      if (!officeValue) {
        alert((State.lang === 'tr') ? 'Lütfen ofis seçin.' : 'Please select an office.');
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
      alert(I18n.t('stepSaved'));
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
  });

  // Delete step button
  const deleteStepBtn = $.el('button', { 
    type: 'button', 
    className: 'delete-step-btn',
    textContent: (State.lang === 'tr') ? 'Sil' : 'Remove'
  });
  deleteStepBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const confirmMsg = (State.lang === 'tr') ? 'Bu adımı silmek istediğinize emin misiniz?' : 'Are you sure you want to remove this step?';
    if (!confirm(confirmMsg)) return;
    job.steps.splice(idx, 1);
    Storage.saveJobs();
    this.showDetails(job);
    ScheduleUI.render();
    if (State.schedule.selectedDate) ScheduleUI.renderDay(State.schedule.selectedDate);
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

    header.appendChild($.el('div', { className: 'step-card-header-title', textContent: taskName || 'Additional Job' }));
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

    deleteBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (!confirm(I18n.t('deleteExtraJobConfirm'))) return;
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
    dateDiv.appendChild($.el('label', { textContent: (State.lang === 'tr') ? 'Tarih' : 'Date' }));
    const dateInput = $.el('input', { type: 'date', id: 'moveAddJobDate' });
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
      const dateStr = dateInput.value || '';
      const taskType = taskSelect.value || '';
      const customTaskName = customInput.value.trim();
      const time = timeInput.value || '';
      const personnel = pInput.value.trim();
      const vehicle = vInput.value.trim();
      const address = aInput.value.trim();
      const notes = nInput.value.trim();
      const office = officeSelect.value || '';

      if (!dateStr) {
        alert((State.lang === 'tr') ? 'Lütfen tarih seçin.' : 'Please select a date.');
        return;
      }

      if (!taskType && !customTaskName && !time && !personnel && !vehicle && !address && !notes && !office) {
        alert(I18n.t('fillAtLeastOneField'));
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
    const progressBar = $.el('div', { className: 'checklist-progress-bar' });
    items.forEach((item) => {
      const segment = $.el('div', { className: 'checklist-progress-segment' });
      if (item.done) segment.classList.add('completed');
      progressBar.appendChild(segment);
    });
    const progressText = $.el('span', { 
      className: 'checklist-progress-text',
      textContent: `${completedCount}/${items.length} ` + ((State.lang === 'tr') ? 'tamamlandı' : 'completed')
    });
    progressBar.appendChild(progressText);
    container.appendChild(progressBar);

    // Checklist items with checkmark style
    const listContainer = $.el('div', { className: 'checklist-items-list' });
    items.forEach((item, idx) => {
      const wrapper = $.el('div', { className: `checklist-item-card ${item.done ? 'completed' : ''}` });
      
      // Status indicator (checkmark style)
      const statusIndicator = $.el('div', { className: `checklist-status-indicator ${item.done ? 'completed' : ''}` });
      statusIndicator.textContent = item.done ? '✓' : '○';
      
      // Text
      const textSpan = $.el('span', { 
        className: 'checklist-item-text',
        textContent: I18n.checklistText(item.text)
      });
      
      // Toggle on click
      wrapper.addEventListener('click', () => {
        job.checklist[idx].done = !job.checklist[idx].done;
        Storage.saveJobs();
        this.render(job);
      });
      
      // Delete button
      const deleteBtn = $.el('button', { 
        type: 'button', 
        className: 'checklist-delete-btn',
        textContent: '×'
      });
      deleteBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        job.checklist.splice(idx, 1);
        Storage.saveJobs();
        this.render(job);
      });
      
      wrapper.appendChild(statusIndicator);
      wrapper.appendChild(textSpan);
      wrapper.appendChild(deleteBtn);
      listContainer.appendChild(wrapper);
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
      return;
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
        preview.appendChild($.el('span', { className: 'media-icon', textContent: '🎬' }));
      } else {
        preview.appendChild($.el('span', { className: 'media-icon', textContent: '📷' }));
      }
      card.appendChild(preview);
      
      // Label
      const label = $.el('div', { className: 'media-label', textContent: item.label || item.fileName || 'Media' });
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
  render() {
  // Get containers
  const listEl = $.get('documentsListGlobal');
  const resourceContainer = $.get('resourceLibraryContainer');
  
  if (!listEl || !resourceContainer) return;

  // Show/hide based on active tab
  if (State.documentsViewTab === 'search') {
    listEl.style.display = 'block';
    resourceContainer.style.display = 'none';
    
    // Render search content (existing code)
    const jobFilterEl = $.get('documentsJobFilter');
    const searchEl = $.get('documentsSearchInput');

    const searchTerm = (searchEl.value || '').toLowerCase().trim();
    this.refreshJobFilter(jobFilterEl);
    $.clear(listEl);

    const rows = [];
    State.jobs.forEach(job => {
      const docs = job.documents || [];
      docs.forEach(doc => rows.push({ job, doc }));
    });

    let filtered = rows;

    const selectedJobCode = jobFilterEl.value;
    if (selectedJobCode) {
      filtered = filtered.filter(({ job }) => job.jobCode === selectedJobCode);
    }

    if (searchTerm) {
      filtered = filtered.filter(({ job, doc }) => {
        const textParts = [
          job.jobCode,
          job.clientName,
          job.tradeDirection,
          (job.modes && job.modes.length ? job.modes.join(' ') : ''),
          Utils.location(job.originCity, job.originCountry),
          Utils.location(job.destinationCity, job.destinationCountry),
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
      listEl.appendChild($.el('p', { textContent: I18n.t('noDocumentsFound') }));
      return;
    }

    filtered.forEach(({ job, doc }) => listEl.appendChild(this.row(job, doc)));
    
  } else {
    // Show library
    listEl.style.display = 'none';
    resourceContainer.style.display = 'block';
    ResourceLibraryUI.render();
  }
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
      job.clientName || 'No client',
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
  }
};


const ResourceLibraryUI = {
  render() {
    const container = $.get('resourceLibraryContainer');
    if (!container) return;

    $.clear(container);

    // Header with Add button
    const header = $.el('div', { 
      style: 'display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;' 
    });
    
    const title = $.el('h3', { 
      textContent: (State.lang === 'tr') ? 'Kaynak Kütüphanesi' : 'Resource Library',
      style: 'margin:0;'
    });
    
    const addBtn = $.el('button', { 
      type: 'button',
      textContent: (State.lang === 'tr') ? '+ Kaynak Ekle' : '+ Add Resource'
    });
    addBtn.addEventListener('click', () => this.openAddModal());
    
    header.appendChild(title);
    header.appendChild(addBtn);
    container.appendChild(header);

    // Render categories
    if (!State.resourceLibrary || !State.resourceLibrary.categories) {
      container.appendChild($.el('p', { 
        textContent: (State.lang === 'tr') ? 'Henüz kaynak yok.' : 'No resources yet.'
      }));
      return;
    }

    State.resourceLibrary.categories.forEach(category => {
      container.appendChild(this.renderCategory(category));
    });
  },

  renderCategory(category) {
    const categoryDiv = $.el('div', { className: 'resource-category' });
    
    // Category header
    const header = $.el('div', { 
      className: 'resource-category-header',
      style: 'display:flex; align-items:center; gap:8px; padding:12px; background:#f3f4f6; border-radius:6px; margin-bottom:8px; cursor:pointer;'
    });
    
    const icon = $.el('span', { textContent: '📁', style: 'font-size:20px;' });
    const name = $.el('strong', { 
      textContent: (State.lang === 'tr' ? category.nametr : category.name) + ` (${category.items.length})`
    });
    const arrow = $.el('span', { 
      textContent: '▼', 
      className: 'category-arrow',
      style: 'margin-left:auto; transition:transform 0.2s;'
    });
    
    header.appendChild(icon);
    header.appendChild(name);
    header.appendChild(arrow);
    categoryDiv.appendChild(header);

    // Items container (collapsible)
    const itemsContainer = $.el('div', { 
      className: 'resource-items',
      style: 'padding-left:32px;'
    });

    if (category.items.length === 0) {
      itemsContainer.appendChild($.el('p', { 
        textContent: (State.lang === 'tr') ? 'Bu kategoride kaynak yok.' : 'No resources in this category.',
        style: 'color:#6b7280; font-size:14px; padding:8px 0;'
      }));
    } else {
      category.items.forEach(item => {
        itemsContainer.appendChild(this.renderItem(item, category.id));
      });
    }

    categoryDiv.appendChild(itemsContainer);

    // Toggle collapse
    let isCollapsed = false;
    header.addEventListener('click', () => {
      isCollapsed = !isCollapsed;
      itemsContainer.style.display = isCollapsed ? 'none' : 'block';
      arrow.style.transform = isCollapsed ? 'rotate(-90deg)' : 'rotate(0deg)';
    });

    return categoryDiv;
  },

  renderItem(item, categoryId) {
    const itemDiv = $.el('div', { 
      className: 'resource-item',
      style: 'display:flex; align-items:center; justify-content:space-between; padding:10px; border:1px solid #e5e7eb; border-radius:4px; margin-bottom:6px; background:white;'
    });

    // Left side: icon + name
    const leftDiv = $.el('div', { style: 'display:flex; align-items:center; gap:8px; flex:1;' });
    const fileIcon = $.el('span', { textContent: '📄', style: 'font-size:18px;' });
    const nameSpan = $.el('span', { 
      textContent: State.lang === 'tr' ? item.nametr : item.name,
      style: 'font-weight:500;'
    });
    
    leftDiv.appendChild(fileIcon);
    leftDiv.appendChild(nameSpan);

    // Right side: actions
    const actionsDiv = $.el('div', { style: 'display:flex; gap:8px;' });

    // Download button
    const downloadBtn = $.el('button', { 
      type: 'button',
      textContent: (State.lang === 'tr') ? 'İndir' : 'Download',
      style: 'padding:6px 12px; font-size:12px;'
    });
    downloadBtn.addEventListener('click', () => this.downloadItem(item));

    // Delete button
    const deleteBtn = $.el('button', { 
      type: 'button',
      textContent: (State.lang === 'tr') ? 'Sil' : 'Delete',
      style: 'padding:6px 12px; font-size:12px; background:#ef4444; color:white; border:none; border-radius:4px; cursor:pointer;'
    });
    deleteBtn.addEventListener('click', () => this.deleteItem(item.id, categoryId));

    actionsDiv.appendChild(downloadBtn);
    actionsDiv.appendChild(deleteBtn);

    itemDiv.appendChild(leftDiv);
    itemDiv.appendChild(actionsDiv);

    return itemDiv;
  },

  openAddModal() {
    // Show modal
    const modal = $.get('resourceLibraryModal');
    if (!modal) {
      this.createModal();
    }
    
    // Reset form
    const form = $.get('resourceLibraryForm');
    if (form) form.reset();
    
    Modals.open('resourceLibraryModal');
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
      textContent: (State.lang === 'tr') ? 'Kaynak Ekle' : 'Add Resource'
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
    
    State.resourceLibrary.categories.forEach(cat => {
      categorySelect.appendChild($.el('option', {
        value: cat.id,
        textContent: State.lang === 'tr' ? cat.nametr : cat.name
      }));
    });

    form.appendChild(categoryLabel);
    form.appendChild(categorySelect);

    // Name (English)
    const nameEnLabel = $.el('label', { textContent: 'Name (English)' });
    const nameEnInput = $.el('input', { 
      type: 'text',
      name: 'nameEn',
      required: true
    });
    form.appendChild(nameEnLabel);
    form.appendChild(nameEnInput);

    // Name (Turkish)
    const nameTrLabel = $.el('label', { textContent: 'Name (Turkish)' });
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
      textContent: (State.lang === 'tr') ? 'İptal' : 'Cancel'
    });
    cancelBtn.addEventListener('click', () => Modals.close('resourceLibraryModal'));
    
    const submitBtn = $.el('button', { 
      type: 'submit',
      textContent: (State.lang === 'tr') ? 'Kaydet' : 'Save'
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

  if (!file) {
    alert((State.lang === 'tr') ? 'Lütfen dosya seçin.' : 'Please select a file.');
    return;
  }

  // Read file as base64
  const reader = new FileReader();
  reader.onload = (event) => {
    const category = State.resourceLibrary.categories.find(c => c.id === categoryId);
    if (!category) return;

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

    alert((State.lang === 'tr') ? 'Kaynak eklendi!' : 'Resource added!');
  };

  reader.readAsDataURL(file);
});
    
modalCard.appendChild(form);
modal.appendChild(modalCard);

document.body.appendChild(modal);
},
    
  downloadItem(item) {
    if (!item.fileData) {
      alert((State.lang === 'tr') ? 'Dosya bulunamadı.' : 'File not found.');
      return;
    }

    const a = document.createElement('a');
    a.href = item.fileData;
    a.download = item.fileName || item.name || 'document';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  },

  deleteItem(itemId, categoryId) {
    if (!confirm((State.lang === 'tr') ? 'Bu kaynağı silmek istediğinize emin misiniz?' : 'Are you sure you want to delete this resource?')) {
      return;
    }

    const category = State.resourceLibrary.categories.find(c => c.id === categoryId);
    if (!category) return;

    const index = category.items.findIndex(item => item.id === itemId);
    if (index !== -1) {
      category.items.splice(index, 1);
      Storage.saveResourceLibrary();
      this.render();
    }
  }
};

// ========== // QUOTES UI // ========== //

const QuotesUI = {
  render() {
    const container = $.get('quoteList');
    if (!container) return;
    
    const quotes = this.filter();
    $.clear(container);
    
    if (quotes.length === 0) {
      container.appendChild($.el('p', { 
        textContent: (State.lang === 'tr') ? 'Henuz teklif yok.' : 'No quotes yet.' 
      }));
      return;
    }
    
    quotes.forEach(quote => container.appendChild(this.createCard(quote)));
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
          ...(quote.modes || [])
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
    
    card.appendChild($.el('h3', { 
      textContent: `${quote.quoteCode || ''} - ${quote.clientName || 'No client name'}` 
    }));
    
    if (quote.clientOrganization) {
      card.appendChild($.el('p', { 
        textContent: quote.clientOrganization,
        style: 'font-size: 12px; color: #6b7280; margin-top: -8px;'
      }));
    }
    
    card.appendChild($.el('p', { 
      textContent: `${quote.origin || '-'} to ${quote.destination || '-'}` 
    }));
    
    const modes = (quote.modes || []).join(' + ') || 'No mode';
    const typeLabel = quote.type || '-';
    card.appendChild($.el('p', {
      textContent: `${modes} | ${typeLabel}`,
      style: 'font-size: 12px; color: #6b7280;'
    }));
    
    card.addEventListener('click', () => this.showDetails(quote));
    return card;
  },

  showDetails(quote) {
    State.selectedQuoteId = quote.id;
    const editBtn = $.get('editQuoteBtn');
    if (editBtn) editBtn.disabled = false;
    
    const container = $.get('quoteDetails');
    $.clear(container);
    
    container.appendChild($.el('h3', { 
      textContent: `${quote.quoteCode || ''} - ${quote.clientName || 'No client name'}` 
    }));
    
    const grid = $.el('div', { className: 'details-grid' });
    const details = [
      ['Client', quote.clientName || '-'],
      ['Organization', quote.clientOrganization || '-'],
      ['Origin', quote.origin || '-'],
      ['Destination', quote.destination || '-'],
      ['Type', quote.type || '-'],
      ['Modes', (quote.modes || []).join(', ') || '-'],
      ['Insurance', quote.insurance ? 'Yes' : 'No'],
      ['Valid Until', quote.validUntil ? Utils.formatDate(quote.validUntil) : '-']
    ];
    
    details.forEach(([label, value]) => {
      const p = $.el('p');
      p.appendChild($.el('strong', { textContent: label + ': ' }));
      p.appendChild(document.createTextNode(value));
      grid.appendChild(p);
    });
    container.appendChild(grid);
    
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
    
    (quote.modes || []).forEach(mode => {
      const charges = (quote.chargesByMode && quote.chargesByMode[mode]) || [];
      if (charges.length > 0) {
        container.appendChild(this.buildChargesSection(mode, charges, quote, formData));
      }
    });
    
    const includes = quote.selectedIncludes || [];
    if (includes.length > 0) {
      const sec = $.el('div', { style: 'margin-top: 16px; padding-top: 16px; border-top: 1px solid #e5e7eb;' });
      sec.appendChild($.el('h4', { textContent: 'Our Quotation Includes' }));
      const ul = $.el('ul', { style: 'margin: 8px 0; padding-left: 20px;' });
      includes.forEach(item => {
        ul.appendChild($.el('li', { textContent: item, style: 'font-size: 13px; margin: 4px 0;' }));
      });
      sec.appendChild(ul);
      container.appendChild(sec);
    }
    
    const additional = quote.selectedAdditionalCharges || [];
    if (additional.length > 0) {
      const sec = $.el('div', { style: 'margin-top: 16px; padding-top: 16px; border-top: 1px solid #e5e7eb;' });
      sec.appendChild($.el('h4', { textContent: 'Additional Charges May Apply' }));
      const ul = $.el('ul', { style: 'margin: 8px 0; padding-left: 20px;' });
      additional.forEach(item => {
        ul.appendChild($.el('li', { textContent: item, style: 'font-size: 13px; margin: 4px 0;' }));
      });
      sec.appendChild(ul);
      container.appendChild(sec);
    }
    
    if (quote.termsAndConditions) {
      const sec = $.el('div', { style: 'margin-top: 16px; padding-top: 16px; border-top: 1px solid #e5e7eb;' });
      sec.appendChild($.el('h4', { textContent: 'Terms & Conditions' }));
      sec.appendChild($.el('p', { 
        textContent: quote.termsAndConditions,
        style: 'white-space: pre-wrap; font-size: 13px;'
      }));
      container.appendChild(sec);
    }
    
    if (quote.validUntil) {
      const box = $.el('div', { 
        style: 'margin-top: 16px; padding: 12px; background: #fff3cd; border: 2px solid #f59e0b; border-radius: 6px; text-align: center; font-weight: bold;'
      });
      box.textContent = `Rates & Services are Valid Until: ${Utils.formatDate(quote.validUntil)}`;
      container.appendChild(box);
    }
    
    const actions = $.el('div', { style: 'margin-top: 24px; display: flex; gap: 8px; flex-wrap: wrap;' });
    
    const exportBtn = $.el('button', { type: 'button', textContent: 'Export PDF' });
    exportBtn.addEventListener('click', () => QuoteExport.exportToPdf(quote));
    
    const convertBtn = $.el('button', { type: 'button', textContent: 'Convert to Job' });
    convertBtn.addEventListener('click', () => this.convertToJob(quote));
    
    const deleteBtn = $.el('button', { type: 'button', textContent: 'Delete Quote' });
    deleteBtn.style.cssText = 'background: #fee2e2; color: #dc2626; border-color: #fecaca;';
    deleteBtn.addEventListener('click', () => this.deleteQuote(quote));
    
    actions.appendChild(exportBtn);
    actions.appendChild(convertBtn);
    actions.appendChild(deleteBtn);
    container.appendChild(actions);
  },

  buildChargesSection(mode, charges, quote, formData) {
    const section = $.el('div', { style: 'margin-top: 16px; padding-top: 16px; border-top: 1px solid #e5e7eb;' });
    
    const headerColors = { Sea: '#0369a1', Air: '#7c3aed', Land: '#059669' };
    const header = $.el('h4', { 
      textContent: `${mode} Freight Charges`,
      style: `color: ${headerColors[mode] || '#374151'}; margin-bottom: 8px;`
    });
    section.appendChild(header);
    
    const info = $.el('div', { style: 'font-size: 12px; color: #6b7280; margin-bottom: 8px;' });
    if (mode === 'Sea') {
      const vol = quote.seaVolume || quote.estimatedVolume || 0;
      info.textContent = `Container: ${quote.containerDetails || 'N/A'} | Volume: ${vol} cbm | Route: ${quote.departurePort || '-'} to POE ${quote.poe || '-'} | Transit: ${quote.seaTransitTime ? quote.seaTransitTime + ' days' : 'TBD'}`;
    } else if (mode === 'Air') {
  const vol = quote.airVolume || quote.estimatedVolume || 0;
  const acw = quote.airACW || 0;
  info.textContent = `Weight: ${quote.airCargoWeight || 0} kg | Volume: ${vol} cbm | ACW: ${acw.toFixed(1)} kg | Route: ${quote.departureAirportName || '-'} to ${quote.arrivalAirportName || '-'} | Transit: ${quote.airTransitTime ? quote.airTransitTime + ' days' : 'TBD'}`;
} else if (mode === 'Land') {
      const vol = quote.landVolume || quote.estimatedVolume || 0;
      info.textContent = `Truck: ${quote.truckType || 'Dedicated'} | Volume: ${vol} cbm | Route: ${quote.origin || '-'} to ${quote.destination || '-'} | Transit: ${quote.landTransitTime ? quote.landTransitTime + ' days' : 'TBD'}`;
    }
    section.appendChild(info);
    
    const table = $.el('table', { style: 'width: 100%; border-collapse: collapse; font-size: 13px;' });
    let totalsByCurrency = {};
    
    charges.forEach(charge => {
      const row = $.el('tr');
      row.innerHTML = `
        <td style="padding: 6px 8px; border: 1px solid #e5e7eb;">${charge.category}</td>
        <td style="padding: 6px 8px; border: 1px solid #e5e7eb; text-align: right; white-space: nowrap;">${charge.currency} ${parseFloat(charge.amount).toFixed(2)}</td>
      `;
      table.appendChild(row);
      
      if (!totalsByCurrency[charge.currency]) totalsByCurrency[charge.currency] = 0;
      totalsByCurrency[charge.currency] += parseFloat(charge.amount) || 0;
    });
    
    const totalText = Object.entries(totalsByCurrency)
      .map(([curr, amt]) => `${curr} ${amt.toFixed(2)}`)
      .join(' + ');
    
    if (totalText) {
      const totalRow = $.el('tr');
      totalRow.innerHTML = `
        <td style="padding: 6px 8px; border: 1px solid #e5e7eb; font-weight: bold; background: #f3f4f6;">TOTAL (${mode})</td>
        <td style="padding: 6px 8px; border: 1px solid #e5e7eb; text-align: right; white-space: nowrap; font-weight: bold; background: #f3f4f6;">${totalText}</td>
      `;
      table.appendChild(totalRow);
    }
    
    section.appendChild(table);
    return section;
  },

  deleteQuote(quote) {
    if (!confirm('Are you sure you want to delete this quote?')) return;
    
    State.quotes = State.quotes.filter(q => q.id !== quote.id);
    Storage.saveQuotes();
    this.render();
    
    const container = $.get('quoteDetails');
    $.clear(container);
    container.appendChild($.el('p', { textContent: 'Select a quote to see details.' }));
    
    const editBtn = $.get('editQuoteBtn');
    if (editBtn) editBtn.disabled = true;
    
    State.selectedQuoteId = null;
  },

  convertToJob(quote) {
  if (!confirm('Convert this quote to a job?')) return;
  
  const job = Validator.normalizeJob({
    clientName: quote.clientName,
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
  
  State.jobs.push(job);
  Storage.saveJobs();
  
  alert('Quote successfully converted to job!');
  
  Views.show('moves');
  JobsUI.render();
  JobsUI.showDetails(job);
},

  showModal(quote = null) {
    State.quoteFormMode = quote ? 'edit' : 'create';
    const form = $.get('quoteForm');
    
    if (!form) {
      alert('Quote form not found');
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
      form.validUntil.value = threeMonths.toISOString().split('T')[0];
      
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
        textContent: 'Select mode and type to see available items',
        style: 'color: #9ca3af; font-size: 13px; font-style: italic;'
      }));
    }
    
    const additionalContainer = $.get('additionalChargesChecklist');
    if (additionalContainer) {
      $.clear(additionalContainer);
      additionalContainer.appendChild($.el('p', { 
        textContent: 'Select type to see available items',
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
    form.termsAndConditions.value = quote.termsAndConditions || '';
    form.validUntil.value = quote.validUntil || '';
    
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
          this.addChargeRow(mode, charge.category, charge.amount, charge.currency);
        });
      });
    }
    
    // Update checklists
    this.updateChecklists();
    
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
    
    this.updateChecklists();
  },

  autoPopulateCharges(mode, type) {
    const listId = `${mode.toLowerCase()}ChargesList`;
    const container = $.get(listId);
    if (!container) return;
    
    if (container.children.length > 0) return;
    
    // Get raw categories from template
    const tpl = QuoteUtils.getTemplate(mode, type);
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
    const formData = this.getFormDataForPlaceholders();
    
    const includesContainer = $.get('quotationIncludesChecklist');
    if (includesContainer) {
      $.clear(includesContainer);
      
      if (selectedModes.length === 0 || !type) {
        includesContainer.appendChild($.el('p', { 
          textContent: 'Select mode and type to see available items',
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
          
          const baseIncludes = QuoteUtils.getBaseIncludes(mode, type, formData);
          baseIncludes.forEach(item => {
            if (!addedItems.has(item)) {
              addedItems.add(item);
              this.addChecklistItem(includesContainer, item, true);
            }
          });
          
          const tpl = QuoteUtils.getTemplate(mode, type);
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
          textContent: 'Select type to see available items',
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

  addChargeRow(mode, category = '', amount = '') {
  const listId = `${mode.toLowerCase()}ChargesList`;
  const container = $.get(listId);
  if (!container) return;
  
  const quoteCurrency = $.get('quoteCurrency')?.value || 'USD';
  
  const row = $.el('div', { 
    className: 'charge-row',
    style: 'display: grid; grid-template-columns: 2fr 1fr 40px; gap: 8px; margin-bottom: 8px; align-items: center;'
  });
  
  const categoryInput = $.el('input', { 
    type: 'text', 
    placeholder: 'Charge category',
    className: 'charge-category-input',
    value: category
  });
  
  const amountInput = $.el('input', { 
    type: 'number', 
    step: '0.01',
    placeholder: `Amount (${quoteCurrency})`,
    className: 'charge-amount-input',
    value: amount
  });
  
  const deleteBtn = $.el('button', { 
    type: 'button', 
    textContent: '×',
    style: 'background: #ef4444; color: white; border: none; padding: 4px 8px; border-radius: 4px; cursor: pointer; font-size: 16px;'
  });
  deleteBtn.addEventListener('click', () => row.remove());
  
  row.appendChild(categoryInput);
  row.appendChild(amountInput);
  row.appendChild(deleteBtn);
  
  container.appendChild(row);
},

  handleFormSubmit(e) {
    e.preventDefault();
    const form = $.get('quoteForm');
    
    const modes = this.getSelectedModes();
    
    if (modes.length === 0) {
      alert('Please select at least one mode (Sea, Air, or Land)');
      return;
    }
    
    const type = this.getSelectedType();
    if (!type) {
      alert('Please select a type (Export, Import, or Local)');
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
    const amount = parseFloat(row.querySelector('.charge-amount-input')?.value) || 0;
    
    if (category) {
      chargesByMode[mode].push({ category, amount, currency: quoteCurrency });
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
    
    const hasInsurance = form.querySelector('input[name="insurance"]:checked')?.value === 'yes';
    
    const quote = {
      clientName: form.clientName.value.trim(),
      clientOrganization: form.clientOrganization?.value.trim() || '',
      origin: form.origin.value.trim(),
      destination: form.destination.value.trim(),
      type: type,
      modes: modes,
      insurance: hasInsurance,
      shipmentContents: Array.from(document.querySelectorAll('input[name="quoteContents"]:checked')).map(cb => cb.value),
      hhgValue: hasInsurance ? (parseFloat(form.hhgValue?.value) || 0) : 0,
      hhgCurrency: hasInsurance ? (form.hhgCurrency?.value || 'USD') : 'USD',
      insurancePercentage: hasInsurance ? (parseFloat(form.insurancePercentage?.value) || 1.5) : 1.5,
      quoteCurrency: quoteCurrency,
      chargesByMode: chargesByMode,
      selectedIncludes: selectedIncludes,
      selectedAdditionalCharges: selectedAdditionalCharges,
      termsAndConditions: form.termsAndConditions?.value.trim() || '',
      validUntil: form.validUntil?.value || '',
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
      airQuoteType: form.querySelector('input[name="airQuoteType"]:checked')?.value || 'client',
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
      estimatedVolume: parseFloat(form.seaVolume?.value) || parseFloat(form.airVolume?.value) || parseFloat(form.landVolume?.value) || 0
    };
    
    if (hasInsurance && quote.hhgValue > 0) {
  const percentage = quote.insurancePercentage || 1.5;
  const premium = QuoteUtils.calculateInsurancePremium(quote.hhgValue, percentage);
  const insuranceCurrency = quote.quoteCurrency || 'USD';
  const insuranceText = `Moving/Transit Insurance coverage (${percentage}% of ${quote.hhgValue.toLocaleString()} ${insuranceCurrency} = ${premium.toFixed(2)} ${insuranceCurrency})`;
  if (!quote.selectedIncludes.includes(insuranceText)) {
    quote.selectedIncludes.push(insuranceText);
  }
  
  // Auto-add insurance as a charge to the first mode
  const firstMode = modes[0];
  if (firstMode && chargesByMode[firstMode]) {
    // Remove any existing Transit Insurance charge first
    chargesByMode[firstMode] = chargesByMode[firstMode].filter(c => 
      !c.category.toLowerCase().includes('transit insurance')
    );
    // Add the insurance charge
    chargesByMode[firstMode].push({
      category: 'Transit Insurance',
      amount: premium,
      currency: insuranceCurrency
    });
  }
}
    
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
      alert('Popup blocked. Please allow popups.'); 
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
  
  ${validDate ? `<div class="validity-box">Rates & Services are Valid Until: ${validDate}</div>` : ''}
</body>
</html>`;
  },

  buildModeSection(mode, quote, formData) {
    const charges = (quote.chargesByMode && quote.chargesByMode[mode]) || [];
    if (charges.length === 0) return '';

    let headerTitle = '';
    let detailsHtml = '';
    let chargeRows = '';
    let totalText = '';

    if (mode === 'Sea') {
      const vol = quote.seaVolume || quote.estimatedVolume || 0;
      headerTitle = `SEA FREIGHT (${Utils.escapeHtml(quote.containerDetails || 'Container details not specified')}) est. total volume: ${vol} cbm`;
      detailsHtml = `
        <div>${Utils.escapeHtml(quote.departurePort || quote.origin || '-')} to POE ${Utils.escapeHtml(quote.poe || '-')}</div>
        <div>Estimated port-to-port transit time: ${quote.seaTransitTime ? quote.seaTransitTime + ' days' : 'TBD'}</div>
      `;
      
      const totals = QuoteUtils.calculateTotals(charges);
      totalText = QuoteUtils.formatTotals(totals);
      
      chargeRows = charges.map(c => {
        const replacedCategory = QuoteUtils.replacePlaceholders(c.category, formData);
        return `
          <tr>
            <td class="charge-category">${Utils.escapeHtml(replacedCategory)}</td>
            <td class="charge-amount">${c.currency} ${parseFloat(c.amount).toFixed(2)}</td>
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
      detailsHtml = `
        <div>${Utils.escapeHtml(quote.departureAirportName || 'Origin Airport')} (${Utils.escapeHtml(quote.departureAirportIATA || 'XXX')}) to ${Utils.escapeHtml(quote.arrivalAirportName || 'Destination Airport')} (${Utils.escapeHtml(quote.arrivalAirportIATA || 'XXX')})</div>
        <div>via ${Utils.escapeHtml(quote.airlineName || 'TBD')} - Estimated transit time: ${quote.airTransitTime ? quote.airTransitTime + ' days' : 'TBD'}</div>
      `;
      
      // Check if this is agent or client quote type
      const isAgentQuote = quote.airQuoteType === 'agent';
      
      if (isAgentQuote) {
  // Agent mode: ONLY "Air Freight" charge shows "per ACW", others show normal amounts
  chargeRows = charges.map(c => {
    const replacedCategory = QuoteUtils.replacePlaceholders(c.category, formData);
    const categoryLower = c.category.toLowerCase().trim();
    const isAirFreightCharge = categoryLower === 'air freight';
    
    if (isAirFreightCharge) {
      return `
        <tr>
          <td class="charge-category">${Utils.escapeHtml(replacedCategory)}</td>
          <td class="charge-amount">${c.currency} ${parseFloat(c.amount).toFixed(2)} per ACW</td>
        </tr>
      `;
    } else {
      return `
        <tr>
          <td class="charge-category">${Utils.escapeHtml(replacedCategory)}</td>
          <td class="charge-amount">${c.currency} ${parseFloat(c.amount).toFixed(2)}</td>
        </tr>
      `;
    }
  }).join('');
  // No total row for agent quotes
      } else {
        // Client mode: show actual values with total
        const totals = QuoteUtils.calculateTotals(charges);
        totalText = QuoteUtils.formatTotals(totals);
        
        chargeRows = charges.map(c => {
          const replacedCategory = QuoteUtils.replacePlaceholders(c.category, formData);
          return `
            <tr>
              <td class="charge-category">${Utils.escapeHtml(replacedCategory)}</td>
              <td class="charge-amount">${c.currency} ${parseFloat(c.amount).toFixed(2)}</td>
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
      
    } else if (mode === 'Land') {
      const vol = quote.landVolume || quote.estimatedVolume || 0;
      headerTitle = `LAND FREIGHT (${Utils.escapeHtml(quote.truckType || 'Dedicated')} Truck) est. total volume: ${vol} cbm`;
      detailsHtml = `
        <div>${Utils.escapeHtml(quote.origin || '-')} to ${Utils.escapeHtml(quote.destination || '-')}</div>
        <div>Estimated transit time: ${quote.landTransitTime ? quote.landTransitTime + ' days' : 'TBD'}</div>
      `;
      
      const totals = QuoteUtils.calculateTotals(charges);
      totalText = QuoteUtils.formatTotals(totals);
      
      chargeRows = charges.map(c => {
        const replacedCategory = QuoteUtils.replacePlaceholders(c.category, formData);
        return `
          <tr>
            <td class="charge-category">${Utils.escapeHtml(replacedCategory)}</td>
            <td class="charge-amount">${c.currency} ${parseFloat(c.amount).toFixed(2)}</td>
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
    const items = quote.selectedAdditionalCharges || [];
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
// PART 3 OF 4: AGENTS & SCHEDULE UI
// ============================================================

const AgentsUI = {
  render() {
    const container = $.get('agentList');
    const agents = this.filter();
    $.clear(container);
    if (agents.length === 0) {
      container.appendChild($.el('p', { textContent: I18n.t('noAgentsYet') }));
      return;
    }
    agents.forEach(agent => {
      const card = $.el('div', { className: 'agent-list-card' });
      card.appendChild($.el('h3', { textContent: agent.name }));
      card.appendChild($.el('p', { textContent: Utils.location(agent.city, agent.country) }));
      const moveCount = State.jobs.filter(
        j => j.originAgentId === agent.id || j.destinationAgentId === agent.id
      ).length;
      card.appendChild($.el('p', {
        className: 'agent-moves-summary',
        textContent: moveCount === 1
          ? ((State.lang === 'tr') ? '1 taşıma' : '1 move')
          : ((State.lang === 'tr') ? `${moveCount} taşıma` : `${moveCount} moves`)
      }));
      card.addEventListener('click', () => {
        State.selectedAgentId = agent.id;
        this.showDetails(agent);
      });
      container.appendChild(card);
    });
  },

  filter() {
    let list = [...State.agents];
    if (State.agentSearch) {
      const term = State.agentSearch.toLowerCase();
      list = list.filter(agent => {
        const text = [agent.name, agent.city, agent.country]
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

    container.appendChild($.el('h3', { textContent: agent.name }));
    const locP = $.el('p');
    locP.appendChild($.el('strong', { textContent: I18n.t('location') }));
    locP.appendChild(document.createTextNode(Utils.location(agent.city, agent.country)));
    container.appendChild(locP);

    const actions = $.el('div', { className: 'agent-actions' });
    const editBtn = $.el('button', { type: 'button', textContent: I18n.t('editAgent') });
    editBtn.addEventListener('click', () => {
      State.agentFormMode = 'edit';
      this.showModal(agent);
    });
    const delBtn = $.el('button', { type: 'button', textContent: I18n.t('deleteAgent') });
    delBtn.addEventListener('click', () => {
      if (!confirm(I18n.t('deleteAgentConfirm'))) return;
      State.agents = State.agents.filter(a => a.id !== agent.id);
      Storage.saveAgents();
      Forms.refreshAgentSelects();
      this.render();
      $.clear(container);
      container.appendChild($.el('p', { textContent: I18n.t('noAgentsYet') }));
    });
    actions.appendChild(editBtn);
    actions.appendChild(delBtn);
    container.appendChild(actions);

    this.renderContacts(container, agent);

    container.appendChild($.el('h4', { textContent: I18n.t('recentMoves') }));
    const moves = State.jobs.filter(j => j.originAgentId === agent.id || j.destinationAgentId === agent.id);
    if (moves.length === 0) {
      container.appendChild($.el('p', { textContent: I18n.t('noMovesLinked') }));
    } else {
      const ul = $.el('ul');
      moves.forEach(job => {
        const li = $.el('li', {
          className: 'agent-job-link',
          textContent: `${job.jobCode || '-'} – ${job.clientName || 'No client name'}`
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
  },

  renderContacts(container, agent) {
    const form = $.el('div', { className: 'agent-contact-form' });
    form.appendChild($.el('h4', { textContent: I18n.t('contacts') }));
    const list = $.el('div');
    if (!Array.isArray(agent.contacts)) agent.contacts = [];

    const nameInput = $.el('input', { type: 'text', id: 'contactNameInput' });
    const emailInput = $.el('input', { type: 'email', id: 'contactEmailInput' });
    const phoneInput = $.el('input', { type: 'text', id: 'contactPhoneInput' });
    const notesInput = $.el('textarea', { id: 'contactNotesInput' });

    agent.contacts.forEach((contact, idx) => {
      const row = $.el('div', { className: 'agent-contact-row' });
      const info = $.el('p');
      info.appendChild($.el('strong', { textContent: contact.name || '-' }));
      info.appendChild(document.createTextNode(
        ` (${contact.email || '-'}) ${contact.phone ? ' - ' + contact.phone : ''}`
      ));
      row.appendChild(info);

      if (contact.notes) {
        row.appendChild($.el('p', {
          textContent: contact.notes,
          style: 'font-size: 12px; color: #6b7280;'
        }));
      }

      const editBtn = $.el('button', { type: 'button', textContent: I18n.t('edit') });
      editBtn.addEventListener('click', () => {
        State.editingContactIndex = idx;
        nameInput.value = contact.name || '';
        emailInput.value = contact.email || '';
        phoneInput.value = contact.phone || '';
        notesInput.value = contact.notes || '';
        saveBtn.textContent = I18n.t('updateContact');
      });

      const delBtn = $.el('button', { type: 'button', textContent: I18n.t('delete') });
      delBtn.addEventListener('click', () => {
        if (!confirm(I18n.t('deleteContactConfirm'))) return;

        if (State.editingContactIndex === idx) {
          State.editingContactIndex = null;
        } else if (State.editingContactIndex != null && State.editingContactIndex > idx) {
          State.editingContactIndex--;
        }

        agent.contacts.splice(idx, 1);
        Storage.saveAgents();
        this.showDetails(agent);
      });

      row.appendChild(editBtn);
      row.appendChild(delBtn);
      list.appendChild(row);
    });

    form.appendChild(list);

    form.appendChild($.el('label', { textContent: I18n.t('contactName') }));
    form.appendChild(nameInput);

    form.appendChild($.el('label', { textContent: I18n.t('email') }));
    form.appendChild(emailInput);

    form.appendChild($.el('label', { textContent: I18n.t('phone') }));
    form.appendChild(phoneInput);

    form.appendChild($.el('label', { textContent: I18n.t('notesLabel') }));
    form.appendChild(notesInput);

    const saveBtn = $.el('button', {
      type: 'button',
      id: 'saveContactBtn',
      textContent: I18n.t('addUpdateContact')
    });

    saveBtn.addEventListener('click', () => {
      const name = (nameInput.value || '').trim();
      const email = (emailInput.value || '').trim();
      const phone = (phoneInput.value || '').trim();
      const notes = (notesInput.value || '').trim();

      if (!name && !email && !phone && !notes) {
        alert(I18n.t('fillAtLeastOneField'));
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

    form.appendChild(saveBtn);
    container.appendChild(form);
  },

  showModal(agent = null) {
    const form = $.get('agentForm');
    form.reset();
    if (State.agentFormMode === 'edit' && agent) {
      $.get('agentModalTitle').textContent = I18n.t('editAgentTitle');
      form.agentName.value = agent.name || '';
      form.agentCity.value = agent.city || '';
      form.agentCountry.value = agent.country || '';
      State.selectedAgentId = agent.id;
    } else {
      $.get('agentModalTitle').textContent = I18n.t('addAgentTitle');
      State.selectedAgentId = null;
    }
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

    const calendar = $.get('scheduleCalendar');
    $.clear(calendar);
    for (let i = 0; i < startWeekday; i++) {
      calendar.appendChild($.el('div', { className: 'calendar-day empty' }));
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${year}-${String(month + 1).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
      let stepsCount = 0;
      State.jobs.forEach(job => {
        if (Array.isArray(job.steps)) {
          stepsCount += job.steps.filter(s => s.date === dateStr).length;
        }
      });
      const extraJobs = State.scheduleExtraJobs[dateStr] || [];
      const totalItems = stepsCount + extraJobs.length;
      const hasItems = totalItems > 0;

      const dayDiv = $.el('div', {
        className: `calendar-day${
          hasItems ? ' has-moves' : ''
        }${
          State.schedule.selectedDate === dateStr ? ' selected' : ''
        }`
      });
      dayDiv.appendChild($.el('div', {
        className: 'day-number',
        textContent: String(day)
      }));
      if (hasItems) {
        dayDiv.appendChild($.el('div', {
          className: 'day-badge',
          textContent: String(totalItems)
        }));
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

  const topRow = $.el('div', { style: 'display:flex; justify-content:space-between; align-items:center; gap:10px; flex-wrap:wrap;' });
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
  
  allItems.forEach(item => {
    const office = item.office && CONFIG.OFFICES.includes(item.office) ? item.office : '';
    if (office) {
      officeGroups[office].push(item);
    }
  });
  
  // Sort items within each office by time
  Object.values(officeGroups).forEach(items => {
    items.sort((a, b) => (a.time || '').localeCompare(b.time || ''));
  });

  // Render grouped by office
  const hasAnyItems = allItems.length > 0;
  
  if (!hasAnyItems) {
    container.appendChild($.el('p', { textContent: I18n.t('scheduleDayDetailsHint') }));
  } else {
    CONFIG.OFFICES.forEach(office => {
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
  const card = $.el('div', { className: 'step-card-collapsible' });

  // Collapse Header
  const header = $.el('div', { className: 'step-card-collapse-header' });
  
  const headerLeft = $.el('div', { className: 'step-card-header-left' });
  
  // Status indicator
  let status = 'pending';
  if (step.completed) {
    status = 'completed';
  } else if (step.date || step.time) {
    status = 'scheduled';
  }
  
  const statusIndicator = $.el('div', { className: `step-status-indicator ${status}` });
  statusIndicator.textContent = status === 'completed' ? '✓' : (status === 'scheduled' ? '•' : '○');
  headerLeft.appendChild(statusIndicator);
  
  // Title and time
  const titleGroup = $.el('div');
  titleGroup.appendChild($.el('div', { className: 'step-card-title', textContent: I18n.stepText(step) }));
  
  const subtitle = $.el('div', { className: 'step-card-subtitle' });
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
      alert((State.lang === 'tr') ? 'Lütfen ofis seçin.' : 'Please select an office.');
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
  const card = $.el('div', { className: 'step-card-collapsible extra-job-card' });

  const taskName = (ej.taskType === 'Custom' && ej.customTaskName)
    ? ej.customTaskName
    : I18n.taskTypeText(ej.taskType || '');

  // Determine status
  let status = 'pending';
  if (ej.completed) {
    status = 'completed';
  } else if (ej.date || dateStr) {
    status = 'scheduled';
  }

  // Collapse Header
  const header = $.el('div', { className: 'step-card-collapse-header' });
  
  const headerLeft = $.el('div', { className: 'step-card-header-left' });
  
  const statusIndicator = $.el('div', { className: `step-status-indicator ${status}` });
  statusIndicator.textContent = status === 'completed' ? '✓' : (status === 'scheduled' ? '•' : '○');
  headerLeft.appendChild(statusIndicator);
  
  const titleGroup = $.el('div');
  
  // Show linked job info if available
  const linkedJob = ej.linkedJobId ? State.getJob(ej.linkedJobId) : null;
  const titleText = linkedJob 
    ? `${linkedJob.jobCode || ''} - ${taskName}`
    : taskName || ((State.lang === 'tr') ? 'Ek İş' : 'Additional Job');
  
  titleGroup.appendChild($.el('div', { className: 'step-card-title', textContent: titleText }));
  
  const subtitle = $.el('div', { className: 'step-card-subtitle' });
  if (ej.time) subtitle.appendChild($.el('span', { textContent: ej.time }));
  if (ej.personnel) subtitle.appendChild($.el('span', { textContent: ej.personnel }));
  if (linkedJob) {
    subtitle.appendChild($.el('span', { textContent: linkedJob.clientName || '' }));
  }
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
      alert((State.lang === 'tr') ? 'Lütfen ofis seçin.' : 'Please select an office.');
      return;
    }
    ej.office = officeValue;
    const timeSelector = card.querySelector('.ej-edit-time-selector');
    ej.time = TimeHelpers.getTimeFromSelector(timeSelector);
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

  deleteBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (!confirm(I18n.t('deleteExtraJobConfirm'))) return;
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
    card.appendChild($.el('h4', { textContent: `${job.jobCode || ''} – ${job.clientName || 'No client name'}` }));
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
        alert((State.lang === 'tr') ? 'Lütfen ofis seçin.' : 'Please select an office.');
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
      alert((State.lang === 'tr') ? 'Lütfen ofis seçin.' : 'Please select an office.');
      return;
    }

    if (!taskType && !customTaskName && !time && !address && !personnel && !vehicle && !notes) {
      alert(I18n.t('fillAtLeastOneField'));
      return;
    }

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
      linkedJobId: linkedJob ? String(linkedJob.id) : '',
      linkedJobCode: linkedJob ? (linkedJob.jobCode || '') : '',
      linkedJobClientName: linkedJob ? (linkedJob.clientName || '') : '',
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
        alert((State.lang === 'tr') ? 'Lütfen ofis seçin.' : 'Please select an office.');
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

    delBtn.addEventListener('click', () => {
      if (!confirm(I18n.t('deleteExtraJobConfirm'))) return;
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
    section.appendChild($.el('h4', { textContent: I18n.t('dayNotes') }));

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
      delBtn.addEventListener('click', () => {
        if (!confirm(I18n.t('deleteDayNotesConfirm'))) return;
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
    ['originCountrySelect', 'destinationCountrySelect', 'agentCountrySelect'].forEach(id => {
      const select = $.get(id);
      CONFIG.COUNTRIES.forEach(country => {
        select.appendChild($.el('option', { value: country, textContent: country }));
      });
    });
  },

  refreshAgentSelects() {
    ['originAgentSelect', 'destinationAgentSelect'].forEach(id => {
      const select = $.get(id);
      while (select.options.length > 1) select.remove(1);
      State.agents.forEach(agent => {
        select.appendChild($.el('option', {
          value: String(agent.id),
          textContent: `${agent.name} (${agent.city}, ${agent.country})`
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
    originCity: form.originCity.value.trim(),
    originCountry: form.originCountry.value,
    originFullAddress: form.originFullAddress.value.trim(),
    destinationCity: form.destinationCity.value.trim(),
    destinationCountry: form.destinationCountry.value,
    destinationFullAddress: form.destinationFullAddress.value.trim(),
    tradeDirection: form.tradeDirection.value,
    status: form.status.value,
    originAgentId: form.originAgentId.value ? String(form.originAgentId.value) : null,
    destinationAgentId: form.destinationAgentId.value ? String(form.destinationAgentId.value) : null,
    modes: Array.from(form.querySelectorAll('input[name="mode"]:checked')).map(cb => cb.value),
    shipmentContents: shipmentContents.length > 0 ? shipmentContents : ['HHE'],
    moveManager: form.moveManager?.value.trim() || '',
    
    // Mode-specific fields
    seaVolume: parseFloat(form.jobSeaVolume?.value) || 0,
    containerDetails: form.jobContainerDetails?.value.trim() || '',
    airVolume: parseFloat(form.jobAirVolume?.value) || 0,
    airCargoWeight: parseFloat(form.jobAirCargoWeight?.value) || 0,
    airACW: parseFloat(form.jobAirACW?.value) || 0,
    landVolume: parseFloat(form.jobLandVolume?.value) || 0,
    
    // Vehicle fields
    vehicleType: form.jobVehicleType?.value || '',
    vehicleMake: form.jobVehicleMake?.value.trim() || '',
    vehicleModel: form.jobVehicleModel?.value.trim() || '',
    vehicleYear: parseInt(form.jobVehicleYear?.value) || 0,
    vehicleVIN: form.jobVehicleVIN?.value.trim() || '',
    vehicleCondition: form.querySelector('input[name="jobVehicleCondition"]:checked')?.value || 'Running'
  };

  if (!job.status) {
    alert(I18n.t('statusRequired'));
    return;
  }
  if (!job.originAgentId && !job.destinationAgentId) {
    alert(I18n.t('selectOneAgent'));
    return;
  }

  if (State.jobFormMode === 'create') {
    job.id = Utils.makeId('job');
    job.jobCode = Utils.jobCode();
    job.notes = [];
    job.documents = [];
    job.paymentReceived = false;
    job.packDate = '';
    job.removedAutoStepIds = [];
    const template = CONFIG.CHECKLIST_TEMPLATES[job.tradeDirection] || CONFIG.CHECKLIST_TEMPLATES.DEFAULT;
    job.checklist = template.map(text => ({ text, done: false }));
    job.steps = Steps.create(job);
    State.jobs.push(job);
  } else {
    const existing = State.getJob(State.selectedJobId);
    if (existing) {
      Object.assign(existing, job);
      const oldSteps = existing.steps || [];
      const newSteps = Steps.create(existing);
      newSteps.forEach(ns => {
        const os = oldSteps.find(s => s.id === ns.id);
        if (os) Object.assign(ns, os);
      });
      existing.steps = newSteps;
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
    const name = form.agentName.value.trim();
    const city = form.agentCity.value.trim();
    const country = form.agentCountry.value;
    if (!name || !city || !country) {
      alert((State.lang === 'tr') ? 'Lütfen ad, şehir ve ülke girin.' : 'Please fill name, city and country.');
      return;
    }

    if (State.agentFormMode === 'create') {
      State.agents.push({
        id: Utils.makeId('agent'),
        name,
        city,
        country,
        contacts: []
      });
    } else {
      const agent = State.getAgent(State.selectedAgentId);
      if (agent) {
        agent.name = name;
        agent.city = city;
        agent.country = country;
      }
    }

    Storage.saveAgents();
    Forms.refreshAgentSelects();
    AgentsUI.render();
    Modals.closeAgent();
  }
};

function initEventHandlers() {
  $.get('navMoves').addEventListener('click', () => Views.show('moves'));
  $.get('navAgents').addEventListener('click', () => Views.show('agents'));
  $.get('navSchedule').addEventListener('click', () => Views.show('schedule'));
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
  form.originCity.value = job.originCity || '';
  form.originCountry.value = job.originCountry || '';
  form.originFullAddress.value = job.originFullAddress || '';
  form.destinationCity.value = job.destinationCity || '';
  form.destinationCountry.value = job.destinationCountry || '';
  form.destinationFullAddress.value = job.destinationFullAddress || '';
  form.tradeDirection.value = job.tradeDirection || '';
  form.status.value = job.status || '';
  form.originAgentId.value = job.originAgentId || '';
  form.destinationAgentId.value = job.destinationAgentId || '';
  
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
  if (form.jobAirVolume) form.jobAirVolume.value = job.airVolume || '';
  if (form.jobAirCargoWeight) form.jobAirCargoWeight.value = job.airCargoWeight || '';
  if (form.jobAirACW) form.jobAirACW.value = job.airACW || '';
  if (form.jobLandVolume) form.jobLandVolume.value = job.landVolume || '';
  
  // Vehicle fields
  if (form.jobVehicleType) form.jobVehicleType.value = job.vehicleType || '';
  if (form.jobVehicleMake) form.jobVehicleMake.value = job.vehicleMake || '';
  if (form.jobVehicleModel) form.jobVehicleModel.value = job.vehicleModel || '';
  if (form.jobVehicleYear) form.jobVehicleYear.value = job.vehicleYear || '';
  if (form.jobVehicleVIN) form.jobVehicleVIN.value = job.vehicleVIN || '';
  const vehicleConditionRadio = form.querySelector(`input[name="jobVehicleCondition"][value="${job.vehicleCondition || 'Running'}"]`);
  if (vehicleConditionRadio) vehicleConditionRadio.checked = true;
  
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
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      JobsUI.render();
    });
  });

  $.get('typeFilter').addEventListener('change', (e) => {
    State.filters.type = e.target.value;
    JobsUI.render();
  });
  $.get('paymentFilter').addEventListener('change', (e) => {
    State.filters.payment = e.target.value;
    JobsUI.render();
  });
  $.get('searchInput').addEventListener('input', (e) => {
    State.filters.search = e.target.value.trim();
    JobsUI.render();
  });

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
      alert(I18n.t('documentNameRequired'));
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
        alert((State.lang === 'tr') ? 'Lütfen bir dosya seçin.' : 'Please select a file.');
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

  $.get('agentSearchInput').addEventListener('input', (e) => {
    State.agentSearch = e.target.value.trim();
    AgentsUI.render();
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
      alert(I18n.t('exportedOk'));
    } catch (e) {
      console.error('Export failed:', e);
      alert(I18n.t('exportFailed'));
    }
  });

  $.get('toggleImportAreaBtn').addEventListener('click', () => $.toggle($.get('importArea')));

  $.get('importDataBtn').addEventListener('click', () => {
    const raw = $.get('importDataInput').value.trim();
    if (!raw) {
      alert(I18n.t('importPromptEmpty'));
      return;
    }
    try {
      const data = JSON.parse(raw);
      if (!confirm(I18n.t('importConfirm'))) return;
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
      alert(I18n.t('importOk'));
    } catch (e) {
      alert(I18n.t('invalidJson') + e.message);
    }
  });

  const docsSearchInput = $.get('documentsSearchInput');
  if (docsSearchInput) docsSearchInput.addEventListener('input', () => DocumentsTabUI.render());

  const docsJobFilter = $.get('documentsJobFilter');
  if (docsJobFilter) docsJobFilter.addEventListener('change', () => DocumentsTabUI.render());

  // Documents tabs
const documentsSearchTab = $.get('documentsSearchTab');
const resourceLibraryTab = $.get('resourceLibraryTab');

if (documentsSearchTab) {
  documentsSearchTab.addEventListener('click', () => {
    State.documentsViewTab = 'search';
    
    // Update active state
    documentsSearchTab.classList.add('active');
    resourceLibraryTab.classList.remove('active');
    documentsSearchTab.style.borderBottomColor = '#3b82f6';
    resourceLibraryTab.style.borderBottomColor = 'transparent';
    
    DocumentsTabUI.render();
  });
}

if (resourceLibraryTab) {
  resourceLibraryTab.addEventListener('click', () => {
    State.documentsViewTab = 'library';
    
    // Update active state
    resourceLibraryTab.classList.add('active');
    documentsSearchTab.classList.remove('active');
    resourceLibraryTab.style.borderBottomColor = '#3b82f6';
    documentsSearchTab.style.borderBottomColor = 'transparent';
    
    DocumentsTabUI.render();
  });
}
  
// Quotes navigation
$.get('navQuotes').addEventListener('click', () => {
  Views.show('quotes');
  QuotesUI.render();
});

// Quote search
const quoteSearchInput = $.get('quoteSearchInput');
if (quoteSearchInput) {
  quoteSearchInput.addEventListener('input', (e) => {
    State.quoteFilters.search = e.target.value.trim();
    QuotesUI.render();
  });
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

// Type change
const quoteTypeSelect = $.get('quoteForm')?.querySelector('select[name="quoteType"]');
if (quoteTypeSelect) {
  quoteTypeSelect.addEventListener('change', () => QuotesUI.updateChecklists());
}

// Insurance toggle
const quoteForm = $.get('quoteForm');
if (quoteForm) {
  quoteForm.querySelectorAll('input[name="insurance"]').forEach(radio => {
    radio.addEventListener('change', (e) => {
      QuotesUI.toggleInsuranceFields(e.target.value === 'yes');
      QuotesUI.updateChecklists(); // Update to remove/add insurance from additional charges
    });
  });
}

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
}


function init() {
  Storage.loadAll();

  I18n.init();

  Forms.populateCountrySelects();
  Forms.refreshAgentSelects();
  initEventHandlers();

  I18n.applyStaticTexts();

  JobsUI.render();
  AgentsUI.render();
  ScheduleUI.render();
  QuotesUI.render();

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
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// ============================================================
// END OF APP.JS
// ============================================================
