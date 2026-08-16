import React, { useState } from 'react';
import { LayoutGrid, Sparkles, Sliders, Palette, Zap, ArrowRight } from 'lucide-react';
import { LAYOUT_PRESETS } from '../../core/layoutEngine';
import { Language, TRANSLATIONS } from '../../core/i18n';

interface LiveDemoProps {
  onOpenEditorWithPreset: (presetId: string) => void;
  language: Language;
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

export const LiveDemo: React.FC<LiveDemoProps> = ({ onOpenEditorWithPreset, language }) => {
  const [selectedLayoutId, setSelectedLayoutId] = useState('4-quad-grid');
  const [gap, setGap] = useState(12);
  const [radius, setRadius] = useState(16);
  const [gradientIdx, setGradientIdx] = useState(0);

  const t = TRANSLATIONS[language];
  const currentLayout = LAYOUT_PRESETS.find(p => p.id === selectedLayoutId) || LAYOUT_PRESETS[3];

  return (
    <section id="live-demo" className="py-20 bg-neutral-950 border-t border-b border-neutral-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white mb-3">
            {t.sandboxTitle}
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base">
            {t.sandboxSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Controls Column */}
          <div className="lg:col-span-5 space-y-6 bg-neutral-900/60 p-6 rounded-2xl border border-neutral-800 backdrop-blur-sm">
            {/* Layout selector */}
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400 flex items-center gap-2 mb-3">
                <LayoutGrid className="w-4 h-4 text-indigo-400" />
                {t.selectGridPreset}
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
                    <div className="truncate font-semibold">{preset.name}</div>
                    <div className="text-[10px] text-neutral-500">{preset.photoCount} slots</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Gap Slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400 flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-purple-400" />
                  {t.gridGap}
                </label>
                <span className="text-xs font-mono text-neutral-300">{gap}px</span>
              </div>
              <input
                type="range"
                min="0"
                max="32"
                value={gap}
                onChange={e => setGap(Number(e.target.value))}
                className="w-full accent-indigo-500 bg-neutral-800 h-1.5 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            {/* Radius Slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-pink-400" />
                  {t.cornerRounding}
                </label>
                <span className="text-xs font-mono text-neutral-300">{radius}px</span>
              </div>
              <input
                type="range"
                min="0"
                max="32"
                value={radius}
                onChange={e => setRadius(Number(e.target.value))}
                className="w-full accent-pink-500 bg-neutral-800 h-1.5 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            {/* Gradient Selector */}
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400 flex items-center gap-2 mb-3">
                <Palette className="w-4 h-4 text-emerald-400" />
                {t.backdropTheme}
              </label>
              <div className="grid grid-cols-4 gap-2">
                {GRADIENTS.map((grad, idx) => (
                  <button
                    key={grad.name}
                    onClick={() => setGradientIdx(idx)}
                    className={`h-10 rounded-xl border transition-all cursor-pointer ${grad.style} ${
                      gradientIdx === idx ? 'border-white scale-105 shadow-md' : 'border-neutral-800 opacity-60 hover:opacity-100'
                    }`}
                    title={grad.name}
                  />
                ))}
              </div>
            </div>

            {/* Jump into full editor CTA */}
            <button
              onClick={() => onOpenEditorWithPreset(selectedLayoutId)}
              className="w-full py-3.5 px-4 bg-gradient-to-r from-indigo-500 to-pink-500 hover:from-indigo-600 hover:to-pink-600 text-white font-semibold text-xs rounded-xl shadow-lg shadow-indigo-500/20 flex items-center justify-center gap-2 transition-all hover:scale-[1.02] cursor-pointer"
            >
              <Zap className="w-4 h-4" />
              <span>{t.customizeInStudio}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Sandbox Canvas Preview Column */}
          <div className="lg:col-span-7 flex items-center justify-center p-4">
            <div
              className={`w-full max-w-lg aspect-video rounded-3xl p-6 shadow-2xl border border-neutral-800 flex flex-col transition-all duration-300 ${GRADIENTS[gradientIdx].style}`}
            >
              <div className="w-full h-full relative" style={{ minHeight: 0 }}>
                {currentLayout.cells.map((cell, idx) => {
                  const imgUrl = DEMO_IMAGES[idx % DEMO_IMAGES.length];
                  return (
                    <div
                      key={idx}
                      style={{
                        position: 'absolute',
                        left: `calc(${cell.x * 100}% + ${cell.x > 0 ? gap / 2 : 0}px)`,
                        top: `calc(${cell.y * 100}% + ${cell.y > 0 ? gap / 2 : 0}px)`,
                        width: `calc(${cell.w * 100}% - ${gap > 0 ? gap / 2 : 0}px)`,
                        height: `calc(${cell.h * 100}% - ${gap > 0 ? gap / 2 : 0}px)`,
                        borderRadius: `${radius}px`,
                      }}
                      className="overflow-hidden shadow-lg border border-white/10 group bg-neutral-900 relative transition-all"
                    >
                      <img
                        src={imgUrl}
                        alt="Demo cell"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
