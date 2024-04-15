
export class Comment{
    public id: number;
    public userId: number;
    public postId: number;
    public comment: string;
    constructor(){
        this.id = 0;
        this.userId = 0;
        this.postId = 0;
        this.comment = "";
    }
}