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
  <section class="container mx-auto mt-6">
    <div class="bg-white rounded border border-gray-200 relative flex flex-col">
      <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
        <!-- Comment Count -->
        <span class="card-title">Comments {{ track?.comment_count }}</span>
        <i class="fa fa-comments float-right text-teal-600 text-2xl"></i>
      </div>
      <div class="p-6">
        <form>
          <textarea
            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded mb-4"
            placeholder="Your comment here..."
          ></textarea>
          <button
            type="submit"
            class="py-1.5 px-3 rounded text-white bg-teal-600 block"
          >
            Submit
          </button>
        </form>
        <!-- Sort Comments -->
        <select
          class="block mt-4 py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        >
          <option value="1">Latest</option>
          <option value="2">Oldest</option>
        </select>
      </div>
    </div>
  </section>
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

export default defineComponent({
  name: "ViewTrack",
  components: { RafComment },
  data() {
    return {
      track: null as unknown as Track,
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
});
</script>
