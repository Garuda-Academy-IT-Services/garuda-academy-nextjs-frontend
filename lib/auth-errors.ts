import { CredentialsSignin } from 'next-auth'
import { ZodError } from 'zod'

class InvalidLoginError extends CredentialsSignin {
  code = 'Invalid identifier or password'
}

export function handleInvalidLoginError(error: unknown) {
  if (error instanceof ZodError) {
    console.error('Zod error during login:', error.message)
    return
  }
  if (error instanceof InvalidLoginError) {
    throw error
  }
}
