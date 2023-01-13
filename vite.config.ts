import type { UserConfig, ConfigEnv } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { loadEnv } from './src/utils/vite'
import { svgBuilder } from './src/components/icon/svg/index'

const pathResolve = (dir: string): any => {
  return resolve(__dirname, ".", dir)
}
// https://vitejs.dev/config/
const viteConfig = ({ mode }: ConfigEnv): UserConfig => {
  const { VITE_PORT, VITE_OPEN, VITE_BASE_PATH, VITE_OUT_DIR } = loadEnv(mode)
  const alias: Record<string, string> = {
    '@': pathResolve('./src/'),
    assets: pathResolve('./src/assets')
  }
  return {
    plugins: [vue(),vueJsx(), svgBuilder('./src/assets/icons/')],
    root: process.cwd(),
    define: { 'process.env': process.env },
    resolve: { alias },
    base: VITE_BASE_PATH,
    server: {
      host: '0.0.0.0',
      port: VITE_PORT,
      open: VITE_OPEN,
    },
    build: {
      cssCodeSplit: false,
      sourcemap: false,
      outDir: VITE_OUT_DIR,
      emptyOutDir: true,
      chunkSizeWarningLimit: 1500,
      rollupOptions: {
          output: {
              manualChunks: {
                  // 分包配置，配置完成自动按需加载
                  vue: ['vue', 'vue-router', 'pinia', 'element-plus'],
                  echarts: ['echarts'],
              },
          },
      },
  },
    css: {
      modules:{
        localsConvention:'camelCase'
      }
      // postcss: {
      //   plugins: [
      //     {
      //       postcssPlugin: 'internal:charset-removal',
      //       AtRule: {
      //         charset: (atRule) => {
      //           if (atRule.name === 'charset') {
      //             atRule.remove()
      //           }
      //         },
      //       },
      //     },
      //   ],
      // },
    },
  }
}
export default viteConfig
