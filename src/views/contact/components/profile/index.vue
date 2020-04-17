<template>
  <div class="profile">
    <p class='username'>{{ user.username }}</p>
    <div class='btn'>
      <button v-if='isNew'>添加联系人</button>
      <button v-else @click='chat'>发消息</button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { addChat } from '@/api/user'

export default {
  props: {
    contact: {
      type: Object,
      default () {
        return null
      }
    },

    isNew: {
      type: Boolean,
      default () { return false }
    }
  },

  computed: {
    ...mapState(['user'])
  },

  methods: {
    chat () {
      this.user.contact = this.contact
      if (this.user.chatList.indexOf(this.contact) === -1) {
        addChat(this.contact.id)
      }
      this.$router.push({ name: 'Chat' })
    }
  }
}
</script>

<style lang='scss' socped>
.profile {
  text-align: center;
  padding: 50px;
  .username {
    font-size: 20px;
    text-align: center;
    margin: 100px 0;
  }
}
</style>
