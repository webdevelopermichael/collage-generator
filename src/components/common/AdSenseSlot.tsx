import React, { useEffect, useRef } from 'react';

declare global {
  interface Window {
    adsbygoogle?: any[];
  }
}

interface AdSenseSlotProps {
  slot: string;
  client?: string;
  format?: string;
  responsive?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export const AdSenseSlot: React.FC<AdSenseSlotProps> = ({
  slot,
  client = 'ca-pub-9711840143228374',
  format = 'auto',
  responsive = true,
  className = '',
  style = { display: 'block' },
}) => {
  const adRef = useRef<HTMLModElement>(null);
  const isLoadedRef = useRef(false);

  useEffect(() => {
    // Only push once to adsbygoogle array per mount
    if (isLoadedRef.current) return;

    try {
      if (typeof window !== 'undefined') {
        window.adsbygoogle = window.adsbygoogle || [];
        window.adsbygoogle.push({});
        isLoadedRef.current = true;
      }
    } catch (e) {
      console.warn('AdSense slot init info:', e);
    }
  }, []);

  return (
    <div className={`overflow-hidden relative flex justify-center items-center w-full min-h-[90px] ${className}`}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={style}
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive ? 'true' : 'false'}
      />
    </div>
  );
};
