import React from 'react';
import { motion } from 'framer-motion';
import { IconGlobe, IconArrowRight, IconShield, IconClock, IconFileText, IconCheck } from '../ui/CustomSvgIcons';

export function GtmRegulatoryVisualizer() {
  const gtmSteps = [
    {
      stage: 'LAND',
      title: 'Launch in Pune',
      desc: '~90 lakh metro population, both founders home base - fast iteration, dense doctor & pharmacy network for early partnerships.',
      badge: 'Anchor Market',
      color: 'bg-slate-900 text-white border-slate-800'
    },
    {
      stage: 'PROVE',
      title: 'Prove the flywheel',
      desc: 'Prove the patient → doctor → pharmacy flywheel with real usage data, referral conversion, and provider retention.',
      badge: 'Cohort Data Validation',
      color: 'bg-surface border-foreground/10 text-foreground'
    },
    {
      stage: 'EXPAND',
      title: 'Expand by density',
      desc: 'Next city chosen by active-user density (supply-demand fit), not a fixed calendar — Pune stays the fallback anchor market.',
      badge: 'Density Driven',
      color: 'bg-surface border-foreground/10 text-foreground'
    }
  ];

  return (
    <div className="w-full max-w-5xl mx-auto my-12 space-y-12">
      {/* SECTION 1: GO-TO-MARKET */}
      <div className="space-y-6">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-xs font-semibold text-accent uppercase tracking-wider">
            <IconGlobe className="w-3.5 h-3.5" />
            Go-To-Market Strategy
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground tracking-tight">
            Beachhead: Pune. <span className="text-accent italic font-normal">Expansion: wherever supply meets demand.</span>
          </h2>
        </div>

        {/* 3 Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {gtmSteps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15 }}
              className={`p-6 sm:p-8 rounded-3xl border shadow-card flex flex-col justify-between space-y-4 ${step.color}`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-accent">
                    {step.stage}
                  </span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-accent/10 text-accent">
                    {step.badge}
                  </span>
                </div>
                <h3 className="font-serif text-xl font-bold">{step.title}</h3>
                <p className="text-xs text-foreground-muted leading-relaxed">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Long-term aperture note */}
        <div className="p-4 rounded-2xl bg-surface-subtle border border-border text-center text-xs text-foreground-muted">
          <strong className="text-foreground">Long-term aperture:</strong> Pan-India first, with global expansion in view as the ecosystem model matures - sequencing driven by active-user density, not a rigid calendar.
        </div>
      </div>

      {/* SECTION 2: REGULATORY TAILWIND (DPDP) */}
      <div className="p-8 sm:p-10 rounded-3xl bg-surface-dark text-white shadow-sm border border-white/10 space-y-8">
        <div className="space-y-3 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent/20 border border-accent/30 text-xs font-semibold text-accent uppercase tracking-wider">
            <IconShield className="w-3.5 h-3.5" />
            Regulatory Tailwind & Compliance Edge
          </div>
          <h3 className="font-serif text-2xl sm:text-4xl font-bold text-white">
            Built for a compliance wave <span className="text-accent italic font-normal">that's still forming</span>
          </h3>
        </div>

        {/* 2 Metric Pills */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-white/05 border border-white/10 space-y-2">
            <div className="text-3xl font-bold text-white font-sans">94 crore+</div>
            <p className="text-xs text-white/70 leading-relaxed">
              ABHA health accounts created nationally as of mid-2026 - up from 14.7 crore in 2021.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/05 border border-white/10 space-y-2">
            <div className="text-3xl font-bold text-accent font-sans">Only 9.9%</div>
            <p className="text-xs text-white/70 leading-relaxed">
              of Indian healthcare organizations have even started DPDP compliance work - a wide-open lead for compliance-first products.
            </p>
          </div>
        </div>

        {/* DPDP Timeline Window Box */}
        <div className="p-6 rounded-2xl bg-white/05 border border-accent/30 space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-accent uppercase tracking-wider">
            <IconClock className="w-4 h-4" /> The Compliance Window is Open - Right Now
          </div>
          <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
            DPDP Rules were notified <strong className="text-white">November 13, 2025</strong>. 2026 is the industry's "build and test" year under soft enforcement; hard enforcement (penalties up to <strong className="text-white">₹250 crore</strong>) lands around <strong className="text-white">May 2027</strong>. Being DPDP-compliant and privacy-first by design from day one - not retrofitted later - is a genuine, time-limited edge.
          </p>
        </div>
      </div>
    </div>
  );
}
