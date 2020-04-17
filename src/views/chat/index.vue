<template>
  <div class='wrapper flex'>
    <!-- 联系人 -->
    <chat-list class='flex-aside'></chat-list>

    <div class="flex-v flex-main msg-wrapper">
      <!-- 聊天对象 -->
      <div class="msg-title flex-header"> {{ user.contact ? user.contact.username : '' }} </div>

      <!-- 聊天内容 -->
      <message class='flex-main'></message>

      <!-- 输入面板 -->
      <inputer class='flex-footer'></inputer>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ChatList from './components/chatList/index.vue'
import Message from './components/message/index.vue'
import Inputer from './components/inputer/index.vue'

export default {
  components: { ChatList, Message, Inputer },

  computed: {
    ...mapState(['user'])
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  width: 100%;
  height: 100%;
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
