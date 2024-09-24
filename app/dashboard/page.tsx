import type { Session } from 'next-auth'

import { AdminDashboard } from '@/components/admin-dashboard'
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'

interface User {
  role?: string
}

type ExtendedSession = Session & {
  user?: User
}

// * This page is only accessible to admin users *
export default async function Page() {
  const session = (await auth()) as ExtendedSession
  const userRole = session?.user?.role

  if (userRole === 'admin') {
    return <AdminDashboard />
  } else {
    redirect('/login')
  }
}
