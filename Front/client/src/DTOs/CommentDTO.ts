import { v4 as uuidv4 } from 'uuid';
export class CommentDTO{
    id: number;
    guid: string;
    comment: string;
    userId: number;
    postId:number;
    constructor(){
        this.id = 0;
        this.comment = "";
        this.userId = 0;
        this.postId = 0;
        this.guid = "";
    }
    generatedGuid(){
        this.guid = uuidv4()
    }
}