import React from 'react';
import { SeoHead } from '../../components/seo/SeoHead';
import { Breadcrumbs } from '../../components/ui/Breadcrumbs';
import { IconClock, IconMail } from '../../components/ui/CustomSvgIcons';
import { blogArticles } from './BlogPage';
import { trackEvent } from '../../lib/analytics';

interface BlogPostPageProps {
  slug: string;
  onNavigate: (path: string) => void;
  onOpenGetStarted: () => void;
}

const postContentMap: Record<string, { body: string[]; keyTakeaway: string }> = {
  'understanding-longitudinal-health-records': {
    body: [
      'Traditional personal healthcare management relies heavily on sporadic, point-in-time documents. A patient receives a PDF lab report after an annual checkup, glances at the bolded out-of-range figures, and files the PDF away in an email folder or paper binder.',
      'The primary structural limitation of this traditional approach is temporal fragmentation. Single lab values fail to communicate whether a metric is on an ascending trajectory, recovering from an acute incident, or remaining stable within a personal normal range.',
      'A longitudinal health record transforms isolated data points into a continuous time-series vector. By standardizing diverse inputs (such as lab report PDFs, optical wearable pulse sensors, and doctor notes) into canonical units, the system computes velocity (rate of change per day) and persistence windows.',
      'When a physician reviews a longitudinal trajectory instead of 15 individual PDF attachments, appointment efficiency increases dramatically. The conversation shifts from discovering historical readings to evaluating persistent multi-metric patterns.',
    ],
    keyTakeaway: 'A single lab report is a snapshot. A longitudinal health record provides the full story by connecting historical context across time.',
  },
  'why-personal-baseline-matters-more-than-population-averages': {
    body: [
      'Clinical reference ranges printed on diagnostic lab sheets represent population-wide statistical boundaries derived from large demographic cohorts. While useful for acute pathology detection, population reference ranges are fundamentally insensitive to individual-specific normal baselines.',
      'For example, consider a patient whose resting heart rate has consistently measured 62 bpm for two years. Over a 45-day period, their resting heart rate gradually increases to 76 bpm. In a standard healthcare portal, 76 bpm is classified as normal because the generic population reference range spans 60 to 100 bpm.',
      'However, relative to the patient’s personal baseline of 62 bpm, a shift to 76 bpm represents a +14 bpm (+22.5%) deviation over 45 days. The Personal Baseline Engine calculates rolling individual averages and expected variance boundaries over a 90-day window.',
      'By evaluating personal baseline deviations alongside recency decay weighting W(t) = e^(-λΔt), subtle physiological changes are surfaced weeks or months before population-wide alert thresholds are breached.',
    ],
    keyTakeaway: 'Your personal normal matters more than generic cohort averages. Baseline tracking identifies subtle individual trajectory shifts early.',
  },
  'the-problem-with-fragmented-health-data': {
    body: [
      'Personal health data today is scattered across incompatible software ecosystems. Lab results reside in diagnostic provider portals (Thyrocare, Dr. Lal PathLabs, Metropolis), prescriptions exist on paper, wearable sensors sync to Apple Health or Fitbit, and doctor notes remain locked in clinic EHR systems.',
      'This structural fragmentation places the heavy burden of data synthesis entirely onto the patient. During a medical consultation, patients are expected to manually recall past dosages, locate email attachments, and summarize symptom timelines from memory.',
      'The AarogyaDamu architecture addresses this fragmentation through a multi-stage normalization pipeline. Raw inputs are converted into canonical units (mg/dL, mmHg, %, bpm) with provenance metadata tracing exact source origin and extraction confidence.',
      'Unifying fragmented health data into a single patient-owned model ensures that data sovereignty remains with the individual while establishing a continuous health context.',
    ],
    keyTakeaway: 'Fragmented health data creates dangerous medical blind spots. Canonical unit normalization brings all sources into one coherent health model.',
  },
  'how-evidence-bounded-ai-prevents-medical-hallucinations': {
    body: [
      'Generic large language models (LLMs) trained on broad internet text present severe failure modes when applied directly to raw patient records. Generic LLMs frequently fabricate illegal causal claims, assert clinical certainty without sufficient evidence, or confuse temporal correlation with causation.',
      'To prevent medical hallucinations, AarogyaDamu decouples raw data processing from language generation. A 100% deterministic TypeScript domain engine evaluates rolling baselines, slope overlap correlations, and 7 quality dimensions (observation count, recency, source quality, coverage, contradiction level).',
      'If the evidence sufficiency score falls below the 0.70 threshold, the state transition engine prevents state chatter and explicitly tags signal status as INSUFFICIENT_DATA or EMERGING_CHANGE.',
      'Downstream AI companions such as Damu receive an evidence-bounded prompt payload. Damu operates strictly within factual context boundaries and enforces cautious non-causal language guardrails ("These measurements changed in the same window without source contradiction").',
    ],
    keyTakeaway: 'Deterministic domain engineering must gate AI LLMs. Grounded context payloads prevent ungrounded medical hallucinations.',
  },
  'patient-data-sovereignty-and-dpdp-compliance-in-india': {
    body: [
      'India’s Digital Personal Data Protection (DPDP) framework establishes strict guidelines regarding data minimization, explicit consent management, and data residency for digital health systems.',
      'AarogyaDamu is architected around patient data sovereignty. All patient profiles, health events, and document extractions are provisioned in the Mumbai (ap-south-1) region to satisfy latency requirements and in-country data residency guidelines.',
      'Data access is protected by Postgres Row-Level Security (RLS) policies. Client queries can strictly read and write only their authenticated user ID rows, preventing unauthorized cross-patient data access.',
      'Furthermore, patient-controlled sharing mechanisms allow users to generate time-bounded, scope-limited access tokens (e.g. AGD-7K2P-93XM). Patients select exact information scopes (Timeline, Labs, Vitals) and can revoke access grants at any time.',
    ],
    keyTakeaway: 'Patient privacy is built into database RLS policies and Mumbai data residency. Patients maintain full ownership over their health records.',
  },
};

