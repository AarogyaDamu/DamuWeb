import React, { useState, useEffect } from 'react';
import { SmoothScroll } from './components/layout/SmoothScroll';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { EarlyAccessModal } from './components/layout/EarlyAccessModal';
import { CookieBanner } from './components/ui/CookieBanner';
import { StickyMobileCta } from './components/ui/StickyMobileCta';

import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { FaqPage } from './pages/FaqPage';
import { ContactPage } from './pages/ContactPage';
import { SecurityPage } from './pages/SecurityPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { TermsPage } from './pages/TermsPage';
import { ThankYouPage } from './pages/ThankYouPage';
import { NotFoundPage } from './pages/NotFoundPage';

export function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname || '/';
  });
  const [isEarlyAccessOpen, setIsEarlyAccessOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

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
          {renderPage()}
        </main>

        <Footer onNavigate={navigate} />

        <CookieBanner />

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
