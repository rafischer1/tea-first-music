<template>
  <!-- Music Header -->
  <section class="w-full mb-8 py-14 text-center text-white relative">
    <div
      class="absolute inset-0 w-full h-full box-border bg-contain music-bg"
    ></div>
    <div class="container mx-auto flex items-center">
      <!-- Play/Pause Button -->
      <button
        type="button"
        @click.prevent.stop="play"
        :class="{
          'bg-zinc-800 text-orange-400 border-2 border-orange-400 hover:text-orange-400 hover:border-orange-400':
            activePlay,
        }"
        class="z-50 h-24 w-24 text-3xl bg-white text-black rounded-full focus:outline-none hover:text-teal-800 hover:border-2 hover:border-teal-800 active:text-teal-600 active:border-2 active:border-teal-600"
      >
        <i class="fas fa-play"></i>
      </button>
      <div class="z-50 text-left ml-8">
        <!-- Song Info -->
        <div class="text-3xl font-bold">{{ track?.modifiedName }}</div>
        <div>{{ track?.genre }}</div>
      </div>
    </div>
  </section>
  <!-- Form -->
  <CommentForm
    @comment-submitted="commentSubmitted"
    :comment-count="comments.length > 0 ? comments.length.toString() : ''"
  />
  <!-- Comments -->
  <ul class="container mx-auto" v-show="comments.length > 0">
    <li
      class="p-6 bg-gray-50 border border-gray-200"
      v-for="comment in comments"
      :key="comment.docID"
    >
      <RafComment
        :name="comment.name"
        :date-posted="comment.datePosted"
        :content="comment.content"
      />
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import RafComment from "@/components/Comment.vue";
import { songsCollection, commentsCollection } from "@/includes/firebase";
import Track from "@/interfaces/song.interface";
import CommentForm from "@/components/CommentForm.vue";
import { mapActions } from "vuex";

export default defineComponent({
  name: "ViewTrack",
  components: { CommentForm, RafComment },
  data() {
    return {
      comments: [] as {
        content: string;
        datePosted: string;
        trackID: string;
        name: string;
        uid: string;
        docID: string;
      }[],
      track: null as unknown as Track,
      activePlay: false,
      playButton:
        "z-50 h-24 w-24 text-3xl bg-white text-black rounded-full focus:outline-none hover:text-teal-800 hover:border-2 hover:border-teal-800 active:text-teal-600 active:border-2 active:border-teal-600",
    };
  },
  async created() {
    const id = this.$route.params.id as string;
    if (id) {
      const snapshot = await songsCollection.doc(id).get();
      if (!snapshot.exists) {
        await this.$router.push({ name: "home" });
        return;
      }
      this.track = snapshot.data() as Track;
      await this.getComments();
    }
  },
  methods: {
    ...mapActions(["newTrackAction", "stopPlaybackAction"]),
    play() {
      this.toggleActivePlay();
      if (this.activePlay) {
        this.newTrackAction({ url: this.track.url });
      } else {
        this.stopPlaybackAction();
      }
    },
    toggleActivePlay() {
      this.activePlay = !this.activePlay;
    },
    commentSubmitted() {
      console.log("emit called");
      this.getComments();
    },
    async getComments() {
      const snapshots = await commentsCollection
        .where("trackID", "==", this.$route.params.id)
        .get();
      this.comments = [];
      snapshots.forEach((s) => {
        this.comments.push({
          content: s.data().content,
          datePosted: s.data().datePosted,
          trackID: s.data().trackID,
          name: s.data().name,
          uid: s.data().uid,
          docID: s.id,
        });
      });
      this.comments = this.comments.sort((a, b) =>
        new Date(a.datePosted) < new Date(b.datePosted) ? 1 : 0
      );
    },
  },
});
</script>
