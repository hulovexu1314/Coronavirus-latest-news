import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'

import'./assets/reset.css'
import echarts from 'echarts'

Vue.prototype.$echarts = echarts

Vue.config.productionTip = false


new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
