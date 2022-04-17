// Defines the type used in displaying and handling music upload
import firebase from "firebase";
import UploadTask = firebase.storage.UploadTask;

type UploadSong = {
  task: UploadTask;
  current_progress: number;
  name: string;
  variant: "bg-teal-700" | "bg-zinc-600" | "bg-red-400";
  icon: "fas fa-spinner fa-spin" | "fas fa-times" | "fas fa-check";
  text_class: string;
};

export default UploadSong;
