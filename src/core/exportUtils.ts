import { CollageState } from '../types';
import { ASPECT_RATIOS } from './layoutEngine';

export interface ExportOptions {
  format: 'png' | 'jpeg' | 'webp';
  scale: 1 | 2 | 4;
  quality: number; // 0.1 to 1.0
  customWidth?: number;
  customHeight?: number;
}

export async function renderCollageToCanvas(
  state: CollageState,
  options: ExportOptions
): Promise<HTMLCanvasElement> {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Could not create 2D rendering context');

  // Calculate resolution
  let baseWidth = 1920;
  let baseHeight = 1080;

  if (state.aspectRatio === 'custom') {
    baseWidth = state.customWidth || 1200;
    baseHeight = state.customHeight || 800;
  } else {
    const ratioOpt = ASPECT_RATIOS.find(r => r.id === state.aspectRatio);
    if (ratioOpt) {
      baseWidth = ratioOpt.width;
      baseHeight = ratioOpt.height;
    }
  }

  const exportScale = options.scale || 1;
  const targetW = options.customWidth ? options.customWidth * exportScale : baseWidth * exportScale;
  const targetH = options.customHeight ? options.customHeight * exportScale : baseHeight * exportScale;

  canvas.width = targetW;
  canvas.height = targetH;

  const scaleFactor = targetW / baseWidth;

  // 1. Draw Canvas Background
  if (state.background.type === 'gradient' && state.background.gradient) {
    let grad: CanvasGradient;
    const { from, to, via, direction } = state.background.gradient;

    if (direction === 'to-r') {
      grad = ctx.createLinearGradient(0, 0, targetW, 0);
    } else if (direction === 'to-b') {
      grad = ctx.createLinearGradient(0, 0, 0, targetH);
    } else if (direction === 'radial') {
      grad = ctx.createRadialGradient(targetW / 2, targetH / 2, 10, targetW / 2, targetH / 2, Math.max(targetW, targetH) / 2);
    } else {
      grad = ctx.createLinearGradient(0, 0, targetW, targetH);
    }

    grad.addColorStop(0, from);
    if (via) grad.addColorStop(0.5, via);
    grad.addColorStop(1, to);

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, targetW, targetH);
  } else if (state.background.type === 'solid') {
    ctx.fillStyle = state.background.color || '#0f172a';
    ctx.fillRect(0, 0, targetW, targetH);
  }

  // Calculate inner area bounds
  const scaledPadding = (state.padding || 0) * scaleFactor;
  const scaledGap = (state.gap || 0) * scaleFactor;
  const innerW = targetW - scaledPadding * 2;
  const innerH = targetH - scaledPadding * 2;

  // Pre-load images
  const loadedImages: Map<string, HTMLImageElement> = new Map();
  await Promise.all(
    state.cells
      .filter(c => !!c.imageUrl)
      .map(
        c =>
          new Promise<void>(resolve => {
            const img = new Image();
            img.crossOrigin = 'anonymous';
            img.onload = () => {
              loadedImages.set(c.imageUrl!, img);
              resolve();
            };
            img.onerror = () => resolve(); // Resolve anyway on failure
            img.src = c.imageUrl!;
          })
      )
  );

  // 2. Draw Cells
  for (const cell of state.cells) {
    const cellX = scaledPadding + cell.x * innerW + (cell.x > 0 ? scaledGap / 2 : 0);
    const cellY = scaledPadding + cell.y * innerH + (cell.y > 0 ? scaledGap / 2 : 0);
    const cellW = cell.w * innerW - (scaledGap > 0 ? scaledGap * (1 - cell.w) : 0);
    const cellH = cell.h * innerH - (scaledGap > 0 ? scaledGap * (1 - cell.h) : 0);
    const radius = Math.min(state.cellRadius * scaleFactor, Math.min(cellW, cellH) / 2);

    ctx.save();

    // Shadow
    if (state.cellShadow && state.cellShadow !== 'none') {
      ctx.shadowColor = 'rgba(0, 0, 0, 0.45)';
      ctx.shadowBlur = 18 * scaleFactor;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 8 * scaleFactor;
    }

    // Clip rounded rect
    ctx.beginPath();
    roundRect(ctx, cellX, cellY, cellW, cellH, radius);
    ctx.fillStyle = '#1e293b';
    ctx.fill();

    ctx.clip();

    // Draw Image if available
    if (cell.imageUrl && loadedImages.has(cell.imageUrl)) {
      const img = loadedImages.get(cell.imageUrl)!;
      drawImageProp(ctx, img, cellX, cellY, cellW, cellH, cell.offsetX, cell.offsetY, cell.zoom);
    } else {
      // Placeholder cell
      ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.fillRect(cellX, cellY, cellW, cellH);
    }

    ctx.restore();

    // Draw Cell Border
    if (state.cellBorderWidth > 0) {
      ctx.save();
      ctx.lineWidth = state.cellBorderWidth * scaleFactor;
      ctx.strokeStyle = state.cellBorderColor || 'rgba(255, 255, 255, 0.15)';
      ctx.beginPath();
      roundRect(ctx, cellX, cellY, cellW, cellH, radius);
      ctx.stroke();
      ctx.restore();
    }
  }

  // 3. Draw Metric Badges
  for (const badge of state.badges || []) {
    drawMetricBadge(ctx, badge, targetW, targetH, scaleFactor);
  }

  // 4. Draw Text Overlays
  for (const txt of state.textOverlays || []) {
    drawTextOverlay(ctx, txt, targetW, targetH, scaleFactor);
  }

  return canvas;
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  if (w < 2 * r) r = w / 2;
  if (h < 2 * r) r = h / 2;
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function drawImageProp(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  x: number,
  y: number,
  w: number,
  h: number,
  offsetX: number = 0,
  offsetY: number = 0,
  zoom: number = 1
) {
  const iw = img.naturalWidth || img.width;
  const ih = img.naturalHeight || img.height;
  const r = Math.min(w / iw, h / ih) * (zoom || 1);
  let nw = iw * r;
  let nh = ih * r;
  let cx = 1;
  let cy = 1;

  if (nw < w) {
    cx = w / nw;
    nw = w;
    nh = nh * cx;
  }
  if (nh < h) {
    cy = h / nh;
    nh = h;
    nw = nw * cy;
  }

  const posX = x + (w - nw) * 0.5 + (offsetX || 0);
  const posY = y + (h - nh) * 0.5 + (offsetY || 0);

  ctx.drawImage(img, 0, 0, iw, ih, posX, posY, nw, nh);
}

