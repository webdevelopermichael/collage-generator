import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Zap, Layers, Download, Wand2 } from 'lucide-react';
import { Language, TRANSLATIONS } from '../../core/i18n';

interface HeroProps {
  onOpenEditor: () => void;
  onOpenAiTab: () => void;
  language: Language;
}

export const Hero: React.FC<HeroProps> = ({ onOpenEditor, onOpenAiTab, language }) => {
  const t = TRANSLATIONS[language];

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
            <span className="text-emerald-400 font-semibold">{t.heroBadgeNew}</span>
            <span>{t.heroBadgeText}</span>
          </div>

          {/* Main H1 for SEO */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-heading font-extrabold tracking-tight text-white mb-6 leading-[1.1]">
            {t.heroTitle1}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
              {t.heroTitleGradient}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-xl text-neutral-400 mb-10 leading-relaxed max-w-2xl mx-auto">
            {t.heroSubtitle}
          </p>

          {/* Main Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <button
              onClick={onOpenEditor}
              className="w-full sm:w-auto flex items-center justify-center gap-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:to-pink-600 text-white font-semibold px-8 py-4 rounded-2xl shadow-xl shadow-indigo-500/25 text-base transition-all hover:scale-105 cursor-pointer"
            >
              <Zap className="w-5 h-5" />
              <span>{t.heroCtaStudio}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenAiTab}
              className="w-full sm:w-auto flex items-center justify-center gap-2.5 bg-neutral-900/90 hover:bg-neutral-800 text-neutral-200 border border-neutral-700/80 font-medium px-7 py-4 rounded-2xl text-base transition-all cursor-pointer hover:border-neutral-600"
            >
              <Wand2 className="w-5 h-5 text-pink-400" />
              <span>{t.heroCtaAi}</span>
            </button>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-neutral-400 pt-4 border-t border-neutral-800/60 max-w-xl mx-auto">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>{t.trustNoWatermark}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Download className="w-4 h-4 text-indigo-400" />
              <span>{t.trustInstantExport}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-purple-400" />
              <span>{t.trustPrivate}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-pink-400" />
              <span>{t.trustFree}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
