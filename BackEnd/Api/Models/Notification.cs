using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Api.Models
{
    public class Notification
    {
        [Key]
        public int Id { get; set; }
        public bool Viewed {get; set;}
        public User user { get; set; }
        [ForeignKey("User")]
        public int userId {get; set;}
        public Posts post {get; set;}
        [ForeignKey("Posts")]
        public int? postId {get; set;}
        public Comment comment {get; set;}
        [ForeignKey("Comment")]
        public int? commentId {get; set;}
        public Answer answer {get;set;}
        [ForeignKey("Answer")]
        public int? answerId {get; set;}
    }
}
