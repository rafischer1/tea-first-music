<template>
  <raf-header />
  <raf-player />
  <raf-auth />
  <router-view></router-view>
  <!--  <router-view v-slot="{ Component }">-->
  <!--    <transition name="fade" mode="out-in">-->
  <!--      <component :is="Component"></component>-->
  <!--    </transition>-->
  <!--  </router-view>-->
</template>
<script>
import RafHeader from "@/components/Header";
import RafAuth from "@/components/auth/Auth";
import RafPlayer from "@/components/Player";
export default {
  components: { RafPlayer, RafAuth, RafHeader },
};
</script>
<style>
.fade-enter-from {
  opacity: 0;
}

.fade-enter-active {
  transition: all 0.5s linear;
}

.fade-leave-to {
  transition: all 0.5s linear;
  opacity: 0;
}
</style>
