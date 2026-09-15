import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

const CAPABILITIES = [
  {
    id: 'ai',
    label: 'AI-driven',
    body: 'AI helps make complex health information easier to understand and more useful - without replacing clinical judgment.',
  },
  {
    id: 'abdm',
    label: 'ABDM enabled',
    body: "Designed for India's evolving digital health ecosystem and the interoperability direction being established through ABDM.",
  },
  {
    id: 'uin',
    label: 'Personal health identity',
    body: 'A unified personal health identity designed for a connected healthcare future - one that can persist across interactions and over time.',
  },
  {
    id: 'companion',
    label: 'Healthcare companion',
    body: 'AarogyaDamu is designed to remain useful across everyday healthcare needs, records, interactions, and decisions.',
  },
  {
    id: 'vault',
    label: 'Health Vault',
    body: 'A personal space where healthcare information can remain connected, organized, and accessible over time.',
  },
  {
    id: 'connected',
    label: 'Connected health data',
    body: 'Healthcare information from multiple sources - doctor interactions, labs, wearables, scans, lifestyle - can become part of one evolving context.',
  },
];

const DATA_TYPES = [
  'Doctor interactions', 'Prescriptions', 'Medicines', 'Lab reports',
  'Health records', 'Symptoms', 'Measurements', 'Wearables',
  'Lifestyle', 'Scanned documents', 'Healthcare transactions', 'Digital health records',
];

function CapabilityRow({ cap, index }: { cap: typeof CAPABILITIES[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const reduced = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      initial={reduced ? false : { opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.07, ease: 'easeOut' }}
      className="group py-6 border-b border-border last:border-0 grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-6 items-start hover:border-border-medium transition-colors duration-200"
    >
      <div className="sm:col-span-4 flex items-center gap-3">
        <span className="text-2xs font-mono text-foreground-subtle select-none">
          {String(index + 1).padStart(2, '0')}
        </span>
        <span className="text-sm font-semibold text-foreground">{cap.label}</span>
      </div>
      <p className="sm:col-span-8 text-sm text-foreground-muted leading-relaxed">
        {cap.body}
      </p>
    </motion.div>
  );
}

export function IntelligenceCapabilities() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const reduced = useReducedMotion();

  return (
    <section
      id="intelligence"
      className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8"
      aria-labelledby="intelligence-heading"
    >
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <div ref={ref} className="mb-16 max-w-2xl">
          <motion.p
            className="text-2xs font-mono font-semibold tracking-widest-2 text-foreground-subtle uppercase mb-4"
            initial={reduced ? false : { opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.4 }}
          >
            The intelligence layer
          </motion.p>
          <motion.h2
            id="intelligence-heading"
            className="font-serif text-4xl sm:text-5xl font-bold text-foreground leading-tight tracking-tight"
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Personal Health Intelligence
          </motion.h2>
          <motion.p
            className="mt-4 text-base sm:text-lg text-foreground-muted leading-relaxed"
            initial={reduced ? false : { opacity: 0, y: 8 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            More than records. More than a chatbot. A connected layer for your healthcare life.
          </motion.p>
        </div>

        {/* Capabilities list */}
        <div className="border-t border-border">
          {CAPABILITIES.map((cap, i) => (
            <CapabilityRow key={cap.id} cap={cap} index={i} />
          ))}
        </div>

        {/* Connected data types — subtle typographic list */}
        <div className="mt-16 pt-12 border-t border-border">
          <p className="text-2xs font-mono font-semibold tracking-widest-2 text-foreground-subtle uppercase mb-6">
            Connected health data includes
          </p>
          <div className="flex flex-wrap gap-2">
            {DATA_TYPES.map((type, i) => (
              <motion.span
                key={type}
                initial={reduced ? false : { opacity: 0, scale: 0.92 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.04 }}
                className="text-xs font-medium text-foreground-muted px-3 py-1.5 rounded-full border border-border bg-surface hover:border-border-medium hover:text-foreground transition-colors duration-150"
              >
                {type}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
