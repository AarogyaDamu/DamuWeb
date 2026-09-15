import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { DamuState } from '../../types';
import { IconActivity, IconClock, IconCheck, IconAlertCircle } from './CustomSvgIcons';

interface DamuOrbProps {
  state?: DamuState;
  size?: 'sm' | 'md' | 'lg';
  interactive?: boolean;
  onStateChange?: (state: DamuState) => void;
}

export function DamuOrb({
  state = 'IDLE',
  size = 'md',
  interactive = false,
  onStateChange,
}: DamuOrbProps) {
  const [currentState, setCurrentState] = useState<DamuState>(state);

  useEffect(() => {
    setCurrentState(state);
  }, [state]);

  const handleStateClick = (newState: DamuState) => {
    setCurrentState(newState);
    if (onStateChange) onStateChange(newState);
  };

  const dimensions = {
    sm: { container: 'w-24 h-24', orb: 'w-16 h-16' },
    md: { container: 'w-48 h-48', orb: 'w-32 h-32' },
    lg: { container: 'w-64 h-64', orb: 'w-44 h-44' },
  }[size];

  // Visual parameters per state
  const stateConfig: Record<
    DamuState,
    { label: string; bg: string; pulseSpeed: number; scale: number[]; icon: React.ElementType; description: string }
  > = {
    READY: {
      label: 'Ready',
      bg: 'from-amber-100/80 via-accent/40 to-sage/30',
      pulseSpeed: 3,
      scale: [1, 1.04, 1],
      icon: IconActivity,
      description: 'Listening context ready',
    },
    IDLE: {
      label: 'Idle',
      bg: 'from-accent/20 via-surface-subtle to-slate-200/50',
      pulseSpeed: 4,
      scale: [1, 1.02, 1],
      icon: IconActivity,
      description: 'Awaiting your health query',
    },
    LISTENING: {
      label: 'Listening...',
      bg: 'from-accent/60 via-amber-500/40 to-accent/30',
      pulseSpeed: 1.2,
      scale: [1, 1.12, 0.98, 1],
      icon: IconActivity,
      description: 'Capturing spoken context',
    },
    TRANSCRIBING: {
      label: 'Transcribing',
      bg: 'from-accent/50 via-slate-400/40 to-sage/30',
      pulseSpeed: 1.8,
      scale: [0.98, 1.06, 0.98],
      icon: IconClock,
      description: 'Converting voice to health domain structure',
    },
    THINKING: {
      label: 'Thinking',
      bg: 'from-sage/60 via-emerald-600/40 to-accent/40',
      pulseSpeed: 1.5,
      scale: [1, 1.08, 1],
      icon: IconActivity,
      description: 'Evaluating Personal Health Model & Time Context',
    },
    ASKING: {
      label: 'Asking Clarification',
      bg: 'from-amber-400/60 via-accent/50 to-amber-200/40',
      pulseSpeed: 2,
      scale: [1, 1.05, 1],
      icon: IconActivity,
      description: 'Requesting clarification on symptom recency',
    },
    CONFIRMING: {
      label: 'Confirming Action',
      bg: 'from-amber-500/50 via-sage/50 to-slate-300',
      pulseSpeed: 2.2,
      scale: [1, 1.03, 1],
      icon: IconCheck,
      description: 'Awaiting user approval before log entry',
    },
    EXECUTING: {
      label: 'Executing Action',
      bg: 'from-accent/70 via-sage/70 to-emerald-600/50',
      pulseSpeed: 1.1,
      scale: [1, 1.1, 1],
      icon: IconCheck,
      description: 'Updating medication schedule record',
    },
    RESPONDING: {
      label: 'Formulating Response',
      bg: 'from-sage/70 via-accent/50 to-amber-300/40',
      pulseSpeed: 2,
      scale: [1, 1.06, 1],
      icon: IconActivity,
      description: 'Synthesizing evidence-bounded explanation',
    },
    SPEAKING: {
      label: 'Speaking',
      bg: 'from-accent/80 via-amber-400/60 to-sage/40',
      pulseSpeed: 0.9,
      scale: [1, 1.14, 0.96, 1],
      icon: IconActivity,
      description: 'Delivering calm natural voice explanation',
    },
    ERROR: {
      label: 'Need Clarification',
      bg: 'from-rose-500/50 via-amber-500/40 to-slate-400/30',
      pulseSpeed: 2.5,
      scale: [1, 1.04, 1],
      icon: IconAlertCircle,
      description: 'Insufficient context to execute safely',
    },
  };

  const currentConfig = stateConfig[currentState];
  const IconComponent = currentConfig.icon;

  return (
    <div className="flex flex-col items-center justify-center">
      {/* Orb Visual Container */}
      <div className={`relative flex items-center justify-center ${dimensions.container}`}>
        {/* Layer 1: Ambient Outer Glow Ring */}
        <motion.div
          animate={{
            scale: currentConfig.scale,
            opacity: [0.35, 0.6, 0.35],
          }}
          transition={{
            duration: currentConfig.pulseSpeed,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className={`absolute inset-0 rounded-full bg-gradient-to-tr ${currentConfig.bg} blur-2xl`}
        />

        {/* Layer 2: Middle Organic Contour */}
        <motion.div
          animate={{
            rotate: [0, 180, 360],
            borderRadius: ['50%', '42% 58% 55% 45%', '50%'],
          }}
          transition={{
            duration: currentConfig.pulseSpeed * 4,
            repeat: Infinity,
            ease: 'linear',
          }}
          className={`absolute ${dimensions.orb} rounded-full bg-gradient-to-br ${currentConfig.bg} opacity-70 blur-md`}
        />

        {/* Layer 3: Main Core Orb Surface */}
        <motion.div
          animate={{
            scale: currentConfig.scale,
          }}
          transition={{
            duration: currentConfig.pulseSpeed,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className={`relative ${dimensions.orb} rounded-full bg-surface border border-foreground/10 shadow-elevated flex flex-col items-center justify-center p-4 overflow-hidden`}
        >
          {/* Inner organic highlight */}
          <div className={`absolute -top-6 -right-6 w-20 h-20 rounded-full bg-gradient-to-bl ${currentConfig.bg} opacity-40 blur-sm`} />
          
          <IconComponent className="w-8 h-8 text-foreground relative z-10" />

          <span className="mt-1 text-[11px] font-medium tracking-wide uppercase text-foreground-muted relative z-10">
            Damu
          </span>
        </motion.div>
      </div>

      {/* State Label & Description */}
      <div className="mt-4 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface border border-foreground/10 text-xs font-semibold text-foreground shadow-subtle">
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          {currentConfig.label}
        </div>
        <p className="mt-1.5 text-xs text-foreground-muted max-w-xs text-center">
          {currentConfig.description}
        </p>
      </div>

      {/* Interactive State Switcher for Demos */}
      {interactive && (
        <div className="mt-6 w-full max-w-md bg-surface p-3 rounded-2xl border border-foreground/10 shadow-subtle">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-foreground-subtle mb-2 px-1">
            Test Damu Voice State Machine:
          </div>
          <div className="flex flex-wrap gap-1.5 justify-center">
            {(Object.keys(stateConfig) as DamuState[]).map((st) => (
              <button
                key={st}
                onClick={() => handleStateClick(st)}
                className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-all ${
                  currentState === st
                    ? 'bg-foreground text-surface font-semibold shadow-sm'
                    : 'bg-background hover:bg-foreground/5 text-foreground-muted'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
