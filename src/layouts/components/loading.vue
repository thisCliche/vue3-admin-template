<template>
  <div>
      <div
          v-loading="true"
          element-loading-background="var(--ba-bg-color-overlay)"
          element-loading-text="加载中"
          class="default-main ba-main-loading"
      ></div>
      <div v-if="state.showReload" class="loading-footer">
          <el-button @click="refresh" type="warning">重新加载</el-button>
      </div>
  </div>
</template>

<script setup lang="ts">
import { onUnmounted, reactive } from 'vue'
import router from '@/router/index'
import { useNavTabs } from '@/stores/navTabs'
import { getFirstRoute, routePush } from '@/utils/router'
let timer: NodeJS.Timer

const navTabs = useNavTabs()
const state = reactive({
  maximumWait: 1000 * 6,
  showReload: false,
})

const refresh = () => {
  router.go(0)
}

if (navTabs.state.tabsViewRoutes) {
  let firstRoute = getFirstRoute(navTabs.state.tabsViewRoutes)
  if (firstRoute) routePush(firstRoute.path)
} 

timer = setTimeout(() => {
  state.showReload = true
}, state.maximumWait)

onUnmounted(() => {
  clearTimeout(timer)
})
</script>

<style scoped lang="scss">
.ba-main-loading {
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.loading-footer {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
