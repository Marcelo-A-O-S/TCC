import { LikeDTO } from "@/DTOs/LikeDTO";
import { fetcherDelete, fetcherPost } from "./fetchers";
import { ROUTE_LIKE } from "@/utils/constants";
async function AddLike(likeDTO : LikeDTO){
    const response = await fetcherPost(ROUTE_LIKE.ADD_LIKE, likeDTO);
    return response;
}
async function RemoveLike(likeId: number){
    const response = await fetcherDelete(ROUTE_LIKE.REMOVE_LIKE_BY_ID + likeId);
    return response;
}

export default {
    AddLike,
    RemoveLike
}