export class AnswerPost{
    public id: number;
    public userId: number;
    public commentId: number;
    public answer: string;
    constructor(){
        this.id = 0;
        this.userId = 0;
        this.commentId = 0;
        this.answer = ""
    }
}
