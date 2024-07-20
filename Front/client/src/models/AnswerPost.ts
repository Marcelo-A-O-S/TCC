export interface IAnswerPost{
     id: number;
     guid: string;
     userId: number;
     commentId: number;
     answer: string;
}
export class AnswerPost implements IAnswerPost{
    public id: number;
    public userId: number;
    public commentId: number;
    public answer: string;
    public guid: string;
    constructor(){
        this.id = 0;
        this.userId = 0;
        this.commentId = 0;
        this.answer = "";
        this.guid = "";
    }
}