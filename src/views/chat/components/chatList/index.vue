<template>
  <ul class="contact-list">
    <li class='contacts-title'>
      聊天
    </li>
    <li
      class='contact-item'
      v-for='u in contacts'
      :key='u.id'
      @click='toggleContact(u)'>
      <span class='bandge' v-if='u.unread && u !== contact'></span>
      <span></span>{{ u.username }}
    </li>
  </ul>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { queryUsers } from '@/api/user'

export default {
  computed: {
    ...mapState(['user', 'contacts', 'contact'])
  },

  sockets: {
    // 新用户注册
    sign (user) {
      this.contacts.push({
        ...user,
        msg: [],
        unread: false
      })
    },

    msg (data) {
      this.contacts.forEach(u => {
        if (u.id === data.sender || u.id === data.receiver) {
          u.msgs.push(data)

          if (u.id === data.sender && u.id !== this.contact.id) {
            u.unread = true
          }
        }
      })
    }
  },

  mounted () {
    this.queryContacts()
  },

  methods: {
    ...mapMutations(['setContact', 'setContacts']),

    // 查询联系人
    queryContacts () {
      queryUsers().then(data => {
        if (data.success) {
          const store = {}
          const contacts = []

          this.contacts.forEach(u => {
            store[u.id] = {
              msgs: u.msgs,
              unread: u.unread
            }
          })

          data.data.forEach(u => {
            if (this.user.id !== u.id) {
              contacts.push({
                ...u,
                msgs: store[u.id] ? store[u.id].msgs || [] : [],
                unread: store[u.id] ? store[u.id].unread || false : false
              })
            }
          })

          this.setContacts(contacts)
          this.setContact(this.contacts[0])
        }
      })
    },

    // 切换联系人
    toggleContact (u) {
      u.unread = false

      this.setContact(u)
    }
  }
}
</script>

<style scoped lang='scss'>
.contact-list {
  background: #f9f9f9;
  width: 200px;
  height: 100%;
  overflow: auto;
  padding: 10px;

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
