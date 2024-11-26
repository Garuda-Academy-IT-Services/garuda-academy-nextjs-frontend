'use client'
// prettier-ignore
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from './ui/button'
import { Separator } from './ui/separator'
import { LoginForm } from './login-form'
import { useSearchParams } from 'next/navigation'
import { SignUpForm } from './sign-up-form'

export function AuthDialog({ children }: { children: React.ReactNode }) {
  const params = useSearchParams()
  const isSignUp = params.get('action') === 'signup'

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='default' size={'sm'}>
          Bejelentkezés
        </Button>
      </DialogTrigger>
      <DialogContent className='max-h-screen w-auto max-w-sm overflow-y-auto px-0 pt-0 mt-6'>
        <DialogHeader>
          <div 
            key={isSignUp ? 'signup-content' : 'login-content'}
            className='space-y-0'
          >
            <DialogTitle className='sr-only'>
              {isSignUp ? 'Regisztráció' : 'Bejelentkezés'}
            </DialogTitle>
            <DialogDescription className='sr-only'>
              {isSignUp ? 'Regisztráció űrlap' : 'Bejelentkezés űrlap'}
            </DialogDescription>
            {isSignUp ? <SignUpForm /> : <LoginForm />}
            <Separator />
            {children}
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
