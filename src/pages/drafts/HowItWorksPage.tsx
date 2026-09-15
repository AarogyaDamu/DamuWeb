import React from 'react';
import { SeoHead } from '../../components/seo/SeoHead';
import { Breadcrumbs } from '../../components/ui/Breadcrumbs';

interface SubPageProps {
  onNavigate: (path: string) => void;
  onOpenGetStarted: () => void;
}

export function HowItWorksPage({ onNavigate, onOpenGetStarted }: SubPageProps) {
  const steps = [
    {
      num: '01',
      title: 'Scattered health information',
      desc: 'Your health records, lab reports, prescriptions, and measurements live scattered across clinics, diagnostic centers, and personal files.',
    },
    {
      num: '02',
      title: 'Connected personal context',
      desc: 'AarogyaDamu brings these fragmented inputs together, building an organized longitudinal timeline of your healthcare story.',
    },
    {
      num: '03',
      title: 'Clearer understanding over time',
      desc: 'Rather than isolated PDF reports, your health data becomes a continuously useful personal health context.',
    },
    {
      num: '04',
      title: 'More useful healthcare interactions',
      desc: 'Share verified, time-bounded summaries with your doctor in seconds using a secure zero-install browser link.',
    },
  ];

  return (
    <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-16">
      <SeoHead
        title="How It Works - AarogyaDamu Personal Health Intelligence"
        description="Discover how AarogyaDamu connects scattered health information into a continuously useful personal health context."
        canonicalUrl="https://aarogyadamu.com/how-it-works"
      />

      <Breadcrumbs items={[{ name: 'How It Works' }]} onNavigate={onNavigate} />

      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-accent">Simple & Transparent</span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-foreground">
          How AarogyaDamu Works
        </h1>
        <p className="text-base text-foreground-muted leading-relaxed">
          From fragmented paper records to a connected, personal health context that makes every doctor interaction more informed.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {steps.map((step, idx) => (
          <div key={idx} className="p-8 rounded-3xl bg-surface border border-border shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-accent px-3 py-1 rounded-full bg-accent/10">
                Step {step.num}
              </span>
            </div>
            <h3 className="font-serif text-2xl font-bold text-foreground">{step.title}</h3>
            <p className="text-sm text-foreground-muted leading-relaxed">{step.desc}</p>
          </div>
        ))}
      </div>

      {/* CTA Callout */}
      <div className="p-8 rounded-3xl bg-surface-dark text-white border border-white/10 shadow-sm text-center space-y-4">
        <h2 className="font-serif text-3xl font-bold text-white">Experience Connected Health Context</h2>
        <p className="text-sm text-white/70 max-w-xl mx-auto">
          Get early access to organize your personal health records into a clear, connected timeline.
        </p>
        <div>
          <button
            onClick={onOpenGetStarted}
            className="px-6 py-3.5 rounded-xl bg-accent text-white font-semibold text-sm hover:bg-accent-hover transition-colors"
          >
            Get Early Access →
          </button>
        </div>
      </div>
    </div>
  );
}
