import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { auth } from '@/lib/auth'
import Image from 'next/image'
import { redirect } from 'next/navigation'

export default async function Page() {
  const session = await auth()

  if (!session) redirect('/')

  const { user } = session

  return (
    <div>
      <Card className='bg-card/60 backdrop-blur'>
        <CardHeader>
          <CardTitle>Profilom</CardTitle>
          <CardDescription>Itt találod a regisztrált adataid, valamint a fiókod beállításait</CardDescription>
        </CardHeader>
        <CardContent className='flex gap-6'>
          <div className='h-auto w-36 overflow-clip rounded-lg'>
            <Image
              src={user.image ?? 'https://placehold.co/200x200@2x.png'}
              alt={user.image ? `${user.name}'s profile picture` : 'No profile picture'}
              width={600}
              height={400}
              priority
            />
          </div>
          <div className='py-2'>
            <p className='text-sm'>Név</p>
            <p className='font-semibold'>{user.name}</p>
            <br />
            <p className='text-sm'>Email</p>
            <p className='font-semibold'>{user.email}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
