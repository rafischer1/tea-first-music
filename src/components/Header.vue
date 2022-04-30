<template>
  <header id="header" class="bg-teal-700 static">
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
            <router-link class="px-2 text-white" :to="{ name: 'about' }">{{
              $t("header.about")
            }}</router-link>
          </li>
          <li v-if="admin">
            <router-link :to="{ name: 'admin' }" class="px-2 text-white"
              >Admin</router-link
            >
          </li>
          <li>
            <a
              v-if="!authenticated && !loading"
              class="px-2 text-white absolute right-40"
              href="#"
              @click.prevent="toggleAuthModal"
              >Sign In | Sign Up</a
            >
            <a
              v-else-if="authenticated && !loading"
              class="px-2 text-white absolute right-40"
              href="#"
              @click.prevent="signOut"
              >Sign Out</a
            >
            <div v-else class="text-black fixed right-10">
              <div class="animate-spin h-5 w-5 mr-3 text-xl">🌀</div>
            </div>
          </li>
          <li class="float-right absolute right-5">
            <div class="border-2 rounded-md border-white">
              <a
                @click.prevent="selectLocale('en')"
                class="px-2 text-white cursor-pointer"
                :class="{ 'text-orange-500': locale === 'en' }"
                >EN</a
              >
              <a
                @click.prevent="selectLocale('es')"
                class="px-2 text-white cursor-pointer"
                :class="{ 'text-orange-500': locale === 'es' }"
                >ES</a
              >
              <a
                @click.prevent="selectLocale('de')"
                class="px-2 text-white cursor-pointer"
                :class="{ 'text-orange-500': locale === 'de' }"
                >DE</a
              >
            </div>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { mapMutations, mapState, useStore } from "vuex";

export default defineComponent({
  name: "raf-header",
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    ...mapMutations([
      "toggleAuthModal",
      "toggleAuthenticated",
      "toggleAdmin",
      "updateLocale",
    ]),
    selectLocale(selected: "en" | "es" | "de") {
      if (selected !== this.$i18n.locale) {
        this.$i18n.locale = selected;
        this.updateLocale({ selected });
      } else {
        console.log(
          "%c" + selected.toUpperCase() + " already set as locale!",
          "color: teal; background: white; padding: 4px; border-radius: 50px;"
        );
      }
    },
    signOut() {
      const store = useStore();
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
    ...mapState({
      authenticated: "authenticated",
      admin: "admin",
      locale: "locale",
    }),
  },
});
</script>
