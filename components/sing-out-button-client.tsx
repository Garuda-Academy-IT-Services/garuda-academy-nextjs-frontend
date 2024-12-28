'use client'
import { signOut } from 'next-auth/react'
import { Button } from './ui/button'
import { logger } from '@/lib/logger'

export function SignOutButtonClient() {
  const protocol = window.location.protocol
  const hostName = window.location.hostname
  const redirectTo = `${protocol}//${hostName}`

  logger.debug('SignOutButtonClient', {
    protocol,
    hostName,
    redirectTo,
  })

  return (
    <Button onClick={() => signOut({ redirectTo })} size={'sm'} variant={'ghost'}>
      Kijelentkezés
    </Button>
  )
}
