import router from '@/router'
import Icon from '@/components/icon/index.vue'
import * as elIcons from '@element-plus/icons-vue'
import {nextTick} from 'vue'
import type {App} from 'vue'
import { useTitle } from "@vueuse/core";

export function registerIcons(app: App) {
  /*
   * 全局注册 Icon
   * 使用方式: <Icon name="name" size="size" color="color" />
   * 详见<待完善>
   */
  app.component('Icon', Icon)

  /*
   * 全局注册element Plus的icon
   */
  const icons = elIcons as any
  for (const i in icons) {
      app.component(`el-icon-${icons[i].name}`, icons[i])
  }
}
/**
 * 是否是外部链接
 * @param path
 */
 export function isExternal(path: string): boolean {
  return /^(https?|ftp|mailto|tel):/.test(path)
}
/**
 * 根据路由 meta.title 设置浏览器标题
 */
 export function setTitleFromRoute() {
  if (typeof router.currentRoute.value.meta.title != 'string') return
  nextTick(() => {
      let webTitle = router.currentRoute.value.meta.title as string
      const title = useTitle()
      const site_name = process.env.VITE_NAME
      title.value = `${webTitle}${site_name ? ' - ' + site_name : ''}`
  })
}
