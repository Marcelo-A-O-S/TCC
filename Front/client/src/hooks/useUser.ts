import { UserAuthentication } from "@/models/UserAuthentication";
import { fetcherGet } from "@/services/fetchers";
import useSWR from "swr";
import { ROUTE_USERS } from "@/utils/constants";
function useGetByEmail(email?: string):{
    data: UserAuthentication | undefined;
    error: any;
    isValidating: boolean;
    isLoading: boolean;
} {
    const { data, error, isValidating, isLoading } = useSWR(ROUTE_USERS.GET_BY_EMAIL + email,fetcherGet,{
        revalidateOnFocus:false
    });
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
    const {data, error, isValidating, isLoading} = useSWR<UserAuthentication>(`/api/User/GetById?id=${userId}`, fetcherGet,{
        revalidateOnFocus:false
    })
    return {   
        data, 
        error,
        isValidating,
        isLoading
    }
}
export {
    useGetById,
    useGetByEmail
}