import { AspectRatio } from '@/components/ui/aspect-ratio'
import { YoutubeEmbed } from '@/components/youtube-embed'
import getVideoById from '@/lib/video-api/get-video-by-id'

export default async function Page({ params }: { params: { id: string } }) {
  const video = await getVideoById(params.id)

  return (
    <AspectRatio ratio={16 / 9} className='overflow-clip rounded-lg bg-muted'>
      <YoutubeEmbed videoId={video.url} className='h-full w-full' />
    </AspectRatio>
  )
}
