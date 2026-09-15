import React from 'react';
import { IconCheck } from '../ui/CustomSvgIcons';

export function DataSourcesFlow() {
  const sources = [
    { title: 'Lab Reports (OCR)', desc: 'Thyrocare, Dr. Lal, Metropolis PDF parsing', status: 'Available', color: 'bg-emerald-100 text-emerald-800' },
    { title: 'Prescriptions', desc: 'Handwritten & digital doctor prescriptions', status: 'Available', color: 'bg-emerald-100 text-emerald-800' },
    { title: 'Wearables & Sensors', desc: 'Apple Health, Fitbit, RHR & sleep sync', status: 'Available', color: 'bg-emerald-100 text-emerald-800' },
    { title: 'Eka Care Integration', desc: 'Patient DTOs, vitals, labs & appointment sync', status: 'Available', color: 'bg-emerald-100 text-emerald-800' },
    { title: 'ABDM / ABHA Ecosystem', desc: 'National Health Authority ABDM gateway', status: 'In development', color: 'bg-amber-100 text-amber-800' },
    { title: 'Direct EHR Hospital APIs', desc: 'Hospital EHR automatic sync connectors', status: 'Coming soon', color: 'bg-slate-100 text-slate-700' },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto my-12 p-6 sm:p-10 rounded-3xl bg-surface border border-foreground/10 shadow-elevated">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-foreground/10">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-sage">
            Data Sovereignty and Ingestion
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-foreground mt-0.5">
            Your Health Data Belongs to You
          </h3>
        </div>
        <div className="text-xs text-foreground-muted max-w-xs">
          AarogyaDamu connects fragmented sources into one patient-owned health model.
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sources.map((src, i) => (
          <div
            key={i}
            className="p-5 rounded-2xl bg-background border border-foreground/10 shadow-subtle hover:border-foreground/20 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${src.color}`}>
                  {src.status}
                </span>
                <IconCheck className="w-4 h-4 text-foreground-subtle" />
              </div>
              <h4 className="font-bold text-foreground text-sm mb-1">{src.title}</h4>
              <p className="text-xs text-foreground-muted leading-relaxed">{src.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
