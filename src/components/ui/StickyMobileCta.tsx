import React from 'react';
import { IconArrowRight } from './CustomSvgIcons';
import { trackEvent } from '../../lib/analytics';

interface StickyMobileCtaProps {
  onNavigate?: (path: string) => void;
  onOpenGetStarted?: () => void;
  onOpenEarlyAccess?: () => void;
}

export function StickyMobileCta({ onOpenGetStarted, onOpenEarlyAccess }: StickyMobileCtaProps) {
  const handleClick = () => {
    trackEvent('primary_cta_click', { cta_name: 'get_in_touch', location: 'sticky_mobile_cta' });
    const fn = onOpenEarlyAccess || onOpenGetStarted;
    if (fn) fn();
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 p-3 bg-surface border-t border-foreground/10 shadow-elevated">
      <button
        onClick={handleClick}
        className="w-full py-3 px-4 bg-foreground text-surface font-semibold text-xs rounded-xl shadow-card flex items-center justify-center gap-2"
        aria-label="Get in Touch"
      >
        <span>Get in Touch</span>
        <IconArrowRight className="w-4 h-4 text-accent" />
      </button>
    </div>
  );
}
