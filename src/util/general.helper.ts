/**
 * General utility functions
 */

/**
 * Extract error message from various error types
 */
export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message
  }
  if (typeof error === 'string') {
    return error
  }
  if (error && typeof error === 'object') {
    const err = error as any
    return err.message || err.msg || JSON.stringify(error)
  }
  return 'An unknown error occurred'
}

/**
 * Parse JWT token (basic parsing, doesn't verify signature)
 */
export function parseJWT(token: string) {
  try {
    const base64Url = token.split('.')[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    )
    return JSON.parse(jsonPayload)
  } catch {
    return null
  }
}

/**
 * Check if JWT token is expired
 */
export function isTokenExpired(token: string): boolean {
  const decoded = parseJWT(token)
  if (!decoded || !decoded.exp) {
    return true
  }
  return decoded.exp * 1000 < Date.now()
}

/**
 * Format error response for display
 */
export function formatErrorResponse(error: any): string {
  if (error?.response?.data?.message) {
    return error.response.data.message
  }
  if (error?.response?.statusText) {
    return error.response.statusText
  }
  return getErrorMessage(error)
}

export class FormUtil {
  
  static isPassedValidation(validation: Record<string, string>): boolean {
    return Object.values(validation).every(msg => msg.trim().length === 0);
  }
}