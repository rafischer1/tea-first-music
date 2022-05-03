<template>
  <!-- Introduction -->
  <section id="introduction" class="mb-8 py-20 text-white text-center static">
    <div class="absolute inset-0 w-full h-full bg-contain introduction-bg">
      <img
        class="relative block mx-auto mt-5 w-auto h-7/8"
        src="assets/img/tea_first.png"
        alt="tf-logo"
      />
    </div>
  </section>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "raf-intro",
});
</script>
