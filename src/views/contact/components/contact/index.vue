<template>
<div class='flex-v contact-list-wrapper'>
  <div class='flex-header contacts-title'>
    <div v-if='!searching' @click='searchReady'>
      <span>联系人</span> <span class='icon-search iconfont icon-icon_search'></span>
    </div>
    <input v-else class='input-search' ref='search' type="text" v-model="keyword" placeholder="联系人" @input="queryUsersByName">
  </div>
  <ul v-if='!searching' class="flex-main contact-list">
    <li
      class='contact-item'
      v-for='u in user.contacts'
      :key='u.contact_id'
      @click='checkUser(u)'>
      <span>{{ u.remarks }}</span>
    </li>
  </ul>
  <ul v-else class="flex-main contact-list">
    <template v-if='matchedUsers.contacts.length'>
      <li class="contact-item divider">联系人</li>
      <li
        class='contact-item'
        v-for='u in matchedUsers.contacts'
        :key='"contact_" + u.id'
        @click='checkUser(u)'>
        <span>{{ u.username }}</span>
      </li>
    </template>
    <template  v-if='matchedUsers.strangers.length'>
      <li class="contact-item divider">陌生人</li>
      <li
        class='contact-item'
        v-for='u in matchedUsers.strangers'
        :key='"stranger_" + u.id'
        @click='checkUser(u, true)'>
        <span>{{ u.username }}</span>
      </li>
    </template>
    <li v-if='matchedUsers.contacts.length === 0 && matchedUsers.strangers.length === 0' class='contact-item none'>
      无
    </li>
  </ul>
</div>
</template>

<script>
import { mapState } from 'vuex'
import { queryUsers } from '@/api/user'

export default {
  data () {
    return {
      searching: false,
      keyword: '',
      matchedUsers: {
        contacts: [],
        strangers: []
      }
    }
  },

  computed: {
    ...mapState({
      user (state) {
        return state.user
      },
      contacts (state) {
        const contacts = {}

        state.user.contacts.forEach(u => {
          contacts[u.id] = u
        })

        return contacts
      }
    })
  },

  methods: {
    // 切换联系人
    checkUser (u, isStranger) {
      this.$emit('checkUser', u, isStranger)
    },

    searchReady () {
      this.searching = true
      this.$nextTick(() => {
        this.$refs.search.focus()
      })
    },

    queryUsersByName () {
      queryUsers(this.keyword).then(data => {
        if (data.success) {
          this.matchedUsers.contacts = []
          this.matchedUsers.strangers = []

          data.data.forEach(u => {
            if (u.id !== this.user.id) {
              if (this.contacts[u.id]) {
                this.matchedUsers.contacts.push(u)
              } else {
                this.matchedUsers.strangers.push(u)
              }
            }
          })
        }
      })
    },

    refresh () {
      this.queryUsersByName()
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
.icon-search {
  float: right;
}
.input-search {
  outline: none;
  padding: 4px 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}
.contact-list {
  overflow: auto;

  .contact-item {
    height: 40px;
    padding: 0 10px;
    line-height: 40px;
    cursor: pointer;
    border-bottom: 1px solid #eee;
    &.divider {
      color: #aaa;
      text-align: center;
    }
    &.none {
      height: 100px;
      line-height: 100px;
      color: #aaa;
      text-align: center;
    }
  }
}
</style>
