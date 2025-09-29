import axios, { AxiosError, AxiosHeaders } from 'axios';
import type { RawAxiosResponseHeaders, InternalAxiosRequestConfig, AxiosInstance } from 'axios';
import { ENDPOINTS } from '../shared/lib';

const suffix = 'http://localhost:3001';

const host: AxiosInstance = axios.create({
  baseURL: suffix,
  timeout: 20000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

host.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    return config;
  },
  (error: AxiosError): Promise<never> => {
    return Promise.reject(error);
  },
);

host.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      try {
        await host.post(ENDPOINTS.AUTH.REFRESH_TOKEN);

        return host(error.config);
      } catch (refreshError) {
        console.error('Refresh failed:', refreshError);
      }
    }
    return Promise.reject(error);
  },
);

export interface ApiResponse<T = any> {
  data: T;
  headers: RawAxiosResponseHeaders | AxiosHeaders;
  status: number;
}

const API = {
  get: async <T = any>(...params: Parameters<AxiosInstance['get']>): Promise<ApiResponse<T>> => {
    try {
      const request = await host.get<T>(...params);
      return { data: request.data, headers: request.headers, status: request.status };
    } catch (err) {
      const error = err as AxiosError;
      console.error({ err: error });
      throw error.response;
    }
  },
  post: async <T = any>(...params: Parameters<AxiosInstance['post']>): Promise<ApiResponse<T>> => {
    try {
      const request = await host.post<T>(...params);
      return { data: request.data, headers: request.headers, status: request.status };
    } catch (err) {
      const error = err as AxiosError;
      console.error({ err: error });
      throw error.response;
    }
  },
  put: async <T = any>(...params: Parameters<AxiosInstance['put']>): Promise<ApiResponse<T>> => {
    try {
      const request = await host.put<T>(...params);
      return { data: request.data, headers: request.headers, status: request.status };
    } catch (err) {
      const error = err as AxiosError;
      console.error({ err: error });
      throw error.response;
    }
  },
  delete: async <T = any>(
    ...params: Parameters<AxiosInstance['delete']>
  ): Promise<ApiResponse<T>> => {
    try {
      const request = await host.delete<T>(...params);
      return { data: request.data, headers: request.headers, status: request.status };
    } catch (err) {
      const error = err as AxiosError;
      console.error({ err: error });
      throw error.response;
    }
  },
};

export default API;
