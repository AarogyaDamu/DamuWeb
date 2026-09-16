import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { trackEvent } from '../../lib/analytics';

interface HeroSectionProps {
  onNavigate?: (path: string) => void;
  onOpenEarlyAccess: () => void;
}

const SOURCES = [
  { label: 'Doctor' },
  { label: 'Prescription' },
  { label: 'Medicine' },
  { label: 'Wearable' },
  { label: 'Health Data' },
  { label: 'Scan' },
  { label: 'Hospital' },
  { label: 'Digital Health' },
  { label: 'Lifestyle' },
  { label: 'Transaction' },
  { label: 'Lab' },
  { label: 'Measurements' },
];

function CombinedHubSpokeVisual({ reduced }: { reduced: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, margin: '-60px' });
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (inView && !reduced) {
      const t = setTimeout(() => setActive(true), 200);
      return () => clearTimeout(t);
    } else if (inView) {
      setActive(true);
    }
  }, [inView, reduced]);

  const cx = 280;
  const cy = 280;
  const r = 195;
  const numSources = SOURCES.length;

  const points = SOURCES.map((s, i) => {
    const deg = -90 + i * (360 / numSources);
    const angle = (deg * Math.PI) / 180;
    return {
      ...s,
      x: cx + r * Math.cos(angle),
      y: cy + r * Math.sin(angle),
    };
  });

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-[540px] lg:max-w-[580px] mx-auto aspect-square select-none"
      role="img"
      aria-label="Interactive hub and spoke diagram illustrating 12 health data sources connecting into Your Health"
    >
      <svg viewBox="0 0 560 560" className="w-full h-full overflow-visible" aria-hidden="true">
        {/* Subtle background guide circle */}
        <circle
          cx={cx} cy={cy} r={r}
          fill="none"
          stroke="rgba(15, 16, 18, 0.04)"
          strokeWidth="1"
        />

        {/* 12 Spoke Connection lines */}
        {points.map((p, i) => (
          <motion.line
            key={`line-${i}`}
            x1={p.x} y1={p.y}
            x2={cx} y2={cy}
            stroke="rgba(200, 83, 58, 0.22)"
            strokeWidth="1.2"
            strokeDasharray="4 4"
            initial={{ opacity: 0, pathLength: 0 }}
            animate={{
              opacity: active ? 1 : 0,
              pathLength: active ? 1 : 0,
            }}
            transition={{ duration: 0.6, delay: i * 0.04, ease: 'easeOut' }}
          />
        ))}

        {/* Animated moving data particles along spokes */}
        {active && !reduced && points.map((p, i) => (
          <motion.circle
            key={`particle-${i}`}
            r="2.5"
            fill="#C8533A"
            initial={{ cx: p.x, cy: p.y, opacity: 0 }}
            animate={{
              cx: [p.x, cx],
              cy: [p.y, cy],
              opacity: [0, 0.85, 0],
            }}
            transition={{
              duration: 2.2,
              delay: i * 0.15 + 0.3,
              repeat: Infinity,
              repeatDelay: 2.0,
              ease: 'easeInOut',
            }}
          />
        ))}

        {/* 12 Source Nodes */}
        {points.map((p, i) => (
          <motion.g
            key={`node-${i}`}
            className="cursor-pointer group"
            whileHover={reduced ? {} : { scale: 1.08 }}
            transition={{ duration: 0.2 }}
          >
            {/* Outer subtle shadow/ring */}
            <motion.circle
              cx={p.x} cy={p.y} r="31"
              fill="white"
              stroke="rgba(15, 16, 18, 0.12)"
              strokeWidth="1.2"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: active ? 1 : 0, scale: active ? 1 : 0.5 }}
              transition={{ duration: 0.45, delay: i * 0.05, ease: 'easeOut' }}
              style={{
                filter: 'drop-shadow(0px 4px 10px rgba(0, 0, 0, 0.04))',
              }}
            />

            {/* Top subtle accent dot */}
            <motion.circle
              cx={p.x} cy={p.y - 15} r="1.5"
              fill="rgba(200, 83, 58, 0.6)"
              initial={{ opacity: 0 }}
              animate={{ opacity: active ? 1 : 0 }}
              transition={{ delay: i * 0.05 + 0.2 }}
            />

            {/* Node label */}
            <motion.text
              x={p.x} y={p.y + 1}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="8.5"
              fill="#3A3C45"
              fontFamily="Plus Jakarta Sans, sans-serif"
              fontWeight="600"
              initial={{ opacity: 0 }}
              animate={{ opacity: active ? 1 : 0 }}
              transition={{ delay: i * 0.05 + 0.2 }}
            >
              {p.label}
            </motion.text>
          </motion.g>
        ))}

        {/* Central Core ("YOUR HEALTH") */}
        {/* Soft outer glow ring */}
        <motion.circle
          cx={cx} cy={cy} r="74"
          fill="none"
          stroke="rgba(200, 83, 58, 0.12)"
          strokeWidth="1"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: active ? 1 : 0, scale: active ? 1 : 0.8 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        />

        <motion.circle
          cx={cx} cy={cy} r="64"
          fill="none"
          stroke="rgba(200, 83, 58, 0.22)"
          strokeWidth="1.2"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: active ? 1 : 0, scale: active ? 1 : 0.85 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        />

        {/* Central Dark Sphere */}
        <motion.circle
          cx={cx} cy={cy} r="54"
          fill="#0F1012"
          initial={{ scale: 0.3, opacity: 0 }}
          animate={{ scale: active ? 1 : 0.3, opacity: active ? 1 : 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.175, 0.885, 0.32, 1.275] }}
          style={{
            filter: 'drop-shadow(0px 8px 24px rgba(200, 83, 58, 0.2))',
          }}
        />

        <motion.text
          x={cx} y={cy - 7}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="8.5"
          fill="rgba(255, 255, 255, 0.55)"
          fontFamily="Plus Jakarta Sans, sans-serif"
          letterSpacing="0.16em"
          fontWeight="600"
          initial={{ opacity: 0 }}
          animate={{ opacity: active ? 1 : 0 }}
          transition={{ delay: 0.5 }}
        >
          YOUR
        </motion.text>

        <motion.text
          x={cx} y={cy + 7}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="11"
          fill="#FFFFFF"
          fontFamily="Plus Jakarta Sans, sans-serif"
          letterSpacing="0.14em"
          fontWeight="700"
          initial={{ opacity: 0 }}
          animate={{ opacity: active ? 1 : 0 }}
          transition={{ delay: 0.6 }}
        >
          HEALTH
        </motion.text>
      </svg>
    </div>
  );
}

