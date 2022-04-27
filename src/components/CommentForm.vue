<template>
  <section class="container mx-auto mt-6">
    <div class="bg-white rounded border border-gray-200 relative flex flex-col">
      <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
        <!-- Comment Count -->
        <span class="card-title">Comments {{ track?.comment_count }}</span>
        <i class="fa fa-comments float-right text-teal-600 text-2xl"></i>
      </div>
      <div class="p-6">
        <vee-form :validation-schema="schema" @submit="submitComment">
          <vee-field
            type="textarea"
            name="textarea"
            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded mb-4"
            placeholder="Your comment here..."
          ></vee-field>
          <button
            :disabled="success"
            type="submit"
            class="py-1.5 px-3 rounded text-white bg-teal-600 block"
          >
            Submit
          </button>
          <ErrorMessage>Get out of here!!!</ErrorMessage>
          <div v-show="success" class="text-teal-600">Commenting!....</div>
        </vee-form>

        <!-- Sort Comments -->
        <select
          class="block mt-4 py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        >
          <option value="1">Latest</option>
          <option value="2">Oldest</option>
        </select>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {
  defineRule,
  ErrorMessage,
  Field as VeeField,
  Form as VeeForm,
} from "vee-validate";
import { max, min, required } from "@vee-validate/rules";

defineRule("required", required);
defineRule("min", min);
defineRule("max", max);

export default defineComponent({
  name: "CommentForm",
  components: { VeeForm, VeeField, ErrorMessage },
  data() {
    return {
      success: false,
      schema: {
        textarea: "required|min:3|max:100",
      },
    };
  },
  methods: {
    submitComment(values: any) {
      console.log("Comment:", values);
      this.$data.success = true;
      setTimeout(() => {
        this.$data.success = false;
      }, 3000);
    },
  },
});
</script>
