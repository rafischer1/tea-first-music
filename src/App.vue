<template>
  <raf-header />
  <!-- Player -->
  <raf-player />
  <!--  Auth Modal-->
  <raf-auth />
  <router-view></router-view>
</template>

<style></style>
<script>
import RafHeader from "@/components/Header";
import RafAuth from "@/components/auth/Auth";
import RafPlayer from "@/Player";
export default {
  components: { RafPlayer, RafAuth, RafHeader },
};
</script>
