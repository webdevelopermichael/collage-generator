import React, { useState } from 'react';
import { CollageState } from '../../types';
import { renderCollageToCanvas, downloadCanvas } from '../../core/exportUtils';
import { X, Download, RefreshCw, ExternalLink } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  state: CollageState;
}

export const ExportModal: React.FC<ExportModalProps> = ({ isOpen, onClose, state }) => {
  const [format, setFormat] = useState<'png' | 'jpeg' | 'webp'>('png');
  const [scale, setScale] = useState<1 | 2 | 4>(2);
  const [isExporting, setIsExporting] = useState(false);

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
      <div className="relative w-full max-w-lg bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl p-6 overflow-hidden">
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
          <h2 className="text-xl font-heading font-bold text-white">Export Ultra-HD Collage</h2>
        </div>
        <p className="text-xs text-neutral-400 mb-5">
          Select resolution and file format. Hardware-accelerated canvas rasterizer preserves crisp subpixels.
        </p>

        {/* Resolution Scale Selector */}
        <div className="mb-4">
          <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400 block mb-2">
            Resolution Scale
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { s: 1 as const, label: '1x Standard', desc: 'Web & Preview' },
              { s: 2 as const, label: '2x High-Res', desc: 'Retina & Social' },
              { s: 4 as const, label: '4x Ultra-HD', desc: '4K & Print' },
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
        <div className="mb-5">
          <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400 block mb-2">
            File Format
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

        {/* AdSense Interstitial Sponsor Box */}
        <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 mb-5 relative">
          <div className="flex items-center justify-between text-[9px] uppercase font-bold text-neutral-500 mb-1.5">
            <span>Google AdSense Partner Ad</span>
            <span className="text-emerald-400">Verified Sponsor</span>
          </div>
          <div className="flex items-center justify-between gap-3">
            <div className="text-left">
              <div className="text-xs font-bold text-white">Host & Scale Next-Gen AI Workloads</div>
              <div className="text-[10px] text-neutral-400">Get $200 free cloud credits today.</div>
            </div>
            <a
              href="https://google.com/adsense"
              target="_blank"
              rel="noreferrer"
              className="text-xs font-semibold bg-neutral-800 hover:bg-neutral-700 text-indigo-400 px-3 py-1.5 rounded-lg shrink-0 flex items-center gap-1"
            >
              <span>Visit</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Download Trigger */}
        <button
          onClick={handleDownload}
          disabled={isExporting}
          className="w-full py-3.5 px-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:to-pink-600 text-white font-bold text-sm rounded-xl shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50 hover:scale-[1.01]"
        >
          {isExporting ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Generating Image...</span>
            </>
          ) : (
            <>
              <Download className="w-4 h-4" />
              <span>Save & Download ({format.toUpperCase()} • {scale}x)</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
