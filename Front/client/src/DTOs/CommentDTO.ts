export class CommentDTO{
    id: number;
    comment: string;
    userId: number;
    postId:number;
    constructor(){
        this.id = 0;
        this.comment = "";
        this.userId = 0;
        this.postId = 0;
    }
}