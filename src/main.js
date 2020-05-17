import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'element-ui/lib/theme-chalk/index.css'
import ElementUI from 'element-ui'
import './assets/iconfont/iconfont'
import * as customerFilter from './filter/index'
import methods from './golbal/golbal'
import store from './store/store'
Vue.use(ElementUI)//全局使用ElementUI
Vue.config.productionTip = false
Vue.use(methods)//引入全局方法
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

Object.keys(customerFilter).forEach(key => {
  Vue.filter(key, customerFilter[key])
})