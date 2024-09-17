/** @type {import('tailwindcss').Config} */
const config = {
  darkMode: ['class'],
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)'],
        display: ['var(--font-display)'],
        mono: ['var(--font-mono)'],
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
        full: '9999px',
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          1: 'hsl(var(--chart-1))',
          2: 'hsl(var(--chart-2))',
          3: 'hsl(var(--chart-3))',
          4: 'hsl(var(--chart-4))',
          5: 'hsl(var(--chart-5))',
        },
      },
      backgroundImage: {
        'dark-gradient': `linear-gradient(12deg, rgba(193, 193, 193,0.05) 0%, rgba(193, 193, 193,0.05) 2%,rgba(129, 129, 129,0.05) 2%, rgba(129, 129, 129,0.05) 27%,rgba(185, 185, 185,0.05) 27%, rgba(185, 185, 185,0.05) 66%,rgba(83, 83, 83,0.05) 66%, rgba(83, 83, 83,0.05) 100%),
                          linear-gradient(321deg, rgba(240, 240, 240,0.05) 0%, rgba(240, 240, 240,0.05) 13%,rgba(231, 231, 231,0.05) 13%, rgba(231, 231, 231,0.05) 34%,rgba(139, 139, 139,0.05) 34%, rgba(139, 139, 139,0.05) 71%,rgba(112, 112, 112,0.05) 71%, rgba(112, 112, 112,0.05) 100%),
                          linear-gradient(236deg, rgba(189, 189, 189,0.05) 0%, rgba(189, 189, 189,0.05) 47%,rgba(138, 138, 138,0.05) 47%, rgba(138, 138, 138,0.05) 58%,rgba(108, 108, 108,0.05) 58%, rgba(108, 108, 108,0.05) 85%,rgba(143, 143, 143,0.05) 85%, rgba(143, 143, 143,0.05) 100%),
                          linear-gradient(96deg, rgba(53, 53, 53,0.05) 0%, rgba(53, 53, 53,0.05) 53%,rgba(44, 44, 44,0.05) 53%, rgba(44, 44, 44,0.05) 82%,rgba(77, 77, 77,0.05) 82%, rgba(77, 77, 77,0.05) 98%,rgba(8, 8, 8,0.05) 98%, rgba(8, 8, 8,0.05) 100%),
                          linear-gradient(334deg, hsl(247,0%,2%),hsl(247,0%,2%))`,
        'light-gradient': `linear-gradient(12deg, rgba(243, 243, 243, 0.5) 0%, rgba(243, 243, 243, 0.5) 2%, rgba(225, 225, 225, 0.5) 2%, rgba(225, 225, 225, 0.5) 27%, rgba(250, 250, 250, 0.5) 27%, rgba(250, 250, 250, 0.5) 66%, rgba(200, 200, 200, 0.5) 66%, rgba(200, 200, 200, 0.5) 100%),
                          linear-gradient(321deg, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0.5) 13%, rgba(245, 245, 245, 0.5) 13%, rgba(245, 245, 245, 0.5) 34%, rgba(230, 230, 230, 0.5) 34%, rgba(230, 230, 230, 0.5) 71%, rgba(215, 215, 215, 0.5) 71%, rgba(215, 215, 215, 0.5) 100%),
                          linear-gradient(236deg, rgba(240, 240, 240, 0.5) 0%, rgba(240, 240, 240, 0.5) 47%, rgba(220, 220, 220, 0.5) 47%, rgba(220, 220, 220, 0.5) 58%, rgba(210, 210, 210, 0.5) 58%, rgba(210, 210, 210, 0.5) 85%, rgba(235, 235, 235, 0.5) 85%, rgba(235, 235, 235, 0.5) 100%),
                          linear-gradient(96deg, rgba(245, 245, 245, 0.5) 0%, rgba(245, 245, 245, 0.5) 53%, rgba(235, 235, 235, 0.5) 53%, rgba(235, 235, 235, 0.5) 82%, rgba(220, 220, 220, 0.5) 82%, rgba(220, 220, 220, 0.5) 98%, rgba(210, 210, 210, 0.5) 98%, rgba(210, 210, 210, 0.5) 100%),
                          linear-gradient(334deg, hsl(0, 0%, 96%), hsl(0, 0%, 96%))`,
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}

export default config
