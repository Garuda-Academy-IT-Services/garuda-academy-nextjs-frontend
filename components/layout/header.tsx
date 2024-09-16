import Link from 'next/link'
import { ModeToggle } from '../mode-togle'

export default function Header() {
  return (
    <header className='sticky top-0 flex h-16 items-center justify-between bg-white/5 p-2 backdrop-blur md:h-20 md:p-6'>
      <Link href='/'>
        <h3 className='select-none font-display text-2xl md:text-3xl'>
          <span>GARUDA</span>
          <span className='text-yellow-500'>ACADEMY</span>
        </h3>
      </Link>
      <ModeToggle />
    </header>
  )
}
