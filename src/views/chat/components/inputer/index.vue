<template>
  <div class="flex-footer inputer">
    <textarea v-model='content' :disabled='!user.contact' @keyup.enter='send'></textarea>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['user'])
  },

  data () {
    return {
      content: ''
    }
  },

  methods: {
    send (e) {
      const content = this.content.trim()

      if (!e.shiftKey && content) {
        e.preventDefault()
        const msg = {
          type: '0',
          content: content,
          sender: this.user.id,
          receiver: this.user.contact.id
        }
        this.user.contact.msgs.push(msg)
        this.$socket.emit('msg', msg)

        this.content = ''
      }
    }
  }
}
</script>

<style scoped lang='scss'>
.inputer {
  height: 140px;
  textarea {
    width: 100%;
    height: 100%;
    padding: 10px;
    outline: none;
    border: none;
    resize: none;
  }
}
</style>
