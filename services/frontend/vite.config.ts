import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import { fileURLToPath } from 'node:url';
import * as path from 'path';
import AutoImport from 'unplugin-auto-import/vite';

export default defineConfig(({ command, mode }) => {
  const env: Record<string, string> = loadEnv(mode, process.cwd(), '');

  const common = {
    plugins: [
      vue(),
      AutoImport({
        imports: ['vue', 'vue-router', 'vue-i18n'],
        dts: 'src/auto-imports.d.ts',
      }),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '~node_modules': path.resolve(__dirname, 'node_modules'),
        '~/': `${path.resolve(__dirname, 'src')}/`,
      },
    },
    css: {
      preprocessorOptions: {
        scss: {},
      },
    },
  };

  if (command === 'serve') {
    return {
      ...common,
      base: '/',
      server: {
        host: env.VITE_HOST,
        port: +env.VITE_PORT || 5173,
      },
    };
  } else {
    return {
      ...common,
      base: env.VITE_BASE_URL,
      build: {
        outDir: 'dist',
        sourcemap: true,
        rollupOptions: {
          output: {
            entryFileNames: '[name].js',
            chunkFileNames: '[name].js',
            assetFileNames: '[name].[ext]',
          },
        },
      },
    };
  }
});
