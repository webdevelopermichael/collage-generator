import React from 'react';
import { Wand2, Rocket, TrendingUp, Star, ShieldCheck, ArrowRight } from 'lucide-react';
import { POPULAR_TEMPLATES } from '../../core/aiComposerEngine';

interface AiSectionProps {
  onSelectAiPreset: (templateId: string) => void;
}

export const AiSection: React.FC<AiSectionProps> = ({ onSelectAiPreset }) => {
  return (
    <section id="ai-generator" className="py-24 bg-gradient-to-b from-neutral-950 via-indigo-950/20 to-neutral-950 border-t border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Explainer */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/30 text-xs font-semibold text-pink-400">
              <Wand2 className="w-3.5 h-3.5" />
              <span>Smart AI Composition</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-heading font-bold text-white leading-tight">
              Curated Popular Templates & Natural Language Generator
            </h2>

            <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
              Choose from top trending templates for Instagram, TikTok, and SaaS product launches — complete with matching aesthetic stock photos and high-conversion social proof badges.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3 text-sm text-neutral-300">
                <div className="p-1 rounded bg-emerald-500/20 text-emerald-400 mt-0.5">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <span>Curated photo sets matching each aesthetic mood and color palette.</span>
              </div>
              <div className="flex items-start gap-3 text-sm text-neutral-300">
                <div className="p-1 rounded bg-amber-500/20 text-amber-400 mt-0.5">
                  <Star className="w-4 h-4" />
                </div>
                <span>Natural Language Parsing: detects slot count, aspect ratios, and tags from text.</span>
              </div>
              <div className="flex items-start gap-3 text-sm text-neutral-300">
                <div className="p-1 rounded bg-indigo-500/20 text-indigo-400 mt-0.5">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <span>Instant 1-click apply: preserves your custom photos when switching styles.</span>
              </div>
            </div>
          </div>

          {/* Right Column: AI Templates Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {POPULAR_TEMPLATES.slice(0, 4).map(tmpl => (
              <div
                key={tmpl.id}
                onClick={() => onSelectAiPreset(tmpl.id)}
                className="p-5 rounded-2xl bg-neutral-900/80 border border-neutral-800 hover:border-pink-500/50 hover:bg-neutral-900 transition-all cursor-pointer group relative overflow-hidden shadow-xl flex flex-col justify-between"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-pink-500/5 rounded-full blur-2xl group-hover:bg-pink-500/15 transition-all" />

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-bold text-pink-400 bg-pink-500/10 px-2 py-0.5 rounded-full border border-pink-500/20">
                      {tmpl.badgeLabel}
                    </span>
                    <span className="text-[10px] font-mono text-neutral-400 bg-neutral-950 px-1.5 py-0.5 rounded">
                      {tmpl.aspectRatio}
                    </span>
                  </div>

                  <h3 className="font-heading font-bold text-base text-white mb-1.5 group-hover:text-pink-300 transition-colors">
                    {tmpl.name}
                  </h3>
                  <p className="text-xs text-neutral-400 mb-3 leading-relaxed">{tmpl.description}</p>
                </div>

                {/* Mini Preview Photos Strip */}
                <div className="grid grid-cols-4 gap-1 h-10 overflow-hidden rounded-lg mb-3">
                  {tmpl.defaultImages.slice(0, 4).map((img, i) => (
                    <img key={i} src={img} alt="Mini preview" className="w-full h-full object-cover rounded" />
                  ))}
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-neutral-800 text-xs font-semibold text-pink-400">
                  <span>Use Template</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
