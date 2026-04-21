import { axiosInstance, GeneralAPIHelper } from '@/util/axios.helper'
import {
  LoginRequest,
  RegisterRequest,
  Account,
  AuthResponse,
  OAuthUrlResponse,
} from '@/dtos/auth.page.dto'
import { CSecurity } from '@/util/constant';
import { APIResponse } from '@/dtos/general.dto';

export class AuthAPI {

  static async loginWithEmail(credentials: LoginRequest): Promise<APIResponse<null>> {
    try {
      const uri = CSecurity.API.PREFIX_PUBLIC + '/auth/account/authenticate';
      const res = await axiosInstance.post<APIResponse<null>>(uri, credentials);
      return res.data;
    } catch(e: any) {
      return GeneralAPIHelper.handleErrorAndToast(e);
    }
  }

  static async registerWithEmail(credentials: RegisterRequest): Promise<AuthResponse> {
    const uri = CSecurity.API.PREFIX_PUBLIC + '/auth/account/register';
    const response = await axiosInstance.post<AuthResponse>(uri, credentials);
    return response.data;
  }

  static async getOAuthRedirectUrl(provider: 'google' | 'facebook'): Promise<OAuthUrlResponse> {
    const uri = CSecurity.API.PREFIX_PUBLIC + '/oauth2/authorize';
    const response = await axiosInstance.get<OAuthUrlResponse>(uri, {
      params: { provider },
    });
    return response.data;
  }

  static async handleOAuthCallback(code: string, state: string): Promise<AuthResponse> {
    const uri = CSecurity.API.PREFIX_PUBLIC + '/oauth2/callback';
    const response = await axiosInstance.get<AuthResponse>(uri, {
      params: { code, state },
    });
    return response.data;
  }

  static async getUserInfo(): Promise<Account> {
    const uri = CSecurity.API.PREFIX_SECURE + '/user/info';
    const response = await axiosInstance.get(uri);
    return response.data?.data ?? response.data;
  }

  static async logout(): Promise<void> {
    await axiosInstance.post('/api/secure/auth/account/logout');
  }

}