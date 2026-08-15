export type AspectRatioId = '1:1' | '4:5' | '9:16' | '16:9' | '4:3' | '3:2' | 'A4' | 'custom';

export interface AspectRatioOption {
  id: AspectRatioId;
  label: string;
  sublabel: string;
  width: number;
  height: number;
  iconName?: string;
}

export interface CollageCell {
  id: string;
  x: number; // 0 to 1 relative
  y: number; // 0 to 1 relative
  w: number; // 0 to 1 relative
  h: number; // 0 to 1 relative
  imageUrl?: string;
  zoom: number; // 1 to 3
  offsetX: number; // -100 to 100
  offsetY: number; // -100 to 100
  rotate: number; // -180 to 180
  filter?: 'none' | 'grayscale' | 'sepia' | 'vintage' | 'vibrant' | 'dramatic' | 'soft';
}

export interface MetricBadge {
  id: string;
  type: 'metric' | 'tag' | 'rating' | 'user_quote';
  title: string;
  value?: string;
  icon?: string;
  color?: string; // 'emerald' | 'indigo' | 'violet' | 'rose' | 'amber' | 'blue'
  x: number; // 0 to 100%
  y: number; // 0 to 100%
  scale: number; // 0.6 to 2.0
}

export interface TextOverlay {
  id: string;
  text: string;
  x: number; // 0 to 100%
  y: number; // 0 to 100%
  fontSize: number; // 14 to 72
  fontWeight: 'normal' | 'bold' | '900';
  fontFamily: string;
  color: string;
  backgroundColor?: string;
  padding: number;
  borderRadius: number;
  align: 'left' | 'center' | 'right';
}

export interface BackgroundConfig {
  type: 'solid' | 'gradient' | 'mesh' | 'blur_image' | 'transparent';
  color: string;
  gradient?: {
    from: string;
    to: string;
    via?: string;
    direction: 'to-r' | 'to-b' | 'to-br' | 'radial';
  };
}

export interface CollageState {
  id: string;
  name: string;
  createdAt: number;
  updatedAt: number;
  aspectRatio: AspectRatioId;
  customWidth: number;
  customHeight: number;
  layoutTemplateId: string;
  cells: CollageCell[];
  badges: MetricBadge[];
  textOverlays: TextOverlay[];
  background: BackgroundConfig;
  gap: number; // 0 to 48
  padding: number; // 0 to 64
  cellRadius: number; // 0 to 36
  canvasRadius: number; // 0 to 36
  cellShadow: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'glow';
  cellBorderWidth: number; // 0 to 8
  cellBorderColor: string;
}

export interface LayoutPreset {
  id: string;
  name: string;
  photoCount: number;
  category: 'grid' | 'masonry' | 'hero' | 'bento' | 'split' | 'polaroid';
  cells: Array<{ x: number; y: number; w: number; h: number }>;
}

export interface UserAccount {
  id: string;
  email: string;
  name: string;
  isLoggedIn: boolean;
  avatarUrl?: string;
}

export interface ProjectSummary {
  id: string;
  name: string;
  thumbnail?: string;
  updatedAt: number;
  photoCount: number;
  aspectRatio: string;
}
