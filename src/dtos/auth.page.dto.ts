// Auth Request/Response DTOs

export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  email: string
  password: string
  fullName: string
}

export interface OAuthAuthorizeRequest {
  provider: 'google' | 'facebook'
}

export interface OAuthCallbackRequest {
  code: string
  state: string
}

export interface Account {
  id?: string
  email: string
  fullName: string
  createdAt?: string
  [key: string]: any
}

export interface AuthResponse {
  success?: boolean
  data?: Account
  message?: string
  [key: string]: any
}

export interface OAuthUrlResponse {
  redirectUrl: string
  [key: string]: any
}
