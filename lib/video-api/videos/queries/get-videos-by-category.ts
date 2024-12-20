import 'server-only'
import type { Video } from '@/lib/types/video-api.types'

export default async function getVideosByCategory(category: string): Promise<Video[]> {
  try {
    const res = await fetch(`${process.env.API_URL}/videos/get-by-category/${category}`)
    const data = (await res.json()) as Video[]
    return data
  } catch (error) {
    console.error(error)
    return []
  }
}
