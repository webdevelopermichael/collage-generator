import React, { useState } from 'react';
import { ExternalLink, X, Info } from 'lucide-react';

interface AdBannerProps {
  placement: 'sidebar_bottom' | 'canvas_bottom' | 'modal_interstitial';
}

export const AdBanner: React.FC<AdBannerProps> = ({ placement }) => {
  const [isDismissed, setIsDismissed] = useState(false);

  if (isDismissed) return null;

  if (placement === 'sidebar_bottom') {
    return (
      <div className="p-3 bg-neutral-950 border-t border-neutral-800 shrink-0 text-left">
        <div className="flex items-center justify-between text-[9px] uppercase font-bold text-neutral-500 mb-1.5">
          <span className="flex items-center gap-1">
            <Info className="w-2.5 h-2.5" /> Sponsored Sponsor
          </span>
          <button
            onClick={() => setIsDismissed(true)}
            className="text-neutral-500 hover:text-neutral-300"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
        <div className="p-2.5 rounded-xl bg-gradient-to-r from-indigo-950/40 via-neutral-900 to-purple-950/40 border border-neutral-800 text-[11px] text-neutral-300 flex items-center justify-between gap-2">
          <div>
            <div className="font-semibold text-white">Deploy AI Apps in 1-Click</div>
            <div className="text-[10px] text-neutral-400">High performance cloud GPU instances.</div>
          </div>
          <span className="text-[10px] font-bold text-indigo-400 shrink-0">Try Free →</span>
        </div>
      </div>
    );
  }

  if (placement === 'canvas_bottom') {
    return (
      <div className="h-10 bg-neutral-950/90 border-t border-neutral-800/80 px-4 flex items-center justify-between text-[11px] text-neutral-400 shrink-0 select-none">
        <div className="flex items-center gap-2">
          <span className="text-[9px] uppercase font-bold text-neutral-500 px-1.5 py-0.5 rounded bg-neutral-900 border border-neutral-800">
            Ad
          </span>
          <span>Supercharge your design workflow with AI Mockup Studio</span>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="https://google.com/adsense"
            target="_blank"
            rel="noreferrer"
            className="text-indigo-400 hover:text-indigo-300 text-xs font-semibold flex items-center gap-1"
          >
            <span>Learn More</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    );
  }

  return null;
};
