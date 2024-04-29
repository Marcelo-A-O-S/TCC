import { AnswerPost } from "./AnswerPost";

export class CommentPost{
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
    get GetComment(){
        return this.comment;
    }
    set SetComment(comment: string){
        this.comment = comment;
    }
}
