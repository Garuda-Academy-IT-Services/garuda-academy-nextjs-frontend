import 'server-only'
import type { Video } from '../types/video-api.types'

export default async function getVideosByCategory(category: string): Promise<Video[]> {
  try {
    const res = await fetch(`${process.env.API_URL}/videos/get-by-category/${category}`)
    const data = await res.json()
    return data
  } catch (error) {
    console.error(error)
    return []
  }
}
