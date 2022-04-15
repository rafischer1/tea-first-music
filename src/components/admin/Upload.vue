<template>
  <div class="col-span-1">
    <div class="bg-white rounded border border-gray-200 relative flex flex-col">
      <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
        <span class="card-title">Upload</span>
        <i class="fas fa-upload float-right text-teal-600 text-2xl"></i>
      </div>
      <div class="p-6">
        <!-- Upload Dropbox -->
        <div
          :class="{ 'bg-teal-600 border-teal-600 border-dashed': is_dragover }"
          class="w-full px-10 py-20 rounded text-center cursor-pointer border border-dashed border-gray-400 text-gray-400 transition duration-500 hover:text-white hover:bg-teal-600 hover:bg-teal-600 hover:border-solid"
          @drag.prevent.stop=""
          @dragstart.prevent.stop=""
          @drop.prevent.stop="upload($event)"
          @dragover.prevent.stop="is_dragover = true"
          @dragenter.prevent.stop="is_dragover = true"
          @dragleave.prevent.stop="is_dragover = false"
          @dragend.prevent.stop="is_dragover = false"
        >
          <h5>Drop your files here</h5>
        </div>
        <hr class="my-6" />
        <!-- Progess Bar -->
        <div class="mb-4" v-for="upload in uploads" :key="upload.name">
          <!-- File Name -->
          <div class="font-bold text-sm" :class="upload.text_class">
            <i :class="upload.icon"></i>{{ upload.name }}
          </div>
          <div class="flex h-4 overflow-hidden bg-gray-200 rounded">
            <!-- Inner Progress Bar -->
            <div
              class="transition-all progress-bar"
              :class="upload.variant"
              :style="{ width: upload.current_progress + '%' }"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { storage } from "@/includes/firebase";
import UploadSong from "@/interfaces/upload-song.interface";

export default defineComponent({
  name: "RafUpload",
  data() {
    return {
      is_dragover: false,
      uploads: [] as UploadSong[],
    };
  },
  methods: {
    upload(ev: DragEvent) {
      const dropFiles = ev?.dataTransfer?.files;
      if (dropFiles) {
        console.log(dropFiles);
        Object.values(dropFiles).forEach((file) => {
          if (file.type !== "audio/mpeg") {
            return;
          }
          const storageRef = storage.ref();
          const songsRef = storageRef.child(`songs/${file.name}`);
          const task = songsRef.put(file);
          const uploadIndex =
            this.uploads.push({
              task,
              current_progress: 0,
              name: file.name,
              variant: "bg-teal-700",
              icon: "fas fa-spinner fa-spin",
              text_class: "",
            }) - 1;

          task.on(
            "state_changed",
            (snapshot) => {
              this.uploads[uploadIndex].current_progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            },
            (error) => {
              this.uploads[uploadIndex].variant = "bg-red-400";
              this.uploads[uploadIndex].icon = "fas fa-times";
              this.uploads[uploadIndex].text_class = "text-red-400";
              console.log(error);
            },
            () => {
              this.uploads[uploadIndex].variant = "bg-zinc-600";
              this.uploads[uploadIndex].icon = "fas fa-check";
              this.uploads[uploadIndex].text_class = "text-teal-600";
              console.log("COMPLETE!");
            }
          );
        });
      }
      this.is_dragover = false;
    },
  },
});
</script>
