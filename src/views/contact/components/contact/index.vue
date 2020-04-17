<template>
<div class='flex-v contact-list-wrapper'>
  <div class='flex-header contacts-title'>
    <div v-if='!searching' @click='searchReady'>
      <span>联系人</span> <span class='icon-search iconfont icon-icon_search'></span>
    </div>
    <input class='input-search' ref='search' v-else type="text" v-model="keyword" placeholder="联系人">
  </div>
  <ul class="flex-main contact-list">
    <li
      class='contact-item'
      v-for='u in contacts'
      :key='u.id'
      @click='checkUser(u)'>
      <span></span>{{ u.username }}
    </li>
  </ul>
</div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      searching: false,
      keyword: ''
    }
  },

  computed: {
    ...mapState({
      contacts (state) {
        let res = [...state.user.contacts]
        if (this.keyword) {
          res = res.filter(u => u.username.indexOf(this.keyword) !== -1)
        }
        return res
      }
    })
  },

  methods: {
    // 切换联系人
    checkUser (u) {
      this.$emit('checkUser', u, false)
    },

    searchReady () {
      this.searching = true
      this.$nextTick(() => {
        this.$refs.search.focus()
      })
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
  }
}
</style>
