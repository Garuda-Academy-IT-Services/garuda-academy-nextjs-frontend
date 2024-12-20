import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { LRUCache } from 'lru-cache'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function rateLimit(options: { interval: number; uniqueTokenPerInterval: number; limit: number }) {
  const tokenCache = new LRUCache({
    max: options.uniqueTokenPerInterval || 500,
    ttl: options.interval || 60000,
  })

  return {
    check: (token: string) =>
      new Promise<void>((resolve, reject) => {
        const tokenCount = (tokenCache.get(token) as number[] | undefined) ?? [0]
        if (tokenCount[0] === 0) {
          tokenCache.set(token, [1])
        } else {
          tokenCount[0] += 1
          tokenCache.set(token, tokenCount)
        }
        if (tokenCount[0] > options.limit) {
          reject(new Error('Rate limit exceeded'))
        } else {
          resolve()
        }
      }),
  }
}
