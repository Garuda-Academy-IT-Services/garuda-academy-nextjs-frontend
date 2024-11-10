import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { VideoCard } from '@/components/video-card'
import { categories } from '@/lib/video-api/categories'
import getVideosByCategory from '@/lib/video-api/get-videos-by-category'
import Image from 'next/image'
import Link from 'next/link'

interface Props {
  searchParams: Record<string, string | string[] | undefined>
}

export default async function Page({ searchParams }: Props) {
  const category = searchParams.category as string // presence of this param means we are listing categories, not videos
  const videos = await getVideosByCategory(category)

  return (
    <div className='gap-10'>
      <div className='flex py-6'>
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          {category
            ? videos.map((video) => (
                <Link key={video.id} href={`/videos/${video.id}`}>
                  <VideoCard video={video} />
                </Link>
              ))
            : categories.map((category) => (
                <Link key={category.id} href={`/videos?category=${category.id}`}>
                  <Card className='flex h-full flex-col justify-between bg-black/5 shadow transition-shadow hover:shadow-lg dark:bg-white/5 dark:transition-colors dark:hover:bg-white/10'>
                    <CardHeader>
                      <CardTitle>{category.name}</CardTitle>
                      <CardDescription>{category.description}</CardDescription>
                    </CardHeader>
                    <CardContent className='flex items-center justify-center'>
                      <Image
                        src={category.logo.src || ''}
                        alt={category.name}
                        width={100}
                        height={100}
                        priority
                        className='h-24 w-full object-contain'
                      />
                      {category.logo2 ? (
                        <Image
                          src={category.logo2.src || ''}
                          alt={category.name}
                          width={100}
                          height={100}
                          priority
                          className='h-24 w-full object-contain'
                        />
                      ) : null}
                    </CardContent>
                  </Card>
                </Link>
              ))}
        </div>
      </div>
    </div>
  )
}
