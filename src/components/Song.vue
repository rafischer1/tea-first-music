<template>
  <div>
    <a href="#" class="font-bold block text-zinc-700">{{ title }}</a>
    <span class="text-zinc-600 text-md">{{ artist }}</span>
  </div>

  <div class="text-zinc-700 text-lg">
    <span class="comments">
      {{ time }}
    </span>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    title: String,
    artist: String,
    time: String,
  },
  name: "RafSong",
};
</script>
