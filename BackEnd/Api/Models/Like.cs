using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Api.Models
{
    public class Like
    {
        [Key]
        public int Id { get; set; }
        public string guid { get; set; }
        public User user { get; set; }
        [ForeignKey("User")]
        public int userId { get; set; }
        public Posts post { get; set; }
        [ForeignKey("Posts")]
        public int postId { get; set; }

        public Like(){
        
        }
    
    }
}