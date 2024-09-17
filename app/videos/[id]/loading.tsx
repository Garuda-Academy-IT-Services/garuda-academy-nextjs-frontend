export default function Loading() {
  return (
    <div className='flex h-full w-full flex-col items-center justify-center gap-4'>
      <div className='flex h-20 w-20 animate-spin items-center justify-center rounded-full border-4 border-transparent border-t-yellow-500 text-4xl text-yellow-500'>
        <div className='flex h-16 w-16 animate-spin items-center justify-center rounded-full border-4 border-transparent border-t-black/50 text-2xl text-black/50 dark:border-t-white dark:text-white'></div>
      </div>
    </div>
  )
}
