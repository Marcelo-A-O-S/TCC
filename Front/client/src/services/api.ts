import { getTokenCookie } from "@/hooks/userCookie";
import axios from "axios";
import https from 'https';
export const privateApi = () =>{
        const token = getTokenCookie()
        return axios.create({
            baseURL:process.env.NEXT_PUBLIC_HOST,
            
            headers:{
                Authorization:`Bearer ${token}`,
            },
        
        })
        
}