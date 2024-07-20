using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Api.Models
{
    public class Posts
    {
        [Key]
        public int Id { get; set; }
        public string guid{ get; set; }
        public string title { get; set; }
        public string description { get; set; }
        public DateTime dateCreate { get; set; }
        public List<Image> images { get; set; } 

        public User user { get; set; }
        [ForeignKey("User")]
        public int userId { get; set; }

        public List<Comment> comments { get; set; }
        public List<Like> likes { get; set; }

        public Posts(){
            
            this.dateCreate = DateTime.Now;
            this.images = new List<Image>();
            this.comments = new List<Comment>();
            this.likes = new List<Like>();
        }
    }
}
