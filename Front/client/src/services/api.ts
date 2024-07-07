import { getTokenCookie } from "@/hooks/userCookie";
import { getServerTokenCookie } from "@/hooks/userServerCookie";
import axios from "axios";
import https from 'https';
const agent = new https.Agent({
    rejectUnauthorized: false
  });
export const privateApi = () =>{
        const token = getTokenCookie()
        
        return axios.create({
            baseURL:process.env.NEXT_PUBLIC_HOST,
            httpsAgent: agent,
            headers:{
                Authorization:`Bearer ${token}`,
            },
        
        })    
}
export const privateServerApi = async () =>{
    const token = await getServerTokenCookie();
    
    return axios.create({
        baseURL:process.env.NEXT_PUBLIC_HOST,
        httpsAgent: agent,
        headers:{
            Authorization:`Bearer ${token}`,
        },
    
    })
}