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
}
/* public class ImageDTO
{
    public int Id { get; set; }
    public string image { get; set; }
    public string type { get; set; }
    public string imageGuid { get; set; }
    public string Description { get; set; }
} */