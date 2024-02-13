import axios, { AxiosInstance, AxiosResponse } from "axios"

export class ApiPost{
    private host:AxiosInstance;
    constructor(){
        this.host = axios.create({
            baseURL: process.env.NEXT_PUBLIC_HOST
        })
    }
    public createPost(){

    }
    public async GetAll() : Promise<AxiosResponse<any, any>>{
        let posts = this.host.get("/api/Post/List")
        return posts;
    }
}
