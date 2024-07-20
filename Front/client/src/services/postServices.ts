import { PostDTO } from "@/DTOs/PostDTO";
import { fetcherDelete, fetcherPost, fetcherServerGet } from "./fetchers";
import { mutate } from "swr";

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
export default {
    GetPostById,
    DeletePostById,
    CreatePost
}