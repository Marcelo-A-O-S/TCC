import { AnswerPost } from "./AnswerPost";

export interface ICommentPost{
     id: number;
     userId: number;
     postId: number;
     guid:string;
     comment: string;
     answers: Array<AnswerPost>

}
export class CommentPost implements ICommentPost{
    public id: number;
    public userId: number;
    public postId: number;
    public guid:string;
    public comment: string;
    public answers: Array<AnswerPost>
    constructor(){
        this.id = 0;
        this.userId = 0;
        this.postId = 0;
        this.comment = "";
        this.guid = "";
        this.answers = new Array<AnswerPost>()
    }
}