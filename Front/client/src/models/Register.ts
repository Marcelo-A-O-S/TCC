export interface IRegister{
    username:string;
    email:string;
    password:string;
    passwordConfirm:string;
}

export class Register implements IRegister{
    username:string;
    email:string;
    password:string;
    passwordConfirm:string;
    constructor(){
        this.username ="";
        this.email = "";
        this.password = "";
        this.passwordConfirm = "";
    }
    validatePassword(){
        if(this.password == this.passwordConfirm){
            return true
        }
        return false
    }
}