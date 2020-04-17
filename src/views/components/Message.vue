<template>
  <div class="msg" :class='msg.isSend ? "msg-out" : "msg-in"'>
    <div class="msg-avator"> {{ msg.isSend ? "我" : 'Ta' }} </div>
    <div class="msg-content">
      <pre v-if='msg.type === "0"'>{{ msg.content }}</pre>
      <img class='msg-img' v-if='msg.type==="img"' :src="msg.content" alt="">
    </div>
  </div>
</template>

<script>
export default {
  props: {
    msg: {
      type: Object,
      default () {
        return {
          content: '',
          type: 'text',
          isSend: true
        }
      }
    }
  },

  methods: {
    format (str) {
      return str.replace('\n', '<br/>')
    }
  }
}
</script>

<style scoped lang='scss'>
.msg {
  position: relative;
  width: 100%;
  margin-bottom: 10px;
  &-avator {
    position: absolute;
    width: 30px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    border-radius: 4px;
    background: linear-gradient(120deg, #ddd, #bbb);
  }
  &-in {
    padding-left: 40px;
    .msg-avator {
      left: 0;
    }
  }
  &-out {
    text-align: right;
    padding-right: 40px;
    .msg-avator {
      right: 0;
    }
  }

  &-content {
    display: inline-block;
    padding: 10px;
    background: #aea;
    border-radius: 4px;
    text-align: left;
    &-img {
      max-width: 100%;
      max-height: 200px;
    }
  }
}
</style>
