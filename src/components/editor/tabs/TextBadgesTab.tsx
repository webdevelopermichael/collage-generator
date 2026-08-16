import React, { useState } from 'react';
import { CollageState, MetricBadge } from '../../../types';
import { Plus, Trash2, Sliders, Layers, X } from 'lucide-react';
import { Language, TRANSLATIONS } from '../../../core/i18n';

interface TextBadgesTabProps {
  state: CollageState;
  selectedBadgeId: string | null;
  onSelectBadge: (id: string | null) => void;
  onChangeState: (updater: (prev: CollageState) => CollageState) => void;
  language: Language;
}

const BADGE_TEMPLATES: Array<Omit<MetricBadge, 'id' | 'x' | 'y'>> = [
  { type: 'metric', title: 'Monthly Revenue', value: '$48,200 MRR (+142%)', color: 'emerald', scale: 1 },
  { type: 'rating', title: 'Product of the Day #1', value: '⭐ 4.9 (850+ reviews)', color: 'amber', scale: 1 },
  { type: 'metric', title: 'Community Size', value: '🚀 50,000+ Creators', color: 'indigo', scale: 1 },
  { type: 'tag', title: 'Status', value: '⚡ 99/100 Lighthouse Speed', color: 'blue', scale: 1 },
  { type: 'tag', title: 'Security', value: '🔒 SOC2 & GDPR Compliant', color: 'emerald', scale: 1 },
  { type: 'tag', title: 'Diff Tag', value: '✅ After AI Optimization', color: 'rose', scale: 1 },
];

