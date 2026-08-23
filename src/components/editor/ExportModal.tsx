import React, { useState } from 'react';
import { CollageState } from '../../types';
import { renderCollageToCanvas, downloadCanvas } from '../../core/exportUtils';
import { X, Download, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Language, TRANSLATIONS } from '../../core/i18n';
import { AdSenseSlot } from '../common/AdSenseSlot';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  state: CollageState;
  language: Language;
}

export const ExportModal: React.FC<ExportModalProps> = ({ isOpen, onClose, state, language }) => {
  const [format, setFormat] = useState<'png' | 'jpeg' | 'webp'>('png');
  const [scale, setScale] = useState<1 | 2 | 4>(2);
  const [isExporting, setIsExporting] = useState(false);

  const t = TRANSLATIONS[language];

  if (!isOpen) return null;

  const handleDownload = async () => {
    setIsExporting(true);

    try {
      // 1. Render collage to canvas
      const canvas = await renderCollageToCanvas(state, {
        format,
        scale,
        quality: 0.95,
      });

      // 2. Perform cross-platform download
      await downloadCanvas(canvas, state.name || 'collage', format, 0.95);

      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 },
        });
      } catch {
        // ignore
      }

      setIsExporting(false);
      onClose();
    } catch (err) {
      console.error('Export failed', err);
      alert('Export failed. Please try saving again.');
      setIsExporting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-lg bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl p-6 overflow-hidden max-h-[95vh] flex flex-col">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-500 to-pink-500 flex items-center justify-center text-white">
            <Download className="w-4 h-4" />
          </div>
          <h2 className="text-xl font-heading font-bold text-white">{t.exportTitle}</h2>
        </div>
        <p className="text-xs text-neutral-400 mb-4">
          {t.exportSubtitle}
        </p>

        <div className="flex-1 overflow-y-auto pr-1 space-y-4">
          {/* Resolution Scale Selector */}
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400 block mb-2">
              {t.resolutionScale}
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { s: 1 as const, label: t.scale1x, desc: 'Web & Preview' },
                { s: 2 as const, label: t.scale2x, desc: 'Retina & Social' },
                { s: 4 as const, label: t.scale4x, desc: '4K & Print' },
              ].map(opt => (
                <button
                  key={opt.s}
                  onClick={() => setScale(opt.s)}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    scale === opt.s
                      ? 'bg-indigo-600/20 border-indigo-500 text-white shadow-sm ring-1 ring-indigo-500/50'
                      : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-white'
                  }`}
                >
                  <div className="text-xs font-bold text-white">{opt.label}</div>
                  <div className="text-[10px] text-neutral-500">{opt.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Format Selector */}
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400 block mb-2">
              {t.fileFormat}
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'png' as const, label: 'PNG', desc: 'Lossless crisp' },
                { id: 'jpeg' as const, label: 'JPEG', desc: 'Compressed' },
                { id: 'webp' as const, label: 'WebP', desc: 'Modern web' },
              ].map(f => (
                <button
                  key={f.id}
                  onClick={() => setFormat(f.id)}
                  className={`py-2 px-3 rounded-xl border text-center transition-all cursor-pointer ${
                    format === f.id
                      ? 'bg-indigo-600/20 border-indigo-500 text-white font-bold'
                      : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-white'
                  }`}
                >
                  <span className="text-xs">{f.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Real Google AdSense Block (Extract Slot: 7994067288) */}
          <div className="p-3 rounded-xl bg-neutral-950/90 border border-neutral-800 overflow-hidden text-center">
            <div className="flex items-center justify-between text-[9px] uppercase font-bold text-neutral-500 mb-2 px-1">
              <span>Advertisement</span>
              <span className="text-indigo-400/80">Google AdSense</span>
            </div>
            
            <AdSenseSlot
              slot="7994067288"
              client="ca-pub-9711840143228374"
              className="rounded-lg bg-neutral-900/50"
            />
          </div>
        </div>

        {/* Download Trigger */}
        <div className="pt-4 mt-2 border-t border-neutral-800">
          <button
            onClick={handleDownload}
            disabled={isExporting}
            className="w-full py-3.5 px-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:to-pink-600 text-white font-bold text-sm rounded-xl shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50 hover:scale-[1.01]"
          >
            {isExporting ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>{t.generatingImage}</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>{t.saveAndDownload} ({format.toUpperCase()} • {scale}x)</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
