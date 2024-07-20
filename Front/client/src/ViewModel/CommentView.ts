import { UserAuthentication } from "@/models/UserAuthentication";
import { AnswerView } from "./AnswerView";

export interface ICommentView{
    id:number;
    comment: string;
    guid:string;
    userId:number;
    user: UserAuthentication;
    postId:number;
    answers:Array<AnswerView>;
    dateCreate: string;
}
export class CommentView implements ICommentView{
    id: number;
    comment: string;
    guid: string;
    userId: number;
    postId: number;
    answers: AnswerView[];
    dateCreate: string;
    user: UserAuthentication;
    constructor(){
        this.id = 0;
        this.comment = "";
        this.guid = "";
        this.userId = 0;
        this.postId = 0;
        this.answers = new Array<AnswerView>();
        this.user = new UserAuthentication();
        this.dateCreate = ""
    }
    
    
}