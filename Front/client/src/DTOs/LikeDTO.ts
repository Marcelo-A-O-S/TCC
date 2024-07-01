import { v4 as uuidv4 } from 'uuid';
export class LikeDTO{
    guid: string;
    userId: number;
    postId: number;
    constructor(){
        this.guid = "";
        this.userId = 0;
        this.postId = 0;
    }
    generatedGuid(){
        this.guid = uuidv4()
    }
}
