// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import N3Components from 'N3-components'
import 'N3-components/dist/index.min.css'

import MyVueResource from './plugins/resource'
import MyServices from './plugins/services'

MyVueResource.setDefaultBaseURL('http://localhost:8000')
MyVueResource.setDedaultHeaders({'Content-Type': 'application/x-www-form-urlencoded'})

Vue.use(N3Components)
Vue.use(MyVueResource)
Vue.use(MyServices)

Vue.debug = process.env.NODE_ENV !== 'production'
Vue.config.productionTip = Vue.debug

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
