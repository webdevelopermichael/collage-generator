export type Language = 'en' | 'ru' | 'ua';

export interface Translations {
  // Navigation & Common
  features: string;
  aiComposer: string;
  livePreview: string;
  faqAndGuide: string;
  signIn: string;
  signOut: string;
  launchStudio: string;
  openStudio: string;
  savedProjects: string;
  newProject: string;
  active: string;
  delete: string;
  open: string;
  backToLanding: string;
  extract: string;
  saveAndDownload: string;
  generatingImage: string;
  aspectRatios: string;
  undo: string;
  redo: string;
  noSavedProjects: string;

  // Hero
  heroBadgeNew: string;
  heroBadgeText: string;
  heroTitle1: string;
  heroTitleGradient: string;
  heroSubtitle: string;
  heroCtaStudio: string;
  heroCtaAi: string;
  trustNoWatermark: string;
  trustInstantExport: string;
  trustPrivate: string;
  trustFree: string;

  // Sandbox Live Demo
  sandboxTitle: string;
  sandboxSubtitle: string;
  selectGridPreset: string;
  gridGap: string;
  cornerRounding: string;
  backdropTheme: string;
  customizeInStudio: string;

  // Features
  featuresTitle: string;
  featuresSubtitle: string;
  feat1Title: string;
  feat1Desc: string;
  feat2Title: string;
  feat2Desc: string;
  feat3Title: string;
  feat3Desc: string;
  feat4Title: string;
  feat4Desc: string;
  feat5Title: string;
  feat5Desc: string;
  feat6Title: string;
  feat6Desc: string;

  // AI Section
  aiBadge: string;
  aiTitle: string;
  aiSubtitle: string;
  aiPoint1: string;
  aiPoint2: string;
  aiPoint3: string;
  applyPreset: string;

  // FAQ
  faqBadge: string;
  faqTitle: string;
  faqSubtitle: string;
  faq1Q: string;
  faq1A: string;
  faq2Q: string;
  faq2A: string;
  faq3Q: string;
  faq3A: string;
  faq4Q: string;
  faq4A: string;
  faq5Q: string;
  faq5A: string;

  // Footer
  footerDesc: string;
  studioTools: string;
  legalAndPrivacy: string;
  rightsReserved: string;

  // Editor Tabs & Toolbars
  tabCanvas: string;
  tabGrid: string;
  tabStyle: string;
  tabPhotos: string;
  tabAi: string;
  tabBadges: string;
  
  // Layout Tab
  gridLayoutTemplates: string;
  gridLayoutSubtitle: string;
  photoWord: string;
  photosWord: string;
  optionsCount: string;

  // Style Tab
  canvasBackground: string;
  outerPadding: string;
  cellSpacingGap: string;
  cellRounding: string;
  borderStroke: string;
  dropShadow: string;
  shadowNone: string;
  shadowSubtle: string;
  shadowMedium: string;
  shadowDeep: string;
  shadowGlow: string;

  // Photos Tab
  photosHeader: string;
  photosSubtitle: string;
  uploadBatchPhotos: string;
  uploadBatchDesc: string;
  stockPhotosTitle: string;
  stockPhotosSubtitle: string;
  clickToInsert: string;

  // AI Composer Tab
  aiStudioTitle: string;
  aiStudioSubtitle: string;
  promptPlaceholder: string;
  generateCollageBtn: string;
  categoryAll: string;
  categorySocial: string;
  categorySaas: string;
  categoryArt: string;
  autoSynthesize: string;

  // Badges Tab
  badgesHeader: string;
  badgesSubtitle: string;
  addCustomBadge: string;
  badgeTitleLabel: string;
  badgeValueLabel: string;
  badgeColorLabel: string;
  addBadgeBtn: string;
  templateBadgesTitle: string;
  dragBadgeHint: string;
  
  // Canvas Size / Ratio Tab
  canvasSizeTitle: string;
  canvasSizeSubtitle: string;
  customDimensions: string;
  widthLabel: string;
  heightLabel: string;
  applyDimensions: string;

  // Cell Action Toolbar & Stage
  replacePhoto: string;
  zoomIn: string;
  zoomOut: string;
  removePhoto: string;
  addPhoto: string;
  gestureHint: string;

