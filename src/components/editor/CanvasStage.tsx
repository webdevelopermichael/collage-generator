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
  Maximize2,
  RotateCcw,
  Hand,
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
  const stageViewportRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  // Canvas Pan (Infinite viewport movement X / Y)
  const [panPosition, setPanPosition] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const panStartRef = useRef({ mouseX: 0, mouseY: 0, startPanX: 0, startPanY: 0 });

  // Badge Dragging state
  const [draggingBadgeId, setDraggingBadgeId] = useState<string | null>(null);
  const dragStartRef = useRef<{ mouseX: number; mouseY: number; badgeX: number; badgeY: number } | null>(null);

  // Active cell context popup / direct action modal
  const [activeActionCellId, setActiveActionCellId] = useState<string | null>(null);

  // Support Mouse & Touch Pan + Badge Drag
  useEffect(() => {
    const handleMove = (clientX: number, clientY: number) => {
      // 1. Badge Dragging
      if (draggingBadgeId && dragStartRef.current && canvasRef.current) {
        const canvasRect = canvasRef.current.getBoundingClientRect();
        const deltaX = clientX - dragStartRef.current.mouseX;
        const deltaY = clientY - dragStartRef.current.mouseY;

        const deltaPercentX = (deltaX / (canvasRect.width)) * 100;
        const deltaPercentY = (deltaY / (canvasRect.height)) * 100;

        const nextX = Math.max(0, Math.min(88, dragStartRef.current.badgeX + deltaPercentX));
        const nextY = Math.max(0, Math.min(88, dragStartRef.current.badgeY + deltaPercentY));

        onChangeState(prev => ({
          ...prev,
          badges: prev.badges.map(b => (b.id === draggingBadgeId ? { ...b, x: nextX, y: nextY } : b)),
        }));
        return;
      }

      // 2. Viewport Panning (Canvas move left/right/up/down)
      if (isPanning) {
        const deltaX = clientX - panStartRef.current.mouseX;
        const deltaY = clientY - panStartRef.current.mouseY;
        setPanPosition({
          x: panStartRef.current.startPanX + deltaX,
          y: panStartRef.current.startPanY + deltaY,
        });
      }
    };

    const handleMouseMove = (e: MouseEvent) => handleMove(e.clientX, e.clientY);
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        handleMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const handleEnd = () => {
      setIsPanning(false);
      setDraggingBadgeId(null);
      dragStartRef.current = null;
    };

    if (isPanning || draggingBadgeId) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleEnd);
      window.addEventListener('touchmove', handleTouchMove, { passive: false });
      window.addEventListener('touchend', handleEnd);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleEnd);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleEnd);
    };
  }, [isPanning, draggingBadgeId, zoomLevel, onChangeState]);

  // Stage Background Mouse Down for Panning
  const handleStageMouseDown = (e: React.MouseEvent) => {
    // Only pan if clicking on empty background
    if (e.target === stageViewportRef.current || (e.target as HTMLElement).classList.contains('canvas-checkerboard')) {
      setIsPanning(true);
      panStartRef.current = {
        mouseX: e.clientX,
        mouseY: e.clientY,
        startPanX: panPosition.x,
        startPanY: panPosition.y,
      };
      onSelectCell(null);
      onSelectBadge(null);
      setActiveActionCellId(null);
    }
  };

  const handleBadgeStart = (clientX: number, clientY: number, badgeId: string, badgeX: number, badgeY: number) => {
    onSelectBadge(badgeId);
    onSelectCell(null);
    setActiveActionCellId(null);
    setDraggingBadgeId(badgeId);
    dragStartRef.current = {
      mouseX: clientX,
      mouseY: clientY,
      badgeX,
      badgeY,
    };
  };

  const handleCellClick = (e: React.MouseEvent, cellId: string) => {
    e.stopPropagation();
    onSelectCell(cellId);
    onSelectBadge(null);
    setActiveActionCellId(activeActionCellId === cellId ? null : cellId);
  };

  const handleImageUploadForCell = (cellId: string) => {
    activeCellTargetRef.current = cellId;
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !activeCellTargetRef.current) return;

    const reader = new FileReader();
    reader.onload = event => {
      const url = event.target?.result as string;
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

  const getRatioStyle = () => {
    switch (state.aspectRatio) {
      case '1:1':
        return 'aspect-square w-[340px] sm:w-[480px] md:w-[560px]';
      case '4:5':
        return 'aspect-[4/5] w-[320px] sm:w-[460px] md:w-[520px]';
      case '9:16':
        return 'aspect-[9/16] w-[280px] sm:w-[380px] md:w-[420px]';
      case '16:9':
        return 'aspect-[16/9] w-[340px] sm:w-[540px] md:w-[680px]';
      case '4:3':
        return 'aspect-[4/3] w-[340px] sm:w-[500px] md:w-[600px]';
      case '3:2':
        return 'aspect-[3/2] w-[340px] sm:w-[520px] md:w-[640px]';
      case 'A4':
        return 'aspect-[1/1.414] w-[300px] sm:w-[420px] md:w-[480px]';
      default:
        return 'aspect-video w-[340px] sm:w-[540px] md:w-[640px]';
    }
  };

  const getShadowClass = (shadow: CollageState['cellShadow']) => {
    switch (shadow) {
      case 'sm': return 'shadow-sm';
      case 'md': return 'shadow-md';
      case 'lg': return 'shadow-lg';
      case 'xl': return 'shadow-xl';
      case '2xl': return 'shadow-2xl';
      case 'glow': return 'shadow-[0_0_25px_rgba(99,102,241,0.5)]';
      default: return '';
    }
  };

  const getBackgroundStyle = (): React.CSSProperties => {
    if (state.background.type === 'gradient' && state.background.gradient) {
      const { from, to, via, direction } = state.background.gradient;
      let dirStr = 'to right bottom';
      if (direction === 'to-r') dirStr = 'to right';
      if (direction === 'to-b') dirStr = 'to bottom';
      if (direction === 'radial') {
        return { background: `radial-gradient(circle, ${from} 0%, ${via ? via + ' 50%,' : ''} ${to} 100%)` };
      }
      return { background: `linear-gradient(${dirStr}, ${from}, ${via ? via + ',' : ''} ${to})` };
    }
    return { backgroundColor: state.background.color || '#0f172a' };
  };

  return (
    <div
      ref={stageViewportRef}
      onMouseDown={handleStageMouseDown}
      className={`flex-1 w-full h-full flex items-center justify-center p-4 sm:p-8 overflow-hidden canvas-checkerboard relative select-none ${
        isPanning ? 'cursor-grabbing' : 'cursor-grab'
      }`}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Floating Canvas Controls (Zoom In, Zoom Out, Reset, Pan indicator) */}
      <div className="absolute top-3 left-3 z-30 flex items-center gap-1.5 bg-neutral-900/90 backdrop-blur-md p-1.5 rounded-xl border border-neutral-800 shadow-xl">
        <button
          onClick={() => setZoomLevel(prev => Math.max(0.4, Number((prev - 0.15).toFixed(2))))}
          title="Zoom Out"
          className="p-1.5 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors cursor-pointer"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        <span className="text-[11px] font-mono text-neutral-300 px-1.5 min-w-[42px] text-center">
          {Math.round(zoomLevel * 100)}%
        </span>
        <button
          onClick={() => setZoomLevel(prev => Math.min(2.5, Number((prev + 0.15).toFixed(2))))}
          title="Zoom In"
          className="p-1.5 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors cursor-pointer"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <div className="w-[1px] h-4 bg-neutral-800 mx-0.5" />
        <button
          onClick={() => {
            setZoomLevel(1);
            setPanPosition({ x: 0, y: 0 });
          }}
          title="Reset View"
          className="p-1.5 text-neutral-400 hover:text-indigo-400 hover:bg-neutral-800 rounded-lg transition-colors cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Pan hint badge */}
      <div className="absolute bottom-3 left-3 z-20 hidden sm:flex items-center gap-1.5 text-[10px] text-neutral-500 bg-neutral-950/70 px-2 py-1 rounded-lg border border-neutral-800/80 pointer-events-none">
        <Hand className="w-3 h-3" />
        <span>Зажмите и двигайте для панорамы</span>
      </div>

      {/* Interactive Scaled & Panned Canvas Stage */}
      <div
        style={{
          transform: `translate(${panPosition.x}px, ${panPosition.y}px) scale(${zoomLevel})`,
          transformOrigin: 'center center',
          transition: isPanning || draggingBadgeId ? 'none' : 'transform 0.1s ease-out',
        }}
        className="flex items-center justify-center shrink-0 cursor-default"
      >
        <div
          ref={canvasRef}
          id="collage-main-canvas"
          style={{
            ...getBackgroundStyle(),
            padding: `${state.padding}px`,
            borderRadius: `${state.canvasRadius}px`,
          }}
          className={`${getRatioStyle()} relative shadow-2xl transition-all duration-200 overflow-hidden border border-neutral-800`}
          onClick={() => {
            onSelectCell(null);
            onSelectBadge(null);
            setActiveActionCellId(null);
          }}
        >
          {/* Inner Cells Grid Layer */}
          <div className="w-full h-full relative">
            {state.cells.map(cell => {
              const isSelected = selectedCellId === cell.id;
              const isActionActive = activeActionCellId === cell.id;

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
                  className={`absolute overflow-hidden group cursor-pointer transition-all duration-200 ${getShadowClass(
                    state.cellShadow
                  )} ${
                    isSelected || isActionActive
                      ? 'ring-2 ring-indigo-500 ring-offset-2 ring-offset-neutral-900 z-20'
                      : 'hover:ring-1 hover:ring-white/40'
                  }`}
                >
                  {cell.imageUrl ? (
                    <div className="w-full h-full relative overflow-hidden bg-neutral-900">
                      <img
                        src={cell.imageUrl}
                        alt="Collage item"
                        style={{
                          transform: `scale(${cell.zoom || 1}) translate(${cell.offsetX || 0}px, ${
                            cell.offsetY || 0
                          }px) rotate(${cell.rotate || 0}deg)`,
                          filter:
                            cell.filter === 'grayscale'
                              ? 'grayscale(100%)'
                              : cell.filter === 'sepia'
                              ? 'sepia(80%)'
                              : cell.filter === 'vibrant'
                              ? 'saturate(150%) contrast(110%)'
                              : 'none',
                        }}
                        className="w-full h-full object-cover transition-transform"
                      />

                      {/* On Click / Hover Action Menu */}
                      <div
                        className={`absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity flex flex-col items-center justify-center gap-2 p-2 ${
                          isActionActive ? 'opacity-100 z-30' : 'opacity-0 group-hover:opacity-100'
                        }`}
                      >
                        <div className="flex items-center gap-1.5 bg-neutral-900/90 p-1.5 rounded-xl border border-neutral-700 shadow-2xl">
                          <button
                            onClick={e => {
                              e.stopPropagation();
                              handleImageUploadForCell(cell.id);
                            }}
                            title="Поменять картинку"
                            className="flex items-center gap-1 px-2.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold shadow transition-colors cursor-pointer"
                          >
                            <ImageIcon className="w-3.5 h-3.5" />
                            <span>Заменить</span>
                          </button>

                          <button
                            onClick={e => {
                              e.stopPropagation();
                              onChangeState(prev => ({
                                ...prev,
                                cells: prev.cells.map(c =>
                                  c.id === cell.id ? { ...c, zoom: Math.min(3, (c.zoom || 1) + 0.2) } : c
                                ),
                              }));
                            }}
                            title="Увеличить фото"
                            className="p-1.5 text-neutral-300 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors cursor-pointer"
                          >
                            <ZoomIn className="w-4 h-4" />
                          </button>

                          <button
                            onClick={e => {
                              e.stopPropagation();
                              onChangeState(prev => ({
                                ...prev,
                                cells: prev.cells.map(c =>
                                  c.id === cell.id ? { ...c, zoom: Math.max(1, (c.zoom || 1) - 0.2) } : c
                                ),
                              }));
                            }}
                            title="Уменьшить фото"
                            className="p-1.5 text-neutral-300 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors cursor-pointer"
                          >
                            <ZoomOut className="w-4 h-4" />
                          </button>

                          <button
                            onClick={e => {
                              e.stopPropagation();
                              onChangeState(prev => ({
                                ...prev,
                                cells: prev.cells.map(c =>
                                  c.id === cell.id ? { ...c, imageUrl: undefined } : c
                                ),
                              }));
                              setActiveActionCellId(null);
                            }}
                            title="Удалить фото"
                            className="p-1.5 bg-rose-950/80 hover:bg-rose-900 text-rose-300 rounded-lg transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div
                      onClick={() => handleImageUploadForCell(cell.id)}
                      className="w-full h-full bg-neutral-900/70 border border-dashed border-neutral-700/80 hover:border-indigo-500 flex flex-col items-center justify-center p-2 text-center transition-colors"
                    >
                      <div className="w-8 h-8 rounded-full bg-neutral-800 text-neutral-400 group-hover:text-indigo-400 flex items-center justify-center mb-1 transition-colors">
                        <Upload className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] sm:text-[11px] font-semibold text-neutral-400 group-hover:text-white transition-colors">
                        Загрузить фото
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Metric Badges Layer (Touch + Mouse draggable, Click to edit/delete) */}
          {state.badges?.map(badge => {
            const isBadgeSelected = selectedBadgeId === badge.id;
            const isDragging = draggingBadgeId === badge.id;

            return (
              <div
                key={badge.id}
                onMouseDown={e => {
                  e.stopPropagation();
                  handleBadgeStart(e.clientX, e.clientY, badge.id, badge.x, badge.y);
                }}
                onTouchStart={e => {
                  e.stopPropagation();
                  if (e.touches.length > 0) {
                    handleBadgeStart(e.touches[0].clientX, e.touches[0].clientY, badge.id, badge.x, badge.y);
                  }
                }}
                style={{
                  left: `${badge.x}%`,
                  top: `${badge.y}%`,
                  transform: `scale(${badge.scale || 1})`,
                }}
                className={`absolute z-30 group cursor-grab active:cursor-grabbing select-none transition-shadow ${
                  isDragging ? 'opacity-90 scale-105 z-50' : ''
                }`}
              >
                <div
                  className={`relative bg-neutral-950/90 backdrop-blur-md px-3 py-2 rounded-xl shadow-2xl border transition-all ${
                    badge.color === 'emerald'
                      ? 'border-emerald-500/50'
                      : badge.color === 'rose'
                      ? 'border-rose-500/50'
                      : badge.color === 'amber'
                      ? 'border-amber-500/50'
                      : 'border-indigo-500/50'
                  } ${
                    isBadgeSelected
                      ? 'ring-2 ring-pink-500 ring-offset-2 ring-offset-neutral-950 shadow-pink-500/20'
                      : 'hover:border-pink-400/80'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <Move className="w-3 h-3 text-neutral-500 opacity-60 sm:opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div>
                      <div className="text-[8px] sm:text-[9px] uppercase font-bold tracking-wider text-neutral-400">
                        {badge.title}
                      </div>
                      {badge.value && (
                        <div className="text-[11px] sm:text-xs md:text-sm font-bold text-white tracking-tight">
                          {badge.value}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Inline Delete & Quick Scale Controls */}
                  <div className="absolute -top-3 -right-3 flex items-center gap-0.5 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity bg-neutral-900 border border-neutral-700 rounded-lg p-0.5 shadow-xl">
                    <button
                      onClick={e => {
                        e.stopPropagation();
                        onChangeState(prev => ({
                          ...prev,
                          badges: prev.badges.map(b =>
                            b.id === badge.id
                              ? { ...b, scale: Math.max(0.6, Number(((b.scale || 1) - 0.1).toFixed(1))) }
                              : b
                          ),
                        }));
                      }}
                      title="Уменьшить"
                      className="p-1 hover:bg-neutral-800 text-neutral-400 hover:text-white rounded"
                    >
                      <Minus className="w-2.5 h-2.5" />
                    </button>
                    <button
                      onClick={e => {
                        e.stopPropagation();
                        onChangeState(prev => ({
                          ...prev,
                          badges: prev.badges.map(b =>
                            b.id === badge.id
                              ? { ...b, scale: Math.min(2.0, Number(((b.scale || 1) + 0.1).toFixed(1))) }
                              : b
                          ),
                        }));
                      }}
                      title="Увеличить"
                      className="p-1 hover:bg-neutral-800 text-neutral-400 hover:text-white rounded"
                    >
                      <Plus className="w-2.5 h-2.5" />
                    </button>
                    <button
                      onClick={e => {
                        e.stopPropagation();
                        onChangeState(prev => ({
                          ...prev,
                          badges: prev.badges.filter(b => b.id !== badge.id),
                        }));
                        onSelectBadge(null);
                      }}
                      title="Удалить бейдж"
                      className="p-1 hover:bg-rose-900/80 text-rose-400 hover:text-rose-200 rounded"
                    >
                      <X className="w-2.5 h-2.5" />
                    </button>
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
