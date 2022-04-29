<template>
  <main>
    <raf-intro />
    <section class="container mx-auto">
      <div
        class="bg-white/[.9] rounded border border-gray-200 relative flex flex-col mt-24"
      >
        <div
          class="px-6 pt-6 pb-5 font-bold border-b border-gray-200 bg-white/[.95]"
          v-icon.right.teal.xl="headphonesIcon"
        >
          <span class="card-title">{{ $t("home.title") }}</span>
        </div>
        <raf-playlist />
      </div>
    </section>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import RafIntro from "@/components/Introduction.vue";
import RafPlaylist from "@/components/Playlist.vue";
import { mapState } from "vuex";

export default defineComponent({
  name: "HomeView",
  components: { RafPlaylist, RafIntro },
  data() {
    return {
      headphonesIcon: "headphones-alt",
    };
  },
  computed: {
    ...mapState(["locale"]),
  },
  updated() {
    this.$i18n.locale = this.locale;
  },
});
</script>
