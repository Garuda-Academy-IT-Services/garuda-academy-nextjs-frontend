export default function Page({ params }: { params: { id: string } }) {
  return <div>Video ID: {params.id}</div>
}
