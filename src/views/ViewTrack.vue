<template>
  <!-- Music Header -->
  <section class="w-full mb-8 py-14 text-center text-white relative">
    <div
      class="absolute inset-0 w-full h-full box-border bg-contain music-bg"
    ></div>
    <div class="container mx-auto flex items-center">
      <!-- Play/Pause Button -->
      <button
        type="button"
        @click.prevent.stop="play"
        :class="{
          'text-orange-400 border-2 border-orange-400 hover:text-orange-400 hover:border-orange-400':
            activePlay,
        }"
        class="z-50 h-24 w-24 text-3xl bg-white text-black rounded-full focus:outline-none hover:text-teal-800 hover:border-2 hover:border-teal-800 active:text-teal-600 active:border-2 active:border-teal-600"
      >
        <i class="fas fa-play"></i>
      </button>
      <div class="z-50 text-left ml-8">
        <!-- Song Info -->
        <div class="text-3xl font-bold">{{ track?.modifiedName }}</div>
        <div>{{ track?.genre }}</div>
      </div>
    </div>
  </section>
  <!-- Form -->
  <CommentForm />
  <!-- Comments -->
  <ul class="container mx-auto">
    <li class="p-6 bg-gray-50 border border-gray-200">
      <RafComment />
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import RafComment from "@/components/comment.vue";
import { songsCollection } from "@/includes/firebase";
import Track from "@/interfaces/song.interface";
import CommentForm from "@/components/CommentForm.vue";

export default defineComponent({
  name: "ViewTrack",
  components: { CommentForm, RafComment },
  data() {
    return {
      track: null as unknown as Track,
      activePlay: false,
      playButton:
        "z-50 h-24 w-24 text-3xl bg-white text-black rounded-full focus:outline-none hover:text-teal-800 hover:border-2 hover:border-teal-800 active:text-teal-600 active:border-2 active:border-teal-600",
    };
  },
  async created() {
    const id = this.$route.params.id as string;
    if (id) {
      const snapshot = await songsCollection.doc(id).get();
      if (!snapshot.exists) {
        await this.$router.push({ name: "home" });
        return;
      }
      this.track = snapshot.data() as Track;
    }
  },
  methods: {
    play() {
      this.toggleActivePlay();
      setTimeout(() => {
        this.toggleActivePlay();
      }, 2000);
    },
    toggleActivePlay() {
      this.activePlay = !this.activePlay;
    },
  },
});
</script>
