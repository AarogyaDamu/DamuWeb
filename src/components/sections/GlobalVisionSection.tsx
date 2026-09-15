import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

const VISION_STAGES = [
  { label: 'Local healthcare data', detail: 'Records, interactions, measurements from your everyday healthcare life.' },
  { label: 'Connected personal health context', detail: 'Information organized into a continuously evolving health picture.' },
  { label: 'Interoperable digital health ecosystem', detail: 'Aligned with ABDM and the direction of open, interoperable health infrastructure.' },
  { label: 'Global health connectivity', detail: 'A long-term vision of personal health information that can move with the person, across borders and systems.' },
];

export function GlobalVisionSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const reduced = useReducedMotion();

  return (
    <section
      id="vision"
      className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8"
      aria-labelledby="vision-heading"
    >
      <div className="max-w-5xl mx-auto">
        <div ref={ref} className="mb-14 max-w-2xl">
          <motion.p
            className="text-2xs font-mono font-semibold tracking-widest-2 text-foreground-subtle uppercase mb-4"
            initial={reduced ? false : { opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.4 }}
          >
            Global vision
          </motion.p>
          <motion.h2
            id="vision-heading"
            className="font-serif text-4xl sm:text-5xl font-bold text-foreground leading-tight tracking-tight"
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Built for a more connected global health ecosystem.
          </motion.h2>
          <motion.p
            className="mt-4 text-base sm:text-lg text-foreground-muted leading-relaxed"
            initial={reduced ? false : { opacity: 0, y: 8 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            AarogyaDamu is designed with a long-term vision of connecting personal health information with interoperable digital health ecosystems and emerging global health frameworks.
          </motion.p>
        </div>

        {/* Vision stages — vertical progression */}
        <div className="relative">
          {/* Vertical line */}
          <div
            className="absolute left-4 sm:left-5 top-0 bottom-0 w-px bg-border"
            aria-hidden="true"
          />

          <div className="space-y-0">
            {VISION_STAGES.map((stage, i) => (
              <motion.div
                key={i}
                className="relative flex gap-6 sm:gap-8 pb-10 last:pb-0"
                initial={reduced ? false : { opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
              >
                {/* Dot */}
                <div className="relative flex-shrink-0 w-8 sm:w-10 flex justify-center pt-1">
                  <div
                    className={`w-2.5 h-2.5 rounded-full border-2 z-10 ${
                      i === VISION_STAGES.length - 1
                        ? 'border-accent bg-accent'
                        : 'border-foreground-subtle bg-background'
                    }`}
                  />
                </div>

                {/* Content */}
                <div className="flex-1 pb-2">
                  <h3 className="text-sm font-semibold text-foreground mb-1">{stage.label}</h3>
                  <p className="text-sm text-foreground-muted leading-relaxed">{stage.detail}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* WHO / GDHN mention — carefully worded */}
        <motion.div
          className="mt-14 pt-10 border-t border-border"
          initial={reduced ? false : { opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <div className="text-2xs font-mono font-semibold tracking-widest-2 text-foreground-subtle uppercase">
                Interoperability direction
              </div>
              <p className="text-sm text-foreground-muted leading-relaxed">
                AarogyaDamu is aligned with the direction of interoperable digital health - including the frameworks being established through initiatives like WHO's Global Digital Health Network (GDHN) and India's ABDM. This is a vision we are building toward, not a certification or endorsement.
              </p>
            </div>
            <div className="space-y-2">
              <div className="text-2xs font-mono font-semibold tracking-widest-2 text-foreground-subtle uppercase">
                Long-term direction
              </div>
              <p className="text-sm text-foreground-muted leading-relaxed">
                Personal health information should be able to move with a person - across healthcare interactions, systems, and eventually, across borders. That is the future we are working toward.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
