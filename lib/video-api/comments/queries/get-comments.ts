import type { Comment } from '../types/video-api.types'

export default async function getCommentsByVideo(videoId: string) {
  try {
    const res = await fetch(`${process.env.API_URL}/comments/get-all-by-video/${videoId}`)
    const data = (await res.json()) as Comment[]
    return data
  } catch (error: unknown) {
    console.error(error)
    return []
  }
}
