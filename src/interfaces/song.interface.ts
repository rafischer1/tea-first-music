// Defines the type used in reading song file
type Track = {
  uid: string;
  userDisplayName: string;
  originalName: string;
  modifiedName: string;
  genre: string;
  comment_count: number;
  url: any;
};

export default Track;
