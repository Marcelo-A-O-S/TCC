import { fetcherGet } from "@/services/fetchers"
import { PostView } from "@/ViewModel/PostView"
import useSWR, { KeyedMutator } from "swr"
import { configRevalidateFalse } from "@/utils/swrConfig"

function useGetAllPosts(){
    const {data, error, isValidating, isLoading, mutate} = useSWR<Array<PostView>>("/api/Post/List", fetcherGet,configRevalidateFalse)
    return {   
        data, 
        error,
        isValidating,
        isLoading,
        mutate
    }
}
function useGetPostById(postId: number):
{
    data: PostView | undefined,
    error: any,
    isValidating: boolean,
    isLoading:boolean,
    mutate: KeyedMutator<PostView>
}{
    const {data, error, isValidating, isLoading, mutate} = useSWR<PostView>(`/api/Post/FindById?id=${postId}`,fetcherGet, configRevalidateFalse)
    return {   
        data, 
        error,
        isValidating,
        isLoading,
        mutate
    }
}
function useGetPostByUserId(userId:number){
    const {data, error, isValidating, isLoading, mutate} = useSWR<Array<PostView>>(`/api/Post/FindByUserId?userId=${userId}`, fetcherGet, configRevalidateFalse)
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