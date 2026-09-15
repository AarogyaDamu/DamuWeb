import React from 'react';
import { IconMail } from '../ui/CustomSvgIcons';
import { trackEvent } from '../../lib/analytics';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'AarogyaDamu',
    url: 'https://aarogyadamu.com',
    email: 'aarogyadamu@gmail.com',
    description: 'Personal Health Intelligence - connecting your healthcare life into continuously useful health context.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Pune',
      addressRegion: 'Maharashtra',
      addressCountry: 'IN',
    },
  };

  return (
    <footer
      className="bg-surface-dark text-white pt-14 pb-10 border-t border-white/05"
      role="contentinfo"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 pb-10 border-b border-white/08">

          {/* Brand */}
          <div className="lg:col-span-2 space-y-4">
            <button
              onClick={() => onNavigate('/')}
              className="flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-lg"
              aria-label="AarogyaDamu home"
            >
              <span className="font-serif text-lg font-bold tracking-tight">
                Aarogya<span className="text-accent">Damu</span>
              </span>
            </button>
            <a
              href="mailto:aarogyadamu@gmail.com"
              onClick={() => trackEvent('EMAIL_CTA_CLICKED', { source: 'footer' })}
              className="inline-flex items-center gap-1.5 text-sm text-white/50 hover:text-white transition-colors"
              aria-label="Email AarogyaDamu"
            >
              <IconMail className="w-3.5 h-3.5 text-accent" />
              aarogyadamu@gmail.com
            </a>
          </div>

          {/* Navigation */}
          <div className="space-y-3" role="navigation" aria-label="Footer navigation">
            <h3 className="text-2xs font-mono font-semibold tracking-widest-2 text-white/30 uppercase">Navigate</h3>
            <ul className="space-y-2">
              {[
                { label: 'Health Intelligence', href: '/#intelligence', isRoute: false },
                { label: 'Vision', href: '/#vision', isRoute: false },
                { label: 'About', href: '/about', isRoute: true },
                { label: 'FAQ', href: '/faq', isRoute: true },
              ].map(link => (
                <li key={link.href}>
                  <button
                    onClick={() => {
                      if (link.isRoute) {
                        onNavigate(link.href);
                      } else {
                        onNavigate('/');
                        setTimeout(() => {
                          const el = document.getElementById('intelligence');
                          if (el) el.scrollIntoView({ behavior: 'smooth' });
                        }, 100);
                      }
                    }}
                    className="text-sm text-white/50 hover:text-white transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-accent rounded"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-3">
            <h3 className="text-2xs font-mono font-semibold tracking-widest-2 text-white/30 uppercase">Legal & Security</h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigate('/privacy')}
                  className="text-sm text-white/50 hover:text-white transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-accent rounded"
                >
                  Privacy
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/terms')}
                  className="text-sm text-white/50 hover:text-white transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-accent rounded"
                >
                  Terms
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/security')}
                  className="text-sm text-white/50 hover:text-white transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-accent rounded"
                >
                  Security
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-white/25">
          <p>
            AarogyaDamu is designed to organize personal health information. It does not provide medical diagnosis or replace qualified healthcare providers.
          </p>
          <p className="whitespace-nowrap font-mono">
            © {new Date().getFullYear()} AarogyaDamu
          </p>
        </div>
      </div>
    </footer>
  );
}
