<template>
  <!-- Auth Modal -->
  <div
    class="fixed z-10 inset-0 overflow-y-auto"
    id="modal"
    :class="{ hidden: !authModalActive }"
  >
    <div
      class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
    >
      <div class="fixed inset-0 transition-opacity">
        <div class="absolute inset-0 bg-gray-800 opacity-75"></div>
      </div>

      <!-- This element is to trick the browser into centering the modal contents. -->
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen"
        >&#8203;</span
      >

      <div
        class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
      >
        <!-- Add margin if you want to see some of the overlay behind the modal-->
        <div class="py-4 text-left px-6">
          <!--Title-->
          <div class="flex justify-between items-center pb-4">
            <p class="text-2xl font-bold">
              {{
                tab === "login"
                  ? "Sign in to your account"
                  : "Create an account"
              }}
            </p>
            <!-- Modal Close Button -->
            <div
              class="modal-close cursor-pointer z-50 hover:text-zinc-600"
              @click.prevent="toggleAuthModal"
            >
              <i class="fas fa-times"></i>
            </div>
          </div>

          <!-- Tabs -->
          <ul class="flex flex-wrap mb-4">
            <li class="flex-auto text-center">
              <a
                class="block rounded py-3 px-4 transition"
                :class="{
                  'hover:text-white text-white bg-teal-700': tab === 'login',
                  'hover:text-teal-700': tab === 'register',
                }"
                href="#"
                @click.prevent="tab = 'login'"
                >Sign In</a
              >
            </li>
            <li class="flex-auto text-center">
              <a
                class="block rounded py-3 px-4 transition"
                :class="{
                  'hover:text-white text-white bg-teal-700': tab === 'register',
                  'hover:text-teal-700': tab === 'login',
                }"
                href="#"
                @click.prevent="tab = 'register'"
                >Sign Up</a
              >
            </li>
          </ul>

          <raf-login v-show="tab === 'login'" />
          <raf-sign-up v-show="tab === 'register'" />
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import RafSignUp from "@/components/auth/SignUp.vue";
import { mapMutations, mapState } from "vuex";
import RafLogin from "@/components/auth/Login.vue";
export default {
  name: "RafAuth",
  components: { RafLogin, RafSignUp },
  data() {
    return {
      tab: "login",
    };
  },
  methods: {
    ...mapMutations(["toggleAuthModal"]),
  },
  computed: {
    ...mapState({ authModalActive: "authModalActive" }),
  },
};
</script>
