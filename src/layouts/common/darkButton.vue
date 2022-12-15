<template>
  <div class="btn">
    <div class="dark-icon">
      <el-button :icon="Sunny" circle />
    </div>
    <div class="light-icon">
      <el-button :icon="Moon" circle />
    </div>
  </div>

</template>

<script lang="ts" setup>
import { Sunny, Moon } from '@element-plus/icons-vue'
</script>

<style lang="scss" scoped>


.light-icon {
  display: block;
}

.dark-icon {
  display: none;
}

@at-root .dark {

  .dark-icon {
    display: block;
  }

  .light-icon {
    display: none;
  }
}
</style>