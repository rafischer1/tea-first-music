<template>
  <div class="border border-gray-200 p-3 mb-4 rounded">
    <div>
      <h4 class="inline-block text-2xl font-bold">{{ track.modifiedName }}</h4>
      <button
        class="ml-1 py-1 px-2 text-sm rounded text-white bg-red-600 float-right"
      >
        <i class="fa fa-times"></i>
      </button>
      <button
        class="ml-1 py-1 px-2 text-sm rounded text-white bg-blue-600 float-right"
      >
        <i class="fa fa-pencil-alt"></i>
      </button>
    </div>
    <div>
      <form>
        <div class="mb-3">
          <label class="inline-block mb-2">{{ track.modifiedName }}</label>
          <input
            type="text"
            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
            placeholder="Enter Song Title"
          />
        </div>
        <div class="mb-3">
          <label class="inline-block mb-2">{{ track.genre }}</label>
          <input
            type="text"
            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
            placeholder="Enter Genre"
          />
        </div>
        <button
          type="submit"
          class="py-1.5 px-3 rounded text-white bg-teal-600"
        >
          Submit
        </button>
        <button
          type="button"
          class="py-1.5 px-3 rounded text-white bg-zinc-700 ml-3"
        >
          Go Back
        </button>
      </form>
    </div>
  </div>
</template>
<script lang="ts">
import Track from "@/interfaces/song.interface";
import { defineComponent, PropType } from "vue";
export default defineComponent({
  name: "RafCompItem",
  props: { track: { required: true, type: Object as PropType<Track> } },
});
</script>
