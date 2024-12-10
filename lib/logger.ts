type LogLevel = 'debug' | 'info' | 'warn' | 'error'

export const logger = {
  debug: (message: string, meta?: object) => log('debug', message, meta),
  info: (message: string, meta?: object) => log('info', message, meta),
  warn: (message: string, meta?: object) => log('warn', message, meta),
  error: (message: string, meta?: object) => log('error', message, meta),
}

function log(level: LogLevel, message: string, meta?: object) {
  //TODO: add logging service (Winston, Pino)
  console.log(
    JSON.stringify({
      timestamp: new Date().toISOString(),
      level,
      message,
      ...meta,
    })
  )
}
