import axios from "axios";
import useSWR from "swr";
import { getTokenCookie } from "@/hooks/userCookie";
const api = axios.create({
    baseURL:process.env.NEXT_PUBLIC_HOST,
    headers:{
        Authorization:`Bearer ${getTokenCookie}`
    }
})
export async function getByEmail(email: string){
    const {data, error} = useSWR(async()=>{
        const response = await api.get(`/api/User/GetByEmail?email=${email}`);
        return response.data;
    })
    return { data, error } 
}
export async function getById(userId: number){
    const {data, error} = useSWR(async()=>{
        const response = await api.get(`/api/User/GetById?id=${userId}`);
        return response.data;
    })
    return { data, error } 
}

