import React from 'react';
import { LAYOUT_PRESETS, getPresetsByCount } from '../../../core/layoutEngine';
import { CollageState } from '../../../types';
import { Language, TRANSLATIONS } from '../../../core/i18n';
import { getPresetI18n } from '../../../core/contentTranslations';

interface LayoutTabProps {
  state: CollageState;
  onChangeState: (updater: (prev: CollageState) => CollageState) => void;
  language: Language;
}

export const LayoutTab: React.FC<LayoutTabProps> = ({ state, onChangeState, language }) => {
  const photoCounts = [1, 2, 3, 4, 5, 6, 8, 10];
  const t = TRANSLATIONS[language];

  const handleSelectPreset = (presetId: string) => {
    const preset = LAYOUT_PRESETS.find(p => p.id === presetId);
    if (!preset) return;

    onChangeState(prev => {
      // Keep existing images where possible
      const existingImages = prev.cells.map(c => c.imageUrl).filter(Boolean) as string[];

      const newCells = preset.cells.map((cellGeo, idx) => ({
        id: `cell-${Date.now()}-${idx}`,
        ...cellGeo,
        imageUrl: existingImages[idx] || undefined,
        zoom: 1,
        offsetX: 0,
        offsetY: 0,
        rotate: 0,
        filter: 'none' as const,
      }));

      return {
        ...prev,
        layoutTemplateId: preset.id,
        cells: newCells,
      };
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-1">
          {t.gridLayoutTemplates}
        </h3>
        <p className="text-xs text-neutral-500">
          {t.gridLayoutSubtitle}
        </p>
      </div>

      {photoCounts.map(count => {
        const presets = getPresetsByCount(count);
        if (presets.length === 0) return null;

        return (
          <div key={count} className="space-y-2.5">
            <div className="flex items-center justify-between text-xs font-medium text-neutral-300">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                {count} {count === 1 ? t.photoWord : t.photosWord}
              </span>
              <span className="text-[11px] text-neutral-500 font-mono">
                {presets.length} {t.optionsCount}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {presets.map(preset => {
                const isSelected = state.layoutTemplateId === preset.id;
                const { name: translatedName, category: translatedCat } = getPresetI18n(
                  preset.id,
                  preset.name,
                  preset.category,
                  language
                );

                return (
                  <button
                    key={preset.id}
                    onClick={() => handleSelectPreset(preset.id)}
                    className={`p-3 rounded-2xl bg-neutral-900/60 border text-left transition-all cursor-pointer group hover:bg-neutral-900 ${
                      isSelected
                        ? 'border-indigo-500 ring-2 ring-indigo-500/20 bg-neutral-900 shadow-md shadow-indigo-500/10'
                        : 'border-neutral-800 hover:border-neutral-700'
                    }`}
                  >
                    {/* Mini SVG / Box Visualizer */}
                    <div className="aspect-video w-full bg-neutral-950/80 rounded-xl p-1.5 border border-neutral-800/80 mb-2 relative overflow-hidden">
                      {preset.cells.map((cell, idx) => (
                        <div
                          key={idx}
                          style={{
                            left: `${cell.x * 100}%`,
                            top: `${cell.y * 100}%`,
                            width: `${cell.w * 100}%`,
                            height: `${cell.h * 100}%`,
                            padding: '1.5px',
                          }}
                          className="absolute box-border"
                        >
                          <div
                            className={`w-full h-full rounded-[3px] transition-colors ${
                              isSelected
                                ? 'bg-indigo-500/80'
                                : 'bg-neutral-800 group-hover:bg-neutral-700'
                            }`}
                          />
                        </div>
                      ))}
                    </div>

                    <div className="truncate font-semibold text-xs text-white group-hover:text-indigo-400 transition-colors">
                      {translatedName}
                    </div>
                    <div className="text-[10px] text-neutral-500 capitalize">
                      {translatedCat}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};
