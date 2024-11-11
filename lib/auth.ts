import type { User } from 'next-auth'
import type { SignInResponse } from './validation/auth-validation'

import NextAuth from 'next-auth'
import GitHub from 'next-auth/providers/github'
import Google from 'next-auth/providers/google'
import Credentials from 'next-auth/providers/credentials'
import signInWithCredentials from './video-api/actions/login-user'
import { signInFormSchema } from './validation/auth-validation'

type Credentials = {
  username: string
  password: string
}

// TODO: augment CredentialsInput type instead of redefining it
// For that we need to define the user's properties in the `user` object, such as:
// {
//   id: string
//   name: string
//   email: string
//   image: string
//   role: string
//   accessToken: string
//   expiresAt: number
// }

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GitHub,
    Google,
    Credentials({
      /// You can specify which fields should be submitted, by adding keys to the `credentials` object.
      /// e.g. domain, username, password, 2FA token, etc.
      credentials: {
        username: { label: 'Felhasználónév' },
        password: { label: 'Jelszó', type: 'password' },
      },
      authorize: async (credentials) => {
        let user: User | null = null

        try {
          /// Validate credentials with Zod schema
          const { username, password } = await signInFormSchema.parseAsync(credentials)

          // We are on server side, so we could do the following
          /// logic to salt and hash password
          /// const pwHash = saltAndHashPassword(credentials.password)
          /// logic to verify if the user exists
          /// user = await getUserFromDb(credentials.email, pwHash)

          const response: SignInResponse = await signInWithCredentials(username, password)

          console.log(response)

          if ('message' in response) {
            throw new Error(response.message)
          }

          if ('user' in response) {
            user = {
              id: response.user.id,
              name: response.user.username,
              email: response.user.email,
              image: response.user.pictureUrl,
            }
          }

          if (!user) {
            /// No user found, so this is their first attempt to login
            /// meaning this is also the place you could do registration
            throw new Error('User not found.')
          }

          /// return user object with their profile data
          return user
        } catch (error) {
          if (error instanceof Error) {
            throw new Error(error.message)
          }
          throw error
        }
      },
    }),
  ],
  callbacks: {
    authorized: ({ auth }) => {
      /// Logged in users are authenticated, otherwise redirect to login page
      return !!auth
    },
  },
})

/**
 ** Supported actions by Auth.js. Each action map to a REST API endpoint.
 ** Some actions have a `GET` and `POST` variant, depending on if the action
 ** changes the state of the server.
 **
 ** - **`"callback"`**:
 **   - **`GET`**: Handles the callback from an [OAuth provider](https://authjs.dev/reference/core/providers#oauth2configprofile).
 **   - **`POST`**: Handles the callback from a [Credentials provider](https://authjs.dev/getting-started/providers/credentials#credentialsconfigcredentialsinputs).
 ** - **`"csrf"`**: Returns the raw CSRF token, which is saved in a cookie (encrypted).
 ** It is used for CSRF protection, implementing the [double submit cookie](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html#double-submit-cookie) technique.
 ** :::note
 ** Some frameworks have built-in CSRF protection and can therefore disable this action. In this case, the corresponding endpoint will return a 404 response. Read more at [`skipCSRFCheck`](https://authjs.dev/reference/core#skipcsrfcheck).
 ** _⚠ We don't recommend manually disabling CSRF protection, unless you know what you're doing._
 ** :::
 ** - **`"error"`**: Renders the built-in error page.
 ** - **`"providers"`**: Returns a client-safe list of all configured providers.
 ** - **`"session"`**:
 **   - **`GET`**: Returns the user's session if it exists, otherwise `null`.
 **   - **`POST`**: Updates the user's session and returns the updated session.
 ** - **`"signin"`**:
 **   - **`GET`**: Renders the built-in sign-in page.
 **   - **`POST`**: Initiates the sign-in flow.
 ** - **`"signout"`**:
 **   - **`GET`**: Renders the built-in sign-out page.
 **   - **`POST`**: Initiates the sign-out flow. This will invalidate the user's session (deleting the cookie, and if there is a session in the database, it will be deleted as well).
 ** - **`"verify-request"`**: Renders the built-in verification request page.
 ** - **`"webauthn-options"`**:
 **   - **`GET`**: Returns the options for the WebAuthn authentication and registration flows.
 */
