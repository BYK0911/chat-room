<template>
<div class='flex-v chat-list-wrapper'>
  <div class='flex-header contacts-title'>
    聊天
  </div>
  <ul class="flex-main contact-list">
    <li
      class='contact-item'
      v-for='u in user.contacts'
      :key='u.id'
      @click='toggleContact(u)'>
      <span class='bandge' v-if='u.unread && u !== user.contact'></span>
      <span>{{ u.username }}</span>
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

  sockets: {
    msg (data) {
      this.user.contacts.forEach(u => {
        if (u.id === data.sender || u.id === data.receiver) {
          u.msgs.push(data)

          if (u.id === data.sender && u.id !== this.user.contact.id) {
            u.unread = true
          }
        }
      })
    }
  },

  methods: {
    // 切换联系人
    toggleContact (u) {
      u.unread = false
      this.user.contact = u
    }
  }
}
</script>

<style scoped lang='scss'>
.chat-list-wrapper {
  width: 200px;
  height: 100%;
  padding: 10px;
  background: #f9f9f9;
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

    .bandge {
      display: inline-block;
      vertical-align: middle;
      width: 4px;
      height: 4px;
      background: red;
      border-radius: 50%;
      margin-right: 2px;
    }
  }
}
</style>
