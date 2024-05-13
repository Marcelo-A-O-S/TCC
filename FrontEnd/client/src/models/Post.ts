import { CommentPost } from "./CommentPost";
import { ImagePost } from "./ImagePost";
import { IPost } from "./interfaces/IPost";

export class Post implements IPost{
    public Id: number;
    public userId: number;
    public title: string;
    public description: string;
    public images: Array<ImagePost>;
    public comments: Array<CommentPost>;
    constructor(){
        this.Id = 0;
        this.userId = 0;
        this.title = "";
        this.description = "";
        this.images = new Array<ImagePost>();
        this.comments = new Array<CommentPost>();
    }

}
/* export interface IPost{
    title: string;
    description: string;
} */