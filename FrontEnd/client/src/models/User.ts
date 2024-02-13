export class User{
    name:string;
    email:string;
    token:string;
    constructor(_email:string, _name:string, _token:string){
        this.email = _email;
        this.name = _name;
        this.token = _token;
    }
}
