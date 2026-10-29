import type { IncomingMessage, ServerResponse } from 'node:http';

export type VercelRequestCookies = Record<string, string>;
export type VercelRequestQuery = Record<string, string | string[]>;
export type VercelRequestBody = unknown;

export type VercelRequest = IncomingMessage & {
  query: VercelRequestQuery;
  cookies: VercelRequestCookies;
  body: VercelRequestBody;
};

export type VercelResponse = ServerResponse & {
  send: (body: unknown) => VercelResponse;
  json: (jsonBody: unknown) => VercelResponse;
  status: (statusCode: number) => VercelResponse;
  redirect: (statusOrUrl: string | number, url?: string) => VercelResponse;
};

export type VercelApiHandler = (
  req: VercelRequest,
  res: VercelResponse
) => void | Promise<void>;
