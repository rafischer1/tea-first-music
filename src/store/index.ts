import { createStore } from "vuex";
import VuexPersistence from "vuex-persist";

const vuexLocal = new VuexPersistence<any>({
  storage: window.localStorage,
});

export default createStore({
  state: {
    authModalActive: false,
    authenticated: false,
    admin: false,
  },
  getters: {
    // getAuthModalActive: (state) => state.authModalActive,
  },
  mutations: {
    toggleAuthModal: (state) =>
      (state.authModalActive = !state.authModalActive),
    toggleAuthenticated: (state) =>
      (state.authenticated = !state.authenticated),
    toggleAdmin: (state) => (state.admin = !state.admin),
  },
  actions: {},
  modules: {},
  plugins: [vuexLocal.plugin],
});
