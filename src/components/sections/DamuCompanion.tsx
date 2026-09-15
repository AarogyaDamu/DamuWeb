import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView, useReducedMotion, AnimatePresence } from 'framer-motion';

const DAMU_ROLES = ['Understand', 'Navigate', 'Remember', 'Assist'];

function DamuOrb({ reduced }: { reduced: boolean }) {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const interval = setInterval(() => setRoleIndex(r => (r + 1) % DAMU_ROLES.length), 2800);
    return () => clearInterval(interval);
  }, [reduced]);

  return (
    <div className="relative flex flex-col items-center gap-0 select-none w-full max-w-sm mx-auto" aria-hidden="true">

      {/* Vault badge */}
      <motion.div
        className="px-5 py-2.5 rounded-xl border border-white/12 bg-white/06 backdrop-blur-sm flex items-center gap-2"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse-dot flex-shrink-0" />
        <span className="text-xs font-semibold text-white/60 uppercase tracking-widest">
          Your Health Vault
        </span>
      </motion.div>

      {/* Connecting line */}
      <div className="w-px h-10 bg-gradient-to-b from-white/15 to-white/03" />

      {/* Main orb cluster */}
      <div className="relative flex items-center justify-center" style={{ width: 220, height: 220 }}>

        {/* Outermost soft glow */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{ background: 'radial-gradient(ellipse, rgba(200,83,58,0.12) 0%, transparent 65%)' }}
          animate={reduced ? {} : { scale: [1, 1.06, 1], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Slow outer rotating ring */}
        <motion.div
          className="absolute rounded-full border border-white/08"
          style={{ inset: 10 }}
          animate={reduced ? {} : { rotate: 360 }}
          transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-accent shadow-glow-accent" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-1.5 h-1.5 rounded-full bg-white/20" />
        </motion.div>

        {/* Counter-rotating inner ring */}
        <motion.div
          className="absolute rounded-full border border-accent/15"
          style={{ inset: 30 }}
          animate={reduced ? {} : { rotate: -360 }}
          transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
        >
          <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-accent/50" />
        </motion.div>

        {/* Core orb */}
        <motion.div
          className="relative z-10 rounded-full flex flex-col items-center justify-center gap-1.5 overflow-hidden"
          style={{
            width: 120,
            height: 120,
            background: 'linear-gradient(145deg, #1E2026 0%, #0F1012 60%, #181A1E 100%)',
            border: '1px solid rgba(255,255,255,0.10)',
            boxShadow: '0 0 0 1px rgba(200,83,58,0.15), 0 12px 40px rgba(0,0,0,0.6), 0 0 40px rgba(200,83,58,0.10)',
          }}
          animate={reduced ? {} : { scale: [1, 1.015, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          {/* Scanline texture */}
          <div
            className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,255,255,0.15) 3px, rgba(255,255,255,0.15) 4px)',
            }}
          />

          {/* D glyph */}
          <span className="font-serif text-5xl font-bold text-white leading-none z-10" style={{ textShadow: '0 0 30px rgba(200,83,58,0.4)' }}>
            D
          </span>

          {/* Accent dot indicator */}
          <div className="w-1.5 h-1.5 rounded-full bg-accent z-10" style={{ boxShadow: '0 0 8px rgba(200,83,58,0.8)' }} />
        </motion.div>
      </div>

      {/* Connecting line below orb */}
      <div className="w-px h-8 bg-gradient-to-b from-white/08 to-transparent" />

      {/* Role chip */}
      <div className="relative h-10 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={DAMU_ROLES[roleIndex]}
            className="absolute flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/05"
            initial={{ opacity: 0, y: 6, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.95 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <div className="w-1 h-1 rounded-full bg-accent flex-shrink-0" />
            <span className="text-sm font-semibold text-white/70 whitespace-nowrap">
              {DAMU_ROLES[roleIndex]}
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
      className="py-24 sm:py-32 bg-surface-dark text-white overflow-hidden relative"
      aria-labelledby="damu-heading"
    >
      {/* Background grid */}
      <div className="absolute inset-0 bg-grid-dark opacity-40 pointer-events-none" aria-hidden="true" />
      {/* Warm accent glow top-right */}
      <div
        className="absolute top-0 right-0 w-[500px] h-[400px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at top right, rgba(200,83,58,0.07) 0%, transparent 65%)' }}
        aria-hidden="true"
      />

      <div className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left: Copy */}
          <div ref={ref} className="space-y-8 max-w-lg">
            <div>
              <motion.p
                className="text-2xs font-mono font-semibold tracking-widest-2 text-white/40 uppercase mb-5"
                initial={reduced ? false : { opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.4 }}
              >
                AI companion
              </motion.p>
              <motion.h2
                id="damu-heading"
                className="font-serif text-5xl sm:text-6xl font-bold text-white leading-tight tracking-tight"
                initial={reduced ? false : { opacity: 0, y: 12 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Meet Damu.
              </motion.h2>
              <motion.p
                className="mt-3 text-base text-white/45 font-light tracking-wide"
                initial={reduced ? false : { opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                Your personal AI companion inside AarogyaDamu.
              </motion.p>
            </div>

            <motion.p
              className="text-base sm:text-lg text-white/65 leading-relaxed"
              initial={reduced ? false : { opacity: 0, y: 8 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.25 }}
            >
              Damu helps you understand and navigate your healthcare context using the information available in AarogyaDamu.
            </motion.p>

            <motion.p
              className="text-sm text-white/50 leading-relaxed"
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
                  className="px-4 py-4 rounded-2xl border border-white/08 bg-white/03 flex items-center gap-3 group hover:border-white/15 hover:bg-white/05 transition-colors duration-200"
                >
                  <div className="w-7 h-7 rounded-full border border-white/10 bg-white/05 flex items-center justify-center flex-shrink-0">
                    <span className="text-2xs font-mono font-bold text-white/40">{String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <div className="text-sm font-semibold text-white/80 group-hover:text-white transition-colors">{role}</div>
                </div>
              ))}
            </motion.div>

            {/* Disclaimer */}
            <motion.p
              className="text-xs text-white/25 leading-relaxed border-l border-white/08 pl-4"
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
            <DamuOrb reduced={reduced ?? false} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
