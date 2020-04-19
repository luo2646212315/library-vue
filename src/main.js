import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'element-ui/lib/theme-chalk/index.css'
import ElementUI from 'element-ui'
import './assets/iconfont/iconfont'
Vue.use(ElementUI)//全局使用ElementUI
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
