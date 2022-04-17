<template>
  <vee-form :validation-schema="schema" @submit="register">
    <!-- Name -->
    <div class="mb-3">
      <label class="inline-block mb-2">Name</label>
      <vee-field
        name="name"
        type="text"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Enter Name"
      />
      <error-message class="text-red-600" name="name"></error-message>
    </div>
    <!-- Email -->
    <div class="mb-3">
      <label class="inline-block mb-2">Email</label>
      <vee-field
        name="email"
        type="email"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Enter Email"
      />
      <error-message class="text-red-600" name="email"></error-message>
    </div>
    <!-- Age -->
    <div class="mb-3">
      <label class="inline-block mb-2">Age</label>
      <vee-field
        name="age"
        type="number"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
      />
      <error-message class="text-red-600" name="age"></error-message>
    </div>
    <!-- Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">Password</label>
      <vee-field
        name="password"
        type="password"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Password"
      />
      <error-message class="text-red-600" name="password"></error-message>
    </div>
    <!-- Confirm Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">Confirm Password</label>
      <vee-field
        name="confirmPassword"
        type="password"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Confirm Password"
      />
      <error-message
        name="confirmPassword"
        class="text-red-600"
      ></error-message>
    </div>
    <!-- Country -->
    <div class="mb-3">
      <label class="inline-block mb-2">Country</label>
      <vee-field
        as="select"
        name="country"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
      >
        <option value="USA">USA</option>
        <option value="Mexico">Mexico</option>
        <option value="Canada">Canada</option>
        <option value="Spain">Spain</option>
      </vee-field>
      <error-message name="country" class="text-red-600"> </error-message>
    </div>
    <!-- TOS -->
    <div class="mb-3 pl-6">
      <vee-field
        name="tos"
        type="checkbox"
        value="1"
        class="w-4 h-4 float-left -ml-6 mt-1 rounded"
      />
      <label class="inline-block">Accept terms of service</label>
      <error-message name="tos" class="text-red-600"></error-message>
    </div>
    <button
      type="submit"
      class="block w-full bg-black text-white py-1.5 px-3 rounded transition hover:bg-gray-800"
      :disabled="showSuccess"
    >
      Submit
    </button>
    <div v-show="showSuccess" class="text-teal-600">Signing Up!....</div>
  </vee-form>
</template>
<script lang="ts">
import LogInService from "@/shared/log-in.service";
import { defineComponent } from "vue";
import {
  configure,
  defineRule,
  ErrorMessage,
  Field as VeeField,
  Form as VeeForm,
} from "vee-validate";
import {
  alpha_num as alphanum,
  confirmed,
  email,
  max,
  max_value as maxvalue,
  min,
  min_value as minvalue,
  not_one_of as excluded,
  required,
} from "@vee-validate/rules";
import { mapMutations } from "vuex";

defineRule("required", required);
defineRule("min", min);
defineRule("max", max);
defineRule("email", email);
defineRule("alpha_num", alphanum);
defineRule("max_val", maxvalue);
defineRule("min_val", minvalue);
defineRule("confirmed", confirmed);
defineRule("excluded", excluded);

configure({
  generateMessage: (ctx) => {
    const messages: { [key: string]: string } = {
      required: `${ctx.field} is required`,
      min: `${ctx.field} does not meet min characters`,
      max: `${ctx.field} exceeds max characters`,
      min_val: `Must be 16+ to register`,
      max_val: `${ctx.field} exceeds max value`,
      email: `Incorrect email format`,
      alpha_num: `Input must be a number`,
      excluded: `Select value: ${ctx.value} currently unavailable for registration`,
      confirmed: "Retry: Passwords do not match",
    };
    return ctx.rule?.name ? messages[ctx.rule?.name] : "";
  },
  validateOnBlur: true,
  validateOnChange: true,
  validateOnInput: true,
});

export default defineComponent({
  name: "RafSignUp",
  components: { VeeForm, VeeField, ErrorMessage },
  data() {
    return {
      showSuccess: false,
      schema: {
        name: "required|min:2|max:100",
        email: "required|email",
        age: "required|alpha_num|min_val:16|max_val:115",
        password: "required|min:3|max:12",
        confirmPassword: "required|confirmed:@password",
        country: "required|excluded:Spain",
        tos: "required",
      },
    };
  },
  methods: {
    ...mapMutations(["toggleAuthModal", "toggleAuthenticated", "toggleAdmin"]),
    register(values: any, actions: any) {
      actions.setValues({
        name: "Name",
        email: "loggingin@login.com",
        age: 22,
        password: 1234,
        confirmPassword: 1234,
        tos: 1,
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
