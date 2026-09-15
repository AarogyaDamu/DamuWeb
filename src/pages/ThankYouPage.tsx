import React from 'react';
import { SeoHead } from '../components/seo/SeoHead';
import { IconCheck, IconArrowRight, IconMail } from '../components/ui/CustomSvgIcons';

interface SubPageProps {
  onNavigate: (path: string) => void;
  onOpenGetStarted: () => void;
}

export function ThankYouPage({ onNavigate, onOpenGetStarted }: SubPageProps) {
  return (
    <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-xl mx-auto text-center space-y-8">
      <SeoHead
        title="Message Received - AarogyaDamu"
        description="Thank you for contacting AarogyaDamu. We have received your message and will respond as soon as possible."
        canonicalUrl="https://aarogyadamu.com/thank-you"
      />

      <div className="w-16 h-16 rounded-full bg-sage/15 text-sage flex items-center justify-center mx-auto border border-sage/30">
        <IconCheck className="w-8 h-8 text-sage" />
      </div>

      <div className="space-y-3">
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-foreground">
          Message Received
        </h1>
        <p className="text-sm text-foreground-muted leading-relaxed">
          Thanks. We've received your message and will get back to you as soon as possible.
        </p>
      </div>

      <div className="p-5 rounded-2xl bg-surface border border-foreground/10 text-xs text-foreground-muted space-y-2 shadow-subtle">
        <div className="font-semibold text-foreground">What happens next</div>
        <p className="text-foreground-muted">
          Our team reviews inquiries and typically replies within a few business days from <a href="mailto:aarogyadamu@gmail.com" className="text-accent font-mono hover:underline">aarogyadamu@gmail.com</a>. Please add this address to your contacts so our reply doesn't land in spam.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
        <button
          onClick={() => onNavigate('/')}
          className="w-full sm:w-auto px-6 py-3 bg-foreground text-surface font-semibold text-xs rounded-xl shadow-subtle"
        >
          Return to Home
        </button>
        <button
          onClick={() => onNavigate('/about')}
          className="w-full sm:w-auto px-6 py-3 bg-surface-subtle text-foreground font-semibold text-xs rounded-xl border border-foreground/10"
        >
          Learn About AarogyaDamu
        </button>
      </div>
    </div>
  );
}
