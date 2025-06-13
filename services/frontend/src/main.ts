import { createApp } from 'vue';
import App from './App.vue';
import { plugin } from './plugins';
import type { App as AppVue } from 'vue';
import router from '@/routes';

import './style.css';
import '@/assets/main.scss';

const bootstrap = async () => {
  const app: AppVue<Element> = createApp(App);
  plugin.install(app);
  await router.isReady();
  app.mount('#app');
};

bootstrap();
