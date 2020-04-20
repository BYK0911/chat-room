<template>
<div class='flex-v contact-list-wrapper'>
  <div class='flex-header contacts-title'>
    群聊
  </div>
  <ul class="flex-main contact-list">
    <li
      class='contact-item'
      v-for='g in user.groups'
      :key='g.id'
      @click='checkGroup(g)'>
      <span>{{ g.name }}</span>
    </li>
  </ul>
</div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['user'])
  },
  methods: {
    // 查看分组
    checkGroup (g) {
      this.$emit('checkGroup', g)
    }
  }
}
</script>

<style scoped lang='scss'>
.contact-list-wrapper {
  background: #f9f9f9;
  width: 200px;
  height: 100%;
  padding: 10px;
}
.contacts-title {
  height: 50px;
  margin: -10px;
  margin-bottom: 0;
  padding: 0 20px;
  line-height: 50px;
  color: #999;
  font-size: 14px;
  font-weight: 500;
  border-bottom: 1px solid #eee;
}
.contact-list {
  overflow: auto;

  .contact-item {
    height: 40px;
    padding: 0 10px;
    line-height: 40px;
    cursor: pointer;
    border-bottom: 1px solid #eee;
  }
}
</style>
