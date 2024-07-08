export class AnswerDTO{
    id:number;
    answer:string;
    userId:number;
    commentId:number;
    constructor(){
        this.id = 0;
        this.answer = "";
        this.commentId = 0;
        this.userId = 0;
    }
}