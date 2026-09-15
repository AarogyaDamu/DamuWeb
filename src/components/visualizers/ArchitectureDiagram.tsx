import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { IconShield, IconActivity } from '../ui/CustomSvgIcons';

export function ArchitectureDiagram() {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  const pipelineSteps = [
    {
      num: '01',
      title: 'Heterogeneous Data Sources',
      desc: 'PDF Lab Reports, Prescriptions, Apple Health / Wearables, Doctor Notes, Manual Entry.',
      tech: 'OCR Parser & Unit Converters',
    },
    {
      num: '02',
      title: 'Canonical Health Events',
      desc: 'Normalized schema (C, mg/dL, kg, mmHg, bpm) with source type and provenance metadata.',
      tech: 'packages/types/src/index.ts',
    },
    {
      num: '03',
      title: 'Personal Baseline Engine',
      desc: 'Calculates rolling personal averages and expected individual low/high ranges.',
      tech: 'packages/health-domain/src/baseline',
    },
    {
      num: '04',
      title: 'Time Context Engine',
      desc: 'Calculates recency decay W(t) = e^(-λΔt), trajectory velocity, and persistence windows.',
      tech: 'packages/health-domain/src/time-context',
    },
    {
      num: '05',
      title: 'Cross-Metric Relationship Engine',
      desc: 'Evaluates temporal alignment and co-moving slope overlap using cautious non-causal rules.',
      tech: 'packages/health-domain/src/cross-metric',
    },
    {
      num: '06',
      title: '7-Dimension Evidence Sufficiency',
      desc: 'Evaluates observation count, recency, source quality, coverage, and contradiction level.',
      tech: 'Sufficiency Threshold ≥ 0.70',
    },
    {
      num: '07',
      title: 'Dynamic Personal Health State',
      desc: 'State transition engine with directional hysteresis (STABLE, PERSISTENT_CHANGE, IMPROVING).',
      tech: 'packages/health-domain/src/state-transition',
    },
    {
      num: '08',
      title: 'Bounded AI Context Compiler',
      desc: 'Constructs factual LLM prompt payload with explicit source references and non-causal rules.',
      tech: 'packages/health-domain/src/ai-context',
    },
    {
      num: '09',
      title: 'Damu Voice & Consumer UX',
      desc: '11-state voice/text agent delivering calm, grounded, evidence-backed medical understanding.',
      tech: 'Grounded Consumer Experience',
    },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto my-12 p-6 sm:p-10 rounded-3xl bg-surface-dark text-surface border border-surface/10 shadow-elevated">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 border-b border-surface/10">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-accent">
            <IconActivity className="w-4 h-4 text-accent" />
            100% Deterministic TypeScript Pipeline
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-surface mt-1">
            Built as a Health Intelligence System: Not a Chatbot Wrapper
          </h3>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-sage px-3 py-1.5 rounded-full bg-sage/10 border border-sage/20">
          <IconShield className="w-4 h-4 text-sage" /> Zero Uncurated RAG Hallucinations
        </div>
      </div>

      <div className="mt-8 space-y-3">
        {pipelineSteps.map((step, idx) => {
          const isHighlighted = activeStep === idx;
          return (
            <div
              key={idx}
              onClick={() => setActiveStep(idx === activeStep ? null : idx)}
              className={`p-4 sm:p-5 rounded-2xl cursor-pointer transition-all border ${
                isHighlighted
                  ? 'bg-surface/15 border-accent shadow-card scale-[1.01]'
                  : 'bg-surface/5 border-surface/10 hover:bg-surface/10'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-bold text-accent px-2 py-0.5 rounded bg-accent/10 border border-accent/20">
                    {step.num}
                  </span>
                  <h4 className="text-base font-bold text-surface">{step.title}</h4>
                </div>
                <span className="font-mono text-[11px] text-surface/50 bg-surface/10 px-2.5 py-0.5 rounded-md self-start sm:self-auto">
                  {step.tech}
                </span>
              </div>
              <p className="mt-2 text-xs text-surface/70 leading-relaxed pl-9">
                {step.desc}
              </p>
            </div>
          );
        })}
      </div>

      <div className="mt-8 pt-6 border-t border-surface/10 flex flex-col sm:flex-row items-center justify-between text-xs text-surface/50 gap-4">
        <span>Click any architectural stage above to highlight engine package details</span>
        <span className="text-accent font-mono">
          packages/health-domain pure TS pipeline
        </span>
      </div>
    </div>
  );
}
