import { fetcherGet } from "@/services/fetchers"
import { PostView } from "@/ViewModel/PostView"
import useSWR, { KeyedMutator } from "swr"
import { configRevalidateFalse } from "@/utils/swrConfig"
import { ROUTE_POST } from "@/utils/constants"
type DataFetch ={
    data: PostView | undefined,
    error: any,
    isValidating: boolean,
    isLoading:boolean,
    mutate: KeyedMutator<PostView>
}
function useGetAllPosts(){
    const {data, error, isValidating, isLoading, mutate} = useSWR<Array<PostView>>(ROUTE_POST.LIST, fetcherGet,configRevalidateFalse)
    return {   
        data, 
        error,
        isValidating,
        isLoading,
        mutate
    }
}
function useGetPostById(postId?: number):DataFetch{
    if(postId == null){
        return {} as DataFetch;
    }
    const {data, error, isValidating, isLoading, mutate} = useSWR<PostView>(ROUTE_POST.FIND_BY_ID +postId,fetcherGet, configRevalidateFalse)
    return {   
        data, 
        error,
        isValidating,
        isLoading,
        mutate
    }
}
function useGetPostByUserId(userId:number){
    const {data, error, isValidating, isLoading, mutate} = useSWR<Array<PostView>>(ROUTE_POST.FIND_BY_USERID + userId, fetcherGet, configRevalidateFalse)
    return {
        data,
        error,
        isValidating,
        isLoading,
        mutate
    }
}

export {
    useGetAllPosts,
    useGetPostById,
    useGetPostByUserId,
}