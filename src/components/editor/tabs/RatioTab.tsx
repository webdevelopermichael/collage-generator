import React from 'react';
import { AspectRatioOption, CollageState } from '../../../types';
import { ASPECT_RATIOS } from '../../../core/layoutEngine';
import { Ratio, Check, Smartphone, Monitor, Printer, Sliders, Square, Video } from 'lucide-react';

interface RatioTabProps {
  state: CollageState;
  onChangeState: (updater: (prev: CollageState) => CollageState) => void;
}

export const RatioTab: React.FC<RatioTabProps> = ({ state, onChangeState }) => {
  const getIcon = (id: string) => {
    switch (id) {
      case '1:1':
      case '4:5':
        return Square;
      case '9:16':
        return Smartphone;
      case '16:9':
        return Video;
      case 'A4':
      case '3:2':
        return Printer;
      default:
        return Monitor;
    }
  };

  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-1 flex items-center gap-1.5">
          <Ratio className="w-3.5 h-3.5 text-indigo-400" />
          Размер и Пропорции Полотна
        </h3>
        <p className="text-xs text-neutral-500">
          Выберите готовый формат под социальные сети или задайте свои размеры.
        </p>
      </div>

      {/* Preset Ratios Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {ASPECT_RATIOS.map(ratio => {
          const Icon = getIcon(ratio.id);
          const isSelected = state.aspectRatio === ratio.id;

          return (
            <button
              key={ratio.id}
              onClick={() =>
                onChangeState(prev => ({ ...prev, aspectRatio: ratio.id }))
              }
              className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-indigo-600/20 border-indigo-500 shadow-md ring-1 ring-indigo-500/40 text-white'
                  : 'bg-neutral-900/70 border-neutral-800 text-neutral-300 hover:bg-neutral-900 hover:border-neutral-700'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <Icon
                  className={`w-4 h-4 ${
                    isSelected ? 'text-indigo-400' : 'text-neutral-500'
                  }`}
                />
                {isSelected && <Check className="w-3.5 h-3.5 text-indigo-400" />}
              </div>

              <div>
                <div className="font-bold text-xs text-white">{ratio.label}</div>
                <div className="text-[10px] text-neutral-500 truncate">{ratio.sublabel}</div>
                <div className="text-[9px] font-mono text-neutral-400 mt-1">
                  {ratio.width} × {ratio.height} px
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Custom Size Inputs (if custom chosen) */}
      {state.aspectRatio === 'custom' && (
        <div className="p-4 bg-neutral-950 rounded-2xl border border-neutral-800 space-y-3">
          <div className="text-xs font-semibold text-white flex items-center gap-1.5">
            <Sliders className="w-3.5 h-3.5 text-indigo-400" />
            Кастомные размеры пикселей
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] text-neutral-400 block mb-1">Ширина (px)</label>
              <input
                type="number"
                value={state.customWidth || 1200}
                onChange={e =>
                  onChangeState(prev => ({
                    ...prev,
                    customWidth: Math.max(200, Number(e.target.value)),
                  }))
                }
                className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-3 py-2 text-xs text-white font-mono"
              />
            </div>
            <div>
              <label className="text-[10px] text-neutral-400 block mb-1">Высота (px)</label>
              <input
                type="number"
                value={state.customHeight || 800}
                onChange={e =>
                  onChangeState(prev => ({
                    ...prev,
                    customHeight: Math.max(200, Number(e.target.value)),
                  }))
                }
                className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-3 py-2 text-xs text-white font-mono"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
