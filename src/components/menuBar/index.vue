<template>
  <div class="menus flex-v">
    <ul class="flex-main">
      <li class='menu-item'></li>
      <li
        class='menu-item'
        :class='{ "is-active": menu.name === curr }'
        v-for='menu in menus'
        :key='menu.name'
        @click='toMenu(menu)'>
        <span
          class='icon iconfont'
          :class='menu.icon'></span>
      </li>
    </ul>

    <ul class="flex-footer">
      <li class='menu-item'>
        <span class='icon iconfont icon-tuichu' @click='logout'></span>
      </li>
      <li class='menu-item'>
      </li>
    </ul>
  </div>
</template>

<script>
import { logout } from '@/api/session'
import { mapMutations } from 'vuex'

export default {
  data () {
    return {
      curr: 'Chat',
      menus: [
        {
          name: 'Chat',
          icon: 'icon-xiaoxi1',
          label: '消息'
        },
        {
          name: 'Contact',
          icon: 'icon-icon_signal_fill',
          label: '联系人'
        },
        {
          name: 'Group',
          icon: 'icon-icon_meeting_fill',
          label: '群组'
        }
      ]
    }
  },

  methods: {
    ...mapMutations(['setUser']),

    toMenu (menu) {
      this.curr = menu.name
      this.$router.push({ name: menu.name })
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
    }
  }
}
</script>

<style scoped lang='scss'>
.menus {
  width: 80px;
  background: #bbb;
  border-radius: 3px 0 0 3px;
}

.menu-item {
  height: 50px;
  line-height: 50px;
  text-align: center;
  color: #888;

  .icon {
    color: #ddd;
    font-size: 30px;
    cursor: pointer;
  }
  &.is-active .icon {
    font-size: 30px;
    color: #8f8
  }
}
</style>
