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

export class RegisterRequest {
  email!: string
  password!: string
  dob!: string
  fullName!: string

  static withBuilder(): RegisterRequest { return new RegisterRequest(); }
  bemail(email: string): RegisterRequest { this.email = email; return this; }
  bpassword(password: string): RegisterRequest { this.password = password; return this; }
  bdob(dob: string): RegisterRequest { this.dob = dob; return this; }
  bfullName(fullName: string): RegisterRequest { this.fullName = fullName; return this; }
}

export class ForgotPassOTPRequest {
  email!: string

  static withBuilder(): ForgotPassOTPRequest { return new ForgotPassOTPRequest(); }
  bemail(email: string): ForgotPassOTPRequest { this.email = email; return this; }
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
