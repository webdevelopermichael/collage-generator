import { CollageState, CollageCell } from '../types';
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

  // Calculate base resolution
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
  const canvasRounding = (state.canvasRadius ?? 24) * scaleFactor;

  // Clip whole canvas to canvasRadius to ensure zero outside overflow
  ctx.save();
  ctx.beginPath();
  roundRect(ctx, 0, 0, targetW, targetH, canvasRounding);
  ctx.clip();

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

  // Pre-load current user images safely
  const loadedImages: Map<string, HTMLImageElement> = new Map();
  await Promise.all(
    state.cells
      .filter(c => !!c.imageUrl)
      .map(
        c =>
          new Promise<void>(resolve => {
            const img = new Image();
            if (c.imageUrl!.startsWith('http')) {
              img.crossOrigin = 'anonymous';
            }
            const timer = setTimeout(() => resolve(), 3000);
            img.onload = () => {
              clearTimeout(timer);
              loadedImages.set(c.imageUrl!, img);
              resolve();
            };
            img.onerror = () => {
              clearTimeout(timer);
              resolve();
            };
            img.src = c.imageUrl!;
          })
      )
  );

  // 2. Draw Exact Current Cells
  for (const cell of state.cells) {
    const cellX = scaledPadding + cell.x * innerW + (cell.x > 0 ? (scaledGap * (1 - cell.x)) : 0);
    const cellY = scaledPadding + cell.y * innerH + (cell.y > 0 ? (scaledGap * (1 - cell.y)) : 0);
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

    // Draw User's Image if present in this slot
    if (cell.imageUrl && loadedImages.has(cell.imageUrl)) {
      const img = loadedImages.get(cell.imageUrl)!;
      
      // Apply filters if set
      if (cell.filter === 'grayscale') {
        ctx.filter = 'grayscale(100%)';
      } else if (cell.filter === 'sepia') {
        ctx.filter = 'sepia(80%)';
      } else if (cell.filter === 'vibrant') {
        ctx.filter = 'saturate(150%) contrast(110%)';
      }

      drawImageProp(
        ctx,
        img,
        cellX,
        cellY,
        cellW,
        cellH,
        (cell.offsetX || 0) * scaleFactor,
        (cell.offsetY || 0) * scaleFactor,
        cell.zoom || 1,
        cell.rotate || 0,
        cell.fitMode || 'cover'
      );
      ctx.filter = 'none';
    } else {
      // Empty slot placeholder
      ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
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

  // 3. Draw User's Metric Badges
  for (const badge of state.badges || []) {
    drawMetricBadge(ctx, badge, targetW, targetH, scaleFactor);
  }

  // 4. Draw Text Overlays
  for (const txt of state.textOverlays || []) {
    drawTextOverlay(ctx, txt, targetW, targetH, scaleFactor);
  }

  ctx.restore();

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
  zoom: number = 1,
  rotate: number = 0,
  fitMode: 'cover' | 'contain' = 'cover'
) {
  const iw = img.naturalWidth || img.width;
  const ih = img.naturalHeight || img.height;

  let r = 1;
  if (fitMode === 'contain') {
    // Show full image without cropping
    r = Math.min(w / iw, h / ih) * (zoom || 1);
  } else {
    // Fill slot (cover)
    r = Math.max(w / iw, h / ih) * (zoom || 1);
  }

  const nw = iw * r;
  const nh = ih * r;

  const posX = x + (w - nw) * 0.5 + offsetX;
  const posY = y + (h - nh) * 0.5 + offsetY;

  ctx.save();
  if (rotate !== 0) {
    const centerX = x + w / 2;
    const centerY = y + h / 2;
    ctx.translate(centerX, centerY);
    ctx.rotate((rotate * Math.PI) / 180);
    ctx.translate(-centerX, -centerY);
  }
  ctx.drawImage(img, 0, 0, iw, ih, posX, posY, nw, nh);
  ctx.restore();
}

function drawMetricBadge(
  ctx: CanvasRenderingContext2D,
  badge: { type: string; title: string; value?: string; color?: string; x: number; y: number; scale?: number },
  targetW: number,
  targetH: number,
  scaleFactor: number
) {
  const bx = (badge.x / 100) * targetW;
  const by = (badge.y / 100) * targetH;
  const bscale = (badge.scale || 1) * scaleFactor;

  ctx.save();
  ctx.translate(bx, by);
  ctx.scale(bscale, bscale);

  // Measure text
  ctx.font = 'bold 10px Inter, sans-serif';
  const titleW = ctx.measureText(badge.title).width;
  ctx.font = 'bold 13px Inter, sans-serif';
  const valW = badge.value ? ctx.measureText(badge.value).width : 0;
  const maxTextW = Math.max(titleW, valW);
  const padH = 14;
  const padV = 8;
  const boxW = maxTextW + padH * 2 + 16;
  const boxH = badge.value ? 44 : 26;

  // Background Box
  ctx.fillStyle = 'rgba(10, 10, 12, 0.95)';
  ctx.strokeStyle =
    badge.color === 'emerald'
      ? 'rgba(16, 185, 129, 0.8)'
      : badge.color === 'rose'
      ? 'rgba(244, 63, 94, 0.8)'
      : badge.color === 'amber'
      ? 'rgba(245, 158, 11, 0.8)'
      : 'rgba(99, 102, 241, 0.8)';
  ctx.lineWidth = 1.5;

  ctx.beginPath();
  roundRect(ctx, 0, 0, boxW, boxH, 12);
  ctx.fill();
  ctx.stroke();

  // Title Text
  ctx.fillStyle = 'rgba(161, 161, 170, 1)';
  ctx.font = 'bold 9px Inter, sans-serif';
  ctx.fillText(badge.title.toUpperCase(), 12, badge.value ? 16 : 17);

  // Value Text
  if (badge.value) {
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 12px Inter, sans-serif';
    ctx.fillText(badge.value, 12, 33);
  }

  ctx.restore();
}

function drawTextOverlay(
  ctx: CanvasRenderingContext2D,
  txt: { text: string; x: number; y: number; fontSize?: number; fontWeight?: string; color?: string; align?: string },
  targetW: number,
  targetH: number,
  scaleFactor: number
) {
  const tx = (txt.x / 100) * targetW;
  const ty = (txt.y / 100) * targetH;
  const size = (txt.fontSize || 24) * scaleFactor;

  ctx.save();
  ctx.font = `${txt.fontWeight || 'bold'} ${size}px Inter, sans-serif`;
  ctx.fillStyle = txt.color || '#ffffff';
  ctx.textAlign = (txt.align as CanvasTextAlign) || 'left';
  ctx.fillText(txt.text, tx, ty);
  ctx.restore();
}

export async function downloadCanvas(
  canvas: HTMLCanvasElement,
  filename: string,
  format: 'png' | 'jpeg' | 'webp',
  quality = 0.95
) {
  const mimeType = format === 'jpeg' ? 'image/jpeg' : format === 'webp' ? 'image/webp' : 'image/png';
  const extension = format === 'jpeg' ? 'jpg' : format;

  return new Promise<void>((resolve, reject) => {
    canvas.toBlob(
      async blob => {
        if (!blob) {
          reject(new Error('Canvas blob conversion failed'));
          return;
        }

        const safeFilename = `${filename.replace(/[^a-zA-Z0-9_-]/g, '_')}_4k.${extension}`;
        const file = new File([blob], safeFilename, { type: mimeType });

        // Mobile Web Share API
        if (
          navigator.canShare &&
          navigator.canShare({ files: [file] }) &&
          /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
        ) {
          try {
            await navigator.share({
              files: [file],
              title: 'My Collage',
            });
            resolve();
            return;
          } catch (shareErr: any) {
            if (shareErr.name === 'AbortError') {
              resolve();
              return;
            }
          }
        }

        // Standard blob download
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = safeFilename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        setTimeout(() => {
          URL.revokeObjectURL(url);
          resolve();
        }, 1500);
      },
      mimeType,
      quality
    );
  });
}
