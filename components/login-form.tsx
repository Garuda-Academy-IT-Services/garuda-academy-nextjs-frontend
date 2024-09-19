'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { signInSchema } from '@/lib/validation/auth-validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { signIn } from 'next-auth/react'

export const description = 'Bejelentkezési űrlap'

export function LoginForm() {
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: { username: '', password: '' },
  })

  function onSubmit(values: z.infer<typeof signInSchema>) {
    signIn('credentials', { ...values })
  }

  return (
    <Card className='mx-auto max-w-sm max-sm:min-w-max'>
      <CardHeader>
        <CardTitle className='text-2xl text-yellow-500'>Bejelentkezés</CardTitle>
        <CardDescription>Add meg a felhasználóneved és jelszavad</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
            <FormField
              control={form.control}
              name='username'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Felhasználónév</FormLabel>
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
                  <FormLabel>Jelszó</FormLabel>
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
        {/* <div className='grid gap-2'>
            <Label htmlFor='email' className='text-start'>
              Felhasználónév
            </Label>
            <Input id='email' type='email' placeholder='email@pelda.hu' required />
          </div>
          <div className='grid gap-2'>
            <div className='flex items-center'>
              <Label htmlFor='password'>Jelszó</Label>
              <Link href='#' className='ml-auto inline-block text-sm underline'>
                Elfelejtetted a jelszavad?
              </Link>
            </div>
            <Input id='password' type='password' required />
          </div>
          <Button type='submit' className='w-full'>
            Bejelentkezés
          </Button> */}
        {/* <Separator />
          <div className='flex justify-center gap-4'>
            <OAuthButton provider='github' />
            <OAuthButton provider='google' />
            <OAuthButton provider='discord' />
          </div> */}
        <div className='mt-4 text-center text-sm'>
          Nincs még fiókod?{' '}
          <Link href='#' className='underline'>
            Regisztrálj!
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
