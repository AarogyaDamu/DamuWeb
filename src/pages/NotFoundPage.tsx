import React, { useEffect } from 'react';
import { SeoHead } from '../components/seo/SeoHead';
import { IconArrowRight, IconActivity } from '../components/ui/CustomSvgIcons';
import { trackEvent } from '../lib/analytics';

interface SubPageProps {
  onNavigate: (path: string) => void;
  onOpenGetStarted: () => void;
}

export function NotFoundPage({ onNavigate }: SubPageProps) {
  useEffect(() => {
    trackEvent('page_not_found', { path: window.location.pathname });
  }, []);
  return (
    <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-md mx-auto text-center space-y-8">
      <SeoHead
        title="Page Not Found (404) - AarogyaDamu"
        description="The requested page could not be found. Return to AarogyaDamu homepage or explore our product suite."
        canonicalUrl="https://aarogyadamu.com/404"
      />

      <div className="w-16 h-16 rounded-full bg-surface-subtle border border-foreground/10 text-foreground flex items-center justify-center mx-auto">
        <IconActivity className="w-8 h-8 text-accent" />
      </div>

      <div className="space-y-2">
        <span className="font-mono text-xs font-bold text-accent uppercase tracking-wider">Error 404</span>
        <h1 className="font-serif text-3xl font-bold text-foreground">Page Not Found</h1>
        <p className="text-xs text-foreground-muted leading-relaxed">
          The requested page URL does not exist or has been moved. Use the navigation links below to return to authoritative site areas.
        </p>
      </div>

      <div className="space-y-2 pt-2 text-xs">
        <button
          onClick={() => onNavigate('/')}
          className="w-full py-3 px-4 bg-foreground text-surface font-semibold rounded-xl shadow-subtle flex items-center justify-center gap-2"
        >
          <span>Return to Homepage</span>
          <IconArrowRight className="w-4 h-4 text-accent" />
        </button>
        <button
          onClick={() => onNavigate('/faq')}
          className="w-full py-3 px-4 bg-surface border border-foreground/10 text-foreground font-semibold rounded-xl"
        >
          Browse FAQ
        </button>
      </div>
    </div>
  );
}
