import { AnswerPost } from "./AnswerPost";

export interface ICommentPost{
     id: number;
     userId: number;
     postId: number;
     commentGuid:string;
     comment: string;
     answers: Array<AnswerPost>

}
export class CommentPost implements ICommentPost{
    public id: number;
    public userId: number;
    public postId: number;
    public commentGuid:string;
    public comment: string;
    public answers: Array<AnswerPost>
    constructor(){
        this.id = 0;
        this.userId = 0;
        this.postId = 0;
        this.comment = "";
        this.commentGuid = "";
        this.answers = new Array<AnswerPost>()
    }
}