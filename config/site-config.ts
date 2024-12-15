import { Metadata } from 'next'

export const locales = ['en', 'es', 'hu'] as const
export type Locale = typeof locales[number]

type CommonMetadata = Omit<Metadata, 'title' | 'description' | 'keywords' | 'openGraph' | 'twitter'>

const commonMetadata: CommonMetadata = {
    creator: 'Attila Béli - https://topdev.top',
    publisher: 'Garuda Academy',
    robots: { index: false, follow: false },
    themeColor: [
        { media: '(prefers-color-scheme: light)', color: 'white' },
        { media: '(prefers-color-scheme: dark)', color: 'black' },
    ],
    viewport: 'width=device-width, initial-scale=1',
}

type LocaleSpecificMetadata = Pick<Metadata, 'title' | 'description' | 'keywords' | 'openGraph' | 'twitter'>

const localeSpecificMetadata: Record<Locale, LocaleSpecificMetadata> = {
    en: {
        title: 'Garuda Academy',
        description: 'Learn to code. Build applications.',
        keywords: 'garuda academy, programming, learning, education',
        openGraph: {
            title: 'Garuda Academy',
            description: 'Learn to code. Build applications.',
            images: [{ url: '/images/og-image-en.jpg', width: 1200, height: 630, alt: 'Garuda Academy' }],
        },
        twitter: {
            card: 'summary_large_image',
            title: 'Garuda Academy',
            description: 'Learn to code. Build applications.',
            images: ['/images/twitter-image-en.jpg'],
        },
    },
    es: {
        title: 'Garuda Academy',
        description: 'Aprende a programar. Construye aplicaciones.',
        keywords: 'academia garuda, programación, aprendizaje, educación',
        openGraph: {
            title: 'Garuda Academy',
            description: 'Aprende a programar. Construye aplicaciones.',
            images: [{ url: '/images/og-image-es.jpg', width: 1200, height: 630, alt: 'Garuda Academy' }],
        },
        twitter: {
            card: 'summary_large_image',
            title: 'Garuda Academy',
            description: 'Aprende a programar. Construye aplicaciones.',
            images: ['/images/twitter-image-es.jpg'],
        },
    },
    hu: {
        title: 'Garuda Academy',
        description: 'Tanulj meg kódolni. Építs alkalmazásokat.',
        keywords: 'garuda akadémia, programozás, tanulás, oktatás',
        openGraph: {
            title: 'Garuda Academy',
            description: 'Tanulj meg kódolni. Építs alkalmazásokat.',
            images: [{ url: '/images/og-image-hu.jpg', width: 1200, height: 630, alt: 'Garuda Academy' }],
        },
        twitter: {
            card: 'summary_large_image',
            title: 'Garuda Academy',
            description: 'Tanulj meg kódolni. Építs alkalmazásokat.',
            images: ['/images/twitter-image-hu.jpg'],
        },
    },
}

export const localizedMetadata: Record<Locale, Metadata> = Object.fromEntries(
    Object.entries(localeSpecificMetadata).map(([locale, metadata]) => [
        locale,
        { ...commonMetadata, ...metadata }
    ])
) as Record<Locale, Metadata>

const domain = process.env.IS_TEST ? process.env.HOST_DOMAIN_TEST : process.env.HOST_DOMAIN

export const siteConfig = {
    name: 'Garuda Academy',
    defaultLocale: 'en' as const,
    domain,
    locales,
    hostUrl: `https://${domain}`,
    author: 'Garuda Academy',
    emails: {
        contact: `contact@${domain}`,
        support: `support@${domain}`,
        noreply: `noreply@${domain}`,
        admin: `admin@${domain}`,
        onboarding: `onboarding@${domain}`,
        newsletter: `newsletter@${domain}`,
    },
    links: {
        github: 'https://github.com/garuda-academy',
    },
    socialMedia: {
        twitter: 'https://twitter.com/garudaacademy',
        facebook: 'https://facebook.com/garudaacademy',
        instagram: 'https://instagram.com/garudaacademy',
        linkedin: 'https://linkedin.com/company/garudaacademy',
    },
} as const;

export type SiteConfig = typeof siteConfig;