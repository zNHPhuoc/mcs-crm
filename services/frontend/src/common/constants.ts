export const APP_SUPPORT_LOCALES: string[] = ['vi', 'en', 'jp', 'cn'];

export const APP_DEFAULT_LOCALE: string = 'vi';

export const APP_DEFAULT_LOCALE_NAME: Record<string, string> = {
  vi: 'Tiếng Việt',
  en: 'English',
  jp: '日本語',
  cn: '中文',
};

// Whether to enable Vue Query Devtools in development mode
export const APP_DEBUG_VUE_QUERY_DEVTOOLS: boolean =
  import.meta.env.MODE !== 'production';

export const WEBSOCKET_URL: string = import.meta.env.VITE_MICROSERVICE_CHAT;
