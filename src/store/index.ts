import { createStore } from "vuex";

export default createStore({
  state: {
    authModalActive: false,
  },
  getters: {
    // getAuthModalActive: (state) => state.authModalActive,
  },
  mutations: {
    toggleAuthModal: (state) =>
      (state.authModalActive = !state.authModalActive),
  },
  actions: {},
  modules: {},
});
