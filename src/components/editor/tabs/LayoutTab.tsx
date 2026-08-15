import React from 'react';
import { LAYOUT_PRESETS, getPresetsByCount } from '../../../core/layoutEngine';
import { CollageState } from '../../../types';

interface LayoutTabProps {
  state: CollageState;
  onChangeState: (updater: (prev: CollageState) => CollageState) => void;
}

export const LayoutTab: React.FC<LayoutTabProps> = ({ state, onChangeState }) => {
  const photoCounts = [1, 2, 3, 4, 5, 6, 8, 10];

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
          Grid Layout Templates
        </h3>
        <p className="text-xs text-neutral-500">
          Choose a balanced template based on how many photos or screenshots you want to showcase.
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
                {count} {count === 1 ? 'Photo' : 'Photos'}
              </span>
              <span className="text-[10px] text-neutral-500">{presets.length} options</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {presets.map(preset => {
                const isActive = state.layoutTemplateId === preset.id;
                return (
                  <button
                    key={preset.id}
                    onClick={() => handleSelectPreset(preset.id)}
                    className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                      isActive
                        ? 'bg-indigo-600/20 border-indigo-500 shadow-sm ring-1 ring-indigo-500/50'
                        : 'bg-neutral-900/60 border-neutral-800 hover:bg-neutral-900 hover:border-neutral-700'
                    }`}
                  >
                    {/* Thumbnail preview schematic */}
                    <div className="aspect-[16/10] bg-neutral-950 rounded-lg p-1.5 relative mb-2 border border-neutral-800/80">
                      {preset.cells.map((c, idx) => (
                        <div
                          key={idx}
                          style={{
                            left: `calc(${c.x * 100}% + 1px)`,
                            top: `calc(${c.y * 100}% + 1px)`,
                            width: `calc(${c.w * 100}% - 2px)`,
                            height: `calc(${c.h * 100}% - 2px)`,
                          }}
                          className={`absolute rounded-[3px] border ${
                            isActive
                              ? 'bg-indigo-500/30 border-indigo-400/60'
                              : 'bg-neutral-800/70 border-neutral-700/60'
                          }`}
                        />
                      ))}
                    </div>

                    <div className="text-xs font-semibold text-white truncate">{preset.name}</div>
                    <div className="text-[10px] text-neutral-400 capitalize">{preset.category}</div>
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
