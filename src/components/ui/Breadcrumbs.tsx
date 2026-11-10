import React from 'react';

export interface BreadcrumbItem {
  name: string;
  path?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  onNavigate: (path: string) => void;
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

export function Breadcrumbs({ items, onNavigate }: BreadcrumbsProps) {
  const schemaBreadcrumbs = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: item.name,
      item: item.path ? `https://www.aarogyadamu.com${item.path}` : undefined,
    })),
  };

  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaBreadcrumbs) }}
      />
      <ol className="flex flex-wrap items-center gap-2 text-xs text-foreground-muted">
        <li>
          <a
            href="/"
            onClick={(e) => {
              if (!isPlainLeftClick(e)) return;
              e.preventDefault();
              onNavigate('/');
            }}
            className="hover:text-foreground transition-colors font-medium"
          >
            Home
          </a>
        </li>
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <li key={idx} className="flex items-center gap-2">
              <span className="text-foreground-subtle">/</span>
              {isLast || !item.path ? (
                <span className="font-semibold text-foreground" aria-current="page">
                  {item.name}
                </span>
              ) : (
                <a
                  href={item.path}
                  onClick={(e) => {
                    if (!isPlainLeftClick(e)) return;
                    e.preventDefault();
                    onNavigate(item.path!);
                  }}
                  className="hover:text-foreground transition-colors font-medium"
                >
                  {item.name}
                </a>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
