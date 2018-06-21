// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import axios from 'axios';
import VueSweetalert2 from 'vue-sweetalert2';
import VueGoodTable from 'vue-good-table';
import 'vue-good-table/dist/vue-good-table.css';
import 'vue2-animate/dist/vue2-animate.min.css';
import VModal from 'vue-js-modal';
import Meta from 'vue-meta';
import App from './App';
import router from './router';
import store from './store/store';


Vue.config.productionTip = false;
axios.defaults.withCredentials = true;
axios.interceptors.response.use(
  response => response,
  (error) => {
    if (error.response.status === 403) store.dispatch('logout');
    return Promise.reject(error);
  });
Vue.prototype.$http = axios;
Vue.use(VueSweetalert2);
Vue.use(VueGoodTable);
Vue.use(VModal);
Vue.use(Meta);
Vue.use(require('vue-moment'));

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  metaInfo: {
    title: 'RetroEmulator',
    titleTemplate: '%s',
    link: [
      { rel: 'icon', href: '/static/images/logo.png' }
    ]
  }
});
