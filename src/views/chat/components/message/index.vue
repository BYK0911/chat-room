<template>
  <div class="msg-list flex-main">
    <template v-if='user.contact'>
      <message-item :msg='m' v-for='(m, i) in user.contact.msgs' :key='i'></message-item>
    </template>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import MessageItem from './MessageItem'

export default {
  components: { MessageItem },

  computed: {
    ...mapState(['user'])
  },

  sockets: {
    msg (data) {
      if (data.sender === this.user.contact.id) {
        this.toBottom()
      }
    }
  },

  methods: {
    toBottom () {
      this.$nextTick(() => {
        this.$el.scrollTop = this.$el.scrollHeight
      })
    }
  },

  watch: {
    'user.contact.msgs' () {
      this.toBottom()
    }
  }
}
</script>

<style scoped lang='scss'>
.msg-list{
  padding: 10px;
  overflow: auto;
  border-bottom: 1px solid #ddd;
}
</style>
