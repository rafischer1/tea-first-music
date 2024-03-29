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
import { storage, songsCollection } from "@/includes/firebase";
import UploadSong from "@/interfaces/upload-song.interface";
import Track from "@/interfaces/song.interface";

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
      // capture files and check type
      const dropFiles = ev?.dataTransfer?.files;
      if (dropFiles) {
        Object.values(dropFiles).forEach((file) => {
          if (file.type !== "audio/mpeg") {
            return;
          }
          // db ref
          const storageRef = storage.ref();
          // directory ref
          const songsRef = storageRef.child(`songs/${file.name}`);
          // init task
          const task = songsRef.put(file);
          // push new upload on and find index
          const uploadIndex =
            this.uploads.push({
              task,
              current_progress: 0,
              name: file.name,
              variant: "bg-teal-700",
              icon: "fas fa-spinner fa-spin",
              text_class: "",
            }) - 1;
          const currentUpload = this.uploads[uploadIndex];
          // listen to task execution
          task.on(
            "state_changed",
            (snapshot) => {
              currentUpload.current_progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            },
            (error) => {
              currentUpload.variant = "bg-red-400";
              currentUpload.icon = "fas fa-times";
              currentUpload.text_class = "text-red-400";
            },
            async () => {
              // create new track for db
              const song: Track = {
                userDisplayName: "Artie",
                originalName: task.snapshot.ref.name,
                modifiedName: task.snapshot.ref.name,
                comment_count: 0,
                genre: "",
                uid: "123456",
                url: "",
              };
              song.url = await task.snapshot.ref.getDownloadURL();
              await songsCollection.add(song);
              // toggle css for completion
              currentUpload.variant = "bg-zinc-600";
              currentUpload.icon = "fas fa-check";
              currentUpload.text_class = "text-teal-600";
            }
          );
        });
      }
      // reset drop box style
      this.is_dragover = false;
    },
  },
  beforeUnmount() {
    this.uploads.forEach((upload, i) => {
      upload.task.cancel();
      if (i === this.uploads.length - 1) {
        console.log(
          "%c Uploads canceled - Please Retry",
          "color: red; font-size: 14px"
        );
      }
    });
  },
});
</script>
