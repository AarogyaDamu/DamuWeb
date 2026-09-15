import React from 'react';
import { SeoHead } from '../components/seo/SeoHead';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { FAQ_DATA, renderFormattedText } from '../components/sections/FaqSection';

interface SubPageProps {
  onNavigate: (path: string) => void;
  onOpenGetStarted: () => void;
}

export function FaqPage({ onNavigate }: SubPageProps) {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_DATA.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.a.replace(/\*/g, ''),
      },
    })),
  };

  return (
    <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-12">
      <SeoHead
        title="Frequently Asked Questions (FAQ) - AarogyaDamu"
        description="Find answers to common questions about AarogyaDamu, personal health intelligence, privacy, doctor sharing, and Damu agent."
        canonicalUrl="https://aarogyadamu.com/faq"
        schemaJson={faqSchema}
      />

      <Breadcrumbs items={[{ name: 'FAQ' }]} onNavigate={onNavigate} />

      <div className="text-center space-y-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-accent">Questions & Answers</span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-foreground">
          Frequently Asked Questions
        </h1>
        <p className="text-sm text-foreground-muted max-w-xl mx-auto">
          Everything you need to know about our personal health intelligence platform, privacy, doctor sharing, and Damu agent.
        </p>
      </div>

      <div className="space-y-4">
        {FAQ_DATA.map((faq, idx) => (
          <div key={idx} className="p-6 rounded-3xl bg-surface border border-foreground/10 space-y-3 shadow-subtle">
            <h3 className="font-serif text-lg font-bold text-foreground">{faq.q}</h3>
            <div className="text-xs text-foreground-muted leading-relaxed space-y-2">
              {faq.a.split('\n\n').map((paragraph, pIdx) => (
                <p key={pIdx}>
                  {renderFormattedText(paragraph)}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
