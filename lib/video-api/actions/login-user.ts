'use server'

import type { SignInResponse } from '@/lib/validation/auth-validation'

export default async function signInWithCredentials(username: string, password: string): Promise<SignInResponse> {
  try {
    const res = await fetch(`${process.env.API_URL}/authentication/authenticate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })

    if (!res.ok) {
      return { message: 'A felhasználónév vagy jelszó nem megfelelő.' }
    }
    const data: SignInResponse = await res.json()
    return data
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error during sign in.'
    return {
      message: errorMessage,
    }
  }
}
