'use client' // Error boundaries must be Client Components

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  function handleResetClick() {
    reset()
  }
  return (
    // global-error must include html and body tags
    <html>
      <body>
        <h2>Something went wrong!</h2>
        <p>{error.message}</p>
        <button onClick={handleResetClick}>Try again</button>
      </body>
    </html>
  )
}
