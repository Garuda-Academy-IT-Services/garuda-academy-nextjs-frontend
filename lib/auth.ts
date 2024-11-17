import type { JWT } from 'next-auth/jwt'
import type { DefaultSession, User } from 'next-auth'
import type { SignInResponse } from './validation/auth-validation'

import NextAuth from 'next-auth'
import GitHub from 'next-auth/providers/github'
import Google from 'next-auth/providers/google'
import Credentials from 'next-auth/providers/credentials'
import signInWithCredentials from './video-api/actions/login-user'
import { signInFormSchema } from './validation/auth-validation'
import { handleInvalidLoginError } from './auth-errors'

interface UserJWT {
  /** Additional fields to be added to the user object */
  role?: string
  permissions?: string[]
  accessToken?: string
}

declare module 'next-auth' {
  interface User extends UserJWT {
    username?: string
  }

  interface Session extends DefaultSession {
    user: User & DefaultSession['user']
  }

  interface Account {}
}

declare module 'next-auth/jwt' {
  interface JWT extends UserJWT {}
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GitHub,
    Google,
    Credentials({
      credentials: {
        username: { label: 'Felhasználónév' },
        password: { label: 'Jelszó', type: 'password' },
      },
      authorize: async (credentials) => {
        let user: User | null = null

        try {
          const { username, password } = await signInFormSchema.parseAsync(credentials)
          const response: SignInResponse = await signInWithCredentials(username, password)

          if ('user' in response) {
            user = {
              id: response.user.id.toString(),
              email: response.user.email,
              username: response.user.username,
              name: 'Unknown User',
              image: response.user.pictureUrl,
              role: response.user.role.name,
              permissions: [],
            }
          }

          if ('jwt' in response && user) {
            user.accessToken = response.jwt
          }

          if (!user) {
            /// No user found, so this is their first attempt to login
            /// meaning this is also the place you could do registration
          }

          return user
        } catch (error) {
          handleInvalidLoginError(error)
          return null
        }
      },
    }),
  ],
  callbacks: {
    authorized: ({ auth }) => {
      return !!auth
    },
    jwt: ({ token, user }: { token: JWT; user?: User }) => {
      if (user) {
        token.role = user.role
        token.permissions = user.permissions
        token.accessToken = user.accessToken
      }
      return token
    },
    session: ({ session, token }) => {
      if (token.sub) {
        session.user.id = token.sub
        session.user.role = token.role
        session.user.permissions = token.permissions
        session.user.accessToken = token.accessToken
      }

      return session
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
