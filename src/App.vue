<template>
  <raf-header />
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
        <i class="fa fa-headphones-alt float-right text-green-400 text-xl"></i>
      </div>
      <raf-playlist />
      <!-- .. end Playlist -->
    </div>
  </section>

  <!-- Player -->
  <raf-player />
  <!--  Auth Modal-->
  <raf-auth />
</template>

<style></style>
<script>
import RafIntro from "@/components/Introduction";
import RafHeader from "@/components/Header";
import RafAuth from "@/components/auth/Auth";
import RafPlaylist from "@/components/Playlist";
import RafPlayer from "@/Player";
export default {
  components: { RafPlayer, RafPlaylist, RafAuth, RafHeader, RafIntro },
};
</script>
