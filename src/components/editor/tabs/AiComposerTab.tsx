import React, { useState } from 'react';
import { CollageState } from '../../../types';
import {
  POPULAR_TEMPLATES,
  applyPopularTemplate,
  synthesizePromptToCollage,
  parseUserPrompt,
} from '../../../core/aiComposerEngine';
import { Wand2, Sparkles, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Language, TRANSLATIONS } from '../../../core/i18n';
import { getTemplateI18n } from '../../../core/contentTranslations';

interface AiComposerTabProps {
  state: CollageState;
  onChangeState: (updater: (prev: CollageState) => CollageState) => void;
  language: Language;
}

export const AiComposerTab: React.FC<AiComposerTabProps> = ({ state, onChangeState, language }) => {
  const [selectedTemplateId, setSelectedTemplateId] = useState(POPULAR_TEMPLATES[0].id);
  const [customPrompt, setCustomPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const t = TRANSLATIONS[language];

  // Filter templates
  const filteredTemplates = categoryFilter === 'all'
    ? POPULAR_TEMPLATES
    : POPULAR_TEMPLATES.filter(t => t.category === categoryFilter);

  // Live parsed prompt insights
  const promptInsights = customPrompt.trim().length > 2 ? parseUserPrompt(customPrompt) : null;

  const handleApplyPopularTemplate = (templateId: string) => {
    setSelectedTemplateId(templateId);
    setIsGenerating(true);

    setTimeout(() => {
      setIsGenerating(false);
      const userUploadedImages = state.cells.map(c => c.imageUrl).filter(Boolean) as string[];
      const synthesized = applyPopularTemplate(templateId, userUploadedImages);

      onChangeState(prev => ({
        ...prev,
        ...synthesized,
      }));

      try {
        confetti({ particleCount: 35, spread: 50, origin: { y: 0.5 } });
      } catch {
        // ignore
      }
    }, 350);
  };

  const handleSynthesizePrompt = () => {
    if (!customPrompt.trim()) return;
    setIsGenerating(true);

    setTimeout(() => {
      setIsGenerating(false);
      const userUploadedImages = state.cells.map(c => c.imageUrl).filter(Boolean) as string[];
      const synthesized = synthesizePromptToCollage(customPrompt, userUploadedImages);

      onChangeState(prev => ({
        ...prev,
        ...synthesized,
      }));

      try {
        confetti({ particleCount: 45, spread: 60, origin: { y: 0.5 } });
      } catch {
        // ignore
      }
    }, 450);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xs font-semibold uppercase tracking-wider text-pink-400 mb-1 flex items-center gap-1.5">
          <Wand2 className="w-3.5 h-3.5" />
          {t.aiStudioTitle}
        </h3>
        <p className="text-xs text-neutral-500">
          {t.aiStudioSubtitle}
        </p>
      </div>

      {/* Natural Language Prompt Box */}
      <div className="p-3.5 rounded-2xl bg-neutral-900/90 border border-pink-500/30 shadow-lg shadow-pink-500/5 space-y-3">
        <div className="flex items-center justify-between text-xs font-bold text-neutral-200">
          <span className="flex items-center gap-1.5 text-pink-400">
            <Sparkles className="w-3.5 h-3.5" />
            AI Prompt Generator
          </span>
          <span className="text-[10px] text-neutral-500 font-mono">Natural Language</span>
        </div>

        <textarea
          rows={3}
          value={customPrompt}
          onChange={e => setCustomPrompt(e.target.value)}
          placeholder={t.promptPlaceholder}
          className="w-full bg-neutral-950 border border-neutral-800 focus:border-pink-500 rounded-xl p-2.5 text-xs text-neutral-200 placeholder:text-neutral-600 focus:outline-none resize-none transition-colors"
        />

        {/* Live Detected Intent Badges */}
        {promptInsights && (
          <div className="flex flex-wrap items-center gap-1.5 pt-1 text-[10px] text-neutral-400">
            {promptInsights.photoCount && (
              <span className="px-2 py-0.5 rounded-md bg-neutral-800 text-pink-300 font-mono">
                Slots: {promptInsights.photoCount}
              </span>
            )}
            {promptInsights.aspectRatio && (
              <span className="px-2 py-0.5 rounded-md bg-neutral-800 text-indigo-300 font-mono">
                Ratio: {promptInsights.aspectRatio}
              </span>
            )}
            <span className="px-2 py-0.5 rounded-md bg-neutral-800 text-emerald-300 font-mono">
              Theme: {promptInsights.detectedThemeName}
            </span>
          </div>
        )}

        <button
          onClick={handleSynthesizePrompt}
          disabled={!customPrompt.trim() || isGenerating}
          className="w-full py-2.5 px-4 bg-gradient-to-r from-pink-500 to-indigo-600 hover:from-pink-600 hover:to-indigo-700 text-white font-bold text-xs rounded-xl shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-40"
        >
          {isGenerating ? (
            <>
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              <span>Generating...</span>
            </>
          ) : (
            <>
              <Wand2 className="w-3.5 h-3.5" />
              <span>{t.generateCollageBtn}</span>
            </>
          )}
        </button>
      </div>

      {/* Category Tabs */}
      <div>
        <div className="flex items-center gap-1.5 p-1 bg-neutral-950 rounded-xl border border-neutral-800 mb-3 overflow-x-auto">
          {[
            { id: 'all', label: t.categoryAll },
            { id: 'social', label: t.categorySocial },
            { id: 'saas', label: t.categorySaas },
            { id: 'aesthetic', label: t.categoryArt },
          ].map(cat => (
            <button
              key={cat.id}
              onClick={() => setCategoryFilter(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                categoryFilter === cat.id
                  ? 'bg-neutral-800 text-white shadow-sm'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Templates Grid with Multi-language Translation */}
        <div className="space-y-3">
          {filteredTemplates.map(tmpl => {
            const isSelected = selectedTemplateId === tmpl.id;
            const { name: translatedName, description: translatedDesc, category: translatedCat } = getTemplateI18n(
              tmpl.id,
              tmpl.name,
              tmpl.description,
              tmpl.category,
              language
            );

            return (
              <div
                key={tmpl.id}
                onClick={() => handleApplyPopularTemplate(tmpl.id)}
                className={`p-3.5 rounded-2xl bg-neutral-900/70 border transition-all cursor-pointer group hover:bg-neutral-900 flex flex-col justify-between ${
                  isSelected
                    ? 'border-pink-500 ring-2 ring-pink-500/20 bg-neutral-900 shadow-md shadow-pink-500/10'
                    : 'border-neutral-800 hover:border-neutral-700'
                }`}
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold text-white group-hover:text-pink-300 transition-colors">
                        {translatedName}
                      </span>
                      <span className="text-[9px] uppercase font-mono px-1.5 py-0.5 rounded bg-neutral-800 text-neutral-400">
                        {tmpl.aspectRatio}
                      </span>
                    </div>
                    <p className="text-[11px] text-neutral-400 leading-relaxed">
                      {translatedDesc}
                    </p>
                  </div>

                  <div className="shrink-0 p-1 rounded-lg bg-neutral-800 text-neutral-400 group-hover:text-pink-400 group-hover:bg-pink-950/40 transition-colors">
                    <Wand2 className="w-3.5 h-3.5" />
                  </div>
                </div>

                <div className="flex items-center justify-between text-[10px] text-neutral-500 pt-2 border-t border-neutral-800/60">
                  <span className="capitalize">{translatedCat} • {tmpl.defaultBadges.length} {language === 'ua' ? 'стікери' : language === 'ru' ? 'стикера' : 'stickers'}</span>
                  <span className="text-pink-400 font-semibold group-hover:underline">
                    {t.applyPreset} →
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
