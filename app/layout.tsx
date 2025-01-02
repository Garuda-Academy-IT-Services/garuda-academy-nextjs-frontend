import type { PropsWithChildren } from 'react'
import type { Metadata } from 'next'

import Footer from '@/components/layout/footer'
import Header from '@/components/layout/header'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { PostHogProvider } from '@/components/providers/posthog-provider'
import { fontSans, fontDisplay } from '@/lib/fonts'
import { SpeedInsights } from '@vercel/speed-insights/next'
import '@/styles/globals.css'

export const metadata: Metadata = {
  title: 'Garuda Academy',
  description: 'Garuda Academy',
  keywords: 'garuda academy, programming, learning, education',
}

const vercelInsights = process.env.NEXT_PUBLIC_VERCEL_SPEED_INSIGHTS === 'true'

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang='en' className={`${fontSans.variable} ${fontDisplay.variable}`} suppressHydrationWarning>
      <PostHogProvider>
        <body className='bg-light-gradient dark:bg-dark-gradient'>
          <div className='mx-auto grid min-h-[100dvh] max-w-screen-2xl grid-rows-[auto_1fr_auto]'>
            <ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
              <Header />
              <main>{children}</main>
              <Footer />
            </ThemeProvider>
          </div>
          {vercelInsights && <SpeedInsights />}
        </body>
      </PostHogProvider>
    </html>
  )
}
