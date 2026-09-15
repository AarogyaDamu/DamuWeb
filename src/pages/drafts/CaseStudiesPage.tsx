import React from 'react';
import { SeoHead } from '../../components/seo/SeoHead';
import { Breadcrumbs } from '../../components/ui/Breadcrumbs';
import { IconCheck, IconArrowRight } from '../../components/ui/CustomSvgIcons';

interface SubPageProps {
  onNavigate: (path: string) => void;
  onOpenGetStarted: () => void;
}

export function CaseStudiesPage({ onNavigate, onOpenGetStarted }: SubPageProps) {
  const validationScenarios = [
    {
      title: 'Scenario A: Fragmented Lab PDFs to Longitudinal Trajectory',
      category: 'Data Normalization & Baseline',
      problem: 'Patient had 5 separate lab report PDFs across 18 months from 2 diagnostic labs. Fasting blood sugar values fluctuated between 92 and 112 mg/dL.',
      outcome: 'AarogyaDamu parsed all 5 lab PDFs, extracted canonical mg/dL values, and established a 92 mg/dL 90-day personal baseline, highlighting an emerging +20 mg/dL upward trajectory.',
      verification: 'Verified via 100% deterministic TimeContextEngine recency decay calculus.',
    },
    {
      title: 'Scenario B: Multi-Domain Co-movement (Metabolic + Vitals)',
      category: 'Cross-Metric Engine',
      problem: 'Patient experienced simultaneous gradual increases in HbA1c (6.2% to 6.8%) and Systolic BP (122 to 138 mmHg) over a 45-day period.',
      outcome: 'CrossMetricRelationshipEngine identified aligned temporal slope overlap correlation without making illegal causal assertions.',
      verification: '7-dimension evidence sufficiency score reached 0.84 (above 0.70 threshold).',
    },
    {
      title: 'Scenario C: Patient-Controlled Specialist Share Grant',
      category: 'Doctor Web-Share Token',
      problem: 'Patient needed to share metabolic and vitals history with an endocrinologist during a 10-minute clinic visit without sharing full account credentials.',
      outcome: 'Patient generated a 24-hour time-bounded share token (AGD-7K2P-93XM) scoped strictly to Timeline and Labs.',
      verification: 'Doctor reviewed 90-day trajectory directly in web browser without app installation.',
    },
  ];

  return (
    <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-12">
      <SeoHead
        title="Case Studies & Engine Validation Scenarios - AarogyaDamu"
        description="Explore real engine validation scenarios demonstrating how AarogyaDamu converts fragmented health PDFs into longitudinal baselines and evidence-bounded explanations."
        canonicalUrl="https://aarogyadamu.com/case-studies"
      />

      <Breadcrumbs items={[{ name: 'Case Studies' }]} onNavigate={onNavigate} />

      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-sage">Engine Validation & Proof</span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-foreground">
          Product Validation Scenarios
        </h1>
        <p className="text-base text-foreground-muted leading-relaxed">
          Real architectural validation scenarios illustrating how the Personal Baseline Engine and 7-Dimension Evidence Sufficiency Engine operate under real patient data conditions.
        </p>
      </div>

      <div className="space-y-6">
        {validationScenarios.map((sc, idx) => (
          <div key={idx} className="p-6 sm:p-8 rounded-3xl bg-surface border border-foreground/10 space-y-4 shadow-subtle">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-accent px-2.5 py-0.5 rounded-full bg-accent/10">
                {sc.category}
              </span>
              <span className="text-xs font-mono text-foreground-subtle">Scenario {idx + 1}</span>
            </div>

            <h3 className="font-serif text-xl sm:text-2xl font-bold text-foreground">{sc.title}</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-background border border-foreground/5 space-y-1">
                <div className="font-bold text-foreground uppercase tracking-wider text-[10px]">Initial State</div>
                <p className="text-foreground-muted leading-relaxed">{sc.problem}</p>
              </div>

              <div className="p-4 rounded-2xl bg-background border border-foreground/5 space-y-1">
                <div className="font-bold text-sage uppercase tracking-wider text-[10px]">Engine Outcome</div>
                <p className="text-foreground-muted leading-relaxed">{sc.outcome}</p>
              </div>
            </div>

            <div className="pt-3 border-t border-foreground/5 flex items-center gap-2 text-xs font-mono text-sage">
              <IconCheck className="w-4 h-4 text-sage" /> {sc.verification}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
