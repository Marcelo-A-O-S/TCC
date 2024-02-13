using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Api.Models
{
    public class Answer
    {
        [Key]
        public int Id { get; set; }
        public string answer { get; set; }
        public User user { get; set; }
        [ForeignKey("User")]
        public int userId { get; set; }

        public Comment comment { get; set; }
        [ForeignKey("Comment")]
        public int commentId { get; set; }
    }
}
