<template>
  <div>
    <div class="mb-5">
      <div class="font-bold">{{ name }}</div>
      <time>{{ datePosted }}</time>
    </div>
    <p>
      {{ content }}
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "raf-comment",
  props: {
    name: String,
    datePosted: String,
    content: String,
  },
});
</script>
