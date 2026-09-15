import React from 'react';
import { motion } from 'framer-motion';
import { IconUser, IconCheck, IconShield, IconActivity } from '../ui/CustomSvgIcons';

export function TeamSection() {
  const milestones = [
    { title: 'Research complete', desc: 'Market, regulatory and product research validated the entry strategy.', done: true },
    { title: 'MVP development complete', desc: 'Core platform built by technical co-founder.', done: true },
    { title: 'Entering beta', desc: 'First cohort onboarding in Pune.', done: true, current: true },
    { title: 'Public launch', desc: 'Pune rollout, provider partnerships activate.', done: false },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto my-12 space-y-12">
      {/* SECTION 1: MILESTONES & STATUS (SLIDE 13) */}
      <div className="space-y-6">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-xs font-semibold text-accent uppercase tracking-wider">
            Where We Are
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground tracking-tight">
            Pre-launch, and <span className="text-accent italic font-normal">moving with intent</span>
          </h2>
        </div>

        {/* 4 Milestones */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {milestones.map((m, idx) => (
            <div
              key={idx}
              className={`p-5 rounded-3xl border flex flex-col justify-between space-y-3 ${
                m.current
                  ? 'bg-gradient-to-br from-accent to-accent-hover text-white border-accent shadow-elevated'
                  : m.done
                  ? 'bg-slate-900 text-white border-slate-800'
                  : 'bg-surface border-foreground/10 text-foreground'
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-mono font-bold uppercase tracking-wider ${
                    m.current ? 'text-orange-100' : 'text-slate-400'
                  }`}>
                    Phase 0{idx + 1}
                  </span>
                  {m.current && (
                    <span className="px-2 py-0.5 rounded bg-white text-accent text-[10px] font-bold">
                      WE ARE HERE
                    </span>
                  )}
                </div>
                <h3 className="font-serif text-lg font-bold">{m.title}</h3>
                <p className={`text-xs ${m.current ? 'text-orange-50' : 'text-slate-300'}`}>
                  {m.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Transparent Status Declaration */}
        <div className="p-4 rounded-2xl bg-surface-subtle border border-border text-center text-xs text-foreground-muted">
          <strong className="text-foreground font-semibold">Honest status:</strong> Pre-traction, MVP-complete platform entering beta. Every number on market-sizing visualizers is a modeled estimate, not measured historical performance.
        </div>
      </div>

      {/* SECTION 2: FOUNDING TEAM */}
      <div className="space-y-6 pt-6">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-xs font-semibold text-accent uppercase tracking-wider">
            Leadership Team
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight">
            Two builders, equal stake, <span className="text-accent italic font-normal">complementary skills</span>
          </h2>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-foreground-muted">
            <IconShield className="w-3.5 h-3.5 text-accent" /> Pune, Maharashtra, India
          </div>
        </div>

        {/* 2 Co-Founder Profile Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Om Kadam - CEO */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-6 sm:p-8 rounded-3xl bg-surface border border-border shadow-sm space-y-6 flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-surface-dark text-white flex items-center justify-center font-bold font-serif text-xl border border-white/10">
                  OK
                </div>
                <div>
                  <h3 className="font-serif text-2xl font-bold text-foreground">Om Kadam</h3>
                  <div className="text-xs font-semibold text-accent uppercase tracking-wider">Co-Founder & CEO</div>
                </div>
              </div>

              <div className="space-y-2.5 pt-2 border-t border-border text-xs">
                <div className="flex items-start gap-2.5 text-foreground-muted">
                  <IconUser className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                  <span>B.C.S. graduate, Dr. D. Y. Patil (DPU)</span>
                </div>
                <div className="flex items-start gap-2.5 text-foreground-muted">
                  <IconShield className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                  <span>Top-100 finalist, Pan-IIT Bombay hackathon out of thousands of applicants</span>
                </div>
                <div className="flex items-start gap-2.5 text-foreground-muted">
                  <IconActivity className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                  <span>Prior entrepreneurial experience</span>
                </div>
                <div className="flex items-start gap-2.5 font-medium text-foreground pt-1">
                  <IconCheck className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                  <span><strong className="text-accent font-semibold">Owns:</strong> vision, strategy, partnerships, GTM</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Pranav Mirge - CTO */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-6 sm:p-8 rounded-3xl bg-surface border border-border shadow-sm space-y-6 flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-surface-dark text-white flex items-center justify-center font-bold font-serif text-xl border border-white/10">
                  PM
                </div>
                <div>
                  <h3 className="font-serif text-2xl font-bold text-foreground">Pranav Mirge</h3>
                  <div className="text-xs font-semibold text-sage uppercase tracking-wider">Co-Founder & CTO</div>
                </div>
              </div>

              <div className="space-y-2.5 pt-2 border-t border-border text-xs">
                <div className="flex items-start gap-2.5 text-foreground-muted">
                  <IconUser className="w-4 h-4 text-sage flex-shrink-0 mt-0.5" />
                  <span>B.C.S. graduate, Dr. D. Y. Patil (DPU)</span>
                </div>
                <div className="flex items-start gap-2.5 text-foreground-muted">
                  <IconShield className="w-4 h-4 text-sage flex-shrink-0 mt-0.5" />
                  <span>Top-100 finalist, Pan-IIT Bombay hackathon out of thousands of applicants</span>
                </div>
                <div className="flex items-start gap-2.5 text-foreground-muted">
                  <IconActivity className="w-4 h-4 text-sage flex-shrink-0 mt-0.5" />
                  <span>IT industry engineering experience</span>
                </div>
                <div className="flex items-start gap-2.5 font-medium text-foreground pt-1">
                  <IconCheck className="w-4 h-4 text-sage flex-shrink-0 mt-0.5" />
                  <span><strong className="text-sage font-semibold">Owns:</strong> product, engineering, architecture</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Commitment Banner */}
        <div className="p-4 rounded-2xl bg-surface-dark text-white text-center text-xs font-mono font-semibold tracking-wider uppercase border border-white/10">
          Equal full-time commitment. Equal ownership.
        </div>
      </div>
    </div>
  );
}
