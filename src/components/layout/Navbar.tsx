import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { trackEvent } from '../../lib/analytics';
import { IconClose, IconMenu } from '../ui/CustomSvgIcons';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onOpenSignIn: () => void;
  onOpenGetStarted: () => void;
  onOpenEarlyAccess: () => void;
}

const NAV_LINKS = [
  { label: 'Health Intelligence', path: '/#intelligence' },
  { label: 'Vision', path: '/#vision' },
  { label: 'About', path: '/about' },
  { label: 'FAQ', path: '/faq' },
];

export function Navbar({ currentPath, onNavigate, onOpenEarlyAccess }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => { if (window.innerWidth >= 1024) setMobileOpen(false); };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNavClick = (link: { label: string; path: string }) => {
    setMobileOpen(false);
    trackEvent('nav_link_click', { link_name: link.label, destination: link.path });
    onNavigate(link.path);
  };

  return (
    <header
      role="banner"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled || mobileOpen
          ? 'bg-background/95 backdrop-blur-md border-b border-border shadow-xs'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">

          {/* Logo */}
          <button
            onClick={() => {
              trackEvent('nav_link_click', { link_name: 'home_logo', destination: '/' });
              onNavigate('/');
            }}
            className="flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-lg"
            aria-label="AarogyaDamu home"
          >
            <span className="font-serif text-lg font-bold text-foreground tracking-tight">
              Aarogya<span className="text-accent">Damu</span>
            </span>
          </button>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
            {NAV_LINKS.map(link => {
              const isActive = currentPath === link.path;
              return (
                <button
                  key={link.path}
                  onClick={() => handleNavClick(link)}
                  className={`px-3.5 py-2 text-sm font-medium rounded-lg transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                    isActive
                      ? 'text-foreground bg-surface font-semibold'
                      : 'text-foreground-muted hover:text-foreground hover:bg-surface/50'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={() => {
                trackEvent('primary_cta_click', { cta_name: 'get_in_touch', location: 'navbar' });
                onOpenEarlyAccess();
              }}
              className="px-4 py-2 rounded-xl bg-foreground text-white text-sm font-semibold hover:bg-surface-dark-hover transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
              aria-label="Get in Touch"
            >
              Get in Touch
            </button>
          </div>

          {/* Mobile toggle */}
          <button
            className="lg:hidden p-2 rounded-lg text-foreground-muted hover:text-foreground hover:bg-surface transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            onClick={() => setMobileOpen(o => !o)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen
              ? <IconClose className="w-5 h-5" />
              : <IconMenu className="w-5 h-5" />
            }
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="lg:hidden overflow-hidden bg-background border-b border-border"
          >
            <nav className="px-4 py-4 space-y-1" aria-label="Mobile navigation">
              {NAV_LINKS.map(link => (
                <button
                  key={link.path}
                  onClick={() => handleNavClick(link)}
                  className="w-full text-left px-3 py-2.5 text-sm font-medium text-foreground-muted hover:text-foreground rounded-xl hover:bg-surface transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  {link.label}
                </button>
              ))}
              <div className="pt-3 pb-1">
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    trackEvent('primary_cta_click', { cta_name: 'get_in_touch', location: 'navbar_mobile' });
                    onOpenEarlyAccess();
                  }}
                  className="w-full py-3 rounded-xl bg-foreground text-white text-sm font-semibold hover:bg-surface-dark-hover transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                >
                  Get in Touch
                </button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
