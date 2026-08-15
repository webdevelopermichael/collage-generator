import { AspectRatioOption, LayoutPreset } from '../types';

export const ASPECT_RATIOS: AspectRatioOption[] = [
  { id: '1:1', label: '1:1', sublabel: 'Square / IG Post', width: 1080, height: 1080 },
  { id: '4:5', label: '4:5', sublabel: 'IG Portrait', width: 1080, height: 1350 },
  { id: '9:16', label: '9:16', sublabel: 'Story / Reels / TikTok', width: 1080, height: 1920 },
  { id: '16:9', label: '16:9', sublabel: 'Twitter / YouTube', width: 1920, height: 1080 },
  { id: '4:3', label: '4:3', sublabel: 'Dribbble / Tablet', width: 1600, height: 1200 },
  { id: '3:2', label: '3:2', sublabel: 'Photo Classic', width: 1500, height: 1000 },
  { id: 'A4', label: 'A4', sublabel: 'Print Poster', width: 1240, height: 1754 },
  { id: 'custom', label: 'Custom', sublabel: 'Manual W × H', width: 1200, height: 800 },
];

export const LAYOUT_PRESETS: LayoutPreset[] = [
  // 1 Photo
  {
    id: '1-single',
    name: 'Single Full Canvas',
    photoCount: 1,
    category: 'grid',
    cells: [{ x: 0, y: 0, w: 1, h: 1 }],
  },

  // 2 Photos
  {
    id: '2-split-v',
    name: '2 Split Vertical',
    photoCount: 2,
    category: 'split',
    cells: [
      { x: 0, y: 0, w: 0.5, h: 1 },
      { x: 0.5, y: 0, w: 0.5, h: 1 },
    ],
  },
  {
    id: '2-split-h',
    name: '2 Split Horizontal',
    photoCount: 2,
    category: 'split',
    cells: [
      { x: 0, y: 0, w: 1, h: 0.5 },
      { x: 0, y: 0.5, w: 1, h: 0.5 },
    ],
  },

  // 3 Photos
  {
    id: '3-hero-left',
    name: '3 Hero Left + 2 Stack',
    photoCount: 3,
    category: 'hero',
    cells: [
      { x: 0, y: 0, w: 0.6, h: 1 },
      { x: 0.6, y: 0, w: 0.4, h: 0.5 },
      { x: 0.6, y: 0.5, w: 0.4, h: 0.5 },
    ],
  },
  {
    id: '3-hero-top',
    name: '3 Hero Top + 2 Bottom',
    photoCount: 3,
    category: 'hero',
    cells: [
      { x: 0, y: 0, w: 1, h: 0.6 },
      { x: 0, y: 0.6, w: 0.5, h: 0.4 },
      { x: 0.5, y: 0.6, w: 0.5, h: 0.4 },
    ],
  },
  {
    id: '3-columns',
    name: '3 Columns Strip',
    photoCount: 3,
    category: 'grid',
    cells: [
      { x: 0, y: 0, w: 0.3333, h: 1 },
      { x: 0.3333, y: 0, w: 0.3334, h: 1 },
      { x: 0.6667, y: 0, w: 0.3333, h: 1 },
    ],
  },

  // 4 Photos
  {
    id: '4-quad-grid',
    name: '4 Quad 2x2 Grid',
    photoCount: 4,
    category: 'grid',
    cells: [
      { x: 0, y: 0, w: 0.5, h: 0.5 },
      { x: 0.5, y: 0, w: 0.5, h: 0.5 },
      { x: 0, y: 0.5, w: 0.5, h: 0.5 },
      { x: 0.5, y: 0.5, w: 0.5, h: 0.5 },
    ],
  },
  {
    id: '4-hero-left',
    name: '4 Hero Left + 3 Side',
    photoCount: 4,
    category: 'hero',
    cells: [
      { x: 0, y: 0, w: 0.62, h: 1 },
      { x: 0.62, y: 0, w: 0.38, h: 0.3333 },
      { x: 0.62, y: 0.3333, w: 0.38, h: 0.3334 },
      { x: 0.62, y: 0.6667, w: 0.38, h: 0.3333 },
    ],
  },
  {
    id: '4-bento-card',
    name: '4 Bento Asymmetric',
    photoCount: 4,
    category: 'bento',
    cells: [
      { x: 0, y: 0, w: 0.55, h: 0.65 },
      { x: 0.55, y: 0, w: 0.45, h: 0.35 },
      { x: 0.55, y: 0.35, w: 0.45, h: 0.65 },
      { x: 0, y: 0.65, w: 0.55, h: 0.35 },
    ],
  },

  // 5 Photos
  {
    id: '5-bento-hero',
    name: '5 Bento Showcase',
    photoCount: 5,
    category: 'bento',
    cells: [
      { x: 0, y: 0, w: 0.6, h: 0.6 },
      { x: 0.6, y: 0, w: 0.4, h: 0.3 },
      { x: 0.6, y: 0.3, w: 0.4, h: 0.3 },
      { x: 0, y: 0.6, w: 0.5, h: 0.4 },
      { x: 0.5, y: 0.6, w: 0.5, h: 0.4 },
    ],
  },
  {
    id: '5-mosaic',
    name: '5 Mosaic Grid',
    photoCount: 5,
    category: 'masonry',
    cells: [
      { x: 0, y: 0, w: 0.333, h: 0.5 },
      { x: 0.333, y: 0, w: 0.334, h: 0.5 },
      { x: 0.667, y: 0, w: 0.333, h: 1 },
      { x: 0, y: 0.5, w: 0.333, h: 0.5 },
      { x: 0.333, y: 0.5, w: 0.334, h: 0.5 },
    ],
  },

  // 6 Photos
  {
    id: '6-grid-3x2',
    name: '6 Classic 3x2 Grid',
    photoCount: 6,
    category: 'grid',
    cells: [
      { x: 0, y: 0, w: 0.3333, h: 0.5 },
      { x: 0.3333, y: 0, w: 0.3334, h: 0.5 },
      { x: 0.6667, y: 0, w: 0.3333, h: 0.5 },
      { x: 0, y: 0.5, w: 0.3333, h: 0.5 },
      { x: 0.3333, y: 0.5, w: 0.3334, h: 0.5 },
      { x: 0.6667, y: 0.5, w: 0.3333, h: 0.5 },
    ],
  },
  {
    id: '6-hero-center',
    name: '6 Hero Center + Wings',
    photoCount: 6,
    category: 'hero',
    cells: [
      { x: 0, y: 0, w: 0.28, h: 0.5 },
      { x: 0, y: 0.5, w: 0.28, h: 0.5 },
      { x: 0.28, y: 0, w: 0.44, h: 1 },
      { x: 0.72, y: 0, w: 0.28, h: 0.3333 },
      { x: 0.72, y: 0.3333, w: 0.28, h: 0.3334 },
      { x: 0.72, y: 0.6667, w: 0.28, h: 0.3333 },
    ],
  },

  // 7 to 8 Photos
  {
    id: '8-bento-saas',
    name: '8 SaaS Product Grid',
    photoCount: 8,
    category: 'bento',
    cells: [
      { x: 0, y: 0, w: 0.5, h: 0.5 },
      { x: 0.5, y: 0, w: 0.25, h: 0.25 },
      { x: 0.75, y: 0, w: 0.25, h: 0.25 },
      { x: 0.5, y: 0.25, w: 0.5, h: 0.25 },
      { x: 0, y: 0.5, w: 0.25, h: 0.5 },
      { x: 0.25, y: 0.5, w: 0.25, h: 0.5 },
      { x: 0.5, y: 0.5, w: 0.25, h: 0.5 },
      { x: 0.75, y: 0.5, w: 0.25, h: 0.5 },
    ],
  },

  // 10 Photos
  {
    id: '10-gallery-wall',
    name: '10 Gallery Wall',
    photoCount: 10,
    category: 'masonry',
    cells: [
      { x: 0, y: 0, w: 0.4, h: 0.6 },
      { x: 0.4, y: 0, w: 0.3, h: 0.3 },
      { x: 0.7, y: 0, w: 0.3, h: 0.3 },
      { x: 0.4, y: 0.3, w: 0.3, h: 0.3 },
      { x: 0.7, y: 0.3, w: 0.3, h: 0.3 },
      { x: 0, y: 0.6, w: 0.2, h: 0.4 },
      { x: 0.2, y: 0.6, w: 0.2, h: 0.4 },
      { x: 0.4, y: 0.6, w: 0.2, h: 0.4 },
      { x: 0.6, y: 0.6, w: 0.2, h: 0.4 },
      { x: 0.8, y: 0.6, w: 0.2, h: 0.4 },
    ],
  },
];

export function getPresetById(id: string): LayoutPreset {
  return LAYOUT_PRESETS.find(p => p.id === id) || LAYOUT_PRESETS[3]; // default 4-quad
}

export function getPresetsByCount(count: number): LayoutPreset[] {
  return LAYOUT_PRESETS.filter(p => p.photoCount === count);
}
