import { Manrope, Anton } from 'next/font/google'

export const fontSans = Manrope({
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-sans',
  weight: '400',
})

export const fontDisplay = Anton({
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400'],
})

// export const fontMono = M_PLUS_Code_Latin({
//   display: 'swap',
//   subsets: ['latin'],
//   variable: '--font-mono',
//   weight: ['400', '500', '600', '700'],
// })
