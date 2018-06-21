import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';
import router from '../router';

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  modules: ['user']
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
      selectedGame: null,
      gameData: null
    },
    gameEmulated: null
  },
  mutations: {
    updateUsername(state, username) {
      state.user.username = username;
    },
    updateEmail(state, username) {
      state.user.username = username;
    },
    loadUserData(state, payload) {
      state.user.isAuth = true;
      state.user.id = payload.id;
      state.user.username = payload.username;
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
      state.uploadRom.gameData = gameData;
    },
    removeGameData(state) {
      state.uploadRom.gameData = null;
    },
    resetUploadRom(state, wizard = null) {
      state.uploadRom = {
        firstNextDisabled: true,
        secondNextDisabled: true,
        file: null,
        selectedGame: null,
        gameData: null
      };
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
    },
    setGameEmulated(state, game) {
      state.gameEmulated = game;
    },
    removeGameEmulated(state) {
      state.gameEmulated = null;
    }
  },
  actions: {
    login(context, response) {
      context.commit('loadUserData', response);
      context.commit('resetUploadRom');
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
