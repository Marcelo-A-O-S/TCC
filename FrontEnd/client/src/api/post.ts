import axios, { AxiosInstance, AxiosResponse } from "axios"
import Cookies from "js-cookie";
import { PostCreateView } from "@/ViewModel/PostCreateView";
import { CommentPost } from "@/models/CommentPost";
import { Comment } from "@/ViewModel/CommentView";
import { AnswerPost } from "@/models/AnswerPost";
import { LikeView } from "@/ViewModel/LikeView";
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
    public async DeleteComment(comment: CommentPost): Promise<AxiosResponse<any,any>>{
        return this.host.delete(`/api/Post/DeleteComment`,{
            data: comment
        })
    }
    public async DeleteCommentById(commentId:number):Promise<AxiosResponse<any,any>>{
        return this.host.delete(`/api/Post/DeleteCommentById?commentId=${commentId}`)
    }
    public async FindCommentsByPostId(postId: number): Promise<AxiosResponse<any, any>>{
        return this.host.get(`/api`)
    }
    public async AddAnswer(answer: AnswerPost): Promise<AxiosResponse<any, any>>{
        return this.host.post(`/api/Post/AddAnswer`,answer)
    }
    public async DeleteAnswer(answer:AnswerPost):Promise<AxiosResponse<any, any>>{
        return this.host.delete(`/api/Post/DeleteAnswer`,{
            data: answer
        })
    }
    public async DeleteAnswerById(answerId:number): Promise<AxiosResponse<any,any>>{
        return this.host.delete(`/api/Post/DeleteAnswerById?answerId=${answerId}`)
    }
    public async AddLike(like: LikeView): Promise<AxiosResponse<any,any>>{
        return this.host.post(`/api/Post/AddLike`, like);
    }
    public async RemoveLike(like: LikeView): Promise<AxiosResponse<any,any>>{
        return this.host.delete(`/api/Post/RemoveLike`,{
            data: like
        })
    }
    public async RemoveLikeById(likeId: number): Promise<AxiosResponse<any,any>>{
        return this.host.delete(`/api/Post/RemoveLikeById?likeId=${likeId}`)
    }
}
