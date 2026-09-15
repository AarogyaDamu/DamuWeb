import React from 'react';
import { SeoHead } from '../../components/seo/SeoHead';
import { Breadcrumbs } from '../../components/ui/Breadcrumbs';
import { IconArrowRight, IconClock } from '../../components/ui/CustomSvgIcons';
import { trackEvent } from '../../lib/analytics';

interface SubPageProps {
  onNavigate: (path: string) => void;
  onOpenGetStarted: () => void;
}

export const blogArticles = [
  {
    slug: 'understanding-longitudinal-health-records',
    title: 'Understanding Longitudinal Health Records: Beyond Sparse Lab Attachments',
    description: 'Learn why tracking health observations continuously across time creates more meaningful medical context than isolated paper reports.',
    date: 'September 2026',
    author: 'AarogyaDamu Medical Engineering Team',
    readTime: '6 min read',
    category: 'Health Architecture',
  },
  {
    slug: 'why-personal-baseline-matters-more-than-population-averages',
    title: 'Why Personal Baseline Matters More Than Population Averages',
    description: 'Generic clinical reference ranges compare you to millions of people. Discover how personal 90-day trajectory baselines reveal true subtle health shifts.',
    date: 'September 2026',
    author: 'AarogyaDamu Data Science Group',
    readTime: '8 min read',
    category: 'Baseline Science',
  },
  {
    slug: 'the-problem-with-fragmented-health-data',
    title: 'The Structural Problem with Fragmented Personal Health Data',
    description: 'PDFs in email, prescription paper notes, and isolated wearable apps create dangerous blind spots. Explore how normalization connects the story.',
    date: 'August 2026',
    author: 'AarogyaDamu Product Team',
    readTime: '5 min read',
    category: 'Digital Health',
  },
  {
    slug: 'how-evidence-bounded-ai-prevents-medical-hallucinations',
    title: 'How Evidence-Bounded AI Prevents Hallucinations in Health Companion LLMs',
    description: 'Generic AI chatbots frequently hallucinate illegal medical causality. Discover how deterministic TypeScript pipeline payloads enforce factual boundaries.',
    date: 'August 2026',
    author: 'AarogyaDamu AI Safety Team',
    readTime: '9 min read',
    category: 'AI Safety',
  },
  {
    slug: 'patient-data-sovereignty-and-dpdp-compliance-in-india',
    title: 'Patient Data Sovereignty and DPDP India Compliance in Modern Healthcare Architecture',
    description: 'A deep-dive into Digital Personal Data Protection (DPDP) compliance, Mumbai ap-south-1 residency, and patient-controlled time-bounded share grants.',
    date: 'August 2026',
    author: 'AarogyaDamu Security & Compliance Group',
    readTime: '7 min read',
    category: 'Privacy & Security',
  },
];

export function BlogPage({ onNavigate, onOpenGetStarted }: SubPageProps) {
  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'AarogyaDamu Health Intelligence Educational Blog',
    description: 'Educational articles on longitudinal health modeling, personal baselines, DPDP India data sovereignty, and AI safety in digital health.',
    blogPost: blogArticles.map((art) => ({
      '@type': 'BlogPosting',
      headline: art.title,
      description: art.description,
      datePublished: '2026-08-15',
      url: `https://aarogyadamu.com/blog/${art.slug}`,
    })),
  };

  return (
    <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      <SeoHead
        title="Educational Health Technology Blog - AarogyaDamu"
        description="Read educational articles on longitudinal health records, personal baselines vs population averages, AI safety, and DPDP compliance in India."
        canonicalUrl="https://aarogyadamu.com/blog"
        schemaJson={blogSchema}
      />

      <Breadcrumbs items={[{ name: 'Blog' }]} onNavigate={onNavigate} />

      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-sage">Educational Articles & Research</span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-foreground">
          Health Intelligence Insights
        </h1>
        <p className="text-base text-foreground-muted leading-relaxed">
          Deep-dives into health data architecture, personal baseline mathematics, AI safety boundaries, and patient data sovereignty under Indian DPDP frameworks.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {blogArticles.map((article) => (
          <article
            key={article.slug}
            onClick={() => {
              trackEvent('BLOG_CTA_CLICKED', { slug: article.slug });
              onNavigate(`/blog/${article.slug}`);
            }}
            className="p-6 rounded-3xl bg-surface border border-foreground/10 shadow-subtle hover:shadow-card hover:border-foreground/20 cursor-pointer transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="px-2.5 py-0.5 rounded-full bg-surface-subtle text-foreground border border-foreground/10 font-medium">
                  {article.category}
                </span>
                <span className="text-foreground-subtle inline-flex items-center gap-1">
                  <IconClock className="w-3 h-3 text-foreground-subtle" /> {article.readTime}
                </span>
              </div>
              <h2 className="font-serif text-xl font-bold text-foreground leading-snug">{article.title}</h2>
              <p className="text-xs text-foreground-muted leading-relaxed">{article.description}</p>
            </div>

            <div className="pt-4 border-t border-foreground/5 flex items-center justify-between text-xs text-foreground-muted">
              <span>{article.date}</span>
              <span className="text-accent font-semibold inline-flex items-center gap-1">
                Read Article <IconArrowRight className="w-3.5 h-3.5 text-accent" />
              </span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
