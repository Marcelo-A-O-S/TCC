using Api.Models;

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
    
}
