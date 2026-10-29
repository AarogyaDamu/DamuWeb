import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView, useReducedMotion, AnimatePresence } from 'framer-motion';

import { Damu3DCharacter } from '../ui/Damu3DCharacter';
import type { DamuMode } from '../../lib/damuSceneV2';

const DAMU_ROLES = ['Understand', 'Navigate', 'Remember', 'Assist'] as const;

const ROLE_MODES: Record<(typeof DAMU_ROLES)[number], DamuMode> = {
  Understand: 'idle',
  Navigate: 'thinking',
  Remember: 'listening',
  Assist: 'speaking',
};

function DamuMascotColumn({ reduced }: { reduced: boolean }) {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const interval = setInterval(() => setRoleIndex((r) => (r + 1) % DAMU_ROLES.length), 3200);
    return () => clearInterval(interval);
  }, [reduced]);

  const currentRole = DAMU_ROLES[roleIndex];
  const currentMode = ROLE_MODES[currentRole];

  return (
    <div className="relative flex flex-col items-center gap-0 select-none w-full max-w-md mx-auto">
      {/* Vault badge */}
      <motion.div
        className="px-5 py-2.5 rounded-xl border border-[#29231F]/08 bg-white/80 backdrop-blur-sm shadow-subtle flex items-center gap-2"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse-dot flex-shrink-0" />
        <span className="text-xs font-semibold text-[#65564C] uppercase tracking-widest">
          Your Health Vault
        </span>
      </motion.div>

      {/* Connecting line */}
      <div className="w-px h-6 bg-gradient-to-b from-[#29231F]/15 to-[#29231F]/04" />

      {/* Ambient background peach glow for 3D character */}
      <div className="relative w-full flex items-center justify-center">
        <div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(243, 225, 211, 0.95) 0%, rgba(243, 225, 211, 0.45) 42%, rgba(201, 84, 16, 0.05) 62%, transparent 75%)',
            transform: 'scale(1.25)',
          }}
          aria-hidden="true"
        />

        {/* 3D Mascot Character */}
        <Damu3DCharacter
          mode={currentMode}
          reducedMotion={reduced}
          className="relative z-10 w-full"
        />
      </div>

      {/* Connecting line below character */}
      <div className="w-px h-6 bg-gradient-to-b from-[#29231F]/10 to-transparent" />

      {/* Dynamic Role chip */}
      <div className="relative h-10 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentRole}
            className="absolute flex items-center gap-2 px-4 py-2 rounded-full border border-[#29231F]/08 bg-white/90 backdrop-blur-sm shadow-subtle"
            initial={{ opacity: 0, y: 6, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.95 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
            <span className="text-sm font-semibold text-[#29231F] whitespace-nowrap">
              {currentRole}
            </span>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export function DamuCompanion() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const reduced = useReducedMotion();

  return (
    <section
      id="damu"
      className="py-24 sm:py-32 bg-[#F7F3EC] text-[#29231F] overflow-hidden relative border-y border-[#29231F]/06"
      aria-labelledby="damu-heading"
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(41, 35, 31, 0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(41, 35, 31, 0.035) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
        aria-hidden="true"
      />
      {/* Warm peach accent glow on right side */}
      <div
        className="absolute top-1/2 right-0 -translate-y-1/2 w-[650px] h-[650px] pointer-events-none"
        style={{ background: 'radial-gradient(circle at 60% 50%, rgba(243, 225, 211, 0.75) 0%, rgba(243, 225, 211, 0.25) 50%, transparent 70%)' }}
        aria-hidden="true"
      />

      <div className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left: Copy */}
          <div ref={ref} className="space-y-8 max-w-lg">
            <div>
              <motion.p
                className="text-2xs font-mono font-semibold tracking-widest-2 text-accent uppercase mb-5"
                initial={reduced ? false : { opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.4 }}
              >
                AI companion
              </motion.p>
              <motion.h2
                id="damu-heading"
                className="font-serif text-5xl sm:text-6xl font-bold text-[#29231F] leading-tight tracking-tight"
                initial={reduced ? false : { opacity: 0, y: 12 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Meet Damu.
              </motion.h2>
              <motion.p
                className="mt-3 text-base text-[#65564C] font-normal tracking-wide"
                initial={reduced ? false : { opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                Your personal AI companion inside AarogyaDamu.
              </motion.p>
            </div>

            <motion.p
              className="text-base sm:text-lg text-[#29231F]/90 leading-relaxed font-normal"
              initial={reduced ? false : { opacity: 0, y: 8 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.25 }}
            >
              Damu helps you understand and navigate your healthcare context using the information available in AarogyaDamu.
            </motion.p>

            <motion.p
              className="text-sm text-[#65564C] leading-relaxed"
              initial={reduced ? false : { opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.35 }}
            >
              Connected to your Health Vault - not a generic chatbot. Damu helps make health information easier to understand and act on.
            </motion.p>

            {/* Four roles grid */}
            <motion.div
              className="grid grid-cols-2 gap-2.5"
              initial={reduced ? false : { opacity: 0, y: 8 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.45 }}
            >
              {DAMU_ROLES.map((role, i) => (
                <div
                  key={role}
                  className="px-4 py-4 rounded-2xl border border-[#29231F]/08 bg-white/80 backdrop-blur-xs shadow-xs flex items-center gap-3 group hover:border-accent/30 hover:bg-white hover:shadow-subtle transition-all duration-200"
                >
                  <div className="w-7 h-7 rounded-full border border-[#29231F]/08 bg-[#F7F3EC] flex items-center justify-center flex-shrink-0 group-hover:border-accent/25 group-hover:bg-accent/10 transition-colors">
                    <span className="text-2xs font-mono font-bold text-[#65564C] group-hover:text-accent transition-colors">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <div className="text-sm font-semibold text-[#29231F] group-hover:text-accent transition-colors">
                    {role}
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Disclaimer */}
            <motion.p
              className="text-xs text-[#65564C]/90 leading-relaxed border-l-2 border-[#29231F]/15 pl-4"
              initial={reduced ? false : { opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.55 }}
            >
              Damu helps navigate health information. It does not diagnose, prescribe, or replace clinical judgment.
            </motion.p>
          </div>

          {/* Right: Damu visual */}
          <motion.div
            className="flex items-center justify-center py-8"
            initial={reduced ? false : { opacity: 0, scale: 0.88 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.175, 0.885, 0.32, 1.275] }}
          >
            <DamuMascotColumn reduced={reduced ?? false} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
