import { StoreOptions } from "vuex";

export default {
  state: {
    authModalActive: false,
    authenticated: false,
    admin: false,
  },
  getters: {},
  mutations: {
    toggleAuthModal: (state) =>
      (state.authModalActive = !state.authModalActive),
    toggleAuthenticated: (state) =>
      (state.authenticated = !state.authenticated),
    toggleAdmin: (state) => (state.admin = !state.admin),
  },
  actions: {},
} as StoreOptions<any>;
