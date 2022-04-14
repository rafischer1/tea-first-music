<template>
  <!-- Playlist -->
  <ol id="playlist">
    <li
      class="flex justify-between items-center p-3 pl-6 cursor-pointer transition duration-300 hover:bg-gray-50"
    >
      <raf-song :artist="'Selbyville'" :title="'Until Dark'" :time="'4:25'" />
    </li>
  </ol>
</template>

<script lang="ts">
import RafSong from "@/components/Song.vue";
export default {
  name: "RafPlaylist",
  components: { RafSong },
};
</script>
