import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import {
  i18n,
  SUPPORT_LOCALES,
  DEFAULT_LOCALE,
  setI18nLanguage,
} from '@/plugins/i18n.plugin';
import { setLocaleVeeValidate } from '@/plugins/vee-validate.plugin.ts';
import { setPageTitle } from '@/utils/setPageTitle.ts';

export function localeGuard(
  to: RouteLocationNormalized,
  _: RouteLocationNormalized,
  next: NavigationGuardNext
) {
  const locale = to.params.locale as AppLocale;

  if (!locale || !SUPPORT_LOCALES.includes(locale)) {
    const resolved: AppLocale | string =
      i18n.global.locale.value || DEFAULT_LOCALE;

    if (!to.fullPath.startsWith(`/${resolved}`)) {
      return next({
        path: `/${resolved}${to.fullPath}`,
        replace: true,
      });
    }
  }

  setI18nLanguage(i18n, locale);
  setLocaleVeeValidate(locale);

  const titleKey = to.meta.title as string;
  const translatedTitle = titleKey ? i18n.global.t(titleKey) : '';
  setPageTitle(translatedTitle);

  return next();
}
