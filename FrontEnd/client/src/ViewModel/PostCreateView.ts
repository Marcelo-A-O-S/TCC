import { ImagePost } from "@/models/ImagePost";
import { ImageCreateView } from "./ImageCreateView";

export class PostCreateView{
    public id: number;
    public userId: number;
    public title: string;
    public description: string;
    public images: Array<ImageCreateView>;
    constructor(){
        this.id = 0;
        this.userId = 0;
        this.title = "";
        this.description = "";
        this.images = new Array<ImageCreateView>();
    }
}
