import { IUserView } from "./IUserView"
import { ICommentView } from "./ICommentView"
import { ILikeView } from "./ILikeView"
export interface IPostsView {
    Id:number,
    title:string,
    description:string,
    user:IUserView,
    likeViews:ILikeView[],
    commentViews: ICommentView[],
    imagesViews: Array<any>,
    dateCreate:string
}