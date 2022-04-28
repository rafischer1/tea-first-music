<template>
  <div
    class="fixed bottom-0 left-0 bg-white p-5 pb-4 text-left align-top w-full h-16"
  >
    <div class="relative">
      <!-- Play/Pause Button -->
      <div class="float-left w-7 h-7 leading-3 flex">
        <button type="button" @click.prevent="playPause">
          <i
            class="fa text-zinc-500 text-xl fa-pause"
            :class="{ 'fa-play': !playing }"
          ></i>
        </button>
        <button
          type="button"
          @click.prevent="playStop"
          :disabled="!playing"
          class="ml-3 mr-3"
        >
          <i class="fa text-zinc-500 text-xl fa-stop"></i>
        </button>
      </div>
      <!-- Current Position -->
      <!--      <div-->
      <!--        class="float-left w-7 h-7 leading-3 text-zinc-400 mt-0 text-lg w-14 ml-5 mt-1"-->
      <!--      >-->
      <!--        <span class="player-currenttime">00:00</span>-->
      <!--      </div>-->
      <!--      &lt;!&ndash; Scrub &ndash;&gt;-->
      <!--      <div class="float-left w-7 h-7 leading-3 ml-7 mt-2 player-scrub">-->
      <!--        <div-->
      <!--          class="absolute left-0 right-0 text-lg text-center mx-auto player-song-info"-->
      <!--        >-->
      <!--          <span class="song-title">Song Title</span> by-->
      <!--          <span class="song-artist">Artist</span>-->
      <!--        </div>-->
      <!--        &lt;!&ndash; Scrub Container  &ndash;&gt;-->
      <!--        <span-->
      <!--          class="block w-full h-2 rounded m-1 mt-2 bg-gray-200 relative cursor-pointer"-->
      <!--        >-->
      <!--          &lt;!&ndash; Player Ball &ndash;&gt;-->
      <!--          <span-->
      <!--            class="absolute top-neg-8 text-gray-800 text-lg"-->
      <!--            style="left: 50%"-->
      <!--          >-->
      <!--            <i class="fas fa-circle"></i>-->
      <!--          </span>-->
      <!--          &lt;!&ndash; Player Progress Bar&ndash;&gt;-->
      <!--          <span-->
      <!--            class="block h-2 rounded bg-gradient-to-r from-teal-700 to-teal-400"-->
      <!--            style="width: 50%"-->
      <!--          ></span>-->
      <!--        </span>-->
      <!--      </div>-->
      <!-- Duration -->
      <div
        class="float-left w-7 h-7 leading-3 text-gray-400 mt-0 text-lg w-14 ml-8 mt-1"
      >
        <span class="player-duration">{{ seek }}</span>
      </div>
      <div
        class="float-left w-7 h-7 leading-3 text-gray-400 mt-0 text-lg w-14 ml-8 mt-1"
      >
        <span class="player-duration">{{ duration }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions, mapGetters } from "vuex";

export default defineComponent({
  name: "RafPlayer",
  computed: {
    ...mapGetters(["playing", "duration", "seek"]),
  },
  methods: {
    ...mapActions(["toggleAudio", "stopAudio", "progress"]),
    playPause() {
      this.toggleAudio();
      this.progress();
    },
    playStop() {
      this.stopAudio();
      this.progress();
    },
  },
});
</script>
