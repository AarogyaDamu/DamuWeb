import React from 'react';
import { SeoHead } from '../components/seo/SeoHead';
import { ROUTES_METADATA } from '../lib/routes';
import { HeroSection } from '../components/sections/HeroSection';
import { IntelligenceCapabilities } from '../components/sections/IntelligenceCapabilities';
import { RecordsToContext } from '../components/sections/RecordsToContext';
import { ConnectedJourney } from '../components/sections/ConnectedJourney';
import { EverydayHealth } from '../components/sections/EverydayHealth';
import { DamuCompanion } from '../components/sections/DamuCompanion';
import { GlobalVisionSection } from '../components/sections/GlobalVisionSection';
import { OneSentenceSummary } from '../components/sections/OneSentenceSummary';
import { TrustPrivacySection } from '../components/sections/TrustPrivacySection';
import { FaqSection } from '../components/sections/FaqSection';
import { FinalCtaSection } from '../components/sections/FinalCtaSection';

interface HomePageProps {
  onNavigate: (path: string) => void;
  onOpenGetStarted: () => void;
  onOpenEarlyAccess?: () => void;
}

export function HomePage({ onNavigate, onOpenEarlyAccess }: HomePageProps) {
  const openEarlyAccess = onOpenEarlyAccess || (() => {});

  return (
    <>
      <SeoHead {...ROUTES_METADATA['/']} />

      {/* 1. Personal Health Intelligence & Health Vault Unified Hero */}
      <HeroSection onNavigate={onNavigate} onOpenEarlyAccess={openEarlyAccess} />

      {/* 2. Damu Companion */}
      <DamuCompanion />

      {/* 3. Intelligence Capabilities */}
      <IntelligenceCapabilities />

      {/* 4. Records → Context */}
      <RecordsToContext />

      {/* 5. Connected Journey */}
      <ConnectedJourney />

      {/* 6. Everyday Health */}
      <EverydayHealth />

      {/* 8. Global Vision */}
      <GlobalVisionSection />

      {/* 9. One Sentence */}
      <OneSentenceSummary />

      {/* 10. Trust & Privacy */}
      <TrustPrivacySection />

      {/* 11. FAQ Section */}
      <FaqSection />

      {/* 12. Final CTA */}
      <FinalCtaSection onNavigate={onNavigate} onOpenEarlyAccess={openEarlyAccess} />
    </>
  );
}
