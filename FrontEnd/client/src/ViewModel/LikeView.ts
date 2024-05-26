import { ILikeView } from "./interfaces/ILikeView";
import { v4 as uuidv4 } from 'uuid';
export class LikeView implements ILikeView{
    id: number;
    Guid: string;
    userId: number;
    postId: number;
    constructor(){
        this.id = 0;
        this.Guid = "";
        this.userId = 0;
        this.postId = 0;
    }
    GenerateGuid(){
        this.Guid = uuidv4()
    }
}