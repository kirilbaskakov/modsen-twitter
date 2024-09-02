export interface TweetType {
  id: string;
  authorId: string;
  text: string;
  date: Date;
  imageUrls: Array<string>;
  likes: number;
  isLiked: boolean;
}
