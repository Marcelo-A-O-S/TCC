import { ImageDTO } from "./ImageDTO";

export class PostDTO{
    id:number;
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
    } 

}
/* public class PostDTO
{
    public int id { get; set; }
    public string title { get; set; }
    public string description { get; set; }
    public List<ImageDTO> images { get; set; }
    public int userId { get; set; }
} */