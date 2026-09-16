import React, { useState, useEffect, useRef } from 'react';
import { IconShield, IconClose } from './CustomSvgIcons';
import { getConsentRecord, setConsentRecord, trackEvent } from '../../lib/analytics';

interface CookieBannerProps {
  isPreferencesOpen?: boolean;
  onClosePreferences?: () => void;
  onNavigate?: (path: string) => void;
}

export function CookieBanner({
  isPreferencesOpen = false,
  onClosePreferences,
  onNavigate,
}: CookieBannerProps) {
  const [bannerVisible, setBannerVisible] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [analyticsToggle, setAnalyticsToggle] = useState<boolean>(false);

  const dialogRef = useRef<HTMLDivElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  // Sync internal modal open state with prop or consent state
  useEffect(() => {
    const record = getConsentRecord();
    if (record.state === 'unknown') {
      setBannerVisible(true);
    } else {
      setBannerVisible(false);
    }
    setAnalyticsToggle(record.analytics);
  }, []);

  useEffect(() => {
    if (isPreferencesOpen) {
      trackEvent('privacy_settings_open');
      const record = getConsentRecord();
      setAnalyticsToggle(record.analytics);
      setModalOpen(true);
    }
  }, [isPreferencesOpen]);

  const closeModal = React.useCallback(() => {
    setModalOpen(false);
    if (onClosePreferences) {
      onClosePreferences();
    }
  }, [onClosePreferences]);

  // Handle ESC and trap focus when modal is open
  useEffect(() => {
    if (!modalOpen) return;

    previouslyFocused.current = document.activeElement as HTMLElement | null;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal();
        return;
      }
      if (e.key === 'Tab' && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
      previouslyFocused.current?.focus?.();
    };
  }, [modalOpen, closeModal]);

  const handleAcceptAll = () => {
    setConsentRecord(true, 'accepted');
    trackEvent('privacy_consent_accept');
    setBannerVisible(false);
    closeModal();
  };

  const handleRejectAll = () => {
    setConsentRecord(false, 'rejected');
    trackEvent('privacy_consent_reject');
    setBannerVisible(false);
    closeModal();
  };

  const handleSavePreferences = () => {
    setConsentRecord(analyticsToggle, analyticsToggle ? 'accepted' : 'rejected');
    trackEvent('privacy_preferences_save', { analytics_enabled: analyticsToggle });
    setBannerVisible(false);
    closeModal();
  };

  const handleManageClick = () => {
    trackEvent('privacy_settings_open');
    const record = getConsentRecord();
    setAnalyticsToggle(record.analytics);
    setModalOpen(true);
  };

  return (
    <>
      {/* 1. Floating Banner UI (Non-blocking bottom card) */}
      {bannerVisible && !modalOpen && (
        <div
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-lg z-50 p-5 rounded-2xl bg-surface-dark text-surface border border-surface/10 shadow-elevated animate-fade-in-up"
          role="region"
          aria-label="Privacy & Analytics Consent"
        >
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-xl bg-surface/10 text-accent shrink-0 mt-0.5">
              <IconShield className="w-5 h-5" />
            </div>
            <div className="space-y-3 text-xs flex-1">
              <div>
                <h4 className="font-serif text-sm font-bold text-surface">Privacy & Analytics Choice</h4>
                <p className="text-surface/80 leading-relaxed mt-1">
                  We use analytics to understand how visitors use our website and improve the experience. Essential features remain active regardless of your decision. See our{' '}
                  <button
                    onClick={() => {
                      if (onNavigate) onNavigate('/privacy');
                    }}
                    className="text-accent hover:underline font-medium focus:outline-none focus-visible:ring-1 focus-visible:ring-accent rounded"
                  >
                    Privacy Policy
                  </button>.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2 pt-1">
                <button
                  onClick={handleAcceptAll}
                  className="px-3.5 py-2 bg-accent hover:bg-accent-hover text-surface font-semibold rounded-xl text-xs transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  Accept analytics
                </button>
                <button
                  onClick={handleRejectAll}
                  className="px-3.5 py-2 bg-surface/10 hover:bg-surface/20 text-surface font-medium rounded-xl text-xs transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  Reject analytics
                </button>
                <button
                  onClick={handleManageClick}
                  className="px-3.5 py-2 bg-transparent hover:bg-surface/10 text-surface/70 hover:text-surface text-xs font-medium rounded-xl transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent underline underline-offset-2"
                >
                  Manage preferences
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. Privacy Settings Preferences Modal Dialog */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs animate-fade-in"
          role="dialog"
          aria-modal="true"
          aria-labelledby="privacy-preferences-title"
          aria-describedby="privacy-preferences-desc"
        >
          <div
            ref={dialogRef}
            className="w-full max-w-lg bg-surface border border-foreground/10 rounded-3xl p-6 sm:p-8 shadow-elevated space-y-6 text-foreground relative animate-scale-up"
          >
            <div className="flex items-center justify-between border-b border-foreground/10 pb-4">
              <div className="flex items-center gap-2.5">
                <IconShield className="w-5 h-5 text-accent" />
                <h2 id="privacy-preferences-title" className="font-serif text-xl font-bold text-foreground">
                  Privacy Settings
                </h2>
              </div>
              <button
                onClick={closeModal}
                className="p-2 rounded-xl text-foreground-muted hover:text-foreground hover:bg-surface-subtle transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                aria-label="Close privacy preferences"
              >
                <IconClose className="w-5 h-5" />
              </button>
            </div>

            <p id="privacy-preferences-desc" className="text-xs text-foreground-muted leading-relaxed">
              We respect your right to privacy. Below you can customize which categories of storage and analytics scripts you allow during your visits. Essential functionality remains active regardless of these choices.
            </p>

            <div className="space-y-4">
              {/* Category 1: Necessary */}
              <div className="p-4 rounded-2xl bg-surface-subtle border border-foreground/10 flex items-center justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                    Necessary Functionality
                    <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-accent/15 text-accent font-bold">
                      Always Active
                    </span>
                  </span>
                  <p className="text-[11px] text-foreground-muted leading-relaxed">
                    Required for core website operations, security headers, routing, and saving your consent choices.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked
                  disabled
                  aria-label="Necessary functionality always active"
                  className="w-4 h-4 text-accent rounded border-foreground/20 cursor-not-allowed opacity-60"
                />
              </div>

              {/* Category 2: Performance & Web Analytics */}
              <div className="p-4 rounded-2xl bg-surface-subtle border border-foreground/10 flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <label htmlFor="analytics-consent-toggle" className="text-xs font-semibold text-foreground block cursor-pointer">
                    Performance & Web Analytics (GA4)
                  </label>
                  <p className="text-[11px] text-foreground-muted leading-relaxed">
                    Helps us measure site traffic, page views, and button interactions to improve the platform experience. Absolutely no medical data or personal health records are collected.
                  </p>
                </div>
                <input
                  id="analytics-consent-toggle"
                  type="checkbox"
                  checked={analyticsToggle}
                  onChange={(e) => setAnalyticsToggle(e.target.checked)}
                  className="w-5 h-5 text-accent focus:ring-accent rounded border-foreground/30 cursor-pointer mt-1"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-end gap-2.5 pt-2 border-t border-foreground/10">
              <button
                onClick={handleRejectAll}
                className="w-full sm:w-auto px-4 py-2.5 text-xs font-semibold text-foreground-muted hover:text-foreground bg-surface-subtle hover:bg-surface-subtle/80 rounded-xl transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                Reject All
              </button>
              <button
                onClick={handleAcceptAll}
                className="w-full sm:w-auto px-4 py-2.5 text-xs font-semibold text-foreground bg-surface-subtle border border-foreground/20 hover:bg-surface-subtle/80 rounded-xl transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                Accept All
              </button>
              <button
                onClick={handleSavePreferences}
                className="w-full sm:w-auto px-5 py-2.5 text-xs font-semibold text-surface bg-foreground hover:bg-surface-dark-card rounded-xl shadow-card transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                Save Preferences
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

