// Auth Request/Response DTOs

export class LoginRequest {
  email!: string
  password!: string

  static withBuilder(): LoginRequest {
    return new LoginRequest();
  }
  bemail(email: string): LoginRequest { this.email = email; return this; }
  bpassword(password: string): LoginRequest { this.password = password; return this; }
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
