export default [
  {
    path: 'profile',
    component: () => import('@/views/layouts/DefaultLayout.vue'),
    children: [
      {
        path: '',
        name: 'profile.index',
        component: () => import('@/views/pages/profile/Index.vue'),
        meta: { requiresAuth: true },
      },
    ],
  },
];
