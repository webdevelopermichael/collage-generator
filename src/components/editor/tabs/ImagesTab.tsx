import React, { useRef } from 'react';
import { CollageState } from '../../../types';
import { Upload, Plus, Trash2, Image as ImageIcon } from 'lucide-react';
import { Language, TRANSLATIONS } from '../../../core/i18n';

interface ImagesTabProps {
  state: CollageState;
  onChangeState: (updater: (prev: CollageState) => CollageState) => void;
  onSelectCell: (id: string | null) => void;
  language: Language;
}

const STOCK_SAMPLES = [
  { name: 'Abstract 3D', url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80' },
  { name: 'Synthwave', url: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80' },
  { name: 'Architecture', url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&auto=format&fit=crop&q=80' },
  { name: 'Gradient Art', url: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=600&auto=format&fit=crop&q=80' },
  { name: 'Minimal Interior', url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&auto=format&fit=crop&q=80' },
  { name: 'Tech Workspace', url: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600&auto=format&fit=crop&q=80' },
];

export const ImagesTab: React.FC<ImagesTabProps> = ({ state, onChangeState, onSelectCell, language }) => {
  const multiFileInputRef = useRef<HTMLInputElement>(null);
  const t = TRANSLATIONS[language];

  const handleBulkUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []).slice(0, 10);
    if (files.length === 0) return;

    const urls: string[] = [];
    let readCount = 0;

    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = ev => {
        urls.push(ev.target?.result as string);
        readCount++;
        if (readCount === files.length) {
          // Assign to empty or existing cells
          onChangeState(prev => ({
            ...prev,
            cells: prev.cells.map((cell, idx) => ({
              ...cell,
              imageUrl: urls[idx] || cell.imageUrl,
            })),
          }));
        }
      };
      reader.readAsDataURL(file);
    });

    e.target.value = '';
  };

  const handleUseStock = (url: string) => {
    // Find first empty cell or replace first cell
    onChangeState(prev => {
      const emptyIdx = prev.cells.findIndex(c => !c.imageUrl);
      const targetIdx = emptyIdx >= 0 ? emptyIdx : 0;
      return {
        ...prev,
        cells: prev.cells.map((c, i) => (i === targetIdx ? { ...c, imageUrl: url } : c)),
      };
    });
  };

  return (
    <div className="space-y-6">
      {/* Hidden file input */}
      <input
        ref={multiFileInputRef}
        type="file"
        multiple
        accept="image/*"
        onChange={handleBulkUpload}
        className="hidden"
      />

      <div>
        <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-1">
          {t.photosHeader}
        </h3>
        <p className="text-xs text-neutral-500">
          {t.photosSubtitle}
        </p>
      </div>

      {/* Batch Upload Button */}
      <button
        onClick={() => multiFileInputRef.current?.click()}
        className="w-full p-4 rounded-2xl bg-neutral-900/60 border border-dashed border-neutral-700 hover:border-indigo-500 hover:bg-neutral-900 transition-all flex flex-col items-center justify-center gap-2 text-center group cursor-pointer"
      >
        <div className="w-10 h-10 rounded-full bg-indigo-500/10 text-indigo-400 group-hover:scale-110 flex items-center justify-center transition-transform">
          <Upload className="w-5 h-5" />
        </div>
        <div>
          <div className="text-xs font-bold text-white group-hover:text-indigo-400 transition-colors">
            {t.uploadBatchPhotos}
          </div>
          <div className="text-[10px] text-neutral-500 mt-0.5">
            {t.uploadBatchDesc}
          </div>
        </div>
      </button>

      {/* Current Cells Photo Overview */}
      <div>
        <div className="text-xs font-medium text-neutral-300 mb-2 flex items-center justify-between">
          <span>{t.tabPhotos} ({state.cells.filter(c => !!c.imageUrl).length}/{state.cells.length})</span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {state.cells.map((cell, idx) => (
            <div
              key={cell.id}
              onClick={() => onSelectCell(cell.id)}
              className="p-2 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-between gap-2 group hover:border-neutral-700 cursor-pointer"
            >
              <div className="flex items-center gap-2 truncate">
                {cell.imageUrl ? (
                  <img
                    src={cell.imageUrl}
                    alt={`Slot ${idx + 1}`}
                    className="w-8 h-8 rounded-lg object-cover bg-neutral-950 shrink-0"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-lg bg-neutral-950 flex items-center justify-center text-neutral-600 shrink-0">
                    <ImageIcon className="w-4 h-4" />
                  </div>
                )}
                <div className="truncate">
                  <div className="text-xs font-semibold text-neutral-200 truncate">
                    Slot {idx + 1}
                  </div>
                  <div className="text-[10px] text-neutral-500">
                    {cell.imageUrl ? 'Photo loaded' : 'Empty'}
                  </div>
                </div>
              </div>

              {cell.imageUrl && (
                <button
                  onClick={e => {
                    e.stopPropagation();
                    onChangeState(prev => ({
                      ...prev,
                      cells: prev.cells.map(c =>
                        c.id === cell.id ? { ...c, imageUrl: undefined } : c
                      ),
                    }));
                  }}
                  className="p-1.5 text-neutral-500 hover:text-rose-400 hover:bg-rose-950/30 rounded-lg transition-colors cursor-pointer"
                  title="Remove photo"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Stock Photos Selector */}
      <div className="pt-4 border-t border-neutral-800">
        <div className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-1">
          {t.stockPhotosTitle}
        </div>
        <p className="text-[11px] text-neutral-500 mb-3">
          {t.stockPhotosSubtitle}
        </p>

        <div className="grid grid-cols-3 gap-2">
          {STOCK_SAMPLES.map(sample => (
            <button
              key={sample.name}
              onClick={() => handleUseStock(sample.url)}
              className="group relative aspect-square rounded-xl overflow-hidden border border-neutral-800 hover:border-indigo-500 transition-all cursor-pointer"
            >
              <img
                src={sample.url}
                alt={sample.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-1.5">
                <span className="text-[9px] font-medium text-white truncate">
                  {sample.name}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
