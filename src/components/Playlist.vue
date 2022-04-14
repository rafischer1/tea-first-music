<template>
  <!-- Playlist -->
  <ol id="playlist">
    <raf-song :artist="'Selbyville'" :title="'Until Dark'" :time="'3:40'" />
    <raf-song
      :artist="'Applesauce'"
      :title="'Unstoppable Death Machine'"
      :time="'4:25'"
    />
    <raf-song :artist="'Graham'" :title="'Untitled 3 Part 2'" :time="'5:14'" />
  </ol>
</template>

<script lang="ts">
import RafSong from "@/components/Song.vue";
export default {
  name: "RafPlaylist",
  components: { RafSong },
};
</script>
