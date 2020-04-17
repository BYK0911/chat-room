<template>
  <div class="chat flex">
    <!-- 左侧菜单 -->
    <menu-bar class='flex-aside'></menu-bar>

    <div class="flex-main">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import MenuBar from '@/components/menuBar/index.vue'

export default {
  components: { MenuBar }
}
</script>

<style lang="scss" scoped>
.chat {
  width: 800px;
  height: 500px;
  border: 1px solid #bbb;
  border-radius: 4px;
  box-shadow: 3px 3px 8px #aaa;
  margin: 100px auto;
}
</style>
