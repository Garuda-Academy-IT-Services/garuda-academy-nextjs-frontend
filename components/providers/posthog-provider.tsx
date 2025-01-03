'use client'
import posthog from 'posthog-js'
import { PostHogProvider as Provider } from 'posthog-js/react'

const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY?.trim()
const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST?.trim()
const isValidConfig = Boolean(posthogKey?.trim() && posthogHost?.trim())

if (isValidConfig && typeof window !== 'undefined') {
  if (window.location.hostname !== 'localhost') {
    posthog.init(posthogKey ?? '', {
      api_host: posthogHost ?? '',
      person_profiles: 'identified_only',
    })
  }
}

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  if (!isValidConfig) return null

  return <Provider client={posthog}>{children}</Provider>
}
