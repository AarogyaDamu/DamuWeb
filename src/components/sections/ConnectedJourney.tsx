import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

const JOURNEY_EVENTS = [
  { label: 'Doctor visit', sublabel: 'Consultation recorded' },
  { label: 'Prescription', sublabel: 'Medicines prescribed' },
  { label: 'Medicine', sublabel: 'Ongoing treatment' },
  { label: 'Lab test', sublabel: 'Diagnostics ordered' },
  { label: 'Wearable data', sublabel: 'Continuous monitoring' },
  { label: 'Follow-up', sublabel: 'Progress reviewed' },
  { label: 'New report', sublabel: 'Results connected' },
  { label: 'Consultation', sublabel: 'Context carried forward' },
];

export function ConnectedJourney() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const reduced = useReducedMotion();

  return (
    <section
      id="journey"
      className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden"
      aria-labelledby="journey-heading"
    >
      <div className="max-w-7xl mx-auto">
        <div ref={ref} className="mb-12 max-w-2xl">
          <motion.p
            className="text-2xs font-mono font-semibold tracking-widest-2 text-foreground-subtle uppercase mb-4"
            initial={reduced ? false : { opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.4 }}
          >
            Connected healthcare life
          </motion.p>
          <motion.h2
            id="journey-heading"
            className="font-serif text-4xl sm:text-5xl font-bold text-foreground leading-tight tracking-tight"
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            One person.{' '}
            <span className="italic font-normal text-foreground-muted">One connected healthcare life.</span>
          </motion.h2>
          <motion.p
            className="mt-4 text-base text-foreground-muted leading-relaxed"
            initial={reduced ? false : { opacity: 0, y: 8 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            A doctor visit doesn't exist in isolation. A prescription connects to medicines. Medicines connect to future interactions. Lab results become part of later healthcare context.
          </motion.p>
        </div>

        {/* Timeline — horizontal scroll on mobile, full width on desktop */}
        <div className="relative overflow-x-auto pb-4 -mx-4 px-4 sm:mx-0 sm:px-0">
          <div className="flex items-stretch gap-0 min-w-max sm:min-w-0 sm:grid sm:grid-cols-8">
            {/* Horizontal connecting line */}
            <div className="absolute top-[3.25rem] left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent pointer-events-none" aria-hidden="true" />

            {JOURNEY_EVENTS.map((event, i) => (
              <div key={i} className="relative flex flex-col items-center gap-3 px-2 sm:px-0">
                {/* Timeline dot + connecting arrows */}
                <div className="relative flex items-center">
                  <motion.div
                    className={`relative z-10 w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                      i === 0
                        ? 'border-foreground bg-foreground'
                        : i === JOURNEY_EVENTS.length - 1
                        ? 'border-accent bg-accent'
                        : 'border-border-medium bg-surface'
                    }`}
                    initial={reduced ? false : { scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08, duration: 0.3, ease: [0.175, 0.885, 0.32, 1.275] }}
                    aria-hidden="true"
                  >
                    {i === 0 && (
                      <div className="w-1.5 h-1.5 rounded-full bg-white" />
                    )}
                    {i === JOURNEY_EVENTS.length - 1 && (
                      <div className="w-1.5 h-1.5 rounded-full bg-white" />
                    )}
                  </motion.div>

                  {i < JOURNEY_EVENTS.length - 1 && (
                    <motion.div
                      className="absolute left-5 top-1/2 -translate-y-1/2 flex items-center gap-0.5 pl-1"
                      style={{ width: 'calc(var(--journey-gap, 100%) - 20px)' }}
                      initial={reduced ? false : { opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08 + 0.15 }}
                      aria-hidden="true"
                    >
                      <div className="flex-1 h-px bg-border-medium" />
                      <svg className="w-3 h-3 text-foreground-subtle flex-shrink-0" viewBox="0 0 12 12" fill="none">
                        <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </motion.div>
                  )}
                </div>

                {/* Event card */}
                <motion.div
                  className="w-28 sm:w-auto sm:max-w-[120px] flex flex-col gap-1 text-center"
                  initial={reduced ? false : { opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 + 0.1, duration: 0.4 }}
                >
                  <span className="text-xs font-semibold text-foreground leading-snug">{event.label}</span>
                  <span className="text-2xs text-foreground-subtle leading-snug">{event.sublabel}</span>
                </motion.div>
              </div>
            ))}
          </div>
        </div>

        {/* Contextual caption */}
        <motion.div
          className="mt-10 pt-8 border-t border-border"
          initial={reduced ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm text-foreground-muted">
            <div className="space-y-1">
              <div className="text-xs font-semibold text-foreground uppercase tracking-wider text-2xs font-mono">Not isolated events</div>
              <p className="text-sm leading-relaxed">Each healthcare interaction generates information. AarogyaDamu helps keep that information connected across time.</p>
            </div>
            <div className="space-y-1">
              <div className="text-xs font-semibold text-foreground uppercase tracking-wider text-2xs font-mono">Context carried forward</div>
              <p className="text-sm leading-relaxed">What happened in a past consultation can still be relevant to a future one. AarogyaDamu helps preserve that continuity.</p>
            </div>
            <div className="space-y-1">
              <div className="text-xs font-semibold text-foreground uppercase tracking-wider text-2xs font-mono">Continuously evolving</div>
              <p className="text-sm leading-relaxed">Your health context isn't static. It grows with every new piece of information that enters your healthcare life.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
