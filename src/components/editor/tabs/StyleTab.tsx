import React from 'react';
import { CollageState, BackgroundConfig } from '../../../types';
import { Sliders, Sparkles, Palette, Layers, BoxSelect, Droplet } from 'lucide-react';

interface StyleTabProps {
  state: CollageState;
  onChangeState: (updater: (prev: CollageState) => CollageState) => void;
}

const GRADIENT_PRESETS: BackgroundConfig[] = [
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
  {
    type: 'solid',
    color: '#09090b',
  },
  {
    type: 'solid',
    color: '#ffffff',
  },
];

export const StyleTab: React.FC<StyleTabProps> = ({ state, onChangeState }) => {
  return (
    <div className="space-y-6">
      {/* Background Section */}
      <div>
        <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400 flex items-center gap-1.5 mb-2.5">
          <Palette className="w-3.5 h-3.5 text-purple-400" />
          Canvas Background
        </label>

        <div className="grid grid-cols-4 gap-2 mb-3">
          {GRADIENT_PRESETS.map((bg, idx) => {
            let style = {};
            if (bg.type === 'gradient' && bg.gradient) {
              style = {
                background: `linear-gradient(135deg, ${bg.gradient.from}, ${
                  bg.gradient.via ? bg.gradient.via + ',' : ''
                } ${bg.gradient.to})`,
              };
            } else {
              style = { backgroundColor: bg.color };
            }

            return (
              <button
                key={idx}
                onClick={() => onChangeState(prev => ({ ...prev, background: bg }))}
                style={style}
                className="h-10 rounded-xl border border-neutral-700/80 hover:scale-105 transition-transform cursor-pointer shadow-sm"
              />
            );
          })}
        </div>

        {/* Custom solid color picker */}
        <div className="flex items-center gap-2 bg-neutral-950 p-2 rounded-xl border border-neutral-800">
          <input
            type="color"
            value={state.background.color || '#0f172a'}
            onChange={e =>
              onChangeState(prev => ({
                ...prev,
                background: { type: 'solid', color: e.target.value },
              }))
            }
            className="w-7 h-7 rounded-lg cursor-pointer bg-transparent border-0"
          />
          <span className="text-xs text-neutral-300 font-mono">
            {state.background.color || '#0f172a'}
          </span>
        </div>
      </div>

      {/* Spacing & Padding */}
      <div className="space-y-4 pt-4 border-t border-neutral-800">
        <div>
          <div className="flex justify-between text-xs font-medium text-neutral-300 mb-1.5">
            <span className="flex items-center gap-1.5">
              <BoxSelect className="w-3.5 h-3.5 text-indigo-400" /> Outer Padding
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
            <span className="flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-indigo-400" /> Cell Gap
            </span>
            <span className="font-mono text-neutral-400">{state.gap}px</span>
          </div>
          <input
            type="range"
            min="0"
            max="48"
            value={state.gap}
            onChange={e =>
              onChangeState(prev => ({ ...prev, gap: Number(e.target.value) }))
            }
            className="w-full accent-indigo-500 cursor-pointer"
          />
        </div>
      </div>

      {/* Rounding & Borders */}
      <div className="space-y-4 pt-4 border-t border-neutral-800">
        <div>
          <div className="flex justify-between text-xs font-medium text-neutral-300 mb-1.5">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-pink-400" /> Cell Corner Radius
            </span>
            <span className="font-mono text-neutral-400">{state.cellRadius}px</span>
          </div>
          <input
            type="range"
            min="0"
            max="36"
            value={state.cellRadius}
            onChange={e =>
              onChangeState(prev => ({ ...prev, cellRadius: Number(e.target.value) }))
            }
            className="w-full accent-indigo-500 cursor-pointer"
          />
        </div>

        <div>
          <div className="flex justify-between text-xs font-medium text-neutral-300 mb-1.5">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-pink-400" /> Canvas Radius
            </span>
            <span className="font-mono text-neutral-400">{state.canvasRadius}px</span>
          </div>
          <input
            type="range"
            min="0"
            max="36"
            value={state.canvasRadius}
            onChange={e =>
              onChangeState(prev => ({ ...prev, canvasRadius: Number(e.target.value) }))
            }
            className="w-full accent-indigo-500 cursor-pointer"
          />
        </div>
      </div>

      {/* Shadows */}
      <div className="pt-4 border-t border-neutral-800">
        <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400 flex items-center gap-1.5 mb-2.5">
          <Droplet className="w-3.5 h-3.5 text-amber-400" /> Cell Drop Shadow
        </label>
        <div className="grid grid-cols-3 gap-2">
          {(['none', 'sm', 'md', 'lg', 'xl', '2xl'] as CollageState['cellShadow'][]).map(
            shadow => (
              <button
                key={shadow}
                onClick={() => onChangeState(prev => ({ ...prev, cellShadow: shadow }))}
                className={`py-2 px-2.5 rounded-xl text-xs font-medium border transition-all cursor-pointer capitalize ${
                  state.cellShadow === shadow
                    ? 'bg-indigo-600/20 border-indigo-500 text-white'
                    : 'bg-neutral-900/60 border-neutral-800 text-neutral-400 hover:text-white'
                }`}
              >
                {shadow}
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
};
