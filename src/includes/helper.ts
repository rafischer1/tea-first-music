export default {
  formatTime(time: number | undefined): string {
    if (time == undefined) {
      return "00:00";
    }
    const mins = Math.floor(time / 60) || 0;
    const secs = Math.round(time - mins * 60 || 0);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  },
};
