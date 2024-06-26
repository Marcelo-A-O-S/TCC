
import useSWR, { KeyedMutator, SWRConfiguration, mutate} from "swr";
import { privateApi } from "@/services/api";
import { PostDTO } from "@/DTOs/PostDTO";
import { Post } from "@/models/Post";
import { LikeDTO } from "@/DTOs/LikeDTO";
const configSWR: SWRConfiguration ={
    revalidateOnFocus: false,

}
const fetcherGet = async( url: string) =>{
    const api = privateApi()
    const response = await api.get(url);
    return response.data
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
function useGetAllPosts(){
    const {data, error, isValidating, isLoading, mutate} = useSWR("/api/Post/List", fetcherGet,configSWR)
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
    data: any | undefined,
    error: any,
    isValidating: boolean,
    isLoading:boolean,
    mutate: KeyedMutator<Post>
}{
    const {data, error, isValidating, isLoading, mutate} = useSWR<Post>(`/api/Post/FindById?id=${postId}`,fetcherGet, configSWR)
    return {   
        data, 
        error,
        isValidating,
        isLoading,
        mutate
    }
}
function useGetPostByUserId(userId:number){
    const {data, error, isValidating, isLoading, mutate} = useSWR(`/api/Post/FindByUserId?userId=${userId}`, fetcherGet, configSWR)
    return {
        data,
        error,
        isValidating,
        isLoading,
        mutate
    }
}
async function DeletePostById(postId: number){
    const response = await fetcherDelete(`/api/Post/DeleteById?postId=${postId}`);
    return response
}
async function CreatePost(bodyPost : PostDTO){
    const response = await fetcherPost("/api/Post/Create",bodyPost);
    mutate("/api/Post/List");
    mutate(`/api/Post/FindByUserId?userId=${bodyPost.userId}`)
    return response
}
async function PostAddLike(likeDTO : LikeDTO){
    const response = await fetcherPost("/api/Post/AddLike", likeDTO);
    return response
}
async function PostRemoveLike(likeId: number){
    const response = await fetcherDelete(`/api/Post/RemoveLikeById?likeId=${likeId}`)
    return response
}
export {
    useGetAllPosts, 
    useGetPostByUserId, 
    CreatePost, 
    useGetPostById,
    DeletePostById, 
    PostAddLike, 
    PostRemoveLike
}