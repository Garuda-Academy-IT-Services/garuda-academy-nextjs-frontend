'use client'

import type { SignupFormData } from '@/lib/types/common.types'
import type { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { signupSchema } from '@/lib/validation/auth-validation'
import { signup } from '@/lib/video-api/actions/auth-actions'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { FormInputField } from './form-input-field'
import { Form } from './ui/form'
import { Spinner } from './ui/loader'

export function SignUpForm() {
  const defaultValues = { firstname: '', lastname: '', email: '', password: '', passConf: '' }
  const resolver = zodResolver(signupSchema)
  const form = useForm<SignupFormData>({ resolver, defaultValues })

  const handleFormError = (errorMessage: string) => {
    if (errorMessage.includes('email') || errorMessage.includes('felhasználónév')) {
      form.setError('email', { message: errorMessage })
    }
    if (errorMessage.includes('password') || errorMessage.includes('jelszó')) {
      form.setError('password', { message: errorMessage })
    }
    if (errorMessage.includes('firstname') || errorMessage.includes('keresztnév')) {
      form.setError('firstname', { message: errorMessage })
    }
    if (errorMessage.includes('lastname') || errorMessage.includes('vezetéknév')) {
      form.setError('lastname', { message: errorMessage })
    }
  }

  const handleFormSuccess = (res: any) => {
    alert('Sikeres regisztráció')
    console.log('succcess res', res)
    form.reset()
  }

  async function onSubmit(values: z.infer<typeof signupSchema>) {
    const res = await signup(values)

    if (res.errorName) handleFormError(res.message)
    if (res.id) handleFormSuccess(res)
  }

  return (
    <Card className='mx-auto max-w-sm border-none bg-transparent'>
      <CardHeader>
        <CardTitle className='text-2xl text-yellow-500'>Regisztráció</CardTitle>
        <CardDescription>Add meg az alábbi adataid a fiók létrehozásához, vagy válassz egy más módot</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <div className='grid grid-cols-2 gap-4'>
              <FormInputField control={form.control} name='firstname' type='text' placeholder='' label='Keresztnév' />
              <FormInputField control={form.control} name='lastname' type='text' placeholder='' label='Vezetéknév' />
            </div>
            <FormInputField control={form.control} name='email' type='email' placeholder='' label='Email / Felhasználónév' />
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
