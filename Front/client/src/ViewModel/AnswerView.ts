import { UserAuthentication } from "@/models/UserAuthentication";

export interface IAnswerView{
    id: number;
    answer: string;
    guid: string;
    userId: number;
    commentId:number;
    user: UserAuthentication;
    dateCreate:string;
}
export class AnswerView implements IAnswerView{
    id: number;
    answer: string;
    guid: string;
    userId: number;
    commentId: number;
    user: UserAuthentication;
    dateCreate: string;
    constructor(){
        this.id = 0;
        this.answer = "";
        this.guid = "";
        this.userId = 0;
        this.commentId = 0;
        this.user = new UserAuthentication();
        this.dateCreate = ""
    }
    
    
}