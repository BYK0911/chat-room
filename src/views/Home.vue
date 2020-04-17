<template>
  <div class="chat flex">
    <div class="flex-aside left-menu flex-v">
      <ul class="flex-main">
        <li class='menu-item'></li>
        <li class='menu-item'>
          <font-awesome-icon icon='user' color='#5ac' size="2x" />
        </li>
      </ul>

      <ul class="flex-footer">
        <li class='menu-item'>
          <font-awesome-icon icon='power-off' size="lg" @click='logout'/>
        </li>
      </ul>
    </div>

    <ul class="flex-aside contacts">
      <li class='contacts-title'>
        联系人
      </li>
      <li
        class='contacts-item'
        v-for='u in users'
        :key='u.id'
        @click='toggleContact(u)'>
        <span class='bandge' v-if='u.unread && u !== contact'></span>
        {{ u.username }}
      </li>
    </ul>

    <div class="flex-v flex-main msg-wrapper">
      <div class="msg-title flex-header">
        {{ contact ? contact.username : '' }}
      </div>
      <div ref='msgList' class="msg-list flex-main">
        <template v-if='contact'>
          <message :msg='m' v-for='(m, i) in contact.msgs' :key='i'></message>
        </template>
      </div>
      <div class="flex-footer inputer">
        <textarea v-model='msg' :disabled='!this.contact' @keyup.enter='send'></textarea>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { logout } from '@/api/session'
import { queryUsers } from '@/api/user'
import Message from './components/Message'

export default {
  components: { Message },
  data () {
    return {
      io: null,
      users: [],
      contact: null,
      msg: ''
    }
  },

  computed: {
    ...mapState(['user'])
  },

  mounted () {
    this.queryUsers()
    if (this.user) {
      const data = { groups: [], ...this.user }
      this.$socket.emit('login', data)
    }
  },

  sockets: {
    sign () {
      this.queryUsers()
    },
    msg (data) {
      this.users.forEach(u => {
        if (u.id === data.sender) {
          u.msgs.push(data)
          if (u.id !== this.contact.id) {
            u.unread = true
          }
        }
      })
      this.$nextTick(() => {
        this.$refs.msgList.scrollTop = this.$refs.msgList.scrollHeight
      })
    }
  },

  methods: {
    ...mapMutations(['setUser']),
    queryUsers () {
      queryUsers().then(data => {
        if (data.success) {
          const store = {}
          this.users.forEach(u => {
            store[u.id] = {
              msgs: u.msgs,
              unread: u.unread
            }
          })
          this.users = []
          data.data.forEach(u => {
            if (this.user.id !== u.id) {
              this.users.push({
                ...u,
                msgs: store[u.id] ? store[u.id].msgs || [] : [],
                unread: store[u.id] ? store[u.id].unread || false : false
              })
            }
          })

          this.contact = this.users[0] || null
        }
      })
    },

    send (e) {
      if (!e.shiftKey && this.msg.trim()) {
        e.preventDefault()
        const msg = {
          type: '0',
          content: this.msg.trim(),
          sender: this.user.id,
          receiver: this.contact.id,
          isSend: true
        }
        this.contact.msgs.push(msg)
        this.$socket.emit('msg', msg)
        this.$nextTick(() => {
          this.$refs.msgList.scrollTop = this.$refs.msgList.scrollHeight
        })
        this.msg = ''
      }
    },

    logout () {
      logout().then(data => {
        if (data.success) {
          const data = { groups: [], ...this.user }
          this.logout(data)
          this.setUser(null)
          this.$router.push({ name: 'Login' })
        }
      })
    },

    toggleContact (u) {
      u.unread = false
      this.contact = u
    }
  }
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

.left-menu {
  width: 80px;
  background: #bbb;
  border-radius: 3px 0 0 3px;
}

.menu-item {
  height: 50px;
  line-height: 50px;
  text-align: center;
  color: #888;
  cursor: pointer;
}

.contacts {
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
  .contacts-item {
    height: 40px;
    padding: 0 10px;
    line-height: 40px;
    cursor: pointer;
    border-bottom: 1px solid #eee;
  }
}

.msg-wrapper {
  border-bottom: 1px solid #ddd;
  .msg-title {
    height: 50px;
    margin-bottom: 0;
    padding: 0 20px;
    line-height: 50px;
    color: #666;
    font-size: 16px;
    font-weight: 600;
    border-bottom: 1px solid #eee;
  }
  .msg-list{
    padding: 10px;
    overflow: auto;
    border-bottom: 1px solid #ddd;
  }
}
.bandge {
  display: inline-block;
  vertical-align: middle;
  width: 4px;
  height: 4px;
  background: red;
  border-radius: 50%;
}

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
