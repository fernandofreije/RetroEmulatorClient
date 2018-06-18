import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isAuth: false,
    id: null,
    username: null,
    email: null,
    admin: false,
    uploadRom: {
      firstNextDisabled: true,
      secondNextDisabled: true,
      file: null,
      selectedGame: null
    }
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
    },
    enableUploadRomFirstNext(state) {
      state.uploadRom.firstNextDisabled = false;
    },
    disableUploadRomFirstNext(state) {
      state.uploadRom.firstNextDisabled = true;
    },
    enableUploadRomSecondNext(state) {
      state.uploadRom.secondNextDisabled = false;
    },
    disableUploadRomSecondNext(state) {
      state.uploadRom.secondNextDisabled = true;
    },
    addedRomFile(state, file) {
      state.uploadRom.file = file;
    },
    removedRomFile(state) {
      state.uploadRom.file = null;
    },
    selectGameData(state, gameData) {
      state.uploadRom.selectedGame = gameData;
    }
  },
  actions: {
    login(context, response) {
      context.commit('loadUserData', response);
    },
    logout(context) {
      context.commit('unloadUserData');
    },
    uploadedRomFile(context, file) {
      context.commit('enableUploadRomFirstNext');
      context.commit('addedRomFile', file);
    },
    removedRomFile(context) {
      context.commit('disableUploadRomFirstNext');
      context.commit('removedRomFile');
    },
    selectGameData(context, selected) {
      context.commit('selectGameData', selected);
      context.commit('enableUploadRomSecondNext');
    }
  }
});
