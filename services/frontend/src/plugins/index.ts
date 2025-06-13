import type { App } from 'vue';
import { i18n } from './i18n.plugin.ts';
import { pinia } from './pinia.plugin.ts';
import router from '../routes';
import veeValidatePlugin from './vee-validate.plugin.ts';
import vueQueryPluginOptions from '@/plugins/vue-query.plugin.ts';
import { VueQueryPlugin } from '@tanstack/vue-query';
import { VueQueryDevtools } from '@tanstack/vue-query-devtools';
import socketPlugin from '@/plugins/socket.plugin.ts';

export const plugin = {
  install: (app: App) => {
    app.component('VueQueryDevtools', VueQueryDevtools);
    app.use(i18n);
    app.use(pinia);
    app.use(veeValidatePlugin);
    app.use(VueQueryPlugin, vueQueryPluginOptions);
    app.use(router);
    app.use(socketPlugin);
  },
};
