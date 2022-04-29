<template>
  <main>
    <raf-intro />
    <!-- Main Content -->
    <section class="container mx-auto">
      <div
        class="bg-white/[.9] rounded border border-gray-200 relative flex flex-col mt-24"
      >
        <div
          class="px-6 pt-6 pb-5 font-bold border-b border-gray-200 bg-white/[.95]"
        >
          <span class="card-title">Tea First Selections</span>
          <!-- Icon -->
          <i class="fa fa-headphones-alt float-right text-teal-600 text-xl"></i>
        </div>
        <raf-playlist />
        <!-- .. end Playlist -->
      </div>
    </section>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import RafIntro from "@/components/Introduction.vue";
import RafPlaylist from "@/components/Playlist.vue";

export default defineComponent({
  name: "HomeView",
  components: { RafPlaylist, RafIntro },
});
</script>
