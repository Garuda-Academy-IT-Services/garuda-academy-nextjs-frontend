// prettier-ignore
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from './ui/button'
import { LoginForm } from './login-form'

export function AuthDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='default' size={'sm'}>
          Bejelentkezés
        </Button>
      </DialogTrigger>
      <DialogContent className='w-auto border-none p-0'>
        <DialogHeader className='space-y-0'>
          <DialogTitle className='sr-only'>Bejelentkezés</DialogTitle>
          <DialogDescription className='sr-only'>Bejelentkezés űrlap</DialogDescription>
          <LoginForm />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
