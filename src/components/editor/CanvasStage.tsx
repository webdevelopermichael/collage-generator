import React, { useRef, useState, useEffect, useCallback } from 'react';
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
} from 'lucide-react';
import { CollageState } from '../../types';

interface CanvasStageProps {
  state: CollageState;
  selectedCellId: string | null;
  selectedBadgeId: string | null;
  onSelectCell: (id: string | null) => void;
  onSelectBadge: (id: string | null) => void;
  onChangeState: (updater: (prev: CollageState) => CollageState) => void;
  zoomLevel: number;
  setZoomLevel: React.Dispatch<React.SetStateAction<number>>;
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
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const activeCellTargetRef = useRef<string | null>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  // Pan
  const [panPosition, setPanPosition] = useState({ x: 0, y: 0 });
  const panRef = useRef({ x: 0, y: 0 });

  // Gesture tracking refs (no re-renders for perf)
  const isPanningRef = useRef(false);
  const panStartRef = useRef({ mouseX: 0, mouseY: 0, startPanX: 0, startPanY: 0 });
  const lastPinchDistRef = useRef<number | null>(null);
  const lastPinchCenterRef = useRef<{ x: number; y: number } | null>(null);

  // Badge drag
  const [draggingBadgeId, setDraggingBadgeId] = useState<string | null>(null);
  const badgeDragRef = useRef<{ mouseX: number; mouseY: number; badgeX: number; badgeY: number } | null>(null);

  // Cell action popup
  const [activeActionCellId, setActiveActionCellId] = useState<string | null>(null);

  // ── Gesture event handlers ─────────────────────────────────────────────────

  // Mouse wheel → zoom
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

  // Touch pinch-to-zoom + single-finger pan
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;

    const getDistance = (t: TouchList) => {
      const dx = t[0].clientX - t[1].clientX;
      const dy = t[0].clientY - t[1].clientY;
      return Math.sqrt(dx * dx + dy * dy);
    };

    const getCenter = (t: TouchList) => ({
      x: (t[0].clientX + t[1].clientX) / 2,
      y: (t[0].clientY + t[1].clientY) / 2,
    });

