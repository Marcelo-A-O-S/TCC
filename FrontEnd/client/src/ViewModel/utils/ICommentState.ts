import { IUserView } from "../interfaces/IUserView";
/* const [comment, setComment] = useState({
    commentId:0,
    commentUser: "",
    answerId:0,
    user:{
        id:0,
        name:"",
        email:""
    },
    answer: false
}); */
export interface ICommentState {
    commentId:number,
    commentUser:string,
    answerId:number,
    user:IUserView,
    answer:boolean
}