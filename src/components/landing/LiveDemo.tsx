import React, { useState } from 'react';
import { LayoutGrid, Sparkles, Sliders, Palette, Zap, ArrowRight } from 'lucide-react';
import { LAYOUT_PRESETS } from '../../core/layoutEngine';

interface LiveDemoProps {
  onOpenEditorWithPreset: (presetId: string) => void;
}

const DEMO_IMAGES = [
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=600&auto=format&fit=crop&q=80',
];

const GRADIENTS = [
  { name: 'Dark Indigo', style: 'bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950' },
  { name: 'Sunset Glow', style: 'bg-gradient-to-br from-purple-950 via-pink-950 to-rose-950' },
  { name: 'Emerald Forest', style: 'bg-gradient-to-br from-zinc-950 via-emerald-950 to-teal-950' },
  { name: 'Midnight Minimal', style: 'bg-gradient-to-b from-neutral-900 to-neutral-950' },
];

export const LiveDemo: React.FC<LiveDemoProps> = ({ onOpenEditorWithPreset }) => {
  const [selectedLayoutId, setSelectedLayoutId] = useState('4-quad-grid');
  const [gap, setGap] = useState(12);
  const [radius, setRadius] = useState(16);
  const [gradientIdx, setGradientIdx] = useState(0);

  const currentLayout = LAYOUT_PRESETS.find(p => p.id === selectedLayoutId) || LAYOUT_PRESETS[3];

  return (
    <section id="live-demo" className="py-20 bg-neutral-950 border-t border-b border-neutral-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white mb-3">
            Interactive Live Sandbox
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base">
            Test layout grids, corner radii, and aesthetic mesh backgrounds in real-time before jumping into the studio.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Controls Column */}
          <div className="lg:col-span-5 space-y-6 bg-neutral-900/60 p-6 rounded-2xl border border-neutral-800 backdrop-blur-sm">
            {/* Layout selector */}
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400 flex items-center gap-2 mb-3">
                <LayoutGrid className="w-4 h-4 text-indigo-400" />
                Select Grid Preset
              </label>
              <div className="grid grid-cols-3 gap-2">
                {LAYOUT_PRESETS.slice(0, 6).map(preset => (
                  <button
                    key={preset.id}
                    onClick={() => setSelectedLayoutId(preset.id)}
                    className={`px-3 py-2.5 rounded-xl text-xs font-medium text-left border transition-all cursor-pointer ${
                      selectedLayoutId === preset.id
                        ? 'bg-indigo-600/20 border-indigo-500 text-white shadow-sm'
                        : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700'
                    }`}
                  >
                    <div className="font-semibold">{preset.name.split(' ')[1] || preset.name}</div>
                    <div className="text-[10px] text-neutral-500">{preset.photoCount} slots</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Gap and Radius Sliders */}
            <div className="space-y-4 pt-2 border-t border-neutral-800">
              <div>
                <div className="flex justify-between text-xs font-medium text-neutral-300 mb-1.5">
                  <span className="flex items-center gap-1.5">
                    <Sliders className="w-3.5 h-3.5 text-indigo-400" /> Cell Gap
                  </span>
                  <span className="font-mono text-neutral-400">{gap}px</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="32"
                  value={gap}
                  onChange={e => setGap(Number(e.target.value))}
                  className="w-full accent-indigo-500 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-medium text-neutral-300 mb-1.5">
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-pink-400" /> Corner Radius
                  </span>
                  <span className="font-mono text-neutral-400">{radius}px</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="36"
                  value={radius}
                  onChange={e => setRadius(Number(e.target.value))}
                  className="w-full accent-indigo-500 cursor-pointer"
                />
              </div>
            </div>

            {/* Background Selector */}
            <div className="pt-2 border-t border-neutral-800">
              <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400 flex items-center gap-2 mb-3">
                <Palette className="w-4 h-4 text-purple-400" /> Background Theme
              </label>
              <div className="flex gap-2">
                {GRADIENTS.map((g, idx) => (
                  <button
                    key={g.name}
                    onClick={() => setGradientIdx(idx)}
                    title={g.name}
                    className={`w-10 h-10 rounded-xl ${g.style} border-2 transition-all cursor-pointer ${
                      gradientIdx === idx ? 'border-white scale-110 shadow-lg' : 'border-neutral-700 hover:border-neutral-500'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Jump to full editor button */}
            <button
              onClick={() => onOpenEditorWithPreset(selectedLayoutId)}
              className="w-full mt-4 flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-indigo-500 to-pink-500 hover:from-indigo-600 hover:to-pink-600 text-white text-sm font-semibold rounded-xl shadow-lg shadow-indigo-500/20 cursor-pointer transition-all"
            >
              <span>Edit this template in Studio</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Interactive Canvas Stage Preview */}
          <div className="lg:col-span-7">
            <div
              className={`relative rounded-3xl p-6 sm:p-8 aspect-[16/9] ${GRADIENTS[gradientIdx].style} border border-neutral-700/80 shadow-2xl transition-all duration-300 flex items-center justify-center overflow-hidden`}
            >
              {/* Dynamic Grid Rendering */}
              <div
                className="w-full h-full relative"
                style={{
                  padding: '8px',
                }}
              >
                {currentLayout.cells.map((cell, idx) => {
                  const imgSrc = DEMO_IMAGES[idx % DEMO_IMAGES.length];
                  return (
                    <div
                      key={idx}
                      className="absolute overflow-hidden shadow-xl border border-white/20 transition-all duration-300 group"
                      style={{
                        left: `calc(${cell.x * 100}% + ${cell.x > 0 ? gap / 2 : 0}px)`,
                        top: `calc(${cell.y * 100}% + ${cell.y > 0 ? gap / 2 : 0}px)`,
                        width: `calc(${cell.w * 100}% - ${gap > 0 ? gap * (1 - cell.w) : 0}px)`,
                        height: `calc(${cell.h * 100}% - ${gap > 0 ? gap * (1 - cell.h) : 0}px)`,
                        borderRadius: `${radius}px`,
                      }}
                    >
                      <img
                        src={imgSrc}
                        alt={`Demo slot ${idx + 1}`}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  );
                })}
              </div>

              {/* Sample Floating Metric Badge */}
              <div className="absolute bottom-5 left-8 bg-neutral-950/90 backdrop-blur-md border border-emerald-500/40 rounded-xl px-3.5 py-2 shadow-2xl">
                <div className="text-[9px] uppercase font-bold text-neutral-400">Live Preview Engine</div>
                <div className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Sub-pixel Canvas Rendering</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
