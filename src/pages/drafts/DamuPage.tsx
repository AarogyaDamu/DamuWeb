import React from 'react';
import { SeoHead } from '../../components/seo/SeoHead';
import { Breadcrumbs } from '../../components/ui/Breadcrumbs';
import { DamuOrb } from '../../components/ui/DamuOrb';

interface SubPageProps {
  onNavigate: (path: string) => void;
  onOpenGetStarted: () => void;
}

export function DamuPage({ onNavigate, onOpenGetStarted }: SubPageProps) {
  return (
    <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      <SeoHead
        title="Damu Personal Health Agent Spec - AarogyaDamu"
        description="Damu voice and text agent specification: 11-state voice machine, grounded prompt payload compiler, and non-causal safety guardrails."
        canonicalUrl="https://aarogyadamu.com/damu"
      />

      <Breadcrumbs items={[{ name: 'Damu Agent' }]} onNavigate={onNavigate} />

      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-accent">Personal Health Agent</span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-foreground">
          Meet Damu: Your Personal Health Companion
        </h1>
        <p className="text-base text-foreground-muted leading-relaxed">
          Grounded in your Personal Health Model. Enforces non-causal safety boundaries ("These changed in the same window"), zero ungrounded RAG hallucinations, and calm natural voice interactions.
        </p>
      </div>

      <div className="p-8 sm:p-12 rounded-3xl bg-surface border border-foreground/10 shadow-elevated flex flex-col items-center justify-center">
        <DamuOrb size="lg" interactive={true} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-surface border border-foreground/10 space-y-2 shadow-subtle">
          <div className="w-8 h-8 rounded-lg bg-accent/10 text-accent flex items-center justify-center font-bold text-xs">01</div>
          <h3 className="font-serif text-lg font-bold text-foreground">Grounded Prompt Payload</h3>
          <p className="text-xs text-foreground-muted leading-relaxed">
            Damu receives a strictly compiled factual context payload containing verified observations, source provenance, and baseline trajectory.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-surface border border-foreground/10 space-y-2 shadow-subtle">
          <div className="w-8 h-8 rounded-lg bg-sage/10 text-sage flex items-center justify-center font-bold text-xs">02</div>
          <h3 className="font-serif text-lg font-bold text-foreground">Non-Causal Safety Guardrails</h3>
          <p className="text-xs text-foreground-muted leading-relaxed">
            Damu will never assert illegal causal claims. It describes co-moving temporal alignment cautiously ("Changed in same window").
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-surface border border-foreground/10 space-y-2 shadow-subtle">
          <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-700 flex items-center justify-center font-bold text-xs">03</div>
          <h3 className="font-serif text-lg font-bold text-foreground">11-State Voice Machine</h3>
          <p className="text-xs text-foreground-muted leading-relaxed">
            Transitions physically through Ready, Listening, Transcribing, Thinking, Confirming, Executing, and Speaking with responsive visual feedback.
          </p>
        </div>
      </div>
    </div>
  );
}
