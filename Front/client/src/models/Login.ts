export interface ILogin{
    email:string;
    password:string;
}
export class Login implements ILogin{
    email: string;
    password: string;
    constructor(){
        this.email = "";
        this.password = "";
    }
}