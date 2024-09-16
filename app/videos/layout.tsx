import { BreadcrumbsWrapper } from '@/components/breadcrumbs-wrapper'
import { Suspense } from 'react'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='h-full p-2 md:p-6'>
      <Suspense>
        <BreadcrumbsWrapper />
        {children}
      </Suspense>
    </div>
  )
}
