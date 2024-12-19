import { AspectRatio } from '@/components/ui/aspect-ratio'
import { YoutubeEmbed } from '@/components/youtube-embed'
import getVideoById from '@/lib/video-api/videos/queries/get-video-by-id'

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params
  const video = await getVideoById(params.id)

  return (
    <AspectRatio ratio={16 / 9} className='overflow-clip rounded-lg bg-muted'>
      <YoutubeEmbed videoId={video.url} className='h-full w-full' />
    </AspectRatio>
  )
}
