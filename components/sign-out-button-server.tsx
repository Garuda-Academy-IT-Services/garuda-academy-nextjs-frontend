import 'server-only'

import { signOut } from '@/lib/auth'
import { Button } from './ui/button'

export function SignOutButtonServer() {
  return (
    <form
      action={async () => {
        'use server'
        await signOut({ redirectTo: '/' })
      }}
    >
      <Button type='submit' variant={'ghost'} size={'sm'}>
        Kijelentkezés
      </Button>
    </form>
  )
}
