<template>
  <!-- Playlist -->
  <ol id="playlist">
    <raf-song
      v-for="(track, i) in tracks"
      :key="track.docId"
      :title="track.modifiedName"
      :track-id="track.docId"
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
      maxPerPage: 10,
    };
  },
  async created() {
    await this.getTracks();
    window.addEventListener("scroll", this.handleScroll);
  },
  methods: {
    async handleScroll() {
      const { scrollTop, offsetHeight } = document.documentElement;
      const { innerHeight } = window;
      const windowBottom = Math.round(scrollTop) + innerHeight === offsetHeight;

      if (windowBottom) await this.getTracks();
    },
    async getTracks() {
      let snapshots;
      if (this.tracks.length > 0) {
        const lastDoc = await songsCollection
          .doc(this.tracks[this.tracks.length - 1].docId)
          .get();

        snapshots = await songsCollection
          .where("uid", "==", "123456")
          .startAfter(lastDoc)
          .limit(this.maxPerPage)
          .get();
      } else {
        snapshots = await songsCollection
          .where("uid", "==", "123456")
          .limit(this.maxPerPage)
          .get();
      }

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
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  },
});
</script>
