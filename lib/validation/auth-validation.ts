import { object, string } from 'zod'

export const signInSchema = object({
  username: string({ required_error: 'Felhasználónév kötelező' }).min(1, 'Felhasználónév kötelező'),
  password: string({ required_error: 'Jelszó kötelező' })
    .min(1, 'Jelszó kötelező')
    .min(4, 'A jelszó minimum 4 karakter lehet')
    .max(32, 'A jelszó maximum 32 karakter lehet'),
})
