import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Zap, Layers, Download, Wand2 } from 'lucide-react';

interface HeroProps {
  onOpenEditor: () => void;
  onOpenAiTab: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenEditor, onOpenAiTab }) => {
  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-32 overflow-hidden">
      {/* Background glowing gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-indigo-600/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[300px] bg-pink-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-900/90 border border-neutral-800 text-xs font-medium text-neutral-300 mb-6 shadow-inner">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-emerald-400 font-semibold">New in 2026:</span>
            <span>AI Multi-Screenshot Mockups & Metric Badges</span>
          </div>

          {/* Main H1 for SEO */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-heading font-extrabold tracking-tight text-white mb-6 leading-[1.1]">
            Create Aesthetic Photo Collages &{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
              SaaS Mockups in Seconds
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-xl text-neutral-400 mb-10 leading-relaxed max-w-2xl mx-auto">
            The free browser-based collage creator with intelligent bento layouts, metric KPI stickers,
            custom aspect ratios, and instant 4K Ultra-HD export. No watermark, no signup needed.
          </p>

          {/* Main Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <button
              onClick={onOpenEditor}
              className="w-full sm:w-auto flex items-center justify-center gap-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:to-pink-600 text-white font-semibold px-8 py-4 rounded-2xl shadow-xl shadow-indigo-500/25 text-base transition-all hover:scale-105 cursor-pointer"
            >
              <Zap className="w-5 h-5" />
              <span>Launch Studio Editor</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenAiTab}
              className="w-full sm:w-auto flex items-center justify-center gap-2.5 bg-neutral-900/90 hover:bg-neutral-800 text-neutral-200 border border-neutral-700/80 font-medium px-7 py-4 rounded-2xl text-base transition-all cursor-pointer hover:border-neutral-600"
            >
              <Wand2 className="w-5 h-5 text-pink-400" />
              <span>Try AI Composer</span>
            </button>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-neutral-400 pt-4 border-t border-neutral-800/60 max-w-xl mx-auto">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>100% Client-Side Privacy</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Download className="w-4 h-4 text-indigo-400" />
              <span>4K Ultra-HD Export</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-purple-400" />
              <span>Masonry & Bento Grids</span>
            </div>
          </div>
        </div>

        {/* Hero Interactive Visual Showcase */}
        <div className="mt-14 relative max-w-5xl mx-auto">
          <div className="relative rounded-3xl p-3 sm:p-5 bg-gradient-to-b from-neutral-800/60 to-neutral-900/80 border border-neutral-700/70 shadow-2xl shadow-indigo-950/40 backdrop-blur-xl">
            {/* Window chrome dots */}
            <div className="flex items-center justify-between pb-3 px-3 border-b border-neutral-800">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
              </div>
              <span className="text-[11px] font-mono text-neutral-400">collagenie_live_preview.canvas</span>
              <div className="flex items-center gap-2 text-xs text-neutral-400">
                <span className="px-2 py-0.5 rounded bg-neutral-800 text-[10px] text-neutral-300">16:9 • 4K</span>
              </div>
            </div>

            {/* Collage Canvas Graphic */}
            <div className="mt-3 relative rounded-2xl overflow-hidden aspect-[16/9] bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950 p-4 sm:p-6 grid grid-cols-12 gap-3 sm:gap-4 shadow-inner">
              {/* Card 1 (Hero Left) */}
              <div className="col-span-7 rounded-xl sm:rounded-2xl overflow-hidden relative shadow-2xl border border-white/15 group">
                <img
                  src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1000&auto=format&fit=crop&q=80"
                  alt="Abstract 3D design"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Metric Badge 1 */}
                <div className="absolute top-3 left-3 bg-neutral-950/85 backdrop-blur-md border border-emerald-500/40 rounded-xl p-2.5 shadow-xl">
                  <div className="text-[9px] sm:text-[10px] uppercase font-bold tracking-wider text-neutral-400">Monthly Revenue</div>
                  <div className="text-xs sm:text-sm font-bold text-white flex items-center gap-1">
                    <span>$48,200 MRR</span>
                    <span className="text-emerald-400 text-[10px]">(+142%)</span>
                  </div>
                </div>
              </div>

              {/* Right Column (2 Bento Items) */}
              <div className="col-span-5 flex flex-col gap-3 sm:gap-4">
                <div className="flex-1 rounded-xl sm:rounded-2xl overflow-hidden relative shadow-xl border border-white/15 group">
                  <img
                    src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80"
                    alt="Retro synth tech"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Rating Badge */}
                  <div className="absolute bottom-2.5 right-2.5 bg-neutral-950/85 backdrop-blur-md border border-amber-500/40 rounded-lg px-2.5 py-1 text-[10px] sm:text-xs font-bold text-amber-300 shadow-lg">
                    ⭐ 4.9 Product of the Day
                  </div>
                </div>

                <div className="flex-1 rounded-xl sm:rounded-2xl overflow-hidden relative shadow-xl border border-white/15 group">
                  <img
                    src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&auto=format&fit=crop&q=80"
                    alt="Modern interior"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Metric Badge 3 */}
                  <div className="absolute top-2.5 left-2.5 bg-neutral-950/85 backdrop-blur-md border border-indigo-500/40 rounded-lg px-2.5 py-1 text-[10px] sm:text-xs font-semibold text-indigo-200">
                    🚀 52k+ Creators
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
