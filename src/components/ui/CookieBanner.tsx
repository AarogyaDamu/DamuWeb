import React, { useState, useEffect } from 'react';
import { IconShield } from './CustomSvgIcons';

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('aarogyadamu_cookie_consent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('aarogyadamu_cookie_consent', 'granted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('aarogyadamu_cookie_consent', 'denied');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div
      className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md z-50 p-4 rounded-2xl bg-surface-dark text-surface border border-surface/10 shadow-elevated animate-fade-in-up"
      role="region"
      aria-label="Cookie consent"
    >
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-lg bg-surface/10 text-accent shrink-0">
          <IconShield className="w-4 h-4" />
        </div>
        <div className="space-y-2 text-xs">
          <h4 className="font-serif text-sm font-bold text-surface">Privacy & Cookie Consent</h4>
          <p className="text-surface/70 leading-relaxed">
            We use privacy-aware analytics to improve site performance and user experience. We respect your choices and never sell your personal data. See our{' '}
            <a href="/privacy" className="text-accent hover:underline font-medium">Privacy Policy</a>.
          </p>
          <div className="flex items-center gap-2 pt-1">
            <button
              onClick={handleAccept}
              className="px-3 py-1.5 bg-accent hover:bg-accent-hover text-surface font-semibold rounded-lg text-xs transition-colors"
            >
              Accept Analytics
            </button>
            <button
              onClick={handleDecline}
              className="px-3 py-1.5 bg-surface/10 hover:bg-surface/20 text-surface/80 text-xs font-medium rounded-lg transition-colors"
            >
              Essential Only
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
