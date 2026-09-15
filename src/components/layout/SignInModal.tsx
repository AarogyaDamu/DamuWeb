import React, { useState } from 'react';
import { IconShield, IconLock, IconArrowRight, IconClose, IconCheck } from '../ui/CustomSvgIcons';
import { trackEvent } from '../../lib/analytics';

interface SignInModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'signin' | 'getstarted';
}

export function SignInModal({ isOpen, onClose, initialMode = 'signin' }: SignInModalProps) {
  const [mode, setMode] = useState<'signin' | 'getstarted'>(initialMode);
  const [uinInput, setUinInput] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSimulateAuth = (e: React.FormEvent) => {
    e.preventDefault();
    trackEvent('CONTACT_FORM_SUBMITTED', { form: 'signin_modal', mode });
    setIsSuccess(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-surface-dark/85 animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-surface rounded-3xl border border-foreground/10 shadow-elevated overflow-hidden p-6 sm:p-8">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-foreground-subtle hover:text-foreground rounded-full hover:bg-foreground/5 transition-colors"
        >
          <IconClose className="w-5 h-5" />
        </button>

        {!isSuccess ? (
          <div>
            <div className="flex items-center gap-2 mb-2 text-xs font-semibold uppercase tracking-wider text-accent">
              <IconShield className="w-4 h-4 text-accent" />
              Patient Identity & Security
            </div>

            <h3 className="font-serif text-2xl font-bold text-foreground">
              {mode === 'signin' ? 'Sign in to AarogyaDamu' : 'Create Your Health Identity'}
            </h3>
            <p className="mt-1 text-xs text-foreground-muted">
              {mode === 'signin'
                ? 'Enter your Unique Health Identifier (UIN) or linked account to access your longitudinal health model.'
                : 'Generate your private UIN (e.g. AGD-7K2P-93XM) under DPDP India compliant storage.'}
            </p>

            <form onSubmit={handleSimulateAuth} className="mt-6 space-y-4">
              <div>
                <label className="block text-xs font-medium text-foreground-muted mb-1.5">
                  {mode === 'signin' ? 'Unique Health Identifier (UIN) or Email' : 'Full Name'}
                </label>
                <input
                  type="text"
                  required
                  placeholder={mode === 'signin' ? 'AGD-7K2P-93XM' : 'Dr. Ananya Sharma'}
                  value={uinInput}
                  onChange={(e) => setUinInput(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-background border border-foreground/15 text-foreground placeholder:text-foreground-subtle focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent text-xs"
                />
              </div>

              {mode === 'getstarted' && (
                <div>
                  <label className="block text-xs font-medium text-foreground-muted mb-1.5">
                    Email Address (for recovery)
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="ananya@example.com"
                    className="w-full px-4 py-3 rounded-xl bg-background border border-foreground/15 text-foreground placeholder:text-foreground-subtle focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent text-xs"
                  />
                </div>
              )}

              <div className="p-3 rounded-xl bg-surface-subtle border border-foreground/5 text-xs text-foreground-muted space-y-1">
                <div className="flex items-center gap-1.5 font-semibold text-foreground">
                  <IconLock className="w-3.5 h-3.5 text-sage" /> Row-Level Security (RLS) Isolation
                </div>
                <p>Your health data is isolated in Supabase Mumbai (ap-south-1). No unauthorized cross-patient reads are permitted by Postgres policies.</p>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-4 bg-foreground hover:bg-surface-dark-card text-surface font-semibold text-xs rounded-xl transition-all shadow-card flex items-center justify-center gap-2 group"
              >
                {mode === 'signin' ? 'Access Health Model' : 'Generate UIN & Get Started'}
                <IconArrowRight className="w-4 h-4 text-accent transition-transform group-hover:translate-x-0.5" />
              </button>
            </form>

            <div className="mt-5 text-center text-xs text-foreground-muted">
              {mode === 'signin' ? (
                <span>
                  Don't have a UIN yet?{' '}
                  <button
                    onClick={() => setMode('getstarted')}
                    className="text-accent font-semibold hover:underline"
                  >
                    Get started
                  </button>
                </span>
              ) : (
                <span>
                  Already registered?{' '}
                  <button
                    onClick={() => setMode('signin')}
                    className="text-accent font-semibold hover:underline"
                  >
                    Sign in with UIN
                  </button>
                </span>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center py-4 space-y-4">
            <div className="w-12 h-12 rounded-full bg-sage/15 text-sage flex items-center justify-center mx-auto">
              <IconCheck className="w-6 h-6 text-sage" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-foreground">Identity Verified</h3>
            <p className="text-xs text-foreground-muted max-w-xs mx-auto">
              Welcome back. Your Health Model UIN is{' '}
              <strong className="font-mono text-foreground bg-surface-subtle px-2 py-0.5 rounded">
                AGD-7K2P-93XM
              </strong>
            </p>
            <div className="p-4 rounded-2xl bg-background border border-foreground/10 text-xs text-left text-foreground-muted space-y-1.5">
              <div className="font-semibold text-foreground flex items-center gap-1.5">
                <IconCheck className="w-4 h-4 text-sage" /> Longitudinal Context Active
              </div>
              <p>42 Health Events, 8 Baseline Metrics, and 3 Active Trends loaded with recency decay weighting.</p>
            </div>
            <button
              onClick={onClose}
              className="w-full py-3 px-4 bg-foreground text-surface font-semibold text-xs rounded-xl"
            >
              Continue to Experience
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
