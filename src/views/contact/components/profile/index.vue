<template>
  <div class="profile">
    <p class='username'>{{ contact.username }}</p>
    <div class='btn'>
      <button v-if='isNew' @click='addContact'>添加联系人</button>
      <button v-else @click='chat'>发消息</button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { addChat, addContact } from '@/api/user'

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
      let contact = this.user.chatList.filter(u => u.id === this.contact.id)[0]

      if (!contact) {
        contact = {
          ...this.contact,
          msgs: [],
          unread: false
        }
        this.user.contact = contact
        this.user.chatList.push(contact)
      }
      addChat(this.contact.id)
      this.$router.push({ name: 'Chat' })
    },
    addContact () {
      addContact(this.contact.id, this.contact.username).then(data => {
        if (data.success) {
          this.user.contacts.push({
            ...this.contact,
            msgs: [],
            unread: false
          })
          this.$emit('addSucc')
        }
      })
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
