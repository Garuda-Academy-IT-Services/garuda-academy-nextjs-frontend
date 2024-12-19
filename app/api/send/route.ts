import type { NextRequest } from 'next/server'
import { SignupConfirmationTemplate } from '@/components/email-templates/signup-confirmation.template'
import { siteConfig } from '@/config/site-config'
import { Resend } from 'resend'
import { z } from 'zod'
import { rateLimit } from '@/lib/utils'

// Constants
const ALLOWED_ORIGINS = ['https://garuda-academy-nextjs-frontend.vercel.app', 'http://localhost:3000'] as const

// Configuration
const limiter = rateLimit({
  interval: 60 * 1000, // 1 minute
  uniqueTokenPerInterval: 500,
  limit: 500,
})

const resend = new Resend(process.env.RESEND_API_KEY)

// Validation Schema
const sendEmailSchema = z.object({
  to: z.string().email(),
  subject: z.string().min(1),
  name: z.string().min(1),
  purpose: z.enum(['signup', 'general']).default('general'),
  signupToken: z.string().optional(),
})

export async function POST(request: NextRequest) {
  // 1. CORS validation
  const origin = request.headers.get('origin')
  if (!origin || !ALLOWED_ORIGINS.includes(origin as (typeof ALLOWED_ORIGINS)[number])) {
    return new Response('Unauthorized', { status: 403 })
  }

  // Set CORS headers
  const headers = new Headers({
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'POST',
    'Access-Control-Allow-Headers': 'Content-Type',
  })

  // 2. Rate limiting
  const ip = request.headers.get('x-forwarded-for') ?? 'unknown'
  try {
    await limiter.check(ip)
  } catch {
    return Response.json({ error: 'Rate limit exceeded' }, { status: 429, headers })
  }

  try {
    // 3. Request parsing and validation
    const body = await request.json()
    const result = sendEmailSchema.safeParse(body)

    if (!result.success) {
      return Response.json({ error: 'Validation error', details: result.error.format() }, { status: 400, headers })
    }

    // 4. Business logic
    const { data: emailData, error: emailError } = await resend.emails.send({
      from: `${siteConfig.name} <${siteConfig.emails.onboarding}>`,
      to: [result.data.to],
      subject: result.data.subject,
      react: SignupConfirmationTemplate({ name: result.data.name }),
    })

    if (emailError) {
      return Response.json({ error: 'Email sending failed', details: emailError }, { status: 500, headers })
    }

    return Response.json(emailData, { headers })
  } catch (error) {
    console.error('Email API error:', error)
    return Response.json(
      {
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500, headers }
    )
  }
}
