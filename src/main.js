import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueSocketIO from 'vue-socket.io'
import '@/styles/index.css'
import '@/plugins'

Vue.use(new VueSocketIO({
  debug: true,
  connection: ''
}))

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
