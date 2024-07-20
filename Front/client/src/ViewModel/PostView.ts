import { UserAuthentication } from "@/models/UserAuthentication";
import { CommentView } from "./CommentView";
import { ImagesView } from "./ImagesView";
import { LikeView } from "./LikeView";
export interface IPostView{
    id: number;
    guid:string;
    title:string;
    description:string;
    likeViews:Array<LikeView>;
    imagesViews:Array<ImagesView>;
    userview: UserAuthentication;
    commentViews: Array<CommentView>;
    dateCreate:string;
}

export class PostView implements IPostView{
    public id: number;
    public guid: string;
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
        this.dateCreate = "";
        this.guid= "";
    }
}