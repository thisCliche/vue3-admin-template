<script lang="ts" setup>
const {VITE_RECORDS,VITE_VERSION} = process.env
</script>

<template>
  <footer  class="copyright">
    <span>Copyright</span>
    <span class="icon">©</span>
    <span>2020-2022</span>
    <a  href="//www.baidu.com" target="_blank" rel="noopener">物迅科技有限公司</a>
    <a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener">{{VITE_RECORDS}}</a>
    <span>{{VITE_VERSION}}</span>
  </footer>
</template>

<style lang="scss" scoped>
footer {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 40px 0 20px;
  color: var(--el-text-color-secondary);
  font-size: 14px;

  span,
  a {
    padding: 0 5px;
  }

  a {
    text-decoration: none;
    color: var(--el-text-color-secondary);
    transition: var(--el-transition-color);

    &:hover {
      color: var(--el-text-color-primary);
    }
  }

  .icon {
    padding: 0;
    font-size: 18px;
  }
}
</style>
