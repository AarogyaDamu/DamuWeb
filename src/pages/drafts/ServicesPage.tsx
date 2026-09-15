import React from 'react';
import { SeoHead } from '../../components/seo/SeoHead';
import { Breadcrumbs } from '../../components/ui/Breadcrumbs';
import { IconArrowRight, IconActivity, IconFileText, IconShield, IconLock } from '../../components/ui/CustomSvgIcons';
import { trackEvent } from '../../lib/analytics';

interface SubPageProps {
  onNavigate: (path: string) => void;
  onOpenGetStarted: () => void;
}

export function ServicesPage({ onNavigate, onOpenGetStarted }: SubPageProps) {
  const servicesList = [
    {
      id: 'health-model',
      title: 'Longitudinal Personal Health Model',
      desc: 'Connects fragmented health measurements, symptoms, and lab records into a 90-day trajectory vector with recency decay weighting.',
      path: '/services/health-model',
      badge: 'Core Engine',
    },
    {
      id: 'care-hub',
      title: 'Care Hub & Refill Management',
      desc: 'Unified patient action hub for active medication schedule tracking, refill alert thresholds, lab bookings, and body picture context.',
      path: '/services/care-hub',
      badge: 'Action Layer',
    },
    {
      id: 'lab-ocr',
      title: 'Lab Report & Document OCR Parser',
      desc: 'Extracts unstructured lab PDFs and prescriptions into canonical units (mg/dL, mmHg, %, bpm) with provenance confidence scores.',
      path: '/services/lab-ocr',
      badge: 'Ingestion Engine',
    },
    {
      id: 'doctor-sharing',
      title: 'Patient-Controlled Doctor Sharing',
      desc: 'Generate time-bounded, scope-limited secure share tokens allowing healthcare providers to review relevant longitudinal data.',
      path: '/services/doctor-sharing',
      badge: 'Data Sovereignty',
    },
    {
      id: 'damu-agent',
      title: 'Damu Personal Health Agent',
      desc: '11-state voice and text companion executing grounded prompt payloads with strict non-causal safety guardrails.',
      path: '/services/damu-agent',
      badge: 'AI Layer',
    },
  ];

  const servicesSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'AarogyaDamu Health Intelligence Services',
    itemListElement: servicesList.map((srv, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: srv.title,
      url: `https://aarogyadamu.com${srv.path}`,
    })),
  };

  return (
    <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      <SeoHead
        title="Health Intelligence Services - AarogyaDamu"
        description="Explore AarogyaDamu's core personal health services: Longitudinal Health Model, Care Hub refills, Lab Report OCR, patient-controlled doctor sharing, and Damu agent."
        canonicalUrl="https://aarogyadamu.com/services"
        schemaJson={servicesSchema}
      />

      <Breadcrumbs items={[{ name: 'Services' }]} onNavigate={onNavigate} />

      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-accent">Core Architecture Capabilities</span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-foreground">
          AarogyaDamu Services Overview
        </h1>
        <p className="text-base text-foreground-muted leading-relaxed">
          From document OCR parsing to rolling baseline trajectory calculation and patient-controlled doctor sharing: discover our modular health intelligence infrastructure.
        </p>
      </div>

      {/* Services List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {servicesList.map((service) => (
          <div
            key={service.id}
            onClick={() => {
              trackEvent('SERVICE_PAGE_CTA_CLICKED', { serviceId: service.id });
              onNavigate(service.path);
            }}
            className="p-6 rounded-3xl bg-surface border border-foreground/10 shadow-subtle hover:shadow-card hover:border-foreground/20 cursor-pointer transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-surface-subtle text-foreground border border-foreground/10">
                  {service.badge}
                </span>
                <span className="text-xs font-mono text-foreground-subtle">AarogyaDamu Engine</span>
              </div>
              <h3 className="font-serif text-2xl font-bold text-foreground">{service.title}</h3>
              <p className="text-xs text-foreground-muted leading-relaxed">{service.desc}</p>
            </div>

            <div className="pt-4 border-t border-foreground/5 flex items-center justify-between text-xs font-semibold text-accent">
              <span>View Service Details & Architecture</span>
              <IconArrowRight className="w-4 h-4" />
            </div>
          </div>
        ))}
      </div>

      <div className="p-8 sm:p-12 rounded-3xl bg-surface-dark text-surface border border-surface/10 text-center space-y-4 shadow-elevated">
        <h3 className="font-serif text-2xl font-bold text-surface">Need a custom health data integration?</h3>
        <p className="text-xs text-surface/70 max-w-md mx-auto">Contact our team for developer specifications and healthcare provider onboarding.</p>
        <button
          onClick={() => onNavigate('/contact')}
          className="inline-flex items-center gap-2 px-6 py-3 bg-surface text-foreground font-semibold text-xs rounded-xl"
        >
          Contact Engineering Team
          <IconArrowRight className="w-4 h-4 text-accent" />
        </button>
      </div>
    </div>
  );
}
