import React from 'react';
import { SeoHead } from '../components/seo/SeoHead';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';

interface SubPageProps {
  onNavigate: (path: string) => void;
  onOpenGetStarted: () => void;
}

export function AboutPage({ onNavigate, onOpenGetStarted }: SubPageProps) {
  return (
    <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-16">
      <SeoHead
        title="About Us - AarogyaDamu Health Intelligence"
        description="Learn about AarogyaDamu: our mission to build a continuous health intelligence layer for individuals, our engineering principles, and data sovereignty philosophy."
        canonicalUrl="https://aarogyadamu.com/about"
      />

      <Breadcrumbs items={[{ name: 'About' }]} onNavigate={onNavigate} />

      <div className="text-center space-y-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-accent">About AarogyaDamu</span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-foreground">
          Building the Intelligence Layer for Personal Healthcare
        </h1>
        <p className="text-base text-foreground-muted max-w-2xl mx-auto leading-relaxed">
          We believe personal health data shouldn't be trapped in isolated PDFs, separate apps, or forgotten paper prescriptions. Your health is a continuous story that deserves to be understood over time.
        </p>
      </div>

      <div className="p-8 sm:p-10 rounded-3xl bg-surface border border-foreground/10 space-y-6 shadow-subtle">
        <h2 className="font-serif text-2xl font-bold text-foreground">Our Core Principles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-foreground-muted">
          <div className="space-y-2 p-4 rounded-2xl bg-background border border-foreground/5">
            <h3 className="font-bold text-foreground text-sm">01. Your Health, Understood Over Time</h3>
            <p className="leading-relaxed">
              Health isn't static. Single measurements are hard to interpret without historical trajectory, persistence windows, and recency context.
            </p>
          </div>
          <div className="space-y-2 p-4 rounded-2xl bg-background border border-foreground/5">
            <h3 className="font-bold text-foreground text-sm">02. Medical Understanding, Not Medical Advice</h3>
            <p className="leading-relaxed">
              We never claim autonomous clinical diagnosis or treatment. We provide factual baseline organization to empower better conversations with your doctor.
            </p>
          </div>
          <div className="space-y-2 p-4 rounded-2xl bg-background border border-foreground/5">
            <h3 className="font-bold text-foreground text-sm">03. Deterministic Domain Engineering</h3>
            <p className="leading-relaxed">
              We rely on pure TypeScript mathematical domain models rather than ungrounded LLM black boxes. AI explains context: it never fabricates raw data.
            </p>
          </div>
          <div className="space-y-2 p-4 rounded-2xl bg-background border border-foreground/5">
            <h3 className="font-bold text-foreground text-sm">04. Patient Data Sovereignty</h3>
            <p className="leading-relaxed">
              We build with patient control and strict privacy safeguards as foundational principles. You decide what information to share and with whom.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
