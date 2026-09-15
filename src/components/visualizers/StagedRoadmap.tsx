import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { IconLayers, IconActivity, IconCheck, IconArrowRight, IconShield } from '../ui/CustomSvgIcons';

export function StagedRoadmap() {
  const [selectedStage, setSelectedStage] = useState<number>(0);

  const stages = [
    {
      id: 'infrastructure',
      badge: 'CURRENT STAGE',
      badgeColor: 'bg-accent text-white',
      title: 'Infrastructure Layer',
      tagline: 'Establishing the digital foundation across India',
      icon: IconLayers,
      accentColor: 'border-accent text-accent',
      bulletPoints: [
        'ABDM-enabled patient platform',
        'Health Vault & AI-assisted digitization',
        'Consent-based record sharing',
        'Doctor browser access, no install',
        'Privacy-first, DPDP-compliant design'
      ]
    },
    {
      id: 'intelligence',
      badge: 'NEXT STAGE',
      badgeColor: 'bg-cyan-700 text-white',
      title: 'Intelligence Layer',
      tagline: 'Transforming records into actionable health insights',
      icon: IconActivity,
      accentColor: 'border-cyan-600 text-cyan-600',
      bulletPoints: [
        'AI health insights & timeline',
        'Preventive healthcare signals',
        'Risk prediction models',
        'Clinical summaries for rapid review',
        'Personalized wellness recommendations'
      ]
    },
    {
      id: 'precision',
      badge: 'LONG-TERM',
      badgeColor: 'bg-emerald-700 text-white',
      title: 'Precision Layer',
      tagline: 'Personalized medicine and digital health twin',
      icon: IconShield,
      accentColor: 'border-emerald-600 text-emerald-600',
      bulletPoints: [
        'Patient Digital Health Twin',
        'Precision medicine decision support',
        'Personalized treatment pathways',
        'Full healthcare intelligence ecosystem'
      ]
    }
  ];

  return (
    <div className="w-full max-w-5xl mx-auto my-12 space-y-8">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-xs font-semibold text-accent uppercase tracking-wider">
          Vision & Roadmap
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight">
          A staged path from infrastructure <span className="text-accent italic font-normal">to precision medicine</span>
        </h2>
      </div>

      {/* Interactive 3-Stage Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stages.map((stage, idx) => {
          const Icon = stage.icon;
          const isSelected = selectedStage === idx;
          const isCurrent = idx === 0;

          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15 }}
              onClick={() => setSelectedStage(idx)}
              className={`p-6 sm:p-8 rounded-3xl cursor-pointer transition-all duration-300 flex flex-col justify-between space-y-6 relative overflow-hidden ${
                isCurrent
                  ? 'bg-surface-dark text-white border-2 border-accent shadow-sm scale-102'
                  : isSelected
                  ? 'bg-surface text-foreground border-2 border-foreground/30 shadow-sm'
                  : 'bg-surface text-foreground border border-border hover:border-foreground/20'
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${stage.badgeColor}`}>
                    {stage.badge}
                  </span>
                  <IconActivity className={`w-5 h-5 ${isCurrent ? 'text-accent' : 'text-foreground-muted'}`} />
                </div>

                <div>
                  <h3 className={`font-serif text-2xl font-bold ${isCurrent ? 'text-white' : 'text-foreground'}`}>
                    {stage.title}
                  </h3>
                  <p className={`text-xs mt-1 ${isCurrent ? 'text-white/70' : 'text-foreground-muted'}`}>
                    {stage.tagline}
                  </p>
                </div>

                <div className={`pt-4 border-t ${isCurrent ? 'border-white/10' : 'border-border'} space-y-2.5`}>
                  {stage.bulletPoints.map((item, itemIdx) => (
                    <div key={itemIdx} className="flex items-start gap-2.5 text-xs">
                      <IconCheck className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
                        isCurrent ? 'text-accent' : 'text-sage'
                      }`} />
                      <span className={isCurrent ? 'text-white/90' : 'text-foreground/90'}>
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className={`pt-4 flex items-center justify-between text-xs font-semibold ${
                isCurrent ? 'text-accent' : 'text-foreground-muted'
              }`}>
                <span>{isCurrent ? 'Active Execution' : 'Planned Progression'}</span>
                <IconArrowRight className="w-4 h-4" />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
