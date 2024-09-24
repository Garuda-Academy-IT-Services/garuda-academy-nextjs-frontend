import { auth } from '@/lib/auth'
import Link from 'next/link'
import { AuthDialog } from '../auth-dialog'
import { ModeToggle } from '../mode-togle'
import { ProfileDropdown } from '../profile-dropdown'
import { OAuthButton } from '../oauth-button'

export default async function Header() {
  const session = await auth()

  return (
    <header className='sticky top-0 flex h-16 items-center justify-between bg-black/5 p-2 backdrop-blur dark:bg-white/5 md:h-20 md:p-6'>
      <Link href='/'>
        <h3 className='select-none font-display text-2xl md:text-3xl'>
          <span>GARUDA</span>
          <span className='text-yellow-500'>ACADEMY</span>
        </h3>
      </Link>
      <div className='flex items-center gap-4'>
        {session ? (
          <ProfileDropdown user={session?.user} />
        ) : (
          <AuthDialog>
            <div className='flex justify-center gap-4 pt-6'>
              <OAuthButton provider='github' />
              <OAuthButton provider='google' />
              {/* <OAuthButton provider='discord' /> */}
            </div>
          </AuthDialog>
        )}
        {!session ? <ModeToggle /> : null}
      </div>
    </header>
  )
}
