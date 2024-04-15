import axios, { AxiosInstance } from "axios"
import Cookies from "js-cookie";
import { AxiosBasicCredentials } from "axios";

export class ApiUser{
    private host:AxiosInstance;
    private token: string;
    constructor(){
        const userCookie = Cookies.get("user")
        if(userCookie != undefined){
            const user = JSON.parse(userCookie);
            this.token = user.token
        }else{
            this.token = ""
        }
        this.host = axios.create({
                baseURL: process.env.NEXT_PUBLIC_HOST,
                headers:{
                    Authorization: `Bearer ${this.token}`
                }
            })
    }
    public async GetEmail(email: string){
        return this.host.get(`/api/User/GetByEmail?email=${email}`)
    }
    public async GetById(userId: number){
        return this.host.get(`/api/User/GetById?id=${userId}`)
    }
}
