import process from 'node:process'
import { fileURLToPath, URL } from 'node:url'
import vue from '@vitejs/plugin-vue'
import IconsResolver from 'unplugin-icons/resolver'
import Icons from 'unplugin-icons/vite'
import Components from 'unplugin-vue-components/vite'
import { defineConfig, loadEnv } from 'vite'
import { viteStaticCopy } from 'vite-plugin-static-copy'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    define: {
      __APP_ENV__: JSON.stringify(env.APP_ENV),
    },
    server: {
      port: 8080,
      proxy: {
        '/api/sparql': {
          target: 'https://open.bydata.de/api/sparql',
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api\/sparql/, ''),
        },
      },
    },
    publicDir: 'public',
    plugins: [
      vue(),
      Icons({
        compiler: 'vue3',
      }),
      Components({
        dts: true,
        resolvers: [IconsResolver()],
        include: ['**/components/**/*.vue'],
        exclude: ['**/*.story.vue'],
      }),

      viteStaticCopy({
        targets: [
          {
            src: './src/assets/icons',
            dest: './src/assets',
          },
          {
            src: './src/assets/images',
            dest: './src/assets',
          },
        ],
      }),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        'vue': fileURLToPath(new URL('./node_modules/vue', import.meta.url)),
        '@config': fileURLToPath(new URL('./config', import.meta.url)),
      },
    },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './vitest.setup.ts',
      coverage: {
        provider: 'v8',
        reporter: ['text', 'json', 'html'],
      },
      include: ['**/*.spec.ts', '**/*.test.ts'],
      exclude: ['**/node_modules/**', '**/dist/**'],
    },
  }
})
