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
      <error-message name="confirmPassword"
        ><div class="text-red-600">Passwords do not match</div></error-message
      >
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
      <error-message name="country"
        ><div class="text-red-600">
          'Spain' is no longer in service
        </div></error-message
      >
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
      <error-message name="tos"
        ><div class="text-red-600">
          Review and accept terms of service
        </div></error-message
      >
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
import {
  Field as VeeField,
  Form as VeeForm,
  defineRule,
  ErrorMessage,
} from "vee-validate";
import {
  required,
  min,
  max,
  alpha_spaces as alphaspaces,
  email,
  alpha_num as alphanum,
  min_value as minvalue,
  max_value as maxvalue,
  confirmed,
  not_one_of as excluded,
} from "@vee-validate/rules";
import { mapMutations } from "vuex";

defineRule("required", required);
defineRule("min", min);
defineRule("max", max);
defineRule("email", email);
defineRule("alpha_spaces", alphaspaces);
defineRule("alpha_num", alphanum);
defineRule("max_val", maxvalue);
defineRule("min_val", minvalue);
defineRule("confirmed", confirmed);
defineRule("excluded", excluded);
export default {
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
    ...mapMutations(["toggleAuthModal"]),
    register(values: any, actions: any) {
      actions.setValues({
        name: "Name",
        email: "loggingin@login.com",
        age: 22,
        password: 1234,
        confirmPassword: 1234,
        tos: 1,
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
