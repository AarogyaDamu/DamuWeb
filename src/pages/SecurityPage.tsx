import React from 'react';
import { SeoHead } from '../components/seo/SeoHead';

interface SubPageProps {
  onNavigate: (path: string) => void;
  onOpenGetStarted: () => void;
}

export function SecurityPage({ onNavigate, onOpenGetStarted }: SubPageProps) {
  return (
    <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-10">
      <SeoHead
        title="Security Practices - AarogyaDamu"
        description="Learn about security practices at AarogyaDamu: transport encryption, access control, credential isolation, and security development principles."
        canonicalUrl="https://aarogyadamu.com/security"
      />

      <div className="space-y-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-accent">Security & Protection</span>
        <h1 className="font-serif text-4xl font-bold text-foreground">Security Practices</h1>
        <p className="text-xs text-foreground-muted">Safeguarding information and infrastructure design</p>
      </div>

      <div className="p-8 sm:p-10 rounded-3xl bg-surface border border-foreground/10 space-y-8 text-xs text-foreground-muted leading-relaxed">
        <section className="space-y-2">
          <h2 className="font-serif text-lg font-bold text-foreground">1. Security by Design</h2>
          <p>
            Security is designed into AarogyaDamu from the beginning. We use appropriate technical and organizational safeguards to protect information handled by our services. Our controls evolve as the product and infrastructure mature.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-lg font-bold text-foreground">2. Transport and Connection Security</h2>
          <p>
            All communication with our website and services is encrypted in transit using strong TLS/HTTPS configurations. We enforce strict transport security (HSTS) headers, content security policies (CSP), and secure referrer controls across our public web deployments.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-lg font-bold text-foreground">3. Credential and Secret Isolation</h2>
          <p>
            Server-side credentials, private keys, and operational secrets are strictly isolated from client-side bundles and web application code. Public frontend applications interact only through authenticated, rate-limited serverless endpoints.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-lg font-bold text-foreground">4. Access Control and Minimal Data Footprint</h2>
          <p>
            We adhere to principles of least privilege and data minimization. Our marketing website collects only essential lead information (such as email addresses for early access) and does not store or process sensitive health records.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-lg font-bold text-foreground">5. Responsible Vulnerability Disclosure</h2>
          <p>
            If you believe you have discovered a potential security vulnerability in any AarogyaDamu service, please report it to our engineering team at <a href="mailto:aarogyadamu@gmail.com" className="text-accent hover:underline font-mono">aarogyadamu@gmail.com</a>. We review all submissions promptly.
          </p>
        </section>
      </div>
    </div>
  );
}
