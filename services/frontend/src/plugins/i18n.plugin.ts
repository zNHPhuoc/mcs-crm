import { createI18n } from 'vue-i18n';
import { APP_DEFAULT_LOCALE, APP_SUPPORT_LOCALES } from '@/common/constants.ts';

export const SUPPORT_LOCALES = APP_SUPPORT_LOCALES;

export const DEFAULT_LOCALE = APP_DEFAULT_LOCALE;

type Locale = (typeof SUPPORT_LOCALES)[number];

function loadLocaleMessages(): Record<Locale, Record<string, any>> {
  const messages = {} as Record<Locale, Record<string, any>>;
  const locales = import.meta.glob('../locales/**/*.json', { eager: true });

  for (const path in locales) {
    const match = path.match(/\/locales\/([^/]+)\/([^/]+)\.json$/);
    if (!match) continue;

    const section = match[1];
    const locale = match[2] as Locale;

    const fileContent = (locales[path] as { default: any }).default;

    if (!messages[locale]) messages[locale] = {};
    messages[locale][section] = fileContent;
  }

  return messages;
}

export const i18n = createI18n({
  legacy: false,
  locale: APP_DEFAULT_LOCALE,
  fallbackLocale: 'en',
  globalInjection: true,
  messages: loadLocaleMessages(),
});

export function setI18nLanguage(i18nInstance: typeof i18n, locale: AppLocale) {
  if (i18nInstance.mode === 'legacy') {
    (i18nInstance.global as any).locale = locale;
  } else {
    i18nInstance.global.locale.value = locale;
  }

  document?.querySelector('html')?.setAttribute('lang', locale);
}
