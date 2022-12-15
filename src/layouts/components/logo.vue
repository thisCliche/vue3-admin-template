<template>
  <div class="layout-logo">
      <img v-if="!config.layout.menuCollapse" class="logo-img" src="~assets/logo.png" alt="logo" />
      <div v-if="!config.layout.menuCollapse" class="website-name">
          {{ site_name }}
      </div>
      <Icon
            v-if="config.layout.layoutMode != 'Streamline'"
            @click="onMenuCollapse"
            :name="config.layout.menuCollapse ? 'el-icon-Expand' : 'el-icon-Fold'"
            :class="config.layout.menuCollapse ? 'unfold' : ''"
            :color="config.getColorVal('menuActiveColor')"
            size="24"
            class="fold"
        />
  </div>
</template>

<script setup lang="ts">
import { useConfig } from '@/stores/config'
import { Session } from '@/utils/storage'
import { BEFORE_RESIZE_LAYOUT } from '@/stores/constant/cacheKey'

const config = useConfig()
const site_name = process.env.VITE_NAME

const onMenuCollapse = function () {
  config.setLayout('menuCollapse', !config.layout.menuCollapse)
  Session.set(BEFORE_RESIZE_LAYOUT, {
      layoutMode: config.layout.layoutMode,
      menuCollapse: config.layout.menuCollapse,
  })
}
</script>

<style scoped lang="scss">
.layout-logo {
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  padding: 10px;
}
.logo-img {
  width: 28px;
}
.website-name {
  display: block;
  width: 180px;
  padding-left: 4px;
  font-size: var(--el-font-size-extra-large);
  font-weight: 600;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: rgb(25, 135, 248);
}
.fold {
  margin-left: auto;
  cursor: pointer;
}
.unfold {
  margin: 0 auto;
}
</style>
