import { Language } from './i18n';

// ── Layout Presets Translations ──────────────────────────────────────────────
export const PRESET_TRANSLATIONS: Record<string, Record<Language, { name: string; category: string }>> = {
  '1-single': {
    en: { name: 'Single Full Canvas', category: 'Grid' },
    ru: { name: 'Одиночный холст', category: 'Сетка' },
    ua: { name: 'Одиночне полотно', category: 'Сітка' },
  },
  '2-split-v': {
    en: { name: '2 Split Vertical', category: 'Split' },
    ru: { name: '2 Вертикальных слота', category: 'Сплит' },
    ua: { name: '2 Вертикальні слоти', category: 'Спліт' },
  },
  '2-split-h': {
    en: { name: '2 Split Horizontal', category: 'Split' },
    ru: { name: '2 Горизонтальных слота', category: 'Сплит' },
    ua: { name: '2 Горизонтальні слоти', category: 'Спліт' },
  },
  '3-hero-left': {
    en: { name: '3 Hero Left + 2 Stack', category: 'Hero' },
    ru: { name: '3 Главное слева + 2 справа', category: 'Главное' },
    ua: { name: '3 Головне зліва + 2 справа', category: 'Головне' },
  },
  '3-hero-top': {
    en: { name: '3 Hero Top + 2 Bottom', category: 'Hero' },
    ru: { name: '3 Главное сверху + 2 снизу', category: 'Главное' },
    ua: { name: '3 Головне зверху + 2 знизу', category: 'Головне' },
  },
  '3-columns': {
    en: { name: '3 Columns Gallery', category: 'Grid' },
    ru: { name: '3 Колонки', category: 'Сетка' },
    ua: { name: '3 Колонки', category: 'Сітка' },
  },
  '4-quad-grid': {
    en: { name: '4 Equal Grid (2x2)', category: 'Grid' },
    ru: { name: '4 Равных слота (2x2)', category: 'Сетка' },
    ua: { name: '4 Рівні слоти (2x2)', category: 'Сітка' },
  },
  '4-hero-left': {
    en: { name: '4 Hero Left + 3 Right', category: 'Hero' },
    ru: { name: '4 Главное слева + 3 справа', category: 'Главное' },
    ua: { name: '4 Головне зліва + 3 справа', category: 'Головне' },
  },
  '4-bento-card': {
    en: { name: '4 Bento Layout', category: 'Bento' },
    ru: { name: '4 Бенто-композиция', category: 'Бенто' },
    ua: { name: '4 Бенто-композиція', category: 'Бенто' },
  },
  '5-bento-hero': {
    en: { name: '5 Modern Bento (Hero + 4)', category: 'Bento' },
    ru: { name: '5 Модерн Бенто (Главное + 4)', category: 'Бенто' },
    ua: { name: '5 Модерн Бенто (Головне + 4)', category: 'Бенто' },
  },
  '5-mosaic-top': {
    en: { name: '5 Mosaic (2 Top + 3 Bottom)', category: 'Grid' },
    ru: { name: '5 Мозаика (2 верх + 3 низ)', category: 'Сетка' },
    ua: { name: '5 Мозаїка (2 зверху + 3 знизу)', category: 'Сітка' },
  },
  '6-grid-3x2': {
    en: { name: '6 Classic Grid (3x2)', category: 'Grid' },
    ru: { name: '6 Классическая сетка (3x2)', category: 'Сетка' },
    ua: { name: '6 Класична сітка (3x2)', category: 'Сітка' },
  },
  '6-bento-heavy': {
    en: { name: '6 Bento Showcase', category: 'Bento' },
    ru: { name: '6 Бенто-витрина', category: 'Бенто' },
    ua: { name: '6 Бенто-вітрина', category: 'Бенто' },
  },
  '8-gallery-grid': {
    en: { name: '8 Grid (4x2)', category: 'Grid' },
    ru: { name: '8 Слотов (4x2)', category: 'Сетка' },
    ua: { name: '8 Слотів (4x2)', category: 'Сітка' },
  },
  '10-mega-bento': {
    en: { name: '10 Mega Showcase', category: 'Hero' },
    ru: { name: '10 Мега-витрина', category: 'Главное' },
    ua: { name: '10 Мега-вітрина', category: 'Головне' },
  },
};

