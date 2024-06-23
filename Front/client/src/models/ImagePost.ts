import { v4 as uuidv4 } from 'uuid';
export interface IImagePost{
    id:number;
    image:string;
    description:string;
    type:string;
    imageGuid:string;
}
export class ImagePost implements IImagePost{
    id: number;
    image: string;
    description: string;
    type: string;
    imageGuid: string;
    constructor(){
        this.id = 0;
        this.image = "";
        this.description = "";
        this.type = "";
        this.imageGuid = ""
    }
    GenerateGuid(){
        this.imageGuid = uuidv4()
    }
}