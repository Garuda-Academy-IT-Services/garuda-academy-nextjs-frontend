'use client'

type Props = {
  videoId: string
  className?: string
}

export function YoutubeEmbed({ videoId, className }: Props) {
  return (
    <iframe
      src={`https://www.youtube.com/embed/${videoId}`}
      title='YouTube video player'
      allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
      allowFullScreen
      className={className}
    />
  )
}
