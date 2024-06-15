import { User } from "next-auth";
import { CommentPost } from "./CommentPost";
import { ImagePost } from "./ImagePost";
import { UserAuthentication } from "./UserAuthentication";

export interface IPost{
    Id: number;
    user:UserAuthentication;
    title: string;
    description: string;
    images: Array<ImagePost>;
    comments: Array<CommentPost>;
}
export class Post implements IPost{
    Id: number;
    user: UserAuthentication;
    title: string;
    description: string;
    images: ImagePost[];
    comments: CommentPost[];
    constructor(){
        this.Id = 0;
        this.user = new UserAuthentication();
        this.title = "";
        this.description = "";
        this.images = []
        this.comments = []
    }

}