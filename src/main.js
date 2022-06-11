import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from './router'
import axios from 'axios'
import { initAxios } from './axios'

initAxios(Vue)

Vue.prototype.$axios = axios

Vue.config.productionTip = false

Vue.use(VueRouter)

new Vue({
  render: h => h(App),
  router:router
}).$mount('#app')
