import type { SignInResponse } from '@/lib/validation/auth-validation'
import { handleApiError } from '@/lib/error-handler'

// Do not handle errors here otherwise they won't be caught by next-auth
export default async function signInWithCredentials(username: string, password: string): Promise<SignInResponse> {
  try {
    const res = await fetch(`${process.env.API_URL}/authentication/authenticate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })

    const data = (await res.json()) as SignInResponse
    return data
  } catch (error) {
    console.error('Error during sign in:', error)
    return handleApiError(error)
  }
}