// ── AI Templates Translations ────────────────────────────────────────────────
export const TEMPLATE_TRANSLATIONS: Record<string, Record<Language, { name: string; description: string; category: string }>> = {
  'instagram-aesthetic-moodboard': {
    en: {
      name: 'Aesthetic Film & Moodboard',
      description: 'Anti-polish warm tone moodboard with film aesthetic, soft shadows, and muted backdrop.',
      category: 'Aesthetic',
    },
    ru: {
      name: 'Эстетичный мудборд и плёнка',
      description: 'Теплый винтажный мудборд с эстетикой пленочных кадров, мягкими тенями и стильным фоном.',
      category: 'Эстетика',
    },
    ua: {
      name: 'Естетичний мудборд та плівка',
      description: 'Теплий вінтажний мудборд з естетикою плівкових кадрів, м’якими тінями та стильним фоном.',
      category: 'Естетика',
    },
  },
  'saas-product-launch-hero': {
    en: {
      name: 'SaaS Launch & Traction Proof',
      description: 'Dominant hero product dashboard with companion detail cards and verifiable KPI badges.',
      category: 'SaaS & Apps',
    },
    ru: {
      name: 'Запуск SaaS и бейджи роста',
      description: 'Главный дашборд продукта с дополнительными карточками и проверяемыми KPI метриками.',
      category: 'SaaS и Приложения',
    },
    ua: {
      name: 'Запуск SaaS та бейджі зростання',
      description: 'Головний дашборд продукту з додатковими картками та перевіреними KPI метриками.',
      category: 'SaaS та Додатки',
    },
  },
  'bento-grid-modern-ui': {
    en: {
      name: 'Modern Bento Box (5 Cards)',
      description: 'Clean asymmetric Bento cards ideal for multi-feature showcases or portfolio case studies.',
      category: 'Trending',
    },
    ru: {
      name: 'Современный Бенто-бокс (5 карточек)',
      description: 'Асимметричные бенто-блоки, идеально подходящие для обзора фич или кейсов портфолио.',
      category: 'Тренды',
    },
    ua: {
      name: 'Сучасний Бенто-бокс (5 карток)',
      description: 'Асиметричні бенто-блоки, ідеальні для огляду функцій або кейсів портфоліо.',
      category: 'Тренди',
    },
  },
  'tiktok-story-vertical': {
    en: {
      name: 'Story & Reels Vertical Mosaic',
      description: 'Ultra-engaging full-screen 9:16 vertical stack built for TikTok, Stories, and Reels.',
      category: 'Social',
    },
    ru: {
      name: 'Вертикальная мозаика для Stories & Reels',
      description: 'Полноэкранный вертикальный формат 9:16 для TikTok, Stories и Reels с яркими акцентами.',
      category: 'Соцсети',
    },
    ua: {
      name: 'Вертикальна мозаїка для Stories & Reels',
      description: 'Повноекранний вертикальний формат 9:16 для TikTok, Stories та Reels з яскравими акцентами.',
      category: 'Соцмережі',
    },
  },
  'travel-memory-scrapbook': {
    en: {
      name: 'Travel Recap & Polaroids',
      description: 'Polaroid-inspired cards with pinned location badges, deep emerald ambient glow.',
      category: 'Aesthetic',
    },
    ru: {
      name: 'Путешествия и Polaroid кадры',
      description: 'Карточки в стиле Polaroid с геолокацией и глубоким изумрудным градиентом.',
      category: 'Эстетика',
    },
    ua: {
      name: 'Подорожі та Polaroid кадри',
      description: 'Картки у стилі Polaroid з геолокацією та глибоким смарагдовим градієнтом.',
      category: 'Естетика',
    },
  },
  'before-after-split-diff': {
    en: {
      name: 'Before vs After Split',
      description: 'Clean side-by-side comparison with high-contrast result stickers.',
      category: 'SaaS & Apps',
    },
    ru: {
      name: 'Сравнение «До и После»',
      description: 'Наглядное сравнение бок о бок с яркими стикерами результатов и тегов.',
      category: 'SaaS и Приложения',
    },
    ua: {
      name: 'Порівняння «До та Після»',
      description: 'Наочне порівняння пліч-о-пліч з яскравими стікерами результатів та тегів.',
      category: 'SaaS та Додатки',
    },
  },
  'classic-gallery-3x2': {
    en: {
      name: 'Classic 6-Photo Gallery',
      description: 'Balanced 3x2 grid for photography albums, travel recaps, and portfolio galleries.',
      category: 'Social',
    },
    ru: {
      name: 'Классическая галерея (6 фото)',
      description: 'Сбалансированная сетка 3x2 для фотоальбомов, отчетов и галерей портфолио.',
      category: 'Соцсети',
    },
    ua: {
      name: 'Класична галерея (6 фото)',
      description: 'Збалансована сітка 3x2 для фотоальбомів, звітів та галерей портфоліо.',
      category: 'Соцмережі',
    },
  },
};

export function getPresetI18n(presetId: string, fallbackName: string, fallbackCat: string, lang: Language) {
  const item = PRESET_TRANSLATIONS[presetId]?.[lang];
  return {
    name: item?.name || fallbackName,
    category: item?.category || fallbackCat,
  };
}

export function getTemplateI18n(templateId: string, fallbackName: string, fallbackDesc: string, fallbackCat: string, lang: Language) {
  const item = TEMPLATE_TRANSLATIONS[templateId]?.[lang];
  return {
    name: item?.name || fallbackName,
    description: item?.description || fallbackDesc,
    category: item?.category || fallbackCat,
  };
}
