import React from 'react';
import { Wand2, TrendingUp, Star, ShieldCheck, ArrowRight } from 'lucide-react';
import { POPULAR_TEMPLATES } from '../../core/aiComposerEngine';
import { Language, TRANSLATIONS } from '../../core/i18n';

interface AiSectionProps {
  onSelectAiPreset: (templateId: string) => void;
  language: Language;
}

export const AiSection: React.FC<AiSectionProps> = ({ onSelectAiPreset, language }) => {
  const t = TRANSLATIONS[language];

  return (
    <section id="ai-generator" className="py-24 bg-gradient-to-b from-neutral-950 via-indigo-950/20 to-neutral-950 border-t border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Explainer */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/30 text-xs font-semibold text-pink-400">
              <Wand2 className="w-3.5 h-3.5" />
              <span>{t.aiBadge}</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-heading font-bold text-white leading-tight">
              {t.aiTitle}
            </h2>

            <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
              {t.aiSubtitle}
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3 text-sm text-neutral-300">
                <div className="p-1 rounded bg-emerald-500/20 text-emerald-400 mt-0.5">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <span>{t.aiPoint1}</span>
              </div>
              <div className="flex items-start gap-3 text-sm text-neutral-300">
                <div className="p-1 rounded bg-amber-500/20 text-amber-400 mt-0.5">
                  <Star className="w-4 h-4" />
                </div>
                <span>{t.aiPoint2}</span>
              </div>
              <div className="flex items-start gap-3 text-sm text-neutral-300">
                <div className="p-1 rounded bg-indigo-500/20 text-indigo-400 mt-0.5">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <span>{t.aiPoint3}</span>
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
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-md bg-neutral-800 text-neutral-400 border border-neutral-700/50">
                      {tmpl.aspectRatio}
                    </span>
                    <span className="text-xs font-semibold text-pink-400">
                      {tmpl.category}
                    </span>
                  </div>

                  <h3 className="font-heading font-bold text-base text-white mb-2 group-hover:text-pink-300 transition-colors">
                    {tmpl.name}
                  </h3>

                  <p className="text-neutral-400 text-xs line-clamp-2 mb-4">
                    {tmpl.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-neutral-800/80 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-[11px] text-neutral-500">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>Auto-compose</span>
                  </div>
                  <span className="text-xs font-bold text-indigo-400 group-hover:text-pink-400 flex items-center gap-1 transition-colors">
                    <span>{t.applyPreset}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
