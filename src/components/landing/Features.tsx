import React from 'react';
import { LayoutGrid, Sparkles, Monitor, Sliders, Lock, Palette } from 'lucide-react';
import { Language, TRANSLATIONS } from '../../core/i18n';

interface FeaturesProps {
  language: Language;
}

export const Features: React.FC<FeaturesProps> = ({ language }) => {
  const t = TRANSLATIONS[language];

  const featureList = [
    {
      icon: LayoutGrid,
      title: t.feat1Title,
      description: t.feat1Desc,
      color: 'text-indigo-400',
      bg: 'bg-indigo-500/10',
      border: 'border-indigo-500/20',
    },
    {
      icon: Sparkles,
      title: t.feat2Title,
      description: t.feat2Desc,
      color: 'text-pink-400',
      bg: 'bg-pink-500/10',
      border: 'border-pink-500/20',
    },
    {
      icon: Sliders,
      title: t.feat3Title,
      description: t.feat3Desc,
      color: 'text-purple-400',
      bg: 'bg-purple-500/10',
      border: 'border-purple-500/20',
    },
    {
      icon: Monitor,
      title: t.feat4Title,
      description: t.feat4Desc,
      color: 'text-amber-400',
      bg: 'bg-amber-500/10',
      border: 'border-amber-500/20',
    },
    {
      icon: Palette,
      title: t.feat5Title,
      description: t.feat5Desc,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/20',
    },
    {
      icon: Lock,
      title: t.feat6Title,
      description: t.feat6Desc,
      color: 'text-blue-400',
      bg: 'bg-blue-500/10',
      border: 'border-blue-500/20',
    },
  ];

  return (
    <section id="features" className="py-24 bg-neutral-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white mb-4">
            {t.featuresTitle}
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
            {t.featuresSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featureList.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="p-7 rounded-3xl bg-neutral-900/60 border border-neutral-800/80 hover:border-neutral-700 transition-all hover:-translate-y-1 group"
              >
                <div className={`w-12 h-12 rounded-2xl ${feat.bg} ${feat.border} border flex items-center justify-center mb-6`}>
                  <Icon className={`w-6 h-6 ${feat.color}`} />
                </div>
                <h3 className="text-lg font-heading font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors">
                  {feat.title}
                </h3>
                <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed">
                  {feat.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
