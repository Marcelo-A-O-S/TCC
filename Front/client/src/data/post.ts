
import useSWR, { KeyedMutator, SWRConfiguration, mutate} from "swr";
import { PostDTO } from "@/DTOs/PostDTO";
import { Post } from "@/models/Post";
import { LikeDTO } from "@/DTOs/LikeDTO";
import { CommentDTO } from "@/DTOs/CommentDTO";
import { AnswerDTO } from "@/DTOs/AnswerDTO";
import { fetcherDelete, fetcherGet, fetcherPost, fetcherServerGet } from "@/services/fetchers";
const configSWR: SWRConfiguration ={
    revalidateOnFocus: false,

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
async function GetPostById(postId: number){
    const response = await fetcherServerGet(`/api/Post/FindById?id=${postId}`);
    return response
}
async function DeletePostById(postId: number){
    const response = await fetcherDelete(`/api/Post/DeleteById?postId=${postId}`);
    return response
}
async function CreatePost(bodyPost : PostDTO){
    const response = await fetcherPost("/api/Post/Create",bodyPost);
    mutate("/api/Post/List");
    mutate(`/api/Post/FindByUserId?userId=${bodyPost.userId}`);
    return response;
}
async function PostAddLike(likeDTO : LikeDTO){
    const response = await fetcherPost("/api/Post/AddLike", likeDTO);
    return response;
}
async function PostRemoveLike(likeId: number){
    const response = await fetcherDelete(`/api/Post/RemoveLikeById?likeId=${likeId}`);
    return response;
}
async function PostAddComment(commentDTO: CommentDTO){
    const response = await fetcherPost(`/api/Post/AddComment`,commentDTO);
    return response;
}
async function PostDeleteCommentById(commentId: number){
    const response = await fetcherDelete(`/api/Post/DeleteCommentById?commentId=${commentId}`)
    return response
}
async function PostAddAnswer(answerDTO: AnswerDTO){
    const response = await fetcherPost(`/api/Post/AddAnswer`,answerDTO);
    return response;
}
async function PostDeleteAnswerById(answerId: number){
    const response = await fetcherDelete(`/api/Post/DeleteAnswerById?answerId=${answerId}`)
    return response
}

export {
    useGetAllPosts, 
    useGetPostByUserId,
    useGetPostById, 
    CreatePost, 
    DeletePostById, 
    PostAddLike, 
    PostRemoveLike,
    GetPostById,
    PostAddComment,
    PostDeleteCommentById,
    PostAddAnswer,
    PostDeleteAnswerById
}