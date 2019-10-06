import Vue from 'vue'
import App from './App.vue'
import 'lib-flexible'
import router from './router/router'
import './assets/css/reset.css';
import Vant from 'vant';
import 'vant/lib/index.css';
import Cookies from 'js-cookie';
import './autoInstall';


Vue.use(Vant);

Vue.config.productionTip = false
window.Cookies = Vue.prototype.Cookies = Cookies;

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
