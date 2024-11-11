import { z } from 'zod'

const apiErrorNames = [
  'SizePasswordError', // password length error
  'PasswordPasswordError', // password format error (missing letters, numbers, special characters)
  'JsonValidationError', // missing json property
  'SizeUsernameError', // username length error
  'UsernameAlreadyRegistered', // username already registered
  'EmailAlreadyRegistered', // email already registered
  'EmailEmailError', // email format error
  'BadCredentials', // bad credentials
] as const

const apiErrorStatuses = ['400', '401', '403', '404', '500', '503'] as const

export type ApiErrorName = (typeof apiErrorNames)[number]

export const videoApiErrorSchema = z.object({
  errorName: z.enum(apiErrorNames),
  message: z.string(),
  status: z.enum(apiErrorStatuses),
})

export type VideoApiError = z.infer<typeof videoApiErrorSchema>
