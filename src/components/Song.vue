<template>
  <li
    class="flex justify-between items-center p-3 pl-6 cursor-pointer transition duration-300 hover:bg-gray-50"
  >
    <div>
      <a href="#" class="font-bold block text-zinc-700">{{ title }}</a>
      <span class="text-zinc-600 text-md">{{ artist }}</span>
    </div>

    <div class="text-zinc-700 text-lg">
      <span class="comments">
        {{ time }}
      </span>
    </div>
  </li>
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
