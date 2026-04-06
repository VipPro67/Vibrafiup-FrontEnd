import { axiosInstance } from '@/util/axios.helper'
import {
  LoginRequest,
  RegisterRequest,
  OAuthAuthorizeRequest,
  OAuthCallbackRequest,
  Account,
  AuthResponse,
  OAuthUrlResponse,
} from '@/dtos/auth.page.dto'

/**
 * Login with email and password
 * Backend sets JWT tokens as HTTP-only cookies
 */
export async function loginWithEmail(credentials: LoginRequest): Promise<AuthResponse> {
  try {
    const response = await axiosInstance.post<AuthResponse>('/api/public/auth/account/authenticate', credentials)
    return response.data
  } catch (error) {
    console.error('Login API error:', error)
    throw error
  }
}

/**
 * Register new account with email, password, and full name
 */
export async function registerWithEmail(credentials: RegisterRequest): Promise<AuthResponse> {
  try {
    const response = await axiosInstance.post<AuthResponse>('/api/public/auth/account/register', credentials)
    return response.data
  } catch (error) {
    console.error('Register API error:', error)
    throw error
  }
}

/**
 * Get OAuth provider authorization URL
 * Returns redirect URL to the OAuth provider
 */
export async function getOAuthRedirectUrl(provider: 'google' | 'facebook'): Promise<OAuthUrlResponse> {
  try {
    const response = await axiosInstance.get<OAuthUrlResponse>('/api/public/oauth2/authorize', {
      params: { provider },
    })
    return response.data
  } catch (error) {
    console.error(`Get ${provider} OAuth URL error:`, error)
    throw error
  }
}

/**
 * Handle OAuth provider callback
 * Backend sets JWT tokens as HTTP-only cookies
 */
export async function handleOAuthCallback(code: string, state: string): Promise<AuthResponse> {
  try {
    const response = await axiosInstance.get<AuthResponse>('/api/public/oauth2/callback', {
      params: { code, state },
    })
    return response.data
  } catch (error) {
    console.error('OAuth callback error:', error)
    throw error
  }
}

/**
 * Get authenticated user account info
 * Requires valid JWT token in cookies
 */
export async function getUserInfo(): Promise<Account> {
  try {
    const response = await axiosInstance.get<AuthResponse>('/api/secure/auth/account/info')
    // Handle both direct Account response and wrapped response with data property
    return response.data.data || response.data
  } catch (error) {
    console.error('Get user info error:', error)
    throw error
  }
}
