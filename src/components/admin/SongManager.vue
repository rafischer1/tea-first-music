<template>
  <div class="col-span-2">
    <div class="bg-white rounded border border-gray-200 relative flex flex-col">
      <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
        <span class="card-title">Tracks</span>
        <i class="fa fa-compact-disc float-right text-teal-600 text-2xl"></i>
      </div>
      <div class="p-6">
        <!-- Composition Items -->
        <raf-comp-item
          v-for="(track, i) in tracks"
          :key="track.docId"
          :track="track"
          :index="i"
          :updateTrack="updateTrack"
          :removeTrack="removeTrack"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { songsCollection } from "@/includes/firebase";
import Track from "@/interfaces/song.interface";
import RafCompItem from "@/components/admin/CompositionItem.vue";

export default defineComponent({
  name: "RafSongManager",
  components: { RafCompItem },
  data() {
    return {
      hi: false,
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
  methods: {
    updateTrack(i: number, values: { modifiedName: string; genre: string }) {
      this.tracks[i].modifiedName = values.modifiedName;
      this.tracks[i].genre = values.genre;
    },
    removeTrack(i: number) {
      this.tracks.splice(i, 1);
    },
  },
});
</script>

<style scoped></style>
