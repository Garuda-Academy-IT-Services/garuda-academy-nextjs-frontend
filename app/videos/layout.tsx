import { BreadcrumbsWrapper } from '@/components/breadcrumbs-wrapper'
import { Suspense } from 'react'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className='h-full p-2 md:p-6'>
      <Suspense>
        <BreadcrumbsWrapper />
      </Suspense>
      {children}
    </section>
  )
}
