import React from 'react';
import { motion } from 'framer-motion';
import { IconCheck, IconShield, IconActivity, IconArrowRight } from '../ui/CustomSvgIcons';

export function PositioningMatrix() {
  const corePillars = [
    { title: 'Connected Health Records', desc: 'Unified view of health history across clinics, labs, and personal health data.' },
    { title: 'Personal Health Intelligence', desc: 'Longitudinal context built over time to make health data understandable and actionable.' },
    { title: 'Zero-Install Doctor Sharing', desc: 'Secure, time-bounded access link for physicians without app installation requirements.' },
    { title: 'Patient-Controlled Privacy', desc: 'Explicit consent controls adhering to India\'s ABDM & DPDP digital health standards.' },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto my-12 space-y-8">
      {/* Section Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-xs font-semibold text-accent uppercase tracking-wider">
          <IconShield className="w-3.5 h-3.5" />
          Strategic Positioning
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight">
          A dedicated layer for <span className="text-accent italic font-normal">Personal Health Intelligence</span>
        </h2>
      </div>

      {/* Grid of Core Pillars */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {corePillars.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="p-6 rounded-3xl bg-surface border border-border shadow-sm space-y-3"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
                <IconCheck className="w-4 h-4" />
              </div>
              <h3 className="font-serif text-lg font-bold text-foreground">{item.title}</h3>
            </div>
            <p className="text-xs sm:text-sm text-foreground-muted leading-relaxed pl-9">
              {item.desc}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Position Summary Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-surface-dark text-white shadow-sm border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center md:text-left">
          <div className="text-xs font-mono text-accent font-semibold uppercase tracking-wider">
            Clear Positioning
          </div>
          <h4 className="font-serif text-xl sm:text-2xl font-bold text-white">
            Connecting fragmented records into continuously useful health context
          </h4>
        </div>
        <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-xs font-semibold text-white whitespace-nowrap">
          <IconActivity className="w-4 h-4 text-accent" />
          Patient First Architecture
        </div>
      </div>
    </div>
  );
}
