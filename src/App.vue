<template>
  <raf-header />
  <raf-player />
  <raf-auth />
  <router-view></router-view>
</template>
<script>
import RafHeader from "@/components/Header";
import RafAuth from "@/components/auth/Auth";
import RafPlayer from "@/components/Player";
export default {
  components: { RafPlayer, RafAuth, RafHeader },
};
</script>
