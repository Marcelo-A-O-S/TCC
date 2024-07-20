import { ImageDTO } from "./ImageDTO";
import { v4 as uuidv4 } from 'uuid';
export class PostDTO{
    id:number;
    guid: string;
    title:string;
    description:string;
    images: ImageDTO[];
    userId:number;
    constructor(){
        this.id = 0;
        this.title = "";
        this.description = "";
        this.userId = 0
        this.images = []
        this.guid = "";
    }
    generatedGuid(){
        this.guid = uuidv4()
    }
}