export interface IImagepost{
    id:number;
    image:string;
    description:string;
    type:string;
    imageGuid:string;
}
export class ImagePost implements IImagepost{
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

}