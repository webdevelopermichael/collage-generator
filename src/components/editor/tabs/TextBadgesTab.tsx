import React, { useState } from 'react';
import { CollageState, MetricBadge } from '../../../types';
import { Plus, Trash2, Sliders, Layers, X } from 'lucide-react';

interface TextBadgesTabProps {
  state: CollageState;
  selectedBadgeId: string | null;
  onSelectBadge: (id: string | null) => void;
  onChangeState: (updater: (prev: CollageState) => CollageState) => void;
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
}) => {
  const [newTitle, setNewTitle] = useState('');
  const [newValue, setNewValue] = useState('');
  const [newColor, setNewColor] = useState('emerald');

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

  const handleClearAllBadges = () => {
    onChangeState(prev => ({ ...prev, badges: [] }));
    onSelectBadge(null);
  };

  const selectedBadge = state.badges?.find(b => b.id === selectedBadgeId);

  return (
    <div className="space-y-6">
      {/* Active Badges on Canvas List */}
      <div>
        <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2">
          <span className="flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-pink-400" />
            Active Badges ({state.badges?.length || 0})
          </span>
          {state.badges && state.badges.length > 0 && (
            <button
              onClick={handleClearAllBadges}
              className="text-[10px] text-rose-400 hover:text-rose-300 font-semibold cursor-pointer lowercase"
            >
              remove all
            </button>
          )}
        </div>

        {state.badges && state.badges.length > 0 ? (
          <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
            {state.badges.map(badge => {
              const isSelected = selectedBadgeId === badge.id;
              return (
                <div
                  key={badge.id}
                  onClick={() => onSelectBadge(badge.id)}
                  className={`p-2 rounded-xl flex items-center justify-between border text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-pink-950/30 border-pink-500 text-white'
                      : 'bg-neutral-900/60 border-neutral-800 text-neutral-300 hover:border-neutral-700'
                  }`}
                >
                  <div className="truncate pr-2">
                    <div className="text-[10px] uppercase font-bold text-neutral-400 truncate">
                      {badge.title}
                    </div>
                    {badge.value && (
                      <div className="text-xs font-semibold text-white truncate">{badge.value}</div>
                    )}
                  </div>
                  <button
                    onClick={e => {
                      e.stopPropagation();
                      onChangeState(prev => ({
                        ...prev,
                        badges: prev.badges.filter(b => b.id !== badge.id),
                      }));
                      if (selectedBadgeId === badge.id) onSelectBadge(null);
                    }}
                    className="p-1 text-neutral-500 hover:text-rose-400 hover:bg-rose-950/60 rounded-md transition-colors shrink-0"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-3 bg-neutral-950/80 rounded-xl border border-neutral-800/80 text-center text-xs text-neutral-500">
            No badges on canvas yet. Add one below!
          </div>
        )}
      </div>

      {/* Selected Badge Inspector & Slider Controls */}
      {selectedBadge && (
        <div className="p-4 rounded-2xl bg-neutral-900 border border-pink-500/40 space-y-3 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-white flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-pink-400" />
              Selected Badge Settings
            </span>
            <button
              onClick={() => {
                onChangeState(prev => ({
                  ...prev,
                  badges: prev.badges.filter(b => b.id !== selectedBadge.id),
                }));
                onSelectBadge(null);
              }}
              className="text-[11px] text-rose-400 hover:text-rose-300 font-semibold cursor-pointer"
            >
              Delete
            </button>
          </div>

          <div>
            <label className="text-[10px] text-neutral-400 block mb-1">Badge Title / Tag</label>
            <input
              type="text"
              value={selectedBadge.title}
              onChange={e =>
                onChangeState(prev => ({
                  ...prev,
                  badges: prev.badges.map(b => (b.id === selectedBadge.id ? { ...b, title: e.target.value } : b)),
                }))
              }
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-2.5 py-1.5 text-xs text-white"
            />
          </div>

          <div>
            <label className="text-[10px] text-neutral-400 block mb-1">Badge Value</label>
            <input
              type="text"
              value={selectedBadge.value || ''}
              onChange={e =>
                onChangeState(prev => ({
                  ...prev,
                  badges: prev.badges.map(b => (b.id === selectedBadge.id ? { ...b, value: e.target.value } : b)),
                }))
              }
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-2.5 py-1.5 text-xs text-white"
            />
          </div>

          {/* Size / Scale Slider */}
          <div>
            <div className="flex justify-between text-[10px] text-neutral-400 mb-1">
              <span>Scale Size</span>
              <span className="font-mono">{selectedBadge.scale || 1}x</span>
            </div>
            <input
              type="range"
              min="0.6"
              max="2.0"
              step="0.05"
              value={selectedBadge.scale || 1}
              onChange={e =>
                onChangeState(prev => ({
                  ...prev,
                  badges: prev.badges.map(b =>
                    b.id === selectedBadge.id ? { ...b, scale: Number(e.target.value) } : b
                  ),
                }))
              }
              className="w-full accent-pink-500 cursor-pointer"
            />
          </div>

          {/* Position X & Y Sliders */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <div>
              <div className="flex justify-between text-[10px] text-neutral-400 mb-1">
                <span>Pos X</span>
                <span className="font-mono">{Math.round(selectedBadge.x)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="85"
                value={selectedBadge.x}
                onChange={e =>
                  onChangeState(prev => ({
                    ...prev,
                    badges: prev.badges.map(b => (b.id === selectedBadge.id ? { ...b, x: Number(e.target.value) } : b)),
                  }))
                }
                className="w-full accent-indigo-500 cursor-pointer"
              />
            </div>
            <div>
              <div className="flex justify-between text-[10px] text-neutral-400 mb-1">
                <span>Pos Y</span>
                <span className="font-mono">{Math.round(selectedBadge.y)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="85"
                value={selectedBadge.y}
                onChange={e =>
                  onChangeState(prev => ({
                    ...prev,
                    badges: prev.badges.map(b => (b.id === selectedBadge.id ? { ...b, y: Number(e.target.value) } : b)),
                  }))
                }
                className="w-full accent-indigo-500 cursor-pointer"
              />
            </div>
          </div>
        </div>
      )}

      {/* Quick Add Preset Badges */}
      <div className="pt-2 border-t border-neutral-800">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2">
          Add Preset Metric Badges
        </h3>
        <div className="grid grid-cols-1 gap-2">
          {BADGE_TEMPLATES.map((tmpl, idx) => (
            <button
              key={idx}
              onClick={() => handleAddFromTemplate(tmpl)}
              className="p-2.5 rounded-xl bg-neutral-900/70 border border-neutral-800 hover:border-indigo-500/50 hover:bg-neutral-900 flex items-center justify-between text-left transition-all cursor-pointer group"
            >
              <div>
                <div className="text-[10px] uppercase font-bold text-neutral-400">{tmpl.title}</div>
                <div className="text-xs font-bold text-white">{tmpl.value}</div>
              </div>
              <Plus className="w-4 h-4 text-neutral-500 group-hover:text-indigo-400 transition-colors" />
            </button>
          ))}
        </div>
      </div>

      {/* Create Custom Badge */}
      <div className="pt-4 border-t border-neutral-800">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2.5">
          Custom Metric / Sticker
        </h3>
        <div className="space-y-2.5">
          <input
            type="text"
            placeholder="Label (e.g. Conversion Rate)"
            value={newTitle}
            onChange={e => setNewTitle(e.target.value)}
            className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white placeholder-neutral-500"
          />
          <input
            type="text"
            placeholder="Value (e.g. 18.4% +5.2%)"
            value={newValue}
            onChange={e => setNewValue(e.target.value)}
            className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white placeholder-neutral-500"
          />
          <button
            onClick={handleAddCustomBadge}
            disabled={!newTitle}
            className="w-full py-2.5 bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer disabled:opacity-50 flex items-center justify-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Custom Badge</span>
          </button>
        </div>
      </div>
    </div>
  );
};
