import { z } from 'zod'

export const roleSchema = z.object({
  id: z.number(),
  name: z.string(),
})

export const userSchema = z.object({
  id: z.number(),
  username: z.string(),
  email: z.string(),
  pictureUrl: z.string().url().nullable(),
})

export const signInFormSchema = z.object({
  username: z.string({ required_error: 'Felhasználónév kötelező' }).min(1, 'Felhasználónév kötelező').trim(),
  password: z
    .string({ required_error: 'Jelszó kötelező' })
    .min(1, 'Jelszó kötelező')
    .min(4, 'A jelszó minimum 4 karakter lehet')
    .max(32, 'A jelszó maximum 32 karakter lehet')
    .trim(),
})

export const signUpFormSchema = z
  .object({
    firstname: z.string().min(2, { message: 'A keresztnévnek legalább 2 betűt kell tartalmaznia' }).trim(),
    lastname: z.string().min(2, { message: 'A vezetéknévnek legalább 2 betűt kell tartalmaznia' }).trim(),
    email: z.string().email({ message: 'Érvényes email címnek kell lennie' }).trim(),
    password: z
      .string()
      .min(8, { message: 'A jelszónak legalább 8 karaktert kell tartalmaznia' })
      .max(32, { message: 'A jelszónak maximum 32 karakter lehet' })
      .regex(/[a-zA-Z]/, { message: 'Legalább egy betűt tartalmaznia kell' })
      .regex(/[0-9]/, { message: 'Legalább egy számot tartalmaznia kell' })
      .regex(/[^a-zA-Z0-9]/, {
        message: 'Legalább egy nem alfanumerikus karaktert tartalmaznia kell',
      })
      .trim(),
    passConf: z.string().min(1, { message: 'Add meg a választott jelszavad ismét' }).trim(),
  })
  .refine((data) => data.password === data.passConf, {
    message: 'A megadott jelszavak nem egyeznek',
    path: ['passConf'],
  })

export const signInSuccessSchema = z.object({
  jwt: z.string(),
  user: userSchema.extend({
    role: roleSchema,
  }),
})

export const signInErrorSchema = z.object({
  message: z.string(),
})

export const signInResponseSchema = z.union([signInSuccessSchema, signInErrorSchema])

export type SignInFormData = z.infer<typeof signInFormSchema>
export type SignUpFormData = z.infer<typeof signUpFormSchema>
export type SignInResponse = z.infer<typeof signInResponseSchema>
