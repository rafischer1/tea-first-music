<template>
  <li
    class="flex justify-between items-center p-3 pl-6 cursor-pointer transition duration-300 hover:bg-gray-50"
  >
    <div>
      <router-link
        class="font-bold block text-zinc-700"
        @click.prevent.stop
        :to="{ name: 'track', params: { id: trackId } }"
        >{{ title }}</router-link
      >
    </div>
  </li>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    title: String,
    trackId: String,
  },
  name: "RafSong",
});
</script>
