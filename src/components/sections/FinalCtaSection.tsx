import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { trackEvent } from '../../lib/analytics';

interface FinalCtaSectionProps {
  onNavigate?: (path: string) => void;
  onOpenEarlyAccess: () => void;
}

export function FinalCtaSection({ onNavigate, onOpenEarlyAccess }: FinalCtaSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const reduced = useReducedMotion();

  return (
    <section
      id="about"
      className="py-28 sm:py-36 px-4 sm:px-6 lg:px-8"
      aria-labelledby="final-cta-heading"
    >
      <div className="max-w-3xl mx-auto text-center space-y-8" ref={ref}>
        <motion.p
          className="text-2xs font-mono font-semibold tracking-widest-2 text-foreground-subtle uppercase"
          initial={reduced ? false : { opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4 }}
        >
          Building together
        </motion.p>

        <motion.h2
          id="final-cta-heading"
          className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight tracking-tight"
          initial={reduced ? false : { opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Your healthcare life{' '}
          <span className="italic font-normal text-foreground-muted">deserves context that is securely shareable digitally anywhere.</span>
        </motion.h2>

        <motion.p
          className="text-base sm:text-lg text-foreground-muted leading-relaxed max-w-xl mx-auto"
          initial={reduced ? false : { opacity: 0, y: 8 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          AarogyaDamu is building a more connected way to understand and navigate personal health.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2"
          initial={reduced ? false : { opacity: 0, y: 8 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <button
            id="final-cta-primary"
            onClick={() => {
              trackEvent('primary_cta_click', { cta_name: 'get_in_touch', location: 'final_cta' });
              onOpenEarlyAccess();
            }}
            className="px-6 py-3.5 rounded-xl bg-foreground text-white text-sm font-semibold hover:bg-surface-dark-hover transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            aria-label="Get in Touch"
          >
            Get in Touch
          </button>
          <button
            id="final-cta-damu"
            onClick={() => {
              trackEvent('secondary_cta_click', { cta_name: 'meet_damu', location: 'final_cta' });
              const el = document.getElementById('damu');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-6 py-3.5 rounded-xl border border-border-medium text-foreground text-sm font-semibold hover:bg-surface transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            aria-label="Learn about Damu"
          >
            Meet Damu
          </button>
        </motion.div>

        {/* Contact */}
        <motion.div
          className="pt-6 text-xs text-foreground-subtle"
          initial={reduced ? false : { opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.5 }}
        >
          <a
            href="mailto:aarogyadamu@gmail.com"
            onClick={() => trackEvent('outbound_link_click', { link_text: 'email', destination: 'mailto:aarogyadamu@gmail.com', source: 'final_cta' })}
            className="hover:text-foreground-muted transition-colors"
          >
            aarogyadamu@gmail.com
          </a>
        </motion.div>
      </div>
    </section>
  );
}
