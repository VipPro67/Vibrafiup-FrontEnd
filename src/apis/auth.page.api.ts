import { axiosInstance } from '@/util/axios.helper'
import {
  LoginRequest,
  RegisterRequest,
  Account,
  AuthResponse,
  OAuthUrlResponse,
} from '@/dtos/auth.page.dto'
export const authApi = {
  loginWithEmail: async (credentials: LoginRequest): Promise<AuthResponse> => {
    const response = await axiosInstance.post<AuthResponse>('/api/public/auth/account/authenticate', credentials);
    return response.data;
  },

  registerWithEmail: async (credentials: RegisterRequest): Promise<AuthResponse> => {
    const response = await axiosInstance.post<AuthResponse>('/api/public/auth/account/register', credentials);
    return response.data;
  },

  getOAuthRedirectUrl: async (provider: 'google' | 'facebook'): Promise<OAuthUrlResponse> => {
    const response = await axiosInstance.get<OAuthUrlResponse>('/api/public/oauth2/authorize', {
      params: { provider },
    });
    return response.data;
  },

  handleOAuthCallback: async (code: string, state: string): Promise<AuthResponse> => {
    const response = await axiosInstance.get<AuthResponse>('/api/public/oauth2/callback', {
      params: { code, state },
    });
    return response.data;
  },

  getUserInfo: async (): Promise<Account> => {
    const response = await axiosInstance.get<any>('/api/secure/user/info');
    return response.data?.data ?? response.data;
  },

  logout: async (): Promise<void> => {
    await axiosInstance.post<any>('/api/secure/auth/account/logout');
  }
}