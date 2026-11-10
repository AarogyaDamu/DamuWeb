import React, { useState, useEffect } from 'react';
import { SmoothScroll } from './components/layout/SmoothScroll';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { EarlyAccessModal } from './components/layout/EarlyAccessModal';
import { CookieBanner } from './components/ui/CookieBanner';
import { StickyMobileCta } from './components/ui/StickyMobileCta';

import { HomePage } from './pages/HomePage';
import { initAnalytics, trackPageView } from './lib/analytics';

const AboutPage = React.lazy(() => import('./pages/AboutPage').then(m => ({ default: m.AboutPage })));
const FaqPage = React.lazy(() => import('./pages/FaqPage').then(m => ({ default: m.FaqPage })));
const ContactPage = React.lazy(() => import('./pages/ContactPage').then(m => ({ default: m.ContactPage })));
const SecurityPage = React.lazy(() => import('./pages/SecurityPage').then(m => ({ default: m.SecurityPage })));
const PrivacyPage = React.lazy(() => import('./pages/PrivacyPage').then(m => ({ default: m.PrivacyPage })));
const TermsPage = React.lazy(() => import('./pages/TermsPage').then(m => ({ default: m.TermsPage })));
const ThankYouPage = React.lazy(() => import('./pages/ThankYouPage').then(m => ({ default: m.ThankYouPage })));
const NotFoundPage = React.lazy(() => import('./pages/NotFoundPage').then(m => ({ default: m.NotFoundPage })));

export interface AppProps {
  initialPath?: string;
}

export function App({ initialPath }: AppProps = {}) {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (initialPath) return initialPath;
    return (typeof window !== 'undefined' ? window.location.pathname : '/') || '/';
  });
  const [isEarlyAccessOpen, setIsEarlyAccessOpen] = useState<boolean>(false);
  const [isPrivacySettingsOpen, setIsPrivacySettingsOpen] = useState<boolean>(false);

  // 1. Initialize analytics & consent mode early
  useEffect(() => {
    initAnalytics();
  }, []);

  // 2. Listen to popstate (back/forward) and update currentPath
  useEffect(() => {
    const handleLocationChange = () => {
      const path = window.location.pathname || '/';
      setCurrentPath(path);
    };
    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  // 3. Track SPA pageviews cleanly on route changes
  useEffect(() => {
    trackPageView(currentPath);
  }, [currentPath]);

  const navigate = (path: string) => {
    if (path.startsWith('/#')) {
      const hash = path.substring(2);
      if (window.location.pathname !== '/') {
        window.history.pushState({}, '', '/');
        setCurrentPath('/');
        setTimeout(() => {
          const el = document.getElementById(hash);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        const el = document.getElementById(hash);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }

    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPage = () => {
    if (currentPath === '/' || currentPath.startsWith('/#')) {
      return (
        <HomePage
          onNavigate={navigate}
          onOpenGetStarted={() => setIsEarlyAccessOpen(true)}
          onOpenEarlyAccess={() => setIsEarlyAccessOpen(true)}
        />
      );
    }
    if (currentPath === '/about') {
      return <AboutPage onNavigate={navigate} onOpenGetStarted={() => setIsEarlyAccessOpen(true)} />;
    }
    if (currentPath === '/faq') {
      return <FaqPage onNavigate={navigate} onOpenGetStarted={() => setIsEarlyAccessOpen(true)} />;
    }
    if (currentPath === '/contact') {
      return <ContactPage onNavigate={navigate} onOpenGetStarted={() => setIsEarlyAccessOpen(true)} />;
    }
    if (currentPath === '/security') {
      return <SecurityPage onNavigate={navigate} onOpenGetStarted={() => setIsEarlyAccessOpen(true)} />;
    }
    if (currentPath === '/privacy') {
      return <PrivacyPage onNavigate={navigate} onOpenGetStarted={() => setIsEarlyAccessOpen(true)} />;
    }
    if (currentPath === '/terms') {
      return <TermsPage onNavigate={navigate} onOpenGetStarted={() => setIsEarlyAccessOpen(true)} />;
    }
    if (currentPath === '/thank-you') {
      return <ThankYouPage onNavigate={navigate} onOpenGetStarted={() => setIsEarlyAccessOpen(true)} />;
    }
    return <NotFoundPage onNavigate={navigate} onOpenGetStarted={() => setIsEarlyAccessOpen(true)} />;
  };

  const hideStickyCta = currentPath === '/thank-you';

  return (
    <SmoothScroll>
      <div className="min-h-screen flex flex-col bg-background text-foreground font-sans">
        <Navbar
          currentPath={currentPath}
          onNavigate={navigate}
          onOpenSignIn={() => setIsEarlyAccessOpen(true)}
          onOpenGetStarted={() => setIsEarlyAccessOpen(true)}
          onOpenEarlyAccess={() => setIsEarlyAccessOpen(true)}
        />

        <main className="flex-grow" id="main-content">
          {currentPath === '/' || currentPath.startsWith('/#') ? (
            <HomePage
              onNavigate={navigate}
              onOpenGetStarted={() => setIsEarlyAccessOpen(true)}
              onOpenEarlyAccess={() => setIsEarlyAccessOpen(true)}
            />
          ) : (
            <React.Suspense fallback={<div className="min-h-[50vh]" aria-busy="true" />}>
              {renderPage()}
            </React.Suspense>
          )}
        </main>

        <Footer
          onNavigate={navigate}
          onOpenPrivacySettings={() => setIsPrivacySettingsOpen(true)}
        />

        <CookieBanner
          isPreferencesOpen={isPrivacySettingsOpen}
          onClosePreferences={() => setIsPrivacySettingsOpen(false)}
          onNavigate={navigate}
        />

        {!hideStickyCta && (
          <StickyMobileCta onNavigate={navigate} onOpenEarlyAccess={() => setIsEarlyAccessOpen(true)} />
        )}

        <EarlyAccessModal
          isOpen={isEarlyAccessOpen}
          onClose={() => setIsEarlyAccessOpen(false)}
        />
      </div>
    </SmoothScroll>
  );
}

export default App;