function drawMetricBadge(
  ctx: CanvasRenderingContext2D,
  badge: { title: string; value?: string; color?: string; x: number; y: number; scale?: number },
  canvasW: number,
  canvasH: number,
  scaleFactor: number
) {
  const bx = (badge.x / 100) * canvasW;
  const by = (badge.y / 100) * canvasH;
  const badgeScale = (badge.scale || 1) * scaleFactor;

  ctx.save();
  ctx.translate(bx, by);
  ctx.scale(badgeScale, badgeScale);

  // Badge background card
  const padX = 14;
  const padY = 8;
  const fontSizeTitle = 11;
  const fontSizeVal = 14;

  ctx.font = `600 ${fontSizeVal}px 'Space Grotesk', system-ui, sans-serif`;
  const valWidth = badge.value ? ctx.measureText(badge.value).width : 0;
  ctx.font = `500 ${fontSizeTitle}px 'Plus Jakarta Sans', system-ui, sans-serif`;
  const titleWidth = ctx.measureText(badge.title).width;

  const cardW = Math.max(valWidth, titleWidth) + padX * 2 + 16;
  const cardH = badge.value ? 48 : 32;

  // Shadow
  ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
  ctx.shadowBlur = 12;
  ctx.shadowOffsetY = 6;

  // Pill / Card fill
  ctx.fillStyle = 'rgba(15, 23, 42, 0.88)';
  ctx.beginPath();
  roundRect(ctx, 0, 0, cardW, cardH, 12);
  ctx.fill();

  // Border highlight
  ctx.strokeStyle = badge.color === 'emerald'
    ? 'rgba(16, 185, 129, 0.4)'
    : badge.color === 'rose'
    ? 'rgba(244, 63, 94, 0.4)'
    : badge.color === 'amber'
    ? 'rgba(245, 158, 11, 0.4)'
    : 'rgba(99, 102, 241, 0.4)';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // Draw texts
  ctx.shadowColor = 'transparent';
  if (badge.value) {
    ctx.fillStyle = '#94a3b8';
    ctx.font = `600 ${fontSizeTitle}px 'Plus Jakarta Sans', sans-serif`;
    ctx.fillText(badge.title.toUpperCase(), padX, padY + 10);

    ctx.fillStyle = '#ffffff';
    ctx.font = `700 ${fontSizeVal}px 'Space Grotesk', sans-serif`;
    ctx.fillText(badge.value, padX, padY + 28);
  } else {
    ctx.fillStyle = '#ffffff';
    ctx.font = `600 13px 'Plus Jakarta Sans', sans-serif`;
    ctx.fillText(badge.title, padX, 20);
  }

  ctx.restore();
}

function drawTextOverlay(
  ctx: CanvasRenderingContext2D,
  txt: { text: string; x: number; y: number; fontSize: number; color: string; fontWeight?: string; align?: string },
  canvasW: number,
  canvasH: number,
  scaleFactor: number
) {
  const tx = (txt.x / 100) * canvasW;
  const ty = (txt.y / 100) * canvasH;
  const size = (txt.fontSize || 24) * scaleFactor;

  ctx.save();
  ctx.font = `${txt.fontWeight || 'bold'} ${size}px 'Space Grotesk', sans-serif`;
  ctx.fillStyle = txt.color || '#ffffff';
  ctx.textAlign = (txt.align as CanvasTextAlign) || 'left';
  ctx.fillText(txt.text, tx, ty);
  ctx.restore();
}

export function downloadCanvas(
  canvas: HTMLCanvasElement,
  filename: string,
  format: 'png' | 'jpeg' | 'webp' = 'png',
  quality: number = 0.95
) {
  const mimeType = format === 'jpeg' ? 'image/jpeg' : format === 'webp' ? 'image/webp' : 'image/png';
  const dataUrl = canvas.toDataURL(mimeType, quality);
  const link = document.createElement('a');
  link.download = `${filename}.${format}`;
  link.href = dataUrl;
  link.click();
}
