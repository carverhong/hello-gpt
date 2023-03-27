import Vue from 'vue'
import App2 from './App2.vue'
import './plugins/element.js'

Vue.config.productionTip = false

new Vue({
  render: h => h(App2),
}).$mount('#app')
