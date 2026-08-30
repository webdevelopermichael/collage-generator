import React from 'react';
import { CollageState, BackgroundConfig } from '../../../types';
import { Palette, BoxSelect, Square, Sparkles, Ban } from 'lucide-react';
import { Language, TRANSLATIONS } from '../../../core/i18n';

interface StyleTabProps {
  state: CollageState;
  onChangeState: (updater: (prev: CollageState) => CollageState) => void;
  language: Language;
}

const GRADIENT_PRESETS: BackgroundConfig[] = [
  {
    type: 'transparent',
    color: 'transparent',
  },
  {
    type: 'solid',
    color: '#09090b',
  },
  {
    type: 'solid',
    color: '#0f172a',
  },
  {
    type: 'solid',
    color: '#ffffff',
  },
  {
    type: 'gradient',
    color: '#0f172a',
    gradient: {
      from: '#0f172a',
      via: '#1e1b4b',
      to: '#311042',
      direction: 'to-br',
    },
  },
  {
    type: 'gradient',
    color: '#09090b',
    gradient: {
      from: '#09090b',
      to: '#18181b',
      direction: 'to-b',
    },
  },
  {
    type: 'gradient',
    color: '#451a03',
    gradient: {
      from: '#451a03',
      via: '#292524',
      to: '#1c1917',
      direction: 'to-br',
    },
  },
  {
    type: 'gradient',
    color: '#022c22',
    gradient: {
      from: '#022c22',
      via: '#064e3b',
      to: '#0f172a',
      direction: 'to-br',
    },
  },
  {
    type: 'gradient',
    color: '#172554',
    gradient: {
      from: '#172554',
      via: '#1e3a8a',
      to: '#0284c7',
      direction: 'to-br',
    },
  },
];

