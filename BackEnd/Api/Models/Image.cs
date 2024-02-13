using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Api.Models
{
    public class Image
    {
        [Key]
        public string Id { get; set; }
        public string Path { get; set; }
        public string Description { get; set; }
        public Posts post { get; set; }
        [ForeignKey("Posts")]
        public int postId { get; set; }
    }
}
