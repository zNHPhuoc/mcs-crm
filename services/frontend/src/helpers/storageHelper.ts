import moment from 'moment';
import type { IsExpiredEntity } from '@/@types/storage';

class StorageHelper {
  private readonly _isSupport: boolean;

  constructor() {
    this._isSupport = true;
  }

  static get timestamp() {
    return moment.now() / 1000;
  }

  static __isExpired(entity: IsExpiredEntity) {
    if (!entity) return true;
    return StorageHelper.timestamp - (entity.timestamp + entity.expired_second) >= 0;
  }

  set(key: string, value: unknown, expired_second = 60 * 60 * 24 * 30) {
    if (!this._isSupport) {
      return this;
    }
    if (expired_second < 1 || isNaN(expired_second))
      expired_second = 60 * 60 * 24 * 30; // default is 30 days

    if (!key && !value) {
      console.error('Missing Parameter');
      return this;
    }
    const entity = {
      timestamp: StorageHelper.timestamp,
      expired_second,
      key,
      value,
    };
    localStorage.setItem(key, JSON.stringify(entity));
    return this;
  }

  get(key: string, defaultValue = null) {
    if (!this._isSupport) {
      return defaultValue;
    }

    const entity = localStorage.getItem(key);

    if (entity) {
      try {
        const parsedEntity = JSON.parse(entity);
        return typeof parsedEntity === 'object' ? parsedEntity : entity;
      } catch {
        return entity;
      }
    }

    return defaultValue;
  }

  remove(key: string) {
    if (!this._isSupport) {
      return this;
    }
    if (!key) {
      return this;
    }
    localStorage.removeItem(key);
    return this;
  }

  clear() {
    if (!this._isSupport) {
      return null;
    }
    localStorage.clear();
    return this;
  }
}

export const StorageService = new StorageHelper();
