<template>
  <div class='wrapper flex'>
    <!-- 联系人 -->
    <contact ref='contacts' class='flex-aside contacts' @checkUser='checkUser'></contact>

    <div class="flex-main">
      <profile v-if='contact' :contact='contact' :isNew='isNew' @addSucc='refresh'></profile>
    </div>
  </div>
</template>

<script>
import Contact from './components/contact/index.vue'
import Profile from './components/profile/index.vue'

export default {
  components: { Contact, Profile },

  data () {
    return {
      contact: null,
      isNew: false
    }
  },

  methods: {
    checkUser (contact, isNew) {
      this.contact = contact
      this.isNew = isNew
    },

    refresh () {
      this.isNew = false
      this.$refs.contacts.refresh()
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  width: 100%;
  height: 100%;
}
</style>
