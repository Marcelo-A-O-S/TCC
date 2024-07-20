import { CommentDTO } from "@/DTOs/CommentDTO";
import { fetcherDelete, fetcherPost } from "./fetchers";
import { ROUTE_COMMENT } from "@/utils/constants";
async function AddComment(commentDTO: CommentDTO){
    const response = await fetcherPost(ROUTE_COMMENT.SAVE_COMMENT,commentDTO);
    return response;
}
async function DeleteCommentById(commentId: number){
    const response = await fetcherDelete(ROUTE_COMMENT.DELETE_COMMENT_BY_COMMENTID + commentId)
    return response
}

export default {
    AddComment,
    DeleteCommentById
}