// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import axios from 'axios';
import VueSweetalert2 from 'vue-sweetalert2';
import App from './App';
import router from './router';
import store from './store/store';

Vue.config.productionTip = false;
axios.defaults.withCredentials = true;
Vue.prototype.$http = axios;
Vue.use(VueSweetalert2);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
});
