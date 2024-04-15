import { v4 as uuidv4 } from 'uuid';
export class ImagePost{
    public Id: number;
    public description: string;
    public image: string;
    public type: string;
    public imageGuid: string;
    constructor(){
        this.Id = 0;
        this.description = "";
        this.image = "";
        this.type = "";
        this.imageGuid = ""
    }
    GenerateGuid(){
        this.imageGuid = uuidv4()
    }
}
