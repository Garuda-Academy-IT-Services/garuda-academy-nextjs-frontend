import { z } from 'zod'

export enum ErrorType {
  VALIDATION = 'VALIDATION',
  AUTHENTICATION = 'AUTHENTICATION',
  AUTHORIZATION = 'AUTHORIZATION',
  NOT_FOUND = 'NOT_FOUND',
  SERVER = 'SERVER',
  UNKNOWN = 'UNKNOWN',
}

export enum ErrorCode {
  // Auth related
  INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',
  SESSION_EXPIRED = 'SESSION_EXPIRED',
  UNAUTHORIZED = 'UNAUTHORIZED',

  // Validation related
  PASSWORD_TOO_SHORT = 'PASSWORD_TOO_SHORT',
  PASSWORD_INVALID_FORMAT = 'PASSWORD_INVALID_FORMAT',
  USERNAME_TOO_SHORT = 'USERNAME_TOO_SHORT',
  USERNAME_TAKEN = 'USERNAME_TAKEN',
  EMAIL_TAKEN = 'EMAIL_TAKEN',
  EMAIL_INVALID = 'EMAIL_INVALID',

  // Generic
  INVALID_REQUEST = 'INVALID_REQUEST',
  NOT_FOUND = 'NOT_FOUND',
  SERVER_ERROR = 'SERVER_ERROR',
}

export const errorMessages: Record<ErrorCode, string> = {
  INVALID_CREDENTIALS: 'A felhasználónév vagy jelszó nem megfelelő.',
  SESSION_EXPIRED: 'A munkamenet lejárt. Kérjük, jelentkezzen be újra.',
  UNAUTHORIZED: 'Nincs jogosultsága a művelet végrehajtásához.',
  PASSWORD_TOO_SHORT: 'A jelszó túl rövid.',
  PASSWORD_INVALID_FORMAT: 'A jelszó nem felel meg a követelményeknek.',
  USERNAME_TOO_SHORT: 'A felhasználónév túl rövid.',
  USERNAME_TAKEN: 'A felhasználónév már foglalt.',
  EMAIL_TAKEN: 'Az email cím már regisztrálva van.',
  EMAIL_INVALID: 'Érvénytelen email cím.',
  INVALID_REQUEST: 'Érvénytelen kérés.',
  NOT_FOUND: 'A keresett erőforrás nem található.',
  SERVER_ERROR: 'Szerver hiba történt. Kérjük, próbálja újra később.',
}

export function getErrorMessage(code: ErrorCode): string {
  return errorMessages[code]
}

export const appErrorSchema = z.object({
  type: z.nativeEnum(ErrorType),
  code: z.nativeEnum(ErrorCode),
  message: z.string(),
  status: z.number(),
  originalError: z.unknown().optional(),
})

export type AppError = z.infer<typeof appErrorSchema>
