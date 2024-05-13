import { IAnswerView } from "./IAnswerView"
import { IUserView } from "./IUserView"
export interface ICommentView{
    Id:number,
    user:IUserView,
    comment:string,
    answers:IAnswerView[]
}