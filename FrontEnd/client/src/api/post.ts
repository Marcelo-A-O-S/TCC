import axios, { AxiosInstance, AxiosResponse } from "axios"
import Cookies from "js-cookie";
import { PostCreateView } from "@/ViewModel/PostCreateView";
import { CommentPost } from "@/models/CommentPost";
import { Comment } from "@/ViewModel/CommentView";
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
    public async deletePostById(postId: number) : Promise<AxiosResponse<any, any>>{
        return this.host.delete(`/api/Post/DeleteById?postId=${postId}`)
    }
    public async findPostById(postId: number): Promise<AxiosResponse<any, any>>{
        return this.host.get(`/api/Post/FindById?id=${postId}`)
    }
    public async findByUserId(userId:number): Promise<AxiosResponse<any, any>>{
        return this.host.get(`/api/Post/FindByUserId?userId=${userId}`)
    }
    public async AddComment(comment: CommentPost): Promise<AxiosResponse<any, any>>{
        return this.host.post(`/api/Post/AddComment`,comment);
    }
}
