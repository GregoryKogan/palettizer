import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import store from './store'
import 'img-comparison-slider';

Vue.config.productionTip = false

Vue.config.ignoredElements = [/img-comparison-slider/]

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
