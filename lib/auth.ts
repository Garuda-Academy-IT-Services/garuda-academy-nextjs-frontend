/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import 'next-auth/jwt'

import NextAuth from 'next-auth'
import GitHub from 'next-auth/providers/github'
import Google from 'next-auth/providers/google'
import Credentials from 'next-auth/providers/credentials'
import signInWithCredentials from './video-api/auth/signin-with-credentials'
import { signInFormSchema } from './validation/auth-validation'
import { logger } from '@/lib/logger'
// import getAccessToken from './video-api/auth/get-access-token'

interface UserJWT {
  role?: string
  permissions?: string[]
  accessToken?: string
}

declare module 'next-auth' {
  interface User extends UserJWT {
    username?: string
  }
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
        username: { label: 'Username' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        try {
          const { username, password } = await signInFormSchema.parseAsync(credentials)
          logger.info('Attempting credentials authentication', { username })

          const response = await signInWithCredentials(username, password)

          if (!('user' in response)) {
            logger.warn('Authentication failed - no user in response', { username })
            return null
          }

          logger.info('Authentication successful', {
            userId: response.user.id,
            username: response.user.username,
          })
          return {
            id: response.user.id.toString(),
            email: response.user.email,
            username: response.user.username,
            name: response.user.name ?? 'Unknown User',
            image: response.user.pictureUrl,
            role: response.user.role.name,
            permissions: [],
            accessToken: 'jwt' in response ? response.jwt : undefined,
          }
        } catch (error) {
          logger.error('Authentication error', {
            error: error instanceof Error ? error.message : 'Unknown error',
            username: credentials?.username,
          })
          return null
        }
      },
    }),
  ],
  callbacks: {
    authorized: ({ auth }) => {
      const isAuthorized = !!auth
      logger.debug('Authorization check', {
        isAuthorized,
        userId: auth?.user?.id,
      })
      return isAuthorized
    },
    jwt: async ({ token, user, account }) => {
      // Initial sign in
      if (account && user) {
        logger.info('JWT callback - initial sign in', {
          provider: account.provider,
          userId: user.id,
        })

        // Get access token for OAuth providers (GitHub and Google for now) and add it to the session token
        // if (account.provider === 'github' || account.provider === 'google') {
        //   try {
        //     const response: SignInResponse = await getAccessToken({ account, user })

        //     if ('user' in response && 'jwt' in response) {
        //       return {
        //         ...token,
        //         role: response.user.role.name,
        //         permissions: [],
        //         accessToken: response.jwt,
        //       }
        //     }
        //   } catch (error) {
        //     console.error('Failed to get access token:', error)
        //     return token
        //   }
        // }

        // Add role, permissions and access token to the session token
        return {
          ...token,
          role: user.role,
          permissions: user.permissions,
          accessToken: user.accessToken,
        }
      }
      return token
    },
    session: ({ session, token }) => {
      if (token.sub) {
        logger.debug('Session callback - updating session', {
          userId: token.sub,
          role: token.role,
        })

        session.user.id = token.sub
        session.user.role = token.role
        session.user.permissions = token.permissions
        session.user.accessToken = token.accessToken
      }

      return session
    },
  },
  pages: {
    signOut: '/',
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
