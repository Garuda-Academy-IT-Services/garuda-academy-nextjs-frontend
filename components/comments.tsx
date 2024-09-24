const CommentsList = () => {
  return <div>CommentsList</div>
}

const CommentsForm = () => {
  return <div>CommentsForm</div>
}

export function Comments() {
  return (
    <div className='flex flex-col gap-4'>
      <CommentsList />
      <CommentsForm />
    </div>
  )
}
