import { MetricBadge, CollageState, BackgroundConfig, CollageCell } from '../types';
import { LAYOUT_PRESETS } from './layoutEngine';

export interface PopularCollageTemplate {
  id: string;
  name: string;
  category: 'trending' | 'social' | 'saas' | 'aesthetic' | 'ecommerce' | 'memory';
  badgeLabel: string;
  photoCount: number;
  aspectRatio: '1:1' | '4:5' | '9:16' | '16:9' | '4:3';
  description: string;
  layoutTemplateId: string;
  defaultImages: string[];
  styling: {
    gap: number;
    padding: number;
    cellRadius: number;
    canvasRadius: number;
    cellShadow: CollageState['cellShadow'];
    background: BackgroundConfig;
    cellBorderWidth: number;
    cellBorderColor: string;
  };
  defaultBadges: Omit<MetricBadge, 'id'>[];
}

export const POPULAR_TEMPLATES: PopularCollageTemplate[] = [
  {
    id: 'instagram-aesthetic-moodboard',
    name: 'Aesthetic Film & Moodboard',
    category: 'aesthetic',
    badgeLabel: '🔥 Trending #1',
    photoCount: 4,
    aspectRatio: '4:5',
    description: 'Anti-polish warm tone moodboard with film aesthetic, soft shadows, and muted backdrop.',
    layoutTemplateId: '4-bento-card',
    defaultImages: [
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&auto=format&fit=crop&q=80',
    ],
    styling: {
      gap: 14,
      padding: 20,
      cellRadius: 18,
      canvasRadius: 24,
      cellShadow: 'lg',
      cellBorderWidth: 1,
      cellBorderColor: 'rgba(255, 255, 255, 0.12)',
      background: {
        type: 'gradient',
        color: '#1c1917',
        gradient: {
          from: '#292524',
          via: '#1c1917',
          to: '#0c0a09',
          direction: 'to-br',
        },
      },
    },
    defaultBadges: [
      {
        type: 'tag',
        title: 'Vibe & Aesthetic',
        value: '✨ Golden Mood • 2026',
        color: 'amber',
        x: 8,
        y: 8,
        scale: 0.95,
      },
    ],
  },
  {
    id: 'saas-product-launch-hero',
    name: 'SaaS Launch & Traction Proof',
    category: 'saas',
    badgeLabel: '🚀 High CTR',
    photoCount: 4,
    aspectRatio: '16:9',
    description: 'Dominant hero product dashboard with companion detail cards and verifiable KPI badges.',
    layoutTemplateId: '4-hero-left',
    defaultImages: [
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=80',
    ],
    styling: {
      gap: 16,
      padding: 24,
      cellRadius: 20,
      canvasRadius: 24,
      cellShadow: '2xl',
      cellBorderWidth: 1,
      cellBorderColor: 'rgba(99, 102, 241, 0.25)',
      background: {
        type: 'gradient',
        color: '#0f172a',
        gradient: {
          from: '#0f172a',
          via: '#1e1b4b',
          to: '#311042',
          direction: 'to-br',
        },
      },
    },
    defaultBadges: [
      {
        type: 'metric',
        title: 'Monthly Recurring',
        value: '$48,200 MRR (+142%)',
        color: 'emerald',
        x: 10,
        y: 12,
        scale: 1.0,
      },
      {
        type: 'rating',
        title: 'Product of the Day #1',
        value: '⭐ 4.9 (850+ reviews)',
        color: 'amber',
        x: 65,
        y: 10,
        scale: 0.95,
      },
    ],
  },
  {
    id: 'bento-grid-modern-ui',
    name: 'Modern Bento Box (5 Cards)',
    category: 'trending',
    badgeLabel: '⚡ Bento Style',
    photoCount: 5,
    aspectRatio: '16:9',
    description: 'Clean asymmetric Bento cards ideal for multi-feature showcases or portfolio case studies.',
    layoutTemplateId: '5-bento-hero',
    defaultImages: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=600&auto=format&fit=crop&q=80',
    ],
    styling: {
      gap: 14,
      padding: 22,
      cellRadius: 18,
      canvasRadius: 22,
      cellShadow: 'xl',
      cellBorderWidth: 1,
      cellBorderColor: 'rgba(255, 255, 255, 0.15)',
      background: {
        type: 'gradient',
        color: '#09090b',
        gradient: {
          from: '#09090b',
          to: '#18181b',
          direction: 'to-b',
        },
      },
    },
    defaultBadges: [
      {
        type: 'tag',
        title: 'Core Engine',
        value: '⚡ 99/100 Lighthouse',
        color: 'emerald',
        x: 8,
        y: 10,
        scale: 0.9,
      },
    ],
  },
  {
    id: 'tiktok-story-vertical',
    name: 'Story & Reels Vertical Mosaic',
    category: 'social',
    badgeLabel: '📱 9:16 Viral',
    photoCount: 3,
    aspectRatio: '9:16',
    description: 'Full vertical screen storytelling layout for TikTok, Instagram Reels, and Shorts.',
    layoutTemplateId: '3-hero-top',
    defaultImages: [
      'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&auto=format&fit=crop&q=80',
    ],
    styling: {
      gap: 12,
      padding: 16,
      cellRadius: 20,
      canvasRadius: 28,
      cellShadow: 'xl',
      cellBorderWidth: 1,
      cellBorderColor: 'rgba(255, 255, 255, 0.2)',
      background: {
        type: 'gradient',
        color: '#022c22',
        gradient: {
          from: '#064e3b',
          via: '#022c22',
          to: '#0f172a',
          direction: 'to-b',
        },
      },
    },
    defaultBadges: [
      {
        type: 'tag',
        title: 'Destination',
        value: '🌴 Tropical Escape 2026',
        color: 'emerald',
        x: 10,
        y: 6,
        scale: 1.0,
      },
    ],
  },
  {
    id: 'before-after-split-diff',
    name: 'Before vs After Split',
    category: 'ecommerce',
    badgeLabel: '⚖️ Split Diff',
    photoCount: 2,
    aspectRatio: '16:9',
    description: 'Clean side-by-side comparison with high-contrast result stickers.',
    layoutTemplateId: '2-split-v',
    defaultImages: [
      'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80',
    ],
    styling: {
      gap: 16,
      padding: 24,
      cellRadius: 20,
      canvasRadius: 24,
      cellShadow: '2xl',
      cellBorderWidth: 1,
      cellBorderColor: 'rgba(255, 255, 255, 0.15)',
      background: {
        type: 'gradient',
        color: '#020617',
        gradient: {
          from: '#020617',
          to: '#0f172a',
          direction: 'to-r',
        },
      },
    },
    defaultBadges: [
      {
        type: 'tag',
        title: 'Status',
        value: '❌ Before (Legacy)',
        color: 'rose',
        x: 8,
        y: 10,
        scale: 1.0,
      },
      {
        type: 'tag',
        title: 'Status',
        value: '✅ After (+320% Speed)',
        color: 'emerald',
        x: 55,
        y: 10,
        scale: 1.0,
      },
    ],
  },
  {
    id: 'classic-gallery-3x2',
    name: 'Classic 6-Photo Gallery',
    category: 'memory',
    badgeLabel: '🖼️ 6 Photos',
    photoCount: 6,
    aspectRatio: '16:9',
    description: 'Balanced 3x2 grid for photography albums, travel recaps, and portfolio galleries.',
    layoutTemplateId: '6-grid-3x2',
    defaultImages: [
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600&auto=format&fit=crop&q=80',
    ],
    styling: {
      gap: 12,
      padding: 18,
      cellRadius: 14,
      canvasRadius: 20,
      cellShadow: 'md',
      cellBorderWidth: 1,
      cellBorderColor: 'rgba(255, 255, 255, 0.1)',
      background: {
        type: 'gradient',
        color: '#172554',
        gradient: {
          from: '#172554',
          via: '#1e3a8a',
          to: '#0284c7',
          direction: 'to-br',
        },
      },
    },
    defaultBadges: [
      {
        type: 'tag',
        title: 'Collection',
        value: '📸 Highlights Collection',
        color: 'blue',
        x: 6,
        y: 8,
        scale: 0.9,
      },
    ],
  },
];

