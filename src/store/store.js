import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';
import router from '../router';

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  modules: ['user', 'gameData']
});

export default new Vuex.Store({
  state: {
    user: {
      isAuth: false,
      id: null,
      username: null,
      email: null,
      admin: false,
      layout: null
    },
    userRoms: [],
    uploadRom: {
      firstNextDisabled: true,
      secondNextDisabled: true,
      file: null,
      selectedGame: null
    },
    gameData: null
  },
  mutations: {
    updateUsername(state, user) {
      state.user.username = user;
    },
    updateEmail(state, email) {
      state.user.email = email;
    },
    loadUserData(state, payload) {
      state.user.isAuth = true;
      state.user.id = payload.id;
      state.user.username = payload.user;
      state.user.email = payload.email;
      state.user.admin = payload.admin;
    },
    unloadUserData(state) {
      state.user.isAuth = false;
      state.user.id = null;
      state.user.username = null;
      state.user.email = null;
      state.user.admin = false;
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
    },
    deselectGameData(state) {
      state.uploadRom.selectedGame = null;
    },
    addGameData(state, gameData) {
      state.gameData = gameData;
    },
    removeGameData(state) {
      state.gameData = null;
    },
    resetUploadRom(state, wizard = null) {
      state.uploadRom = {
        firstNextDisabled: true,
        secondNextDisabled: true,
        file: null,
        selectedGame: null,
      };
      state.gameData = null;
      if (wizard) wizard.reset();
    },
    setUserRoms(state, roms) {
      state.userRoms = roms;
    },
    deleteUserRom(state, romId) {
      state.userRoms = state.userRoms.filter(x => x.id !== romId);
    },
    setLayout(state, layout) {
      state.user.layout = layout;
    },
    deleteFromLayout(state, romId) {
      state.user.layout = state.user.layout.filter(x => x.id !== romId);
    }
  },
  actions: {
    login(context, response) {
      context.commit('loadUserData', response);
      context.commit('resetUploadRom');
      router.push('/');
    },
    updateUserData(context, response) {
      context.commit('updateUsername', response.user);
      context.commit('updateEmail', response.email);
      router.push('/');
    },
    logout(context) {
      context.commit('unloadUserData');
      router.push('/login');
    },
    uploadedRomFile(context, file) {
      context.commit('enableUploadRomFirstNext');
      context.commit('addedRomFile', file);
    },
    removedRomFile(context) {
      context.commit('disableUploadRomFirstNext');
      context.commit('removedRomFile');
    },
    getGameData(context, selected) {
      context.commit('addGameData', selected);
      context.commit('enableUploadRomSecondNext');
    },
    deleteRom(context, romId) {
      context.commit('deleteUserRom', romId);
      context.commit('deleteFromLayout', romId);
    }
  },
  plugins: [vuexLocal.plugin]
});
