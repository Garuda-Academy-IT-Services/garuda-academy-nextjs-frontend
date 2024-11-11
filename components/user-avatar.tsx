import type { Session } from 'next-auth'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export default function UserAvatar(session: Partial<Session>) {
  if (!session.user) return null

  function getInitials(name: string) {
    if (!name || !name.includes(' ')) return 'XX'

    const firstName = name.split(' ')[0].toUpperCase()
    const lastName = name.split(' ')[1].toUpperCase()
    return firstName[0] + lastName[0]
  }

  return (
    <Avatar className='border-2 border-yellow-500 outline-offset-2 transition-opacity hover:cursor-pointer hover:opacity-90'>
      <AvatarImage src={session.user.image ?? ''} />
      <AvatarFallback>{getInitials(session.user.name ?? '')}</AvatarFallback>
    </Avatar>
  )
}
