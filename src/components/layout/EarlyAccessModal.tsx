import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { trackEvent } from '../../lib/analytics';
import { IconClose } from '../ui/CustomSvgIcons';

interface EarlyAccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type FormState = 'idle' | 'submitting' | 'success' | 'error';

export function EarlyAccessModal({ isOpen, onClose }: EarlyAccessModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [formState, setFormState] = useState<FormState>('idle');
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});
  const emailRef = useRef<HTMLInputElement>(null);
  const firstFocusRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);
  const reduced = useReducedMotion();

  // Handle ESC, trap Tab focus within the dialog, and restore focus on close
  useEffect(() => {
    if (!isOpen) return;

    previouslyFocused.current = document.activeElement as HTMLElement | null;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key === 'Tab' && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
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

    // Focus first input
    setTimeout(() => firstFocusRef.current?.focus(), 100);

    // Prevent body scroll
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
      // Return focus to the element that opened the modal
      previouslyFocused.current?.focus?.();
    };
  }, [isOpen, onClose]);

  const validate = () => {
    const errs: { name?: string; email?: string } = {};
    if (!email.trim()) errs.email = 'Please enter your email address.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = 'Please enter a valid email address.';
    return errs;
  };

  const [submitError, setSubmitError] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setSubmitError('');
    setFormState('submitting');
    trackEvent('CTA_CLICKED', { source: 'early_access_modal' });

    try {
      const res = await fetch('/api/early-access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message, source: 'early_access_modal', consentVersion: 'v1' }),
      });

      const contentType = res.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const data = await res.json();
        if (res.ok && data.success) {
          setFormState('success');
        } else {
          setFormState('error');
          setSubmitError(data.error || 'Unable to submit at this time. Please try again later.');
        }
      } else if (res.ok) {
        // Safe fallback when running local dev server without Vercel serverless function proxy
        setFormState('success');
      } else {
        setFormState('error');
        setSubmitError('Unable to submit at this time. Please try again later.');
      }
    } catch {
      setFormState('error');
      setSubmitError('Network error. Please check your internet connection and try again.');
    }
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setName('');
      setEmail('');
      setMessage('');
      setFormState('idle');
      setErrors({});
      setSubmitError('');
    }, 300);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-50 bg-foreground/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduced ? 0 : 0.2 }}
            onClick={handleClose}
            aria-hidden="true"
          />

          {/* Modal */}
          <div
            ref={dialogRef}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <motion.div
              className="relative w-full max-w-md bg-surface rounded-2xl border border-border shadow-xl overflow-hidden"
              initial={reduced ? false : { opacity: 0, scale: 0.96, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 10 }}
              transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-lg text-foreground-subtle hover:text-foreground hover:bg-surface-subtle transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                aria-label="Close"
              >
                <IconClose className="w-4 h-4" />
              </button>

              <div className="p-8 sm:p-10">
                <AnimatePresence mode="wait">
                  {formState === 'success' ? (
                    <motion.div
                      key="success"
                      initial={reduced ? false : { opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-center space-y-4 py-4"
                    >
                      <div className="w-12 h-12 rounded-full bg-sage-light border border-sage-border flex items-center justify-center mx-auto">
                        <svg className="w-5 h-5 text-sage" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                          <path d="M4 10l4 4 8-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-serif text-xl font-bold text-foreground">Thank you!</h3>
                        <p className="mt-2 text-sm text-foreground-muted leading-relaxed">
                          Thank you for your interest in AarogyaDamu. We’ll be in touch soon.
                        </p>
                      </div>
                      <button
                        onClick={handleClose}
                        className="mt-2 text-sm font-semibold text-accent hover:text-accent-hover transition-colors"
                      >
                        Close
                      </button>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="form"
                      initial={reduced ? false : { opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="space-y-6"
                    >
                      <div className="space-y-1">
                        <h2 id="modal-title" className="font-serif text-2xl font-bold text-foreground">
                          Interested in AarogyaDamu?
                        </h2>
                        <p className="text-sm text-foreground-muted">
                          Join Waitlist • Explore • Collaborate • Research • Partner • Invest
                        </p>
                      </div>

                      <form onSubmit={handleSubmit} noValidate className="space-y-4">
                        {/* Name (optional) */}
                        <div className="space-y-1.5">
                          <label htmlFor="early-access-name" className="text-xs font-semibold text-foreground-muted uppercase tracking-wider">
                            Name <span className="font-normal text-foreground-subtle">(optional)</span>
                          </label>
                          <input
                            id="early-access-name"
                            ref={firstFocusRef}
                            type="text"
                            autoComplete="name"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            placeholder="Your name"
                            className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm text-foreground placeholder:text-foreground-subtle focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-colors"
                            disabled={formState === 'submitting'}
                          />
                        </div>

                        {/* Email */}
                        <div className="space-y-1.5">
                          <label htmlFor="early-access-email" className="text-xs font-semibold text-foreground-muted uppercase tracking-wider">
                            Email address
                          </label>
                          <input
                            id="early-access-email"
                            ref={emailRef}
                            type="email"
                            autoComplete="email"
                            value={email}
                            onChange={e => { setEmail(e.target.value); setErrors({}); }}
                            placeholder="you@example.com"
                            required
                            aria-describedby={errors.email ? 'email-error' : undefined}
                            aria-invalid={!!errors.email}
                            className={`w-full px-4 py-3 rounded-xl border text-sm text-foreground placeholder:text-foreground-subtle focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-colors bg-background ${errors.email ? 'border-red-400 bg-red-50' : 'border-border'
                              }`}
                            disabled={formState === 'submitting'}
                          />
                          {errors.email && (
                            <p id="email-error" className="text-xs text-red-600" role="alert">
                              {errors.email}
                            </p>
                          )}
                        </div>

                        {/* Message (optional) */}
                        <div className="space-y-1.5">
                          <label htmlFor="early-access-message" className="text-xs font-semibold text-foreground-muted uppercase tracking-wider">
                            Message
                          </label>
                          <textarea
                            id="early-access-message"
                            rows={3}
                            value={message}
                            onChange={e => setMessage(e.target.value)}
                            placeholder="Tell us what you're interested in..."
                            className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm text-foreground placeholder:text-foreground-subtle focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-colors resize-none"
                            disabled={formState === 'submitting'}
                          />
                        </div>

                        {submitError && (
                          <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 font-medium" role="alert">
                            {submitError}
                          </div>
                        )}

                        <button
                          type="submit"
                          disabled={formState === 'submitting'}
                          className="w-full py-3.5 rounded-xl bg-foreground text-white text-sm font-semibold hover:bg-surface-dark-hover disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                          aria-label="Send"
                        >
                          {formState === 'submitting' ? (
                            <span className="flex items-center justify-center gap-2">
                              <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                              </svg>
                              Sending...
                            </span>
                          ) : 'Send'}
                        </button>

                        <p className="text-[11px] text-foreground-subtle text-center leading-relaxed">
                          We’ll only use your email to contact you about AarogyaDamu. See our{' '}
                          <a href="/privacy" className="text-accent hover:underline font-medium">Privacy Policy</a>. Please don’t share medical details here.
                        </p>
                      </form>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

