import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { IconShield, IconLock, IconCheck } from '../ui/CustomSvgIcons';

export function DoctorShareDemo() {
  const [selectedScopes, setSelectedScopes] = useState<string[]>(['TIMELINE', 'LABS', 'VITALS']);
  const [isGenerated, setIsGenerated] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const toggleScope = (scope: string) => {
    if (selectedScopes.includes(scope)) {
      setSelectedScopes(selectedScopes.filter((s) => s !== scope));
    } else {
      setSelectedScopes([...selectedScopes, scope]);
    }
  };

  const handleCopyLink = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-4xl mx-auto my-12 p-6 sm:p-8 rounded-3xl bg-surface border border-foreground/10 shadow-elevated">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-foreground/10">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-accent">
            Patient-Controlled Sharing Architecture
          </span>
          <h3 className="font-serif text-2xl font-bold text-foreground mt-0.5">
            Share What Matters. Keep the Rest Private.
          </h3>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-sage font-medium bg-sage/10 px-3 py-1 rounded-full border border-sage/20">
          <IconShield className="w-4 h-4 text-sage" /> RLS Scoped Grants
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4 p-5 rounded-2xl bg-background border border-foreground/10">
          <h4 className="text-xs font-bold uppercase tracking-wider text-foreground-muted">
            01. Select Information Scopes to Share:
          </h4>

          <div className="space-y-2">
            {[
              { id: 'TIMELINE', label: 'Longitudinal Health Timeline', desc: '90-day trajectory and events' },
              { id: 'LABS', label: 'Lab Reports and Panel OCR', desc: 'HbA1c, Metabolic panels' },
              { id: 'VITALS', label: 'Vitals and Wearable Baseline', desc: 'Blood pressure and RHR' },
              { id: 'MEDICATIONS', label: 'Active Prescriptions', desc: 'Metformin and Telmisartan' },
              { id: 'DOCUMENTS', label: 'Raw PDF Documents', desc: 'Uploaded medical files' },
            ].map((scope) => {
              const isChecked = selectedScopes.includes(scope.id);
              return (
                <button
                  key={scope.id}
                  onClick={() => toggleScope(scope.id)}
                  className={`w-full p-3 rounded-xl text-left border transition-all flex items-center justify-between ${
                    isChecked
                      ? 'bg-surface border-accent shadow-subtle'
                      : 'bg-surface-subtle border-foreground/5 opacity-70'
                  }`}
                >
                  <div>
                    <div className="text-xs font-bold text-foreground">{scope.label}</div>
                    <div className="text-[10px] text-foreground-muted">{scope.desc}</div>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-md flex items-center justify-center text-xs font-bold ${
                      isChecked ? 'bg-accent text-surface' : 'bg-foreground/10 text-transparent'
                    }`}
                  >
                    ✓
                  </div>
                </button>
              );
            })}
          </div>

          <button
            onClick={() => setIsGenerated(true)}
            disabled={selectedScopes.length === 0}
            className="w-full py-3 px-4 bg-foreground hover:bg-surface-dark-card text-surface font-semibold text-xs rounded-xl shadow-subtle disabled:opacity-50 transition-colors flex items-center justify-center gap-2"
          >
            <IconLock className="w-4 h-4 text-accent" /> Generate Secure Time-Bounded Token
          </button>
        </div>

        <div className="p-5 rounded-2xl bg-surface-dark text-surface border border-surface/10 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-accent">
                02. Secure Share Token Output
              </span>
              <span className="text-[10px] text-surface/50 font-mono">Expires in 24 Hours</span>
            </div>

            {isGenerated ? (
              <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                <div className="p-3.5 rounded-xl bg-surface/10 border border-surface/20 space-y-2">
                  <div className="text-[10px] text-surface/50 font-mono">Patient Grant Token Hash:</div>
                  <div className="font-mono text-xs font-bold text-accent break-all bg-surface/5 p-2 rounded border border-surface/10">
                    https://aarogyadamu.com/share/AGD-7K2P-93XM#t=9f2a7b1c
                  </div>
                  <button
                    onClick={handleCopyLink}
                    className="w-full py-1.5 px-3 bg-surface/15 hover:bg-surface/25 text-surface text-xs font-medium rounded-lg flex items-center justify-center gap-1.5 transition-colors"
                  >
                    {copied ? <IconCheck className="w-3.5 h-3.5 text-sage" /> : <IconLock className="w-3.5 h-3.5 text-accent" />}
                    {copied ? 'Link Copied to Clipboard' : 'Copy Doctor Web-Share Link'}
                  </button>
                </div>

                <div className="p-3.5 rounded-xl bg-surface/5 border border-surface/10 text-xs text-surface/80 space-y-1.5">
                  <div className="font-semibold text-surface flex items-center gap-1.5">
                    Doctor View Preview
                  </div>
                  <p className="text-[11px] leading-relaxed">
                    Doctor receives read-only access strictly scoped to {selectedScopes.length} selected areas. Zero patient credentials or unselected records are exposed.
                  </p>
                </div>
              </motion.div>
            ) : (
              <div className="text-center py-12 space-y-2 text-surface/50">
                <IconLock className="w-8 h-8 mx-auto text-surface/30" />
                <p className="text-xs">Select information scopes on the left and click generate to create a secure link.</p>
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-surface/10 text-[10px] text-surface/40 flex items-center justify-between">
            <span>DPDP Patient Consent Protocol</span>
            <span>Revocable at any time</span>
          </div>
        </div>
      </div>
    </div>
  );
}
