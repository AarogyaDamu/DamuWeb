import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

const STAGES = [
  {
    step: '01',
    label: 'Healthcare information',
    description: 'Records, reports, prescriptions, interactions - scattered across systems, clinics, apps, and time.',
    visual: 'scattered',
  },
  {
    step: '02',
    label: 'Connected records',
    description: 'Brought together into a single, organized view - no more hunting across portals and drawers.',
    visual: 'connecting',
  },
  {
    step: '03',
    label: 'Longitudinal health context',
    description: 'Information ordered across time, so patterns and continuity become visible.',
    visual: 'contextual',
  },
  {
    step: '04',
    label: 'Personal Health Intelligence',
    description: 'An evolving understanding of your healthcare life - continuously useful, not just a static record.',
    visual: 'intelligence',
  },
];

function StageVisual({ visual, active }: { visual: string; active: boolean }) {
  const reduced = useReducedMotion();

  if (visual === 'scattered') {
    return (
      <svg viewBox="0 0 120 80" className="w-full h-full" aria-hidden="true">
        {[
          [15, 12], [55, 8], [90, 18], [10, 45], [40, 55], [75, 40], [95, 65], [30, 70],
        ].map(([x, y], i) => (
          <motion.rect
            key={i}
            x={x} y={y} width="20" height="12" rx="3"
            fill={i % 3 === 0 ? 'rgba(200,83,58,0.1)' : 'rgba(15,16,18,0.04)'}
            stroke={i % 3 === 0 ? '#C8533A' : 'rgba(15,16,18,0.35)'}
            strokeWidth="1.5"
            initial={{ opacity: 0 }}
            animate={{ opacity: active ? 1 : 0.4 }}
            transition={{ delay: i * 0.05 }}
          />
        ))}
      </svg>
    );
  }

  if (visual === 'connecting') {
    const items = [[10, 30], [50, 10], [90, 30], [10, 60], [50, 70], [90, 60]];
    return (
      <svg viewBox="0 0 120 80" className="w-full h-full" aria-hidden="true">
        {items.map(([x, y], i) => (
          <React.Fragment key={i}>
            <motion.rect
              x={x} y={y} width="20" height="12" rx="3"
              fill="rgba(15,16,18,0.04)"
              stroke="rgba(15,16,18,0.4)"
              strokeWidth="1.5"
              initial={{ opacity: 0 }} animate={{ opacity: active ? 1 : 0.4 }}
              transition={{ delay: i * 0.05 }}
            />
            {i < items.length - 1 && (
              <motion.line
                x1={x + 10} y1={y + 6} x2={items[i + 1][0] + 10} y2={items[i + 1][1] + 6}
                stroke="#C8533A" strokeWidth="1.5" strokeDasharray="3 3"
                initial={{ opacity: 0, pathLength: 0 }}
                animate={{ opacity: active ? 1 : 0.5, pathLength: 1 }}
                transition={{ duration: 0.6, delay: i * 0.06 }}
              />
            )}
          </React.Fragment>
        ))}
      </svg>
    );
  }

  if (visual === 'contextual') {
    return (
      <svg viewBox="0 0 120 80" className="w-full h-full" aria-hidden="true">
        <motion.line x1="10" y1="40" x2="110" y2="40"
          stroke="rgba(15,16,18,0.3)" strokeWidth="1.5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
        />
        {[20, 40, 60, 80, 100].map((x, i) => (
          <motion.circle key={i} cx={x} cy={40} r="6"
            fill={i === 2 ? '#C8533A' : 'rgba(15,16,18,0.2)'}
            stroke={i === 2 ? 'rgba(200,83,58,0.4)' : 'rgba(15,16,18,0.4)'}
            strokeWidth="1.5"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.08 }}
          />
        ))}
      </svg>
    );
  }

  // intelligence
  return (
    <svg viewBox="0 0 120 80" className="w-full h-full" aria-hidden="true">
      <motion.circle cx="60" cy="40" r="28"
        fill="none" stroke="rgba(15,16,18,0.2)" strokeWidth="1.5"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      />
      <motion.circle cx="60" cy="40" r="18"
        fill="rgba(200,83,58,0.12)" stroke="#C8533A" strokeWidth="1.5"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.15 }}
      />
      <motion.circle cx="60" cy="40" r="6"
        fill="#C8533A"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      />
    </svg>
  );
}

export function RecordsToContext() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const reduced = useReducedMotion();
  const [activeStage, setActiveStage] = useState(0);

  useEffect(() => {
    if (!inView || reduced) return;
    const interval = setInterval(() => {
      setActiveStage(prev => (prev < STAGES.length - 1 ? prev + 1 : prev));
    }, 1000);
    return () => clearInterval(interval);
  }, [inView, reduced]);

  return (
    <section
      id="context"
      className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-surface-subtle"
      aria-labelledby="context-heading"
    >
      <div className="max-w-7xl mx-auto">
        <div ref={ref} className="mb-14 text-center sm:text-left">
          <motion.p
            className="text-xs sm:text-sm font-mono font-bold tracking-widest-2 text-accent uppercase mb-3"
            initial={reduced ? false : { opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.4 }}
          >
            From records to context
          </motion.p>
          <motion.h2
            id="context-heading"
            className="font-serif text-3xl sm:text-5xl font-bold text-foreground leading-tight tracking-tight max-w-3xl"
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Healthcare data is everywhere.{' '}
            <span className="italic font-normal text-foreground-muted">Your Health Story is Nowhere.</span>
          </motion.h2>
          <motion.p
            className="mt-4 text-base sm:text-lg text-foreground-muted leading-relaxed max-w-2xl"
            initial={reduced ? false : { opacity: 0, y: 8 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            AarogyaDamu connects the pieces of your healthcare life so information can remain useful beyond the moment it was created.
          </motion.p>
        </div>

        {/* 4-stage transformation cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STAGES.map((stage, i) => {
            const isActive = activeStage >= i;
            const isSelected = activeStage === i;
            return (
              <button
                key={stage.step}
                onClick={() => setActiveStage(i)}
                className={`group p-6 sm:p-7 text-left rounded-2xl border transition-all duration-300 flex flex-col justify-between gap-6 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                  isSelected
                    ? 'bg-background border-accent shadow-lg shadow-accent/5 ring-1 ring-accent/30 scale-[1.02]'
                    : 'bg-surface border-foreground/12 hover:border-foreground/25 hover:bg-background/80 shadow-sm'
                }`}
                aria-label={`Stage ${stage.step}: ${stage.label}`}
              >
                {/* Visual Diagram */}
                <div className="h-24 sm:h-28 w-full flex items-center justify-center p-2 rounded-xl bg-background/50 border border-foreground/5">
                  <StageVisual visual={stage.visual} active={isActive} />
                </div>

                <div className="space-y-2.5">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs sm:text-sm font-mono font-bold tracking-wider ${
                        isSelected ? 'text-accent' : 'text-accent/80'
                      }`}
                    >
                      {stage.step}
                    </span>
                    {i < STAGES.length - 1 && (
                      <span className="text-accent/60 font-bold text-xs sm:text-sm" aria-hidden="true">
                        →
                      </span>
                    )}
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-foreground leading-snug">
                    {stage.label}
                  </h3>
                  <p className="text-xs sm:text-sm text-foreground-muted leading-relaxed">
                    {stage.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
