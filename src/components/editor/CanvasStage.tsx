import React, { useRef, useState, useEffect } from 'react';
import {
  Upload,
  ZoomIn,
  ZoomOut,
  Trash2,
  Image as ImageIcon,
  Move,
  X,
  Plus,
  Minus,
  RotateCcw,
  Crosshair,
} from 'lucide-react';
import { CollageState } from '../../types';
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
  const fileInputRef = useRef<HTMLInputElement>(null);
  const activeCellTargetRef = useRef<string | null>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  const t = TRANSLATIONS[language];

  // Stage Pan
  const [panPosition, setPanPosition] = useState({ x: 0, y: 0 });
  const panRef = useRef({ x: 0, y: 0 });

  // Stage Pan Gesture refs
  const isPanningRef = useRef(false);
  const panStartRef = useRef({ mouseX: 0, mouseY: 0, startPanX: 0, startPanY: 0 });
  const lastPinchDistRef = useRef<number | null>(null);
  const lastPinchCenterRef = useRef<{ x: number; y: number } | null>(null);

  // Badge drag
  const [draggingBadgeId, setDraggingBadgeId] = useState<string | null>(null);
  const badgeDragRef = useRef<{ mouseX: number; mouseY: number; badgeX: number; badgeY: number } | null>(null);

  // Cell Photo Pan / Move inside cell
  const [draggingPhotoCellId, setDraggingPhotoCellId] = useState<string | null>(null);
  const photoDragRef = useRef<{ mouseX: number; mouseY: number; startOffsetX: number; startOffsetY: number; cellId: string } | null>(null);

  // Active cell action popup
  const [actionCellId, setActionCellId] = useState<string | null>(null);

  // ── Mouse wheel zoom ───────────────────────────────────────────────────────
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const delta = e.deltaY > 0 ? -0.08 : 0.08;
      setZoomLevel(prev => Math.min(3, Math.max(0.3, Number((prev + delta).toFixed(2)))));
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, [setZoomLevel]);

  // ── Touch gestures on Stage (pinch + pan) ──────────────────────────────────
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
  }, [draggingBadgeId, draggingPhotoCellId, setZoomLevel]);

  // ── Global Mouse / Touch Move for Dragging Photos Inside Cells ─────────────
  useEffect(() => {
    if (!draggingPhotoCellId || !photoDragRef.current) return;

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
      e.preventDefault();
      if (!badgeDragRef.current || !canvasRef.current || !e.touches[0]) return;
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

  // ── Desktop Stage Pan ──────────────────────────────────────────────────────
  const handleStageMouseDown = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.dataset.panTarget !== '1') return;
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
        cells: prev.cells.map(c => (c.id === id ? { ...c, imageUrl: url, offsetX: 0, offsetY: 0, zoom: 1 } : c)),
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

  const getRatioStyle = (): React.CSSProperties => {
    if (state.aspectRatio === 'custom') {
      const w = state.customWidth || 1200;
      const h = state.customHeight || 800;
      const aspect = w / h;
      return {
        aspectRatio: `${w} / ${h}`,
        width: aspect >= 1
          ? `min(86vw, calc((100dvh - 180px) * ${aspect}), 640px)`
          : `min(calc(75vh * ${aspect}), 82vw, 480px)`,
      };
    }

    switch (state.aspectRatio) {
      case '1:1':
        return { aspectRatio: '1 / 1', width: 'min(82vw, calc(100dvh - 180px), 520px)' };
      case '4:5':
        return { aspectRatio: '4 / 5', width: 'min(76vw, calc(100dvh - 180px), 460px)' };
      case '9:16':
        return { aspectRatio: '9 / 16', width: 'min(60vw, calc(100dvh - 180px), 380px)' };
      case '16:9':
        return { aspectRatio: '16 / 9', width: 'min(88vw, calc(100dvh - 180px), 640px)' };
      case '4:3':
        return { aspectRatio: '4 / 3', width: 'min(84vw, calc(100dvh - 180px), 560px)' };
      case '3:2':
        return { aspectRatio: '3 / 2', width: 'min(86vw, calc(100dvh - 180px), 580px)' };
      case 'A4':
        return { aspectRatio: '1 / 1.414', width: 'min(66vw, calc(100dvh - 180px), 440px)' };
      default:
        return { aspectRatio: '16 / 9', width: 'min(86vw, calc(100dvh - 180px), 580px)' };
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

      {/* Reset button */}
      <button
        onClick={() => { setZoomLevel(1); setPanPosition({ x: 0, y: 0 }); panRef.current = { x: 0, y: 0 }; }}
        className="absolute top-3 right-3 z-30 flex items-center gap-1.5 px-2.5 py-1.5 bg-neutral-900/85 backdrop-blur-md border border-neutral-800 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors shadow text-[11px] font-mono cursor-pointer"
        title="Reset view"
      >
        <RotateCcw className="w-3.5 h-3.5" />
        {Math.round(zoomLevel * 100)}%
      </button>

      {/* Gesture hint */}
      <div data-pan-target="1" className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 z-10 text-[10px] text-neutral-500 hidden sm:block bg-neutral-950/80 px-3 py-1 rounded-full border border-neutral-800 backdrop-blur-md">
        {t.gestureHint}
      </div>

      {/* Transformed canvas wrapper */}
      <div
        style={{
          transform: `translate(${panPosition.x}px, ${panPosition.y}px) scale(${zoomLevel})`,
          transformOrigin: 'center center',
          transition: draggingBadgeId || draggingPhotoCellId ? 'none' : 'transform 0.08s ease-out',
        }}
        className="shrink-0 relative flex items-center justify-center"
      >
        {/* ── Main Canvas Container (overflow-hidden strictly clips everything inside canvas bounds!) ── */}
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
          className="relative shadow-2xl border border-neutral-800/60 transition-all duration-150 flex flex-col overflow-hidden"
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
                  className={`overflow-hidden group cursor-pointer transition-all ${getShadowClass()} ${
                    isSelected ? 'ring-2 ring-indigo-500 ring-offset-2 ring-offset-neutral-900 z-20' : 'hover:ring-1 hover:ring-white/30'
                  }`}
                >
                  {cell.imageUrl ? (
                    <div
                      onMouseDown={e => handlePhotoMouseDown(e, cell.id, cell.offsetX || 0, cell.offsetY || 0)}
                      onTouchStart={e => handlePhotoTouchStart(e, cell.id, cell.offsetX || 0, cell.offsetY || 0)}
                      className="w-full h-full relative overflow-hidden bg-neutral-900 cursor-move select-none active:cursor-grabbing"
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
                        className="w-full h-full object-cover pointer-events-none transition-none"
                      />
                    </div>
                  ) : (
                    <div
                      onClick={() => handleImageUpload(cell.id)}
                      data-pan-target="0"
                      className="w-full h-full bg-neutral-900/70 border border-dashed border-neutral-700/80 hover:border-indigo-500 flex flex-col items-center justify-center p-2 text-center transition-colors cursor-pointer"
                    >
                      <div className="w-8 h-8 rounded-full bg-neutral-800 text-neutral-400 group-hover:text-indigo-400 flex items-center justify-center mb-1 transition-colors">
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
            const isDragging = draggingBadgeId === badge.id;
            return (
              <div
                key={badge.id}
                onMouseDown={e => {
                  e.stopPropagation();
                  onSelectBadge(badge.id);
                  onSelectCell(null);
                  setActionCellId(null);
                  setDraggingBadgeId(badge.id);
                  badgeDragRef.current = { mouseX: e.clientX, mouseY: e.clientY, badgeX: badge.x, badgeY: badge.y };
                }}
                onTouchStart={e => {
                  e.stopPropagation();
                  if (e.touches.length > 0) {
                    onSelectBadge(badge.id);
                    onSelectCell(null);
                    setActionCellId(null);
                    setDraggingBadgeId(badge.id);
                    badgeDragRef.current = { mouseX: e.touches[0].clientX, mouseY: e.touches[0].clientY, badgeX: badge.x, badgeY: badge.y };
                  }
                }}
                style={{ left: `${badge.x}%`, top: `${badge.y}%`, transform: `scale(${badge.scale || 1})`, transformOrigin: 'top left' }}
                className={`absolute z-30 cursor-grab active:cursor-grabbing select-none ${isDragging ? 'opacity-90 z-50' : ''}`}
              >
                <div
                  className={`bg-neutral-950/90 backdrop-blur-md px-2.5 py-1.5 rounded-xl shadow-2xl border transition-all ${
                    badge.color === 'emerald'
                      ? 'border-emerald-500/60'
                      : badge.color === 'rose'
                      ? 'border-rose-500/60'
                      : badge.color === 'amber'
                      ? 'border-amber-500/60'
                      : 'border-indigo-500/60'
                  } ${isSel ? 'ring-2 ring-pink-400 ring-offset-1 ring-offset-neutral-950' : ''}`}
                >
                  <div className="flex items-center gap-1.5">
                    <Move className="w-2.5 h-2.5 text-neutral-600" />
                    <div>
                      <div className="text-[9px] uppercase font-bold tracking-wider text-neutral-400">{badge.title}</div>
                      {badge.value && <div className="text-xs font-bold text-white">{badge.value}</div>}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ─ High Z-Index Floating Cell Action Toolbar (Placed Outside Canvas so it's not clipped) ─ */}
        {activeCell && (
          <div
            className="absolute z-50 pointer-events-auto"
            style={{
              left: `${(activeCell.x + activeCell.w / 2) * 100}%`,
              top: `${activeCell.y * 100}%`,
              transform: 'translate(-50%, -130%)',
            }}
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center gap-1 bg-neutral-950/98 backdrop-blur-xl p-1.5 rounded-2xl border border-neutral-700 shadow-2xl">
              <button
                onClick={() => handleImageUpload(activeCell.id)}
                className="flex items-center gap-1 px-2.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold cursor-pointer transition-colors"
              >
                <ImageIcon className="w-3.5 h-3.5" />
                {t.replacePhoto}
              </button>

              <button
                onClick={() =>
                  onChangeState(prev => ({
                    ...prev,
                    cells: prev.cells.map(c =>
                      c.id === activeCell.id ? { ...c, zoom: Math.min(3.5, Number(((c.zoom || 1) + 0.2).toFixed(2))) } : c
                    ),
                  }))
                }
                className="p-1.5 text-neutral-300 hover:text-white hover:bg-neutral-800 rounded-xl cursor-pointer transition-colors"
                title={t.zoomIn}
              >
                <ZoomIn className="w-4 h-4" />
              </button>

              <button
                onClick={() =>
                  onChangeState(prev => ({
                    ...prev,
                    cells: prev.cells.map(c =>
                      c.id === activeCell.id ? { ...c, zoom: Math.max(1, Number(((c.zoom || 1) - 0.2).toFixed(2))) } : c
                    ),
                  }))
                }
                className="p-1.5 text-neutral-300 hover:text-white hover:bg-neutral-800 rounded-xl cursor-pointer transition-colors"
                title={t.zoomOut}
              >
                <ZoomOut className="w-4 h-4" />
              </button>

              <button
                onClick={() => handleCenterPhoto(activeCell.id)}
                className="flex items-center gap-1 px-2 py-1.5 bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white rounded-xl text-xs font-semibold cursor-pointer transition-colors border border-neutral-800"
                title={t.resetCenter}
              >
                <Crosshair className="w-3.5 h-3.5 text-indigo-400" />
                <span>{t.centerPhoto}</span>
              </button>

              <button
                onClick={() => {
                  onChangeState(prev => ({
                    ...prev,
                    cells: prev.cells.map(c => (c.id === activeCell.id ? { ...c, imageUrl: undefined, offsetX: 0, offsetY: 0 } : c)),
                  }));
                  setActionCellId(null);
                }}
                className="p-1.5 bg-rose-950/80 hover:bg-rose-900 text-rose-300 rounded-xl cursor-pointer transition-colors"
                title={t.removePhoto}
              >
                <Trash2 className="w-4 h-4" />
              </button>

              <button
                onClick={() => setActionCellId(null)}
                className="p-1.5 text-neutral-500 hover:text-white hover:bg-neutral-800 rounded-xl cursor-pointer transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
            {/* Tooltip Down Arrow */}
            <div className="absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-neutral-700" />
          </div>
        )}

        {/* ─ High Z-Index Floating Badge Edit Toolbar (Placed Outside Canvas so it's not clipped) ─ */}
        {selectedBadge && (
          <div
            className="absolute z-50 pointer-events-auto"
            style={{
              left: `${selectedBadge.x}%`,
              top: `${selectedBadge.y}%`,
              transform: 'translate(-10%, -130%)',
            }}
            onClick={e => e.stopPropagation()}
            onMouseDown={e => e.stopPropagation()}
            onTouchStart={e => e.stopPropagation()}
          >
            <div className="flex items-center gap-1 bg-neutral-950/98 backdrop-blur-xl border border-neutral-700 rounded-2xl p-1.5 shadow-2xl">
              <button
                onPointerDown={e => {
                  e.stopPropagation();
                  e.preventDefault();
                  onChangeState(prev => ({
                    ...prev,
                    badges: prev.badges.map(b =>
                      b.id === selectedBadge.id ? { ...b, scale: Math.max(0.5, Number(((b.scale || 1) - 0.1).toFixed(1))) } : b
                    ),
                  }));
                }}
                className="p-1 hover:bg-neutral-800 text-neutral-400 hover:text-white rounded-lg transition-colors cursor-pointer"
                title="Shrink"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <button
                onPointerDown={e => {
                  e.stopPropagation();
                  e.preventDefault();
                  onChangeState(prev => ({
                    ...prev,
                    badges: prev.badges.map(b =>
                      b.id === selectedBadge.id ? { ...b, scale: Math.min(2.5, Number(((b.scale || 1) + 0.1).toFixed(1))) } : b
                    ),
                  }));
                }}
                className="p-1 hover:bg-neutral-800 text-neutral-400 hover:text-white rounded-lg transition-colors cursor-pointer"
                title="Grow"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
              <div className="w-px h-4 bg-neutral-700 mx-0.5" />
              <button
                onPointerDown={e => {
                  e.stopPropagation();
                  e.preventDefault();
                  onChangeState(prev => ({ ...prev, badges: prev.badges.filter(b => b.id !== selectedBadge.id) }));
                  onSelectBadge(null);
                }}
                className="p-1 hover:bg-rose-900/80 text-rose-400 hover:text-rose-200 rounded-lg transition-colors cursor-pointer"
                title={t.delete}
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
              <button
                onPointerDown={e => {
                  e.stopPropagation();
                  e.preventDefault();
                  onSelectBadge(null);
                }}
                className="p-1 hover:bg-neutral-800 text-neutral-500 hover:text-white rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="absolute left-6 bottom-0 translate-y-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-neutral-700" />
          </div>
        )}
      </div>
    </div>
  );
};
