<template>
  <main>
    <section class="container mx-auto mt-6">
      <div class="md:grid md:grid-cols-3 md:gap-4">
        <raf-upload />
        <raf-song-manager />
      </div>
    </section>
  </main>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import store from "@/store";
import RafUpload from "@/components/admin/Upload.vue";
import RafSongManager from "@/components/admin/SongManager.vue";
export default defineComponent({
  name: "RafAdmin",
  components: { RafSongManager, RafUpload },
  data() {
    return {
      allow: false,
    };
  },
  beforeRouteEnter(to, from, next) {
    return store.state.admin ? next() : next({ name: "home" });
  },
});
</script>
