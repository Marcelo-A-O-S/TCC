import { privateApi, privateServerApi } from "./api";

const fetcherGet = async( url: string) =>{
    const api = privateApi()
    const response = await api.get(url);
    return response.data
}
const fetcherServerGet = async( url: string) =>{
    const api = await privateServerApi()
    try{
        const response = await api.get(url);
        return response.data
    }catch(err){
        console.log(err)
    }
}
const fetcherPost = async(url:string, body:any) =>{
    const api = privateApi();
    const response = await api.post(url,body);
    return response
}
const fetcherDelete = async(url:string)=>{
    const api = privateApi();
    const response = await api.delete(url);
    return response
}
export {
    fetcherGet,
    fetcherServerGet,
    fetcherPost,
    fetcherDelete
}