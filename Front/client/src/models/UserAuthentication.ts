export interface IUserAuthentication{
    username:string;
    email:string;
    token:string;
}
export class UserAuthentication implements IUserAuthentication{
    username:string;
    email:string;
    token:string;
    constructor(){
        this.username ="";
        this.email = "";
        this.token ="";
    }
}