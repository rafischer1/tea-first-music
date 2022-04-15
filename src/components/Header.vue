<template>
  <header id="header" class="bg-teal-700">
    <nav class="container mx-auto flex justify-start items-center py-5 px-4">
      <!-- App Name -->
      <router-link
        class="text-white font-bold uppercase text-2xl mr-4"
        :to="{ name: 'home' }"
        exact-active-class="no-active"
        >Tea First Music</router-link
      >

      <div class="flex flex-grow items-center">
        <!-- Primary Navigation -->
        <ul class="flex flex-row mt-1">
          <!-- Navigation Links -->
          <li>
            <router-link class="px-2 text-white" :to="{ name: 'about' }"
              >About</router-link
            >
          </li>
          <li v-if="admin">
            <router-link :to="{ name: 'admin' }" class="px-2 text-white"
              >Admin</router-link
            >
          </li>
          <li>
            <a
              v-if="!authenticated && !loading"
              class="px-2 text-white fixed right-10"
              href="#"
              @click.prevent="toggleAuthModal"
              >Sign In | Sign Up</a
            >
            <a
              v-else-if="authenticated && !loading"
              class="px-2 text-white fixed right-10"
              href="#"
              @click.prevent="signOut"
              >Sign Out</a
            >
            <div v-else class="text-black fixed right-10">
              <div class="animate-spin h-5 w-5 mr-3 text-xl">🌀</div>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { mapMutations, mapState } from "vuex";
import store from "@/store";

export default defineComponent({
  name: "raf-header",
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    ...mapMutations(["toggleAuthModal", "toggleAuthenticated", "toggleAdmin"]),
    signOut() {
      console.log("SIGN OUT CALLED");
      this.$data.loading = true;
      setTimeout(() => {
        this.toggleAuthenticated();
        if (store.state.admin) {
          this.toggleAdmin();
        }
        this.$router.push({ name: "home" });
        this.$data.loading = false;
      }, 2000);
    },
  },
  computed: {
    ...mapState({ authenticated: "authenticated", admin: "admin" }),
  },
});
</script>
