import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IconFileText, IconActivity, IconCheck, IconLock, IconExternalLink, IconAlertCircle, IconArrowRight } from '../ui/CustomSvgIcons';

export function InteractiveAiDemo() {
  const [selectedReport, setSelectedReport] = useState<'cbc' | 'lipid' | 'prescription'>('cbc');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [isDone, setIsDone] = useState<boolean>(true);
  const [showDoctorShareModal, setShowDoctorShareModal] = useState<boolean>(false);

  const sampleReports = {
    cbc: {
      title: 'Complete Blood Count (CBC)',
      source: 'Ruby Hall Clinic, Pune',
      date: 'Aug 24, 2026',
      parsedValues: [
        { name: 'Hemoglobin (Hb)', value: '14.2 g/dL', status: 'Normal', range: '13.5 - 17.5 g/dL', trend: 'Stable (+0.3 from 2025)' },
        { name: 'White Blood Cells (WBC)', value: '7,400 /µL', status: 'Normal', range: '4,500 - 11,000 /µL', trend: 'Optimal' },
        { name: 'Platelet Count', value: '280,000 /µL', status: 'Normal', range: '150,000 - 450,000 /µL', trend: 'Consistent' }
      ],
      aiExplanation: 'Your blood counts are well within healthy reference ranges. Hemoglobin shows a slight positive trend compared to your 2025 baseline, indicating good oxygen-carrying capacity.',
    },
    lipid: {
      title: 'Lipid Profile & Metabolic Panel',
      source: 'Metropolis Healthcare, Pune',
      date: 'Jul 12, 2026',
      parsedValues: [
        { name: 'Total Cholesterol', value: '185 mg/dL', status: 'Optimal', range: '< 200 mg/dL', trend: 'Improved (-12 mg/dL)' },
        { name: 'HDL (Good Cholesterol)', value: '54 mg/dL', status: 'Good', range: '> 40 mg/dL', trend: 'Rising' },
        { name: 'Triglycerides', value: '140 mg/dL', status: 'Normal', range: '< 150 mg/dL', trend: 'Stable' }
      ],
      aiExplanation: 'Your lipid panel indicates favorable cardiovascular markers. Total cholesterol has improved by 12 mg/dL since your last checkup 6 months ago.',
    },
    prescription: {
      title: 'Handwritten Clinical Prescription',
      source: 'Dr. Sharma Cardiology Clinic',
      date: 'Jun 05, 2026',
      parsedValues: [
        { name: 'Telmisartan 40mg', value: '1 Tab Daily (Morning)', status: 'Active', range: 'Blood Pressure', trend: 'Ongoing Refill' },
        { name: 'Metformin 500mg', value: '1 Tab Twice Daily', status: 'Active', range: 'Glycemic Control', trend: 'Ongoing Refill' }
      ],
      aiExplanation: 'AI digitized handwritten prescription notes: Prescribed daily morning Telmisartan for BP management and twice-daily Metformin after meals.',
    }
  };

  const handleSelect = (key: 'cbc' | 'lipid' | 'prescription') => {
    setSelectedReport(key);
    setIsProcessing(true);
    setIsDone(false);
    setTimeout(() => {
      setIsProcessing(false);
      setIsDone(true);
    }, 600);
  };

  const report = sampleReports[selectedReport];

  return (
    <div className="w-full max-w-5xl mx-auto my-12 space-y-8">
      {/* Title */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-xs font-semibold text-accent uppercase tracking-wider">
          <IconActivity className="w-3.5 h-3.5" />
          Interactive Product Demo
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight">
          Experience AI Digitization <span className="text-accent italic font-normal">& Doctor Zero-Install Sharing</span>
        </h2>
        <p className="text-sm text-foreground-muted max-w-xl mx-auto">
          Select a sample medical record below to test how AarogyaDamu parses reports and generates instant browser access links for doctors.
        </p>
      </div>

      {/* Selector Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        {(Object.keys(sampleReports) as Array<'cbc' | 'lipid' | 'prescription'>).map((key) => (
          <button
            key={key}
            onClick={() => handleSelect(key)}
            className={`px-4 py-2.5 rounded-2xl text-xs font-semibold transition-all border flex items-center gap-2 ${
              selectedReport === key
                ? 'bg-slate-900 text-white border-slate-800 shadow-elevated scale-102'
                : 'bg-surface text-foreground-muted border-foreground/10 hover:border-foreground/20'
            }`}
          >
            <IconFileText className="w-3.5 h-3.5" />
            {sampleReports[key].title}
          </button>
        ))}
      </div>

      {/* Main Sandbox Window */}
      <div className="p-6 sm:p-8 rounded-3xl bg-surface border border-border shadow-sm space-y-6">
        {/* Top Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
              <IconActivity className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-mono text-accent font-bold uppercase tracking-wider">
                AarogyaDamu Intelligence Engine
              </div>
              <h3 className="font-serif text-xl font-bold text-foreground">{report.title}</h3>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-foreground-muted">
            <span className="font-semibold text-foreground">{report.source}</span>
            <span>•</span>
            <span>{report.date}</span>
          </div>
        </div>

        {/* Dynamic Display State */}
        {isProcessing ? (
          <div className="h-64 flex flex-col items-center justify-center space-y-3">
            <IconActivity className="w-8 h-8 text-accent animate-pulse" />
            <div className="text-xs font-mono text-foreground-muted">Parsing medical terms & extracting baseline trends...</div>
          </div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            {/* Plain English AI Summary Box */}
            <div className="p-5 rounded-2xl bg-surface-dark text-white border border-white/10 space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono text-accent font-semibold uppercase tracking-wider">
                <IconActivity className="w-3.5 h-3.5" /> Plain-Language Explanation
              </div>
              <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                {report.aiExplanation}
              </p>
            </div>

            {/* Parsed Values Grid */}
            <div className="space-y-3">
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-foreground-muted">
                Structured Parameters & Historical Trajectory
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {report.parsedValues.map((val: { name: string; value: string; status: string; range: string; trend: string }, idx: number) => (
                  <div key={idx} className="p-4 rounded-2xl bg-background border border-border space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-foreground">{val.name}</span>
                      <span className="px-2 py-0.5 rounded bg-sage/10 text-sage text-[10px] font-bold">
                        {val.status}
                      </span>
                    </div>
                    <div className="text-lg font-extrabold text-foreground font-sans">{val.value}</div>
                    <div className="flex items-center justify-between text-[11px] text-foreground-muted pt-1 border-t border-border">
                      <span>Ref: {val.range}</span>
                      <span className="font-mono text-accent font-semibold">{val.trend}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Doctor Share CTA */}
            <div className="pt-4 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-foreground-muted">
                <IconLock className="w-4 h-4 text-sage" />
                <span>Patient Controlled: End-to-end encrypted, DPDP compliant</span>
              </div>

              <button
                onClick={() => setShowDoctorShareModal(!showDoctorShareModal)}
                className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-accent text-white font-semibold text-xs hover:bg-accent-hover transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                <IconExternalLink className="w-4 h-4" />
                Simulate Doctor Zero-Install Sharing Link
              </button>
            </div>
          </motion.div>
        )}
      </div>

      {/* Simulated Doctor Browser Share Modal */}
      <AnimatePresence>
        {showDoctorShareModal && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="p-6 sm:p-8 rounded-3xl bg-surface-dark text-white shadow-sm border border-white/10 space-y-6"
          >
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <IconExternalLink className="w-5 h-5 text-accent" />
                <span className="font-serif text-lg font-bold">Doctor Instant Web Access Portal (Zero Install)</span>
              </div>
              <button
                onClick={() => setShowDoctorShareModal(false)}
                className="text-xs text-white/50 hover:text-white"
              >
                Close Demo
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="space-y-3">
                <div className="text-xs font-mono text-accent font-bold uppercase tracking-wider">
                  Secure Access Token Generated
                </div>
                <p className="text-xs text-white/80 leading-relaxed">
                  Doctor scans this QR code or opens <code className="text-accent bg-white/10 px-2 py-0.5 rounded font-mono">aarogyadamu.com/dr/access-9482</code> in any standard mobile or desktop browser with <strong>zero software installation required</strong>.
                </p>
                <div className="p-3 rounded-xl bg-white/05 text-xs font-mono text-white/70 flex items-center justify-between">
                  <span>Expiry: 24 Hours • 1-Time Session</span>
                  <span className="text-sage font-bold">Active</span>
                </div>
              </div>

              {/* QR Mockup */}
              <div className="p-6 rounded-2xl bg-white text-foreground flex flex-col items-center justify-center space-y-3 text-center">
                <div className="w-32 h-32 bg-foreground rounded-xl p-2 flex items-center justify-center text-white font-mono text-[10px] border-4 border-accent">
                  <div className="grid grid-cols-4 gap-1 w-full h-full p-2 bg-white text-foreground rounded">
                    <div className="bg-foreground rounded" />
                    <div className="bg-foreground rounded" />
                    <div className="bg-border-medium rounded" />
                    <div className="bg-foreground rounded" />
                    <div className="bg-border-medium rounded" />
                    <div className="bg-foreground rounded" />
                    <div className="bg-foreground rounded" />
                    <div className="bg-border-medium rounded" />
                    <div className="bg-foreground rounded" />
                    <div className="bg-border-medium rounded" />
                    <div className="bg-foreground rounded" />
                    <div className="bg-foreground rounded" />
                  </div>
                </div>
                <div className="text-xs font-bold text-foreground">Scan with any Camera / Browser</div>
                <div className="text-[11px] text-foreground-muted">No App Store download required for doctor</div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
