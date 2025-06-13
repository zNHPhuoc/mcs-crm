export default [
  {
    path: '',
    component: () => import('@/views/layouts/DefaultLayout.vue'),
    children: [
      {
        path: '',
        name: 'home.index',
        component: () => import('@/views/pages/Index.vue'),
        meta: { requiresAuth: true },
      },
    ],
  },
];
