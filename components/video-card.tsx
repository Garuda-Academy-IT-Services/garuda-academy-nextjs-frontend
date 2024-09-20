import { Card, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Video } from '@/lib/types/video-api.types'
import { ThumbsUp } from 'lucide-react'
import Image from 'next/image'

interface VideoCardProps {
  video: Video
}

export function VideoCard({ video }: VideoCardProps) {
  return (
    <Card className='h-full w-full bg-black/5 shadow transition-shadow hover:shadow-lg dark:bg-white/5 dark:transition-colors dark:hover:bg-white/10'>
      <CardContent className='p-2 md:p-4'>
        <Image
          src={`https://img.youtube.com/vi/${video.url}/mqdefault.jpg`}
          alt={video.name}
          width={600}
          height={400}
          priority
          className='object-cointain w-full rounded-md'
        />
      </CardContent>
      <CardFooter className='flex justify-between p-2 !pt-0 md:p-4'>
        <CardTitle className='text-sm font-normal'>{video.name}</CardTitle>
        <CardDescription className='sr-only'>{video.description}</CardDescription>
        <div className='flex h-10 items-center justify-between gap-[6px]'>
          <ThumbsUp className='h-4 w-4' />
          <span className='translate-y-[1px] text-sm'>{video.userLike}</span>
        </div>
      </CardFooter>
    </Card>
  )
}
