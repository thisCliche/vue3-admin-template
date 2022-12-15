<template>
  <component :is="config.layout.layoutMode"></component>
</template>

<script lang="ts" setup>
import Default from './container/default.vue'
import Classic from './container/classic.vue'
import Streamline from './container/streamline.vue'
import { onMounted, onBeforeMount } from 'vue'
import { useRoute } from 'vue-router'
import { useEventListener } from '@vueuse/core'
import { useConfig } from "@/stores/config";
import { useNavTabs } from "@/stores/navTabs";
import { BEFORE_RESIZE_LAYOUT } from '@/stores/constant/cacheKey'
import { Session } from "@/utils/storage";
import { handleAdminRoute, getFirstRoute, routePush, getAllRoute } from "@/utils/router";

const config = useConfig()
const navTabs = useNavTabs()
const route = useRoute()

onMounted(() => {
  init()
  onSetNavTabsMinWidth()
  useEventListener(window, 'resize', onSetNavTabsMinWidth)
})
onBeforeMount(() => {
  onAdaptiveLayout()
  useEventListener(window, 'resize', onAdaptiveLayout)
})
const init = () => {
  // 处理菜单 从storage中获取菜单，但这里是模拟
  const menus = [{ path: 'dashboard', children: [] }, { path: 'user', children: ['userInfo'] }, { path: 'object', children: ['objectManage'] }, { path: 'api', children: ['apiMaintenance', 'keyAuthorization'] }]
  // 写入pinia
  handleAdminRoute(menus)
  // 判断url是否含有allRoute,没有统一跳转 第一个路由
  let allRoute = getAllRoute(menus)
  if (allRoute.indexOf(route.path) == -1) {
    let firstRoute = getFirstRoute(navTabs.state.tabsViewRoutes)
    if (firstRoute) routePush(firstRoute.path)
  }
}
const onAdaptiveLayout = () => {
  let defaultBeforeResizeLayout = {
    layoutMode: config.layout.layoutMode,
    menuCollapse: config.layout.menuCollapse,
  }
  let beforeResizeLayout = Session.get(BEFORE_RESIZE_LAYOUT)
  if (!beforeResizeLayout) Session.set(BEFORE_RESIZE_LAYOUT, defaultBeforeResizeLayout)

}
// 在实例挂载后为navTabs设置一个min-width，防止宽度改变时闪现滚动条
const onSetNavTabsMinWidth = () => {
  const navTabs = document.querySelector('.nav-tabs') as HTMLElement
  if (!navTabs) {
    return
  }
  const navBar = document.querySelector('.nav-bar') as HTMLElement
  const navMenus = document.querySelector('.nav-menus') as HTMLElement
  const minWidth = navBar.offsetWidth - (navMenus.offsetWidth + 20)
  navTabs.style.width = minWidth.toString() + 'px'
}
</script>

<script lang="ts">
// 只有在 components 选项中的组件可以被动态组件使用
export default {
  components: { Default, Classic, Streamline },
}
</script>