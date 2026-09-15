import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { IconCheck, IconAlertCircle } from '../ui/CustomSvgIcons';

export function DynamicStateEngineDemo() {
  const [obsCount, setObsCount] = useState<number>(8);
  const [sourceTier, setSourceTier] = useState<'doctor' | 'ocr' | 'wearable' | 'manual'>('ocr');
  const [hasContradiction, setHasContradiction] = useState<boolean>(false);
  const [domainCount, setDomainCount] = useState<number>(3);

  const obsScore = Math.min(1.0, obsCount / 10);
  const recencyScore = 0.88;
  const temporalScore = 0.82;
  const sourceQuality = { doctor: 0.98, ocr: 0.92, wearable: 0.85, manual: 0.65 }[sourceTier];
  const measureQuality = 0.90;
  const crossDomainCoverage = Math.min(1.0, domainCount / 4);
  const contradictionPenalty = hasContradiction ? 0.25 : 0.0;

  const rawWeightedScore =
    obsScore * 0.20 +
    recencyScore * 0.15 +
    temporalScore * 0.15 +
    sourceQuality * 0.15 +
    measureQuality * 0.10 +
    crossDomainCoverage * 0.25 -
    contradictionPenalty;

  const overallScore = Math.max(0.0, Math.min(1.0, parseFloat(rawWeightedScore.toFixed(2))));
  const isSufficient = overallScore >= 0.70;

  return (
    <div className="w-full max-w-5xl mx-auto my-12 p-6 sm:p-10 rounded-3xl bg-surface border border-foreground/10 shadow-elevated">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-foreground/10">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-accent">
            100% Deterministic TypeScript Engine
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-foreground mt-0.5">
            7-Dimension Evidence Sufficiency Engine
          </h3>
        </div>

        <div className="flex items-center gap-3 bg-surface-subtle p-3 rounded-2xl border border-foreground/10">
          <div className="text-right">
            <div className="text-[10px] text-foreground-subtle uppercase tracking-wider">Sufficiency Score</div>
            <div className="font-mono text-xl font-extrabold text-foreground">{overallScore} / 1.0</div>
          </div>
          <div
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 ${
              isSufficient
                ? 'bg-sage/15 text-sage border border-sage/30'
                : 'bg-amber-100 text-amber-800 border border-amber-300'
            }`}
          >
            {isSufficient ? <IconCheck className="w-4 h-4 text-sage" /> : <IconAlertCircle className="w-4 h-4 text-amber-700" />}
            {isSufficient ? 'SUFFICIENT (≥0.70)' : 'EMERGING / INSUFFICIENT'}
          </div>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 space-y-5 p-5 rounded-2xl bg-background border border-foreground/10">
          <h4 className="text-xs font-bold uppercase tracking-wider text-foreground-muted flex items-center gap-1.5">
            Adjust Inputs to Test Sufficiency:
          </h4>

          <div>
            <div className="flex justify-between text-xs font-medium text-foreground mb-1.5">
              <span>Observation Frequency</span>
              <span className="font-mono text-accent">{obsCount} data points</span>
            </div>
            <input
              type="range"
              min={1}
              max={15}
              value={obsCount}
              onChange={(e) => setObsCount(parseInt(e.target.value))}
              className="w-full accent-accent"
            />
          </div>

          <div>
            <div className="text-xs font-medium text-foreground mb-1.5">Primary Source Provenance</div>
            <div className="grid grid-cols-2 gap-1.5">
              {(['doctor', 'ocr', 'wearable', 'manual'] as const).map((tier) => (
                <button
                  key={tier}
                  onClick={() => setSourceTier(tier)}
                  className={`px-2.5 py-1.5 text-xs font-semibold rounded-xl capitalize transition-all ${
                    sourceTier === tier
                      ? 'bg-foreground text-surface shadow-subtle'
                      : 'bg-surface text-foreground-muted hover:text-foreground border border-foreground/10'
                  }`}
                >
                  {tier === 'ocr' ? 'Lab OCR (0.92)' : tier === 'doctor' ? 'Doctor (0.98)' : tier === 'wearable' ? 'Wearable (0.85)' : 'Manual (0.65)'}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-medium text-foreground mb-1.5">
              <span>Cross-Domain Coverage</span>
              <span className="font-mono text-sage">{domainCount} domains</span>
            </div>
            <div className="flex gap-2">
              {[1, 2, 3, 4].map((d) => (
                <button
                  key={d}
                  onClick={() => setDomainCount(d)}
                  className={`flex-1 py-1.5 text-xs font-semibold rounded-xl border ${
                    domainCount === d
                      ? 'bg-sage text-surface border-sage'
                      : 'bg-surface text-foreground-muted border-foreground/10'
                  }`}
                >
                  {d} {d === 1 ? 'Domain' : 'Domains'}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2 border-t border-foreground/10 flex items-center justify-between">
            <span className="text-xs font-medium text-foreground">Source Contradiction Penalty</span>
            <button
              onClick={() => setHasContradiction(!hasContradiction)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-all ${
                hasContradiction
                  ? 'bg-rose-600 text-surface'
                  : 'bg-surface-subtle text-foreground-muted border border-foreground/10'
              }`}
            >
              {hasContradiction ? 'Contradiction (-0.25)' : 'No Conflict (0.0)'}
            </button>
          </div>
        </div>

        <div className="lg:col-span-7 space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-foreground-muted mb-3">
            7 Quality Dimensions Formula Weights:
          </h4>

          {[
            { label: 'Observation Sufficiency (20%)', score: obsScore, val: `${obsCount} pts` },
            { label: 'Recency Sufficiency (15%)', score: recencyScore, val: 'e^-λt decay' },
            { label: 'Temporal Window Span (15%)', score: temporalScore, val: '90 days' },
            { label: 'Source Provenance Quality (15%)', score: sourceQuality, val: sourceTier.toUpperCase() },
            { label: 'Measurement Quality and Units (10%)', score: measureQuality, val: 'Validated' },
            { label: 'Cross-Domain Coverage (25%)', score: crossDomainCoverage, val: `${domainCount}/4 domains` },
            { label: 'Contradiction Penalty (-penalty)', score: 1 - contradictionPenalty, val: hasContradiction ? '-0.25' : 'None', isPenalty: true },
          ].map((dim, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex justify-between text-xs text-foreground-muted">
                <span className="font-medium text-foreground">{dim.label}</span>
                <span className="font-mono text-[11px]">{dim.val}</span>
              </div>
              <div className="h-3 bg-surface-subtle rounded-full overflow-hidden flex items-center">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.max(0, dim.score * 100)}%` }}
                  transition={{ duration: 0.5 }}
                  className={`h-full rounded-full ${
                    dim.isPenalty && hasContradiction
                      ? 'bg-rose-500'
                      : dim.score > 0.7
                      ? 'bg-sage'
                      : 'bg-accent'
                  }`}
                />
              </div>
            </div>
          ))}

          <div className="mt-4 p-4 rounded-xl bg-surface-subtle border border-foreground/10 text-xs text-foreground-muted leading-relaxed">
            <strong className="text-foreground">Why this matters:</strong> Rather than feeding raw patient records into a generic LLM, AarogyaDamu evaluates whether evidence sufficiency exceeds 0.70 before permitting health state transitions.
          </div>
        </div>
      </div>
    </div>
  );
}
