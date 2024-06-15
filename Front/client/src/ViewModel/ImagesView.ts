export interface IImagesView{
    id: number; 
    image:string;
    type:string;
    imageGuid:string;
    description:string;
}
export class ImagesView implements IImagesView{
    id: number;
    image: string;
    type: string;
    imageGuid: string;
    description: string;
    constructor(){
        this.id = 0;
        this.image = "";
        this.type = "";
        this.imageGuid = "";
        this.description = ""
    }

}