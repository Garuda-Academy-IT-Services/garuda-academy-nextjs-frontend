'use server'

import type { SignUpFormData } from '@/lib/types/common.types'
import type { User } from '@/lib/types/video-api.types'

import { signUpFormSchema } from '@/lib/validation/auth-validation'

export async function signup(values: SignUpFormData) {
  const validatedFields = signUpFormSchema.safeParse(values)

  if (!validatedFields.success) {
    return {
      validationError: validatedFields.error,
      errorName: 'Validation Error',
      message: validatedFields.error.message,
      status: 400,
    }
  }

  // TODO: doing password encryption and hashing might be best to be done here

  try {
    const signupData = checkPasswordsMatch(validatedFields.data)
    const signupResponse = await createUser(signupData)
    console.log('signupResponse', signupResponse)
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

function checkPasswordsMatch(data: SignUpFormData): Omit<SignUpFormData, 'passConf'> {
  const { username, email, password, passConf } = data
  if (password === passConf) {
    return {
      username,
      email,
      password,
    }
  }
  throw new Error('A megadott jelszavak nem egyeznek')
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
