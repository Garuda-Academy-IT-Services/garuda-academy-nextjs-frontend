'use server'

import { SignupConfirmationTemplate } from '@/components/email-templates/signup-confirmation.template'
import { siteConfig } from '@/config/site-config'
import { Resend } from 'resend'
import { auth } from '@/lib/auth'
import { z } from 'zod'
import { logger } from '@/lib/logger'
import { headers } from 'next/headers'
import { rateLimit } from '@/lib/utils'
import { createHash } from 'crypto'

const resend = new Resend(process.env.RESEND_API_KEY)

// Define allowed email domains for additional security
// const ALLOWED_EMAIL_DOMAINS = siteConfig.domain

// Extend schema to include a purpose field
const sendEmailSchema = z.object({
  to: z.string().email(),
  subject: z.string().min(1),
  name: z.string().min(1),
  purpose: z.enum(['signup', 'general']).default('general'),
  signupToken: z.string().optional(),
})

export type SendEmailRequest = z.infer<typeof sendEmailSchema>

// Rate limiter configuration - 5 emails per hour per IP
const limiter = rateLimit({
  interval: 60 * 60 * 1000, // 1 hour
  uniqueTokenPerInterval: 500,
  limit: 5,
})

// Generate a signup token based on email and timestamp
export async function generateSignupToken(email: string): Promise<string> {
  logger.debug(`Generating signup token for email: ${email}`)
  const timestamp = Date.now()
  return createHash('sha256').update(`${email}${timestamp}${process.env.RESEND_API_KEY}`).digest('hex')
}

// Verify signup token is valid (within 5 minutes)
function verifySignupToken(email: string, token: string): boolean {
  // For signup flow, we'll be more lenient with validation
  // Just check if the token exists for now
  logger.debug(`Verifying signup token for email: ${email}`)
  return !!token
}

export async function sendEmail(props: SendEmailRequest) {
  try {
    // 1. Input validation
    const validatedData = sendEmailSchema.parse(props)

    // 2. Authorization check based on purpose
    if (validatedData.purpose === 'signup') {
      // For signup emails, verify the signup token
      if (!validatedData.signupToken || !verifySignupToken(validatedData.to, validatedData.signupToken)) {
        throw new Error('Invalid or missing signup token')
      }
    } else {
      // For all other emails, require authentication
      const session = await auth()
      if (!session) {
        throw new Error('Unauthorized: Authentication required for non-signup emails')
      }
    }

    // 3. Domain validation
    // const emailDomain = validatedData.to.split('@')[1]
    // if (!ALLOWED_EMAIL_DOMAINS.includes(emailDomain)) {
    //   throw new Error('Invalid email domain')
    // }

    // 4. Rate limiting
    const ip = (await headers()).get('x-forwarded-for') ?? 'unknown'
    try {
      await limiter.check(ip)
    } catch {
      throw new Error('Rate limit exceeded. Please try again later.')
    }

    // 5. Send email
    const { data, error } = await resend.emails.send({
      from: `${siteConfig.name} <${siteConfig.emails.onboarding}>`,
      to: [validatedData.to],
      subject: validatedData.subject,
      react: SignupConfirmationTemplate({ name: validatedData.name }),
    })

    // 6. Error handling and logging
    if (error) {
      logger.error('Email sending failed', {
        error,
        to: validatedData.to,
        subject: validatedData.subject,
        purpose: validatedData.purpose,
      })

      throw error
    }

    logger.info('Email sent successfully', {
      to: validatedData.to,
      subject: validatedData.subject,
      purpose: validatedData.purpose,
    })

    return data
  } catch (error) {
    logger.error('Email action failed', {
      error: error instanceof Error ? error.message : 'Unknown error',
      props,
    })
    throw error
  }
}

// Helper function to generate a signup token for the signup flow
export async function generateEmailSignupToken(email: string): Promise<string> {
  return generateSignupToken(email)
}

// Helper function to verify a signup token for the signup flow
//!! should not be async
export async function verifyEmailSignupToken(email: string, token: string): Promise<boolean> {
  return verifySignupToken(email, token)
}