export const TextBadgesTab: React.FC<TextBadgesTabProps> = ({
  state,
  selectedBadgeId,
  onSelectBadge,
  onChangeState,
  language,
}) => {
  const [newTitle, setNewTitle] = useState('');
  const [newValue, setNewValue] = useState('');
  const [newColor, setNewColor] = useState('emerald');

  const t = TRANSLATIONS[language];

  const handleAddCustomBadge = () => {
    if (!newTitle) return;
    const badge: MetricBadge = {
      id: `badge-${Date.now()}`,
      type: newValue ? 'metric' : 'tag',
      title: newTitle,
      value: newValue || undefined,
      color: newColor,
      x: 20 + Math.random() * 30,
      y: 20 + Math.random() * 30,
      scale: 1,
    };

    onChangeState(prev => ({
      ...prev,
      badges: [...(prev.badges || []), badge],
    }));

    onSelectBadge(badge.id);
    setNewTitle('');
    setNewValue('');
  };

  const handleAddFromTemplate = (tmpl: Omit<MetricBadge, 'id' | 'x' | 'y'>) => {
    const badge: MetricBadge = {
      ...tmpl,
      id: `badge-${Date.now()}`,
      x: 15 + Math.random() * 30,
      y: 15 + Math.random() * 30,
    };

    onChangeState(prev => ({
      ...prev,
      badges: [...(prev.badges || []), badge],
    }));

    onSelectBadge(badge.id);
  };

  const selectedBadge = state.badges?.find(b => b.id === selectedBadgeId);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-1">
          {t.badgesHeader}
        </h3>
        <p className="text-xs text-neutral-500">
          {t.badgesSubtitle}
        </p>
      </div>

      {/* Selected Badge Inspector / Controls */}
      {selectedBadge && (
        <div className="p-4 rounded-2xl bg-neutral-900 border border-indigo-500/50 shadow-xl space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-indigo-400 flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5" />
              Edit Selected Badge
            </span>
            <button
              onClick={() => onSelectBadge(null)}
              className="p-1 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-2">
            <div>
              <label className="text-[10px] uppercase font-bold text-neutral-400 block mb-1">
                {t.badgeTitleLabel}
              </label>
              <input
                type="text"
                value={selectedBadge.title}
                onChange={e =>
                  onChangeState(prev => ({
                    ...prev,
                    badges: prev.badges.map(b =>
                      b.id === selectedBadge.id ? { ...b, title: e.target.value } : b
                    ),
                  }))
                }
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="text-[10px] uppercase font-bold text-neutral-400 block mb-1">
                {t.badgeValueLabel}
              </label>
              <input
                type="text"
                value={selectedBadge.value || ''}
                onChange={e =>
                  onChangeState(prev => ({
                    ...prev,
                    badges: prev.badges.map(b =>
                      b.id === selectedBadge.id ? { ...b, value: e.target.value } : b
                    ),
                  }))
                }
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <div className="flex justify-between text-[11px] font-medium text-neutral-300 mb-1">
                <span>Scale / Size</span>
                <span className="font-mono">{selectedBadge.scale || 1}x</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="2.5"
                step="0.1"
                value={selectedBadge.scale || 1}
                onChange={e =>
                  onChangeState(prev => ({
                    ...prev,
                    badges: prev.badges.map(b =>
                      b.id === selectedBadge.id
                        ? { ...b, scale: Number(e.target.value) }
                        : b
                    ),
                  }))
                }
                className="w-full accent-indigo-500 cursor-pointer"
              />
            </div>

            <button
              onClick={() => {
                onChangeState(prev => ({
                  ...prev,
                  badges: prev.badges.filter(b => b.id !== selectedBadge.id),
                }));
                onSelectBadge(null);
              }}
              className="w-full py-2 bg-rose-950/40 hover:bg-rose-900/60 border border-rose-800/50 text-rose-300 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>{t.delete}</span>
            </button>
          </div>
        </div>
      )}

      {/* Create Custom Badge Form */}
      <div className="p-4 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-3">
        <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
          <Plus className="w-3.5 h-3.5 text-indigo-400" />
          {t.addCustomBadge}
        </h4>

        <div>
          <label className="text-[10px] uppercase font-bold text-neutral-400 block mb-1">
            {t.badgeTitleLabel}
          </label>
          <input
            type="text"
            value={newTitle}
            onChange={e => setNewTitle(e.target.value)}
            placeholder="e.g. ARR Growth, Customer Rating..."
            className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white placeholder:text-neutral-600 focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="text-[10px] uppercase font-bold text-neutral-400 block mb-1">
            {t.badgeValueLabel}
          </label>
          <input
            type="text"
            value={newValue}
            onChange={e => setNewValue(e.target.value)}
            placeholder="e.g. +310% in Q3, 4.9/5..."
            className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white placeholder:text-neutral-600 focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="text-[10px] uppercase font-bold text-neutral-400 block mb-1.5">
            {t.badgeColorLabel}
          </label>
          <div className="flex items-center gap-2">
            {[
              { id: 'emerald', bg: 'bg-emerald-500', label: 'Emerald' },
              { id: 'indigo', bg: 'bg-indigo-500', label: 'Indigo' },
              { id: 'rose', bg: 'bg-rose-500', label: 'Rose' },
              { id: 'amber', bg: 'bg-amber-500', label: 'Amber' },
            ].map(col => (
              <button
                key={col.id}
                type="button"
                onClick={() => setNewColor(col.id)}
                className={`w-6 h-6 rounded-full ${col.bg} transition-transform cursor-pointer ${
                  newColor === col.id ? 'ring-2 ring-white scale-110 shadow-md' : 'opacity-60 hover:opacity-100'
                }`}
                title={col.label}
              />
            ))}
          </div>
        </div>

        <button
          onClick={handleAddCustomBadge}
          disabled={!newTitle.trim()}
          className="w-full py-2.5 bg-gradient-to-r from-indigo-500 to-pink-500 hover:from-indigo-600 hover:to-pink-600 text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer disabled:opacity-40"
        >
          {t.addBadgeBtn}
        </button>
      </div>

      {/* Preset Quick Badges */}
      <div>
        <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2.5">
          {t.templateBadgesTitle}
        </h4>

        <div className="grid grid-cols-1 gap-2">
          {BADGE_TEMPLATES.map((tmpl, idx) => (
            <div
              key={idx}
              onClick={() => handleAddFromTemplate(tmpl)}
              className="p-2.5 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-indigo-500/50 hover:bg-neutral-950 transition-all cursor-pointer flex items-center justify-between group"
            >
              <div>
                <div className="text-[10px] uppercase font-bold text-neutral-400">
                  {tmpl.title}
                </div>
                <div className="text-xs font-bold text-white group-hover:text-indigo-400 transition-colors">
                  {tmpl.value}
                </div>
              </div>

              <div className="p-1.5 rounded-lg bg-neutral-800 group-hover:bg-indigo-600 group-hover:text-white text-neutral-400 transition-colors">
                <Plus className="w-3.5 h-3.5" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
