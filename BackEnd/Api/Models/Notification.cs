using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Api.Models
{
    public class Notification
    {
        [Key]
        public int Id { get; set; } 
        public string guid { get; set; }
        public User user{ get; set; }
        [ForeignKey("User")]
        public int userId { get; set; } 

        public NotificationType notificationType { get; set; } 
        public User SourceUser {get; set;}
        [ForeignKey("User")]
        public int SourceUserId { get; set; }
        public Posts posts { get; set; } 
        [ForeignKey("Posts")]
        public int postsId { get; set; }
        public Comment comment {get; set;}
        [ForeignKey("Comment")] 
        public int? commentId { get; set; }
        public Answer answer {get; set;}
        [ForeignKey("Answer")]
        public int? answerId {get;set; }

        public Like like {get; set;}
        [ForeignKey("Like")]
        public int? likeId {get;set;}
        public DateTime dateCreate { get; set; } 

        public bool IsRead { get; set; } 
        public Notification()
        {
            this.guid = Guid.NewGuid().ToString();
            this.dateCreate = DateTime.UtcNow;
            this.IsRead = false;
        }
    }
    public enum NotificationType
    {
        Like, 
        Comment, 
        Answer 
    }
}
