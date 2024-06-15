export interface ILikeView{
    id: number;
    guid: string;
    userId:number;
    postId:number;
}
export class LikeView implements ILikeView{
    id: number;
    guid: string;
    userId: number;
    postId: number;
    constructor(){
        this.id = 0;
        this.guid = "";
        this.userId = 0;
        this.postId = 0;
    }
}