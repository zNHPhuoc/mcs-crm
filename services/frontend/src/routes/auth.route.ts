export default [
  {
    path: 'auth',
    component: () => import('@/views/layouts/AuthLayout.vue'),
    children: [
      {
        path: 'login',
        name: 'auth.login',
        component: () => import('@/views/pages/auth/Login.vue'),
        meta: { requiresAuth: false, title: 'auth.login_title' },
      },
    ],
  },
];
