export class ImagePost{
    public Id: number;
    public postId: number;
    public description: string;
    public image: string;
    constructor(){
        this.Id = 0;
        this.postId = 0;
        this.description = "";
        this.image = ""
    }
    get GetDescription(): string{
        return this.description;
    }
    set SetDescription(description: string){
        this.description = description;
    }
    get GetImage(): string{
        return this.image;
    }
    set SetImage(image: string){
        this.image = image;
    }
}
