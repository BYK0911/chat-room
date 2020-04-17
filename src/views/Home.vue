<template>
  <div class="chat flex">
    <!-- 左侧菜单 -->
    <menu-bar class='flex-aside'></menu-bar>

    <!-- 联系人 -->
    <contact class='flex-aside contacts'></contact>

    <div class="flex-v flex-main msg-wrapper">
      <!-- 聊天对象 -->
      <div class="msg-title flex-header"> {{ contact ? contact.username : '' }} </div>

      <!-- 聊天内容 -->
      <message class='flex-main'></message>

      <!-- 输入面板 -->
      <inputer class='flex-footer'></inputer>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import MenuBar from './components/menuBar/index.vue'
import Contact from './components/contact/index.vue'
import Message from './components/message/index.vue'
import Inputer from './components/inputer/index.vue'

export default {
  components: { MenuBar, Contact, Message, Inputer },

  computed: {
    ...mapState(['contact'])
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
}
</style>
