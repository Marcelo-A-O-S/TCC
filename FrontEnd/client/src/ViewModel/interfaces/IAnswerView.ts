import { IUserView } from "./IUserView";
export interface IAnswerView{
    Id:number,
    commentId: number,
    postId: number,
    answer:string,
    user:IUserView,
}