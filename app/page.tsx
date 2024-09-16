import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Page() {
  return (
    <div className='flex-center h-full gap-12'>
      <div>
        <h1 className='text-4xl font-bold'>
          Tanulj meg <span className='text-yellow-500'>kódolni</span>.
        </h1>
        <h1 className='text-4xl font-bold'>
          Építs <span className='text-yellow-500'>alkalmazásokat</span>.
        </h1>
      </div>
      <Link href='/videos'>
        <Button>Tovább</Button>
      </Link>
    </div>
  )
}
