'use strict';

// ============================================================
// CONFIGURATION
// ============================================================

const CONFIG = {
  STORAGE_KEYS: {
    JOBS: 'istex_jobs',
    AGENTS: 'istex_agents',
    SCHEDULE_NOTES: 'istex_schedule_notes',
    SCHEDULE_EXTRA_JOBS: 'istex_schedule_extra_jobs',
    LANG: 'istex_lang'
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
    DEFAULT: ["Quote sent","Move reserved","Survey done - N/A","Documents complete","Packing done - N/A","In storage - N/A","En route","Payment received","Delivered"],
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

  // CHANGE: include Custom so user can type a manual task name
  EXTRA_JOB_TYPES: [
    "Custom",
    "Packing","Survey","Delivery to Residence","Container Delivery","Container Pickup","Container Unloading","Container Loading",
    "Air Cargo Packing","Air Cargo Delivery to Address","Air Cargo Delivery to Airport",
    "Delivery to Port","Pickup from Port","Air Cargo Pickup","Air Cargo Delivery","Warehouse Cleaning","Truck Preparation",
    "Vehicle Delivery","Vehicle Pickup"
  ],

  // CHANGE: Offices list for filtering/exporting/assignment
  OFFICES: ["Istanbul", "Ankara", "Adana", "Izmir"],

  // CHANGE: very simple address keyword rules (you can expand later)
  OFFICE_RULES: {
    Istanbul: ["istanbul", "gebze", "kocaeli"],
    Ankara: ["ankara"],
    Adana: ["adana", "mersin"],
    Izmir: ["izmir", "aydın", "manisa"]
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
      extraJobs: 'Extra Jobs',
      dayNotes: 'Day Notes',
      noScheduledSteps: 'No scheduled steps for this day.',
      openMove: 'Open Move',
      edit: 'Edit',
      save: 'Save',
      delete: 'Delete',
      download: 'Download',
      openLink: 'Open Link',
      addJob: 'Add Job',
      noExtraJobs: 'No extra jobs for this day.',
      addNoteBtn: 'Add Note',
      stepSaved: 'Step saved.',
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
      deleteExtraJobConfirm: 'Delete this extra job?',
      deleteAgentConfirm: 'Delete this agent?',
      deleteContactConfirm: 'Delete this contact?',
      fillAtLeastOneField: 'Please fill at least one field.',
      noDocumentsFound: 'No documents found.',
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

      // CHANGE: new labels
      office: 'Office',
      linkedMove: 'Linked Move (optional)',
      none: 'None',
      customTaskName: 'Custom Task Name',
      exportDayPdf: 'Export Day (PDF)',
      addAdditionalJob: 'Add Additional Job'
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
      searchMovesPh: 'Move ID, müşteri, çıkış, varış, acente ile ara...',
      searchAgentsPh: 'Acente adı, şehir, ülke ile ara...',
      searchDocsPh: 'Move ID, müşteri, belge adı, acente ile ara...',
      allMoves: 'Tüm taşımalar',
      all: 'Hepsi',
      planned: 'Planlandı',
      ongoing: 'Devam Ediyor',
      completed: 'Tamamlandı',
      cancelled: 'İptal',
      allTypes: 'Tüm tipler',
      importType: 'İthalat',
      exportType: 'İhracat',
      localType: 'Şehir İçi',
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
      stepSaved: 'Adım kaydedildi.',
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
      moveId: 'Move ID',
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
      importData: 'İçe Aktar',
      exportData: 'Dışa Aktar',
      importNow: 'Şimdi İçe Aktar',
      toggleImportArea: 'İçe Aktar',
      monthLocale: 'tr-TR',
      monday: 'Pzt',
      tuesday: 'Sal',
      wednesday: 'Çar',
      thursday: 'Per',
      friday: 'Cum',
      saturday: 'Cmt',
      sunday: 'Paz',
      allMovesFilter: 'Tüm taşımalar',

      // CHANGE: new labels
      office: 'Ofis',
      linkedMove: 'Bağlı Taşıma (opsiyonel)',
      none: 'Yok',
      customTaskName: 'Özel İş Adı',
      exportDayPdf: 'Günü PDF Olarak Çıkar',
      addAdditionalJob: 'Ek İş Ekle'
    }
  },

  t(key, vars) {
    const lang = State.lang || 'en';
    const base = (this.dict[lang] && this.dict[lang][key]) ?? (this.dict.en[key] ?? key);
    if (!vars) return base;
    return Object.keys(vars).reduce((s, k) => s.replaceAll(`{${k}}`, String(vars[k])), base);
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
    const navDocuments = $.get('navDocuments'); if (navDocuments) navDocuments.textContent = this.t('documents');
    const documentsHeader = $.get('documentsHeader'); if (documentsHeader) documentsHeader.textContent = this.t('documents');

    const openCreateJob = $.get('openCreateJob'); if (openCreateJob) openCreateJob.textContent = this.t('addNewMove');
    const editJobBtn = $.get('editJobBtn'); if (editJobBtn) editJobBtn.textContent = this.t('editMove');
    const openCreateAgentBtn = $.get('openCreateAgentBtn'); if (openCreateAgentBtn) openCreateAgentBtn.textContent = this.t('addAgentTitle');

    const searchInput = $.get('searchInput'); if (searchInput) searchInput.placeholder = this.t('searchMovesPh');
    const agentSearchInput = $.get('agentSearchInput'); if (agentSearchInput) agentSearchInput.placeholder = this.t('searchAgentsPh');
    const documentsSearchInput = $.get('documentsSearchInput'); if (documentsSearchInput) documentsSearchInput.placeholder = this.t('searchDocsPh');

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

    const scheduleDayTitle = $.get('scheduleDayTitle');
    if (scheduleDayTitle) scheduleDayTitle.textContent = this.t('dayDetails');

    const scheduleDayHint = $.get('scheduleDayHint');
    if (scheduleDayHint) scheduleDayHint.textContent = this.t('scheduleDayDetailsHint');

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

  saveJobs() { this.save(CONFIG.STORAGE_KEYS.JOBS, State.jobs); },
  saveAgents() { this.save(CONFIG.STORAGE_KEYS.AGENTS, State.agents); },
  saveScheduleNotes() { this.save(CONFIG.STORAGE_KEYS.SCHEDULE_NOTES, State.scheduleNotes); },
  saveScheduleExtraJobs() { this.save(CONFIG.STORAGE_KEYS.SCHEDULE_EXTRA_JOBS, State.scheduleExtraJobs); },

  loadAll() {
    State.agents = this.load(CONFIG.STORAGE_KEYS.AGENTS, []);
    State.jobs = this.load(CONFIG.STORAGE_KEYS.JOBS, []);
    State.scheduleNotes = this.load(CONFIG.STORAGE_KEYS.SCHEDULE_NOTES, {});
    State.scheduleExtraJobs = this.load(CONFIG.STORAGE_KEYS.SCHEDULE_EXTRA_JOBS, {});
    Validator.normalizeAll();
  },

  exportData() {
    return {
      jobs: State.jobs,
      agents: State.agents,
      scheduleNotes: State.scheduleNotes,
      scheduleExtraJobs: State.scheduleExtraJobs
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
    Validator.normalizeAll();
    this.saveJobs();
    this.saveAgents();
    this.saveScheduleNotes();
    this.saveScheduleExtraJobs();
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
    if (!ej.id) ej.id = Utils.makeId('xjob');               // CHANGE: stable IDs
    if (!ej.date) ej.date = dateStr || '';                  // CHANGE: store date inside item too (export-friendly)
    if (typeof ej.taskType !== 'string') ej.taskType = '';
    if (typeof ej.customTaskName !== 'string') ej.customTaskName = ''; // CHANGE: custom task support
    if (typeof ej.time !== 'string') ej.time = '';          // CHANGE: schedule items should have time
    if (typeof ej.address !== 'string') ej.address = '';    // CHANGE: schedule items should have address
    if (typeof ej.office !== 'string') ej.office = '';      // CHANGE: office selection (optional)
    if (typeof ej.personnel !== 'string') ej.personnel = '';
    if (typeof ej.vehicle !== 'string') ej.vehicle = '';
    if (typeof ej.notes !== 'string') ej.notes = '';
    if (typeof ej.linkedJobId !== 'string') ej.linkedJobId = ej.linkedJobId ? String(ej.linkedJobId) : '';
    if (typeof ej.linkedJobCode !== 'string') ej.linkedJobCode = ej.linkedJobCode || '';
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
    if (!job.id) job.id = Utils.makeId('job'); // CHANGE: stable IDs
    if (!job.tradeDirection) job.tradeDirection = '';
    if (!Array.isArray(job.modes)) job.modes = [];
    if (!Array.isArray(job.notes)) job.notes = [];
    if (!Array.isArray(job.documents)) job.documents = [];
    if (typeof job.paymentReceived !== 'boolean') job.paymentReceived = false;
    if (!job.packDate) job.packDate = '';
    if (!job.jobCode) job.jobCode = Utils.jobCode();

    if (!Array.isArray(job.checklist) || job.checklist.length === 0) {
      const template = CONFIG.CHECKLIST_TEMPLATES[job.tradeDirection] || CONFIG.CHECKLIST_TEMPLATES.DEFAULT;
      job.checklist = template.map(text => ({ text, done: false }));
    }

    Steps.ensure(job);
    return job;
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

    return stepIds.map(stepId => {
      const def = CONFIG.STEP_DEFINITIONS[stepId] || {};
      const step = {
        id: stepId, label: def.label || stepId,
        date: '', time: '', personnel: '', vehicle: '', address: '',
        portDetails: '', pickupAirport: '', deliveryAirport: '',
        pickupAddress: '', deliveryAddress: '', notes: '',
        office: '' // CHANGE: office per step (optional)
      };

      if (def.autoFillAddress === 'origin' && job.originFullAddress) step.address = job.originFullAddress;
      if (def.autoFillAddress === 'destination' && job.destinationFullAddress) step.address = job.destinationFullAddress;
      if (def.autoFillDeliveryAddress === 'destination' && job.destinationFullAddress) step.deliveryAddress = job.destinationFullAddress;
      if (def.autoFillPickupAddress === 'origin' && job.originFullAddress) step.pickupAddress = job.originFullAddress;

      // CHANGE: if office not set, attempt auto-detect from best available address
      step.office = Utils.detectOfficeForStep(step, job);

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
      // CHANGE: ensure office field exists on existing data
      job.steps.forEach(step => {
        if (typeof step.office !== 'string') step.office = Utils.detectOfficeForStep(step, job);
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

  // CHANGE: safer unique IDs than Date.now() (prevents collisions)
  makeId(prefix) {
    const p = String(prefix || 'id');
    // time + random to avoid duplicates in fast clicks/imports
    return `${p}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
  },

  // CHANGE: ISTEX-YEAR-#### now uses max existing number + 1 (won't reuse numbers after deletions)
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

  // CHANGE: office detection by address keywords (simple rule-based)
  detectOfficeFromAddress(address) {
    const text = String(address || '').toLowerCase();
    if (!text.trim()) return '';
    for (const office of CONFIG.OFFICES) {
      const rules = CONFIG.OFFICE_RULES[office] || [];
      if (rules.some(k => text.includes(k))) return office;
    }
    return '';
  },

  // CHANGE: pick best address for steps, then detect office
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

  // CHANGE: helper to safely escape html in export layout
  escapeHtml(str) {
    return String(str ?? '')
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#039;');
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
        return;
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
    ['movesView', 'agentsView', 'scheduleView', 'documentsView']
      .forEach(id => $.hide($.get(id)));

    ['navMoves', 'navAgents', 'navSchedule', 'navDocuments']
      .forEach(id => {
        const el = $.get(id);
        if (el) el.classList.remove('active');
      });

    const map = {
      'moves':     { view: 'movesView',     nav: 'navMoves' },
      'agents':    { view: 'agentsView',    nav: 'navAgents' },
      'schedule':  { view: 'scheduleView',  nav: 'navSchedule' },
      'documents': { view: 'documentsView', nav: 'navDocuments' }
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
      }
    }
  }
};

// ============================================================
// CHANGE: Schedule Export (PDF via browser print)
// ============================================================

const ScheduleExport = {
  buildDayRows(dateStr) {
    const rows = [];

    // Steps
    const stepsForDay = Steps.getForDate(dateStr);
    stepsForDay.forEach(({ job, step }) => {
      const office = step.office || Utils.detectOfficeForStep(step, job) || '-';
      const address = step.address || step.pickupAddress || step.deliveryAddress || '-';
      rows.push({
        office,
        time: step.time || '',
        jobCode: job.jobCode || '',
        client: job.clientName || '',
        task: step.label || '',
        address,
        personnel: step.personnel || '',
        vehicle: step.vehicle || '',
        notes: step.notes || ''
      });
    });

    // Extra jobs
    const extra = (State.scheduleExtraJobs[dateStr] || []).map(ej => Validator.normalizeExtraJob(ej, dateStr));
    extra.forEach(ej => {
      const taskName = (ej.taskType === 'Custom' && ej.customTaskName)
        ? ej.customTaskName
        : (ej.taskType || '');
      const office = ej.office || Utils.detectOfficeFromAddress(ej.address) || '-';
      rows.push({
        office,
        time: ej.time || '',
        jobCode: ej.linkedJobCode || '',
        client: '', // optional (could be derived, but keep safe/simple)
        task: taskName || '',
        address: ej.address || '',
        personnel: ej.personnel || '',
        vehicle: ej.vehicle || '',
        notes: ej.notes || ''
      });
    });

    // Sort by time
    rows.sort((a, b) => (a.time || '').localeCompare(b.time || ''));
    return rows;
  },

  exportDayToPdf(dateStr) {
    const rows = this.buildDayRows(dateStr);

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
        rows.length
          ? rows.map(r => `
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
          `).join('')
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

    // Wait a tick so styles load, then open print dialog
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
    statusP.appendChild($.el('strong', { className: `status-label status-${job.status}`, textContent: job.status }));
    const modes = job.modes && job.modes.length ? job.modes.join(' + ') : 'No mode';
    statusP.appendChild(document.createTextNode(' ' + modes));
    card.appendChild(statusP);

    const typeLabel = job.tradeDirection || '-';
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
      [I18n.t('statusLabel'), job.status],
      [I18n.t('modeLabel'), job.modes && job.modes.length ? job.modes.join(' + ') : 'No mode'],
      [I18n.t('origin'), Utils.location(job.originCity, job.originCountry)],
      [I18n.t('destination'), Utils.location(job.destinationCity, job.destinationCountry)],
      [I18n.t('fullOriginAddress'), job.originFullAddress || '-'],
      [I18n.t('fullDestinationAddress'), job.destinationFullAddress || '-'],
      [I18n.t('weight'), `${job.weight || 0} kg`],
      [I18n.t('volume'), `${job.volume || 0} m³`],
      [I18n.t('moveId'), job.jobCode || '-'],
      [I18n.t('typeLabel'), job.tradeDirection || '-'],
      [I18n.t('paymentReceived'), job.paymentReceived ? I18n.t('yes') : I18n.t('no')]
    ];

    details.forEach(([label, value]) => {
      const p = $.el('p');
      p.appendChild($.el('strong', { textContent: label + ': ' }));
      p.appendChild(document.createTextNode(value));
      grid.appendChild(p);
    });

    container.appendChild(grid);
    container.appendChild(this.paymentSection(job));
    container.appendChild(this.stepsSection(job));
    this.renderAgents(job);
    ChecklistUI.render(job);
    NotesUI.render(job);
    DocumentsUI.render(job);

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

  // CHANGE: show linked “additional jobs” under move steps + add a form to create them
  stepsSection(job) {
    const section = $.el('div', { className: 'steps-section' });
    section.appendChild($.el('h4', { textContent: I18n.t('moveSteps') }));

    const container = $.el('div', { id: 'stepsContainer' });

    const steps = job.steps || [];
    if (steps.length === 0) {
      container.appendChild($.el('p', { textContent: I18n.t('noStepsDefined') }));
    } else {
      steps.forEach((step, idx) => container.appendChild(this.stepCard(step, idx, job)));
    }

    // Linked extra jobs for this move (show them as “steps”)
    const linked = ScheduleExtraJobs.getLinkedToJob(job.id);
    linked.forEach(item => {
      container.appendChild(this.linkedExtraJobAsStepCard(job, item));
    });

    section.appendChild(container);

    // Form: Add Additional Job (linked to this move)
    section.appendChild(this.addAdditionalJobForm(job));

    return section;
  },

  // CHANGE: step cards include Office selection + save it
  stepCard(step, idx, job) {
    const def = CONFIG.STEP_DEFINITIONS[step.id] || { fields: [] };
    const card = $.el('div', { className: 'step-card' });
    const header = $.el('div', { className: 'step-card-header' });
    header.appendChild($.el('div', { className: 'step-card-header-title', textContent: step.label }));
    header.appendChild($.el('div', { innerHTML: `Step ${idx + 1}`, style: 'font-size: 11px; color:#6b7280;' }));
    card.appendChild(header);

    const body = $.el('div', { className: 'step-card-body' });
    const fields = [
      [(State.lang === 'tr') ? 'Tarih' : 'Date', 'date', 'date'],
      [I18n.t('time'), 'time', 'time'],
      [I18n.t('personnel'), 'personnel', 'text'],
      [I18n.t('vehicle'), 'vehicle', 'text']
    ];

    fields.forEach(([label, field, type]) => {
      const div = $.el('div');
      div.appendChild($.el('label', { textContent: label }));
      div.appendChild($.el('input', { type, className: `step-${field}-input`, value: step[field] || '' }));
      body.appendChild(div);
    });

    // Office select
    const officeDiv = $.el('div');
    officeDiv.appendChild($.el('label', { textContent: I18n.t('office') }));
    const officeSelect = $.el('select', { className: 'step-office-select' });
    officeSelect.appendChild($.el('option', { value: '', textContent: (State.lang === 'tr') ? 'Otomatik' : 'Auto' }));
    CONFIG.OFFICES.forEach(o => officeSelect.appendChild($.el('option', { value: o, textContent: o })));
    officeSelect.value = step.office || '';
    officeDiv.appendChild(officeSelect);
    body.appendChild(officeDiv);

    if (def.fields.includes('address')) {
      const div = $.el('div', { className: 'full-width' });
      div.appendChild($.el('label', { textContent: I18n.t('address') }));
      div.appendChild($.el('textarea', {
        rows: '2',
        className: 'step-address-input',
        textContent: step.address || ''
      }));
      body.appendChild(div);
    }
    if (def.fields.includes('portDetails')) {
      const div = $.el('div', { className: 'full-width' });
      div.appendChild($.el('label', { textContent: I18n.t('portDetails') }));
      div.appendChild($.el('textarea', {
        rows: '2',
        className: 'step-port-input',
        textContent: step.portDetails || ''
      }));
      body.appendChild(div);
    }
    if (def.fields.includes('pickupAirport')) {
      const div = $.el('div');
      div.appendChild($.el('label', { textContent: I18n.t('pickupAirport') }));
      div.appendChild($.el('input', {
        type: 'text',
        className: 'step-pickup-airport-input',
        value: step.pickupAirport || ''
      }));
      body.appendChild(div);
    }
    if (def.fields.includes('deliveryAirport')) {
      const div = $.el('div');
      div.appendChild($.el('label', { textContent: I18n.t('deliveryAirport') }));
      div.appendChild($.el('input', {
        type: 'text',
        className: 'step-delivery-airport-input',
        value: step.deliveryAirport || ''
      }));
      body.appendChild(div);
    }
    if (def.fields.includes('pickupAddress')) {
      const div = $.el('div', { className: 'full-width' });
      div.appendChild($.el('label', { textContent: I18n.t('pickupAddress') }));
      div.appendChild($.el('textarea', {
        rows: '2',
        className: 'step-pickup-address-input',
        textContent: step.pickupAddress || ''
      }));
      body.appendChild(div);
    }
    if (def.fields.includes('deliveryAddress')) {
      const div = $.el('div', { className: 'full-width' });
      div.appendChild($.el('label', { textContent: I18n.t('deliveryAddress') }));
      div.appendChild($.el('textarea', {
        rows: '2',
        className: 'step-delivery-address-input',
        textContent: step.deliveryAddress || ''
      }));
      body.appendChild(div);
    }

    const notesDiv = $.el('div', { className: 'full-width' });
    notesDiv.appendChild($.el('label', { textContent: I18n.t('notesLabel') }));
    notesDiv.appendChild($.el('textarea', {
      rows: '2',
      className: 'step-notes-input',
      textContent: step.notes || ''
    }));
    body.appendChild(notesDiv);
    card.appendChild(body);

    const actions = $.el('div', {
      style: 'margin-top:6px; display:flex; justify-content:flex-end; gap:8px;'
    });
    const saveBtn = $.el('button', {
      type: 'button',
      className: 'step-save-btn',
      textContent: (State.lang === 'tr') ? 'Adımı Kaydet' : 'Save Step'
    });
    saveBtn.addEventListener('click', () => {
      step.date = card.querySelector('.step-date-input').value || '';
      step.time = card.querySelector('.step-time-input').value || '';
      step.personnel = card.querySelector('.step-personnel-input').value.trim();
      step.vehicle = card.querySelector('.step-vehicle-input').value.trim();

      // Office selection (blank means "auto")
      step.office = card.querySelector('.step-office-select').value || '';

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
    });
    actions.appendChild(saveBtn);
    card.appendChild(actions);
    return card;
  },

  // CHANGE: show linked extra job as a “step card” under move details
  linkedExtraJobAsStepCard(job, item) {
    const { dateStr, ej } = item;
    const card = $.el('div', { className: 'step-card' });

    const header = $.el('div', { className: 'step-card-header' });
    const taskName = (ej.taskType === 'Custom' && ej.customTaskName) ? ej.customTaskName : ej.taskType;
    header.appendChild($.el('div', { className: 'step-card-header-title', textContent: taskName || 'Extra Job' }));
    header.appendChild($.el('div', { innerHTML: Utils.formatDate(dateStr), style: 'font-size: 11px; color:#6b7280;' }));
    card.appendChild(header);

    const body = $.el('div', { className: 'step-card-body' });

    // Date (read-only label)
    const dateDiv = $.el('div');
    dateDiv.appendChild($.el('label', { textContent: (State.lang === 'tr') ? 'Tarih' : 'Date' }));
    dateDiv.appendChild($.el('input', { type: 'text', value: Utils.formatDate(dateStr), disabled: true }));
    body.appendChild(dateDiv);

    // Time
    const timeDiv = $.el('div');
    timeDiv.appendChild($.el('label', { textContent: I18n.t('time') }));
    timeDiv.appendChild($.el('input', { type: 'time', className: 'lej-time', value: ej.time || '' }));
    body.appendChild(timeDiv);

    // Office
    const officeDiv = $.el('div');
    officeDiv.appendChild($.el('label', { textContent: I18n.t('office') }));
    const officeSelect = $.el('select', { className: 'lej-office' });
    officeSelect.appendChild($.el('option', { value: '', textContent: (State.lang === 'tr') ? 'Otomatik' : 'Auto' }));
    CONFIG.OFFICES.forEach(o => officeSelect.appendChild($.el('option', { value: o, textContent: o })));
    officeSelect.value = ej.office || '';
    officeDiv.appendChild(officeSelect);
    body.appendChild(officeDiv);

    // Personnel
    const pDiv = $.el('div');
    pDiv.appendChild($.el('label', { textContent: I18n.t('personnel') }));
    pDiv.appendChild($.el('input', { type: 'text', className: 'lej-personnel', value: ej.personnel || '' }));
    body.appendChild(pDiv);

    // Vehicle
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

    const actions = $.el('div', {
      style: 'margin-top:6px; display:flex; justify-content:flex-end; gap:8px; flex-wrap:wrap;'
    });

    const saveBtn = $.el('button', { type: 'button', className: 'step-save-btn', textContent: I18n.t('save') });
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
      // Keep move details refreshed
      const current = State.getJob(State.selectedJobId);
      if (current) this.showDetails(current);
    });

    const deleteBtn = $.el('button', { type: 'button', textContent: I18n.t('delete') });
    deleteBtn.addEventListener('click', () => {
      if (!confirm(I18n.t('deleteExtraJobConfirm'))) return;
      ScheduleExtraJobs.deleteById(dateStr, ej.id);
      Storage.saveScheduleExtraJobs();
      ScheduleUI.render();
      if (State.schedule.selectedDate) ScheduleUI.renderDay(State.schedule.selectedDate);
      const current = State.getJob(State.selectedJobId);
      if (current) this.showDetails(current);
    });

    actions.appendChild(saveBtn);
    actions.appendChild(deleteBtn);
    card.appendChild(actions);

    return card;
  },

  // CHANGE: add additional job form under move details
  addAdditionalJobForm(job) {
    const wrap = $.el('div', { style: 'margin-top:12px;' });

    const title = $.el('h4', { textContent: I18n.t('addAdditionalJob') });
    title.style.margin = '12px 0 8px 0';
    title.style.fontSize = '14px';
    title.style.fontWeight = '600';
    wrap.appendChild(title);

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
    CONFIG.EXTRA_JOB_TYPES.forEach(type => taskSelect.appendChild($.el('option', { value: type, textContent: type })));
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
    officeSelect.appendChild($.el('option', { value: '', textContent: (State.lang === 'tr') ? 'Otomatik' : 'Auto' }));
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

    // Add button
    const addBtn = $.el('button', { type: 'button', textContent: I18n.t('addJob') });
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
        linkedJobCode: job.jobCode || ''
      }, dateStr));

      Storage.saveScheduleExtraJobs();
      ScheduleUI.render();
      if (State.schedule.selectedDate) ScheduleUI.renderDay(State.schedule.selectedDate);

      // Reset inputs
      timeInput.value = '';
      pInput.value = '';
      vInput.value = '';
      aInput.value = '';
      nInput.value = '';
      officeSelect.value = '';
      taskSelect.value = 'Custom';
      toggleCustom();

      // Refresh move details view so it appears under steps immediately
      this.showDetails(job);
    });

    const actionsDiv = $.el('div', { className: 'schedule-extra-actions' });
    actionsDiv.appendChild(addBtn);
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
    items.forEach((item, idx) => {
      const wrapper = $.el('div', { className: 'checklist-item' });
      const label = $.el('label');
      const cb = $.el('input', { type: 'checkbox' });
      cb.checked = item.done;
      cb.addEventListener('change', () => {
        job.checklist[idx].done = cb.checked;
        Storage.saveJobs();
      });
      label.appendChild(cb);
      label.appendChild(document.createTextNode(' ' + item.text));
      wrapper.appendChild(label);
      container.appendChild(wrapper);
    });
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

// ============================================================
// GLOBAL DOCUMENTS TAB UI
// ============================================================

const DocumentsTabUI = {
  render() {
    const listEl = $.get('documentsListGlobal');
    const jobFilterEl = $.get('documentsJobFilter');
    const searchEl = $.get('documentsSearchInput');

    if (!listEl || !jobFilterEl || !searchEl) return;

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
    const modeLabel = job.modes && job.modes.length ? job.modes.join(' + ') : 'No mode';
    const typeLabel = job.tradeDirection || '-';
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
// CHANGE: schedule extra jobs helper (linked to move support)
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
    // Sort by date then time
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

  // CHANGE: adds Export Day (PDF) button at top (no HTML changes needed)
  renderDay(dateStr) {
    const container = $.get('scheduleDayDetails');
    $.clear(container);

    const topRow = $.el('div', { style: 'display:flex; justify-content:space-between; align-items:center; gap:10px; flex-wrap:wrap;' });
    topRow.appendChild($.el('h3', { textContent: Utils.formatDate(dateStr), style: 'margin:0;' }));

    const exportBtn = $.el('button', { type: 'button', textContent: I18n.t('exportDayPdf') });
    exportBtn.addEventListener('click', () => ScheduleExport.exportDayToPdf(dateStr));
    topRow.appendChild(exportBtn);

    container.appendChild(topRow);

    const stepsForDay = Steps.getForDate(dateStr);
    const extraJobs = (State.scheduleExtraJobs[dateStr] || []).map(ej => Validator.normalizeExtraJob(ej, dateStr));
    const dayNote = State.scheduleNotes[dateStr] || '';

    if (stepsForDay.length === 0) {
      container.appendChild($.el('p', { textContent: I18n.t('noScheduledSteps') }));
    } else {
      stepsForDay.sort((a, b) => (a.step.time || '').localeCompare(b.step.time || ''));
      stepsForDay.forEach(({ job, step }) => container.appendChild(this.stepCard(job, step, dateStr)));
    }

    container.appendChild(this.extraJobsSection(dateStr, extraJobs));
    container.appendChild(this.dayNotesSection(dateStr, dayNote));
  },

  // CHANGE: schedule step view shows office + schedule edit allows office/address editing
  stepCard(job, step, dateStr) {
    const def = CONFIG.STEP_DEFINITIONS[step.id] || {};
    const card = $.el('div', { className: 'schedule-step-card' });
    card.appendChild($.el('h4', { textContent: `${job.jobCode || ''} – ${job.clientName || 'No client name'}` }));
    card.appendChild($.el('p', { textContent: step.label }));
    card.appendChild($.el('p', {
      textContent: `${Utils.location(job.originCity, job.originCountry)} → ${Utils.location(job.destinationCity, job.destinationCountry)}`
    }));
    card.appendChild($.el('p', {
      className: 'schedule-step-meta',
      innerHTML: `${
        job.modes && job.modes.length ? job.modes.join(' + ') : 'No mode'
      } • ${job.tradeDirection || '-'} • ${I18n.t('statusLabel')}: ${job.status}`
    }));

    const viewBox = $.el('div', { className: 'schedule-step-fields-view' });

    const officeComputed = step.office || Utils.detectOfficeForStep(step, job) || '-';
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
    officeSelect.appendChild($.el('option', { value: '', textContent: (State.lang === 'tr') ? 'Otomatik' : 'Auto' }));
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

    // address editing only if step has address
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
      step.office = card.querySelector('.sched-office-input').value || '';
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
    actions.appendChild(editBtn);
    actions.appendChild(saveBtn);
    actions.appendChild(cancelBtn);
    card.appendChild(editBox);
    card.appendChild(actions);
    return card;
  },

  // CHANGE: extra jobs now have time/address/office + optional linked move + open-move button
  extraJobsSection(dateStr, extraJobs) {
    const section = $.el('div', { className: 'schedule-extra-jobs' });
    section.appendChild($.el('h4', { textContent: I18n.t('extraJobs') }));
    const list = $.el('div');

    if (extraJobs.length === 0) {
      list.appendChild($.el('p', { className: 'schedule-extra-empty', textContent: I18n.t('noExtraJobs') }));
    } else {
      extraJobs
        .slice()
        .sort((a, b) => (a.time || '').localeCompare(b.time || ''))
        .forEach(ej => {
          const row = $.el('div', { className: 'schedule-extra-job-row' });
          const main = $.el('div', { className: 'schedule-extra-job-main' });

          const taskName = (ej.taskType === 'Custom' && ej.customTaskName) ? ej.customTaskName : (ej.taskType || '-');
          const office = ej.office || Utils.detectOfficeFromAddress(ej.address) || '-';

          const pairs = [
            [I18n.t('office'), office],
            [I18n.t('time'), ej.time || '-'],
            [I18n.t('task'), taskName],
            [I18n.t('address'), ej.address || '-'],
            [I18n.t('personnel'), ej.personnel || '-'],
            [I18n.t('vehicle'), ej.vehicle || '-'],
            [I18n.t('notesLabel'), ej.notes || '-']
          ];

          // linked move info if exists
          if (ej.linkedJobCode) {
            pairs.unshift([I18n.t('moveId'), ej.linkedJobCode]);
          }

          pairs.forEach(([label, value]) => {
            const fieldRow = $.el('div', { className: 'schedule-field-row' });
            fieldRow.appendChild($.el('span', { className: 'schedule-field-label', textContent: label }));
            fieldRow.appendChild($.el('span', { className: 'schedule-field-value', textContent: value }));
            main.appendChild(fieldRow);
          });

          row.appendChild(main);

          const actions = $.el('div', { className: 'schedule-extra-job-actions' });

          if (ej.linkedJobId) {
            const openMoveBtn = $.el('button', { type: 'button', textContent: I18n.t('openMove') });
            openMoveBtn.addEventListener('click', () => {
              const job = State.getJob(ej.linkedJobId);
              if (job) {
                Views.show('moves');
                JobsUI.render();
                JobsUI.showDetails(job);
              }
            });
            actions.appendChild(openMoveBtn);
          }

          const delBtn = $.el('button', { type: 'button', className: 'extra-job-delete-btn', textContent: I18n.t('delete') });
          delBtn.addEventListener('click', () => {
            if (!confirm(I18n.t('deleteExtraJobConfirm'))) return;
            ScheduleExtraJobs.deleteById(dateStr, ej.id);
            Storage.saveScheduleExtraJobs();
            this.renderDay(dateStr);
            this.render();
          });

          actions.appendChild(delBtn);
          row.appendChild(actions);
          list.appendChild(row);
        });
    }

    section.appendChild(list);

    // --- Add form (standalone or linked) ---
    const form = $.el('div', { className: 'schedule-extra-form' });

    // Linked Move select
    const linkDiv = $.el('div');
    linkDiv.appendChild($.el('label', { textContent: I18n.t('linkedMove') }));
    const linkSelect = $.el('select', { id: 'extraJobLinkedMove' });
    linkSelect.appendChild($.el('option', { value: '', textContent: I18n.t('none') }));
    State.jobs
      .slice()
      .map(j => ({ id: String(j.id), code: j.jobCode || '' }))
      .filter(x => x.code)
      .sort((a, b) => a.code.localeCompare(b.code))
      .forEach(x => linkSelect.appendChild($.el('option', { value: x.id, textContent: x.code })));
    linkDiv.appendChild(linkSelect);
    form.appendChild(linkDiv);

    // Task type
    const taskDiv = $.el('div');
    taskDiv.appendChild($.el('label', { textContent: I18n.t('task') }));
    const select = $.el('select', { id: 'extraJobType' });
    CONFIG.EXTRA_JOB_TYPES.forEach(type => select.appendChild($.el('option', { value: type, textContent: type })));
    taskDiv.appendChild(select);
    form.appendChild(taskDiv);

    // Custom name
    const customDiv = $.el('div');
    customDiv.appendChild($.el('label', { textContent: I18n.t('customTaskName') }));
    const customInput = $.el('input', { type: 'text', id: 'extraJobCustomName' });
    customDiv.appendChild(customInput);
    form.appendChild(customDiv);

    const toggleCustom = () => {
      customDiv.style.display = (select.value === 'Custom') ? '' : 'none';
      if (select.value !== 'Custom') customInput.value = '';
    };
    select.addEventListener('change', toggleCustom);
    toggleCustom();

    // Time
    const timeDiv = $.el('div');
    timeDiv.appendChild($.el('label', { textContent: I18n.t('time') }));
    const timeInput = $.el('input', { type: 'time', id: 'extraJobTime' });
    timeDiv.appendChild(timeInput);
    form.appendChild(timeDiv);

    // Office
    const officeDiv = $.el('div');
    officeDiv.appendChild($.el('label', { textContent: I18n.t('office') }));
    const officeSelect = $.el('select', { id: 'extraJobOffice' });
    officeSelect.appendChild($.el('option', { value: '', textContent: (State.lang === 'tr') ? 'Otomatik' : 'Auto' }));
    CONFIG.OFFICES.forEach(o => officeSelect.appendChild($.el('option', { value: o, textContent: o })));
    officeDiv.appendChild(officeSelect);
    form.appendChild(officeDiv);

    // Address
    const addressDiv = $.el('div');
    addressDiv.appendChild($.el('label', { textContent: I18n.t('address') }));
    const addressInput = $.el('textarea', { id: 'extraJobAddress', rows: '2' });
    addressDiv.appendChild(addressInput);
    form.appendChild(addressDiv);

    // Personnel / Vehicle / Notes
    [[I18n.t('personnel'), 'extraJobPersonnel', 'text'], [I18n.t('vehicle'), 'extraJobVehicle', 'text'], [I18n.t('notesLabel'), 'extraJobNotes', 'textarea']].forEach(
      ([label, id, type]) => {
        const div = $.el('div');
        div.appendChild($.el('label', { textContent: label }));
        div.appendChild($.el(type === 'textarea' ? 'textarea' : 'input', {
          type: type === 'textarea' ? undefined : type,
          id,
          rows: type === 'textarea' ? '2' : undefined
        }));
        form.appendChild(div);
      }
    );

    const addBtn = $.el('button', { type: 'button', textContent: I18n.t('addJob') });
    addBtn.addEventListener('click', () => {
      const linkedJobId = $.get('extraJobLinkedMove').value || '';
      const linkedJob = linkedJobId ? State.getJob(linkedJobId) : null;

      const taskType = $.get('extraJobType').value;
      const customTaskName = $.get('extraJobCustomName').value.trim();
      const time = $.get('extraJobTime').value || '';
      const office = $.get('extraJobOffice').value || '';
      const address = $.get('extraJobAddress').value.trim();
      const personnel = $.get('extraJobPersonnel').value.trim();
      const vehicle = $.get('extraJobVehicle').value.trim();
      const notes = $.get('extraJobNotes').value.trim();

      if (!taskType && !customTaskName && !time && !office && !address && !personnel && !vehicle && !notes) {
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
        linkedJobCode: linkedJob ? (linkedJob.jobCode || '') : ''
      }, dateStr));

      Storage.saveScheduleExtraJobs();
      this.renderDay(dateStr);
      this.render();
    });

    const actionsDiv = $.el('div', { className: 'schedule-extra-actions' });
    actionsDiv.appendChild(addBtn);
    form.appendChild(actionsDiv);
    section.appendChild(form);

    return section;
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
    const job = {
      clientName: form.clientName.value.trim(),
      originCity: form.originCity.value.trim(),
      originCountry: form.originCountry.value,
      originFullAddress: form.originFullAddress.value.trim(),
      destinationCity: form.destinationCity.value.trim(),
      destinationCountry: form.destinationCountry.value,
      destinationFullAddress: form.destinationFullAddress.value.trim(),
      weight: form.weight.value ? Number(form.weight.value) : 0,
      volume: form.volume.value ? Number(form.volume.value) : 0,
      tradeDirection: form.tradeDirection.value,
      status: form.status.value,
      originAgentId: form.originAgentId.value ? String(form.originAgentId.value) : null,
      destinationAgentId: form.destinationAgentId.value ? String(form.destinationAgentId.value) : null,
      modes: Array.from(form.querySelectorAll('input[name="mode"]:checked')).map(cb => cb.value)
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
      // CHANGE: use safe unique id (not Date.now)
      job.id = Utils.makeId('job');
      job.jobCode = Utils.jobCode();
      job.notes = [];
      job.documents = [];
      job.paymentReceived = false;
      job.packDate = '';
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
        // CHANGE: use safe unique id (not Date.now)
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
    form.weight.value = job.weight || '';
    form.volume.value = job.volume || '';
    form.tradeDirection.value = job.tradeDirection || '';
    form.status.value = job.status || '';
    form.originAgentId.value = job.originAgentId || '';
    form.destinationAgentId.value = job.destinationAgentId || '';
    Array.from(form.querySelectorAll('input[name="mode"]')).forEach(cb => {
      cb.checked = job.modes && job.modes.includes(cb.value);
    });
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

  $.get('setChecklistBtn').addEventListener('click', () => {
    const job = State.getJob(State.selectedJobId);
    if (!job) return;
    const text = $.get('checklistInput').value.trim();
    if (!text) return;
    const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
    if (!lines.length) return;
    job.checklist = job.checklist.concat(lines.map(text => ({ text, done: false })));
    $.get('checklistInput').value = '';
    ChecklistUI.render(job);
    Storage.saveJobs();
  });

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