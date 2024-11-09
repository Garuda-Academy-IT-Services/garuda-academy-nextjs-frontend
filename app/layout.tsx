import type { PropsWithChildren } from 'react'
import type { Metadata } from 'next'

import Footer from '@/components/layout/footer'
import Header from '@/components/layout/header'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { fontSans, fontDisplay, fontMono } from '@/lib/fonts'
import '@/styles/globals.css'

export const metadata: Metadata = {
  title: 'Garuda Academy',
  description: 'Garuda Academy',
  keywords: 'garuda academy, programming, learning, education',
}

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang='en' className={`${fontSans.variable} ${fontDisplay.variable} ${fontMono.variable}`} suppressHydrationWarning>
      <body className='bg-light-gradient dark:bg-dark-gradient'>
        <div className='mx-auto min-h-[100dvh] max-w-screen-2xl grid grid-rows-[auto_1fr_auto]'>
          <ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
            <Header />
            <main>{children}</main>
            <Footer />
          </ThemeProvider>
        </div>
      </body>
    </html>
  )
}
