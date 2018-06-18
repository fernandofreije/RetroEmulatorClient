// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import axios from 'axios';
import VueSweetalert2 from 'vue-sweetalert2';
import VueFormWizard from 'vue-form-wizard';
import 'vue-form-wizard/dist/vue-form-wizard.min.css';
import VueGoodTable from 'vue-good-table';
import 'vue-good-table/dist/vue-good-table.css';


import App from './App';
import router from './router';
import store from './store/store';


Vue.config.productionTip = false;
axios.defaults.withCredentials = true;
Vue.prototype.$http = axios;
Vue.use(VueSweetalert2);
Vue.use(VueFormWizard);
Vue.use(VueGoodTable);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
});
