export default async function getCommentsByVideo(videoId: string) {
  try {
    const res = await fetch(`${process.env.API_URL}/comments/get-all-by-video/${videoId}`)
    const data = await res.json()
    return data
  } catch (error) {
    console.error(error)
    return []
  }
}
