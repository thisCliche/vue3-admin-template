<template>
  <div>
    编辑页id:{{id}}
  </div>
</template>

<script lang="ts" setup>
import {useRoute} from 'vue-router'
const route = useRoute()

let id = route.query.id
console.log('打开')
</script>

<style lang="less" scoped>
</style>