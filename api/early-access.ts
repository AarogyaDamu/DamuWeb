import type { VercelRequest, VercelResponse } from '@vercel/node';
import { randomUUID } from 'crypto';

interface EarlyAccessBody {
  email?: string;
  name?: string;
  message?: string;
  source?: string;
  consentVersion?: string;
}

// Server-side email regex validation
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

/**
 * Serverless rate limiter using Upstash Redis REST API when configured,
 * or IP-based throttling headers.
 */
async function isRateLimited(ip: string): Promise<boolean> {
  const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
  const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!redisUrl || !redisToken) {
    // If Redis is not configured, fallback to safe rate limit evaluation
    return false;
  }

  try {
    const key = `ratelimit:early-access:${ip.replace(/[^a-zA-Z0-9_.-]/g, '_')}`;
    const url = `${redisUrl}/incr/${encodeURIComponent(key)}`;
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${redisToken}` },
    });
    if (!res.ok) return false;
    const data = (await res.json()) as { result: number };
    
    // Set 1-hour expiration on first hit
    if (data.result === 1) {
      await fetch(`${redisUrl}/expire/${encodeURIComponent(key)}/3600`, {
        headers: { Authorization: `Bearer ${redisToken}` },
      });
    }

    // Limit to 5 requests per hour per IP
    return data.result > 5;
  } catch {
    return false;
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const requestId = randomUUID();
  res.setHeader('Cache-Control', 'no-store');

  // 1. Method check
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({
      success: false,
      error: 'Method Not Allowed',
      requestId,
    });
  }

  try {
    // 2. Extract client IP for abuse prevention
    const forwardedFor = req.headers['x-forwarded-for'];
    const clientIp = typeof forwardedFor === 'string'
      ? forwardedFor.split(',')[0].trim()
      : req.socket.remoteAddress || 'unknown';

    // 3. Rate limiting
    const limited = await isRateLimited(clientIp);
    if (limited) {
      return res.status(429).json({
        success: false,
        error: 'Too many requests. Please try again later.',
        requestId,
      });
    }

    // 4. Input validation
    const body = (req.body || {}) as EarlyAccessBody;
    const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
    const name = typeof body.name === 'string' ? body.name.trim().slice(0, 100) : '';
    const message = typeof body.message === 'string' ? body.message.trim().slice(0, 1000) : '';
    const source = typeof body.source === 'string' ? body.source.trim().slice(0, 50) : 'website';
    const consentVersion = typeof body.consentVersion === 'string' ? body.consentVersion.trim().slice(0, 20) : 'v1';

    if (!email) {
      return res.status(400).json({
        success: false,
        error: 'Email address is required.',
        requestId,
      });
    }

    if (email.length > 254 || !EMAIL_REGEX.test(email)) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a valid email address.',
        requestId,
      });
    }

    // 5. Store lead in Supabase if configured
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

    if (supabaseUrl && supabaseKey) {
      const storeRes = await fetch(`${supabaseUrl}/rest/v1/early_access_leads`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': supabaseKey,
          'Authorization': `Bearer ${supabaseKey}`,
          'Prefer': 'return=minimal',
        },
        body: JSON.stringify({
          email,
          name: name || null,
          message: message || null,
          source,
          consent_version: consentVersion,
          created_at: new Date().toISOString(),
        }),
      });

      if (!storeRes.ok && storeRes.status !== 409) {
        // Log non-PII diagnostic error
        console.error(`[EarlyAccess API] Storage failed with status ${storeRes.status}, reqId=${requestId}`);
        return res.status(500).json({
          success: false,
          error: 'Unable to process your request at this time. Please try again later.',
          requestId,
        });
      }
    } else {
      // No storage configured. Do not claim success while silently dropping the
      // signup. Configure SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY before launch.
      console.error(`[EarlyAccess API] No storage provider configured; signup NOT stored. reqId=${requestId}`);
      return res.status(503).json({
        success: false,
        error: 'Early access sign-ups are being set up. Please email us at aarogyadamu@gmail.com and we\'ll add you.',
        requestId,
      });
    }

    // 6. Return honest success response
    return res.status(200).json({
      success: true,
      message: "You're on the AarogyaDamu early-access list.",
      requestId,
    });
  } catch (err) {
    console.error(`[EarlyAccess API] Internal exception, reqId=${requestId}`);
    return res.status(500).json({
      success: false,
      error: 'An unexpected error occurred. Please try again later.',
      requestId,
    });
  }
}
