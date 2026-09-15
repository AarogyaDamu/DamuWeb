import React from 'react';
import { SeoHead } from '../../components/seo/SeoHead';
import { Breadcrumbs } from '../../components/ui/Breadcrumbs';
import { DoctorShareDemo } from '../../components/visualizers/DoctorShareDemo';
import { IconArrowRight, IconShield } from '../../components/ui/CustomSvgIcons';

interface SubPageProps {
  onNavigate: (path: string) => void;
  onOpenGetStarted: () => void;
}

export function ForHealthcarePage({ onNavigate, onOpenGetStarted }: SubPageProps) {
  return (
    <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      <SeoHead
        title="For Healthcare Providers - AarogyaDamu Specialist Doctor Views"
        description="AarogyaDamu for doctors and clinics: patient-controlled longitudinal timeline share grants, source provenance tracing, and appointment preparation."
        canonicalUrl="https://aarogyadamu.com/for-healthcare"
      />

      <Breadcrumbs items={[{ name: 'For Healthcare' }]} onNavigate={onNavigate} />

      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-accent">For Doctors and Clinics</span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-foreground">
          Clearer Healthcare Conversations
        </h1>
        <p className="text-base text-foreground-muted leading-relaxed">
          Instead of flipping through 20 sparse PDF attachments during a 10-minute appointment, access a continuous 90-day trajectory with patient-controlled share links.
        </p>
      </div>

      <DoctorShareDemo />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-surface border border-foreground/10 space-y-2 shadow-subtle">
          <div className="text-accent font-bold text-xs uppercase">Longitudinal Context</div>
          <h3 className="font-serif text-lg font-bold text-foreground">Beyond Single Lab Points</h3>
          <p className="text-xs text-foreground-muted leading-relaxed">
            See velocity and 90-day rolling baseline ranges to evaluate whether a metric deviation is acute or persistent.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-surface border border-foreground/10 space-y-2 shadow-subtle">
          <div className="text-sage font-bold text-xs uppercase">Provenance Integrity</div>
          <h3 className="font-serif text-lg font-bold text-foreground">Source Provenance Traced</h3>
          <p className="text-xs text-foreground-muted leading-relaxed">
            Distinguishes verified lab OCR text vs doctor entries vs self-reported observations with clear confidence scores.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-surface border border-foreground/10 space-y-2 shadow-subtle">
          <div className="text-amber-700 font-bold text-xs uppercase">Zero Patient Lock-In</div>
          <h3 className="font-serif text-lg font-bold text-foreground">Patient-Controlled Sharing</h3>
          <p className="text-xs text-foreground-muted leading-relaxed">
            Time-bounded share tokens grant view-only access to selected scopes. Patients can revoke access at any time.
          </p>
        </div>
      </div>
    </div>
  );
}
