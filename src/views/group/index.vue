<template>
  <div class='wrapper'>
    <!-- 联系人 -->
    <contact class='flex-aside contacts'></contact>

    <div class="flex-main">
    </div>
  </div>
</template>

<script>
import Contact from './components/contact/index.vue'

export default {
  components: { Contact }
}
</script>

<style lang="scss" scoped>
.wrapper {
  width: 100%;
  height: 100%;
}
</style>
