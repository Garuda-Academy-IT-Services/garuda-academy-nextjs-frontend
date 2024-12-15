import 'server-only'
import type { Video } from '../types/video-api.types'

export default async function getVideoById(id: string): Promise<Video> {
  try {
    const res = await fetch(`${process.env.API_URL}/videos/get/${id}`)
    const data = (await res.json()) as Video
    return data
  } catch (error) {
    console.error(error)
    return {} as Video
  }
}
