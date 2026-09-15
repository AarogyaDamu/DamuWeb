import React from 'react';
import { motion } from 'framer-motion';
import { IconTrendingUp, IconActivity, IconShield, IconLock, IconClock } from '../ui/CustomSvgIcons';

export function RevenueModelVisualizer() {
  const phase1Streams = [
    {
      title: '10% Commission',
      desc: 'from healthcare providers (labs, diagnostics) on patient referrals through the platform.',
      icon: IconTrendingUp,
      tag: 'High Intent Labs'
    },
    {
      title: 'Referral Income',
      desc: 'on recurring medicine refills — high-frequency, high-retention revenue.',
      icon: IconClock,
      tag: 'Recurring Refills'
    }
  ];

  const phase2Streams = [
    'Doctor / Clinic SaaS subscriptions',
    'Hospital & enterprise partnerships',
    'Healthcare intelligence APIs',
    'Premium consumer features'
  ];

  return (
    <div className="w-full max-w-5xl mx-auto my-12 space-y-8">
      {/* Title */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-xs font-semibold text-accent uppercase tracking-wider">
          <IconTrendingUp className="w-3.5 h-3.5" />
          Revenue Architecture
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight">
          Monetizing where <span className="text-accent italic font-normal">value already flows</span>
        </h2>
      </div>

      {/* 2-Phase Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Phase 1 Card */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="p-6 sm:p-8 rounded-3xl bg-surface-dark text-white shadow-sm border border-white/10 space-y-6 flex flex-col justify-between"
        >
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-accent text-white text-xs font-mono font-bold tracking-wider">
                PHASE 1 - NOW
              </span>
              <span className="text-xs text-white/70">Self-Sustaining Monetization</span>
            </div>

            <div className="space-y-4">
              {phase1Streams.map((stream, idx) => {
                const Icon = stream.icon;
                return (
                  <div key={idx} className="p-4 rounded-2xl bg-white/05 border border-white/10 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-xl bg-accent/20 flex items-center justify-center text-accent">
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="font-serif text-lg font-bold text-white">{stream.title}</span>
                      </div>
                      <span className="text-[10px] font-mono text-accent bg-accent/10 px-2 py-0.5 rounded">
                        {stream.tag}
                      </span>
                    </div>
                    <p className="text-xs text-white/70 leading-relaxed pl-10">
                      {stream.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white/05 border border-white/10 text-xs text-white/70 italic">
            <strong className="text-white font-semibold">Benchmark:</strong> Indian pharmacy/health marketplace affiliate & referral commissions typically run 10-30%. Our 10% take rate sits conservatively at the low end.
          </div>
        </motion.div>

        {/* Phase 2 Card */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="p-6 sm:p-8 rounded-3xl bg-surface-subtle border border-border space-y-6 flex flex-col justify-between"
        >
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-surface-dark text-white text-xs font-mono font-bold tracking-wider">
                PHASE 2 - FUTURE
              </span>
              <span className="text-xs text-foreground-muted">Scale Expansion</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {phase2Streams.map((stream, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-surface border border-border space-y-1">
                  <IconTrendingUp className="w-4 h-4 text-accent mb-1" />
                  <div className="text-xs font-bold text-foreground">{stream}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-surface border border-border text-xs text-foreground-muted">
            <strong className="text-foreground">Pricing Strategy:</strong> Pricing intentionally deferred until provider and consumer willingness-to-pay is validated in beta.
          </div>
        </motion.div>
      </div>

      {/* Goal Callout */}
      <div className="p-4 rounded-2xl bg-surface border border-border text-center text-xs font-medium text-foreground">
        <span className="text-accent font-bold">Primary Financial Milestone:</span> Become self-sustaining on Phase 1 revenue before pursuing significant fundraising.
      </div>
    </div>
  );
}
