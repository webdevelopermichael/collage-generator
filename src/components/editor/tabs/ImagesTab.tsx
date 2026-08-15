import React, { useRef } from 'react';
import { CollageState } from '../../../types';
import { Upload, Plus, Trash2, Image as ImageIcon } from 'lucide-react';

interface ImagesTabProps {
  state: CollageState;
  onChangeState: (updater: (prev: CollageState) => CollageState) => void;
  onSelectCell: (id: string | null) => void;
}

const STOCK_SAMPLES = [
  { name: 'Abstract 3D', url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80' },
  { name: 'Synthwave', url: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80' },
  { name: 'Architecture', url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&auto=format&fit=crop&q=80' },
  { name: 'Gradient Art', url: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=600&auto=format&fit=crop&q=80' },
  { name: 'Minimal Interior', url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&auto=format&fit=crop&q=80' },
  { name: 'Tech Workspace', url: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600&auto=format&fit=crop&q=80' },
];

export const ImagesTab: React.FC<ImagesTabProps> = ({ state, onChangeState, onSelectCell }) => {
  const multiFileInputRef = useRef<HTMLInputElement>(null);

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

      {/* Upload Drop Area */}
      <div>
        <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2">
          Upload Screenshots & Photos
        </h3>
        <button
          onClick={() => multiFileInputRef.current?.click()}
          className="w-full py-6 px-4 rounded-2xl bg-neutral-900/80 border-2 border-dashed border-neutral-700/80 hover:border-indigo-500/80 flex flex-col items-center justify-center gap-2 text-center transition-colors cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-full bg-neutral-800 text-neutral-400 group-hover:text-indigo-400 flex items-center justify-center transition-colors">
            <Upload className="w-5 h-5" />
          </div>
          <span className="text-xs font-semibold text-white">Click to upload up to 10 images</span>
          <span className="text-[10px] text-neutral-400">PNG, JPG, WebP supported</span>
        </button>
      </div>

      {/* Active Photos List */}
      <div>
        <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2">
          <span>Assigned Photos ({state.cells.filter(c => !!c.imageUrl).length})</span>
          <button
            onClick={() =>
              onChangeState(prev => ({
                ...prev,
                cells: prev.cells.map(c => ({ ...c, imageUrl: undefined })),
              }))
            }
            className="text-[10px] text-rose-400 hover:text-rose-300 font-semibold cursor-pointer lowercase"
          >
            clear all
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {state.cells.map((cell, idx) => (
            <div
              key={cell.id}
              onClick={() => onSelectCell(cell.id)}
              className="relative aspect-video rounded-xl overflow-hidden border border-neutral-800 bg-neutral-950 p-1 group cursor-pointer hover:border-indigo-500"
            >
              {cell.imageUrl ? (
                <>
                  <img
                    src={cell.imageUrl}
                    alt={`Slot ${idx + 1}`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <button
                    onClick={e => {
                      e.stopPropagation();
                      onChangeState(prev => ({
                        ...prev,
                        cells: prev.cells.map(c => (c.id === cell.id ? { ...c, imageUrl: undefined } : c)),
                      }));
                    }}
                    className="absolute top-2 right-2 p-1 rounded-md bg-neutral-950/80 text-rose-400 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-rose-950"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                  <span className="absolute bottom-1.5 left-2 text-[9px] font-bold bg-neutral-950/80 text-white px-1.5 py-0.5 rounded">
                    Slot {idx + 1}
                  </span>
                </>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-neutral-500 text-[10px]">
                  <ImageIcon className="w-4 h-4 mb-1 text-neutral-600" />
                  <span>Slot {idx + 1} (Empty)</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Stock Sample Photos */}
      <div className="pt-4 border-t border-neutral-800">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2">
          Stock Demo Assets
        </h3>
        <div className="grid grid-cols-3 gap-2">
          {STOCK_SAMPLES.map(sample => (
            <button
              key={sample.name}
              onClick={() => handleUseStock(sample.url)}
              className="aspect-square rounded-xl overflow-hidden relative border border-neutral-800 hover:border-indigo-400 group cursor-pointer"
            >
              <img src={sample.url} alt={sample.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-[10px] font-bold">
                + Add
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
