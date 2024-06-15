export interface IAnswerView{
    id: number;
    answer: string;
    answerGuid: string;
    userId: number;
    commentId:number;
}
export class AnswerView implements IAnswerView{
    id: number;
    answer: string;
    answerGuid: string;
    userId: number;
    commentId: number;
    constructor(){
        this.id = 0;
        this.answer = "";
        this.answerGuid = "";
        this.userId = 0;
        this.commentId = 0;
    }
}