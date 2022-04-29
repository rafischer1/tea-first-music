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
    currentSong: null as null | { url: string; title: string },
    sound: null as Howl | null,
    seek: undefined as string | undefined,
    duration: undefined as string | undefined,
    playerProgress: "0%",
    locale: "en" as "en" | "es" | "de",
  },
  getters: {
    // getAuthModalActive: (state) => state.authModalActive,
    playing: (state) => state.sound?.playing(),
  },
  mutations: {
    toggleAuthModal: (state) =>
      (state.authModalActive = !state.authModalActive),
    toggleAuthenticated: (state) =>
      (state.authenticated = !state.authenticated),
    toggleAdmin: (state) => (state.admin = !state.admin),
    newTrack: (state, payload: { url: string; title: string }) => {
      state.playerProgress = "0%";
      state.currentSong = payload;
      state.sound = new Howl({ src: [payload.url], html5: true });
    },
    stopPlayback: (state) => state.sound?.stop(),
    updatePosition: (state) => {
      state.seek = helper.formatTime(state.sound?.seek());
      state.duration = helper.formatTime(state.sound?.duration());
      const seek = state.sound?.seek() ?? 0;
      const duration = state.sound?.duration() ?? 0;
      state.playerProgress = `${(seek / duration) * 100}%`;
    },
    updateLocale: (state, payload: { selected: "en" | "es" | "de" }) => {
      state.locale = payload.selected;
    },
  },
  actions: {
    async newTrackAction(
      { commit, state, dispatch },
      payload: { url: string; title: string }
    ) {
      if (state.sound instanceof Howl) {
        state.sound?.unload();
      }
      commit("newTrack", payload);
      state.playerProgress = "0%";
      state.sound?.play();
      state.sound?.on("play", () => {
        requestAnimationFrame(() => {
          dispatch("progress");
        });
      });
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

      if (state.sound?.playing()) {
        requestAnimationFrame(() => {
          dispatch("progress");
        });
      }
    },
    updateSeek(
      { state, dispatch },
      payload: { currentTarget: any; clientX: number }
    ) {
      if (!state.sound?.playing()) {
        return;
      }

      const { x, width } = payload.currentTarget.getBoundingClientRect();
      // Document = 2000, Timeline = 1000, Click = 500, Distance = 500
      const clickX = payload.clientX - x;
      const percentage = clickX / width;
      const duration = state.sound?.duration() ?? 0;
      const seconds = duration * percentage;

      state.sound?.seek(seconds);

      state.sound.once("seek", () => {
        dispatch("progress");
      });
    },
  },
  modules: {},
  plugins: [vuexLocal.plugin],
});
