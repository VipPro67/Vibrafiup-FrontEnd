import { APIResponse } from '@/dtos/general.dto'
import axios, { AxiosInstance, AxiosError } from 'axios'
import toast from 'react-hot-toast'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080'

// Create axios instance with default config
export const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // Include cookies in requests
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Add any auth tokens or additional headers here
    console.log('API Request:', config.method?.toUpperCase(), config.url)
    return config
  },
  (error) => {
    console.error('Request error:', error)
    return Promise.reject(error)
  }
)

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    console.log('API Response:', response.status, response.config.url)
    return response
  },
  (error: AxiosError) => {
    console.error('Response error:', error.message, error.response?.status)
    return Promise.reject(error)
  }
)

export default axiosInstance

export class GeneralAPIHelper {

  static handleErrorAndToast(error: unknown): APIResponse<null> {
    const response = this.handleError(error) as APIResponse<null>;
    toast.error(response.msg);
    return response;
  }

  static handleError(error: unknown): APIResponse<null> {
    if (axios.isAxiosError(error)) {
      const serverResponse = error.response?.data;
      if (serverResponse && serverResponse.code) {
        return {
          status: String(
            typeof serverResponse.status === 'number'
              ? serverResponse.status
              : (error.response?.status ?? 500)
          ),
          code: serverResponse.code,
          msg: serverResponse.msg || 'An unexpected error occurred',
          time: serverResponse.time || new Date().toISOString(),
          data: null,
        };
      }

      return {
        status: String(error.response?.status ?? 0),
        code: 'NETWORK_ERROR',
        msg: error.message || 'Cannot connect to server',
        time: new Date().toISOString(),
        data: null,
      };
    }

    return {
      status: '500',
      code: 'UNKNOWN_ERROR',
      msg: 'An unknown error occurred',
      time: new Date().toISOString(),
      data: null,
    };
  }
  
}