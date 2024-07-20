namespace Api.DTOs
{
    public class CommentDTO
    {
        public int Id { get; set; }
        public string guid {get; set;}
        public string comment { get; set; }
        public int userId { get; set; }
        public int postId { get; set; }
        public DateTime dateCreate {get; set;}
    }
}
