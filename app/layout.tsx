import type { PropsWithChildren } from 'react'

import Footer from '@/components/layout/footer'
import Header from '@/components/layout/header'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { fontSans, fontDisplay, fontMono } from '@/lib/fonts'
import '@/styles/globals.css'

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html
      lang='en'
      className={`dark ${fontSans.variable} ${fontDisplay.variable} ${fontMono.variable}`}
      suppressHydrationWarning
    >
      <body className='grid min-h-[100dvh] max-w-screen-2xl grid-rows-[auto_1fr_auto]'>
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
          <Header />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
