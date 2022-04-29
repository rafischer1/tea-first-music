<template>
  <section class="container mx-auto mt-6">
    <div class="bg-white rounded border border-gray-200 relative flex flex-col">
      <div
        class="px-6 pt-6 pb-5 font-bold border-b border-gray-200"
        v-icon:full="icon"
      >
        <!-- Comment Count -->
        <span class="card-title text-zinc-700"
          >Comments ({{ commentCount }})</span
        >
      </div>
      <div class="p-6">
        <vee-form :validation-schema="schema" @submit="submitComment">
          <vee-field
            type="textarea"
            as="textarea"
            name="comment"
            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded mb-4"
            placeholder="Your comment here..."
          ></vee-field>
          <button
            :disabled="success"
            :class="{ 'bg-zinc-700 text-zinc-400': success }"
            type="submit"
            class="py-1.5 px-3 rounded text-white bg-teal-600 block"
          >
            Submit
          </button>
          <ErrorMessage name="comment"
            ><span class="text-red-500"
              >Field required: min length 3, max length 140 characters</span
            ></ErrorMessage
          >
          <div v-show="success" class="text-teal-600">Commenting!....</div>
        </vee-form>
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
import { commentsCollection } from "@/includes/firebase";

defineRule("required", required);
defineRule("min", min);
defineRule("max", max);

export default defineComponent({
  name: "CommentForm",
  props: {
    commentCount: String,
  },
  components: { VeeForm, VeeField, ErrorMessage },
  emits: ["comment-submitted"],
  data() {
    return {
      success: false,
      schema: {
        comment: "required|min:3|max:140",
      },
      icon: "fa fa-comments float-right text-teal-600 text-2xl",
    };
  },
  methods: {
    async submitComment(values: any, context: any) {
      console.log("Comment:", values);
      this.$data.success = true;

      const newComment = {
        content: values.comment,
        datePosted: new Date().toString(),
        trackID: this.$route.params.id,
        name: "Same person always",
        uid: "abc123", // auth ID when thats a thing...
      };

      const doc = await commentsCollection.add(newComment);
      if (doc) {
        setTimeout(() => {
          this.$data.success = false;
          context.resetForm();
          this.$emit("comment-submitted");
        }, 1500);
      }
    },
  },
});
</script>
