
import useSWR, { SWRConfiguration } from "swr";
import { privateApi, privateServerApi } from "@/services/api";
import { UserAuthentication } from "@/models/UserAuthentication";
const configSWR: SWRConfiguration ={
    revalidateOnFocus: false,

}
const fetcherGet = async( url: string) =>{
    const api = privateApi()
    const response = await api.get(url);
    return response.data
}
const fetcherServerGet = async( url: string) =>{
    const api = await privateServerApi()
    const response = await api.get(url);
    return response.data
}
function useGetByEmail(email: string):{
    data: UserAuthentication | undefined;
    error: any;
    isValidating: boolean;
    isLoading: boolean;
} {
    let url = `/api/User/GetByEmail?email=${email}`;
    const { data, error, isValidating, isLoading } = useSWR(url,fetcherGet,configSWR);
    if(data != undefined){
        return {
            data,
            error,
            isValidating,
            isLoading,
        };
    }
    return {
        data,
        error,
        isValidating,
        isLoading,
    };
}
async function GetUserByEmail(email:string){
    const data = await fetcherServerGet(`/api/User/GetByEmail?email=${email}`)
    return data
}
function useGetById(userId: number):
{ data: UserAuthentication | undefined;
    error: any;
    isValidating: boolean;
    isLoading: boolean
}{
    const {data, error, isValidating, isLoading} = useSWR<UserAuthentication>(`/api/User/GetById?id=${userId}`, fetcherGet,configSWR)
    return {   
        data, 
        error,
        isValidating,
        isLoading
    }
}
async function GetUserById(userId: number){
    const data = await fetcherGet(`/api/User/GetById?id=${userId}`);
    return data;
}
export {useGetByEmail, useGetById, GetUserByEmail, GetUserById}