export function HeroSection({ onNavigate, onOpenEarlyAccess }: HeroSectionProps) {
  const reduced = useReducedMotion() ?? false;

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-between pt-24 sm:pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-grid"
      aria-label="Personal Health Intelligence"
    >
      {/* Subtle warm radial glow background */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 70% 60% at 50% 30%, rgba(200, 83, 58, 0.04) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto w-full my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Left Column: Copy & Actions */}
          <div className="lg:col-span-6 space-y-7 max-w-xl mx-auto lg:mx-0">

            {/* Eyebrow */}
            <motion.div
              initial={reduced ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <span className="inline-block text-2xs font-mono font-semibold tracking-widest-2 text-foreground-subtle uppercase">
                PERSONAL HEALTH INTELLIGENCE
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground leading-[1.05] tracking-tight"
              initial={reduced ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Your healthcare life,{' '}
              <span className="italic font-normal text-foreground-muted">connected.</span>
            </motion.h1>

            {/* Combined Body Paragraph */}
            <motion.p
              className="text-base sm:text-lg text-foreground-muted leading-relaxed font-sans font-normal"
              initial={reduced ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
            >
              Your healthcare information comes from many places - clinics, labs, pharmacies, wearables, care interactions, and everyday life. AarogyaDamu brings those scattered pieces into one continuously useful health context.
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1"
              initial={reduced ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.45 }}
            >
              <button
                id="hero-cta-primary"
                onClick={() => {
                  trackEvent('primary_cta_click', { cta_name: 'get_in_touch', location: 'hero' });
                  onOpenEarlyAccess();
                }}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-foreground text-white text-sm font-semibold hover:bg-surface-dark-hover transition-colors duration-200 shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                aria-label="Get in Touch"
              >
                Get in Touch →
              </button>

              <button
                id="hero-cta-secondary"
                onClick={() => {
                  trackEvent('secondary_cta_click', { cta_name: 'explore_aarogyadamu', location: 'hero' });
                  const el = document.getElementById('intelligence');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-transparent border border-border-medium text-foreground text-sm font-semibold hover:bg-surface transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                aria-label="Explore AarogyaDamu"
              >
                Explore AarogyaDamu
              </button>
            </motion.div>

            {/* Pull-quote supporting element */}
            <motion.blockquote
              className="border-l-2 border-accent/60 pl-4 py-1 text-xs sm:text-sm text-foreground-muted italic leading-relaxed"
              initial={reduced ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.55 }}
            >
              “Your healthcare life creates data everywhere. AarogyaDamu brings that information together so it can become useful context over time.”
            </motion.blockquote>

          </div>

          {/* Right Column: 12-Spoke Diagram Visualizer */}
          <motion.div
            className="lg:col-span-6 flex items-center justify-center pt-4 lg:pt-0"
            initial={reduced ? false : { opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.35 }}
          >
            <CombinedHubSpokeVisual reduced={reduced} />
          </motion.div>

        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="relative pt-8 flex flex-col items-center gap-1 text-foreground-subtle"
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        aria-hidden="true"
      >
        <span className="text-2xs font-mono tracking-wider">scroll</span>
        <svg className="w-4 h-4 animate-bounce" viewBox="0 0 16 16" fill="none">
          <path d="M8 3v10M4 9l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </motion.div>
    </section>
  );
}
