import { UserAuthentication } from "@/models/UserAuthentication";
import { PostView } from "./PostView";
import { CommentView } from "./CommentView";
import { AnswerView } from "./AnswerView";
import { LikeView } from "./LikeView";

interface INotificationView{
    id:number;
    guid:string;
    notificationType:number;
    userView: UserAuthentication;
    postView: PostView;
    sourceuser:UserAuthentication;
    commentview:CommentView;
    answerView:AnswerView;
    likeview: LikeView;
    dateCreate:string;
    isRead:boolean
}
export class NotificationView implements INotificationView{
    id: number;
    guid: string;
    notificationType: number;
    userView: UserAuthentication;
    postView: PostView;
    sourceuser: UserAuthentication;
    commentview: CommentView;
    answerView: AnswerView;
    likeview: LikeView;
    dateCreate: string;
    isRead: boolean;
    constructor(){
        this.id = 0;
        this.guid = "";
        this.notificationType = 0;
        this.userView = new UserAuthentication();
        this.postView = new PostView();
        this.sourceuser = new UserAuthentication();
        this.commentview = new CommentView();
        this.answerView= new AnswerView();
        this.likeview = new LikeView();
        this.dateCreate = "";
        this.isRead = false;
    }

}


/* using Api.Models;

namespace Api.ViewModel
{
    public class NotificationViewModel
    {
        public int Id { get; set; }
        public string guid {get; set;}
        public NotificationType notificationType { get; set;}
        public UserViewModel userView {get;set;}
        public PostViewModel postView {get; set;}
        public UserViewModel sourceuser {get; set;}
        public CommentViewModel? commentview {get; set;}
        public AnswerViewModel? answerView {get; set;}
        public LikeViewModel? likeview {get; set;}
        public DateTime dateCreate {get; set;}
        public bool IsRead { get; set; } 
        public NotificationViewModel(){
            this.userView = new UserViewModel();
            this.postView = new PostViewModel();
            this.sourceuser = new UserViewModel();
            this.commentview = new CommentViewModel();
            this.answerView = new AnswerViewModel();
            this.likeview = new LikeViewModel();

        }
    }
    
} */
