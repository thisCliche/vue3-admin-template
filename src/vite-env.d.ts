/// <reference types="vite/client" />
// 可以在代码中引入.vue 文件
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module '*.tsx'