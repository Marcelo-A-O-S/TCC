import { CommentPost } from "./CommentPost";
import { ImagePost } from "./ImagePost";

export class Post{
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
