import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

const EVERYDAY_SOURCES = [
  { label: 'Wearables', note: 'Steps, heart rate, oxygen' },
  { label: 'Sleep', note: 'Duration and patterns' },
  { label: 'Activity', note: 'Movement and exercise' },
  { label: 'Vitals', note: 'Blood pressure, weight' },
  { label: 'Symptoms', note: 'How you feel, day to day' },
  { label: 'Lifestyle', note: 'Diet, habits, context' },
  { label: 'Measurements', note: 'Manual health entries' },
];

export function EverydayHealth() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const reduced = useReducedMotion();

  return (
    <section
      id="everyday"
      className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-surface-subtle"
      aria-labelledby="everyday-heading"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">

          {/* Left: Copy */}
          <div ref={ref} className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
            <motion.p
              className="text-2xs font-mono font-semibold tracking-widest-2 text-foreground-subtle uppercase"
              initial={reduced ? false : { opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.4 }}
            >
              Everyday health
            </motion.p>
            <motion.h2
              id="everyday-heading"
              className="font-serif text-4xl sm:text-5xl font-bold text-foreground leading-tight tracking-tight"
              initial={reduced ? false : { opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Your health doesn't happen only inside hospitals.
            </motion.h2>
            <motion.p
              className="text-base sm:text-lg text-foreground-muted leading-relaxed"
              initial={reduced ? false : { opacity: 0, y: 8 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Some of the most useful health information comes from everyday life.
            </motion.p>
            <motion.p
              className="text-sm text-foreground-muted leading-relaxed"
              initial={reduced ? false : { opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              AarogyaDamu brings medical and everyday health information closer together to create a more complete picture - not a clinical diagnosis, but a richer personal context.
            </motion.p>

            {/* Subtle disclaimer */}
            <motion.p
              className="text-xs text-foreground-subtle leading-relaxed border-l border-border pl-4"
              initial={reduced ? false : { opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              Everyday health information contributes to personal health context. It is not a substitute for clinical assessment.
            </motion.p>
          </div>

          {/* Right: Sources grid */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 gap-px bg-border rounded-2xl overflow-hidden border border-border">
              {EVERYDAY_SOURCES.map((source, i) => (
                <motion.div
                  key={source.label}
                  className="bg-surface px-6 py-5 flex items-center justify-between hover:bg-background transition-colors duration-200"
                  initial={reduced ? false : { opacity: 0, x: 12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                >
                  <div className="space-y-0.5">
                    <div className="text-sm font-semibold text-foreground">{source.label}</div>
                    <div className="text-xs text-foreground-subtle">{source.note}</div>
                  </div>
                  <div className="w-6 h-6 rounded-full border border-border flex items-center justify-center flex-shrink-0" aria-hidden="true">
                    <div className="w-1.5 h-1.5 rounded-full bg-foreground-subtle" />
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="mt-4 flex items-center gap-2 text-xs text-foreground-subtle"
              initial={reduced ? false : { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <div className="w-4 h-px bg-accent/40" aria-hidden="true" />
              <span>All flowing toward one connected Health Vault</span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
