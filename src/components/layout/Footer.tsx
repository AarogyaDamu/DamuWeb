import React from 'react';
import { IconMail } from '../ui/CustomSvgIcons';
import { trackEvent } from '../../lib/analytics';

interface FooterProps {
  onNavigate: (path: string) => void;
  onOpenPrivacySettings?: () => void;
}

function isPlainLeftClick(e: React.MouseEvent<HTMLAnchorElement>): boolean {
  return (
    e.button === 0 &&
    !e.metaKey &&
    !e.ctrlKey &&
    !e.altKey &&
    !e.shiftKey &&
    (!e.currentTarget.target || e.currentTarget.target === '_self')
  );
}

export function Footer({ onNavigate, onOpenPrivacySettings }: FooterProps) {
  return (
    <footer
      className="bg-surface-dark text-white pt-14 pb-10 border-t border-white/05"
      role="contentinfo"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 pb-10 border-b border-white/08">

          {/* Brand */}
          <div className="lg:col-span-2 space-y-4">
            <a
              href="/"
              onClick={(e) => {
                if (!isPlainLeftClick(e)) return;
                e.preventDefault();
                trackEvent('nav_link_click', { link_name: 'home_brand', destination: '/' });
                onNavigate('/');
              }}
              className="inline-flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-lg"
              aria-label="AarogyaDamu home"
            >
              <span className="font-serif text-lg font-bold tracking-tight">
                Aarogya<span className="text-accent">Damu</span>
              </span>
            </a>
            <a
              href="mailto:contact@aarogyadamu.com"
              onClick={() => trackEvent('outbound_link_click', { link_text: 'email', destination: 'mailto:contact@aarogyadamu.com', source: 'footer' })}
              className="inline-flex items-center gap-1.5 text-sm text-white/50 hover:text-white transition-colors"
              aria-label="Email AarogyaDamu"
            >
              <IconMail className="w-3.5 h-3.5 text-accent" />
              contact@aarogyadamu.com
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
                  <a
                    href={link.href}
                    onClick={(e) => {
                      if (!isPlainLeftClick(e)) return;
                      e.preventDefault();
                      trackEvent('nav_link_click', { link_name: link.label, destination: link.href });
                      if (link.isRoute) {
                        onNavigate(link.href);
                      } else {
                        onNavigate('/');
                        setTimeout(() => {
                          const el = document.getElementById(link.href.replace('/#', ''));
                          if (el) el.scrollIntoView({ behavior: 'smooth' });
                        }, 100);
                      }
                    }}
                    className="text-sm text-white/50 hover:text-white transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-accent rounded inline-block"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-3">
            <h3 className="text-2xs font-mono font-semibold tracking-widest-2 text-white/30 uppercase">Legal & Security</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/privacy"
                  onClick={(e) => {
                    if (!isPlainLeftClick(e)) return;
                    e.preventDefault();
                    trackEvent('nav_link_click', { link_name: 'Privacy', destination: '/privacy' });
                    onNavigate('/privacy');
                  }}
                  className="text-sm text-white/50 hover:text-white transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-accent rounded inline-block"
                >
                  Privacy
                </a>
              </li>
              <li>
                <a
                  href="/terms"
                  onClick={(e) => {
                    if (!isPlainLeftClick(e)) return;
                    e.preventDefault();
                    trackEvent('nav_link_click', { link_name: 'Terms', destination: '/terms' });
                    onNavigate('/terms');
                  }}
                  className="text-sm text-white/50 hover:text-white transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-accent rounded inline-block"
                >
                  Terms
                </a>
              </li>
              <li>
                <a
                  href="/security"
                  onClick={(e) => {
                    if (!isPlainLeftClick(e)) return;
                    e.preventDefault();
                    trackEvent('nav_link_click', { link_name: 'Security', destination: '/security' });
                    onNavigate('/security');
                  }}
                  className="text-sm text-white/50 hover:text-white transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-accent rounded inline-block"
                >
                  Security
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    if (onOpenPrivacySettings) {
                      onOpenPrivacySettings();
                    }
                  }}
                  className="text-sm text-accent/80 hover:text-accent font-medium transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-accent rounded underline underline-offset-2"
                >
                  Privacy Settings
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
