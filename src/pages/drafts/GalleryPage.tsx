import React, { useState } from 'react';
import { SeoHead } from '../../components/seo/SeoHead';
import { Breadcrumbs } from '../../components/ui/Breadcrumbs';

interface SubPageProps {
  onNavigate: (path: string) => void;
  onOpenGetStarted: () => void;
}

export function GalleryPage({ onNavigate, onOpenGetStarted }: SubPageProps) {
  const [activeTab, setActiveTab] = useState<'before_after' | 'ui_showcase'>('before_after');

  return (
    <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-12">
      <SeoHead
        title="Visual Showcase & Transformation Gallery - AarogyaDamu"
        description="View the visual transformation from fragmented paper medical records to AarogyaDamu's continuous longitudinal health picture."
        canonicalUrl="https://aarogyadamu.com/gallery"
      />

      <Breadcrumbs items={[{ name: 'Gallery' }]} onNavigate={onNavigate} />

      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-accent">Visual Transformation</span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-foreground">
          Visual Product Showcase
        </h1>
        <p className="text-base text-foreground-muted leading-relaxed">
          Explore the before and after transformation: from fragmented paper reports and siloed wearable logs to a unified, patient-owned health model.
        </p>
      </div>

      <div className="flex justify-center">
        <div className="flex gap-1.5 p-1.5 rounded-2xl bg-surface-subtle border border-foreground/10">
          <button
            onClick={() => setActiveTab('before_after')}
            className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all ${
              activeTab === 'before_after'
                ? 'bg-foreground text-surface shadow-subtle'
                : 'text-foreground-muted hover:text-foreground'
            }`}
          >
            Before & After Transformation
          </button>
          <button
            onClick={() => setActiveTab('ui_showcase')}
            className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all ${
              activeTab === 'ui_showcase'
                ? 'bg-foreground text-surface shadow-subtle'
                : 'text-foreground-muted hover:text-foreground'
            }`}
          >
            Product UI Architecture
          </button>
        </div>
      </div>

      {activeTab === 'before_after' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 rounded-3xl bg-surface border border-rose-200 space-y-6 shadow-subtle">
            <div className="flex items-center justify-between border-b border-rose-100 pb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-700 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
                BEFORE: Fragmented Health Data
              </span>
              <span className="text-xs font-mono text-rose-600">Disconnected</span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-4 rounded-2xl bg-background border border-foreground/10 space-y-1">
                <div className="font-bold text-foreground">Scattered PDF Attachments</div>
                <p className="text-foreground-muted">Lab reports trapped in WhatsApp chats, email downloads, and paper folders.</p>
              </div>
              <div className="p-4 rounded-2xl bg-background border border-foreground/10 space-y-1">
                <div className="font-bold text-foreground">Single Lab Point Tunnel Vision</div>
                <p className="text-foreground-muted">Treating an isolated 6.8% HbA1c reading without historical trajectory context.</p>
              </div>
              <div className="p-4 rounded-2xl bg-background border border-foreground/10 space-y-1">
                <div className="font-bold text-foreground">Manual Memory Consultations</div>
                <p className="text-foreground-muted">Relying on patient memory during 10-minute clinic appointments.</p>
              </div>
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-surface-dark text-surface border border-surface/10 space-y-6 shadow-elevated">
            <div className="flex items-center justify-between border-b border-surface/10 pb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-accent bg-accent/20 px-3 py-1 rounded-full border border-accent/40">
                AFTER: AarogyaDamu Health Model
              </span>
              <span className="text-xs font-mono text-sage font-semibold">● 100% Deterministic</span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-4 rounded-2xl bg-surface/5 border border-surface/10 space-y-1">
                <div className="font-bold text-surface">Unified Longitudinal Trajectory</div>
                <p className="text-surface/70">90-day personal baseline ranges with recency decay weighting W(t) = e^(-λΔt).</p>
              </div>
              <div className="p-4 rounded-2xl bg-surface/5 border border-surface/10 space-y-1">
                <div className="font-bold text-surface">Cross-Domain Co-Movement</div>
                <p className="text-surface/70">7-dimension evidence sufficiency gating (metabolic + vitals + sleep alignment).</p>
              </div>
              <div className="p-4 rounded-2xl bg-surface/5 border border-surface/10 space-y-1">
                <div className="font-bold text-surface">Patient-Controlled Share Links</div>
                <p className="text-surface/70">Time-bounded tokens (AGD-7K2P-93XM) for instant specialist doctor review.</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl bg-surface border border-foreground/10 space-y-3 shadow-subtle">
            <div className="text-xs font-bold uppercase text-accent">01. Ingestion Engine</div>
            <h3 className="font-serif text-lg font-bold text-foreground">Lab OCR PDF Extractor</h3>
            <p className="text-xs text-foreground-muted leading-relaxed">Converts unstructured PDF text into canonical units with extraction confidence scores.</p>
          </div>

          <div className="p-6 rounded-3xl bg-surface border border-foreground/10 space-y-3 shadow-subtle">
            <div className="text-xs font-bold uppercase text-sage">02. Baseline Engine</div>
            <h3 className="font-serif text-lg font-bold text-foreground">Personal Trajectory Model</h3>
            <p className="text-xs text-foreground-muted leading-relaxed">Calculates individual 90-day baseline ranges and velocity rather than generic cohort averages.</p>
          </div>

          <div className="p-6 rounded-3xl bg-surface border border-foreground/10 space-y-3 shadow-subtle">
            <div className="text-xs font-bold uppercase text-amber-700">03. Damu Agent</div>
            <h3 className="font-serif text-lg font-bold text-foreground">11-State Voice Machine</h3>
            <p className="text-xs text-foreground-muted leading-relaxed">Grounded AI companion delivering calm explanations with strict non-causal safety guardrails.</p>
          </div>
        </div>
      )}
    </div>
  );
}
