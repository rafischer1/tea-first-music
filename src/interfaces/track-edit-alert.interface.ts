import TrackEditAlert from "@/interfaces/track-edit-alert.type";

const TrackEditAlerts: { [key: string]: TrackEditAlert } = {
  standard: {
    show: false,
    variant: "bg-teal-600",
    message: "Uploading song...",
  },
  editError: {
    variant: "bg-red-500",
    show: true,
    message: "Error updating track - please try again.",
  },
  deleteError: {
    variant: "bg-red-500",
    show: true,
    message: "Error deleting track - please try again.",
  },
  success: {
    variant: "bg-teal-400",
    show: true,
    message: "Success!",
  },
};

export default TrackEditAlerts;
