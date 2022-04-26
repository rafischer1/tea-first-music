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

    <div class="text-zinc-700 text-lg">
      <span class="comments">
        {{ commentCount }}
      </span>
    </div>
  </li>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    title: String,
    commentCount: String,
    trackId: String,
  },
  name: "RafSong",
});
</script>
