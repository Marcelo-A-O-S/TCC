
import useSWR, { KeyedMutator } from "swr";
import { fetcherGet } from "@/services/fetchers";
import { ROUTE_NOTIFICATION } from "@/utils/constants";
function useGetNotificationsByUserId(userId?: number){
    const {data, error, isLoading, isValidating} = useSWR(userId ? ROUTE_NOTIFICATION.LIST_BY_USERID + userId : null,fetcherGet,{
        revalidateOnFocus:false
    })
    return{
        data,
        error,
        isLoading,
        isValidating
    }
}

export {
    useGetNotificationsByUserId
}