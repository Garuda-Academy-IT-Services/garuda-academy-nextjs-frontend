import { BreadcrumbsWrapper } from '@/components/breadcrumbs-wrapper'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='h-full p-2 md:p-6'>
      <BreadcrumbsWrapper />
      {children}
    </div>
  )
}
