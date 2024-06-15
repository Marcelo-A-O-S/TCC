
import useSWR, { SWRConfiguration } from "swr";
import { privateApi } from "@/services/api";
import { useEffect } from "react";
const configSWR: SWRConfiguration ={
    revalidateOnFocus: false,

}
const fetcherGet = async( url: string) =>{
    const api = privateApi()
    const response = await api.get(url);
    return response.data
}
function useGetAllPosts(){
    const {data, error, isValidating, isLoading} = useSWR("/api/Post/List", fetcherGet,configSWR)
    return {   
        data, 
        error,
        isValidating,
        isLoading
    }
    
}
function useGetPostById(Id: number){
    const {} = useSWR("",)
}

export {useGetAllPosts }