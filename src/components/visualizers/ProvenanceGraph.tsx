import React, { useState } from 'react';
import { IconArrowRight } from '../ui/CustomSvgIcons';

export function ProvenanceGraph() {
  const [activeNode, setActiveNode] = useState<number>(0);

  const nodes = [
    {
      id: 0,
      title: '01. Raw Source Record',
      type: 'SOURCE',
      name: 'Thyrocare Lab OCR PDF',
      detail: 'Source Type: OCR | Imported: 2026-08-15 | File Hash: e3b0c442...',
      confidence: '0.96 Extraction Confidence',
      badge: 'Immutable Source Truth',
    },
    {
      id: 1,
      title: '02. Canonical Observation',
      type: 'OBSERVATION',
      name: 'HbA1c = 6.8%',
      detail: 'Standardized Unit: % | Code: LOINC 4548-4 | Range Check: VALID',
      confidence: '1.0 Mapping Confidence',
      badge: 'Normalized Fact',
    },
    {
      id: 2,
      title: '03. Personal Baseline Derivation',
      type: 'DERIVED',
      name: '+0.6% Rolling Baseline Deviation',
      detail: '90-Day History Window (5 observations) | Recency Weight W(t) = 0.88',
      confidence: '0.91 Trajectory Score',
      badge: 'Calculated Derived Truth',
    },
    {
      id: 3,
      title: '04. Dynamic Health State',
      type: 'STATE',
      name: 'PERSISTENT_CHANGE (Metabolic)',
      detail: 'Sufficiency Score: 0.84 (≥0.70) | Zero Contradiction | Co-movement: BP',
      confidence: 'High Evidence Level',
      badge: 'State Transition Validated',
    },
    {
      id: 4,
      title: '05. Grounded AI Context',
      type: 'AI_CONTEXT',
      name: 'Evidence-Bounded Prompt Payload',
      detail: 'Non-Causal Rule Enforced: "Changed in same window, no causal assertion."',
      confidence: 'Binds LLM Output',
      badge: 'Damu Safety Boundary',
    },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto my-12 p-6 sm:p-10 rounded-3xl bg-surface border border-foreground/10 shadow-elevated">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-foreground/10">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-sage">
            Source Truth Integrity Architecture
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-foreground mt-0.5">
            Every Understanding Has Traceable Provenance
          </h3>
        </div>
        <div className="text-xs font-mono text-foreground-muted bg-surface-subtle px-3 py-1.5 rounded-xl border border-foreground/10">
          Rule: AI never overwrites raw source data
        </div>
      </div>

      <div className="mt-8 relative">
        <div className="hidden md:block absolute top-1/2 left-4 right-4 h-0.5 bg-foreground/10 -translate-y-1/2 -z-0" />

        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-3 relative z-10">
          {nodes.map((node) => {
            const isSelected = activeNode === node.id;
            return (
              <button
                key={node.id}
                onClick={() => setActiveNode(node.id)}
                className={`p-4 rounded-2xl text-left transition-all ${
                  isSelected
                    ? 'bg-surface-dark text-surface shadow-elevated scale-105 border border-surface/20 ring-2 ring-accent'
                    : 'bg-background hover:bg-surface-subtle text-foreground border border-foreground/10'
                }`}
              >
                <div className="text-[10px] font-mono font-bold uppercase opacity-60 mb-1">
                  {node.type}
                </div>
                <div className="text-xs font-bold truncate mb-2">{node.name}</div>
                <div
                  className={`text-[10px] px-2 py-0.5 rounded-full inline-block font-medium ${
                    isSelected ? 'bg-accent text-surface' : 'bg-foreground/5 text-foreground-muted'
                  }`}
                >
                  {node.badge}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-8 p-6 rounded-2xl bg-surface-subtle border border-foreground/10 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-accent animate-pulse" />
            <h4 className="font-serif text-xl font-bold text-foreground">
              {nodes[activeNode].title}
            </h4>
          </div>
          <span className="font-mono text-xs font-semibold px-3 py-1 rounded-full bg-sage/15 text-sage">
            {nodes[activeNode].confidence}
          </span>
        </div>

        <div className="p-4 rounded-xl bg-surface border border-foreground/10 font-mono text-xs text-foreground space-y-2">
          <div className="font-semibold text-accent">{nodes[activeNode].name}</div>
          <p className="text-foreground-muted font-sans text-xs">{nodes[activeNode].detail}</p>
        </div>

        <div className="flex items-center justify-between text-xs text-foreground-muted pt-2">
          <span>Click graph nodes above to trace the complete provenance chain from Lab PDF to Damu</span>
          <button
            onClick={() => setActiveNode((prev) => (prev + 1) % nodes.length)}
            className="text-accent font-semibold hover:underline inline-flex items-center gap-1"
          >
            Next provenance step <IconArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
