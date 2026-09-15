import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

export function OneSentenceSummary() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const reduced = useReducedMotion();

  return (
    <section
      id="summary"
      className="py-24 sm:py-36 px-4 sm:px-6 lg:px-8 bg-surface-subtle"
      aria-labelledby="summary-heading"
    >
      <div className="max-w-4xl mx-auto text-center">
        <motion.p
          className="text-2xs font-mono font-semibold tracking-widest-2 text-foreground-subtle uppercase mb-8"
          initial={reduced ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          AarogyaDamu, in one sentence
        </motion.p>

        <div ref={ref}>
          <motion.h2
            id="summary-heading"
            className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-foreground leading-[1.2] tracking-tight text-balance"
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          >
            A personal health intelligence platform that{' '}
            <span className="font-bold">connects your healthcare life</span>{' '}
            and turns scattered health information into{' '}
            <span className="italic">continuously useful context.</span>
          </motion.h2>
        </div>
      </div>
    </section>
  );
}
