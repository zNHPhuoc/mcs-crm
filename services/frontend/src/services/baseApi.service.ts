import axios, {
  type AxiosInstance,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from 'axios';
import { getToken, hasToken } from '@/helpers/authHelper';

export class ApiBase {
  protected _api: AxiosInstance;

  constructor(baseURL: string) {
    this._api = axios.create({ baseURL });

    this._api.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        if (hasToken()) {
          const token = getToken();
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    this._api.interceptors.response.use(
      (response: AxiosResponse) => response.data,
      (error) => {
        const res = {
          status: error?.response?.status || 500,
          statusText: error?.response?.statusText || 'Unknown',
          data: [error?.response?.data],
          msg: 'API Response Error',
        };
        return Promise.reject(res);
      }
    );
  }

  get instance(): AxiosInstance {
    return this._api;
  }
}
