import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import { StorageService } from '@/helpers/storageHelper.ts';
import { i18n } from '@/plugins/i18n.plugin.ts';

export function authGuard(
  to: RouteLocationNormalized,
  _: RouteLocationNormalized,
  next: NavigationGuardNext
) {
  const token = StorageService.get('token');
  const accessToken = token?.access_token ?? null;
  const locale = (to.params.locale as string) || i18n.global.locale.value;

  if (to?.meta?.requiresAuth && !accessToken) {
    return next({
      name: 'auth.login',
      params: { locale },
    });
  }

  if (to.name === 'auth.login' && accessToken) {
    return next({
      name: 'home.index',
      params: { locale },
    });
  }

  return next();
}
