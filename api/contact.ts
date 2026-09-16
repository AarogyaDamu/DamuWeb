import type { VercelRequest, VercelResponse } from '@vercel/node';
import { randomUUID } from 'crypto';

interface ContactBody {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

async function isRateLimited(ip: string): Promise<boolean> {
  const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
  const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!redisUrl || !redisToken) return false;

  try {
    const key = `ratelimit:contact:${ip.replace(/[^a-zA-Z0-9_.-]/g, '_')}`;
    const url = `${redisUrl}/incr/${encodeURIComponent(key)}`;
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${redisToken}` },
    });
    if (!res.ok) return false;
    const data = (await res.json()) as { result: number };

    if (data.result === 1) {
      await fetch(`${redisUrl}/expire/${encodeURIComponent(key)}/3600`, {
        headers: { Authorization: `Bearer ${redisToken}` },
      });
    }

    return data.result > 3; // Limit to 3 contact messages per hour per IP
  } catch {
    return false;
  }
}

async function sendResendEmail(resendKey: string, to: string, replyTo: string, subject: string, text: string, reqId: string): Promise<boolean> {
  const senders = [
    'AarogyaDamu Contact <noreply@aarogyadamu.com>',
    'AarogyaDamu Contact <onboarding@resend.dev>'
  ];

  for (const from of senders) {
    try {
      const emailRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${resendKey}`,
        },
        body: JSON.stringify({
          from,
          to,
          reply_to: replyTo,
          subject,
          text,
        }),
      });

      if (emailRes.ok) {
        return true;
      } else {
        const errText = await emailRes.text();
        console.warn(`[Contact API] Email via '${from}' failed with status ${emailRes.status}: ${errText}, reqId=${reqId}`);
      }
    } catch (err) {
      console.error(`[Contact API] Resend fetch error for '${from}', reqId=${reqId}`, err);
    }
  }
  return false;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const requestId = randomUUID();
  res.setHeader('Cache-Control', 'no-store');

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({
      success: false,
      error: 'Method Not Allowed',
      requestId,
    });
  }

  try {
    const forwardedFor = req.headers['x-forwarded-for'];
    const clientIp = typeof forwardedFor === 'string'
      ? forwardedFor.split(',')[0].trim()
      : req.socket.remoteAddress || 'unknown';

    const limited = await isRateLimited(clientIp);
    if (limited) {
      return res.status(429).json({
        success: false,
        error: 'Too many requests. Please try again later.',
        requestId,
      });
    }

    const body = (req.body || {}) as ContactBody;
    const name = typeof body.name === 'string' ? body.name.trim().slice(0, 100) : '';
    const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
    const subject = typeof body.subject === 'string' ? body.subject.trim().slice(0, 150) : 'General Inquiry';
    const message = typeof body.message === 'string' ? body.message.trim().slice(0, 3000) : '';

    if (!name) {
      return res.status(400).json({
        success: false,
        error: 'Name is required.',
        requestId,
      });
    }

    if (!email || email.length > 254 || !EMAIL_REGEX.test(email)) {
      return res.status(400).json({
        success: false,
        error: 'A valid email address is required.',
        requestId,
      });
    }

    if (!message) {
      return res.status(400).json({
        success: false,
        error: 'Message content is required.',
        requestId,
      });
    }

    let emailSent = false;
    let dbStored = false;

    // 1. Try Email dispatch via Resend if RESEND_API_KEY is configured
    const resendKey = process.env.RESEND_API_KEY;
    const recipientEmail = process.env.CONTACT_NOTIFICATION_EMAIL || 'aarogyadamu@gmail.com';

    if (resendKey) {
      const emailSubject = `[Website Contact] ${subject}`;
      const text = `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}\n\nSubmitted At: ${new Date().toISOString()}`;
      emailSent = await sendResendEmail(resendKey, recipientEmail, email, emailSubject, text, requestId);
    }

    // 2. Try storing message in Supabase if credentials present
    const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

    if (supabaseUrl && supabaseKey) {
      try {
        const storeRes = await fetch(`${supabaseUrl}/rest/v1/contact_messages`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': supabaseKey,
            'Authorization': `Bearer ${supabaseKey}`,
            'Prefer': 'return=minimal',
          },
          body: JSON.stringify({
            name,
            email,
            subject,
            message,
            created_at: new Date().toISOString(),
          }),
        });

        if (storeRes.ok || storeRes.status === 409) {
          dbStored = true;
        } else {
          console.error(`[Contact API] Supabase store failed with status ${storeRes.status}, reqId=${requestId}`);
        }
      } catch (dbErr) {
        console.error(`[Contact API] Supabase fetch exception, reqId=${requestId}`, dbErr);
      }
    }

    // 3. Return success if either Email was sent OR database storage succeeded
    if (emailSent || dbStored) {
      return res.status(200).json({
        success: true,
        message: 'Thank you for reaching out. Your message has been received.',
        requestId,
      });
    }

    // 4. Handle cases where no delivery targets are configured or all attempts failed
    if (!resendKey && (!supabaseUrl || !supabaseKey)) {
      console.error(`[Contact API] No delivery provider configured (Resend/Supabase); message NOT stored. reqId=${requestId}`);
      return res.status(503).json({
        success: false,
        error: 'Our contact system is being set up. Please email us directly at aarogyadamu@gmail.com.',
        requestId,
      });
    }

    console.error(`[Contact API] All delivery attempts failed. emailSent=${emailSent}, dbStored=${dbStored}, reqId=${requestId}`);
    return res.status(500).json({
      success: false,
      error: 'Unable to deliver message at this time. Please try emailing directly at aarogyadamu@gmail.com.',
      requestId,
    });
  } catch (err) {
    console.error(`[Contact API] Internal exception, reqId=${requestId}`, err);
    return res.status(500).json({
      success: false,
      error: 'An unexpected error occurred. Please try again later.',
      requestId,
    });
  }
}

