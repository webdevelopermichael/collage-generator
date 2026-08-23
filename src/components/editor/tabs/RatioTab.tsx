import React from 'react';
import { CollageState } from '../../../types';
import { ASPECT_RATIOS } from '../../../core/layoutEngine';
import { Ratio, Check, Smartphone, Monitor, Printer, Sliders, Square, Video } from 'lucide-react';
import { Language, TRANSLATIONS } from '../../../core/i18n';

interface RatioTabProps {
  state: CollageState;
  onChangeState: (updater: (prev: CollageState) => CollageState) => void;
  language: Language;
}

export const RatioTab: React.FC<RatioTabProps> = ({ state, onChangeState, language }) => {
  const t = TRANSLATIONS[language];

  const getIcon = (id: string) => {
    if (id === '1:1' || id === '4:5') return Square;
    if (id === '9:16') return Smartphone;
    if (id === '16:9') return Video;
    if (id === 'A4' || id === '3:2') return Printer;
    if (id === 'custom') return Sliders;
    return Monitor;
  };

  const handleSelectRatio = (ratioId: CollageState['aspectRatio']) => {
    localStorage.setItem('collagenie_preferred_ratio', ratioId);
    onChangeState(prev => ({ ...prev, aspectRatio: ratioId }));
  };

  const handleCustomWidthChange = (val: number) => {
    localStorage.setItem('collagenie_custom_w', val.toString());
    onChangeState(prev => ({ ...prev, customWidth: val }));
  };

  const handleCustomHeightChange = (val: number) => {
    localStorage.setItem('collagenie_custom_h', val.toString());
    onChangeState(prev => ({ ...prev, customHeight: val }));
  };

  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-1 flex items-center gap-1.5">
          <Ratio className="w-3.5 h-3.5 text-indigo-400" />
          {t.canvasSizeTitle}
        </h3>
        <p className="text-xs text-neutral-500">{t.canvasSizeSubtitle}</p>
      </div>

      {/* Preset standard ratios */}
      <div>
        <div className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider mb-2">
          {t.presetRatios}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {ASPECT_RATIOS.map(ratio => {
            const Icon = getIcon(ratio.id);
            const isSelected = state.aspectRatio === ratio.id;
            return (
              <button
                key={ratio.id}
                onClick={() => handleSelectRatio(ratio.id as CollageState['aspectRatio'])}
                className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col gap-2 ${
                  isSelected
                    ? 'bg-indigo-600/20 border-indigo-500 ring-1 ring-indigo-500/40 shadow-sm'
                    : 'bg-neutral-900/70 border-neutral-800 hover:bg-neutral-900 hover:border-neutral-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <Icon className={`w-4 h-4 ${isSelected ? 'text-indigo-400' : 'text-neutral-500'}`} />
                  {isSelected && <Check className="w-3.5 h-3.5 text-indigo-400" />}
                </div>
                <div>
                  <div className="font-bold text-xs text-white">{ratio.label}</div>
                  <div className="text-[10px] text-neutral-500 truncate">{ratio.sublabel}</div>
                  <div className="text-[9px] font-mono text-neutral-400 mt-0.5">{ratio.width}×{ratio.height}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Custom pixel dimensions editor */}
      <div className="p-4 bg-neutral-950 rounded-2xl border border-neutral-800 space-y-3">
        <div className="flex items-center justify-between">
          <div className="text-xs font-bold text-white flex items-center gap-1.5">
            <Sliders className="w-3.5 h-3.5 text-indigo-400" />
            {t.customDimensions}
          </div>
          {state.aspectRatio === 'custom' && (
            <span className="text-[10px] font-mono text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-md border border-indigo-500/30">
              Active
            </span>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-[10px] uppercase font-bold text-neutral-400 block mb-1">
              {t.widthLabel}
            </label>
            <input
              type="number"
              value={state.customWidth || 1200}
              onChange={e => handleCustomWidthChange(Math.max(200, Math.min(5000, Number(e.target.value))))}
              onFocus={() => {
                if (state.aspectRatio !== 'custom') {
                  handleSelectRatio('custom');
                }
              }}
              className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white font-mono focus:border-indigo-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="text-[10px] uppercase font-bold text-neutral-400 block mb-1">
              {t.heightLabel}
            </label>
            <input
              type="number"
              value={state.customHeight || 800}
              onChange={e => handleCustomHeightChange(Math.max(200, Math.min(5000, Number(e.target.value))))}
              onFocus={() => {
                if (state.aspectRatio !== 'custom') {
                  handleSelectRatio('custom');
                }
              }}
              className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white font-mono focus:border-indigo-500 focus:outline-none"
            />
          </div>
        </div>

        {state.aspectRatio !== 'custom' && (
          <button
            onClick={() => handleSelectRatio('custom')}
            className="w-full py-2 bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white rounded-xl text-xs font-semibold border border-neutral-800 transition-colors cursor-pointer"
          >
            {t.applyDimensions}
          </button>
        )}
      </div>
    </div>
  );
};
