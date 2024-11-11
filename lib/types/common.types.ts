import type { SignUpFormData } from '../validation/auth-validation'

type SignupFormState =
  | {
      errors?: {
        name?: string[]
        email?: string[]
        password?: string[]
        passConf?: string[]
      }
      message?: string
    }
  | undefined

export type { SignupFormState, SignUpFormData }
