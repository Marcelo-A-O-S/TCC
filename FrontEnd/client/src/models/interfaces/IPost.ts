import { CommentPost } from "../CommentPost";
import { ImagePost } from "../ImagePost";

export interface IPost{
    Id: number;
    userId: number;
    title: string;
    description: string;
    images: Array<ImagePost>;
    comments: Array<CommentPost>;
}
