import { ErrorType, ErrorCode, type AppError, getErrorMessage } from './api-errors'
import { ZodError } from 'zod'

// Move maps to the top level
const apiErrorMap = {
  BadCredentials: { type: ErrorType.AUTHENTICATION, code: ErrorCode.INVALID_CREDENTIALS },
  SizePasswordError: { type: ErrorType.VALIDATION, code: ErrorCode.PASSWORD_TOO_SHORT },
  PasswordPasswordError: { type: ErrorType.VALIDATION, code: ErrorCode.PASSWORD_INVALID_FORMAT },
  SizeUsernameError: { type: ErrorType.VALIDATION, code: ErrorCode.USERNAME_TOO_SHORT },
  UsernameAlreadyRegistered: { type: ErrorType.VALIDATION, code: ErrorCode.USERNAME_TAKEN },
  EmailAlreadyRegistered: { type: ErrorType.VALIDATION, code: ErrorCode.EMAIL_TAKEN },
  EmailEmailError: { type: ErrorType.VALIDATION, code: ErrorCode.EMAIL_INVALID },
} as const

const statusMap = {
  400: { type: ErrorType.VALIDATION, code: ErrorCode.INVALID_REQUEST },
  401: { type: ErrorType.AUTHENTICATION, code: ErrorCode.INVALID_CREDENTIALS },
  403: { type: ErrorType.AUTHORIZATION, code: ErrorCode.UNAUTHORIZED },
  404: { type: ErrorType.NOT_FOUND, code: ErrorCode.NOT_FOUND },
  500: { type: ErrorType.SERVER, code: ErrorCode.SERVER_ERROR },
} as const

// Define types
type ApiErrorName = keyof typeof apiErrorMap
type KnownStatusCode = keyof typeof statusMap

// Type guards
function isApiErrorResponse(error: unknown): error is {
  errorName: string
  message: string
  status: string
} {
  return typeof error === 'object' && error !== null && 'errorName' in error && 'message' in error && 'status' in error
}

function isKnownError(errorName: string): errorName is ApiErrorName {
  return errorName in apiErrorMap
}

function isKnownStatus(status: number): status is KnownStatusCode {
  return status in statusMap
}

// Error mapping functions
function mapApiErrorToAppError(apiError: { errorName: string; message: string; status: string }): AppError {
  if (isKnownError(apiError.errorName)) {
    const errorMapping = apiErrorMap[apiError.errorName]
    return {
      type: errorMapping.type,
      code: errorMapping.code,
      message: getErrorMessage(errorMapping.code),
      status: parseInt(apiError.status, 10),
      originalError: apiError,
    }
  }

  return {
    type: ErrorType.UNKNOWN,
    code: ErrorCode.SERVER_ERROR,
    message: getErrorMessage(ErrorCode.SERVER_ERROR),
    status: parseInt(apiError.status, 10),
    originalError: apiError,
  }
}

function handleHttpError(response: Response): AppError {
  if (isKnownStatus(response.status)) {
    const errorMapping = statusMap[response.status]
    return {
      type: errorMapping.type,
      code: errorMapping.code,
      message: getErrorMessage(errorMapping.code),
      status: response.status,
      originalError: response,
    }
  }

  return {
    type: ErrorType.UNKNOWN,
    code: ErrorCode.SERVER_ERROR,
    message: getErrorMessage(ErrorCode.SERVER_ERROR),
    status: response.status,
    originalError: response,
  }
}

// Main error handler
export function handleApiError(error: unknown): AppError {
  if (isApiErrorResponse(error)) {
    return mapApiErrorToAppError(error)
  }

  if (error instanceof ZodError) {
    return {
      type: ErrorType.VALIDATION,
      code: ErrorCode.INVALID_REQUEST,
      message: error.errors[0]?.message || 'Validation error',
      status: 400,
      originalError: error,
    }
  }

  if (error instanceof Response) {
    return handleHttpError(error)
  }

  return {
    type: ErrorType.UNKNOWN,
    code: ErrorCode.SERVER_ERROR,
    message: error instanceof Error ? error.message : 'An unknown error occurred',
    status: 500,
    originalError: error,
  }
}
