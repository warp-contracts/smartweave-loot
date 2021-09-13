import Vue from 'vue'
import App from './App.vue'
import VueVirtualScroller from 'vue-virtual-scroller'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import '@babel/polyfill'
import './to-hex-polyfill'

import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'

Vue.use(VueVirtualScroller)
Vue.config.productionTip = false

Vue.filter('short-address', function(val) {
  if (val) {
    return val.slice(0, 5) + '...' + val.slice(-5)
  } else {
    return ''
  }
})

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
