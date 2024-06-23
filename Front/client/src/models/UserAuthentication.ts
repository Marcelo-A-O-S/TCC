export interface IUserAuthentication{
    id:number;
    username:string;
    email:string;
    token:string;
}
export class UserAuthentication implements IUserAuthentication{
    username:string;
    email:string;
    token:string;
    id: number;
    constructor(){
        this.username ="";
        this.email = "";
        this.token ="";
        this.id = 0;
    }
    
}