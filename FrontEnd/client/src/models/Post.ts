import { CommentPost } from "./CommentPost";
import { ImagePost } from "./ImagePost";

export class Post{
    public id: number;
    public userid: number;
    public title: string;
    public description: string;
    public images: Array<ImagePost>;
    public comments: Array<CommentPost>;
    constructor(){
        this.id = 0;
        this.userid = 0;
        this.title = "";
        this.description = "";
        this.images = new Array<ImagePost>();
        this.comments = new Array<CommentPost>();
    }

}
