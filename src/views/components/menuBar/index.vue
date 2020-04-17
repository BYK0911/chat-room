<template>
  <div class="menus flex-v">
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
</template>

<script>
import { logout } from '@/api/session'
import { mapMutations } from 'vuex'

export default {
  methods: {
    ...mapMutations(['setUser']),
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
  cursor: pointer;
}
</style>
