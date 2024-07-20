import { v4 as uuidv4 } from 'uuid';
export class AnswerDTO{
    id:number;
    guid:string;
    answer:string;
    userId:number;
    commentId:number;
    postId:number;
    constructor(){
        this.id = 0;
        this.answer = "";
        this.commentId = 0;
        this.userId = 0;
        this.guid = "";
        this.postId = 0;
    }
    generatedGuid(){
        this.guid = uuidv4()
    }
}