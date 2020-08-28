import Vue from 'vue'
import App from './App.vue'

import Vued3jsComponents from '../../lib'

Vue.config.productionTip = false

Vue.use(Vued3jsComponents)

new Vue({
  render: h => h(App),
}).$mount('#app')
