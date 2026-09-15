import React from 'react';
import { SeoHead } from '../../components/seo/SeoHead';
import { Breadcrumbs } from '../../components/ui/Breadcrumbs';
import { IconArrowRight, IconMail, IconCheck } from '../../components/ui/CustomSvgIcons';
import { trackEvent } from '../../lib/analytics';

interface ServiceDetailProps {
  serviceId: 'health-model' | 'care-hub' | 'lab-ocr' | 'doctor-sharing' | 'damu-agent';
  onNavigate: (path: string) => void;
  onOpenGetStarted: () => void;
}

export function ServiceDetailPage({ serviceId, onNavigate, onOpenGetStarted }: ServiceDetailProps) {
  const serviceDetails = {
    'health-model': {
      title: 'Longitudinal Personal Health Model Service',
      badge: 'Core Engine',
      metaDesc: 'AarogyaDamu Longitudinal Health Model service calculates 90-day personal baseline ranges, trajectory velocity, and multi-metric persistence scores.',
      problem: 'Single lab readings and sporadic measurements fail to show whether a health marker is improving, deteriorating, or fluctuating within a normal personal range.',
      solution: 'Organizes heterogeneous inputs into standardized health events, computes rolling averages, and applies recency decay weighting W(t) = e^(-λΔt).',
      howItWorks: [
        'Ingests lab OCR, wearable measurements, and manual vitals into canonical units.',
        'Calculates 90-day rolling baseline ranges (low, high, personal average).',
        'Evaluates trajectory velocity and step-consistency persistence.',
        'Surfaces multi-domain signals without ungrounded LLM hallucinations.',
      ],
      targetUser: 'Individuals managing chronic conditions, preventive health tracking, or preparing for physician visits.',
      faqs: [
        { q: 'How is personal baseline different from standard lab reference ranges?', a: 'Standard reference ranges compare you to a generic population. Your personal baseline compares your latest reading to your own historical 90-day trajectory.' },
        { q: 'Does this service overwrite raw lab records?', a: 'No. Raw source data is preserved immutably. Baseline derivations are computed in a distinct analytical layer.' },
      ],
    },
    'care-hub': {
      title: 'Care Hub & Medication Refill Service',
      badge: 'Action Layer',
      metaDesc: 'Care Hub unifies medication schedule tracking, refill alert thresholds, diagnostic lab bookings, and health picture body silhouette context.',
      problem: 'Patients struggle to coordinate prescription schedules, refill dates, diagnostic follow-ups, and appointment reminders across disconnected apps.',
      solution: 'Care Hub acts as a single action layer unifying active prescriptions, automated refill thresholds, lab appointments, and anatomical body silhouette summaries.',
      howItWorks: [
        'Tracks daily dosage adherence and remaining tablet supply.',
        'Triggers automated refill alerts when pill supply drops below 5 days.',
        'Integrates appointment reminders with doctor consultation share links.',
        'Displays an anatomical body silhouette highlighting active health signals.',
      ],
      targetUser: 'Patients taking regular medications, caregivers coordinating family health tasks, and individuals with recurring diagnostic panels.',
      faqs: [
        { q: 'What happens when pill supply is low?', a: 'Care Hub highlights the medication with a Refill Soon indicator and provides direct reordering options.' },
        { q: 'Can I view past prescriptions?', a: 'Yes. Full prescription history and dosage logs are accessible in the Care Hub timeline.' },
      ],
    },
    'lab-ocr': {
      title: 'Lab Report & Document OCR Parser Service',
      badge: 'Ingestion Engine',
      metaDesc: 'Extracts unstructured medical PDF lab reports and handwritten prescriptions into canonical data structures with source confidence scores.',
      problem: 'Health data remains trapped inside PDF attachments, scanned images, and paper documents that search systems and tracking apps cannot process.',
      solution: 'High-accuracy OCR parser extracts test names, numerical values, units, and reference ranges into structured HealthEvents with provenance metadata.',
      howItWorks: [
        'Accepts PDF uploads, mobile camera scans, and document images.',
        'Extracts candidate text fields, numerical values, and lab units.',
        'Validates extracted values against standard range boundaries.',
        'Assigns source quality and extraction confidence scores (0.0 to 1.0).',
      ],
      targetUser: 'Users with physical lab reports, PDF lab downloads from Thyrocare, Dr. Lal PathLabs, Metropolis, or hospital portals.',
      faqs: [
        { q: 'Which lab PDF formats are supported?', a: 'All major Indian diagnostic provider PDFs and standard medical document scans are supported.' },
        { q: 'What if OCR misreads a handwritten dosage?', a: 'Extracted fields display an extraction confidence score and allow user verification before final log entries.' },
      ],
    },
    'doctor-sharing': {
      title: 'Patient-Controlled Doctor Sharing Service',
      badge: 'Data Sovereignty',
      metaDesc: 'Generate time-bounded, scope-limited secure share token links allowing doctors to review relevant longitudinal health records.',
      problem: 'Patients have to carry thick physical files or email uncurated PDFs to doctors, wasting appointment time and risking privacy leaks.',
      solution: 'Generate a secure time-bounded web-share token (e.g. AGD-7K2P-93XM) granting view-only access to selected information scopes.',
      howItWorks: [
        'Select specific share scopes: Timeline, Labs, Vitals, or Active Medications.',
        'System generates a time-bounded token link (valid for 24 hours).',
        'Doctor views a clean, read-only web view without needing patient password.',
        'Patient can revoke access grants at any time from their privacy dashboard.',
      ],
      targetUser: 'Patients consulting specialist physicians, second opinion reviews, or preparing for outpatient clinic appointments.',
      faqs: [
        { q: 'Does the doctor need to install an app?', a: 'No. Doctors review the shared information directly in any standard browser via a secure web link.' },
        { q: 'Is access permanent?', a: 'No. Share links are time-bounded and automatically expire after the configured duration.' },
      ],
    },
    'damu-agent': {
      title: 'Damu Personal Health Agent Service',
      badge: 'AI Layer',
      metaDesc: '11-state voice and text companion executing grounded LLM prompt payloads with strict non-causal safety guardrails.',
      problem: 'Generic AI chatbots frequently hallucinate medical causality or produce ungrounded health advice from raw uncurated prompts.',
      solution: 'Damu is bounded by your Personal Health Model, delivering calm explanations while enforcing strict non-causal safety guardrails.',
      howItWorks: [
        'Compiles factual LLM payload containing verified observations and trajectory.',
        'Executes 11-state voice machine: Ready, Listening, Transcribing, Thinking, Speaking.',
        'Enforces non-causal rules ("Measurements changed in same window, no causal claim").',
        'Refuses illegal clinical decision-making, providing contextual understanding.',
      ],
      targetUser: 'Users seeking a natural voice/text companion to understand their lab reports, baseline trajectory, and care tasks.',
      faqs: [
        { q: 'Does Damu provide medical diagnosis?', a: 'No. Damu provides personal health information contextualization ("Medical understanding, not medical advice").' },
        { q: 'How does Damu prevent AI hallucinations?', a: 'Damu receives an explicit factual payload compiled directly from deterministic TypeScript domain calculations.' },
      ],
    },
  }[serviceId];

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: serviceDetails.title,
    serviceType: serviceDetails.badge,
    provider: {
      '@type': 'Organization',
      name: 'AarogyaDamu',
      url: 'https://aarogyadamu.com',
      email: 'aarogyadamu@gmail.com',
    },
    description: serviceDetails.metaDesc,
  };

  return (
    <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-12">
      <SeoHead
        title={`${serviceDetails.title} - AarogyaDamu`}
        description={serviceDetails.metaDesc}
        canonicalUrl={`https://aarogyadamu.com/services/${serviceId}`}
        schemaJson={serviceSchema}
      />

      <Breadcrumbs
        items={[
          { name: 'Services', path: '/services' },
          { name: serviceDetails.title },
        ]}
        onNavigate={onNavigate}
      />

      <div className="space-y-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-accent px-3 py-1 rounded-full bg-accent/10 border border-accent/20 inline-block">
          {serviceDetails.badge}
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-foreground">
          {serviceDetails.title}
        </h1>
        <p className="text-base text-foreground-muted leading-relaxed max-w-3xl">
          {serviceDetails.solution}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-3xl bg-surface border border-foreground/10 space-y-2 shadow-subtle">
          <span className="text-xs font-bold uppercase tracking-wider text-rose-700">The Problem Solved</span>
          <h3 className="font-serif text-lg font-bold text-foreground">Current Healthcare Friction</h3>
          <p className="text-xs text-foreground-muted leading-relaxed">{serviceDetails.problem}</p>
        </div>

        <div className="p-6 rounded-3xl bg-surface border border-foreground/10 space-y-2 shadow-subtle">
          <span className="text-xs font-bold uppercase tracking-wider text-sage">The AarogyaDamu Approach</span>
          <h3 className="font-serif text-lg font-bold text-foreground">Engine Solution</h3>
          <p className="text-xs text-foreground-muted leading-relaxed">{serviceDetails.solution}</p>
        </div>
      </div>

      <div className="p-8 rounded-3xl bg-surface border border-foreground/10 space-y-4 shadow-subtle">
        <h3 className="font-serif text-xl font-bold text-foreground">How This Capability Functions</h3>
        <div className="space-y-3 text-xs text-foreground-muted">
          {serviceDetails.howItWorks.map((step, i) => (
            <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-background border border-foreground/5">
              <span className="w-5 h-5 rounded-full bg-accent/10 text-accent font-mono font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                {i + 1}
              </span>
              <span className="leading-relaxed text-foreground">{step}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-serif text-2xl font-bold text-foreground">Service Questions</h3>
        <div className="space-y-3">
          {serviceDetails.faqs.map((faq, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-surface border border-foreground/10 space-y-1">
              <h4 className="font-bold text-sm text-foreground">{faq.q}</h4>
              <p className="text-xs text-foreground-muted leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="p-8 rounded-3xl bg-surface-dark text-surface space-y-4 shadow-elevated text-center">
        <h3 className="font-serif text-2xl font-bold text-surface">Experience {serviceDetails.title}</h3>
        <p className="text-xs text-surface/70 max-w-md mx-auto">Generate your patient UIN to access longitudinal context and evidence-bounded explanations.</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={() => {
              trackEvent('CTA_CLICKED', { source: `service_${serviceId}` });
              onOpenGetStarted();
            }}
            className="w-full sm:w-auto px-6 py-3 bg-surface text-foreground font-semibold text-xs rounded-xl"
          >
            Get started with UIN
          </button>
          <a
            href="mailto:aarogyadamu@gmail.com"
            onClick={() => trackEvent('EMAIL_CTA_CLICKED', { source: `service_${serviceId}` })}
            className="w-full sm:w-auto px-6 py-3 bg-surface/10 hover:bg-surface/20 text-surface font-semibold text-xs rounded-xl inline-flex items-center justify-center gap-1.5"
          >
            <IconMail className="w-3.5 h-3.5 text-accent" /> Email Engineering Team
          </a>
        </div>
      </div>
    </div>
  );
}
