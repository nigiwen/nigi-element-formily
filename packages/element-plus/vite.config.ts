import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    Vue(),
    dts({
      entryRoot: './',
      outDir: ['dist/es', 'dist/lib'],
      // 指定使用的tsconfig.json为我们整个项目根目录下,如果不配置,你也可以在components下新建tsconfig.json
      tsconfigPath: '../../tsconfig.json',
    }),
  ],
  build: {
    minify: false,
    emptyOutDir: true,
    lib: {
      entry: resolve(__dirname, './index.ts'),
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['vue'],
      output: [
        {
          // 打包格式
          format: 'es',
          // 打包后文件名
          entryFileNames: '[name].mjs',
          // 让打包目录和我们目录对应
          preserveModules: true,
          exports: 'named',
          // 打包结果目录
          dir: 'dist/es',
          // 打包当前目录
          preserveModulesRoot: '',
        },
        {
          // 打包格式
          format: 'cjs',
          // 打包后文件名
          entryFileNames: '[name].js',
          // 让打包目录和我们目录对应
          preserveModules: true,
          exports: 'named',
          // 打包结果目录
          dir: 'dist/lib',
          // 打包当前目录
          preserveModulesRoot: '',
        },
      ],
    },
  },
})
