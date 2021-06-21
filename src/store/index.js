import { createStore } from 'vuex';
import storage from 'assets/js/tools/storage';
import { socketStatusCode } from 'assets/js/model/constants';
import friendInfoModule from './friendInfoModule';

const store = createStore({
  state: {
    account: '',
    name: '',
    signature: '',
    groupNames: [],
    loginStatus: false,
    token: storage.get('user') && storage.get('user').token,
    socket: null,
    sockeStatusCode: socketStatusCode.NO_CONNECT,
  },
  mutations: {
    setLoginStatus(state, payload) {
      state.loginStatus = payload;
    },
    setAccount(state, payload) {
      state.account = payload;
    },
    setName(state, payload) {
      state.name = payload;
    },
    setToken(state, payload) {
      state.token = payload;
    },
    setGroupNames(state, payload) {
      state.groupNames = payload;
    },
    setSignature(state, payload) {
      state.signature = payload;
    },
    setSocket(state, newSocket) {
      state.socket = newSocket;
    },
    changeSocketStatus(state, code) {
      state.socketStatusCode = code;
    },
  },
  actions: {
    loginInit({ commit }, payload) {
      commit('setLoginStatus', true);
      commit('setAccount', payload.account);
      commit('setName', payload.name);
      commit('setToken', payload.token);
      commit('setGroupNames', payload.groupNames);
      commit('setSignature', payload.signature);
    },
  },
  modules: {
    friendInfoModule,
  },
});

export default store;
