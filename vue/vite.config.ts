import vue from '@vitejs/plugin-vue'
import { defineConfig, ConfigEnv, UserConfigExport, loadEnv, resolvePackageEntry } from 'vite'
import path from 'path'
import styleImport from 'vite-plugin-style-import'
// import { cp } from 'fs'
// import { umask } from 'process'
// import { USERWHITESPACABLE_TYPES } from '@babel/types'
import VitePluginElementPlus from 'vite-plugin-element-plus'
import ElementPlus from 'element-plus'
import 'element-plus/lib'
import { configMockPlugin } from './src/plugins/configMockPlugin'
import { configSvgIconsPlugin } from './src/plugins/configSvgIconsPlugin'
import { wrapperEnv } from './src/utils/env'

// https://gitee.com/tangkebo/Vue3-ElementPlus-Vite2/tree/master
// https://vitejs.dev/config/
export default ({ command, mode }: ConfigEnv): UserConfigExport => {
  const root = process.cwd()
  const env = loadEnv(mode, root)
  const isBuild = command === 'build'
  const viteEnv = wrapperEnv(env)
  const {
    VITE_PORT,
    VITE_USE_MOCK,
    VITE_BUILD_COMPRESS,
    VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE
  } = viteEnv

  return defineConfig({
    base: './',
    plugins: [
      vue(),
      VitePluginElementPlus({
        useSource: true
      })
      // configMockPlugin(VITE_USE_MOCK, isBuild),
      // configSvgIconsPlugin(isBuild)
    ],
    resolve: {
      alias: [
        // todo
        // 其他别名生效
        { find: "@", replacement: "/src" },
        { find: "comps", replacement: "/src/components" },
        { find: "apis", replacement: "/src/apis" },
        { find: "views", replacement: "/src/views" },
        { find: "utils", replacement: "/src/utils" },
        { find: "store", replacement: "/src/store" },
        { find: "routes", replacement: "/src/routes" },
        { find: "styles", replacement: "/src/styles" },
        { find: "layout", replacement: "/src/layout" }
      ]
    },
    server: {
      //服务器主机名
      host: 'localhost',
      //端口号
      port: 3088,
      //设为 true 时若端口已被占用则会直接退出，而不是尝试下一个可用端口
      strictPort: false,
      //服务器启动时自动在浏览器中打开应用程序，当此值为字符串时，会被用作 URL 的路径名
      open: false,
      //自定义代理规则
      proxy: {
        //选项写法
        // '/api': {
        //   target: 'http://jsonplaceholder.typicode.com',
        //   changeOrigin: true,
        //   rewrite: path => path.replace(/^\/api/, '')
        // }
      }
    },
    build: {
      rollupOptions: {
      }
    }
  })
}