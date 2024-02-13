import { IFormLogin } from "@/models/interfaces/IFormLogin";
import { IFormRegister } from "@/models/interfaces/IFormRegister";
import axios, { AxiosInstance, AxiosResponse } from "axios";

export class ApiAuthentication{
    private host:AxiosInstance;
    constructor(){
        this.host = axios.create({
            baseURL: process.env.NEXT_PUBLIC_HOST
        })
    }
    public async Register(request: IFormRegister): Promise<AxiosResponse<any, any>>{
        return this.host.post("/api/Authentication/Register", request);
    }
    public async Login(request: IFormLogin): Promise<AxiosResponse<any, any>>{
        return this.host.post("/api/Authentication/Login", request);
    }
}

