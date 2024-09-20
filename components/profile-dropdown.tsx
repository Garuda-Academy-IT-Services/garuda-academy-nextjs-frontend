'use client'

import type { Session } from 'next-auth'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import UserAvatar from './user-avatar'
import { SignOutButtonClient } from './sing-out-button-client'
import { useRouter } from 'next/navigation'
import { Button } from './ui/button'
import { useTheme } from 'next-themes'
import { Moon, Sun } from 'lucide-react'

export function ProfileDropdown(session: Partial<Session>) {
  const router = useRouter()
  const { setTheme } = useTheme()

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger>
        <UserAvatar user={session?.user} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='rounded-lg p-3'>
        <DropdownMenuLabel className='select-none'>Beállítások</DropdownMenuLabel>
        <div className='flex gap-1'>
          <Button
            variant='ghost'
            size='icon'
            onClick={() => setTheme('light')}
            className='w-full bg-accent dark:bg-transparent dark:hover:bg-accent'
          >
            <Sun className='h-[1.2rem] w-[1.2rem]' />
            <span className='sr-only'>Világos téma</span>
          </Button>
          <Button variant='ghost' size='icon' onClick={() => setTheme('dark')} className='w-full dark:bg-accent'>
            <Moon className='h-[1.2rem] w-[1.2rem]' />
            <span className='sr-only'>Sötét téma</span>
          </Button>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => router.push('/profile')}>Profilom</DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push('/billing')}>Előfizetésem</DropdownMenuItem>
        <DropdownMenuSeparator />
        <SignOutButtonClient />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
