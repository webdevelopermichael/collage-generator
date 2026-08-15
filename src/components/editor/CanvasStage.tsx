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
  Sparkles,
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
}

export const CanvasStage: React.FC<CanvasStageProps> = ({
  state,
  selectedCellId,
  selectedBadgeId,
  onSelectCell,
  onSelectBadge,
  onChangeState,
  zoomLevel,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const activeCellTargetRef = useRef<string | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  // Dragging state for badges
  const [draggingBadgeId, setDraggingBadgeId] = useState<string | null>(null);
  const dragStartRef = useRef<{ mouseX: number; mouseY: number; badgeX: number; badgeY: number } | null>(null);

  // Global mouse move and mouse up handlers for smooth dragging
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!draggingBadgeId || !dragStartRef.current || !canvasRef.current) return;

      const canvasRect = canvasRef.current.getBoundingClientRect();
      const deltaX = e.clientX - dragStartRef.current.mouseX;
      const deltaY = e.clientY - dragStartRef.current.mouseY;

      // Convert delta pixels to percentage of canvas
      const deltaPercentX = (deltaX / (canvasRect.width * zoomLevel)) * 100;
      const deltaPercentY = (deltaY / (canvasRect.height * zoomLevel)) * 100;

      const nextX = Math.max(0, Math.min(88, dragStartRef.current.badgeX + deltaPercentX));
      const nextY = Math.max(0, Math.min(88, dragStartRef.current.badgeY + deltaPercentY));

      onChangeState(prev => ({
        ...prev,
        badges: prev.badges.map(b => (b.id === draggingBadgeId ? { ...b, x: nextX, y: nextY } : b)),
      }));
    };

    const handleMouseUp = () => {
      if (draggingBadgeId) {
        setDraggingBadgeId(null);
        dragStartRef.current = null;
      }
    };

    if (draggingBadgeId) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [draggingBadgeId, zoomLevel, onChangeState]);

  const handleBadgeMouseDown = (e: React.MouseEvent, badgeId: string, badgeX: number, badgeY: number) => {
    e.stopPropagation();
    onSelectBadge(badgeId);
    onSelectCell(null);
    setDraggingBadgeId(badgeId);
    dragStartRef.current = {
      mouseX: e.clientX,
      mouseY: e.clientY,
      badgeX,
      badgeY,
    };
  };

  const getRatioStyle = () => {
    switch (state.aspectRatio) {
      case '1:1':
        return 'aspect-square max-h-[600px]';
      case '4:5':
        return 'aspect-[4/5] max-h-[640px]';
      case '9:16':
        return 'aspect-[9/16] max-h-[660px]';
      case '16:9':
        return 'aspect-[16/9] max-h-[540px]';
      case '4:3':
        return 'aspect-[4/3] max-h-[580px]';
      case '3:2':
        return 'aspect-[3/2] max-h-[560px]';
      case 'A4':
        return 'aspect-[1/1.414] max-h-[660px]';
      default:
        return 'aspect-video max-h-[560px]';
    }
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
  };

  const getShadowClass = (shadow: CollageState['cellShadow']) => {
    switch (shadow) {
      case 'sm':
        return 'shadow-sm';
      case 'md':
        return 'shadow-md';
      case 'lg':
        return 'shadow-lg';
      case 'xl':
        return 'shadow-xl';
      case '2xl':
        return 'shadow-2xl';
      case 'glow':
        return 'shadow-[0_0_25px_rgba(99,102,241,0.5)]';
      default:
        return '';
    }
  };

  const getBackgroundStyle = (): React.CSSProperties => {
    if (state.background.type === 'gradient' && state.background.gradient) {
      const { from, to, via, direction } = state.background.gradient;
      let dirStr = 'to right bottom';
      if (direction === 'to-r') dirStr = 'to right';
      if (direction === 'to-b') dirStr = 'to bottom';
      if (direction === 'radial') {
        return {
          background: `radial-gradient(circle, ${from} 0%, ${via ? via + ' 50%,' : ''} ${to} 100%)`,
        };
      }
      return {
        background: `linear-gradient(${dirStr}, ${from}, ${via ? via + ',' : ''} ${to})`,
      };
    }
    return { backgroundColor: state.background.color || '#0f172a' };
  };

  return (
    <div className="flex-1 flex items-center justify-center p-4 sm:p-8 overflow-auto canvas-checkerboard relative select-none">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      <div
        style={{
          transform: `scale(${zoomLevel})`,
          transition: draggingBadgeId ? 'none' : 'transform 0.15s ease-out',
        }}
        className="w-full flex items-center justify-center"
      >
        <div
          ref={canvasRef}
          id="collage-main-canvas"
          style={{
            ...getBackgroundStyle(),
            padding: `${state.padding}px`,
            borderRadius: `${state.canvasRadius}px`,
          }}
          className={`w-full ${getRatioStyle()} relative shadow-2xl transition-all duration-200 overflow-hidden border border-neutral-800`}
          onClick={() => {
            onSelectCell(null);
            onSelectBadge(null);
          }}
        >
          {/* Inner Cells Grid Layer */}
          <div className="w-full h-full relative">
            {state.cells.map(cell => {
              const isSelected = selectedCellId === cell.id;
              return (
                <div
                  key={cell.id}
                  onClick={e => {
                    e.stopPropagation();
                    onSelectCell(cell.id);
                    onSelectBadge(null);
                  }}
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
                    isSelected
                      ? 'ring-2 ring-indigo-500 ring-offset-2 ring-offset-neutral-900 z-10'
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

                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <button
                          onClick={e => {
                            e.stopPropagation();
                            handleImageUploadForCell(cell.id);
                          }}
                          title="Replace Photo"
                          className="p-2 bg-neutral-900/90 text-white rounded-lg hover:bg-neutral-800 transition-colors shadow-lg cursor-pointer"
                        >
                          <ImageIcon className="w-4 h-4" />
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
                          title="Zoom In"
                          className="p-2 bg-neutral-900/90 text-white rounded-lg hover:bg-neutral-800 transition-colors shadow-lg cursor-pointer"
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
                          title="Zoom Out"
                          className="p-2 bg-neutral-900/90 text-white rounded-lg hover:bg-neutral-800 transition-colors shadow-lg cursor-pointer"
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
                          }}
                          title="Remove Photo"
                          className="p-2 bg-rose-950/90 text-rose-300 rounded-lg hover:bg-rose-900 transition-colors shadow-lg cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div
                      onClick={() => handleImageUploadForCell(cell.id)}
                      className="w-full h-full bg-neutral-900/60 border border-dashed border-neutral-700/80 hover:border-indigo-500/80 flex flex-col items-center justify-center p-4 text-center transition-colors"
                    >
                      <div className="w-9 h-9 rounded-full bg-neutral-800 text-neutral-400 group-hover:text-indigo-400 flex items-center justify-center mb-2 transition-colors">
                        <Upload className="w-4 h-4" />
                      </div>
                      <span className="text-[11px] font-medium text-neutral-400 group-hover:text-white transition-colors">
                        Add Photo
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Metric Badges Layer (Draggable + Resizable + Removable) */}
          {state.badges?.map(badge => {
            const isBadgeSelected = selectedBadgeId === badge.id;
            const isDragging = draggingBadgeId === badge.id;

            return (
              <div
                key={badge.id}
                onMouseDown={e => handleBadgeMouseDown(e, badge.id, badge.x, badge.y)}
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
                  className={`relative bg-neutral-950/90 backdrop-blur-md px-3.5 py-2 rounded-xl shadow-2xl border transition-all ${
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
                  {/* Badge Text */}
                  <div className="flex items-center gap-1.5">
                    <Move className="w-3 h-3 text-neutral-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div>
                      <div className="text-[9px] uppercase font-bold tracking-wider text-neutral-400">
                        {badge.title}
                      </div>
                      {badge.value && (
                        <div className="text-xs sm:text-sm font-bold text-white tracking-tight">
                          {badge.value}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Inline Delete & Quick Scale Controls */}
                  <div className="absolute -top-3 -right-3 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity bg-neutral-900 border border-neutral-700 rounded-lg p-0.5 shadow-xl">
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
                      title="Smaller"
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
                      title="Larger"
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
                      title="Delete Badge"
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
