// prettier-ignore
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from './ui/button'
import { LoginForm } from './login-form'
import { Separator } from './ui/separator'
import { OAuthButton } from './oauth-button'

export function AuthDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='default' size={'sm'}>
          Bejelentkezés
        </Button>
      </DialogTrigger>
      <DialogContent className='w-auto max-w-sm px-0 pt-0'>
        <DialogHeader className='space-y-0'>
          <DialogTitle className='sr-only'>Bejelentkezés</DialogTitle>
          <DialogDescription className='sr-only'>Bejelentkezés űrlap</DialogDescription>
          <LoginForm />
          <Separator />
          <div className='flex justify-center gap-4 pt-6'>
            <OAuthButton provider='github' />
            <OAuthButton provider='google' />
            {/* <OAuthButton provider='discord' /> */}
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
