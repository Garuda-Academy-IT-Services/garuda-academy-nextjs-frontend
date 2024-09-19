import { signIn } from '@/lib/auth'
import { Button } from './ui/button'
import { GoogleIcon, GithubIcon, DiscordIcon } from './ui/provider-icons'

const providers = {
  github: {
    name: 'GitHub',
    icon: <GithubIcon />,
    key: 'github',
  },
  google: {
    name: 'Google',
    icon: <GoogleIcon />,
    key: 'google',
  },
  discord: {
    name: 'Discord',
    icon: <DiscordIcon />,
    key: 'discord',
  },
}

export function OAuthButton({ provider }: { provider: 'github' | 'google' | 'discord' }) {
  const { name, icon, key } = providers[provider]

  return (
    <form
      action={async () => {
        'use server'
        await signIn(key)
      }}
    >
      <Button type='submit' variant={'outline'} title={`Bejelentkezés ${name} fiókkal`} className='min-w-20'>
        {icon}
      </Button>
    </form>
  )
}
