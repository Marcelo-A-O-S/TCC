import { UserAuthentication } from "@/models/UserAuthentication";

export interface IAnswerView{
    id: number;
    answer: string;
    answerGuid: string;
    userId: number;
    commentId:number;
    user: UserAuthentication
}
export class AnswerView implements IAnswerView{
    id: number;
    answer: string;
    answerGuid: string;
    userId: number;
    commentId: number;
    user: UserAuthentication;
    constructor(){
        this.id = 0;
        this.answer = "";
        this.answerGuid = "";
        this.userId = 0;
        this.commentId = 0;
        this.user = new UserAuthentication();
    }
    
}