  // Export Modal
  exportTitle: string;
  exportSubtitle: string;
  resolutionScale: string;
  fileFormat: string;
  scale1x: string;
  scale2x: string;
  scale4x: string;
}

export const TRANSLATIONS: Record<Language, Translations> = {
  en: {
    features: 'Features',
    aiComposer: 'AI Composer',
    livePreview: 'Live Preview',
    faqAndGuide: 'FAQ & Guide',
    signIn: 'Sign In',
    signOut: 'Sign Out',
    launchStudio: 'Launch Studio',
    openStudio: 'Open Studio',
    savedProjects: 'Saved Projects',
    newProject: 'New Project',
    active: 'Active',
    delete: 'Delete',
    open: 'Open',
    backToLanding: 'Back to Home',
    extract: 'Extract',
    saveAndDownload: 'Save & Download',
    generatingImage: 'Generating Image...',
    aspectRatios: 'Aspect Ratios',
    undo: 'Undo',
    redo: 'Redo',
    noSavedProjects: 'No saved projects yet',

    heroBadgeNew: 'New in 2026:',
    heroBadgeText: 'AI Multi-Screenshot Mockups & Metric Badges',
    heroTitle1: 'Create Aesthetic Photo Collages & ',
    heroTitleGradient: 'SaaS Mockups in Seconds',
    heroSubtitle: 'The free browser-based collage creator with intelligent bento layouts, metric KPI stickers, custom aspect ratios, and instant 4K Ultra-HD export. No watermark, no signup needed.',
    heroCtaStudio: 'Launch Studio Editor',
    heroCtaAi: 'Try AI Composer',
    trustNoWatermark: 'No Watermark',
    trustInstantExport: 'Instant 4K Export',
    trustPrivate: '100% Private (Runs locally)',
    trustFree: 'Free Forever',

    sandboxTitle: 'Interactive Live Sandbox',
    sandboxSubtitle: 'Test layout grids, corner radii, and aesthetic mesh backgrounds in real-time before jumping into the studio.',
    selectGridPreset: 'Select Grid Preset',
    gridGap: 'Grid Gap',
    cornerRounding: 'Corner Rounding',
    backdropTheme: 'Backdrop Theme',
    customizeInStudio: 'Customize in Studio',

    featuresTitle: 'Supercharged for Creators, Marketers & Founders',
    featuresSubtitle: 'Everything you need to craft high-converting visuals for Instagram, Product Hunt, TikTok, and websites.',
    feat1Title: 'Smart Bento & Masonry Layouts',
    feat1Desc: 'Instantly arrange 1 to 10 photos or screenshots into balanced grids, hero showcases, polaroid cards, and asymmetric bento boxes.',
    feat2Title: 'AI Composition Synthesizer',
    feat2Desc: 'Upload your product screenshots and let AI automatically balance aspect ratios, typography hierarchy, and traction metrics.',
    feat3Title: 'Precision Styling Controls',
    feat3Desc: 'Customize outer padding, cell gaps, corner rounding, multi-layer drop shadows, border strokes, and backdrop blur effortlessly.',
    feat4Title: 'Multi-Platform Aspect Ratios',
    feat4Desc: 'One-click sizing for Instagram Posts (1:1), Stories/Reels (9:16), Twitter/X & YouTube (16:9), Dribbble (4:3), and Print (A4, 3:2).',
    feat5Title: 'Mesh Gradients & Themes',
    feat5Desc: 'Curated radial gradients, dark luxury backdrops, glassmorphism card styling, and solid vibrant studio backgrounds.',
    feat6Title: '100% Private & Browser-Native',
    feat6Desc: 'Your photos never leave your device. All rasterization and high-res rendering runs client-side via hardware-accelerated Canvas.',

    aiBadge: 'Smart AI Composition',
    aiTitle: 'Curated Popular Templates & Natural Language Generator',
    aiSubtitle: 'Choose from top trending templates for Instagram, TikTok, and SaaS product launches — complete with matching aesthetic stock photos and high-conversion social proof badges.',
    aiPoint1: 'Curated photo sets matching each aesthetic mood and color palette.',
    aiPoint2: 'Natural Language Parsing: detects slot count, aspect ratios, and tags from text.',
    aiPoint3: 'Instant 1-click apply: preserves your custom photos when switching styles.',
    applyPreset: 'Apply Preset',

    faqBadge: 'Questions & Answers',
    faqTitle: 'Frequently Asked Questions',
    faqSubtitle: 'Everything you need to know about our collage studio and AI generator.',
    faq1Q: 'Is CollaGenie photo collage maker completely free?',
    faq1A: 'Yes! You can create, edit, customize layouts, use AI composition tools, and export high-resolution collages without paying any subscription fees.',
    faq2Q: 'Can I compose SaaS screenshot mockups with metric badges?',
    faq2A: 'Absolutely. CollaGenie includes built-in AI layout templates designed specifically for app showcases, allowing you to attach MRR metrics, growth badges, star ratings, and user quotes.',
    faq3Q: 'Do I need to sign up to save my work?',
    faq3A: 'No sign-up is required for instant autosave. Your collages are stored in your browser storage. Creating a free account lets you access multi-project history and manage unlimited saved collages across devices.',
    faq4Q: 'What image formats and resolutions are supported for export?',
    faq4A: 'CollaGenie supports PNG, JPEG, and WebP exports at 1x, 2x, and 4x Ultra-HD resolutions, as well as custom pixel dimensions.',
    faq5Q: 'Are my uploaded photos safe and private?',
    faq5A: 'Yes, 100%. All image cropping, filters, grid rendering, and collage synthesis happen directly inside your web browser via HTML5 Canvas. Your photos are never uploaded or saved to any external servers.',

    footerDesc: 'Intelligent, privacy-focused photo collage & mockup design studio with 4K export.',
    studioTools: 'Studio Tools',
    legalAndPrivacy: 'Legal & Privacy',
    rightsReserved: 'All rights reserved.',

    tabCanvas: 'Canvas',
    tabGrid: 'Grid',
    tabStyle: 'Style',
    tabPhotos: 'Photos',
    tabAi: 'AI',
    tabBadges: 'Badges',

    gridLayoutTemplates: 'Grid Layout Templates',
    gridLayoutSubtitle: 'Choose a balanced template based on how many photos or screenshots you want to showcase.',
    photoWord: 'Photo',
    photosWord: 'Photos',
    optionsCount: 'options',

    canvasBackground: 'Canvas Background',
    outerPadding: 'Outer Padding',
    cellSpacingGap: 'Cell Spacing (Gap)',
    cellRounding: 'Corner Rounding',
    borderStroke: 'Cell Border',
    dropShadow: 'Drop Shadow',
    shadowNone: 'None',
    shadowSubtle: 'Subtle',
    shadowMedium: 'Medium',
    shadowDeep: 'Deep',
    shadowGlow: 'Glow',

    photosHeader: 'Photo Manager',
    photosSubtitle: 'Upload photos into your collage or pick aesthetic stock images.',
    uploadBatchPhotos: 'Upload Multiple Photos',
    uploadBatchDesc: 'Drop or select JPG, PNG, WebP files',
    stockPhotosTitle: 'Aesthetic Stock Photos',
    stockPhotosSubtitle: 'Click any photo to insert into an empty slot',
    clickToInsert: 'Click to insert',

    aiStudioTitle: 'AI Composer & Magic Templates',
    aiStudioSubtitle: 'Describe the scene or choose one of our handcrafted viral layouts.',
    promptPlaceholder: 'E.g., "3 SaaS screenshots with MRR badge and dark gradient"',
    generateCollageBtn: 'Generate with AI',
    categoryAll: 'All Templates',
    categorySocial: 'Social',
    categorySaas: 'SaaS & Apps',
    categoryArt: 'Aesthetic',
    autoSynthesize: 'Auto-compose',

    badgesHeader: 'Metric Badges & Social Proof',
    badgesSubtitle: 'Attach floating MRR stats, rating stars, and status tags to your collage.',
    addCustomBadge: 'Create Custom Badge',
    badgeTitleLabel: 'Badge Title',
    badgeValueLabel: 'Metric Value (optional)',
    badgeColorLabel: 'Accent Color',
    addBadgeBtn: 'Add Badge to Canvas',
    templateBadgesTitle: 'Quick Preset Badges',
    dragBadgeHint: 'Drag badges on the canvas to reposition or scale them.',

    canvasSizeTitle: 'Canvas Size & Aspect Ratio',
    canvasSizeSubtitle: 'Choose a preset format or enter custom dimensions.',
    customDimensions: 'Custom Dimensions',
    widthLabel: 'Width (px)',
    heightLabel: 'Height (px)',
    applyDimensions: 'Apply Size',

    replacePhoto: 'Replace',
    zoomIn: 'Zoom In',
    zoomOut: 'Zoom Out',
    removePhoto: 'Delete',
    addPhoto: 'Add Photo',
    gestureHint: 'Scroll / pinch to zoom · Drag background to pan',

    exportTitle: 'Export Ultra-HD Collage',
    exportSubtitle: 'Select resolution and file format. Hardware-accelerated canvas rasterizer preserves crisp subpixels.',
    resolutionScale: 'Resolution Scale',
    fileFormat: 'File Format',
    scale1x: '1x Standard',
    scale2x: '2x High-Res',
    scale4x: '4x Ultra-HD',
  },
  ru: {
    features: 'Возможности',
    aiComposer: 'AI Генератор',
    livePreview: 'Песочница',
    faqAndGuide: 'Вопросы и ответы',
    signIn: 'Войти',
    signOut: 'Выйти',
    launchStudio: 'Открыть редактор',
    openStudio: 'В студию',
    savedProjects: 'Мои проекты',
    newProject: 'Новый проект',
    active: 'Активный',
    delete: 'Удалить',
    open: 'Открыть',
    backToLanding: 'На главную',
    extract: 'Extract',
    saveAndDownload: 'Сохранить и скачать',
    generatingImage: 'Рендеринг изображения...',
    aspectRatios: 'Формат холста',
    undo: 'Назад',
    redo: 'Вперед',
    noSavedProjects: 'Сохраненных проектов пока нет',

    heroBadgeNew: 'Новинка 2026:',
    heroBadgeText: 'AI Мокапы скриншотов и стикеры метрик',
    heroTitle1: 'Создавайте эстетичные фотоколлажи и ',
    heroTitleGradient: 'SaaS-мокапы за секунды',
    heroSubtitle: 'Бесплатный онлайн-редактор коллажей с бенто-сетками, стикерами метрик KPI, гибкими пропорциями и мгновенным экспортом в 4K Ultra-HD. Без водяных знаков и без регистрации.',
    heroCtaStudio: 'Открыть редактор',
    heroCtaAi: 'Попробовать AI режим',
    trustNoWatermark: 'Без водяных знаков',
    trustInstantExport: 'Экспорт в 4K Ultra-HD',
    trustPrivate: '100% Приватно (работает в браузере)',
    trustFree: 'Бесплатно навсегда',

    sandboxTitle: 'Интерактивная песочница',
    sandboxSubtitle: 'Протестируйте сетки, скругление углов и фоновые градиенты в реальном времени перед запуском студии.',
    selectGridPreset: 'Выберите сетку',
    gridGap: 'Отступы между фото',
    cornerRounding: 'Скругление углов',
    backdropTheme: 'Тема фона',
    customizeInStudio: 'Настроить в студии',

    featuresTitle: 'Мощный инструмент для авторов, маркетологов и фаундеров',
    featuresSubtitle: 'Все необходимое для создания конвертящих вижуалов для Instagram, Product Hunt, TikTok и сайтов.',
    feat1Title: 'Умные Bento и Masonry сетки',
    feat1Desc: 'Располагайте от 1 до 10 фотографий или скриншотов в аккуратные сетки, карточки и асимметричные бенто-блоки.',
    feat2Title: 'AI-генератор композиций',
    feat2Desc: 'Загрузите скриншоты продукта — искусственный интеллект подберет идеальные пропорции, шрифт и бейджи роста.',
    feat3Title: 'Точная настройка стиля',
    feat3Desc: 'Настраивайте внешние отступы, расстояния между слотами, радиус скругления, мягкие тени и обводку.',
    feat4Title: 'Форматы под все соцсети',
    feat4Desc: 'Готовые размеры в 1 клик для постов Instagram (1:1), Stories/Reels (9:16), Twitter/YouTube (16:9), Dribbble (4:3) и печати.',
    feat5Title: 'Градиенты и темные темы',
    feat5Desc: 'Стильные радиальные градиенты, темный премиум фон, эффект матового стекла и яркие студийные цвета.',
    feat6Title: '100% конфиденциально',
    feat6Desc: 'Ваши фото не отправляются на сервера. Вся обработка и экспорт в сверхвысоком разрешении происходят прямо на вашем устройстве.',

    aiBadge: 'Умная AI композиция',
    aiTitle: 'Популярные шаблоны и генератор по описанию',
    aiSubtitle: 'Выбирайте трендовые шаблоны для Instagram, TikTok и запусков SaaS продуктов со стильными фото и бейджами социального доказательства.',
    aiPoint1: 'Подобранные коллекции фото под каждое настроение и цветовую гамму.',
    aiPoint2: 'Распознавание запроса: автоматически определяет количество слотов и стиль.',
    aiPoint3: 'Быстрое применение: сохраняет ваши загруженные фото при смене темы.',
    applyPreset: 'Применить шаблон',

    faqBadge: 'Вопросы и ответы',
    faqTitle: 'Часто задаваемые вопросы',
    faqSubtitle: 'Всё, что вам нужно знать о редакторе коллажей и AI функциях.',
    faq1Q: 'Редактор CollaGenie полностью бесплатный?',
    faq1A: 'Да! Вы можете создавать, редактировать, менять сетки, применять AI шаблоны и экспортировать коллажи в высоком качестве без каких-либо подписок.',
    faq2Q: 'Можно ли делать мокапы скриншотов приложений с бейджами метрик?',
    faq2A: 'Конечно. В CollaGenie встроены шаблоны для презентации приложений с бейджами MRR, звездными рейтингами и отзывами клиентов.',
    faq3Q: 'Нужно ли регистрироваться для сохранения проектов?',
    faq3A: 'Регистрация не обязательна. Все ваши коллажи автоматически сохраняются в браузере. Аккаунт позволяет сохранять неограниченную историю проектов.',
    faq4Q: 'В каких форматах и разрешениях можно скачать результат?',
    faq4A: 'Поддерживается экспорт в форматах PNG, JPEG и WebP в стандартном разрешении (1x), высоком (2x) и 4K Ultra-HD (4x).',
    faq5Q: 'Безопасны ли загружаемые фотографии?',
    faq5A: 'На 100%. Вся обработка, обрезка, фильтры и рендеринг происходят локально в вашем браузере через HTML5 Canvas. Фото никуда не передаются.',

    footerDesc: 'Умная студия создания фотоколлажей и мокапов с экспортом в 4K Ultra-HD.',
    studioTools: 'Инструменты студии',
    legalAndPrivacy: 'Конфиденциальность',
    rightsReserved: 'Все права защищены.',

    tabCanvas: 'Холст',
    tabGrid: 'Сетка',
    tabStyle: 'Стиль',
    tabPhotos: 'Фото',
    tabAi: 'AI',
    tabBadges: 'Бейджи',

    gridLayoutTemplates: 'Шаблоны сеток',
    gridLayoutSubtitle: 'Выберите подходящую сетку в зависимости от количества фотографий или скриншотов.',
    photoWord: 'Фото',
    photosWord: 'Фото',
    optionsCount: 'варианта',

    canvasBackground: 'Фон холста',
    outerPadding: 'Внешние отступы',
    cellSpacingGap: 'Расстояние между фото (Gap)',
    cellRounding: 'Скругление углов',
    borderStroke: 'Обводка ячеек',
    dropShadow: 'Тень ячеек',
    shadowNone: 'Без тени',
    shadowSubtle: 'Легкая',
    shadowMedium: 'Средняя',
    shadowDeep: 'Глубокая',
    shadowGlow: 'Неоновое свечение',

    photosHeader: 'Менеджер фото',
    photosSubtitle: 'Загрузите свои фото в коллаж или выберите из готовой эстетичной коллекции.',
    uploadBatchPhotos: 'Загрузить несколько фото',
    uploadBatchDesc: 'Перетащите или выберите файлы JPG, PNG, WebP',
    stockPhotosTitle: 'Коллекция фото',
    stockPhotosSubtitle: 'Нажмите на фото, чтобы вставить его в пустой слот',
    clickToInsert: 'Нажмите для вставки',

    aiStudioTitle: 'AI Генератор и Шаблоны',
    aiStudioSubtitle: 'Опишите желаемую композицию текстом или примените вирусный шаблон.',
    promptPlaceholder: 'Например: "3 скриншота приложения с бейджем MRR и темным градиентом"',
    generateCollageBtn: 'Сгенерировать с AI',
    categoryAll: 'Все шаблоны',
    categorySocial: 'Соцсети',
    categorySaas: 'SaaS и Приложения',
    categoryArt: 'Эстетика',
    autoSynthesize: 'Автокомпозиция',

    badgesHeader: 'Бейджи метрик и Соцдоказательства',
    badgesSubtitle: 'Добавляйте на холст стикеры показателей выручки, звездные рейтинги и плашки статусов.',
    addCustomBadge: 'Создать свой бейдж',
    badgeTitleLabel: 'Заголовок бейджа',
    badgeValueLabel: 'Значение метрики (опционально)',
    badgeColorLabel: 'Цвет акцента',
    addBadgeBtn: 'Добавить бейдж на холст',
    templateBadgesTitle: 'Быстрые готовые бейджи',
    dragBadgeHint: 'Перетаскивайте бейджи прямо по холсту для изменения позиции и размера.',

    canvasSizeTitle: 'Размер холста и пропорции',
    canvasSizeSubtitle: 'Выберите готовый формат для соцсетей или задайте произвольные пиксели.',
    customDimensions: 'Произвольный размер',
    widthLabel: 'Ширина (px)',
    heightLabel: 'Высота (px)',
    applyDimensions: 'Применить размер',

    replacePhoto: 'Заменить',
    zoomIn: 'Приблизить',
    zoomOut: 'Отдалить',
    removePhoto: 'Удалить',
    addPhoto: 'Добавить фото',
    gestureHint: 'Скролл / щипок для зума · Перетащите фон для панорамирования',

    exportTitle: 'Экспорт в Ultra-HD',
    exportSubtitle: 'Выберите разрешение и формат файла. Аппаратный рендеринг сохраняет четкость каждого пикселя.',
    resolutionScale: 'Качество разрешения',
    fileFormat: 'Формат файла',
    scale1x: '1x Стандарт',
    scale2x: '2x Высокое (Retina)',
    scale4x: '4x Ultra-HD (4K)',
  },
  ua: {
    features: 'Можливості',
    aiComposer: 'AI Генератор',
    livePreview: 'Пісочниця',
    faqAndGuide: 'Питання та відповіді',
    signIn: 'Увійти',
    signOut: 'Вийти',
    launchStudio: 'Відкрити студію',
    openStudio: 'До студії',
    savedProjects: 'Мої проєкти',
    newProject: 'Новий проєкт',
    active: 'Активний',
    delete: 'Видалити',
    open: 'Відкрити',
    backToLanding: 'На головну',
    extract: 'Extract',
    saveAndDownload: 'Зберегти та завантажити',
    generatingImage: 'Рендеринг зображення...',
    aspectRatios: 'Формат полотна',
    undo: 'Назад',
    redo: 'Вперед',
    noSavedProjects: 'Збережених проєктів поки немає',

    heroBadgeNew: 'Новинка 2026:',
    heroBadgeText: 'AI Мокапи скріншотів та стікери метрик',
    heroTitle1: 'Створюйте естетичні фотоколажі та ',
    heroTitleGradient: 'SaaS-мокапи за лічені секунди',
    heroSubtitle: 'Безкоштовний онлайн-редактор колажів з бенто-сітками, стікерами метрик KPI, гнучкими пропорціями та миттєвим експортом у 4K Ultra-HD. Без водяних знаків та без реєстрації.',
    heroCtaStudio: 'Запустити студію',
    heroCtaAi: 'Спробувати AI режим',
    trustNoWatermark: 'Без водяних знаків',
    trustInstantExport: 'Експорт у 4K Ultra-HD',
    trustPrivate: '100% Приватно (працює у браузері)',
    trustFree: 'Безкоштовно назавжди',

    sandboxTitle: 'Інтерактивна пісочниця',
    sandboxSubtitle: 'Протестуйте сітки, заокруглення кутів та фонові градієнти у реальному часі перед запуском редактора.',
    selectGridPreset: 'Оберіть сітку',
    gridGap: 'Відступи між фото',
    cornerRounding: 'Заокруглення кутів',
    backdropTheme: 'Тема фону',
    customizeInStudio: 'Налаштувати в студії',

    featuresTitle: 'Потужний інструмент для авторів, маркетологів та фаундерів',
    featuresSubtitle: 'Усе необхідне для створення конверсійних візуалів для Instagram, Product Hunt, TikTok та вебсайтів.',
    feat1Title: 'Розумні Bento та Masonry сітки',
    feat1Desc: 'Розташовуйте від 1 до 10 фотографій або скріншотів у акуратні сітки, картки та асиметричні бенто-блоки.',
    feat2Title: 'AI-генератор композицій',
    feat2Desc: 'Завантажте скріншоти продукту — штучний інтелект підбере ідеальні пропорції, шрифт та бейджі зростання.',
    feat3Title: 'Точне налаштування стилю',
    feat3Desc: 'Налаштовуйте зовнішні відступи, відстань між слотами, радіус заокруглення, м’які тіні та обводку.',
    feat4Title: 'Формати під усі соцмережі',
    feat4Desc: 'Готові розміри в 1 клік для дописів Instagram (1:1), Stories/Reels (9:16), Twitter/YouTube (16:9), Dribbble (4:3) та друку.',
    feat5Title: 'Градієнти та темні теми',
    feat5Desc: 'Стильні радіальні градієнти, темний преміум фон, ефект матового скла та яскраві студійні кольори.',
    feat6Title: '100% конфіденційно',
    feat6Desc: 'Ваші фото не відправляються на сервери. Уся обробка та експорт у надвисокій якості відбуваються локально на вашому пристрої.',

    aiBadge: 'Розумна AI композиція',
    aiTitle: 'Популярні шаблони та генератор за описом',
    aiSubtitle: 'Обирайте трендові шаблони для Instagram, TikTok та запусків SaaS продуктів зі стильними фото та бейджами соціального доказу.',
    aiPoint1: 'Підібрані колекції фото під кожен настрій та колірну гаму.',
    aiPoint2: 'Розпізнавання запиту: автоматично визначає кількість слотів та стиль.',
    aiPoint3: 'Швидке застосування: зберігає ваші завантажені фото при зміні стилю.',
    applyPreset: 'Застосувати шаблон',

    faqBadge: 'Питання та відповіді',
    faqTitle: 'Часті запитання',
    faqSubtitle: 'Усе, що вам потрібно знати про наш редактор колажів та AI функції.',
    faq1Q: 'Чи редактор CollaGenie повністю безкоштовний?',
    faq1A: 'Так! Ви можете створювати, редагувати, змінювати сітки, застосовувати AI шаблони та експортувати колажі у високій якості без будь-яких підписок.',
    faq2Q: 'Чи можна створювати мокапи скріншотів додатків з бейджами метрик?',
    faq2A: 'Звісно. У CollaGenie вбудовані шаблони для презентації додатків з бейджами MRR, зірковими рейтингами та відгуками клієнтів.',
    faq3Q: 'Чи потрібно реєструватися для збереження проєктів?',
    faq3A: 'Реєстрація не обов’язкова. Усі ваші колажі автоматично зберігаються у браузері. Акаунт дозволяє зберігати необмежену історію проєктів.',
    faq4Q: 'У яких форматах та розмірах можна завантажити результат?',
    faq4A: 'Підтримується експорт у форматах PNG, JPEG та WebP у стандартній якості (1x), високій (2x) та 4K Ultra-HD (4x).',
    faq5Q: 'Чи безпечні завантажені фотографії?',
    faq5A: 'На 100%. Уся обробка, обрізка, фільтри та рендеринг відбуваються локально у вашому браузері через HTML5 Canvas. Фото нікуди не передаються.',

    footerDesc: 'Розумна студія створення фотоколажів та мокапів з експортом у 4K Ultra-HD.',
    studioTools: 'Інструменти студії',
    legalAndPrivacy: 'Конфіденційність',
    rightsReserved: 'Усі права захищені.',

    tabCanvas: 'Полотно',
    tabGrid: 'Сітка',
    tabStyle: 'Стиль',
    tabPhotos: 'Фото',
    tabAi: 'AI',
    tabBadges: 'Бейджі',

    gridLayoutTemplates: 'Шаблони сіток',
    gridLayoutSubtitle: 'Оберіть збалансований шаблон відповідно до кількості фото або скріншотів.',
    photoWord: 'Фото',
    photosWord: 'Фото',
    optionsCount: 'варіанти',

    canvasBackground: 'Фон полотна',
    outerPadding: 'Зовнішні відступи',
    cellSpacingGap: 'Відстань між фото (Gap)',
    cellRounding: 'Заокруглення кутів',
    borderStroke: 'Обводка комірок',
    dropShadow: 'Тінь комірок',
    shadowNone: 'Без тіні',
    shadowSubtle: 'Легка',
    shadowMedium: 'Середня',
    shadowDeep: 'Глибока',
    shadowGlow: 'Неонове сяйво',

    photosHeader: 'Менеджер фото',
    photosSubtitle: 'Завантажуйте свої фото в колаж або обирайте з готової колекції.',
    uploadBatchPhotos: 'Завантажити кілька фото',
    uploadBatchDesc: 'Перетягніть або виберіть файли JPG, PNG, WebP',
    stockPhotosTitle: 'Колекція фото',
    stockPhotosSubtitle: 'Натисніть на фото, щоб вставити його в порожній слот',
    clickToInsert: 'Натисніть для вставки',

    aiStudioTitle: 'AI Генератор та Шаблони',
    aiStudioSubtitle: 'Опишіть бажану композицію або застосуйте вірусний шаблон.',
    promptPlaceholder: 'Наприклад: "3 скріншоти додатку з бейджем MRR та темним градієнтом"',
    generateCollageBtn: 'Згенерувати з AI',
    categoryAll: 'Усі шаблони',
    categorySocial: 'Соцмережі',
    categorySaas: 'SaaS та Додатки',
    categoryArt: 'Естетика',
    autoSynthesize: 'Автокомпозиція',

    badgesHeader: 'Бейджі метрик та Соцдоказу',
    badgesSubtitle: 'Додавайте на полотно стікери показників прибутку, зіркові рейтинги та плашки статусів.',
    addCustomBadge: 'Створити власний бейдж',
    badgeTitleLabel: 'Заголовок бейджа',
    badgeValueLabel: 'Значення метрики (опціонально)',
    badgeColorLabel: 'Колір акценту',
    addBadgeBtn: 'Додати бейдж на полотно',
    templateBadgesTitle: 'Швидкі готові бейджі',
    dragBadgeHint: 'Перетягуйте бейджі прямо по полотну для зміни позиції та розміру.',

    canvasSizeTitle: 'Розмір полотна та пропорції',
    canvasSizeSubtitle: 'Оберіть готовий формат для соцмереж або задайте довільні пікселі.',
    customDimensions: 'Довільний розмір',
    widthLabel: 'Ширина (px)',
    heightLabel: 'Висота (px)',
    applyDimensions: 'Застосувати розмір',

    replacePhoto: 'Замінити',
    zoomIn: 'Збільшити',
    zoomOut: 'Зменшити',
    removePhoto: 'Видалити',
    addPhoto: 'Додати фото',
    gestureHint: 'Скрол / щипок для зуму · Перетягніть фон для панорамування',

    exportTitle: 'Експорт у Ultra-HD',
    exportSubtitle: 'Оберіть роздільну здатність та формат файлу. Апаратний рендеринг зберігає чіткість кожного пікселя.',
    resolutionScale: 'Якість роздільної здатності',
    fileFormat: 'Формат файлу',
    scale1x: '1x Стандарт',
    scale2x: '2x Висока (Retina)',
    scale4x: '4x Ultra-HD (4K)',
  },
};
