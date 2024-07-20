using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Api.Models
{
    public class Comment
    {
        [Key]
        public int Id { get; set; }
        public string guid { get; set; }
        public string comment { get; set; }
        //public string commentGuid {get; set;}
        public User user { get; set; }
        [ForeignKey("User")]
        public int userId { get; set; }
        public Posts post { get; set; }
        [ForeignKey("Posts")]
        public int postId { get; set; }
        
        public List<Answer> answers { get; set; }

        public DateTime dateCreate { get; set; }

        public Comment(){
            this.dateCreate = DateTime.Now;
            this.answers = new List<Answer>();
        }
    }
}
