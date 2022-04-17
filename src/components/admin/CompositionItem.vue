<template>
  <div class="border border-gray-200 p-3 mb-4 rounded">
    <div v-show="!showForm">
      <h4 class="inline-block text-2xl font-bold">{{ track.modifiedName }}</h4>
      <button
        class="ml-1 py-1 px-2 text-sm rounded text-white bg-red-600 float-right"
        @click.prevent="deleteTrack"
      >
        <i class="fa fa-times"></i>
      </button>
      <button
        class="ml-1 py-1 px-2 text-sm rounded text-white bg-blue-600 float-right"
        @click.prevent="showForm = true"
      >
        <i class="fa fa-pencil-alt"></i>
      </button>
    </div>
    <div v-show="showForm">
      <div
        v-if="alert.show"
        class="text-white text-center font-bold p-4 mb-4"
        :class="alert.variant"
      >
        {{ alert.message }}
      </div>
      <vee-edit-form :validation-schema="schema" @submit="editTrack">
        <div class="mb-3">
          <label class="inline-block mb-2">{{ track.modifiedName }}</label>
          <vee-edit-field
            name="modifiedName"
            type="text"
            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
            placeholder="Enter Song Title"
          />
          <error-message name="modified_name"
            ><div class="text-red-600">Track Name Required</div></error-message
          >
        </div>
        <div class="mb-3">
          <label class="inline-block mb-2">{{ track.genre }}</label>
          <vee-edit-field
            name="genre"
            type="text"
            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
            placeholder="Enter Genre"
          />
          <error-message name="genre"
            ><div class="text-red-600">Genre Name Required</div></error-message
          >
        </div>
        <button
          type="submit"
          class="py-1.5 px-3 rounded text-white bg-teal-600"
          :disabled="inSubmission"
        >
          Submit
        </button>
        <button
          type="button"
          :disabled="inSubmission"
          class="py-1.5 px-3 rounded text-white bg-zinc-700 ml-3"
          @click.prevent="showForm = false"
        >
          Go Back
        </button>
      </vee-edit-form>
    </div>
  </div>
</template>
<script lang="ts">
import Track from "@/interfaces/song.interface";
import TrackEditAlert from "@/interfaces/track-edit-alert.type";
import { defineComponent, PropType } from "vue";
import {
  defineRule,
  Field as VeeEditField,
  Form as VeeEditForm,
  ErrorMessage,
} from "vee-validate";
import { alpha_spaces as alphaspaces, required } from "@vee-validate/rules";
import { songsCollection, storage } from "@/includes/firebase";
import TrackEditAlerts from "@/interfaces/track-edit-alert.interface";
defineRule("required", required);
defineRule("alpha_spaces", alphaspaces);

export default defineComponent({
  name: "RafCompItem",
  components: { VeeEditForm, VeeEditField, ErrorMessage },
  props: {
    track: {
      required: true,
      type: Object as PropType<Track>,
    },
    updateTrack: { type: Function, required: true },
    removeTrack: { type: Function, required: true },
    index: { type: Number, required: true },
  },
  data() {
    return {
      showForm: false,
      schema: {
        modifiedName: "required",
        genre: "alpha_spaces|required",
      },
      inSubmission: false,
      alert: TrackEditAlerts.standard as TrackEditAlert,
    };
  },
  methods: {
    async deleteTrack() {
      this.inSubmission = true;
      this.alert = TrackEditAlerts.standard;
      const storageRef = storage.ref();
      const trackRef = storageRef.child(`songs/${this.track.originalName}`);
      try {
        await trackRef.delete();
        await songsCollection.doc(this.track.docId).delete();
      } catch (error: any) {
        if (error) {
          this.inSubmission = false;
          this.alert = TrackEditAlerts.deleteError;
          console.log("DELETE error:", error);
          this.resetAlert();
          return;
        }
      }
      this.inSubmission = false;
      this.alert = TrackEditAlerts.success;
      this.removeTrack(this.index);
      this.resetAlert();
    },
    async editTrack(values: any) {
      this.inSubmission = true;
      this.alert = TrackEditAlerts.standard;
      try {
        await songsCollection
          .doc(this.track.docId)
          .update({ modifiedName: values.modifiedName, genre: values.genre });
      } catch (error: any) {
        this.alert = TrackEditAlerts.editError;
        this.inSubmission = false;
        console.log("EDIT error:", error);
        this.resetAlert();
        return;
      }
      this.updateTrack(this.index, values);
      this.inSubmission = false;
      this.alert = TrackEditAlerts.success;
      this.resetAlert();
    },
    resetAlert() {
      setTimeout(() => {
        this.showForm = false;
        this.alert = TrackEditAlerts.standard;
      }, 3000);
    },
  },
});
</script>
