import React, { useState } from 'react';
import { CollageState } from '../../../types';
import {
  POPULAR_TEMPLATES,
  applyPopularTemplate,
  synthesizePromptToCollage,
  parseUserPrompt,
} from '../../../core/aiComposerEngine';
import { Wand2, Sparkles, RefreshCw, Layers, Check, Search } from 'lucide-react';
import confetti from 'canvas-confetti';

interface AiComposerTabProps {
  state: CollageState;
  onChangeState: (updater: (prev: CollageState) => CollageState) => void;
}

export const AiComposerTab: React.FC<AiComposerTabProps> = ({ state, onChangeState }) => {
  const [selectedTemplateId, setSelectedTemplateId] = useState(POPULAR_TEMPLATES[0].id);
  const [customPrompt, setCustomPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

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
      // Keep existing user photos if they already uploaded custom ones, otherwise use template's curated photos
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
      {/* Header Info */}
      <div className="bg-gradient-to-br from-pink-950/40 via-purple-950/30 to-indigo-950/40 p-4 rounded-2xl border border-pink-500/20">
        <div className="flex items-center gap-2 text-pink-400 font-semibold text-xs mb-1">
          <Sparkles className="w-4 h-4" />
          <span>Smart AI Template & Prompt Studio</span>
        </div>
        <p className="text-xs text-neutral-300 leading-relaxed">
          One-click setup for trending social and SaaS collages with matching high-res photos, or describe your
          requirements in plain words (e.g. <em>«коллаж на 4 картинки в сторис с метриками»</em>).
        </p>
      </div>

      {/* 1. Popular Standard Templates */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
            1. Popular Curated Templates
          </label>
        </div>

        {/* Category filters */}
        <div className="flex gap-1.5 overflow-x-auto pb-2 mb-2 scrollbar-none text-[11px]">
          {['all', 'aesthetic', 'saas', 'social', 'trending', 'ecommerce'].map(cat => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-2.5 py-1 rounded-lg capitalize whitespace-nowrap border transition-colors cursor-pointer ${
                categoryFilter === cat
                  ? 'bg-pink-500/20 text-pink-300 border-pink-500/50 font-semibold'
                  : 'bg-neutral-900/60 text-neutral-400 border-neutral-800 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Templates cards list */}
        <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
          {filteredTemplates.map(tmpl => {
            const isSelected = selectedTemplateId === tmpl.id;
            return (
              <button
                key={tmpl.id}
                onClick={() => handleApplyPopularTemplate(tmpl.id)}
                className={`w-full p-3 rounded-2xl border text-left transition-all cursor-pointer group ${
                  isSelected
                    ? 'bg-pink-950/30 border-pink-500 shadow-md ring-1 ring-pink-500/40'
                    : 'bg-neutral-900/70 border-neutral-800 hover:bg-neutral-900 hover:border-neutral-700'
                }`}
              >
                {/* Header row */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-xs text-white group-hover:text-pink-300 transition-colors">
                      {tmpl.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-bold text-pink-400 bg-pink-500/10 px-2 py-0.5 rounded-full border border-pink-500/20">
                      {tmpl.badgeLabel}
                    </span>
                    <span className="text-[10px] font-mono text-neutral-400 bg-neutral-950 px-1.5 py-0.5 rounded">
                      {tmpl.aspectRatio}
                    </span>
                  </div>
                </div>

                {/* Images Preview Strip */}
                <div className="grid grid-cols-4 gap-1.5 mb-2 h-12 overflow-hidden rounded-lg">
                  {tmpl.defaultImages.slice(0, 4).map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      alt={`Preview ${i}`}
                      className="w-full h-full object-cover rounded"
                    />
                  ))}
                </div>

                <p className="text-[11px] text-neutral-400 leading-snug line-clamp-2">
                  {tmpl.description}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Natural Language Prompt Parser */}
      <div className="pt-2 border-t border-neutral-800">
        <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400 block mb-1.5">
          2. Custom Prompt & Smart Instruction
        </label>
        <p className="text-[11px] text-neutral-500 mb-2.5">
          Type instructions like number of slots (e.g. <em>«3 фото»</em>, <em>«6 картинок»</em>), target format (<em>«сторис 9:16»</em>, <em>«инстаграм 4:5»</em>, <em>«saas launch»</em>):
        </p>

        <textarea
          rows={3}
          value={customPrompt}
          onChange={e => setCustomPrompt(e.target.value)}
          placeholder="Например: Сделай коллаж на 4 картинки в формате 4:5 для инстаграма с темой путешествия и бейджем..."
          className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-colors resize-none"
        />

        {/* Live Detected Parameters from Prompt */}
        {promptInsights && (
          <div className="mt-2 p-2.5 bg-neutral-950 rounded-xl border border-neutral-800 text-[11px] space-y-1 text-neutral-400">
            <div className="font-semibold text-neutral-300 flex items-center gap-1.5">
              <Search className="w-3.5 h-3.5 text-pink-400" />
              <span>AI Detected Instructions:</span>
            </div>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {promptInsights.photoCount && (
                <span className="px-2 py-0.5 bg-indigo-500/20 border border-indigo-500/40 text-indigo-300 rounded font-medium">
                  {promptInsights.photoCount} Photos / Slots
                </span>
              )}
              {promptInsights.aspectRatio && (
                <span className="px-2 py-0.5 bg-purple-500/20 border border-purple-500/40 text-purple-300 rounded font-medium">
                  Ratio {promptInsights.aspectRatio}
                </span>
              )}
              <span className="px-2 py-0.5 bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 rounded font-medium">
                Theme: {promptInsights.detectedThemeName}
              </span>
            </div>
          </div>
        )}

        <button
          onClick={handleSynthesizePrompt}
          disabled={isGenerating || !customPrompt.trim()}
          className="w-full mt-3 py-3 px-4 bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 hover:from-pink-600 hover:to-indigo-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg shadow-pink-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50 hover:scale-[1.01]"
        >
          {isGenerating ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Applying AI Settings & Photos...</span>
            </>
          ) : (
            <>
              <Wand2 className="w-4 h-4" />
              <span>Generate from Prompt</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
