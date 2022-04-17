<template>
  <!-- Playlist -->
  <ol id="playlist">
    <raf-song
      v-for="(track, i) in tracks"
      :key="track.docId"
      :title="track.modifiedName"
      :comment-count="track.comment_count"
      :index="i"
    />
  </ol>
</template>

<script lang="ts">
import RafSong from "@/components/Song.vue";
import Track from "@/interfaces/song.interface";
import { songsCollection } from "@/includes/firebase";
import { defineComponent } from "vue";
export default defineComponent({
  name: "RafPlaylist",
  components: { RafSong },
  data() {
    return {
      tracks: [] as Track[],
    };
  },
  async created() {
    const snapshots = await songsCollection.where("uid", "==", "123456").get();
    snapshots.forEach((document) => {
      const track: Track = {
        uid: document.data().uid,
        userDisplayName: document.data().userDisplayName,
        originalName: document.data().originalName,
        modifiedName: document.data().modifiedName,
        genre: document.data().genre,
        comment_count: document.data().comment_count ?? 0,
        url: document.data().url,
        docId: document.id,
      };
      this.tracks.push(track);
    });
  },
});
</script>
