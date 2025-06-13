import type { Router, RouteRecordRaw } from 'vue-router';
import { createRouter, createWebHistory } from 'vue-router';
import { authGuard } from '@/routes/guards/auth.guard.ts';
import { localeGuard } from '@/routes/guards/locale.guard.ts';
import { SUPPORT_LOCALES } from '@/plugins/i18n.plugin.ts';

const loadChildRoutes = (): RouteRecordRaw[] => {
  const modules: Record<string, any> = import.meta.glob('./*.route.ts', {
    eager: true,
  });

  const routes: RouteRecordRaw[] = [];

  for (const path in modules) {
    const mod = modules[path] as any;
    const route = mod.default;

    if (Array.isArray(route)) {
      routes.push(...route);
    } else {
      routes.push(route);
    }
  }

  return routes;
};

const languages = SUPPORT_LOCALES.join('|');

const routes: RouteRecordRaw[] = [
  {
    path: `/:locale(${languages})`,
    children: loadChildRoutes(),
  },
  {
    path: `/:locale(${languages})/:pathMatch(.*)*`,
    name: 'not-found',
    component: () => import('@/views/pages/NotFound.vue'),
    meta: {
      requiresAuth: false,
      title: 'page.notFound.title',
    },
  },
];

const router: Router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(localeGuard);
router.beforeEach(authGuard);

export default router;