// Natural Language Prompt Parser
export interface ParsedPromptResult {
  photoCount?: number;
  aspectRatio?: '1:1' | '4:5' | '9:16' | '16:9' | '4:3' | '3:2' | 'A4';
  styleTheme?: 'dark' | 'emerald' | 'sunset' | 'indigo' | 'warm' | 'clean';
  detectedThemeName: string;
  tagsToInject: string[];
}

export function parseUserPrompt(promptText: string): ParsedPromptResult {
  const text = promptText.toLowerCase();
  const result: ParsedPromptResult = {
    detectedThemeName: 'Custom AI Request',
    tagsToInject: [],
  };

  // 1. Detect Photo Count
  const countMatch = text.match(/(\d+)\s*(?:картин|фото|скрин|изображен|photo|image|pic|slot)/i) ||
                     text.match(/(?:на|for|из|with)\s*(\d+)\s*(?:картин|фото|скрин|photo|pic)/i);
  if (countMatch && countMatch[1]) {
    const num = parseInt(countMatch[1], 10);
    if (num >= 1 && num <= 10) {
      result.photoCount = num;
    }
  } else {
    // Word numbers
    if (text.includes('две') || text.includes('два') || text.includes('two') || text.includes('2')) result.photoCount = 2;
    else if (text.includes('три') || text.includes('three') || text.includes('3')) result.photoCount = 3;
    else if (text.includes('четыре') || text.includes('four') || text.includes('4')) result.photoCount = 4;
    else if (text.includes('пять') || text.includes('five') || text.includes('5')) result.photoCount = 5;
    else if (text.includes('шесть') || text.includes('six') || text.includes('6')) result.photoCount = 6;
    else if (text.includes('восемь') || text.includes('eight') || text.includes('8')) result.photoCount = 8;
    else if (text.includes('десять') || text.includes('ten') || text.includes('10')) result.photoCount = 10;
  }

  // 2. Detect Aspect Ratio / Formats
  if (text.includes('инст') || text.includes('instagram') || text.includes('портрет') || text.includes('4:5') || text.includes('4/5')) {
    result.aspectRatio = '4:5';
  } else if (text.includes('сторис') || text.includes('story') || text.includes('reels') || text.includes('shorts') || text.includes('9:16') || text.includes('вертикал') || text.includes('vertical')) {
    result.aspectRatio = '9:16';
  } else if (text.includes('квадрат') || text.includes('square') || text.includes('1:1') || text.includes('1/1')) {
    result.aspectRatio = '1:1';
  } else if (text.includes('твит') || text.includes('twitter') || text.includes('ютуб') || text.includes('youtube') || text.includes('16:9') || text.includes('горизонтал') || text.includes('horizontal') || text.includes('ландшафт')) {
    result.aspectRatio = '16:9';
  } else if (text.includes('дрейббл') || text.includes('dribbble') || text.includes('4:3')) {
    result.aspectRatio = '4:3';
  } else if (text.includes('печать') || text.includes('print') || text.includes('a4') || text.includes('постер')) {
    result.aspectRatio = 'A4';
  }

  // 3. Detect Aesthetic/Category Tags
  if (text.includes('saas') || text.includes('стартап') || text.includes('метрики') || text.includes('mrr') || text.includes('launch') || text.includes('продукт')) {
    result.styleTheme = 'indigo';
    result.detectedThemeName = 'SaaS Launch & KPI';
    result.tagsToInject.push('$54,000 MRR (+165%)', '⭐ 5.0 Top Rated');
  } else if (text.includes('путешеств') || text.includes('travel') || text.includes('отпуск') || text.includes('море') || text.includes('sunset') || text.includes('закат')) {
    result.styleTheme = 'sunset';
    result.detectedThemeName = 'Travel & Sunset Memory';
    result.tagsToInject.push('📍 Sunset Memories 2026', '✨ Golden Hour');
  } else if (text.includes('бенто') || text.includes('bento') || text.includes('tech') || text.includes('минимал') || text.includes('minimal')) {
    result.styleTheme = 'dark';
    result.detectedThemeName = 'Modern Bento Grid';
    result.tagsToInject.push('⚡ 99/100 Lighthouse Speed');
  } else if (text.includes('до и после') || text.includes('before') || text.includes('after') || text.includes('сравнен')) {
    result.styleTheme = 'dark';
    result.detectedThemeName = 'Before vs After';
    result.tagsToInject.push('❌ Before Legacy', '✅ After Optimized');
    if (!result.photoCount) result.photoCount = 2;
  }

  return result;
}

