import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { IconTrendingUp, IconUser, IconActivity, IconShield } from '../ui/CustomSvgIcons';

export function MarketSizingVisualizer() {
  // Calculator state
  const [activeUserCount, setActiveUserCount] = useState<number>(34000);
  const [avgReferralSpend, setAvgReferralSpend] = useState<number>(5000);
  const [takeRate, setTakeRate] = useState<number>(10);

  // Calculated annual revenue: users * avgReferralSpend * (takeRate/100)
  const projectedRevenue = Math.round(activeUserCount * avgReferralSpend * (takeRate / 100));
  const projectedRevenueLakhs = (projectedRevenue / 100000).toFixed(1);

  const trajectoryData = [
    { period: 'First Quarter', users: '1,000', revenue: 5, barHeight: 'h-12' },
    { period: 'Second Quarter', users: '5,000', revenue: 15, barHeight: 'h-24' },
    { period: 'Third Quarter', users: '~10,000', revenue: 50, barHeight: 'h-44' },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto my-12 space-y-10">
      {/* Title */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-xs font-semibold text-accent uppercase tracking-wider">
          <IconTrendingUp className="w-3.5 h-3.5" />
          Market Opportunity (Bottoms-Up)
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight">
          Sizing the opportunity, <span className="text-accent italic font-normal">bottoms-up</span>
        </h2>
        <p className="text-sm text-foreground-muted max-w-2xl mx-auto leading-relaxed">
          Top-down "India digital health market" figures (from ₹8,800 Cr to ₹107,000 Cr by 2033) bundle telemedicine, hospital software and wearables together. So we built it bottoms-up instead.
        </p>
      </div>

      {/* 3 Core Market Sizing Cards: TAM, SAM, SOM */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* TAM */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white shadow-elevated border border-slate-800 space-y-4 flex flex-col justify-between"
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">TAM</span>
              <span className="text-xs text-slate-400">National Scope</span>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-white font-sans">
                ₹9,000 Cr
              </div>
              <div className="text-xs font-semibold text-cyan-400 mt-1">
                annual referable-revenue potential
              </div>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed pt-2 border-t border-slate-800">
              ~18 crore digitally-active urban health-record users (modeled at ~20% of India's 94-crore ABHA base) × ~₹5,000 avg. annual referable spend/user × 10% take rate.
            </p>
          </div>
        </motion.div>

        {/* SAM */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="p-6 sm:p-8 rounded-3xl bg-teal-900 text-white shadow-elevated border border-teal-800 space-y-4 flex flex-col justify-between"
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-teal-300 uppercase tracking-wider">SAM</span>
              <span className="text-xs text-teal-200">Top 8 Metros</span>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-white font-sans">
                ₹2,250 Cr
              </div>
              <div className="text-xs font-semibold text-teal-300 mt-1">
                annual referable-revenue potential
              </div>
            </div>
            <p className="text-xs text-teal-100 leading-relaxed pt-2 border-t border-teal-800/80">
              ~4.5 crore eligible users across Mumbai, Delhi NCR, Bengaluru, Pune, Hyderabad, Chennai, Kolkata & Ahmedabad (~35% ABHA-linked, digitally active).
            </p>
          </div>
        </motion.div>

        {/* SOM */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-accent to-accent-hover text-white shadow-elevated space-y-4 flex flex-col justify-between"
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-accent uppercase tracking-wider">SOM</span>
              <span className="text-xs text-white/80 flex items-center gap-1">
                <IconShield className="w-3 h-3" /> Pune Beachhead (Yr 3)
              </span>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-white font-sans">
                ₹1.7 Cr
              </div>
              <div className="text-xs font-semibold text-white/80 mt-1">
                modeled annual revenue
              </div>
            </div>
            <p className="text-xs text-white/70 leading-relaxed pt-2 border-t border-white/20">
              ~90 lakh Pune Metro population → ~11 lakh addressable (15% relevant penetration) → 3% capture by Year 3 (~34,000 active users).
            </p>
          </div>
        </motion.div>
      </div>

      {/* Slide 8: Modeled Pune Trajectory Visualizer */}
      <div className="p-6 sm:p-8 rounded-3xl bg-surface border border-border shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-border">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-accent">
              Modeled Trajectory
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-foreground">
              What the Pune beachhead looks like (Year 1)
            </h3>
          </div>
          <span className="text-[11px] text-foreground-muted bg-surface-subtle px-3 py-1 rounded-full border border-border">
            Illustrative model recalibrated via beta cohort data
          </span>
        </div>

        {/* Trajectory Bar Chart + Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
          {/* Chart View */}
          <div className="md:col-span-7 space-y-4">
            <div className="text-xs font-semibold text-foreground-muted mb-2">
              Modeled annual revenue (₹ Lakh)
            </div>
            <div className="h-56 bg-background rounded-2xl p-4 border border-border flex items-end justify-around gap-4">
              {trajectoryData.map((item, idx) => (
                <div key={idx} className="flex flex-col items-center gap-2 flex-1">
                  <span className="text-xs font-mono font-bold text-accent">₹{item.revenue}L</span>
                  <div className={`w-full max-w-[60px] ${item.barHeight} bg-gradient-to-t from-surface-dark to-accent rounded-t-xl transition-all duration-500`} />
                  <span className="text-[11px] font-semibold text-foreground-muted text-center">{item.period}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Metric Pill List */}
          <div className="md:col-span-5 space-y-3">
            <div className="p-4 rounded-2xl bg-surface-subtle border border-border flex items-center justify-between">
              <div>
                <div className="text-xl font-bold text-foreground">1,000</div>
                <div className="text-xs text-foreground-muted">active users, First Quarter</div>
              </div>
              <span className="text-xs font-mono text-accent bg-accent/10 px-2 py-0.5 rounded">Q1</span>
            </div>

            <div className="p-4 rounded-2xl bg-surface-subtle border border-border flex items-center justify-between">
              <div>
                <div className="text-xl font-bold text-foreground">5,000</div>
                <div className="text-xs text-foreground-muted">active users, Second Quarter</div>
              </div>
              <span className="text-xs font-mono text-accent bg-accent/10 px-2 py-0.5 rounded">Q2</span>
            </div>

            <div className="p-4 rounded-2xl bg-surface-subtle border border-border flex items-center justify-between">
              <div>
                <div className="text-xl font-bold text-foreground">~10,000</div>
                <div className="text-xs text-foreground-muted">active users, Third Quarter</div>
              </div>
              <span className="text-xs font-mono text-accent bg-accent/10 px-2 py-0.5 rounded">Q3</span>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Bottoms-up Calculator Simulator */}
      <div className="p-6 sm:p-8 rounded-3xl bg-surface-dark text-white shadow-sm border border-white/10 space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-white/10">
          <div className="w-10 h-10 rounded-xl bg-accent/20 border border-accent/30 flex items-center justify-center text-accent">
            <IconActivity className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-serif text-xl font-bold text-white">Interactive Market Revenue Calculator</h4>
            <p className="text-xs text-white/70">Adjust active user numbers and referral parameters to test unit economics</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Slider 1: Active Users */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-white/80 font-medium">Active Users</span>
              <span className="text-accent font-mono font-bold">{activeUserCount.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min="1000"
              max="100000"
              step="1000"
              value={activeUserCount}
              onChange={(e) => setActiveUserCount(Number(e.target.value))}
              className="w-full accent-accent cursor-pointer"
            />
          </div>

          {/* Slider 2: Annual Referable Spend */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-white/80 font-medium">Avg Annual Spend / User</span>
              <span className="text-white font-mono font-bold">₹{avgReferralSpend.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min="1000"
              max="20000"
              step="500"
              value={avgReferralSpend}
              onChange={(e) => setAvgReferralSpend(Number(e.target.value))}
              className="w-full accent-accent cursor-pointer"
            />
          </div>

          {/* Slider 3: Platform Take Rate */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-white/80 font-medium">Platform Take Rate</span>
              <span className="text-sage font-mono font-bold">{takeRate}%</span>
            </div>
            <input
              type="range"
              min="5"
              max="25"
              step="1"
              value={takeRate}
              onChange={(e) => setTakeRate(Number(e.target.value))}
              className="w-full accent-sage cursor-pointer"
            />
          </div>
        </div>

        {/* Calculated Revenue Banner */}
        <div className="p-4 rounded-2xl bg-white/05 border border-white/10 flex items-center justify-between">
          <div className="text-xs text-white/70">
            Calculated Modeled Annual Revenue:
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-accent font-mono">
            ₹{projectedRevenueLakhs} Lakh <span className="text-xs text-white/50 font-normal">(₹{projectedRevenue.toLocaleString()})</span>
          </div>
        </div>
      </div>
    </div>
  );
}
