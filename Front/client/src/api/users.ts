
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
    const { data, error, isValidating, isLoading } = useSWR<UserAuthentication>(
        `/api/User/GetByEmail?email=${email}`,
        fetcherGet,
        configSWR
    );
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
export {useGetByEmail, useGetById}