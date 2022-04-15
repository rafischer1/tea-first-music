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
      <error-message name="email" class="text-red-600"></error-message>
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
      <error-message name="password" class="text-red-600"></error-message>
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
import { defineComponent } from "vue";
import { email, min, max, required } from "@vee-validate/rules";
import {
  Field as VeeLoginField,
  Form as VeeLoginForm,
  defineRule,
  ErrorMessage,
  configure,
} from "vee-validate";
import { mapMutations } from "vuex";
import LogInService from "@/shared/log-in.service";

defineRule("email", email);
defineRule("min", min);
defineRule("max", max);
defineRule("required", required);

configure({
  generateMessage: (ctx) => {
    const messages: { [key: string]: string } = {
      required: `${ctx.field} is required`,
      min: `${ctx.field} does not meet min characters`,
      max: `${ctx.field} exceeds max characters`,
      email: `Incorrect email format`,
    };
    return ctx.rule?.name ? messages[ctx.rule?.name] : "";
  },
  validateOnBlur: true,
  validateOnChange: true,
  validateOnInput: false,
});

export default defineComponent({
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
    ...mapMutations(["toggleAuthModal", "toggleAuthenticated", "toggleAdmin"]),
    login(values: any, actions: any) {
      console.log("LOGIN:", values);
      actions.setValues({
        email: "",
        password: "",
      });
      this.$data.showSuccess = true;
      setTimeout(() => {
        if (LogInService.checkAdminPassword(values.password)) {
          this.toggleAdmin();
        }
        this.toggleAuthModal();
        this.toggleAuthenticated();
        this.$data.showSuccess = false;
      }, 1500);
    },
  },
});
</script>
