import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { categories } from '@/lib/video-api/categories'
import getVideosByCategory from '@/lib/video-api/get-videos-by-category'
import Image from 'next/image'
import Link from 'next/link'

type Props = {
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function Page({ searchParams }: Props) {
  const category = searchParams.category as string
  const videos = await getVideosByCategory(category)

  return (
    <div className='gap-10'>
      <div className='flex py-6'>
        <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          {category
            ? videos.map((video) => (
                <Link key={video.id} href={`/videos/${video.id}`}>
                  <Card className='flex h-full flex-col justify-between bg-black/5 pt-6 shadow transition-shadow hover:shadow-lg dark:bg-white/5 dark:transition-colors dark:hover:bg-white/10'>
                    <CardContent className='flex-center'>
                      <Image
                        src={`https://placehold.co/600x350/grey/darkgrey?text=${video.category.name}\\nvideo%20thumbnail&font=roboto`}
                        alt={video.name}
                        width={600}
                        height={400}
                        unoptimized
                        priority
                        className='object-cointain w-full rounded-md'
                      />
                    </CardContent>
                    <CardFooter>
                      <CardTitle className='text-base font-normal'>{video.name}</CardTitle>
                      <CardDescription>{video.description}</CardDescription>
                    </CardFooter>
                  </Card>
                </Link>
              ))
            : categories?.map((category) => (
                <Link key={category.id} href={`/videos?category=${category.id}`}>
                  <Card className='flex h-full flex-col justify-between bg-black/5 shadow transition-shadow hover:shadow-lg dark:bg-white/5 dark:transition-colors dark:hover:bg-white/10'>
                    <CardHeader>
                      <CardTitle>{category.name}</CardTitle>
                      <CardDescription>{category.description}</CardDescription>
                    </CardHeader>
                    <CardContent className='flex-center'>
                      <Image
                        src={category.logoUrl}
                        alt={category.name}
                        width={100}
                        height={100}
                        className='h-24 w-full object-contain'
                      />
                    </CardContent>
                  </Card>
                </Link>
              ))}
        </div>
      </div>
    </div>
  )
}
