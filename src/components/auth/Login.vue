<template>
  <vee-login-form :validation-schema="schema" @submit="login">
    <!-- Email -->
    <div class="mb-3">
      <label class="inline-block mb-2">Email</label>
      <vee-login-field
        name="email"
        type="email"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Enter Email"
      />
      <error-message name="email"
        ><div class="text-red-600">Invalid Email</div></error-message
      >
    </div>
    <!-- Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">Password</label>
      <vee-login-field
        name="password"
        type="password"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Password"
      />
      <error-message name="password"
        ><div class="text-red-600">Invalid Password</div></error-message
      >
    </div>
    <button
      type="submit"
      :disabled="showSuccess"
      class="block w-full bg-black text-white py-1.5 px-3 rounded transition hover:bg-gray-800"
    >
      Submit
    </button>
    <div v-show="showSuccess" class="text-teal-600">Logging in....</div>
  </vee-login-form>
</template>
<script lang="ts">
import { email, min, max, required } from "@vee-validate/rules";
import {
  Field as VeeLoginField,
  Form as VeeLoginForm,
  defineRule,
  ErrorMessage,
} from "vee-validate";
import { mapMutations } from "vuex";

defineRule("email", email);
defineRule("min", min);
defineRule("max", max);
defineRule("required", required);
export default {
  name: "RafLogin",
  components: { VeeLoginForm, VeeLoginField, ErrorMessage },
  data() {
    return {
      showSuccess: false,
      schema: {
        password: "required|min:2|max:100",
        email: "required|email",
      },
    };
  },
  methods: {
    ...mapMutations(["toggleAuthModal"]),
    login(values: any, actions: any) {
      console.log("LOGIN:", values);
      actions.setValues({
        email: "",
        password: "",
      });
      this.showSuccess = true;
      setTimeout(() => {
        this.toggleAuthModal();
        this.showSuccess = false;
      }, 1500);
    },
  },
};
</script>
