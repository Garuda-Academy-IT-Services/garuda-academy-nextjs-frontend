'use server'

import type { SignUpFormData } from '@/lib/types/common.types'
import type { User } from 'next-auth'

import { signUpFormSchema } from '@/lib/validation/auth-validation'

export async function signup(values: SignUpFormData) {
  // Input validation with password confirmation
  const validatedFields = signUpFormSchema.safeParse(values)

  if (!validatedFields.success) {
    return {
      validationError: validatedFields.error,
      errorName: 'Validation Error',
      message: validatedFields.error.message,
      status: 400,
    }
  }

  try {
    const signupResponse = await createUser(validatedFields.data)
    return signupResponse
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error during sign up.'
    console.log('signup error', errorMessage)
    return {
      errorName: 'API Error',
      message: errorMessage,
      status: 500,
    }
  }
}

async function createUser(formData: Omit<SignUpFormData, 'passConf'>): Promise<User> {
  const res = await fetch(`${process.env.API_URL}/users/create`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: formData.email,
      email: formData.email,
      password: formData.password,
    }),
  })

  const jsonResponse = (await res.json()) as User | { message: string }

  if (!res.ok) throw new Error((jsonResponse as { message: string }).message)

  return jsonResponse as User
}
