import axios, { AxiosInstance, AxiosResponse } from "axios"
import { Post } from "@/models/Post";
import Cookies from "js-cookie";
import { PostCreateView } from "@/ViewModel/PostCreateView";
export class ApiPost{
    private host:AxiosInstance;
    private token:string;
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
    public async createPost(post : PostCreateView) : Promise<AxiosResponse<any, any>>{
        return this.host.post("/api/Post/Create",post)
    }
    public async GetAll() : Promise<AxiosResponse<any, any>>{
        return this.host.get("/api/Post/List")
    }
}
