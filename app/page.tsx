import { Button } from '@/components/ui/button'

export default function Page() {
  return (
    <div className='flex-center h-full gap-10'>
      <div>
        <h1 className='text-4xl font-bold'>
          Learn to <span className='text-yellow-500'>code</span>.
        </h1>
        <h1 className='text-4xl font-bold'>
          Build <span className='text-yellow-500'>projects</span>.
        </h1>
      </div>
      <Button>Get Started</Button>
    </div>
  )
}
