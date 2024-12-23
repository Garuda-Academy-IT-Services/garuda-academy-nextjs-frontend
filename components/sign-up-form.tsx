'use client'

import type { SignUpFormData } from '@/lib/types/common.types'
import type { User } from 'next-auth'
import type { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { generateSignupToken, sendEmail } from '@/lib/mailer/actions/sendEmail'
import { signUpFormSchema } from '@/lib/validation/auth-validation'
import { signup } from '@/lib/video-api/auth/actions/auth-actions'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { FormInputField } from './form-input-field'
import { Form } from './ui/form'
import { Spinner } from './ui/loader'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import Link from 'next/link'

interface UserWithEmail extends User {
  email: string;
}

export function SignUpForm() {
  const router = useRouter()
  const defaultValues: SignUpFormData = { username: '', email: '', password: '', passConf: '' }
  const resolver = zodResolver(signUpFormSchema)
  const form = useForm<SignUpFormData>({ resolver, defaultValues })

  const handleFormError = (errorMessage: string) => {
    //TODO: typo in the error message
    if (errorMessage.includes('email') || errorMessage.includes('felhaszálónév')) {
      form.setError('email', { message: errorMessage })
    }
    if (errorMessage.includes('password') || errorMessage.includes('jelszó')) {
      form.setError('password', { message: errorMessage })
    }
  }

  function isUserWithEmail(user: User): user is UserWithEmail {
    return typeof user.email === 'string'
  }

  const handleFormSuccess = async (res: User) => {
    if (!isUserWithEmail(res)) {
      console.error('User is missing required email');
      return;
    }

    const signupToken = await generateSignupToken(res.email);

    try {
      await sendEmail({
        to: res.email,
        subject: '[TEST] Welcome to Garuda Academy',
        purpose: 'signup',
        signupToken,
        name: res.email.split('@')[0],
      });

      const result = await signIn('credentials', {
        username: res.username,
        password: form.getValues('password'),
        redirect: false,
      });

      if (result?.error) {
        console.error('Auto login failed:', result.error);
      } else {
        router.refresh();
      }
    } catch (error) {
      console.error('Error sending confirmation email:', error);
      alert((error as Error).message)
    }
  };

  async function onSubmit(values: z.infer<typeof signUpFormSchema>) {
    const res = await signup(values)

    if ('errorName' in res) handleFormError(res.message)
    if ('id' in res) await handleFormSuccess(res)
  }

  return (
    <Card className='mx-auto max-w-sm border-none bg-transparent'>
      <CardHeader>
        <CardTitle className='text-2xl text-yellow-500'>Regisztráció</CardTitle>
        <CardDescription>Add meg az alábbi adataid a fiók létrehozásához, vagy válassz más módot</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <FormInputField control={form.control} name='username' type='text' placeholder='' label='Felhasználónév' />
            <FormInputField control={form.control} name='email' type='email' placeholder='' label='Email' />
            <FormInputField control={form.control} name='password' type='password' placeholder='' label='Jelszó' />
            <FormInputField control={form.control} name='passConf' type='password' placeholder='' label='Jelszó ismét' />
            <Button type='submit' className='w-full'>
              {form.formState.isSubmitting ? <Spinner size='sm' /> : 'Fiók létrehozása'}
            </Button>
            <div className='mt-4 text-center text-sm'>
              Már van fiókod?{' '}
              <Link href='?action=signin' className='underline'>
                Jelentkezz be
              </Link>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
