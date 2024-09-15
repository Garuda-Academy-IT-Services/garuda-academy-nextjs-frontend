import { ModeToggle } from '../mode-togle'

export default function Header() {
  return (
    <header className='flex h-20 items-center justify-between p-2 md:p-6'>
      <h3 className='font-display text-3xl'>
        <span>GARUDA</span>
        <span className='text-yellow-500'>ACADEMY</span>
      </h3>
      <ModeToggle />
    </header>
  )
}
