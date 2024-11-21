import { AdminDashboard } from '@/components/admin-dashboard'
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function Page() {
  const session = await auth()
  const userRole = session?.user?.role

  if (userRole !== 'admin') redirect('/api/auth/signin')

  return <AdminDashboard />
}
