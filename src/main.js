import Vue from 'vue';
import App from './App.vue'
import router from './router'
import { store } from './_store'
import  vuetify from '@/plugins/vuetify';
import { loadFonts } from './plugins/webfontloader'

loadFonts()

Vue.config.productionTip = false;

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app');