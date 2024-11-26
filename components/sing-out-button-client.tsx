'use client'
import { signOut } from 'next-auth/react'
import { Button } from './ui/button'

export function SignOutButtonClient() {
  return (
    <Button onClick={() => signOut({ redirectTo: '/' })} size={'sm'} variant={'ghost'}>
      Kijelentkezés
    </Button>
  )
}
