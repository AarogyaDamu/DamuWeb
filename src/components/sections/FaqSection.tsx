import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IconChevronDown } from '../ui/CustomSvgIcons';

export interface FaqItem {
  q: string;
  a: string;
}

export const FAQ_DATA: FaqItem[] = [
  {
    q: 'What is AarogyaDamu?',
    a: 'AarogyaDamu is a *Personal Health Intelligence platform* that brings your fragmented health records, care interactions, measurements, vitals, prescriptions, and lab reports together into one useful personal health context. It helps you understand and manage your health through AI, securely share relevant health information with healthcare providers, and manage everyday healthcare needs such as booking doctor appointments, ordering medicines, and scheduling lab tests—all from one place.',
  },
  {
    q: 'Does AarogyaDamu provide medical advice or diagnosis?',
    a: 'No. AarogyaDamu strictly provides personal health information organization, baseline calculation, and context tracking ("Medical understanding, not medical advice"). Always consult a qualified physician for clinical decisions.',
  },
  {
    q: 'How does the Personal Baseline Engine work?',
    a: 'Instead of relying solely on generic population reference ranges, the Personal Baseline Engine computes rolling individual averages and expected variance boundaries over your historical readings.',
  },
  {
    q: 'How does AarogyaDamu protect patient data and privacy?',
    a: 'We implement strong transport encryption (TLS), robust access controls, and explicit consent mechanisms. You remain in control of what information is shared and with whom.',
  },
  {
    q: 'How do I share my health context with my doctor?',
    a: 'You can securely share your health context through a *time-bounded, scope-limited sharing link* that your doctor can open in any web browser without installing an app or creating an account. Where supported, you can also share your health records through *ABHA/ABDM\'s consent-based infrastructure* directly with an ABDM-enabled healthcare provider.',
  },
  {
    q: 'What is Damu?',
    a: "Damu is AarogyaDamu's AI health agent. It understands the health information available in your AarogyaDamu account, uses that context to respond to your questions, and can help you take useful actions across your healthcare journey.\n\nDamu is designed to make your health information easier to understand and easier to act on. It works with the information available to it and clearly communicates when something is missing or uncertain.",
  },
];

export function renderFormattedText(text: string) {
  const parts = text.split(/(\*[^*]+\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('*') && part.endsWith('*')) {
      return <em key={i} className="italic text-foreground font-medium">{part.slice(1, -1)}</em>;
    }
    return part;
  });
}

import { trackEvent } from '../../lib/analytics';

export function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    const isOpening = openIdx !== idx;
    setOpenIdx(isOpening ? idx : null);
    if (isOpening && FAQ_DATA[idx]) {
      trackEvent('faq_open', { question_id: idx + 1, question_title: FAQ_DATA[idx].q });
    }
  };

  return (
    <section id="faq" className="py-20 bg-background border-t border-border">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center space-y-3">
          <span className="text-xs font-mono font-bold tracking-widest text-accent uppercase">
            FREQUENTLY ASKED QUESTIONS
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight">
            Clear answers <span className="text-accent italic font-normal">about AarogyaDamu</span>
          </h2>
          <p className="text-sm text-foreground-muted max-w-xl mx-auto leading-relaxed">
            Everything you need to know about our personal health intelligence platform, privacy, doctor sharing, and health context.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {FAQ_DATA.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'bg-surface border-accent/40 shadow-sm'
                    : 'bg-surface/50 border-foreground/10 hover:border-foreground/20'
                }`}
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-2xl"
                  aria-expanded={isOpen}
                >
                  <h3 className="font-serif text-base sm:text-lg font-bold text-foreground pr-2">
                    {faq.q}
                  </h3>
                  <div
                    className={`w-7 h-7 rounded-full border flex items-center justify-center flex-shrink-0 transition-transform duration-200 ${
                      isOpen
                        ? 'bg-accent/10 border-accent/30 text-accent rotate-180'
                        : 'bg-surface-subtle border-border text-foreground-muted'
                    }`}
                  >
                    <IconChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                    >
                      <div className="px-5 sm:px-6 pb-6 text-sm text-foreground-muted leading-relaxed border-t border-border/50 pt-4 space-y-3">
                        {faq.a.split('\n\n').map((paragraph, pIdx) => (
                          <p key={pIdx}>
                            {renderFormattedText(paragraph)}
                          </p>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
