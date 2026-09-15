import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IconFileText, IconActivity, IconClock, IconCheck, IconArrowRight } from '../ui/CustomSvgIcons';

export function HeroVisualizer() {
  const [activeStage, setActiveStage] = useState<number>(0);

  const stages = [
    { title: '01. Fragmented Inputs', desc: 'Raw PDFs, lab values, prescriptions, wearables' },
    { title: '02. Canonical Health Events', desc: 'Normalized units and provenance tracing' },
    { title: '03. Personal Health Model', desc: 'Rolling baselines and trajectory decay' },
    { title: '04. Dynamic Health State', desc: 'Cross-metric co-movement and evidence sufficiency' },
    { title: '05. Damu Understanding', desc: 'Grounded non-causal AI contextualization' },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStage((prev) => (prev + 1) % stages.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const fragmentedData = [
    { type: 'Lab Report', label: 'HbA1c: 6.8%', icon: IconFileText, color: 'text-amber-700 border-amber-200 bg-amber-50' },
    { type: 'Prescription', label: 'Metformin 500mg', icon: IconFileText, color: 'text-blue-700 border-blue-200 bg-blue-50' },
    { type: 'Wearable', label: 'RHR: 74 bpm', icon: IconActivity, color: 'text-rose-700 border-rose-200 bg-rose-50' },
    { type: 'Vitals', label: 'BP: 138/88 mmHg', icon: IconActivity, color: 'text-accent border-accent/20 bg-accent/5' },
    { type: 'Symptom', label: 'Mild Fatigue (3 days)', icon: IconActivity, color: 'text-purple-700 border-purple-200 bg-purple-50' },
    { type: 'Appointment', label: 'Consult Dr. Sharma', icon: IconClock, color: 'text-sage border-sage/30 bg-sage/10' },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto my-8 p-6 sm:p-8 rounded-3xl bg-surface border border-foreground/10 shadow-elevated overflow-hidden relative">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-foreground/10">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-accent animate-ping" />
          <span className="text-xs font-semibold uppercase tracking-wider text-foreground-muted">
            Live Intelligence Transformation Pipeline
          </span>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {stages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveStage(idx)}
              className={`px-3 py-1 text-xs font-semibold rounded-full transition-all ${
                activeStage === idx
                  ? 'bg-foreground text-surface shadow-subtle'
                  : 'bg-surface-subtle text-foreground-muted hover:text-foreground hover:bg-foreground/5'
              }`}
            >
              Step {idx + 1}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between text-xs text-foreground-muted">
        <span className="font-serif text-base font-semibold text-foreground">
          {stages[activeStage].title}
        </span>
        <span>{stages[activeStage].desc}</span>
      </div>

      <div className="mt-6 min-h-[300px] flex items-center justify-center p-4 rounded-2xl bg-background border border-foreground/5 relative overflow-hidden">
        <AnimatePresence mode="wait">
          {activeStage === 0 && (
            <motion.div
              key="stage0"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.4 }}
              className="w-full grid grid-cols-2 sm:grid-cols-3 gap-3"
            >
              {fragmentedData.map((item, i) => {
                const Icon = item.icon;
                return (
                  <div
                    key={i}
                    className={`p-4 rounded-2xl border ${item.color} shadow-subtle flex flex-col justify-between`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider opacity-70">
                        {item.type}
                      </span>
                      <Icon className="w-4 h-4 opacity-80" />
                    </div>
                    <div className="font-mono text-xs font-semibold">{item.label}</div>
                    <div className="text-[10px] opacity-60 mt-1">Unstructured format</div>
                  </div>
                );
              })}
            </motion.div>
          )}

          {activeStage === 1 && (
            <motion.div
              key="stage1"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="w-full space-y-2.5 max-w-lg"
            >
              <div className="text-xs font-semibold text-foreground-muted mb-2">
                Standardizing into Canonical Health Events
              </div>

              {[
                { event: 'LAB_RESULT', value: 'HbA1c = 6.8%', unit: 'percentage', source: 'Verified OCR (Thyrocare)', conf: '0.96' },
                { event: 'VITAL', value: 'Blood Pressure = 138/88', unit: 'mmHg', source: 'Manual Entry', conf: '0.85' },
                { event: 'WEARABLE_MEASUREMENT', value: 'Resting Heart Rate = 74', unit: 'bpm', source: 'Apple Health Sync', conf: '0.98' },
                { event: 'MEDICATION', value: 'Metformin 500mg Daily', unit: 'oral tablet', source: 'Doctor Prescription PDF', conf: '0.92' },
              ].map((ev, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-surface border border-foreground/10 flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-foreground/5 text-foreground">
                      {ev.event}
                    </span>
                    <span className="font-semibold text-foreground">{ev.value}</span>
                  </div>
                  <div className="flex items-center gap-2 text-foreground-muted text-[11px]">
                    <span>{ev.source}</span>
                    <span className="px-1.5 py-0.5 rounded bg-sage/10 text-sage font-mono font-semibold">
                      c={ev.conf}
                    </span>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {activeStage === 2 && (
            <motion.div
              key="stage2"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-xl space-y-4"
            >
              <div className="p-4 rounded-2xl bg-surface border border-foreground/10 shadow-subtle space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-foreground">HbA1c 90-Day Trajectory vs Baseline</span>
                  <span className="font-mono text-accent font-semibold">+0.6% deviation</span>
                </div>
                <div className="relative h-6 bg-surface-subtle rounded-full overflow-hidden flex items-center px-2">
                  <div className="absolute left-[20%] right-[30%] h-full bg-sage/20 rounded-full border-x border-sage/40" />
                  <div className="absolute left-[65%] w-3 h-3 rounded-full bg-accent ring-4 ring-accent/20" />
                </div>
                <div className="flex justify-between text-[10px] text-foreground-subtle">
                  <span>Personal Low: 5.8%</span>
                  <span className="font-semibold text-sage">Established Baseline: 6.2%</span>
                  <span>Latest: 6.8%</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-accent/5 border border-accent/20 text-xs text-foreground-muted flex items-center justify-between">
                <span className="font-medium">Time Context Recency Decay:</span>
                <span className="font-mono text-foreground font-semibold">
                  W(t) = e^(-λΔt) (λ = ln2 / 30 days)
                </span>
              </div>
            </motion.div>
          )}

          {activeStage === 3 && (
            <motion.div
              key="stage3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-xl space-y-3"
            >
              <div className="p-4 rounded-2xl bg-surface border border-foreground/15 shadow-subtle">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-foreground uppercase tracking-wider">
                    Dynamic Health State Evaluation
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-semibold">
                    PERSISTENT_CHANGE
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-background border border-foreground/5">
                    <div className="text-foreground-subtle text-[11px]">Evidence Sufficiency</div>
                    <div className="font-mono font-bold text-foreground text-sm">0.84 / 1.0</div>
                    <div className="text-[10px] text-sage font-medium">✓ Sufficient (≥0.70)</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-background border border-foreground/5">
                    <div className="text-foreground-subtle text-[11px]">Co-moving Domains</div>
                    <div className="font-mono font-bold text-foreground text-sm">Metabolic + Vitals</div>
                    <div className="text-[10px] text-foreground-muted">2 Coordinated Metrics</div>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-foreground/5 text-xs text-foreground-muted leading-relaxed">
                  <strong className="text-foreground">Non-Causal Rule:</strong> "Metabolic markers and blood pressure show a synchronized elevation over the last 45 days without historical contradiction."
                </div>
              </div>
            </motion.div>
          )}

          {activeStage === 4 && (
            <motion.div
              key="stage4"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-xl p-5 rounded-2xl bg-surface-dark text-surface space-y-4 shadow-elevated border border-surface/10"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center text-accent">
                  <IconActivity className="w-4 h-4 text-accent" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-surface">Damu Personal Health Agent</div>
                  <div className="text-[10px] text-surface/50">Grounded LLM Payload Compiler Active</div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-surface/5 border border-surface/10 text-xs leading-relaxed text-surface/90 font-sans">
                "Your HbA1c lab reading (6.8%) and blood pressure (138/88) have both moved above your established 90-day personal baseline since June. This pattern has persisted across 3 consecutive readings over 45 days with zero source contradiction."
              </div>

              <div className="flex items-center justify-between text-[11px] text-surface/50 border-t border-surface/10 pt-2.5">
                <span>Provenance: 4 Source Events Traced</span>
                <span className="text-accent font-semibold flex items-center gap-1">
                  Medical understanding, not advice <IconCheck className="w-3.5 h-3.5 text-sage" />
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <button
          onClick={() => setActiveStage((prev) => (prev + 1) % stages.length)}
          className="text-xs font-medium text-accent hover:text-accent-hover inline-flex items-center gap-1"
        >
          Advance pipeline step <IconArrowRight className="w-3.5 h-3.5" />
        </button>
        <span className="text-[11px] text-foreground-subtle font-mono">
          Stage {activeStage + 1} of {stages.length}
        </span>
      </div>
    </div>
  );
}
