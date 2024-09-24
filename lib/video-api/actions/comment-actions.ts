'use server'

const comments: string[] = []

export async function addComment(formData: FormData) {
  const comment = formData.get('comment') as string
  if (comment.trim()) {
    comments.push(comment)
  }
}