    const onTouchStart = (e: TouchEvent) => {
      if (draggingBadgeId) return;
      if (e.touches.length === 2) {
        lastPinchDistRef.current = getDistance(e.touches);
        lastPinchCenterRef.current = getCenter(e.touches);
      } else if (e.touches.length === 1) {
        const target = e.target as HTMLElement;
        const isBackground =
          target === el || target.classList.contains('canvas-bg');
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
      e.preventDefault();
      if (e.touches.length === 2) {
        // Pinch zoom
        const dist = getDistance(e.touches);
        if (lastPinchDistRef.current !== null) {
          const scale = dist / lastPinchDistRef.current;
          setZoomLevel(prev => Math.min(3, Math.max(0.3, Number((prev * scale).toFixed(2)))));
        }
        lastPinchDistRef.current = dist;
        // Two-finger pan
        const center = getCenter(e.touches);
        if (lastPinchCenterRef.current) {
          const dx = center.x - lastPinchCenterRef.current.x;
          const dy = center.y - lastPinchCenterRef.current.y;
          panRef.current = { x: panRef.current.x + dx, y: panRef.current.y + dy };
          setPanPosition({ ...panRef.current });
        }
        lastPinchCenterRef.current = center;
      } else if (e.touches.length === 1 && isPanningRef.current) {
        const dx = e.touches[0].clientX - panStartRef.current.mouseX;
        const dy = e.touches[0].clientY - panStartRef.current.mouseY;
        const next = {
          x: panStartRef.current.startPanX + dx,
          y: panStartRef.current.startPanY + dy,
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
  }, [draggingBadgeId, setZoomLevel]);

  // Mouse badge drag
  useEffect(() => {
    if (!draggingBadgeId) return;

    const onMouseMove = (e: MouseEvent) => {
      if (!badgeDragRef.current || !canvasRef.current) return;
      const rect = canvasRef.current.getBoundingClientRect();
      const dx = ((e.clientX - badgeDragRef.current.mouseX) / rect.width) * 100;
      const dy = ((e.clientY - badgeDragRef.current.mouseY) / rect.height) * 100;
      const nextX = Math.max(0, Math.min(88, badgeDragRef.current.badgeX + dx));
      const nextY = Math.max(0, Math.min(88, badgeDragRef.current.badgeY + dy));
      onChangeState(prev => ({
        ...prev,
        badges: prev.badges.map(b =>
          b.id === draggingBadgeId ? { ...b, x: nextX, y: nextY } : b
        ),
      }));
    };

    const onMouseUp = () => {
      setDraggingBadgeId(null);
      badgeDragRef.current = null;
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [draggingBadgeId, onChangeState]);

  // Mouse pan on desktop
  const handleMouseDown = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    const isBackground = target === stageRef.current || target.classList.contains('canvas-bg');
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
    setActiveActionCellId(null);

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

  // ── Helpers ──────────────────────────────────────────────────────────────

  const handleCellClick = (e: React.MouseEvent, cellId: string) => {
    e.stopPropagation();
    onSelectCell(cellId);
    onSelectBadge(null);
    setActiveActionCellId(prev => (prev === cellId ? null : cellId));
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
      const targetId = activeCellTargetRef.current;
      onChangeState(prev => ({
        ...prev,
        cells: prev.cells.map(c => (c.id === targetId ? { ...c, imageUrl: url } : c)),
      }));
    };
    reader.readAsDataURL(file);
    e.target.value = '';
    setActiveActionCellId(null);
  };

  const getRatioClass = () => {
    switch (state.aspectRatio) {
      case '1:1': return 'aspect-square w-[320px] sm:w-[460px] md:w-[540px]';
      case '4:5': return 'aspect-[4/5] w-[300px] sm:w-[440px] md:w-[500px]';
      case '9:16': return 'aspect-[9/16] w-[260px] sm:w-[360px] md:w-[400px]';
      case '16:9': return 'aspect-[16/9] w-[340px] sm:w-[540px] md:w-[680px]';
      case '4:3': return 'aspect-[4/3] w-[320px] sm:w-[480px] md:w-[580px]';
      case '3:2': return 'aspect-[3/2] w-[320px] sm:w-[500px] md:w-[620px]';
      case 'A4': return 'aspect-[1/1.414] w-[280px] sm:w-[400px] md:w-[460px]';
      default: return 'aspect-[4/3] w-[320px] sm:w-[480px] md:w-[560px]';
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
      const dirStr = direction === 'to-r' ? 'to right' : direction === 'to-b' ? 'to bottom' : 'to right bottom';
      return { background: `linear-gradient(${dirStr}, ${from}, ${via ? via + ', ' : ''}${to})` };
    }
    return { backgroundColor: state.background.color || '#0f172a' };
  };

  return (
    <div
      ref={stageRef}
      onMouseDown={handleMouseDown}
      className="flex-1 w-full h-full flex items-center justify-center overflow-hidden relative select-none canvas-bg"
      style={{
        backgroundImage: 'radial-gradient(circle, #1e2030 1px, transparent 1px)',
        backgroundSize: '28px 28px',
        backgroundColor: '#0f1117',
        cursor: isPanningRef.current ? 'grabbing' : 'grab',
      }}
    >
      <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />

      {/* Reset view hint */}
      <button
        onClick={() => { setZoomLevel(1); setPanPosition({ x: 0, y: 0 }); panRef.current = { x: 0, y: 0 }; }}
        className="absolute top-3 right-3 z-30 p-2 bg-neutral-900/80 backdrop-blur-md border border-neutral-800 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors text-[10px] flex items-center gap-1.5 shadow"
        title="Reset view"
      >
        <RotateCcw className="w-3.5 h-3.5" />
        <span className="hidden sm:inline text-[11px] font-mono">{Math.round(zoomLevel * 100)}%</span>
      </button>

      {/* Gesture hint overlay (visible briefly on mobile) */}
      <div className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 z-10 text-[10px] text-neutral-600 hidden sm:flex items-center gap-1">
        <span>Scroll to zoom · Drag background to pan</span>
      </div>

      {/* Scaled & Translated Canvas */}
      <div
        style={{
          transform: `translate(${panPosition.x}px, ${panPosition.y}px) scale(${zoomLevel})`,
          transformOrigin: 'center center',
          transition: draggingBadgeId ? 'none' : 'transform 0.08s ease-out',
        }}
        className="shrink-0"
      >
        {/* Actual Canvas */}
        <div
          ref={canvasRef}
          id="collage-main-canvas"
          style={{
            ...getBgStyle(),
            padding: `${state.padding}px`,
            borderRadius: `${state.canvasRadius}px`,
          }}
          className={`${getRatioClass()} relative shadow-2xl overflow-hidden border border-neutral-800/60`}
          onClick={() => { onSelectCell(null); onSelectBadge(null); setActiveActionCellId(null); }}
        >
          {/* Cell Grid */}
          <div className="w-full h-full relative">
            {state.cells.map(cell => {
              const isSelected = selectedCellId === cell.id;
              const isAction = activeActionCellId === cell.id;
              return (
                <div
                  key={cell.id}
                  onClick={e => handleCellClick(e, cell.id)}
                  style={{
                    left: `calc(${cell.x * 100}% + ${cell.x > 0 ? state.gap / 2 : 0}px)`,
                    top: `calc(${cell.y * 100}% + ${cell.y > 0 ? state.gap / 2 : 0}px)`,
                    width: `calc(${cell.w * 100}% - ${state.gap > 0 ? state.gap * (1 - cell.w) : 0}px)`,
                    height: `calc(${cell.h * 100}% - ${state.gap > 0 ? state.gap * (1 - cell.h) : 0}px)`,
                    borderRadius: `${state.cellRadius}px`,
                    borderWidth: `${state.cellBorderWidth}px`,
                    borderColor: state.cellBorderColor,
                  }}
                  className={`absolute overflow-hidden group cursor-pointer transition-all ${getShadowClass()} ${
                    isSelected || isAction
                      ? 'ring-2 ring-indigo-500 ring-offset-2 ring-offset-neutral-900 z-20'
                      : 'hover:ring-1 hover:ring-white/30'
                  }`}
                >
                  {cell.imageUrl ? (
                    <div className="w-full h-full relative overflow-hidden bg-neutral-900">
                      <img
                        src={cell.imageUrl}
                        alt="Collage photo"
                        draggable={false}
                        style={{
                          transform: `scale(${cell.zoom || 1}) translate(${cell.offsetX || 0}px, ${cell.offsetY || 0}px) rotate(${cell.rotate || 0}deg)`,
                          filter: cell.filter === 'grayscale' ? 'grayscale(100%)' : cell.filter === 'sepia' ? 'sepia(80%)' : cell.filter === 'vibrant' ? 'saturate(150%) contrast(110%)' : 'none',
                        }}
                        className="w-full h-full object-cover"
                      />

                      {/* Action overlay */}
                      <div className={`absolute inset-0 bg-black/60 backdrop-blur-[1px] flex flex-col items-center justify-center gap-2 transition-opacity ${isAction ? 'opacity-100 z-30' : 'opacity-0 group-hover:opacity-100'}`}>
                        <div className="flex items-center gap-1.5 bg-neutral-950/90 p-1.5 rounded-xl border border-neutral-700 shadow-2xl">
                          <button
                            onClick={e => { e.stopPropagation(); handleImageUpload(cell.id); }}
                            className="flex items-center gap-1 px-2.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold cursor-pointer transition-colors"
                          >
                            <ImageIcon className="w-3.5 h-3.5" />
                            <span>Replace</span>
                          </button>
                          <button
                            onClick={e => { e.stopPropagation(); onChangeState(prev => ({ ...prev, cells: prev.cells.map(c => c.id === cell.id ? { ...c, zoom: Math.min(3, (c.zoom || 1) + 0.2) } : c) })); }}
                            className="p-1.5 text-neutral-300 hover:text-white hover:bg-neutral-800 rounded-lg cursor-pointer transition-colors"
                          ><ZoomIn className="w-4 h-4" /></button>
                          <button
                            onClick={e => { e.stopPropagation(); onChangeState(prev => ({ ...prev, cells: prev.cells.map(c => c.id === cell.id ? { ...c, zoom: Math.max(1, (c.zoom || 1) - 0.2) } : c) })); }}
                            className="p-1.5 text-neutral-300 hover:text-white hover:bg-neutral-800 rounded-lg cursor-pointer transition-colors"
                          ><ZoomOut className="w-4 h-4" /></button>
                          <button
                            onClick={e => { e.stopPropagation(); onChangeState(prev => ({ ...prev, cells: prev.cells.map(c => c.id === cell.id ? { ...c, imageUrl: undefined } : c) })); setActiveActionCellId(null); }}
                            className="p-1.5 bg-rose-950/80 hover:bg-rose-900 text-rose-300 rounded-lg cursor-pointer transition-colors"
                          ><Trash2 className="w-4 h-4" /></button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div
                      onClick={() => handleImageUpload(cell.id)}
                      className="w-full h-full bg-neutral-900/70 border border-dashed border-neutral-700/80 hover:border-indigo-500 flex flex-col items-center justify-center p-2 text-center transition-colors cursor-pointer"
                    >
                      <div className="w-8 h-8 rounded-full bg-neutral-800 text-neutral-400 group-hover:text-indigo-400 flex items-center justify-center mb-1 transition-colors">
                        <Upload className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-semibold text-neutral-400 group-hover:text-white">Add Photo</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Badges */}
          {state.badges?.map(badge => {
            const isSel = selectedBadgeId === badge.id;
            return (
              <div
                key={badge.id}
                onMouseDown={e => {
                  e.stopPropagation();
                  onSelectBadge(badge.id);
                  onSelectCell(null);
                  setActiveActionCellId(null);
                  setDraggingBadgeId(badge.id);
                  badgeDragRef.current = { mouseX: e.clientX, mouseY: e.clientY, badgeX: badge.x, badgeY: badge.y };
                }}
                onTouchStart={e => {
                  e.stopPropagation();
                  if (e.touches.length > 0) {
                    onSelectBadge(badge.id);
                    onSelectCell(null);
                    setActiveActionCellId(null);
                    setDraggingBadgeId(badge.id);
                    badgeDragRef.current = { mouseX: e.touches[0].clientX, mouseY: e.touches[0].clientY, badgeX: badge.x, badgeY: badge.y };
                  }
                }}
                style={{ left: `${badge.x}%`, top: `${badge.y}%`, transform: `scale(${badge.scale || 1})` }}
                className={`absolute z-30 group cursor-grab active:cursor-grabbing select-none ${draggingBadgeId === badge.id ? 'opacity-90 z-50' : ''}`}
              >
                <div className={`relative bg-neutral-950/90 backdrop-blur-md px-3 py-2 rounded-xl shadow-2xl border transition-all ${
                  badge.color === 'emerald' ? 'border-emerald-500/50' : badge.color === 'rose' ? 'border-rose-500/50' : badge.color === 'amber' ? 'border-amber-500/50' : 'border-indigo-500/50'
                } ${isSel ? 'ring-2 ring-pink-500 ring-offset-2 ring-offset-neutral-950' : 'hover:border-pink-400/80'}`}>
                  <div className="flex items-center gap-1.5">
                    <Move className="w-3 h-3 text-neutral-500 opacity-0 group-hover:opacity-60 transition-opacity" />
                    <div>
                      <div className="text-[9px] uppercase font-bold tracking-wider text-neutral-400">{badge.title}</div>
                      {badge.value && <div className="text-[11px] sm:text-xs font-bold text-white tracking-tight">{badge.value}</div>}
                    </div>
                  </div>

                  {/* Inline controls */}
                  <div className="absolute -top-3 -right-3 flex items-center gap-0.5 bg-neutral-900 border border-neutral-700 rounded-lg p-0.5 shadow-xl opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={e => { e.stopPropagation(); onChangeState(prev => ({ ...prev, badges: prev.badges.map(b => b.id === badge.id ? { ...b, scale: Math.max(0.5, Number(((b.scale || 1) - 0.1).toFixed(1))) } : b) })); }} className="p-1 hover:bg-neutral-800 text-neutral-400 hover:text-white rounded"><Minus className="w-2.5 h-2.5" /></button>
                    <button onClick={e => { e.stopPropagation(); onChangeState(prev => ({ ...prev, badges: prev.badges.map(b => b.id === badge.id ? { ...b, scale: Math.min(2.0, Number(((b.scale || 1) + 0.1).toFixed(1))) } : b) })); }} className="p-1 hover:bg-neutral-800 text-neutral-400 hover:text-white rounded"><Plus className="w-2.5 h-2.5" /></button>
                    <button onClick={e => { e.stopPropagation(); onChangeState(prev => ({ ...prev, badges: prev.badges.filter(b => b.id !== badge.id) })); onSelectBadge(null); }} className="p-1 hover:bg-rose-900/80 text-rose-400 hover:text-rose-200 rounded"><X className="w-2.5 h-2.5" /></button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
