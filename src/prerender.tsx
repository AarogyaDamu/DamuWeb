import React from 'react';
import { prerenderToNodeStream } from 'react-dom/static';
import { App } from './App';
import { ROUTES_METADATA, RouteMetadata } from './lib/routes';

export interface PrerenderResult {
  html: string;
  metadata: RouteMetadata;
}

export async function prerender(route: string): Promise<PrerenderResult> {
  const metadata = ROUTES_METADATA[route] || ROUTES_METADATA['/404'];

  const { prelude } = await prerenderToNodeStream(
    <React.StrictMode>
      <App initialPath={route} />
    </React.StrictMode>,
  );

  let html = '';
  const stream = prelude as any;
  await new Promise<void>((resolve, reject) => {
    stream.on('data', (chunk: unknown) => {
      html += String(chunk);
    });
    stream.on('end', () => resolve());
    stream.on('error', (err: unknown) => reject(err));
  });

  return { html, metadata };
}

export { ROUTES_METADATA, PRERENDER_ROUTES, CANONICAL_ROUTES } from './lib/routes';