export function BlogPostPage({ slug, onNavigate, onOpenGetStarted }: BlogPostPageProps) {
  const article = blogArticles.find((a) => a.slug === slug) || blogArticles[0];
  const postContent = postContentMap[slug] || postContentMap['understanding-longitudinal-health-records'];

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    description: article.description,
    author: {
      '@type': 'Organization',
      name: article.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'AarogyaDamu',
      logo: {
        '@type': 'ImageObject',
        url: 'https://aarogyadamu.com/favicon.svg',
      },
    },
    datePublished: '2026-08-15',
    mainEntityOfPage: `https://aarogyadamu.com/blog/${article.slug}`,
  };

  return (
    <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-10">
      <SeoHead
        title={`${article.title} - AarogyaDamu Blog`}
        description={article.description}
        canonicalUrl={`https://aarogyadamu.com/blog/${article.slug}`}
        schemaJson={articleSchema}
      />

      <Breadcrumbs
        items={[
          { name: 'Blog', path: '/blog' },
          { name: article.title },
        ]}
        onNavigate={onNavigate}
      />

      <div className="space-y-4">
        <div className="flex items-center gap-3 text-xs text-foreground-muted">
          <span className="px-2.5 py-0.5 rounded-full bg-surface-subtle text-foreground border border-foreground/10 font-semibold">
            {article.category}
          </span>
          <span>{article.date}</span>
          <span>•</span>
          <span className="inline-flex items-center gap-1 font-medium">
            <IconClock className="w-3.5 h-3.5 text-foreground-subtle" /> {article.readTime}
          </span>
        </div>

        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-foreground leading-tight">
          {article.title}
        </h1>

        <div className="text-xs font-semibold text-foreground-muted border-b border-foreground/10 pb-4">
          By {article.author}
        </div>
      </div>

      <div className="p-5 rounded-2xl bg-surface border border-accent/30 text-xs text-foreground space-y-1 shadow-subtle">
        <div className="font-bold text-accent uppercase tracking-wider text-[10px]">Key Takeaway</div>
        <p className="font-medium text-foreground leading-relaxed">{postContent.keyTakeaway}</p>
      </div>

      <div className="prose max-w-none text-xs sm:text-sm text-foreground-muted leading-relaxed space-y-6">
        {postContent.body.map((paragraph, i) => (
          <p key={i} className="leading-relaxed">
            {paragraph}
          </p>
        ))}
      </div>

      <div className="p-8 rounded-3xl bg-surface border border-foreground/10 space-y-4 shadow-subtle text-center">
        <h3 className="font-serif text-2xl font-bold text-foreground">Build Your Personal Health Model</h3>
        <p className="text-xs text-foreground-muted max-w-md mx-auto">Experience continuous longitudinal health context with UIN security isolation.</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={() => {
              trackEvent('CTA_CLICKED', { source: `blog_${article.slug}` });
              onOpenGetStarted();
            }}
            className="w-full sm:w-auto px-6 py-3 bg-foreground text-surface font-semibold text-xs rounded-xl"
          >
            Get started with UIN
          </button>
          <button
            onClick={() => onNavigate('/blog')}
            className="w-full sm:w-auto px-6 py-3 bg-surface-subtle text-foreground font-semibold text-xs rounded-xl border border-foreground/10"
          >
            Back to Blog Articles
          </button>
        </div>
      </div>
    </div>
  );
}
