'use client'
import { useSearchParams } from 'next/navigation'
import { Breadcrumbs } from './breadcrumbs'
import { categories } from '@/lib/video-api/categories'

export type Crumb = { href?: string; label: string }

export function BreadcrumbsWrapper() {
  const params = useSearchParams()
  const category = params.get('category')

  const getCategoryName = (id: string | null) => {
    const cat = categories?.find((category) => category.id === Number(id))?.name
    return cat || ''
  }

  const breadcrumbItems: Crumb[] = [
    { href: '/', label: 'Főoldal' },
    { href: '/videos', label: 'Videók' },
    // Add other routes here, based on the current route path
    { label: getCategoryName(category) },
  ]

  return <Breadcrumbs items={breadcrumbItems} />
}
