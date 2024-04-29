import { defineConfig } from 'vite'
import UnoCSS from 'unocss/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import AutoImport from 'unplugin-auto-import/vite'

export default defineConfig({
  optimizeDeps: {
    exclude: [
      'vitepress',
    ],
  },
  server: {
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    UnoCSS(),
    AutoImport({
      imports: [
        'vue',
        'vitepress',
        '@vueuse/core',
      ],
      dirs: [
        '.vitepress/theme/composables',
      ],
      resolvers: [
        ElementPlusResolver(),
      ],
    }),
    Components({
      dirs: [
        '.vitepress/theme/components',
      ],
      include: [
        /\.vue$/,
        /\.vue\?vue/,
        /\.md$/,
      ],
      resolvers: [
        ElementPlusResolver(),
      ],
    }),
  ],
})
