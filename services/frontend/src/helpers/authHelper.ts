import { StorageService } from '@/helpers/storageHelper.ts';

export const hasToken = (): boolean => {
  return !!StorageService.get('token');
};

export const getToken = (): any => {
  return StorageService.get('token', null);
};

export const setToken = (token: any): void => {
  StorageService.set('token', token, 60 * 60 * 24 * 7);
};

export const clearToken = (): void => {
  StorageService.remove('token');
};