// Generate full collage state from template or NLP prompt
export function applyPopularTemplate(
  templateId: string,
  userImages: string[] = []
): Partial<CollageState> {
  const template = POPULAR_TEMPLATES.find(t => t.id === templateId) || POPULAR_TEMPLATES[0];
  const layout = LAYOUT_PRESETS.find(p => p.id === template.layoutTemplateId) || LAYOUT_PRESETS[3];

  const imagesToUse = userImages.length > 0
    ? userImages
    : template.defaultImages;

  const cells: CollageCell[] = layout.cells.map((cellGeo, idx) => ({
    id: `cell-${Date.now()}-${idx}`,
    ...cellGeo,
    imageUrl: imagesToUse[idx % imagesToUse.length],
    zoom: 1.0,
    offsetX: 0,
    offsetY: 0,
    rotate: 0,
    filter: 'none',
  }));

  const badges: MetricBadge[] = template.defaultBadges.map((b, idx) => ({
    ...b,
    id: `badge-${Date.now()}-${idx}`,
  }));

  return {
    layoutTemplateId: layout.id,
    aspectRatio: template.aspectRatio,
    ...template.styling,
    cells,
    badges,
  };
}

export function synthesizePromptToCollage(
  promptText: string,
  userImages: string[] = []
): Partial<CollageState> {
  const parsed = parseUserPrompt(promptText);
  const count = parsed.photoCount || (userImages.length > 0 ? userImages.length : 4);
  const aspect = parsed.aspectRatio || '16:9';

  // Find best matching layout preset
  const matchingPresets = LAYOUT_PRESETS.filter(p => p.photoCount === count);
  const layout = matchingPresets[0] || LAYOUT_PRESETS[3];

  // Pick theme styling
  let bg: BackgroundConfig = {
    type: 'gradient',
    color: '#0f172a',
    gradient: {
      from: '#0f172a',
      via: '#1e1b4b',
      to: '#311042',
      direction: 'to-br',
    },
  };

  if (parsed.styleTheme === 'sunset') {
    bg = {
      type: 'gradient',
      color: '#451a03',
      gradient: {
        from: '#451a03',
        via: '#292524',
        to: '#1c1917',
        direction: 'to-br',
      },
    };
  } else if (parsed.styleTheme === 'dark') {
    bg = {
      type: 'gradient',
      color: '#09090b',
      gradient: {
        from: '#09090b',
        to: '#18181b',
        direction: 'to-b',
      },
    };
  }

  // Stock library fallback
  const stockFallback = [
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&auto=format&fit=crop&q=80',
  ];

  const imagesToUse = userImages.length > 0 ? userImages : stockFallback;

  const cells: CollageCell[] = layout.cells.map((cellGeo, idx) => ({
    id: `cell-${Date.now()}-${idx}`,
    ...cellGeo,
    imageUrl: imagesToUse[idx % imagesToUse.length],
    zoom: 1.0,
    offsetX: 0,
    offsetY: 0,
    rotate: 0,
    filter: 'none',
  }));

  const badges: MetricBadge[] = [];

  if (parsed.tagsToInject.length > 0) {
    parsed.tagsToInject.forEach((tagText, idx) => {
      badges.push({
        id: `badge-${Date.now()}-${idx}`,
        type: 'tag',
        title: idx === 0 ? 'Highlight' : 'Feature',
        value: tagText,
        color: idx === 0 ? 'emerald' : 'amber',
        x: 10 + idx * 45,
        y: 10,
        scale: 0.95,
      });
    });
  } else {
    badges.push({
      id: `badge-prompt-${Date.now()}`,
      type: 'tag',
      title: 'AI Smart Grid',
      value: `🎯 ${promptText.slice(0, 26)}${promptText.length > 26 ? '...' : ''}`,
      color: 'indigo',
      x: 10,
      y: 10,
      scale: 0.95,
    });
  }

  return {
    layoutTemplateId: layout.id,
    aspectRatio: aspect,
    gap: 14,
    padding: 22,
    cellRadius: 18,
    canvasRadius: 24,
    cellShadow: '2xl',
    cellBorderWidth: 1,
    cellBorderColor: 'rgba(255, 255, 255, 0.15)',
    background: bg,
    cells,
    badges,
  };
}
