<template>
  <div class='wrapper'>
    <!-- 联系人 -->
    <contact class='flex-aside contacts'></contact>

    <div class="flex-main">
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Contact from './components/contact/index.vue'

export default {
  components: { Contact },

  computed: {
    ...mapState(['contact'])
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  width: 100%;
  height: 100%;
}
</style>
