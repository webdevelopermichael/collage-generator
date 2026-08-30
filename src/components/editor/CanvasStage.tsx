import React, { useRef, useEffect, useState } from 'react';
import {
  CollageState,
  CollageCell,
} from '../../types';
import {
  Upload,
  Move,
  Trash2,
  ZoomIn,
  ZoomOut,
  RotateCw,
  Sparkles,
  Maximize2,
  Minimize2,
  Sliders,
  RotateCcw,
  Crop,
  Check,
} from 'lucide-react';
import { Language, TRANSLATIONS } from '../../core/i18n';

interface CanvasStageProps {
  state: CollageState;
  selectedCellId: string | null;
  selectedBadgeId: string | null;
  onSelectCell: (id: string | null) => void;
  onSelectBadge: (id: string | null) => void;
  onChangeState: (updater: (prev: CollageState) => CollageState) => void;
  zoomLevel: number;
  setZoomLevel: React.Dispatch<React.SetStateAction<number>>;
  language: Language;
  onCanvasClick?: () => void;
}

export const CanvasStage: React.FC<CanvasStageProps> = ({
  state,
  selectedCellId,
  selectedBadgeId,
  onSelectCell,
  onSelectBadge,
  onChangeState,
  zoomLevel,
  setZoomLevel,
  language,
  onCanvasClick,
}) => {
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const activeCellTargetRef = useRef<string | null>(null);

  const t = TRANSLATIONS[language];

  // Pan / Canvas Workspace Navigation
  const [panPosition, setPanPosition] = useState({ x: 0, y: 0 });
  const isPanningRef = useRef(false);
  const panStartRef = useRef({ mouseX: 0, mouseY: 0, startPanX: 0, startPanY: 0 });
  const panRef = useRef(panPosition);
  panRef.current = panPosition;

  // Touch Pinch-to-Zoom & Pan
  const lastPinchDistRef = useRef<number | null>(null);
  const lastPinchCenterRef = useRef<{ x: number; y: number } | null>(null);

  // Floating Action Toolbar for active cell
  const [actionCellId, setActionCellId] = useState<string | null>(null);

  // Dragging inside cell (Photo Repositioning)
  const [draggingPhotoCellId, setDraggingPhotoCellId] = useState<string | null>(null);
  const photoDragRef = useRef<{
    mouseX: number;
    mouseY: number;
    startOffsetX: number;
    startOffsetY: number;
    cellId: string;
  } | null>(null);

  // Badge Dragging
  const [draggingBadgeId, setDraggingBadgeId] = useState<string | null>(null);
  const badgeDragRef = useRef<{
    mouseX: number;
    mouseY: number;
    badgeX: number;
    badgeY: number;
  } | null>(null);

  // ── Wheel Zoom & Touch Pinch Handler ───────────────────────────────────────
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const zoomFactor = e.deltaY < 0 ? 1.08 : 0.92;
      setZoomLevel(prev => Math.min(3, Math.max(0.3, Number((prev * zoomFactor).toFixed(2)))));
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, [setZoomLevel]);

  // ── Touch Gestures (Pinch zoom & Two-finger Canvas Pan) ─────────────────────
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;

    const dist = (t: TouchList) => {
      const dx = t[0].clientX - t[1].clientX;
      const dy = t[0].clientY - t[1].clientY;
      return Math.sqrt(dx * dx + dy * dy);
    };
    const center = (t: TouchList) => ({
      x: (t[0].clientX + t[1].clientX) / 2,
      y: (t[0].clientY + t[1].clientY) / 2,
    });

    const onTouchStart = (e: TouchEvent) => {
      if (draggingBadgeId || draggingPhotoCellId) return;
      if (e.touches.length === 2) {
        lastPinchDistRef.current = dist(e.touches);
        lastPinchCenterRef.current = center(e.touches);
      } else if (e.touches.length === 1) {
        const target = e.target as HTMLElement;
        const isBackground = target === el || target.dataset.panTarget === '1';
        if (!isBackground) return;
        isPanningRef.current = true;
        panStartRef.current = {
          mouseX: e.touches[0].clientX,
          mouseY: e.touches[0].clientY,
          startPanX: panRef.current.x,
          startPanY: panRef.current.y,
        };
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (draggingPhotoCellId || draggingBadgeId) return;
      if (e.touches.length === 2) {
        e.preventDefault();
        const d = dist(e.touches);
        if (lastPinchDistRef.current !== null) {
          const scale = d / lastPinchDistRef.current;
          setZoomLevel(prev => Math.min(3, Math.max(0.3, Number((prev * scale).toFixed(2)))));
        }
        lastPinchDistRef.current = d;
        const c = center(e.touches);
        if (lastPinchCenterRef.current) {
          const dx = c.x - lastPinchCenterRef.current.x;
          const dy = c.y - lastPinchCenterRef.current.y;
          panRef.current = { x: panRef.current.x + dx, y: panRef.current.y + dy };
          setPanPosition({ ...panRef.current });
        }
        lastPinchCenterRef.current = c;
      } else if (e.touches.length === 1 && isPanningRef.current) {
        e.preventDefault();
        const next = {
          x: panStartRef.current.startPanX + e.touches[0].clientX - panStartRef.current.mouseX,
          y: panStartRef.current.startPanY + e.touches[0].clientY - panStartRef.current.mouseY,
        };
        panRef.current = next;
        setPanPosition(next);
      }
    };

    const onTouchEnd = () => {
      isPanningRef.current = false;
      lastPinchDistRef.current = null;
      lastPinchCenterRef.current = null;
    };

    el.addEventListener('touchstart', onTouchStart, { passive: false });
    el.addEventListener('touchmove', onTouchMove, { passive: false });
    el.addEventListener('touchend', onTouchEnd);
    return () => {
      el.removeEventListener('touchstart', onTouchStart);
      el.removeEventListener('touchmove', onTouchMove);
      el.removeEventListener('touchend', onTouchEnd);
    };
  }, [setZoomLevel, draggingPhotoCellId, draggingBadgeId]);

  // ── Mouse & Touch Photo Drag Repositioning ─────────────────────────────────
  useEffect(() => {
    if (!draggingPhotoCellId) return;

    const onMouseMove = (e: MouseEvent) => {
      if (!photoDragRef.current) return;
      const dx = (e.clientX - photoDragRef.current.mouseX) / zoomLevel;
      const dy = (e.clientY - photoDragRef.current.mouseY) / zoomLevel;
      const nextX = photoDragRef.current.startOffsetX + dx;
      const nextY = photoDragRef.current.startOffsetY + dy;

      onChangeState(prev => ({
        ...prev,
        cells: prev.cells.map(c =>
          c.id === photoDragRef.current?.cellId
            ? { ...c, offsetX: Math.round(nextX), offsetY: Math.round(nextY) }
            : c
        ),
      }));
    };

    const onMouseUp = () => {
      setDraggingPhotoCellId(null);
      photoDragRef.current = null;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!photoDragRef.current || !e.touches[0]) return;
      e.preventDefault();
      const dx = (e.touches[0].clientX - photoDragRef.current.mouseX) / zoomLevel;
      const dy = (e.touches[0].clientY - photoDragRef.current.mouseY) / zoomLevel;
      const nextX = photoDragRef.current.startOffsetX + dx;
      const nextY = photoDragRef.current.startOffsetY + dy;

      onChangeState(prev => ({
        ...prev,
        cells: prev.cells.map(c =>
          c.id === photoDragRef.current?.cellId
            ? { ...c, offsetX: Math.round(nextX), offsetY: Math.round(nextY) }
            : c
        ),
      }));
    };

    const onTouchEnd = () => {
      setDraggingPhotoCellId(null);
      photoDragRef.current = null;
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('touchend', onTouchEnd);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [draggingPhotoCellId, zoomLevel, onChangeState]);

  // ── Mouse & Touch Badge Dragging ───────────────────────────────────────────
  useEffect(() => {
    if (!draggingBadgeId) return;

    const onMouseMove = (e: MouseEvent) => {
      if (!badgeDragRef.current || !canvasRef.current) return;
      const rect = canvasRef.current.getBoundingClientRect();
      const dx = ((e.clientX - badgeDragRef.current.mouseX) / rect.width) * 100;
      const dy = ((e.clientY - badgeDragRef.current.mouseY) / rect.height) * 100;
      onChangeState(prev => ({
        ...prev,
        badges: prev.badges.map(b =>
          b.id === draggingBadgeId
            ? {
                ...b,
                x: Math.max(0, Math.min(88, badgeDragRef.current!.badgeX + dx)),
                y: Math.max(0, Math.min(88, badgeDragRef.current!.badgeY + dy)),
              }
            : b
        ),
      }));
    };

    const onMouseUp = () => {
      setDraggingBadgeId(null);
      badgeDragRef.current = null;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!badgeDragRef.current || !e.touches[0] || !canvasRef.current) return;
      e.preventDefault();
      const rect = canvasRef.current.getBoundingClientRect();
      const dx = ((e.touches[0].clientX - badgeDragRef.current.mouseX) / rect.width) * 100;
      const dy = ((e.touches[0].clientY - badgeDragRef.current.mouseY) / rect.height) * 100;
      onChangeState(prev => ({
        ...prev,
        badges: prev.badges.map(b =>
          b.id === draggingBadgeId
            ? {
                ...b,
                x: Math.max(0, Math.min(88, badgeDragRef.current!.badgeX + dx)),
                y: Math.max(0, Math.min(88, badgeDragRef.current!.badgeY + dy)),
              }
            : b
        ),
      }));
    };

    const onTouchEnd = () => {
      setDraggingBadgeId(null);
      badgeDragRef.current = null;
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('touchend', onTouchEnd);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [draggingBadgeId, onChangeState]);

  // ── Stage Mouse Pan Starter ────────────────────────────────────────────────
  const handleStageMouseDown = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    const isBackground = target === stageRef.current || target.dataset.panTarget === '1';
    if (!isBackground) return;

    isPanningRef.current = true;
    panStartRef.current = {
      mouseX: e.clientX,
      mouseY: e.clientY,
      startPanX: panRef.current.x,
      startPanY: panRef.current.y,
    };
    onSelectCell(null);
    onSelectBadge(null);
    setActionCellId(null);

    const onMove = (me: MouseEvent) => {
      if (!isPanningRef.current) return;
      const next = {
        x: panStartRef.current.startPanX + me.clientX - panStartRef.current.mouseX,
        y: panStartRef.current.startPanY + me.clientY - panStartRef.current.mouseY,
      };
      panRef.current = next;
      setPanPosition(next);
    };

    const onUp = () => {
      isPanningRef.current = false;
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
  };

  // ── Cell Photo Pan Starter (MouseDown / TouchStart on loaded image) ────────
  const handlePhotoMouseDown = (e: React.MouseEvent, cellId: string, currentOffsetX: number, currentOffsetY: number) => {
    e.stopPropagation();
    onSelectCell(cellId);
    onSelectBadge(null);
    setActionCellId(cellId);

    setDraggingPhotoCellId(cellId);
    photoDragRef.current = {
      mouseX: e.clientX,
      mouseY: e.clientY,
      startOffsetX: currentOffsetX || 0,
      startOffsetY: currentOffsetY || 0,
      cellId,
    };
  };

  const handlePhotoTouchStart = (e: React.TouchEvent, cellId: string, currentOffsetX: number, currentOffsetY: number) => {
    if (e.touches.length !== 1) return;
    e.stopPropagation();
    onSelectCell(cellId);
    onSelectBadge(null);
    setActionCellId(cellId);

    setDraggingPhotoCellId(cellId);
    photoDragRef.current = {
      mouseX: e.touches[0].clientX,
      mouseY: e.touches[0].clientY,
      startOffsetX: currentOffsetX || 0,
      startOffsetY: currentOffsetY || 0,
      cellId,
    };
  };

  const handleImageUpload = (cellId: string) => {
    activeCellTargetRef.current = cellId;
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !activeCellTargetRef.current) return;
    const reader = new FileReader();
    reader.onload = ev => {
      const url = ev.target?.result as string;
      const id = activeCellTargetRef.current;
      onChangeState(prev => ({
        ...prev,
        cells: prev.cells.map(c => (c.id === id ? { ...c, imageUrl: url, offsetX: 0, offsetY: 0, zoom: 1, fitMode: 'contain' } : c)),
      }));
    };
    reader.readAsDataURL(file);
    e.target.value = '';
    setActionCellId(null);
  };

  // Center / reset photo position in slot
  const handleCenterPhoto = (cellId: string) => {
    onChangeState(prev => ({
      ...prev,
      cells: prev.cells.map(c => (c.id === cellId ? { ...c, offsetX: 0, offsetY: 0 } : c)),
    }));
  };

  // Toggle between Fit (contain - no crop) and Fill (cover - fill slot)
  const handleToggleFitMode = (cellId: string) => {
    onChangeState(prev => ({
      ...prev,
      cells: prev.cells.map(c =>
        c.id === cellId
          ? { ...c, fitMode: (c.fitMode || 'contain') === 'contain' ? 'cover' : 'contain', offsetX: 0, offsetY: 0 }
          : c
      ),
    }));
  };

  const getRatioStyle = (): React.CSSProperties => {
    if (state.aspectRatio === 'custom') {
      const w = state.customWidth || 1200;
      const h = state.customHeight || 800;
      const aspect = w / h;
      return {
        aspectRatio: `${w} / ${h}`,
        width: aspect >= 1
          ? `min(76vw, calc((100dvh - 120px) * ${aspect}), 600px)`
          : `min(calc((100dvh - 120px) * ${aspect}), 72vw, 440px)`,
        maxHeight: 'calc(100dvh - 110px)',
      };
    }

    switch (state.aspectRatio) {
      case '1:1':
        return { aspectRatio: '1 / 1', width: 'min(76vw, calc(100dvh - 120px), 500px)', maxHeight: 'calc(100dvh - 110px)' };
      case '4:5':
        return { aspectRatio: '4 / 5', width: 'min(70vw, calc(100dvh - 120px), 440px)', maxHeight: 'calc(100dvh - 110px)' };
      case '9:16':
        return { aspectRatio: '9 / 16', width: 'min(55vw, calc(100dvh - 120px), 360px)', maxHeight: 'calc(100dvh - 110px)' };
      case '16:9':
        return { aspectRatio: '16 / 9', width: 'min(82vw, calc(100dvh - 120px), 620px)', maxHeight: 'calc(100dvh - 110px)' };
      case '4:3':
        return { aspectRatio: '4 / 3', width: 'min(78vw, calc(100dvh - 120px), 540px)', maxHeight: 'calc(100dvh - 110px)' };
      case '3:2':
        return { aspectRatio: '3 / 2', width: 'min(80vw, calc(100dvh - 120px), 560px)', maxHeight: 'calc(100dvh - 110px)' };
      case 'A4':
        return { aspectRatio: '1 / 1.414', width: 'min(62vw, calc(100dvh - 120px), 420px)', maxHeight: 'calc(100dvh - 110px)' };
      default:
        return { aspectRatio: '16 / 9', width: 'min(80vw, calc(100dvh - 120px), 560px)', maxHeight: 'calc(100dvh - 110px)' };
    }
  };

  const getShadowClass = () => {
    switch (state.cellShadow) {
      case 'sm': return 'shadow-sm';
      case 'md': return 'shadow-md';
      case 'lg': return 'shadow-lg';
      case 'xl': return 'shadow-xl';
      case '2xl': return 'shadow-2xl';
      case 'glow': return 'shadow-[0_0_25px_rgba(99,102,241,0.5)]';
      default: return '';
    }
  };

  const getBgStyle = (): React.CSSProperties => {
    if (state.background.type === 'gradient' && state.background.gradient) {
      const { from, to, via, direction } = state.background.gradient;
      if (direction === 'radial') {
        return { background: `radial-gradient(circle, ${from} 0%, ${via ? via + ' 50%,' : ''} ${to} 100%)` };
      }
      const d = direction === 'to-r' ? 'to right' : direction === 'to-b' ? 'to bottom' : 'to right bottom';
      return { background: `linear-gradient(${d}, ${from}, ${via ? via + ', ' : ''}${to})` };
    }
    return { backgroundColor: state.background.color || '#0f172a' };
  };

  const activeCell = actionCellId ? state.cells.find(c => c.id === actionCellId) : null;
  const selectedBadge = selectedBadgeId ? state.badges?.find(b => b.id === selectedBadgeId) : null;

  return (
    <div
      ref={stageRef}
      onMouseDown={handleStageMouseDown}
      data-pan-target="1"
      className="w-full h-full flex items-center justify-center overflow-hidden relative select-none"
      style={{
        backgroundImage: 'radial-gradient(circle, #1e2030 1px, transparent 1px)',
        backgroundSize: '28px 28px',
        backgroundColor: '#0f1117',
        cursor: 'grab',
        touchAction: 'none',
      }}
    >
      <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />

      {/* Reset view button */}
      <button
        onClick={() => { setZoomLevel(1); setPanPosition({ x: 0, y: 0 }); panRef.current = { x: 0, y: 0 }; }}
        className="absolute top-3 right-3 z-30 flex items-center gap-1.5 px-2.5 py-1.5 bg-neutral-900/85 backdrop-blur-md border border-neutral-800 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-800 transition-all duration-200 shadow text-[11px] font-mono cursor-pointer hover:scale-105 active:scale-95"
        title="Reset view"
      >
        <RotateCcw className="w-3.5 h-3.5" />
        {Math.round(zoomLevel * 100)}%
      </button>

      {/* Gesture hint */}
      <div data-pan-target="1" className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 z-10 text-[10px] text-neutral-500 hidden sm:block bg-neutral-950/80 px-3 py-1 rounded-full border border-neutral-800 backdrop-blur-md transition-opacity duration-300">
        {t.gestureHint}
      </div>

      {/* Transformed canvas wrapper */}
      <div
        style={{
          transform: `translate(${panPosition.x}px, ${panPosition.y}px) scale(${zoomLevel})`,
          transformOrigin: 'center center',
          transition: draggingBadgeId || draggingPhotoCellId ? 'none' : 'transform 0.15s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        className="shrink-0 relative flex items-center justify-center p-4"
      >
        {/* ── Main Canvas Container ── */}
        <div
          ref={canvasRef}
          id="collage-main-canvas"
          style={{
            ...getBgStyle(),
            ...getRatioStyle(),
            padding: `${state.padding}px`,
            borderRadius: `${state.canvasRadius ?? 24}px`,
            boxSizing: 'border-box',
          }}
          className="relative shadow-2xl border border-neutral-800/60 transition-all duration-250 ease-out flex flex-col overflow-hidden"
          data-pan-target="1"
          onClick={e => {
            if ((e.target as HTMLElement).id === 'collage-main-canvas' || (e.target as HTMLElement).dataset.canvasBackground === '1') {
              onSelectCell(null);
              onSelectBadge(null);
              setActionCellId(null);
              onCanvasClick?.();
            }
          }}
        >
          {/* Inner Cells Grid Layer */}
          <div
            className="w-full h-full relative"
            style={{ width: '100%', height: '100%', minHeight: 0, position: 'relative' }}
            data-canvas-background="1"
          >
            {state.cells.map(cell => {
              const isSelected = selectedCellId === cell.id || actionCellId === cell.id;
              const gapPx = state.gap || 0;
              const fit = cell.fitMode || 'contain';

              return (
                <div
                  key={cell.id}
                  style={{
                    position: 'absolute',
                    left: `calc(${cell.x * 100}% + ${cell.x > 0 ? (gapPx * (1 - cell.x)) : 0}px)`,
                    top: `calc(${cell.y * 100}% + ${cell.y > 0 ? (gapPx * (1 - cell.y)) : 0}px)`,
                    width: `calc(${cell.w * 100}% - ${gapPx > 0 ? gapPx * (1 - cell.w) : 0}px)`,
                    height: `calc(${cell.h * 100}% - ${gapPx > 0 ? gapPx * (1 - cell.h) : 0}px)`,
                    borderRadius: `${state.cellRadius}px`,
                    borderWidth: `${state.cellBorderWidth}px`,
                    borderColor: state.cellBorderColor,
                    boxSizing: 'border-box',
                  }}
                  className={`overflow-hidden group cursor-pointer transition-all duration-200 ease-out ${getShadowClass()} ${
                    isSelected ? 'ring-2 ring-indigo-500 ring-offset-2 ring-offset-neutral-900 z-20' : 'hover:ring-1 hover:ring-white/30'
                  }`}
                >
                  {cell.imageUrl ? (
                    <div
                      onMouseDown={e => handlePhotoMouseDown(e, cell.id, cell.offsetX || 0, cell.offsetY || 0)}
                      onTouchStart={e => handlePhotoTouchStart(e, cell.id, cell.offsetX || 0, cell.offsetY || 0)}
                      className="w-full h-full relative overflow-hidden bg-neutral-950 flex items-center justify-center cursor-move select-none active:cursor-grabbing p-0 m-0"
                      title="Drag to reposition photo inside slot"
                    >
                      <img
                        src={cell.imageUrl}
                        alt="Collage photo"
                        draggable={false}
                        style={{
                          transform: `translate(${cell.offsetX || 0}px, ${cell.offsetY || 0}px) scale(${cell.zoom || 1}) rotate(${cell.rotate || 0}deg)`,
                          transformOrigin: 'center center',
                          filter:
                            cell.filter === 'grayscale'
                              ? 'grayscale(100%)'
                              : cell.filter === 'sepia'
                              ? 'sepia(80%)'
                              : cell.filter === 'vibrant'
                              ? 'saturate(150%) contrast(110%)'
                              : 'none',
                        }}
                        className={`w-full h-full block ${fit === 'contain' ? 'object-contain' : 'object-cover'} pointer-events-none transition-none`}
                      />
                    </div>
                  ) : (
                    <div
                      onClick={() => handleImageUpload(cell.id)}
                      data-pan-target="0"
                      className="w-full h-full bg-neutral-900/70 border border-dashed border-neutral-700/80 hover:border-indigo-500 flex flex-col items-center justify-center p-2 text-center transition-all duration-200 ease-out cursor-pointer hover:bg-neutral-900/90"
                    >
                      <div className="w-8 h-8 rounded-full bg-neutral-800 text-neutral-400 group-hover:text-indigo-400 flex items-center justify-center mb-1 transition-transform duration-200 group-hover:scale-110">
                        <Upload className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-semibold text-neutral-400 group-hover:text-white">
                        {t.addPhoto}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* ─ Badges ─ */}
          {state.badges?.map(badge => {
            const isSel = selectedBadgeId === badge.id;
            return (
              <div
                key={badge.id}
                onMouseDown={e => {
                  e.stopPropagation();
                  onSelectBadge(badge.id);
                  onSelectCell(null);
                  setDraggingBadgeId(badge.id);
                  badgeDragRef.current = {
                    mouseX: e.clientX,
                    mouseY: e.clientY,
                    badgeX: badge.x,
                    badgeY: badge.y,
                  };
                }}
                onTouchStart={e => {
                  if (!e.touches[0]) return;
                  e.stopPropagation();
                  onSelectBadge(badge.id);
                  onSelectCell(null);
                  setDraggingBadgeId(badge.id);
                  badgeDragRef.current = {
                    mouseX: e.touches[0].clientX,
                    mouseY: e.touches[0].clientY,
                    badgeX: badge.x,
                    badgeY: badge.y,
                  };
                }}
                style={{
                  position: 'absolute',
                  left: `${badge.x}%`,
                  top: `${badge.y}%`,
                  transform: `scale(${badge.scale || 1})`,
                  transformOrigin: 'top left',
                  cursor: 'grab',
                  zIndex: 30,
                }}
                className={`select-none transition-shadow ${
                  isSel ? 'ring-2 ring-pink-500 rounded-2xl shadow-xl' : 'hover:ring-1 hover:ring-white/40'
                }`}
              >
                <div
                  className={`px-3 py-1.5 rounded-2xl border shadow-xl backdrop-blur-md flex items-center gap-2 text-xs font-semibold ${
                    badge.color === 'emerald'
                      ? 'bg-emerald-950/80 border-emerald-500/40 text-emerald-300'
                      : badge.color === 'amber'
                      ? 'bg-amber-950/80 border-amber-500/40 text-amber-300'
                      : badge.color === 'rose'
                      ? 'bg-rose-950/80 border-rose-500/40 text-rose-300'
                      : badge.color === 'blue'
                      ? 'bg-blue-950/80 border-blue-500/40 text-blue-300'
                      : 'bg-indigo-950/80 border-indigo-500/40 text-indigo-300'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-wider opacity-80">{badge.title}</span>
                    {badge.value && <span className="font-bold text-white text-[11px]">{badge.value}</span>}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Compact Floating Action Toolbar for Selected Photo Slot ── */}
      {activeCell && activeCell.imageUrl && (
        <div
          style={{
            animation: 'fadeInUp 0.18s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
          className="absolute bottom-16 sm:bottom-14 left-1/2 -translate-x-1/2 z-40 bg-neutral-900/95 backdrop-blur-xl border border-neutral-700/80 shadow-2xl rounded-2xl px-2 py-1.5 flex items-center gap-1 sm:gap-1.5 text-xs select-none max-w-[94vw] overflow-x-auto"
        >
          {/* Zoom controls */}
          <div className="flex items-center gap-0.5 bg-neutral-950 p-0.5 rounded-xl border border-neutral-800">
            <button
              onClick={() => {
                const z = Math.max(0.4, Number(((activeCell.zoom || 1) - 0.15).toFixed(2)));
                onChangeState(prev => ({
                  ...prev,
                  cells: prev.cells.map(c => (c.id === activeCell.id ? { ...c, zoom: z } : c)),
                }));
              }}
              className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors cursor-pointer"
              title="Zoom out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="text-[10px] font-mono text-neutral-300 px-1 min-w-[34px] text-center">
              {Math.round((activeCell.zoom || 1) * 100)}%
            </span>
            <button
              onClick={() => {
                const z = Math.min(3.5, Number(((activeCell.zoom || 1) + 0.15).toFixed(2)));
                onChangeState(prev => ({
                  ...prev,
                  cells: prev.cells.map(c => (c.id === activeCell.id ? { ...c, zoom: z } : c)),
                }));
              }}
              className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors cursor-pointer"
              title="Zoom in"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Rotate 90 deg */}
          <button
            onClick={() => {
              const r = ((activeCell.rotate || 0) + 90) % 360;
              onChangeState(prev => ({
                ...prev,
                cells: prev.cells.map(c => (c.id === activeCell.id ? { ...c, rotate: r } : c)),
              }));
            }}
            className="p-2 bg-neutral-950 hover:bg-neutral-800 border border-neutral-800 rounded-xl text-neutral-300 hover:text-white transition-colors cursor-pointer"
            title="Rotate 90°"
          >
            <RotateCw className="w-3.5 h-3.5" />
          </button>

          {/* Center alignment */}
          <button
            onClick={() => handleCenterPhoto(activeCell.id)}
            className="p-2 bg-neutral-950 hover:bg-neutral-800 border border-neutral-800 rounded-xl text-neutral-300 hover:text-white transition-colors cursor-pointer"
            title="Center Photo"
          >
            <Move className="w-3.5 h-3.5" />
          </button>

          {/* Toggle Fit / Fill (no crop vs full fill) */}
          <button
            onClick={() => handleToggleFitMode(activeCell.id)}
            className={`px-2.5 py-1.5 rounded-xl text-[11px] font-bold transition-all cursor-pointer flex items-center gap-1 ${
              (activeCell.fitMode || 'contain') === 'contain'
                ? 'bg-indigo-600/30 text-indigo-300 border border-indigo-500/50'
                : 'bg-neutral-950 text-neutral-400 border border-neutral-800 hover:text-white'
            }`}
            title={(activeCell.fitMode || 'contain') === 'contain' ? 'Mode: Contain (No crop)' : 'Mode: Cover (Fill slot)'}
          >
            {(activeCell.fitMode || 'contain') === 'contain' ? (
              <>
                <Minimize2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Fit (No-Crop)</span>
              </>
            ) : (
              <>
                <Maximize2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Fill Slot</span>
              </>
            )}
          </button>

          {/* Replace Image */}
          <button
            onClick={() => handleImageUpload(activeCell.id)}
            className="p-2 bg-neutral-950 hover:bg-neutral-800 border border-neutral-800 rounded-xl text-neutral-300 hover:text-white transition-colors cursor-pointer"
            title="Replace Photo"
          >
            <Upload className="w-3.5 h-3.5" />
          </button>

          {/* Remove Photo */}
          <button
            onClick={() => {
              onChangeState(prev => ({
                ...prev,
                cells: prev.cells.map(c =>
                  c.id === activeCell.id ? { ...c, imageUrl: undefined, offsetX: 0, offsetY: 0, zoom: 1 } : c
                ),
              }));
              setActionCellId(null);
            }}
            className="p-2 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-400 rounded-xl transition-colors cursor-pointer"
            title="Delete Photo"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
};
