import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isAuth: false,
    id: null,
    username: null,
    email: null,
    admin: false
  },
  mutations: {
    updateUsername(state, username) {
      state.username = username;
    },
    updateEmail(state, username) {
      state.username = username;
    },
    loadUserData(state, payload) {
      state.isAuth = true;
      state.id = payload.id;
      state.username = payload.username;
      state.email = payload.email;
      state.admin = payload.admin;
    },
    unloadUserData(state) {
      state.isAuth = false;
      state.id = null;
      state.username = null;
      state.email = null;
      state.admin = null;
    } },
  actions: {
    login(context, response) {
      context.commit('loadUserData', response);
    },
    logout(context) {
      context.commit('unloadUserData');
    }
  }
});
