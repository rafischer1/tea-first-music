<template>
  <li
    class="flex justify-between items-center p-3 pl-6 cursor-pointer transition duration-300 hover:bg-gray-50"
  >
    <div>
      <a href="#" class="font-bold block text-zinc-700" @click.prevent.stop>{{
        title
      }}</a>
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
  },
  name: "RafSong",
});
</script>
