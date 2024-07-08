import { UserAuthentication } from "@/models/UserAuthentication";

export interface ICommentState {
    commentId:number,
    commentUser:string,
    answerId:number,
    user:UserAuthentication,
    answer:boolean
}