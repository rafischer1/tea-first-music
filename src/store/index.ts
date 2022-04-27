import { createStore } from "vuex";
import VuexPersistence from "vuex-persist";
import { Howl } from "howler";

const vuexLocal = new VuexPersistence<any>({
  key: "VueMusic",
  storage: window.localStorage,
  reducer: (state) => {
    return {
      admin: state.admin,
      authenticated: state.authenticated,
      authModalActive: state.authModalActive,
    };
  },
});

export default createStore({
  state: {
    authModalActive: false,
    authenticated: false,
    admin: false,
    currentSong: null as null | { url: string },
    sound: null as Howl | null,
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
    newTrack: (state, payload: { url: string }) => {
      state.currentSong = payload;
      state.sound = new Howl({ src: [payload.url], html5: true });
      state.sound?.play();
    },
    stopPlayback: (state) => state.sound?.stop(),
  },
  actions: {
    async newTrackAction({ commit, state }, payload: { url: string }) {
      commit("newTrack", payload);
    },
    stopPlaybackAction({ commit }) {
      commit("stopPlayback");
    },
  },
  modules: {},
  plugins: [vuexLocal.plugin],
});
