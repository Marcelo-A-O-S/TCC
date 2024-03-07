import { v4 as uuidv4 } from 'uuid';
export class ImageCreateView{
    public id: number;
    public description: string;
    public image: string;
    public imageGuid: string;
    public type: string;
    constructor(){
        this.id = 0;
        this.description = "";
        this.image = "";
        this.imageGuid = uuidv4();
        this.type = ""

    }
}
