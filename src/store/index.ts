import { createStore } from "vuex";

export default createStore({
  state: {
    authModalActive: false,
    authenticated: false,
  },
  getters: {
    // getAuthModalActive: (state) => state.authModalActive,
  },
  mutations: {
    toggleAuthModal: (state) =>
      (state.authModalActive = !state.authModalActive),
    toggleAuthenticated: (state) =>
      (state.authenticated = !state.authenticated),
  },
  actions: {},
  modules: {},
});
