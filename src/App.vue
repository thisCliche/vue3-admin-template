<script setup lang="ts">
  import { watch } from 'vue'
  import { useRoute } from 'vue-router'
  import { setTitleFromRoute } from '@/utils/common'
  const route = useRoute()
  // 监听路由变化时更新浏览器标题
  watch(
    () => route.path,
    () => {
      setTitleFromRoute()
    }
  )
</script>

<template>
  <!-- 可以全局设置组件大小等等 -->
  <el-config-provider>
    <router-view></router-view>
  </el-config-provider>
</template>

<style scoped>

</style>
