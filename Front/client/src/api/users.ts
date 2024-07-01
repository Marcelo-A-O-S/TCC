
import useSWR, { SWRConfiguration } from "swr";
import { privateApi } from "@/services/api";
import { UserAuthentication } from "@/models/UserAuthentication";
const configSWR: SWRConfiguration ={
    revalidateOnFocus: false,

}
const fetcherGet = async( url: string) =>{
    const api = privateApi()
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
    const data = await fetcherGet(`/api/User/GetByEmail?email=${email}`)
    return data
}
function useGetById(userId: number):
{ data: UserAuthentication | undefined;
    error: any;
    isValidating: boolean;
    isLoading: boolean
}{
    const {data, error, isValidating, isLoading} = useSWR<UserAuthentication>(`/api/User/GetByEmail?userId=${userId}`, fetcherGet,configSWR)
    return {   
        data, 
        error,
        isValidating,
        isLoading
    }
}
export {useGetByEmail, useGetById, GetUserByEmail}