import type { SignInResponse } from '@/lib/validation/auth-validation'
import type { Account, User } from 'next-auth'

import { handleApiError } from '@/lib/error-handler'
import { signInResponseSchema } from '@/lib/validation/auth-validation'

interface AccountAndUser {
  account: Account
  user: User
}

export default async function getAccessToken(accountAndUser: AccountAndUser): Promise<SignInResponse> {
  try {
    const res = await fetch(`${process.env.API_URL}/authentication/authenticate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(accountAndUser),
    })

    if (!res.ok) {
      const error = handleApiError(await res.json())
      throw new Error(error.message)
    }

    const validatedResponse = signInResponseSchema.parse(await res.json())
    return validatedResponse
  } catch (error) {
    throw error instanceof Error ? error : new Error('Failed to get access token')
  }
}
