import React, { useState, useEffect } from 'react';
import { SeoHead } from '../components/seo/SeoHead';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { IconArrowRight, IconAlertCircle } from '../components/ui/CustomSvgIcons';
import { trackEvent } from '../lib/analytics';

interface SubPageProps {
  onNavigate: (path: string) => void;
  onOpenGetStarted: () => void;
}

export function ContactPage({ onNavigate, onOpenGetStarted }: SubPageProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Please enter your full name.';
    if (!formData.email.trim()) {
      errs.email = 'Please enter your email address.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = 'Please enter a valid email address.';
    }
    if (!formData.message.trim()) errs.message = 'Please enter your message.';
    return errs;
  };

  useEffect(() => {
    trackEvent('contact_form_view', { form: 'contact' });
  }, []);

  const [submitError, setSubmitError] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    trackEvent('contact_submit', { form: 'contact' });

    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      trackEvent('contact_error', { form: 'contact', error_type: 'validation' });
      return;
    }

    setErrors({});
    setSubmitError('');
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const contentType = res.headers.get('content-type');
      setIsSubmitting(false);

      if (contentType && contentType.includes('application/json')) {
        const data = await res.json();
        if (res.ok && data.success) {
          trackEvent('contact_success', { form: 'contact' });
          onNavigate('/thank-you');
        } else {
          trackEvent('contact_error', { form: 'contact', error_type: 'api' });
          setSubmitError(data.error || 'Failed to send message. Please try again later.');
        }
      } else if (res.ok) {
        trackEvent('contact_success', { form: 'contact' });
        onNavigate('/thank-you');
      } else {
        trackEvent('contact_error', { form: 'contact', error_type: 'api' });
        setSubmitError('Failed to send message. Please try again later.');
      }
    } catch {
      setIsSubmitting(false);
      trackEvent('contact_error', { form: 'contact', error_type: 'network' });
      setSubmitError('Network error. Please check your internet connection and try again.');
    }
  };

  const contactSchema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact AarogyaDamu',
    description: 'Get in touch with the AarogyaDamu engineering and product team.',
    mainEntity: {
      '@type': 'Organization',
      name: 'AarogyaDamu',
      email: 'aarogyadamu@gmail.com',
      url: 'https://aarogyadamu.com',
    },
  };

  return (
    <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-12">
      <SeoHead
        title="Get in Touch - AarogyaDamu Engineering Team"
        description="Contact the AarogyaDamu health technology team for product inquiries, doctor integrations, and technical support. Email: aarogyadamu@gmail.com"
        canonicalUrl="https://aarogyadamu.com/contact"
        schemaJson={contactSchema}
      />

      <Breadcrumbs items={[{ name: 'Contact' }]} onNavigate={onNavigate} />

      <div className="text-center space-y-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-accent">Get in Touch</span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-foreground">
          Contact AarogyaDamu
        </h1>
        <p className="text-sm text-foreground-muted max-w-xl mx-auto">
          Have a question about our Personal Health Model architecture, doctor share links, or integration roadmap? We would love to hear from you.
        </p>
      </div>

      <div className="max-w-2xl mx-auto p-8 sm:p-10 rounded-3xl bg-surface border border-foreground/10 shadow-subtle">
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="contact-name" className="block text-xs font-medium text-foreground mb-1">
                Full Name <span className="text-accent">*</span>
              </label>
              <input
                id="contact-name"
                type="text"
                autoComplete="name"
                placeholder="Your name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                aria-required="true"
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? 'contact-name-error' : undefined}
                className={`w-full px-4 py-3 rounded-xl bg-background border text-xs text-foreground placeholder:text-foreground-subtle focus:outline-none ${
                  errors.name ? 'border-rose-500 focus:ring-1 focus:ring-rose-500' : 'border-foreground/15 focus:border-accent'
                }`}
              />
              {errors.name && (
                <p id="contact-name-error" className="mt-1 text-[11px] text-rose-600 flex items-center gap-1" role="alert">
                  <IconAlertCircle className="w-3.5 h-3.5 text-rose-600" /> {errors.name}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="contact-email" className="block text-xs font-medium text-foreground mb-1">
                Email Address <span className="text-accent">*</span>
              </label>
              <input
                id="contact-email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                aria-required="true"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'contact-email-error' : undefined}
                className={`w-full px-4 py-3 rounded-xl bg-background border text-xs text-foreground placeholder:text-foreground-subtle focus:outline-none ${
                  errors.email ? 'border-rose-500 focus:ring-1 focus:ring-rose-500' : 'border-foreground/15 focus:border-accent'
                }`}
              />
              {errors.email && (
                <p id="contact-email-error" className="mt-1 text-[11px] text-rose-600 flex items-center gap-1" role="alert">
                  <IconAlertCircle className="w-3.5 h-3.5 text-rose-600" /> {errors.email}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="contact-subject" className="block text-xs font-medium text-foreground mb-1">Inquiry Subject</label>
              <select
                id="contact-subject"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-background border border-foreground/15 text-xs text-foreground focus:outline-none focus:border-accent"
              >
                <option value="General Inquiry">General Product Inquiry</option>
                <option value="Doctor Integration">Doctor & Clinic Integration</option>
                <option value="Data Privacy">Privacy & Data Handling</option>
                <option value="Technical Support">Technical Support</option>
              </select>
            </div>

            <div>
              <label htmlFor="contact-message" className="block text-xs font-medium text-foreground mb-1">
                Your Message <span className="text-accent">*</span>
              </label>
              <textarea
                id="contact-message"
                rows={4}
                placeholder="How can we assist you? Please don't include medical records or health details here."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                aria-required="true"
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? 'contact-message-error' : undefined}
                className={`w-full px-4 py-3 rounded-xl bg-background border text-xs text-foreground placeholder:text-foreground-subtle focus:outline-none ${
                  errors.message ? 'border-rose-500 focus:ring-1 focus:ring-rose-500' : 'border-foreground/15 focus:border-accent'
                }`}
              />
              {errors.message && (
                <p id="contact-message-error" className="mt-1 text-[11px] text-rose-600 flex items-center gap-1" role="alert">
                  <IconAlertCircle className="w-3.5 h-3.5 text-rose-600" /> {errors.message}
                </p>
              )}
            </div>

            {submitError && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 font-medium" role="alert">
                {submitError}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              aria-busy={isSubmitting}
              className="w-full py-3.5 px-4 bg-foreground hover:bg-surface-dark-card text-surface font-semibold text-xs rounded-xl shadow-card transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isSubmitting ? 'Sending Message...' : 'Send Message'}
              <IconArrowRight className="w-4 h-4 text-accent" />
            </button>

            <p className="text-[11px] text-foreground-subtle text-center leading-relaxed pt-1">
              By sending this message you agree to our{' '}
              <button type="button" onClick={() => onNavigate('/privacy')} className="text-accent hover:underline font-medium">Privacy Policy</button>.
              We only use your details to respond to your inquiry.
            </p>
          </form>
        </div>
      </div>
    );
  }
