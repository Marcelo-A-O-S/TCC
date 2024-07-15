import { Login } from "@/models/Login";
import { Register } from "@/models/Register";
import https from 'https';
const agent = new https.Agent({
    rejectUnauthorized: false
  });
import axios from "axios";
const api = axios.create({
    baseURL:process.env.NEXT_PUBLIC_HOST,
    httpsAgent: agent,
})

export async function register(dataRegister: Register){
    const response = await api.post("/api/Authentication/Register", dataRegister);
    return response.data
}
export async function loginPost(dataLogin: Login){
    const response = await api.post("/api/Authentication/Login",dataLogin);
    return response.data
}