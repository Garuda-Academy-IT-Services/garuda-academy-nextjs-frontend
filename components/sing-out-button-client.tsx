'use client'

import { signOut } from 'next-auth/react'
import { Button } from './ui/button'
import { logger } from '@/lib/logger'
import { useEffect, useState } from 'react'

export function SignOutButtonClient() {
  const [redirectTo, setRedirectTo] = useState<string | null>(null)

  useEffect(() => {
    const protocol = window.location.protocol
    const hostName = window.location.hostname

    setRedirectTo(`${protocol}//${hostName}`)
  }, [])

  useEffect(() => {
    logger.debug('SignOutButtonClient', { redirectTo })
  }, [redirectTo])

  function handleSignOut() {
    if (!redirectTo) return

    void signOut({ redirectTo })
  }

  return (
    <Button onClick={handleSignOut} size={'sm'} variant={'ghost'}>
      Kijelentkezés
    </Button>
  )
}
