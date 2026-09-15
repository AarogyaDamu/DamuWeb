import React, { useState } from 'react';
import { motion } from 'framer-motion';

export function PersonalBaselineVisualizer() {
  const [selectedMetric, setSelectedMetric] = useState<'hba1c' | 'bp' | 'rhr' | 'glucose'>('hba1c');

  const metricData = {
    hba1c: {
      name: 'HbA1c (Glycated Hemoglobin)',
      unit: '%',
      popRange: { low: 4.0, high: 5.6 },
      personalBaseline: { low: 5.8, high: 6.2, avg: 6.0 },
      latestReading: 6.8,
      velocity: '+0.015 % / day',
      persistence: '0.88 (3 consecutive labs)',
      evidenceSufficiency: 0.84,
      note: 'Single population standard marks >5.7% as prediabetes. Your personal baseline of 6.0% means a 6.8% reading is a +0.8% deviation over 90 days.',
    },
    bp: {
      name: 'Systolic Blood Pressure',
      unit: 'mmHg',
      popRange: { low: 90, high: 120 },
      personalBaseline: { low: 118, high: 126, avg: 122 },
      latestReading: 138,
      velocity: '+0.32 mmHg / day',
      persistence: '0.92 (Dense wearable + manual)',
      evidenceSufficiency: 0.91,
      note: 'Population average target is 120 mmHg. Your personal 90-day baseline is 122 mmHg. Current 138 mmHg is a persistent high deviation.',
    },
    rhr: {
      name: 'Resting Heart Rate',
      unit: 'bpm',
      popRange: { low: 60, high: 100 },
      personalBaseline: { low: 62, high: 68, avg: 65 },
      latestReading: 76,
      velocity: '+0.25 bpm / day',
      persistence: '0.95 (Apple Health Wearable)',
      evidenceSufficiency: 0.96,
      note: '76 bpm is technically inside the population normal range (60-100), but represents a +11 bpm jump over your personal 65 bpm baseline.',
    },
    glucose: {
      name: 'Fasting Blood Glucose',
      unit: 'mg/dL',
      popRange: { low: 70, high: 99 },
      personalBaseline: { low: 88, high: 96, avg: 92 },
      latestReading: 112,
      velocity: '+0.45 mg/dL / day',
      persistence: '0.78 (Lab OCR verified)',
      evidenceSufficiency: 0.82,
      note: 'Your personal normal is 92 mg/dL. The jump to 112 mg/dL aligns temporally with the HbA1c trajectory.',
    },
  };

  const curr = metricData[selectedMetric];

  return (
    <div className="w-full max-w-4xl mx-auto my-10 p-6 sm:p-8 rounded-3xl bg-surface border border-foreground/10 shadow-elevated">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-foreground/10">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-sage">
            Personal Baseline Engine vs Population Averages
          </span>
          <h3 className="font-serif text-2xl font-bold text-foreground mt-0.5">
            Your Normal Matters
          </h3>
        </div>

        <div className="flex flex-wrap gap-1.5 p-1 rounded-2xl bg-surface-subtle border border-foreground/5">
          {(['hba1c', 'bp', 'rhr', 'glucose'] as const).map((m) => (
            <button
              key={m}
              onClick={() => setSelectedMetric(m)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-all ${
                selectedMetric === m
                  ? 'bg-foreground text-surface shadow-subtle'
                  : 'text-foreground-muted hover:text-foreground'
              }`}
            >
              {m.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 space-y-6">
        <div className="flex items-center justify-between">
          <span className="font-serif text-lg font-bold text-foreground">{curr.name}</span>
          <span className="font-mono text-xs font-semibold text-accent bg-accent/10 px-3 py-1 rounded-full">
            Latest: {curr.latestReading} {curr.unit}
          </span>
        </div>

        <div className="space-y-4 p-5 rounded-2xl bg-background border border-foreground/10">
          <div>
            <div className="flex justify-between text-xs text-foreground-muted mb-1.5">
              <span className="font-medium">Generic Population Reference Range</span>
              <span className="font-mono">
                {curr.popRange.low} – {curr.popRange.high} {curr.unit}
              </span>
            </div>
            <div className="relative h-7 bg-slate-200 rounded-xl overflow-hidden flex items-center px-3">
              <div className="absolute left-[15%] right-[25%] h-full bg-slate-300 rounded-lg" />
              <span className="relative z-10 text-[10px] font-semibold text-slate-700">Standard Clinical Reference</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-semibold text-foreground mb-1.5">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-sage" /> Your Personal 90-Day Historical Baseline
              </span>
              <span className="font-mono text-sage">
                {curr.personalBaseline.low} – {curr.personalBaseline.high} {curr.unit} (Avg: {curr.personalBaseline.avg})
              </span>
            </div>
            <div className="relative h-9 bg-surface rounded-xl border border-foreground/15 overflow-hidden flex items-center px-3">
              <div className="absolute left-[30%] right-[40%] h-full bg-sage/20 border-x-2 border-sage/60" />
              <div className="absolute left-[45%] w-0.5 h-full bg-sage font-mono text-[10px]" />
              <motion.div
                layoutId="latestMarker"
                className="absolute left-[78%] w-4 h-4 rounded-full bg-accent ring-4 ring-accent/20 z-20 flex items-center justify-center text-surface text-[9px] font-bold"
              />

              <div className="relative z-10 flex justify-between w-full text-[10px] text-foreground-muted font-mono">
                <span>Low</span>
                <span className="font-semibold text-sage">Personal Normal</span>
                <span className="font-bold text-accent">Latest Observation</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3.5 rounded-xl bg-surface-subtle border border-foreground/5 space-y-1">
            <div className="text-foreground-subtle text-[11px] font-medium">Trajectory Velocity</div>
            <div className="font-mono font-bold text-foreground text-xs">{curr.velocity}</div>
            <div className="text-[10px] text-foreground-muted">Rate of change per day</div>
          </div>

          <div className="p-3.5 rounded-xl bg-surface-subtle border border-foreground/5 space-y-1">
            <div className="text-foreground-subtle text-[11px] font-medium">Persistence Score</div>
            <div className="font-mono font-bold text-foreground text-xs">{curr.persistence}</div>
            <div className="text-[10px] text-sage font-medium">Step-consistency verified</div>
          </div>

          <div className="p-3.5 rounded-xl bg-surface-subtle border border-foreground/5 space-y-1">
            <div className="text-foreground-subtle text-[11px] font-medium">Evidence Sufficiency</div>
            <div className="font-mono font-bold text-foreground text-xs">{curr.evidenceSufficiency} / 1.0</div>
            <div className="text-[10px] text-sage font-semibold">✓ Above 0.70 threshold</div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-accent/5 border border-accent/20 text-xs text-foreground-muted leading-relaxed">
          <strong className="text-foreground font-semibold">Engine Context: </strong>
          {curr.note}
        </div>
      </div>
    </div>
  );
}
