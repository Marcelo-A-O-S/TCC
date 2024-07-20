import { v4 as uuidv4 } from 'uuid';
export class ImageDTO{
    id:number;
    image:string;
    type:string;
    imageGuid:string;
    description:string;
    constructor(){
        this.id = 0;
        this.image = "";
        this.type = "";
        this.description = "";
        this.imageGuid = "";
    }
    generatedGuid(){
        this.imageGuid = uuidv4();
    }
}
