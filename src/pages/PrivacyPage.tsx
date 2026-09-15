import React from 'react';
import { SeoHead } from '../components/seo/SeoHead';

interface SubPageProps {
  onNavigate: (path: string) => void;
  onOpenGetStarted: () => void;
}

export function PrivacyPage({ onNavigate, onOpenGetStarted }: SubPageProps) {
  return (
    <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-10">
      <SeoHead
        title="Privacy Policy - AarogyaDamu"
        description="Read AarogyaDamu's privacy policy: information collection, consent principles, analytics preferences, and data handling safeguards."
        canonicalUrl="https://aarogyadamu.com/privacy"
      />

      <div className="space-y-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-sage">Data Safeguards & Rights</span>
        <h1 className="font-serif text-4xl font-bold text-foreground">Privacy Policy</h1>
        <p className="text-xs text-foreground-muted">Effective Date: September 2026</p>
      </div>

      <div className="p-8 sm:p-10 rounded-3xl bg-surface border border-foreground/10 space-y-8 text-xs text-foreground-muted leading-relaxed">
        <section className="space-y-2">
          <h2 className="font-serif text-lg font-bold text-foreground">1. Public Website Scope</h2>
          <p>
            This Privacy Policy applies solely to information collected through the AarogyaDamu public marketing website (aarogyadamu.com). 
            The public marketing website is intended to provide information about AarogyaDamu products, allow visitors to sign up for early access, and submit inquiries to our team.
          </p>
          <div className="p-4 rounded-2xl bg-surface-subtle border border-foreground/10 text-foreground space-y-1 mt-3">
            <strong className="text-xs font-semibold block">Public Site Health Data Boundary:</strong>
            <p className="text-xs text-foreground-muted">
              The public marketing website does not request, require, or process sensitive health information such as medical records, lab reports, prescriptions, clinical diagnoses, or health conditions. Please do not submit medical information through our contact or early-access forms.
            </p>
          </div>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-lg font-bold text-foreground">2. Information We Collect</h2>
          <p>We collect only the minimal information necessary to fulfill your requests:</p>
          <ul className="list-disc list-inside space-y-1.5 pl-2">
            <li><strong>Early Access Signups:</strong> Email address and optional name provided when requesting early access.</li>
            <li><strong>Contact Inquiries:</strong> Name, email address, inquiry subject, and message content submitted via our contact form.</li>
            <li><strong>Technical & Usage Data:</strong> Optional non-identifying behavioral analytics (such as page views and button clicks) collected only when you explicitly grant consent.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-lg font-bold text-foreground">3. Purpose and Legal Basis for Processing</h2>
          <p>
            We process your contact and early-access information based on your explicit consent to respond to your inquiries and notify you about product availability. 
            We do not sell, rent, or trade your personal information with third-party advertisers.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-lg font-bold text-foreground">4. Analytics and Cookies</h2>
          <p>
            We use privacy-conscious analytics to understand aggregate traffic and improve site usability. Non-essential analytics scripts remain disabled by default until you grant consent via our cookie notification. You can modify your preferences at any time by clearing your browser storage or updating your choice.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-lg font-bold text-foreground">5. Data Retention and User Rights</h2>
          <p>
            We retain contact submissions and early access signups only for as long as necessary to communicate with you regarding product updates or answer your support requests. 
            You have the right to request access to, correction of, or deletion of your contact details at any time by emailing us at <a href="mailto:aarogyadamu@gmail.com" className="text-accent hover:underline font-mono">aarogyadamu@gmail.com</a>.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-lg font-bold text-foreground">6. Technical Safeguards</h2>
          <p>
            We employ industry-standard administrative, technical, and physical safeguards—including TLS encryption for all data in transit and restricted server-side access controls—to protect information collected through our website.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-lg font-bold text-foreground">7. Updates and Contact Information</h2>
          <p>
            We may update this Privacy Policy periodically to reflect improvements in our practices. For any privacy questions or requests, please contact our privacy contact at <a href="mailto:aarogyadamu@gmail.com" className="text-accent hover:underline font-mono">aarogyadamu@gmail.com</a>.
          </p>
        </section>
      </div>
    </div>
  );
}
