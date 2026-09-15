import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { IconUser, IconFileText, IconActivity, IconExternalLink, IconClock, IconShield, IconCheck, IconArrowRight } from '../ui/CustomSvgIcons';

export function FlywheelVisualizer() {
  const [activeStep, setActiveStep] = useState<number>(0);

  const steps = [
    {
      num: 1,
      title: 'Patient downloads AarogyaDamu',
      desc: 'Consumer signs up, creates ABHA account or links existing health IDs.',
      icon: IconUser,
      highlight: 'Consumer Onboarding'
    },
    {
      num: 2,
      title: 'Uploads or imports health records',
      desc: 'Snaps photos of lab reports, PDFs, or syncs hospital records seamlessly.',
      icon: IconFileText,
      highlight: 'Record Aggregation'
    },
    {
      num: 3,
      title: 'AI organizes & explains reports',
      desc: 'Medical values parsed into longitudinal trends & plain language summaries.',
      icon: IconActivity,
      highlight: 'AI Intelligence'
    },
    {
      num: 4,
      title: 'Shares securely with doctor',
      desc: 'Generates time-bounded, OTP-verified QR code or secure web access link.',
      icon: IconExternalLink,
      highlight: 'Consent Access'
    },
    {
      num: 5,
      title: 'Doctor accesses via browser - no install',
      desc: 'Doctor views full patient history instantly on desktop/tablet with zero friction.',
      icon: IconClock,
      highlight: 'Zero-Install Access'
    },
    {
      num: 6,
      title: 'Doctor joins the AarogyaDamu network',
      desc: 'Experiencing seamless history access leads doctor to sign up & request patient records directly.',
      icon: IconCheck,
      highlight: 'Provider Lock-in Moat'
    }
  ];

  return (
    <div className="w-full max-w-5xl mx-auto my-12 space-y-8">
      {/* Section Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sage/10 border border-sage/20 text-xs font-semibold text-sage uppercase tracking-wider">
          <IconShield className="w-3.5 h-3.5" />
          Entry Strategy & Ecosystem Engine
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight">
          Patients are the entry point. <span className="text-accent italic">Doctors are the moat.</span>
        </h2>
        <p className="text-base text-foreground-muted max-w-2xl mx-auto leading-relaxed">
          The old playbook — selling to doctors first — is slow and expensive in India. We flip it: <strong className="text-foreground">Patient → Doctor → Healthcare Ecosystem</strong>.
        </p>
      </div>

      {/* Interactive 6-step Flow */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          const isActive = activeStep === idx;
          const isNetwork = step.num === 6;

          return (
            <button
              key={idx}
              onClick={() => setActiveStep(idx)}
              className={`p-4 rounded-2xl border text-left transition-all relative overflow-hidden flex flex-col justify-between h-44 ${
                isNetwork
                  ? isActive
                    ? 'bg-accent text-white border-accent shadow-elevated scale-105'
                    : 'bg-accent/10 border-accent/30 text-foreground hover:bg-accent/20'
                  : isActive
                  ? 'bg-slate-900 text-white border-slate-800 shadow-elevated scale-105'
                  : 'bg-surface border-foreground/10 text-foreground hover:border-foreground/20'
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                  isNetwork
                    ? isActive ? 'bg-white text-accent' : 'bg-accent text-white'
                    : isActive ? 'bg-accent text-white' : 'bg-foreground/10 text-foreground-muted'
                }`}>
                  {step.num}
                </span>
                <Icon className={`w-5 h-5 ${
                  isActive ? (isNetwork ? 'text-white' : 'text-accent') : 'text-foreground-muted'
                }`} />
              </div>

              <div>
                <div className={`text-[10px] font-mono uppercase tracking-wider mb-1 ${
                  isActive ? (isNetwork ? 'text-white/80' : 'text-accent') : 'text-foreground-muted'
                }`}>
                  {step.highlight}
                </div>
                <div className="text-xs font-bold line-clamp-2 leading-snug">
                  {step.title}
                </div>
              </div>

              {idx < steps.length - 1 && (
                <div className="hidden lg:block absolute right-1 top-1/2 -translate-y-1/2 text-foreground-muted/40">
                  <IconArrowRight className="w-4 h-4" />
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Step Detail Active Card */}
      <motion.div
        key={activeStep}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 sm:p-8 rounded-3xl bg-surface border border-border shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
      >
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent flex-shrink-0">
            {React.createElement(steps[activeStep].icon, { className: 'w-7 h-7' })}
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-accent px-2 py-0.5 rounded bg-accent/10">
                Step 0{steps[activeStep].num} of 06
              </span>
              <span className="text-xs font-semibold text-foreground-muted uppercase tracking-wider">
                {steps[activeStep].highlight}
              </span>
            </div>
            <h3 className="font-serif text-2xl font-bold text-foreground">
              {steps[activeStep].title}
            </h3>
            <p className="text-sm text-foreground-muted leading-relaxed max-w-xl">
              {steps[activeStep].desc}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveStep((prev) => (prev > 0 ? prev - 1 : steps.length - 1))}
            className="px-4 py-2 text-xs font-semibold rounded-xl bg-surface-subtle border border-border text-foreground hover:bg-foreground/5 transition-all"
          >
            Previous
          </button>
          <button
            onClick={() => setActiveStep((prev) => (prev < steps.length - 1 ? prev + 1 : 0))}
            className="px-4 py-2 text-xs font-semibold rounded-xl bg-foreground text-white hover:bg-foreground/90 transition-all inline-flex items-center gap-1"
          >
            Next Step <IconArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </motion.div>

      {/* Subsequent Ecosystem Integration Callout */}
      <div className="p-4 rounded-2xl bg-surface-subtle border border-border text-center text-xs text-foreground-muted">
        <strong className="text-foreground">Next Phase:</strong> Labs and pharmacies integrate next - healthcare infrastructure grows organically around the patient relationship.
      </div>

      {/* Flywheel Formula Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-surface-dark text-white shadow-sm border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        <div className="space-y-1">
          <div className="flex items-center justify-center md:justify-start gap-2 text-xs font-mono text-accent font-semibold uppercase tracking-wider">
            <IconActivity className="w-4 h-4" /> Self-Reinforcing Adoption Loop
          </div>
          <h4 className="font-serif text-xl sm:text-2xl font-bold text-white">
            Product-led growth <span className="text-accent font-normal">on patient side</span> + Provider workflow lock-in <span className="text-sage-light font-normal">on doctor side</span>
          </h4>
        </div>
        <div className="px-5 py-3 rounded-2xl bg-white/10 border border-white/20 text-xs font-medium text-white whitespace-nowrap">
          Not a cold-start sales motion
        </div>
      </div>
    </div>
  );
}
