import React from 'react';
import { motion } from 'framer-motion';
import { IconFileText, IconActivity, IconUser, IconAlertCircle } from '../ui/CustomSvgIcons';

export function ProblemStatsVisualizer() {
  const painPoints = [
    {
      title: 'Scattered history',
      desc: 'Records live across hospitals, clinics, labs and pharmacies - rarely in one place, rarely with the patient.',
      icon: IconFileText,
      color: 'from-amber-500/10 to-orange-500/10 text-orange-600',
      border: 'border-orange-500/20'
    },
    {
      title: 'Repeated tests',
      desc: 'Without a shared record, the same diagnostics get redone — costing patients time and money.',
      icon: IconActivity,
      color: 'bg-accent/10 text-accent',
      border: 'border-accent/20'
    },
    {
      title: 'Broken continuity',
      desc: 'Every new doctor starts from zero. Care decisions get made on an incomplete picture.',
      icon: IconUser,
      color: 'bg-accent/10 text-accent',
      border: 'border-accent/20'
    }
  ];

  return (
    <div className="w-full max-w-5xl mx-auto my-12 space-y-8">
      {/* Title Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-xs font-semibold text-accent uppercase tracking-wider">
          <IconAlertCircle className="w-3.5 h-3.5" />
          The Structural Problem
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight">
          Healthcare in India is fragmented, <span className="text-accent italic font-normal">and patients pay for it</span>
        </h2>
      </div>

      {/* 3 Core Pain Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {painPoints.map((point, index) => {
          const Icon = point.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className={`p-6 rounded-3xl bg-surface border ${point.border} shadow-sm hover:border-foreground/20 transition-all flex flex-col justify-between space-y-4`}
            >
              <div className="space-y-4">
                <div className={`w-12 h-12 rounded-2xl ${point.color} flex items-center justify-center`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl font-bold text-foreground">{point.title}</h3>
                <p className="text-sm text-foreground-muted leading-relaxed">{point.desc}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* 2 Big Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
        {/* Stat Card 1 */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="p-8 rounded-3xl bg-surface-dark text-white shadow-sm border border-white/10 space-y-4 relative overflow-hidden group"
        >
          <div className="flex items-center justify-between text-xs font-mono text-accent font-semibold tracking-wider uppercase">
            <span>ABDM Infrastructure Reality</span>
            <span className="px-2 py-0.5 rounded bg-white/10 border border-white/20">NHA / PIB 2026</span>
          </div>
          <div>
            <div className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white font-sans">
              94 crore<span className="text-accent">+</span>
            </div>
            <p className="mt-3 text-sm text-white/80 leading-relaxed">
              ABHA health accounts created nationally by mid-2026 - the infrastructure exists, but <strong className="text-white font-semibold">most records are still on paper at the point of care.</strong>
            </p>
          </div>
        </motion.div>

        {/* Stat Card 2 */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="p-8 rounded-3xl bg-surface-dark text-white shadow-sm border border-white/10 space-y-4 relative overflow-hidden group"
        >
          <div className="flex items-center justify-between text-xs font-mono text-accent font-semibold tracking-wider uppercase">
            <span>Out-Of-Pocket Cost Burden</span>
            <span className="px-2 py-0.5 rounded bg-white/10 border border-white/20">NSSO 80th Round</span>
          </div>
          <div>
            <div className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white font-sans">
              83%
            </div>
            <p className="mt-3 text-sm text-white/80 leading-relaxed">
              of urban hospitalisation cost in India is paid out-of-pocket (avg. ~₹39,000/episode) - <strong className="text-white font-semibold">fragmentation has a direct financial cost to families.</strong>
            </p>
          </div>
        </motion.div>
      </div>

      <div className="text-center text-xs text-foreground-muted italic pt-2">
        Sources: National Health Authority / PIB (ABDM, 2026); NSSO 80th Round Health Survey via IASPoint (2025-26).
      </div>
    </div>
  );
}
