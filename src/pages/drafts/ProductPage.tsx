import React from 'react';
import { SeoHead } from '../../components/seo/SeoHead';
import { Breadcrumbs } from '../../components/ui/Breadcrumbs';
import { CareHubDemo } from '../../components/visualizers/CareHubDemo';
import { DataSourcesFlow } from '../../components/visualizers/DataSourcesFlow';
import { IconArrowRight } from '../../components/ui/CustomSvgIcons';
import { trackEvent } from '../../lib/analytics';

interface SubPageProps {
  onNavigate: (path: string) => void;
  onOpenGetStarted: () => void;
}

export function ProductPage({ onNavigate, onOpenGetStarted }: SubPageProps) {
  return (
    <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      <SeoHead
        title="Product Suite - AarogyaDamu Health Intelligence"
        description="Explore AarogyaDamu's full product suite: Personal Health Model, Care Hub medication refills, Lab Report OCR, patient-controlled doctor sharing, and Damu voice agent."
        canonicalUrl="https://aarogyadamu.com/product"
      />

      <Breadcrumbs items={[{ name: 'Product' }]} onNavigate={onNavigate} />

      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-accent">Product Capabilities</span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-foreground">
          The AarogyaDamu Health Intelligence Suite
        </h1>
        <p className="text-base text-foreground-muted leading-relaxed">
          From lab report OCR extraction to Care Hub refill actions and doctor share links: explore every layer of our personal health infrastructure.
        </p>
      </div>

      <CareHubDemo />
      <DataSourcesFlow />

      <div className="p-8 sm:p-12 rounded-3xl bg-surface border border-foreground/10 shadow-elevated text-center space-y-4">
        <h3 className="font-serif text-2xl font-bold text-foreground">Ready to test your Health Model?</h3>
        <p className="text-xs text-foreground-muted max-w-md mx-auto">Generate your unique patient UIN and explore your longitudinal health picture.</p>
        <button
          onClick={() => {
            trackEvent('CTA_CLICKED', { source: 'product_page_bottom' });
            onOpenGetStarted();
          }}
          className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-surface text-xs font-semibold rounded-xl shadow-subtle"
        >
          Get started <IconArrowRight className="w-4 h-4 text-accent" />
        </button>
      </div>
    </div>
  );
}
