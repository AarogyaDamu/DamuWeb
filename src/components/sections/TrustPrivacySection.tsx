import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

const TRUST_PILLARS = [
  {
    title: 'Your data. Your control.',
    body: 'AarogyaDamu is built with the principle that your health information belongs to you - not to a platform, not to an insurer, not to a system.',
  },
  {
    title: 'Privacy-first thinking.',
    body: 'Privacy is a design consideration from the beginning, not an afterthought. How data is handled, stored, and shared is built into the foundation.',
  },
  {
    title: 'User-controlled sharing.',
    body: 'You decide what is shared, with whom, and for how long. Sharing is explicit, revocable, and clear.',
  },
  {
    title: 'Responsible AI.',
    body: 'AI assists understanding. It does not make clinical decisions. The person remains in control of how information is interpreted and used.',
  },
];

export function TrustPrivacySection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const reduced = useReducedMotion();

  return (
    <section
      id="trust"
      className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8"
      aria-labelledby="trust-heading"
    >
      <div className="max-w-5xl mx-auto">
        <div ref={ref} className="mb-14 max-w-xl">
          <motion.p
            className="text-2xs font-mono font-semibold tracking-widest-2 text-foreground-subtle uppercase mb-4"
            initial={reduced ? false : { opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.4 }}
          >
            Trust & privacy
          </motion.p>
          <motion.h2
            id="trust-heading"
            className="font-serif text-4xl sm:text-5xl font-bold text-foreground leading-tight tracking-tight"
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Your health.{' '}
            <span className="italic font-normal text-foreground-muted">Your data. Your control.</span>
          </motion.h2>
        </div>

        {/* 2×2 text-led grid — no badges, no checkmarks, just clear statements */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-border rounded-2xl overflow-hidden border border-border">
          {TRUST_PILLARS.map((pillar, i) => (
            <motion.div
              key={i}
              className="bg-surface p-8 sm:p-10 space-y-3 hover:bg-background transition-colors duration-200"
              initial={reduced ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <h3 className="text-base font-semibold text-foreground">{pillar.title}</h3>
              <p className="text-sm text-foreground-muted leading-relaxed">{pillar.body}</p>
            </motion.div>
          ))}
        </div>

        {/* Understated medical boundary note */}
        <motion.p
          className="mt-8 text-xs text-foreground-subtle leading-relaxed max-w-2xl"
          initial={reduced ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          AarogyaDamu is designed to help organize and bring clarity to personal health information over time. It is not a clinical tool, does not provide medical diagnosis, and is not a substitute for qualified healthcare providers.
        </motion.p>
      </div>
    </section>
  );
}
