import React from 'react';
import { AdSenseSlot } from '../common/AdSenseSlot';

interface AdBannerProps {
  placement: 'sidebar_bottom' | 'canvas_bottom' | 'modal_interstitial';
  slot?: string;
}

export const AdBanner: React.FC<AdBannerProps> = ({ placement, slot = '7994067288' }) => {
  if (placement === 'sidebar_bottom') {
    return (
      <div className="p-3 bg-neutral-950 border-t border-neutral-800 shrink-0 text-left">
        <div className="flex items-center justify-between text-[9px] uppercase font-bold text-neutral-500 mb-1.5 px-1">
          <span>Sponsored</span>
          <span className="text-indigo-400">AdSense</span>
        </div>
        <div className="rounded-xl overflow-hidden bg-neutral-900/50 border border-neutral-800">
          <AdSenseSlot slot={slot} />
        </div>
      </div>
    );
  }

  if (placement === 'canvas_bottom') {
    return (
      <div className="w-full bg-neutral-950/90 border-t border-neutral-800/80 px-4 py-2 flex flex-col items-center justify-center text-[11px] text-neutral-400 shrink-0 select-none">
        <div className="w-full flex items-center justify-between text-[9px] uppercase font-bold text-neutral-500 mb-1">
          <span>Advertisement</span>
          <span>Google Partner</span>
        </div>
        <div className="w-full max-w-2xl overflow-hidden">
          <AdSenseSlot slot={slot} />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full overflow-hidden p-2 rounded-xl bg-neutral-950/90 border border-neutral-800">
      <AdSenseSlot slot={slot} />
    </div>
  );
};