export const StyleTab: React.FC<StyleTabProps> = ({ state, onChangeState, language }) => {
  const t = TRANSLATIONS[language];

  return (
    <div className="space-y-6">
      {/* Background Section */}
      <div>
        <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400 flex items-center gap-1.5 mb-2.5">
          <Palette className="w-3.5 h-3.5 text-purple-400" />
          {t.canvasBackground}
        </label>

        <div className="grid grid-cols-5 gap-2 mb-3">
          {GRADIENT_PRESETS.map((bg, idx) => {
            const isTransparent = bg.type === 'transparent';
            const isSelected =
              state.background.type === bg.type &&
              (isTransparent || state.background.color === bg.color);

            let style: React.CSSProperties = {};
            if (bg.type === 'gradient' && bg.gradient) {
              style = {
                background: `linear-gradient(135deg, ${bg.gradient.from}, ${
                  bg.gradient.via ? bg.gradient.via + ',' : ''
                } ${bg.gradient.to})`,
              };
            } else if (isTransparent) {
              style = {
                backgroundImage:
                  'linear-gradient(45deg, #1e293b 25%, transparent 25%), linear-gradient(-45deg, #1e293b 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #1e293b 75%), linear-gradient(-45deg, transparent 75%, #1e293b 75%)',
                backgroundSize: '10px 10px',
                backgroundPosition: '0 0, 0 5px, 5px -5px, -5px 0px',
                backgroundColor: '#090a0f',
              };
            } else {
              style = { backgroundColor: bg.color };
            }

            return (
              <button
                key={idx}
                onClick={() => onChangeState(prev => ({ ...prev, background: bg }))}
                style={style}
                title={isTransparent ? 'Transparent Background' : bg.color}
                className={`h-10 rounded-xl border transition-all cursor-pointer shadow-sm relative flex items-center justify-center ${
                  isSelected ? 'border-indigo-500 ring-2 ring-indigo-500/40 scale-105' : 'border-neutral-700/80 hover:scale-105'
                }`}
              >
                {isTransparent && <Ban className="w-3.5 h-3.5 text-neutral-400" />}
              </button>
            );
          })}
        </div>

        {/* Custom solid color picker */}
        <div className="flex items-center gap-2 bg-neutral-950 p-2 rounded-xl border border-neutral-800">
          <input
            type="color"
            value={state.background.type === 'transparent' ? '#000000' : state.background.color || '#0f172a'}
            onChange={e =>
              onChangeState(prev => ({
                ...prev,
                background: { type: 'solid', color: e.target.value },
              }))
            }
            className="w-7 h-7 rounded-lg cursor-pointer bg-transparent border-0"
          />
          <span className="text-xs text-neutral-300 font-mono">
            {state.background.type === 'transparent' ? 'Transparent (PNG Alpha)' : state.background.color || '#0f172a'}
          </span>
        </div>
      </div>

      {/* Spacing & Padding */}
      <div className="space-y-4 pt-4 border-t border-neutral-800">
        <div>
          <div className="flex justify-between text-xs font-medium text-neutral-300 mb-1.5">
            <span className="flex items-center gap-1.5">
              <BoxSelect className="w-3.5 h-3.5 text-indigo-400" /> {t.outerPadding}
            </span>
            <span className="font-mono text-neutral-400">{state.padding}px</span>
          </div>
          <input
            type="range"
            min="0"
            max="64"
            value={state.padding}
            onChange={e =>
              onChangeState(prev => ({ ...prev, padding: Number(e.target.value) }))
            }
            className="w-full accent-indigo-500 cursor-pointer"
          />
        </div>

        <div>
          <div className="flex justify-between text-xs font-medium text-neutral-300 mb-1.5">
            <span>{t.cellSpacingGap}</span>
            <span className="font-mono text-neutral-400">{state.gap}px</span>
          </div>
          <input
            type="range"
            min="0"
            max="40"
            value={state.gap}
            onChange={e =>
              onChangeState(prev => ({ ...prev, gap: Number(e.target.value) }))
            }
            className="w-full accent-indigo-500 cursor-pointer"
          />
        </div>

        {/* Canvas Edge Rounding Slider */}
        <div>
          <div className="flex justify-between text-xs font-medium text-neutral-300 mb-1.5">
            <span className="flex items-center gap-1.5">
              <Square className="w-3.5 h-3.5 text-indigo-400" />
              {t.canvasRounding}
            </span>
            <span className="font-mono text-neutral-400">{state.canvasRadius ?? 24}px</span>
          </div>
          <input
            type="range"
            min="0"
            max="64"
            value={state.canvasRadius ?? 24}
            onChange={e =>
              onChangeState(prev => ({ ...prev, canvasRadius: Number(e.target.value) }))
            }
            className="w-full accent-indigo-500 cursor-pointer"
          />
        </div>

        {/* Photo Corner Rounding Slider */}
        <div>
          <div className="flex justify-between text-xs font-medium text-neutral-300 mb-1.5">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              {t.cellRounding}
            </span>
            <span className="font-mono text-neutral-400">{state.cellRadius}px</span>
          </div>
          <input
            type="range"
            min="0"
            max="48"
            value={state.cellRadius}
            onChange={e =>
              onChangeState(prev => ({ ...prev, cellRadius: Number(e.target.value) }))
            }
            className="w-full accent-purple-500 cursor-pointer"
          />
        </div>
      </div>

      {/* Borders & Shadows */}
      <div className="space-y-4 pt-4 border-t border-neutral-800">
        <div>
          <div className="flex justify-between text-xs font-medium text-neutral-300 mb-1.5">
            <span>{t.borderStroke}</span>
            <span className="font-mono text-neutral-400">{state.cellBorderWidth}px</span>
          </div>
          <input
            type="range"
            min="0"
            max="8"
            value={state.cellBorderWidth}
            onChange={e =>
              onChangeState(prev => ({ ...prev, cellBorderWidth: Number(e.target.value) }))
            }
            className="w-full accent-pink-500 cursor-pointer"
          />
        </div>

        {/* Drop Shadow Preset Selector */}
        <div>
          <label className="text-xs font-medium text-neutral-300 block mb-2">
            {t.dropShadow}
          </label>
          <div className="grid grid-cols-5 gap-1.5">
            {[
              { id: 'none' as const, label: t.shadowNone },
              { id: 'sm' as const, label: t.shadowSubtle },
              { id: 'lg' as const, label: t.shadowMedium },
              { id: '2xl' as const, label: t.shadowDeep },
              { id: 'glow' as const, label: t.shadowGlow },
            ].map(sh => (
              <button
                key={sh.id}
                onClick={() => onChangeState(prev => ({ ...prev, cellShadow: sh.id }))}
                className={`py-1.5 px-1 rounded-lg text-[10px] font-semibold transition-all cursor-pointer truncate ${
                  state.cellShadow === sh.id
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-neutral-950 border border-neutral-800 text-neutral-400 hover:text-white'
                }`}
              >
                {sh.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
