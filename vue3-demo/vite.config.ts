import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import qiankun from 'vite-plugin-qiankun'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    qiankun('Vue3MicroApp', {useDevMode: true})
  ],
  resolve: {
    alias: {
      '@src': resolve('src')
    }
  },
  server: {
    //服务端口号
    port: 8002,
    //是否自动在浏览器打开
    open: true,
    //代理服务
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:3000',
        changeOrigin: true,
        rewrite: (path: string) => path.replace('\/api', '')
      }
    }
  }
})
