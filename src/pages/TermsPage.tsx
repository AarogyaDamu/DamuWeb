import React from 'react';
import { SeoHead } from '../components/seo/SeoHead';
import { IconAlertCircle } from '../components/ui/CustomSvgIcons';

interface SubPageProps {
  onNavigate: (path: string) => void;
  onOpenGetStarted: () => void;
}

export function TermsPage({ onNavigate, onOpenGetStarted }: SubPageProps) {
  return (
    <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-10">
      <SeoHead
        title="Terms of Service & Clinical Disclaimer - AarogyaDamu"
        description="Review terms of service, patient responsibilities, and medical boundary disclaimers for AarogyaDamu."
        canonicalUrl="https://aarogyadamu.com/terms"
      />

      <div className="space-y-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-foreground-subtle">Terms and Boundaries</span>
        <h1 className="font-serif text-4xl font-bold text-foreground">Terms of Service and Clinical Disclaimer</h1>
        <p className="text-xs text-foreground-muted">Effective Date: September 2026</p>
      </div>

      <div className="p-8 rounded-3xl bg-surface border border-foreground/10 space-y-6 text-xs text-foreground-muted leading-relaxed">
        <section className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 space-y-2">
          <div className="flex items-center gap-2 font-bold text-xs">
            <IconAlertCircle className="w-4 h-4 text-amber-600" /> MANDATORY MEDICAL BOUNDARY NOTICE
          </div>
          <p>
            <strong>Medical understanding, not medical advice.</strong> AarogyaDamu is a health information organization and longitudinal contextualization platform. It does NOT provide medical diagnosis, clinical decision support, or treatment recommendations. Always seek the advice of a qualified healthcare provider with any medical questions.
          </p>
        </section>

        <section className="space-y-2">
          <h3 className="font-serif text-lg font-bold text-foreground">1. Acceptance of Terms</h3>
          <p>By creating an account or accessing the AarogyaDamu website and mobile applications, you agree to these terms and acknowledge the clinical boundaries stated above.</p>
        </section>

        <section className="space-y-2">
          <h3 className="font-serif text-lg font-bold text-foreground">2. User Account and UIN Integrity</h3>
          <p>You are responsible for maintaining the confidentiality of your UIN access tokens and security links shared with healthcare providers.</p>
        </section>

        <section className="space-y-2">
          <h3 className="font-serif text-lg font-bold text-foreground">3. Emergency Situations</h3>
          <p>If you believe you are experiencing a medical emergency, immediately call your local emergency services (102/108 in India) or visit the nearest hospital emergency room.</p>
        </section>
      </div>
    </div>
  );
}
