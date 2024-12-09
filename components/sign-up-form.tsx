'use client'

import type { SignUpFormData } from '@/lib/types/common.types'
import type { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { signUpFormSchema } from '@/lib/validation/auth-validation'
import { signup } from '@/lib/video-api/actions/auth-actions'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { FormInputField } from './form-input-field'
import { Form } from './ui/form'
import { Spinner } from './ui/loader'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import Link from 'next/link'

export function SignUpForm() {
  const router = useRouter()
  const defaultValues: SignUpFormData = { username: '', email: '', password: '', passConf: '' }
  const resolver = zodResolver(signUpFormSchema)
  const form = useForm<SignUpFormData>({ resolver, defaultValues })

  const handleFormError = (errorMessage: string) => {
    if (errorMessage.includes('email') || errorMessage.includes('felhasználónév')) {
      form.setError('email', { message: errorMessage })
    }
    if (errorMessage.includes('password') || errorMessage.includes('jelszó')) {
      form.setError('password', { message: errorMessage })
    }
  }

  const handleFormSuccess = async (res: any) => {
    alert('Sikeres regisztráció')

    // Sign in with the newly created credentials
    const result = await signIn('credentials', {
      username: res.username,
      password: form.getValues('password'),
      redirect: false,
    })

    if (result?.error) {
      console.error('Auto login failed:', result.error)
    } else {
      router.refresh()
    }
  }

  async function onSubmit(values: z.infer<typeof signUpFormSchema>) {
    const res = await signup(values)

    if ('errorName' in res) handleFormError(res.message)
    if ('id' in res) handleFormSuccess(res)
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
            {/* <div className='grid grid-cols-2 gap-4'>
              <FormInputField control={form.control} name='firstname' type='text' placeholder='' label='Keresztnév' />
              <FormInputField control={form.control} name='lastname' type='text' placeholder='' label='Vezetéknév' />
            </div> */}
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
