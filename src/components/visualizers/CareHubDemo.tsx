import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { IconCheck } from '../ui/CustomSvgIcons';

export function CareHubDemo() {
  const [activeTab, setActiveTab] = useState<'medicines' | 'labs' | 'appointments' | 'silhouette'>('medicines');

  return (
    <div className="w-full max-w-5xl mx-auto my-12 p-6 sm:p-10 rounded-3xl bg-surface border border-foreground/10 shadow-elevated">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-foreground/10">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-accent">
            Unified Patient Action Layer
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-foreground mt-0.5">
            Care Hub: Action Beyond Medicines
          </h3>
        </div>

        <div className="flex flex-wrap gap-1.5 p-1 rounded-2xl bg-surface-subtle border border-foreground/10">
          {[
            { id: 'medicines', label: 'Medicines & Refills' },
            { id: 'labs', label: 'Labs & Panels' },
            { id: 'appointments', label: 'Appointments' },
            { id: 'silhouette', label: 'Body Picture Context' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-all ${
                activeTab === tab.id
                  ? 'bg-foreground text-surface shadow-subtle'
                  : 'text-foreground-muted hover:text-foreground'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6">
        {activeTab === 'medicines' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-foreground uppercase tracking-wider">
                Active Prescriptions & Automated Refill Tracking
              </span>
              <span className="text-xs text-sage font-medium bg-sage/10 px-2.5 py-0.5 rounded-full">
                Adherence Rate: 94%
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-background border border-foreground/10 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-foreground text-sm">Metformin 500mg</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                    GOOD (18 Days Left)
                  </span>
                </div>
                <div className="text-xs text-foreground-muted">Dosage: 1 Tablet Twice Daily after meals</div>
                <div className="text-[11px] text-foreground-subtle">Prescribed by Dr. Ananya Sharma</div>
              </div>

              <div className="p-4 rounded-2xl bg-background border border-accent/30 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-foreground text-sm">Telmisartan 40mg</span>
                  <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 text-[10px] font-bold animate-pulse">
                    REFILL SOON (4 Days Left)
                  </span>
                </div>
                <div className="text-xs text-foreground-muted">Dosage: 1 Tablet Morning</div>
                <button className="w-full mt-2 py-2 px-3 bg-accent text-surface text-xs font-semibold rounded-xl hover:bg-accent-hover transition-colors flex items-center justify-center gap-1">
                  Reorder Refill via Eka / 1mg Integration
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'labs' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <div className="flex items-center justify-between text-xs text-foreground-muted">
              <span className="font-semibold text-foreground">Recent Diagnostic Panels & Results</span>
              <span>Thyrocare & Dr. Lal PathLabs OCR Sync</span>
            </div>
            <div className="space-y-2">
              {[
                { test: 'Comprehensive Metabolic Panel', date: 'August 14, 2026', status: 'Completed', detail: '14 Markers parsed, HbA1c +0.6% deviation detected' },
                { test: 'Lipid Profile & RHR Alignment', date: 'June 02, 2026', status: 'Completed', detail: 'Total Cholesterol 192 mg/dL (Normal Baseline)' },
              ].map((lab, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-background border border-foreground/10 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-bold text-foreground">{lab.test}</div>
                    <div className="text-foreground-muted text-[11px]">{lab.detail}</div>
                  </div>
                  <div className="text-right">
                    <span className="px-2 py-0.5 rounded bg-sage/10 text-sage font-semibold text-[11px]">
                      {lab.status}
                    </span>
                    <div className="text-[10px] text-foreground-subtle mt-1">{lab.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'appointments' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <div className="p-5 rounded-2xl bg-background border border-foreground/10 flex items-center justify-between">
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-accent">Upcoming Consultation</div>
                <div className="font-serif text-lg font-bold text-foreground mt-1">Dr. Ananya Sharma: Endocrinologist</div>
                <div className="text-xs text-foreground-muted">Apollo Clinic, Indiranagar • Thursday, 4:00 PM</div>
              </div>
              <button className="px-4 py-2 bg-foreground text-surface text-xs font-semibold rounded-xl shadow-subtle">
                Prepare Share Link
              </button>
            </div>
          </motion.div>
        )}

        {activeTab === 'silhouette' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 rounded-2xl bg-surface-dark text-surface space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-serif text-lg font-bold">Health Picture Body Silhouette</h4>
                <p className="text-xs text-surface/60">Cross-domain anatomical summary of active baseline signals</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-accent/20 text-accent text-xs font-semibold border border-accent/30">
                4 Active Signals
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-surface/5 border border-surface/10">
                <div className="text-surface/50 text-[10px]">Cardiovascular</div>
                <div className="font-semibold text-surface">BP: 138/88 mmHg</div>
                <div className="text-[10px] text-accent mt-0.5">+16 mmHg over baseline</div>
              </div>
              <div className="p-3 rounded-xl bg-surface/5 border border-surface/10">
                <div className="text-surface/50 text-[10px]">Metabolic</div>
                <div className="font-semibold text-surface">HbA1c: 6.8%</div>
                <div className="text-[10px] text-amber-400 mt-0.5">Persistent Change</div>
              </div>
              <div className="p-3 rounded-xl bg-surface/5 border border-surface/10">
                <div className="text-surface/50 text-[10px]">Sleep & Rest</div>
                <div className="font-semibold text-surface">Duration: 6.8 hrs</div>
                <div className="text-[10px] text-sage mt-0.5">Stable Baseline</div>
              </div>
              <div className="p-3 rounded-xl bg-surface/5 border border-surface/10">
                <div className="text-surface/50 text-[10px]">Medication</div>
                <div className="font-semibold text-surface">Metformin 500mg</div>
                <div className="text-[10px] text-sage mt-0.5">94% Adherence</div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
