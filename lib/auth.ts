import type { User } from 'next-auth'

import NextAuth from 'next-auth'
import GitHub from 'next-auth/providers/github'
import Google from 'next-auth/providers/google'
import Credentials from 'next-auth/providers/credentials'
import loginUser from './video-api/login-user'
import { signInSchema } from './validation/auth-validation'

type Credentials = {
  username: string
  password: string
}

// TODO: augment CredentialsInput type instead of redefining it

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GitHub,
    Google,
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        username: { label: 'Felhasználónév' },
        password: { label: 'Jelszó', type: 'password' },
      },
      authorize: async (credentials) => {
        let user = null
        // Validate credentials with Zod schema
        const { username, password } = await signInSchema.parseAsync(credentials)

        // ** We are on server side, so we could do the following **
        // logic to salt and hash password
        // const pwHash = saltAndHashPassword(credentials.password)
        // logic to verify if the user exists
        // user = await getUserFromDb(credentials.email, pwHash)

        const response = await loginUser(username, password)
        const { jwt } = response

        //TODO: get real user from db

        if (jwt) {
          user = {
            id: '1',
            name: 'Test User',
            email: 'test@test.com',
            image: 'https://placehold.co/200x200@2x.png',
          } as User
        }

        if (!user) {
          // No user found, so this is their first attempt to login
          // meaning this is also the place you could do registration
          throw new Error('User not found.')
        }

        // return user object with their profile data
        return user
      },
    }),
  ],
  callbacks: {
    authorized: async ({ auth }) => {
      // Logged in users are authenticated, otherwise redirect to login page
      return !!auth
    },
  },
})
