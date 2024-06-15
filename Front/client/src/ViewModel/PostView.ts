import { UserAuthentication } from "@/models/UserAuthentication";
import { CommentView } from "./CommentView";
import { ImagesView } from "./ImagesView";
import { LikeView } from "./LikeView";

export class PostView{
    public id: number;
    public title:string;
    public description:string;
    public likeViews:Array<LikeView>;
    public imagesViews:Array<ImagesView>;
    public userview: UserAuthentication;
    public commentViews: Array<CommentView>;
    public dateCreate:string;
    constructor(){
        this.id = 0;
        this.title = "";
        this.description = "";
        this.likeViews = new Array<LikeView>;
        this.imagesViews = new Array<ImagesView>();
        this.userview = new UserAuthentication();
        this.commentViews = new Array<CommentView>();
        this.dateCreate = ""

    }
}