'use client'

import type { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { signInFormSchema } from '@/lib/validation/auth-validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { useRouter, useSearchParams } from 'next/navigation'

export function LoginForm() {
  const router = useRouter()
  const params = useSearchParams()
  const form = useForm<z.infer<typeof signInFormSchema>>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: { username: '', password: '' },
  })

  async function onSubmit(values: z.infer<typeof signInFormSchema>) {
    const result = await signIn('credentials', {
      ...values,
      redirect: false,
    })

    if (result?.error) {
      form.setError('root', {
        type: 'manual',
        message: result.error === 'CredentialsSignin' ? 'Helytelen a felhasználóneved vagy jelszavad' : result.error,
      })
    } else {
      // Remove action param when login success
      const newParams = new URLSearchParams(params)
      newParams.delete('action')
      router.push(`?${newParams.toString()}`)
      router.refresh()
    }
  }

  return (
    <Card className='mx-auto min-w-[350px] max-w-sm border-none bg-transparent'>
      <CardHeader>
        <CardTitle className='text-2xl text-yellow-500'>Bejelentkezés</CardTitle>
        <CardDescription>Add meg a felhasználóneved és jelszavad, vagy válassz más módot</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            {form.formState.errors.root && (
              <div className='text-sm text-red-500 dark:text-red-400'>{form.formState.errors.root.message}</div>
            )}
            <FormField
              control={form.control}
              name='username'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='inline-block w-full text-start'>Felhasználónév</FormLabel>
                  <FormControl>
                    <Input placeholder='' {...field} type='username' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <div className='flex justify-between'>
                    <FormLabel>Jelszó</FormLabel>
                    <Link href='#' className='ml-auto inline-block text-xs underline'>
                      Elfelejtetted a jelszavad?
                    </Link>
                  </div>
                  <FormControl>
                    <Input placeholder='' {...field} type='password' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type='submit' className='w-full'>
              Bejelentkezés
            </Button>
          </form>
        </Form>
        <div className='mt-4 text-center text-sm'>
          Nincs még fiókod?{' '}
          <Link href='?action=signup' className='underline'>
            Regisztrálj!
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
