import { IFormLogin } from "@/models/interfaces/IFormLogin";
import { IFormRegister } from "@/models/interfaces/IFormRegister";
import axios from "axios";

export const PostRegister = async (bodyRequest: IFormRegister) =>{
    const host = axios.create({
        baseURL: process.env.NEXT_PUBLIC_HOST
    })

    return host.post("/api/Authentication/Register", bodyRequest);
}
export const PostLogin = async (bodyRequest : IFormLogin)=>{
    const host = axios.create({
        baseURL: process.env.NEXT_PUBLIC_HOST
    })
    return host.post("/api/Authentication/Login", bodyRequest);
}
