import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { IconFileText, IconActivity, IconClock, IconShield, IconArrowRight } from '../ui/CustomSvgIcons';

export function ProblemVisualizer() {
  const [isUnified, setIsUnified] = useState<boolean>(false);

  const scatteredItems = [
    { label: 'PDF Lab Reports', desc: 'Locked in WhatsApp & email attachments', icon: IconFileText, tag: 'Lab PDF' },
    { label: 'Paper Prescriptions', desc: 'Handwritten doctor notes & dosages', icon: IconFileText, tag: 'Prescription' },
    { label: 'Wearable Silos', desc: 'Disconnected Apple Health / Fitbit logs', icon: IconActivity, tag: 'Vitals' },
    { label: 'Hospital Portals', desc: 'Separate login per lab & hospital', icon: IconActivity, tag: 'Portal' },
    { label: 'Manual Symptom Memory', desc: '"I felt tired last month..."', icon: IconClock, tag: 'Symptom' },
    { label: 'Refill Schedules', desc: 'Forgotten medicine refill dates', icon: IconClock, tag: 'Care' },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto my-12 p-6 sm:p-10 rounded-3xl bg-surface border border-foreground/10 shadow-elevated">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-foreground/10">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-accent">
            The Structural Health Data Problem
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-foreground mt-1">
            {isUnified ? 'AarogyaDamu Unified Health Model' : 'Your Health Today: Fragmented & Isolated'}
          </h3>
        </div>

        <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-surface-subtle border border-foreground/10">
          <button
            onClick={() => setIsUnified(false)}
            className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all ${
              !isUnified
                ? 'bg-foreground text-surface shadow-subtle'
                : 'text-foreground-muted hover:text-foreground'
            }`}
          >
            Fragmented Reality
          </button>
          <button
            onClick={() => setIsUnified(true)}
            className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all ${
              isUnified
                ? 'bg-accent text-surface shadow-subtle'
                : 'text-foreground-muted hover:text-foreground'
            }`}
          >
            AarogyaDamu Connected
          </button>
        </div>
      </div>

      <div className="mt-8">
        {!isUnified ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {scatteredItems.map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={i}
                  className="p-5 rounded-2xl bg-background border border-foreground/10 shadow-subtle hover:border-foreground/20 transition-all flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-200">
                      Disconnected
                    </span>
                    <Icon className="w-5 h-5 text-foreground-muted" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-1">{item.label}</h4>
                    <p className="text-xs text-foreground-muted leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-8 rounded-2xl bg-surface-dark text-surface border border-surface/10 space-y-6"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-accent/20 border border-accent/40 flex items-center justify-center text-accent">
                  <IconShield className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-serif text-xl font-bold">Continuous Personal Health Picture</h4>
                  <p className="text-xs text-surface/60">One normalized, longitudinal model connecting all sources</p>
                </div>
              </div>
              <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-mono text-sage px-3 py-1 rounded-full bg-sage/10 border border-sage/20">
                ● 100% Deterministic Engine
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-surface/10">
              <div className="p-4 rounded-xl bg-surface/5 border border-surface/10 space-y-1">
                <div className="text-xs font-semibold text-accent uppercase tracking-wider">01 Ingest</div>
                <div className="text-sm font-medium text-surface">Multi-Source Normalization</div>
                <div className="text-xs text-surface/60">PDF OCR, lab values, prescriptions, wearables standardized into canonical units.</div>
              </div>
              <div className="p-4 rounded-xl bg-surface/5 border border-surface/10 space-y-1">
                <div className="text-xs font-semibold text-sage uppercase tracking-wider">02 Contextualize</div>
                <div className="text-sm font-medium text-surface">Rolling Personal Baseline</div>
                <div className="text-xs text-surface/60">Historical trajectory calculation, recency decay, and co-moving metric evaluation.</div>
              </div>
              <div className="p-4 rounded-xl bg-surface/5 border border-surface/10 space-y-1">
                <div className="text-xs font-semibold text-amber-400 uppercase tracking-wider">03 Understand</div>
                <div className="text-sm font-medium text-surface">Grounded Damu Context</div>
                <div className="text-xs text-surface/60">Evidence-bounded AI explanations with source provenance tracing.</div>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      <div className="mt-8 pt-6 border-t border-foreground/10 flex items-center justify-between text-xs text-foreground-muted">
        <span>Click options above to compare fragmented healthcare vs AarogyaDamu</span>
        <button
          onClick={() => setIsUnified(!isUnified)}
          className="text-accent font-semibold hover:underline inline-flex items-center gap-1"
        >
          Toggle view <IconArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
