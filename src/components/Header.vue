<template>
  <header id="header" class="bg-teal-700">
    <nav class="container mx-auto flex justify-start items-center py-5 px-4">
      <!-- App Name -->
      <a class="text-white font-bold uppercase text-2xl mr-4" href="#"
        >Tea First Music</a
      >

      <div class="flex flex-grow items-center">
        <!-- Primary Navigation -->
        <ul class="flex flex-row mt-1">
          <!-- Navigation Links -->
          <li>
            <a class="px-2 text-white" href="#">About</a>
          </li>
          <li>
            <a class="px-2 text-white" href="#">Manage</a>
          </li>
          <li>
            <a
              v-if="!authenticated && !loading"
              class="px-2 text-white float-right"
              href="#"
              @click.prevent="toggleAuthModal"
              >Sign In | Sign Up</a
            >
            <a
              v-else-if="authenticated && !loading"
              class="px-2 text-white float-right"
              href="#"
              @click.prevent="signOut"
              >Sign Out</a
            >
            <div v-else class="text-black animate-pulse">Signing Out...</div>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { mapMutations, mapState } from "vuex";

export default defineComponent({
  name: "raf-header",
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    ...mapMutations(["toggleAuthModal", "toggleAuthenticated"]),
    signOut() {
      this.$data.loading = true;
      setTimeout(() => {
        this.toggleAuthenticated();
        this.$data.loading = false;
      }, 2000);
    },
  },
  computed: {
    ...mapState({ authenticated: "authenticated" }),
  },
});
</script>
