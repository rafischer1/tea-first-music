import { createStore } from "vuex";
import VuexPersistence from "vuex-persist";
import { Howl } from "howler";
import helper from "@/includes/helper";

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
    seek: undefined as number | undefined,
    duration: undefined as number | undefined,
  },
  getters: {
    // getAuthModalActive: (state) => state.authModalActive,
    playing: (state) => state.sound?.playing(),
    seek: (state) => helper.formatTime(state.seek),
    duration: (state) => helper.formatTime(state.duration),
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
    updatePosition: (state) => {
      state.seek = state.sound?.seek();
      state.duration = state.sound?.duration();
    },
  },
  actions: {
    async newTrackAction(
      { commit, state, dispatch },
      payload: { url: string }
    ) {
      commit("newTrack", payload);
      if (state.sound?.playing()) {
        state.sound?.on("play", () => {
          requestAnimationFrame(() => {
            dispatch("progress");
          });
        });
      }
    },
    stopPlaybackAction({ commit }) {
      commit("stopPlayback");
    },
    async toggleAudio({ state }) {
      if (!this.state.sound) {
        return;
      }
      if (state.sound?.playing()) {
        state.sound?.pause();
      } else {
        state.sound?.play();
      }
    },
    async stopAudio({ state }) {
      if (!this.state.sound) {
        return;
      }
      state.sound?.stop();
    },
    progress({ commit, state, dispatch }) {
      commit("updatePosition");
    },
  },
  modules: {},
  plugins: [vuexLocal.plugin],
});
